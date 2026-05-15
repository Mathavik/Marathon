import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

const AdminSidebar: React.FC = () => {

  const linkClass =
    "block py-3 px-4 rounded-lg transition-all duration-300 font-semibold mb-2 tracking-wide text-sm uppercase";

  const activeClass =
    "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20";

  const hoverClass =
    "hover:bg-slate-800 text-slate-300 hover:text-amber-500";

  return (
    <>
      {/* 🔥 Scrollbar style (same file) */}
      <style>
        {`
          .custom-scroll::-webkit-scrollbar {
            width: 6px;
          }

          .custom-scroll::-webkit-scrollbar-track {
            background: #020617;
          }

          .custom-scroll::-webkit-scrollbar-thumb {
            background: #f59e0b;
            border-radius: 10px;
          }

          .custom-scroll::-webkit-scrollbar-thumb:hover {
            background: #fb923c;
          }
        `}
      </style>

      <div className="w-64 h-screen bg-slate-950 text-white flex flex-col border-r border-amber-500/20">

        {/* 🔝 Logo (fixed) */}
        <div className="flex items-center justify-center p-5 border-b border-amber-500/30">
          <img
            src={logo}
            alt="Admin Logo"
            className="h-14 w-auto object-contain"
          />
        </div>

        {/* 🔽 Scroll only menu */}
        <div className="custom-scroll flex-1 overflow-y-auto p-5">

          <nav className="flex flex-col">
            <NavLink to="/admin" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
              Dashboard
            </NavLink>

            <NavLink to="/admin/categories" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
              Categories
            </NavLink>

            <NavLink to="/admin/adminEvents" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
              Events
            </NavLink>

            <NavLink to="/admin/adminGallery" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
              Gallery
            </NavLink>

            <NavLink to="/admin/registrations" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
              Registrations
            </NavLink>

            <NavLink to="/admin/participation-certificate" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
              Participation Certificate
            </NavLink>

            <NavLink to="/admin/winners" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
              Winners
            </NavLink>

            <NavLink to="/admin/school-report" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
              School Reports
            </NavLink>

            <NavLink to="/admin/ads" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
              Advertisements
            </NavLink>

            <NavLink to="/admin/overall-winners" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
              Overall Winners
            </NavLink>

            <NavLink to="/admin/certificate" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : hoverClass}`}>
              Certificate setting
            </NavLink>
          </nav>

          {/* bottom decoration */}
          <div className="mt-10 opacity-20 text-center">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminSidebar;