import React from 'react';

const Gallery = () => {
  const images = [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400',
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=400',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=400',
    'https://images.unsplash.com/photo-1571019613564-1fbaebefb3db?q=80&w=400',
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=400',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=400',
  ];

  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-black text-center mb-12 uppercase tracking-wide">
          Gallery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300">
              <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-64 object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;