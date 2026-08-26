"use client";

import { LOCALES } from "../lib/i18n";
import { useLanguage } from "../lib/i18n/language-provider";
import { dictionaries } from "../lib/i18n";

export function LanguageSwitch({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const { locale, t, setLocale } = useLanguage();

  return (
    <div
      className={`lang-switch${variant === "light" ? " lang-switch--light" : ""}`}
      role="group"
      aria-label={t.actions.switchLanguage}
    >
      <span
        className={`lang-switch__thumb${locale === "en" ? " lang-switch__thumb--en" : ""}`}
        aria-hidden="true"
      />
      {LOCALES.map((option) => (
        <button
          key={option}
          type="button"
          lang={dictionaries[option].htmlLang}
          className={`lang-switch__option${
            locale === option ? " lang-switch__option--active" : ""
          }`}
          aria-pressed={locale === option}
          title={dictionaries[option].name}
          onClick={() => setLocale(option)}
        >
          {dictionaries[option].code}
        </button>
      ))}
    </div>
  );
}
