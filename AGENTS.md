# AGENTS.md — Guía de Arquitectura y Mandamientos Técnicos para RULEC

> **Rol Asignado:** Senior Frontend Developer & Software Architect  
> **Proyecto:** RULEC — Asesor de Marca Interactivo (Colaboración Universitaria: Ingeniería de Sistemas & Marketing)  
> **Objetivo de este Documento:** Servir como la fuente de la verdad arquitectónica, técnica y de reglas de negocio para los agentes de IA y los líderes técnicos del proyecto durante todo el ciclo de desarrollo.

---

## 1. Mandamientos y Reglas Estrictas del Proyecto

Para cumplir con las exigencias académicas del docente y, al mismo tiempo, resolver el problema real de los microempresarios y emprendedores en Bolivia, todo el código generado en RULEC debe obedecer estrictamente las siguientes directrices:

### 1.1. Cero Tecnicismos en la Interfaz de Usuario (Traductor de Marca)
* **El Problema:** Los microempresarios no son diseñadores gráficos ni teóricos del color. Términos como *"Triádico"*, *"Análogo"*, *"HSL"*, *"Saturación al 80%"* o *"Contraste WCAG AA"* generan fricción y abandono.
* **La Regla de Oro:** Internamente el motor técnico trabajará con rigor matemático puramente en **HSL/RGB** con nombres técnicos; sin embargo, en los componentes de la interfaz de usuario (`Workshop`, `SchemeSelector`, etc.), los esquemas y métricas **siempre** deben presentarse en lenguaje comercial, accesible y orientado al branding:
  * **Monocromático** $\rightarrow$ **"Identidad Sólida (Variaciones de Intensidad)"**
  * **Análogo** $\rightarrow$ **"Armonía Suave (Colores Vecinos y Amigables)"**
  * **Análogo + Acento** $\rightarrow$ **"Armonía con Toque de Días Especiales"**
  * **Complementario** $\rightarrow$ **"Alto Impacto (Contraste Vibrante y Audaz)"**
  * **Split-Complementario** $\rightarrow$ **"Contraste Sutil (Dualidad Equilibrada)"**
  * **Doble Complementario** $\rightarrow$ **"Riqueza Visual (Doble Acento Dinámico)"**
  * **Triádico** $\rightarrow$ **"Trío Dinámico (Equilibrio Audaz y Multicolor)"**
* **Métricas WCAG en UI:** En el simulador de logotipos, en lugar de mostrar únicamente *"WCAG 2.1 Ratio: 3.2:1 (Fail)"*, la UI debe traducir el resultado con insignias visuales claras:
  * $\checkmark$ **"Excelente Lectura (Apto para Letreros y Pantallas)"** (Ratio $\ge 4.5:1$)
  * $\triangle$ **"Lectura Moderada (Mejor para Títulos Grandes)"** (Ratio entre $3.0:1$ y $4.4:9$)
  * $\times$ **"Dificultad de Lectura (El cliente podría fatigarse)"** (Ratio $< 3.0:1$)

### 1.2. Precisión Matemática & Física Real en la Rueda Cromática (`GSAP + Chroma.js`)
* **El Exigente Requisito Docente:** La rueda cromática no puede ser un simple selector HTML (`<input type="color">`) ni una imagen estática. Debe comportarse como un instrumento físico de precisión.
* **Implementación GSAP:** Se utilizará `GSAP` con `Draggable` y el plugin `InertiaPlugin` (o simulación física por fricción armónica si el plugin requiere licencia de club, manteniendo un ciclo trigonométrico exacto de 60fps con `requestAnimationFrame`).
* **Sincronización Trigonométrica (`useGSAPWheel`):**
  * El ángulo del disco (`rotation` de $0^\circ$ a $360^\circ$) se mapea inversamente o directamente al matiz (**Hue** $H$) del color base: $H = ((-rotation \pmod{360}) + 360) \pmod{360}$.
  * Cada cambio de ángulo, sea por arrastre lento para precisión milimétrica o al soltar con impulso (*throw/inertia*), debe emitir eventos en tiempo real hacia la lógica de `chroma-js` para recalcular en el instante los 6 esquemas y actualizar los simuladores.

### 1.3. Exportación Vectorial Estricta en PDF (`jsPDF` Puro — Prohibido Rasterizar)
* **La Regla Inquebrantable:** **ESTRICTAMENTE PROHIBIDO** usar `html2canvas`, capturas de pantalla del DOM, imágenes `.png/.jpg` de la paleta o renderizados rasterizados dentro del PDF.
* **Por Qué:** El producto entregable final es un **"Manual Corto de Identidad Cromática"** descargable por el emprendedor. Si un diseñador gráfico o una imprenta abre ese PDF en **Adobe Illustrator** o **CorelDRAW**, los cuadros de color, textos, proporciones y códigos HEX/CMYK deben ser elementos 100% vectoriales e independientes, perfectamente escalables y editables sin pérdida de resolución.
* **Implementación Técnica (`vectorPdfGenerator.js`):**
  * Se emplearán exclusivamente las APIs primitivas vectoriales de `jsPDF`:
    * `doc.setFillColor(r, g, b)` + `doc.rect(x, y, w, h, 'F')` para dibujar cada bloque de color de la paleta, muestras de uso y fondos del manual.
    * `doc.setFont()` + `doc.setTextColor()` + `doc.text()` para plasmar los nombres comerciales, códigos HEX, RGB, CMYK y reglas de legibilidad.
    * `doc.setDrawColor()` + `doc.setLineWidth()` + `doc.line()` para divisores y diagramas de composición.

### 1.4. Enfoque Mobile-First & Calidad Premium UX/UI
* **Realidad del Usuario:** El 85%+ de los microempresarios bolivianos consultarán o probarán RULEC desde un teléfono móvil (Android/iOS).
* **Diseño Responsivo Total:** Todo diseño parte de layouts para pantallas pequeñas ($320\text{px} - 430\text{px}$) y escala hacia tablets y escritorios ($1024\text{px}+$). La rueda cromática debe tener directivas `touch-action: none` para evitar el *scroll* accidental del navegador mientras se gira con el dedo.
* **Estética de Vanguardia (WOW Effect):** Uso de paletas neutras elegantes de fondo (`#FAF6EF` o Dark Mode elegante), tarjetas con sutiles bordes translúcidos (*Glassmorphism*), sombras suaves y micro-transiciones para que la experiencia compita visualmente con plataformas de diseño de software comercial global.

---

## 2. Flujo del Estado Global (State Management Architecture)

Para que el trayecto del usuario sea fluido (sin recargas de página ni pérdidas de información al navegar entre las 4 vistas), RULEC emplea una arquitectura centralizada basada en **React Context API + useReducer** (o `Zustand` por su simplicidad y alto rendimiento).

### 2.1. Estructura de Vistas y Ciclo de Vida de los Datos

```
+-----------------------------------------------------------------------------------+
|                                 GLOBAL BRAND STORE                                |
|  { currentView, diagnosticData, baseColor, activeScheme, palette, logoSim }       |
+-----------------------------------------------------------------------------------+
       ^                   |                   |                   |                   |
       | (Guarda baseColor)| (Sincroniza)      | (Exporta PDF)     | (Consume y        | (Lectura/
       |  y rubro)         v                   v                   v  actualiza)       v  Educación)
+--------------+    +--------------+    +--------------+    +--------------+    +--------------+
|  1. INICIO   | -> | 2. DIAGNÓST. | -> | 3. BRIEFING  | -> |  4. TALLER   | -> | 5. ACADEMIA  |
|              |    | (3 Preguntas)|    | (Formulario  |    | (Rueda GSAP  |    | (Psicología, |
| Bienvenida y |    | Sugiere 3    |    |  PDF de      |    |  + Esquemas  |    |  Formas y    |
| Cero Fricción|    | Tonalidades  |    |  Marca)      |    |  + Simulador)|    |  Tipología)  |
+--------------+    +--------------+    +--------------+    +--------------+    +--------------+
                                                                       |
                                                                       v
                                                            +----------------------+
                                                            | EXPORTACIÓN VECTORIAL|
                                                            |     jsPDF (Vectores) |
                                                            +----------------------+
```

