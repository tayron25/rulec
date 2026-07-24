import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import chroma from 'chroma-js';
import { Download, CheckCircle2, FileText, ShieldCheck, Sparkles } from 'lucide-react';
import { useColor } from '../context/ColorContext';

/**
 * Componente ExportadorPDF.
 * Genera un archivo PDF 100% VECTORIAL utilizando exclusivamente las primitivas de jsPDF
 * (doc.setFillColor, doc.rect, doc.text, doc.line). PROHIBIDO usar html2canvas ni imágenes rasterizadas
 * para garantizar compatibilidad con imprentas y edición en Adobe Illustrator / CorelDRAW.
 *
 * @param {Object} currentPalette - Objeto del esquema comercial actualmente seleccionado en el Taller.
 * @param {string} activeColor - Color activo principal.
 * @param {string} activeTonality - Intensidad del color seleccionada (vibrante, claro, oscuro).
 */
export default function ExportadorPDF({ currentPalette, activeColor = '#E84F30', activeTonality = 'vibrante' }) {
  const { userProfile, baseColor } = useColor();
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  /**
   * Dibuja y descarga el PDF puramente mediante vectores matemáticos y texto tipográfico en jsPDF.
   */
  const handleDownloadPDF = () => {
    try {
      setIsGenerating(true);
      setDownloadSuccess(false);

      // Crear documento A4 en milímetros
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // ========================================================
      // 1. CABECERA CORPORATIVA VECTORIAL
      // ========================================================
      // Barra superior decorativa color pino (#1F4B44)
      doc.setFillColor(31, 75, 68);
      doc.rect(0, 0, 210, 16, 'F');

      // Detalle de acento naranja (#E84F30) debajo de la barra pino
      doc.setFillColor(232, 79, 48);
      doc.rect(0, 16, 210, 1.5, 'F');

      // Título principal vectorial
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(36, 31, 26); // #241F1A (Tinta)
      doc.text('Guía de Marca Generada por RULEC', 20, 32);

      // Subtítulo e información académica / comercial
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(11);
      doc.setTextColor(154, 146, 132); // #9A9284 (Muted)
      doc.text('Asesor de Identidad Cromática — Colaboración Ingeniería de Sistemas & Marketing', 20, 39);

      // Línea divisoria vectorial
      doc.setDrawColor(220, 215, 205);
      doc.setLineWidth(0.5);
      doc.line(20, 44, 190, 44);

      // ========================================================
      // 2. RESUMEN DEL PERFIL DEL NEGOCIO (SI EXISTE DIAGNÓSTICO)
      // ========================================================
      let currentY = 54;
      if (userProfile && (userProfile.rubro || userProfile.emocion)) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(31, 75, 68); // #1F4B44
        doc.text('1. Diagnóstico e Identidad de tu Negocio', 20, currentY);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10.5);
        doc.setTextColor(91, 86, 78);
        
        const rubroText = userProfile.rubro ? `• Rubro / Sector: ${userProfile.rubro.toUpperCase()}` : '• Rubro: No especificado';
        const publicoText = userProfile.publico ? `• Público Objetivo: ${userProfile.publico.toUpperCase()}` : '';
        const emocionText = userProfile.emocion ? `• Emoción Transmitida: ${userProfile.emocion.toUpperCase()}` : '';

        currentY += 7;
        doc.text(`${rubroText}    ${publicoText}    ${emocionText}`, 20, currentY);
        currentY += 10;
      } else {
        currentY = 56;
      }

      // ========================================================
      // 3. SECCIÓN DE LA PALETA Y ESQUEMA SELECCIONADO
      // ========================================================
      const schemeTitle = currentPalette ? currentPalette.commercialName : 'Paleta Personalizada';
      const schemeTech = currentPalette ? `(Nombre técnico: ${currentPalette.technicalName})` : '';
      const schemeDesc = currentPalette ? currentPalette.description : 'Selección generada matemáticamente en el Taller Cromático.';

      // Mapeo del estado interno de intensidad a un texto comercial presentable
      const tonalityLabels = {
        vibrante: 'Vibrante y Llamativo',
        oscuro: 'Oscuro y Serio',
        claro: 'Claro / Pastel'
      };
      const tonalityLabel = tonalityLabels[activeTonality] || 'Vibrante';

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.setTextColor(36, 31, 26);
      doc.text(`Esquema Seleccionado: ${schemeTitle}`, 20, currentY);

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      doc.setTextColor(154, 146, 132);
      doc.text(schemeTech, 20, currentY + 6);

      // Etiqueta de la Intensidad Seleccionada en el Taller
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(31, 75, 68); // #1F4B44
      doc.text(`Intensidad Aplicada: ${tonalityLabel}`, 20, currentY + 12);

      // Descripción en líneas ajustadas para no rebasar margen derecho
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      doc.setTextColor(91, 86, 78);
      const splitDesc = doc.splitTextToSize(schemeDesc, 170);
      doc.text(splitDesc, 20, currentY + 19);

      currentY += 19 + splitDesc.length * 5 + 6;

      // Línea divisoria antes de los bloques
      doc.setDrawColor(235, 232, 224);
      doc.setLineWidth(0.4);
      doc.line(20, currentY, 190, currentY);
      currentY += 8;

      // ========================================================
      // 4. BLOQUES DE COLOR VECTORIALES (doc.setFillColor + doc.rect)
      // ========================================================
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(31, 75, 68);
      doc.text('Especificación de Tonos para Imprenta y Diseño Digital:', 20, currentY);
      currentY += 8;

      const colorsToRender = currentPalette?.colors || [
        { hex: activeColor, role: 'Color Principal', rgbText: 'RGB (...)' }
      ];

      colorsToRender.forEach((colorItem, index) => {
        // Si nos pasamos del largo de página, añadir página vectorial
        if (currentY > 250) {
          doc.addPage();
          currentY = 25;
        }

        const hexStr = colorItem.hex || '#E84F30';
        const [r, g, b] = chroma(hexStr).rgb();

        // A) Dibujar rectángulo exacto de color puramente con vectores
        doc.setFillColor(r, g, b);
        doc.rect(20, currentY, 36, 22, 'F');

        // Borde fino por si el color es muy claro o blanco
        doc.setDrawColor(210, 210, 210);
        doc.setLineWidth(0.3);
        doc.rect(20, currentY, 36, 22, 'S');

        // B) Imprimir texto descriptivo al lado del bloque (x = 62)
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(36, 31, 26);
        doc.text(colorItem.role || `Tono ${index + 1}`, 62, currentY + 6);

        // Código HEX vectorial
        doc.setFont('courier', 'bold');
        doc.setFontSize(11.5);
        doc.setTextColor(31, 75, 68);
        doc.text(`HEX: ${hexStr.toUpperCase()}`, 62, currentY + 12.5);

        // Código RGB vectorial y CMYK estimado o legibilidad
        doc.setFont('courier', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(110, 105, 96);
        const rgbLabel = colorItem.rgbText || `RGB: (${r}, ${g}, ${b})`;
        doc.text(rgbLabel, 62, currentY + 18.5);

        // Espaciado vertical para el siguiente color
        currentY += 28;
      });

      // ========================================================
      // 5. RECOMENDACIONES DE USO E IMPRENTA (PIE DE DOCUMENTO)
      // ========================================================
      if (currentY > 240) {
        doc.addPage();
        currentY = 25;
      } else {
        currentY += 4;
      }

      doc.setFillColor(250, 246, 239); // #FAF6EF
      doc.setDrawColor(220, 215, 205);
      doc.setLineWidth(0.4);
      doc.rect(20, currentY, 170, 26, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(36, 31, 26);
      doc.text('Nota de Calidad para Adobe Illustrator e Imprenta:', 25, currentY + 7);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(91, 86, 78);
      const noteText = doc.splitTextToSize(
        'Este archivo ha sido generado vector a vector mediante jsPDF. Puedes abrir este PDF directamente en Adobe Illustrator o CorelDRAW para extraer los cuadros de color y tipografías sin pérdida de resolución ni compresión rasterizada.',
        160
      );
      doc.text(noteText, 25, currentY + 13);

      // Pie de página inferior fijo
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(160, 155, 145);
      doc.text('RULEC — Proyecto Universitario de Bolivia • Todos los derechos reservados', 20, 287);
      doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 160, 287);

      // 6. DESCARGA AUTOMÁTICA DEL ARCHIVO
      const fileName = `Guia_de_Marca_RULEC_${currentPalette?.commercialName?.replace(/\s+/g, '_') || 'Paleta'}.pdf`;
      doc.save(fileName);

      setIsGenerating(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (error) {
      console.error('Error generando PDF vectorial:', error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-[#1F4B44] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden transition-all">
      {/* Decoración de fondo */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wide mb-3">
            <ShieldCheck className="w-4 h-4 text-[#BE8A3A]" />
            <span>Calidad Profesional de Imprenta (100% Vectorial)</span>
          </div>
          <h3 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-2">
            Descarga el Manual Corto de tu Identidad
          </h3>
          <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
            Obtén tu paleta en un archivo PDF editable en Adobe Illustrator o CorelDRAW. Sin capturas borrosas: colores exactos listos para tu diseñador o imprenta en Bolivia.
          </p>
        </div>

        <div className="flex flex-col items-stretch sm:items-end gap-3 w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className={`group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-medium text-base sm:text-lg shadow-xl transition-all duration-200 cursor-pointer ${
              isGenerating
                ? 'bg-white/30 text-white/70 cursor-wait'
                : 'bg-[#E84F30] text-white hover:bg-[#d64123] hover:scale-105 active:scale-95 shadow-[#E84F30]/30'
            }`}
          >
            {isGenerating ? (
              <span>Generando Vectores...</span>
            ) : (
              <>
                <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                <span>Descargar mi Guía de Marca (PDF)</span>
              </>
            )}
          </button>

          {downloadSuccess && (
            <div className="inline-flex items-center justify-center gap-1.5 text-xs text-white bg-white/15 px-3.5 py-1.5 rounded-full animate-fade-in self-center md:self-end">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#BE8A3A]" />
              <span>¡PDF Vectorial Descargado con Éxito!</span>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-[11px] text-white/70">
        <span className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-[#BE8A3A]" />
          <span>Formato: A4 PDF • Colores: HEX & RGB • Editable en vectores</span>
        </span>
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#BE8A3A]" />
          <span>Fórmulas exactas garantizadas por RULEC</span>
        </span>
      </div>
    </div>
  );
}