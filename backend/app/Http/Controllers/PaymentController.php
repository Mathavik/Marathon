<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\EventRegistration;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::all();
        return response()->json($payments, 200);
    }

   public function store(Request $request)
{
    $request->validate([
        'event_student_id' => 'required|exists:event_student,id',
        'payment_id' => 'required|string|unique:payments,payment_id',
        'payment_type' => 'required|string',
        'amount' => 'required|numeric',
        'payment_status' => 'required|string',
        'payment_date' => 'nullable|date',
        'transaction_id' => 'nullable|string',
    ]);

    $registration = DB::table('event_student')
        ->where('id', $request->event_student_id)
        ->first();

    if (!$registration) {
        return response()->json([
            'message' => 'Registration not found'
        ], 404);
    }

    if (!empty($registration->payment_ref_id)) {
        return response()->json([
            'message' => 'Payment already completed for this registration'
        ], 400);
    }

    DB::beginTransaction();

    try {
        $payment = Payment::create([
            'event_student_id' => $request->event_student_id,
            'payment_id' => $request->payment_id,
            'payment_type' => $request->payment_type,
            'amount' => $request->amount,
            'payment_status' => $request->payment_status,
            'payment_date' => $request->payment_date ?? now(),
            'transaction_id' => $request->transaction_id,
        ]);

        DB::table('event_student')
            ->where('id', $request->event_student_id)
            ->update([
                'payment_ref_id' => $payment->id,
                'updated_at' => now()
            ]);

        DB::commit();

        return response()->json([
            'message' => 'Payment created successfully',
            'payment' => $payment
        ], 201);

    } catch (\Exception $e) {
        DB::rollBack();

        return response()->json([
            'message' => 'Payment failed',
            'error' => $e->getMessage()
        ], 500);
    }
}

    public function show($id)
    {
        $payment = Payment::findOrFail($id);
        return response()->json($payment, 200);
    }

    public function update(Request $request, $id)
    {
        $payment = Payment::findOrFail($id);

        $request->validate([
            'payment_id' => 'sometimes|string|unique:payments,payment_id,' . $id,
            'payment_type' => 'sometimes|string',
            'amount' => 'sometimes|numeric',
            'payment_status' => 'sometimes|string',
            'payment_date' => 'nullable|date',
            'transaction_id' => 'nullable|string',
        ]);

        $payment->update($request->only([
            'payment_id',
            'payment_type',
            'amount',
            'payment_status',
            'payment_date',
            'transaction_id'
        ]));

        return response()->json([
            'message' => 'Payment updated successfully',
            'data' => $payment
        ], 200);
    }

    public function destroy($id)
    {
        $payment = Payment::findOrFail($id);
        $payment->delete();

        return response()->json([
            'message' => 'Payment deleted successfully'
        ], 200);
    }
}