import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Mail, Lock, LogIn, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. Generate floating bubbles animation data
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 20,
      duration: Math.random() * 5 + 3,
    }));
    setBubbles(newBubbles);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/admin/login", { email, password });
      const { admin } = res.data;

      // Save admin info
      localStorage.setItem("admin_email", admin.email);

      // Success Alert
      Swal.fire({
        icon: "success",
        title: "Admin Verified",
        text: "Accessing dashboard...",
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      setTimeout(() => {
        navigate("/admin/admindashboard");
      }, 1500);

    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: err.response?.data?.error || "Invalid admin credentials.",
        confirmButtonColor: "#6366f1",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-[#0f172a] overflow-hidden font-sans">
      
      {/* Floating Bubbles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ 
              y: "-10vh", 
              opacity: [0, 0.3, 0.3, 0],
              x: `${bubble.x + (Math.sin(bubble.id) * 5)}%` 
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              ease: "linear",
              delay: bubble.id * 0.5,
            }}
            className="absolute rounded-full bg-blue-400/20 backdrop-blur-sm border border-white/10"
            style={{
              left: `${bubble.x}%`,
              width: bubble.size,
              height: bubble.size,
            }}
          />
        ))}
      </div>

      {/* Animated Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Admin Login Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md mx-4"
      >
        <div className="text-center mb-8">
          <div className="bg-gradient-to-tr from-indigo-500 to-blue-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-2xl border border-white/20">
            <ShieldCheck className="text-white w-10 h-10" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Admin Portal</h2>
          <p className="text-blue-100/60 mt-2">Secure access for management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="text-[10px] font-bold tracking-[0.2em] text-blue-200 mb-2 block ml-1 uppercase">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/50 w-5 h-5 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="email"
                placeholder="admin@competition.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-blue-200/20 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all hover:bg-white/10"
                required
              />
            </div>
          </div>

          <div className="group">
            <label className="text-[10px] font-bold tracking-[0.2em] text-blue-200 mb-2 block ml-1 uppercase">Security Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/50 w-5 h-5 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-blue-200/20 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all hover:bg-white/10"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl flex items-center justify-center space-x-2 disabled:opacity-70 group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Enter Dashboard</span>
                <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-blue-100/30 text-xs">
                © 2026 Grand Competition Management System
            </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;