import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import chroma from 'chroma-js';
import { useColor } from '../context/ColorContext';
import {
  Utensils,
  Laptop,
  Heart,
  Briefcase,
  ShoppingBag,
  Smile,
  Users,
  Building2,
  Crown,
  Shield,
  Flame,
  Leaf,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Palette,
  Info
} from 'lucide-react';

/**
 * Preguntas del Diagnóstico y sus opciones ilustradas.
 */
const QUESTIONS = [
  {
    id: 1,
    key: 'rubro',
    title: '¿De qué trata tu negocio?',
    subtitle: 'El rubro o sector en el que operas nos ayuda a definir la base natural de tu marca.',
    options: [
      { value: 'comida', label: 'Comida y Gastronomía', description: 'Restaurantes, repostería, cafés o alimentos artesanales', icon: Utensils },
      { value: 'tecnologia', label: 'Tecnología y Electrónica', description: 'Software, servicio técnico, gadgets o plataformas digitales', icon: Laptop },
      { value: 'salud_belleza', label: 'Salud, Belleza y Bienestar', description: 'Cosmética, consultorios, spa, fitness o cuidado personal', icon: Heart },
      { value: 'servicios', label: 'Servicios y Corporativo', description: 'Consultoría, legales, contabilidad, inmobiliaria o educación', icon: Briefcase },
      { value: 'moda', label: 'Moda, Ropa y Accesorios', description: 'Tiendas de ropa, calzado, joyería o diseño textil', icon: ShoppingBag },
    ],
  },
  {
    id: 2,
    key: 'publico',
    title: '¿Quién es tu cliente principal?',
    subtitle: 'Conocer a quién le hablas nos permite ajustar el tono de cercanía y sofisticación.',
    options: [
      { value: 'jovenes', label: 'Jóvenes y Estudiantes', description: 'Público dinámico, conectado y que valora la rapidez', icon: Smile },
      { value: 'familias', label: 'Familias y Hogares', description: 'Personas que buscan calidez, confianza y productos duraderos', icon: Users },
      { value: 'empresas', label: 'Empresas y Negocios (B2B)', description: 'Clientes corporativos que priorizan formalidad y resultados', icon: Building2 },
      { value: 'lujo', label: 'Público de Lujo / Exclusivo', description: 'Consumidores exigentes que buscan prestigio y alta calidad', icon: Crown },
    ],
  },
  {
    id: 3,
    key: 'emocion',
    title: '¿Qué emoción principal quieres transmitir?',
    subtitle: 'El corazón de tu marca: lo primero que deben sentir tus clientes al ver tu logotipo.',
    options: [
      { value: 'confianza', label: 'Confianza, Seguridad y Seriedad', description: 'Respaldo, profesionalismo y estabilidad a largo plazo', icon: Shield },
      { value: 'energia', label: 'Energía, Rapidez y Pasión', description: 'Dinamismo, entusiasmo, apetito y acción inmediata', icon: Flame },
      { value: 'calma', label: 'Calma, Naturaleza y Equilibrio', description: 'Frescura, salud, sustentabilidad y paz mental', icon: Leaf },
      { value: 'elegancia', label: 'Elegancia, Exclusividad y Prestigio', description: 'Distinción, lujo, creatividad premium y sofisticación', icon: Sparkles },
    ],
  },
];

/**
 * MOTOR DE DECISIÓN CROMÁTICA CON SISTEMA DE PESOS (COMBINA RUBRO + PÚBLICO + EMOCIÓN)
 */
