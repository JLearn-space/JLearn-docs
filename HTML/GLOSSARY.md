# Словарь терминов / Glossary / Atamalar lug‘ati

Термины курса HTML в порядке уроков. Каждый термин указан в разделе урока, где он появляется впервые.

Course terms in lesson order. Each term is listed under the lesson where it first appears.

Kurs atamalari darslar tartibida. Har bir atama u birinchi marta uchraydigan dars bo‘limida berilgan.

## Урок 1 / Lesson 1 / 1-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| HTML | HTML | HTML | HyperText Markup Language: каркас страницы, описывает, **что** на ней есть. / The page frame: describes **what** is on the page. |
| Язык разметки | Belgilash tili | Markup language | Размечает текст («это заголовок», «это абзац»); условий и циклов в нём нет. Не язык программирования. / Labels text; not a programming language. |
| Тег | Teg | Tag | Метка в угловых скобках: `<p>` открывает, `</p>` закрывает. / A label in angle brackets: opening and closing. |
| Атрибут | Atribut | Attribute | Дополнительная настройка, пишется только в открывающем теге: `class="intro"`. / Extra setting, only in the opening tag. |
| Элемент | Element | Element | Теги + атрибуты + содержимое: `<p class="intro">Привет!</p>`. / Tags + attributes + content. |
| Парный элемент | Juft element | Paired element | Есть открывающий и закрывающий тег, между ними - содержимое: `<h1>...</h1>`. / Has an opening and a closing tag. |
| Пустой элемент | Bo‘sh element | Void element | Без содержимого и закрывающего тега: `<br>`, `<img>`, `<meta>`. / No content, no closing tag. |
| Тип документа | Hujjat turi | Document type | `<!DOCTYPE html>` - первая строка файла. / The first line of the file. |
| Служебная часть | Xizmat qismi | Service part (`<head>`) | `<head>`: кодировка, название вкладки, подключения. На странице не видна. / Not visible on the page. |
| Видимая часть | Ko‘rinadigan qism | Visible part (`<body>`) | `<body>`: всё, что видит пользователь. / Everything the user sees. |
| Кодировка | Kodlash | Encoding | `<meta charset="UTF-8">`, иначе вместо букв «кракозябры». / Without it you get gibberish. |
| `lang` | `lang` | `lang` | Язык текста страницы: `<html lang="ru">`. Нужен скринридеру и переводчику. / Language of the page text. |
| Комментарий | Izoh | Comment | `<!-- ... -->` - заметка в коде, браузер её не показывает. / A note the browser does not show. |
| DevTools | DevTools (dasturchi vositalari) | DevTools (developer tools) | Встроенные инструменты браузера: F12 или «Проверить». Изменения в них не сохраняются в файл. / Built-in browser tools; edits are not saved to the file. |
| Live Server | Live Server | Live Server | Расширение VS Code: обновляет страницу при каждом сохранении. / VS Code extension that reloads the page on save. |

## Урок 2 / Lesson 2 / 2-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Заголовок | Sarlavha | Heading | `<h1>`–`<h6>`. Один `h1` на странице, уровни без пропусков. / One `h1`, no skipped levels. |
| Иерархия смысла | Ma’no ierarxiyasi | Hierarchy of meaning | Заголовки - оглавление страницы, а не «крупный жирный текст». / Headings are a table of contents, not big bold text. |
| Абзац | Abzats | Paragraph | `<p>` - блок текста на одну мысль. / A block of text for one idea. |
| Семантика | Semantika | Semantics | Выбор тега по смыслу, а не по внешнему виду. / Choosing a tag by meaning, not by looks. |
| Семантические блоки | Semantik bloklar | Semantic blocks | `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` - «комнаты» страницы. / The "rooms" of a page. |
| Маркированный список | Tartibsiz ro‘yxat | Unordered list | `<ul>` + `<li>`: порядок не важен. / Order does not matter. |
| Нумерованный список | Tartibli ro‘yxat | Ordered list | `<ol>` + `<li>`: порядок важен (шаги, рецепт). / Order matters. |
| Список определений | Atamalar ro‘yxati | Description list | `<dl>`: термин `<dt>` и описание `<dd>`. / Term and its description. |
| Цитата | Iqtibos | Quotation | `<blockquote>` - длинная цитата из другого источника. / A long quote from a source. |
| Спецсимволы (HTML-сущности) | Maxsus belgilar | Special characters (HTML entities) | Запись символов, которые нельзя набрать напрямую: `&lt;` (<), `&copy;` (©). / Characters written as entities. |
| `<div>` | `<div>` | `<div>` | Блок без смысла - только когда ни один семантический тег не подходит. / A meaningless box, used only as a last resort. |

## Урок 3 / Lesson 3 / 3-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Ссылка | Havola | Link | `<a href="...">Понятный текст</a>` - «дверь» на другую страницу. / A "door" to another page. |
| `href` | `href` | `href` | Адрес, куда ведёт ссылка. Без него ссылка не работает. / The address the link leads to. |
| URL | URL | URL | Полный адрес ресурса в интернете: `https://site.uz/about.html`. / A full web address. |
| Абсолютный путь | Mutlaq yo‘l | Absolute path | Начинается с `https://`. Для чужих сайтов. / Starts with `https://`; for other sites. |
| Относительный путь | Nisbiy yo‘l | Relative path | Путь от текущего файла: `about.html`, `pages/schedule.html`. Для своих страниц. / From the current file; for your own pages. |
| `../` | `../` | `../` | Подняться на одну папку вверх: `href="../index.html"`. / Go up one folder. |
| `id` | `id` | `id` | Уникальное имя элемента на странице. Два одинаковых `id` - ошибка. / A unique element name. |
| Якорь | Langar | Anchor | Переход к разделу: `id="about"` + `href="#about"`. Как закладка в книге. / A jump to a section, like a bookmark. |
| Вкладка | Yorliq | Tab | Вкладка браузера. Новая - `target="_blank"`, только когда это действительно нужно. / Browser tab. |
| `rel="noopener noreferrer"` | `rel="noopener noreferrer"` | `rel="noopener noreferrer"` | Пара к `target="_blank"` для внешних ссылок. / Paired with `target="_blank"`. |
| `mailto:` / `tel:` | `mailto:` / `tel:` | `mailto:` / `tel:` | Ссылка на письмо / звонок. Телефон - в международном формате `+998...`. / Email / call link. |
| Главная страница | Bosh sahifa | Home page | Файл `index.html`: сервер открывает его по умолчанию. / Opened by default. |
| Навигация | Navigatsiya | Navigation | Одинаковое меню `<nav>` на всех страницах сайта. / The same menu on every page. |

## Урок 4 / Lesson 4 / 4-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Изображение | Rasm | Image | `<img>` - пустой элемент, «окно», через которое вставляется отдельный файл. / A window that shows a separate file. |
| `src` | `src` | `src` | Путь к файлу картинки или медиа. Правила - как у ссылок. / Path to the file. |
| Текстовое описание (`alt`) | Matnli tavsif (`alt`) | Text description (`alt`) | Что изображено, если картинку не видно. Украшению - `alt=""`. / What the image shows; `alt=""` for decoration. |
| `width` / `height` | `width` / `height` | `width` / `height` | Размеры в пикселях: место под картинку резервируется заранее. / Reserve space before loading. |
| Формат изображения | Rasm formati | Image format | Фото - JPEG или WebP, логотип и иконки - SVG или PNG. / Photo vs logo formats. |
| Ленивая загрузка | Kechiktirib yuklash | Lazy loading | `loading="lazy"`: картинка грузится, когда до неё долистали. / Loads when the user scrolls to it. |
| Подпись к рисунку | Rasm imzosi | Caption | `<figure>` + `<figcaption>`: видимая подпись. Не заменяет `alt`. / Visible caption; does not replace `alt`. |
| `controls` | `controls` | `controls` | Панель управления `<audio>` / `<video>`. Без него кнопок нет. / Player buttons. |
| `<source>` | `<source>` | `<source>` | Файл медиа внутри `<audio>` / `<video>`; можно дать несколько форматов. / A media file inside the player. |
| Обложка видео | Video muqovasi | Poster | `poster="..."` - картинка до запуска видео. / Image shown before playback. |
| Встраивание | Joylashtirish | Embedding | `<iframe>` с YouTube через «Поделиться → Встроить», обязательно `title`. / Embedding with `<iframe>`. |
| Иконка сайта | Sayt belgisi | Favicon | `<link rel="icon" href="favicon.png">` в `<head>`. / The tab icon. |

## Урок 5 / Lesson 5 / 5-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Таблица | Jadval | Table | `<table>` - для данных, а не для раскладки страницы. / For data, not for layout. |
| Строка | Qator | Row | `<tr>`: таблица строится строка за строкой. / Tables are built row by row. |
| Столбец | Ustun | Column | Вертикальный ряд ячеек; отдельного тега нет. / A vertical line of cells. |
| Ячейка | Katak | Cell | `<td>` - данные, `<th>` - заголовок. Всегда внутри `<tr>`. / Data or header cell, always inside `<tr>`. |
| Ячейка-заголовок | Sarlavha katagi | Header cell | `<th>` - подписывает строку или столбец. / Labels a row or column. |
| Название таблицы | Jadval nomi | Caption | `<caption>` сразу после `<table>`. / Right after `<table>`. |
| Части таблицы | Jadval qismlari | Table sections | `<thead>` / `<tbody>` / `<tfoot>`: шапка / тело / итог. / Head / body / foot. |
| `scope` | `scope` | `scope` | К чему относится заголовок: `col` - столбец, `row` - строка. / What a header belongs to. |
| Объединение ячеек | Kataklarni birlashtirish | Merging cells | `colspan` - по горизонтали, `rowspan` - по вертикали. В строке ячеек становится меньше. / Horizontal and vertical merging. |
| Скринридер | Ekran o‘quvchi | Screen reader | Программа, которая читает страницу вслух незрячему пользователю. / Reads the page aloud. |

## Урок 6 / Lesson 6 / 6-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Форма | Forma | Form | `<form>` - «бумажная анкета», которую браузер отправляет по адресу. / A paper form the browser delivers. |
| `action` | `action` | `action` | Куда отправить данные. / Where to send the data. |
| Метод отправки | Yuborish usuli | Method | `method="get"` - данные в адресе страницы; `post` - внутри запроса. / In the URL or in the request body. |
| Запрос | So‘rov | Request | То, что браузер отправляет серверу. Пароли - только через `https://`. / What the browser sends; HTTPS protects it. |
| Поле ввода | Kiritish maydoni | Input field | `<input type="...">`: `text`, `email`, `password`, `number`, `date`, `tel`. / Field types. |
| Подпись | Imzo | Label | `<label for="x">` + `<input id="x">`: связывает текст с полем. / Connects text with a field. |
| `name` | `name` | `name` | Имя, под которым значение поля уходит на сервер. Без него поле не отправится. / The key sent to the server. |
| `value` | `value` | `value` | Что отправляется для флажка или переключателя. / What gets sent. |
| Флажок | Belgilash katakchasi | Checkbox | `type="checkbox"`: можно отметить несколько вариантов. / Several choices allowed. |
| Переключатель | O‘tkazgich | Radio button | `type="radio"` с одним `name`: выбирается только один. / One choice from a group. |
| Подсказка-пример | Maslahat-namuna | Placeholder | `placeholder="..."`: серый пример в поле. Не вместо `label`. / A grey example, not a label. |
| Обязательное поле | Majburiy maydon | Required field | `required`: без заполнения форма не отправится. / Must be filled in. |
| Автозаполнение | Avtomatik to‘ldirish | Autofill | `autocomplete="email"`: подсказка браузеру. / A hint for the browser. |

## Урок 7 / Lesson 7 / 7-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Выпадающий список | Ochiluvchi ro‘yxat | Drop-down list | `<select>` + `<option value>`: выбрать из готовых вариантов. / Choose from ready options. |
| `selected` / `multiple` | `selected` / `multiple` | `selected` / `multiple` | Вариант выбран заранее / можно выбрать несколько. / Pre-selected / several allowed. |
| Группа вариантов | Variantlar guruhi | Option group | `<optgroup label="...">` внутри `<select>`. / Groups options. |
| `<datalist>` | `<datalist>` | `<datalist>` | Подсказки к обычному полю: `list="..."` + `<datalist id="...">`. Свой ответ тоже можно. / Suggestions; free input allowed. |
| Многострочный текст | Ko‘p qatorli matn | Multi-line text | `<textarea>`: начальный текст - между тегами, а не в `value`. / Text goes between the tags. |
| Рамка с заголовком | Sarlavhali ramka | Fieldset | `<fieldset>` + `<legend>` первым внутри: смысловая группа полей. / A group of fields with a title. |
| Кнопка | Tugma | Button | `<button type="submit">` / `"reset"` / `"button"`. Тип пишите всегда. / Always set the type. |
| Проверка ввода | Kiritishni tekshirish | Input validation | `required`, `min`, `max`, `maxlength`, `pattern` - браузер проверяет до отправки. / Browser checks before sending. |
| `pattern` | `pattern` | `pattern` | Шаблон допустимого текста: `pattern="[0-9]{7}"` - ровно семь цифр. / Allowed text format. |
| Ползунок | Slayder | Slider | `type="range"` с `min`, `max`, `step`. / A range slider. |

