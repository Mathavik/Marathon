import React, { useEffect, useState } from "react";

type EventType = {
  id: number;
  name: string;
};

const ParticipationCertificate: React.FC = () => {
  const [schools, setSchools] = useState<string[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<number | "">("");
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Fetch Schools
  useEffect(() => {
    fetch("http://localhost:8000/api/schools")
      .then((res) => res.json())
      .then((data) => setSchools(data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Fetch Events when School changes
  const handleSchoolChange = (school: string) => {
    setSelectedSchool(school);
    setSelectedEvent("");
    if (!school) return;
    setLoading(true);
    fetch(`http://localhost:8000/api/events-by-school/${school}`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // ✅ Download Certificate
  const handleDownload = () => {
    if (!selectedSchool || !selectedEvent) {
      alert("Please select both school and event");
      return;
    }
    window.open(
      `http://localhost:8000/api/download-certificate/${selectedEvent}/${selectedSchool}`,
      "_blank"
    );
  };

  const isReady = selectedSchool && selectedEvent;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      {/* Subtle ambient glow behind card */}
      <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Top amber accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-t-xl" />

        {/* Card */}
        <div className="bg-slate-950 border border-amber-500/20 rounded-b-xl shadow-2xl shadow-black/60 p-8">

          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🎓</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-wide uppercase">
              Participation
            </h2>
            <p className="text-amber-500 text-sm font-semibold tracking-[0.2em] uppercase mt-1">
              Certificate
            </p>
            <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
          </div>

          {/* School Dropdown */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
              Select School
            </label>
            <div className="relative">
              <select
                value={selectedSchool}
                onChange={(e) => handleSchoolChange(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 hover:border-amber-500/50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 text-white rounded-lg px-4 py-3 text-sm appearance-none outline-none transition-all duration-200 cursor-pointer"
              >
                <option value="" className="text-slate-400">-- Select School --</option>
                {schools.map((school, index) => (
                  <option key={index} value={school} className="text-white bg-slate-800">
                    {school}
                  </option>
                ))}
              </select>
              {/* Custom chevron */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Event Dropdown */}
          <div className="mb-8">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
              Select Event
            </label>
            <div className="relative">
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(Number(e.target.value))}
                disabled={!selectedSchool || loading}
                className={`w-full bg-slate-800 border text-white rounded-lg px-4 py-3 text-sm appearance-none outline-none transition-all duration-200 ${
                  !selectedSchool || loading
                    ? "border-slate-700/50 opacity-50 cursor-not-allowed"
                    : "border-slate-700 hover:border-amber-500/50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 cursor-pointer"
                }`}
              >
                <option value="" className="text-slate-400">-- Select Event --</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id} className="text-white bg-slate-800">
                    {event.name}
                  </option>
                ))}
              </select>
              {/* Custom chevron */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className={`w-4 h-4 ${!selectedSchool || loading ? "text-slate-600" : "text-amber-500"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Loading indicator */}
            {loading && (
              <div className="flex items-center gap-2 mt-2">
                <div className="w-3 h-3 rounded-full bg-amber-500 animate-bounce [animation-delay:0ms]" />
                <div className="w-3 h-3 rounded-full bg-amber-500 animate-bounce [animation-delay:150ms]" />
                <div className="w-3 h-3 rounded-full bg-amber-500 animate-bounce [animation-delay:300ms]" />
                <span className="text-amber-500 text-xs font-medium ml-1">Loading events...</span>
              </div>
            )}
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={!isReady}
            className={`w-full py-3.5 rounded-lg font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${
              isReady
                ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30 hover:scale-[1.02] active:scale-[0.98]"
                : "bg-slate-800 text-slate-600 border border-slate-700 cursor-not-allowed"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Certificate
          </button>

          {/* Bottom decorative line */}
          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
          <p className="text-center text-slate-600 text-xs mt-3 tracking-wide">
            Select school &amp; event to generate certificate
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParticipationCertificate;