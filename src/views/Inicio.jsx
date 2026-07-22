import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Palette } from 'lucide-react';

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4.5rem)] px-4 sm:px-6 py-12 md:py-24 text-center">
      {/* Contenedor central con amplio espacio en blanco e impacto visual */}
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Píldora sutil de bienvenida */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F4B44]/10 border border-[#1F4B44]/15 text-[#1F4B44] text-xs sm:text-sm font-semibold tracking-wide mb-8 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E84F30]" />
          <span>Asesor Inteligente para Emprendedores Bolivianos</span>
        </div>

        {/* Título Principal */}
        <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-[#241F1A] tracking-tight leading-[1.12] mb-6 max-w-2xl">
          Encuentra los colores perfectos para tu marca
        </h1>

        {/* Subtítulo Cálido */}
        <p className="text-[#5B564E] text-lg sm:text-xl md:text-2xl font-normal leading-relaxed mb-12 max-w-xl">
          Sin complicaciones y en menos de un minuto.
        </p>

        {/* Botones de Acción (Mobile-First y Centrados) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16">
          {/* Botón Primario: Llamativo, grande */}
          <button
            onClick={() => navigate('/diagnostico')}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#1F4B44] text-white font-medium text-base sm:text-lg shadow-lg shadow-[#1F4B44]/20 hover:bg-[#183934] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <span>Ayúdame a elegir (Test Rápido)</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Botón Secundario: Estilo fantasma o sutil debajo / a un lado del primario */}
          <button
            onClick={() => navigate('/taller')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-[#241F1A]/20 bg-transparent text-[#5B564E] font-medium text-sm sm:text-base hover:text-[#241F1A] hover:bg-white/80 hover:border-[#241F1A]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <Palette className="w-4 h-4 text-[#E84F30]" />
            <span>Ya sé lo que busco, ir al Taller de Colores</span>
          </button>
        </div>

        {/* Puntos de valor (Sin tecnicismos, orientados a confianza) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-[#241F1A]/10 w-full max-w-2xl text-left sm:text-center">
          <div className="flex items-center sm:flex-col sm:justify-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1F4B44]/10 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-[#1F4B44]" />
            </div>
            <div>
              <p className="font-semibold text-xs sm:text-sm text-[#241F1A]">Cero Tecnicismos</p>
              <p className="text-xs text-[#9A9284]">Lenguaje 100% comercial y amigable</p>
            </div>
          </div>

          <div className="flex items-center sm:flex-col sm:justify-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E84F30]/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-[#E84F30]" />
            </div>
            <div>
              <p className="font-semibold text-xs sm:text-sm text-[#241F1A]">Rueda Analógica Real</p>
              <p className="text-xs text-[#9A9284]">Física de giro suave de alta precisión</p>
            </div>
          </div>

          <div className="flex items-center sm:flex-col sm:justify-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#BE8A3A]/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#BE8A3A]" />
            </div>
            <div>
              <p className="font-semibold text-xs sm:text-sm text-[#241F1A]">PDF 100% Vectorial</p>
              <p className="text-xs text-[#9A9284]">Listo para imprentas e Illustrator</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
