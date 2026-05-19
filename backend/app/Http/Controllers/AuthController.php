<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MarathonRegistration;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    // LOGIN
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // 🔍 CHECK USER
        $user = MarathonRegistration::where('email', $request->email)->first();

        // ❌ INVALID LOGIN
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'error' => 'Invalid credentials'
            ], 401);
        }

        // 🔐 GENERATE TOKEN
        $token = Str::random(60);

        // 💾 SAVE TOKEN
        $user->api_token = $token;
        $user->save();

        // ✅ SUCCESS RESPONSE
        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token
        ])->cookie(
            'token',
            $token,
            60,
            '/',
            null,
            false,
            true,
            false,
            'Lax'
        );
    }

    // LOGOUT
    public function logout(Request $request)
    {
        $token = $request->cookie('token');

        $user = MarathonRegistration::where('api_token', $token)->first();

        if ($user) {
            $user->api_token = null;
            $user->save();
        }

        return response()->json([
            'message' => 'Logged out successfully'
        ])->cookie(
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