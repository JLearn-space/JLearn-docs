# Arrays and objects

[Contents](../../README.md) · [← Back](../../Lesson-5/en/Functions.md) · [Next →](../../Lesson-7/en/DOM%20finding%20and%20changing%20elements.md) · [RU](../ru/%D0%9C%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D1%8B%20%D0%B8%20%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D1%8B.md) · [EN](Arrays%20and%20objects.md) · [UZ](../uz/Massivlar%20va%20obyektlar.md)

> **Link to lessons 4–5:** you went through a string with a loop and wrote functions. Today we will learn to store **a lot of data at once** - a list of students, a product catalogue - and process it with functions in one line.

---

## Why you need this

An online shop has hundreds of products, each with a name, a price, a category and stock status. Creating variables `product1Name`, `product1Price`, `product2Name`... is impossible. Data is stored in **arrays** (lists) and **objects** (cards with properties). Almost everything a website gets from a server is an array of objects.

After this lesson you will be able to calculate a class's average score, find a product by name and select all top students - each action in one or two lines.

---

## What you will learn

- Create an array, read items by index, find out the length.
- Add and remove items: `push`, `pop`; search: `includes`, `indexOf`.
- Go through an array with a `for...of` loop.
- Describe an entity with an object: properties, dot and square brackets.
- Work with an array of objects.
- Transform data with the methods `map`, `filter`, `find`, `reduce`.
- Unpack values with destructuring and copy with `...`.

---

## Review: 3 questions from lesson 5

1. How does `return` differ from `console.log`?
2. Rewrite `function half(n) { return n / 2; }` as an arrow.
3. What is a pure function?

Answers are at the end of the lesson.

---

## Lesson plan

| Section | What we do |
| --- | --- |
| Arrays | A numbered list |
| Changing and searching | Add, remove, find |
| Objects | A card with properties |
| Mini-task 1 | A product card |
| Array of objects | A catalogue |
| `map`, `filter`, `find`, `reduce` | Processing in one line |
| Destructuring and `...` | Unpack and copy |
| Mini-task 2 | Products in stock |
| Independent work | A grade book |

---

## Arrays

**In simple words:** an array is a shopping list. The items go in order, and each has a number.

```js
const fruits = ["apple", "banana", "pear"];

console.log(fruits[0]);       // "apple"
console.log(fruits[2]);       // "pear"
console.log(fruits.length);   // 3
console.log(fruits[fruits.length - 1]); // "pear" - the last item
console.log(fruits[5]);       // undefined - there is no such item
```

| Term | What it is |
| --- | --- |
| `[ ... ]` | An array: values separated by commas |
| Item | One value in the array |
| Index | The item's number. **Counting starts at zero**: the first is `0`, the last is `length - 1` |
| `length` | The number of items |

An array can hold values of any type, but usually of one: only numbers, only strings, only objects.

```js
const scores = [92, 78, 65, 88];
const empty = [];
```

### Going through an array

`for...of` from lesson 4 works with arrays too:

```js
const scores = [92, 78, 65, 88];
let sum = 0;

for (const score of scores) {
    sum += score;
}

console.log(sum / scores.length); // 80.75
```

---

## Changing and searching

```js
const cart = ["bread", "milk"];

cart.push("cheese");   // add to the end → ["bread", "milk", "cheese"]
cart.pop();            // remove the last → ["bread", "milk"]
cart[0] = "loaf";      // replace by index → ["loaf", "milk"]

console.log(cart.includes("milk"));  // true
console.log(cart.indexOf("milk"));   // 1
console.log(cart.indexOf("kefir"));  // -1 - not found
```

> **`const` and an array:** `const cart = [...]` forbids putting **another** array into `cart` (`cart = []` is an error). But changing the contents of the same array - `push`, `pop`, `cart[0] = ...` - is allowed. A constant is a label stuck to one box forever, not a ban on opening the box.

---

## Objects

**In simple words:** an object is a card in a card index. Each line of the card has a name and a value.

```js
const student = {
    name: "Anna",
    age: 15,
    isActive: true,
};

console.log(student.name);    // "Anna"
console.log(student["age"]);  // 15
```

| Term | What it is |
| --- | --- |
| `{ ... }` | An object |
| Property | A `key: value` pair |
| Key | The property name: `name`, `age` |
| `student.name` | Reading with a dot - the main way |
| `student["name"]` | With brackets - when the property name is stored in a variable |

A comma after the last property is allowed and handy: when you add a new line you will not forget the comma.

### Changing an object

```js
const student = { name: "Anna", age: 15 };

student.age = 16;            // change
student.city = "Tashkent";   // add a new property
console.log(student);        // { name: "Anna", age: 16, city: "Tashkent" }
console.log(student.phone);  // undefined - there is no such property

const key = "name";
console.log(student[key]);   // "Anna" - the property name from a variable
```

### Nesting

A property's value can be an array or another object:

```js
const course = {
    title: "JavaScript",
    lessons: 10,
    author: { name: "Javlonbek", city: "Tashkent" },
    tags: ["language", "DOM", "events"],
};

console.log(course.author.city);  // "Tashkent"
console.log(course.tags[1]);      // "DOM"
console.log(course.tags.length);  // 3
```

---

## Mini-task 1

Create an object `product` with the properties `title`, `price`, `inStock` (boolean). Increase the price by 10%, add a `category` property and print the line `Laptop: 5500000 UZS, in stock: true` with a template string. The solution is in the "Answers" section.

---

## Array of objects

The most common shape of data is an array where each item is an object with the same set of properties:

```js
const students = [
    { name: "Anna", score: 92 },
    { name: "Timur", score: 78 },
    { name: "Lola", score: 65 },
    { name: "Sardor", score: 95 },
];

console.log(students[1].name);   // "Timur"

for (const student of students) {
    console.log(`${student.name}: ${student.score}`);
}
```

You will see the same structure in data from a server (lesson 9) and will put it on the page (lesson 7).

---

## `map`, `filter`, `find`, `reduce`

Array methods take a **function** and go through the items themselves. The handiest thing to pass is an arrow function from lesson 5.

### `map` - transform each item

Returns a **new** array of the same length:

```js
const names = students.map((student) => student.name);
console.log(names); // ["Anna", "Timur", "Lola", "Sardor"]

const prices = [1000, 2500, 400];
const withTax = prices.map((price) => price * 1.12);
```

### `filter` - select the matching ones

Returns a new array with only the items for which the function returned `true`:

```js
const excellent = students.filter((student) => student.score >= 90);
console.log(excellent.length); // 2
```

### `find` - find the first match

Returns **one item**, or `undefined` if nothing was found:

```js
const timur = students.find((student) => student.name === "Timur");
console.log(timur.score); // 78

const nobody = students.find((student) => student.name === "Ira");
console.log(nobody);      // undefined
```

### `reduce` - reduce to one value

Goes through the array and accumulates a result - like the accumulator from lesson 4:

```js
const total = students.reduce((sum, student) => sum + student.score, 0);
console.log(total); // 330
```

| Part | What it is |
| --- | --- |
| `sum` | The accumulator: the result of the previous step |
| `student` | The current item |
| `sum + student.score` | The new accumulator value |
| `0` | The initial accumulator value - **always set it** |

### Chains

Methods that return an array can be chained:

```js
const topNames = students
    .filter((student) => student.score >= 90)
    .map((student) => student.name);

console.log(topNames); // ["Anna", "Sardor"]
```

| Method | Returns | Original array |
| --- | --- | --- |
| `map` | A new array of the same length | Unchanged |
| `filter` | A new array, possibly shorter | Unchanged |
| `find` | One item or `undefined` | Unchanged |
| `reduce` | One value | Unchanged |
| `push` / `pop` | The length / the removed item | **Changed** |

---

## Destructuring and `...`

### Destructuring - unpacking

```js
const student = { name: "Anna", score: 92 };
const { name, score } = student;
console.log(name, score); // Anna 92

const colors = ["red", "green", "blue"];
const [first, second] = colors;
console.log(first);       // "red"
```

It is handy in function parameters:

```js
const getLabel = ({ name, score }) => `${name} - ${score}`;
console.log(getLabel(student)); // Anna - 92
```

### Spread `...` - spreading out

```js
const a = [1, 2];
const b = [...a, 3];              // [1, 2, 3] - a new array, a is unchanged

const base = { name: "Anna", score: 92 };
const updated = { ...base, score: 95 };   // a copy with a new score
console.log(base.score, updated.score);   // 92 95
```

**Why copy?** A pure function does not change its input. If a function should "add a student", it returns a new array `[...students, newStudent]` and the original stays the same. This makes bugs easier to find: data does not change "behind your back".

---

## Mini-task 2

You have a `products` array of three objects `{ title, price, inStock }`. Get an array of the names of products in stock and the total price of those products. Use `filter`, `map` and `reduce`. The solution is in the "Answers" section.

---

## Lesson summary: cheat sheet

| Task | Code |
| --- | --- |
| Array / item / length | `[1, 2]` / `arr[0]` / `arr.length` |
| Last item | `arr[arr.length - 1]` |
| Add / remove at the end | `arr.push(x)` / `arr.pop()` |
| Is the value there / index | `arr.includes(x)` / `arr.indexOf(x)` |
| Object / property | `{ name: "Anna" }` / `obj.name`, `obj[key]` |
| Transform each | `arr.map((x) => ...)` |
| Select | `arr.filter((x) => condition)` |
| Find one | `arr.find((x) => condition)` |
| Reduce to one | `arr.reduce((acc, x) => ..., 0)` |
| Unpack | `const { name } = obj;` |
| A copy with an addition | `[...arr, x]`, `{ ...obj, key: value }` |

