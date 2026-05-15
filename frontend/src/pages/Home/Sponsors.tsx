import React from 'react';

const Sponsors = () => {
  const sponsors = [
    'https://via.placeholder.com/150x50?text=Sponsor+1',
    'https://via.placeholder.com/150x50?text=Sponsor+2',
    'https://via.placeholder.com/150x50?text=Sponsor+3',
    'https://via.placeholder.com/150x50?text=Sponsor+4',
    'https://via.placeholder.com/150x50?text=Sponsor+5',
  ];

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-black text-center mb-12 uppercase tracking-wide">
          Our Sponsors
        </h2>
        <div className="flex overflow-hidden">
          <div className="flex animate-scroll" style={{ animation: 'scroll 20s linear infinite' }}>
            {sponsors.concat(sponsors).map((logo, idx) => (
              <img key={idx} src={logo} alt={`Sponsor ${idx + 1}`} className="h-12 mx-8 object-contain" />
            ))}
          </div>
        </div>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Sponsors;