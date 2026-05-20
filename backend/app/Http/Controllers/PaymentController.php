<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Razorpay\Api\Api;
use Razorpay\Api\Errors\SignatureVerificationError;
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

                'amount' => 'required|numeric|min:1',

                'event_student_id' => 'required'
            ]);

            $api = new Api(
                env('RAZORPAY_KEY'),
                env('RAZORPAY_SECRET')
            );

            // CREATE ORDER
            $order = $api->order->create([

                'receipt' => 'receipt_' . time(),

                'amount' => $request->amount * 100,

                'currency' => 'INR'
            ]);

            // SAVE PAYMENT
            $payment = Payment::create([

                'event_student_id' => $request->event_student_id,

                'order_id' => $order['id'],

                'amount' => $request->amount,

                'payment_status' => 'created'
            ]);

            return response()->json([

                'success' => true,

                'message' => 'Order Created Successfully',

                'order' => [
                    'id' => $order['id'],
                    'amount' => $order['amount'],
                    'currency' => $order['currency']
                ],

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

                'razorpay_order_id' => $request->razorpay_order_id,

                'razorpay_payment_id' => $request->razorpay_payment_id,

                'razorpay_signature' => $request->razorpay_signature
            ];

            // VERIFY SIGNATURE
            $api->utility->verifyPaymentSignature($attributes);

            // FIND PAYMENT
            $payment = Payment::where(
                'order_id',
                $request->razorpay_order_id
            )->first();

            if (!$payment) {

                return response()->json([

                    'success' => false,

                    'message' => 'Payment Record Not Found'

                ], 404);
            }

            // UPDATE PAYMENT
            $payment->update([

                'payment_id' => $request->razorpay_payment_id,

                'signature' => $request->razorpay_signature,

                'payment_status' => 'paid',

                'payment_type' => 'Razorpay',

                'transaction_id' => $request->razorpay_payment_id,

                'payment_date' => now()
            ]);

            return response()->json([

                'success' => true,

                'message' => 'Payment Successful',

                'data' => $payment
            ]);

        } catch (SignatureVerificationError $e) {

            return response()->json([

                'success' => false,

                'message' => 'Payment Signature Verification Failed'

            ], 400);

        } catch (\Exception $e) {

            return response()->json([

                'success' => false,

                'message' => $e->getMessage()

            ], 500);
        }
    }

    // =========================
    // GET ALL PAYMENTS
    // =========================
    public function getAllPayments()
    {
        try {

            $payments = Payment::latest()->get();

            return response()->json([

                'success' => true,

                'payments' => $payments
            ]);

        } catch (\Exception $e) {

            return response()->json([

                'success' => false,

                'message' => $e->getMessage()

            ], 500);
        }
    }

    // =========================
    // GET SINGLE PAYMENT
    // =========================
    public function getPayment($id)
    {
        try {

            $payment = Payment::find($id);

            if (!$payment) {

                return response()->json([

                    'success' => false,

                    'message' => 'Payment Not Found'

                ], 404);
            }

            return response()->json([

                'success' => true,

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
    // PAYMENT SUCCESS ONLY
    // =========================
    public function successfulPayments()
    {
        try {

            $payments = Payment::where(
                'payment_status',
                'paid'
            )->latest()->get();

            return response()->json([

                'success' => true,

                'payments' => $payments
            ]);

        } catch (\Exception $e) {

            return response()->json([

                'success' => false,

                'message' => $e->getMessage()

            ], 500);
        }
    }
}