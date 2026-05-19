<?php

namespace App\Http\Controllers;

use App\Models\HeroSection;
use Illuminate\Http\Request;

class HeroSectionController extends Controller
{
    /**
     * Display Hero Section Data
     */
    public function index()
    {
        $hero = HeroSection::latest()->first();

        if (!$hero) {
            return response()->json([
                'status' => false,
                'message' => 'No hero section found',
                'data' => null
            ], 404);
        }

        $backgroundImageUrl = null;

        if ($hero->background_image) {
            $backgroundImageUrl = url($hero->background_image);
        }

        return response()->json([
            'status' => true,
            'message' => 'Hero section fetched successfully',
            'data' => [
                'id' => $hero->id,
                'title' => $hero->title,
                'subtitle' => $hero->subtitle,
                'event_date' => $hero->event_date->toIso8601String(),
                'location' => $hero->location,
                'background_image' => $backgroundImageUrl,
                'primary_button' => $hero->primary_button,
            ]
        ]);
    }

    /**
     * Store / Update Hero Section
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'subtitle' => 'required',
            'event_date' => 'required|date',
            'location' => 'required',
            'primary_button' => 'required',
            'background_image' => 'nullable|mimes:jpg,jpeg,png,webp,avif|max:10240',
        ]);

        // OLD HERO
        $hero = HeroSection::latest()->first();

        // OLD IMAGE
        $imagePath = $hero?->background_image;

        // IMAGE UPLOAD
        if ($request->hasFile('background_image')) {

            $image = $request->file('background_image');

            $imageName = time() . '.' . $image->getClientOriginalExtension();

            // SAVE INSIDE PUBLIC/UPLOADS/HERO
            $image->move(
                public_path('uploads/hero'),
                $imageName
            );

            $imagePath = 'uploads/hero/' . $imageName;
        }

        // UPDATE
        if ($hero) {

            $hero->update([
                'title' => $request->title,
                'subtitle' => $request->subtitle,
                'event_date' => $request->event_date,
                'location' => $request->location,
                'background_image' => $imagePath,
                'primary_button' => $request->primary_button,
            ]);

        } else {

            // CREATE
            $hero = HeroSection::create([
                'title' => $request->title,
                'subtitle' => $request->subtitle,
                'event_date' => $request->event_date,
                'location' => $request->location,
                'background_image' => $imagePath,
                'primary_button' => $request->primary_button,
            ]);
        }

        $backgroundImageUrl = null;

        if ($hero->background_image) {
            $backgroundImageUrl = url($hero->background_image);
        }

        return response()->json([
            'status' => true,
            'message' => 'Hero section saved successfully',
            'data' => [
                'id' => $hero->id,
                'title' => $hero->title,
                'subtitle' => $hero->subtitle,
                'event_date' => $hero->event_date->toIso8601String(),
                'location' => $hero->location,
                'background_image' => $backgroundImageUrl,
                'primary_button' => $hero->primary_button,
            ]
        ]);
    }
}