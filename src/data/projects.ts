import { TODO, type ImageAsset, type Project } from "./types";

/** Covers: real screenshots where the repo has them; the rest are 16:10 placeholders (TODO: real screenshots). */
const cover = (file: string, width: number, height: number, es: string, en: string): ImageAsset => ({
  src: `/images/${file}`,
  width,
  height,
  alt: { es, en },
});
const placeholder = (id: string, es: string, en: string) => cover(`project-${id}.svg`, 1600, 1000, es, en);

export const projects: Project[] = [
  {
    id: "pulso",
    featured: true,
    title: { es: "Pulso", en: "Pulso" },
    platforms: ["desktop"],
    description: {
      es: "App de escritorio para equipos que trabajan con IA: registra tiempo y actividad, organiza proyectos y tareas, y genera reportes en lenguaje natural cuyas cifras salen de SQL, no de la IA. Funciona sin conexión y nunca registra teclas ni capturas de pantalla.",
      en: "A desktop app for teams that work with AI: it tracks time and activity, organises projects and tasks, and writes natural-language reports whose figures come from SQL, not from the AI. It works offline and never logs keystrokes or screenshots.",
    },
    stack: ["Tauri", "Rust", "React", "TypeScript", "Supabase"],
    role: { es: "Diseño y desarrollo completo", en: "Design and full development" },
    collaboration: "solo",
    cover: cover("project-pulso.png", 1280, 800, "Tablero de proyecto en Pulso", "Project board in Pulso"),
    githubUrl: "https://github.com/StehvenObandoUcc/app-escritorio",
    demo: { kind: "exe", url: "https://github.com/StehvenObandoUcc/app-escritorio/releases/latest" },
  },
  {
    id: "smartwatch",
    title: { es: "Recuerda", en: "Recuerda" },
    platforms: ["wearable", "web", "backend"],
    description: {
      es: "Recordatorios de medicamentos: una app Wear OS independiente que suena a la hora de cada dosis y funciona sin internet, un panel web para quien cuida y una API que genera el plan de dosis y envía avisos.",
      en: "Medication reminders: a standalone Wear OS app that rings at each dose and works offline, a web dashboard for caregivers, and an API that builds the dose plan and sends alerts.",
    },
    stack: ["Kotlin", "Jetpack Compose (Wear OS)", "React", "FastAPI", "PostgreSQL"],
    role: {
      es: "Configuración del entorno de backend, API + worker e interfaz del reloj",
      en: "Backend environment setup, API + worker, and the watch UI",
    },
    collaboration: "team",
    cover: cover("project-recuerda.webp", 1440, 900, "Panel web de Recuerda con la adherencia de 7 días", "Recuerda web dashboard showing 7-day adherence"),
    githubUrl: "https://github.com/StehvenObandoUcc/front-smartwatch",
    demo: { kind: "demo", url: "https://front-smartwatch.vercel.app" },
  },
  {
    id: "mobile-app",
    title: { es: "Food AI", en: "Food AI" },
    platforms: ["mobile", "backend"],
    description: {
      es: "App móvil que reconoce con IA los alimentos de tu nevera a partir de una foto, avisa de los vencimientos y sugiere recetas con lo que ya tienes. Con su propia API REST.",
      en: "A mobile app that recognises the food in your fridge from a photo with AI, warns about expiry dates and suggests recipes with what you already have. With its own REST API.",
    },
    stack: ["React Native", "Expo", "TypeScript", "FastAPI", "Supabase"],
    role: { es: TODO, en: TODO },
    collaboration: TODO,
    context: { es: "Proyecto de curso · en desarrollo", en: "Course project · in progress" },
    cover: placeholder("mobile-app", "Captura de Food AI (pendiente)", "Food AI screenshot (pending)"),
    githubUrl: "https://github.com/StehvenObandoUcc/App-mobile-front",
    demo: { kind: "apk", url: TODO },
  },
  {
    id: "veltro",
    title: { es: "Veltro ERP & POS", en: "Veltro ERP & POS" },
    platforms: ["web"],
    description: {
      es: "Frontend de un ERP con punto de venta: panel de control, terminal POS, catálogo, inventario, compras y proveedores, con permisos por rol (administrador, bodega y caja).",
      en: "Frontend for an ERP with a point of sale: dashboard, POS terminal, catalogue, inventory, purchasing and suppliers, with role-based access (admin, warehouse and cashier).",
    },
    stack: ["React", "TypeScript", "React Query", "Zustand", "Framer Motion"],
    role: { es: "Frontend, en un equipo de tres", en: "Frontend, in a team of three" },
    collaboration: "team",
    cover: cover("project-veltro.png", 1920, 922, "Panel de control de Veltro", "Veltro dashboard"),
    githubUrl: "https://github.com/StehvenObandoUcc/FrontendVeltro",
    demo: { kind: "demo", url: TODO },
  },
  {
    id: "huellas",
    title: { es: "Huellas de la guerra", en: "Huellas de la guerra" },
    platforms: ["web"],
    description: {
      es: "Documental web con narrativa por scroll sobre los animales en el conflicto armado en Colombia, en español e inglés, publicado como sitio estático.",
      en: "A scroll-driven web documentary about animals in Colombia's armed conflict, in Spanish and English, published as a static site.",
    },
    stack: ["GSAP", "Vercel"],
    role: { es: TODO, en: TODO },
    collaboration: TODO,
    cover: cover("project-huellas.jpg", 1440, 900, "Portada de Huellas de la guerra", "Huellas de la guerra cover page"),
    githubUrl: "https://github.com/StehvenObandoUcc/huellas-de-la-guerra",
    demo: { kind: "demo", url: "https://huellas-de-la-guerra.vercel.app" },
  },
  {
    id: "video-game",
    title: { es: "Descending to my Heaven", en: "Descending to my Heaven" },
    platforms: ["desktop"],
    description: {
      es: "Videojuego boss rush en 3D y tercera persona, con combate estilo soulslike y estética PSX: tres jefes con IA táctica, controles reasignables, mando de Xbox y español o inglés.",
      en: "A third-person 3D boss rush with soulslike combat and a PSX look: three bosses with tactical AI, remappable controls, Xbox controller support and Spanish or English.",
    },
    stack: ["Godot", "GDScript"],
    role: { es: TODO, en: TODO },
    collaboration: "team",
    context: {
      es: "Proyecto de curso · con David Alejandro Aza Jojoa y Paula Sofía Gonzales Zambrano",
      en: "Course project · with David Alejandro Aza Jojoa and Paula Sofía Gonzales Zambrano",
    },
    cover: cover("project-video-game.jpg", 1268, 714, "Menú principal de Descending to my Heaven", "Descending to my Heaven main menu"),
    githubUrl: "https://github.com/SoFzzz/Descending-to-my-Heaven",
    demo: { kind: "exe", url: "https://github.com/SoFzzz/Descending-to-my-Heaven/releases/tag/v1.0.0-rc1" },
  },
];
