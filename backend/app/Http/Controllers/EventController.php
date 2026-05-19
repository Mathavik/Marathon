<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    public function registerEvent(Request $request)
    {
        try {

            $request->validate([
                'student_id' => 'required',
                'event_id' => 'required',
                'event_name' => 'required',
                'event_time' => 'required',
                'amount' => 'required'
            ]);

            $id = DB::table('event_students')->insertGetId([

                'student_id' => $request->student_id,

                'event_id' => $request->event_id,

                'event_name' => $request->event_name,

                'event_time' => $request->event_time,

                'amount' => $request->amount,

                'created_at' => now(),

                'updated_at' => now()

            ]);

            return response()->json([

                'success' => true,

                'event_student_id' => $id

            ]);

        } catch (\Exception $e) {

            return response()->json([

                'success' => false,

                'message' => $e->getMessage()

            ], 500);
        }
    }
}