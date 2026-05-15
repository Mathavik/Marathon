import { useEffect, useState } from "react";
import api from "../../api";
import { FaTrophy, FaSearch, FaSchool, FaPaperPlane } from "react-icons/fa";
import React from "react";

type Student = {
  id: number;
  name: string;
  email: string;
  school_name: string;
};

export default function Winners() {
  const [eventId, setEventId] = useState("");
  const [students, setStudents] = useState<any>({});
  const [winners, setWinners] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    if (!eventId) return;
    try {
      const res = await api.get(`/event/${eventId}/students`);
      setStudents(res.data);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to load students");
    }
  };

  const handleSelect = (studentId: number, prize: string) => {
    const exists = winners.find(w => w.student_id === studentId && w.prize === prize);
    if (exists) {
      setWinners(winners.filter(w => !(w.student_id === studentId && w.prize === prize)));
    } else {
      const updated = winners.filter(w => w.student_id !== studentId);
      updated.push({ student_id: studentId, prize });
      setWinners(updated);
    }
  };

  const submitWinners = async () => {
    if (!eventId || winners.length === 0) {
      alert("⚠️ Enter event ID and select at least one winner");
      return;
    }
    setLoading(true);
    try {
      await api.post("/event/assign-winners", { event_id: eventId, winners });
      alert("✅ Winners Assigned!");
      await api.get(`/event/${eventId}/certificate`);
      alert("📄 Certificates sent successfully!");
    } catch (error: any) {
      console.error(error);
      alert("❌ Error assigning winners or sending certificates");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-10 text-slate-200">
      <div className="max-w-4xl mx-auto bg-slate-900/40 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-800 relative">
        
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600"></div>

        {/* HEADER SECTION */}
        <div className="bg-slate-950/80 p-10 text-center border-b border-slate-800">
          <div className="bg-amber-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
            {React.createElement(FaTrophy as any, { className: "text-amber-500 text-3xl" })}
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
            Winner <span className="text-amber-500">Selection</span>
          </h2>
          <p className="mt-2 text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Assign prizes & issue digital certificates</p>
        </div>

        <div className="p-6 md:p-10">
          {/* SEARCH BOX */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-500">
                {React.createElement(FaSearch as any, { size: 16 })}
              </span>
              <input
                placeholder="ENTER EVENT ID (e.g. 101)"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                className="w-full bg-slate-950/50 border-2 border-slate-800 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-amber-500/50 transition-all font-bold text-slate-300 uppercase tracking-widest text-sm placeholder:text-slate-700"
              />
            </div>
            <button
              onClick={fetchStudents}
              className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-black px-10 py-4 rounded-2xl transition-all active:scale-95 shadow-xl shadow-amber-900/20 uppercase text-xs tracking-[0.2em]"
            >
              Load Data
            </button>
          </div>

          {/* STUDENTS LIST */}
          <div className="space-y-12">
            {Object.keys(students).length === 0 && (
              <div className="text-center py-24 bg-slate-900/20 rounded-3xl border-2 border-dashed border-slate-800">
                <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">Waiting for Event ID Input...</p>
              </div>
            )}

            {Object.keys(students).map((school) => (
              <div key={school} className="animate-fadeIn">
                <h3 className="font-black text-xs text-slate-500 uppercase tracking-[0.3em] flex items-center mb-6">
                  {React.createElement(FaSchool as any, { className: "mr-3 text-amber-500/60" })}
                  {school}
                </h3>

                <div className="grid gap-4">
                  {students[school].map((s: Student) => (
                    <div key={s.id} className="group flex flex-col lg:flex-row justify-between items-center bg-slate-900/40 border border-slate-800/50 p-6 rounded-2xl hover:border-slate-700 transition-all">
                      <div className="mb-6 lg:mb-0 text-center lg:text-left">
                        <span className="block font-bold text-slate-100 text-base uppercase tracking-tight group-hover:text-amber-400 transition-colors">{s.name}</span>
                        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">{s.email}</span>
                      </div>
                      
                      <div className="flex flex-wrap justify-center gap-3">
                        {[
                          { p: "First", icon: "🥇", color: "bg-amber-500", ring: "ring-amber-500/20", textColor: "text-slate-950" },
                          { p: "Second", icon: "🥈", color: "bg-slate-400", ring: "ring-slate-400/20", textColor: "text-slate-950" },
                          { p: "Third", icon: "🥉", color: "bg-orange-600", ring: "ring-orange-600/20", textColor: "text-white" }
                        ].map((prizeObj) => {
                          const isSelected = winners.find(w => w.student_id === s.id && w.prize === prizeObj.p);
                          
                          return (
                            <button
                              key={prizeObj.p}
                              onClick={() => handleSelect(s.id, prizeObj.p)}
                              className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all border
                                ${isSelected 
                                  ? `${prizeObj.color} ${prizeObj.textColor} border-transparent ring-8 ${prizeObj.ring} scale-105 shadow-xl` 
                                  : "bg-slate-800/50 text-slate-500 border-slate-700 hover:border-slate-500 hover:text-slate-300"}`}
                            >
                              <span className="text-sm">{prizeObj.icon}</span> {prizeObj.p}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* SUBMIT SECTION */}
          {Object.keys(students).length > 0 && (
            <div className="mt-20 text-center border-t border-slate-800/50 pt-10">
              <button
                onClick={submitWinners}
                disabled={loading}
                className={`group px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl
                  ${loading 
                    ? "bg-slate-800 text-slate-600 cursor-not-allowed" 
                    : "bg-white text-slate-950 hover:bg-amber-500 transition-colors active:scale-95"}`}
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    {/* Fixed TypeScript Icon Error */}
                    {React.createElement(FaPaperPlane as any, { size: 14 })}
                    Finalize & Send Certificates
                  </span>
                )}
              </button>
              <p className="mt-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest opacity-60 italic">
                Note: This will trigger automated result emails to winners
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}