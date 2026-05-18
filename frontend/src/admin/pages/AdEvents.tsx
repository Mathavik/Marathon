import { useEffect, useState } from "react";
import api from "../../api";

const AdEvents = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-[#050816] min-h-screen text-slate-200">
      <div className="rounded-[32px] border border-orange-500/10 bg-gradient-to-br from-orange-500/10 via-slate-900/80 to-black/80 p-8 shadow-[0_30px_80px_rgba(255,115,0,0.08)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-orange-300 font-bold mb-2">Event Administration</p>
            <h1 className="text-4xl font-black text-white uppercase tracking-tight">
              Event <span className="text-orange-400">Reports</span>
            </h1>
          </div>
          <p className="text-slate-400 text-sm max-w-2xl">
            Use this panel to access live event reports and downloadable school results in a polished Marathon admin dashboard.
          </p>
        </div>

        <div className="overflow-x-auto rounded-[28px] border border-slate-800 bg-slate-950/80 shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-black tracking-[0.2em]">
              <tr>
                <th className="p-5 border-b border-slate-800">Event</th>
                <th className="p-5 border-b border-slate-800">Type</th>
                <th className="p-5 border-b border-slate-800 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-5">
                    <div className="font-black text-white text-lg uppercase tracking-tight">{event.name}</div>
                    <div className="text-slate-500 text-xs mt-2">ID #{event.id}</div>
                  </td>
                  <td className="p-5 text-slate-300">{event.type || "General"}</td>
                  <td className="p-5 text-center">
                    <div className="inline-flex flex-wrap justify-center gap-3">
                      <button
                        onClick={() => window.open(`http://localhost:8000/api/event/${event.id}/schools-students/download`, "_blank")}
                        className="px-4 py-3 rounded-2xl bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 transition-all text-[10px] font-black uppercase tracking-[0.2em]"
                      >
                        Full Report
                      </button>
                      <button
                        onClick={() => window.open(`http://localhost:8000/api/event/${event.id}/schools/download`, "_blank")}
                        className="px-4 py-3 rounded-2xl bg-sky-500/10 text-sky-300 hover:bg-sky-500 hover:text-slate-950 transition-all text-[10px] font-black uppercase tracking-[0.2em]"
                      >
                        School List
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-16 text-center text-slate-500 uppercase tracking-[0.2em] font-black">
                    No events available yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdEvents;
