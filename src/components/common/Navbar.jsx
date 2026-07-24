import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sparkles, Compass, Palette, BookOpen, FileText } from 'lucide-react';

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'Inicio', icon: Sparkles },
    { to: '/diagnostico', label: 'Diagnóstico', icon: Compass },
    { to: '/briefing', label: 'Briefing', icon: FileText },
    { to: '/taller', label: 'Taller Cromático', icon: Palette },
    { to: '/academia', label: 'Academia', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EF]/85 backdrop-blur-md border-b border-[#241F1A]/10 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        
        {/* Logo comercial actualizado con Imagen */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group focus:outline-none shrink-0">
          <img 
            src="/logo-rulec.png" 
            alt="Logo RULEC" 
            className="h-8 sm:h-10 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
          />
          <span className="hidden lg:inline-block text-xs sm:text-sm font-serif italic text-[#9A9284] mt-1">
            Asesor de Marca
          </span>
        </Link>

        {/* Navegación Responsive */}
        <nav className="flex items-center gap-0.5 sm:gap-1.5 bg-white/80 border border-[#241F1A]/10 p-1 rounded-full shadow-sm overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 shrink-0 ${
                    isActive
                      ? 'bg-[#1F4B44] text-white shadow-sm font-semibold'
                      : 'text-[#5B564E] hover:text-[#241F1A] hover:bg-[#FAF6EF]'
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}