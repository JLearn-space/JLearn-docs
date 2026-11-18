# Meta tags, SEO, linking CSS and JS

[Contents](../../README.md) · [Previous](../../Lesson-8/en/Accessibility%20%28a11y%29.md) · [Next](../../Lesson-10/en/Final%20project%20from%20planning%20to%20publication.md) · [Practice](../practice.html) · [RU](../ru/%D0%9C%D0%B5%D1%82%D0%B0-%D1%82%D0%B5%D0%B3%D0%B8%2C%20SEO%2C%20%D1%81%D0%B2%D1%8F%D0%B7%D1%8C%20%D1%81%20CSS%2C%20JS.md) · [EN](../en/Meta%20tags%2C%20SEO%2C%20linking%20CSS%20and%20JS.md) · [UZ](../uz/Meta-teglar%2C%20SEO%2C%20CSS%20va%20JS%20bilan%20bog%27lanish.md)

> **Connection to the previous lesson:** in the previous lesson we covered accessibility for people. Today we figure out how to make a page understandable for **search engines and other sites** - and also prepare the technical groundwork for connecting CSS and JavaScript, which will be the focus beyond the scope of this course.

---

## What you will learn by the end of the lesson

- Configure key meta tags: `charset`, `description`, `viewport`.
- Understand Open Graph basics - how a site looks when shared on social networks.
- Connect external CSS and JS files via `<link>` and `<script>`.
- Understand the difference between `defer` and `async` when connecting scripts.
- Check code validity through the W3C Validator.
- Organize a project folder structure following standard practices.

---

## Lesson plan

| Section                                         | Content                         |
| -------------------------------------------- | -------------------------------- |
| Meta tags: charset, description, viewport | Service information about the page |
| Open Graph (overview)                     | How the page looks on social networks |
| Connecting CSS via link                   | Syntax, where to place it       |
| Connecting JS via script                  | Syntax, defer/async overview     |
| Mini-task                                  | Build head on your own          |
| W3C Validator                              | Checking code for errors        |
| Project folder structure                   | Standard file organization      |
| Summary and practical task                | Reinforcement                   |

---

## Meta tags: charset, description, viewport

HTML is maintained as the WHATWG Living Standard. Nu HTML Checker checks markup conformance, not full accessibility, working links or SEO quality; test these separately. Viewport does not automatically make fixed-size media or tables responsive. Here, defer refers to external classic scripts and has no effect on inline code. Async executes when loading completes and execution can proceed; it does not preserve script order. Create the referenced CSS/JS files before testing their connections.


We already encountered one meta tag in the very first lesson - `<meta charset="UTF-8">`. Today we'll cover this topic completely and add several more important tags that live inside `<head>`.

**In simple terms:** meta tags are like a label on product packaging: the product itself (the visible content of the page) is what you hold in your hands, and on the label there's additional information - ingredients, expiration date, barcode. This information is not part of the product itself, but is critically important for the store, warehouse, and customer to handle it correctly.

### `<meta charset="UTF-8">` - encoding (review)

```html
<meta charset="UTF-8">
```

As we covered in lesson 1, this line tells the browser what encoding the document's text is stored in - UTF-8 supports virtually all languages in the world, including Cyrillic.

### `<meta name="description" content="...">` - page description

```html
<meta name="description" content="The 'HTML: in 10 lessons' course - 10 lessons for those who want to learn web development from scratch and publish their first website.">
```

Write a concise, accurate page description. Meta description has no fixed length limit: the search engine may select page text and truncate the snippet to the available width.

- appears in Google/Yandex search results below the link title - this is what people actually read when deciding whether to click on your site in search results;
- is sometimes used by social networks when a link is shared (more in block 2).

**Analogy:** if `<title>` is the book title on the cover, then `description` is the blurb on the back of the cover that helps someone in a bookstore decide whether to pick up the book to read.

### `<meta name="viewport" content="width=device-width, initial-scale=1.0">` - mobile responsiveness

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

This is arguably the most technically important meta tag of the modern web. Without it, mobile browsers display the page as if it were designed for a wide desktop screen (usually around 980px), then **scale everything down** to fit on the small phone screen - as a result, everything looks tiny, and the user has to stretch the text with their fingers.

- `width=device-width` tells the browser "use the device's actual screen width," not an imaginary wide desktop width.
- `initial-scale=1.0` sets the initial zoom level to 100% (without automatic shrinking).

**Important to understand now, before studying CSS:** this tag alone doesn't make a site "responsive" in the full sense (responsiveness is primarily CSS work that you'll study later), but without it **no** responsive layout done later via CSS will work correctly on mobile devices. This is a fundamental setting, without which everything else is meaningless.

---

### Common beginner mistakes

| Mistake|How to fix|
|---|---|
|Forgetting `viewport` - site looks tiny and unreadable on phones|Add `<meta name="viewport" content="width=device-width, initial-scale=1.0">` to the `<head>` of every project|
|Assuming a fixed description length guarantees a snippet|Write an accurate summary; search engines may select page text and truncate to available width.|
|Confusing `description` with visible text on the page|`description` is not displayed anywhere on the page itself - it's purely service information for search engines and social networks|

---

## Open Graph (overview)

When you send a site link to a friend on Telegram, WhatsApp, or share it on Facebook, a nice card with an image, title, and description often appears. This works thanks to **Open Graph** - a set of meta tags originally created by Facebook but now supported by most platforms.

```html
<meta property="og:title" content="HTML: in 10 lessons - a course for beginners">
<meta property="og:description" content="10 lessons from scratch to publishing your first website independently.">
<meta property="og:image" content="https://saydullayev.fun/images/course-preview.jpg">
<meta property="og:url" content="https://saydullayev.fun/html-course">
```

Let's break down the main tags:

- **`og:title`** - the title shown on the card (can differ from the browser tab's `<title>` - often made more "sales-oriented").
- **`og:description`** - the description on the card (similar to `meta description`, but specifically for social networks).
- **`og:image`** - the image shown on the card (important: must specify an **absolute** path including `https://`, since social networks "download" this image from their own servers, not through the user's browser).
- **`og:url`** - the canonical (primary) page URL.

**Important syntax feature:** notice - here the `property` attribute is used instead of `name` as in regular meta tags from block 1. This is because Open Graph is technically based on a different standard (RDFa), but for practical use you just need to remember: Open Graph uses `property`, regular meta tags use `name`.

**This is a topic we're only covering at an overview level** - in this course we won't dive deep into all possible Open Graph tag variations (there are quite many - content type, locale, author, etc.), but it's important that you now know where those nice preview cards come from when sharing links, and know how to add a basic set for your project.

```mermaid
flowchart LR
    A["&lt;head&gt;"] --> B["charset"]
    A --> C["viewport"]
    A --> D["title"]
    A --> E["description"]
    A --> F["favicon"]
    A --> G["Open Graph: og:title, og:description, og:image"]
    A --> H["&lt;link rel=stylesheet&gt;"]
    A --> I["&lt;script&gt;"]

```

**How to read this diagram:** Arrows list metadata and resource references that can appear in head. They are siblings rather than execution steps; only include references to resources that actually exist.


---

## Connecting CSS via `<link>`

Use the supplied `../css/style.css` and `../js/main.js` files. You do not need to author CSS/JS.

We already used the `<link>` tag in lesson 4 - for the favicon. The same tag is used to connect an external CSS stylesheet file.

```html
<head>
    <meta charset="UTF-8">
    <title>My website</title>
    <link rel="stylesheet" href="css/style.css">
</head>
```

- `rel="stylesheet"` tells the browser that the connected file is a stylesheet.
- `href` is the path to the CSS file (following the same relative/absolute path rules we covered in lesson 3).

**Placement in this course:** connect the stylesheet inside `head`, after the metadata. The browser discovers the file before reading the body content. This is the course convention, rather than a claim that HTML forbids every other valid placement.

**Important caveat for this course:** the CSS syntax itself (what to write inside the `style.css` file) is beyond the scope of the "HTML: in 10 lessons" course - we only cover how to properly connect an external file to an HTML document, the technical foundation for future CSS study.

---

## Connecting JS via `<script>`

The `<script>` tag connects JavaScript code - either an external file or code directly inside the HTML document.

### External file

```html
<script src="js/main.js"></script>
```

Note: `<script>` is a **paired** tag (unlike `<link>`, which is self-closing), even when using the `src` attribute and nothing is written inside manually.

### Code directly inside the tag (inline script)

```html
<script>
    console.log("Hello from the HTML document!");
</script>
```

This is used less often than external files - in real projects, JS code is usually placed in separate `.js` files (for the same reasons as CSS - easier maintenance, reuse across pages).

### Where to place `<script>`

There's an important practical consideration here. Previously it was common to place `<script>` at the very end of `<body>`, before the closing `</body>` tag:

```html
<body>
    <!-- all page content -->

    <script src="js/main.js"></script>
</body>
```

**Why this was done:** the browser reads the HTML document sequentially from top to bottom. If `<script>` is in `<head>` without additional attributes, the browser **stops reading** the rest of the page until it fully loads and executes the script - this can noticeably slow down the display of visible content to the user. Placing at the end of `<body>` guarantees that all visible parts of the page have been read by the browser before the script loads.

### Modern solution: `defer` and `async`

Today a more flexible approach is more commonly used - the `<script>` tag stays in `<head>`, but with one of the special attributes:

```html
<script src="js/main.js" defer></script>
```

```html
<script src="js/main.js" async></script>
```

**`defer`** - the browser loads the script **in parallel** with reading the rest of the HTML (without stopping it), but **executes** the script only after the entire HTML document has been fully read. The execution order of multiple `defer` scripts is preserved as they appear in the code.

**`async`** - the browser also loads the script in parallel, but **executes** it as soon as loading completes - even if the rest of the HTML hasn't finished reading. This can happen at any unpredictable moment, and the execution order of multiple `async` scripts is **not guaranteed**.

### When to use which (briefly, for general understanding)

|Attribute|When to use|
|---|---|
|`defer`|For most scripts, especially when the script interacts with the page content (it needs the entire HTML to already be read)|
|`async`|For independent scripts where order doesn't matter and interaction with the rest of the page isn't needed (e.g., analytics counters)|
|Without attributes, at the end of `<body>`|An older but still working and easy-to-understand option|

**This is also an overview-level topic in this course** - a deep understanding of how JavaScript works and the correct choice between `defer`/`async` in complex cases comes with studying JavaScript itself, which is beyond the scope of this HTML course.

```mermaid
flowchart TD
 A["External classic script"] --> B{"Loading attribute?"}
 B -->|defer| C["Fetch in parallel; run after parsing, in order"]
 B -->|async| D["Fetch in parallel; run when ready, no order guarantee"]
 B -->|Neither| E["Pause parser to fetch and execute"]
```

**How to read this diagram:** This decision tree applies to external classic scripts. Defer preserves document order after parsing, async runs when ready, and neither attribute leaves parsing blocked by loading and execution.


---

### Common beginner mistakes

| Mistake|How to fix|
|---|---|
|Placing `<script>` at the start of `<head>` without `defer`/`async`|This slows page rendering - use `defer` or place the script at the end of `<body>`|
|Confusing `<link>` (self-closing, for CSS) and `<script>` (paired, for JS)|`<link>` has no closing tag; `<script>` always does, even if empty inside|
|Forgetting that both `defer` and `async` only work with external scripts (`src="..."`) - not with code inside the tag|For inline `<script>` without `src`, these attributes have no meaning|

---

## Mini-task

For this mini-task, copy the supplied CSS into `styles/main.css` and JS into `scripts/app.js` inside your own folder (create those folders). No CSS/JS authoring is required. Build the `<head>` of a document on your own, without peeking: with UTF-8 encoding, title "Mini-task," viewport for responsiveness, a connected stylesheet `styles/main.css`, and a connected script `scripts/app.js` with the `defer` attribute.

**Solution:**

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mini-task</title>
    <link rel="stylesheet" href="styles/main.css">
    <script src="scripts/app.js" defer></script>
</head>
```

---

## W3C Validator - checking code

HTML is maintained as the WHATWG Living Standard. Use [Nu HTML Checker](https://validator.w3.org/nu/) to find markup conformance errors.

**How to use it:**

1. Open [Nu HTML Checker](https://validator.w3.org/nu/).
2. Use the checker’s input selector to check a published URL, upload a file, or paste source text; select the input method appropriate to your work.
3. Start the check - the validator will show a list of errors and warnings with the specific line of code indicated.

**Typical errors the validator finds:**

- unclosed tags;
- duplicate `id` attributes on the page;
- incorrectly nested tags (e.g., `<p>` inside another `<p>`, which is forbidden by the spec);
- missing required attributes (e.g., `alt` on `<img>`);
- usage of deprecated/nonexistent tags and attributes.

**Why this matters, not just a formality:** invalid code can display "seemingly fine" in one browser simply because that browser is good at "forgiving" errors and guessing what you meant - but another browser (or screen reader, or search robot) may interpret the same invalid code completely differently, leading to unexpected visual and structural problems for a portion of your users.

**Practical recommendation:** run every major project through the validator (e.g., the final project of lesson 10) - this is an excellent habit that catches small but real errors invisible to the eye during normal browsing.

---

## Project folder structure

The final practical block of the lesson - how to organize files of a real multi-page site so it's easy to navigate (for you and for anyone who opens your project later).

The standard, widely adopted structure looks like this:

```
my-website/
├── index.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── logo.png
│   ├── hero-photo.jpg
│   └── icons/
│       └── github.svg
└── favicon.ico
```

Principles of this organization:

- **HTML files** for pages - directly in the project root folder (this simplifies paths in links like `<a href="about.html">`, as we covered in lesson 3).
- **`css/`** - a separate folder for all stylesheet files.
- **`js/`** - a separate folder for all scripts.
- **`images/`** - a separate folder for all images; with many icons you can nest an `icons/` subfolder.
- **`favicon.ico`** - often left in the project root (some browsers search for it there automatically, as we covered in lesson 4).

Given this structure, the paths in your `index.html`'s `<head>` (sitting in the root) would look like:

```html
<link rel="stylesheet" href="css/style.css">
<script src="js/main.js" defer></script>
<link rel="icon" href="favicon.ico">
```

And within pages:

```html
<img src="images/hero-photo.jpg" alt="Main photo on the page">
```

**Why this structure matters now, before studying CSS/JS:** when you start actively writing real styles and scripts, files scattered randomly across different places will quickly turn into chaos, making anything hard to find. Building the habit of tidy structure from your first learning projects will greatly ease the transition to more complex topics in the future.

---

### Common beginner mistakes

| Mistake                                                                                   | How to fix                                                                                              |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Dumping all files (HTML, CSS, images) mixed into one folder                             | Separate by file type: `css/`, `js/`, `images/`                                                          |
| Using spaces or Cyrillic in file and folder names (e.g., `моя картинка.jpg`)            | Use Latin characters without spaces, usually lowercase with hyphens: `my-photo.jpg`                       |
| Changing the folder structure mid-project without updating all paths in HTML files       | Plan the structure in advance, and if you change it - check and update all related paths in `src`/`href`  |

---

## Lesson summary

Today you learned:

- The `charset`, `description`, `viewport` meta tags - service information about the page: encoding, description for search engines, mobile responsiveness.
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) form a nice card when sharing a link on social networks.
- CSS connects via `<link rel="stylesheet">`, JS via `<script src="...">`, with optional `defer`/`async` attributes for loading optimization.
- The W3C Validator checks code against official HTML standards and finds hidden errors.
- The standard project structure - HTML in the root, separate `css/`, `js/`, `images/` folders - makes site maintenance easier.



## Independent practice

Copy the supplied `Lesson-9/css/style.css` and `Lesson-9/js/main.js` into the `css` and `js` folders of your own project. Place both HTML pages beside those folders and use `css/style.css` and `js/main.js` in HTML. The paths `../css/style.css` and `../js/main.js` above locate assets relative to the Markdown source, not your site.

To check loading, open developer tools → Network and reload the page over HTTP. Find style.css and main.js and inspect Status: 200 means success, 304 means validated cache, 404 means not found. file:// has no HTTP status; use the local HTTP server introduced in the course.

Prepare two linked pages with unique title/description, viewport and provided external CSS/JS files (use the study bundle; writing CSS/JS is not required). Check both with Nu HTML Checker.

### Completion criteria

- [ ] Both pages have unique title/description and viewport.
- [ ] The supplied files are copied into css/style.css and js/main.js in your project and connected relative to the HTML pages.
- [ ] Over HTTP, browser Network shows successful CSS/JS requests (200 or cached 304), with no 404.
- [ ] Check both pages with Nu HTML Checker and test links separately.

### Self-check questions

How do defer and async differ? What does a validator not check? Why is viewport alone insufficient for responsiveness?

---

[Contents](../../README.md) · [Previous](../../Lesson-8/en/Accessibility%20%28a11y%29.md) · [Next](../../Lesson-10/en/Final%20project%20from%20planning%20to%20publication.md) · [Practice](../practice.html) · [RU](../ru/%D0%9C%D0%B5%D1%82%D0%B0-%D1%82%D0%B5%D0%B3%D0%B8%2C%20SEO%2C%20%D1%81%D0%B2%D1%8F%D0%B7%D1%8C%20%D1%81%20CSS%2C%20JS.md) · [EN](../en/Meta%20tags%2C%20SEO%2C%20linking%20CSS%20and%20JS.md) · [UZ](../uz/Meta-teglar%2C%20SEO%2C%20CSS%20va%20JS%20bilan%20bog%27lanish.md)
