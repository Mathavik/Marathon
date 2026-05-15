<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Category;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Mail\WinnerMail;


class EventController extends Controller
{
    // 📌 Get all events
    public function index()
    {
        return response()->json(
            Event::with('category')->get()
        );
    }

    // 📌 Create event
    public function store(Request $request)
    {
        $imagePath = $request->hasFile('image')
            ? $request->file('image')->store('events', 'public')
            : null;

        $event = Event::create([
            'category_id' => $request->category_id,
            'name'        => $request->name,
            'type'        => $request->type,
            'age_group'   => $request->age_group,
            'image'       => $imagePath,
            'entry_fee'   => $request->entry_fee,
            'event_date'  => $request->event_date,
            'start_time'  => $request->start_time,
            'end_time'    => $request->end_time,
            'booking_last_date' => $request->last_date,
        ]);

        return response()->json($event);
    }

    // 📌 Show event
    public function show($id)
    {
        return response()->json(
            Event::with('category')->findOrFail($id)
        );
    }

    // 📌 Update event
    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        if ($request->hasFile('image')) {
            $event->image = $request->file('image')->store('events', 'public');
        }

        $event->update([
            'category_id' => $request->category_id ?? $event->category_id,
            'name'        => $request->name ?? $event->name,
            'type'        => $request->type ?? $event->type,
            'age_group'   => $request->age_group ?? $event->age_group,
            'entry_fee'   => $request->entry_fee ?? $event->entry_fee,
            'event_date'  => $request->event_date ?? $event->event_date,
            'start_time'  => $request->start_time ?? $event->start_time,
            'end_time'    => $request->end_time ?? $event->end_time,
            'is_visible' => $request->is_visible ?? $event->is_visible,
        ]);

        return response()->json([
            'message' => 'Event updated successfully',
            'data' => $event
        ]);
    }

    // 📌 Delete event
    public function destroy($id)
    {
        Event::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Event deleted successfully'
        ]);
    }

    // 🔥 Register Event
    public function registerEvent(Request $request)
{
    $student = Student::findOrFail($request->student_id);
    $event   = Event::findOrFail($request->event_id);

    // 🔥 Booking last date check
$today = Carbon::today();

if ($event->last_date && $today->gt(Carbon::parse($event->last_date))) {
    return response()->json([
        'message' => 'Booking closed! Last date over.'
    ], 400);
}

    // 🔥 Max 5 events
    if ($student->events()->count() >= 5) {
        return response()->json(['error' => 'Max 5 events only allowed'], 400);
    }

    // 🔥 Time clash check
    foreach ($student->events as $e) {
        $start1 = Carbon::parse($e->event_date . ' ' . $e->start_time);
        $end1   = Carbon::parse($e->event_date . ' ' . $e->end_time);

        $start2 = Carbon::parse($event->event_date . ' ' . $event->start_time);
        $end2   = Carbon::parse($event->event_date . ' ' . $event->end_time);

        if ($start1->lt($end2) && $start2->lt($end1)) {
            return response()->json(['error' => 'Time clash!'], 400);
        }
    }

    $student->events()->attach($event->id, [
        'event_time' => now()
    ]);

    return response()->json(['message' => 'Registered']);
}

    // 🏫 Event → School + Students
    public function eventSchoolStudents($eventId)
    {
        $event = Event::with('students')->findOrFail($eventId);

        $grouped = $event->students->groupBy('school_name');

        return response()->json([
            'event' => $event->name,
            'data' => $grouped
        ]);
    }

    // 📥 PDF → School + Students
public function downloadEventSchoolStudents($eventId)
{
    $event = Event::findOrFail($eventId);

// 🔥 FINAL FIX for Team Reports
if (str_contains(strtolower($event->type), 'team')) {

    $teams = DB::table('teams')
        ->join('students', 'teams.captain_id', '=', 'students.id')
        ->where('teams.event_id', $eventId)
        // students.email ah inga add panniruken
        ->select('teams.team_name', 'students.school_name', 'students.email') 
        ->get()
        ->groupBy('school_name');

    $pdf = Pdf::loadView('pdf.event_team_report', [
        'event' => $event,
        'teams' => $teams
    ]);

}
    else {

        $event = Event::with('students')->findOrFail($eventId);

        $grouped = $event->students->groupBy('school_name');

        $pdf = Pdf::loadView('pdf.event_school_students', [
            'event' => $event,
            'data' => $grouped
        ]);
    }

    return $pdf->download($event->name . '_report.pdf');
}
    // 🏫 Event → Schools Only
    public function eventSchoolsOnly($eventId)
    {
        $schools = DB::table('students')
            ->join('event_student', 'students.id', '=', 'event_student.student_id')
            ->where('event_student.event_id', $eventId)
            ->select('students.school_name')
            ->distinct()
            ->get();

        return response()->json($schools);
    }

    // 📥 PDF → Schools Only
   // 📥 PDF → Schools Only function-la intha change pannunga
