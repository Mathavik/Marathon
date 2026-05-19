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

  const [loading, setLoading] = useState(false);

  const EVENT_NAME = "Marathon 2026";

  const ENTRY_FEE = 500;

  const handlePayment = async () => {

    try {

      setLoading(true);

      const studentId =
        localStorage.getItem("student_id");

      if (!studentId) {

        toast.error("Please Login First ❌");

        return;
      }

      // =========================
      // REGISTER EVENT
      // =========================
      const registerRes = await axios.post(
        "http://127.0.0.1:8000/api/register-event",
        {
          student_id: studentId,
          event_id: 1,
          event_name: EVENT_NAME,
          event_time: "2026-06-01 06:00:00",
          amount: ENTRY_FEE,
        }
      );

      const eventStudentId =
        registerRes.data.event_student_id;

      // =========================
      // CREATE ORDER
      // =========================
      const orderResponse = await axios.post(
        "http://127.0.0.1:8000/api/payment/create-order",
        {
          amount: ENTRY_FEE,
          event_student_id: eventStudentId,
        }
      );

      const order =
        orderResponse.data.order;

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

          try {

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

            toast.success("Payment Successful ✅");

            // Navigate to home immediately and add a fallback full reload
            try {
              navigate("/");
            } catch (err) {
              // ignore
            }

            setTimeout(() => {
              try {
                window.location.href = "/";
              } catch (e) {
                // ignore
              }
            }, 1000);

          } catch (error) {

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
          color: "#f97316",
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

<div className="min-h-screen bg-black text-white px-4 py-4 flex items-center justify-center">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-3xl border border-orange-500/20 shadow-2xl bg-[#0f172a]">

        {/* LEFT SIDE */}
<div className="relative bg-gradient-to-br from-black via-[#111827] to-[#1e293b] p-6 lg:p-10 flex flex-col justify-center">
          {/* ORANGE BLUR */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full"></div>

          <div className="relative z-10">

            <div className="flex items-center gap-4 mb-6">

              <div className="bg-orange-500 text-white p-4 rounded-2xl text-3xl">
                🏃
              </div>

              <div>

                <h1 className="text-4xl font-black">
                  MARATHON
                  <span className="text-orange-500">
                    {" "}2026
                  </span>
                </h1>

                <p className="text-gray-400 mt-1">
                  Run Beyond Limits
                </p>

              </div>

            </div>

           

            <p className="text-gray-400 leading-7 mb-6">
              Secure your participation in the biggest marathon event of 2026.
              Pay your registration fee and confirm your runner slot instantly.
            </p>

            {/* FEATURES */}
            <div className="space-y-3">

              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">

                <div className="bg-orange-500/20 text-orange-500 text-2xl p-3 rounded-xl">
                  🎟
                </div>

                <div>

                  <h4 className="font-semibold text-lg">
                    Instant Confirmation
                  </h4>

                  <p className="text-gray-400 text-sm">
                    Your marathon slot gets confirmed immediately.
                  </p>

                </div>

              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">

                <div className="bg-orange-500/20 text-orange-500 text-2xl p-3 rounded-xl">
                  🔒
                </div>

                <div>

                  <h4 className="font-semibold text-lg">
                    Secure Payment
                  </h4>

                  <p className="text-gray-400 text-sm">
                    100% secure payment powered by Razorpay.
                  </p>

                </div>

              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">

                <div className="bg-orange-500/20 text-orange-500 text-2xl p-3 rounded-xl">
                  🏅
                </div>

                <div>

                  <h4 className="font-semibold text-lg">
                    Official Marathon Access
                  </h4>

                  <p className="text-gray-400 text-sm">
                    Participate in India's most exciting marathon challenge.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="bg-[#0b1120] p-6 lg:p-8 flex items-center">

          <div className="w-full">

            <p className="text-orange-500 uppercase tracking-[4px] font-semibold mb-3">
              Payment Summary
            </p>

            

            {/* CARD */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

              <div className="flex items-center justify-between pb-5 border-b border-white/10">

                <div>

                  <h3 className="text-2xl font-bold">
                    {EVENT_NAME}
                  </h3>

                  <p className="text-gray-400 mt-1">
                    Marathon Event Registration
                  </p>

                </div>

                <div className="bg-orange-500/20 text-orange-500 px-4 py-2 rounded-xl font-semibold">
                  LIVE
                </div>

              </div>

              {/* DETAILS */}
              <div className="space-y-5 mt-8">

                <div className="flex justify-between items-center">

                  <span className="text-gray-400">
                    Registration Fee
                  </span>

                  <span className="text-xl font-semibold">
                    ₹{ENTRY_FEE}
                  </span>

                </div>

                <div className="flex justify-between items-center">

                  <span className="text-gray-400">
                    Platform Fee
                  </span>

                  <span className="text-xl font-semibold">
                    ₹0
                  </span>

                </div>

                <div className="border-t border-white/10 pt-5 flex justify-between items-center">

                  <span className="text-xl font-bold">
                    Total Amount
                  </span>

                  <span className="text-3xl font-black text-orange-500">
                    ₹{ENTRY_FEE}
                  </span>

                </div>

              </div>

              {/* BUTTON */}
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full mt-10 bg-orange-500 hover:bg-orange-600 transition-all duration-300 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-orange-500/20"
              >

                {loading
                  ? "Processing Payment..."
                  : `Pay ₹${ENTRY_FEE}`}

              </button>

              <p className="text-center text-gray-500 text-sm mt-5">
                Secure payment gateway powered by Razorpay
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PaymentPage;