import React from 'react';
import { Clock, Award } from 'lucide-react';

const MarathonCategories = () => {
  const categories = [
    {
      name: '3KM Fun Run',
      price: '₹500',
      time: 'Morning 7:00 AM',
      icon: '🏃‍♂️',
    },
    {
      name: '5KM Marathon',
      price: '₹1000',
      time: 'Morning 8:00 AM',
      icon: '🏃‍♀️',
    },
    {
      name: '10KM Marathon',
      price: '₹1500',
      time: 'Morning 9:00 AM',
      icon: '🏃',
    },
    {
      name: '21KM Half Marathon',
      price: '₹2000',
      time: 'Morning 10:00 AM',
      icon: '🏃‍♂️',
    },
  ];

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-black text-center mb-12 uppercase tracking-wide">
          Marathon Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div key={cat.name} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="text-6xl mb-4">{cat.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-orange-400" />
                <span className="text-gray-300">{cat.time}</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Award size={16} className="text-orange-400" />
                <span className="text-orange-400 font-bold">{cat.price}</span>
              </div>
              <button className="w-full bg-orange-500 px-4 py-2 rounded-full font-semibold text-white hover:bg-orange-600 transition">
                Register
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarathonCategories;