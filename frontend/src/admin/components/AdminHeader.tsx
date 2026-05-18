import React, { useEffect, useState } from "react";
import { LogOut, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin_email");
    // localStorage.removeItem("admin");
    navigate("/admin/adminlogin");
  };

  // 🔔 Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("/admin/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔴 Fetch unread count
  const fetchCount = async () => {
    try {
      const res = await axiosInstance.get("/admin/notifications/unread-count");
      setCount(res.data.count);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Mark as read
  const markAsRead = async () => {
    axiosInstance.post("/admin/notifications/read");
    setCount(0);
  };

  useEffect(() => {
    fetchNotifications();
    fetchCount();

    // 🔁 auto refresh every 5 sec
    const interval = setInterval(() => {
      fetchNotifications();
      fetchCount();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-20 bg-[#07111f]/95 border-b border-orange-500/10 flex items-center justify-between px-8 shadow-[0_15px_40px_rgba(0,0,0,0.35)] relative z-50 backdrop-blur-xl">

      <div className="flex items-center gap-4">
        <div className="rounded-3xl border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-orange-300 text-xs uppercase tracking-[0.3em] font-black shadow-[0_10px_30px_rgba(249,115,22,0.1)]">
          Admin Panel
        </div>
      </div>

      <div className="flex items-center gap-6">

        {/* 🔔 Notification Bell */}
       
<div className="relative">
  <button
    onClick={() => {
      markAsRead();
      navigate("/admin/adminregistrationspage");
    }}
  >
    <Bell className="text-white" size={20} />
  </button>

  {/* 🔴 Badge */}
  {count > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1.5 rounded-full text-white">
      {count}
    </span>
  )}
</div>

        {/* User Info */}
        <div className="text-right hidden sm:block border-r border-orange-500/20 pr-6">
          <p className="text-white text-xs font-black uppercase tracking-[0.35em]">
            Admin User
          </p>
          <p className="text-orange-400 text-[10px] font-bold uppercase tracking-[0.25em]">
            Super Admin
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 border border-orange-500/30 text-slate-950 font-black uppercase text-[10px] tracking-[0.15em] rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-[0_15px_30px_rgba(249,115,22,0.25)]"
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>

      </div>
    </header>
  );
};

export default AdminHeader;