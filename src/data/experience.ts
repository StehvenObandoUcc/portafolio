import { TODO, type Course, type Degree, type ExperienceItem } from "./types";

/**
 * Technical work: the apps in projects.ts count as technical experience.
 * TODO: confirm each role and period.
 */
export const technicalExperience: ExperienceItem[] = [
  {
    id: "pulso",
    projectId: "pulso",
    role: { es: TODO, en: TODO },
    organization: { es: "Pulso · app de escritorio", en: "Pulso · desktop app" },
    period: { es: TODO, en: TODO },
    stack: ["Tauri", "React", "TypeScript", "Rust", "SQLite"],
    outcomes: {
      es: [
        "Registro de tiempo, tareas y uso de IA con reportes generados por IA.",
        "Interfaz bilingüe ES/EN con API key propia y plan gratuito.",
      ],
      en: [
        "Time, task and AI-usage tracking with AI-generated reports.",
        "Bilingual ES/EN interface with bring-your-own API key and a free tier.",
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
    organization: { es: "App para Wear OS", en: "Wear OS app" },
    period: { es: TODO, en: TODO },
    stack: ["Kotlin", "Jetpack Compose (Wear OS)", "Heroku"],
    outcomes: {
      es: [
        "Configuré el entorno de backend y construí la API y el worker desplegados en Heroku.",
        "Construí la interfaz del reloj, probada en un Galaxy Watch.",
      ],
      en: [
        "Set up the backend environment and built the API and worker deployed on Heroku.",
        "Built the watch UI, tested on a Galaxy Watch.",
      ],
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
