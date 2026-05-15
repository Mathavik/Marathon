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
    <header className="h-16 bg-slate-950 border-b border-amber-500/20 flex items-center justify-end px-8 shadow-2xl relative z-50">

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
        <div className="text-right hidden sm:block border-r border-slate-800 pr-6">
          <p className="text-white text-xs font-black uppercase tracking-wider">
            Admin User
          </p>
          <p className="text-amber-500 text-[10px] font-bold uppercase tracking-widest">
            Super Admin
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="group flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-amber-500 border border-amber-500/30 hover:border-amber-600 text-amber-500 hover:text-slate-950 font-black uppercase text-[10px] tracking-[0.15em] rounded-xl transition-all duration-300"
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>

      </div>
    </header>
  );
};

export default AdminHeader;