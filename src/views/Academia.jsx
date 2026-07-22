import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Shapes,
  Type,
  Tag,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  Layers,
  Compass
} from 'lucide-react';

export default function Academia() {
  const navigate = useNavigate();

  // Pestaña activa: 'shapes' | 'anatomy' | 'naming'
  const [activeTab, setActiveTab] = useState('shapes');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-20 animate-fade-in">
      
      {/* ======================================================== */}
      {/* CABECERA DE LA ACADEMIA (Estética limpia, neutra y espaciosa) */}
      {/* ======================================================== */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241F1A]/5 border border-[#241F1A]/10 text-[#5B564E] text-xs font-semibold uppercase tracking-wider mb-4">
          <BookOpen className="w-3.5 h-3.5 text-[#1F4B44]" />
          <span>Conocimiento Aplicable para Emprendedores</span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#241F1A] mb-4 tracking-tight">
          Academia de Identidad Visual
        </h1>
        <p className="text-[#5B564E] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Teoría pedagógica sin tecnicismos ni relleno. Descubre el significado detrás de cada curva, la estructura de los logotipos y las mejores técnicas para bautizar tu marca en Bolivia.
        </p>
      </div>

      {/* ======================================================== */}
      {/* NAVEGACIÓN POR PESTAÑAS (TABS HORIZONTALES ELEGTANTES) */}
      {/* ======================================================== */}
      <div className="flex justify-center mb-12 sm:mb-16">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 p-2 bg-white rounded-2xl border border-[#241F1A]/10 shadow-sm max-w-full">
          
          <button
            onClick={() => setActiveTab('shapes')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === 'shapes'
                ? 'bg-[#1F4B44] text-white shadow-md'
                : 'text-[#5B564E] hover:text-[#241F1A] hover:bg-[#FAF6EF]'
            }`}
          >
            <Shapes className="w-4 h-4 shrink-0" />
            <span>Psicología de Formas</span>
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
            <span>Anatomía del Logotipo</span>
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

      {/* ======================================================== */}
      {/* CONTENIDO PESTAÑA 1: PSICOLOGÍA DE LAS FORMAS Y CURVAS */}
      {/* ======================================================== */}
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
                    Al carecer de esquinas o bordes punzantes, los círculos transmiten amabilidad, calidez y afecto. Son perfectos para marcas que desean proyectar unidad, familia, trabajo en equipo y fluidez constante sin interrupciones.
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
                    Representan los cimientos de un edificio. Inspiran solidez, orden, honestidad y permanencia en el tiempo. Son ideales para consultoras, despachos legales, empresas de construcción, tecnología y servicios financieros en Bolivia.
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
                    Las líneas verticales sugieren crecimiento, superación y fuerza masculina; impulsan la mirada hacia arriba. Las líneas horizontales aportan calma, horizonte, estabilidad y tranquilidad. Juntas transmiten máxima precisión y exactitud profesional.
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
                    Inspiradas en las hojas, el agua, las nubes o la arcilla moldeada a mano. Rompen la rigidez geométrica para transmitir autenticidad, calor humano, salud holística y originalidad. Excelentes para gastronomía, artesanía y cuidado personal.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* CONTENIDO PESTAÑA 2: DICCIONARIO Y ANATOMÍA DEL LOGO */}
      {/* ======================================================== */}
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
              
              {/* 1. Isotipo */}
              <div className="border border-[#241F1A]/15 rounded-3xl p-6 sm:p-8 bg-[#FAF6EF]/40 flex flex-col justify-between hover:shadow-lg transition-all">
                <div>
                  <div className="h-32 rounded-2xl bg-white border border-[#241F1A]/10 mb-6 flex items-center justify-center shadow-inner relative">
                    <div className="w-16 h-16 rounded-2xl bg-[#1F4B44] text-white flex items-center justify-center font-serif font-bold text-3xl shadow-md">
                      R
                    </div>
                    <span className="absolute bottom-2 right-3 text-[10px] font-mono uppercase text-[#9A9284]">Símbolo puro</span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-[#241F1A] mb-2">
                    1. Isotipo
                  </h3>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#1F4B44]/10 text-[#1F4B44] text-xs font-semibold mb-3">
                    Solo el Símbolo o Ícono
                  </span>
                  <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed mb-6">
                    Es el dibujo, emblema o ícono gráfico sin ningún texto alrededor. Funciona de manera autónoma cuando tu marca ya es muy reconocida y la gente asocia inmediatamente el símbolo con tu empresa.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#241F1A]/10 text-xs text-[#5B564E]">
                  <strong>Ejemplos Famosos:</strong> La manzana mordida de Apple, el check de Nike o el pájaro de Twitter/X.
                </div>
              </div>

              {/* 2. Logotipo */}
              <div className="border border-[#241F1A]/15 rounded-3xl p-6 sm:p-8 bg-[#FAF6EF]/40 flex flex-col justify-between hover:shadow-lg transition-all">
                <div>
                  <div className="h-32 rounded-2xl bg-white border border-[#241F1A]/10 mb-6 flex items-center justify-center shadow-inner relative px-6">
                    <span className="font-serif font-bold text-3xl sm:text-4xl tracking-tight text-[#241F1A]">
                      Coca-Cola
                    </span>
                    <span className="absolute bottom-2 right-3 text-[10px] font-mono uppercase text-[#9A9284]">Solo tipografía</span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-[#241F1A] mb-2">
                    2. Logotipo
                  </h3>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#241F1A]/10 text-[#241F1A] text-xs font-semibold mb-3">
                    Exclusivamente Letras / Texto
                  </span>
                  <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed mb-6">
                    Se compone únicamente por palabras y tipografía especial diseñada a medida. No existen íconos separados ni símbolos externos; la fuerza de la marca reside 100% en el carácter y diseño de las letras.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#241F1A]/10 text-xs text-[#5B564E]">
                  <strong>Ejemplos Famosos:</strong> Coca-Cola, Google, Sony, Zara o Canon.
                </div>
              </div>

              {/* 3. Imagotipo */}
              <div className="border border-[#241F1A]/15 rounded-3xl p-6 sm:p-8 bg-[#FAF6EF]/40 flex flex-col justify-between hover:shadow-lg transition-all">
                <div>
                  <div className="h-32 rounded-2xl bg-white border border-[#241F1A]/10 mb-6 flex items-center justify-center gap-4 shadow-inner relative px-6">
                    <div className="w-12 h-12 rounded-xl bg-[#E84F30] text-white flex items-center justify-center font-serif font-bold text-2xl shadow-sm">
                      S
                    </div>
                    <span className="font-serif font-bold text-2xl text-[#241F1A]">
                      Spotify
                    </span>
                    <span className="absolute bottom-2 right-3 text-[10px] font-mono uppercase text-[#9A9284]">Separables y Versátiles</span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-[#241F1A] mb-2">
                    3. Imagotipo
                  </h3>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#E84F30]/10 text-[#E84F30] text-xs font-semibold mb-3">
                    Ícono y Texto Juntos (Separables)
                  </span>
                  <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed mb-6">
                    Es la armonía perfecta entre el dibujo (símbolo) y el texto, pero colocados de forma independiente (uno arriba y el otro abajo, o al lado). La gran ventaja es que <strong>pueden separarse</strong>: usas solo el ícono para tu foto de WhatsApp e Instagram y el texto completo en facturas y letreros.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#241F1A]/10 text-xs text-[#5B564E]">
                  <strong>Ejemplos Famosos:</strong> Lacoste, Spotify, Adidas, Puma o Amazon.
                </div>
              </div>

              {/* 4. Isologo */}
              <div className="border border-[#241F1A]/15 rounded-3xl p-6 sm:p-8 bg-[#FAF6EF]/40 flex flex-col justify-between hover:shadow-lg transition-all">
                <div>
                  <div className="h-32 rounded-2xl bg-white border border-[#241F1A]/10 mb-6 flex items-center justify-center shadow-inner relative px-6">
                    <div className="px-6 py-3 rounded-full border-2 border-[#1F4B44] bg-[#1F4B44] text-white font-serif font-bold text-xl tracking-wider shadow-md flex items-center gap-2">
                      <span>🛡️</span>
                      <span>BURGER KING</span>
                    </div>
                    <span className="absolute bottom-2 right-3 text-[10px] font-mono uppercase text-[#9A9284]">Indivisibles</span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-[#241F1A] mb-2">
                    4. Isologo
                  </h3>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#1F4B44]/10 text-[#1F4B44] text-xs font-semibold mb-3">
                    Texto e Ícono Fusionados (Indivisibles)
                  </span>
                  <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed mb-6">
                    En el isologo, las letras y el dibujo forman una sola pieza o escudo indivisible. El texto está atrapado dentro del gráfico o emblema; si intentas separarlos, el logotipo pierde su estructura y se desarma por completo.
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

      {/* ======================================================== */}
      {/* CONTENIDO PESTAÑA 3: GUÍA DE NAMING (TIPOS DE NOMBRES) */}
      {/* ======================================================== */}
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
                El nombre es el primer saludo de tu empresa. No tiene que ser un misterio: existen 7 fórmulas comerciales probadas que puedes usar hoy mismo para crear o evaluar el nombre de tu negocio en Bolivia.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              
              {/* 1. Descriptivo */}
              <div className="border border-[#241F1A]/15 rounded-2xl p-6 bg-[#FAF6EF]/50 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1">01. Directo y Literal</span>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">Descriptivo</h3>
                  <p className="text-xs text-[#5B564E] leading-relaxed mb-4">
                    Dice exactamente lo que hace tu negocio sin rodeos ni metáforas. Excelente para que el cliente entienda de inmediato tu servicio sin necesidad de publicidad explicativa.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#241F1A]/10 text-xs">
                  <span className="text-[#9A9284] block mb-1">Ejemplos de Éxito:</span>
                  <span className="font-semibold text-[#241F1A]">Gas Natural, Banco Central, Telepizza, General Motors.</span>
                </div>
              </div>

              {/* 2. Acrónimo */}
              <div className="border border-[#241F1A]/15 rounded-2xl p-6 bg-[#FAF6EF]/50 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1">02. Iniciales y Siglas</span>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">Acrónimo</h3>
                  <p className="text-xs text-[#5B564E] leading-relaxed mb-4">
                    Formado por las iniciales de un nombre corporativo o técnico largo. Ayuda a simplificar nombres extensos, aunque requiere tiempo y constancia para que el público memorice las siglas.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#241F1A]/10 text-xs">
                  <span className="text-[#9A9284] block mb-1">Ejemplos de Éxito:</span>
                  <span className="font-semibold text-[#241F1A]">IBM, ENTEL, BBVA, BMW, DHL.</span>
                </div>
              </div>

              {/* 3. Abstracto */}
              <div className="border border-[#241F1A]/15 rounded-2xl p-6 bg-[#FAF6EF]/50 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1">03. Palabras Inventadas</span>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">Abstracto</h3>
                  <p className="text-xs text-[#5B564E] leading-relaxed mb-4">
                    Palabras o sonidos creados desde cero sin un significado previo en el diccionario. Te otorga un lienzo en blanco para construir tu identidad y facilita el registro de marca único.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#241F1A]/10 text-xs">
                  <span className="text-[#9A9284] block mb-1">Ejemplos de Éxito:</span>
                  <span className="font-semibold text-[#241F1A]">Kodak, Rolex, Häagen-Dazs, Spotify.</span>
                </div>
              </div>

              {/* 4. Sugerente */}
              <div className="border border-[#241F1A]/15 rounded-2xl p-6 bg-[#FAF6EF]/50 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1">04. Promesa y Beneficio</span>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">Sugerente</h3>
                  <p className="text-xs text-[#5B564E] leading-relaxed mb-4">
                    Sugiere sutilmente la ventaja o el beneficio clave de tu producto. Conecta con la imaginación del cliente y le hace intuir por qué tu producto es genial.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#241F1A]/10 text-xs">
                  <span className="text-[#9A9284] block mb-1">Ejemplos de Éxito:</span>
                  <span className="font-semibold text-[#241F1A]">Pinterest (Pin + Interest), Netflix (Net + Flicks), Duracell.</span>
                </div>
              </div>

              {/* 5. Neologismo */}
              <div className="border border-[#241F1A]/15 rounded-2xl p-6 bg-[#FAF6EF]/50 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1">05. Fusión de Conceptos</span>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">Neologismo</h3>
                  <p className="text-xs text-[#5B564E] leading-relaxed mb-4">
                    Unión inteligente de dos palabras existentes o deformación fonética para crear una nueva expresión moderna que suene dinámica y vanguardista.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#241F1A]/10 text-xs">
                  <span className="text-[#9A9284] block mb-1">Ejemplos de Éxito:</span>
                  <span className="font-semibold text-[#241F1A]">Instagram (Instant + Telegram), Accenture (Accent on the future).</span>
                </div>
              </div>

              {/* 6. Evocativo */}
              <div className="border border-[#241F1A]/15 rounded-2xl p-6 bg-[#FAF6EF]/50 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1">06. Mitología e Historia</span>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">Evocativo</h3>
                  <p className="text-xs text-[#5B564E] leading-relaxed mb-4">
                    Evoca una sensación épica, un personaje histórico, mitológico o literario que comparte los valores y la grandeza que quieres transmitir con tu empresa.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#241F1A]/10 text-xs">
                  <span className="text-[#9A9284] block mb-1">Ejemplos de Éxito:</span>
                  <span className="font-semibold text-[#241F1A]">Nike (Diosa griega de la victoria), Amazon (El río más caudaloso).</span>
                </div>
              </div>

              {/* 7. Asociativo */}
              <div className="border border-[#241F1A]/15 rounded-2xl p-6 bg-[#FAF6EF]/50 flex flex-col justify-between lg:col-span-3">
                <div className="max-w-2xl">
                  <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1">07. Elementos Cotidianos y Naturaleza</span>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2">Asociativo</h3>
                  <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed mb-4">
                    Se asocia a un concepto de la vida real, un animal, planta o fenómeno natural conocido por todos para transmitir inmediatamente una cualidad física (rapidez, fuerza, pureza o libertad).
                  </p>
                </div>
                <div className="pt-3 border-t border-[#241F1A]/10 text-xs">
                  <span className="text-[#9A9284] block mb-1">Ejemplos de Éxito:</span>
                  <span className="font-semibold text-[#241F1A]">Puma (Velocidad y destreza), Red Bull (Fuerza indomable), Apple (Simplicidad y conocimiento accesible).</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PIE DE PÁGINA CON BOTONES CTA PARA VOLVER AL ACCIÓN */}
      {/* ======================================================== */}
      <div className="mt-16 bg-white border border-[#241F1A]/10 rounded-3xl p-8 sm:p-10 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="text-left max-w-lg">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#241F1A] mb-1">
            ¿Listo para aplicar esta teoría en tu marca?
          </h3>
          <p className="text-xs sm:text-sm text-[#5B564E]">
            Vuelve al Taller Cromático para ajustar tu paleta con inercia física o realiza el test de diagnóstico en 3 pasos.
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
