import type { Locale } from "@/data/types";
import type { Dictionary } from "@/data/i18n/es";

export const locales = ["es", "en"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "es";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import("@/data/i18n/es").then((module) => module.es),
  en: () => import("@/data/i18n/en").then((module) => module.en),
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

/** Replaces {placeholders} in a dictionary string. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/** Picks the preferred supported locale from an Accept-Language header. */
export function matchLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const quality = params.find((p) => p.trim().startsWith("q="));
      return { lang: tag.toLowerCase().split("-")[0], q: quality ? Number(quality.split("=")[1]) : 1 };
    })
    .filter((entry) => entry.lang && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);
  const match = ranked.find((entry) => hasLocale(entry.lang));
  return match ? (match.lang as Locale) : defaultLocale;
}
