<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    // 🔥 Store message
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'subject' => 'required',
            'message' => 'required',
        ]);

        Contact::create($request->all());

        return response()->json([
            'message' => 'Message sent successfully'
        ]);
    }

    // 🔥 Get all messages (admin)
    public function index()
    {
        return Contact::latest()->get();
    }
}