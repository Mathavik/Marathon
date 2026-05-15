import { useEffect, useState } from "react";
import api from "../../api";

type Event = {
  id: number;
  name: string;
  type: string;
  age_group: string;
  start_time: string;
  end_time: string;
  event_date: string;
  status: string;
};

const STATUS_CONFIG: Record<string, { bg: string; badge: string; glow: string; icon: string }> = {
  completed: {
    bg: "from-emerald-400 to-teal-500",
    badge: "bg-emerald-500 text-white",
    glow: "shadow-emerald-200",
    icon: "✅",
  },
  ongoing: {
    bg: "from-amber-400 to-orange-500",
    badge: "bg-amber-400 text-white",
    glow: "shadow-amber-200",
    icon: "🔥",
  },
  upcoming: {
    bg: "from-violet-400 to-indigo-500",
    badge: "bg-violet-500 text-white",
    glow: "shadow-violet-200",
    icon: "🚀",
  },
};

const EVENT_COLORS = [
  "from-pink-400 to-rose-500",
  "from-blue-400 to-cyan-500",
  "from-purple-400 to-violet-500",
  "from-green-400 to-emerald-500",
  "from-orange-400 to-amber-500",
  "from-teal-400 to-sky-500",
];

export default function Schedule() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = () => {
      api
        .get("/events")
        .then((res: any) => {
          setEvents(res.data);
          setLoading(false);
        })
        .catch((err: any) => console.log(err));
    };

    fetchEvents();
    const interval = setInterval(fetchEvents, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredEvents =
    filter === "all" ? events : events.filter((e) => e.status === filter);

  const formatTime = (time: string) =>
    time
      ? new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";

  const getStatusCfg = (status: string) =>
    STATUS_CONFIG[status] ?? STATUS_CONFIG["upcoming"];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-50 to-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl animate-bounce mb-4">📅</div>
          <p className="text-xl font-bold text-indigo-600 animate-pulse">
            Loading Schedule...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-50 to-yellow-100 p-6 font-sans">

    
      

      {/* ── FILTER PILLS ── */}
      <div className="flex justify-center gap-3 mb-12 flex-wrap">
        {["all", "upcoming", "ongoing", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-md
              ${
                filter === f
                  ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white scale-105 shadow-violet-300"
                  : "bg-white text-gray-600 hover:bg-gray-50 hover:scale-105"
              }`}
          >
            {f === "all" && "🌟 "}
            {f === "upcoming" && "🚀 "}
            {f === "ongoing" && "🔥 "}
            {f === "completed" && "✅ "}
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* ── TIMELINE ── */}
      <div className="relative max-w-3xl mx-auto">

        {/* center line */}
        <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full rounded-full bg-gradient-to-b from-violet-300 via-pink-300 to-yellow-300" />

        {filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg font-medium">No events found</p>
          </div>
        ) : (
          filteredEvents.map((event, index) => {
            const cfg = getStatusCfg(event.status);
            const colorGrad = EVENT_COLORS[index % EVENT_COLORS.length];
            const isLeft = index % 2 === 0;

            return (
              <div
                key={event.id}
                className={`mb-10 flex ${isLeft ? "justify-start" : "justify-end"} relative`}
                style={{ animation: `fadeSlideIn 0.4s ease ${index * 0.07}s both` }}
              >
                {/* center dot */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-5 w-5 h-5 rounded-full bg-gradient-to-br ${cfg.bg} ring-4 ring-white shadow-lg z-10`}
                />

                <div className={`w-5/12 ${isLeft ? "mr-auto" : "ml-auto"}`}>
                  <div
                    className={`bg-white rounded-2xl shadow-xl ${cfg.glow} shadow-lg overflow-hidden
                      hover:-translate-y-1 hover:shadow-2xl transition-all duration-200`}
                  >
                    {/* coloured top bar */}
                    <div className={`h-2 bg-gradient-to-r ${colorGrad}`} />

                    <div className="p-4">
                      {/* time */}
                      <p className="text-xs font-semibold text-gray-400 mb-1">
                        ⏰ {formatTime(event.start_time)} – {formatTime(event.end_time)}
                      </p>

                      {/* date */}
                      <p className="text-xs text-gray-400 mb-2">
                        📅 {event.event_date}
                      </p>

                      {/* name */}
                      <h3 className="text-base font-extrabold text-gray-800 leading-tight mb-1">
                        {event.name}
                      </h3>

                      {/* type & age */}
                      <p className="text-xs text-gray-500 mb-3">
                        🏷 {event.type} &nbsp;|&nbsp; 👤 {event.age_group}
                      </p>

                      {/* status badge */}
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${cfg.badge} shadow-sm`}
                      >
                        {cfg.icon} {event.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* fade-slide keyframe injected inline */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}