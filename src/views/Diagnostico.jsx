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
  Palette
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
 * Mapeo inteligente del Matiz (Hue 0-360) basado en las respuestas del microempresario.
 * Cero tecnicismos en las explicaciones, puramente lógica de psicología comercial.
 */
function calculateSuggestedHue(answers) {
  const { rubro, publico, emocion } = answers;

  // 1. Prioridad máxima por la Emoción elegida
  if (emocion === 'energia') return { hue: 16, name: 'Naranja / Rojo Cálido', family: 'Vibrante y Apasionado' };
  if (emocion === 'confianza') return { hue: 212, name: 'Azul Profesional', family: 'Sólido y Confiable' };
  if (emocion === 'calma') return { hue: 148, name: 'Verde Natural', family: 'Equilibrado y Fresco' };
  if (emocion === 'elegancia') return { hue: 275, name: 'Morado / Violeta Prestigioso', family: 'Sofisticado y Premium' };

  // 2. Prioridad secundaria por Rubro si la emoción no fue determinante o para afinar
  if (rubro === 'comida') return { hue: 22, name: 'Naranja Apetitoso', family: 'Cálido y Dinámico' };
  if (rubro === 'tecnologia' || rubro === 'servicios') return { hue: 215, name: 'Azul Tech', family: 'Confiable y Moderno' };
  if (rubro === 'salud_belleza') return { hue: 160, name: 'Menta / Verde Bienestar', family: 'Armónico y Limpio' };
  if (rubro === 'moda' || publico === 'lujo') return { hue: 340, name: 'Rosa / Violeta Elegante', family: 'Creativo y Distinguido' };

  // Por defecto si no coincide nada
  return { hue: 25, name: 'Cálido Comercial', family: 'Versátil y Amigable' };
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
      tag: 'Cercano y accesible',
      description: 'Suave, accesible y acogedor. Perfecto para marcas artesanales, productos familiares o fondos limpios que no cansan la vista del cliente.',
      hex: chroma.hsl(hue, 0.48, 0.70).hex().toUpperCase(),
      hslText: `Armonía Suave`,
    },
  ];
}

export default function Diagnostico() {
  const navigate = useNavigate();
  const { updateUserProfile, updateBaseColor } = useColor();

  // Estado: '1' | '2' | '3' | 'resultado'
  const [step, setStep] = useState(1);

  // Almacena las respuestas del usuario
  const [answers, setAnswers] = useState({
    rubro: '',
    publico: '',
    emocion: '',
  });

  // Opción temporal seleccionada en el paso actual antes de hacer clic en Siguiente
  const currentStepData = QUESTIONS[step - 1];
  const currentSelection = answers[currentStepData?.key] || '';

  // Cálculo memorizado de variantes cuando el usuario llega a Resultado
  const suggestion = useMemo(() => {
    return calculateSuggestedHue(answers);
  }, [answers]);

  const variants = useMemo(() => {
    return generateTonalVariants(suggestion.hue);
  }, [suggestion.hue]);

  // Manejo de la selección de una tarjeta de opción
  const handleSelectOption = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentStepData.key]: value,
    }));
  };

  // Botón Continuar / Siguiente
  const handleNextStep = () => {
    if (!currentSelection) return;
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Guardar perfil en ColorContext
      updateUserProfile(answers);
      setStep('resultado');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Botón Anterior / Volver
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

  // Selección final de tonalidad -> ir a Taller
  const handleApplyFinalColor = (hexColor) => {
    updateBaseColor(hexColor);
    updateUserProfile(answers);
    navigate('/taller');
  };

  // ==========================================
  // VISTA FINAL: RESULTADO DEL DIAGNÓSTICO
  // ==========================================
  if (step === 'resultado') {
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
            <span>Diagnóstico Completado</span>
          </div>
        </div>

        {/* Encabezado del Resultado */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-serif italic text-[#9A9284] uppercase tracking-wider block mb-2">
            Tu Familia Cromática Sugerida
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#241F1A] mb-4">
            {suggestion.name}
          </h1>
          <p className="text-[#5B564E] text-base sm:text-lg leading-relaxed">
            Basado en tu negocio de <span className="font-semibold text-[#241F1A]">{QUESTIONS[0].options.find(o => o.value === answers.rubro)?.label}</span> y el deseo de transmitir <span className="font-semibold text-[#241F1A]">{QUESTIONS[2].options.find(o => o.value === answers.emocion)?.label.toLowerCase()}</span>, hemos generado 3 tonalidades de intensidad exacta:
          </p>
        </div>

        {/* Grid de 3 Tarjetas Grandes de Tonalidad (Mobile-First) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {variants.map((variant) => {
            // Contraste automático para el texto en base a la luminancia real del color
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
                {/* Etiqueta superior */}
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

                {/* Botón CTA dentro de la tarjeta */}
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

        {/* Pie informativo o salto directo al Taller con otro color */}
        <div className="bg-white border border-[#241F1A]/10 rounded-2xl p-6 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p className="font-serif font-semibold text-sm text-[#241F1A]">¿Prefieres ajustar el matiz manualmente?</p>
            <p className="text-xs text-[#5B564E]">Puedes llevar cualquiera de estas opciones al Taller para girar la rueda con precisión.</p>
          </div>
          <button
            onClick={() => handleApplyFinalColor(variants[1].hex)} // Lleva el vibrante por defecto
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
      {/* Barra superior: Navegación y Progreso */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={handlePrevStep}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#5B564E] hover:text-[#241F1A] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{step === 1 ? 'Inicio' : 'Anterior'}</span>
        </button>

        {/* Indicador numérico de paso */}
        <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#1F4B44] bg-[#1F4B44]/10 px-3 py-1 rounded-full">
          Paso {step} de 3
        </span>
      </div>

      {/* Barra de progreso visual */}
      <div className="w-full h-1.5 bg-[#241F1A]/10 rounded-full overflow-hidden mb-10">
        <div
          className="h-full bg-[#1F4B44] transition-all duration-300 ease-out rounded-full"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      {/* Encabezado de la Pregunta Actual */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#241F1A] mb-3">
          {currentStepData.title}
        </h1>
        <p className="text-[#5B564E] text-sm sm:text-base leading-relaxed">
          {currentStepData.subtitle}
        </p>
      </div>

      {/* Opciones en Tarjetas Grandes Táctiles (Mobile-First) */}
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
              {/* Ícono grande y claro */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-[#1F4B44] text-white'
                    : 'bg-[#FAF6EF] text-[#1F4B44] group-hover:bg-[#1F4B44]/10'
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>

              {/* Textos de la tarjeta */}
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

              {/* Check de selección en la esquina superior derecha */}
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

      {/* Botón de Acción Siguiente / Ver Resultados */}
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
