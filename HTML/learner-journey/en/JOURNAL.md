# English learner journey

> The original entries below were recorded before the browser run. Observed results appear at the end of this journal and in the consolidated report.

This is an executed source-authoring journey with static inspection, not a claim of observed browser interaction. All browser, keyboard, playback, Network and external Nu checks remain pending. No GitHub publication or external contact action was performed.

Original assets were created for this study set; supplied CSS/JS were copied without authoring new CSS/JS.


## Lesson 1

Read lesson source and its diagrams before constructing this lesson’s solution. Diagram review: document tree separates DOCTYPE from root; Web map is an overview.

Requirements and completion criteria from the lesson:

- [ ] The file is named `index.html`, not `index.html.txt`.
- [ ] DOCTYPE, `html`, `head` and `body` are present; paired elements are explicitly closed.
- [ ] The language matches the text and the encoding is UTF-8.
- [ ] You can distinguish the tab title from the page heading.
- [ ] One `<h1>` and two `<p>` elements appear; the saved change is visible.


Actual files:
- `learner-journey/en/lesson-01/index.html`
- `learner-journey/en/lesson-01/mini.html`


Answers:
1. An element includes the start tag, content and end tag; a void element has no end tag.
2. The title is metadata; the paragraph is visible content.
3. DevTools modifies the current document in memory, not the saved source.


Uncertainty and action: No blocking task issue. Saved paragraph already contains revised learning goal; browser refresh remains pending.


Verification: static local paths/fragments and label association checks passed. Browser criteria are not marked as passed.


## Lesson 2

Read lesson source and its diagrams before constructing this lesson’s solution. Diagram review: heading levels follow containment; semantic layout tree is consistent.

Requirements and completion criteria from the lesson:

- [ ] There is one main `<h1>` and two `<h2>` headings; levels follow structure, not text size.
- [ ] There is one `main`; sections group related content and have headings.
- [ ] Order matters in `ol`, not in `ul`; each item is an `li`.
- [ ] Elements are correctly nested and the semantic emphasis can be explained.
- [ ] The page opens and is readable; no later-lesson features are required.


Actual files:
- `learner-journey/en/lesson-02/guide.html`
- `learner-journey/en/lesson-02/mini.html`


Answers:
1. Article stands alone; section groups a topic; div is a generic wrapper.
2. Strong means importance, em stress emphasis; b draws attention and i marks alternate voice or terminology.
3. Paragraphs express structure; repeated br only adds line breaks.


Uncertainty and action: No blocking task issue. No links used before lesson 3.


Verification: static local paths/fragments and label association checks passed. Browser criteria are not marked as passed.


## Lesson 3

Read lesson source and its diagrams before constructing this lesson’s solution. Diagram review: relative paths map to same/child/parent directories; root is server-relative.

Requirements and completion criteria from the lesson:

- [ ] All nine menu transitions (three per page) lead to the intended files.
- [ ] File names, extensions and case match `href`; no paths such as `C:\Users\...` are used.
- [ ] Each page has unique `id` values; fragments reach the right sections.
- [ ] Link text explains the destination; new-tab behavior is announced.
- [ ] `mailto:` and `tel:` use the correct schemes; a missing configured app is not an HTML error.


Actual files:
- `learner-journey/en/lesson-03/contact.html`
- `learner-journey/en/lesson-03/contacts.html`
- `learner-journey/en/lesson-03/index.html`
- `learner-journey/en/lesson-03/mini.html`
- `learner-journey/en/lesson-03/schedule.html`


Answers:
1. Same directory, parent directory, and server root respectively.
2. Without # the value is a path, not an in-page fragment.
3. The user may stay in the current tab; new tabs are a contextual choice.


Uncertainty and action: Added contact.html solely for the mini-task spelling, distinct from contacts.html used by the independent task. No fictional number was called.


Verification: static local paths/fragments and label association checks passed. Browser criteria are not marked as passed.


## Lesson 4

Read lesson source and its diagrams before constructing this lesson’s solution. Diagram review: format choice is conditional; source selection has success/fallback branches.

Requirements and completion criteria from the lesson:

- [ ] All media files exist; paths work when the entire folder is moved.
- [ ] Images have suitable alt text; captions do not replace alt.
- [ ] Playback starts on user action; the page remains understandable without playback.


Actual files:
- `learner-journey/en/lesson-04/images/book.svg`
- `learner-journey/en/lesson-04/images/decor.svg`
- `learner-journey/en/lesson-04/images/logo.png`
- `learner-journey/en/lesson-04/index.html`
- `learner-journey/en/lesson-04/mini.html`
- `learner-journey/en/lesson-04/reading-tone.wav`


Answers:
1. Use empty alt for decoration that conveys no information.
2. Figcaption is a visible caption; alt replaces image meaning when unavailable.
3. SVG scales without losing sharpness for simple shapes.


Uncertainty and action: Found the incorrect requirement for at least two source formats. Corrected EN to one supported source being sufficient. Used original local images and a generated tone; no external licensing dependency.


Verification: static local paths/fragments and label association checks passed. Browser criteria are not marked as passed.


## Lesson 5

Read lesson source and its diagrams before constructing this lesson’s solution. Diagram review: table sections and span coverage are logically consistent.

Requirements and completion criteria from the lesson:

- [ ] Column counts remain consistent with colspan/rowspan in every row.
- [ ] The table presents data, has a caption and associated headers.
- [ ] You can explain tr, th and td without a hint.


Actual files:
- `learner-journey/en/lesson-05/index.html`
- `learner-journey/en/lesson-05/mini.html`


Answers:
1. Colspan spans columns; rowspan spans rows.
2. Use col for column headers and row for row headers.
3. Layout is presentation; tables encode data relationships.


Uncertainty and action: Found an outdated claim permitting tfoot before tbody. Corrected EN to modern table order. Both sample tables have consistent logical widths.


Verification: static local paths/fragments and label association checks passed. Browser criteria are not marked as passed.


## Lesson 6

Read lesson source and its diagrams before constructing this lesson’s solution. Diagram review: failed validation prevents submission; GET and POST package values differently.

Requirements and completion criteria from the lesson:

- [ ] Clicking each label activates its control; ids are unique.
- [ ] Only one radio option can be selected; checkboxes are independent.
- [ ] Empty required fields prevent submission; selected values appear in the URL.


Actual files:
- `learner-journey/en/lesson-06/index.html`
- `learner-journey/en/lesson-06/mini.html`


Answers:
1. Name is the submission key; id identifies the element and supports its label.
2. POST changes packaging, not transport encryption; HTTPS protects transport.
3. A request can still occur; a missing handler does not deliver or process the intended message.


Uncertainty and action: No blocking task issue. Fictional data and GET demonstration are explicit; no fieldset until lesson 7.


Verification: static local paths/fragments and label association checks passed. Browser criteria are not marked as passed.


## Lesson 7

Read lesson source and its diagrams before constructing this lesson’s solution. Diagram review: control purpose branches independently; reset restores initial state.

Requirements and completion criteria from the lesson:

- [ ] Every control has a label; IDs are unique and for matches id.
- [ ] Select includes optgroup and meaningful option values.
- [ ] Textarea initial text is between its tags.
- [ ] Related controls use fieldset with legend.
- [ ] Required ID rejects empty input, six digits and letters; accepts seven digits.
- [ ] After edits, reset restores initial values.


Actual files:
- `learner-journey/en/lesson-07/index.html`
- `learner-journey/en/lesson-07/mini.html`


Answers:
1. Reset restores initial state, which may contain text.
2. An optional empty field passes pattern; required changes the empty case.
3. Title may not be exposed reliably; a visible instruction remains available.


Uncertainty and action: Added non-empty textarea initial text, default option, required seven-digit ID, reset and submit as requested. Pattern cases assessed as source expectations, not browser observations.


Verification: static local paths/fragments and label association checks passed. Browser criteria are not marked as passed.

Pattern test plan: empty → reject; 123456 → reject; 1234567 → accept; abcdefg → reject. Reset plan: alter topic and introduction, then reset → stories and “I enjoy reading.” Browser results pending.


## Lesson 8

Read lesson source and its diagrams before constructing this lesson’s solution. Diagram review: native labels precede ARIA; ARIA alone supplies no behavior.

Requirements and completion criteria from the lesson:

- [ ] Traverse the full page with Tab and Shift+Tab: logical order, visible focus, no traps.
- [ ] Activate a native button with the keyboard and check control names.
- [ ] Check each text/background color pair: normal text at least 4.5:1.
- [ ] Record at least three checks: action, expectation, actual result and fix.


Actual files:
- `learner-journey/en/lesson-08/github-icon.svg`
- `learner-journey/en/lesson-08/index.html`
- `learner-journey/en/lesson-08/mini.html`


Answers:
1. Tabindex changes focusability/order, not keyboard activation logic.
2. Native buttons supply semantics and keyboard support.
3. Alt is empty when the image is purely decorative.


Uncertainty and action: Audited the source of lesson 7: labels and IDs already matched, so no fabricated error was introduced. Added semantic header/main/footer. Three planned browser checks are recorded below.


Verification: static local paths/fragments and label association checks passed. Browser criteria are not marked as passed.

Three browser checks pending: (1) Tab/Shift+Tab traverses select → textarea → ID → submit → reset with visible focus; (2) Enter/Space activates native buttons appropriately; (3) default black/white contrast is 21:1 mathematically, but actual rendered colors still require inspection. Source before/after: form controls unchanged because associations were already correct; semantic landmarks added.


## Lesson 9

Read lesson source and its diagrams before constructing this lesson’s solution. Diagram review: script decision diagram is scoped to external classic scripts.

Requirements and completion criteria from the lesson:

- [ ] Both pages have unique title/description and viewport.
- [ ] The supplied files are copied into css/style.css and js/main.js in your project and connected relative to the HTML pages.
- [ ] Over HTTP, browser Network shows successful CSS/JS requests (200 or cached 304), with no 404.
- [ ] Check both pages with Nu HTML Checker and test links separately.


Actual files:
- `learner-journey/en/lesson-09/about.html`
- `learner-journey/en/lesson-09/css/style.css`
- `learner-journey/en/lesson-09/index.html`
- `learner-journey/en/lesson-09/js/main.js`
- `learner-journey/en/lesson-09/mini.html`
- `learner-journey/en/lesson-09/scripts/app.js`
- `learner-journey/en/lesson-09/styles/main.css`


Answers:
1. Defer runs after parsing in order; async runs when ready without order guarantees.
2. A validator does not guarantee links, accessibility, visual quality or SEO.
3. Viewport changes the layout viewport; fixed-size elements still need appropriate layout.


Uncertainty and action: Mini-task asset paths originally referred to nonexistent folders without explaining the copy step. Added explicit copying instructions to EN. Updated checker instructions to Nu rather than the legacy checker. Copied supplied CSS/JS into both required path layouts.


Verification: static local paths/fragments and label association checks passed. Browser criteria are not marked as passed.


## Lesson 10

Read lesson source and its diagrams before constructing this lesson’s solution. Diagram review: plan includes accessibility before implementation; retesting follows publication.

Requirements and completion criteria from the lesson:

Four-page independent site, shared navigation, original local media, table, labelled validated form, unique metadata; publication separately pending.


Actual files:
- `learner-journey/en/lesson-10/PLAN.md`
- `learner-journey/en/lesson-10/about.html`
- `learner-journey/en/lesson-10/images/book.svg`
- `learner-journey/en/lesson-10/index.html`
- `learner-journey/en/lesson-10/join.html`
- `learner-journey/en/lesson-10/schedule.html`


Answers:
1. Nav contains shared destinations; main contains each page’s principal content; headings express hierarchy.
2. The GET form exposes fictional values in the URL; it delivers no message.
3. Two completed source checks: all local paths/fragments exist; all form controls have matching labels.


Uncertainty and action: Fixed English skeleton lang=ru and Cyrillic username placeholder. Removed duplicate GET teaching paragraph. Created a new Riverbank club, not the worked portfolio. Publication is intentionally not performed.


Verification: static local paths/fragments and label association checks passed. Browser criteria are not marked as passed.

No final pass score is asserted: browser checks and publication remain unverified. Source supports all six rubric areas, but publication points cannot be awarded.


## Primary references for corrections

- [WHATWG table content order](https://html.spec.whatwg.org/multipage/tables.html): tfoot follows body rows.

- [WHATWG media elements](https://html.spec.whatwg.org/multipage/media.html): additional source formats are alternatives, not a mandatory minimum of two.

## Final EN teaching edits

Every Mermaid diagram now has a short contextual text alternative explaining containment, branching or sequence. Lesson 6 checkbox/radio correction table was checked and already has the correct direction. Lesson 9 had a prose paragraph embedded in a Markdown error table; converted it to a proper two-cell row. Some paired line breaks used as spacing in form examples were replaced with paragraph grouping. These are source inspection results; browser behavior remains pending.

## Observed final run

- 01: 5/5 — page and referenced resources load: index.html, page and referenced resources load: mini.html, one heading and two paragraphs, saved file change appears after reload.
- 02: 4/4 — page and referenced resources load: guide.html, page and referenced resources load: mini.html, guide uses semantic structure and two list kinds.
- 03: 19/19 — page and referenced resources load: contact.html, page and referenced resources load: contacts.html, page and referenced resources load: index.html, page and referenced resources load: mini.html, page and referenced resources load: schedule.html, menu transition index.html → index.html, menu transition index.html → schedule.html, menu transition index.html → contacts.html, anchor index.html → #purpose, anchor index.html → #joining, menu transition schedule.html → index.html, menu transition schedule.html → schedule.html, menu transition schedule.html → contacts.html, anchor schedule.html → #joining, menu transition contacts.html → index.html, menu transition contacts.html → schedule.html, menu transition contacts.html → contacts.html, complete navigation count.
- 04: 6/6 — page and referenced resources load: index.html, page and referenced resources load: mini.html, two images and captioned figure, media loads and plays 0, whole folder survives relocation.
- 05: 5/5 — page and referenced resources load: index.html, page and referenced resources load: mini.html, schedule has caption and column/row headers, separate merged-cell example exists.
- 06: 9/9 — page and referenced resources load: index.html, page and referenced resources load: mini.html, required fields block empty submission, email format is checked, radio group permits one selected option, checkboxes can both be selected, clicking label focuses its field, GET contains all successful named values.
- 07: 9/9 — page and referenced resources load: index.html, page and referenced resources load: mini.html, ID "" has expected validity, ID "123456" has expected validity, ID "1234567" has expected validity, ID "abcdefg" has expected validity, Space on reset restores original values, valid participant form submits with GET.
- 08: 9/9 — page and referenced resources load: index.html, page and referenced resources load: mini.html, Tab visits every control once with keyboard focus, Chrome accessibility tree contains named native controls, default text contrast is black on white canvas, arrow key changes the native selection, Space activates reset and restores initial text, Enter activates submit.
- 09: 7/7 — page and referenced resources load: about.html, page and referenced resources load: index.html, page and referenced resources load: mini.html, CSS and JS load over real local HTTP: about.html, CSS and JS load over real local HTTP: index.html, two pages have distinct title/description and viewport.
- 10: 23/23 — page and referenced resources load: about.html, page and referenced resources load: index.html, page and referenced resources load: join.html, page and referenced resources load: schedule.html, four independent pages, menu transition about.html → index.html, menu transition about.html → about.html, menu transition about.html → schedule.html, menu transition about.html → join.html, menu transition index.html → index.html, menu transition index.html → about.html, menu transition index.html → schedule.html, menu transition index.html → join.html, menu transition join.html → index.html, menu transition join.html → about.html, menu transition join.html → schedule.html, menu transition join.html → join.html, menu transition schedule.html → index.html, menu transition schedule.html → about.html, menu transition schedule.html → schedule.html, menu transition schedule.html → join.html, complete navigation count.

[Browser results](../evidence/browser-walkthrough.json) · [Native keyboard evidence](../evidence/native-select-check.json) · [Local Nu results](../evidence/nu-local.json) · [Progression guard](../evidence/progression-check.json)

Nu: all 80 solution HTML files and the remaining course pages were checked locally without uploading files. Accessible names were read from Chrome’s accessibility tree; this was not a live screen-reader session. GitHub publication and installation of VS Code/extensions were not performed.
