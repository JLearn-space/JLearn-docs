# Шпаргалка по курсу / Course cheat sheet / Kurs bo‘yicha qisqa qo‘llanma

Вся разметка курса на одной странице, по урокам. Код написан по правилам курса: теги и атрибуты строчными буквами, значения атрибутов в двойных кавычках, отступ 4 пробела, относительные пути для своих файлов.

All course markup on one page, by lesson. The code follows the course rules: lowercase tags and attributes, double-quoted attribute values, 4-space indentation, relative paths for your own files.

Kursdagi barcha belgilash bitta sahifada, darslar bo‘yicha. Kod kurs qoidalariga mos: teg va atributlar kichik harflarda, atribut qiymatlari qo‘shtirnoqda, 4 bo‘shliqli chekinish, o‘z fayllar uchun nisbiy yo‘llar.

## 1. Скелет документа / Document skeleton / Hujjat skeleti

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Знакомство</title>
</head>
<body>
    <!-- Комментарий: браузер его не показывает -->
    <h1>Привет, я Азиз</h1>
    <p>Я учусь создавать сайты.</p>
</body>
</html>
```

| Задача / Task | Код / Code |
| --- | --- |
| Тип документа / Document type | `<!DOCTYPE html>` - первая строка / first line |
| Язык страницы / Page language | `<html lang="ru">`, `lang="uz"`, `lang="en"` |
| Кодировка / Encoding | `<meta charset="UTF-8">` |
| Название вкладки / Tab title | `<title>...</title>` - не путать с `h1` / not the same as `h1` |
| Быстрый скелет в VS Code / Quick skeleton | `!` + Tab (Emmet) |
| Открыть DevTools / Open DevTools | F12 или «Проверить» / or Inspect; macOS: Cmd+Option+I |

## 2. Текст и семантика / Text and semantics / Matn va semantika

```html
<header>
    <nav>...</nav>
</header>
<main>
    <h1>Памятка участника</h1>
    <section>
        <h2>Что взять с собой</h2>
        <ul>
            <li>Ноутбук</li>
            <li>Зарядку</li>
        </ul>
    </section>
    <section>
        <h2>Как начать</h2>
        <ol>
            <li>Открыть VS Code.</li>
            <li>Создать файл <code>index.html</code>.</li>
        </ol>
        <p><strong>Важно:</strong> сохраняйте файл <em>перед</em> проверкой.</p>
    </section>
</main>
<footer>
    <p><small>&copy; 2026 Кружок веб-разработки</small></p>
</footer>
```

| Задача / Task | Код / Code |
| --- | --- |
| Заголовки / Headings | `<h1>` один, затем `<h2>` → `<h3>` без пропусков / one `h1`, no skipped levels |
| Абзац / перенос / смена темы | `<p>` / `<br>` / `<hr>` |
| Важно / ударение / подсветка / примечание | `<strong>` / `<em>` / `<mark>` / `<small>` |
| Списки / Lists | `<ul>` / `<ol>` / `<dl>` + `<dt>` + `<dd>` |
| Цитата / код | `<blockquote>` / `<code>` |
| Символы `<` и © / Characters | `&lt;` и `&copy;` |
| Блоки страницы / Page blocks | `<header>` `<nav>` `<main>` `<section>` `<article>` `<aside>` `<footer>` |

## 3. Ссылки / Links / Havolalar

```html
<nav>
    <ul>
        <li><a href="index.html">Главная</a></li>
        <li><a href="about.html">О кружке</a></li>
        <li><a href="schedule.html#wednesday">Занятие в среду</a></li>
    </ul>
</nav>

<h2 id="contacts">Контакты</h2>
<a href="#contacts">К контактам</a>
<a href="mailto:club@example.com">Написать на почту</a>
<a href="tel:+998901234567">Позвонить</a>
<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">MDN (откроется в новой вкладке)</a>
```

| Задача / Task | Код / Code |
| --- | --- |
| Чужой сайт / Other site | `href="https://site.uz"` |
| Своя страница рядом / Page next to this one | `href="about.html"` |
| Во вложенной папке / In a subfolder | `href="pages/schedule.html"` |
| Уровнем выше / One level up | `href="../index.html"` |
| Раздел этой страницы / Section on this page | `id="about"` + `href="#about"` |
| Раздел другой страницы / Section on another page | `href="schedule.html#wednesday"` |
| Новая вкладка / New tab | `target="_blank" rel="noopener noreferrer"` + предупреждение в тексте / warning in the text |

## 4. Изображения и медиа / Images and media / Rasmlar va media

```html
<figure>
    <img src="images/cat.jpg" alt="Рыжий кот спит на подоконнике" width="400" height="300" loading="lazy">
    <figcaption>Мой кот Барсик</figcaption>
</figure>

<video controls width="640" poster="images/poster.jpg">
    <source src="video/intro.mp4" type="video/mp4">
    <a href="video/intro.mp4">Скачать видео</a>
</video>

<audio controls>
    <source src="audio/song.mp3" type="audio/mpeg">
</audio>
```

| Задача / Task | Код / Code |
| --- | --- |
| Украшение / Decoration | `alt=""` |
| Картинка-ссылка / Image link | `<a href="..."><img src="..." alt="куда ведёт ссылка"></a>` |
| Видео с YouTube / YouTube video | `<iframe src="https://www.youtube.com/embed/..." title="..."></iframe>` |
| Иконка сайта / Favicon | `<link rel="icon" href="favicon.png">` в `<head>` |
| Формат / Format | Фото - JPEG или WebP, логотип - SVG или PNG / photo vs logo |

## 5. Таблицы / Tables / Jadvallar

```html
<table>
    <caption>Расписание кружка</caption>
    <thead>
        <tr>
            <th scope="col">День</th>
            <th scope="col">Время</th>
            <th scope="col">Тема</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Понедельник</th>
            <td>15:00</td>
            <td>HTML</td>
        </tr>
        <tr>
            <th scope="row">Среда</th>
            <td colspan="2">Свободная практика</td>
        </tr>
    </tbody>
</table>
```

| Задача / Task | Код / Code |
| --- | --- |
| Название / Caption | `<caption>` сразу после `<table>` / right after `<table>` |
| Заголовок столбца / строки | `<th scope="col">` / `<th scope="row">` |
| На 2 столбца / Across 2 columns | `colspan="2"` - в этой строке на 1 ячейку меньше / one cell fewer in this row |
| На 2 строки / Across 2 rows | `rowspan="2"` - в следующей строке на 1 ячейку меньше / one cell fewer in the next row |
| Раскладка страницы / Page layout | Не таблица, а CSS / CSS, not a table |

## 6. Формы, часть 1 / Forms, part 1 / Formalar, 1-qism

```html
<form action="https://example.com/signup" method="get">
    <label for="email">Электронная почта</label>
    <input type="email" id="email" name="email" autocomplete="email" required>

    <p>Направления:</p>
    <input type="checkbox" id="html" name="topics" value="html">
    <label for="html">HTML</label>
    <input type="checkbox" id="css" name="topics" value="css">
    <label for="css">CSS</label>

    <p>Формат занятий:</p>
    <input type="radio" id="online" name="format" value="online" required>
    <label for="online">Онлайн</label>
    <input type="radio" id="offline" name="format" value="offline">
    <label for="offline">В классе</label>

    <input type="submit" value="Записаться">
</form>
```

| Задача / Task | Код / Code |
| --- | --- |
| Подпись к полю / Label | `<label for="x">` + `<input id="x">` |
| Имя для отправки / Name to send | `name="..."` |
| Типы полей / Field types | `type="text"` `"email"` `"password"` `"number"` `"date"` `"tel"` |
| Один из группы / One of a group | `type="radio"` с одинаковым `name` / same `name` |
| Пример в поле / Example in a field | `placeholder="..."` - не вместо `label` / not instead of `label` |
| GET или POST | `get` - данные видны в адресе; пароли - `post` и только `https://` / passwords: `post` over HTTPS only |

## 7. Формы, часть 2 / Forms, part 2 / Formalar, 2-qism

```html
<form action="https://example.com/profile" method="post">
    <fieldset>
        <legend>Участник</legend>

        <label for="student-id">ID студента (7 цифр)</label>
        <input type="text" id="student-id" name="student_id" pattern="[0-9]{7}" required>

        <label for="group">Группа</label>
        <select id="group" name="group">
            <optgroup label="1 курс">
                <option value="101" selected>101</option>
                <option value="102">102</option>
            </optgroup>
        </select>

        <label for="city">Город</label>
        <input type="text" id="city" name="city" list="cities">
        <datalist id="cities">
            <option value="Ташкент"></option>
            <option value="Алмалык"></option>
        </datalist>

        <label for="level">Уровень: от 1 до 10</label>
        <input type="range" id="level" name="level" min="1" max="10">

        <label for="about">О себе</label>
        <textarea id="about" name="about" maxlength="300"></textarea>
    </fieldset>

    <button type="submit">Отправить</button>
    <button type="reset">Очистить</button>
</form>
```

| Задача / Task | Код / Code |
| --- | --- |
| Выбор из списка / Drop-down | `<select>` + `<option value="...">` |
| Выбрано заранее / несколько | `selected` / `multiple` |
| Подсказки в поле / Suggestions | `list="id"` + `<datalist id="id">` |
| Границы числа / Number limits | `min="1" max="10"` |
| Длина текста / Text length | `maxlength="300"` |
| Формат / Format | `pattern="[0-9]{7}"` |
| Тип кнопки / Button type | `type="submit"` / `"reset"` / `"button"` - писать всегда / always set |

## 8. Доступность / Accessibility / Foydalanish qulayligi

```html
<body>
    <a href="#main">Перейти к основному содержимому</a>
    <header>...</header>
    <main id="main">
        <button type="button" aria-label="Закрыть меню">✕</button>

        <details>
            <summary>Как записаться?</summary>
            <p>Заполните форму на странице «Контакты».</p>
        </details>
    </main>
</body>
```

| Задача / Task | Код / Code |
| --- | --- |
| Имя для иконки без текста / Name for an icon | `aria-label="..."` - только если нет видимого текста / only without visible text |
| Кнопка / Button | `<button>`, а не `<div role="button">` |
| Порядок Tab / Tab order | Порядок в HTML-коде; `tabindex="0"` или `"-1"`, положительный - никогда / never positive |
| Контраст / Contrast | Обычный текст - не меньше 4.5:1 / at least 4.5:1 |
| Сообщение об ошибке / Error message | Текст + цвет, не только цветом / text + colour, not colour alone |
| Проверка клавиатурой / Keyboard check | Tab, Shift+Tab, Enter, пробел / Space |

## 9. Метаданные и подключения / Metadata and linking / Metadata va ulash

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Контакты - Кружок веб-разработки</title>
    <meta name="description" content="Как связаться с кружком веб-разработки: почта, телефон и форма записи.">
    <meta property="og:title" content="Кружок веб-разработки">
    <meta property="og:description" content="Учимся создавать сайты с нуля.">
    <link rel="icon" href="favicon.png">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/main.js" defer></script>
</head>
```

| Задача / Task | Код / Code |
| --- | --- |
| Описание для поиска / Search description | `<meta name="description" content="...">` - своё на каждой странице / unique per page |
| Вид на телефоне / Mobile view | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` |
| Карточка в соцсетях / Social card | `<meta property="og:...">` |
| Стили / Styles | `<link rel="stylesheet" href="css/style.css">` |
| Скрипт по порядку / Script in order | `<script src="..." defer></script>` |
| Независимый скрипт / Independent script | `<script src="..." async></script>` |
| Папки проекта / Project folders | `css/`, `js/`, `images/`; имена `my-photo.jpg` - латиница, без пробелов / Latin, no spaces |
| Проверка / Checking | Nu HTML Checker, DevTools → Lighthouse |

## 10. Публикация / Publishing / Nashr qilish

| Шаг / Step | Действие / Action |
| --- | --- |
| 1. Репозиторий / Repository | **New repository** → имя латиницей / Latin name → **Public** → **Create repository** |
| 2. Файлы / Files | **uploading an existing file** → перетащить **содержимое** папки сайта / drag the folder **contents** → **Commit changes** |
| 3. Pages | **Settings** → **Pages** → **Deploy from a branch** → `main`, `/ (root)` → **Save** |
| 4. Проверка / Check | Через 1–3 минуты открыть `https://логин.github.io/репозиторий/` и пройти все ссылки / open the URL and test every link |

```text
my-site/
├── index.html
├── about.html
├── projects.html
├── contact.html
├── favicon.png
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
```

## Частые сообщения об ошибках / Common error messages / Ko‘p uchraydigan xato xabarlari

Сообщения Nu HTML Checker и браузера приводятся по-английски, как их показывает инструмент.

| Сообщение / Message | Что значит / Meaning / Ma’nosi |
| --- | --- |
| `Duplicate ID top.` | Два элемента с одним `id`. / Same `id` twice. / Bir xil `id` ikki marta. |
| `An img element must have an alt attribute, except under certain conditions.` | У `<img>` нет `alt`. / Missing `alt`. / `alt` yo‘q. |
| `No p element in scope but a p end tag seen.` | Лишний `</p>`: часто из-за `<p>` внутри `<p>`. / Stray `</p>`, often a nested `<p>`. / Ortiqcha `</p>`. |
| `Unclosed element div.` / `End tag for body seen, but there were unclosed elements.` | Не закрыт парный тег. / A paired tag is not closed. / Juft teg yopilmagan. |
| `Start tag seen without seeing a doctype first. Expected <!DOCTYPE html>.` | Нет `<!DOCTYPE html>` в первой строке. / Missing doctype. / `<!DOCTYPE html>` yo‘q. |
| `Consider adding a lang attribute to the html start tag to declare the language of this document.` | Нет `lang` у `<html>` (предупреждение). / Missing `lang` (warning). / `lang` yo‘q. |
| `Element head is missing a required instance of child element title.` | В `<head>` нет `<title>`. / No `<title>`. / `<title>` yo‘q. |
| `The value of the for attribute of the label element must be the ID of a non-hidden form control.` | `for` у `<label>` не совпадает ни с одним `id`. / `for` matches no `id`. / `for` hech bir `id` ga mos emas. |
| `Bad value ... for attribute href on element a: Illegal character in path segment: space is not allowed.` | Пробел в пути или имени файла. / Space in a path. / Yo‘lda bo‘shliq bor. |
| `Failed to load resource: the server responded with a status of 404 (Not Found)` | Консоль DevTools: файл не найден - ошибка в пути, имени или регистре букв. / Wrong path, name or letter case. / Yo‘l, nom yoki harf registri xato. |
| `404` на GitHub Pages / on GitHub Pages | Нет `index.html` в корне репозитория или Pages не включён. / No `index.html` at the root, or Pages is off. / Ildizda `index.html` yo‘q yoki Pages yoqilmagan. |

---

[Содержание / Contents / Mundarija](README.md) · [Словарь / Glossary](GLOSSARY.md) · [Источники / References](REFERENCES.md)
