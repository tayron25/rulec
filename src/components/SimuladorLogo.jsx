import React, { useState } from 'react';
import chroma from 'chroma-js';
import { Upload, Image as ImageIcon, AlertTriangle, CheckCircle2, RefreshCw, Sparkles } from 'lucide-react';

/**
 * Componente SimuladorLogo con Drag & Drop y evaluación de contraste WCAG mediante Chroma.js.
 * Permite al microempresario probar su logotipo real sobre el color activo o cualquier tono de su paleta.
 *
 * @param {string} activeColor - Color base actualmente seleccionado en la rueda.
 * @param {Array} paletteColors - Arreglo opcional de colores de la paleta activa para intercambiar el fondo.
 */
export default function SimuladorLogo({ activeColor = '#E84F30', paletteColors = [] }) {
  const [logoSrc, setLogoSrc] = useState(null);
  const [selectedBg, setSelectedBg] = useState(activeColor);
  const [isDragging, setIsDragging] = useState(false);

  // Si cambia el activeColor en la rueda y no hemos fijado otro manual, seguir la rueda
  React.useEffect(() => {
    setSelectedBg(activeColor);
  }, [activeColor]);

  // Manejo de carga de imagen local con FileReader
  const handleFileChange = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // ========================================================
  // CÁLCULO DE CONTRASTE BASE WCAG CON CHROMA.JS
  // ========================================================
  const contrastWhite = chroma.contrast(selectedBg, 'white');
  const contrastBlack = chroma.contrast(selectedBg, 'black');

  // Evaluamos si el fondo tiene mal contraste general o cuál es mejor
  // Un fondo de tono medio difícil (donde ni el blanco ni el negro superan 4.5) es peligroso para logos finos
  const isPoorGeneralContrast = contrastWhite < 4.0 && contrastBlack < 4.0;
  const bestColorRecommendation = contrastWhite >= contrastBlack ? 'blanco / colores claros' : 'negro / colores oscuros';

  return (
    <div className="bg-white border border-[#241F1A]/10 rounded-3xl p-6 sm:p-10 shadow-sm transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#241F1A]/10">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F4B44]/10 text-[#1F4B44] text-xs font-semibold mb-2">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Simulador de Logotipo & Contraste</span>
          </span>
          <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#241F1A]">
            Prueba tu Logotipo en Vivo
          </h3>
          <p className="text-xs sm:text-sm text-[#5B564E] mt-1">
            Sube el archivo de tu logo para verificar cómo resalta sobre tu nuevo color de fondo.
          </p>
        </div>

        {/* Botón rápido para cambiar la imagen subida si ya hay una */}
        {logoSrc && (
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#241F1A]/20 bg-[#FAF6EF] text-xs font-semibold text-[#241F1A] hover:bg-[#241F1A] hover:text-white transition-colors cursor-pointer shrink-0">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Cambiar imagen</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files[0])}
            />
          </label>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* COLUMNA IZQUIERDA: ÁREA DE VISUALIZACIÓN DEL LOGO SOBRE EL FONDO */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div
            className="relative w-full h-64 sm:h-80 rounded-2xl border border-[#241F1A]/15 shadow-inner flex items-center justify-center p-8 overflow-hidden transition-colors duration-300"
            style={{ backgroundColor: selectedBg }}
          >
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="Logotipo del usuario"
                className="max-w-full max-h-full object-contain filter drop-shadow-md transition-transform hover:scale-105 duration-200"
              />
            ) : (
              /* Marca por defecto o Placeholder elegante si aún no ha subido imagen */
              <div
                className="text-center p-6 rounded-2xl border border-current/20 backdrop-blur-sm max-w-xs transition-all"
                style={{ color: contrastWhite >= contrastBlack ? '#FFFFFF' : '#241F1A' }}
              >
                <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center mx-auto mb-3 font-serif font-bold text-2xl">
                  R
                </div>
                <p className="font-serif font-bold text-xl tracking-tight">Tu Logotipo Aquí</p>
                <p className="text-xs opacity-80 mt-1">Sube una imagen o arrástrala a la zona de la derecha</p>
              </div>
            )}

            {/* Etiqueta del color de fondo actual */}
            <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 text-white font-mono text-xs backdrop-blur-md shadow-sm">
              Fondo: {selectedBg}
            </div>
          </div>

          {/* Selector rápido para probar el logo sobre los otros colores de la paleta elegida */}
          {paletteColors && paletteColors.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <span className="text-xs text-[#5B564E] shrink-0 font-medium mr-1">Probar sobre:</span>
              {paletteColors.map((colorItem, idx) => (
                <button
                  key={`${colorItem.hex}-${idx}`}
                  onClick={() => setSelectedBg(colorItem.hex)}
                  title={`Probar sobre ${colorItem.role}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono shrink-0 transition-all cursor-pointer ${
                    selectedBg === colorItem.hex
                      ? 'border-[#241F1A] bg-[#241F1A] text-white shadow-sm'
                      : 'border-[#241F1A]/20 bg-[#FAF6EF] text-[#241F1A] hover:border-[#1F4B44]'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: colorItem.hex }}
                  />
                  <span>{colorItem.hex}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA: SUBIDA (DRAG & DROP) Y ALERTAS DE CONTRASTE */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* ZONA DE DRAG & DROP SI NO HAY IMAGEN (o botón si quiere cargar) */}
          {!logoSrc && (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all flex flex-col items-center justify-center gap-3 cursor-pointer ${
                isDragging
                  ? 'border-[#1F4B44] bg-[#1F4B44]/10 scale-[1.01]'
                  : 'border-[#241F1A]/20 bg-[#FAF6EF]/50 hover:border-[#1F4B44]/50 hover:bg-[#FAF6EF]'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1F4B44]">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="font-serif font-bold text-sm text-[#241F1A]">
                  Arrastra y suelta tu archivo de logo
                </p>
                <p className="text-xs text-[#9A9284] mt-0.5">
                  Archivos PNG (con fondo transparente), JPG o SVG
                </p>
              </div>
              <label className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1F4B44] text-white text-xs font-semibold hover:bg-[#183934] transition-colors cursor-pointer shadow-sm">
                <span>Seleccionar imagen</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                />
              </label>
            </div>
          )}

          {/* BANNER / ALERTA DE CONTRASTE WCAG (CHROMA.JS) */}
          <div className="bg-[#FAF6EF] border border-[#241F1A]/10 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              {isPoorGeneralContrast ? (
                <div className="w-9 h-9 rounded-xl bg-[#E84F30]/15 text-[#E84F30] flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-[#1F4B44]/15 text-[#1F4B44] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
              <div>
                <h4 className="font-serif font-bold text-base text-[#241F1A] mb-1">
                  {isPoorGeneralContrast
                    ? '¡Ojo! Este color de fondo podría dificultar la lectura'
                    : 'Fondo ideal con alto potencial de legibilidad'}
                </h4>
                <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed">
                  {isPoorGeneralContrast
                    ? 'Asegúrate de que tu logotipo tenga un borde o un contraste fuerte. Este tono es medio y puede hacer que los textos finos se pierdan un poco.'
                    : `Tu logotipo resaltará de forma clara y profesional. Te recomendamos que los elementos principales de tu logo sean de color ${bestColorRecommendation}.`}
                </p>
              </div>
            </div>

            {/* Indicadores rápidos de contraste sobre el fondo actual */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#241F1A]/10 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#241F1A]/10">
                <span className="text-[#5B564E]">Logo Blanco:</span>
                <span className={`font-mono font-bold ${contrastWhite >= 4.5 ? 'text-[#1F4B44]' : 'text-[#E84F30]'}`}>
                  {contrastWhite.toFixed(1)}:1
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#241F1A]/10">
                <span className="text-[#5B564E]">Logo Negro:</span>
                <span className={`font-mono font-bold ${contrastBlack >= 4.5 ? 'text-[#1F4B44]' : 'text-[#E84F30]'}`}>
                  {contrastBlack.toFixed(1)}:1
                </span>
              </div>
            </div>
          </div>

          <div className="text-xs text-[#9A9284] flex items-center gap-1.5 px-1">
            <Sparkles className="w-3.5 h-3.5 text-[#E84F30] shrink-0" />
            <span>Tip: Los formatos PNG o SVG transparentes permiten que el color del fondo abrace tu logotipo sin recuadros blancos.</span>
          </div>

        </div>

      </div>
    </div>
  );
}
