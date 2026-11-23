# Шпаргалка по курсу / Course cheat sheet / Kurs bo‘yicha qisqa qo‘llanma

Весь синтаксис курса на одной странице, по урокам. Код написан по правилам курса: внешний файл стилей, оформление через классы, без `!important` и `style=""`, шрифты в `rem`, mobile-first через `min-width`, движение - только внутри `prefers-reduced-motion: no-preference`, отступ 4 пробела.

All course syntax on one page, by lesson. The code follows the course rules: an external stylesheet, styling via classes, no `!important` or `style=""`, fonts in `rem`, mobile first with `min-width`, motion only inside `prefers-reduced-motion: no-preference`, 4-space indent.

Kursdagi barcha sintaksis bitta sahifada, darslar bo‘yicha. Kod kurs qoidalariga mos: tashqi uslublar fayli, sinflar orqali bezash, `!important` va `style=""` siz, shriftlar `rem` da, `min-width` orqali mobile-first, harakat faqat `prefers-reduced-motion: no-preference` ichida, 4 bo‘shliqli chekinish.

## 1. Подключение и синтаксис / Linking and syntax / Ulash va sintaksis

```html
<!-- в <head> / in <head> / <head> ichida -->
<link rel="stylesheet" href="css/style.css">
```

```css
/* селектор { свойство: значение; } / selector { property: value; } / selektor { xususiyat: qiymat; } */
body {
    background-color: #f4f6fb;
    font-family: Arial, sans-serif;
}

h1, h2 {
    color: #1e3a8a;
}
```

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| Стили на одной странице / Styles on one page / Bitta sahifadagi uslublar | `<style>...</style>` в `<head>` |
| Несколько тегов / Several tags / Bir nechta teg | `h1, h2, h3 { ... }` |
| Комментарий / Comment / Izoh | `/* текст */` |
| Цвет текста / фона / Text / background color / Matn / fon rangi | `color` / `background-color` |
| Шрифт / размер / Font / size / Shrift / o‘lcham | `font-family` / `font-size` |
| Проверить стиль / Check a style / Uslubni tekshirish | DevTools → Elements → Styles |

## 2. Селекторы и каскад / Selectors and the cascade / Selektorlar va kaskad

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| Все теги / All tags / Barcha teglar | `p` |
| Элементы с классом / Elements with a class / Sinfli elementlar | `.notice` |
| Один элемент по `id` / One element by `id` / `id` bo‘yicha bitta element | `#main-title` |
| Внутри другого / Inside another / Boshqasining ichida | `nav a` |
| Прямые дети / Direct children / To‘g‘ridan-to‘g‘ri bolalar | `ul > li` |
| Сразу после / Right after / Darhol keyin | `h2 + p` |
| С двумя классами / With two classes / Ikki sinfli | `.btn.primary` |
| По атрибуту / By attribute / Atribut bo‘yicha | `a[target="_blank"]` |

| Кто побеждает / Who wins / Kim yutadi | Правило / Rule / Qoida |
| --- | --- |
| 1 | `!important` (не используем / not used / ishlatmaymiz) |
| 2 | Больший счёт `id - классы - теги` / Higher `id - class - tag` score / Kattaroq `id - sinf - teg` hisobi |
| 3 | При равенстве - правило ниже в коде / If equal - the later rule / Tenglikda - kodda pastroqdagisi |
| 4 | Унаследованное значение - слабее всего / Inherited value is weakest / Meros qiymat eng kuchsiz |

```css
.notice {          /* 0-1-0 */
    color: red;
}

p {                /* 0-0-1 - проигрывает / loses / yutqazadi */
    color: blue;
}
```

## 3. Цвет, единицы, шрифты, фон / Color, units, fonts, background / Rang, birliklar, shriftlar, fon

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| Цвет / Color / Rang | `#1e3a8a`, `rgb(30 58 138)`, `hsl(225, 64%, 33%)` |
| Полупрозрачный / Semi-transparent / Yarim shaffof | `rgb(0 0 0 / 50%)` |
| Размер шрифта / Font size / Shrift o‘lchami | `font-size: 1.25rem;` |
| Шрифт с запасными / Font with fallbacks / Zaxira shriftli | `font-family: "Inter", Arial, sans-serif;` |
| Жирность / Weight / Qalinlik | `font-weight: 700;` |
| Межстрочный интервал / Line height / Qatorlararo interval | `line-height: 1.6;` |
| По центру / Centered / Markazda | `text-align: center;` |
| Без подчёркивания / No underline / Tagiga chiziqsiz | `text-decoration: none;` |
| Градиент / Gradient / Gradient | `background-image: linear-gradient(135deg, #1e3a8a, #7c3aed);` |
| Контраст / Contrast / Kontrast | ≥ 4.5:1 |

