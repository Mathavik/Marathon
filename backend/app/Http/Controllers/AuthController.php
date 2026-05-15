<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    // Student Login


public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    $student = Student::where('email', $request->email)->first();

    if (!$student || !Hash::check($request->password, $student->password)) {
        return response()->json(['error' => 'Invalid credentials'], 401);
    }

    // 🔐 Generate token
    $token = Str::random(60);
    $student->api_token = $token;
    $student->save();

    // 🍪 Set HttpOnly Cookie
    return response()->json([
        'message' => 'Login successful',
        'student' => $student
    ])->cookie(
    'token',
    $token,
    60,
    '/',
    null,   // 🔥 IMPORTANT → remove 127.0.0.1
    false,
    true,
    false,
    'Lax'
);
}

    // Logout
  public function logout(Request $request)
{
    $token = $request->cookie('token');

    $student = Student::where('api_token', $token)->first();

    if ($student) {
        $student->api_token = null;
        $student->save();
    }

   return response()->json(['message' => 'Logged out'])
   ->cookie(
    'token',
    null,
    -1,
    '/',
    null,
    false,
    true,
    false,
    'Strict'
);
}
}