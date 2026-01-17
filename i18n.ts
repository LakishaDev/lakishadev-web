export const locales = ["en", "sr", "sr-Cyrl"] as const;
export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];
