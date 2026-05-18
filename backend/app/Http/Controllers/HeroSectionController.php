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

        return response()->json([
            'status' => true,
            'message' => 'Hero section fetched successfully',
            'data' => $hero
        ]);
    }

    /**
     * Store Hero Section
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'subtitle' => 'required',
            'event_date' => 'required|date',
            'location' => 'required',
            'background_image' => 'required',
            'primary_button' => 'required'
        ]);

        $hero = HeroSection::create($request->all());

      return response()->json([
    'status' => true,
    'message' => 'Hero section fetched successfully',
    'data' => [
        'id' => $hero->id,
        'title' => $hero->title,
        'subtitle' => $hero->subtitle,
        'event_date' => $hero->event_date->toIso8601String(),
        'location' => $hero->location,
        'background_image' => $hero->background_image,
        'primary_button' => $hero->primary_button
    ]
]);
    }
}