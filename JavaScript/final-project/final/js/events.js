let allEvents = [];

function renderEvents(list) {
    const container = document.querySelector("#events");
    const status = document.querySelector("#events-status");
    container.textContent = "";

    for (const item of list) {
        const card = document.createElement("article");
        card.classList.add("event");
        card.dataset.category = item.category;

        const title = document.createElement("h3");
        title.textContent = item.title;

        const date = document.createElement("p");
        date.classList.add("event__date");
        date.textContent = item.date;

        card.append(title, date);
        container.append(card);
    }

    status.textContent = list.length === 0
        ? "В этой категории пока нет событий"
        : `Показано: ${list.length}`;
}

function applyFilter(category) {
    const list = category === "all"
        ? allEvents
        : allEvents.filter((item) => item.category === category);
    renderEvents(list);
}

export async function initEvents() {
    const container = document.querySelector("#events");
    const filters = document.querySelector(".filters");
    const status = document.querySelector("#events-status");
    if (!container || !filters || !status) {
        return;
    }

    filters.addEventListener("click", (event) => {
        const button = event.target.closest("[data-filter]");
        if (!button) {
            return;
        }
        for (const other of filters.querySelectorAll("[data-filter]")) {
            other.setAttribute("aria-pressed", String(other === button));
        }
        applyFilter(button.dataset.filter);
    });

    status.textContent = "Загрузка...";
    try {
        const response = await fetch("data/events.json");
        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}`);
        }
        allEvents = await response.json();
        applyFilter("all");
    } catch (error) {
        status.textContent = "Не удалось загрузить события. Попробуйте обновить страницу.";
        console.error(error);
    }
}
