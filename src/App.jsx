import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ColorProvider } from './context/ColorContext';
import Navbar from './components/common/Navbar';
import Inicio from './views/Inicio';
import Diagnostico from './views/Diagnostico';
import Taller from './views/Taller';
import Academia from './views/Academia';
import Briefing from './views/Briefing';

export default function App() {
  return (
    <ColorProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#FAF6EF] text-[#241F1A]">
          {/* Barra de navegación superior accesible desde todas las vistas */}
          <Navbar />

          {/* Contenedor principal de rutas */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/diagnostico" element={<Diagnostico />} />
              <Route path="/taller" element={<Taller />} />
              <Route path="/academia" element={<Academia />} />
              <Route path="/briefing" element={<Briefing />} />
            </Routes>
          </main>

          {/* Pie de página */}
          <footer className="border-t border-[#241F1A]/10 bg-[#FAF6EF]/50 py-6 px-4 md:px-8 mt-auto">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 text-[#5B564E]">
                <span className="font-serif font-bold text-[#241F1A] tracking-wider">RULEC</span>
                <span className="w-1 h-1 rounded-full bg-[#241F1A]/20"></span>
                <span>Ing. de Sistemas & Marketing (UTEPSA)</span>
              </div>
              <div className="flex items-center gap-2 text-[#5B564E] bg-white px-4 py-1.5 rounded-full border border-[#241F1A]/5 shadow-sm">
                <span>Dirección Académica:</span>
                <span className="font-semibold text-[#1F4B44]">Lic. Gustavo Porcel</span>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ColorProvider>
  );
}