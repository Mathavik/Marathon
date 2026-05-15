<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    // 📌 Get all categories
    public function index()
    {
        $categories = Category::with('events')->get();
        return response()->json($categories);
    }

    // 📌 Store new category
public function store(Request $request)
{
    $fileName = null;

    if ($request->hasFile('image')) {
        $file = $request->file('image');
        $fileName = time() . '_' . $file->getClientOriginalName();

        // ✅ same path as update
        $file->move(public_path('upload/catogories'), $fileName);
    }

    $category = Category::create([
        'name' => $request->name,
        'description' => $request->description,
        'image' => $fileName,
    ]);

    return response()->json([
        'message' => 'Category created successfully',
        'data' => $category
    ]);
}

    // 📌 Show single category
    public function show($id)
{
    $category = Category::with(['events' => function ($query) {
    $query->where('is_visible', 1);
}])->findOrFail($id);

    $category->events->map(function ($event) {

        $now = \Carbon\Carbon::now('Asia/Kolkata');

        $start = \Carbon\Carbon::parse($event->event_date . ' ' . $event->start_time);
        $end   = \Carbon\Carbon::parse($event->event_date . ' ' . $event->end_time);

        if ($now->lt($start)) {
            $event->status = 'upcoming';
        } elseif ($now->greaterThanOrEqualTo($start) && $now->lessThanOrEqualTo($end)) {
            $event->status = 'ongoing';
        } else {
            $event->status = 'completed';
        }

        return $event;
    });

    return response()->json($category);
}

    // 📌 Update category
public function update(Request $request, $id)
{
    $category = Category::findOrFail($id);

    // 🔥 IMPORTANT: add this
    $category->name = $request->name;
    $category->description = $request->description;

    // image optional
    if ($request->hasFile('image')) {
        $file = $request->file('image');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('upload/catogories'), $fileName);

        $category->image = $fileName;
    }

    $category->save();

    return response()->json([
        'message' => 'Category updated successfully',
        'data' => $category
    ]);
}


    

    // 📌 Delete category
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully'
        ]);
    }

public function bulkStore(Request $request)
{
    $categories = [];

    foreach ($request->categories as $cat) {
        $categories[] = Category::create([
            'name' => $cat['name'],
            'description' => $cat['description'] ?? null,
            'image' => $cat['image'] ?? null,
        ]);
    }

    return response()->json([
        'message' => 'Bulk categories created successfully',
        'data' => $categories
    ]);
}
    
}