import { readPreference, savePreference } from "./preferences.js";
export function initTheme() {
  const button = document.getElementById("theme-toggle");
  const root = document.documentElement;
  function applyTheme(dark) {
    root.classList.toggle("dark", dark);
    button?.setAttribute("aria-pressed", String(dark));
    button
      ?.querySelector("use")
      ?.setAttribute("href", `assets/sprites.svg#${dark ? "moon" : "sun"}`);
  }
  applyTheme(readPreference("tema") === "dark");
  button?.addEventListener("click", () => {
    const dark = !root.classList.contains("dark");
    applyTheme(dark);
    savePreference("tema", dark ? "dark" : "light");
  });
}
