import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentPage: React.FC = () => {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const EVENT_NAME = "Marathon 2026";

  const ENTRY_FEE = 500;

  const handlePayment = async () => {

    try {

      setLoading(true);

      const studentId =
        localStorage.getItem("student_id");

      if (!studentId) {

        toast.error(
          "Please Login First ❌"
        );

        return;
      }

      // =========================
      // REGISTER EVENT
      // =========================
      const registerRes =
        await axios.post(
          "http://127.0.0.1:8000/api/register-event",
          {

            student_id: studentId,

            event_id: 1,

            event_name: EVENT_NAME,

            event_time:
              "2026-06-01 06:00:00",

            amount: ENTRY_FEE,
          }
        );

      const eventStudentId =
        registerRes.data.event_student_id;

      // =========================
      // CREATE ORDER
      // =========================
      const orderResponse =
        await axios.post(
          "http://127.0.0.1:8000/api/payment/create-order",
          {

            amount: ENTRY_FEE,

            event_student_id:
              eventStudentId,
          }
        );

      const order =
        orderResponse.data.order;

      console.log("ORDER =>", order);

      // =========================
      // RAZORPAY OPTIONS
      // =========================
      const options = {

        key: "rzp_test_Sqn4mJsAeDcrz8",

        amount: order.amount,

        currency: order.currency,

        name: "Marathon Event",

        description:
          "Marathon Registration Payment",

        image:
          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",

        order_id: order.id,

        handler: async function (
          response: any
        ) {

          console.log(
            "FULL RAZORPAY RESPONSE => ",
            response
          );

          try {

            const verifyRes =
              await axios.post(
                "http://127.0.0.1:8000/api/payment/verify",
                {

                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,
                }
              );

            console.log(
              verifyRes.data
            );

            toast.success(
              "Payment Successful ✅"
            );

            setTimeout(() => {

              navigate("/");

            }, 1500);

          } catch (error) {

            console.log(error);

            toast.error(
              "Payment Verification Failed ❌"
            );
          }
        },

        prefill: {

          name:
            localStorage.getItem(
              "student_name"
            ) || "",

          email:
            localStorage.getItem(
              "student_email"
            ) || "",

          contact:
            localStorage.getItem(
              "student_phone"
            ) || "",
        },

        theme: {

          color: "#001F3F",
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();

    } catch (error: any) {

      console.log(error);

      toast.error(

        error?.response?.data?.message ||

        "Payment Failed ❌"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white w-[400px] p-8 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-[#001F3F] mb-6">

          Marathon Payment

        </h1>

        <div className="space-y-4">

          <div className="flex justify-between">

            <span className="font-medium">
              Event
            </span>

            <span>
              {EVENT_NAME}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="font-medium">
              Entry Fee
            </span>

            <span>
              ₹{ENTRY_FEE}
            </span>

          </div>

        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full mt-8 bg-[#001F3F] hover:bg-[#003366] text-white py-3 rounded-xl font-semibold"
        >

          {loading
            ? "Processing..."
            : `Pay ₹${ENTRY_FEE}`}

        </button>

      </div>

    </div>
  );
};

export default PaymentPage;