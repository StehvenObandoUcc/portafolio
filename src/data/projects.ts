import { TODO, type ImageAsset, type Project } from "./types";

/**
 * Covers are 16:10 placeholders. TODO: replace each with a real
 * screenshot (.webp, ≤ 250 KB) and update `src` to the new file.
 */
const cover = (id: string, es: string, en: string): ImageAsset => ({
  src: `/images/project-${id}.svg`,
  width: 1600,
  height: 1000,
  alt: { es, en },
});

export const projects: Project[] = [
  {
    id: "pulso",
    featured: true,
    title: { es: "Pulso", en: "Pulso" },
    platforms: ["desktop"],
    description: {
      es: "App de escritorio para que los equipos registren el trabajo hecho con IA: tiempo y actividad, tareas, monitoreo del uso de IA y reportes generados con IA. Interfaz bilingüe ES/EN y tu propia API key, con un plan gratuito.",
      en: "A desktop app for teams to track work done with AI: time and activity, tasks, AI-usage monitoring and AI-generated reports. Bilingual ES/EN interface and bring-your-own API key, with a free tier.",
    },
    stack: ["Tauri", "React", "TypeScript", "Rust", "SQLite"],
    role: { es: TODO, en: TODO },
    collaboration: TODO,
    cover: cover("pulso", "Captura de Pulso (pendiente)", "Pulso screenshot (pending)"),
    githubUrl: "https://github.com/StehvenObandoUcc/app-escritorio",
    demo: { kind: "exe", url: TODO },
  },
  {
    id: "smartwatch",
    title: { es: "App para smartwatch", en: "Smartwatch app" },
    platforms: ["wearable", "backend"],
    description: {
      es: "App para Wear OS probada en un Galaxy Watch, con una API y un worker de backend desplegados en Heroku.",
      en: "A Wear OS app tested on a Galaxy Watch, with a backend API and worker deployed on Heroku.",
    },
    stack: ["Kotlin", "Jetpack Compose (Wear OS)", "Heroku"],
    role: {
      es: "Configuración del entorno de backend, API + worker e interfaz del reloj",
      en: "Backend environment setup, API + worker, and the watch UI",
    },
    collaboration: "team",
    cover: cover("smartwatch", "Captura de la app para smartwatch (pendiente)", "Smartwatch app screenshot (pending)"),
    githubUrl: TODO,
    demo: { kind: "apk", url: TODO },
  },
  {
    id: "geofen",
    title: { es: "GeoFen API", en: "GeoFen API" },
    platforms: ["backend"],
    description: {
      es: "API REST en NestJS para una app de lista de compras que muestra las tiendas cercanas que tienen tus productos, con comparación de precios.",
      en: "A NestJS REST API for a shopping-list app that shows nearby stores carrying your products, with price comparison.",
    },
    stack: ["NestJS", "TypeScript"],
    role: { es: TODO, en: TODO },
    collaboration: TODO,
    cover: cover("geofen", "Captura de GeoFen API (pendiente)", "GeoFen API screenshot (pending)"),
    githubUrl: TODO,
    demo: { kind: "demo", url: TODO },
  },
  {
    id: "serverless-images",
    title: { es: "Procesamiento de imágenes serverless", en: "Serverless image processing" },
    platforms: ["cloud"],
    description: {
      es: "Sitio estático en S3 y una Lambda (Node.js + sharp) que procesa las imágenes subidas entre buckets, con roles IAM de mínimo privilegio.",
      en: "A static site on S3 and a Lambda (Node.js + sharp) that processes uploaded images between buckets, with least-privilege IAM roles.",
    },
    stack: ["AWS S3", "AWS Lambda", "IAM", "Node.js"],
    role: { es: TODO, en: TODO },
    collaboration: TODO,
    cover: cover("serverless-images", "Diagrama del pipeline serverless (pendiente)", "Serverless pipeline diagram (pending)"),
    githubUrl: TODO,
    demo: { kind: "demo", url: TODO },
  },
  {
    id: "load-sizing",
    title: { es: "Dimensionamiento de carga de una API REST", en: "Load sizing of a REST API" },
    platforms: ["backend"],
    description: {
      es: "Dimensionamiento de una carga de trabajo real para una API REST en Flask + SQLite que corre en Docker.",
      en: "Sizing a real workload for a Flask + SQLite REST API running in Docker.",
    },
    stack: ["Flask", "SQLite", "Docker"],
    role: { es: TODO, en: TODO },
    collaboration: "pair",
    context: { es: "Curso de Arquitectura de Computadores", en: "Computer Architecture course" },
    cover: cover("load-sizing", "Gráfica de la prueba de carga (pendiente)", "Load test chart (pending)"),
    githubUrl: TODO,
    demo: { kind: "demo", url: TODO },
  },
  {
    // TODO: real project name, description, stack, role and links.
    id: "mobile-app",
    title: { es: "App móvil", en: "Mobile app" },
    platforms: ["mobile"],
    description: { es: TODO, en: TODO },
    stack: [],
    role: { es: TODO, en: TODO },
    collaboration: TODO,
    context: { es: "Proyecto de curso", en: "Course project" },
    cover: cover("mobile-app", "Captura de la app móvil (pendiente)", "Mobile app screenshot (pending)"),
    githubUrl: TODO,
    demo: { kind: "apk", url: TODO },
  },
  {
    // TODO: real project name, platform, description, stack, role and links.
    id: "video-game",
    title: { es: "Videojuego", en: "Video game" },
    platforms: [],
    description: { es: TODO, en: TODO },
    stack: [],
    role: { es: TODO, en: TODO },
    collaboration: TODO,
    context: { es: "Proyecto de curso", en: "Course project" },
    cover: cover("video-game", "Captura del videojuego (pendiente)", "Video game screenshot (pending)"),
    githubUrl: TODO,
    demo: { kind: "demo", url: TODO },
  },
];