## Урок 8 / Lesson 8 / 8-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Доступность (a11y) | Foydalanish qulayligi (a11y) | Accessibility (a11y) | Страница работает для всех: с клавиатурой, скринридером, при плохом зрении. / Works for everyone. |
| Доступное имя | Qulay nom | Accessible name | «Бейдж» элемента, который читает скринридер: «Отправить, кнопка». / What a screen reader announces. |
| Нативный HTML | Tabiiy HTML | Native HTML | Готовые теги (`<button>`, `<a>`, `<details>`) уже доступны. Лучше, чем имитация. / Built-in accessible tags. |
| ARIA | ARIA | ARIA | Атрибуты для вспомогательных технологий. Нужны, когда нативного тега нет. / Attributes for assistive tech. |
| `aria-label` | `aria-label` | `aria-label` | Имя для кнопки или ссылки без видимого текста (иконка). / A name for an icon-only control. |
| `role` | `role` | `role` | Роль элемента. `<div role="button">` - имитация; используйте `<button>`. / Element role; prefer native tags. |
| Контраст | Kontrast | Contrast | Разница яркости текста и фона. Для обычного текста - не меньше 4.5:1. / At least 4.5:1 for normal text. |
| Фокус | Fokus | Focus | Элемент, который сейчас принимает клавиатуру. Tab - вперёд, Shift+Tab - назад. / The element receiving keyboard input. |
| `tabindex` | `tabindex` | `tabindex` | `0` - добавить в порядок Tab, `-1` - убрать. Положительные значения - никогда. / Never positive. |
| Ссылка пропуска меню | «Asosiy mazmunga o‘tish» havolasi | Skip link | `<a href="#main">` первой строкой в `<body>`. / First line in `<body>`. |
| `<details>` / `<summary>` | `<details>` / `<summary>` | `<details>` / `<summary>` | Раскрывающийся блок без JavaScript. / A native expandable block. |
| Аудит | Audit | Audit | Проверка страницы по списку с записью результата в журнал. / A checklist review with a log. |

## Урок 9 / Lesson 9 / 9-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Метатег | Meta-teg | Meta tag | `<meta>` в `<head>` - строка «технического паспорта» страницы. / A line of the page passport. |
| Описание страницы | Sahifa tavsifi | Description | `<meta name="description">`: 1–2 предложения, своё для каждой страницы. / Unique 1–2 sentences per page. |
| `viewport` | `viewport` | `viewport` | `width=device-width, initial-scale=1.0`: телефон не уменьшает страницу. / Normal view on phones. |
| SEO | SEO | SEO | Оптимизация для поисковых систем: понятные `title`, `description`, заголовки. / Search engine optimization. |
| Open Graph | Open Graph | Open Graph | `<meta property="og:...">` - карточка ссылки в соцсетях и мессенджерах. / Link preview card. |
| Файл стилей | Uslublar fayli | Stylesheet | `<link rel="stylesheet" href="css/style.css">` в `<head>`. / Linked in `<head>`. |
| Скрипт | Skript | Script | `<script src="js/main.js" defer></script>` - парный тег, всегда с `</script>`. / Always closed. |
| `defer` | `defer` | `defer` | Загрузить параллельно, выполнить после разбора страницы, по порядку. Выбор почти всегда. / Run after parsing, in order. |
| `async` | `async` | `async` | Выполнить сразу по готовности, без порядка: счётчики, аналитика. / Run when ready, no order. |
| Валидатор | Validator | Validator | Nu HTML Checker: находит незакрытые теги, повторы `id`, `<img>` без `alt`. / Finds markup errors. |
| Lighthouse | Lighthouse | Lighthouse | Отчёт в DevTools: оценки Accessibility и SEO от 0 до 100. / DevTools report with scores. |
| Папки проекта | Loyiha papkalari | Project folders | Папки `css/`, `js/`, `images/`; имена файлов латиницей без пробелов. / Folders and safe file names. |

## Урок 10 / Lesson 10 / 10-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Карта сайта | Sahifalar xaritasi | Site map | Схема страниц и переходов между ними - до первой строки кода. / Pages and links, drawn before coding. |
| План содержания | Mazmun rejasi | Content plan | Что будет на каждой странице. / What goes on each page. |
| Чек-лист | Chek-list | Checklist | Список проверок для каждой страницы перед публикацией. / Checks before publishing. |
| Журнал проверок | Tekshiruvlar jurnali | Check log | Что проверяли, что ожидали, что получилось, что исправили. / What was checked and fixed. |
| Хостинг | Xosting | Hosting | Сервер, который отдаёт сайт в интернет. / A server that serves the site. |
| GitHub Pages | GitHub Pages | GitHub Pages | Бесплатный хостинг: `https://логин.github.io/репозиторий/`. / Free hosting for static sites. |
| Репозиторий | Repozitoriy | Repository | Папка проекта на GitHub. Для бесплатного Pages - Public. / Project folder on GitHub. |
| Публикация | Nashr | Publishing | Загрузить файлы → выбрать источник Pages → дождаться публикации. / Upload, configure, deploy. |
| Публичная ссылка | Ommaviy havola | Public link | Адрес опубликованного сайта; все переходы проверяются заново. На сервере регистр в именах файлов важен. / Re-test everything; case matters. |

---

[Содержание / Contents / Mundarija](README.md) · [Шпаргалка / Cheat sheet](CHEATSHEET.md) · [Источники / References](REFERENCES.md)
