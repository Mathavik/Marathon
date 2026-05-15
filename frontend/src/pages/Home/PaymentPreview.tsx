import React from 'react';
import { CheckCircle } from 'lucide-react';

const PaymentPreview = () => {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-black text-center mb-12 uppercase tracking-wide">
          Payment Preview
        </h2>
        <div className="max-w-md mx-auto bg-gray-800 rounded-2xl p-6 shadow-2xl">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-2">Pay ₹1500</h3>
            <p className="text-gray-400">10KM Marathon Registration</p>
          </div>
          <div className="flex justify-center mb-6">
            <img src="https://via.placeholder.com/150x150?text=QR+Code" alt="QR Code" className="rounded-lg" />
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button className="bg-blue-600 px-4 py-2 rounded-lg font-semibold">PhonePe</button>
            <button className="bg-green-600 px-4 py-2 rounded-lg font-semibold">Google Pay</button>
            <button className="bg-blue-500 px-4 py-2 rounded-lg font-semibold">Paytm</button>
          </div>
          <div className="bg-green-600 p-4 rounded-lg flex items-center gap-2 mb-4">
            <CheckCircle size={24} />
            <span className="font-semibold">Payment Successful!</span>
          </div>
          <div className="text-sm text-gray-400">
            Transaction ID: TXN123456789
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPreview;