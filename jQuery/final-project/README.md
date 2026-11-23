# Итоговый проект курса jQuery

Готовый пример к уроку 10: сайт кружка из курса JavaScript, переписанный на jQuery 4.1, плюс собственный плагин и аккордеон. Это **образец для сверки**, а не заготовка: свой проект вы делаете на сайте из курсов HTML, CSS и JavaScript.

| Функция | Где в коде | Урок курса | Страница |
| --- | --- | --- | --- |
| Мобильное меню, Escape, возврат фокуса | `initMenu` в [js/main.js](final/js/main.js) | 4, 6 | Все |
| Тема с сохранением в `localStorage` | `initTheme` | 4, 6, 9 | Все |
| События из `data/events.json`: `$.getJSON`, фильтр с делегированием, три состояния | `initEvents`, `renderEvents` | 5, 6, 9 | [index.html](final/index.html) |
| Форма с проверкой и доступными ошибками | `initContactForm` | 3, 8 | [contact.html](final/contact.html) |
| Счётчик символов - свой плагин | [js/jquery.char-counter.js](final/js/jquery.char-counter.js) | 10 | [contact.html](final/contact.html) |
| Аккордеон «Частые вопросы» с учётом `prefers-reduced-motion` | `initFaq` | 7 | [contact.html](final/contact.html) |

## Порядок подключения

```html
<script src="https://code.jquery.com/jquery-4.1.0.min.js"></script>
<script src="js/jquery.char-counter.js" defer></script>
<script src="js/main.js" defer></script>
```

Сначала библиотека, затем плагин, затем код страницы. Каждая функция `init...` сама проверяет `.length` своих элементов и выходит, если их нет на текущей странице.

## Как запустить

`$.getJSON` не работает при открытии файла двойным кликом (`file://`). Откройте папку `final` в VS Code и запустите **Live Server** или выполните в этой папке:

```bash
python3 -m http.server 8000
```

Затем откройте http://localhost:8000.

## Что проверить

Пройдите чек-лист приёмки из урока 10: консоль без ошибок, работа с клавиатуры, сохранение темы между страницами, каждая кнопка фильтра, ошибки формы и счётчик символов, аккордеон (открыт только один ответ), работа без JavaScript (DevTools → Disable JavaScript) и ширина экрана 375 px.