function calculateSuggestedHue(answers) {
  const { rubro, publico, emocion } = answers;

  // Sistema de Puntuación para cada Matiz Cromático
  const scores = {
    calido_vibrante: 0, // Rojo/Naranja (Hue: 18)
    azul_corporativo: 0, // Azul (Hue: 212)
    verde_bienestar: 0,  // Verde (Hue: 148)
    prupura_prestigio: 0,// Morado/Rosa (Hue: 280)
    dorado_calido: 0     // Ámbar/Dorado (Hue: 38)
  };

  // --- 1. EVALUACIÓN DE EMOCIÓN (Peso: 4.5 Puntos) ---
  if (emocion === 'energia') scores.calido_vibrante += 4.5;
  if (emocion === 'confianza') scores.azul_corporativo += 4.5;
  if (emocion === 'calma') scores.verde_bienestar += 4.5;
  if (emocion === 'elegancia') scores.prupura_prestigio += 4.5;

  // --- 2. EVALUACIÓN DE RUBRO (Peso: 3.5 Puntos) ---
  if (rubro === 'comida') {
    scores.calido_vibrante += 2.5;
    scores.dorado_calido += 1.0;
  } else if (rubro === 'tecnologia') {
    scores.azul_corporativo += 2.5;
    scores.prupura_prestigio += 1.0;
  } else if (rubro === 'salud_belleza') {
    scores.verde_bienestar += 2.5;
    scores.prupura_prestigio += 1.0;
  } else if (rubro === 'servicios') {
    scores.azul_corporativo += 2.5;
    scores.verde_bienestar += 1.0;
  } else if (rubro === 'moda') {
    scores.prupura_prestigio += 2.5;
    scores.calido_vibrante += 1.0;
  }

  // --- 3. EVALUACIÓN DE PÚBLICO TARGET (Peso: 2.0 Puntos) ---
  if (publico === 'jovenes') {
    scores.calido_vibrante += 1.2;
    scores.prupura_prestigio += 0.8;
  } else if (publico === 'familias') {
    scores.dorado_calido += 1.2;
    scores.verde_bienestar += 0.8;
  } else if (publico === 'empresas') {
    scores.azul_corporativo += 1.5;
    scores.verde_bienestar += 0.5;
  } else if (publico === 'lujo') {
    scores.prupura_prestigio += 1.5;
    scores.dorado_calido += 0.5;
  }

  // Determinación del ganador por puntuación ponderada
  let winningKey = 'azul_corporativo';
  let maxScore = -1;

  for (const [key, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      winningKey = key;
    }
  }

  // Definición detallada del resultado según la familia ganadora
  const profiles = {
    calido_vibrante: {
      hue: 18,
      name: 'Naranja / Rojo Cálido',
      family: 'Vibrante y Apasionado',
      justificacion: 'Esta paleta fue calculada combinando la alta energía de tu comunicación con las demandas de tu mercado meta. Es ideal para estimular la acción rápida, transmitir dinamismo y captar atención inmediata.'
    },
    azul_corporativo: {
      hue: 212,
      name: 'Azul Institucional',
      family: 'Sólido y Confiable',
      justificacion: 'Resultado de cruzar un sector formal/tecnológico con la necesidad de proyectar seguridad. El azul reduce el sesgo de riesgo en el consumidor e inspira estabilidad corporativa.'
    },
    verde_bienestar: {
      hue: 148,
      name: 'Verde Orgánico y Salud',
      family: 'Equilibrado y Orgánico',
      justificacion: 'Obtenido al ponderar el equilibrio y la sostenibilidad de tu rubro. Es óptimo para transmitir serenidad, frescura y una propuesta centrada en el bienestar del cliente.'
    },
    prupura_prestigio: {
      hue: 280,
      name: 'Púrpura Premium / Violeta',
      family: 'Sofisticado y Exclusivo',
      justificacion: 'Seleccionado por la alta afinidad entre tu público objetivo de alto valor/jóvenes creativos y la búsqueda de distinción. Transmite innovación, estatus y calidad superior.'
    },
    dorado_calido: {
      hue: 38,
      name: 'Ámbar / Cálido Accesible',
      family: 'Acogedor y Familiar',
      justificacion: 'Recomendado por la combinación de calidez familiar y un rubro cercano. Fomenta un ambiente de confianza, confort y accesibilidad comercial.'
    }
  };

  return profiles[winningKey] || profiles.azul_corporativo;
}

/**
 * Genera las 3 opciones exactas de tonalidad en HSL utilizando Chroma.js.
 */
