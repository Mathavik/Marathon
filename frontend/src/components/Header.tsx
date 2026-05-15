import React, { useEffect, useState } from 'react';
import { Menu, X, Trophy } from 'lucide-react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';


const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const isLoggedIn = !!localStorage.getItem("token");
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const schoolName = localStorage.getItem("school_name");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>('');

  // const isLoggedIn = !!localStorage.getItem("token");
  // const schoolName = localStorage.getItem("school_name");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/me");
        setIsLoggedIn(true);
        setSchoolName(res.data.school_name);
      } catch {
        setIsLoggedIn(false);
      }
    };

    // HttpOnly token cookie can't be read from document.cookie,
    // so call /me directly and let the backend validate the session.
    checkAuth();
  }, []);
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/categories' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  // Countdown function
  const getTimeLeft = (eventDate: string): string => {
    const now = new Date().getTime();
    const event = new Date(eventDate).getTime();
    const diff = event - now;

    if (diff <= 0) return "Event Started 🔴";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s left`;
  };

  // Update countdown every second
  useEffect(() => {
    const mainEventDate = "2026-04-10T09:00:00"; // Your event date
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(mainEventDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-slate-950 text-white shadow-2xl sticky top-0 z-50 border-b border-amber-500/30">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Event Logo" className="h-18 w-auto object-contain" />
          </div>


          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href} // 'href' badhula 'to' podanum
                className="text-sm font-semibold text-slate-300 hover:text-amber-500 transition-all duration-300 uppercase tracking-widest"
              >
                {item.name}
              </Link>
            ))}

            {/* Countdown */}
            <div className="ml-6 px-4 py-2 bg-amber-500 text-slate-900 rounded-full font-bold text-sm">
              {timeLeft}
            </div>

            {/* Profile / Login */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-amber-500 px-5 py-2 rounded-full text-sm font-bold text-slate-900"
                >
                  {schoolName || "Profile"}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-700 rounded-xl shadow-lg overflow-hidden">
                    <button
                      onClick={async () => {
                        try {
                          await axiosInstance.post("/logout");
                          setIsLoggedIn(false);
                          setSchoolName("");
                          setIsDropdownOpen(false);
                          localStorage.removeItem("student_name");
                          localStorage.removeItem("student_id");
                          localStorage.removeItem("school_name");
                          // 🔥 force re-check
                          await axiosInstance.get("/me").catch(() => { });
                        } catch (err) {
                          console.error("Logout failed");
                        }
                      }}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-800"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-amber-500 px-5 py-2 rounded-full text-slate-900 font-bold">
                REGISTER NOW
              </Link>
            )}
          </div>

          {/* Mobile Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-amber-500">
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-6 bg-slate-900 rounded-2xl p-4 border border-slate-800">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href} // change href to to
                className="block py-3 px-4 text-slate-300 hover:text-amber-500 font-bold border-b border-slate-800 last:border-0"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {isLoggedIn ? (
              <button
                onClick={async () => {
                  try {
                    await axiosInstance.post("/logout");
                    setIsLoggedIn(false);
                    setSchoolName("");
                    setIsOpen(false); // mobile menu close
                    localStorage.removeItem("student_name");
                    localStorage.removeItem("student_id");
                    localStorage.removeItem("school_name");
                  } catch (err) {
                    console.error("Logout failed");
                  }
                }}
                className="block mt-4 bg-red-500 text-white px-5 py-2 rounded-full font-bold text-sm w-full"
              >
                LOGOUT
              </button>
            ) : (
              <Link
                to="/login"
                className="block mt-4 bg-amber-500 text-slate-950 px-5 py-2 rounded-full font-bold text-sm text-center hover:bg-amber-400"
                onClick={() => setIsOpen(false)}
              >
                REGISTER NOW
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;