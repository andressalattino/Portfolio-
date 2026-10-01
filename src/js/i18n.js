import { readPreference, savePreference } from "./preferences.js";
import { translations } from "./translations.js";

export function initLanguage(onChange) {
  const select = document.getElementById("language-select");
  function applyLanguage(language) {
    const locale = Object.hasOwn(translations, language) ? language : "en";
    const messages = translations[locale];
    document.documentElement.lang = locale;
    const attributes = [
      ["data-i18n", null],
      ["data-i18n-alt", "alt"],
      ["data-i18n-aria", "aria-label"],
    ];
    for (const [dataAttribute, targetAttribute] of attributes) {
      for (const element of document.querySelectorAll(`[${dataAttribute}]`)) {
        const text = messages[element.getAttribute(dataAttribute)];
        if (text === undefined) continue;
        if (targetAttribute) element.setAttribute(targetAttribute, text);
        else element.textContent = text;
      }
    }
    if (select) select.value = locale;
    onChange?.(messages);
  }
  applyLanguage(readPreference("portfolio-language") || "en");
  select?.addEventListener("change", () => {
    savePreference("portfolio-language", select.value);
    applyLanguage(select.value);
  });
}