function generateTonalVariants(hue) {
  return [
    {
      id: 'oscuro',
      title: 'Oscuro y Serio',
      tag: 'Mayor presencia y autoridad',
      description: 'Ideal para transmitir seriedad, solidez y experiencia en el mercado. Excelente para letreros elegantes, encabezados y logotipos de alto contraste.',
      hex: chroma.hsl(hue, 0.62, 0.36).hex().toUpperCase(),
      hslText: `Luminosidad Sólida`,
    },
    {
      id: 'vibrante',
      title: 'Vibrante y Llamativo',
      tag: 'Recomendado para alto impacto',
      description: 'Un color lleno de energía que capta la atención al instante. Ideal para botones de compra, redes sociales y marcas que buscan destacarse.',
      hex: chroma.hsl(hue, 0.85, 0.52).hex().toUpperCase(),
      hslText: `Intensidad Máxima`,
    },
    {
      id: 'claro',
      title: 'Claro y Amigable',
      tag: 'Cercano y accessible',
      description: 'Suave, accesible y acogedor. Perfecto para marcas artesanales, productos familiares o fondos limpios que no cansan la vista del cliente.',
      hex: chroma.hsl(hue, 0.48, 0.70).hex().toUpperCase(),
      hslText: `Armonía Suave`,
    },
  ];
}

