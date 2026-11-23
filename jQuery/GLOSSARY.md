# Словарь терминов / Glossary / Atamalar lug‘ati

Термины курса jQuery в порядке уроков. В скобках - урок, где термин появляется впервые. Термины курса JavaScript (переменная, функция, массив, DOM, событие, промис) - в [словаре курса JavaScript](https://github.com/JLearn-space/JLearn-docs/blob/main/JavaScript/GLOSSARY.md).

jQuery course terms in lesson order. The number in brackets is the lesson where the term first appears. Terms from the JavaScript course (variable, function, array, DOM, event, promise) are in the JavaScript course glossary.

jQuery kursi atamalari darslar tartibida. Qavs ichida - atama birinchi marta uchraydigan dars. JavaScript kursi atamalari (o‘zgaruvchi, funksiya, massiv, DOM, hodisa, promis) - JavaScript kursi lug‘atida.

## Урок 1 / Lesson 1 / 1-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Библиотека | Kutubxona | Library | Готовый набор функций, который подключают к своему проекту. jQuery - библиотека для работы со страницей. / A ready-made set of functions you add to your project. |
| CDN | CDN | CDN | Сеть серверов, откуда браузер скачивает файл библиотеки: `code.jquery.com`. / Servers that deliver the library file. |
| Полная сборка | To‘liq yig‘ma | Full build | `jquery-4.1.0.min.js` - со всеми частями. Используется в курсе. / The build with everything; used in the course. |
| Slim-сборка | Slim yig‘ma | Slim build | Облегчённый файл без эффектов и AJAX: `.fadeIn` и `$.ajax` в нём нет. / A lighter file without effects and AJAX. |
| `$` / `jQuery` | `$` / `jQuery` | `$` / `jQuery` | Главная функция библиотеки; `$` - короткое имя для `jQuery`. / The main library function; `$` is its short name. |
| jQuery-объект | jQuery obyekti | jQuery object | «Корзина» найденных элементов с методами jQuery. Возвращается всегда, даже пустой. / A "basket" of found elements with jQuery methods. |
| `.length` | `.length` | `.length` | Сколько элементов нашлось: `$(".card").length`. `0` - ничего. / How many elements were found. |
| Геттер | Getter | Getter | Вызов без значения - прочитать: `$el.text()`. Берёт данные первого элемента (у `.text()` - всех). / A call without a value that reads. |
| Сеттер | Setter | Setter | Вызов со значением - записать: `$el.text("Новый")`. Меняет все элементы. / A call with a value that writes to all. |
| Неявный перебор | Yashirin aylanib chiqish | Implicit iteration | Один вызов метода действует на каждый элемент в jQuery-объекте, без цикла. / One call acts on every element. |
| Цепочка вызовов | Chaqiruvlar zanjiri | Call chain | Несколько методов подряд: `$el.text("...").addClass("x")`. Геттер - только в конце. / Several methods in a row. |
| `$(function () { ... })` | `$(function () { ... })` | `$(function () { ... })` | Запустить код после разбора HTML. Замена устаревшему `$(document).ready(...)`. / Run code once the HTML is parsed. |
| DOM-элемент | DOM elementi | DOM element | «Голый» элемент без методов jQuery: `$el[0]`. Обратно - `$(element)`. / A plain element without jQuery methods. |

## Урок 2 / Lesson 2 / 2-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Селектор | Selektor | Selector | CSS-адрес элементов в `$()`: `"#journal .student"`, `"ul > li"`. / A CSS address of elements. |
| Атрибутный селектор | Atribut selektori | Attribute selector | Поиск по атрибуту: `[data-status="active"]`, `a[href^="https"]`. / Selecting by attribute value. |
| Обход DOM | DOM bo‘ylab harakat | DOM traversal | Переход от найденного элемента вниз, вверх и в стороны по дереву. / Moving down, up and sideways in the tree. |
| Родитель | Ota element | Parent | Элемент на один уровень выше: `.parent()`. / The element one level up. |
| Дети | Bolalar | Children | Прямые вложенные элементы: `.children()`. / Direct nested elements. |
| Потомки | Avlodlar | Descendants | Вложенные элементы на любой глубине: `.find(".x")`. / Nested elements at any depth. |
| Предок | Ajdod | Ancestor | Любой элемент выше по дереву. `.closest(".card")` - ближайший подходящий, начиная с самого элемента. / Any element higher up. |
| Соседи | Qo‘shnilar | Siblings | Элементы с тем же родителем: `.siblings()`, `.next()`, `.prev()`. / Elements with the same parent. |
| Индекс | Indeks | Index | Номер элемента с нуля: `.eq(1)` - второй, `.eq(-1)` - последний. / Zero-based position. |
| `.filter()` / `.not()` | `.filter()` / `.not()` | `.filter()` / `.not()` | Оставить подходящие / убрать подходящие. Возвращают новый jQuery-объект. / Keep / drop the matching ones. |
| `.is()` | `.is()` | `.is()` | Проверка: есть ли хотя бы один подходящий. Возвращает `true` / `false`. / A check, returns a boolean. |
| `.each()` и `$(this)` | `.each()` va `$(this)` | `.each()` and `$(this)` | Перебор, когда каждому элементу нужно своё действие; `this` - текущий DOM-элемент. / Iteration with a separate action per element. |
| `.map().get()` | `.map().get()` | `.map().get()` | Собрать значения элементов в обычный массив. / Collect element values into a plain array. |

## Урок 3 / Lesson 3 / 3-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Содержимое | Kontent | Content | То, что внутри элемента: текст или другие теги. / What is inside an element. |
| Разметка | Belgilash | Markup | HTML-теги внутри элемента. `.html()` читает и вставляет разметку. / HTML tags inside an element. |
| XSS | XSS | XSS | Уязвимость: чужой текст, вставленный через `.html()`, выполняется как код. Данные - только через `.text()`. / Foreign text run as code. |
| Значение поля | Maydon qiymati | Field value | То, что сейчас введено в поле: `.val()`. Всегда строка. / What is in the field now; always a string. |
| Атрибут | Atribut | Attribute | Что написано в теге HTML: `href`, `src`, `alt`. `.attr()`, `.removeAttr()`. / What is written in the HTML tag. |
| Свойство | Xususiyat | Property | Текущее состояние элемента в памяти: `checked`, `disabled`. Читается через `.prop()`. / The live state of an element. |
| `.prop()` | `.prop()` | `.prop()` | Прочитать или записать свойство: `$cb.prop("checked")` → `true` / `false`. / Read or write a property. |
| `data-*` | `data-*` | `data-*` | Свои атрибуты для данных: `data-user-id="7"`. / Custom data attributes. |
| `.data()` | `.data()` | `.data()` | Читает `data-*` с преобразованием типа (`"7"` → `7`); сеттер хранит значение в памяти, HTML не меняет. / Reads `data-*` with type conversion. |
| Функция как аргумент | Argument sifatida funksiya | Function as an argument | Сеттер с функцией: новое значение из старого, `$el.text((index, old) => ...)`. / A setter computing the new value from the old one. |
| Объект атрибутов | Atributlar obyekti | Attribute object | Несколько атрибутов за один вызов: `$img.attr({ src, alt })`. / Several attributes in one call. |

## Урок 4 / Lesson 4 / 4-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Класс | Klass | Class | «Наклейка» на элементе; внешний вид для неё описан в CSS. / A "sticker" styled in CSS. |
| `.addClass()` / `.removeClass()` | `.addClass()` / `.removeClass()` | `.addClass()` / `.removeClass()` | Добавить / убрать класс, не трогая остальные. / Add / remove a class, keeping others. |
| Переключение | Almashtirish | Toggling | `.toggleClass("is-open")` - был класс - убрать, не было - добавить. / Remove if present, add if not. |
| Класс по условию | Shartga ko‘ra klass | Class based on a condition | `.toggleClass("is-low", stock < limit)` - результат не зависит от числа вызовов. / Same result however many calls. |
| `.hasClass()` | `.hasClass()` | `.hasClass()` | Есть ли класс: `true` / `false`. / Is the class there. |
| «Один активный из группы» | «Guruhdan bitta faol» | "One active in a group" | Снять класс со всех, поставить одному: вкладки, меню. / Remove from all, add to one. |
| `aria-selected` | `aria-selected` | `aria-selected` | Атрибут выбранной вкладки для экранных чтецов: `"true"` / `"false"`. / Marks the selected tab. |
| Вычисленный стиль | Hisoblangan uslub | Computed style | Итоговое значение после всех правил CSS: `.css("width")` → `"200px"`. / The final value after all CSS rules. |
| Единицы измерения | O‘lchov birliklari | Units | В jQuery 4 единицы пишутся явно: `"37%"`, `"10px"`. / Units are written explicitly. |
| Размеры элемента | Element o‘lchamlari | Element sizes | `.width()` - содержимое, `.innerWidth()` + `padding`, `.outerWidth()` + `border`, `.outerWidth(true)` + `margin`. / Content, padding, border, margin. |
| Положение | Joylashuv | Position | `.offset()` - от начала документа, `.position()` - от родителя. / From the document / from the parent. |
| Прокрутка | Aylantirish | Scrolling | `$(window).scrollTop()` - на сколько пикселей прокручена страница. / How far the page is scrolled. |

## Урок 5 / Lesson 5 / 5-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Создание элемента | Element yaratish | Creating an element | `$("<li>")` - новый элемент, пока не на странице. / A new element, not yet on the page. |
| Объект настроек | Sozlamalar obyekti | Settings object | `$("<li>", { class: "x", text: "..." })` - элемент сразу с классом и текстом. / An element created with options. |
| Вставка внутрь | Ichiga qo‘yish | Inserting inside | `.append()` - в конец, `.prepend()` - в начало родителя. / To the end / start of the parent. |
| Вставка рядом | Yoniga qo‘yish | Inserting next to | `.after()` / `.before()` - соседом после / перед элементом. / As a sibling after / before. |
| `.appendTo()` / `.prependTo()` | `.appendTo()` / `.prependTo()` | `.appendTo()` / `.prependTo()` | То же, но цепочка продолжается с новым элементом. / Same, but the chain continues with the new element. |
| Перемещение | Ko‘chirish | Moving | Вставка уже существующего элемента не копирует, а переносит его. / Inserting an existing element moves it. |
| `.remove()` | `.remove()` | `.remove()` | Удалить элемент вместе с данными и обработчиками. / Remove an element with its data and handlers. |
| `.empty()` | `.empty()` | `.empty()` | Очистить содержимое, сам элемент остаётся. / Clear the content, keep the element. |
| `.detach()` | `.detach()` | `.detach()` | Вынуть элемент, сохранив обработчики, чтобы вставить позже. / Take out, keeping handlers. |
| Копия | Nusxa | Copy | `.clone()`; `.clone(true)` - вместе с обработчиками. / A copy; `true` keeps handlers. |
| Замена | Almashtirish | Replacing | `$old.replaceWith($new)`. / Put one element in place of another. |
| Отрисовка массива | Massivni chizish | Rendering an array | `empty()` → для каждого объекта создать и вставить элемент → обновить счётчик. / Clear, create, insert, count. |

## Урок 6 / Lesson 6 / 6-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Обработчик события | Hodisa ishlovchisi | Event handler | Функция, которая выполняется при каждом событии. Подключается через `.on()`. / A function run on each event. |
| `.on()` | `.on()` | `.on()` | Единственный способ подписки в курсе; `.click(fn)` не используется. / The only way to subscribe in the course. |
| `this` и `$(this)` | `this` va `$(this)` | `this` and `$(this)` | Элемент, на котором сработал обработчик; в стрелочной функции `this` другой. / The element the handler runs on. |
| Состояние | Holat | State | То, что страница «помнит» между кликами: `let count = 0;` снаружи обработчика. / What the page remembers between clicks. |
| Объект события | Hodisa obyekti | Event object | Параметр `event`: `event.key`, `event.target`, `event.preventDefault()`. / The `event` parameter. |
| `target` / `currentTarget` | `target` / `currentTarget` | `target` / `currentTarget` | Куда кликнули / на чьём обработчике сейчас событие. / Where it was clicked / whose handler runs. |
| Действие по умолчанию | Standart amal | Default action | Что браузер делает сам: переход по ссылке, отправка формы. Отмена - `event.preventDefault()`. / What the browser does by itself. |
| Всплытие | Ko‘tarilish | Bubbling | Событие поднимается от элемента ко всем предкам. Остановить - `event.stopPropagation()`. / The event rises to all ancestors. |
| Делегирование | Delegatsiya | Delegation | Один обработчик на родителе для всех детей, в том числе будущих: `$list.on("click", ".item", fn)`. / One handler on the parent. |
| `.off()` | `.off()` | `.off()` | Снять обработчик. / Remove a handler. |
| `.one()` | `.one()` | `.one()` | Обработчик, который сработает один раз. / A handler that fires only once. |
| `.trigger()` | `.trigger()` | `.trigger()` | Запустить событие из кода: `$el.trigger("click")`. / Fire an event from code. |
| Пространство имён | Nomlar fazosi | Namespace | Метка события: `click.menu`; `.off(".menu")` снимает только свои обработчики. / A label to remove only your handlers. |
| `aria-pressed` | `aria-pressed` | `aria-pressed` | Состояние кнопки-переключателя для экранных чтецов: `"true"` / `"false"`. / State of a toggle button. |

## Урок 7 / Lesson 7 / 7-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Эффект | Effekt | Effect | Готовая анимация jQuery: `.fadeIn()`, `.slideUp()`. Только в полной сборке. / A ready-made jQuery animation. |
| `.show()` / `.hide()` / `.toggle()` | `.show()` / `.hide()` / `.toggle()` | `.show()` / `.hide()` / `.toggle()` | Показать / скрыть / переключить; `.toggle(state)` - по условию. / Show / hide / switch. |
| `fade` | `fade` | `fade` | Плавное изменение прозрачности: `.fadeIn()`, `.fadeOut()`, `.fadeToggle()`. / Changing opacity smoothly. |
| `slide` | `slide` | `slide` | Плавное раскрытие и сворачивание по высоте: `.slideDown()`, `.slideUp()`, `.slideToggle()`. / Opening and closing by height. |
| Длительность | Davomiylik | Duration | Время эффекта в мс: `200`; `"fast"` = 200, `"slow"` = 600, по умолчанию 400. / Effect time in ms. |
| Функция завершения | Yakunlash funksiyasi | Completion function | Выполняется после окончания анимации: `.fadeOut(300, function () { ... })`. / Runs when the animation ends. |
| `.animate()` | `.animate()` | `.animate()` | Своя анимация числовых свойств CSS: `{ width: "300px", opacity: 0.5 }`. / A custom animation of numeric CSS properties. |
| Очередь анимаций | Animatsiyalar navbati | Animation queue | Эффекты одного элемента выполняются по очереди, один за другим. / Effects of one element run one after another. |
| `.delay()` | `.delay()` | `.delay()` | Пауза в очереди: `.fadeIn().delay(2000).fadeOut()`. / A pause in the queue. |
| `.stop()` | `.stop()` | `.stop()` | Остановить анимацию; `.stop(true, true)` - очистить очередь и закончить текущую. / Stop; `(true, true)` clears the queue. |
| `aria-expanded` | `aria-expanded` | `aria-expanded` | Раскрыт ли блок: `"true"` / `"false"` на кнопке аккордеона или меню. / Whether a block is open. |
| `prefers-reduced-motion` | `prefers-reduced-motion` | `prefers-reduced-motion` | Настройка системы «уменьшить движение». Проверка: `window.matchMedia(...)`. / The "reduce motion" system setting. |
| `$.fx.off` | `$.fx.off` | `$.fx.off` | Выключатель всех эффектов jQuery: при `true` они срабатывают мгновенно. / Turns all jQuery effects off. |
| CSS-переход | CSS o‘tishi | CSS transition | `transition` в CSS + `.toggleClass()` в jQuery - простой и быстрый способ анимации. / Animation via CSS and a class. |

## Урок 8 / Lesson 8 / 8-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Событие `submit` | `submit` hodisasi | `submit` event | Отправка формы - кнопкой или Enter. Ловится на `<form>`, а не на кнопке. / Form submission, caught on `<form>`. |
| `novalidate` | `novalidate` | `novalidate` | Атрибут формы: отключить встроенные подсказки браузера и проверять поля своим кодом. / Turns off built-in browser validation. |
| Поле | Maydon | Field | `<input>`, `<select>`, `<textarea>`; значение - `.val()`, всегда строка. / A form control; its value is a string. |
| Флажок | Belgilash katakchasi | Checkbox | `.prop("checked")` или `.is(":checked")` - отмечен ли. / Read with `.prop("checked")`. |
| Переключатель | Radiotugma | Radio button | Выбор одного из группы: `$("input[name='level']:checked").val()`. / One choice from a group. |
| `.serializeArray()` | `.serializeArray()` | `.serializeArray()` | Данные формы массивом пар `[{ name, value }]`. Берутся только поля с `name`. / Form data as name-value pairs. |
| `.serialize()` | `.serialize()` | `.serialize()` | Данные формы строкой для сервера: `"name=...&age=..."`. / Form data as a string for the server. |
| Проверка полей | Maydonlarni tekshirish | Validating fields | Сравнение введённого с правилами до отправки; ошибки - рядом с полем. / Checking input against rules. |
| Флаг `isValid` | `isValid` bayrog‘i | `isValid` flag | `let isValid = true;` - станет `false` при первой ошибке, но проверка идёт по всем полям. / Becomes `false` on any error. |
| `aria-invalid` | `aria-invalid` | `aria-invalid` | Отмечает поле с ошибкой: `"true"`. Снять - `.removeAttr("aria-invalid")`. / Marks an invalid field. |
| `aria-describedby` | `aria-describedby` | `aria-describedby` | Связывает поле с текстом ошибки по `id`, чтобы экранный чтец его прочитал. / Links a field to its error text. |
| Фокус | Fokus | Focus | Активное поле. После проверки фокус - на первое поле с ошибкой: `.trigger("focus")`. / The active field. |
| Блокировка кнопки | Tugmani bloklash | Disabling the button | `$btn.prop("disabled", true)` на время отправки, чтобы не было двойной заявки. / Prevents double sending. |
| Сброс формы | Formani tozalash | Resetting the form | `$form[0].reset()` - метод DOM-элемента формы. / A method of the form DOM element. |

## Урок 9 / Lesson 9 / 9-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| AJAX | AJAX | AJAX | Загрузка данных с сервера без перезагрузки страницы. Только в полной сборке. / Loading data without reloading the page. |
| Запрос / ответ | So‘rov / javob | Request / response | Запрос - адрес, метод (`GET`, `POST`), данные. Ответ - код и данные. / Address, method, data / code and data. |
| Код ответа | Javob kodi | Status code | `200` - успех, `404` - не найдено, `0` - ответа не было: `jqXHR.status`. / The response status. |
| JSON | JSON | JSON | Текстовый формат данных; `$.getJSON` сам превращает его в объект или массив. / Text data format. |
| `$.getJSON` | `$.getJSON` | `$.getJSON` | Загрузить и разобрать JSON: `$.getJSON("data/courses.json")`. / Load and parse JSON. |
| jqXHR | jqXHR | jqXHR | Объект запроса jQuery - «трек-номер посылки»: статус и подписка на результат. / The jQuery request object. |
| Deferred: `.done` / `.fail` / `.always` | Deferred: `.done` / `.fail` / `.always` | Deferred: `.done` / `.fail` / `.always` | Успех / ошибка / в любом случае. Ответ 404 сразу попадает в `.fail`. / Success / error / always. |
| `await` с jQuery | jQuery bilan `await` | `await` with jQuery | jqXHR похож на промис: `const data = await $.getJSON(url);`, ошибка - в `catch`. / jqXHR can be awaited. |
| Асинхронность | Asinxronlik | Asynchrony | Пока идёт запрос, страница работает; `.done` выполнится позже. / The page keeps working during a request. |
| Три состояния | Uch holat | Three states | Загрузка → данные / пусто / ошибка: каждое показывается пользователю. / Loading → data / empty / error. |
| `$.ajax` | `$.ajax` | `$.ajax` | Запрос с полной настройкой: `url`, `method`, `data`, `dataType`, `timeout`, `cache`. / A fully configured request. |
| Кэш | Kesh | Cache | Сохранённая браузером копия ответа; `cache: false` - всегда свежие данные. / The browser's saved copy of a response. |
| `file://` и Live Server | `file://` va Live Server | `file://` and Live Server | Со страницы `file://` запросы запрещены (CORS, `status` = `0`) - нужен сервер. / Requests need a server. |
| `responseURL` | `responseURL` | `responseURL` | Новое в jQuery 4.1: полный адрес, откуда реально пришёл ответ. / New in 4.1: the actual response URL. |

## Урок 10 / Lesson 10 / 10-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Плагин | Plagin | Plugin | Свой метод jQuery-объекта, доступный у любого `$(...)`. / Your own method on every jQuery object. |
| `$.fn` | `$.fn` | `$.fn` | Место, куда добавляют методы плагинов: `$.fn.charCounter = function (options) { ... };`. / Where plugin methods live. |
| `return this.each(...)` | `return this.each(...)` | `return this.each(...)` | Обработать каждый элемент и вернуть jQuery-объект, чтобы цепочка продолжалась. / Process each element, keep the chain. |
| Настройки по умолчанию | Standart qiymatlar | Default values | Объект `defaults`; пользователь меняет только нужное. / The `defaults` object. |
| `$.extend` | `$.extend` | `$.extend` | Объединить объекты: `$.extend({}, defaults, options)`. / Merge objects. |
| Защита от повторного вызова | Qayta chaqirishdan himoya | Protection from repeated calls | Метка в `.data()`: второй вызов не создаёт второй счётчик. / A `.data()` mark that prevents duplicates. |
| Обёртка плагина | Plagin o‘rami | Plugin wrapper | `(function ($) { ... })(jQuery);` - свои переменные не попадают наружу, `$` - точно jQuery. / Keeps variables private. |
| Чужой плагин | Begona plagin | Third-party plugin | Чужой файл плагина: подключается после jQuery, проверяется на совместимость с jQuery 4. / Someone else's plugin. |
| Порядок подключения | Ulash tartibi | Loading order | jQuery → плагины → `main.js`; скрипты с `defer` выполняются в порядке тегов. / jQuery, then plugins, then `main.js`. |
| Удалённые функции | Olib tashlangan funksiyalar | Removed functions | В jQuery 4 нет `$.trim`, `$.isArray`, `$.parseJSON`: вместо них `str.trim()`, `Array.isArray`, `JSON.parse`. / Functions removed in jQuery 4. |
| jQuery Migrate | jQuery Migrate | jQuery Migrate | Временный плагин при переходе на jQuery 4: в консоли - предупреждения `JQMIGRATE`. / A temporary upgrade helper. |
| Прогрессивное улучшение | Progressiv yaxshilash | Progressive enhancement | Страница работает без JavaScript, а скрипт добавляет удобство: `$("html").addClass("js")`. / The page works without JS; JS adds to it. |
| Публикация | E’lon qilish | Publishing | Размещение сайта на GitHub Pages; имена файлов чувствительны к регистру. / Putting the site on GitHub Pages. |

---

[Содержание / Contents / Mundarija](README.md) · [Шпаргалка / Cheat sheet](CHEATSHEET.md) · [Источники / References](REFERENCES.md)
