import React, { useEffect, useState } from "react";
import axios from "axios";

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

  // FETCH SUCCESSFUL PAYMENTS
  const fetchPayments = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/successful-payments"
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
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Successful Payments
      </h1>

      {loading ? (

        <div className="text-center text-lg">
          Loading Payments...
        </div>

      ) : payments.length === 0 ? (

        <div className="text-center text-red-500 text-lg">
          No Payments Found
        </div>

      ) : (

        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">

          <table className="min-w-full border border-gray-200 text-black">

            <thead className="bg-black text-white">

              <tr>
                <th className="px-4 py-3 border">
                  ID
                </th>

                <th className="px-4 py-3 border">
                  Student ID
                </th>

                <th className="px-4 py-3 border">
                  Order ID
                </th>

                <th className="px-4 py-3 border">
                  Payment ID
                </th>

                <th className="px-4 py-3 border">
                  Transaction ID
                </th>

                <th className="px-4 py-3 border">
                  Amount
                </th>

                <th className="px-4 py-3 border">
                  Payment Type
                </th>

                <th className="px-4 py-3 border">
                  Status
                </th>

                <th className="px-4 py-3 border">
                  Payment Date
                </th>
              </tr>

            </thead>

            <tbody>

              {payments.map((payment) => (

                <tr
                  key={payment.id}
                  className="text-center hover:bg-gray-100"
                >

                  <td className="px-4 py-3 border">
                    {payment.id}
                  </td>

                  <td className="px-4 py-3 border">
                    {payment.event_student_id}
                  </td>

                  <td className="px-4 py-3 border">
                    {payment.order_id}
                  </td>

                  <td className="px-4 py-3 border">
                    {payment.payment_id}
                  </td>

                  <td className="px-4 py-3 border">
                    {payment.transaction_id}
                  </td>

                  <td className="px-4 py-3 border font-semibold text-green-600">
                    ₹ {payment.amount}
                  </td>

                  <td className="px-4 py-3 border">
                    {payment.payment_type}
                  </td>

                  <td className="px-4 py-3 border">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {payment.payment_status}
                    </span>
                  </td>

                  <td className="px-4 py-3 border">
                    {payment.payment_date}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}
    </div>
  );
};

export default AdminPayments;