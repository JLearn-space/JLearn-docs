import { initMenu } from "./menu.js";
import { initTheme } from "./theme.js";
import { initEvents } from "./events.js";
import { initContactForm } from "./form.js";

// Прогрессивное улучшение: правила, скрывающие содержимое, действуют только с классом js
document.documentElement.classList.add("js");

initMenu();
initTheme();
initEvents();
initContactForm();
