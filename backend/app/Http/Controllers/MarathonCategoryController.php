<?php

namespace App\Http\Controllers;

use App\Models\MarathonCategory;
use Illuminate\Http\Request;

class MarathonCategoryController extends Controller
{
    // GET DATA
    public function index()
    {
        $category = MarathonCategory::first();

        return response()->json([
            'success' => true,
            'data' => $category
        ]);
    }

    // STORE / UPDATE DATA
 public function store(Request $request)
{
    $request->validate([
        'title' => 'required',
        'subtitle' => 'required',
        'event_time' => 'required',
        'registration_fee' => 'required',
        'marathon_route' => 'required',
        'image' => 'nullable|mimes:jpg,jpeg,png,avif,webp|max:2048'
    ]);

    // OLD DATA
    $category = MarathonCategory::first();

    // DEFAULT OLD IMAGE
    $imagePath = $category?->image;

    // NEW IMAGE UPLOAD
   if ($request->hasFile('image')) {

    $image = $request->file('image');

    $imageName = time() . '.' . $image->getClientOriginalExtension();

    // MOVE TO PUBLIC/UPLOADS
    $image->move(public_path('upload'), $imageName);

    $imagePath = 'upload/' . $imageName;
}

    // UPDATE EXISTING
    if ($category) {

        $category->update([
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'event_time' => $request->event_time,
            'registration_fee' => $request->registration_fee,
            'marathon_route' => $request->marathon_route,
            'image' => $imagePath,
        ]);

    } else {

        // CREATE NEW
        $category = MarathonCategory::create([
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'event_time' => $request->event_time,
            'registration_fee' => $request->registration_fee,
            'marathon_route' => $request->marathon_route,
            'image' => $imagePath,
        ]);
    }

    return response()->json([
        'success' => true,
        'message' => 'Marathon Category Saved Successfully',
        'data' => $category
    ]);
}
}