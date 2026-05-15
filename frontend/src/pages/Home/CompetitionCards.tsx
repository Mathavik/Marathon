import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Music, Palette, Lightbulb, ArrowUpRight } from 'lucide-react';

const CompetitionCards = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "SPORTS",
      path: "/events/sports",
      desc: "Indoor and Outdoor Sports Events",
      img: "https://i.pinimg.com/736x/64/77/9e/64779e9f91786fc25b06a2592bfdfd3d.jpg",
      color: "bg-orange-500",
      icon: <Trophy size={20} />
    },
    {
      title: "PERFORMING ARTS",
      path: "/events/performing-arts",
      desc: "Dance, Singing, Drama, Music, etc.",
      img: "https://i.pinimg.com/736x/46/af/55/46af55a204d9caab72979411904986d1.jpg",
      color: "bg-blue-600",
      icon: <Music size={20} />
    },
    {
      title: "VISUAL ARTS",
      path: "/events/visual-arts",
      desc: "Painting, Rangoli, Craft, Photography, etc.",
      img: "https://i.pinimg.com/736x/a2/b9/14/a2b914223ef2301c870837723aa76a2d.jpg",
      color: "bg-emerald-500",
      icon: <Palette size={20} />
    },
    {
      title: "FUN / MISC",
      path: "/events/fun-misc",
      desc: "Quiz, Debate, Talent Shows, Games, etc.",
      img: "https://i.pinimg.com/1200x/ba/5f/f4/ba5ff4dee9062ac70594ea9428f88c3c.jpg",
      color: "bg-purple-600",
      icon: <Lightbulb size={20} />
    }
  ];

  return (
    <div className="bg-white py-12 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[420px]">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              onClick={() => navigate(cat.path)}
              className="group relative flex-1 overflow-hidden transition-all duration-500 ease-out hover:flex-[1.6] bg-white rounded-[2rem] border-2 border-slate-100 cursor-pointer shadow-lg hover:shadow-2xl"
            >
              {/* --- BACKGROUND IMAGE: Removed Grayscale & Added Zoom --- */}
              <img 
                src={cat.img} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={cat.title} 
              />

              {/* --- SOFT GRADIENT: Just to make text readable (Not Black) --- */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

              {/* Content Overlay */}
              <div className="relative z-20 h-full p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  {/* Category Icon with matched color */}
                  <div className={`p-4 rounded-2xl ${cat.color} text-white shadow-xl transform group-hover:rotate-12 transition-all duration-300`}>
                    {cat.icon}
                  </div>
                  <div className="bg-white/30 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all">
                    <ArrowUpRight size={22} />
                  </div>
                </div>

                <div className="transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                  <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none mb-2 drop-shadow-lg">
                    {cat.title}
                  </h3>
                  <p className="text-white/90 text-[11px] font-bold uppercase tracking-wide leading-tight max-w-[200px] mb-4">
                    {cat.desc}
                  </p>
                  
                  {/* Explore Button: Dynamic Color matching the category */}
                 {/* Explore Button: High Contrast */}
{/* Explore Button: Full Visibility Fix */}
{/* Explore Button: Full Visibility Fix */}
<button 
  onClick={(e) => {
    e.stopPropagation();
    navigate("/categories");
  }}
  /* 1. 'z-30 relative' - Ithu image-ku mela button-a thallum.
     2. '${cat.color}' - Purple color contrast nalla theriya vaikum.
     3. 'group-hover:translate-y-0' - Hover pannum pothu button-a sariya align pannum.
  */
  className={`w-full mt-4 ${cat.color} text-white py-3 rounded-xl font-black text-[10px] 
    uppercase text-center shadow-xl z-30 relative
    opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 
    transition-all duration-300 hover:brightness-110 active:scale-95`}
>
  Explore Now
</button>
                </div>
              </div>

              {/* Decorative Number: Subtle and Clean */}
              <span className="absolute top-4 right-8 text-7xl font-black text-white/20 italic select-none pointer-events-none">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetitionCards;