import { initLanguage } from "./src/js/i18n.js";
import { initNavigation } from "./src/js/navigation.js";
import { initTheme } from "./src/js/theme.js";
import { createTypewriter } from "./src/js/typewriter.js";

// Apply the saved language before revealing any of the fallback HTML.
const animateSubtitle = createTypewriter(document.getElementById("home-subtitle"));
initLanguage((messages) => animateSubtitle(messages["home.subtitle"]));
initTheme();
document.documentElement.removeAttribute("data-preferences-pending");
document.dispatchEvent(new Event("preferences-ready"));
initNavigation();
