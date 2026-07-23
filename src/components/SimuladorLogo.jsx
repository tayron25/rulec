import React, { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import { Upload, Image as ImageIcon, AlertTriangle, CheckCircle2, RefreshCw, Sparkles, Download, Wand2, Type } from 'lucide-react';

/**
 * Componente SimuladorLogo integrado con Tarjeta Comercial.
 * Implementa evaluación de contraste dinámico y motor de exportación Canvas.
 */
export default function SimuladorLogo({ activeColor = '#E84F30', paletteColors = [] }) {
  // Estados del Logotipo
  const [logoSrc, setLogoSrc] = useState(null);
  const [selectedBg, setSelectedBg] = useState(activeColor);
  const [isDragging, setIsDragging] = useState(false);

  // Estados del Letrero Comercial
  const [letreroBg, setLetreroBg] = useState(activeColor);
  const [letreroText, setLetreroText] = useState('#FFFFFF');

  // Sincronización inicial con la rueda
  useEffect(() => {
    setSelectedBg(activeColor);
    setLetreroBg(activeColor);
    // Para el texto inicial del letrero, buscamos un contraste seguro automático
    const initialText = chroma.contrast(activeColor, 'white') > 4.5 ? '#FFFFFF' : '#241F1A';
    setLetreroText(initialText);
  }, [activeColor]);

  // ========================================================
  // LÓGICA DE DRAG & DROP Y CARGA DE IMAGEN
  // ========================================================
  const handleFileChange = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => setLogoSrc(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFileChange(e.dataTransfer.files[0]);
  };

  // ========================================================
  // MOTOR MATEMÁTICO: RECOMENDACIÓN DE CONTRASTE MÁXIMO
  // ========================================================
  const aplicarRecomendacionRulec = () => {
    if (!paletteColors || paletteColors.length < 2) return;
    
    let maxContrast = 0;
    let mejorFondo = paletteColors[0].hex;
    let mejorTexto = paletteColors[1].hex;

    // Iteramos todas las combinaciones posibles para hallar la mejor legibilidad
    paletteColors.forEach(bg => {
      paletteColors.forEach(text => {
        if (bg.hex !== text.hex) {
          const contraste = chroma.contrast(bg.hex, text.hex);
          if (contraste > maxContrast) {
            maxContrast = contraste;
            mejorFondo = bg.hex;
            mejorTexto = text.hex;
          }
        }
      });
    });

    setLetreroBg(mejorFondo);
    setLetreroText(mejorTexto);
  };

  // ========================================================
  // DESCARGA DEL LOGOTIPO (RENDERIZADO EN CANVAS INVISIBLE)
  // ========================================================
  const descargarLogoConFondo = () => {
    if (!logoSrc) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = logoSrc;
    
    img.onload = () => {
      // Lienzo de alta resolución estándar
      canvas.width = 1200;
      canvas.height = 800;
      
      // 1. Pintar fondo
      ctx.fillStyle = selectedBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 2. Calcular escala para centrar el logo (máximo 60% del lienzo)
      const scale = Math.min((canvas.width * 0.6) / img.width, (canvas.height * 0.6) / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;
      
      // 3. Dibujar logo
      ctx.drawImage(img, x, y, w, h);
      
      // 4. Forzar descarga
      const link = document.createElement('a');
      link.download = `Logo-RULEC-${selectedBg.replace('#', '')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
  };

  // ========================================================
  // CÁLCULO DE LEGIBILIDAD DINÁMICA (LOGOTIPO)
  // ========================================================
  const contrastWhite = chroma.contrast(selectedBg, 'white');
  const contrastBlack = chroma.contrast(selectedBg, 'black');
  
  // Generador dinámico de mensajes
  let mensajeLogotipo = {};
  if (contrastWhite >= 4.5 && contrastBlack < 4.5) {
    mensajeLogotipo = {
      titulo: 'Fondo ideal para logotipos claros',
      texto: 'Garantiza una lectura perfecta. Te recomendamos usar la versión blanca o en tonos pastel de tu logotipo.',
      color: 'text-[#1F4B44]',
      bg: 'bg-[#1F4B44]/15',
      icono: <CheckCircle2 className="w-5 h-5" />
    };
  } else if (contrastBlack >= 4.5 && contrastWhite < 4.5) {
    mensajeLogotipo = {
      titulo: 'Fondo ideal para logotipos oscuros',
      texto: 'Tu logotipo resaltará de forma clara. Utiliza la versión negra o de colores oscuros intensos.',
      color: 'text-[#1F4B44]',
      bg: 'bg-[#1F4B44]/15',
      icono: <CheckCircle2 className="w-5 h-5" />
    };
  } else if (contrastWhite >= 4.5 && contrastBlack >= 4.5) {
    mensajeLogotipo = {
      titulo: 'Fondo ultra versátil',
      texto: '¡Excelente elección! Este color permite que tanto logotipos blancos como negros se lean a la perfección.',
      color: 'text-[#1F4B44]',
      bg: 'bg-[#1F4B44]/15',
      icono: <CheckCircle2 className="w-5 h-5" />
    };
  } else {
    mensajeLogotipo = {
      titulo: 'Atención: Contraste de riesgo',
      texto: 'Este fondo podría absorber tu logo. Intenta usar otro color de la paleta o aplica un contorno a tu imagen.',
      color: 'text-[#E84F30]',
      bg: 'bg-[#E84F30]/15',
      icono: <AlertTriangle className="w-5 h-5" />
    };
  }

  // ========================================================
  // CÁLCULO DE LEGIBILIDAD DINÁMICA (LETRERO COMERCIAL)
  // ========================================================
  const letreroContrastRatio = chroma.contrast(letreroBg, letreroText);
  
  let tituloLetrero = '';
  let copyLetrero = '';

  if (letreroContrastRatio >= 4.5) {
    tituloLetrero = 'Legibilidad Óptima';
    copyLetrero = '¡Combinación perfecta! Tus clientes leerán el nombre de tu marca sin esfuerzo. Ideal para tarjetas de presentación, menús físicos y textos pequeños.';
  } else if (letreroContrastRatio >= 3.0) {
    tituloLetrero = 'Lectura Moderada / Suave';
    copyLetrero = 'Este par de colores tiene una armonía suave. Te recomendamos usar esta combinación únicamente para títulos gigantes o logotipos grandes, y buscar un tono de mayor contraste para textos pequeños.';
  } else {
    tituloLetrero = 'Atención: Dificultad de Lectura';
    copyLetrero = '¡Cuidado! El texto casi se pierde con este fondo y dificulta mucho la lectura. Te sugerimos presionar el botón "Recomendación RULEC" para encontrar al instante una pareja más fuerte.';
  }

  return (
    <div className="flex flex-col gap-8">
      
      {/* ========================================================= */}
      {/* SECCIÓN 1: SIMULADOR DE LETRERO / TARJETA COMERCIAL       */}
      {/* ========================================================= */}
      <div className="bg-white border border-[#241F1A]/10 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="mb-6 border-b border-[#241F1A]/10 pb-4 flex justify-between items-center">
          <div>
            <h3 className="font-serif font-bold text-2xl text-[#241F1A]">Simulador de Letrero Comercial</h3>
            <p className="text-sm text-[#5B564E]">Personaliza los colores de tu paleta y evalúa su contraste en textos reales.</p>
          </div>
          <button 
            onClick={aplicarRecomendacionRulec}
            className="flex items-center gap-2 px-4 py-2 bg-[#1F4B44] text-white rounded-full text-xs font-semibold shadow-sm hover:bg-[#183934] transition-colors"
          >
            <Wand2 className="w-4 h-4" /> Recomendación RULEC
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* El Letrero Visual */}
          <div 
            className="h-48 sm:h-56 rounded-2xl flex flex-col justify-between p-6 shadow-inner transition-colors duration-300"
            style={{ backgroundColor: letreroBg, color: letreroText }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-serif font-bold text-3xl mb-1">Tu Emprendimiento</h2>
                <p className="text-xs tracking-widest opacity-80 uppercase">Identidad Visual Bolivia</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-serif font-bold text-xl" style={{ borderColor: letreroText }}>
                R
              </div>
            </div>
            <div className="flex justify-between text-xs opacity-90 font-mono">
              <span>www.tumarca.com.bo</span>
              <span>Fondo: {letreroBg} • Texto: {letreroText}</span>
            </div>
          </div>

          {/* Controles y Alerta del Letrero */}
          <div className="flex flex-col gap-5">
            <div className="bg-[#FAF6EF] rounded-2xl p-4 border border-[#241F1A]/10">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${letreroContrastRatio >= 4.5 ? 'bg-[#1F4B44]/15 text-[#1F4B44]' : 'bg-[#E84F30]/15 text-[#E84F30]'}`}>
                  {letreroContrastRatio >= 4.5 ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#241F1A]">
                    {tituloLetrero}
                  </h4>
                  <p className="text-xs text-[#5B564E] mt-1">Ratio evaluado: <strong>{letreroContrastRatio.toFixed(1)}:1</strong>. {copyLetrero}</p>
                </div>
              </div>
            </div>

            {/* Selectores de Personalización */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-[#241F1A]">Color de Fondo:</span>
                <div className="flex gap-2">
                  {paletteColors.map((c, i) => (
                    <button key={`bg-${i}`} onClick={() => setLetreroBg(c.hex)} className={`w-8 h-8 rounded-full border-2 transition-all ${letreroBg === c.hex ? 'border-[#241F1A] scale-110 shadow-md' : 'border-transparent'}`} style={{ backgroundColor: c.hex }} title={`Fondo: ${c.hex}`} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-[#241F1A]">Color de Texto:</span>
                <div className="flex gap-2">
                  {paletteColors.map((c, i) => (
                    <button key={`txt-${i}`} onClick={() => setLetreroText(c.hex)} className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${letreroText === c.hex ? 'border-[#241F1A] scale-110 shadow-md' : 'border-transparent'}`} style={{ backgroundColor: c.hex }} title={`Texto: ${c.hex}`}>
                       <Type className="w-3 h-3 text-white/50 mix-blend-difference" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECCIÓN 2: SIMULADOR DE LOGOTIPO                          */}
      {/* ========================================================= */}
      <div className="bg-white border border-[#241F1A]/10 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#241F1A]/10">
          <div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#241F1A]">Prueba tu Logotipo en Vivo</h3>
            <p className="text-xs sm:text-sm text-[#5B564E] mt-1">Sube el archivo de tu logo para verificar cómo resalta sobre tu nuevo color de fondo.</p>
          </div>
          {logoSrc && (
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#241F1A]/20 bg-[#FAF6EF] text-xs font-semibold hover:bg-[#241F1A] hover:text-white transition-colors cursor-pointer shrink-0">
              <RefreshCw className="w-3.5 h-3.5" /> <span>Cambiar imagen</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e.target.files[0])} />
            </label>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Zona Visual Logo */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div 
              className="relative w-full h-64 sm:h-80 rounded-2xl border border-[#241F1A]/15 shadow-inner flex items-center justify-center p-8 overflow-hidden transition-colors duration-300 group"
              style={{ backgroundColor: selectedBg }}
            >
              {logoSrc ? (
                <>
                  <img src={logoSrc} alt="Logotipo" className="max-w-full max-h-full object-contain filter drop-shadow-md transition-transform group-hover:scale-105 duration-200" />
                  <button onClick={descargarLogoConFondo} className="absolute top-4 right-4 bg-white/90 text-[#241F1A] hover:bg-[#241F1A] hover:text-white px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100">
                    <Download className="w-4 h-4" /> Descargar
                  </button>
                </>
              ) : (
                <div className="text-center p-6 rounded-2xl border border-current/20 max-w-xs" style={{ color: contrastWhite >= contrastBlack ? '#FFFFFF' : '#241F1A' }}>
                  <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center mx-auto mb-3 font-serif font-bold text-2xl">R</div>
                  <p className="font-serif font-bold text-xl tracking-tight">Tu Logotipo Aquí</p>
                </div>
              )}
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 text-white font-mono text-xs backdrop-blur-md shadow-sm">Fondo: {selectedBg}</div>
            </div>

            {/* Selector rápido de fondo logo */}
            {paletteColors && paletteColors.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <span className="text-xs text-[#5B564E] font-medium mr-1">Probar sobre:</span>
                {paletteColors.map((colorItem, idx) => (
                  <button key={`logoBg-${idx}`} onClick={() => setSelectedBg(colorItem.hex)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono shrink-0 transition-all ${selectedBg === colorItem.hex ? 'border-[#241F1A] bg-[#241F1A] text-white shadow-sm' : 'border-[#241F1A]/20 bg-[#FAF6EF] hover:border-[#1F4B44]'}`}>
                    <span className="w-3 h-3 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: colorItem.hex }} />
                    <span>{colorItem.hex}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Zona Derecha Logo (Upload & Alertas) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {!logoSrc && (
              <div onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all flex flex-col items-center gap-3 ${isDragging ? 'border-[#1F4B44] bg-[#1F4B44]/10' : 'border-[#241F1A]/20 bg-[#FAF6EF]/50'}`}>
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1F4B44]"><Upload className="w-6 h-6" /></div>
                <div>
                  <p className="font-serif font-bold text-sm">Arrastra tu archivo de logo</p>
                  <p className="text-xs text-[#9A9284]">PNG transparente, JPG o SVG</p>
                </div>
                <label className="mt-2 px-5 py-2 rounded-full bg-[#1F4B44] text-white text-xs font-semibold hover:bg-[#183934] cursor-pointer shadow-sm">
                  Seleccionar imagen <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e.target.files[0])} />
                </label>
              </div>
            )}

            <div className="bg-[#FAF6EF] border border-[#241F1A]/10 rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${mensajeLogotipo.color} ${mensajeLogotipo.bg}`}>
                  {mensajeLogotipo.icono}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#241F1A] mb-1">{mensajeLogotipo.titulo}</h4>
                  <p className="text-xs sm:text-sm text-[#5B564E]">{mensajeLogotipo.texto}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#241F1A]/10 text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-white border border-[#241F1A]/10">
                  <span className="text-[#5B564E]">Logo Blanco:</span>
                  <span className={`font-mono font-bold ${contrastWhite >= 4.5 ? 'text-[#1F4B44]' : 'text-[#E84F30]'}`}>{contrastWhite.toFixed(1)}:1</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-white border border-[#241F1A]/10">
                  <span className="text-[#5B564E]">Logo Negro:</span>
                  <span className={`font-mono font-bold ${contrastBlack >= 4.5 ? 'text-[#1F4B44]' : 'text-[#E84F30]'}`}>{contrastBlack.toFixed(1)}:1</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}