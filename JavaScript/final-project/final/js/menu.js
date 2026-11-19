export function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("#site-nav");
    if (!toggle || !nav) {
        return;
    }

    function setOpen(isOpen) {
        nav.classList.toggle("is-open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
    }

    toggle.addEventListener("click", () => {
        setOpen(!nav.classList.contains("is-open"));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && nav.classList.contains("is-open")) {
            setOpen(false);
            toggle.focus();
        }
    });
}