export default function Diagnostico() {
  const navigate = useNavigate();
  const { updateUserProfile, updateBaseColor } = useColor();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    rubro: '',
    publico: '',
    emocion: '',
  });

  const currentStepData = QUESTIONS[step - 1];
  const currentSelection = answers[currentStepData?.key] || '';

  const suggestion = useMemo(() => {
    return calculateSuggestedHue(answers);
  }, [answers]);

  const variants = useMemo(() => {
    return generateTonalVariants(suggestion.hue);
  }, [suggestion.hue]);

  const handleSelectOption = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentStepData.key]: value,
    }));
  };

  const handleNextStep = () => {
    if (!currentSelection) return;
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      updateUserProfile(answers);
      setStep('resultado');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (step === 'resultado') {
      setStep(3);
    } else if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyFinalColor = (hexColor) => {
    updateBaseColor(hexColor);
    updateUserProfile(answers);
    navigate('/taller');
  };

  // ==========================================
  // VISTA FINAL: RESULTADO CON JUSTIFICACIÓN COMBINADA
  // ==========================================
  if (step === 'resultado') {
    const rubroLabel = QUESTIONS[0].options.find(o => o.value === answers.rubro)?.label;
    const publicoLabel = QUESTIONS[1].options.find(o => o.value === answers.publico)?.label;
    const emocionLabel = QUESTIONS[2].options.find(o => o.value === answers.emocion)?.label;

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-16 animate-fade-in">
        {/* Barra superior de regreso */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#241F1A]/10">
          <button
            onClick={handlePrevStep}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#5B564E] hover:text-[#241F1A] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a las preguntas</span>
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F4B44]/10 text-[#1F4B44] text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Diagnóstico Ponderado Completado</span>
          </div>
        </div>

        {/* Encabezado del Resultado */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs sm:text-sm font-serif italic text-[#9A9284] uppercase tracking-wider block mb-2">
            Tu Familia Cromática Sugerida
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#241F1A] mb-4">
            {suggestion.name}
          </h1>

          {/* Tarjeta de Justificación Multivariable */}
          <div className="bg-[#FAF6EF] border border-[#241F1A]/10 rounded-2xl p-5 text-left my-6 shadow-sm">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#1F4B44] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif font-bold text-sm text-[#241F1A] mb-1">
                  Justificación Técnica del Diagnóstico
                </h4>
                <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed mb-3">
                  {suggestion.justificacion}
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-white border border-[#241F1A]/10 px-2.5 py-1 rounded-md text-[#241F1A]">
                    <strong>Sector:</strong> {rubroLabel}
                  </span>
                  <span className="bg-white border border-[#241F1A]/10 px-2.5 py-1 rounded-md text-[#241F1A]">
                    <strong>Target:</strong> {publicoLabel}
                  </span>
                  <span className="bg-white border border-[#241F1A]/10 px-2.5 py-1 rounded-md text-[#241F1A]">
                    <strong>Emoción:</strong> {emocionLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de 3 Tarjetas Grandes de Tonalidad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {variants.map((variant) => {
            const isLight = chroma(variant.hex).luminance() > 0.45;
            const textColor = isLight ? '#241F1A' : '#FFFFFF';
            const subTextColor = isLight ? 'rgba(36, 31, 26, 0.75)' : 'rgba(255, 255, 255, 0.82)';
            const borderStyle = isLight ? 'border border-[#241F1A]/20' : 'border border-transparent';

            return (
              <div
                key={variant.id}
                onClick={() => handleApplyFinalColor(variant.hex)}
                className={`group relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden ${borderStyle}`}
                style={{ backgroundColor: variant.hex, color: textColor }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md"
                      style={{
                        backgroundColor: isLight ? 'rgba(36, 31, 26, 0.08)' : 'rgba(255, 255, 255, 0.18)',
                        color: textColor
                      }}
                    >
                      {variant.tag}
                    </span>
                    <span className="font-mono text-xs opacity-80 font-bold tracking-wider">
                      {variant.hex}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl sm:text-3xl mb-3 tracking-tight">
                    {variant.title}
                  </h3>

                  <p className="text-xs sm:text-sm leading-relaxed mb-6" style={{ color: subTextColor }}>
                    {variant.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-current/15 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider opacity-90">
                    Elegir este tono
                  </span>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: isLight ? '#241F1A' : '#FFFFFF',
                      color: isLight ? '#FFFFFF' : '#241F1A'
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pie informativo */}
        <div className="bg-white border border-[#241F1A]/10 rounded-2xl p-6 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p className="font-serif font-semibold text-sm text-[#241F1A]">¿Prefieres ajustar el matiz manualmente?</p>
            <p className="text-xs text-[#5B564E]">Puedes llevar cualquiera de estas opciones al Taller para girar la rueda con precisión.</p>
          </div>
          <button
            onClick={() => handleApplyFinalColor(variants[1].hex)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF6EF] border border-[#241F1A]/20 text-xs font-semibold text-[#241F1A] hover:bg-[#241F1A] hover:text-white transition-all shrink-0 cursor-pointer"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Ir al Taller Cromático</span>
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // VISTA DEL CUESTIONARIO (PASOS 1, 2, 3)
  // ==========================================
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-14 animate-fade-in">
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={handlePrevStep}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#5B564E] hover:text-[#241F1A] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{step === 1 ? 'Inicio' : 'Anterior'}</span>
        </button>

        <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#1F4B44] bg-[#1F4B44]/10 px-3 py-1 rounded-full">
          Paso {step} de 3
        </span>
      </div>

      <div className="w-full h-1.5 bg-[#241F1A]/10 rounded-full overflow-hidden mb-10">
        <div
          className="h-full bg-[#1F4B44] transition-all duration-300 ease-out rounded-full"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#241F1A] mb-3">
          {currentStepData.title}
        </h1>
        <p className="text-[#5B564E] text-sm sm:text-base leading-relaxed">
          {currentStepData.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-10">
        {currentStepData.options.map((option) => {
          const Icon = option.icon;
          const isSelected = currentSelection === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelectOption(option.value)}
              className={`group relative flex items-start gap-4 p-5 sm:p-6 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-white border-[#1F4B44] ring-2 ring-[#1F4B44] shadow-md'
                  : 'bg-white/80 border-[#241F1A]/10 hover:border-[#1F4B44]/40 hover:bg-white hover:shadow-sm'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-[#1F4B44] text-white'
                    : 'bg-[#FAF6EF] text-[#1F4B44] group-hover:bg-[#1F4B44]/10'
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex-grow pr-6">
                <h3 className={`font-serif font-bold text-base sm:text-lg mb-1 transition-colors ${
                  isSelected ? 'text-[#1F4B44]' : 'text-[#241F1A]'
                }`}>
                  {option.label}
                </h3>
                <p className="text-xs sm:text-sm text-[#5B564E] leading-relaxed">
                  {option.description}
                </p>
              </div>

              <div
                className={`absolute top-5 right-5 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  isSelected
                    ? 'border-[#1F4B44] bg-[#1F4B44] text-white scale-110'
                    : 'border-[#241F1A]/20 bg-transparent text-transparent group-hover:border-[#241F1A]/40'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-end border-t border-[#241F1A]/10 pt-6">
        <button
          type="button"
          disabled={!currentSelection}
          onClick={handleNextStep}
          className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm sm:text-base transition-all duration-200 ${
            currentSelection
              ? 'bg-[#1F4B44] text-white shadow-lg shadow-[#1F4B44]/20 hover:bg-[#183934] hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
              : 'bg-[#241F1A]/10 text-[#9A9284] cursor-not-allowed'
          }`}
        >
          <span>{step === 3 ? 'Ver Mis 3 Tonalidades' : 'Siguiente Paso'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}