---

## Independent work

### Part 1. IDE task (graded by the platform)

The platform sets an array `students` - objects `{ name, score }`. Write **pure** functions that change nothing in the input:

1. `getAverage(list)` - the average score rounded with `Math.round`. For an empty array - `0`.
2. `getExcellentNames(list)` - an array of the **names** of students with a score of 90 or more.
3. `findStudent(list, name)` - the student object with that name, or `undefined`.
4. `addStudent(list, name, score)` - a **new** array with the added student `{ name, score }`; the original array does not change.

Use array methods: `reduce`, `filter`, `map`, `find` and spread `...`.

What the platform checks: the results of the functions for the given array and others, including an empty one; `getExcellentNames` returns strings, not objects; `addStudent` does not change the original array; `reduce`, `filter`, `map`, `find` and `...` are used.

### Part 2. Project on your computer

1. In your website's `main.js` describe the website's data as an array of objects: classes, products, members - whatever is on your pages.
2. Print to the console: the number of items, a list of names (`map`), a list filtered by some feature (`filter`), a sum or an average of a numeric property (`reduce`).
3. Write a function that finds an item by name with `find`, and test it with an existing and a non-existing name.

This array will be useful in lesson 7: we will put it on the page.

### Acceptance criteria

- [ ] The IDE task is accepted.
- [ ] The website's data is an array of objects with the same properties.
- [ ] Transforming and selecting use `map` and `filter`, not hand-written loops.
- [ ] `reduce` always has an initial value.
- [ ] The functions do not change the input array.

---

## Self-check questions

1. What are the indexes of the first and the last item of a 5-item array?
2. What does `arr[10]` return if the array has 3 items?
3. Why does `arr.push(1)` work with `const arr = []`, but not `arr = [1]`?
4. When do you use `obj.key`, and when `obj[key]`?
5. How does `map` differ from `filter`?
6. What does `find` return if nothing was found?
7. Why does `reduce` need its second argument - the initial value?
8. Do `map` and `filter` change the original array? What about `push`?
9. What does `const { name } = student;` do?
10. How do you get a new array with an added item without changing the original?

After the questions, take the **lesson test** on the platform: 12 questions, pass mark 70%.

---

## What's next

So far the results are only visible in the console. Users do not open the console. In lesson 7 JavaScript will start **changing the page itself**: finding elements, changing text and classes, creating new cards from an array of data.

---

## Answers

**Review**

1. `return` gives the value to the program, `console.log` only shows it.
2. `const half = (n) => n / 2;`.
3. A function whose result depends only on its arguments and which changes nothing outside.

**Mini-task 1**

```js
const product = {
    title: "Laptop",
    price: 5000000,
    inStock: true,
};

product.price = product.price * 1.1;
product.category = "Electronics";

console.log(`${product.title}: ${Math.round(product.price)} UZS, in stock: ${product.inStock}`);
// Laptop: 5500000 UZS, in stock: true
```

`Math.round` is a safety net here: multiplying by a fraction can give a result with a "tail", like `0.1 + 0.2` in lesson 2 (for example, `1000 * 1.15` gives `1150`, but `7 * 1.1` gives `7.700000000000001`).

**Mini-task 2**

```js
const products = [
    { title: "Pen", price: 3000, inStock: true },
    { title: "Notebook", price: 8000, inStock: false },
    { title: "Ruler", price: 5000, inStock: true },
];

const available = products.filter((product) => product.inStock);
const titles = available.map((product) => product.title);
const total = available.reduce((sum, product) => sum + product.price, 0);

console.log(titles, total); // ["Pen", "Ruler"] 8000
```

**Self-check questions**

1. `0` and `4`.
2. `undefined`.
3. `const` forbids reassigning the variable, not changing the array's contents.
4. With a dot - when the property name is known in advance; with brackets - when it is stored in a variable.
5. `map` transforms every item (same length), `filter` keeps only the matching ones.
6. `undefined`.
7. It is the accumulator's starting value; without it an empty array causes an error and the result may be unexpected.
8. `map` and `filter` - no, they return a new array. `push` - yes.
9. Creates a constant `name` with the value `student.name`.
10. `const next = [...arr, item];`.

---

[Contents](../../README.md) · [← Back](../../Lesson-5/en/Functions.md) · [Next →](../../Lesson-7/en/DOM%20finding%20and%20changing%20elements.md) · [RU](../ru/%D0%9C%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D1%8B%20%D0%B8%20%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D1%8B.md) · [EN](Arrays%20and%20objects.md) · [UZ](../uz/Massivlar%20va%20obyektlar.md)
