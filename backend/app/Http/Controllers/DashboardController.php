<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getChartData()
    {
        $data = DB::table('event_students')
            ->join('events', 'event_students.event_id', '=', 'events.id')
            ->select('events.name', DB::raw('count(*) as registrations'))
            ->groupBy('events.name')
            ->get();

        return response()->json($data);
    }

    public function getCounts()
    {
        $categories = DB::table('marathon_categories')->count();
        $registrations = DB::table('marathon_registrations')->count();
        $totalPayments = DB::table('payments')->count();
        $pendingPayments = DB::table('payments')
            ->whereIn('payment_status', ['pending', 'created'])
            ->count();

        return response()->json([
            'categories' => $categories,
            'registrations' => $registrations,
            'totalPayments' => $totalPayments,
            'pendingPayments' => $pendingPayments,
        ]);
    }
}
