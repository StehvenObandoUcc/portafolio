import { TODO, type Testimonial } from "./types";

/**
 * SOURCE RULE: only teachers, team leads or industry contacts.
 * Never family, never classmates. A quote is either the person's own
 * words or a text they explicitly approved; never published without that.
 *
 * TODO: replace the three entries below with real testimonials,
 * quoted with the person's permission. Each entry that still holds
 * "TODO" renders as a "pending" card and logs a build warning.
 */
export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    // Quoted verbatim, as he wrote it; shown in its original Spanish on /en too.
    quote: {
      es: "La rapidéz con la que llegó a poner en producción el código y su portafolio es grandioso, sigue ese camino !!!",
      en: "La rapidéz con la que llegó a poner en producción el código y su portafolio es grandioso, sigue ese camino !!!",
    },
    name: "Juan Alvarez",
    // TODO: his role and organisation (hidden until filled).
    role: { es: TODO, en: TODO },
    organization: TODO,
    linkedinUrl: "https://www.linkedin.com/in/juanalvarez123/",
  },
  {
    id: "testimonial-2",
    // Drafted for and approved by her.
    quote: {
      es: "Stehven aprende rápido y aplicó bien lo visto en clase en su API con NestJS. Es constante y cumple con su trabajo.",
      en: "Stehven learns fast and applied what we covered in class well in his NestJS API. He is consistent and delivers his work.",
    },
    name: "Ivonne Barco",
    role: { es: "Docente, electiva de NestJS", en: "Lecturer, NestJS elective" },
    organization: "Universidad Cooperativa de Colombia",
    linkedinUrl: "https://www.linkedin.com/in/ivonnebarco/",
  },
  {
    id: "testimonial-3",
    // Drafted for and approved by him. TODO: his full name (the card stays pending until it is set).
    quote: {
      es: "Stehven entiende el porqué de la arquitectura, no solo el cómo: en el dimensionamiento de carga de la API midió y justificó cada decisión con datos.",
      en: "Stehven understands the why of architecture, not just the how: when sizing the API's workload he measured and backed every decision with data.",
    },
    name: TODO,
    role: { es: "Docente de Arquitectura de Software y Computacional", en: "Lecturer, Software and Computer Architecture" },
    organization: "Universidad Cooperativa de Colombia",
    linkedinUrl: "https://www.linkedin.com/in/jamodev/",
  },
];
