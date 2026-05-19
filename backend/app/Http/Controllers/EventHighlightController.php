<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EventHighlight;

class EventHighlightController extends Controller
{
    // GET
public function index()
{
    $highlights = EventHighlight::orderBy('id', 'desc')
        ->get()
        ->map(function ($item) {

            return [
                'id' => $item->id,
                'title' => $item->title,
                'image_url' => url('upload/highlights/' . $item->image),
            ];
        });

    return response()->json($highlights);
}

    // POST
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'image' => 'required|image'
        ]);

        $file = $request->file('image');

        $filename = time() . '.' . $file->getClientOriginalExtension();

        $destination = public_path('upload/highlights');

        if (!file_exists($destination)) {
            mkdir($destination, 0777, true);
        }

        $file->move($destination, $filename);

        $highlight = EventHighlight::create([
            'title' => $request->title,
            'image' => $filename
        ]);

        return response()->json([
            'success' => true,
            'data' => $highlight
        ]);
    }
}