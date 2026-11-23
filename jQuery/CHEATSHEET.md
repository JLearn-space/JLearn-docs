# Шпаргалка по курсу / Course cheat sheet / Kurs bo‘yicha qisqa qo‘llanma

Весь синтаксис курса jQuery 4.1 на одной странице, по урокам. Код написан по правилам курса: полная сборка jQuery и `defer`, `$` в имени переменной с jQuery-объектом, `const` по умолчанию, `===`, текст через `.text()`, обработчики через `.on()`, внешний вид через классы. Удалённые в jQuery 4 функции и устаревшие сокращения не используются.

All jQuery 4.1 course syntax on one page, by lesson. The code follows the course rules: the full jQuery build and `defer`, `$` in the name of a variable holding a jQuery object, `const` by default, `===`, text via `.text()`, handlers via `.on()`, appearance via classes. Functions removed in jQuery 4 and outdated forms are not used.

Kursdagi jQuery 4.1 sintaksisi bitta sahifada, darslar bo‘yicha. Kod kurs qoidalariga mos: jQuery’ning to‘liq yig‘masi va `defer`, jQuery obyekti saqlanadigan o‘zgaruvchi nomida `$`, standart holatda `const`, `===`, matn `.text()` orqali, ishlovchilar `.on()` orqali, ko‘rinish klasslar orqali. jQuery 4 da olib tashlangan funksiyalar va eskirgan yozuvlar ishlatilmaydi.

## 1. Знакомство с jQuery / Getting to know jQuery / jQuery bilan tanishuv

```html
<!-- в <head>: сначала jQuery, потом свой скрипт / jQuery first, then your script / avval jQuery, keyin o‘z skriptingiz -->
<script src="https://code.jquery.com/jquery-4.1.0.min.js"></script>
<script src="js/main.js" defer></script>
```

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| Проверить версию / Check the version / Versiyani tekshirish | `jQuery.fn.jquery` → `"4.1.0"` |
| Найти элементы / Find elements / Elementlarni topish | `$(".card")` |
| Сколько нашлось / How many found / Nechta topildi | `$(".card").length` |
| Прочитать / записать текст / Read / write text / Matnni o‘qish / yozish | `$el.text()` / `$el.text("Новый")` |
| Цепочка / Chain / Zanjir | `$el.text("...").addClass("is-done")` |
| Код после разбора HTML / Run after HTML is parsed / HTML tahlilidan keyin | `defer` или `$(function () { ... })` |
| jQuery → DOM / DOM → jQuery | `$el[0]` / `$(element)` |

```js
const $title = $("#title");
const $statuses = $(".lesson__status");

$title.text("Курс jQuery");                     // сеттер / setter / setter
console.log($statuses.length);                  // 3
$statuses.text("Готово").addClass("is-done");   // неявный перебор / implicit iteration / yashirin aylanib chiqish
```

## 2. Селекторы и обход DOM / Selectors and DOM traversal / Selektorlar va DOM bo‘ylab harakat

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| Прямые дети в селекторе / Direct children / Bevosita bolalar | `$("ul > li")` |
| По атрибуту / By attribute / Atribut bo‘yicha | `$('[data-status="active"]')`, `$('a[href^="https"]')` |
| Вниз / Down / Pastga | `$el.find(".x")`, `$el.children()` |
| Вверх / Up / Yuqoriga | `$el.parent()`, `$el.closest(".card")` |
| В стороны / Sideways / Yon tomonlarga | `$el.next()`, `$el.prev()`, `$el.siblings()` |
| По позиции / By position / O‘rin bo‘yicha | `.first()`, `.last()`, `.eq(1)`, `.eq(-1)` |
| Оставить / убрать / Keep / drop / Qoldirish / olib tashlash | `.filter(".active")` / `.not(".active")` |
| Проверить / Check / Tekshirish | `$el.is(".done")` → `true` / `false` |
| Собрать в массив / Collect into an array / Massivga yig‘ish | `$els.map(function () { return ...; }).get()` |

```js
const $students = $("#journal .student");
const $active = $students.filter('[data-status="active"]');

let best = 0;
$active.each(function () {
    const score = Number($(this).find(".score").text());
    if (score > best) {
        best = score;
    }
});

const names = $active.map(function () {
    return $(this).find(".name").text();
}).get();

console.log(best, names.join(", "));
```

## 3. Содержимое и атрибуты / Content and attributes / Kontent va atributlar

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| Вывести данные / Output data / Ma’lumot chiqarish | `$el.text(value)` - не `.html()` |
| Своя разметка / Your own markup / O‘z belgilashingiz | `$el.html("<b>...</b>")` - не с данными пользователя |
| Значение поля / Field value / Maydon qiymati | `$input.val()` / `$input.val("...")` |
| Атрибут / Attribute / Atribut | `$el.attr("href")`, `$el.attr("href", url)`, `$el.removeAttr("title")` |
| Несколько атрибутов / Several attributes / Bir nechta atribut | `$img.attr({ src: user.photo, alt: user.name })` |
| Свойство / Property / Xususiyat | `$cb.prop("checked")`, `$btn.prop("disabled", true)` |
| `data-*` с типом / with type / tur bilan | `$el.data("userId")` ← `data-user-id="7"` → `7` |
| Новое из старого / New from old / Eskisidan yangisi | `$el.text((index, old) => ...)` |

```js
const user = { name: "Анна", photo: "img/anna.jpg", city: "Алмалык" };

$("#profile-name").text(user.name);
$("#profile-photo").attr({ src: user.photo, alt: user.name });
$("#profile-city").text(user.city);

const userId = $("#profile").data("userId");    // число, не строка / a number / son
```

## 4. Классы и стили / Classes and styles / Klasslar va uslublar

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| Добавить / убрать / Add / remove / Qo‘shish / olib tashlash | `$el.addClass("is-active")` / `$el.removeClass("is-active")` |
| Переключить / Toggle / Almashtirish | `$el.toggleClass("is-open")` |
| По условию / By condition / Shartga ko‘ra | `$el.toggleClass("is-low", stock < limit)` |
| Есть ли класс / Has class / Klass bormi | `$el.hasClass("is-open")` |
| Прочитать / записать стиль / Read / write style / Uslubni o‘qish / yozish | `$el.css("width")` / `$el.css("width", "37%")` |
| Несколько стилей / Several styles / Bir nechta uslub | `$el.css({ top: "10px", left: "20px" })` |
| Убрать записанный стиль / Remove a written style / Yozilgan uslubni olib tashlash | `$el.css("width", "")` |
| Размеры / Sizes / O‘lchamlar | `.width()`, `.innerWidth()`, `.outerWidth()`, `.outerWidth(true)` |
| Положение / Position / Joylashuv | `.offset()`, `.position()` |
| Прокрутка / Scrolling / Aylantirish | `$(window).scrollTop()` / `$(window).scrollTop(0)` |

```js
function setActiveTab(index) {
    const $tabs = $(".tab");
    $tabs.removeClass("is-active").attr("aria-selected", "false");
    $tabs.eq(index).addClass("is-active").attr("aria-selected", "true");
}

function markLowStock(limit) {
    $(".product").each(function () {
        const stock = Number($(this).data("stock"));
        $(this).toggleClass("is-low", stock < limit);
    });
}

const done = 3;
const total = 8;
const percent = Math.round(done / total * 100);
$(".progress__bar").css("width", `${percent}%`);    // значение из кода / computed in code / kodda hisoblangan
```

## 5. Создание и удаление элементов / Creating and removing elements / Elementlarni yaratish va o‘chirish

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| Создать / Create / Yaratish | `$("<li>")`, `$("<li>", { class: "x", text: "...", "data-id": id })` |
| Внутрь в конец / начало / Inside at end / start / Ichiga oxiriga / boshiga | `$parent.append($el)` / `$parent.prepend($el)` |
| Рядом / Next to / Yoniga | `$el.after($new)` / `$el.before($new)` |
| Цепочка с новым / Chain with the new one / Yangisi bilan zanjir | `$new.appendTo("#list")` |
| Удалить / очистить / Remove / clear / O‘chirish / tozalash | `$el.remove()` / `$el.empty()` |
| Вынуть с обработчиками / Take out with handlers / Ishlovchilari bilan olish | `const $saved = $el.detach();` |
| Копия / заменить / Copy / replace / Nusxa / almashtirish | `$el.clone(true)` / `$old.replaceWith($new)` |

```js
function renderCourses(list) {
    const $list = $("#course-list").empty();    // сначала очистить / clear first / avval tozalash

    for (const course of list) {
        $("<li>", { class: "course", text: course.title, "data-id": course.id })
            .appendTo($list);
    }

    $("#course-count").text(`Курсов: ${list.length}`);
}

renderCourses([
    { id: 1, title: "HTML" },
    { id: 2, title: "CSS" },
]);
```

## 6. События / Events / Hodisalar

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| Подписаться / Subscribe / Obuna bo‘lish | `$el.on("click", function () { ... })` |
| Элемент обработчика / Handler element / Ishlovchi elementi | `this`, `$(this)`, `event.currentTarget` |
| Куда кликнули / Where clicked / Qayerga bosildi | `event.target` |
| Ввод / Input / Kiritish | `$input.on("input", function () { $(this).val(); })` |
| Клавиша / Key / Tugma | `$(document).on("keydown", ...)`, `event.key === "Escape"` |
| Отменить действие браузера / Cancel default / Standart amalni bekor qilish | `event.preventDefault()` |
| Остановить всплытие / Stop bubbling / Ko‘tarilishni to‘xtatish | `event.stopPropagation()` |
| Делегирование / Delegation / Delegatsiya | `$list.on("click", ".item__delete", function () { ... })` |
| Снять / один раз / запустить / Remove / once / fire / Olib tashlash / bir marta / ishga tushirish | `$el.off("click.menu")`, `$el.one("click", fn)`, `$el.trigger("click")` |

```js
let likes = 0;

$("#like").on("click", function () {
    likes = likes + 1;
    $(this).text(`Нравится: ${likes}`);
});

$("#theme").on("click", function () {
    const isDark = !$("body").hasClass("theme-dark");
    $("body").toggleClass("theme-dark", isDark);
    $(this).attr("aria-pressed", String(isDark));
});

// Делегирование: работает и для пунктов, добавленных позже
// Delegation: also works for items added later / Keyin qo‘shilgan bandlar uchun ham ishlaydi
$("#todo").on("click", ".item__delete", function () {
    $(this).closest(".item").remove();
    $("#todo-count").text($("#todo .item").length);
});
```

## 7. Эффекты и анимация / Effects and animation / Effektlar va animatsiya

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| Мгновенно / Instantly / Bir zumda | `.hide()`, `.show()`, `.toggle()`, `.toggle(state)` |
| Прозрачность / Opacity / Shaffoflik | `.fadeIn()`, `.fadeOut()`, `.fadeToggle()` |
| По высоте / By height / Balandlik bo‘yicha | `.slideDown()`, `.slideUp()`, `.slideToggle()` |
| Длительность / Duration / Davomiylik | `.fadeIn(200)`; `"fast"` = 200, `"slow"` = 600, по умолчанию / default / standart 400 |
| После анимации / After the animation / Animatsiyadan keyin | `.fadeOut(300, function () { $(this).remove(); })` |
| Своя анимация / Custom animation / O‘z animatsiyangiz | `.animate({ width: "300px", opacity: 0.5 }, 400)` |
| Пауза / Pause / Pauza | `.fadeIn().delay(2000).fadeOut()` |
| Не копить анимации / Do not pile up / To‘planib qolmasin | `.stop(true, true).slideToggle()` |
| Видимость / Visibility / Ko‘rinish | `.is(":visible")`, `.is(":animated")` |

```js
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    $.fx.off = true;    // эффекты без движения / effects without motion / harakatsiz effektlar
}

$(".accordion").on("click", ".accordion__button", function () {
    const $button = $(this);
    const isOpen = $button.attr("aria-expanded") === "true";

    $button.attr("aria-expanded", String(!isOpen));
    $button.next(".accordion__panel").stop(true, true).slideToggle(200);
});

function showToast(text) {
    $("#toast").text(text).stop(true, true).fadeIn(200).delay(2000).fadeOut(400);
}
```

## 8. Формы / Forms / Formalar

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| Перехватить отправку / Catch submission / Yuborishni ushlash | `$form.on("submit", function (event) { event.preventDefault(); ... })` |
| Значение / Value / Qiymat | `$field.val().trim()` - строка / string / satr |
| Подпись пункта списка / Option label / Ro‘yxat bandi yozuvi | `$select.find("option:checked").text()` |
| Флажок / Checkbox / Belgilash katakchasi | `$agree.prop("checked")` или `$agree.is(":checked")` |
| Переключатель / Radio button / Radiotugma | `$("input[name='level']:checked").val()` |
| Данные формы / Form data / Forma ma’lumotlari | `$form.serializeArray()` / `$form.serialize()` |
| Показать / убрать ошибку / Show / clear error / Xatoni ko‘rsatish / olib tashlash | `.attr("aria-invalid", "true")` / `.removeAttr("aria-invalid")` |
| Заблокировать кнопку / Disable button / Tugmani bloklash | `$btn.prop("disabled", true)` |
| Сбросить форму / Reset form / Formani tozalash | `$form[0].reset()` |

```js
function showError($field, text) {
    $(`#${$field.attr("aria-describedby")}`).text(text);
    $field.attr("aria-invalid", "true");
}

function clearError($field) {
    $(`#${$field.attr("aria-describedby")}`).text("");
    $field.removeAttr("aria-invalid");
}

$("#signup-form").on("submit", function (event) {
    event.preventDefault();
    const $name = $("#name");
    let isValid = true;

    if ($name.val().trim().length < 2) {
        showError($name, "Имя - не короче 2 символов");
        isValid = false;
    } else {
        clearError($name);
    }

    if (!isValid) {
        $(this).find("[aria-invalid='true']").first().trigger("focus");
        return;
    }

    $("#submit-btn").prop("disabled", true);
});
```

## 9. AJAX - загрузка данных / AJAX - loading data / AJAX - ma’lumotlarni yuklash

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| Загрузить JSON / Load JSON / JSON yuklash | `$.getJSON("data/courses.json")` |
| Успех / ошибка / всегда / Success / error / always / Muvaffaqiyat / xato / doim | `.done((data) => {...}).fail((jqXHR) => {...}).always(() => {...})` |
| Код ответа / Status code / Javob kodi | `jqXHR.status` - `200`, `404`, `0` |
| Адрес ответа (4.1) / Response URL / Javob manzili | `jqXHR.responseURL` |
| Через `await` / With `await` / `await` orqali | `const data = await $.getJSON(url);` в `async`-функции |
| Получить / отправить / Get / send / Olish / yuborish | `$.get(url, { q: "css" })` / `$.post(url, $form.serialize())` |
| Полная настройка / Full settings / To‘liq sozlash | `$.ajax({ url, method, data, dataType, timeout, cache: false })` |
| Сохранить / прочитать / Save / read / Saqlash / o‘qish | `localStorage.setItem(k, JSON.stringify(v))` / `JSON.parse(localStorage.getItem(k))` |
| Запуск на компьютере / Run locally / Kompyuterda ishga tushirish | Live Server, не `file://` |

```js
function loadCourses() {
    const $status = $("#status");
    const $list = $("#course-list");

    $status.text("Загрузка...");
    $list.empty();

    $.getJSON("data/courses.json")
        .done((courses) => {
            if (courses.length === 0) {
                $status.text("Курсов пока нет");
                return;
            }
            for (const course of courses) {
                $("<li>", { text: course.title }).appendTo($list);
            }
            $status.text(`Курсов: ${courses.length}`);
        })
        .fail((jqXHR) => {
            $status.text(`Ошибка загрузки: ${jqXHR.status}`);
        });
}
```

## 10. Плагины и итоговый проект / Plugins and final project / Plaginlar va yakuniy loyiha

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| Объявить плагин / Declare a plugin / Plagin e’lon qilish | `$.fn.charCounter = function (options) { ... };` |
| Обернуть файл / Wrap the file / Faylni o‘rash | `(function ($) { ... })(jQuery);` |
| Перебрать и вернуть объект / Iterate and return / Aylanib chiqish va qaytarish | `return this.each(function () { const $field = $(this); ... });` |
| Объединить настройки / Merge settings / Sozlamalarni birlashtirish | `const settings = $.extend({}, defaults, options);` |
| Лимит из атрибута / Limit from attribute / Atributdan limit | `Number($field.data("max")) \|\| settings.max` |
| Защита от повторного вызова / Repeat-call guard / Qayta chaqirishdan himoya | `if ($field.data("charCounter")) { return; }` |
| Порядок подключения / Loading order / Ulash tartibi | jQuery → плагины / plugins / plaginlar → `main.js` |
| Найти устаревший код / Find outdated code / Eskirgan kodni topish | jQuery Migrate сразу после jQuery, сообщения `JQMIGRATE` |
| Функция страницы / Page function / Sahifa funksiyasi | `if ($el.length === 0) { return; }` в начале `init...` |
| Вместо удалённого / Instead of removed / Olib tashlangan o‘rniga | `str.trim()`, `Array.isArray(x)`, `JSON.parse(text)` |

