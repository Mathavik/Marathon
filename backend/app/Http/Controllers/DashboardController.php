<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getChartData()
    {
        $data = DB::table('event_student')
            ->join('events', 'event_student.event_id', '=', 'events.id')
            ->select('events.name', DB::raw('count(*) as registrations'))
            ->groupBy('events.name')
            ->get();

        return response()->json($data);
    }
    public function getCounts()
{
    $categories = DB::table('categories')->count();
    $events = DB::table('events')->count();
    $registrations = DB::table('event_student')->count();

    return response()->json([
        'categories' => $categories,
        'events' => $events,
        'registrations' => $registrations
    ]);
}
}