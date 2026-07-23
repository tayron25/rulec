import React, { useState, useMemo, useEffect } from 'react';
import chroma from 'chroma-js';
import { useColor } from '../context/ColorContext';
import RuedaCromatica from '../components/RuedaCromatica';
import SimuladorLogo from '../components/SimuladorLogo';
import ExportadorPDF from '../components/ExportadorPDF';
import {
  Copy,
  Check,
  Palette
} from 'lucide-react';

/**
 * Motor matemático que calcula las 6 paletas de esquemas cromáticos a partir del Color Activo de la rueda.
 * Las fórmulas modifican el matiz (Hue) y luminosidad (L) en el espacio HSL de Chroma.js.
 */
function generateColorSchemes(activeHex) {
  const c = chroma(activeHex || '#E84F30');
  const [rawH, rawS, rawL] = c.hsl();
  const h = isNaN(rawH) ? 0 : rawH;
  const s = isNaN(rawS) ? 0.8 : rawS;
  const l = isNaN(rawL) ? 0.52 : rawL;

  const createToken = (hue, sat, light, role) => {
    const normalizedHue = ((hue % 360) + 360) % 360;
    const colorObj = chroma.hsl(normalizedHue, sat, Math.max(0.12, Math.min(0.92, light)));
    const hex = colorObj.hex().toUpperCase();
    const [r, g, b] = colorObj.rgb();
    const isLight = colorObj.luminance() > 0.45;

    return {
      hex,
      rgbText: `RGB (${r}, ${g}, ${b})`,
      role,
      textColor: isLight ? '#241F1A' : '#FFFFFF',
      subTextColor: isLight ? 'rgba(36, 31, 26, 0.72)' : 'rgba(255, 255, 255, 0.8)',
    };
  };

  return [
    {
      id: 'mono',
      commercialName: 'Elegancia Simple',
      technicalName: 'Monocromático',
      description: 'Variaciones de intensidad y luminosidad del mismo color. Transmite coherencia, sofisticación y es imposible de combinar mal.',
      colors: [
        createToken(h, s, l + 0.32, 'Fondo / Claro'),
        createToken(h, s, l + 0.16, 'Acento Suave'),
        createToken(h, s, l, 'Color Activo Base'),
        createToken(h, s, l - 0.16, 'Tono Sólido'),
        createToken(h, s, l - 0.32, 'Texto / Profundo'),
      ],
    },
    {
      id: 'analogo',
      commercialName: 'Armonía Suave',
      technicalName: 'Análogo',
      description: 'Colores vecinos en la rueda cromática (+30°, -30°). Crean una transición natural, amigable y muy placentera para la vista.',
      colors: [
        createToken(h - 30, s, l, 'Vecino Izquierdo (-30°)'),
        createToken(h - 15, s, l, 'Transición Suave'),
        createToken(h, s, l, 'Color Activo Base'),
        createToken(h + 15, s, l, 'Transición Cálida'),
        createToken(h + 30, s, l, 'Vecino Derecho (+30°)'),
      ],
    },
    {
      id: 'complementario',
      commercialName: 'Contraste Fuerte',
      technicalName: 'Complementario',
      description: 'El color directamente opuesto (+180°). Genera el máximo impacto visual y energía. Ideal para resaltar botones, letreros y ofertas.',
      colors: [
        createToken(h, s, l, 'Color Activo Base'),
        createToken(h, s, l - 0.22, 'Base Sólida'),
        createToken(h + 180, s, l, 'Opuesto Vibrante (+180°)'),
        createToken(h + 180, s, l + 0.22, 'Opuesto Suave'),
      ],
    },
    {
      id: 'compExtendido',
      commercialName: 'Equilibrio Dinámico',
      technicalName: 'Complementario Extendido (Split)',
      description: 'El color base combinado con los dos vecinos inmediatos del opuesto (+150°, +210°). Ofrece gran contraste sin resultar tan agresivo.',
      colors: [
        createToken(h, s, l, 'Color Activo Base'),
        createToken(h, s, l + 0.22, 'Base Suave'),
        createToken(h + 150, s, l, 'Vecino Opuesto 1 (+150°)'),
        createToken(h + 210, s, l, 'Vecino Opuesto 2 (+210°)'),
      ],
    },
    {
      id: 'triada',
      commercialName: 'Creatividad Pura',
      technicalName: 'Tríada',
      description: 'Tres colores equidistantes (+120°, +240°). Una combinación audaz, vibrante y juvenil que se mantiene equilibrada.',
      colors: [
        createToken(h, s, l, 'Color Activo Base'),
        createToken(h + 120, s, l, 'Segundo Polo (+120°)'),
        createToken(h + 240, s, l, 'Tercer Polo (+240°)'),
        createToken(h + 120, s, l + 0.24, 'Acento Pastel'),
      ],
    },
    {
      id: 'tetrada',
      commercialName: 'Multicolor',
      technicalName: 'Tétrada / Doble Complementario',
      description: 'Cuatro colores distribuidos en pares (+90°, +180°, +270°). Riqueza visual excepcional para marcas dinámicas y multiproducto.',
      colors: [
        createToken(h, s, l, 'Color Activo Base'),
        createToken(h + 90, s, l, 'Acento 1 (+90°)'),
        createToken(h + 180, s, l, 'Opuesto Directo (+180°)'),
        createToken(h + 270, s, l, 'Acento 2 (+270°)'),
      ],
    },
  ];
}

