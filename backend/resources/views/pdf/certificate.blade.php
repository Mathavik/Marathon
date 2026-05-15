<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">

<style>
@page { size: A4 landscape; margin: 0; }

body {
    margin: 0;
    padding: 0;
}

.container {
    position: relative;
    width: 297mm;
    height: 210mm; 
    font-family: 'Georgia', 'Times New Roman', serif;
}

.bg {
    position: absolute;
    width: 100%;
    height: 100%;
}

.text {
    position: absolute;
    width: 100%;
    text-align: center;
    color: #222;
}

.presented {
    top: 70mm;
    font-size: 24px;
}

.name {
    top: 85mm;
    font-size: 52px;
    font-weight: bold;
    color: #b8860b;
    letter-spacing: 3px;
    font-family: 'Cinzel', serif;
    text-transform: uppercase;
}

.desc {
    top: 105mm;
    font-size:22px;
    width: 65%;
    left: 17.5%;
    line-height: 1.6;
}

.prize {
    top: 150mm;
    font-size: 26px;
    font-weight: bold;
    color: #b8860b;
}

.date {
    position: absolute;
    bottom: 20mm;
    left: 40mm;
    font-size: 26px;
}

.sign-center {
    position: absolute;
    bottom: 25mm;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 18px;
}

.sign-right {
    position: absolute;
    bottom: 25mm;
    right: 40mm;
    text-align: center;
    font-size: 18px;
}

.logo {
    position: absolute;
    top: 5mm;
    left: 10mm;
    height: 70px; /* 👈 small logo */
}
</style>

</head>

<body>

@php
$setting = \App\Models\CertificateSetting::first();
$bg = $setting->background_image ?? null;
$logo = $setting->logo ?? null;
$coord = $setting->coordinator_signature ?? null;
$principal = $setting->principal_signature ?? null;

$inlineImageSrc = function ($path) {
    if (!$path) {
        return null;
    }

    $fullPath = storage_path('app/public/' . $path);

    if (!file_exists($fullPath)) {
        return null;
    }

    $type = pathinfo($fullPath, PATHINFO_EXTENSION);
    $data = base64_encode(file_get_contents($fullPath));

    return 'data:image/' . $type . ';base64,' . $data;
};

$bgSrc = $inlineImageSrc($bg);
$logoSrc = $inlineImageSrc($logo);
$coordSrc = $inlineImageSrc($coord);
$principalSrc = $inlineImageSrc($principal);
@endphp

<div class="container">

    <!-- ✅ Background -->
    @if($bgSrc)
        <img src="{{ $bgSrc }}" class="bg">
    @endif

    <!-- ✅ Logo -->
    @if($logoSrc)
        <img src="{{ $logoSrc }}" class="logo">
    @endif

    <!-- Text -->
    <div class="text presented">
        Proudly Presented To
    </div>

    <div class="text name">
        {{ strtoupper($student->name) }}
    </div>

    <div class="text desc">
        This certificate is proudly awarded to <b>{{ strtoupper($student->name) }}</b> 
        in recognition of outstanding performance and successful participation in 
        <b>{{ $event->name }}</b>.  
        Your dedication and excellence are appreciated.
    </div>

    @if(!empty($prize))
    <div class="text prize">
        {{ strtoupper($prize) }} PRIZE
    </div>
    @endif

    <div class="date">
        Date: {{ \Carbon\Carbon::parse($event->event_date)->format('d-m-Y') }}
    </div>

    <!-- ✅ Coordinator -->
    @if($coordSrc)
    <div class="sign-center">
        <img src="{{ $coordSrc }}" style="height:50px;"><br>
        Coordinator
    </div>
    @endif

    <!-- ✅ Principal -->
    @if($principalSrc)
    <div class="sign-right">
        <img src="{{ $principalSrc }}" style="height:50px;"><br>
        Principal
    </div>
    @endif

</div>

</body>
</html>