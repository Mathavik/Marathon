<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CertificateSetting;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    // 📄 VIEW (show current settings)
public function index()
{
    return response()->json(CertificateSetting::first());
}

    // 💾 STORE (create / update same)
public function store(Request $request)
{
    $setting = CertificateSetting::first();

    // 🆕 FIRST TIME CREATE
    if (!$setting) {

        $setting = new CertificateSetting();

        // ✅ FIRST TIME ONLY BG SAVE
        if ($request->hasFile('background')) {
            $setting->background_image = $request->file('background')->store('certificates', 'public');
        }

        if ($request->hasFile('logo')) {
            $setting->logo = $request->file('logo')->store('certificates', 'public');
        }
if ($request->hasFile('principal_sign')) {
    $file = $request->file('principal_sign');
    $path = $file->store('certificates', 'public');

    $setting->principal_signature = $path;
}

      if ($request->hasFile('coordinator_sign')) {
    $file = $request->file('coordinator_sign');
    $path = $file->store('certificates', 'public');

    $setting->coordinator_signature = $path;
}

        $setting->save();

        return response()->json([
            'success' => 'Created First Time'
        ]);
    }

    // 🔒 BG UPDATE BLOCK
    // ❌ background skip pannrom

    // ✅ UPDATE ONLY THESE
    if ($request->hasFile('logo')) {
        $setting->logo = $request->file('logo')->store('certificates', 'public');
    }

    if ($request->hasFile('principal_sign')) {
        $setting->principal_signature = $request->file('principal_sign')->store('certificates', 'public');
    }

    if ($request->hasFile('coordinator_sign')) {
        $setting->coordinator_signature = $request->file('coordinator_sign')->store('certificates', 'public');
    }

    $setting->save();

    return response()->json([
        'success' => 'Updated Successfully'
    ]);
}
    // ✏️ EDIT
    public function edit()
    {
        $setting = CertificateSetting::first();
        return view('admin.certificate.edit', compact('setting'));
    }

    // 🔄 UPDATE
    public function update(Request $request)
    {
        $setting = CertificateSetting::first();

        if (!$setting) {
            return back()->with('error', 'No data found');
        }

        if ($request->hasFile('background')) {
            $setting->background_image = $request->file('background')->store('certificates', 'public');
        }

        if ($request->hasFile('principal_sign')) {
            $setting->principal_signature = $request->file('principal_sign')->store('certificates', 'public');
        }

        if ($request->hasFile('coordinator_sign')) {
            $setting->coordinator_signature = $request->file('coordinator_sign')->store('certificates', 'public');
        }

        if ($request->hasFile('logo')) {
            $setting->logo = $request->file('logo')->store('certificates', 'public');
        }

        $setting->save();

        return back()->with('success', 'Updated Successfully');
    }

    // 🗑 DELETE (remove all settings)
    public function destroy()
    {
        $setting = CertificateSetting::first();

        if ($setting) {
            $setting->delete();
        }

        return back()->with('success', 'Deleted Successfully');
    }
}