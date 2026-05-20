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

  student?: {
    id: number;
    name: string;
    email: string;
  };
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

    <div className="min-h-screen bg-[#050816] text-white p-4 md:p-8">

      {/* HEADER */}
      <div className="rounded-[32px] border border-orange-500/10 bg-gradient-to-br from-orange-500/10 via-slate-900/80 to-black/80 p-6 md:p-8 shadow-[0_30px_80px_rgba(255,115,0,0.08)] mb-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

           

            <p className="text-slate-400 mt-3 text-sm md:text-base">
              View all successful marathon payment transactions.
            </p>

          </div>

          <button
            onClick={fetchPayments}
            className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-xs md:text-sm font-black uppercase tracking-[0.15em] text-slate-950 shadow-[0_20px_40px_rgba(249,115,22,0.25)] transition-all duration-300 hover:scale-[1.03]"
          >
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>

        </div>

        {/* STATS */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="rounded-3xl border border-orange-500/10 bg-white/5 p-5 md:p-6">

            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">
              Total Payments
            </p>

            <h2 className="text-3xl md:text-4xl font-black text-white">
              {payments.length}
            </h2>

          </div>

          <div className="rounded-3xl border border-orange-500/10 bg-white/5 p-5 md:p-6">

            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">
              Status
            </p>

            <h2 className="text-3xl md:text-4xl font-black text-orange-400">
              {loading ? "Loading" : "Live"}
            </h2>

          </div>

          <div className="rounded-3xl border border-orange-500/10 bg-white/5 p-5 md:p-6">

            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">
              Last Updated
            </p>

            <h2 className="text-lg md:text-xl font-black text-white">
              {new Date().toLocaleDateString()}
            </h2>

          </div>

        </div>

      </div>

      {/* TABLE */}
      <div className="rounded-[32px] border border-orange-500/10 bg-slate-950/90 shadow-[0_30px_60px_rgba(0,0,0,0.3)] overflow-hidden">

        {loading ? (

          <div className="p-16 text-center text-slate-500 text-lg animate-pulse">
            Loading Payments...
          </div>

        ) : payments.length === 0 ? (

          <div className="p-16 text-center text-red-400 text-lg">
            No Payments Found
          </div>

        ) : (

          <table className="w-full">

            {/* TABLE HEADER */}
            <thead className="bg-orange-500/10 border-b border-orange-500/10">

              <tr>

                <th className="px-3 md:px-6 py-4 md:py-5 text-left text-[10px] md:text-xs uppercase tracking-[0.15em] text-orange-300 font-bold">
                  Student
                </th>

                <th className="px-3 md:px-6 py-4 md:py-5 text-left text-[10px] md:text-xs uppercase tracking-[0.15em] text-orange-300 font-bold">
                  Payment Type
                </th>

                <th className="px-3 md:px-6 py-4 md:py-5 text-left text-[10px] md:text-xs uppercase tracking-[0.15em] text-orange-300 font-bold">
                  Amount
                </th>

                <th className="px-3 md:px-6 py-4 md:py-5 text-left text-[10px] md:text-xs uppercase tracking-[0.15em] text-orange-300 font-bold">
                  Status
                </th>

                <th className="px-3 md:px-6 py-4 md:py-5 text-left text-[10px] md:text-xs uppercase tracking-[0.15em] text-orange-300 font-bold">
                  Date
                </th>

              </tr>

            </thead>

            {/* TABLE BODY */}
            <tbody>

              {payments.map((payment, index) => (

                <tr
                  key={payment.id}
                  className={`border-b border-slate-800 hover:bg-orange-500/5 transition-all duration-300 ${
                    index % 2 === 0
                      ? "bg-slate-900/40"
                      : "bg-black/30"
                  }`}
                >

                  {/* STUDENT */}
                  <td className="px-3 md:px-6 py-4 md:py-5">

                    <div>

                      <p className="font-semibold text-white text-xs md:text-sm">
                        {payment.student?.name || "No Name"}
                      </p>

                      <p className="text-[10px] md:text-xs text-slate-500 mt-1">
                        ID : {payment.event_student_id}
                      </p>

                    </div>

                  </td>

                  {/* PAYMENT TYPE */}
                  <td className="px-3 md:px-6 py-4 md:py-5">

                    <span className="rounded-full bg-orange-500/10 border border-orange-500/20 px-2 md:px-4 py-1 md:py-2 text-[10px] md:text-xs font-bold uppercase tracking-wide text-orange-300">
                      {payment.payment_type}
                    </span>

                  </td>

                  {/* AMOUNT */}
                  <td className="px-3 md:px-6 py-4 md:py-5">

                    <p className="text-sm md:text-lg font-black text-green-400">
                      ₹ {payment.amount}
                    </p>

                  </td>

                  {/* STATUS */}
                  <td className="px-3 md:px-6 py-4 md:py-5">

                    <span className="rounded-full bg-green-500/15 border border-green-500/20 px-2 md:px-4 py-1 md:py-2 text-[10px] md:text-xs font-bold uppercase tracking-wide text-green-300">
                      {payment.payment_status}
                    </span>

                  </td>

                  {/* PAYMENT DATE */}
                  <td className="px-3 md:px-6 py-4 md:py-5">

                    <p className="text-[10px] md:text-sm text-slate-300">
                      {payment.payment_date}
                    </p>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>

  );
};

export default AdminPayments;