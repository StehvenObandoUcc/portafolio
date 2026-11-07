import { TODO, type Course, type Degree, type ExperienceItem } from "./types";

/**
 * Technical work: the apps in projects.ts count as technical experience.
 * Periods follow each repository's activity on GitHub. TODO: role and period for GeoFen, serverless and load sizing.
 */
export const technicalExperience: ExperienceItem[] = [
  {
    id: "pulso",
    projectId: "pulso",
    role: { es: "Diseño y desarrollo completo", en: "Design and full development" },
    organization: { es: "Pulso · app de escritorio", en: "Pulso · desktop app" },
    period: { es: "oct 2026 — hoy", en: "Oct 2026 — now" },
    stack: ["Tauri", "Rust", "React", "TypeScript", "Supabase"],
    outcomes: {
      es: [
        "Publiqué instaladores para Windows, macOS y Linux (versión 0.1.3).",
        "Los reportes con IA solo citan cifras calculadas en SQL, y los permisos por rol viven en políticas RLS de Postgres.",
      ],
      en: [
        "Shipped installers for Windows, macOS and Linux (version 0.1.3).",
        "AI reports only quote figures computed in SQL, and role permissions live in Postgres RLS policies.",
      ],
    },
  },
  {
    id: "smartwatch",
    projectId: "smartwatch",
    role: {
      es: "Backend e interfaz del reloj (equipo)",
      en: "Backend and watch UI (team)",
    },
    organization: { es: "Recuerda · Wear OS y panel web", en: "Recuerda · Wear OS and web dashboard" },
    period: { es: "sep 2026 — nov 2026", en: "Sep 2026 — Nov 2026" },
    stack: ["Kotlin", "Jetpack Compose (Wear OS)", "FastAPI", "PostgreSQL", "Heroku"],
    outcomes: {
      es: [
        "Configuré el entorno de backend y construí la API y el worker desplegados en Heroku.",
        "Construí la interfaz del reloj, probada en un Galaxy Watch4.",
      ],
      en: [
        "Set up the backend environment and built the API and worker deployed on Heroku.",
        "Built the watch UI, tested on a Galaxy Watch4.",
      ],
    },
  },
  {
    id: "food-ai",
    projectId: "mobile-app",
    role: { es: TODO, en: TODO },
    organization: { es: "Food AI · app móvil", en: "Food AI · mobile app" },
    period: { es: "sep 2026 — oct 2026", en: "Sep 2026 — Oct 2026" },
    stack: ["React Native", "Expo", "FastAPI", "Supabase"],
    outcomes: {
      es: ["App que reconoce alimentos desde una foto con un modelo de visión y sugiere recetas, con su API desplegada en Heroku."],
      en: ["App that recognises food from a photo with a vision model and suggests recipes, with its API deployed on Heroku."],
    },
  },
  {
    id: "veltro",
    projectId: "veltro",
    role: { es: "Frontend (equipo de tres)", en: "Frontend (team of three)" },
    organization: { es: "Veltro ERP & POS", en: "Veltro ERP & POS" },
    period: { es: "mar 2026 — may 2026", en: "Mar 2026 — May 2026" },
    stack: ["React", "TypeScript", "React Query", "Zustand"],
    outcomes: {
      es: ["Interfaz de ERP y punto de venta con módulos y permisos por rol (administrador, bodega y caja)."],
      en: ["ERP and point-of-sale interface with modules and role-based access (admin, warehouse and cashier)."],
    },
  },
  {
    id: "huellas",
    projectId: "huellas",
    role: { es: TODO, en: TODO },
    organization: { es: "Huellas de la guerra · documental web", en: "Huellas de la guerra · web documentary" },
    period: { es: "oct 2026", en: "Oct 2026" },
    stack: ["GSAP", "Vercel"],
    outcomes: {
      es: ["Sitio de narrativa por scroll en español e inglés, publicado en Vercel."],
      en: ["Scroll-driven storytelling site in Spanish and English, published on Vercel."],
    },
  },
  {
    id: "geofen",
    projectId: "geofen",
    role: { es: TODO, en: TODO },
    organization: { es: "GeoFen API", en: "GeoFen API" },
    period: { es: TODO, en: TODO },
    stack: ["NestJS", "TypeScript"],
    outcomes: {
      es: ["API REST que encuentra tiendas cercanas con tus productos y compara precios."],
      en: ["REST API that finds nearby stores carrying your products and compares prices."],
    },
  },
  {
    id: "serverless-images",
    projectId: "serverless-images",
    role: { es: TODO, en: TODO },
    organization: { es: "Procesamiento de imágenes serverless", en: "Serverless image processing" },
    period: { es: TODO, en: TODO },
    stack: ["AWS S3", "AWS Lambda", "IAM", "Node.js"],
    outcomes: {
      es: ["Pipeline de imágenes entre buckets de S3 con roles IAM de mínimo privilegio."],
      en: ["Image pipeline between S3 buckets with least-privilege IAM roles."],
    },
  },
  {
    id: "load-sizing",
    projectId: "load-sizing",
    role: { es: TODO, en: TODO },
    organization: {
      es: "Arquitectura de Computadores · en pareja",
      en: "Computer Architecture · pair work",
    },
    period: { es: TODO, en: TODO },
    stack: ["Flask", "SQLite", "Docker"],
    outcomes: {
      es: ["Dimensionamos una carga de trabajo real para una API REST en Flask + SQLite sobre Docker."],
      en: ["Sized a real workload for a Flask + SQLite REST API running in Docker."],
    },
  },
];

