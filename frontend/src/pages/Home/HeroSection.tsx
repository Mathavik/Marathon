import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Trophy, Tv, Newspaper, Bell, Search } from 'lucide-react';

const SportsHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider Data
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1400",
     title: "INTER-SCHOOL DISTRICT CHAMPIONSHIP",
    subtitle: "Registration is now open for Under-14 and Under-17 categories. Bring glory to your school!",
      tag: "CRICKET"
    },
    {
      url: "https://i.pinimg.com/736x/94/41/90/944190bea55723662f983488d50f3a12.jpg",
 title: "INTER-SCHOOL DISTRICT CHAMPIONSHIP",
    subtitle: "Registration is now open for Under-14 and Under-17 categories. Bring glory to your school!",
      tag: "FOOTBALL"
    },
    {
      url: "https://i.pinimg.com/736x/d5/6b/2d/d56b2d7f7c3884782c3babea7fe7054c.jpg",
       title: "INTER-SCHOOL DISTRICT CHAMPIONSHIP",
    subtitle: "Registration is now open for Under-14 and Under-17 categories. Bring glory to your school!",
      tag: "KABADDI"
    }
  ];

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-orange-500">
      
      {/* --- NAVBAR --- */}
      {/* <nav className="flex justify-between items-center px-6 py-4 bg-[#1e293b]/80 backdrop-blur-md sticky top-0 z-[100] border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="bg-orange-600 p-1 rounded-md rotate-3">
            <Trophy size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-black italic tracking-tighter uppercase">
            Sports <span className="text-orange-500">Pathi</span>
          </h1>
        </div>
        
        <ul className="hidden md:flex gap-8 font-bold text-sm uppercase tracking-widest">
          <li className="text-orange-500 cursor-pointer">Home</li>
          <li className="hover:text-orange-500 cursor-pointer transition">Cricket</li>
          <li className="hover:text-orange-500 cursor-pointer transition">Football</li>
          <li className="hover:text-orange-500 cursor-pointer transition">Live News</li>
        </ul>

        <div className="flex gap-4 items-center">
          <Search size={20} className="text-slate-400 cursor-pointer hover:text-white" />
          <Bell size={20} className="text-slate-400 cursor-pointer hover:text-white" />
          <button className="bg-orange-600 px-5 py-2 rounded-full font-bold text-xs uppercase hover:bg-orange-700 transition shadow-lg shadow-orange-900/20">
            Login
          </button>
        </div>
      </nav> */}

      {/* --- HERO SLIDER --- */}
      <div className="relative h-[550px] w-full group overflow-hidden">
        {/* Images */}
        <div 
          style={{ backgroundImage: `url(${slides[currentSlide].url})` }}
          className="w-full h-full bg-center bg-cover duration-700 ease-in-out scale-105 group-hover:scale-100 brightness-[0.4]"
        ></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <span className="bg-orange-600 px-4 py-1 rounded-sm text-[10px] font-black tracking-[4px] mb-6 animate-bounce">
            {slides[currentSlide].tag}
          </span>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic mb-4 leading-none tracking-tighter">
            {slides[currentSlide].title}
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-medium">
            {slides[currentSlide].subtitle}
          </p>
          {/* <div className="flex gap-4 mt-8">
            <button className="bg-white text-black px-8 py-3 font-black uppercase italic skew-x-[-10deg] hover:bg-orange-500 hover:text-white transition-all">
              Watch Live
            </button>
            <button className="border-2 border-white px-8 py-3 font-black uppercase italic skew-x-[-10deg] hover:bg-white hover:text-black transition-all">
              Full Stats
            </button>
          </div> */}
        </div>

        {/* Controls */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-orange-500 p-3 rounded-full transition-all">
          <ChevronLeft size={30} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-orange-500 p-3 rounded-full transition-all">
          <ChevronRight size={30} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <div key={i} className={`h-1 w-8 rounded-full transition-all ${i === currentSlide ? 'bg-orange-500' : 'bg-white/30'}`}></div>
          ))}
        </div>
      </div>



    </div>
  );
};

export default SportsHeroSection;