import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, BorderStyle, WidthType, AlignmentType, ShadingType, Header, Footer } from "docx";
import { FileText, Download, CheckCircle, Building2, Target, HeartHandshake, Eye, ShieldCheck, AlertCircle, Printer, X } from 'lucide-react';

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
    nombreActual: '',
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
  const [modalDescarga, setModalDescarga] = useState({ isOpen: false, enBlanco: false });
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

  // Manejador de checkboxes con límite de selección
  const handleCheckboxChange = (category, value, limit = 3) => {
    setFormData((prev) => {
      const currentList = prev[category] || [];
      if (currentList.includes(value)) {
        return { ...prev, [category]: currentList.filter((item) => item !== value) };
      }
      if (limit > 0 && currentList.length >= limit) {
        alert(`Puedes seleccionar un máximo de ${limit} opciones.`);
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

  const exportarPDF = (enBlanco = false) => {
    if (!enBlanco && !validarFormulario()) {
      alert('Por favor completa los campos requeridos (Empresa, Responsable y Teléfono) antes de descargar.');
      return;
    }

    try {
      const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let y = 15;
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;

      // COLORES
      const primaryColor = [26, 54, 93]; // Azul oscuro
      const accentColor = [218, 165, 32]; // Dorado/Mostaza
      const lightBg = [242, 246, 250]; // Fondo celdas tabla (Gris/Celeste)
      const lineColor = [180, 190, 200]; 
      const textColor = [50, 50, 50];
      const grayText = [100, 100, 100];

      const checkPageBreak = (neededHeight) => {
        if (y + neededHeight > pageHeight - 20) {
          doc.addPage();
          y = 15;
        }
      };

      // Header principal (solo pág 1)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...primaryColor);
      doc.text('TRABAJO FINAL | DISEÑO GRÁFICO', pageWidth - margin, y, { align: 'right' });
      
      y += 12;
      doc.setFontSize(16);
      doc.text('BRIEF PARA LA CREACIÓN DE', pageWidth / 2, y, { align: 'center' });
      
      y += 7;
      doc.setFontSize(22);
      doc.setTextColor(...accentColor);
      doc.text('IDENTIDAD CORPORATIVA', pageWidth / 2, y, { align: 'center' });
      
      y += 7;
      doc.setFontSize(9);
      doc.setTextColor(...primaryColor);
      doc.text('Entrevista a microempresarios | Base para el Manual de Identidad Corporativa', pageWidth / 2, y, { align: 'center' });

      y += 10;

      // DATOS DE IDENTIFICACIÓN
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...primaryColor);
      doc.text('DATOS DE IDENTIFICACIÓN', margin, y);
      y += 3;

      // TABLA MANUAL
      const drawRow = (label1, value1, label2, value2) => {
        checkPageBreak(12);
        const rowHeight = 9;
        const col1W = 35;
        const col2W = (contentWidth / 2) - col1W;
        const col3W = 35;
        const col4W = (contentWidth / 2) - col3W;
        
        doc.setFillColor(...lightBg);
        doc.rect(margin, y, col1W, rowHeight, 'F');
        doc.rect(margin + col1W + col2W, y, col3W, rowHeight, 'F');

        doc.setDrawColor(...lineColor);
        doc.rect(margin, y, contentWidth, rowHeight);
        doc.line(margin + col1W, y, margin + col1W, y + rowHeight);
        doc.line(margin + col1W + col2W, y, margin + col1W + col2W, y + rowHeight);
        doc.line(margin + col1W + col2W + col3W, y, margin + col1W + col2W + col3W, y + rowHeight);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...primaryColor);
        
        const splitLabel1 = doc.splitTextToSize(label1, col1W - 2);
        doc.text(splitLabel1, margin + 2, y + (rowHeight/2) - ((splitLabel1.length-1)*1.5) + 1.2, { baseline: 'middle' });
        
        const splitLabel2 = doc.splitTextToSize(label2, col3W - 2);
        doc.text(splitLabel2, margin + col1W + col2W + 2, y + (rowHeight/2) - ((splitLabel2.length-1)*1.5) + 1.2, { baseline: 'middle' });

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...textColor);
        const val1 = enBlanco ? '' : (value1 || '');
        const val2 = enBlanco ? '' : (value2 || '');
        
        const splitVal1 = doc.splitTextToSize(val1, col2W - 2);
        doc.text(splitVal1, margin + col1W + 2, y + (rowHeight/2) - ((splitVal1.length-1)*1.5) + 1.2, { baseline: 'middle' });
        
        const splitVal2 = doc.splitTextToSize(val2, col4W - 2);
        doc.text(splitVal2, margin + col1W + col2W + col3W + 2, y + (rowHeight/2) - ((splitVal2.length-1)*1.5) + 1.2, { baseline: 'middle' });

        y += rowHeight;
      };

      drawRow('Nombre de la\nempresa:', formData.empresa, 'Rubro o actividad:', formData.rubro);
      drawRow('Nombre del\nresponsable:', formData.responsable, 'Cargo:', formData.cargo);
      drawRow('Dirección:', formData.direccion, 'Zona / ciudad:', formData.ciudad);
      drawRow('Teléfono /\nWhatsApp:', formData.telefono, 'Redes sociales:', formData.redes);
      drawRow('Años de actividad:', formData.antiguedad, 'Fecha de\nentrevista:', formData.fechaRegistro);
      drawRow('Estudiante(s):', formData.diseñadorNombre, 'Materia / curso:', '');
      
      y += 6;

      const drawSection = (number, title, instruction, textValue, forcedLines = 3) => {
        checkPageBreak(30);
        
        // Header
        doc.setFillColor(...primaryColor);
        doc.rect(margin, y, contentWidth, 7, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text(`${number}. ${title}`, margin + 3, y + 5);
        
        y += 7;
        
        // Body
        const boxStartY = y;
        doc.setFillColor(252, 252, 253);
        
        y += 5;
        doc.setTextColor(...grayText);
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        const splitInstruction = doc.splitTextToSize(instruction, contentWidth - 6);
        doc.text(splitInstruction, margin + 3, y);
        
        y += splitInstruction.length * 4.5 + 2;
        
        doc.setTextColor(...textColor);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        if (enBlanco && textValue === null) {
          doc.setDrawColor(200, 200, 200);
          for(let i=0; i<forcedLines; i++) {
            doc.line(margin + 3, y, margin + contentWidth - 3, y);
            y += 7;
          }
        } else {
          const content = textValue || '';
          const splitContent = doc.splitTextToSize(content, contentWidth - 6);
          doc.text(splitContent, margin + 3, y);
          y += Math.max(enBlanco ? 0 : forcedLines * 7, splitContent.length * 5 + 5);
        }

        const boxHeight = y - boxStartY + 2;
        doc.setDrawColor(...lineColor);
        doc.rect(margin, boxStartY, contentWidth, boxHeight, 'S');
        y += 6;
      };

      drawSection('1', 'Actividad principal, productos y servicios', 
      '¿Qué vende o qué servicio presta la empresa? Describa su producto o servicio principal, los secundarios y el beneficio más importante para sus clientes.', 
      enBlanco ? null : formData.actividadPrincipal, 3);

      drawSection('2', 'Historia y características de la microempresa', 
      '¿Cómo nació la empresa y cuáles son sus características actuales? Considere antigüedad, tamaño, cantidad de personas, especialidad, ubicación y momentos importantes de su historia.', 
      enBlanco ? null : formData.historia, 3);

      drawSection('3', 'Filosofía de la marca (forma de pensar y trabajar), propósito y misión', 
      '¿Por qué existe la empresa y qué ideas o principios orientan su forma de trabajar? Explique qué hace, para quién lo hace, qué necesidad busca resolver y qué aporte desea brindar a sus clientes o a la comunidad.', 
      enBlanco ? null : formData.propositoMision, 3);

      drawSection('4', 'Visión', 
      '¿Cómo le gustaría que la empresa sea reconocida en los próximos tres a cinco años? Mencione metas de crecimiento, posicionamiento o expansión.', 
      enBlanco ? null : formData.vision, 3);

      const valoresVal = enBlanco 
        ? '[ ] Calidad  [ ] Responsabilidad  [ ] Honestidad  [ ] Cercanía  [ ] Innovación  [ ] Tradición  [ ] Rapidez  [ ] Confianza\n[ ] Servicio  [ ] Otro: __________________\n\n___________________________________________________________________________________________________\n___________________________________________________________________________________________________'
        : `Valores seleccionados: ${formData.valores.join(', ')}\n\n${formData.valoresExplicacion}`;
      drawSection('5', 'Valores de la empresa', 
      'Seleccione los valores que mejor representan la forma de trabajar de la empresa y explique los tres más importantes.', 
      valoresVal, 4);

      const publicoVal = enBlanco 
        ? '[ ] Niños  [ ] Jóvenes  [ ] Adultos  [ ] Familias  [ ] Empresas  [ ] Público general  [ ] Otro: ___________________\n\n___________________________________________________________________________________________________\n___________________________________________________________________________________________________'
        : `Públicos seleccionados: ${formData.publicoObjetivo.join(', ')}\n\n${formData.publicoDetalle}`;
      drawSection('6', 'Público objetivo', 
      '¿Quiénes son sus clientes principales? Describa edad aproximada, ubicación, ocupación o nivel económico, necesidades, gustos y razones por las que compran.', 
      publicoVal, 4);

      drawSection('7', 'Propuesta de valor y ventaja competitiva', 
      '¿Qué hace diferente a la empresa frente a sus competidores? Puede ser su calidad, precio, tamaño, antigüedad, especialidad, atención, rapidez, ser pionera, ubicación estratégica, personalización u otra fortaleza.', 
      enBlanco ? null : formData.propuestaValor, 4);

      drawSection('8', 'Razones para confiar (Reason to Believe)', 
      '¿Qué pruebas o hechos demuestran que la empresa puede cumplir lo que promete? Considere experiencia, testimonios, calidad de materiales, procesos, garantías, proveedores, reconocimientos, resultados o clientes frecuentes.', 
      enBlanco ? null : formData.razonesConfiar, 4);

      const personalidadVal = enBlanco 
        ? '[ ] Alegre  [ ] Seria  [ ] Formal  [ ] Cercana  [ ] Moderna  [ ] Tradicional  [ ] Elegante  [ ] Juvenil  [ ] Confiable\n[ ] Innovadora  [ ] Artesanal  [ ] Otra: ____________________\nTres palabras: ______________________  ______________________  ______________________\n\n___________________________________________________________________________________________________'
        : `Personalidad: ${formData.personalidad.join(', ')}\nTres palabras: ${formData.tresPalabras}`;
      drawSection('9', 'Personalidad y tono de comunicación', 
      'Marque cómo debería expresarse la marca y escriba tres palabras que definan su personalidad.', 
      personalidadVal, 4);

      const imagenVal = enBlanco
        ? 'Desea proyectar: ____________________________________________________________________________________\n\nNo desea proyectar: __________________________________________________________________________________\n\n___________________________________________________________________________________________________'
        : `Desea proyectar: ${formData.deseaProyectar}\n\nNo desea proyectar: ${formData.noDeseaProyectar}`;
      drawSection('10', 'Imagen que desea proyectar', 
      '¿Qué quiere que las personas piensen o sientan al ver la marca? Indique también qué imagen, percepción o característica no desea proyectar.', 
      imagenVal, 4);

      const nombreVal = enBlanco
        ? 'Nombre actual o tentativo: _________________________________________________________________________\nSignificado / motivo: _______________________________________________________________________________\nEslogan tentativo: __________________________________________________________________________________\n\n___________________________________________________________________________________________________'
        : `Nombre: ${formData.nombreActual}\nSignificado: ${formData.nombreSignificado}\nEslogan: ${formData.eslogan}`;
      drawSection('11', 'Nombre y frase de marca', 
      '¿La empresa ya tiene un nombre definido? Explique su significado. Si todavía no lo tiene, registre nombres tentativos. Añada una frase, promesa o eslogan provisional si corresponde.', 
      nombreVal, 5);

      const prefVal = enBlanco
        ? '[ ] Letrero  [ ] Redes sociales  [ ] Empaque  [ ] Uniforme  [ ] Papelería  [ ] Vehículo  [ ] Página web  [ ] Otro:\n___________________________\nColores preferidos: ____________________________________ Colores que desea evitar: ______________________\n\nSímbolos, referencias o ideas visuales: _________________________________________________________________\n___________________________________________________________________________________________________'
        : `Aplicaciones: ${formData.aplicaciones.join(', ')}\n\nColores preferidos: ${formData.coloresPreferidos}\nColores a evitar: ${formData.coloresEvitar}\n\nSímbolos / ideas: ${formData.ideasVisuales}`;
      drawSection('12', 'Preferencias visuales y aplicaciones necesarias', 
      '¿Qué colores, símbolos, formas o estilos le gustan? ¿Qué elementos desea evitar? Indique dónde se utilizará principalmente la identidad visual.', 
      prefVal, 6);

      // OBSERVACIONES ADICIONALES
      checkPageBreak(30);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...primaryColor);
      doc.text('OBSERVACIONES ADICIONALES', margin, y);
      y += 3;
      
      const obsStartY = y;
      if (enBlanco) {
        doc.setDrawColor(...lineColor);
        doc.rect(margin, y, contentWidth, 25, 'S');
        doc.setDrawColor(200, 200, 200);
        for(let i=0; i<3; i++) {
          doc.line(margin + 3, y + 8 + (i*6), margin + contentWidth - 3, y + 8 + (i*6));
        }
        y += 30;
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(...textColor);
        const splitObs = doc.splitTextToSize(formData.observaciones || '', contentWidth - 6);
        doc.text(splitObs, margin + 3, y + 5);
        const obsHeight = Math.max(25, splitObs.length * 5 + 10);
        doc.setDrawColor(...lineColor);
        doc.rect(margin, obsStartY, contentWidth, obsHeight, 'S');
        y += obsHeight + 5;
      }

      // AUTORIZACIÓN Y CONSTANCIA
      checkPageBreak(55);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...primaryColor);
      doc.text('AUTORIZACIÓN Y CONSTANCIA DE ENTREVISTA', margin, y);
      y += 3;

      doc.setFillColor(253, 249, 238);
      doc.setDrawColor(...accentColor);
      doc.rect(margin, y, contentWidth, 16, 'FD');
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...textColor);
      const autText = 'Declaro que la información registrada en este brief fue proporcionada durante la entrevista y autorizo su uso únicamente con fines académicos para el desarrollo de una propuesta de identidad corporativa. La firma de este documento no implica obligación de pago, contratación ni cesión comercial de la marca.';
      const splitAut = doc.splitTextToSize(autText, contentWidth - 6);
      doc.text(splitAut, margin + 3, y + 4.5);
      
      y += 30;

      const sigWidth = 75;
      doc.setDrawColor(...lineColor);
      
      doc.line(margin + 5, y, margin + 5 + sigWidth, y);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...primaryColor);
      doc.text('Firma del propietario o responsable', margin + 5 + (sigWidth/2), y + 4, { align: 'center' });
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...textColor);
      doc.text(`Nombre completo: ${enBlanco ? '' : formData.responsable}`, margin + 5, y + 10);
      doc.text(`C.I.: ${enBlanco ? '' : formData.ciPropietario}`, margin + 5, y + 16);
      doc.text(`Fecha: ${enBlanco ? '' : formData.fechaRegistro}`, margin + 5 + 40, y + 16);

      const rightSigX = pageWidth - margin - sigWidth - 5;
      doc.line(rightSigX, y, rightSigX + sigWidth, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...primaryColor);
      doc.text('Firma del estudiante responsable', rightSigX + (sigWidth/2), y + 4, { align: 'center' });
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...textColor);
      doc.text(`Nombre completo: ${enBlanco ? '' : formData.diseñadorNombre}`, rightSigX, y + 10);
      doc.text(`Fecha: ${enBlanco ? '' : formData.fechaRegistro}`, rightSigX, y + 16);
      doc.text('Curso:', rightSigX + 45, y + 16);

      y += 22;

      doc.setDrawColor(...primaryColor);
      doc.setLineDashPattern([2, 2], 0);
      doc.rect(margin, y, contentWidth, 25, 'S');
      doc.setLineDashPattern([], 0);
      
      doc.setFont('helvetica', 'bolditalic');
      doc.setFontSize(9);
      doc.setTextColor(150, 160, 180);
      doc.text('ESPACIO PARA SELLO DE LA MICROEMPRESA', pageWidth/2, y + 13, { align: 'center' });

      // Numeración
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setTextColor(130, 130, 130);
        doc.setFont('helvetica', 'normal');
        doc.text('Brief de identidad corporativa para microempresas · Documento de uso académico', pageWidth / 2, pageHeight - 8, { align: 'center' });
      }

      const nombreArchivo = enBlanco ? 'Plantilla_Briefing_En_Blanco.pdf' : `Briefing_${formData.empresa.replace(/\s+/g, '_') || 'Nuevo'}.pdf`;
      doc.save(nombreArchivo);
      
      setPdfGenerado(true);
      setTimeout(() => setPdfGenerado(false), 4000);
    } catch (err) {
      console.error(err);
      alert('Error al generar el PDF. Asegúrate de tener instalada la librería jspdf.');
    }
  };

  const exportarWord = async (enBlanco = false) => {
    if (!enBlanco && !validarFormulario()) {
      alert('Por favor completa los campos requeridos (Empresa, Responsable y Teléfono) antes de descargar.');
      return;
    }

    try {
      const primaryColor = "1A365D";
      const accentColor = "DAA520";
      
      const createSection = (number, title, instruction, textValue, forcedLines = 3) => {
        const sectionHeader = new Paragraph({
          children: [
            new TextRun({ text: `${number}. ${title}`, color: "FFFFFF", bold: true, size: 20 })
          ],
          shading: { type: ShadingType.CLEAR, color: "auto", fill: primaryColor },
          spacing: { before: 240, after: 120 }
        });

        const instructionPara = new Paragraph({
          children: [
            new TextRun({ text: instruction, color: "666666", italics: true, size: 18 })
          ],
          spacing: { before: 120, after: 120 }
        });

        const contentParas = [];
        if (enBlanco && !textValue) {
          for (let i = 0; i < forcedLines; i++) {
            contentParas.push(new Paragraph({
              children: [new TextRun({ text: "___________________________________________________________________________________________________", color: "CCCCCC" })],
              spacing: { before: 120, after: 120 }
            }));
          }
        } else {
          const content = textValue || '';
          const lines = content.split('\n');
          for (const line of lines) {
            contentParas.push(new Paragraph({
              children: [new TextRun({ text: line, color: "333333", size: 20 })],
              spacing: { before: 60, after: 60 }
            }));
          }
        }

        return [sectionHeader, instructionPara, ...contentParas];
      };

      const tableRow = (l1, v1, l2, v2) => {
        return new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: l1, bold: true, size: 16, color: primaryColor })] })],
              width: { size: 20, type: WidthType.PERCENTAGE },
              shading: { fill: "F2F6FA" }
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: enBlanco ? '' : (v1 || ''), size: 16, color: "333333" })] })],
              width: { size: 30, type: WidthType.PERCENTAGE }
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: l2, bold: true, size: 16, color: primaryColor })] })],
              width: { size: 20, type: WidthType.PERCENTAGE },
              shading: { fill: "F2F6FA" }
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: enBlanco ? '' : (v2 || ''), size: 16, color: "333333" })] })],
              width: { size: 30, type: WidthType.PERCENTAGE }
            }),
          ]
        });
      };

      const doc = new Document({
        sections: [{
          properties: {},
          headers: {
            default: new Header({
              children: [
                new Paragraph({
                  children: [new TextRun({ text: "TRABAJO FINAL | DISEÑO GRÁFICO", bold: true, color: primaryColor, size: 18 })],
                  alignment: AlignmentType.RIGHT
                })
              ]
            })
          },
          footers: {
            default: new Footer({
              children: [
                new Paragraph({
                  children: [new TextRun({ text: "Brief de identidad corporativa para microempresas · Documento de uso académico", color: "888888", size: 14 })],
                  alignment: AlignmentType.CENTER
                })
              ]
            })
          },
          children: [
            new Paragraph({
              children: [new TextRun({ text: "BRIEF PARA LA CREACIÓN DE", size: 32, color: "333333" })],
              alignment: AlignmentType.CENTER,
              spacing: { before: 240 }
            }),
            new Paragraph({
              children: [new TextRun({ text: "IDENTIDAD CORPORATIVA", size: 44, color: accentColor, bold: true })],
              alignment: AlignmentType.CENTER,
              spacing: { after: 120 }
            }),
            new Paragraph({
              children: [new TextRun({ text: "Entrevista a microempresarios | Base para el Manual de Identidad Corporativa", size: 18, color: primaryColor })],
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 }
            }),
            new Paragraph({
              children: [new TextRun({ text: "DATOS DE IDENTIFICACIÓN", bold: true, size: 22, color: primaryColor })],
              spacing: { after: 120 }
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                tableRow("Nombre de la empresa:", formData.empresa, "Rubro o actividad:", formData.rubro),
                tableRow("Nombre del responsable:", formData.responsable, "Cargo:", formData.cargo),
                tableRow("Dirección:", formData.direccion, "Zona / ciudad:", formData.ciudad),
                tableRow("Teléfono / WhatsApp:", formData.telefono, "Redes sociales:", formData.redes),
                tableRow("Años de actividad:", formData.antiguedad, "Fecha de entrevista:", formData.fechaRegistro),
                tableRow("Estudiante(s):", formData.diseñadorNombre, "Materia / curso:", ""),
              ]
            }),
            
            ...createSection('1', 'Actividad principal, productos y servicios', 
              '¿Qué vende o qué servicio presta la empresa? Describa su producto o servicio principal, los secundarios y el beneficio más importante para sus clientes.', 
              enBlanco ? null : formData.actividadPrincipal, 3),

            ...createSection('2', 'Historia y características de la microempresa', 
              '¿Cómo nació la empresa y cuáles son sus características actuales? Considere antigüedad, tamaño, cantidad de personas, especialidad, ubicación y momentos importantes de su historia.', 
              enBlanco ? null : formData.historia, 3),

            ...createSection('3', 'Filosofía de la marca (forma de pensar y trabajar), propósito y misión', 
              '¿Por qué existe la empresa y qué ideas o principios orientan su forma de trabajar? Explique qué hace, para quién lo hace, qué necesidad busca resolver y qué aporte desea brindar a sus clientes o a la comunidad.', 
              enBlanco ? null : formData.propositoMision, 3),

            ...createSection('4', 'Visión', 
              '¿Cómo le gustaría que la empresa sea reconocida en los próximos tres a cinco años? Mencione metas de crecimiento, posicionamiento o expansión.', 
              enBlanco ? null : formData.vision, 3),

            ...createSection('5', 'Valores de la empresa', 
              'Seleccione los valores que mejor representan la forma de trabajar de la empresa y explique los tres más importantes.', 
              enBlanco ? '[ ] Calidad  [ ] Responsabilidad  [ ] Honestidad  [ ] Cercanía  [ ] Innovación  [ ] Tradición  [ ] Rapidez  [ ] Confianza\n[ ] Servicio  [ ] Otro: __________________\n\n___________________________________________________________________________________________________\n___________________________________________________________________________________________________' : `Valores seleccionados: ${formData.valores.join(', ')}\n\n${formData.valoresExplicacion}`, 4),

            ...createSection('6', 'Público objetivo', 
              '¿Quiénes son sus clientes principales? Describa edad aproximada, ubicación, ocupación o nivel económico, necesidades, gustos y razones por las que compran.', 
              enBlanco ? '[ ] Niños  [ ] Jóvenes  [ ] Adultos  [ ] Familias  [ ] Empresas  [ ] Público general  [ ] Otro: ___________________\n\n___________________________________________________________________________________________________\n___________________________________________________________________________________________________' : `Públicos seleccionados: ${formData.publicoObjetivo.join(', ')}\n\n${formData.publicoDetalle}`, 4),

            ...createSection('7', 'Propuesta de valor y ventaja competitiva', 
              '¿Qué hace diferente a la empresa frente a sus competidores? Puede ser su calidad, precio, tamaño, antigüedad, especialidad, atención, rapidez, ser pionera, ubicación estratégica, personalización u otra fortaleza.', 
              enBlanco ? null : formData.propuestaValor, 4),

            ...createSection('8', 'Razones para confiar (Reason to Believe)', 
              '¿Qué pruebas o hechos demuestran que la empresa puede cumplir lo que promete? Considere experiencia, testimonios, calidad de materiales, procesos, garantías, proveedores, reconocimientos, resultados o clientes frecuentes.', 
              enBlanco ? null : formData.razonesConfiar, 4),

            ...createSection('9', 'Personalidad y tono de comunicación', 
              'Marque cómo debería expresarse la marca y escriba tres palabras que definan su personalidad.', 
              enBlanco ? '[ ] Alegre  [ ] Seria  [ ] Formal  [ ] Cercana  [ ] Moderna  [ ] Tradicional  [ ] Elegante  [ ] Juvenil  [ ] Confiable\n[ ] Innovadora  [ ] Artesanal  [ ] Otra: ____________________\nTres palabras: ______________________  ______________________  ______________________\n\n___________________________________________________________________________________________________' : `Personalidad: ${formData.personalidad.join(', ')}\nTres palabras: ${formData.tresPalabras}`, 4),

            ...createSection('10', 'Imagen que desea proyectar', 
              '¿Qué quiere que las personas piensen o sientan al ver la marca? Indique también qué imagen, percepción o característica no desea proyectar.', 
              enBlanco ? 'Desea proyectar: ____________________________________________________________________________________\n\nNo desea proyectar: __________________________________________________________________________________\n\n___________________________________________________________________________________________________' : `Desea proyectar: ${formData.deseaProyectar}\n\nNo desea proyectar: ${formData.noDeseaProyectar}`, 4),

            ...createSection('11', 'Nombre y frase de marca', 
              '¿La empresa ya tiene un nombre definido? Explique su significado. Si todavía no lo tiene, registre nombres tentativos. Añada una frase, promesa o eslogan provisional si corresponde.', 
              enBlanco ? 'Nombre actual o tentativo: _________________________________________________________________________\nSignificado / motivo: _______________________________________________________________________________\nEslogan tentativo: __________________________________________________________________________________\n\n___________________________________________________________________________________________________' : `Nombre: ${formData.nombreActual}\nSignificado: ${formData.nombreSignificado}\nEslogan: ${formData.eslogan}`, 5),

            ...createSection('12', 'Preferencias visuales y aplicaciones necesarias', 
              '¿Qué colores, símbolos, formas o estilos le gustan? ¿Qué elementos desea evitar? Indique dónde se utilizará principalmente la identidad visual.', 
              enBlanco ? '[ ] Letrero  [ ] Redes sociales  [ ] Empaque  [ ] Uniforme  [ ] Papelería  [ ] Vehículo  [ ] Página web  [ ] Otro:\n___________________________\nColores preferidos: ____________________________________ Colores que desea evitar: ______________________\n\nSímbolos, referencias o ideas visuales: _________________________________________________________________\n___________________________________________________________________________________________________' : `Aplicaciones: ${formData.aplicaciones.join(', ')}\n\nColores preferidos: ${formData.coloresPreferidos}\nColores a evitar: ${formData.coloresEvitar}\n\nSímbolos / ideas: ${formData.ideasVisuales}`, 6),

            new Paragraph({
              children: [new TextRun({ text: "OBSERVACIONES ADICIONALES", bold: true, size: 22, color: primaryColor })],
              spacing: { before: 400, after: 120 }
            }),
            ...(enBlanco && !formData.observaciones ? 
              [new Paragraph({ children: [new TextRun({ text: "___________________________________________________________________________________________________", color: "CCCCCC" })] })] 
              : formData.observaciones.split('\n').map(line => new Paragraph({ children: [new TextRun({ text: line, color: "333333", size: 20 })] }))
            ),

            new Paragraph({
              children: [new TextRun({ text: "AUTORIZACIÓN Y CONSTANCIA DE ENTREVISTA", bold: true, size: 22, color: primaryColor })],
              spacing: { before: 400, after: 120 }
            }),
            new Paragraph({
              children: [new TextRun({ text: "Declaro que la información registrada en este brief fue proporcionada durante la entrevista y autorizo su uso únicamente con fines académicos para el desarrollo de una propuesta de identidad corporativa. La firma de este documento no implica obligación de pago, contratación ni cesión comercial de la marca.", size: 16 })],
              shading: { type: ShadingType.CLEAR, color: "auto", fill: "FDF9EE" },
              spacing: { before: 120, after: 400 }
            }),

            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({ children: [new TextRun({ text: "________________________________________" })], alignment: AlignmentType.CENTER }),
                        new Paragraph({ children: [new TextRun({ text: "Firma del propietario o responsable", bold: true, size: 16, color: primaryColor })], alignment: AlignmentType.CENTER }),
                        new Paragraph({ children: [new TextRun({ text: `Nombre completo: ${enBlanco ? '_________________________________________' : formData.responsable}`, size: 16 })], spacing: { before: 120 } }),
                        new Paragraph({ children: [new TextRun({ text: `C.I.: ${enBlanco ? '_______________________' : formData.ciPropietario}      Fecha: ${enBlanco ? '_______________' : formData.fechaRegistro}`, size: 16 })] }),
                      ],
                      width: { size: 50, type: WidthType.PERCENTAGE },
                      borders: { top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" } }
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({ children: [new TextRun({ text: "________________________________________" })], alignment: AlignmentType.CENTER }),
                        new Paragraph({ children: [new TextRun({ text: "Firma del estudiante responsable", bold: true, size: 16, color: primaryColor })], alignment: AlignmentType.CENTER }),
                        new Paragraph({ children: [new TextRun({ text: `Nombre completo: ${enBlanco ? '_________________________________________' : formData.diseñadorNombre}`, size: 16 })], spacing: { before: 120 } }),
                        new Paragraph({ children: [new TextRun({ text: `Fecha: ${enBlanco ? '_______________________' : formData.fechaRegistro}      Curso: ${enBlanco ? '_______________' : ''}`, size: 16 })] }),
                      ],
                      width: { size: 50, type: WidthType.PERCENTAGE },
                      borders: { top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" } }
                    })
                  ]
                })
              ]
            })
          ]
        }]
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = enBlanco ? 'Plantilla_Briefing_En_Blanco.docx' : `Briefing_${formData.empresa.replace(/\s+/g, '_') || 'Nuevo'}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setPdfGenerado(true); // Reusamos el estado para mensaje de exito
      setTimeout(() => setPdfGenerado(false), 4000);
    } catch (err) {
      console.error(err);
      alert('Error al generar el documento de Word.');
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
          Llena el formulario digitalmente o descarga una plantilla en blanco para realizar la entrevista de forma presencial.
        </p>
      </div>

      <div className="bg-white border border-[#241F1A]/10 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        
        {/* DATOS DE IDENTIFICACIÓN */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#241F1A]/10 text-[#1F4B44]">
            <Building2 className="w-5 h-5" />
            <h2 className="font-serif font-bold text-xl text-[#241F1A]">DATOS DE IDENTIFICACIÓN</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">Nombre de la empresa <span className="text-red-500">*</span></label>
              <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} className={`w-full p-2.5 rounded-xl border bg-[#FAF6EF] transition-all ${errores.empresa ? 'border-red-500 ring-1 ring-red-500' : 'border-[#241F1A]/20'}`} />
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">Rubro o actividad</label>
              <input type="text" name="rubro" value={formData.rubro} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]" />
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">Nombre del responsable <span className="text-red-500">*</span></label>
              <input type="text" name="responsable" value={formData.responsable} onChange={handleChange} className={`w-full p-2.5 rounded-xl border bg-[#FAF6EF] transition-all ${errores.responsable ? 'border-red-500 ring-1 ring-red-500' : 'border-[#241F1A]/20'}`} />
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">Cargo</label>
              <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]" />
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">Dirección</label>
              <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]" />
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">Zona / ciudad</label>
              <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]" />
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">Teléfono / WhatsApp <span className="text-red-500">*</span></label>
              <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} className={`w-full p-2.5 rounded-xl border bg-[#FAF6EF] transition-all ${errores.telefono ? 'border-red-500 ring-1 ring-red-500' : 'border-[#241F1A]/20'}`} />
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">Redes sociales</label>
              <input type="text" name="redes" value={formData.redes} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]" />
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">Años de actividad</label>
              <input type="text" name="antiguedad" value={formData.antiguedad} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]" />
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">Fecha de entrevista</label>
              <input type="date" name="fechaRegistro" value={formData.fechaRegistro} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]" />
            </div>
            <div>
              <label className="block font-medium mb-1 text-[#241F1A]">Estudiante(s)</label>
              <input type="text" name="diseñadorNombre" value={formData.diseñadorNombre} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]" />
            </div>
          </div>
        </div>

        {/* 1. Actividad */}
        <div className="bg-[#1F4B44]/5 p-5 rounded-2xl border border-[#1F4B44]/10">
          <div className="bg-[#1F4B44] text-white px-3 py-1.5 inline-block rounded-lg mb-3">
            <h3 className="font-semibold text-sm">1. Actividad principal, productos y servicios</h3>
          </div>
          <p className="text-sm text-[#5B564E] mb-3 italic">¿Qué vende o qué servicio presta la empresa? Describa su producto o servicio principal, los secundarios y el beneficio más importante para sus clientes.</p>
          <textarea name="actividadPrincipal" rows="3" value={formData.actividadPrincipal} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-white"></textarea>
        </div>

        {/* 2. Historia */}
        <div className="bg-[#1F4B44]/5 p-5 rounded-2xl border border-[#1F4B44]/10">
          <div className="bg-[#1F4B44] text-white px-3 py-1.5 inline-block rounded-lg mb-3">
            <h3 className="font-semibold text-sm">2. Historia y características de la microempresa</h3>
          </div>
          <p className="text-sm text-[#5B564E] mb-3 italic">¿Cómo nació la empresa y cuáles son sus características actuales? Considere antigüedad, tamaño, cantidad de personas, especialidad, ubicación y momentos importantes de su historia.</p>
          <textarea name="historia" rows="3" value={formData.historia} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-white"></textarea>
        </div>

        {/* 3. Filosofía */}
        <div className="bg-[#1F4B44]/5 p-5 rounded-2xl border border-[#1F4B44]/10">
          <div className="bg-[#1F4B44] text-white px-3 py-1.5 inline-block rounded-lg mb-3">
            <h3 className="font-semibold text-sm">3. Filosofía de la marca (forma de pensar y trabajar), propósito y misión</h3>
          </div>
          <p className="text-sm text-[#5B564E] mb-3 italic">¿Por qué existe la empresa y qué ideas o principios orientan su forma de trabajar? Explique qué hace, para quién lo hace, qué necesidad busca resolver y qué aporte desea brindar a sus clientes o a la comunidad.</p>
          <textarea name="propositoMision" rows="3" value={formData.propositoMision} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-white"></textarea>
        </div>

        {/* 4. Visión */}
        <div className="bg-[#1F4B44]/5 p-5 rounded-2xl border border-[#1F4B44]/10">
          <div className="bg-[#1F4B44] text-white px-3 py-1.5 inline-block rounded-lg mb-3">
            <h3 className="font-semibold text-sm">4. Visión</h3>
          </div>
          <p className="text-sm text-[#5B564E] mb-3 italic">¿Cómo le gustaría que la empresa sea reconocida en los próximos tres a cinco años? Mencione metas de crecimiento, posicionamiento o expansión.</p>
          <textarea name="vision" rows="3" value={formData.vision} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-white"></textarea>
        </div>

        {/* 5. Valores */}
        <div className="bg-[#1F4B44]/5 p-5 rounded-2xl border border-[#1F4B44]/10">
          <div className="bg-[#1F4B44] text-white px-3 py-1.5 inline-block rounded-lg mb-3">
            <h3 className="font-semibold text-sm">5. Valores de la empresa</h3>
          </div>
          <p className="text-sm text-[#5B564E] mb-3 italic">Seleccione los valores que mejor representan la forma de trabajar de la empresa y explique los tres más importantes.</p>
          <div className="flex flex-wrap gap-3 mb-4">
            {['Calidad', 'Responsabilidad', 'Honestidad', 'Cercanía', 'Innovación', 'Tradición', 'Rapidez', 'Confianza', 'Servicio', 'Otro'].map((item) => (
              <label key={item} className="inline-flex items-center gap-1.5 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-[#241F1A]/10 hover:border-[#1F4B44] transition-colors text-sm">
                <input type="checkbox" checked={formData.valores.includes(item)} onChange={() => handleCheckboxChange('valores', item, 3)} className="accent-[#1F4B44]" />
                <span>{item}</span>
              </label>
            ))}
          </div>
          <textarea name="valoresExplicacion" rows="2" value={formData.valoresExplicacion} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-white" placeholder="Explique los valores seleccionados..."></textarea>
        </div>

        {/* 6. Público objetivo */}
        <div className="bg-[#1F4B44]/5 p-5 rounded-2xl border border-[#1F4B44]/10">
          <div className="bg-[#1F4B44] text-white px-3 py-1.5 inline-block rounded-lg mb-3">
            <h3 className="font-semibold text-sm">6. Público objetivo</h3>
          </div>
          <p className="text-sm text-[#5B564E] mb-3 italic">¿Quiénes son sus clientes principales? Describa edad aproximada, ubicación, ocupación o nivel económico, necesidades, gustos y razones por las que compran.</p>
          <div className="flex flex-wrap gap-3 mb-4">
            {['Niños', 'Jóvenes', 'Adultos', 'Familias', 'Empresas', 'Público general', 'Otro'].map((item) => (
              <label key={item} className="inline-flex items-center gap-1.5 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-[#241F1A]/10 hover:border-[#1F4B44] transition-colors text-sm">
                <input type="checkbox" checked={formData.publicoObjetivo.includes(item)} onChange={() => handleCheckboxChange('publicoObjetivo', item, 0)} className="accent-[#1F4B44]" />
                <span>{item}</span>
              </label>
            ))}
          </div>
          <textarea name="publicoDetalle" rows="2" value={formData.publicoDetalle} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-white" placeholder="Describa el público objetivo..."></textarea>
        </div>

        {/* 7. Propuesta de valor */}
        <div className="bg-[#1F4B44]/5 p-5 rounded-2xl border border-[#1F4B44]/10">
          <div className="bg-[#1F4B44] text-white px-3 py-1.5 inline-block rounded-lg mb-3">
            <h3 className="font-semibold text-sm">7. Propuesta de valor y ventaja competitiva</h3>
          </div>
          <p className="text-sm text-[#5B564E] mb-3 italic">¿Qué hace diferente a la empresa frente a sus competidores? Puede ser su calidad, precio, tamaño, antigüedad, especialidad, atención, rapidez, ser pionera, ubicación estratégica, personalización u otra fortaleza.</p>
          <textarea name="propuestaValor" rows="3" value={formData.propuestaValor} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-white"></textarea>
        </div>

        {/* 8. Razones para confiar */}
        <div className="bg-[#1F4B44]/5 p-5 rounded-2xl border border-[#1F4B44]/10">
          <div className="bg-[#1F4B44] text-white px-3 py-1.5 inline-block rounded-lg mb-3">
            <h3 className="font-semibold text-sm">8. Razones para confiar (Reason to Believe)</h3>
          </div>
          <p className="text-sm text-[#5B564E] mb-3 italic">¿Qué pruebas o hechos demuestran que la empresa puede cumplir lo que promete? Considere experiencia, testimonios, calidad de materiales, procesos, garantías, proveedores, reconocimientos, resultados o clientes frecuentes.</p>
          <textarea name="razonesConfiar" rows="3" value={formData.razonesConfiar} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-white"></textarea>
        </div>

        {/* 9. Personalidad y tono */}
        <div className="bg-[#1F4B44]/5 p-5 rounded-2xl border border-[#1F4B44]/10">
          <div className="bg-[#1F4B44] text-white px-3 py-1.5 inline-block rounded-lg mb-3">
            <h3 className="font-semibold text-sm">9. Personalidad y tono de comunicación</h3>
          </div>
          <p className="text-sm text-[#5B564E] mb-3 italic">Marque cómo debería expresarse la marca y escriba tres palabras que definan su personalidad.</p>
          <div className="flex flex-wrap gap-3 mb-4">
            {['Alegre', 'Seria', 'Formal', 'Cercana', 'Moderna', 'Tradicional', 'Elegante', 'Juvenil', 'Confiable', 'Innovadora', 'Artesanal', 'Otra'].map((item) => (
              <label key={item} className="inline-flex items-center gap-1.5 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-[#241F1A]/10 hover:border-[#1F4B44] transition-colors text-sm">
                <input type="checkbox" checked={formData.personalidad.includes(item)} onChange={() => handleCheckboxChange('personalidad', item, 0)} className="accent-[#1F4B44]" />
                <span>{item}</span>
              </label>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-[#241F1A]">Tres palabras:</label>
            <input type="text" name="tresPalabras" value={formData.tresPalabras} onChange={handleChange} className="flex-1 p-2.5 rounded-xl border border-[#241F1A]/20 bg-white text-sm" placeholder="Ej. Dinámica, amigable, experta" />
          </div>
        </div>

        {/* 10. Imagen a proyectar */}
        <div className="bg-[#1F4B44]/5 p-5 rounded-2xl border border-[#1F4B44]/10">
          <div className="bg-[#1F4B44] text-white px-3 py-1.5 inline-block rounded-lg mb-3">
            <h3 className="font-semibold text-sm">10. Imagen que desea proyectar</h3>
          </div>
          <p className="text-sm text-[#5B564E] mb-3 italic">¿Qué quiere que las personas piensen o sientan al ver la marca? Indique también qué imagen, percepción o característica no desea proyectar.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#241F1A]">Desea proyectar:</label>
              <textarea name="deseaProyectar" rows="2" value={formData.deseaProyectar} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-white"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#241F1A]">No desea proyectar:</label>
              <textarea name="noDeseaProyectar" rows="2" value={formData.noDeseaProyectar} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-white"></textarea>
            </div>
          </div>
        </div>

        {/* 11. Nombre y frase */}
        <div className="bg-[#1F4B44]/5 p-5 rounded-2xl border border-[#1F4B44]/10">
          <div className="bg-[#1F4B44] text-white px-3 py-1.5 inline-block rounded-lg mb-3">
            <h3 className="font-semibold text-sm">11. Nombre y frase de marca</h3>
          </div>
          <p className="text-sm text-[#5B564E] mb-3 italic">¿La empresa ya tiene un nombre definido? Explique su significado. Si todavía no lo tiene, registre nombres tentativos. Añada una frase, promesa o eslogan provisional si corresponde.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#241F1A]">Nombre actual o tentativo:</label>
              <input type="text" name="nombreActual" value={formData.nombreActual} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#241F1A]">Significado / motivo:</label>
              <input type="text" name="nombreSignificado" value={formData.nombreSignificado} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#241F1A]">Eslogan tentativo:</label>
              <input type="text" name="eslogan" value={formData.eslogan} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-white" />
            </div>
          </div>
        </div>

        {/* 12. Preferencias visuales */}
        <div className="bg-[#1F4B44]/5 p-5 rounded-2xl border border-[#1F4B44]/10">
          <div className="bg-[#1F4B44] text-white px-3 py-1.5 inline-block rounded-lg mb-3">
            <h3 className="font-semibold text-sm">12. Preferencias visuales y aplicaciones necesarias</h3>
          </div>
          <p className="text-sm text-[#5B564E] mb-3 italic">¿Qué colores, símbolos, formas o estilos le gustan? ¿Qué elementos desea evitar? Indique dónde se utilizará principalmente la identidad visual.</p>
          
          <div className="mb-4">
            <div className="flex flex-wrap gap-3">
              {['Letrero', 'Redes sociales', 'Empaque', 'Uniforme', 'Papelería', 'Vehículo', 'Página web', 'Otro'].map((item) => (
                <label key={item} className="inline-flex items-center gap-1.5 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-[#241F1A]/10 hover:border-[#1F4B44] transition-colors text-sm">
                  <input type="checkbox" checked={formData.aplicaciones.includes(item)} onChange={() => handleCheckboxChange('aplicaciones', item, 0)} className="accent-[#1F4B44]" />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#241F1A]">Colores preferidos:</label>
              <input type="text" name="coloresPreferidos" value={formData.coloresPreferidos} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#241F1A]">Colores que desea evitar:</label>
              <input type="text" name="coloresEvitar" value={formData.coloresEvitar} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-white" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-[#241F1A]">Símbolos, referencias o ideas visuales:</label>
            <textarea name="ideasVisuales" rows="2" value={formData.ideasVisuales} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-white"></textarea>
          </div>
        </div>

        {/* OBSERVACIONES ADICIONALES */}
        <div>
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#241F1A]/10 text-[#1F4B44] mt-8">
            <h2 className="font-serif font-bold text-xl text-[#241F1A]">OBSERVACIONES ADICIONALES</h2>
          </div>
          <textarea name="observaciones" rows="3" value={formData.observaciones} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-[#FAF6EF]"></textarea>
        </div>

        {/* AUTORIZACIÓN Y CONSTANCIA */}
        <div className="bg-[#FAF6EF] p-5 rounded-2xl border border-[#241F1A]/10 mt-8">
          <h2 className="font-serif font-bold text-lg text-[#241F1A] mb-2 text-center">AUTORIZACIÓN Y CONSTANCIA DE ENTREVISTA</h2>
          <p className="text-sm text-[#5B564E] mb-6 text-center max-w-3xl mx-auto">
            Declaro que la información registrada en este brief fue proporcionada durante la entrevista y autorizo su uso únicamente con fines académicos para el desarrollo de una propuesta de identidad corporativa. La firma de este documento no implica obligación de pago, contratación ni cesión comercial de la marca.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
            <div className="text-center">
              <div className="border-b border-[#241F1A]/30 mb-2 pb-8"></div>
              <p className="font-medium text-sm text-[#241F1A]">Firma del propietario o responsable</p>
              <div className="mt-4 text-left">
                <label className="block text-sm font-medium mb-1 text-[#241F1A]">C.I.:</label>
                <input type="text" name="ciPropietario" value={formData.ciPropietario} onChange={handleChange} className="w-full p-2.5 rounded-xl border border-[#241F1A]/20 bg-white" placeholder="Carnet de Identidad" />
              </div>
            </div>
            <div className="text-center">
              <div className="border-b border-[#241F1A]/30 mb-2 pb-8"></div>
              <p className="font-medium text-sm text-[#241F1A]">Firma del estudiante responsable</p>
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
          
          <button
            onClick={() => setModalDescarga({ isOpen: true, enBlanco: true })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#1F4B44] text-[#1F4B44] font-semibold text-xs sm:text-sm hover:bg-[#1F4B44]/5 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Plantilla en Blanco</span>
          </button>

          <button
            onClick={() => setModalDescarga({ isOpen: true, enBlanco: false })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#1F4B44] text-white font-semibold text-xs sm:text-sm hover:bg-[#183934] transition-all shadow-md cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Briefing Llenado</span>
          </button>

        </div>

        {pdfGenerado && (
          <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs sm:text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
            <span>¡Documento generado exitosamente!</span>
          </div>
        )}

      </div>

      {/* MODAL DE SELECCIÓN DE DESCARGA */}
      {modalDescarga.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative">
            <button 
              onClick={() => setModalDescarga({ isOpen: false, enBlanco: false })}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-[#241F1A] mb-2 text-center">Formato de Descarga</h3>
            <p className="text-sm text-[#5B564E] text-center mb-6">
              Elige el formato en el que deseas exportar tu {modalDescarga.enBlanco ? 'plantilla en blanco' : 'briefing llenado'}.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  exportarPDF(modalDescarga.enBlanco);
                  setModalDescarga({ isOpen: false, enBlanco: false });
                }}
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-colors flex justify-center items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Documento PDF (.pdf)</span>
              </button>
              <button
                onClick={() => {
                  exportarWord(modalDescarga.enBlanco);
                  setModalDescarga({ isOpen: false, enBlanco: false });
                }}
                className="w-full py-3.5 rounded-xl bg-[#2b579a] hover:bg-[#1a365d] text-white font-medium transition-colors flex justify-center items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Microsoft Word (.docx)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}