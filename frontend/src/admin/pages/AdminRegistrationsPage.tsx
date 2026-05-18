import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

interface RegNotification {
  id: string;
  student_name: string;
  school_name: string;
  type: string;
  created_at: string;
}

const AdminRegistrationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<RegNotification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/notification-data");
      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-[#050816] text-white">
      <div className="rounded-[32px] border border-orange-500/10 bg-gradient-to-br from-orange-500/10 via-slate-900/80 to-black/80 p-6 shadow-[0_30px_80px_rgba(255,115,0,0.08)] mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.45em] text-orange-300/80 font-bold mb-2">
              Dashboard Alert
            </p>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              Registration Notifications
            </h1>
          </div>

          <button
            onClick={fetchData}
            className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3 text-sm font-black uppercase tracking-[0.15em] text-slate-950 shadow-[0_20px_40px_rgba(249,115,22,0.25)] transition-all duration-300 hover:scale-[1.02]"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-orange-500/10 bg-white/5 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-2">Alerts</p>
            <p className="text-3xl font-black text-white">{notifications.length}</p>
          </div>
          <div className="rounded-3xl border border-orange-500/10 bg-white/5 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-2">Status</p>
            <p className="text-3xl font-black text-orange-400">{loading ? "Loading" : "Live"}</p>
          </div>
          <div className="rounded-3xl border border-orange-500/10 bg-white/5 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-2">Updated</p>
            <p className="text-3xl font-black text-white">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-[32px] border border-slate-800/70 bg-slate-950/80 shadow-[0_30px_60px_rgba(0,0,0,0.2)]">
        <table className="w-full text-left border-collapse bg-slate-950/95">
          <thead>
            <tr className="bg-slate-900/90 text-orange-400 text-xs uppercase tracking-[0.35em]">
              <th className="p-4 border-b border-slate-800">Student Name</th>
              <th className="p-4 border-b border-slate-800">School</th>
              <th className="p-4 border-b border-slate-800 text-right">Received At</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="p-20 text-center text-slate-500 animate-pulse">
                  Loading registration alerts...
                </td>
              </tr>
            ) : notifications.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-20 text-center text-slate-500 italic">
                  No registration notifications found.
                </td>
              </tr>
            ) : (
              notifications.map((note) => (
                <tr key={note.id} className="transition-colors hover:bg-orange-500/10 border-b border-slate-800/50">
                  <td className="p-4 font-bold text-white">{note.student_name}</td>
                  <td className="p-4 text-slate-300">{note.school_name}</td>
                  <td className="p-4 text-right text-xs text-slate-400 font-mono">
                    {new Date(note.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRegistrationsPage;