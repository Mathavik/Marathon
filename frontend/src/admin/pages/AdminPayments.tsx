import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

interface Payment {
  id: number;
  event_student_id: string;
  order_id: string;
  payment_id: string;
  transaction_id: string;
  payment_type: string;
  amount: number;
  payment_status: string;
  payment_date: string;
  created_at: string;
}

const AdminPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH PAYMENTS
  const fetchPayments = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        "/successful-payments"
      );

      setPayments(response.data.payments);

    } catch (error) {

      console.error("Error Fetching Payments:", error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6 md:p-8">
      
      {/* HEADER */}
      <div className="rounded-[32px] border border-orange-500/10 bg-gradient-to-br from-orange-500/10 via-slate-900/80 to-black/80 p-8 shadow-[0_30px_80px_rgba(255,115,0,0.08)] mb-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>
           

            

            <p className="text-slate-400 mt-4 text-sm md:text-base">
              View all successful marathon payment transactions.
            </p>
          </div>

          <button
            onClick={fetchPayments}
            className="rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3 text-sm font-black uppercase tracking-[0.15em] text-slate-950 shadow-[0_20px_40px_rgba(249,115,22,0.25)] transition-all duration-300 hover:scale-[1.03]"
          >
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>

        </div>

        {/* STATS */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="rounded-3xl border border-orange-500/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">
              Total Payments
            </p>

            <h2 className="text-4xl font-black text-white">
              {payments.length}
            </h2>
          </div>

          <div className="rounded-3xl border border-orange-500/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">
              Status
            </p>

            <h2 className="text-4xl font-black text-orange-400">
              {loading ? "Loading" : "Live"}
            </h2>
          </div>

          <div className="rounded-3xl border border-orange-500/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">
              Last Updated
            </p>

            <h2 className="text-xl font-black text-white">
              {new Date().toLocaleDateString()}
            </h2>
          </div>

        </div>
      </div>

      {/* PAYMENTS TABLE */}
      <div className="rounded-[32px] border border-slate-800 bg-slate-950/90 shadow-[0_30px_60px_rgba(0,0,0,0.3)] overflow-hidden">

        {loading ? (

          <div className="p-20 text-center text-slate-500 animate-pulse text-lg">
            Loading Payments...
          </div>

        ) : payments.length === 0 ? (

          <div className="p-20 text-center text-red-400 text-lg">
            No Payments Found
          </div>

        ) : (

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-6">

            {payments.map((payment) => (

              <div
                key={payment.id}
                className="rounded-3xl border border-orange-500/10 bg-gradient-to-br from-slate-900 to-black p-6 hover:border-orange-500/30 transition-all duration-300 hover:scale-[1.01]"
              >

                {/* TOP */}
                <div className="flex items-center justify-between mb-6">

                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-2">
                      Payment ID
                    </p>

                    <h2 className="text-lg font-black text-white break-all">
                      {payment.payment_id}
                    </h2>
                  </div>

                  <span className="rounded-full bg-green-500/15 px-4 py-2 text-xs font-bold uppercase tracking-wide text-green-300 border border-green-500/20">
                    {payment.payment_status}
                  </span>

                </div>

                {/* DETAILS */}
                <div className="space-y-4">

                  <div className="flex justify-between gap-4 border-b border-slate-800 pb-3">
                    <span className="text-slate-400">
                      Student ID
                    </span>

                    <span className="font-semibold text-white">
                      {payment.event_student_id}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 border-b border-slate-800 pb-3">
                    <span className="text-slate-400">
                      Order ID
                    </span>

                    <span className="font-semibold text-white break-all text-right">
                      {payment.order_id}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 border-b border-slate-800 pb-3">
                    <span className="text-slate-400">
                      Transaction ID
                    </span>

                    <span className="font-semibold text-white break-all text-right">
                      {payment.transaction_id}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 border-b border-slate-800 pb-3">
                    <span className="text-slate-400">
                      Payment Type
                    </span>

                    <span className="font-semibold text-orange-300 uppercase">
                      {payment.payment_type}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 border-b border-slate-800 pb-3">
                    <span className="text-slate-400">
                      Amount
                    </span>

                    <span className="font-black text-green-400 text-xl">
                      ₹ {payment.amount}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 border-b border-slate-800 pb-3">
                    <span className="text-slate-400">
                      Payment Date
                    </span>

                    <span className="font-semibold text-white">
                      {payment.payment_date}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-400">
                      Created At
                    </span>

                    <span className="font-semibold text-slate-300 text-right">
                      {new Date(payment.created_at).toLocaleString()}
                    </span>
                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminPayments;