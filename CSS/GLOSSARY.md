# Словарь терминов / Glossary / Atamalar lug‘ati

Термины курса CSS в порядке уроков. Каждый термин стоит в разделе урока, где он появляется впервые.

Course terms in lesson order. Each term is listed under the lesson where it first appears.

Kurs atamalari darslar tartibida. Har bir atama birinchi marta uchraydigan dars bo‘limida turadi.

## Урок 1 / Lesson 1 / 1-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| CSS | CSS | CSS | Каскадные таблицы стилей: отвечают за то, **как** выглядит страница. HTML - что это, CSS - как выглядит. / Cascading Style Sheets: how the page looks. |
| Файл стилей | Uslublar fayli | Style file / stylesheet | Отдельный файл `css/style.css` со всеми правилами сайта. / A separate file with all the site's rules. |
| Внешний файл | Tashqi fayl | External file | Подключение через `<link rel="stylesheet" href="css/style.css">` в `<head>`. Способ курса для проектов. / Linked with `<link>` in `<head>`; the course way for projects. |
| Атрибут `style` | `style` atributi | The `style` attribute | Стиль прямо в теге: `<p style="color: red;">`. В курсе не используется. / Inline style in the tag; not used in the course. |
| Тег `<style>` | `<style>` tegi | The `<style>` tag | Стили внутри одной страницы, в `<head>`. Только для экспериментов и заданий в IDE. / Styles for one page; only for experiments and IDE tasks. |
| Правило | Qoida | Rule | Селектор и блок объявлений: `h1 { color: navy; }`. / A selector plus a block of declarations. |
| Селектор | Selektor | Selector | Кому применить правило: `h1` - всем `<h1>`. / Whom the rule applies to. |
| Свойство | Xususiyat | Property | Что меняем: `color`, `font-size`. / What we change. |
| Значение | Qiymat | Value | На что меняем: `navy`, `18px`. / What we change it to. |
| Объявление | E’lon | Declaration | Одна пара «свойство: значение» с `;` в конце: `color: navy;`. / One "property: value" pair ending with `;`. |
| Группа селекторов | Guruh | Group of selectors | Одно правило для нескольких тегов через запятую: `h1, h2 { ... }`. / One rule for several tags, comma-separated. |
| Комментарий | Izoh | Comment | Текст для человека: `/* ... */`. Браузер его пропускает. / Text for humans, ignored by the browser. |
| DevTools → Styles | DevTools → Styles | DevTools → Styles | Панель, где видны все правила элемента и можно пробовать стили «вживую». Изменения исчезают после F5. / Shows an element's rules; live edits vanish after F5. |
| Зачёркнутое свойство | Chizilgan xususiyat | Struck-through property | В Styles: свойство перебито другим правилом или браузер не понял запись. / Overridden, or not understood by the browser. |

## Урок 2 / Lesson 2 / 2-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Класс | Sinf | Class | Атрибут `class` в HTML, в CSS выбирается точкой: `.notice`. Основной способ оформления. / Selected with a dot; the main way to style. |
| Несколько классов | Bir nechta sinf | Multiple classes | `class="btn primary"`; селектор `.btn.primary` - элементы с **обоими** классами. / An element with both classes. |
| Селектор `id` | `id` bo‘yicha selektor | `id` selector | `#main-title` - один элемент на странице. В CSS - только если без него никак. / One element per page; avoid for styling. |
| Универсальный селектор | Barcha elementlar | Universal selector | `*` - вообще все элементы. / Absolutely every element. |
| Потомок | Avlod | Descendant | Пробел в селекторе: `nav a` - все `<a>` где угодно внутри `<nav>`. / A space: any nested level. |
| Прямой ребёнок | To‘g‘ridan-to‘g‘ri bola | Direct child | `ul > li` - только `<li>`, лежащие прямо в `<ul>`. / Only the immediate children. |
| Соседний элемент | Darhol keyingi qo‘shni | Adjacent sibling | `h2 + p` - первый `<p>` сразу после `<h2>`. / The element right after another. |
| Селектор атрибута | Atribut bo‘yicha selektor | Attribute selector | `a[target="_blank"]` - ссылки, открывающиеся в новой вкладке. / Selects by an attribute value. |
| Каскад | Kaskad | Cascade | Порядок решения спора правил: важность → специфичность → порядок в коде. / How the browser settles conflicting rules. |
| Специфичность | Spetsifiklik | Specificity | «Вес» селектора: счёт `id - классы - теги`, например `.notice` = 0-1-0. Сравнивается слева направо. / A three-number score compared left to right. |
| Порядок | Tartib | Order | При равной специфичности побеждает правило ниже в коде. / With equal specificity the later rule wins. |
| `!important` | `!important` | `!important` | «Стоп-кран»: перебивает почти всё. В курсе не используется. / The emergency brake; not used in the course. |
| Наследование | Meros | Inheritance | Часть свойств (шрифт, цвет текста) переходит от родителя к детям. Унаследованное значение - самое слабое. / Some properties pass from parent to children; weakest value. |

## Урок 3 / Lesson 3 / 3-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| `hex` | `hex` | `hex` | Цвет тремя парами символов: `#1e3a8a` - красный `1e`, зелёный `3a`, синий `8a`. / Three pairs: red, green, blue. |
| `rgb()` | `rgb()` | `rgb()` | Цвет числами 0–255: `rgb(30 58 138)`. / A color as numbers. |
| `hsl()` | `hsl()` | `hsl()` | Цвет «по-человечески»: тон, насыщенность, светлота. Светлее - больше последнее число. / Hue, saturation, lightness. |
| Полупрозрачность | Yarim shaffoflik | Semi-transparency | Четвёртое значение после `/`: `rgb(0 0 0 / 50%)`. / An alpha value after `/`. |
| Контраст | Kontrast | Contrast | Разница яркости текста и фона. Для обычного текста - не меньше 4.5:1. / At least 4.5:1 for normal text. |
| Единицы размеров | O‘lcham birliklari | Size units | `px`, `rem`, `em`, `%`, `vw`, `vh`. / Units for sizes. |
| `px` | `px` | `px` | Фиксированный размер. Для тонких рамок и теней. / Fixed; for thin borders and shadows. |
| `rem` | `rem` | `rem` | От размера шрифта страницы (обычно 16px): `1.5rem` = 24px. Шрифты - в `rem`. / Relative to the page font size. |
| `em` | `em` | `em` | От размера шрифта самого элемента. / Relative to the element's own font size. |
| `vw` / `vh` | `vw` / `vh` | `vw` / `vh` | 1% ширины / высоты окна: `height: 100vh`. / 1% of the window width / height. |
| Запасные шрифты | Zaxira shriftlar | Fallback fonts | Список в `font-family`: браузер берёт первый, который есть на устройстве. / The browser uses the first available font. |
| Общее семейство | Umumiy oila | Generic family | Последний пункт списка: `sans-serif`, `serif`. / The last item: always available. |
| Межстрочный интервал | Qatorlararo interval | Line height | `line-height: 1.6;` - без единиц. / Written without units. |
| Градиент | Gradient | Gradient | Плавный переход цветов: `linear-gradient(135deg, #1e3a8a, #7c3aed)`. / A smooth blend of colors. |
| Картинка на фоне | Fondagi rasm | Background image | `background-image: url(...)` + `background-size: cover`. Путь - от CSS-файла. / Path is relative to the CSS file. |

## Урок 4 / Lesson 4 / 4-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Box model | Blok modeli | Box model | Каждый элемент - четыре слоя: содержимое, `padding`, `border`, `margin`. / Every element is four layers. |
| Содержимое | Mazmun | Content | Внутренняя часть блока: `width`, `height`. / The inner part of the box. |
| Внутренний отступ | Ichki chekinish | Inner spacing (`padding`) | «Воздух» между содержимым и рамкой. Фон его закрашивает. / Space inside the border. |
| Рамка | Ramka | Border | `border: 1px solid #cbd5e1;` - толщина, стиль, цвет. / Width, style, color. |
| Внешний отступ | Tashqi chekinish | Outer spacing (`margin`) | Расстояние до соседей. Фон его не закрашивает. / Space to the neighbors. |
| Короткая запись | Qisqa yozuv | Short notation | `padding: 8px 16px 24px 32px;` - верх, право, низ, лево, по часовой стрелке. / Top, right, bottom, left - clockwise. |
| Схлопывание отступов | Tashqi chekinishlarning qo‘shilib ketishi | Collapsing margins | Вертикальные `margin` соседей не складываются: побеждает больший. / Vertical margins collapse; the larger wins. |
| `box-sizing: border-box` | `box-sizing: border-box` | `box-sizing: border-box` | `width` включает `padding` и `border`. Первое правило каждого файла стилей. / Width includes padding and border. |
| Центрирование блока | Markazlash | Centering | `max-width: 960px; margin: 0 auto;` - работает только у блока с шириной. / Works only on a block with a width. |
| Блочный элемент | Blok | Block element | `display: block` - с новой строки, на всю ширину. / New line, full width. |
| Строчный элемент | Qator elementi | Inline element | `display: inline` - в строке с текстом, `width` и вертикальные отступы не работают. / Sits in the text line. |
| `inline-block` | `inline-block` | `inline-block` | В строке, но с размерами и отступами, как блок. / In the line, but sized like a block. |
| Скругление | Yumaloqlash | Rounding (`border-radius`) | `border-radius: 12px;`, круг - `50%`. / Rounded corners; `50%` for a circle. |
| Тень | Soya | Shadow | `box-shadow: 0 4px 12px rgb(0 0 0 / 10%);` - лёгкая, 8–15%. / Keep it light. |

## Урок 5 / Lesson 5 / 5-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Flexbox | Flexbox | Flexbox | Раскладка элементов в одну линию: `display: flex`. / One-dimensional layout. |
| Контейнер | Konteyner | Container | Родитель с `display: flex`, ему задают правила раскладки. / The parent that gets the layout rules. |
| Элементы | Elementlar | Items | Прямые дети контейнера. На «внуков» Flexbox не действует. / Direct children only. |
| Главная ось | Asosiy o‘q | Main axis | Направление ряда, по умолчанию слева направо. Управляет `justify-content`. / Default left to right. |
| Поперечная ось | Ko‘ndalang o‘q | Cross axis | Перпендикулярно главной. Управляет `align-items`. / Perpendicular to the main axis. |
| `flex-direction` | `flex-direction` | `flex-direction` | Направление: `row` или `column`. В `column` оси меняются местами. / Row or column; axes swap in a column. |
| `justify-content` | `justify-content` | `justify-content` | Распределение по главной оси: `center`, `space-between`... / Distribution along the main axis. |
| `align-items` | `align-items` | `align-items` | Выравнивание по поперечной оси; по умолчанию `stretch` - одинаковая высота. / Alignment on the cross axis. |
| Промежуток | Oraliq | Gap | `gap: 16px;` - расстояние между элементами без лишних отступов по краям. / Space between items only. |
| Перенос | O‘tkazish | Wrapping | `flex-wrap: wrap;` - не помещается - на следующую строку. / Move to the next line when out of room. |
| `flex` | `flex` | `flex` | Сколько места берёт элемент: `flex: 1 1 240px` - расти, сжиматься, желаемая ширина. / Grow, shrink, basis. |
| `align-self` | `align-self` | `align-self` | Выровнять один элемент иначе, чем остальные. / Align one item differently. |
| `order` | `order` | `order` | Порядок показа. Tab и скринридер идут по HTML, поэтому лучше менять HTML. / Display order only; prefer changing HTML. |

## Урок 6 / Lesson 6 / 6-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Сетка (Grid) | To‘r | Grid | Раскладка по строкам и столбцам сразу: `display: grid`. / Rows and columns at once. |
| Столбцы сетки | Ustunlar | Columns | `grid-template-columns: 250px 1fr;`. / Defined by `grid-template-columns`. |
| Ячейка | Katak | Cell | Клетка сетки; элементы встают в ячейки слева направо, сверху вниз. / A grid slot filled in reading order. |
| `fr` | `fr` | `fr` | Доля свободного места, «кусок пирога»: `2fr 1fr`. / A share of the free space. |
| `repeat()` | `repeat()` | `repeat()` | Повтор столбцов: `repeat(3, 1fr)`. / Repeats a column pattern. |
| `minmax()` | `minmax()` | `minmax()` | Столбец не уже минимума и не шире доли: `minmax(220px, 1fr)`. / Min and max size of a track. |
| `auto-fit` | `auto-fit` | `auto-fit` | Сколько столбцов поместится, столько и будет. Сетка без медиазапросов. / As many columns as fit. |
| `span` | `span` | `span` | Растянуть элемент на несколько ячеек: `grid-column: span 2;`. / Stretch across cells. |
| Линия сетки | Chiziq | Grid line | `grid-column: 1 / -1;` - от первой линии до последней, на всю ширину. / From the first line to the last. |
| Область | Soha | Area | Именованная часть макета в `grid-template-areas`; всегда прямоугольник. / A named rectangular region. |
| `grid-area` | `grid-area` | `grid-area` | Место элемента в макете: `grid-area: main;` - без кавычек. / Places an item into an area. |
| Макет | Maket | Layout | Общая схема страницы: шапка, боковая колонка, основное, подвал. / The page plan. |

