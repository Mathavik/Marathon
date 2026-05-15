<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthCustom
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
 public function handle($request, Closure $next)
{
    $token = $request->cookie('token');

    // 🔴 Check token exists first
    if (!$token) {
        return response()->json(['error' => 'No token'], 401);
    }

    $student = \App\Models\Student::where('api_token', $token)->first();

    // 🔴 Check valid token
    if (!$student) {
        return response()->json(['error' => 'Invalid token'], 401);
    }

    // ✅ Optional: attach user to request
    $request->merge(['student' => $student]);

    return $next($request);
}
}
