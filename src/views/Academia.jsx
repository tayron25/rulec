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

          <button
            onClick={() => setActiveTab('psicologia-visual')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === 'psicologia-visual'
                ? 'bg-[#1F4B44] text-white shadow-md'
                : 'text-[#5B564E] hover:text-[#241F1A] hover:bg-[#FAF6EF]'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Psicología Visual</span>
          </button>

        </div>
      </div>

      {/* PESTAÑA 1: PSICOLOGÍA DEL COLOR */}
      {activeTab === 'color' && (
        <div className="space-y-12 animate-fade-in">
          <div className="bg-white border border-[#241F1A]/10 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="max-w-3xl mb-12 text-center mx-auto">
              <span className="text-xs font-serif italic text-[#9A9284] uppercase tracking-wider block mb-2">
                Percepción Emocional
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#241F1A] mb-4">
                El Impacto Psicológico de los Colores
              </h2>
              <p className="text-sm sm:text-base text-[#5B564E] leading-relaxed max-w-2xl mx-auto">
                Los colores evocan emociones inmediatas antes de que el cerebro procese el texto. Elige la tonalidad que mejor conecte con los valores de tu negocio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              
              {/* ROJO */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: '#E84F30' }}></div>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] uppercase tracking-wide">Rojo</h3>
                </div>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow">
                  El rojo es un color muy atractivo para el marketing, significa poder, atracción y además hace que la atención del público quede fijada. Algunos de los sectores que más utilizan el color rojo son las bebidas y la alimentación.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 bg-white rounded-2xl p-4 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Psicologia del color/rojo/cocacola logo.png" alt="Coca Cola" className="h-10 object-contain mix-blend-multiply" />
                  <img src="/academia/Psicologia del color/rojo/KFC ROJO.png" alt="KFC" className="h-10 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* AZUL */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: '#2B547E' }}></div>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] uppercase tracking-wide">Azul</h3>
                </div>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow">
                  Este color es apropiado para empresas que tratan de transmitir calma y confianza, sin embargo en tonos más oscuros representa elegancia y frescura. Para elementos tecnológicos y el sector de la higiene personal es el color perfecto.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 bg-white rounded-2xl p-4 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Psicologia del color/azul/intel logo.png" alt="Intel" className="h-10 object-contain mix-blend-multiply" />
                  <img src="/academia/Psicologia del color/azul/Oral-B-Simbolo.png" alt="Oral B" className="h-10 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* VERDE */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: '#1F4B44' }}></div>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] uppercase tracking-wide">Verde</h3>
                </div>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow">
                  El verde es otro de los básicos cuando hablamos del significado de los colores en marketing. Ha sido utilizado tradicionalmente para referirse a lo natural y los valores ecológicos. Es muy versátil, se refiere a buenas acciones y es agradable.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 bg-white rounded-2xl p-4 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Psicologia del color/verde/Animal_Planet.png" alt="Animal Planet" className="h-10 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* AMARILLO */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: '#FFC82C' }}></div>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] uppercase tracking-wide">Amarillo</h3>
                </div>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow">
                  Se ha puesto de moda en el mundo del marketing porque atrae poderosamente la atención por sí mismo, aunque en ocasiones puede llegar a repeler. Muy apropiado para productos para niños, transmite felicidad y luminosidad.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 bg-white rounded-2xl p-4 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Psicologia del color/amarillo/pokemon.png" alt="Pokemon" className="h-10 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* NARANJA */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: '#F38A00' }}></div>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] uppercase tracking-wide">Naranja</h3>
                </div>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow">
                  El naranja es considerado como un color que transmite valores relacionados con la energía, de ahí que muchos productos relacionados con el deporte y las vitaminas lo utilicen como recurso visual.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 bg-white rounded-2xl p-4 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Psicologia del color/naranja/ktm.png" alt="KTM" className="h-10 object-contain mix-blend-multiply" />
                  <img src="/academia/Psicologia del color/naranja/redoxon.png" alt="Redoxon" className="h-10 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* MORADO */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: '#6B408B' }}></div>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] uppercase tracking-wide">Morado</h3>
                </div>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow">
                  Es un color asociado a valores elevados como la realeza, la espiritualidad o lo misterioso. Un color que puede interpretarse a la vez como frío o cálido, y que por lo tanto puede utilizarse para multitud de fines en marketing.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 bg-white rounded-2xl p-4 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Psicologia del color/morado/cadbury.png" alt="Cadbury" className="h-10 object-contain mix-blend-multiply" />
                  <img src="/academia/Psicologia del color/morado/milka.png" alt="Milka" className="h-10 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* MARRÓN */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: '#5C4033' }}></div>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] uppercase tracking-wide">Marrón</h3>
                </div>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow">
                  El color marrón representa, al igual que el verde, lo natural, asociado con tierra o madera. Muchas empresas de alimentación lo utilizan precisamente por ser un color poco llamativo y orgánico.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-4 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Psicologia del color/marron/Hershey-Logo.png" alt="Hershey" className="h-12 sm:h-14 object-contain mix-blend-multiply" />
                  <img src="/academia/Psicologia del color/marron/nespresso-logo-1.png" alt="Nespresso" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* BLANCO */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full shadow-sm border border-black/10" style={{ backgroundColor: '#FFFFFF' }}></div>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] uppercase tracking-wide">Blanco</h3>
                </div>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow">
                  El color blanco simboliza la pureza. Normalmente en marketing se utiliza para campañas minimalistas donde el protagonista es otro color, o para dar respiro visual y modernidad.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 bg-[#241F1A] rounded-2xl p-4 border border-[#241F1A]/10 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Psicologia del color/blanco/apple.png" alt="Apple" className="h-10 object-contain" />
                  <img src="/academia/Psicologia del color/blanco/dove.png" alt="Dove" className="h-10 object-contain" />
                </div>
              </div>

              {/* NEGRO */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: '#000000' }}></div>
                  <h3 className="font-serif font-bold text-xl text-[#241F1A] uppercase tracking-wide">Negro</h3>
                </div>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow">
                  El color negro también combina con todo en marketing. Es un color que se puede asociar al drama, o a otros conceptos sofisticados como la exclusividad, la elegancia o lo nocturno.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-4 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Psicologia del color/negro/DIOR.png" alt="Dior" className="h-12 sm:h-14 object-contain mix-blend-multiply" />
                  <img src="/academia/Psicologia del color/negro/yves saint logo.png" alt="YSL" className="h-14 sm:h-16 object-contain mix-blend-multiply" />
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
            <div className="max-w-3xl mb-12 text-center mx-auto">
              <span className="text-xs font-serif italic text-[#9A9284] uppercase tracking-wider block mb-2">
                Fundamentos Geométricos
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#241F1A] mb-4">
                El Lenguaje Invisible de las Formas
              </h2>
              <p className="text-sm sm:text-base text-[#5B564E] leading-relaxed max-w-2xl mx-auto">
                Las líneas, curvas y figuras geométricas comunican de manera subconsciente. Descubre qué transmite cada forma al diseñar tu identidad visual.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* CUADRADO O RECTÁNGULO */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Cuadrado o Rectángulo</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  Las líneas y los ángulos rectos de los cuadrados producen una sensación de robustez que evoca fiabilidad y seguridad.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Formas y curvas/Cuadrado/lego.png" alt="Lego" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* TRIÁNGULO */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Triángulo</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  Forma muy dinámica que tiene significados diferentes en función de cómo esté dispuesto.<br/>
                  <strong>Vertical:</strong> estabilidad y equilibrio.<br/>
                  <strong>Invertido:</strong> riesgo y precaución.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Formas y curvas/triangulo/Adidas_logo.png" alt="Adidas" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* CÍRCULOS U ÓVALOS */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Círculos u Óvalos</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  Al carecer de ángulos o picos evocan emociones más empáticas y cercanas. Son emocionalmente más positivas y menos frías que las rectangulares.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Formas y curvas/circulo/bmw.png" alt="BMW" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
                  <img src="/academia/Formas y curvas/circulo/pepsi.png" alt="Pepsi" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* LÍNEAS RECTAS */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Líneas Rectas</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  Al agruparse pueden evocar unión, comunicación, dinamismo y coordinación.<br/>
                  <strong>Horizontal:</strong> tranquilidad, fiabilidad, paz.<br/>
                  <strong>Vertical:</strong> equilibrio, jerarquía o eficiencia.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Formas y curvas/lineas rectas/cisco.png" alt="Cisco" className="h-10 sm:h-12 object-contain mix-blend-multiply" />
                  <img src="/academia/Formas y curvas/lineas rectas/soundcloud.png" alt="SoundCloud" className="h-10 sm:h-12 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* ESPIRALES */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Espirales</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  Presente en la naturaleza, se asocia con el crecimiento, la vida o la evolución. Algunos significados: creatividad, continuidad, ilusión, inteligencia y vitalidad.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Formas y curvas/espirales/ubisoft.png" alt="Ubisoft" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* CRUCES */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Cruces</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  Se asocian con el equilibrio, la esperanza y la divinidad. Se usan para sugerir vida, salud, unidad, relaciones y espiritualidad.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Formas y curvas/cruces/chevrolet.png" alt="Chevrolet" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
                  <img src="/academia/Formas y curvas/cruces/cruz roja.png" alt="Cruz Roja" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* FORMAS ORGÁNICAS */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Formas Orgánicas</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  Concebidas como formas naturales, tienen claros significados de las plantas y animales que simbolizan. Aportan una sensación de frescura y unidad con el entorno natural.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Formas y curvas/formas organicas/puma.png" alt="Puma" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
                  <img src="/academia/Formas y curvas/formas organicas/starbucks.png" alt="Starbucks" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* FORMAS ABSTRACTAS */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Formas Abstractas</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  Son manifestaciones o símbolos visuales de conceptos abstractos. Se usan con frecuencia en el diseño de logos o iconografía, siendo eficaces para transmitir mensajes sin texto.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Formas y curvas/formas abstractas/airbnb.png" alt="Airbnb" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
                  <img src="/academia/Formas y curvas/formas abstractas/spotify.png" alt="Spotify" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
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
                  <div className="h-40 rounded-2xl bg-white border border-[#241F1A]/10 mb-6 flex items-center justify-center shadow-inner relative p-4">
                    <img src="/academia/Anatomia del logo/isotipo/twitter.png" alt="Twitter Isotipo" className="h-24 sm:h-28 object-contain mix-blend-multiply" />
                    <span className="absolute bottom-2 right-3 text-[10px] font-mono uppercase text-[#9A9284]">Símbolo puro</span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-[#241F1A] mb-2">1. Isotipo</h3>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#1F4B44]/10 text-[#1F4B44] text-xs font-semibold mb-3">Solo el Símbolo o Ícono</span>
                  <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed mb-6">
                    Es el dibujo o emblema gráfico sin texto. Funciona cuando tu marca ya es muy reconocida y la gente asocia inmediatamente el símbolo con tu empresa.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#241F1A]/10 text-xs text-[#5B564E]">
                  <strong>Ejemplos Famosos:</strong> La manzana de Apple, el check de Nike o el pájaro de Twitter.
                </div>
              </div>

              {/* Logotipo */}
              <div className="border border-[#241F1A]/15 rounded-3xl p-6 sm:p-8 bg-[#FAF6EF]/40 flex flex-col justify-between hover:shadow-lg transition-all">
                <div>
                  <div className="h-40 rounded-2xl bg-white border border-[#241F1A]/10 mb-6 flex items-center justify-center shadow-inner relative p-4">
                    <img src="/academia/Anatomia del logo/logotipo/google.png" alt="Google Logotipo" className="h-20 sm:h-24 object-contain mix-blend-multiply" />
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
                  <div className="h-40 rounded-2xl bg-white border border-[#241F1A]/10 mb-6 flex items-center justify-center gap-4 shadow-inner relative p-4">
                    <img src="/academia/Anatomia del logo/imagotipo/lacoste.png" alt="Lacoste Imagotipo" className="h-24 sm:h-28 object-contain mix-blend-multiply" />
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
                  <div className="h-40 rounded-2xl bg-white border border-[#241F1A]/10 mb-6 flex items-center justify-center shadow-inner relative p-4">
                    <img src="/academia/Anatomia del logo/isologo/burger king.png" alt="Burger King Isologo" className="h-28 sm:h-32 object-contain mix-blend-multiply" />
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
            <div className="max-w-3xl mb-12 text-center mx-auto">
              <span className="text-xs font-serif italic text-[#9A9284] uppercase tracking-wider block mb-2">
                Bautizando tu Emprendimiento
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#241F1A] mb-4">
                Guía Práctica de Naming Comercial
              </h2>
              <p className="text-sm sm:text-base text-[#5B564E] leading-relaxed max-w-2xl mx-auto">
                El nombre es el primer contacto con tus clientes. Descubre las 7 fórmulas comerciales probadas para crear o evaluar el nombre de tu negocio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Descriptivo */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1 text-center sm:text-left">01. Directo y Literal</span>
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Descriptivo</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  Dice exactamente lo que hace tu negocio sin rodeos ni metáforas.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Naming/Descriptivo/paypal.png" alt="Paypal" className="h-10 sm:h-12 object-contain mix-blend-multiply" />
                  <img src="/academia/Naming/Descriptivo/the weather company.png" alt="The Weather Company" className="h-10 sm:h-12 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* Acrónimo */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1 text-center sm:text-left">02. Iniciales y Siglas</span>
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Acrónimo</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  Formado por las iniciales de un nombre corporativo largo.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Naming/acronimo/FIFA.png" alt="FIFA" className="h-12 sm:h-14 object-contain mix-blend-multiply" />
                  <img src="/academia/Naming/acronimo/HBO.png" alt="HBO" className="h-10 sm:h-12 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* Abstracto */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1 text-center sm:text-left">03. Palabras Inventadas</span>
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Abstracto</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  Sonidos o palabras creados desde cero sin significado previo en el diccionario.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Naming/abstracto/kodak.png" alt="Kodak" className="h-10 sm:h-12 object-contain mix-blend-multiply" />
                  <img src="/academia/Naming/abstracto/oreo.png" alt="Oreo" className="h-12 sm:h-14 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* Sugerente */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1 text-center sm:text-left">04. Promesa y Beneficio</span>
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Sugerente</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  Sugiere sutilmente la ventaja o el beneficio clave de tu propuesta.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Naming/sugerente/linkedin.png" alt="Linkedin" className="h-10 sm:h-12 object-contain mix-blend-multiply" />
                  <img src="/academia/Naming/sugerente/mastercard.png" alt="Mastercard" className="h-12 sm:h-14 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* Neologismo */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1 text-center sm:text-left">05. Fusión de Conceptos</span>
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Neologismo</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  Unión inteligente de dos palabras existentes para crear un concepto moderno.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Naming/neologismo/fedex.png" alt="Fedex" className="h-10 sm:h-12 object-contain mix-blend-multiply" />
                  <img src="/academia/Naming/neologismo/instagram.png" alt="Instagram" className="h-12 sm:h-14 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* Evocativo */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1 text-center sm:text-left">06. Mitología e Historia</span>
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Evocativo</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  Evoca un personaje histórico o mitológico que comparte los valores de tu empresa.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Naming/evocativo/jaguar.png" alt="Jaguar" className="h-12 sm:h-14 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* Asociativo */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full md:col-span-2 md:w-2/3 md:mx-auto">
                <span className="text-xs font-mono font-bold text-[#1F4B44] block mb-1 text-center">07. Emoción y Metáfora</span>
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center">Asociativo</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center">
                  No describe literalmente lo que hace la empresa, sino que sugiere una sensación, valor o beneficio. Utiliza metáforas para conectar emocionalmente con la imaginación del público.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-10 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm min-h-[80px]">
                  <img src="/academia/Naming/asociativo/shell.png" alt="Shell" className="h-16 sm:h-20 object-contain mix-blend-multiply" />
                  <img src="/academia/Naming/asociativo/tinder.png" alt="Tinder" className="h-16 sm:h-20 object-contain mix-blend-multiply" />
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 5: PSICOLOGÍA VISUAL */}
      {activeTab === 'psicologia-visual' && (
        <div className="space-y-12 animate-fade-in">
          <div className="bg-white border border-[#241F1A]/10 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="max-w-3xl mb-12 text-center mx-auto">
              <span className="text-xs font-serif italic text-[#9A9284] uppercase tracking-wider block mb-2">
                Gestalt
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#241F1A] mb-4">
                Psicología Visual: Leyes de Gestalt
              </h2>
              <p className="text-sm sm:text-base text-[#5B564E] leading-relaxed max-w-2xl mx-auto">
                Tu cerebro siempre busca el orden en lo que ve. Descubre los principios psicológicos fundamentales para crear un logotipo memorable e impactante.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Ley de Cierre */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Ley de Cierre</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  La mente completa automáticamente figuras incompletas basándose en experiencia previa.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm">
                  <img src="/academia/psicologia-visual/Leyes Gestalt/Ley de cierre/ibm_PNG19658.png" alt="IBM Logo" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
                  <img src="/academia/psicologia-visual/Leyes Gestalt/Ley de cierre/wwf_PNG9.png" alt="WWF Logo" className="h-16 sm:h-20 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* Ley de Proximidad */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Ley de Proximidad</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  Los elementos que están cerca entre sí se perciben como un grupo o unidad.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm">
                  <img src="/academia/psicologia-visual/Leyes Gestalt/proximidad/UNILEVER LOGO.png" alt="Unilever Logo" className="h-16 sm:h-24 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* Ley de Continuidad */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Ley de Continuidad</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  El ojo tiende a seguir líneas, curvas o trayectorias de forma natural, aunque estén interrumpidas.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm">
                  <img src="/academia/psicologia-visual/Leyes Gestalt/continuidad/Amazonlogo.png" alt="Amazon Logo" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
                  <img src="/academia/psicologia-visual/Leyes Gestalt/continuidad/logo nike.png" alt="Nike Logo" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* Ley de Semejanza */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Ley de Semejanza</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  Los elementos que comparten características visuales (color, forma, tamaño, textura) se perciben como parte de un mismo grupo aunque no estén cerca.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm">
                  <img src="/academia/psicologia-visual/Leyes Gestalt/semejanza/audi logo.png" alt="Audi Logo" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
                  <img src="/academia/psicologia-visual/Leyes Gestalt/semejanza/SUN LOGO.png" alt="Sun Microsystems Logo" className="h-16 sm:h-20 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* Figura y Fondo */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Figura y Fondo</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  Las relaciones figura-fondo producen diferentes efectos que confunden a la vista o revelan figuras ocultas.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm">
                  <img src="/academia/psicologia-visual/Leyes Gestalt/figura y fondo/CarrefourLOGO.png" alt="Carrefour Logo" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
                  <img src="/academia/psicologia-visual/Leyes Gestalt/figura y fondo/NBC-Logo.png" alt="NBC Logo" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* Ley de Dirección Común */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center sm:text-left">Ley de Dirección Común</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center sm:text-left">
                  Ejemplo clásico: aves volando; aunque son cientos, los agrupamos como una sola figura debido a su movimiento sincronizado en la misma dirección.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm">
                  <img src="/academia/psicologia-visual/Leyes Gestalt/direccion comun/citroen logo.png" alt="Citroen Logo" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
                  <img src="/academia/psicologia-visual/Leyes Gestalt/direccion comun/honda logo.png" alt="Honda Logo" className="h-12 sm:h-16 object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* Ley de Simetría */}
              <div className="bg-[#FAF6EF]/60 border border-[#241F1A]/10 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow flex flex-col h-full md:col-span-2">
                <h3 className="font-serif font-bold text-xl text-[#241F1A] mb-2 uppercase tracking-wide text-center">Ley de Simetría</h3>
                <p className="text-sm text-[#5B564E] leading-relaxed mb-6 flex-grow text-center max-w-2xl mx-auto">
                  Es un principio de la psicología que establece que el cerebro percibe como unidades completas las imágenes simétricas. Transmite solidez y equilibrio.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-10 bg-white rounded-2xl p-6 border border-[#241F1A]/5 mt-auto shadow-sm">
                  <img src="/academia/psicologia-visual/Leyes Gestalt/simetria/chanel logo.png" alt="Chanel Logo" className="h-16 sm:h-20 object-contain mix-blend-multiply" />
                  <img src="/academia/psicologia-visual/Leyes Gestalt/simetria/mc donald logo.png" alt="McDonalds Logo" className="h-16 sm:h-20 object-contain mix-blend-multiply" />
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