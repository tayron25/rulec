import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import chroma from 'chroma-js';
import { RotateCcw, Sparkles } from 'lucide-react';

// Registrar plugins oficiales de GSAP
gsap.registerPlugin(Draggable, InertiaPlugin);

export default function RuedaCromatica({ baseColor, activeColor, onHueChange, activeSchemeId = 'mono' }) {
  const wheelRef = useRef(null);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const schemeAngles = {
    mono: [0],
    analogo: [0, -30, 30],
    complementario: [0, 180],
    compExtendido: [0, 150, 210],
    triada: [0, 120, 240],
    tetrada: [0, 60, 180, 240],
  };
  const currentAngles = schemeAngles[activeSchemeId] || [0];

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
      onClick: function (e) {
        // Obtenemos coordenadas de clic (compatible con ratón y pantallas táctiles)
        const clientX = e.clientX ?? (e.changedTouches && e.changedTouches[0].clientX) ?? (e.touches && e.touches[0].clientX);
        const clientY = e.clientY ?? (e.changedTouches && e.changedTouches[0].clientY) ?? (e.touches && e.touches[0].clientY);
        if (clientX == null || clientY == null) return;

        // Calculamos el centro de la rueda
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculamos el ángulo desde el centro hasta el punto de clic
        const dx = clientX - centerX;
        const dy = clientY - centerY;
        
        // Convertimos a grados, asumiendo que 0° es arriba (eje Y negativo)
        let clickAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90; 
        if (clickAngle < 0) clickAngle += 360;

        // Calculamos la rotación necesaria para llevar ese punto arriba
        const newRotation = this.rotation - clickAngle;
        
        gsap.to(element, {
          rotation: newRotation,
          duration: 0.7,
          ease: "power2.out",
          onUpdate: function () {
            handleUpdateFromAngle(gsap.getProperty(element, 'rotation'));
          },
          onComplete: () => {
            if (draggableInstance) draggableInstance.update();
          }
        });
      }
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
  const renderGeometry = () => {
    if (!currentAngles || currentAngles.length === 0) return null;

    const R = 42; 
    const cx = 50;
    const cy = 50;
    const getCoords = (angle) => {
      const rad = (angle * Math.PI) / 180;
      return {
        x: cx + R * Math.sin(rad),
        y: cy - R * Math.cos(rad)
      };
    };

    const pts = currentAngles.map(getCoords);

    let lines = null;
    if (activeSchemeId === 'mono') {
      lines = <line x1={cx} y1={cy} x2={pts[0].x} y2={pts[0].y} stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />;
    } else if (activeSchemeId === 'analogo') {
      lines = pts.map((pt, i) => (
        <line key={i} x1={cx} y1={cy} x2={pt.x} y2={pt.y} stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />
      ));
    } else if (activeSchemeId === 'complementario') {
      lines = <line x1={pts[0].x} y1={pts[0].y} x2={pts[1].x} y2={pts[1].y} stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />;
    } else {
      const pointsStr = pts.map(p => `${p.x},${p.y}`).join(' ');
      lines = <polygon points={pointsStr} fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />;
    }

    return (
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-all duration-500 drop-shadow-md">
        {lines}
        {pts.map((pt, i) => (
          <circle key={`node-${i}`} cx={pt.x} cy={pt.y} r="2.2" fill="white" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" className="drop-shadow-sm" />
        ))}
      </svg>
    );
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

          {/* Overlay Geométrico */}
          {renderGeometry()}

          {/* Círculo central con el color activo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF6EF] shadow-[0_2px_15px_rgba(0,0,0,0.15)] border border-[#241F1A]/10 flex items-center justify-center pointer-events-none z-20">
            <div 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-inner transition-colors duration-200 border border-black/5"
              style={{ backgroundColor: activeColor || baseColor }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
