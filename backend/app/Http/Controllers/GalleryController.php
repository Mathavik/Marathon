<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gallery;

class GalleryController extends Controller
{
    // 🔥 Get all images
    public function index()
    {
        return response()->json(Gallery::latest()->get());
    }

    // 🔥 Admin upload
    public function store(Request $request)
    {
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('upload/gallery'), $filename);

            $gallery = Gallery::create([
                'image' => $filename,
                'category' => $request->category
            ]);

            return response()->json($gallery);
        }

        return response()->json(['error' => 'No image'], 400);
    }
}