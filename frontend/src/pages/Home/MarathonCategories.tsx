import React, { useEffect, useState } from "react";
import { Clock, Trophy, MapPin } from "lucide-react";
import axiosInstance from "../../axiosInstance";

interface MarathonData {
  title: string;
  subtitle: string;
  event_time: string;
  registration_fee: string;
  marathon_route: string;
  image: string;
}

const MarathonCategories = () => {
  const [data, setData] = useState<MarathonData | null>(null);

  // FETCH API
  useEffect(() => {
    fetchMarathonCategory();
  }, []);

  const fetchMarathonCategory = async () => {
    try {
      const response = await axiosInstance.get("/marathon-category");

      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching marathon category:", error);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-orange-950 text-white overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-orange-400 uppercase tracking-[4px] font-semibold mb-3">
            Marathon Event
          </p>

          <h2 className="text-5xl md:text-6xl font-black uppercase leading-tight">
            {data?.title}
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

                {/* Marathon Image */}
                <div className="mb-8">
                  <img
                    src={`http://127.0.0.1:8000/storage/${data?.image}`}
                    alt="Marathon Runner"
                    className="w-full h-[260px] object-cover rounded-3xl shadow-2xl border border-white/10"
                  />
                </div>

                <h3 className="text-4xl font-extrabold mb-5">
                  {data?.subtitle}
                </h3>

                <p className="text-gray-300 leading-relaxed mb-8">
                  Join the thrilling 10KM Marathon and challenge yourself with
                  energy, passion, and determination. Experience the ultimate
                  running atmosphere with exciting moments and unforgettable
                  memories.
                </p>
              </div>

              {/* Right Side */}
              <div className="bg-black/30 h-full p-10 md:p-14 flex flex-col justify-center gap-8">

                {/* Event Time */}
                <div className="flex items-center gap-5">
                  <div className="bg-orange-500/20 p-4 rounded-2xl">
                    <Clock className="text-orange-400" size={28} />
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm uppercase">
                      Event Time
                    </p>

                    <h4 className="text-2xl font-bold">
                      {data?.event_time}
                    </h4>
                  </div>
                </div>

                {/* Registration Fee */}
                <div className="flex items-center gap-5">
                  <div className="bg-orange-500/20 p-4 rounded-2xl">
                    <Trophy className="text-orange-400" size={28} />
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm uppercase">
                      Registration Fee
                    </p>

                    <h4 className="text-2xl font-bold text-orange-400">
                      ₹{data?.registration_fee}
                    </h4>
                  </div>
                </div>

                {/* Marathon Route */}
                <div className="flex items-center gap-5">
                  <div className="bg-orange-500/20 p-4 rounded-2xl">
                    <MapPin className="text-orange-400" size={28} />
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm uppercase">
                      Marathon Route
                    </p>

                    <h4 className="text-2xl font-bold">
                      {data?.marathon_route}
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