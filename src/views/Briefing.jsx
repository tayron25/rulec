import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { FileText, Download, CheckCircle, Building2, Target, HeartHandshake, Eye, ShieldCheck, AlertCircle, Printer } from 'lucide-react';

export default function Briefing() {
  const [formData, setFormData] = useState({
    // Sección 1
    empresa: '',
    responsable: '',
    cargo: '',
    direccion: '',
    ciudad: '',
    telefono: '',
    redes: '',
    antiguedad: '',
    rubro: '',
    historia: '',
    
    // Sección 2
    actividadPrincipal: '',
    propositoMision: '',
    vision: '',
    valores: [],
    valoresExplicacion: '',

    // Sección 3
    publicoObjetivo: [],
    publicoDetalle: '',
    propuestaValor: '',
    razonesConfiar: '',

    // Sección 4
    personalidad: [],
    tresPalabras: '',
    deseaProyectar: '',
    noDeseaProyectar: '',
    nombreSignificado: '',
    eslogan: '',
    coloresPreferidos: '',
    coloresEvitar: '',
    ideasVisuales: '',
    aplicaciones: [],

    // Sección 5
    observaciones: '',
    ciPropietario: '',
    diseñadorNombre: '',
    fechaRegistro: new Date().toISOString().split('T')[0]
  });

  const [pdfGenerado, setPdfGenerado] = useState(false);
  const [errores, setErrores] = useState({});

  // Manejador de campos simples con validación de teléfono
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'telefono' && value !== '' && !/^[0-9+\s-]*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: false }));
    }
  };

  // Manejador de checkboxes con límite de selección (máx 3)
  const handleCheckboxChange = (category, value) => {
    setFormData((prev) => {
      const currentList = prev[category] || [];
      if (currentList.includes(value)) {
        return { ...prev, [category]: currentList.filter((item) => item !== value) };
      }
      if (currentList.length >= 3) {
        alert('Puedes seleccionar un máximo de 3 opciones principales.');
        return prev;
      }
      return { ...prev, [category]: [...currentList, value] };
    });
  };

  // Validar antes de exportar la versión digital
  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!formData.empresa.trim()) nuevosErrores.empresa = true;
    if (!formData.responsable.trim()) nuevosErrores.responsable = true;
    if (!formData.telefono.trim()) nuevosErrores.telefono = true;

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Funciōn Unificada para Exportar PDF (Digital o en Blanco)
  const exportarPDF = (enBlanco = false) => {
    if (!enBlanco && !validarFormulario()) {
      alert('Por favor completa los campos requeridos (Empresa, Responsable y Teléfono) antes de descargar.');
      return;
    }

    try {
      const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      let y = 15;

      const addHeader = (title) => {
        if (y > 260) {
          doc.addPage();
          y = 15;
        }
        doc.setFillColor(31, 75, 68); // #1F4B44
        doc.rect(12, y, pageWidth - 24, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(title.toUpperCase(), 15, y + 5);
        y += 11;
        doc.setTextColor(36, 31, 26);
      };

      const addField = (label, value) => {
        if (y > 270) {
          doc.addPage();
          y = 15;
        }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.text(`${label}:`, 15, y);
        
        doc.setFont('helvetica', 'normal');
        
        // Si es en blanco, se imprimen líneas punteadas/guiones para llenar a mano
        const textDisplay = enBlanco ? '____________________________________________________' : (value || 'N/A');
        const textLines = doc.splitTextToSize(textDisplay, pageWidth - 55);
        doc.text(textLines, 50, y);
        y += Math.max(6, textLines.length * 4);
      };

      // Encabezado
      doc.setFillColor(250, 246, 239);
      doc.rect(0, 0, pageWidth, 25, 'F');
      doc.setFont('serif', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(31, 75, 68);
      doc.text('BRIEF DE IDENTIDAD CORPORATIVA', 15, 12);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(91, 86, 78);
      doc.text(enBlanco ? 'Plantilla de Levantamiento de Información (Para Llenado a Mano)' : `Documento de Diagnóstico — Fecha: ${formData.fechaRegistro}`, 15, 18);
      y = 30;

      // Sección 1
      addHeader('1. Datos de Identificación y Trayectoria');
      addField('Empresa', formData.empresa);
      addField('Responsable / Cargo', enBlanco ? '' : `${formData.responsable} ${formData.cargo ? `(${formData.cargo})` : ''}`);
      addField('Ubicación', enBlanco ? '' : `${formData.direccion || ''} ${formData.ciudad ? `, ${formData.ciudad}` : ''}`);
      addField('Contacto / Redes', enBlanco ? '' : `${formData.telefono} ${formData.redes ? `| ${formData.redes}` : ''}`);
      addField('Antigüedad / Rubro', enBlanco ? '' : `${formData.antiguedad || 'N/A'} | ${formData.rubro || 'N/A'}`);
      addField('Historia de la Empresa', formData.historia);

      // Sección 2
      addHeader('2. Filosofía y Estrategia de Marca');
      addField('Actividad Principal', formData.actividadPrincipal);
      addField('Propósito / Misión', formData.propositoMision);
      addField('Visión (3-5 Años)', formData.vision);

      // Sección 3
      addHeader('3. Mercado y Público Objetivo');
      addField('Público Objetivo', enBlanco ? '[ ] Niños  [ ] Jóvenes  [ ] Adultos  [ ] Familias  [ ] B2B' : formData.publicoObjetivo.join(', '));
      addField('Propuesta de Valor', formData.propuestaValor);
      addField('Razones para Confiar', formData.razonesConfiar);

      // Sección 4
      addHeader('4. Personalidad Visual y Estilo');
      addField('Imagen a Proyectar', formData.deseaProyectar);
      addField('Imagen a EVITAR', formData.noDeseaProyectar);
      addField('Colores Preferidos', formData.coloresPreferidos);
      addField('Colores a Evitar', formData.coloresEvitar);

      // Sección 5
      addHeader('5. Observaciones y Validación');
      addField('Observaciones', formData.observaciones);

      y += 8;
      if (y > 230) {
        doc.addPage();
        y = 20;
      }

      // Firmas
      doc.setDrawColor(200, 200, 200);
      doc.rect(15, y, 85, 30);
      doc.rect(110, y, 85, 30);

      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.text('CLIENTE / SOLICITANTE', 18, y + 5);
      doc.setFont('helvetica', 'normal');
      doc.text(`Nombre: ${enBlanco ? '' : formData.responsable}`, 18, y + 20);
      doc.text(`C.I. / NIT: ${enBlanco ? '' : (formData.ciPropietario || 'N/A')}`, 18, y + 25);

      doc.setFont('helvetica', 'bold');
      doc.text('DISEÑADOR / ASESOR DE MARCA', 113, y + 5);
      doc.setFont('helvetica', 'normal');
      doc.text(`Nombre: ${enBlanco ? '' : (formData.diseñadorNombre || 'Asesor Asignado')}`, 113, y + 20);
      doc.text(`Fecha: ${enBlanco ? '___/___/20___' : formData.fechaRegistro}`, 113, y + 25);

      const nombreArchivo = enBlanco ? 'Plantilla_Briefing_En_Blanco.pdf' : `Briefing_${formData.empresa.replace(/\s+/g, '_')}.pdf`;
      doc.save(nombreArchivo);
      
      setPdfGenerado(true);
      setTimeout(() => setPdfGenerado(false), 4000);
    } catch (err) {
      console.error(err);
      alert('Error al generar el PDF. Asegúrate de tener instalada la librería jspdf.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      {/* Encabezado Principal */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F4B44]/10 text-[#1F4B44] text-xs font-semibold uppercase tracking-wider mb-3">
          <FileText className="w-3.5 h-3.5" />
          <span>Formulario de Levantamiento de Marca</span>
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#241F1A] mb-3">
          Brief de Identidad Corporativa
        </h1>
        <p className="text-[#5B564E] text-sm sm:text-base leading-relaxed">
          Llena el formulario digitalmente o descarga una plantilla en blanco para realizar la entrevista de forma presencial[cite: 1].
        </p>
      </div>

      <div className="bg-white border border-[#241F1A]/10 rounded-3xl p-6 sm:p-10 shadow-sm space-y-10">
        
        {/* SECCIÓN 1 */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#241F1A]/10 text-[#1F4B44]">
            <Building2 className="w-5 h-5" />
            <h2 className="font-serif font-bold text-xl text-[#241F1A]">1. Datos de Identificación y Trayectoria</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">
                Nombre de la Empresa <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                className={`w-full p-2.5 rounded-xl border bg-[#FAF6EF] transition-all ${
                  errores.empresa ? 'border-red-500 ring-1 ring-red-500' : 'border-[#241F1A]/20'
                }`}
                placeholder="Ej. Mi Panadería"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">
                Nombre del Responsable <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="responsable"
                value={formData.responsable}
                onChange={handleChange}
                className={`w-full p-2.5 rounded-xl border bg-[#FAF6EF] transition-all ${
                  errores.responsable ? 'border-red-500 ring-1 ring-red-500' : 'border-[#241F1A]/20'
                }`}
                placeholder="Ej. Juan Pérez"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">Cargo</label>
              <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]" placeholder="Ej. Gerente General" />
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">Dirección / Zona</label>
              <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]" />
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">Ciudad</label>
              <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]" />
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">
                Teléfono / WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={`w-full p-2.5 rounded-xl border bg-[#FAF6EF] transition-all ${
                  errores.telefono ? 'border-red-500 ring-1 ring-red-500' : 'border-[#241F1A]/20'
                }`}
                placeholder="Ej. +591 70000000"
              />
            </div>
          </div>
        </div>

        {/* SECCIÓN 2 */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#241F1A]/10 text-[#1F4B44]">
            <Target className="w-5 h-5" />
            <h2 className="font-serif font-bold text-xl text-[#241F1A]">2. Filosofía y Estrategia de Marca</h2>
          </div>
          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">Actividad Principal y Beneficio Clave</label>
              <textarea name="actividadPrincipal" rows="2" value={formData.actividadPrincipal} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]" placeholder="¿Qué vende o qué servicio presta?"></textarea>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1 text-[#241F1A]">Propósito / Misión</label>
                <textarea name="propositoMision" rows="2" value={formData.propositoMision} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]"></textarea>
              </div>
              <div>
                <label className="block font-medium mb-1 text-[#241F1A]">Visión (A 3-5 Años)</label>
                <textarea name="vision" rows="2" value={formData.vision} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]"></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN 3 */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#241F1A]/10 text-[#1F4B44]">
            <HeartHandshake className="w-5 h-5" />
            <h2 className="font-serif font-bold text-xl text-[#241F1A]">3. Mercado y Público Objetivo</h2>
          </div>
          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-medium mb-2 text-[#241F1A]">
                Público Objetivo Principal <span className="text-xs font-normal text-[#9A9284]">(Selecciona máximo 3)</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {['Niños', 'Jóvenes', 'Adultos', 'Familias', 'Empresas (B2B)', 'Público General'].map((item) => (
                  <label key={item} className="inline-flex items-center gap-1.5 cursor-pointer bg-[#FAF6EF] px-3 py-1.5 rounded-lg border border-[#241F1A]/10 hover:border-[#1F4B44] transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.publicoObjetivo.includes(item)}
                      onChange={() => handleCheckboxChange('publicoObjetivo', item)}
                      className="accent-[#1F4B44]"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1 text-[#241F1A]">Propuesta de Valor (Diferenciador)</label>
                <textarea name="propuestaValor" rows="2" value={formData.propuestaValor} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]"></textarea>
              </div>
              <div>
                <label className="block font-medium mb-1 text-[#241F1A]">Razones para Confiar (Pruebas)</label>
                <textarea name="razonesConfiar" rows="2" value={formData.razonesConfiar} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]"></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN 4 */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#241F1A]/10 text-[#1F4B44]">
            <Eye className="w-5 h-5" />
            <h2 className="font-serif font-bold text-xl text-[#241F1A]">4. Personalidad Visual y Preferencias</h2>
          </div>
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1 text-[#241F1A]">Imagen que Desea Proyectar</label>
                <input type="text" name="deseaProyectar" value={formData.deseaProyectar} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]" placeholder="Ej. Confianza, Calidad, Elegancia" />
              </div>
              <div>
                <label className="block font-medium mb-1 text-[#241F1A]">Imagen que NO Desea Proyectar</label>
                <input type="text" name="noDeseaProyectar" value={formData.noDeseaProyectar} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]" placeholder="Ej. Informal, Sobrecargado" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1 text-[#241F1A]">Colores Preferidos</label>
                <input type="text" name="coloresPreferidos" value={formData.coloresPreferidos} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]" placeholder="Ej. Azul marino, verde pino" />
              </div>
              <div>
                <label className="block font-medium mb-1 text-[#241F1A]">Colores a Evitar</label>
                <input type="text" name="coloresEvitar" value={formData.coloresEvitar} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]" placeholder="Ej. Amarillo fluorescente" />
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN 5 */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#241F1A]/10 text-[#1F4B44]">
            <ShieldCheck className="w-5 h-5" />
            <h2 className="font-serif font-bold text-xl text-[#241F1A]">5. Validación y Cierre de Encargo</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">C.I. / NIT del Cliente</label>
              <input type="text" name="ciPropietario" value={formData.ciPropietario} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]" placeholder="Ej. 1234567 Scz" />
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">Nombre del Diseñador / Asesor</label>
              <input type="text" name="diseñadorNombre" value={formData.diseñadorNombre} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]" placeholder="Opcional" />
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">Fecha de Registro</label>
              <input type="date" name="fechaRegistro" value={formData.fechaRegistro} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]" />
            </div>
          </div>
        </div>

        {/* ALERTA DE ERRORES */}
        {Object.keys(errores).length > 0 && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Por favor completa los campos requeridos señalados en rojo (*).</span>
          </div>
        )}

        {/* ACCIONES DE DESCARGA */}
        <div className="pt-6 border-t border-[#241F1A]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Botón 1: Descargar Plantilla en Blanco */}
          <button
            onClick={() => exportarPDF(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#1F4B44] text-[#1F4B44] font-semibold text-xs sm:text-sm hover:bg-[#1F4B44]/5 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Plantilla en Blanco (PDF)</span>
          </button>

          {/* Botón 2: Descargar Formulario Llenado */}
          <button
            onClick={() => exportarPDF(false)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#1F4B44] text-white font-semibold text-xs sm:text-sm hover:bg-[#183934] transition-all shadow-md cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Briefing Llenado</span>
          </button>

        </div>

        {pdfGenerado && (
          <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs sm:text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
            <span>¡Documento PDF generado exitosamente!</span>
          </div>
        )}

      </div>
    </div>
  );
}