### 2.2. Modelo de Datos del Estado (`BrandState`)

```typescript
interface ColorToken {
  hue: number;        // 0 - 360
  saturation: number; // 0 - 100
  lightness: number;  // 0 - 100
  hex: string;        // "#RRGGBB"
  rgb: [number, number, number];
  cmyk: [number, number, number, number];
}

interface SchemePalette {
  id: string;               // e.g., 'complementary', 'analogous'
  commercialName: string;   // e.g., 'Alto Impacto (Contraste Vibrante)'
  description: string;      // Breve explicación en lenguaje de negocio
  colors: ColorToken[];     // Lista de colores que conforman la armonía
}

interface BrandState {
  // Navegación
  currentView: 'home' | 'diagnostic' | 'workshop' | 'academy';
  
  // Datos recopilados en el Diagnóstico (Paso 2)
  diagnosticData: {
    rubro: string;          // e.g., 'gastronomia', 'tecnologia', 'artesania'
    publico: string;        // e.g., 'jovenes_dinamicos', 'familias', 'corporativo'
    emocion: string;        // e.g., 'energia_pasion', 'confianza_seriedad', 'calma_naturaleza'
    isCompleted: boolean;
  };

  // Color Base actual (sea sugerido por diagnóstico o elegido en la rueda del taller)
  baseColor: ColorToken;

  // Esquema seleccionado en el Taller
  activeSchemeId: string;   // e.g., 'complementary'
  currentPalette: SchemePalette;

  // Estado del Simulador de Contraste (Logo / Letrero)
  logoSimulator: {
    textColor: string;      // HEX del texto del logo
    backgroundColor: string;// HEX del fondo del logo/tarjeta
    wcagRatio: number;      // e.g., 5.4
    wcagLevel: 'AAA' | 'AA' | 'AA-Large' | 'Fail';
    commercialStatus: string; // e.g., "Excelente Lectura"
  };
}
```

### 2.3. Transición Crítica: De `Diagnóstico` a `Taller`
1. El usuario responde las 3 preguntas en `DiagnosticWizard`.
2. El sistema consulta una matriz de ponderación psicológica (`psicoMatrix.js`) que asigna un ángulo de Matiz HSL ideal para su marca (ej.: si eligió *Gastronomía + Energía*, el matiz sugerido es $H=15^\circ$, Rojo/Naranja).
3. La interfaz le presenta **3 Variantes de Intensidad** variando saturación y luminosidad de ese matiz:
   * **Opción A (Vibrante / Audaz):** `HSL(15, 85%, 50%)`
   * **Opción B (Sólido / Confiable):** `HSL(15, 70%, 42%)`
   * **Opción C (Suave / Artesanal):** `HSL(15, 55%, 68%)`
4. Al hacer clic en su favorito, el evento `APPLY_DIAGNOSTIC_COLOR` actualiza el `baseColor` en el store global y cambia automáticamente la vista a `workshop`.
5. Al montarse `Workshop`, el componente `ColorWheelGSAP` lee `baseColor.hue` del store, gira el disco de GSAP instantáneamente a la posición exacta ($\text{rotation} = -H$) y `chroma-js` precalcula inmediatamente los 6 esquemas disponibles listos para exportar.

---

## 3. Arquitectura de Carpetas y Componentes (`Feature-Driven`)

El proyecto en React + Vite + Tailwind CSS se organiza por dominios funcionales (*Feature-Driven Architecture*), aislando la complejidad matemática y física de los componentes visuales puros.

