const STORAGE_KEY = "theme";

export function initTheme() {
    const button = document.querySelector(".theme-toggle");
    if (!button) {
        return;
    }

    function applyTheme(theme) {
        const isDark = theme === "dark";
        document.body.classList.toggle("theme-dark", isDark);
        button.setAttribute("aria-pressed", String(isDark));
    }

    applyTheme(localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light");

    button.addEventListener("click", () => {
        const next = document.body.classList.contains("theme-dark") ? "light" : "dark";
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
    });
}
