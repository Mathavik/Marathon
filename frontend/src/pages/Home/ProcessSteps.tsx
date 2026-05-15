import React from 'react';
import { UserPlus, LogIn, CalendarCheck, CreditCard, ArrowRight, Zap } from 'lucide-react';

const ProcessSteps = () => {
  const steps = [
    { 
      id: "01", 
      label: "REGISTER", 
      title: "CREATE ACCOUNT",
      desc: "Sign up and build your official athlete profile for tournaments.", 
      icon: <UserPlus size={22} />, 
      color: "bg-[#0f766e]", 
      side: "left" 
    },
    { 
      id: "02", 
      label: "LOGIN", 
      title: "ACCESS PORTAL",
      desc: "Log in to manage registrations and track match history.", 
      icon: <LogIn size={22} />, 
      color: "bg-[#1d4ed8]", 
      side: "right" 
    },
    { 
      id: "03", 
      label: "BOOK", 
      title: "RESERVE SLOTS",
      desc: "Select preferred games and time slots to secure your spot.", 
      icon: <CalendarCheck size={22} />, 
      color: "bg-[#ea580c]", 
      side: "left" 
    },
    { 
      id: "04", 
      label: "PAY", 
      title: "CONFIRM ENTRY",
      desc: "Complete secure payment to finalize your registration.", 
      icon: <CreditCard size={22} />, 
      color: "bg-[#059669]", 
      side: "right" 
    },
  ];

  return (
    <section className="bg-white py-16 px-4 overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* COMPACT HEADER */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full mb-4 border border-orange-100">
            <Zap size={14} className="fill-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Official Protocol</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-[1000] text-slate-900 uppercase italic tracking-tighter">
            How to <span className="text-orange-500">Get Started</span>
          </h2>
        </div>

        {/* RIBBON LAYOUT - UNIFORM STYLE */}
        <div className="space-y-12 relative">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className={`flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 ${
                step.side === 'right' ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* CONTENT SIDE (Title Top, Desc Bottom - Uniform for all) */}
              <div className={`w-full md:w-1/2 px-10 flex flex-col ${
                step.side === 'left' ? 'md:items-end md:text-right' : 'md:items-start md:text-left'
              }`}>
                <h4 className="text-2xl font-[1000] text-slate-900 uppercase italic tracking-tighter leading-none mb-3">
                  {step.title}
                </h4>
                <p className="text-slate-500 text-[12px] font-bold leading-relaxed max-w-[320px] uppercase tracking-tight">
                  {step.desc}
                </p>
              </div>

              {/* RIBBON SIDE */}
              <div className="w-full md:w-1/2 relative flex items-center group">
                {/* Connector Dot */}
                <div className={`hidden md:flex items-center absolute z-20 ${
                  step.side === 'left' ? 'left-[-12px]' : 'right-[-12px]'
                }`}>
                   <div className={`w-4 h-4 rounded-full bg-white border-[4px] transition-all shadow-sm ${
                     step.side === 'left' ? 'border-slate-200 group-hover:border-orange-500' : 'border-orange-500 group-hover:border-slate-200'
                   }`} />
                </div>

                {/* The Ribbon Shape */}
                <div className={`relative flex items-center w-full h-24 text-white shadow-xl transition-all duration-500 group-hover:-translate-y-1 ${
                  step.color
                } ${
                  step.side === 'left' 
                  ? 'rounded-r-full pl-12 clip-ribbon-left' 
                  : 'rounded-l-full pr-12 clip-ribbon-right md:flex-row-reverse'
                }`}>
                  
                  {/* Step ID Area */}
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <span className="text-3xl md:text-4xl font-[1000] uppercase italic tracking-tighter leading-none">
                      STEP {step.id}
                    </span>
                    <span className="text-[10px] font-black tracking-[0.3em] mt-1 opacity-70 italic">
                      {step.label}
                    </span>
                  </div>

                  {/* Icon Circle */}
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-800 shadow-xl group-hover:scale-110 transition-transform mx-4">
                    {step.icon}
                  </div>

                  {/* Sidebar Badge */}
                  <div className="hidden lg:block px-8 py-2 border-l border-white/20">
                    <span className="text-[10px] font-black uppercase tracking-widest italic opacity-60 whitespace-nowrap">
                      PROCESS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {/* <div className="mt-20 text-center">
          <button className="group bg-slate-900 text-white px-12 py-5 rounded-xl font-black uppercase italic tracking-widest text-sm hover:bg-orange-600 transition-all shadow-2xl flex items-center gap-4 mx-auto active:scale-95">
            Begin Your Journey <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div> */}
      </div>

      <style>{`
        .clip-ribbon-left { clip-path: polygon(7% 0%, 100% 0%, 100% 100%, 7% 100%, 0% 50%); }
        .clip-ribbon-right { clip-path: polygon(0% 0%, 93% 0%, 100% 50%, 93% 100%, 0% 100%); }
      `}</style>
    </section>
  );
};

export default ProcessSteps;