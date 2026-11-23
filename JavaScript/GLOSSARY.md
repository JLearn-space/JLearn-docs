# Словарь терминов / Glossary / Atamalar lug‘ati

Термины курса JavaScript в порядке уроков. В скобках - урок, где термин появляется впервые.

Course terms in lesson order. The number in brackets is the lesson where the term first appears.

Kurs atamalari darslar tartibida. Qavs ichida - atama birinchi marta uchraydigan dars.

## Урок 1 / Lesson 1 / 1-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Программа | Dastur | Program | Набор инструкций, которые компьютер выполняет по порядку. / A list of instructions the computer runs in order. |
| Инструкция | Ko‘rsatma | Statement | Одна команда: `console.log("Привет");`. Заканчивается `;`. / One command, ends with `;`. |
| Консоль | Konsol | Console | Вкладка DevTools, куда пишет `console.log` и где видны ошибки. / DevTools tab for output and errors. |
| Комментарий | Izoh | Comment | Текст для человека, браузер его пропускает: `//` или `/* */`. / Text for humans, ignored by the browser. |
| Переменная | O‘zgaruvchi | Variable | Имя, за которым хранится значение. / A name that holds a value. |
| Объявление | E’lon qilish | Declaration | Создание переменной: `const name = "Анна";`. Пишется один раз. / Creating a variable, done once. |
| Присваивание | Qiymat berish | Assignment | Запись значения в переменную оператором `=`. / Storing a value with `=`. |
| `const` | `const` | `const` | Переменная, которую нельзя переназначить. Выбор по умолчанию. / Cannot be reassigned; the default choice. |
| `let` | `let` | `let` | Переменная, значение которой меняется. / A variable whose value changes. |
| `defer` | `defer` | `defer` | Атрибут `<script>`: выполнить код после разбора всего HTML. / Run the script after the HTML is parsed. |

## Урок 2 / Lesson 2 / 2-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Значение | Qiymat | Value | Данные: `42`, `"текст"`, `true`. / A piece of data. |
| Тип данных | Ma’lumot turi | Data type | Вид значения: `number`, `string`, `boolean`, `null`, `undefined`. / The kind of a value. |
| Строка | Satr | String | Текст в кавычках: `"Привет"`. / Text in quotes. |
| Число | Son | Number | `5`, `3.14`, `-1`. Дробная часть пишется через точку. / Decimal point, not comma. |
| Логическое значение | Mantiqiy qiymat | Boolean | `true` или `false`. / `true` or `false`. |
| `undefined` | `undefined` | `undefined` | «Значения ещё нет»: переменная объявлена, но не заполнена. / "No value yet". |
| `null` | `null` | `null` | «Пусто намеренно»: программист сам записал «ничего». / "Empty on purpose". |
| `NaN` | `NaN` | `NaN` | «Не число»: результат неудачного преобразования, например `Number("abc")`. / "Not a Number". |
| Оператор | Operator | Operator | Знак действия: `+`, `-`, `*`, `/`, `%`, `===`. / A symbol that performs an action. |
| Выражение | Ifoda | Expression | Код, который даёт значение: `price * 2`. / Code that produces a value. |
| Шаблонная строка | Shablon satr | Template literal | Строка в обратных кавычках с `${...}`: `` `Итого: ${total}` ``. / Backtick string with `${}`. |
| Строгое сравнение | Qat’iy taqqoslash | Strict equality | `===` сравнивает и значение, и тип. / Compares value and type. |

## Урок 3 / Lesson 3 / 3-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Условие | Shart | Condition | Выражение в `if (...)`, которое решает, выполнять ли блок. / Decides whether a block runs. |
| Ветка | Tarmoq | Branch | Один из вариантов `if` / `else if` / `else`. / One path of an `if`. |
| Блок | Blok | Block | Код в фигурных скобках `{ }`. / Code inside `{ }`. |
| Логические операторы | Mantiqiy operatorlar | Logical operators | `&&` (и), `\|\|` (или), `!` (не). / and, or, not. |
| Truthy / falsy | Truthy / falsy | Truthy / falsy | Как значение ведёт себя в условии. Falsy: `false`, `0`, `""`, `null`, `undefined`, `NaN`. / How a value acts in a condition. |
| Тернарный оператор | Ternar operator | Ternary operator | `условие ? да : нет` - короткий `if` для выбора значения. / Short `if` that picks a value. |
| `switch` | `switch` | `switch` | Выбор по точному совпадению с вариантами `case`. Не забывайте `break`. / Picks a `case` by exact match. |

## Урок 4 / Lesson 4 / 4-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Цикл | Sikl | Loop | Повторение блока кода, пока условие истинно. / Repeating a block while a condition holds. |
| Итерация | Iteratsiya | Iteration | Один проход цикла. / One pass through a loop. |
| Счётчик | Hisoblagich | Counter | Переменная, которая считает шаги: `i`. / A variable counting passes. |
| Накопитель | Yig‘uvchi | Accumulator | Переменная, куда собирается результат: `sum = sum + i`. / Collects a result across passes. |
| `break` / `continue` | `break` / `continue` | `break` / `continue` | Выйти из цикла / перейти к следующему шагу. / Exit the loop / skip to the next pass. |
| Бесконечный цикл | Cheksiz sikl | Infinite loop | Цикл, условие которого никогда не станет ложным. Вкладка зависает. / Never ends; the tab freezes. |

## Урок 5 / Lesson 5 / 5-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Функция | Funksiya | Function | Именованный кусок кода, который можно вызывать много раз. / Named reusable code. |
| Вызов | Chaqirish | Call | Запуск функции: `getGrade(85)`. Без `()` функция не выполняется. / Running a function. |
| Параметр | Parametr | Parameter | Имя-«ячейка» в объявлении: `function f(price)`. / The name in the declaration. |
| Аргумент | Argument | Argument | Значение, переданное при вызове: `f(100)`. / The value passed in a call. |
| `return` | `return` | `return` | Вернуть результат и сразу выйти из функции. / Give back a result and exit. |
| Стрелочная функция | Strelkali funksiya | Arrow function | Короткая запись: `const double = (n) => n * 2;`. / Short function syntax. |
| Область видимости | Ko‘rinish sohasi | Scope | Где переменная доступна. Переменная из `{ }` снаружи не видна. / Where a variable is visible. |
| Чистая функция | Sof funksiya | Pure function | Результат зависит только от аргументов, ничего снаружи не меняет. / Same input, same output, no side effects. |

## Урок 6 / Lesson 6 / 6-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Массив | Massiv | Array | Упорядоченный список: `["a", "b"]`. / An ordered list. |
| Индекс | Indeks | Index | Номер элемента, считается с `0`. Последний - `arr.length - 1`. / Position, starts at 0. |
| Объект | Obyekt | Object | Набор пар «ключ: значение»: `{ name: "Анна", age: 15 }`. / Key-value pairs. |
| Свойство | Xususiyat | Property | Пара «ключ: значение» в объекте; читается `user.name` или `user["name"]`. / One key-value pair. |
| Метод | Metod | Method | Функция, принадлежащая значению: `arr.push(1)`, `text.trim()`. / A function on a value. |
| Колбэк | Callback | Callback | Функция, которую передают в другую функцию: `arr.map((n) => n * 2)`. / A function passed to another function. |
| `map` / `filter` / `find` / `reduce` | `map` / `filter` / `find` / `reduce` | `map` / `filter` / `find` / `reduce` | Преобразовать каждый / оставить подходящие / найти первый / свести к одному значению. / Transform / keep / find first / combine. |
| Деструктуризация | Destrukturizatsiya | Destructuring | Достать части в переменные: `const { name } = user;`. / Unpacking into variables. |
| Spread `...` | Spread `...` | Spread `...` | Разложить элементы: `[...arr, 4]`, `{ ...user, age: 16 }`. / Spread items into a new array or object. |
| Ссылка | Havola | Reference | Переменная с массивом или объектом хранит ссылку на него, а не копию. / Arrays and objects are shared, not copied. |

