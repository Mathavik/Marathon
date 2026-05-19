import React from "react";
import { Clock, Trophy, MapPin } from "lucide-react";

const MarathonCategories = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-orange-950 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-orange-400 uppercase tracking-[4px] font-semibold mb-3">
            Marathon Event
          </p>

          <h2 className="text-5xl md:text-6xl font-black uppercase leading-tight">
            10KM Marathon
          </h2>

          <div className="w-32 h-1 bg-orange-500 mx-auto mt-5 rounded-full"></div>
        </div>

        {/* Card */}
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-white/10 border border-white/20 backdrop-blur-xl rounded-[35px] overflow-hidden shadow-[0_20px_80px_rgba(255,115,0,0.25)]">

            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full"></div>

            <div className="relative z-10 grid md:grid-cols-2 items-center">
              
              {/* Left Side */}
              <div className="p-10 md:p-14">
                <div className="text-[90px] mb-6">🏃</div>

                <h3 className="text-4xl font-extrabold mb-5">
                  Run Beyond Limits
                </h3>

                <p className="text-gray-300 leading-relaxed mb-8">
                  Join the thrilling 10KM Marathon and challenge yourself with
                  energy, passion, and determination. Experience the ultimate
                  running atmosphere with exciting moments and unforgettable
                  memories.
                </p>

                <button className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:scale-105">
                  Register Now
                </button>
              </div>

              {/* Right Side */}
              <div className="bg-black/30 h-full p-10 md:p-14 flex flex-col justify-center gap-8">
                
                <div className="flex items-center gap-5">
                  <div className="bg-orange-500/20 p-4 rounded-2xl">
                    <Clock className="text-orange-400" size={28} />
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm uppercase">
                      Event Time
                    </p>
                    <h4 className="text-2xl font-bold">
                      Morning 9:00 AM
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="bg-orange-500/20 p-4 rounded-2xl">
                    <Trophy className="text-orange-400" size={28} />
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm uppercase">
                      Registration Fee
                    </p>
                    <h4 className="text-2xl font-bold text-orange-400">
                      ₹1500
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="bg-orange-500/20 p-4 rounded-2xl">
                    <MapPin className="text-orange-400" size={28} />
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm uppercase">
                      Marathon Route
                    </p>
                    <h4 className="text-2xl font-bold">
                      City Central Track
                    </h4>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarathonCategories;