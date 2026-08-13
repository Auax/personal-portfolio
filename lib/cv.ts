import type { Locale } from "@/lib/i18n";

const cvByLocale: Record<Locale, { href: string; filename: string }> = {
  en: {
    href: "/cv/ibai-farina-cv-en.pdf",
    filename: "Ibai-Farina-CV-English.pdf",
  },
  es: {
    href: "/cv/ibai-farina-cv-es.pdf",
    filename: "Ibai-Farina-CV-ES.pdf",
  },
};

export function getCvForLocale(locale: Locale) {
  return cvByLocale[locale];
}
