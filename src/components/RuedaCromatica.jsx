import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import chroma from 'chroma-js';
import { RotateCcw, Sparkles } from 'lucide-react';

// Registrar plugins oficiales de GSAP
gsap.registerPlugin(Draggable, InertiaPlugin);

/**
 * Componente RuedaCromatica con inercia física (GSAP) y división trigonométrica exacta en 12 segmentos.
 * 
 * @param {string} baseColor - Color HEX que llega del Context (ej. elegido en el Diagnóstico).
 * @param {string} activeColor - Color activo actualmente seleccionado en la parte superior (0°).
 * @param {function} onColorChange - Callback disparado en tiempo real o al soltar para actualizar activeColor.
 */
export default function RuedaCromatica({ baseColor, activeColor, onColorChange }) {
  const wheelRef = useRef(null);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Extraer valores HSL del baseColor inicial
  const baseChroma = chroma(baseColor || '#E84F30');
  const [baseH, baseS, baseL] = baseChroma.hsl();
  const validBaseHue = isNaN(baseH) ? 15 : baseH;
  const validBaseSat = isNaN(baseS) ? 0.82 : baseS;
  const validBaseLight = isNaN(baseL) ? 0.52 : baseL;

  /**
   * Calcula el ángulo del matiz apuntando al indicador superior (0° / 12 en punto)
   * y notifica al padre con el nuevo HEX.
   */
  const handleUpdateFromAngle = (angleDeg) => {
    // Normalizar ángulo entre 0 y 360
    const normalizedAngle = ((angleDeg % 360) + 360) % 360;
    setRotationDeg(Math.round(normalizedAngle));

    // El color que queda en la parte superior (0°) corresponde a (validBaseHue - angleDeg)
    const activeHue = ((validBaseHue - angleDeg) % 360 + 360) % 360;
    const newHex = chroma.hsl(activeHue, validBaseSat, validBaseLight).hex().toUpperCase();
    
    if (onColorChange && newHex !== activeColor) {
      onColorChange(newHex);
    }
  };

  // Inicializar Draggable de GSAP cuando se monta o cambia baseColor
  useEffect(() => {
    const element = wheelRef.current;
    if (!element) return;

    // Resetear rotación si cambia la base
    gsap.set(element, { rotation: 0 });
    setRotationDeg(0);
    if (onColorChange) {
      onColorChange(chroma.hsl(validBaseHue, validBaseSat, validBaseLight).hex().toUpperCase());
    }

    const draggableInstance = Draggable.create(element, {
      type: 'rotation',
      inertia: true,
      resistance: 350, // Resistencia suave para una inercia realista y satisfactoria
      onPress: () => {
        setIsDragging(true);
      },
      onDrag: function () {
        handleUpdateFromAngle(this.rotation);
      },
      onThrowUpdate: function () {
        handleUpdateFromAngle(this.rotation);
      },
      onDragEnd: function () {
        setIsDragging(false);
        handleUpdateFromAngle(this.rotation);
      },
      onThrowComplete: function () {
        setIsDragging(false);
        handleUpdateFromAngle(this.rotation);
      },
    })[0];

    return () => {
      if (draggableInstance) {
        draggableInstance.kill();
      }
    };
  }, [baseColor, validBaseHue, validBaseSat, validBaseLight]);

  // Restablecer posición a 0 grados
  const handleResetRotation = () => {
    if (!wheelRef.current) return;
    gsap.to(wheelRef.current, {
      rotation: 0,
      duration: 1.2,
      ease: 'power3.out',
      onUpdate: function () {
        const currentRot = gsap.getProperty(wheelRef.current, 'rotation');
        handleUpdateFromAngle(currentRot);
      },
    });
  };

  // Generar los 12 segmentos trigonométricos de 30 grados
  // Segmento 0 centrado en 0° (arriba: de -15° a +15°)
  const segments = Array.from({ length: 12 }, (_, i) => {
    const segmentHue = (validBaseHue + i * 30) % 360;
    const segmentHex = chroma.hsl(segmentHue, validBaseSat, validBaseLight).hex();

    // Ángulos del arco en radianes (-15° a +15° para i=0, desplazados por i*30°)
    const startAngleDeg = i * 30 - 15;
    const endAngleDeg = i * 30 + 15;
    const startRad = (startAngleDeg * Math.PI) / 180;
    const endRad = (endAngleDeg * Math.PI) / 180;

    const R = 140; // Radio del disco
    const cx = 160;
    const cy = 160;

    // Coordenadas en cartesianas (donde 0° arriba es x=cx, y=cy-R)
    // En SVG cartesiano estándar rotado desde arriba: x = cx + R*sin(rad), y = cy - R*cos(rad)
    const x1 = cx + R * Math.sin(startRad);
    const y1 = cy - R * Math.cos(startRad);
    const x2 = cx + R * Math.sin(endRad);
    const y2 = cy - R * Math.cos(endRad);

    const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} Z`;

    return {
      index: i,
      hue: Math.round(segmentHue),
      hex: segmentHex.toUpperCase(),
      pathData,
      startAngleDeg,
    };
  });

  return (
    <div className="flex flex-col items-center select-none">
      {/* Contenedor del instrumento con indicador superior */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
        
        {/* Indicador / Flecha fija superior (0 grados - 12 en punto) */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center filter drop-shadow-md pointer-events-none">
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-[#241F1A]" />
          <div className="w-1 h-3 bg-[#241F1A] -mt-0.5 rounded-full" />
        </div>

        {/* Bisel / Marco metálico exterior de la rueda */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white via-[#EAE5D9] to-[#D5CFC1] shadow-2xl p-3.5 border border-[#241F1A]/15">
          
          {/* Disco giratorio de 12 segmentos arrastrable con GSAP */}
          <div
            ref={wheelRef}
            className={`relative w-full h-full rounded-full overflow-hidden shadow-inner cursor-grab touch-none transition-shadow ${
              isDragging ? 'cursor-grabbing ring-4 ring-[#1F4B44]/30' : 'hover:ring-2 hover:ring-[#1F4B44]/20'
            }`}
          >
            <svg viewBox="0 0 320 320" className="w-full h-full block">
              {/* Dibujo de los 12 segmentos exactos */}
              {segments.map((seg) => (
                <g key={seg.index}>
                  <path
                    d={seg.pathData}
                    fill={seg.hex}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    className="transition-opacity hover:opacity-95"
                  />
                </g>
              ))}

              {/* Círculo central (Buje del instrumento) */}
              <circle cx="160" cy="160" r="42" fill="#FFFFFF" stroke="rgba(36, 31, 26, 0.12)" strokeWidth="2" />
              <circle cx="160" cy="160" r="32" fill={activeColor || baseColor} stroke="#FFFFFF" strokeWidth="3" />
            </svg>
          </div>

        </div>
      </div>

      {/* Panel inferior de lectura y control de giro */}
      <div className="mt-6 flex flex-col items-center gap-3">
        {/* Lectura en tiempo real del color que apunta arriba */}
        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-[#241F1A]/15 shadow-sm">
          <div
            className="w-5 h-5 rounded-full border border-[#241F1A]/20 shadow-inner transition-colors"
            style={{ backgroundColor: activeColor || baseColor }}
          />
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-serif italic text-[#9A9284] -mb-1">Tono Activo en Rueda</span>
            <span className="font-mono font-bold text-sm sm:text-base text-[#241F1A] tracking-wider">
              {activeColor || baseColor}
            </span>
          </div>
          <span className="text-xs font-semibold text-[#1F4B44] bg-[#1F4B44]/10 px-2 py-0.5 rounded-md ml-1">
            {rotationDeg}°
          </span>
        </div>

        {/* Sugerencia de interacción e inercia */}
        <div className="flex items-center gap-4 text-xs text-[#5B564E]">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E84F30]" />
            <span>Arrastra el disco con el dedo o ratón y suelta para rotar con inercia</span>
          </span>
          <button
            type="button"
            onClick={handleResetRotation}
            title="Restablecer posición inicial"
            className="inline-flex items-center gap-1 text-[#1F4B44] hover:text-[#E84F30] font-medium transition-colors cursor-pointer underline underline-offset-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar giro</span>
          </button>
        </div>
      </div>
    </div>
  );
}
