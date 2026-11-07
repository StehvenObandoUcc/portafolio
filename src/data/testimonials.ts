import { TODO, type Testimonial } from "./types";

/**
 * SOURCE RULE: only teachers, team leads or industry contacts.
 * Never family, never classmates, never invented or paraphrased.
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
    quote: { es: TODO, en: TODO },
    name: TODO,
    role: { es: TODO, en: TODO },
    organization: TODO,
    linkedinUrl: TODO,
  },
  {
    id: "testimonial-3",
    quote: { es: TODO, en: TODO },
    name: TODO,
    role: { es: TODO, en: TODO },
    organization: TODO,
    linkedinUrl: TODO,
  },
];