## Урок 7 / Lesson 7 / 7-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| DOM | DOM | DOM | Дерево объектов, которое браузер строит из HTML. JavaScript меняет страницу через него. / The tree the browser builds from HTML. |
| Узел / элемент | Tugun / element | Node / element | Часть дерева DOM; элемент - узел-тег, например `<li>`. / A part of the tree; an element is a tag node. |
| Селектор | Selektor | Selector | Строка из CSS для поиска: `"#menu"`, `".card"`. / CSS-style search string. |
| `textContent` | `textContent` | `textContent` | Текст элемента. Безопасен для данных пользователя. / Element text, safe for user data. |
| `classList` | `classList` | `classList` | Добавить, убрать, переключить класс CSS. / Add, remove, toggle CSS classes. |
| `dataset` | `dataset` | `dataset` | Доступ к атрибутам `data-*`: `data-id` → `el.dataset.id`. / Access to `data-*` attributes. |

## Урок 8 / Lesson 8 / 8-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Событие | Hodisa | Event | Что-то произошло: клик, ввод, нажатие клавиши. / Something happened: click, input, key press. |
| Обработчик | Ishlovchi | Event handler / listener | Функция, которая выполняется при событии. / A function that runs on an event. |
| Объект события | Hodisa obyekti | Event object | Параметр обработчика `event` с деталями: `target`, `key`. / Details of what happened. |
| `target` | `target` | `target` | Элемент, на котором событие произошло. / The element where the event happened. |
| `preventDefault()` | `preventDefault()` | `preventDefault()` | Отменить действие браузера по умолчанию, например отправку формы. / Cancel the browser's default action. |
| Всплытие | Ko‘tarilish | Bubbling | Событие поднимается от элемента к родителям. / The event travels up to ancestors. |
| Делегирование | Delegatsiya | Delegation | Один обработчик на родителе вместо многих на детях. / One listener on a parent for many children. |

## Урок 9 / Lesson 9 / 9-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Валидация | Validatsiya | Validation | Проверка, что данные формы правильные, до отправки. / Checking form data before using it. |
| `localStorage` | `localStorage` | `localStorage` | Хранилище строк в браузере, переживает перезагрузку. / Browser string storage that survives reloads. |
| JSON | JSON | JSON | Текстовый формат данных. `JSON.stringify` - в строку, `JSON.parse` - обратно. / Text data format. |
| Запрос | So‘rov | Request | Обращение к серверу за данными: `fetch(url)`. / Asking a server for data. |
| Асинхронность | Asinxronlik | Asynchrony | Код не ждёт долгую операцию, а продолжает работу; результат приходит позже. / Long work finishes later without blocking. |
| Промис | Promise | Promise | Объект-«обещание» будущего результата: выполнится или завершится ошибкой. / A future result: fulfilled or rejected. |
| `async` / `await` | `async` / `await` | `async` / `await` | Писать асинхронный код по порядку: `await` ждёт промис. / Write async code top to bottom. |
| `try` / `catch` | `try` / `catch` | `try` / `catch` | Перехватить ошибку и показать понятное сообщение. / Catch an error and handle it. |

## Урок 10 / Lesson 10 / 10-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Модуль | Modul | Module | Отдельный файл JS со своей областью видимости: `<script type="module">`. / A JS file with its own scope. |
| `export` / `import` | `export` / `import` | `export` / `import` | Отдать функцию из модуля / подключить её в другом. / Share / use code between modules. |
| Отладка | Nosozlikni tuzatish | Debugging | Поиск и исправление ошибок: консоль, `console.log`, точки останова. / Finding and fixing bugs. |
| Состояние | Holat | State | Данные, от которых зависит вид страницы сейчас: тема, фильтр, список. / Data the page currently depends on. |

---

[Содержание / Contents / Mundarija](README.md) · [Шпаргалка / Cheat sheet](CHEATSHEET.md) · [Источники / References](REFERENCES.md)
