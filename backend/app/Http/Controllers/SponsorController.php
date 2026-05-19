<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sponsor;

class SponsorController extends Controller
{
    // GET ACTIVE SPONSORS
    public function index()
    {
        $sponsors = Sponsor::where('status', 'active')
            ->latest()
            ->get()
            ->map(function ($item) {

                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'status' => $item->status,
                    'image_url' => url('upload/sponsors/' . $item->image),
                ];
            });

        return response()->json($sponsors);
    }

    // ADMIN GET ALL
    public function adminIndex()
    {
        $sponsors = Sponsor::latest()->get()->map(function ($item) {

            return [
                'id' => $item->id,
                'title' => $item->title,
                'status' => $item->status,
                'image_url' => url('upload/sponsors/' . $item->image),
            ];
        });

        return response()->json($sponsors);
    }

    // STORE
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'image' => 'required|image',
            'status' => 'required'
        ]);

        $file = $request->file('image');

        $filename = time() . '.' . $file->getClientOriginalExtension();

        $destination = public_path('upload/sponsors');

        if (!file_exists($destination)) {
            mkdir($destination, 0777, true);
        }

        $file->move($destination, $filename);

        $sponsor = Sponsor::create([
            'title' => $request->title,
            'image' => $filename,
            'status' => $request->status,
        ]);

        return response()->json([
            'success' => true,
            'data' => $sponsor
        ]);
    }

    // UPDATE
    public function update(Request $request, $id)
    {
        $sponsor = Sponsor::findOrFail($id);

        $request->validate([
            'title' => 'required',
            'status' => 'required'
        ]);

        if ($request->hasFile('image')) {

            $file = $request->file('image');

            $filename = time() . '.' . $file->getClientOriginalExtension();

            $destination = public_path('upload/sponsors');

            $file->move($destination, $filename);

            $sponsor->image = $filename;
        }

        $sponsor->title = $request->title;
        $sponsor->status = $request->status;

        $sponsor->save();

        return response()->json([
            'success' => true
        ]);
    }

    // DELETE
    public function destroy($id)
    {
        $sponsor = Sponsor::findOrFail($id);

        $sponsor->delete();

        return response()->json([
            'success' => true
        ]);
    }

    // STATUS UPDATE
    public function status($id)
    {
        $sponsor = Sponsor::findOrFail($id);

        $sponsor->status =
            $sponsor->status == 'active'
            ? 'inactive'
            : 'active';

        $sponsor->save();

        return response()->json([
            'success' => true,
            'status' => $sponsor->status
        ]);
    }
}