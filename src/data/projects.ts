import { TODO, type ImageAsset, type Project } from "./types";

/** Covers and gallery shots are real screenshots from each repository. */
const cover = (file: string, width: number, height: number, es: string, en: string): ImageAsset => ({
  src: `/images/${file}`,
  width,
  height,
  alt: { es, en },
});

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
    stack: ["Tauri", "Rust", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "React Query", "Vite", "Vitest"],
    role: { es: "Diseño y desarrollo completo", en: "Design and full development" },
    collaboration: "solo",
    cover: cover("project-pulso.png", 1280, 800, "Tablero de proyecto en Pulso", "Project board in Pulso"),
    gallery: [
      cover("projects/pulso/11-mi-dia-temporizador.png", 1280, 800, "Mi día con el temporizador de tarea", "My day with the task timer"),
      cover("projects/pulso/14-mi-dia-por-app.png", 1280, 1281, "Tiempo por aplicación", "Time per app"),
      cover("projects/pulso/18-reportes.png", 1280, 800, "Reportes generados con IA", "AI-generated reports"),
      cover("projects/pulso/27-equipo-general.png", 1280, 1224, "Vista general del equipo", "Team overview"),
      cover("projects/pulso/37-revision-detalle.png", 1280, 1280, "Detalle de una revisión de tarea", "Task review detail"),
    ],
    caseStudy: {
      // From the repository's README, docs/IA.md and ADR-0022.
      challenge: {
        es: "Los equipos pequeños que trabajan con IA no saben en qué se les va el tiempo, y las herramientas que lo miden terminan vigilando a las personas. Además, si una IA redacta los reportes, puede inventarse las cifras.",
        en: "Small teams that work with AI don't know where their time goes, and the tools that measure it end up watching people. And if an AI writes the reports, it can make up the numbers.",
      },
      solution: [
        {
          es: "Un núcleo en Rust registra la actividad en el propio computador: los títulos de ventana se guardan cifrados ahí y a la nube solo suben los totales. No se registran teclas ni capturas.",
          en: "A Rust core records activity on the computer itself: window titles stay there encrypted and only totals go to the cloud. No keystrokes, no screenshots.",
        },
        {
          es: "Cada rol (propietario, administrador, miembro, observador) ve solo lo suyo, y esos permisos los aplica la base de datos con políticas RLS en Supabase.",
          en: "Each role (owner, admin, member, observer) sees only what it should, and the database enforces it with RLS policies in Supabase.",
        },
        {
          es: "Las cifras de los reportes las calcula SQL antes de llamar a la IA. La IA solo redacta; un validador revisa su respuesta y, si falla, el reporte sale de una plantilla sin IA. En pantalla los números siempre vienen de los datos.",
          en: "SQL computes the report's figures before the AI is called. The AI only writes the text; a validator checks its answer and, if it fails, the report falls back to a template with no AI. The numbers on screen always come from the data.",
        },
      ],
    },
    githubUrl: "https://github.com/StehvenObandoUcc/app-escritorio",
    demo: { kind: "exe", url: "https://github.com/StehvenObandoUcc/app-escritorio/releases/latest" },
  },
  {
    id: "smartwatch",
    title: { es: "Recuerda", en: "Recuerda" },
    platforms: ["wearable", "web", "backend"],
    description: {
      es: "Recordatorios de medicamentos en el reloj: una app Wear OS independiente que suena a la hora de cada dosis, funciona sin internet y responde por voz sobre el plan. La acompañan un panel web para quien cuida y una API que genera el plan y envía avisos.",
      en: "Medication reminders on the wrist: a standalone Wear OS app that rings at each dose, works offline and answers spoken questions about the plan. A web dashboard for caregivers and an API that builds the plan and sends alerts back it up.",
    },
    stack: ["Kotlin", "Jetpack Compose (Wear OS)", "React", "TypeScript", "Tailwind CSS", "React Query", "FastAPI", "PostgreSQL", "Heroku", "Vitest"],
    role: {
      es: "Configuración del entorno de backend, API + worker e interfaz del reloj",
      en: "Backend environment setup, API + worker, and the watch UI",
    },
    collaboration: "team",
    // The watch is the product; the web dashboard comes after it.
    cover: cover("projects/recuerda/portada-relojes.png", 1318, 690, "Tres pantallas del reloj: dosis de hoy, próxima dosis y alerta", "Three watch screens: today's doses, next dose and an alert"),
    gallery: [
      cover("projects/recuerda/reloj-es-inicio-reloj.png", 492, 690, "Reloj: la próxima dosis y cuánto falta", "Watch: the next dose and how long until it"),
      cover("projects/recuerda/reloj-es-alerta-reloj.png", 492, 690, "Reloj: alerta de una dosis", "Watch: dose alert"),
      cover("projects/recuerda/reloj-es-hoy-reloj.png", 492, 690, "Reloj: dosis de hoy", "Watch: today's doses"),
      cover("projects/recuerda/reloj-es-mes-reloj.png", 492, 690, "Reloj: adherencia del mes", "Watch: this month's adherence"),
      cover("projects/recuerda/reloj-es-asistente-respuesta-reloj.png", 492, 690, "Reloj: respuesta del asistente por voz", "Watch: voice assistant reply"),
      cover("projects/recuerda/reloj-es-vincular-reloj.png", 492, 690, "Reloj: código para vincularlo al panel web", "Watch: code to link it to the web dashboard"),
      cover("project-recuerda.webp", 1440, 900, "Panel web de Recuerda con la adherencia de 7 días", "Recuerda web dashboard showing 7-day adherence"),
      cover("projects/recuerda/hoy-escritorio-light-es.webp", 1440, 900, "Panel web: dosis de hoy", "Web dashboard: today's doses"),
      cover("projects/recuerda/medicamentos-escritorio-light-es.webp", 1440, 900, "Panel web: medicamentos", "Web dashboard: medications"),
    ],
    caseStudy: {
      // From the repository's README.
      challenge: {
        es: "Quien toma medicación necesita que el aviso suene a su hora aunque no tenga internet, y quien lo cuida necesita saber si cada dosis se tomó, sin depender de un teléfono.",
        en: "Someone on medication needs the reminder to ring on time even without internet, and their caregiver needs to know whether each dose was taken, without relying on a phone.",
      },
      solution: [
        {
          es: "El reloj descarga el plan de 7 días, lo guarda en Room y programa una alarma exacta por dosis: sin conexión sigue sonando.",
          en: "The watch downloads a 7-day plan, stores it in Room and sets an exact alarm for each dose, so it keeps ringing offline.",
        },
        {
          es: "Tomada, pospuesta u omitida se guarda al momento con un id único y se sube en lote cuando vuelve la red; la API es idempotente, así que reintentar nunca duplica una dosis.",
          en: "Taken, snoozed or skipped is saved at once with a unique id and uploaded in a batch when the network is back; the API is idempotent, so a retry never duplicates a dose.",
        },
        {
          es: "El reloj se vincula escribiendo en el panel web un código corto que muestra el reloj, sin teclado. Si una dosis no se registra, el backend avisa por Telegram o correo.",
          en: "The watch is linked by typing a short code it shows into the web dashboard, with no keyboard on the watch. If a dose goes unrecorded, the backend sends an alert by Telegram or email.",
        },
      ],
    },
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
    stack: ["React Native", "Expo", "Expo Router", "TypeScript", "FastAPI", "Supabase"],
    role: { es: TODO, en: TODO },
    collaboration: TODO,
    context: { es: "Proyecto de curso · en desarrollo", en: "Course project · in progress" },
    cover: cover("projects/foodai/cover.png", 1200, 750, "Tres pantallas de Food AI: despensa, inicio y recetas", "Three Food AI screens: pantry, home and recipes"),
    gallery: [
      cover("projects/foodai/claro-02-despensa.jpg", 540, 1200, "Despensa con los alimentos y sus vencimientos", "Pantry with items and expiry dates"),
      cover("projects/foodai/claro-01-inicio.jpg", 540, 1200, "Pantalla de inicio", "Home screen"),
      cover("projects/foodai/claro-04-recetas.jpg", 540, 1200, "Recetas sugeridas con lo que tienes", "Recipes suggested from what you have"),
      cover("projects/foodai/claro-05-detalle-receta.jpg", 540, 1200, "Detalle de una receta", "Recipe detail"),
      cover("projects/foodai/claro-10-escaner.jpg", 540, 1200, "Escáner de alimentos con la cámara", "Food scanner with the camera"),
      cover("projects/foodai/claro-11-resultado-escaneo.jpg", 540, 1200, "Alimentos reconocidos por la IA", "Food recognised by the AI"),
      cover("projects/foodai/oscuro-01-inicio.jpg", 540, 1200, "Inicio en modo oscuro", "Home screen in dark mode"),
    ],
    caseStudy: {
      // From the repository's README.
      challenge: {
        es: "Se bota comida porque no sabemos qué hay en la nevera ni cuándo vence, y decidir qué cocinar con lo que queda toma tiempo.",
        en: "Food gets thrown away because we don't know what's in the fridge or when it expires, and deciding what to cook with what's left takes time.",
      },
      solution: [
        {
          es: "Basta una foto: la API la analiza con IA y devuelve cada alimento con su nivel de confianza. Los dudosos llegan sin marcar para que el usuario los confirme o corrija.",
          en: "One photo is enough: the API analyses it with AI and returns each item with a confidence level. Uncertain ones arrive unchecked so the user confirms or corrects them.",
        },
        {
          es: "Cada fecha de vencimiento dice de dónde salió (la etiqueta, el usuario o una estimación) y la app programa avisos locales antes de que algo se dañe.",
          en: "Each expiry date says where it came from (the label, the user or an estimate), and the app schedules local alerts before anything goes off.",
        },
        {
          es: "Las recetas se comparan con la despensa en el teléfono («Tienes todo», «Te falta 1»), y todo funciona sin conexión: los cambios esperan en una cola con reintentos hasta que vuelve la red.",
          en: "Recipes are checked against the pantry on the phone (\u201cYou have everything\u201d, \u201cYou're missing 1\u201d), and it all works offline: changes wait in a retrying queue until the network is back.",
        },
      ],
    },
    githubUrl: "https://github.com/StehvenObandoUcc/App-mobile-front",
    // Pre-release, so releases/latest would not resolve to it.
    demo: { kind: "apk", url: "https://github.com/StehvenObandoUcc/App-mobile-front/releases/tag/v1.0.0-apk" },
  },
  {
    id: "veltro",
    title: { es: "Veltro ERP & POS", en: "Veltro ERP & POS" },
    platforms: ["web"],
    description: {
      es: "Frontend de un ERP con punto de venta: panel de control, terminal POS, catálogo, inventario, compras y proveedores, con permisos por rol (administrador, bodega y caja).",
      en: "Frontend for an ERP with a point of sale: dashboard, POS terminal, catalogue, inventory, purchasing and suppliers, with role-based access (admin, warehouse and cashier).",
    },
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "React Query", "Zustand", "React Hook Form", "Zod", "Framer Motion", "Vitest"],
    role: { es: "Frontend, en un equipo de tres", en: "Frontend, in a team of three" },
    collaboration: "team",
    context: {
      es: "Con David Alejandro Aza Jojoa y Paula Sofía Gonzales Zambrano",
      en: "With David Alejandro Aza Jojoa and Paula Sofía Gonzales Zambrano",
    },
    cover: cover("project-veltro.png", 1920, 922, "Panel de control de Veltro", "Veltro dashboard"),
    gallery: [
      cover("projects/veltro/pos.jpg", 1600, 724, "Terminal de punto de venta", "Point-of-sale terminal"),
      cover("projects/veltro/reporte.png", 1547, 904, "Reporte de ventas", "Sales report"),
      cover("projects/veltro/alerta.png", 1423, 677, "Alertas de inventario", "Inventory alerts"),
    ],
    githubUrl: "https://github.com/StehvenObandoUcc/FrontendVeltro",
    demo: { kind: "demo", url: TODO },
  },
  {
    id: "video-game",
    title: { es: "Descending to my Heaven", en: "Descending to my Heaven" },
    platforms: ["desktop"],
    description: {
      es: "Videojuego boss rush en 3D y tercera persona, con combate estilo soulslike y estética PSX: tres jefes con IA táctica, controles reasignables, mando de Xbox y español o inglés.",
      en: "A third-person 3D boss rush with soulslike combat and a PSX look: three bosses with tactical AI, remappable controls, Xbox controller support and Spanish or English.",
    },
    stack: ["Godot", "GDScript", "GDShader"],
    role: { es: TODO, en: TODO },
    collaboration: "team",
    context: {
      es: "Proyecto de curso · en desarrollo · con David Alejandro Aza Jojoa y Paula Sofía Gonzales Zambrano",
      en: "Course project · in progress · with David Alejandro Aza Jojoa and Paula Sofía Gonzales Zambrano",
    },
    cover: cover("project-video-game.jpg", 1268, 714, "Menú principal de Descending to my Heaven", "Descending to my Heaven main menu"),
    coverFill: true,
    gallery: [
      cover("projects/game/juego2.jpg", 1285, 709, "Menú de pausa en el juego", "In-game pause menu"),
      cover("projects/game/juego3.jpg", 875, 495, "Captura del juego", "Gameplay screenshot"),
      cover("projects/game/juego4.jpg", 879, 446, "Captura del juego", "Gameplay screenshot"),
    ],
    githubUrl: "https://github.com/SoFzzz/Descending-to-my-Heaven",
    // Pre-release, so releases/latest would not resolve to it.
    demo: { kind: "exe", url: "https://github.com/SoFzzz/Descending-to-my-Heaven/releases/tag/v1.0.0-rc1" },
  },
];
