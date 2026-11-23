# Источники / References / Manbalar

Основные технические источники для проверки курса. Курс написан для Git 2.56; справочник на git-scm.com всегда описывает последнюю версию Git. Ссылки нужны для уточнения деталей; читать документацию целиком начинающему не нужно.

Primary sources used to check the course. The course targets Git 2.56; the reference on git-scm.com always describes the latest Git version. Reading the full documentation is not a beginner assignment.

Kursni tekshirish uchun asosiy texnik manbalar. Kurs Git 2.56 uchun yozilgan; git-scm.com dagi ma’lumotnoma doim Git’ning oxirgi versiyasini tavsiflaydi. Hujjatlarni to‘liq o‘qish yangi o‘rganuvchi uchun topshiriq emas.

## Git: книга и справочник / Git: book and reference / Git: kitob va ma’lumotnoma

- [Pro Git (English)](https://git-scm.com/book/en/v2) — официальная бесплатная книга о Git / the official free book about Git / Git haqidagi rasmiy bepul kitob. [Русский перевод](https://git-scm.com/book/ru/v2) · [O‘zbekcha (qisman tarjima / частичный перевод / partial)](https://git-scm.com/book/uz/v2).
- [Git Reference](https://git-scm.com/docs) — справочник всех команд Git / reference for every Git command / barcha Git buyruqlari ma’lumotnomasi.
- [Git: Install for Windows](https://git-scm.com/install/windows) — установка Git, урок 1 / installing Git, lesson 1 / Git’ni o‘rnatish, 1-dars.

## Уроки 1–3: настройка, коммиты, история / Lessons 1–3: setup, commits, history / 1–3-darslar: sozlash, kommitlar, tarix

- [Pro Git: About Version Control](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control) — системы контроля версий, распределённый Git / version control, distributed Git / versiyalarni boshqarish, taqsimlangan Git. Урок 1 / lesson 1 / 1-dars.
- [Pro Git: First-Time Git Setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup) — `user.name`, `user.email`, `init.defaultBranch main`. Урок 1.
- [git-config](https://git-scm.com/docs/git-config) — настройки `--global`, `alias.*`, `pull.rebase` / settings / sozlamalar. Уроки 1, 9, 10.
- [GitHub Docs: Setting your commit email address](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address) — email в коммитах и адрес `noreply` / commit email and the `noreply` address / kommitdagi email va `noreply` manzil. Урок 1.
- [Pro Git: Recording Changes to the Repository](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository) — `git status -s`, `git add`, `git commit -am`, `git diff --staged`, `git rm`, `git mv`. Уроки 2, 3, 5.
- [Pro Git: Viewing the Commit History](https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History) и [git-log](https://git-scm.com/docs/git-log) — `--oneline`, `-n`, `--stat`, `-p`, `--graph`. Урок 3.
- [gitrevisions](https://git-scm.com/docs/gitrevisions) — запись `HEAD~1`, `HEAD^`, `HEAD@{1}` / revision syntax / reviziya yozuvi. Уроки 3, 4.
- [hash-function-transition](https://git-scm.com/docs/hash-function-transition) — переход с SHA-1 на SHA-256 / moving from SHA-1 to SHA-256 / SHA-1 dan SHA-256 ga o‘tish. Урок 3.

## Уроки 4–5: отмена и `.gitignore` / Lessons 4–5: undo and `.gitignore` / 4–5-darslar: bekor qilish va `.gitignore`

- [Pro Git: Undoing Things](https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things) — `git commit --amend`, `git restore`, `git restore --staged`. Урок 4.
- [git-restore](https://git-scm.com/docs/git-restore) · [git-revert](https://git-scm.com/docs/git-revert) · [git-reset](https://git-scm.com/docs/git-reset) · [git-reflog](https://git-scm.com/docs/git-reflog) — команды отмены / undo commands / bekor qilish buyruqlari. Урок 4.
- [gitignore](https://git-scm.com/docs/gitignore) — синтаксис шаблонов `*`, `?`, `/`, `**`, `!` / pattern syntax / shablonlar sintaksisi. Урок 5.
- [GitHub Docs: Ignoring files](https://docs.github.com/en/get-started/git-basics/ignoring-files) — `.gitignore` в репозитории и глобальный / in a repository and global / repozitoriyda va global. Урок 5.
- [github/gitignore](https://github.com/github/gitignore) — готовые шаблоны `.gitignore` / ready-made templates / tayyor shablonlar. Урок 5.

## Уроки 6–7: ветки и слияние / Lessons 6–7: branches and merging / 6–7-darslar: tarmoqlar va birlashtirish

- [Pro Git: Basic Branching and Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging) — перемотка, коммит слияния, конфликт / fast-forward, merge commit, conflict / oldinga o‘tkazish, birlashtirish kommiti, konflikt. Уроки 6, 7. В книге старые команды `git checkout` / the book uses the old `git checkout` / kitobda eski `git checkout`.
- [git-switch](https://git-scm.com/docs/git-switch) · [git-branch](https://git-scm.com/docs/git-branch) — `switch -c`, `switch -`, `--detach`, `branch -m / -d / -D`. Урок 6.
- [git-merge](https://git-scm.com/docs/git-merge) — `--no-ff`, `--abort`, раздел «How conflicts are presented» про маркеры / about conflict markers / konflikt markerlari haqida. Урок 7.
- [GitHub Docs: Resolving a merge conflict using the command line](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line) — разрешение конфликта по шагам / step by step / qadamma-qadam. Уроки 7, 9.
- [VS Code: Resolve merge conflicts](https://code.visualstudio.com/docs/sourcecontrol/merge-conflicts) — кнопки Accept Current / Incoming / Both Changes. Урок 7.

## Урок 8: GitHub / Lesson 8: GitHub / 8-dars: GitHub

- [Pro Git: Working with Remotes](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes) — `git remote`, `fetch`, `pull`, `push`.
- [GitHub Docs: Creating a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository) и [About remote repositories](https://docs.github.com/en/get-started/git-basics/about-remote-repositories) — репозиторий на GitHub, HTTPS и SSH / HTTPS and SSH URLs / HTTPS va SSH manzillar.
- [git-push](https://git-scm.com/docs/git-push) — `-u`, `--tags`, `--delete`, раздел «Note about fast-forwards». Уроки 8–10.
- [GitHub Docs: Managing your personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) — токен вместо пароля / a token instead of a password / parol o‘rniga token.
- [GitHub Docs: Generating a new SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) — `ssh-keygen -t ed25519 -C "email"`.
- [Git Credential Manager](https://github.com/git-ecosystem/git-credential-manager) и [`gh auth login`](https://cli.github.com/manual/gh_auth_login) — вход в GitHub без ввода токена вручную / signing in without typing a token / tokenni qo‘lda kiritmasdan kirish.

## Урок 9: командная работа / Lesson 9: teamwork / 9-dars: jamoada ishlash

- [GitHub Docs: GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow) — ветка → pull request → ревью → merge / branch → PR → review → merge / tarmoq → PR → ko‘rib chiqish → birlashtirish.
- [GitHub Docs: Pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) и [Pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) — PR и ревью / PRs and reviews / PR va ko‘rib chiqish.
- [GitHub Docs: Dealing with non-fast-forward errors](https://docs.github.com/en/get-started/using-git/dealing-with-non-fast-forward-errors) — отклонённый `push` (`! [rejected]`) / a rejected push / rad etilgan push.
- [git-pull](https://git-scm.com/docs/git-pull) — `--rebase`, `--no-rebase`, `--ff-only`, настройки `pull.rebase` и `pull.ff`.
- [Pro Git: Rebasing](https://git-scm.com/book/en/v2/Git-Branching-Rebasing) и [git-rebase](https://git-scm.com/docs/git-rebase) — rebase и раздел «The Perils of Rebasing» / and its dangers / va uning xavflari.
- [Pro Git: Stashing and Cleaning](https://git-scm.com/book/en/v2/Git-Tools-Stashing-and-Cleaning) и [git-stash](https://git-scm.com/docs/git-stash) — `stash`, `-u`, `-m`, `list`, `pop`, `apply`.
- [git-cherry-pick](https://git-scm.com/docs/git-cherry-pick) — копирование одного коммита / copying one commit / bitta kommitni nusxalash.

## Урок 10: теги, релизы, Pages / Lesson 10: tags, releases, Pages / 10-dars: teglar, relizlar, Pages

- [Pro Git: Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging) и [git-tag](https://git-scm.com/docs/git-tag) — лёгкие и аннотированные теги, отправка и удаление / lightweight and annotated tags / yengil va annotatsiyali teglar.
- [Семантическое версионирование 2.0.0](https://semver.org/lang/ru/) ([English](https://semver.org/)) — `MAJOR.MINOR.PATCH`.
- [GitHub Docs: About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases) — релизы на основе тегов / releases based on tags / teglar asosidagi relizlar.
- [Pro Git: Git Aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases) — `git config --global alias.*`.
- [GitHub Docs: Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) — публикация итогового проекта / publishing the final project / yakuniy loyihani nashr qilish.

Сайты могут менять адреса страниц и подписи интерфейса. Если ссылка не открывается, найдите страницу по названию на том же сайте.

Sites may move pages or rename interface labels. If a link breaks, search for the page title on the same site.

Saytlar sahifa manzillarini va interfeys yozuvlarini o‘zgartirishi mumkin. Havola ochilmasa, sahifani shu saytda nomi bo‘yicha qidiring.

---

[Содержание / Contents / Mundarija](README.md) · [Словарь / Glossary](GLOSSARY.md) · [Шпаргалка / Cheat sheet](CHEATSHEET.md)
