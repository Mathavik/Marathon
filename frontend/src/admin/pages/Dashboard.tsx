import React, { useState, useEffect } from "react";
import { LayoutGrid, CalendarDays, UserCheck, TrendingUp, Activity } from "lucide-react";
import {
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";

// ─── Animated Number ──────────────────────────────────────────────────────────
const AnimatedNumber = ({ value }: { value: number }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(start);
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <>{display}</>;
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const Dashboard: React.FC = () => {
  const [counts, setCounts] = useState({ categories: 0, registrations: 0, totalPayments: 0, pendingPayments: 0 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard-counts")
      .then(res => res.json())
      .then(data => setCounts(data))
      .catch(() => setCounts({ categories: 12, registrations: 289, totalPayments: 84, pendingPayments: 23 }));
  }, []);

  const stats = [
    {
      label: "Total Categories",
      value: counts.categories,
      icon: <LayoutGrid className="w-5 h-5" />,
      color: "from-pink-500 to-rose-600",
      glow: "shadow-pink-500/20",
      text: "text-pink-400",
      bg: "bg-pink-500/10",
      border: "border-pink-500/20",
    },
    {
      label: "Total Registrations",
      value: counts.registrations,
      icon: <UserCheck className="w-5 h-5" />,
      color: "from-emerald-500 to-teal-600",
      glow: "shadow-emerald-500/20",
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      label: "Total Payments",
      value: counts.totalPayments,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "from-cyan-500 to-sky-600",
      glow: "shadow-cyan-500/20",
      text: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
    },
    {
      label: "Pending Payments",
      value: counts.pendingPayments,
      icon: <Activity className="w-5 h-5" />,
      color: "from-orange-500 to-amber-600",
      glow: "shadow-orange-500/20",
      text: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
    },
  ];

  // Donut chart data derived from counts
  const donutData = [
    { name: "Categories", value: counts.categories, color: "#ec4899" },
    { name: "Registrations", value: counts.registrations, color: "#10b981" },
    { name: "Payments", value: counts.totalPayments, color: "#06b6d4" },
  ];

  return (
    <div
      className="p-6 min-h-screen"
      style={{
        background: "radial-gradient(ellipse at top left, #0f172a 0%, #020617 60%, #0c0a1e 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;900&display=swap"
        rel="stylesheet"
      />

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
              Live Dashboard
            </span>
          </div>
          <h2
            className="text-4xl font-black text-white tracking-tight"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Overview
            <span
              className="ml-3 text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #f59e0b, #ef4444)" }}
            >
              Analytics
            </span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">Welcome back, Admin 👋 — Here's what's happening</p>
        </div>

        {/* Live badge */}
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-xs font-semibold">Live</span>
        </div>
      </div>

      {/* ── STATS CARDS ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-2xl border ${stat.border} ${stat.bg} p-6 backdrop-blur-sm shadow-xl ${stat.glow} group transition-transform duration-300 hover:-translate-y-1`}
          >
            {/* Gradient orb */}
            <div
              className={`absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-20 blur-2xl bg-gradient-to-br ${stat.color}`}
            />

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-xs font-medium mb-2">{stat.label}</p>
                <h3 className="text-5xl font-black text-white leading-none">
                  <AnimatedNumber value={stat.value} />
                </h3>
                <p className={`text-xs mt-2 flex items-center gap-1 ${stat.text}`}>
                  <TrendingUp className="w-3 h-3" />
                  Active & growing
                </p>
              </div>

              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <span className="text-white">{stat.icon}</span>
              </div>
            </div>

            {/* Bottom mini bar */}
            <div className="mt-5 h-1 rounded-full bg-slate-700/50">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${stat.color} transition-all duration-1000`}
                style={{ width: `${Math.min((stat.value / 300) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── CHARTS ROW ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 mt-6">

        {/* ── DONUT CHART ─────────────────────────────────────── */}
        <div
          className="rounded-2xl border border-slate-800 p-6 flex flex-col"
          style={{ background: "rgba(15,23,42,0.7)", backdropFilter: "blur(12px)" }}
        >
          <div className="mb-4">
            <h3 className="text-white font-bold text-base">Distribution</h3>
            <p className="text-slate-500 text-xs mt-0.5">Overall breakdown</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 flex-1">
            <div className="flex-1 flex items-center justify-center" style={{ minHeight: 240 }}>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <defs>
                    {donutData.map((entry, i) => (
                      <filter key={i} id={`glow-${i}`}>
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    ))}
                  </defs>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    strokeWidth={0}
                  >
                    {donutData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.color}
                        opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                        style={{ transition: "opacity 0.2s", cursor: "pointer" }}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="w-full lg:w-1/3 space-y-3 mt-0">
              {donutData.map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl border border-slate-700/70 bg-slate-950/50 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                    <span className="text-slate-300 text-sm">{item.name}</span>
                  </div>
                  <span className="text-white text-sm font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;