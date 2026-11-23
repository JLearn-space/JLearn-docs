# Курс «Git: за 10 уроков» / "Git: in 10 lessons"

> Курс из **10 уроков** о системе контроля версий Git 2.56 и GitHub: от первой команды в терминале до командной работы, pull request и публикации своего сайта. Курс продолжает программу JLearn после курсов HTML, CSS, JavaScript и jQuery. Все задания выполняются в учебном терминале - симуляторе Git прямо на платформе, а вторая часть каждого урока - в настоящем Git на своём компьютере. В итоговом проекте студент публикует свой сайт на GitHub с историей, ветками, тегом релиза и GitHub Pages.
>
> A **10-lesson** course on the Git 2.56 version control system and GitHub: from the first terminal command to teamwork, pull requests and publishing your own website. Every IDE task runs in a learning terminal - a Git simulator inside the platform; part 2 of each lesson uses real Git on your own computer.

| | |
| --- | --- |
| **Author** | Javlonbek Saydullaev - [github.com/Saydullayev017](https://github.com/Saydullayev017) |
| **Website** | [jlearn.space](https://jlearn.space) |
| **YouTube** | [@JLearnProgramming](https://www.youtube.com/@JLearnProgramming) |

---

## Перед началом

Желательно пройти курсы [«HTML: за 10 уроков»](https://github.com/JLearn-space/JLearn-docs/tree/main/HTML), [«CSS: за 10 уроков»](https://github.com/JLearn-space/JLearn-docs/tree/main/CSS) и [«JavaScript: за 10 уроков»](https://github.com/JLearn-space/JLearn-docs/tree/main/JavaScript): в курсе Git вы будете хранить и публиковать свой сайт из этих курсов. Опыт работы с терминалом не нужен - он начинается с нуля в уроке 1.

**Что понадобится:** компьютер с Windows, macOS или Linux, установленный Git 2.40 или новее (урок 1 объясняет установку) и бесплатный аккаунт на [github.com](https://github.com) (с урока 8).

**Как проходить урок:** прочитайте объяснение → повторите команды в учебном терминале → сделайте задание в IDE → часть 2 на своём компьютере → тест урока. Урок засчитывается, когда задание в IDE прошло все автоматические тесты, а тест сдан от 70%.

**Учебный терминал без платформы:** откройте [tools/gitsim/playground.html](tools/gitsim/playground.html) в браузере - это тот же симулятор Git, что в заданиях.

---

## Структура курса

| Урок / Lesson / Dars | Русский | O‘zbekcha | English |
| --- | --- | --- | --- |
| **1** | [Знакомство с Git и терминалом](Lesson-1/ru/%D0%97%D0%BD%D0%B0%D0%BA%D0%BE%D0%BC%D1%81%D1%82%D0%B2%D0%BE%20%D1%81%20Git%20%D0%B8%20%D1%82%D0%B5%D1%80%D0%BC%D0%B8%D0%BD%D0%B0%D0%BB%D0%BE%D0%BC.md) | [Git va terminal bilan tanishuv](Lesson-1/uz/Git%20va%20terminal%20bilan%20tanishuv.md) | [Getting to know Git and the terminal](Lesson-1/en/Getting%20to%20know%20Git%20and%20the%20terminal.md) |
| **2** | [Первый коммит](Lesson-2/ru/%D0%9F%D0%B5%D1%80%D0%B2%D1%8B%D0%B9%20%D0%BA%D0%BE%D0%BC%D0%BC%D0%B8%D1%82.md) | [Birinchi kommit](Lesson-2/uz/Birinchi%20kommit.md) | [The first commit](Lesson-2/en/The%20first%20commit.md) |
| **3** | [История и изменения](Lesson-3/ru/%D0%98%D1%81%D1%82%D0%BE%D1%80%D0%B8%D1%8F%20%D0%B8%20%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F.md) | [Tarix va o'zgarishlar](Lesson-3/uz/Tarix%20va%20o'zgarishlar.md) | [History and changes](Lesson-3/en/History%20and%20changes.md) |
| **4** | [Отмена изменений](Lesson-4/ru/%D0%9E%D1%82%D0%BC%D0%B5%D0%BD%D0%B0%20%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B9.md) | [O'zgarishlarni bekor qilish](Lesson-4/uz/O'zgarishlarni%20bekor%20qilish.md) | [Undoing changes](Lesson-4/en/Undoing%20changes.md) |
| **5** | [Игнорирование файлов и порядок в проекте](Lesson-5/ru/%D0%98%D0%B3%D0%BD%D0%BE%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D1%84%D0%B0%D0%B9%D0%BB%D0%BE%D0%B2%20%D0%B8%20%D0%BF%D0%BE%D1%80%D1%8F%D0%B4%D0%BE%D0%BA%20%D0%B2%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B5.md) | [Fayllarni e'tiborsiz qoldirish va loyihada tartib](Lesson-5/uz/Fayllarni%20e'tiborsiz%20qoldirish%20va%20loyihada%20tartib.md) | [Ignoring files and keeping the project tidy](Lesson-5/en/Ignoring%20files%20and%20keeping%20the%20project%20tidy.md) |
| **6** | [Ветки](Lesson-6/ru/%D0%92%D0%B5%D1%82%D0%BA%D0%B8.md) | [Tarmoqlar](Lesson-6/uz/Tarmoqlar.md) | [Branches](Lesson-6/en/Branches.md) |
| **7** | [Слияние и конфликты](Lesson-7/ru/%D0%A1%D0%BB%D0%B8%D1%8F%D0%BD%D0%B8%D0%B5%20%D0%B8%20%D0%BA%D0%BE%D0%BD%D1%84%D0%BB%D0%B8%D0%BA%D1%82%D1%8B.md) | [Birlashtirish va konfliktlar](Lesson-7/uz/Birlashtirish%20va%20konfliktlar.md) | [Merging and conflicts](Lesson-7/en/Merging%20and%20conflicts.md) |
| **8** | [GitHub и удалённые репозитории](Lesson-8/ru/GitHub%20%D0%B8%20%D1%83%D0%B4%D0%B0%D0%BB%D1%91%D0%BD%D0%BD%D1%8B%D0%B5%20%D1%80%D0%B5%D0%BF%D0%BE%D0%B7%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D0%B8.md) | [GitHub va masofaviy repozitoriylar](Lesson-8/uz/GitHub%20va%20masofaviy%20repozitoriylar.md) | [GitHub and remote repositories](Lesson-8/en/GitHub%20and%20remote%20repositories.md) |
| **9** | [Командная работа](Lesson-9/ru/%D0%9A%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D0%BD%D0%B0%D1%8F%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0.md) | [Jamoada ishlash](Lesson-9/uz/Jamoada%20ishlash.md) | [Teamwork](Lesson-9/en/Teamwork.md) |
| **10** | [Теги, релизы и итоговый проект](Lesson-10/ru/%D0%A2%D0%B5%D0%B3%D0%B8%2C%20%D1%80%D0%B5%D0%BB%D0%B8%D0%B7%D1%8B%20%D0%B8%20%D0%B8%D1%82%D0%BE%D0%B3%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82.md) | [Teglar, relizlar va yakuniy loyiha](Lesson-10/uz/Teglar%2C%20relizlar%20va%20yakuniy%20loyiha.md) | [Tags, releases and final project](Lesson-10/en/Tags%2C%20releases%20and%20final%20project.md) |

Все три версии - русская, узбекская и английская - строятся по одной программе и одинаковой структуре.

[Карта курса](COURSE_MAP.md) · [Задания IDE и тесты](platform/README.md) · [Учебный симулятор Git](tools/gitsim/gitsim.js) · [Словарь терминов](GLOSSARY.md) · [Шпаргалка](CHEATSHEET.md) · [Источники](REFERENCES.md)

---

## Лицензия / License

Материалы курса распространяются под лицензией **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**. Полный текст - в файле [LICENSE](LICENSE).

© 2026 Javlonbek Saydullaev.