```css
.hero {
    background-color: #1e3a8a;                  /* если картинка не загрузится / fallback / rasm yuklanmasa */
    background-image: url("../images/hero.jpg"); /* путь от CSS-файла / path from the CSS file / CSS fayldan yo‘l */
    background-size: cover;
    background-position: center;
}
```

## 4. Box model / Box model / Blok modeli

```css
* {
    box-sizing: border-box;   /* первое правило файла / first rule / faylning birinchi qoidasi */
}

.card {
    padding: 16px;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    margin-bottom: 24px;
    box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
}

main {
    max-width: 960px;
    margin: 0 auto;
}
```

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| Порядок 4 значений / Order of 4 values / 4 qiymat tartibi | `padding: 8px 16px 24px 32px;` - верх, право, низ, лево / top, right, bottom, left / yuqori, o‘ng, past, chap |
| Размеры у строчного / Sizes on an inline element / Qator elementiga o‘lchamlar | `display: inline-block;` |
| Скрыть / Hide / Yashirish | `display: none;` |
| Круг / Circle / Doira | `border-radius: 50%;` |

## 5. Flexbox / Flexbox / Flexbox

```css
.menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
}

.cards {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.cards article {
    flex: 1 1 240px;   /* элементу, не контейнеру / on the item / elementga */
}
```

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| В столбик / In a column / Ustunga | `flex-direction: column;` |
| По центру вдоль / Centered along / Bo‘ylab markazga | `justify-content: center;` |
| По центру поперёк / Centered across / Ko‘ndalang markazga | `align-items: center;` |
| Центр по двум осям / Center on both axes / Ikki o‘q bo‘yicha markaz | `justify-content: center; align-items: center;` + `min-height` |
| Поровну / Equal shares / Teng | `flex: 1;` |
| Один элемент иначе / One item differently / Bitta element boshqacha | `align-self: flex-end;` |

## 6. Grid / Grid / Grid

```css
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
}

.page {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
}

.page main {
    grid-area: main;   /* без кавычек / no quotes / qo‘shtirnoqsiz */
}
```

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| Три равных столбца / Three equal columns / Uchta teng ustun | `grid-template-columns: repeat(3, 1fr);` |
| Колонка + остальное / A column + the rest / Ustun + qolgani | `grid-template-columns: 250px 1fr;` |
| На 2 столбца / Across 2 columns / 2 ustunga | `grid-column: span 2;` |
| На всю ширину / Full width / Butun kenglikka | `grid-column: 1 / -1;` |

## 7. Позиционирование / Positioning / Pozitsiyalash

```css
.card {
    position: relative;   /* опора / anchor / tayanch */
}

.badge {
    position: absolute;
    top: 12px;
    right: 12px;
}

body > header {
    position: sticky;
    top: 0;
    background-color: #ffffff;   /* без фона текст просвечивает / needs a background / fon kerak */
    z-index: 10;
}

html {
    scroll-padding-top: 80px;
}
```

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| Всегда на экране / Always on screen / Doim ekranda | `position: fixed; right: 24px; bottom: 24px;` |
| На весь экран / Full screen / Butun ekranga | `position: fixed; inset: 0;` |
| Кто сверху / Who is on top / Kim ustida | `z-index: 10;` (шкала / scale / shkala: 1, 10, 100) |

## 8. Адаптивность / Responsive layout / Moslashuvchan sahifa

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

```css
img {
    max-width: 100%;
    height: auto;
}

h1 {
    font-size: clamp(1.75rem, 4vw + 1rem, 3rem);
}

.cards {
    display: grid;
    gap: 16px;
}

@media (min-width: 600px) {
    .cards {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 900px) {
    .cards {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| Порядок / Order / Tartib | Базовые → 600px → 900px / Base → 600px → 900px / Asosiy → 600px → 900px |
| Тёмная тема / Dark theme / Tungi mavzu | `@media (prefers-color-scheme: dark) { ... }` |
| Проверка / Checking / Tekshiruv | DevTools → режим устройства / device mode / qurilma rejimi + телефон / phone / telefon |

## 9. Состояния, переходы, анимации, переменные / States, transitions, animations, variables / Holatlar, o‘tishlar, animatsiyalar, o‘zgaruvchilar

```css
:root {
    --primary: #1e3a8a;
    --accent: #f59e0b;
}

.btn {
    background-color: var(--primary);
}

.btn:hover {
    background-color: #1e40af;
}

.btn:focus-visible {
    outline: 3px solid var(--accent);
    outline-offset: 2px;
}

.required-label::after {
    content: " *";
    color: #b91c1c;
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(16px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (prefers-reduced-motion: no-preference) {
    .btn {
        transition: background-color 0.2s ease;   /* на обычном состоянии / on the normal state / oddiy holatda */
    }

    .hero {
        animation: fade-in 0.6s ease-out;
    }
}
```

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| Каждый второй / Every second / Har ikkinchisi | `tbody tr:nth-child(even)` |
| Последний / The last / Oxirgisi | `.menu li:last-child` |
| Кроме / Except / Tashqari | `:not(.featured)` |
| Приподнять / Lift / Ko‘tarish | `transform: translateY(-4px);` |
| Увеличить / повернуть / Scale / rotate / Kattalashtirish / burish | `transform: scale(1.05);` / `rotate(10deg)` |

## 10. Итоговый проект / Final project / Yakuniy loyiha

```css
/* 1. Основа / Base / Asos */
/* 2. Раскладка / Layout / Joylashuv */
/* 3. Компоненты / Components / Komponentlar */
/* 4. Адаптивность и тёмная тема / Responsiveness and dark theme / Moslashuvchanlik va tungi mavzu */
/* 5. Состояния и движение / States and motion / Holatlar va harakat */

.skip-link {
    position: absolute;
    left: 16px;
    top: -48px;
    z-index: 100;
}

.skip-link:focus {
    top: 8px;
}

input, textarea, button {
    font: inherit;
}

table {
    border-collapse: collapse;
}
```

| Задача / Task / Vazifa | Код / Code / Kod |
| --- | --- |
| Только шапка сайта / Site header only / Faqat sayt shapkasi | `body > header` |
| Тёмная тема на переменных / Dark theme with variables / O‘zgaruvchilardagi tungi mavzu | `@media (prefers-color-scheme: dark) { :root { --bg: #0f172a; } }` |
| Обновить сайт / Update the site / Saytni yangilash | GitHub → Add file → Upload files → Commit changes |
| Свежая версия / Fresh version / Yangi versiya | Ctrl+Shift+R (macOS: Cmd+Shift+R) |

Проверка перед публикацией: ширина 320, 390, 768, 1280px; Tab по всем страницам; контраст ≥ 4.5:1 в светлой и тёмной теме; `prefers-reduced-motion: reduce`; валидатор.

Checking before publishing: widths 320, 390, 768, 1280px; Tab through every page; contrast ≥ 4.5:1 in light and dark themes; `prefers-reduced-motion: reduce`; validator.

Nashrdan oldin tekshiruv: 320, 390, 768, 1280px kenglik; har bir sahifa bo‘ylab Tab; och va tungi mavzuda kontrast ≥ 4.5:1; `prefers-reduced-motion: reduce`; validator.

## Частые сообщения об ошибках / Common error messages / Ko‘p uchraydigan xato xabarlari

CSS не выдаёт ошибок в консоль: непонятное правило браузер молча пропускает. Ищите сигналы в DevTools и валидаторе.

CSS does not throw console errors: the browser silently skips what it does not understand. Look for signals in DevTools and the validator.

CSS konsolga xato chiqarmaydi: brauzer tushunmagan narsani jimgina o‘tkazib yuboradi. Signallarni DevTools va validatorda qidiring.

| Сообщение / Message | Что значит / Meaning / Ma’nosi |
| --- | --- |
| Network: `style.css` - `404` | Неверный путь или регистр букв в `href`, либо старый кэш. / Wrong path or letter case, or an old cache. / Yo‘l yoki harf registri xato, yoki eski kesh. |
| Styles: свойство зачёркнуто, без значка / struck through, no icon | Его перебило более сильное правило (урок 2). / A stronger rule overrode it. / Uni kuchliroq qoida bosib ketgan. |
| Styles: всё объявление зачёркнуто со значком ⚠ / whole declaration crossed out with ⚠ | Неизвестное свойство, опечатка: `colour` вместо `color`. / Unknown property, a typo. / Noma’lum xususiyat, xato yozilgan. |
| Styles: зачёркнуто только значение со значком ⚠ / only the value crossed out with ⚠ | Свойство верное, значение - нет, или пропущена `;` перед следующей строкой. / Valid property, invalid value, or a missing `;`. / Xususiyat to‘g‘ri, qiymat xato yoki `;` tushib qolgan. |
| Styles: бледный текст со значком ⓘ / pale text with ⓘ | Свойство верное, но не действует из-за других: `justify-content` или `flex-wrap` без `display: flex`. / Valid but has no effect here. / To‘g‘ri, lekin bu yerda ta’sir qilmaydi. |
| Валидатор / Validator: `Property “colour” doesn't exist` | Такого свойства нет - проверьте написание. / No such property. / Bunday xususiyat yo‘q. |
| Валидатор / Validator: `Parse Error` | Сломан синтаксис: лишняя или пропущенная `}`, `;`, кавычка. / Broken syntax. / Sintaksis buzilgan. |

---

[Содержание / Contents / Mundarija](README.md) · [Словарь / Glossary](GLOSSARY.md) · [Источники / References](REFERENCES.md)
