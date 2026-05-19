import React, { useState, useEffect } from "react";
import { Calendar, MapPin } from "lucide-react";
import axiosInstance from "../../axiosInstance";

interface HeroData {
  id: number;
  title: string;
  subtitle: string;
  event_date: string;
  location: string;
  background_image: string;
  primary_button: string;
}
const scrollToRegistration = () => {
  const section = document.getElementById("home-registration");

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
    });
  }
};
const HeroSection = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Fetch Hero Section Data
  useEffect(() => {
    axiosInstance
      .get("/hero-section")
      .then((response) => {
        setHeroData(response.data.data);
      })
      .catch((error) => {
        console.log("Hero Section Error:", error);
      });
  }, []);

  // Countdown Timer
  useEffect(() => {
    if (!heroData?.event_date) return;

    const eventDate = new Date(
      heroData.event_date.replace(" ", "T")
    ).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = eventDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [heroData]);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      
      {/* Background Image */}
     {/* Background Image */}
<div
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: heroData?.background_image
      ? `url(${heroData.background_image})`
      : "none",
  }}
></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        
        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-black uppercase italic mb-4 leading-none tracking-tighter text-white drop-shadow-2xl">
          {heroData?.title}
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl font-semibold text-orange-400 mb-8 drop-shadow-lg">
          {heroData?.subtitle}
        </p>

        {/* Event Details */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          
          {/* Date */}
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full">
            <Calendar className="text-orange-400" size={20} />

            <span className="text-white font-semibold">
              {heroData?.event_date
                ? new Date(heroData.event_date).toDateString()
                : "Loading..."}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full">
            <MapPin className="text-orange-400" size={20} />

            <span className="text-white font-semibold">
              {heroData?.location}
            </span>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl shadow-2xl"
            >
              <div className="text-3xl font-black text-orange-400">
                {item.value}
              </div>

              <div className="text-sm font-semibold text-white uppercase tracking-wide">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-6 flex-wrap justify-center">
          
          {/* Primary Button */}
         <button
  onClick={scrollToRegistration}
  className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 rounded-full font-black text-white text-lg uppercase tracking-wide shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
>
  {heroData?.primary_button}
</button>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;