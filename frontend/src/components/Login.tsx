import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Mail, Lock, LogIn, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. Generate static bubbles once on mount
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Random percentage for left
      y: Math.random() * 100, // Random percentage for top
      size: Math.random() * 60 + 20, // Random size between 20px and 80px
      duration: Math.random() * 5 + 3, // Random float speed
    }));
    setBubbles(newBubbles);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axiosInstance.post("/login", { email, password });

    const { student } = res.data;

    // ✅ store basic info
    localStorage.setItem("student_name", student.name);
    localStorage.setItem("student_id", student.id);
    localStorage.setItem("school_name", student.school_name);

    // 🔥 ADD THIS PART (VERY IMPORTANT)
    // await axiosInstance.get("/me");

    Swal.fire({
      icon: "success",
      title: "Welcome Back!",
      text: `Hello ${student.name}, taking you to categories...`,
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    });

    // 🔥 IMPORTANT CHANGE
    setTimeout(() => {
      window.location.href = "/categories"; // instead of navigate()
    }, 2000);

  } catch (err: any) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: err.response?.data?.error || "Invalid credentials.",
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-[#0f172a] overflow-hidden">
      
      {/* 2. Floating Bubbles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ 
              y: "-10vh", 
              opacity: [0, 0.3, 0.3, 0], // Fade in then fade out
              x: `${bubble.x + (Math.sin(bubble.id) * 5)}%` // Slight horizontal sway
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              ease: "linear",
              delay: bubble.id * 0.5, // Staggered start
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

      {/* Animated Background Blobs (The ones you already had) */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Main Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md mx-4"
      >
        <div className="text-center mb-8">
          <div className="bg-gradient-to-tr from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <LogIn className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-blue-100/60 mt-2">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="text-xs font-uppercase tracking-widest text-blue-200 mb-2 block ml-1">EMAIL ADDRESS</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/50 w-5 h-5 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-blue-200/30 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="group">
            <label className="text-xs font-uppercase tracking-widest text-blue-200 mb-2 block ml-1">PASSWORD</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300/50 w-5 h-5 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-blue-200/30 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-xl flex items-center justify-center space-x-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Launch Dashboard</span>}
          </motion.button>
        </form>

        <p className="text-center text-blue-100/40 mt-8 text-sm">
          New student?{" "}
          <Link to="/register" className="text-blue-400 font-bold hover:text-blue-300 transition-colors">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;