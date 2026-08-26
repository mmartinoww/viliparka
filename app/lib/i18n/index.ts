import { bg } from "./bg";
import { en } from "./en";
import { LOCALES, type Dictionary, type Locale } from "./types";

export const DEFAULT_LOCALE: Locale = "bg";

export const dictionaries: Record<Locale, Dictionary> = { bg, en };

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export { LOCALES };
export type { Dictionary, Locale, HouseId } from "./types";
