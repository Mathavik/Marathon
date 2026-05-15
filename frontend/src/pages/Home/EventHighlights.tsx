import React from 'react';
import { Trophy, Shirt, Award, Droplets, MapPin } from 'lucide-react';

const EventHighlights = () => {
  const highlights = [
    { icon: Trophy, label: 'Medal' },
    { icon: Shirt, label: 'T-shirt' },
    { icon: Award, label: 'Certificate' },
    { icon: Droplets, label: 'Water Bottle' },
    { icon: MapPin, label: 'Live Tracking' },
  ];

  return (
    <section className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-black text-center mb-12 uppercase tracking-wide">
          Event Highlights
        </h2>
        <div className="flex justify-center gap-8 flex-wrap">
          {highlights.map((item) => (
            <div key={item.label} className="text-center">
              <div className="bg-orange-500 p-4 rounded-full mb-2">
                <item.icon size={32} className="text-white" />
              </div>
              <p className="font-semibold">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventHighlights;