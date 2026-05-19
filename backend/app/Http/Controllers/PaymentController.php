<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Razorpay\Api\Api;
use App\Models\Payment;

class PaymentController extends Controller
{
    // =========================
    // CREATE ORDER
    // =========================
    public function createOrder(Request $request)
    {
        try {

            $request->validate([

                'amount' => 'required',

                'event_student_id' => 'required'
            ]);

            $api = new Api(

                env('RAZORPAY_KEY'),

                env('RAZORPAY_SECRET')
            );

            // CREATE RAZORPAY ORDER
            $order = $api->order->create([

                'receipt' => 'receipt_' . time(),

                'amount' => $request->amount * 100,

                'currency' => 'INR'
            ]);

            // SEND ONLY NEEDED DATA
            $orderData = [

                'id' => $order['id'],

                'amount' => $order['amount'],

                'currency' => $order['currency']
            ];

            // STORE IN DATABASE
            $payment = Payment::create([

                'event_student_id' =>
                    $request->event_student_id,

                'order_id' => $order['id'],

                'amount' => $request->amount,

                'payment_status' => 'created'
            ]);

            return response()->json([

                'success' => true,

                'order' => $orderData,

                'payment' => $payment
            ]);

        } catch (\Exception $e) {

            return response()->json([

                'success' => false,

                'message' => $e->getMessage()

            ], 500);
        }
    }

    // =========================
    // VERIFY PAYMENT
    // =========================
    public function verifyPayment(Request $request)
    {
        try {

            $request->validate([

                'razorpay_order_id' => 'required',

                'razorpay_payment_id' => 'required',

                'razorpay_signature' => 'required'
            ]);

            $api = new Api(

                env('RAZORPAY_KEY'),

                env('RAZORPAY_SECRET')
            );

            $attributes = [

                'razorpay_order_id' =>
                    $request->razorpay_order_id,

                'razorpay_payment_id' =>
                    $request->razorpay_payment_id,

                'razorpay_signature' =>
                    $request->razorpay_signature,
            ];

            // VERIFY SIGNATURE
            $api->utility->verifyPaymentSignature(
                $attributes
            );

            // UPDATE DATABASE
            Payment::where(
                'order_id',
                $request->razorpay_order_id
            )->update([

                'payment_id' =>
                    $request->razorpay_payment_id,

                'signature' =>
                    $request->razorpay_signature,

                'payment_status' => 'paid',

                'payment_type' => 'Razorpay',

                'transaction_id' =>
                    $request->razorpay_payment_id,

                'payment_date' => now()
            ]);

            return response()->json([

                'success' => true,

                'message' =>
                    'Payment Successful'
            ]);

        } catch (\Exception $e) {

            return response()->json([

                'success' => false,

                'message' => $e->getMessage()

            ], 500);
        }
    }
}