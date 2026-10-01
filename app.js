import { initLanguage } from "./src/js/i18n.js";
import { initNavigation } from "./src/js/navigation.js";
import { initTheme } from "./src/js/theme.js";
import { createTypewriter } from "./src/js/typewriter.js";

initTheme();
initNavigation();
const animateSubtitle = createTypewriter(document.getElementById("home-subtitle"));
initLanguage((messages) => animateSubtitle(messages["home.subtitle"]));
