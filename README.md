# 🎨 RULEC — Asesor de Marca Interactivo

![RULEC Header](https://img.shields.io/badge/Proyecto-Colaboraci%C3%B3n%20Universitaria-1F4B44?style=for-the-badge) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black) ![Chroma.js](https://img.shields.io/badge/Chroma.js-E84F30?style=for-the-badge) ![jsPDF](https://img.shields.io/badge/jsPDF-BE8A3A?style=for-the-badge)

> **Una alianza estratégica académica entre estudiantes de Ingeniería de Sistemas e Ingeniería de Marketing.**  
> *Diseñando el futuro visual de los emprendedores y microempresarios de Bolivia, con precisión matemática y empatía de mercado.*

---

## 🌟 1. ¿Qué es RULEC y Cuál es su Propósito?

**RULEC** no es simplemente una rueda cromática digital ni una paleta aleatoria de colores. Es un **Asesor de Marca Interactivo de Cero Fricción** diseñado específicamente para microempresarios, comerciantes y emprendedores bolivianos que no poseen conocimientos técnicos en diseño gráfico ni en teoría del color.

### 🎯 El Problema que Resolvemos
Cuando un emprendedor intenta definir los colores de su negocio o logo, se enfrenta a herramientas profesionales abrumadoras (como Adobe Color) llenas de tecnicismos incomprensibles (*"Armonía Triádica"*, *"Espacio de Color HSL"*, *"Contraste de Luminancia"*), o termina eligiendo colores al azar que no transmiten la esencia ni la confianza que busca su marca.

### 💡 La Solución RULEC (5 Vistas Clave)
A través de una interfaz elegante, rápida y perfectamente adaptable a teléfonos móviles, RULEC guía al usuario mediante un viaje intuitivo:

1. **🚀 Inicio (Cero Fricción):** Bienvenida clara al usuario con opción de iniciar un test de diagnóstico de 1 minuto o saltar directo a experimentar con la rueda de color.
2. **🧭 Diagnóstico de Marca:** Un cuestionario ágil de 3 preguntas (*Rubro de tu negocio*, *Público objetivo*, y *Emoción/Mensaje principal*) que calcula y sugiere un **Color Base ideal**, permitiendo al usuario elegir entre **3 variantes de intensidad** (*Vibrante*, *Sólido* o *Suave*).
3. **📝 Briefing Corporativo:** Formulario interactivo de levantamiento de marca para definir filosofía, público objetivo y personalidad visual. Permite exportar un PDF editable o una plantilla en blanco para entrevistas con clientes.
4. **⚙️ El Taller Cromático (Núcleo Técnico y Visual):**
   * **Rueda con Física Real:** Una rueda cromática arrastrable con el dedo o el mouse, equipada con **inercia física de giro (`GSAP`)** que se siente como un instrumento analógico de precisión.
   * **Traductor de Marca (Nombres Comerciales):** Muestra **6 esquemas de color matemáticamente exactos**, pero explicados en lenguaje claro de negocio (ej. en vez de decir *"Análogo"*, lo llamamos *"Armonía Suave y Amigable"*).
   * **Simulador de Logotipo en Tiempo Real:** Permite probar el color en tarjetas y etiquetas de producto con alertas de legibilidad **WCAG 2.1** fáciles de entender (*"Excelente Lectura"*, *"Lectura Moderada"*, etc.).
5. **📚 Academia de Marca:** Sección educativa directa sin rodeos que enseña psicología del color, significado de las formas geométricas y diferencias claras entre *Isotipo*, *Logotipo*, *Imagotipo* e *Isologo*.

### 💎 El Gran Final: Exportación Vectorial Profesional (`jsPDF`)
Una vez que el emprendedor elige su paleta y esquema ideal, puede hacer clic en un botón para descargar instantáneamente un **Manual Corto de Identidad Cromática en PDF 100% Vectorial**.  
A diferencia de otras aplicaciones web, **RULEC no toma capturas de pantalla borrosas**. El archivo descargado está dibujado vector a vector, lo que significa que el dueño del negocio puede llevar ese archivo directamente a un estudio de diseño, imprenta o abrirlo en **Adobe Illustrator**, y todo el contenido será perfectamente editable y con calidad imprenta profesional.

---

## 🛠️ 2. Guía Rápida de Instalación y Ejecución Local

Esta guía está redactada para que **todos los integrantes del equipo** (tanto programadores como mercadólogos/diseñadores) puedan ejecutar RULEC en sus computadoras en menos de 3 minutos.

### Prerrequisitos Básicos
* Tener instalado **Node.js** (versión 18 o superior). Puedes verificarlo abriendo tu terminal o símbolo del sistema (`cmd` / `PowerShell`) y escribiendo:
  ```bash
  node -v
  ```
  *(Si no lo tienes instalado, descárgalo gratis desde [nodejs.org](https://nodejs.org/)).*

### Paso a Paso para Correr RULEC

1. **Clonar el Repositorio** (o abrir la carpeta del proyecto):
   Abre tu terminal en la carpeta donde desees guardar el proyecto y ejecuta:
   ```bash
   git clone https://github.com/tayron25/rulec.git
   cd rulec
   ```

2. **Instalar las Dependencias del Proyecto:**
   Este comando descargará todas las librerías necesarias (React, Vite, Tailwind CSS, GSAP, Chroma.js y jsPDF):
   ```bash
   npm install
   ```

3. **Iniciar el Servidor Local de Desarrollo (`Dev Server`):**
   Ejecuta el siguiente comando para poner en marcha la aplicación en tu navegador:
   ```bash
   npm run dev
   ```

4. **¡Listo! Abre el proyecto en tu navegador:**
   La terminal te mostrará una dirección local (por lo general `http://localhost:5173`). Haz presionado `Ctrl + Clic` en el enlace o cópialo y pégalo en tu navegador web (Chrome, Edge o Firefox). Cada vez que guardes un cambio en un archivo, la página se actualizará automáticamente en segundos sin necesidad de recargar.

---

## 🌿 3. Guía de Trabajo por Ramas (`Git Flow` Interdisciplinario)

Dado que este proyecto une dos carreras con habilidades y enfoques complementarios, hemos estructurado un flujo de trabajo en **GitHub** que permite a ambos equipos trabajar en paralelo sin interrumpir el trabajo del otro.

### 🌳 Estructura de Ramas Principales
* **`main` (o `master`):** Es la rama sagrada de producción. Aquí **sólo** se integrará código completamente terminado, probado en móviles y revisado por ambos equipos antes de las entregas oficiales al docente.
* **`develop`:** Es la rama de integración general donde unimos el trabajo del equipo de código y del equipo de diseño antes de pasarlo a la rama principal.

---

### 💻 Equipo de Código — Ingeniería de Sistemas (`feature/logica-*`)
El equipo de programación es responsable de la arquitectura de datos, precisión trigonométrica, física de animaciones y generación de vectores. Sus ramas llevarán el prefijo `feature/logica-` o `feature/pdf-`:

* **`feature/logica-rueda`:**
  * **Responsabilidad:** Configurar `GSAP` (`Draggable` e `InertiaPlugin`) en el componente de la rueda cromática.
  * **Misión:** Garantizar que el giro sea ultra suave a 60 fps, calcular el ángulo exacto ($0^\circ - 360^\circ$) y conectar la rotación en tiempo real con el estado global (`useGSAPWheel` y `useColorMath`).
* **`feature/calculo-esquemas`:**
  * **Responsabilidad:** Integrar `chroma-js` para calcular con exactitud matemática los 6 esquemas (Monocromático, Análogo, Análogo + Acento, Complementario, Split-Complementario y Doble Complementario/Triádico) a partir del color base seleccionado.
  * **Misión:** Programar también el motor de legibilidad y contraste (`useWCAG`) para verificar las combinaciones en el simulador de logos y emitir el nivel de ratio WCAG 2.1 (`AAA`, `AA`, `Fail`).
* **`feature/pdf` (o `feature/pdf-vectorial`):**
  * **Responsabilidad:** Construir el motor de exportación `vectorPdfGenerator.js` usando estrictamente **`jsPDF`**.
  * **Misión:** Dibujar geometrías (`doc.rect`, `doc.circle`), colores exactos y tipografías puramente mediante comandos vectoriales. **Prohibido el uso de `html2canvas` o capturas web.**

---

### 🎨 Equipo de Diseño & Contenido — Ingeniería de Marketing (`feature/interfaz-*`)
El equipo de marketing, diseño UI/UX y copywriting es responsable de que la herramienta sea visualmente espectacular (*WOW Effect*), altamente intuitiva en móviles y hablando el idioma del cliente boliviano. Sus ramas llevarán el prefijo `feature/interfaz-` o `feature/contenido-`:

* **`feature/interfaz-base`:**
  * **Responsabilidad:** Maquetar el cascarón general (*Shell*) y todas las vistas del proyecto utilizando **Tailwind CSS** con una filosofía estrictamente **Mobile-First**.
  * **Misión:** Diseñar las tarjetas (*Cards* con efecto Glassmorphism), botones, menús de navegación, simuladores visuales de marca, y asegurar que la tipografía, márgenes y paleta neutra de la interfaz transmitan lujo, confianza y profesionalismo de grado comercial.
* **`feature/contenido-comercial`:**
  * **Responsabilidad:** Redactar los textos (*Copywriting*) y traducir todos los términos técnicos al **"Traductor de Marca"** comercial.
  * **Misión:**
    1. Diseñar las 3 preguntas y opciones persuasivas del **Diagnóstico de Marca** (`DiagnosticWizard`).
    2. Definir los nombres comerciales y explicaciones amigables para los 6 esquemas en el `SchemeSelector` (ej.: *"Armonía Suave"*, *"Alto Impacto"*, *"Trío Dinámico"*).
    3. Redactar el contenido pedagógico claro y directo en la sección **Academia de Marca** (psicología del color, significados de formas redondas vs. angulares, tipos de naming e isotipos/logotipos).

---

### 🤝 Protocolo de Trabajo en Equipo (Pull Requests)

1. **Nunca trabajes directamente en la rama `main` o `develop`.**  
   Antes de empezar a trabajar en tu tarea del día, asegúrate de estar en tu rama correspondiente. Por ejemplo, si eres del equipo de diseño trabajando en la interfaz de inicio:
   ```bash
   git checkout -b feature/interfaz-base
   ```
2. **Guarda tus cambios con mensajes descriptivos:**
   ```bash
   git add .
   git commit -m "Diseño móvil completado para las tarjetas del Diagnóstico con Tailwind"
   git push origin feature/interfaz-base
   ```
3. **Abre un Pull Request (PR) en GitHub hacia `develop`:**
   Cuando tu parte esté lista, abre una solicitud de revisión en GitHub.  
   * **Regla de Oro Universitaria:** Un PR de código técnico (`feature/logica-*`) debe ser revisado y aprobado por al menos **un compañero de Marketing** (para validar que la experiencia se sienta bien y rápida), y un PR de diseño (`feature/interfaz-*`) debe ser aprobado por al menos **un compañero de Sistemas** (para validar la accesibilidad, limpieza del layout y responsividad).

---

## 📂 4. Resumen de la Arquitectura del Repositorio

Para orientarte rápidamente sobre dónde encontrar o modificar cada archivo, consulta esta tabla rápida de carpetas:

| Carpeta / Archivo | Equipo Principal | ¿Para Qué Sirve? |
| :--- | :--- | :--- |
| **`src/components/`** | Ambos Equipos | Componentes UI (Navbar, RuedaCromatica, SimuladorLogo, ExportadorPDF). |
| **`src/views/Inicio.jsx`** | Marketing & Diseño | Vista inicial de bienvenida y llamadas a la acción (*Call To Action*). |
| **`src/views/Diagnostico.jsx`** | Marketing & Sistemas | Cuestionario interactivo de 3 preguntas y selector de sugerencias cromáticas. |
| **`src/views/Briefing.jsx`** | Marketing & Diseño | Formulario interactivo para levantamiento de identidad corporativa. |
| **`src/views/Taller.jsx`** | Sistemas & Diseño | **El Taller:** Rueda GSAP, selector de esquemas, muestras de color y simulador. |
| **`src/views/Academia.jsx`** | Marketing & Diseño | Contenido educativo de psicología de colores, formas y logotipos. |
| **`src/context/`** | Ingeniería de Sistemas | `BrandContext.jsx` que gestiona y comparte el estado global. |
| **`src/hooks/`** | Ingeniería de Sistemas | Lógica y matemáticas puras (`useColorMath`, `useGSAPWheel`, `useWCAG`). |
| **`src/services/pdf/`** | Ingeniería de Sistemas | motor `vectorPdfGenerator.js` encargado de exportar el archivo vectorial con `jsPDF`. |
| **`src/utils/`** | Ambos Equipos | Constantes, glosario comercial, base de datos de preguntas y algoritmos de color. |
| **`AGENTS.md`** | Arquitectura & IA | Mandamientos técnicos del proyecto y guía estricta para asistentes de Inteligencia Artificial. |

---
*¡Con empatía por el usuario y rigor en el código, hagamos de RULEC la herramienta referente para los emprendedores bolivianos!* 🚀🇧🇴
