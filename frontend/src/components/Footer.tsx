import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Trophy, Clock } from 'lucide-react';
import logo from '../assets/logo.png';
const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 border-t border-slate-900">
      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Info - Logo Section */}
          <div className="space-y-6">
            {/* Logo Image */}
            <div className="flex items-center">
              <img
                              src={logo}
              
                              alt="Event Logo"
                              className="h-18 w-auto object-contain"
                            />
            </div>

            <p className="text-sm leading-relaxed">
              Southern India's most prestigious cultural and sporting event. Dedicated to discovering and nurturing the stars of tomorrow.
            </p>
            
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-all">
                  <Icon size={18}/>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Competitions</h3>
            <ul className="space-y-4 text-sm font-medium">
              {['Track & Field', 'Classical Dance', 'Vocal Music', 'Traditional Kabaddi', 'Esports League'].map(item => (
                <li key={item} className="hover:text-white cursor-pointer transition-colors">• {item}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Official Venue</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="text-amber-500 shrink-0" size={18} />
                <span>Major Dhyan Chand Stadium,<br />Convention Center, Chennai.</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-amber-500" size={18} />
                <span>+91 44 2800 9000</span>
              </div>
            </div>
          </div>

          {/* Newsletter/Action */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Stay Updated</h3>
            <div className="bg-slate-900 p-1 rounded-lg flex border border-slate-800">
              <input type="email" placeholder="Email" className="bg-transparent px-4 py-2 w-full focus:outline-none text-sm" />
              <button className="bg-amber-500 text-slate-950 px-4 py-2 rounded-md font-bold text-xs uppercase">Join</button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-900 py-8 bg-black/50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[11px] uppercase tracking-[0.2em] font-bold">
          <p>© 2026 Grand Competition Committee. All Rights Reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Press Kit</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;