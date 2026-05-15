<?php

// app/Http/Controllers/AdminAuthController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
   public function login(Request $request)
{
    $admin = Admin::where('email', $request->input('email'))->first();

    if (!$admin || !Hash::check($request->input('password'), $admin->password)) {
        return response()->json([
            'message' => 'Invalid email or password'
        ], 401);
    }

    return response()->json([
        'message' => 'Login successful',
        'admin' => $admin
    ]);
}
}