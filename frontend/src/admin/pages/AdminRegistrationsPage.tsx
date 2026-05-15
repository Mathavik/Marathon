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
    <div className="p-6 text-white bg-slate-950 min-h-screen">
      <div className="flex justify-between items-center mb-6 border-l-4 border-amber-500 pl-4">
        <h1 className="text-2xl font-bold uppercase tracking-tight">Registration Notifications</h1>
        <button 
          onClick={fetchData} 
          className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2 rounded font-bold text-xs uppercase transition-all"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800 shadow-2xl">
        <table className="w-full text-left border-collapse bg-slate-900/40">
          <thead>
            <tr className="bg-slate-800 text-amber-500 text-xs uppercase tracking-widest">
              <th className="p-4 border-b border-slate-700">Student Name</th>
              <th className="p-4 border-b border-slate-700">School</th>
              <th className="p-4 border-b border-slate-700 text-right">Received At</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                {/* Changed colSpan to 3 */}
                <td colSpan={3} className="p-20 text-center text-slate-500 animate-pulse">
                  Loading registration alerts...
                </td>
              </tr>
            ) : notifications.length === 0 ? (
              <tr>
                {/* Changed colSpan to 3 */}
                <td colSpan={3} className="p-20 text-center text-slate-500 italic">
                  No registration notifications found.
                </td>
              </tr>
            ) : (
              notifications.map((note) => (
                <tr key={note.id} className="hover:bg-amber-500/5 border-b border-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-slate-100">{note.student_name}</td>
                  <td className="p-4 text-slate-400">{note.school_name}</td>
                  <td className="p-4 text-right text-xs text-slate-500 font-mono">
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