```
src/
├── assets/
│   ├── icons/                  # SVG iconos vectoriales limpios
│   └── branding/               # Logos y elementos visuales de RULEC
│
├── components/
│   ├── common/                 # Componentes UI genéricos (Navbar, Button, Card, Modal, etc.)
│   ├── RuedaCromatica.jsx      # Componente de GSAP Draggable + Inertia
│   ├── SimuladorLogo.jsx       # Interfaz visual de prueba de contraste de logotipos
│   └── ExportadorPDF.jsx       # Botón y motor jsPDF puramente vectorial para el Taller
│
├── views/
│   ├── Inicio.jsx              # Vista 1: Inicio (Cero Fricción y bienvenida)
│   ├── Diagnostico.jsx         # Vista 2: Diagnóstico Interactivo (Cuestionario)
│   ├── Briefing.jsx            # Vista 3: Formulario extenso de levantamiento (Brief de Marca exportable)
│   ├── Taller.jsx              # Vista 4: Taller (Núcleo Técnico, Esquemas, y Simulador)
│   └── Academia.jsx            # Vista 5: Academia de Marca (Educación Estática y Naming)
│
├── context/
│   ├── BrandContext.jsx        # Definición del Contexto de React para BrandState
│   └── BrandProvider.jsx       # Provider con useReducer y persistencia local (localStorage)
│
├── hooks/
│   ├── useColorMath.js         # Hook que encapsula Chroma.js (cálculos HSL, conversiones, esquemas)
│   ├── useGSAPWheel.js         # Hook que maneja el ciclo de vida de GSAP Draggable/Inertia sobre el DOM
│   └── useWCAG.js              # Hook para calcular ratios de contraste y devolver el estado comercial
│
├── services/
│   └── pdf/
│       ├── vectorPdfGenerator.js # Motor principal que dibuja vectores e inyecta fuentes con jsPDF
│       ├── pdfLayoutTokens.js    # Constantes de márgenes, grillas y paleta corporativa del documento PDF
│       └── pdfTemplates.js       # Funciones para dibujar diagramas de proporción y tarjetas en el PDF
│
├── utils/
│   ├── colorAlgorithms.js      # Fórmulas trigonométricas exactas de los 6 esquemas en HSL
│   ├── commercialTranslations.js # Diccionario que traduce términos técnicos de color a lenguaje de negocio
│   ├── diagnosticQuestions.js  # Base de datos de preguntas y matriz de correspondencia psicológica
│   └── wcagHelper.js           # Fórmulas de luminancia relativa y contraste estándar WCAG 2.1
│
├── App.jsx                     # Componente raíz con el enrutador de las 4 vistas del estado
├── main.jsx                    # Montaje en el DOM
└── index.css                   # Estilos globales, variables CSS base y configuración de Tailwind
```

---

## 4. Estrategia de Implementación Técnica por Capas

Para garantizar el éxito en la codificación, los desarrolladores y agentes de IA construirán RULEC en **4 Capas Secuenciales**:

1. **Capa 0: Fundamentos y Motor de Color (`utils/` + `hooks/`)**
   * Configuración pura de `chroma-js`.
   * Pruebas unitarias de las fórmulas en `colorAlgorithms.js` para asegurar que el cálculo trigonométrico de cada esquema devuelva los ángulos HSL exactos exigidos por la cátedra de Ingeniería de Sistemas.
2. **Capa 1: Estado y Cascarón UI (`context/` + `components/common/`)**
   * Implementación del `BrandProvider`.
   * Maquetado del cascarón principal (`Navbar`, transiciones de vistas, diseño base mobile-first en Tailwind CSS).
3. **Capa 2: El Taller y la Rueda GSAP (`components/workshop/`)**
   * Integración de `GSAP Draggable` e `InertiaPlugin` en el disco `conic-gradient`.
   * Conexión fluida del giro de la rueda con `useColorMath` y actualización en caliente de `SchemeSelector` y `LogoSimulator`.
4. **Capa 3: Diagnóstico, Academia y Motor de PDF (`components/diagnostic/`, `academy/`, `services/pdf/`)**
   * Creación del cuestionario de 3 pasos y enlace con la rueda.
   * Maquetado del contenido educativo provisto por Marketing.
   * Programación meticulosa del `vectorPdfGenerator.js` para la generación del PDF vectorial editable en Adobe Illustrator.

---
*Este archivo debe ser consultado antes de cada Pull Request y antes de implementar cualquier nuevo componente en el proyecto RULEC.*