public function downloadEventSchools($eventId)
{
    $event = Event::findOrFail($eventId);

    $schools = DB::table('students')
        ->join('event_student', 'students.id', '=', 'event_student.student_id')
        ->where('event_student.event_id', $eventId)
        ->select('students.school_name')
        ->distinct()
        ->get();

    // Inga 'pdf.event_schools' nu maathunga (pudhu file name)
    $pdf = Pdf::loadView('pdf.event_schools', [
        'event' => $event,
        'data' => $schools 
    ]);

    return $pdf->download($event->name . '_schools.pdf');
}

    // 🏫 School-wise Report
    public function schoolWiseReport()
    {
        $data = DB::table('students')
            ->join('event_student', 'students.id', '=', 'event_student.student_id')
            ->select(
                'students.school_name',
                DB::raw('COUNT(DISTINCT students.id) as total_students'),
                DB::raw('COUNT(event_student.event_id) as total_events')
            )
            ->groupBy('students.school_name')
            ->orderBy('students.school_name')
            ->get();

        return response()->json($data);
    }

    // 📥 School-wise PDF
    public function downloadSchoolReport()
    {
        $data = DB::table('students')
            ->join('event_student', 'students.id', '=', 'event_student.student_id')
            ->select(
                'students.school_name',
                DB::raw('COUNT(DISTINCT students.id) as total_students'),
                DB::raw('COUNT(event_student.event_id) as total_events')
            )
            ->groupBy('students.school_name')
            ->get();

        $pdf = Pdf::loadView('pdf.school_report', ['data' => $data]);

        return $pdf->download('school_report.pdf');
    }
    public function getEventStudents($eventId)
{
    $event = Event::with('students')->findOrFail($eventId);

    $grouped = $event->students->groupBy('school_name');

    return response()->json($grouped);
}
// 🏆 Assign Winners
public function assignWinners(Request $request)
{
    $eventId = $request->event_id;
    $winners = $request->winners;

    foreach ($winners as $winner) {
        DB::table('event_student')
            ->where('event_id', $eventId)
            ->where('student_id', $winner['student_id'])
            ->update([
                'prize' => $winner['prize'] // First / Second / Third
            ]);
    }

    return response()->json([
        'message' => 'Winners assigned successfully'
    ]);
}
// 📄 Send Certificates to Winners
public function sendCertificates($eventId)
{
    $event = Event::findOrFail($eventId);

    $students = DB::table('students')
        ->join('event_student', 'students.id', '=', 'event_student.student_id')
        ->where('event_student.event_id', $eventId)
        ->whereNotNull('event_student.prize')
        ->select(
            'students.id',
            'students.name',
            'students.email',
            'event_student.prize'
        )
        ->get();

    foreach ($students as $student) {

        // 🔥 convert to object format
        $studentObj = (object)[
            'name' => $student->name
        ];

        $eventObj = (object)[
            'name' => $event->name,
            'event_date' => $event->event_date
        ];

        Mail::to($student->email)->send(
            new WinnerMail($studentObj, $eventObj, $student->prize)
        );
    }

    return response()->json([
        'message' => 'Certificates sent successfully'
    ]);
}
public function overallWinners()
{
    $data = DB::table('event_student as es')
        ->join('students as s', 'es.student_id', '=', 's.id')
        ->whereNotNull('es.prize')

        ->select(
            's.school_name',

            DB::raw("
                SUM(
                    CASE 
                        WHEN es.prize = 'First' THEN 5
                        WHEN es.prize = 'Second' THEN 3
                        WHEN es.prize = 'Third' THEN 1
                        ELSE 0
                    END
                ) as total_points
            "),

            DB::raw("SUM(CASE WHEN es.prize = 'First' THEN 1 ELSE 0 END) as first_count"),
            DB::raw("SUM(CASE WHEN es.prize = 'Second' THEN 1 ELSE 0 END) as second_count"),
            DB::raw("SUM(CASE WHEN es.prize = 'Third' THEN 1 ELSE 0 END) as third_count")
        )

        ->groupBy('s.school_name')

        ->orderByDesc('total_points')
        ->orderByDesc('first_count')
        ->orderByDesc('second_count')

        ->get();

    return response()->json($data);
}
public function schoolStudentReport()
{
    $data = DB::table('event_student')
        ->join('students', 'event_student.student_id', '=', 'students.id')
        ->join('events', 'event_student.event_id', '=', 'events.id')
        ->select(
            'students.name as student_name',
            'students.school_name',
            'events.name as event_name'
        )
        ->orderBy('students.school_name')
        ->get();

    return response()->json($data);
}

// use Barryvdh\DomPDF\Facade\Pdf;

public function downloadSchoolStudentReport(Request $request)
{
    $school = $request->query('school'); // 🔥 முக்கியம்

    $query = DB::table('event_student')
        ->join('students', 'event_student.student_id', '=', 'students.id')
        ->join('events', 'event_student.event_id', '=', 'events.id')
        ->select(
            'students.name as student_name',
            'students.school_name',
            'events.name as event_name'
        );

    // 🔥 FILTER APPLY
    if ($school) {
        $query->where('students.school_name', $school);
    }

    $data = $query->orderBy('students.school_name')->get();

    $grouped = $data->groupBy('school_name');

    $pdf = Pdf::loadView('pdf.school-student-report', compact('grouped'));

    return $pdf->download($school ? $school . '-report.pdf' : 'school-report.pdf');
}
}