import React, { useEffect, useState } from "react";
import api from "../../api"; 
import { FaUserGraduate, FaInbox, FaIdBadge, FaFingerprint } from "react-icons/fa";

interface Registration {
  id: number;
  name: string;
  email: string;
  event_id: number;
}

const Registrations: React.FC = () => {
  const [data, setData] = useState<Registration[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.get("/registrations")
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching registrations:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-slate-200">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
            Student <span className="text-amber-500">Registrations</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">Monitor live student enrollments and event tracking.</p>
        </div>
        
        {/* STATS CHIP */}
        <div className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 border border-amber-500/20">
             {React.createElement(FaUserGraduate as any, { size: 18 })}
          </div>
          <div>
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest block leading-none mb-1">Total Entries</span>
            <span className="text-white text-2xl font-black block leading-none">
              {data.length.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-3xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 text-slate-500 uppercase text-[10px] font-black tracking-[0.2em] border-b border-slate-800">
                <th className="p-6 text-center w-24">REF ID</th>
                <th className="p-6">Student Information</th>
                <th className="p-6">Contact Node</th>
                <th className="p-6 text-center">Tracking Tag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-32 text-center">
                    <div className="flex flex-col items-center">
                       <div className="w-12 h-12 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                       <p className="text-slate-600 font-black uppercase text-[10px] tracking-[0.3em]">Accessing Database...</p>
                    </div>
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-6 text-center">
                      <div className="flex items-center justify-center gap-2 text-slate-600 font-mono text-xs group-hover:text-amber-500/50 transition-colors">
                        {React.createElement(FaFingerprint as any, { size: 10 })}
                        #{item.id}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-amber-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-amber-500/20 transition-all duration-300 border border-slate-700">
                          {React.createElement(FaUserGraduate as any, { size: 18 })}
                        </div>
                        <div>
                          <span className="text-white font-black uppercase text-base tracking-tight group-hover:text-amber-500 transition-colors">{item.name}</span>
                          <span className="block text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-0.5">Verified Candidate</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-3 text-slate-400 bg-slate-950/50 w-fit px-4 py-2 rounded-xl border border-slate-800 group-hover:border-slate-700 transition-all">
                        {React.createElement(FaInbox as any, { size: 12, className: "text-amber-500/50" })}
                        <span className="text-xs font-bold tracking-tight">{item.email}</span>
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <div className="inline-flex items-center gap-2 bg-amber-600/10 text-amber-500 border border-amber-500/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] shadow-sm group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                        {React.createElement(FaIdBadge as any, { size: 12 })}
                        EVT-TRACK-{item.event_id}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-32 text-center text-slate-400">
                    <div className="opacity-20 flex flex-col items-center">
                      {React.createElement(FaInbox as any, { size: 48, className: "mb-4" })}
                      <p className="font-black uppercase text-[10px] tracking-[0.4em]">Registry Empty</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER INFO */}
      <div className="mt-8 flex justify-between items-center px-4">
        <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">
          &copy; 2026 Competition Portal // Secure Registry
        </p>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Live System</span>
        </div>
      </div>
    </div>
  );
};

export default Registrations;