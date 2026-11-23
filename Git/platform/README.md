# Задания IDE и тесты для JLearn (Git)

В папке по одному JSON-файлу на урок: `platform/lesson-NN.json` (русский), `platform/uz/` и `platform/en/` - те же задания на узбекском и английском. Структура тестов урока (`test`) такая же, как в курсах HTML, CSS, JavaScript и jQuery: 12 вопросов четырёх типов, порог 70%.

Новое - задание в IDE. Настоящий Git на платформе не запускается, поэтому задание выполняет **учебный симулятор Git** - [tools/gitsim/gitsim.js](../tools/gitsim/gitsim.js). Это один файл JavaScript без зависимостей: он работает в браузере и в Node.js, хранит файлы, индекс, коммиты, ветки и удалённые репозитории в памяти и выводит в терминал то же, что Git 2.56.

## Формат задания

```json
{
    "lesson": 2,
    "language": "ru",
    "lesson_title": "Первый коммит",
    "task": {
        "title": "Три коммита в портфолио",
        "language": "shell",
        "environment": "git",
        "lang": "ru",
        "description": "...",
        "starter_code": "# Ваши команды - по одной на строке\n",
        "timeout_ms": 2000,
        "forbidden": [],
        "setup": "sim.run('...', { quiet: true });",
        "tests": [
            { "name": "...", "check": "repo.log().length === 3", "fail": "..." },
            { "name": "...", "setup": "...", "check": "...", "fail": "..." }
        ],
        "hints": ["..."],
        "solution": "git add .\ngit commit -m \"...\"\n",
        "wrong_solutions": [{ "mistake": "...", "code": "..." }]
    },
    "test": { "pass_percent": 70, "questions": [] }
}
```

| Поле | Значение |
| --- | --- |
| `language` | `"shell"` - в редакторе подсветка команд терминала |
| `environment` | `"git"` - код выполняет симулятор, а не JavaScript |
| `lang` | Язык служебных подсказок симулятора: `ru`, `uz`, `en` (например, «в учебном терминале нет редактора») |
| `setup` | **JavaScript**, который готовит состояние до кода ученика: создаёт удалённый репозиторий, историю коммитов, действия «товарища по команде». В нём доступна переменная `sim` |
| `tests[].setup` | Свой `setup` для одного теста - проверка на других исходных данных |
| `tests[].check` | Выражение JavaScript, которое должно дать `true` |

## Как платформа выполняет задание

Для **каждого** теста - новый симулятор:

```js
const sim = new GitSim({ lang: task.lang });      // ученик - пользователь student, папка /home/student
// выполнить setup (JS) с доступом к sim
sim.output = "";                                    // вывод setup ученик не видит
sim.run(studentCode);                               // сценарий ученика
// в проверке доступны:
//   sim       - симулятор
//   repo      - sim.repo(): репозиторий в текущей папке ученика (или null)
//   __output  - текст терминала: команды и ответы Git
//   __code    - код ученика без комментариев
//   __error   - null или текст внутренней ошибки симулятора
//   __commands - список выполненных команд: { cmd, code, out }
```

Ошибка в команде (например, `git comit`) не останавливает сценарий, как и в настоящем терминале: Git печатает сообщение, и выполняется следующая строка. Связка `&&` останавливает цепочку после ошибки.

После запуска IDE показывает ученику `sim.output` - это выглядит как обычный терминал:

```text
$ git commit -m "Add home page"
[main (root-commit) 32f769c] Add home page
 1 file changed, 1 insertion(+)
 create mode 100644 index.html
```

## Что умеет симулятор

**Оболочка:** `pwd`, `ls` (`-a`, `-l`), `cd` (в том числе `..`, `~`, `-`), `mkdir` (`-p`), `touch`, `echo` (`>` и `>>`), `printf`, `cat`, `cat > файл << 'EOF'` (несколько строк), `rm` (`-r`, `-f`), `mv`, `cp`, `tree`, `clear`, `whoami`; `&&`, `||`, `;`, комментарии `#`. Редакторов (`nano`, `vim`, `code`) нет - симулятор подсказывает, как создать файл командой.

