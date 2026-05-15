<!DOCTYPE html>
<html>
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

/* 🔥 SAME DESIGN AS WINNER */
.logo {
    position: absolute;
    top: 5mm;
    left: 10mm;
    height: 70px;
}

.text {
    position: absolute;
    width: 100%;
    text-align: center;
    color: #222;
}

/* 🎯 CONTENT ALIGNMENT */
.presented {
    top: 75mm;
    font-size: 22px;
}

.name {
    top: 92mm;
    font-size: 48px;
    font-weight: bold;
    color: #b8860b;
    letter-spacing: 3px;
    text-transform: uppercase;
}

.desc {
    top: 115mm;
    font-size: 20px;
    width: 65%;
    left: 17.5%;
    line-height: 1.7;
}

.event {
    top: 140mm;
    font-size: 22px;
    font-weight: bold;
}

/* 📅 DATE */
.date {
    position: absolute;
    bottom: 20mm;
    left: 40mm;
    font-size: 20px;
}

/* ✍️ SAME SIGNATURE POSITION AS WINNER */
.sign-center {
    position: absolute;
    bottom: 25mm;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 16px;
}

.sign-right {
    position: absolute;
    bottom: 25mm;
    right: 40mm;
    text-align: center;
    font-size: 16px;
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

$is_team_event = $is_team_event ?? false;

$inlineImageSrc = function ($path) {
    if (!$path) return null;

    $fullPath = storage_path('app/public/' . $path);
    if (!file_exists($fullPath)) return null;

    $type = pathinfo($fullPath, PATHINFO_EXTENSION);
    $data = base64_encode(file_get_contents($fullPath));

    return 'data:image/' . $type . ';base64,' . $data;
};

$bgSrc = $inlineImageSrc($bg);
$logoSrc = $inlineImageSrc($logo);
$coordSrc = $inlineImageSrc($coord);
$principalSrc = $inlineImageSrc($principal);
@endphp

@foreach($students as $student)
<div class="container">

    <!-- ✅ Background -->
    @if($bgSrc)
        <img src="{{ $bgSrc }}" class="bg">
    @endif

    <!-- ✅ Logo (same as winner) -->
    @if($logoSrc)
        <img src="{{ $logoSrc }}" class="logo">
    @endif

    <!-- 🎯 CONTENT CHANGE ONLY -->
    <div class="text presented">
        Proudly Presented To
    </div>

    <div class="text name">
        {{ strtoupper($student->student_name) }}
    </div>

    <div class="text desc">
        @if($is_team_event)
            This certificate is proudly awarded to 
            <b>{{ strtoupper($student->student_name) }}</b>
            for participating as a member of the team 
            <b>{{ strtoupper($student->team_name ?? '') }}</b>
            in the event <b>{{ $student->event_name }}</b>.
            Your dedication and teamwork are highly appreciated.
        @else
            This certificate is proudly awarded to 
            <b>{{ strtoupper($student->student_name) }}</b> 
            for participating in the event 
            <b>{{ $student->event_name }}</b>.  
            Your dedication and participation are highly appreciated.
        @endif
    </div>

    <div class="text event">
        {{ $student->event_name }}
    </div>

    <div class="date">
        Date: {{ \Carbon\Carbon::parse($student->event_date)->format('d-m-Y') }}
    </div>

    <!-- ✅ Coordinator (same position) -->
    @if($coordSrc)
    <div class="sign-center">
        <img src="{{ $coordSrc }}" style="height:50px;"><br>
        Coordinator
    </div>
    @endif

    <!-- ✅ Principal (same position) -->
    @if($principalSrc)
    <div class="sign-right">
        <img src="{{ $principalSrc }}" style="height:50px;"><br>
        Principal
    </div>
    @endif

</div>
@endforeach

</body>
</html>