export default function Taller() {
  const { baseColor, updateBaseColor } = useColor();

  // El color actualmente seleccionado y apuntado al frente en la rueda (0°)
  const [activeColor, setActiveColor] = useState(baseColor || '#E84F30');

  // Pestaña comercial actualmente seleccionada en la parte inferior
  const [selectedSchemeId, setSelectedSchemeId] = useState('analogo');

  // Estado para toast de copiado en el portapapeles
  const [copiedText, setCopiedText] = useState(null);

  // Sincronizar si cambia el baseColor del contexto al cargar
  useEffect(() => {
    if (baseColor && !activeColor) {
      setActiveColor(baseColor);
    }
  }, [baseColor]);

  // Manejo del cambio en vivo de la Rueda GSAP
  const handleWheelColorChange = (newHex) => {
    setActiveColor(newHex);
  };

  // Guardar el color activo como nuevo color base al presionar un botón si el usuario lo desea
  const handleSetAsNewBase = () => {
    updateBaseColor(activeColor);
    setCopiedText(`¡Base guardada: ${activeColor}!`);
    setTimeout(() => setCopiedText(null), 3000);
  };

  // Calcular las 6 paletas dinámicamente
  const schemes = useMemo(() => {
    return generateColorSchemes(activeColor);
  }, [activeColor]);

  // Esquema activo seleccionado para mostrar swatches
  const currentScheme = useMemo(() => {
    return schemes.find((s) => s.id === selectedSchemeId) || schemes[0];
  }, [schemes, selectedSchemeId]);

  // Función para copiar HEX al portapapeles
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16 animate-fade-in">
      
      {/* Toast flotante para feedback de copiado */}
      {copiedText && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#241F1A] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm animate-bounce">
          <Check className="w-4 h-4 text-[#1F4B44] shrink-0" />
          <span>Copiado / Actualizado: <strong>{copiedText}</strong></span>
        </div>
      )}

      {/* Encabezado del Taller */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F4B44]/10 text-[#1F4B44] text-xs font-semibold mb-3">
          <Palette className="w-3.5 h-3.5" />
          <span>Instrumento de Precisión Analógico & Digital</span>
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#241F1A] mb-3">
          Taller Cromático Interactivo
        </h1>
        <p className="text-[#5B564E] text-sm sm:text-base leading-relaxed">
          Gira la rueda con inercia física real para explorar las tonalidades. A medida que rotas, calculamos al segundo las 6 armonías comerciales perfectas para tu marca.
        </p>
      </div>

      {/* ======================================================== */}
      {/* PARTE SUPERIOR: RUEDA CROMÁTICA GSAP (Mobile-First) */}
      {/* ======================================================== */}
      <div className="bg-white border border-[#241F1A]/10 rounded-3xl p-6 sm:p-10 shadow-sm mb-12 flex flex-col items-center justify-center">
        <RuedaCromatica
          baseColor={baseColor}
          activeColor={activeColor}
          onColorChange={handleWheelColorChange}
        />

        {/* Botón opcional de fijar color actual como base del Context */}
        <div className="mt-4 pt-4 border-t border-[#241F1A]/10 w-full max-w-md flex items-center justify-between text-xs sm:text-sm">
          <span className="text-[#5B564E]">¿Te gusta cómo apunta este matiz?</span>
          <button
            onClick={handleSetAsNewBase}
            className="px-4 py-1.5 rounded-full bg-[#1F4B44] text-white font-medium hover:bg-[#183934] transition-colors cursor-pointer"
          >
            Fijar como mi nuevo color base
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* PARTE INFERIOR: SELECTOR COMERCIAL DE LOS 6 ESQUEMAS */}
      {/* ======================================================== */}
      <div className="bg-white border border-[#241F1A]/10 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6 pb-6 border-b border-[#241F1A]/10">
          <div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#241F1A]">
              Armonías y Paletas Generadas
            </h2>
            <p className="text-xs sm:text-sm text-[#5B564E] mt-1">
              Traducimos la matemática del color en nombres y combinaciones aplicables para tu negocio.
            </p>
          </div>
        </div>

        {/* Selector de Pestañas / Tarjetas Comerciales (Cero Tecnicismos en UI) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-8">
          {schemes.map((sch) => {
            const isSelected = sch.id === selectedSchemeId;
            return (
              <button
                key={sch.id}
                onClick={() => setSelectedSchemeId(sch.id)}
                className={`flex flex-col items-start p-3 sm:p-3.5 rounded-2xl border transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-[#1F4B44] border-[#1F4B44] text-white shadow-md'
                    : 'bg-[#FAF6EF]/60 border-[#241F1A]/10 text-[#241F1A] hover:bg-[#FAF6EF] hover:border-[#1F4B44]/40'
                }`}
              >
                <span className={`text-xs sm:text-sm font-serif font-bold leading-tight mb-1 ${
                  isSelected ? 'text-white' : 'text-[#241F1A]'
                }`}>
                  {sch.commercialName}
                </span>
                <span className={`text-[10px] sm:text-[11px] leading-tight line-clamp-1 ${
                  isSelected ? 'text-white/80' : 'text-[#9A9284]'
                }`}>
                  {sch.technicalName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cabecera del esquema activo seleccionado */}
        <div className="bg-[#FAF6EF] border border-[#241F1A]/10 rounded-2xl p-5 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-serif font-bold text-xl text-[#241F1A]">
                {currentScheme.commercialName}
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white border border-[#241F1A]/15 text-[#5B564E] font-medium">
                {currentScheme.technicalName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed max-w-2xl">
              {currentScheme.description}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs text-[#9A9284] block">Colores en esta paleta</span>
            <span className="font-mono font-bold text-sm text-[#1F4B44]">{currentScheme.colors.length} tonos calculados</span>
          </div>
        </div>

        {/* Grid de Bloques de Color de la Paleta (Swatches) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-12">
          {currentScheme.colors.map((colorItem, idx) => (
            <div
              key={`${colorItem.hex}-${idx}`}
              className="group rounded-2xl border border-[#241F1A]/15 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col bg-white"
            >
              {/* Bloque de Color de Relleno */}
              <div
                className="h-28 sm:h-32 w-full flex items-end justify-between p-3.5 transition-transform group-hover:scale-[1.01]"
                style={{ backgroundColor: colorItem.hex, color: colorItem.textColor }}
              >
                <span
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md"
                  style={{
                    backgroundColor: colorItem.textColor === '#FFFFFF' ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.45)',
                    color: colorItem.textColor,
                  }}
                >
                  {colorItem.role}
                </span>
              </div>

              {/* Pie de Datos HEX y RGB con Botón de Copiar */}
              <div className="p-3.5 flex flex-col gap-1.5 bg-white flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm sm:text-base text-[#241F1A]">
                      {colorItem.hex}
                    </span>
                    <button
                      onClick={() => handleCopy(colorItem.hex)}
                      title="Copiar código HEX"
                      className="p-1.5 rounded-lg hover:bg-[#FAF6EF] text-[#5B564E] hover:text-[#1F4B44] transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="font-mono text-[11px] text-[#9A9284] block">
                    {colorItem.rgbText}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECCIÓN FINAL: SIMULADOR DE LOGO Y EXPORTACIÓN DE PDF */}
      {/* ======================================================== */}
      <div className="mt-12 space-y-12">
        <SimuladorLogo
          activeColor={activeColor}
          paletteColors={currentScheme.colors}
        />

        <ExportadorPDF
          currentPalette={currentScheme}
          activeColor={activeColor}
        />
      </div>

    </div>
  );
}