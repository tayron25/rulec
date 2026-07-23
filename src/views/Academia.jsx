import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Shapes,
  Palette,
  Tag,
  ArrowRight,
  Sparkles,
  Layers,
  Heart,
  ShieldCheck,
  Flame,
  Zap
} from 'lucide-react';

export default function Academia() {
  const navigate = useNavigate();

  // Pestañas disponibles: 'color' | 'shapes' | 'anatomy' | 'naming'
  const [activeTab, setActiveTab] = useState('color');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-20 animate-fade-in">
      
      {/* CABECERA */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241F1A]/5 border border-[#241F1A]/10 text-[#5B564E] text-xs font-semibold uppercase tracking-wider mb-4">
          <BookOpen className="w-3.5 h-3.5 text-[#1F4B44]" />
          <span>Conocimiento Aplicable para Emprendedores</span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#241F1A] mb-4 tracking-tight">
          Academia de Identidad Visual
        </h1>
        <p className="text-[#5B564E] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Teoría pedagógica sin tecnicismos. Descubre la psicología detrás de los colores, el significado de cada curva, la estructura de logotipos y técnicas para bautizar tu marca.
        </p>
      </div>

      {/* NAVEGACIÓN POR PESTAÑAS (4 TABS) */}
      <div className="flex justify-center mb-12 sm:mb-16">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 p-2 bg-white rounded-2xl border border-[#241F1A]/10 shadow-sm max-w-full">
          
          <button
            onClick={() => setActiveTab('color')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === 'color'
                ? 'bg-[#1F4B44] text-white shadow-md'
                : 'text-[#5B564E] hover:text-[#241F1A] hover:bg-[#FAF6EF]'
            }`}
          >
            <Palette className="w-4 h-4 shrink-0" />
            <span>Psicología del Color</span>
          </button>

          <button
            onClick={() => setActiveTab('shapes')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === 'shapes'
                ? 'bg-[#1F4B44] text-white shadow-md'
                : 'text-[#5B564E] hover:text-[#241F1A] hover:bg-[#FAF6EF]'
            }`}
          >
            <Shapes className="w-4 h-4 shrink-0" />
            <span>Formas y Curvas</span>
          </button>

          <button
            onClick={() => setActiveTab('anatomy')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === 'anatomy'
                ? 'bg-[#1F4B44] text-white shadow-md'
                : 'text-[#5B564E] hover:text-[#241F1A] hover:bg-[#FAF6EF]'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>Anatomía del Logo</span>
          </button>

          <button
            onClick={() => setActiveTab('naming')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === 'naming'
                ? 'bg-[#1F4B44] text-white shadow-md'
                : 'text-[#5B564E] hover:text-[#241F1A] hover:bg-[#FAF6EF]'
            }`}
          >
            <Tag className="w-4 h-4 shrink-0" />
            <span>Guía de Naming</span>
          </button>

        </div>
      </div>

      {/* PESTAÑA 1: PSICOLOGÍA DEL COLOR */}
      {activeTab === 'color' && (
        <div className="space-y-12 animate-fade-in">
          <div className="bg-white border border-[#241F1A]/10 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-serif italic text-[#9A9284] uppercase tracking-wider block mb-1">
                Percepción Emocional
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#241F1A]">
                El Impacto Psicológico de los Colores
              </h2>
              <p className="text-xs sm:text-sm text-[#5B564E] mt-2 leading-relaxed">
                Los colores evocan emociones inmediatas antes de que el cerebro procese el texto. Elige la tonalidad que mejor conecte con los valores de tu negocio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Verde */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#1F4B44] flex items-center justify-center shrink-0 shadow-md text-white">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="text-center sm:text-left flex-grow">
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">Verde Pino / Bosque</h3>
                  <div className="inline-flex flex-wrap gap-1.5 mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#1F4B44]">Sostenibilidad</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#1F4B44]">Estabilidad</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#1F4B44]">Prosperidad</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed">
                    Comunica crecimiento orgánico, ética, salud y solidez financiera. Es perfecto para empresas agrícolas, consultoras sostenibles, proyectos ecológicos y finanzas.
                  </p>
                </div>
              </div>

              {/* Terracota / Naranja */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#E84F30] flex items-center justify-center shrink-0 shadow-md text-white">
                  <Flame className="w-8 h-8" />
                </div>
                <div className="text-center sm:text-left flex-grow">
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">Terracota / Naranja Cálido</h3>
                  <div className="inline-flex flex-wrap gap-1.5 mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#E84F30]">Energía</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#E84F30]">Tradición</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#E84F30]">Cercanía</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed">
                    Evoca la calidez de la tierra, artesanía, dinamismo y creatividad sin resultar agresivo. Ideal para marcas gastronómicas, diseño y productos artesanales.
                  </p>
                </div>
              </div>

              {/* Azul */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#2B547E] flex items-center justify-center shrink-0 shadow-md text-white">
                  <Zap className="w-8 h-8" />
                </div>
                <div className="text-center sm:text-left flex-grow">
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">Azul Profundo</h3>
                  <div className="inline-flex flex-wrap gap-1.5 mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#2B547E]">Confianza</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#2B547E]">Seguridad</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#2B547E]">Tecnología</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed">
                    Transmite calma, profesionalismo e integridad. Es el tono preferido para servicios de software, ingeniería, firmas legales e instituciones médicas.
                  </p>
                </div>
              </div>

              {/* Crema / Neutros */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#241F1A] flex items-center justify-center shrink-0 shadow-md text-white">
                  <Heart className="w-8 h-8" />
                </div>
                <div className="text-center sm:text-left flex-grow">
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">Tonos Neutros y Arena</h3>
                  <div className="inline-flex flex-wrap gap-1.5 mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#241F1A]">Elegancia</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#241F1A]">Sofisticación</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#241F1A]">Calidez</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed">
                    Proporcionan un fondo sofisticado y sereno. Permiten que los colores principales destaquen y añaden un toque orgánico y elegante a la papelería corporativa.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 2: FORMAS Y CURVAS */}
      {activeTab === 'shapes' && (
        <div className="space-y-12 animate-fade-in">
          <div className="bg-white border border-[#241F1A]/10 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-serif italic text-[#9A9284] uppercase tracking-wider block mb-1">
                Fundamentos Geométricos
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#241F1A]">
                El Lenguaje Invisible de las Formas
              </h2>
              <p className="text-xs sm:text-sm text-[#5B564E] mt-2 leading-relaxed">
                Antes de leer una palabra, el cerebro humano procesa la silueta de un emblema. La forma geométrica que elijas para enmarcar tu logotipo dictará la primera impresión emocional de tu cliente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Círculos y Óvalos */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-md transition-shadow">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[#1F4B44] bg-white flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-[#1F4B44]/15" />
                </div>
                <div className="text-center sm:text-left flex-grow">
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">
                    Círculos y Óvalos
                  </h3>
                  <div className="inline-flex flex-wrap gap-1.5 mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#1F4B44]">Comunidad</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#1F4B44]">Protección</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#1F4B44]">Movimiento</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed">
                    Al carecer de esquinas o bordes punzantes, los círculos transmiten amabilidad, calidez y afecto. Son perfectos para marcas que desean proyectar unidad, familia, trabajo en equipo y fluidez constante.
                  </p>
                </div>
              </div>

              {/* Cuadrados y Rectángulos */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-md transition-shadow">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl border-4 border-[#241F1A] bg-white flex items-center justify-center shrink-0 shadow-sm relative">
                  <div className="w-10 h-10 rounded-md bg-[#241F1A]/10" />
                </div>
                <div className="text-center sm:text-left flex-grow">
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">
                    Cuadrados y Rectángulos
                  </h3>
                  <div className="inline-flex flex-wrap gap-1.5 mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#241F1A]">Estabilidad</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#241F1A]">Estructura</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#241F1A]">Confianza</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed">
                    Representan los cimientos de un edificio. Inspiran solidez, orden, honestidad y permanencia en el tiempo. Son ideales para consultoras, despachos legales, empresas de construcción y tecnología.
                  </p>
                </div>
              </div>

              {/* Líneas Rectas */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-md transition-shadow">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-[#241F1A]/20 bg-white flex items-center justify-center shrink-0 shadow-sm gap-2 p-3">
                  <div className="w-1.5 h-full bg-[#E84F30] rounded-full" />
                  <div className="w-1.5 h-full bg-[#1F4B44] rounded-full" />
                  <div className="w-1.5 h-full bg-[#241F1A] rounded-full" />
                </div>
                <div className="text-center sm:text-left flex-grow">
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">
                    Líneas Rectas (Verticales y Horizontales)
                  </h3>
                  <div className="inline-flex flex-wrap gap-1.5 mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#E84F30]">Eficiencia</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#E84F30]">Orden</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#E84F30]">Liderazgo</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed">
                    Las líneas verticales sugieren crecimiento, superación y fuerza; impulsan la mirada hacia arriba. Las líneas horizontales aportan calma, horizonte, estabilidad y tranquilidad.
                  </p>
                </div>
              </div>

              {/* Curvas y Formas Orgánicas */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-md transition-shadow">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] border-4 border-[#1F4B44] bg-white flex items-center justify-center shrink-0 shadow-sm relative transition-all duration-500 hover:rounded-full">
                  <Sparkles className="w-8 h-8 text-[#1F4B44]" />
                </div>
                <div className="text-center sm:text-left flex-grow">
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">
                    Curvas y Formas Orgánicas
                  </h3>
                  <div className="inline-flex flex-wrap gap-1.5 mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#1F4B44]">Creatividad</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#1F4B44]">Naturaleza</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-[#241F1A]/10 text-[11px] font-semibold text-[#1F4B44]">Fluidez</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed">
                    Inspiradas en las hojas, el agua, las nubes o la arcilla moldeada a mano. Rompen la rigidez geométrica para transmitir autenticidad, calor humano, salud holística y originalidad.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 3: ANATOMÍA DEL LOGO */}
      {activeTab === 'anatomy' && (
        <div className="space-y-12 animate-fade-in">
          <div className="bg-white border border-[#241F1A]/10 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-serif italic text-[#9A9284] uppercase tracking-wider block mb-1">
                Anatomía de Marca
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#241F1A]">
                Diccionario Visual: ¿Qué tipo de logo necesitas?
              </h2>
              <p className="text-xs sm:text-sm text-[#5B564E] mt-2 leading-relaxed">
                En el mundo comercial, la palabra "logotipo" se usa para todo, pero técnicamente existen 4 formatos diferentes. Conocer la diferencia te ayudará a pedirle exactamente lo que deseas a tu diseñador gráfico o imprenta.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Isotipo */}
              <div className="border border-[#241F1A]/15 rounded-3xl p-6 sm:p-8 bg-[#FAF6EF]/40 flex flex-col justify-between hover:shadow-lg transition-all">
                <div>
                  <div className="h-32 rounded-2xl bg-white border border-[#241F1A]/10 mb-6 flex items-center justify-center shadow-inner relative">
                    <div className="w-16 h-16 rounded-2xl bg-[#1F4B44] text-white flex items-center justify-center font-serif font-bold text-3xl shadow-md">
                      R
                    </div>
                    <span className="absolute bottom-2 right-3 text-[10px] font-mono uppercase text-[#9A9284]">Símbolo puro</span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-[#241F1A] mb-2">1. Isotipo</h3>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#1F4B44]/10 text-[#1F4B44] text-xs font-semibold mb-3">Solo el Símbolo o Ícono</span>
                  <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed mb-6">
                    Es el dibujo o emblema gráfico sin texto. Funciona cuando tu marca ya es muy reconocida y la gente asocia inmediatamente el símbolo con tu empresa.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#241F1A]/10 text-xs text-[#5B564E]">
                  <strong>Ejemplos Famosos:</strong> La manzana de Apple, el check de Nike o el pájaro de Twitter/X.
                </div>
              </div>

              {/* Logotipo */}
              <div className="border border-[#241F1A]/15 rounded-3xl p-6 sm:p-8 bg-[#FAF6EF]/40 flex flex-col justify-between hover:shadow-lg transition-all">
                <div>
                  <div className="h-32 rounded-2xl bg-white border border-[#241F1A]/10 mb-6 flex items-center justify-center shadow-inner relative px-6">
                    <span className="font-serif font-bold text-3xl sm:text-4xl tracking-tight text-[#241F1A]">Coca-Cola</span>
                    <span className="absolute bottom-2 right-3 text-[10px] font-mono uppercase text-[#9A9284]">Solo tipografía</span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-[#241F1A] mb-2">2. Logotipo</h3>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#241F1A]/10 text-[#241F1A] text-xs font-semibold mb-3">Exclusivamente Letras / Texto</span>
                  <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed mb-6">
                    Se compone únicamente por palabras y tipografía especial. La fuerza de la marca reside 100% en el carácter y diseño de las letras.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#241F1A]/10 text-xs text-[#5B564E]">
                  <strong>Ejemplos Famosos:</strong> Coca-Cola, Google, Sony, Zara o Canon.
                </div>
              </div>

              {/* Imagotipo */}
              <div className="border border-[#241F1A]/15 rounded-3xl p-6 sm:p-8 bg-[#FAF6EF]/40 flex flex-col justify-between hover:shadow-lg transition-all">
                <div>
                  <div className="h-32 rounded-2xl bg-white border border-[#241F1A]/10 mb-6 flex items-center justify-center gap-4 shadow-inner relative px-6">
                    <div className="w-12 h-12 rounded-xl bg-[#E84F30] text-white flex items-center justify-center font-serif font-bold text-2xl shadow-sm">
                      S
                    </div>
                    <span className="font-serif font-bold text-2xl text-[#241F1A]">Spotify</span>
                    <span className="absolute bottom-2 right-3 text-[10px] font-mono uppercase text-[#9A9284]">Separables y Versátiles</span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-[#241F1A] mb-2">3. Imagotipo</h3>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#E84F30]/10 text-[#E84F30] text-xs font-semibold mb-3">Ícono y Texto Juntos (Separables)</span>
                  <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed mb-6">
                    Armonía entre el símbolo y el texto colocados de forma independiente. Su ventaja es que pueden usarse juntos o por separado según la pieza publicitaria.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#241F1A]/10 text-xs text-[#5B564E]">
                  <strong>Ejemplos Famosos:</strong> Lacoste, Spotify, Adidas, Puma o Amazon.
                </div>
              </div>

              {/* Isologo */}
              <div className="border border-[#241F1A]/15 rounded-3xl p-6 sm:p-8 bg-[#FAF6EF]/40 flex flex-col justify-between hover:shadow-lg transition-all">
                <div>
                  <div className="h-32 rounded-2xl bg-white border border-[#241F1A]/10 mb-6 flex items-center justify-center shadow-inner relative px-6">
                    <div className="px-6 py-3 rounded-full border-2 border-[#1F4B44] bg-[#1F4B44] text-white font-serif font-bold text-xl tracking-wider shadow-md flex items-center gap-2">
                      <span>🛡️</span>
                      <span>BURGER KING</span>
                    </div>
                    <span className="absolute bottom-2 right-3 text-[10px] font-mono uppercase text-[#9A9284]">Indivisibles</span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-[#241F1A] mb-2">4. Isologo</h3>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#1F4B44]/10 text-[#1F4B44] text-xs font-semibold mb-3">Texto e Ícono Fusionados (Indivisibles)</span>
                  <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed mb-6">
                    Las letras y el dibujo forman una sola pieza o escudo indivisible. El texto está integrado dentro del gráfico; no se pueden separar.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#241F1A]/10 text-xs text-[#5B564E]">
                  <strong>Ejemplos Famosos:</strong> Burger King, BMW, Starbucks, Ford o Harley-Davidson.
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 4: GUÍA DE NAMING */}
      {activeTab === 'naming' && (
        <div className="space-y-12 animate-fade-in">
          <div className="bg-white border border-[#241F1A]/10 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-serif italic text-[#9A9284] uppercase tracking-wider block mb-1">
                Bautizando tu Emprendimiento
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#241F1A]">
                Guía Práctica de Naming Comercial
              </h2>
              <p className="text-xs sm:text-sm text-[#5B564E] mt-2 leading-relaxed">
                El nombre es el primer contacto con tus clientes. Descubre las 7 fórmulas comerciales probadas para crear o evaluar el nombre de tu negocio.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              
              <div className="border border-[#241F1A]/15 rounded-2xl p-6 bg-[#FAF6EF]/50 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1">01. Directo y Literal</span>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">Descriptivo</h3>
                  <p className="text-xs text-[#5B564E] leading-relaxed mb-4">Dice exactamente lo que hace tu negocio sin rodeos ni metáforas.</p>
                </div>
                <div className="pt-3 border-t border-[#241F1A]/10 text-xs">
                  <span className="text-[#9A9284] block mb-1">Ejemplos:</span>
                  <span className="font-semibold text-[#241F1A]">Gas Natural, Telepizza, General Motors.</span>
                </div>
              </div>

              <div className="border border-[#241F1A]/15 rounded-2xl p-6 bg-[#FAF6EF]/50 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1">02. Iniciales y Siglas</span>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">Acrónimo</h3>
                  <p className="text-xs text-[#5B564E] leading-relaxed mb-4">Formado por las iniciales de un nombre corporativo largo.</p>
                </div>
                <div className="pt-3 border-t border-[#241F1A]/10 text-xs">
                  <span className="text-[#9A9284] block mb-1">Ejemplos:</span>
                  <span className="font-semibold text-[#241F1A]">IBM, ENTEL, BBVA, DHL.</span>
                </div>
              </div>

              <div className="border border-[#241F1A]/15 rounded-2xl p-6 bg-[#FAF6EF]/50 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1">03. Palabras Inventadas</span>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">Abstracto</h3>
                  <p className="text-xs text-[#5B564E] leading-relaxed mb-4">Sonidos o palabras creados desde cero sin significado previo en el diccionario.</p>
                </div>
                <div className="pt-3 border-t border-[#241F1A]/10 text-xs">
                  <span className="text-[#9A9284] block mb-1">Ejemplos:</span>
                  <span className="font-semibold text-[#241F1A]">Kodak, Rolex, Spotify.</span>
                </div>
              </div>

              <div className="border border-[#241F1A]/15 rounded-2xl p-6 bg-[#FAF6EF]/50 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1">04. Promesa y Beneficio</span>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">Sugerente</h3>
                  <p className="text-xs text-[#5B564E] leading-relaxed mb-4">Sugiere sutilmente la ventaja o el beneficio clave de tu propuesta.</p>
                </div>
                <div className="pt-3 border-t border-[#241F1A]/10 text-xs">
                  <span className="text-[#9A9284] block mb-1">Ejemplos:</span>
                  <span className="font-semibold text-[#241F1A]">Pinterest, Netflix, Duracell.</span>
                </div>
              </div>

              <div className="border border-[#241F1A]/15 rounded-2xl p-6 bg-[#FAF6EF]/50 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1">05. Fusión de Conceptos</span>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">Neologismo</h3>
                  <p className="text-xs text-[#5B564E] leading-relaxed mb-4">Unión inteligente de dos palabras existentes para crear un concepto moderno.</p>
                </div>
                <div className="pt-3 border-t border-[#241F1A]/10 text-xs">
                  <span className="text-[#9A9284] block mb-1">Ejemplos:</span>
                  <span className="font-semibold text-[#241F1A]">Instagram, Accenture.</span>
                </div>
              </div>

              <div className="border border-[#241F1A]/15 rounded-2xl p-6 bg-[#FAF6EF]/50 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1">06. Mitología e Historia</span>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">Evocativo</h3>
                  <p className="text-xs text-[#5B564E] leading-relaxed mb-4">Evoca un personaje histórico o mitológico que comparte los valores de tu empresa.</p>
                </div>
                <div className="pt-3 border-t border-[#241F1A]/10 text-xs">
                  <span className="text-[#9A9284] block mb-1">Ejemplos:</span>
                  <span className="font-semibold text-[#241F1A]">Nike, Amazon.</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* PIE DE PÁGINA Y LLAMADA A LA ACCIÓN */}
      <div className="mt-16 bg-white border border-[#241F1A]/10 rounded-3xl p-8 sm:p-10 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="text-left max-w-lg">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#241F1A] mb-1">
            ¿Listo para aplicar esta teoría en tu marca?
          </h3>
          <p className="text-xs sm:text-sm text-[#5B564E]">
            Vuelve al Taller Cromático para ajustar tu paleta o realiza el test de diagnóstico en 3 pasos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => navigate('/diagnostico')}
            className="px-6 py-3 rounded-full border border-[#241F1A]/20 bg-[#FAF6EF] text-xs sm:text-sm font-semibold text-[#241F1A] hover:bg-[#241F1A] hover:text-white transition-all cursor-pointer"
          >
            Hacer Test Diagnóstico
          </button>
          <button
            onClick={() => navigate('/taller')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F4B44] text-white text-xs sm:text-sm font-semibold hover:bg-[#183934] transition-all shadow-md cursor-pointer"
          >
            <span>Ir al Taller Cromático</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}