import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdsDisplay = () => {
  const [ads, setAds] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      // Backend URL correct-ah irukanum
      const res = await axios.get("http://localhost:8000/api/ads/active");
      setAds(res.data);
    } catch (err) {
      console.error("Ads fetch error", err);
    }
  };

  if (ads.length === 0) return null;

  return (
    <div className="w-full bg-slate-950 py-4">
      <div className="max-w-7xl mx-auto px-4">
        {ads.map((ad) => (
          <div 
            key={ad.id} 
            className="relative group overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-r from-slate-900 to-slate-800 shadow-2xl mb-8"
          >
            <div className="flex flex-col md:flex-row items-center">
              
              {/* IMAGE SECTION */}
              <div className="w-full md:w-1/3 h-64 overflow-hidden bg-slate-800">
                <img
                  // FIX: Removed /storage/ and using direct path from DB
                  src={`http://localhost:8000/${ad.image}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt={ad.title}
                  onError={(e) => {
                    // Fallback image if path fails
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/600x400?text=Event+Banner";
                  }}
                />
              </div>

              {/* CONTENT SECTION */}
              <div className="p-8 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="animate-pulse w-2 h-2 bg-amber-500 rounded-full"></span>
                  <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">New Update</span>
                </div>
                
                <h2 className="text-3xl font-black text-white mb-2 tracking-tight uppercase">
                  {ad.title}
                </h2>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                  {ad.description}
                </p>

                <div className="flex flex-wrap items-center gap-6">
                  {/* Event Date Badge */}
                  <div className="bg-amber-500/10 border border-amber-500/20 px-5 py-2 rounded-2xl">
                    <p className="text-[10px] text-amber-500 uppercase font-black tracking-tighter">Event Date</p>
                    <p className="text-white font-bold">{ad.event_date}</p>
                  </div>
                  
                  {/* Action Button */}
                  <button 
                    onClick={() => navigate("/register")} 
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-3 rounded-2xl font-black transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] uppercase tracking-wider text-sm"
                  >
                    Join Now
                  </button>
                </div>
              </div>
              
            </div>
            
            {/* Subtle Gradient Overlay for Premium Look */}
            <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-3xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdsDisplay;