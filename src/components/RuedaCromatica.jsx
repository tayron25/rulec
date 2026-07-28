import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import chroma from 'chroma-js';
import { RotateCcw, Sparkles } from 'lucide-react';

// Registrar plugins oficiales de GSAP
gsap.registerPlugin(Draggable, InertiaPlugin);

export default function RuedaCromatica({ baseColor, activeColor, onHueChange }) {
  const wheelRef = useRef(null);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // 1. Extraemos el Matiz (Hue) original para anclar el giro matemáticamente
  const baseChroma = chroma(baseColor || '#E84F30');
  const baseH = baseChroma.hsl()[0];
  const validBaseHue = isNaN(baseH) ? 15 : baseH;

  // FIX CLAVE: Referencia estable para escapar de la trampa de GSAP
  const onHueChangeRef = useRef(onHueChange);
  useEffect(() => {
    onHueChangeRef.current = onHueChange;
  }, [onHueChange]);

  const handleUpdateFromAngle = (angleDeg) => {
    const normalizedAngle = ((angleDeg % 360) + 360) % 360;
    setRotationDeg(Math.round(normalizedAngle));

    const activeHue = ((validBaseHue - angleDeg) % 360 + 360) % 360;
    
    // Solo enviamos los grados (Matiz) al Taller, el Taller decide la intensidad
    if (onHueChangeRef.current) {
      onHueChangeRef.current(activeHue);
    }
  };

  useEffect(() => {
    const element = wheelRef.current;
    if (!element) return;

    gsap.set(element, { rotation: 0 });
    setRotationDeg(0);
    
    // Notifica al padre los grados iniciales
    if (onHueChangeRef.current) {
      onHueChangeRef.current(validBaseHue);
    }

    const draggableInstance = Draggable.create(element, {
      type: 'rotation',
      inertia: true,
      resistance: 350,
      onPress: () => setIsDragging(true),
      onDrag: function () { handleUpdateFromAngle(this.rotation); },
      onThrowUpdate: function () { handleUpdateFromAngle(this.rotation); },
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
      if (draggableInstance) draggableInstance.kill();
    };
  }, [baseColor, validBaseHue]); // Solo resetea la posición si cambia el color base de origen

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

  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center filter drop-shadow-md pointer-events-none">
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-[#241F1A]" />
          <div className="w-1 h-3 bg-[#241F1A] -mt-0.5 rounded-full" />
        </div>

        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white via-[#EAE5D9] to-[#D5CFC1] shadow-2xl p-3.5 border border-[#241F1A]/15">
          <div
            ref={wheelRef}
            className={`relative w-full h-full rounded-full overflow-hidden shadow-inner cursor-grab touch-none transition-shadow ${
              isDragging ? 'cursor-grabbing ring-4 ring-[#1F4B44]/30' : 'hover:ring-2 hover:ring-[#1F4B44]/20'
            }`}
            style={{
              background:
                'radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 38%, rgba(0,0,0,0.08) 100%), conic-gradient(from 0deg, #ff0033 0deg, #ff7a00 30deg, #fff200 60deg, #92ff00 90deg, #00ff4c 125deg, #00ffd5 165deg, #00b7ff 205deg, #0052ff 240deg, #8a00ff 275deg, #ff00e6 315deg, #ff0033 360deg)',
            }}
          >
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
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
