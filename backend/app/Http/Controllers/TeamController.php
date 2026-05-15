<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TeamController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'event_id'   => 'required|exists:events,id',
            'captain_id' => 'required|exists:students,id',
            'team_name'  => 'required|string|max:255',
            'members'    => 'required|array|min:1',
            'members.*'  => 'required|string|max:255',
        ]);

        DB::beginTransaction();

        try {
            // ✅ Get event
            $event = DB::table('events')
                ->where('id', $request->event_id)
                ->first();

            if (!$event) {
                return response()->json([
                    'message' => 'Event not found'
                ], 404);
            }

            // ✅ 🔥 CHECK DUPLICATE ENTRY
            $alreadyExists = DB::table('event_student')
                ->where('student_id', $request->captain_id)
                ->where('event_id', $request->event_id)
                ->exists();

            if ($alreadyExists) {
                return response()->json([
                    'message' => 'You have already registered for this event ❌'
                ], 400);
            }

            // ✅ Normalize and sanitize the members array
            $members = array_values(array_filter(array_map(function ($member) {
                return trim($member);
            }, $request->members)));

            // Remove any duplicate names and remove captain name if entered by mistake
            $captainName = DB::table('students')->where('id', $request->captain_id)->value('name');
            $members = array_unique(array_filter($members, function ($member) use ($captainName) {
                return strcasecmp($member, $captainName) !== 0;
            }));

            // ✅ Enforce exact team size from event type
            $requiredMembers = null;
            if (!empty($event->type) && preg_match('/Team\s*\((\d+)\s*players only\)/i', $event->type, $match)) {
                $teamSize = (int) $match[1];
                $requiredMembers = max($teamSize - 1, 0);
            }

            if ($requiredMembers !== null && count($members) !== $requiredMembers) {
                return response()->json([
                    'message' => "This event requires exactly {$requiredMembers} team member(s) besides the captain ❌"
                ], 400);
            }

            // ✅ Create team with members
            $teamId = DB::table('teams')->insertGetId([
                'event_id'   => $request->event_id,
                'event_name' => $event->name,
                'captain_id' => $request->captain_id,
                'team_name'  => $request->team_name,
                'members'    => json_encode(array_values($members)),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // ✅ Insert into event_student
            $eventStudentId = DB::table('event_student')->insertGetId([
                'student_id'    => $request->captain_id,
                'event_id'      => $request->event_id,
                'team_id'       => $teamId,
                'event_name'    => $event->name,
                'event_time'    => now(), // you can replace with actual time
                'payment_ref_id'=> null,
                'created_at'    => now(),
                'updated_at'    => now(),
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Team created successfully ✅',
                'team_id' => $teamId,
                'team_name' => $request->team_name,
                'members_count' => count($request->members),
                'event_student_id' => $eventStudentId,
                'event_name' => $event->name,
                'amount' => $event->entry_fee ?? 0,
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Team creation failed ❌',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}