export const degree: Degree = {
  title: { es: "Ingeniería de Software", en: "Software Engineering" },
  institution: {
    es: "Universidad Cooperativa de Colombia",
    en: "Universidad Cooperativa de Colombia",
  },
  campus: { es: "Campus Pasto", en: "Pasto campus" },
  currentSemester: 5,
  totalSemesters: 8,
};

/**
 * Show the "Courses & certificates" grid in the Academic tab.
 * Hidden until the certificates are ready: set to true to publish it.
 */
export const showCourses = false;

/** Courses and certificates. TODO: add certificate links when available. */
export const courses: Course[] = [
  {
    id: "jornadas-cloud",
    title: {
      es: "Jornadas Cloud: Serverless AWS (Lambda, API Gateway, S3, DynamoDB)",
      en: "Jornadas Cloud: Serverless AWS (Lambda, API Gateway, S3, DynamoDB)",
    },
    issuer: "Commit Academy",
    status: "completed",
    date: "2026-09",
    certificateUrl: TODO,
  },
  {
    id: "marketing-ia",
    title: {
      es: "Curso de Marketing Digital con IA",
      en: "Digital Marketing with AI course",
    },
    issuer: "BIG school",
    status: "completed",
    date: "2026-09",
    certificateUrl: TODO,
  },
  {
    id: "tailwind",
    title: { es: "Tailwind CSS: de cero a experto", en: "Tailwind CSS: de cero a experto" },
    issuer: "Udemy",
    status: "inProgress",
    date: null,
  },
  {
    id: "github-foundations",
    title: { es: "GitHub Foundations", en: "GitHub Foundations" },
    issuer: "Avanzatec / MinTIC",
    status: "inProgress",
    date: null,
  },
  {
    id: "ai-plus",
    title: { es: "AI+ Foundation", en: "AI+ Foundation" },
    issuer: "Avanzatec / MinTIC",
    status: "inProgress",
    date: null,
  },
  {
    id: "networking-basics",
    title: { es: "Networking Basics", en: "Networking Basics" },
    issuer: "Cisco Networking Academy",
    status: "inProgress",
    date: null,
  },
  {
    id: "intro-cybersecurity",
    title: { es: "Introduction to Cybersecurity", en: "Introduction to Cybersecurity" },
    issuer: "Cisco Networking Academy",
    status: "inProgress",
    date: null,
  },
];