**Git:** `init`, `config` (`--global`, `--list`, `--unset`, алиасы `alias.*`), `status` (`-s`), `add` (`.`, `-A`, шаблоны, `-f`), `commit` (`-m`, `-a`, `-am`, `--amend`, `--no-edit`), `log` (`--oneline`, `--graph`, `--all`, `-n`, `--stat`, `-p`, `A..B`, `-- путь`), `show` (в том числе `HEAD~2:файл`), `diff` (`--staged`, коммиты, ветки, `--stat`, `--name-only`), `restore` (`--staged`, `--source`), `switch` (`-c`, `-`), `checkout` (ветки, `-b`, коммиты, файлы), `branch` (`-d`, `-D`, `-m`, `-v`, `-vv`, `-a`, `-r`, `-u`), `merge` (перемотка, коммит слияния, `--no-ff`, `--ff-only`, конфликты, `--abort`), `rebase` (`--continue`, `--skip`, `--abort`), `cherry-pick`, `revert`, `reset` (`--soft`, `--mixed`, `--hard`, пути), `reflog`, `rm` (`--cached`, `-r`), `mv`, `stash` (`push`, `-m`, `-u`, `list`, `pop`, `apply`, `drop`, `show`, `clear`), `tag` (`-a -m`, `-d`), `remote` (`add`, `-v`, `remove`, `rename`, `get-url`, `set-url`), `clone`, `push` (`-u`, `--force`, `--tags`, `--delete`), `fetch` (`--prune`, `--all`), `pull` (`--rebase`, `--no-rebase`, `--ff-only`, настройки `pull.rebase` и `pull.ff`), `ls-files`, `--version`.

**Не поддерживается** (и не нужно в курсе): интерактивные режимы (`add -p`, `rebase -i`), подмодули, хуки, `bisect`, `blame`, бинарные файлы, права файлов. На такие команды симулятор отвечает понятным сообщением.

## API для setup и проверок

```js
// setup
sim.user.config["init.defaultBranch"] = "main";        // глобальные настройки ученика
sim.run(`mkdir site && cd site && git init ...`, { quiet: true }); // команды от имени ученика
sim.createRemote("https://github.com/anna/site.git");  // пустой репозиторий на «GitHub»
sim.createRemote(url, { readme: true });               // репозиторий с README.md
sim.createRemote(url, { writers: ["aziz"] });          // push разрешён только aziz, остальным - ошибка 403
sim.addUser("aziz", { name: "Aziz Rakhimov", email: "aziz@example.com", defaultBranch: "main" });
sim.run(`git clone ${url} && cd site && ...`, { user: "aziz", quiet: true }); // действия товарища

// проверки
repo.branch                      // текущая ветка или null
repo.log("main")                 // [{ hash, short, subject, message, parents, files, author }]
repo.commit("HEAD~1")            // один коммит
repo.branches(), repo.tags(), repo.remotes(), repo.upstream("main")
repo.status()                    // { staged, modified, deleted, untracked, conflicts, clean }
repo.index(), repo.staged(), repo.config("user.name"), repo.isIgnored("node_modules/a.js")
repo.state()                     // null | "merge" | "rebase" | ...
repo.stash(), repo.reflog(), repo.isAncestor("feature", "main")
sim.read("~/site/index.html")    // содержимое файла или null
sim.exists("~/site/.gitignore")
sim.repo("~/notes")              // другой репозиторий
sim.remote(url).log("main"), sim.remote(url).branches(), sim.remote(url).files("main")
sim.commands("git push")         // команды ученика, начинающиеся с "git push"
```

## Учебный терминал вне платформы

[tools/gitsim/playground.html](../tools/gitsim/playground.html) - страница с тем же симулятором: её можно открыть в браузере двойным щелчком и тренироваться без установки Git.

## Проверка заданий

Нужен только Node.js 20+, внешних пакетов нет:

```bash
node tools/check_platform_tasks.mjs
```

Скрипт запускает в симуляторе эталон (`solution`), стартовый код и все `wrong_solutions` и проверяет:

1. эталон проходит все тесты;
2. стартовый код не проходит;
3. каждое ошибочное решение не проходит хотя бы один тест;
4. тест урока устроен правильно;
5. версии на трёх языках совпадают по структуре.

Один файл: `node tools/check_platform_tasks.mjs platform/uz/lesson-03.json`.

## Эталонные решения

В публичной версии курса поля `solution` и `wrong_solutions` удалены из файлов заданий - решайте задания сами. Скрипты проверки заданий из `tools/` рассчитаны на полную версию курса у преподавателя.