## Урок 7 / Lesson 7 / 7-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Поток документа | Hujjat oqimi | Document flow | Элементы идут друг за другом, как в очереди. / Elements line up one after another. |
| `position` | `position` | `position` | Способ размещения: `static`, `relative`, `absolute`, `fixed`, `sticky`. / How an element is placed. |
| `static` | `static` | `static` | Значение по умолчанию: обычный поток, `top/left` не работают. / Default; offsets do nothing. |
| `relative` | `relative` | `relative` | Сдвиг от своего места, место остаётся занятым. Главная роль - опора для `absolute`. / Anchor for `absolute`. |
| `absolute` | `absolute` | `absolute` | «Наклейка на коробке»: выпадает из потока, отсчёт от ближайшего позиционированного предка. / Out of flow, placed from a positioned ancestor. |
| Позиционированный предок | Pozitsiyalangan ajdod | Positioned ancestor | Ближайший родитель с `position` не `static`. Нет такого - отсчёт от страницы. / The nearest non-static ancestor. |
| `fixed` | `fixed` | `fixed` | «Наклейка на экране»: отсчёт от окна, не двигается при прокрутке. / Fixed to the window. |
| `sticky` | `sticky` | `sticky` | «Магнит у края»: едет со страницей и прилипает. Нужны `top: 0` и фон. / Scrolls, then sticks. |
| Сдвиг | Surish | Moving (offsets) | Свойства `top`, `right`, `bottom`, `left`. `top: 10px` сдвигает **вниз**. / `top: 10px` moves the element down. |
| `inset` | `inset` | `inset` | `inset: 0` = `top/right/bottom/left: 0` - растянуть на весь родитель или окно. / Shorthand for all four offsets. |
| `z-index` | `z-index` | `z-index` | «Номер этажа» слоя. Работает только у позиционированных элементов. Шкала 1, 10, 100. / Stacking order. |
| Липкая шапка | Yopishqoq shapka | Sticky header | `position: sticky; top: 0;` + фон. / A header that stays on top while scrolling. |
| Якорь | Langar | Anchor | Ссылка на `#id` внутри страницы. Под липкой шапкой нужен `scroll-padding-top`. / An in-page link target. |

## Урок 8 / Lesson 8 / 8-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Адаптивная вёрстка | Moslashuvchan sahifa | Responsive layout | Один сайт, который сам подстраивается под любой экран. / One site that adapts to any screen. |
| `viewport` | `viewport` | `viewport` | `<meta name="viewport" ...>`: без него телефон показывает страницу как на экране 980px. / Required for media queries on phones. |
| Режим устройства | Qurilma rejimi | Device mode | Режим DevTools для проверки страницы на ширине телефона. / A DevTools mode to test phone widths. |
| Mobile-first | Mobile-first | Mobile first | Базовые стили - для телефона, шире - добавляем через `min-width`. / Phone styles first, then add for wider screens. |
| Медиазапрос | Media so‘rov | Media query | `@media (min-width: 600px) { ... }` - правила только при условии. / Rules applied only under a condition. |
| Точка перелома | Sinish nuqtasi | Breakpoint | Ширина, где ломается ваша вёрстка: в курсе 600px и 900px. / The width where the layout breaks. |
| Резиновая картинка | Elastik rasm | Fluid image | `img { max-width: 100%; height: auto; }` - не вылезает за экран. / An image that shrinks with the screen. |
| `clamp()` | `clamp()` | `clamp()` | Минимум, желаемое, максимум: `clamp(1.75rem, 4vw + 1rem, 3rem)`. / Min, preferred, max. |
| Тёмная тема | Tungi mavzu | Dark theme | Оформление для тёмной темы системы. / Styling for the system dark mode. |
| `prefers-color-scheme` | `prefers-color-scheme` | `prefers-color-scheme` | Медиазапрос о настройках пользователя: `(prefers-color-scheme: dark)`. / A media query on user settings. |
| Горизонтальная прокрутка | Gorizontal aylantirish | Horizontal scrolling | Главный признак сломанной мобильной вёрстки. / The main sign of a broken mobile layout. |

