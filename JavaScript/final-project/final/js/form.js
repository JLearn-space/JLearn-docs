function showError(input, errorElement, message) {
    errorElement.textContent = message;
    errorElement.hidden = false;
    input.setAttribute("aria-invalid", "true");
}

function clearError(input, errorElement) {
    errorElement.textContent = "";
    errorElement.hidden = true;
    input.removeAttribute("aria-invalid");
}

export function initContactForm() {
    const form = document.querySelector("#contact-form");
    if (!form) {
        return;
    }

    const nameInput = document.querySelector("#name");
    const nameError = document.querySelector("#name-error");
    const emailInput = document.querySelector("#email");
    const emailError = document.querySelector("#email-error");
    const status = document.querySelector("#form-status");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        clearError(nameInput, nameError);
        clearError(emailInput, emailError);
        status.textContent = "";

        if (name.length < 2) {
            showError(nameInput, nameError, "Введите имя - не короче 2 символов");
            nameInput.focus();
            return;
        }
        if (!email.includes("@")) {
            showError(emailInput, emailError, "Введите email с символом @, например anna@example.com");
            emailInput.focus();
            return;
        }

        status.textContent = `Спасибо, ${name}! Мы ответим на ${email}.`;
        form.reset();
    });
}
