import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

// Define the Winner type
interface Winner {
  school_name: string;
  total_points: number;
  rank?: number;
  school_id?: string | number;
  logo?: string;
}

const OverallWinners: React.FC = () => {
  const [data, setData] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/overall-winners");
      setData(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching winners:", err);
      setError("Failed to load winners data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get rank display
  const getRankDisplay = (index: number) => {
    if (index === 0) return { label: "1st", icon: "🥇", color: "text-amber-400", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30" };
    if (index === 1) return { label: "2nd", icon: "🥈", color: "text-slate-300", bgColor: "bg-slate-500/10", borderColor: "border-slate-500/30" };
    if (index === 2) return { label: "3rd", icon: "🥉", color: "text-orange-400", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/30" };
    return { label: `${index + 1}th`, icon: "📊", color: "text-blue-400", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/20" };
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-slate-200">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-4xl animate-bounce">🏆</span>
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent uppercase tracking-tighter">
                Overall Trophy Winners
              </h1>
              <span className="text-4xl animate-bounce">🏆</span>
            </div>
            <div className="h-1.5 w-48 mx-auto bg-gradient-to-r from-amber-600 via-yellow-400 to-orange-600 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-amber-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl">🏆</span>
              </div>
            </div>
            <p className="mt-8 text-slate-400 font-bold uppercase tracking-[0.3em] text-sm animate-pulse">Loading champions...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-950/20 border border-red-500/50 rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-4">
              <span className="text-4xl">⚠️</span>
              <div>
                <h3 className="font-black text-red-400 text-xl uppercase tracking-tight">Unable to load data</h3>
                <p className="text-red-300/70 mt-1 font-medium">{error}</p>
              </div>
            </div>
            <button
              onClick={fetchWinners}
              className="mt-6 px-8 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-500 transition-all font-black text-xs uppercase tracking-widest shadow-lg active:scale-95"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Winners Table */}
        {!loading && !error && data.length > 0 && (
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-800 transition-all duration-300">
            {/* Podium Preview for Top 3 */}
            {data.length >= 3 && (
              <div className="bg-slate-950/50 p-10 border-b border-slate-800">
                <h2 className="text-center text-slate-500 font-black mb-12 text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-4">
                  <span className="w-12 h-px bg-slate-800"></span>
                  Top Performers
                  <span className="w-12 h-px bg-slate-800"></span>
                </h2>
                <div className="flex flex-col md:flex-row justify-center items-end gap-8 md:gap-4">
                  
                  {/* 2nd Place */}
                  <div className="flex-1 w-full max-w-[240px] text-center order-2 md:order-1 group">
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-t-3xl p-6 h-40 flex flex-col justify-end relative transition-all group-hover:border-slate-500">
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-slate-700 rounded-2xl flex items-center justify-center text-2xl shadow-xl border border-slate-600">
                        🥈
                      </div>
                      <div className="mt-6">
                        <div className="font-black text-slate-200 text-lg truncate uppercase tracking-tight">{data[1]?.school_name || "—"}</div>
                        <div className="text-4xl font-black text-slate-300 mt-2">{data[1]?.total_points || 0}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">points</div>
                      </div>
                    </div>
                    <div className="bg-slate-700 text-slate-300 py-4 rounded-b-2xl font-black text-xs tracking-[0.2em] uppercase">
                      2nd Place
                    </div>
                  </div>
                  
                  {/* 1st Place - Champion */}
                  <div className="flex-1 w-full max-w-[280px] text-center order-1 md:order-2 z-10 scale-105 md:scale-110 group">
                    <div className="bg-gradient-to-t from-amber-600/20 to-amber-400/5 border-2 border-amber-500/30 rounded-t-[2rem] p-8 h-52 flex flex-col justify-end relative shadow-[0_20px_50px_rgba(245,158,11,0.15)] transition-all group-hover:border-amber-400">
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(245,158,11,0.4)] ring-4 ring-slate-950">
                        👑
                      </div>
                      <div className="mt-8">
                        <div className="font-black text-white text-xl truncate uppercase tracking-tighter">{data[0]?.school_name || "—"}</div>
                        <div className="text-5xl font-black text-amber-400 mt-2 drop-shadow-glow">{data[0]?.total_points || 0}</div>
                        <div className="text-[10px] text-amber-500/80 font-black uppercase tracking-[0.2em] mt-1">Total Points</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 py-4 rounded-b-2xl font-black text-sm tracking-[0.3em] uppercase shadow-lg">
                      Champion
                    </div>
                  </div>
                  
                  {/* 3rd Place */}
                  <div className="flex-1 w-full max-w-[240px] text-center order-3 group">
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-t-3xl p-6 h-36 flex flex-col justify-end relative transition-all group-hover:border-slate-500">
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-orange-900/50 rounded-2xl flex items-center justify-center text-2xl shadow-xl border border-orange-800/50">
                        🥉
                      </div>
                      <div className="mt-6">
                        <div className="font-black text-slate-200 text-lg truncate uppercase tracking-tight">{data[2]?.school_name || "—"}</div>
                        <div className="text-4xl font-black text-orange-400 mt-2">{data[2]?.total_points || 0}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">points</div>
                      </div>
                    </div>
                    <div className="bg-orange-900/40 text-orange-200 py-4 rounded-b-2xl font-black text-xs tracking-[0.2em] uppercase">
                      3rd Place
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Full Rankings Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <th className="px-8 py-6 text-left text-xs font-black uppercase tracking-[0.3em] w-32">Rank</th>
                    <th className="px-8 py-6 text-left text-xs font-black uppercase tracking-[0.3em]">School / Institution</th>
                    <th className="px-8 py-6 text-right text-xs font-black uppercase tracking-[0.3em] w-40">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {data.map((item: Winner, index: number) => {
                    const rank = getRankDisplay(index);
                    return (
                      <tr
                        key={item.school_id || index}
                        className={`transition-all duration-300 hover:bg-slate-800/30 group cursor-default ${
                          index === 0 ? "bg-amber-500/5" : ""
                        }`}
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${rank.bgColor} ${rank.borderColor} border transition-transform group-hover:scale-110`}>
                              {rank.icon}
                            </div>
                            <span className={`font-black text-base uppercase ${rank.color}`}>
                              {rank.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            {index === 0 && <span className="text-2xl animate-pulse">🏆</span>}
                            <span className={`font-bold tracking-tight ${index === 0 ? "text-xl text-white" : "text-lg text-slate-300"}`}>
                              {item.school_name}
                            </span>
                            {index === 0 && (
                              <span className="px-3 py-1 rounded-lg text-[9px] font-black bg-amber-500 text-slate-950 uppercase tracking-widest">
                                Winner
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="inline-flex items-baseline gap-2">
                            <span className={`font-black text-3xl tracking-tighter ${
                              index === 0 ? "text-amber-400" :
                              index === 1 ? "text-slate-200" :
                              index === 2 ? "text-orange-400" :
                              "text-blue-400"
                            }`}>
                              {item.total_points}
                            </span>
                            <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">pts</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer Note */}
            <div className="bg-slate-950/80 px-8 py-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <div className="flex items-center gap-3">
                <span className="text-xl">📊</span>
                <span>Total Participating Schools: <strong className="text-slate-200">{data.length}</strong></span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span>
                  <span className="text-green-500/80">Live Rankings</span>
                </div>
                <div className="w-px h-4 bg-slate-800 hidden sm:block"></div>
                <span>Updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && data.length === 0 && (
          <div className="bg-slate-900/40 backdrop-blur-md rounded-[3rem] border border-slate-800 p-20 text-center max-w-2xl mx-auto shadow-2xl">
            <div className="text-8xl mb-8 opacity-20">🏆</div>
            <h3 className="text-3xl font-black text-slate-200 mb-4 uppercase tracking-tighter">No Winners Data Yet</h3>
            <p className="text-slate-500 mb-10 font-medium uppercase tracking-widest text-xs">Results will appear here once the competition concludes.</p>
            <button
              onClick={fetchWinners}
              className="px-10 py-4 bg-white text-slate-950 rounded-2xl hover:bg-amber-500 transition-all duration-300 font-black text-xs uppercase tracking-[0.2em] shadow-xl active:scale-95"
            >
              Refresh Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverallWinners;