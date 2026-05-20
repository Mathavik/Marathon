<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MarathonRegistration;
use Illuminate\Support\Facades\Hash;

class MarathonRegistrationController extends Controller
{
    // GET ALL REGISTRATIONS
    public function index()
    {
        $registrations = MarathonRegistration::latest()->get();

        return response()->json($registrations);
    }

    // STORE REGISTRATION
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:marathon_registrations,email',
            'password' => 'required|min:6',
        ]);

        $data = MarathonRegistration::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),

            'phone' => $request->phone,
            'gender' => $request->gender,
            'dob' => $request->dob,
            'city' => $request->city,
            'address' => $request->address,
            'emergency_name' => $request->emergency_name,
            'emergency_phone' => $request->emergency_phone,
            'tshirt_size' => $request->tshirt_size,
            'category' => $request->category,
            'medical_condition' => $request->medical_condition,
        ]);

        return response()->json([
            'message' => 'Registered successfully',
            'data' => $data
        ], 201);
    }
}