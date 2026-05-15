import React, { useState, useEffect } from "react";
import { LayoutGrid, CalendarDays, UserCheck, TrendingUp, Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/90 backdrop-blur border border-slate-700 rounded-xl px-4 py-3 shadow-2xl">
        <p className="text-amber-400 font-bold text-sm mb-1">{label}</p>
        <p className="text-white text-lg font-black">
          {payload[0].value}
          <span className="text-slate-400 text-xs font-normal ml-1">registrations</span>
        </p>
      </div>
    );
  }
  return null;
};

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
  const [counts, setCounts] = useState({ categories: 0, events: 0, registrations: 0 });
  const [chartData, setChartData] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard-counts")
      .then(res => res.json())
      .then(data => setCounts(data))
      .catch(() => setCounts({ categories: 12, events: 34, registrations: 289 }));

    fetch("http://127.0.0.1:8000/api/chart-data")
      .then(res => res.json())
      .then(data => setChartData(data))
      .catch(() =>
        setChartData([
          { name: "Jan", registrations: 40 },
          { name: "Feb", registrations: 75 },
          { name: "Mar", registrations: 60 },
          { name: "Apr", registrations: 110 },
          { name: "May", registrations: 95 },
          { name: "Jun", registrations: 140 },
          { name: "Jul", registrations: 180 },
        ])
      );
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
      label: "Total Events",
      value: counts.events,
      icon: <CalendarDays className="w-5 h-5" />,
      color: "from-blue-500 to-indigo-600",
      glow: "shadow-blue-500/20",
      text: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
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
  ];

  // Donut chart data derived from counts
  const donutData = [
    { name: "Categories", value: counts.categories, color: "#ec4899" },
    { name: "Events", value: counts.events, color: "#3b82f6" },
    { name: "Registrations", value: counts.registrations, color: "#10b981" },
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── AREA CHART (spans 2 cols) ───────────────────────── */}
        <div
          className="lg:col-span-2 rounded-2xl border border-slate-800 p-6"
          style={{ background: "rgba(15,23,42,0.7)", backdropFilter: "blur(12px)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white font-bold text-base">Registrations Over Time</h3>
              <p className="text-slate-500 text-xs mt-0.5">Monthly trend analysis</p>
            </div>
            <span className="text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full text-xs font-semibold">
              This Year
            </span>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                stroke="#475569"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#475569"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#f59e0b22", strokeWidth: 1 }} />
              <Area
                type="monotone"
                dataKey="registrations"
                stroke="url(#lineGrad)"
                strokeWidth={3}
                fill="url(#areaGrad)"
                dot={{ fill: "#f59e0b", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 7, fill: "#f59e0b", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* ── DONUT CHART ─────────────────────────────────────── */}
        <div
          className="rounded-2xl border border-slate-800 p-6 flex flex-col"
          style={{ background: "rgba(15,23,42,0.7)", backdropFilter: "blur(12px)" }}
        >
          <div className="mb-4">
            <h3 className="text-white font-bold text-base">Distribution</h3>
            <p className="text-slate-500 text-xs mt-0.5">Overall breakdown</p>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
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
          <div className="space-y-2 mt-2">
            {donutData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-slate-400 text-xs">{item.name}</span>
                </div>
                <span className="text-white text-xs font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;