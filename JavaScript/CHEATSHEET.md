# Шпаргалка по курсу / Course cheat sheet / Kurs bo‘yicha qisqa qo‘llanma

Весь синтаксис курса на одной странице, по урокам. Код написан по правилам курса: `const` по умолчанию, `===`, `textContent`, `addEventListener`, классы CSS вместо `style`.

All course syntax on one page, by lesson. The code follows the course rules: `const` by default, `===`, `textContent`, `addEventListener`, CSS classes instead of `style`.

Kursdagi barcha sintaksis bitta sahifada, darslar bo‘yicha. Kod kurs qoidalariga mos: standart holatda `const`, `===`, `textContent`, `addEventListener`, `style` o‘rniga CSS klasslari.

## 1. Первая программа / First program / Birinchi dastur

```html
<!-- в <head> / in <head> / <head> ichida -->
<script src="js/main.js" defer></script>
```

```js
// Однострочный комментарий / One-line comment / Bir qatorli izoh
/* Блочный комментарий / Block comment / Blokli izoh */

const siteName = "Кружок";   // не меняется / never reassigned / o‘zgarmaydi
let visits = 0;              // меняется / changes / o‘zgaradi
visits = visits + 1;

console.log(siteName, visits); // Кружок 1
```

## 2. Типы и операторы / Types and operators / Turlar va operatorlar

```js
typeof 42;          // "number"
typeof "42";        // "string"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof null;        // "object" - историческая ошибка языка / historical quirk / tilning tarixiy xatosi

7 % 3;              // 1 - остаток / remainder / qoldiq
"5" + 2;            // "52" - склейка строк / concatenation / satrlarni ulash
Number("5") + 2;    // 7
Number("abc");      // NaN
String(10);         // "10"

const total = 1500;
console.log(`Итого: ${total} сум`);

5 === 5;            // true
5 === "5";          // false - разные типы / different types / turlar har xil
5 !== 6;            // true
```

## 3. Условия / Conditions / Shartlar

```js
const score = 78;

if (score >= 90) {
    console.log("5");
} else if (score >= 70) {
    console.log("4");
} else {
    console.log("Нужно повторить");
}

const age = 16;
const hasTicket = true;
if (age >= 14 && hasTicket) { /* можно войти / may enter / kirish mumkin */ }

const label = score >= 50 ? "Сдал" : "Не сдал";

const day = "sat";
switch (day) {
    case "sat":
    case "sun":
        console.log("Выходной");
        break;
    default:
        console.log("Учебный день");
}

// Falsy: false, 0, "", null, undefined, NaN. Всё остальное - truthy.
```

## 4. Циклы / Loops / Sikllar

```js
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

let sum = 0;                  // накопитель / accumulator / yig‘uvchi
for (let i = 2; i <= 10; i += 2) {
    sum = sum + i;
}

let n = 3;
while (n > 0) {
    n = n - 1;                // без этого цикл бесконечный / required, or it never ends / bu qatorsiz sikl cheksiz
}

for (const letter of "JS") {
    console.log(letter);      // J, S
}

// break - выйти из цикла / exit the loop / sikldan chiqish
// continue - к следующему шагу / next pass / keyingi qadamga
```

## 5. Функции / Functions / Funksiyalar

```js
function getGrade(score) {
    if (score >= 90) {
        return "A";
    }
    return "B";
}

function formatPrice(amount, currency = "сум") {
    return `${amount} ${currency}`;
}

const isEven = (n) => n % 2 === 0;

getGrade(95);            // "A"
formatPrice(1200);       // "1200 сум"
isEven(4);               // true
```

## 6. Массивы и объекты / Arrays and objects / Massivlar va obyektlar

```js
const names = ["Анна", "Бобур", "Карим"];
names[0];                 // "Анна"
names.length;             // 3
names.push("Дина");       // добавить в конец / add to end / oxiriga qo‘shish
names.pop();              // убрать последний / remove last / oxirgisini olib tashlash
names.includes("Карим");  // true
names.indexOf("Бобур");   // 1

const user = { name: "Анна", score: 92 };
user.name;                // "Анна"
user["score"];            // 92
user.city = "Ташкент";

const students = [
    { name: "Анна", score: 92 },
    { name: "Бобур", score: 67 },
];

const scores = students.map((s) => s.score);              // [92, 67]
const best = students.filter((s) => s.score >= 90);       // [{ Анна }]
const bobur = students.find((s) => s.name === "Бобур");   // { Бобур }
const total = students.reduce((acc, s) => acc + s.score, 0); // 159

const { name, score } = user;
const copy = { ...user, score: 95 };
const more = [...names, "Ели"];
```

## 7. DOM

```js
const title = document.querySelector("#title");
const cards = document.querySelectorAll(".card");

title.textContent = "Новый заголовок";
title.classList.add("is-active");
title.classList.remove("is-active");
title.classList.toggle("is-active");

const link = document.querySelector("a");
link.getAttribute("href");
link.setAttribute("href", "contact.html");

// <li data-id="7"> → li.dataset.id === "7"

const list = document.querySelector("#courses");
for (const course of ["HTML", "CSS", "JavaScript"]) {
    const item = document.createElement("li");
    item.textContent = course;
    list.append(item);
}
```

## 8. События / Events / Hodisalar

```js
const button = document.querySelector("#counter");
let count = 0;

button.addEventListener("click", () => {
    count = count + 1;
    button.textContent = `Нажато: ${count}`;
});

const input = document.querySelector("#search");
input.addEventListener("input", (event) => {
    console.log(event.target.value);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { /* закрыть меню / close menu / menyuni yopish */ }
});

// Делегирование / Delegation / Delegatsiya
list.addEventListener("click", (event) => {
    const item = event.target.closest("li");
    if (item) {
        item.classList.toggle("is-done");
    }
});
```

## 9. Формы, хранение, запросы / Forms, storage, requests / Formalar, saqlash, so‘rovlar

```js
const form = document.querySelector("#signup");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form.elements.email.value.trim();
    if (email === "") {
        // показать ошибку рядом с полем / show error next to field / xatoni maydon yonida ko‘rsatish
        return;
    }
});

const todos = ["Урок 9"];
localStorage.setItem("todos", JSON.stringify(todos));

function loadTodos() {
    try {
        const saved = JSON.parse(localStorage.getItem("todos"));
        return Array.isArray(saved) ? saved : [];
    } catch (error) {
        return [];
    }
}

async function loadEvents() {
    try {
        const response = await fetch("data/events.json");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}
```

## 10. Модули / Modules / Modullar

```html
<script type="module" src="js/main.js"></script>
```

```js
// js/theme.js
export function initTheme() { /* ... */ }

// js/main.js
import { initTheme } from "./theme.js";
initTheme();
```

Модули работают только через сервер (Live Server, GitHub Pages), не при открытии файла двойным щелчком.

Modules only work over a server (Live Server, GitHub Pages), not when opening the file by double-click.

Modullar faqat server orqali ishlaydi (Live Server, GitHub Pages), faylni ikki marta bosib ochganda emas.

## Частые сообщения об ошибках / Common error messages / Ko‘p uchraydigan xato xabarlari

| Сообщение / Message | Что значит / Meaning / Ma’nosi |
| --- | --- |
| `ReferenceError: x is not defined` | Переменной нет: опечатка или не объявлена. / Typo or not declared. / Xato yozilgan yoki e’lon qilinmagan. |
| `TypeError: Assignment to constant variable` | Переназначение `const`. Нужен `let`. / Reassigning a `const`. / `const` qayta o‘zlashtirilgan. |
| `TypeError: Cannot read properties of null` | `querySelector` ничего не нашёл: неверный селектор или нет `defer`. / Selector found nothing. / Selektor hech narsa topmadi. |
| `TypeError: x is not a function` | Вызов того, что не функция, или опечатка в имени метода. / Calling a non-function. / Funksiya bo‘lmagan narsa chaqirilgan. |
| `SyntaxError: Unexpected token` | Лишняя или пропущенная скобка, кавычка, запятая. / Missing or extra bracket, quote, comma. / Qavs, qo‘shtirnoq yoki vergul yetishmaydi yoki ortiqcha. |
| `SyntaxError: Cannot use import statement outside a module` | Нет `type="module"` у `<script>`. / Missing `type="module"`. / `type="module"` yo‘q. |
| `Failed to fetch` / CORS | Файл открыт без сервера или сервер недоступен. / No server or server unreachable. / Server yo‘q yoki ishlamayapti. |

---

[Содержание / Contents / Mundarija](README.md) · [Словарь / Glossary](GLOSSARY.md) · [Источники / References](REFERENCES.md)
