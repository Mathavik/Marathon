<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\StudentRegisteredMail;
use App\Models\Admin;
use App\Notifications\StudentRegisteredNotification;

class StudentController extends Controller
{
    // ✅ GET REGISTRATIONS
    public function getRegistrations()
    {
        $registrations = DB::table('event_student')
            ->join('students', 'event_student.student_id', '=', 'students.id')
            ->select(
                'event_student.id',
                'students.name',
                'students.email',
                'event_student.event_id'
            )
            ->get();

        return response()->json($registrations);
    }

    // ✅ SEARCH SCHOOLS
    public function getSchools(Request $request)
    {
        $query = $request->input('q');

        $schools = Student::where('school_name', 'LIKE', "%$query%")
            ->select('school_name', 'school_code', 'city', 'phone', 'email')
            ->distinct()
            ->limit(10)
            ->get();

        return response()->json($schools);
    }

    // ✅ STORE STUDENT
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'dob' => 'required|date',
            'school_code' => 'required'
        ]);

        // 🎯 AGE CALCULATION
        $age = Carbon::parse($request->dob)->age;

        // ✅ CREATE STUDENT (IMPORTANT FIX)
        $student = Student::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'phone' => $request->phone,
            'gender' => $request->gender,
            'dob' => $request->dob,
            'age' => $age,
            'school_name' => $request->school_name,
            'school_code' => $request->school_code,
            'class' => $request->class,
            'city' => $request->city,
        ]);

        // ✅ ADMIN NOTIFICATION
        $admins = Admin::all();
        foreach ($admins as $admin) {
            $admin->notify(new StudentRegisteredNotification($student));
        }

        // ✅ MAIL TO STUDENT
        Mail::to($student->email)
            ->send(new StudentRegisteredMail($student));

        // ✅ MAIL TO ADMINS
        $adminEmails = Admin::pluck('email');
        foreach ($adminEmails as $email) {
            Mail::to($email)
                ->send(new StudentRegisteredMail($student));
        }

        return response()->json([
            'message' => 'Registered Successfully',
            'status' => 'success'
        ], 201);
    }
public function getNotificationRegistrations()
{
    $notifications = DB::table('notifications')
        ->where('type', 'App\Notifications\StudentRegisteredNotification')
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($notification) {
            $data = json_decode($notification->data, true);
            $studentId = $data['student_id'] ?? null;
            
            // Fetch school name directly from the students table using student_id
            $schoolName = 'N/A';
            if ($studentId) {
                $student = DB::table('students')->where('id', $studentId)->first();
                $schoolName = $student->school_name ?? 'N/A';
            }

            // Extract student name from the message if student_name key is missing
            $studentName = $data['student_name'] ?? 'N/A';
            if ($studentName === 'N/A' && isset($data['message'])) {
                $parts = explode(' ', $data['message']);
                $studentName = $parts[0]; 
            }

            return [
                'id' => $notification->id,
                'student_name' => ucfirst($studentName),
                'school_name'  => $schoolName, // Now fetched from the students table
                'type'         => 'New Registration',
                'created_at'   => $notification->created_at
            ];
        });

    return response()->json($notifications);
}
}