## Урок 9 / Lesson 9 / 9-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Переменная CSS | O‘zgaruvchi | Variable | `--primary: #1e3a8a;` в `:root`, имя всегда с двумя дефисами. / Name starts with two hyphens. |
| `:root` | `:root` | `:root` | Корень документа: объявленные там переменные доступны везде. / Variables there are available everywhere. |
| `var()` | `var()` | `var()` | Взять значение переменной: `color: var(--primary);`. / Reads a variable. |
| Псевдокласс | Psevdosinf | Pseudo-class | Селектор с одним двоеточием: элемент в состоянии или положении. / An element in a state or position. |
| Состояние | Holat | State | `:hover` - под курсором, `:active` - в момент нажатия. / Hover, active and so on. |
| Фокус | Fokus | Focus | Элемент, выбранный с клавиатуры (Tab). Рамку фокуса не убирают - её оформляют. / Keyboard selection; never hide it. |
| `:focus-visible` | `:focus-visible` | `:focus-visible` | Фокус при навигации клавиатурой; не мешает при клике мышью. / Keyboard focus only. |
| `:nth-child()` | `:nth-child()` | `:nth-child()` | Выбор по номеру: `:nth-child(even)` - каждый второй («зебра»). / Selects by position. |
| Псевдоэлемент | Psevdoelement | Pseudo-element | Селектор с двумя двоеточиями: `::before`, `::after`. Только для украшений. / Decorations without extra tags. |
| `content` | `content` | `content` | Обязательное свойство псевдоэлемента, даже пустое: `content: "";`. / Required, even if empty. |
| Переход | O‘tish | Transition | `transition: background-color 0.2s ease;` - плавно вместо скачка. Пишется на обычном состоянии. / Smooth change; put it on the normal state. |
| `transform` | `transform` | `transform` | Сдвиг, масштаб, поворот без сдвига соседей: `translateY(-4px)`. / Move, scale, rotate without moving neighbors. |
| Анимация | Animatsiya | Animation | `@keyframes` - сценарий из кадров, `animation` - запуск. / Keyframe scenario plus `animation`. |
| Уменьшить движение | Harakatni kamaytirish | Reduce motion | Настройка системы. Движение - только в `@media (prefers-reduced-motion: no-preference)`. / Motion only for those who do not mind. |

## Урок 10 / Lesson 10 / 10-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| План оформления | Bezash rejasi | Styling plan | Цвета, скругления, тени и шрифт решают заранее и кладут в переменные. / Decide colors and sizes up front. |
| Слой стилей | Qatlam | Layer | Основа → раскладка → компоненты → адаптивность → состояния. Комментарии разделяют слои. / The order of the stylesheet. |
| Основа | Asos | Base | Переменные, `box-sizing`, шрифт, резиновые картинки, колонка по центру. / Variables, font, container. |
| Раскладка | Joylashuv | Layout | Шапка на Flexbox, карточки на Grid. / Header and grid. |
| Компонент | Komponent | Component | Повторяющаяся часть интерфейса: карточка, таблица, форма. / A reusable UI part. |
| Ссылка пропуска меню | Menyuni o‘tkazib yuborish havolasi | Skip-menu link | Видна только в фокусе: помогает тем, кто ходит клавиатурой. / Appears on keyboard focus. |
| `font: inherit` | `font: inherit` | `font: inherit` | Поля формы по умолчанию не наследуют шрифт страницы - включаем явно. / Form fields do not inherit the font by default. |
| `border-collapse` | `border-collapse` | `border-collapse` | `collapse` - двойные рамки ячеек таблицы сливаются в одну. / Merges double table borders. |
| Проверка перед публикацией | Nashrdan oldin tekshiruv | Checking before publishing | Ширина экрана, клавиатура, контраст, движение, валидатор. / Width, keyboard, contrast, motion, validator. |
| Валидатор | Validator | Validator | Nu HTML Checker с отметкой CSS: ошибок быть не должно. / Checks the code for errors. |
| Очистка кэша | Kesh tozalash | Bypassing the cache | Ctrl+Shift+R (macOS: Cmd+Shift+R) - загрузить свежий `style.css`. / Reload with fresh files. |
| Репозиторий | Repozitoriya | Repository | Хранилище сайта на GitHub; обновление - Add file → Upload files → Commit changes. / Where the site lives on GitHub. |

---

[Содержание / Contents / Mundarija](README.md) · [Шпаргалка / Cheat sheet](CHEATSHEET.md) · [Источники / References](REFERENCES.md)
