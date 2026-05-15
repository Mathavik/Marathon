<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Advertisement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class AdvertisementController extends Controller
{
    // ✅ CREATE AD
    public function store(Request $request)
    {
        $data = $request->all();
        $data['is_active'] = $request->is_active == 'true' || $request->is_active == '1' ? 1 : 0;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            // public/upload/ads folder-kulla save pannum
            $file->move(public_path('upload/ads'), $filename);
            $data['image'] = 'upload/ads/' . $filename;
        }

        $ad = Advertisement::create($data);
        return response()->json($ad);
    }

    // ✅ GET ACTIVE ADS
    public function activeAds()
    {
        $ads = Advertisement::orderBy('event_date', 'asc')->get();
        return response()->json($ads);
    }

    // ✅ UPDATE AD
    public function update(Request $request, $id)
    {
        $ad = Advertisement::findOrFail($id);
        $data = $request->all();

        // Boolean conversion
        $data['is_active'] = ($request->is_active == 'true' || $request->is_active == '1') ? 1 : 0;

        if ($request->hasFile('image')) {
            // Old image-ah delete panna intha logic (Optional)
            if ($ad->image && File::exists(public_path($ad->image))) {
                File::delete(public_path($ad->image));
            }

            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('upload/ads'), $filename);
            $data['image'] = 'upload/ads/' . $filename;
        } else {
            // Puthu image illana, pazhaya image path-aye maintain pannum
            $data['image'] = $ad->image;
        }

        $ad->update($data);

        return response()->json([
            'message' => 'Updated Successfully',
            'data' => $ad
        ]);
    }

    // ✅ DELETE AD
    public function destroy($id)
    {
        $ad = Advertisement::findOrFail($id);
        
        // Image file-aiyum folder-la irunthu remove panna:
        if ($ad->image && File::exists(public_path($ad->image))) {
            File::delete(public_path($ad->image));
        }

        $ad->delete();
        return response()->json(['message' => 'Deleted Successfully']);
    }
}