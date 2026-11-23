// Итоговый проект курса jQuery: сайт кружка.
// Подключение: jquery-4.1.0.min.js → jquery.char-counter.js (defer) → main.js (defer).
// Каждая функция init... сама проверяет, есть ли её элементы на текущей странице.

const THEME_KEY = "theme";
let allEvents = [];

// Мобильное меню: кнопка, Escape, возврат фокуса
function initMenu() {
    const $toggle = $(".menu-toggle");
    const $nav = $("#site-nav");
    if ($toggle.length === 0 || $nav.length === 0) {
        return;
    }

    function setOpen(isOpen) {
        $nav.toggleClass("is-open", isOpen);
        $toggle.attr("aria-expanded", String(isOpen));
    }

    $toggle.on("click", function () {
        setOpen(!$nav.hasClass("is-open"));
    });

    $(document).on("keydown", function (event) {
        if (event.key === "Escape" && $nav.hasClass("is-open")) {
            setOpen(false);
            $toggle.trigger("focus");
        }
    });
}

// Тема с сохранением в localStorage
function initTheme() {
    const $button = $(".theme-toggle");
    if ($button.length === 0) {
        return;
    }

    function applyTheme(theme) {
        const isDark = theme === "dark";
        $("body").toggleClass("theme-dark", isDark);
        $button.attr("aria-pressed", String(isDark));
    }

    applyTheme(localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light");

    $button.on("click", function () {
        const next = $("body").hasClass("theme-dark") ? "light" : "dark";
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
    });
}

// Афиша: загрузка data/events.json, фильтр, три состояния
function renderEvents(list) {
    const $container = $("#events").empty();

    for (const item of list) {
        $("<article>", { class: "event", "data-category": item.category })
            .append($("<h3>", { text: item.title }))
            .append($("<p>", { class: "event__date", text: item.date }))
            .appendTo($container);
    }

    $("#events-status").text(list.length === 0
        ? "В этой категории пока нет событий"
        : `Показано: ${list.length}`);
}

function applyFilter(category) {
    const list = category === "all"
        ? allEvents
        : allEvents.filter((item) => item.category === category);
    renderEvents(list);
}

function initEvents() {
    const $filters = $(".filters");
    const $status = $("#events-status");
    if ($("#events").length === 0 || $filters.length === 0) {
        return;
    }

    // Делегирование: один обработчик на группу кнопок
    $filters.on("click", "[data-filter]", function () {
        const $button = $(this);
        $filters.find("[data-filter]").attr("aria-pressed", "false");
        $button.attr("aria-pressed", "true");
        applyFilter($button.data("filter"));
    });

    $status.text("Загрузка...");
    $.getJSON("data/events.json")
        .done(function (events) {
            allEvents = events;
            applyFilter("all");
        })
        .fail(function (jqXHR) {
            $status.text("Не удалось загрузить события. Попробуйте обновить страницу.");
            console.error("Ошибка загрузки:", jqXHR.status);
        });
}

// Форма записи: проверка полей и доступные ошибки
function showError($input, $error, message) {
    $error.text(message).prop("hidden", false);
    $input.attr("aria-invalid", "true");
}

function clearError($input, $error) {
    $error.text("").prop("hidden", true);
    $input.removeAttr("aria-invalid");
}

function initContactForm() {
    const $form = $("#contact-form");
    if ($form.length === 0) {
        return;
    }

    const $name = $("#name");
    const $email = $("#email");
    const $message = $("#message");
    const $status = $("#form-status");

    // Свой плагин из урока 10
    $message.charCounter({ max: 200 });

    $form.on("submit", function (event) {
        event.preventDefault();
        const name = $name.val().trim();
        const email = $email.val().trim();
        const max = Number($message.data("max"));

        clearError($name, $("#name-error"));
        clearError($email, $("#email-error"));
        clearError($message, $("#message-error"));
        $status.text("");

        if (name.length < 2) {
            showError($name, $("#name-error"), "Введите имя - не короче 2 символов");
            $name.trigger("focus");
            return;
        }
        if (!email.includes("@")) {
            showError($email, $("#email-error"), "Введите email с символом @, например anna@example.com");
            $email.trigger("focus");
            return;
        }
        if ($message.val().length > max) {
            showError($message, $("#message-error"), `Сообщение длиннее ${max} символов`);
            $message.trigger("focus");
            return;
        }

        $status.text(`Спасибо, ${name}! Мы ответим на ${email}.`);
        $form[0].reset();
        $message.trigger("input");
    });
}

// Аккордеон «Частые вопросы»: открыт только один ответ
function initFaq() {
    const $faq = $(".faq");
    if ($faq.length === 0) {
        return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 0 : 200;

    $faq.on("click", ".faq__question", function () {
        const $question = $(this);
        const isOpen = $question.attr("aria-expanded") === "true";

        $faq.find(".faq__question").not($question).attr("aria-expanded", "false");
        $faq.find(".faq__answer").not($question.closest(".faq__item").find(".faq__answer"))
            .stop(true, true).slideUp(duration);

        $question.attr("aria-expanded", String(!isOpen));
        $question.closest(".faq__item").find(".faq__answer").stop(true, true).slideToggle(duration);
    });
}

// Прогрессивное улучшение: правила, скрывающие содержимое, действуют только с классом js
$("html").addClass("js");

initMenu();
initTheme();
initEvents();
initContactForm();
initFaq();