```js
(function ($) {
    const defaults = { max: 100, overClass: "is-over" };

    $.fn.charCounter = function (options) {
        const settings = $.extend({}, defaults, options);

        return this.each(function () {
            const $field = $(this);
            if ($field.data("charCounter")) {
                return;
            }

            const max = Number($field.data("max")) || settings.max;
            const $counter = $("<p>", { class: "char-counter", "aria-live": "polite" });
            $field.after($counter).data("charCounter", true);

            function update() {
                const length = $field.val().length;
                $counter.text(`${length} / ${max}`).toggleClass(settings.overClass, length > max);
            }

            $field.on("input.charCounter", update);
            update();
        });
    };
})(jQuery);

// main.js
$("#message").charCounter({ max: 200 });
```

```html
<script src="https://code.jquery.com/jquery-4.1.0.min.js"></script>
<script src="js/jquery.char-counter.js" defer></script>
<script src="js/main.js" defer></script>
```

## Частые сообщения об ошибках / Common error messages / Ko‘p uchraydigan xato xabarlari

| Сообщение / Message | Что значит / Meaning / Ma’nosi |
| --- | --- |
| `ReferenceError: $ is not defined` / `jQuery is not defined` | jQuery не загрузился или подключён после своего скрипта. Проверьте адрес и вкладку Network. / jQuery is missing or loaded after your script. / jQuery yuklanmagan yoki o‘z skriptingizdan keyin ulangan. |
| `TypeError: $(...).fadeIn is not a function`, `$.getJSON is not a function` | Подключена slim-сборка: в ней нет эффектов и AJAX. Нужна `jquery-4.1.0.min.js`. / Slim build has no effects or AJAX. / Slim yig‘mada effektlar va AJAX yo‘q. |
| `TypeError: heading.text is not a function`, `this.val is not a function` | Метод jQuery вызван у DOM-элемента (`$els[1]`, `this`). Нужно `$els.eq(1)` или `$(this)`. / A jQuery method on a DOM element. / DOM elementida jQuery metodi chaqirilgan. |
| `TypeError: ... is not a function` после геттера / after a getter | Геттер вернул строку, цепочка прервалась. Геттер - в конце цепочки. / A getter returned a string. / Getter satr qaytardi. |
| `join is not a function` | `.map()` без `.get()`: это jQuery-объект, а не массив. / `.map()` without `.get()`. / `.get()` siz `.map()`. |
| `TypeError: $form.reset is not a function` | `reset()` есть у DOM-формы: `$form[0].reset()`. / `reset()` belongs to the DOM form. / `reset()` DOM formasida bor. |
| `$(...).charCounter is not a function` | Файл плагина не подключён или подключён после `main.js`. / Plugin file missing or loaded too late. / Plagin fayli ulanmagan yoki kech ulangan. |
| `$.isArray is not a function` | Функция удалена в jQuery 4 (часто в старом плагине). Замените или подключите jQuery Migrate. / Removed in jQuery 4. / jQuery 4 da olib tashlangan. |
| `JQMIGRATE: ...` | Предупреждение jQuery Migrate: эту строку кода нужно переписать для jQuery 4. / Code to rewrite for jQuery 4. / jQuery 4 uchun qayta yozish kerak bo‘lgan kod. |
| Ошибка CORS, `jqXHR.status === 0` / CORS error | Страница открыта как `file://` или нет сети. Откройте через Live Server. / Opened as `file://` or no network. / `file://` orqali ochilgan yoki tarmoq yo‘q. |
| `textStatus === "parsererror"` | Ответ пришёл, но это неправильный JSON. / The response is not valid JSON. / Javob noto‘g‘ri JSON. |
| `404` в Network / in Network | Файл не найден: проверьте путь и регистр букв в имени (GitHub Pages различает регистр). / File not found; check path and letter case. / Fayl topilmadi: yo‘l va harflar registrini tekshiring. |

---

[Содержание / Contents / Mundarija](README.md) · [Словарь / Glossary](GLOSSARY.md) · [Источники / References](REFERENCES.md)
