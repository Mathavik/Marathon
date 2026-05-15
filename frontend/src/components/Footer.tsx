import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Footprints } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 pt-16 border-t border-gray-800">
      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-orange-600 p-2 rounded-md">
                <Footprints size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-black italic tracking-tighter uppercase text-white">
                Marathon <span className="text-orange-500">2026</span>
              </h1>
            </div>

            <p className="text-sm leading-relaxed">
              Join the ultimate running challenge in City Marathon 2026. Push your limits and achieve greatness.
            </p>
            
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-all">
                  <Icon size={18}/>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h3>
            <ul className="space-y-4 text-sm font-medium">
              {['Home', 'About', 'Events', 'Register', 'Contact'].map(item => (
                <li key={item} className="hover:text-white cursor-pointer transition-colors">• {item}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Contact</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="text-orange-500 shrink-0" size={18} />
                <span>Downtown City Center,<br />City Marathon Route.</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-orange-500" size={18} />
                <span>+91 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-orange-500" size={18} />
                <span>info@citymarathon2026.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Newsletter</h3>
            <div className="bg-gray-800 p-1 rounded-lg flex border border-gray-700">
              <input type="email" placeholder="Your email" className="bg-transparent px-4 py-2 w-full focus:outline-none text-sm" />
              <button className="bg-orange-500 text-black px-4 py-2 rounded-md font-bold text-xs uppercase hover:bg-orange-600 transition">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-800 py-8 bg-black/50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[11px] uppercase tracking-[0.2em] font-bold">
          <p>© 2026 City Marathon 2026. All Rights Reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;