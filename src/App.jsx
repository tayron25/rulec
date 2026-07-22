import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ColorProvider } from './context/ColorContext';
import Navbar from './components/common/Navbar';
import Inicio from './views/Inicio';
import Diagnostico from './views/Diagnostico';
import Taller from './views/Taller';
import Academia from './views/Academia';

export default function App() {
  return (
    <ColorProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#FAF6EF] text-[#241F1A]">
          {/* Barra de navegación superior accesible desde las 4 vistas */}
          <Navbar />

          {/* Contenedor principal de rutas con animación de entrada */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/diagnostico" element={<Diagnostico />} />
              <Route path="/taller" element={<Taller />} />
              <Route path="/academia" element={<Academia />} />
            </Routes>
          </main>

          {/* Pie de página con créditos de la colaboración universitaria */}
          <footer className="border-t border-[#241F1A]/10 py-6 px-4 text-center text-xs text-[#9A9284]">
            <p className="font-serif italic">
              RULEC — Colaboración Universitaria: Ingeniería de Sistemas & Ingeniería de Marketing
            </p>
          </footer>
        </div>
      </Router>
    </ColorProvider>
  );
}
