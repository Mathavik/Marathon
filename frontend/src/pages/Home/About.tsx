import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Zap, Star, Target, ShieldCheck, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  // Animation logic for the tilted cards
  const cardVariants: Variants = {
    offscreen: { y: 60, opacity: 0, rotate: 0 },
    onscreen: (custom: number) => ({
      y: 0,
      opacity: 1,
      rotate: custom,
      transition: { 
        type: "spring", 
        bounce: 0.4, 
        duration: 0.8 
      }
    })
  };

  const points = [
    { title: "Physical Athleticism", icon: <Zap size={20}/>, color: "text-orange-500" },
    { title: "Creative Brilliance", icon: <Star size={20}/>, color: "text-blue-500" },
    { title: "Intellectual Strategy", icon: <Target size={20}/>, color: "text-emerald-500" },
    { title: "Fair Play & Safety", icon: <ShieldCheck size={20}/>, color: "text-purple-500" }
  ];

  return (
    <div className="bg-white py-16 px-6 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        
        {/* --- LEFT CONTENT (Compact & Bold) --- */}
        <div className="flex-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            className="space-y-2"
          >
            {/* Heading updated to just "ABOUT" with Vara orange */}
            <h1 className="text-5xl md:text-6xl font-black text-black uppercase tracking-tighter italic leading-none">
              <span className="text-orange-500">ABOUT</span>
            </h1>
            <div className="w-12 h-2 bg-black"></div>
          </motion.div>

          <p className="text-base text-gray-700 font-bold leading-relaxed max-w-lg italic border-l-4 border-black pl-4 bg-slate-50 py-2">
            We bridge the gap between raw talent and professional excellence. Our platform ensures every student gets a fair stage to shine.
          </p>

          {/* Points Grid - Balanced Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {points.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-center group p-3 rounded-2xl border-2 border-transparent hover:border-black hover:bg-slate-50 transition-all cursor-default shadow-sm hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
                <div className={`p-2 bg-white rounded-lg border border-slate-100 ${item.color}`}>
                  {item.icon}
                </div>
                <h4 className="text-[13px] font-black text-black uppercase italic tracking-tight leading-none">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button className="group flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-full font-black text-[11px] uppercase italic tracking-widest shadow-[6px_6px_0px_0px_rgba(249,115,22,1)] hover:translate-y-[-2px] active:translate-y-[1px] transition-all">
              Get Started <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* --- RIGHT TILTED IMAGES (Mass Design) --- */}
        <div className="flex-1 relative w-full h-[450px] hidden lg:block">
          
          {/* Top Tilted Image */}
          <motion.div 
            variants={cardVariants} 
            initial="offscreen" 
            whileInView="onscreen" 
            custom={10} 
            viewport={{ once: true }}
            className="absolute top-0 right-5 w-[250px] h-[350px] z-20"
          >
            <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-[8px] border-black shadow-2xl bg-slate-200">
              <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500" className="w-full h-full object-cover" alt="sports" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white px-5 py-2 rounded-lg font-black italic uppercase text-[10px] border-[3px] border-black rotate-[-5deg] shadow-lg">
              #Champion
            </div>
          </motion.div>

          {/* Bottom Tilted Image */}
          <motion.div 
            variants={cardVariants} 
            initial="offscreen" 
            whileInView="onscreen" 
            custom={-8} 
            viewport={{ once: true }}
            className="absolute bottom-5 left-10 w-[210px] h-[310px] z-10"
          >
            <div className="w-full h-full rounded-[2rem] overflow-hidden border-[8px] border-black shadow-xl bg-slate-100">
              <img src="https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=500" className="w-full h-full object-cover grayscale" alt="mind" />
            </div>
            <div className="absolute -top-4 -left-4 bg-black text-white px-5 py-2 rounded-lg font-black italic uppercase text-[10px] border-[3px] border-white rotate-[5deg] shadow-lg">
              #Participate
            </div>
          </motion.div>

          {/* "VARA" Background Accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[130px] font-black text-slate-100 italic select-none -z-10 uppercase opacity-70">
            VARA
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;