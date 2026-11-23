# Словарь терминов / Glossary / Atamalar lug‘ati

Термины курса Git в порядке уроков. В скобках - урок, где термин появляется впервые. Узбекские и английские названия взяты из текста уроков.

Course terms in lesson order. The number in brackets is the lesson where the term first appears. The Uzbek and English names are taken from the lessons.

Kurs atamalari darslar tartibida. Qavs ichida - atama birinchi marta uchraydigan dars. O‘zbekcha va inglizcha nomlar darslar matnidan olingan.

## Урок 1 / Lesson 1 / 1-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Система контроля версий | Versiyalarni boshqarish tizimi | Version control system | Хранит все версии файлов, к любой можно вернуться - как «сохранения» в игре. / Keeps every version, like save points in a game. |
| Git | Git | Git | Программа на вашем компьютере, хранит историю проекта и работает без интернета. / A program on your computer that stores project history offline. |
| GitHub | GitHub | GitHub | Сайт, где хранят репозитории Git и работают над ними вместе (урок 8). / A website that hosts Git repositories. |
| Распределённая система | Taqsimlangan tizim | Distributed system | Полная история есть у каждого участника, а не только на сервере. / Everyone has the full history, not only the server. |
| Терминал | Terminal | Terminal | Разговор с компьютером текстом: `cd site` вместо двойного щелчка. / A text conversation with the computer. |
| Приглашение | Taklif satri | Prompt | Строка вида `student@laptop:~$`: компьютер ждёт команду. `$` набирать не нужно. / The line where the computer waits for a command. |
| Домашняя папка | Uy papkasi | Home folder | Папка пользователя, обозначается `~`: `cd ~`. / Your user folder, written `~`. |
| Абсолютный путь | Absolyut yo‘l | Absolute path | Путь от корня диска: `/home/student/site`. / A path from the root of the disk. |
| Относительный путь | Nisbiy yo‘l | Relative path | Путь от текущей папки: `site/css`, `..`. / A path from the current folder. |
| Скрытый файл | Yashirin fayl | Hidden file | Имя начинается с точки, виден только через `ls -a`: `.git`. / Name starts with a dot; shown by `ls -a`. |
| Репозиторий | Repozitoriy | Repository | Папка проекта, за которой следит Git, вместе со всей историей. Создаётся `git init`. / A project folder tracked by Git, with its history. |
| Папка `.git` | `.git` papkasi | `.git` folder | Здесь Git хранит историю. Удалите её - и история пропадёт. / Where Git keeps the history. |
| Основная ветка | Asosiy tarmoq | Main branch | Ветка `main`; имя задаёт `git config --global init.defaultBranch main`. / The `main` branch. |
| Учебный терминал | O‘quv terminali | Learning terminal | Симулятор Git на платформе: в нём выполняются задания IDE. / The Git simulator used for IDE tasks. |

## Урок 2 / Lesson 2 / 2-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Рабочая папка | Ishchi papka | Working directory | Файлы проекта, которые вы видите и меняете (working tree). / The files you see and edit. |
| Индекс | Indeks | Index | «Коробка» для следующего коммита; сюда кладёт `git add` (staging area). / What goes into the next commit. |
| Коммит | Kommit | Commit | Сохранённый снимок проекта: файлы, автор, дата, сообщение. / A saved snapshot of the project. |
| Жизненный цикл файла | Faylning hayot sikli | File life cycle | Состояния файла: untracked → staged → committed → modified. / The states a file goes through. |
| Untracked | Untracked | Untracked | Новый файл, за которым Git ещё не следит; в `git status -s` - `??`. / A new file Git does not track yet. |
| Staged | Staged | Staged | Изменение уже в индексе и войдёт в коммит. / A change already in the index. |
| Modified | Modified | Modified | Отслеживаемый файл изменён после коммита; в `git status -s` - `M`. / A tracked file changed since the commit. |
| Отслеживаемый файл | Kuzatiladigan fayl | Tracked file | Файл, который уже есть в коммитах. Только такие берёт `git commit -am`. / A file that is already in commits. |
| Сообщение коммита | Kommit xabari | Commit message | Что сделано, по-английски, до 50 символов: `Add home page`. / What the commit does, in English. |
| Повелительное наклонение | Buyruq mayli | Imperative mood | `Add`, `Fix`, `Update`: «If applied, this commit will ...». / Messages read as commands. |
| Корневой коммит | Ildiz kommit | Root commit | Самый первый коммит, без родителя: `(root-commit)`. / The first commit, with no parent. |
| Here-document | Here-document | Here-document | Файл из нескольких строк: `cat > файл << 'EOF'` ... `EOF`. / A multi-line file typed in the terminal. |
| `>` и `>>` | `>` va `>>` | `>` and `>>` | `>` перезаписывает файл, `>>` дописывает в конец. / `>` overwrites, `>>` appends. |

## Урок 3 / Lesson 3 / 3-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| История коммитов | Kommitlar tarixi | Commit history | Список коммитов, самый свежий сверху: `git log`. / The list of commits, newest first. |
| Хеш коммита | Kommit xeshi | Commit hash | «Отпечаток пальца» коммита: 40 символов SHA-1. / A commit's unique fingerprint. |
| Короткий хеш | Qisqa xesh | Short hash | Первые 7 символов хеша: `e35750c`. Бывает разным у всех. / The first 7 characters of a hash. |
| SHA-1 / SHA-256 | SHA-1 / SHA-256 | SHA-1 / SHA-256 | Алгоритмы хеша: SHA-1 сейчас (40 символов), SHA-256 - в Git 3.0 (64 символа). / Hash algorithms, now and in Git 3.0. |
| `HEAD` | `HEAD` | `HEAD` | Значок «Вы здесь»: текущий коммит текущей ветки. / The "you are here" marker. |
| `HEAD~1`, `HEAD~2` | `HEAD~1`, `HEAD~2` | `HEAD~1`, `HEAD~2` | На один, на два коммита назад от `HEAD`. / One and two commits back from `HEAD`. |
| Родительский коммит | Ota kommit | Parent commit | Коммит, после которого сделан текущий: `HEAD~1` или `HEAD^`. / The commit before the current one. |
| Постраничный просмотр | Sahifalab ko‘rish rejimi | Pager | Режим, в котором `git log` показывает длинный вывод; выход - клавиша `q`. / Long output by pages; quit with `q`. |
| Diff | Diff | Diff | Разница между версиями: `-` удалено, `+` добавлено. / The difference between versions. |
| Unified diff | Unified diff | Unified diff | Формат вывода `git diff` и `git show`: строки `---`, `+++`, `@@`. / The format of `git diff` output. |
| Контекст | Kontekst | Context | Неизменённые строки вокруг правки в diff (начинаются с пробела). / Unchanged lines around an edit. |

## Урок 4 / Lesson 4 / 4-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Карта отмены | Bekor qilish xaritasi | Undo map | Команда отмены зависит от того, где ошибка: файл, индекс, последний или старый коммит. / The undo command depends on where the mistake is. |
| Amend | Amend | Amend | Замена последнего коммита новым: `git commit --amend`. Хеш меняется. / Replaces the last commit with a new one. |
| Revert | Revert | Revert | Новый коммит, который отменяет старый. Безопасен для опубликованной истории. / A new commit that undoes an old one. |
| Reset | Reset | Reset | Перенос ветки назад на указанный коммит: `git reset HEAD~1`. / Moves a branch back. |
| `--soft` | `--soft` | `--soft` | Коммит отменён, изменения остались в индексе. / Undo the commit, keep the changes staged. |
| `--mixed` | `--mixed` | `--mixed` | Режим по умолчанию: изменения остались в файлах, индекс очищен. / The default: changes stay in the files. |
| `--hard` | `--hard` | `--hard` | Выбросить всё: коммит, индекс и правки в файлах. Опасно. / Throw everything away. Dangerous. |
| Reflog | Reflog | Reflog | Журнал перемещений `HEAD`: помогает найти «потерянный» коммит. Только локальный. / Log of HEAD movements; local only. |
| `HEAD@{N}` | `HEAD@{N}` | `HEAD@{N}` | Где `HEAD` был N шагов назад по reflog: `git reset --hard HEAD@{1}`. / Where HEAD was N moves ago. |
| Опубликованный коммит | E’lon qilingan kommit | Published commit | Коммит, который уже на GitHub и у товарищей. Отменяется только `git revert`. / A commit others already have. |
| Переписать историю | Tarixni qayta yozish | Rewrite history | Заменить коммиты новыми (amend, reset, rebase). Нельзя для опубликованной истории. / Replacing commits; never for published history. |

## Урок 5 / Lesson 5 / 5-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| `.gitignore` | `.gitignore` | `.gitignore` | Файл правил: какие файлы Git не должен замечать. Его тоже коммитят. / Rules for files Git should not track. |
| Игнорирование файлов | Fayllarni e’tiborsiz qoldirish | Ignoring files | Игнорируемый файл не попадает в `Untracked files` и в `git add .`. / Ignored files are skipped by `git add .`. |
| Шаблон | Shablon | Pattern | Правило по приметам имени: `*.log`, `temp?.txt`, `build/`, `**/cache`. / A rule that matches file names. |
| Исключение | Istisno | Exception | Строка с `!`: не игнорировать, хотя правило выше подошло. `!important.log`. / Un-ignore a matching file. |
| Секрет | Sir | Secret | Пароли, ключи API, `.env`. В Git не хранят; попавший в историю секрет меняют. / Passwords and keys; never commit them. |
| Зависимости | Bog‘liqliklar | Dependencies | Чужие библиотеки, которые скачиваются заново: `node_modules/`. / Libraries that can be downloaded again. |
| Сборка | Yig‘ma | Build | Файлы, которые получаются из исходников: `dist/`, `build/`. / Files produced from the source code. |
| Принудительно (`-f`) | Majburan (`-f`) | Force (`-f`) | `git add -f файл` - добавить файл, несмотря на `.gitignore`. / Add a file despite `.gitignore`. |
| Убрать из отслеживания | Kuzatuvdan chiqarish | Stop tracking | `git rm --cached файл`: Git забывает файл, а на диске он остаётся. / Git forgets the file, the disk keeps it. |
| `git rm` / `git mv` | `git rm` / `git mv` | `git rm` / `git mv` | Удалить / переименовать файл и сразу записать это в индекс. / Delete / rename and stage it. |
| README | README | README | Визитная карточка репозитория: что за проект, как открыть, кто автор. / The business card of a repository. |
| `.gitkeep` | `.gitkeep` | `.gitkeep` | Пустой файл, чтобы Git сохранил пустую папку. Это соглашение, а не команда Git. / A placeholder that keeps an empty folder. |

## Урок 6 / Lesson 6 / 6-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Ветка | Tarmoq | Branch | Подвижная закладка на коммит. Новые коммиты двигают её вперёд. / A movable bookmark on a commit. |
| Текущая ветка | Joriy tarmoq | Current branch | Ветка, на которую указывает `HEAD`; в `git branch` отмечена `*`. / The branch `HEAD` points to. |
| `HEAD -> main` | `HEAD -> main` | `HEAD -> main` | Запись в `git log`: вы на ветке `main`, на её последнем коммите. / You are on `main`. |
| Переключение веток | Tarmoq almashtirish | Switching branches | `git switch имя`: Git меняет файлы в рабочей папке на версию ветки. / Git swaps the files to that branch. |
| Граф истории | Tarix grafi | History graph | Рисунок веток и развилок: `git log --oneline --graph --all`. / A picture of branches and forks. |
| Незакоммиченные изменения | Kommit qilinmagan o‘zgarishlar | Uncommitted changes | Правки, которых ещё нет в коммите. Могут помешать переключению. / Edits that are not committed yet. |
| Слитая ветка | Birlashtirilgan tarmoq | Merged branch | Ветка, чьи коммиты уже есть в текущей. Её безопасно удалить `-d`. / Its commits are already in the current branch. |
| Принудительное удаление | Majburan o‘chirish | Force delete | `git branch -D`: удалить ветку, даже если её работа никуда не влита. Осторожно. / Delete even an unmerged branch. |
| Отделённый HEAD | Ajratilgan HEAD | Detached HEAD | `HEAD` указывает на коммит, а не на ветку: `HEAD detached at ...`. / HEAD points at a commit, not a branch. |
| Префикс ветки | Tarmoq prefiksi | Branch prefix | Часть имени по типу задачи: `feature/`, `fix/`, `docs/`. / Part of the name that shows the task type. |
| `git checkout` | `git checkout` | `git checkout` | Старая универсальная команда. Сейчас вместо неё `git switch` и `git restore`. / The old all-in-one command. |

## Урок 7 / Lesson 7 / 7-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Слияние | Birlashtirish | Merge | Влить изменения другой ветки в текущую: `git merge ветка`. / Bring another branch into the current one. |
| Перемотка вперёд | Oldinga o‘tkazish | Fast-forward | Сводить нечего: ветка просто передвигается вперёд. Ответ Git - `Fast-forward`. / The branch just moves forward. |
| Коммит слияния | Birlashtirish kommiti | Merge commit | Коммит с двумя родителями: `Merge made by the 'ort' strategy.` / A commit with two parents. |
| `--no-ff` | `--no-ff` | `--no-ff` | Всегда создавать коммит слияния, даже если возможна перемотка. / Always create a merge commit. |
| Конфликт слияния | Birlashtirish konflikti | Merge conflict | Одно место изменено в обеих ветках; Git ждёт решения человека: `CONFLICT (content)`. / Both branches changed the same place. |
| Маркеры конфликта | Konflikt markerlari | Conflict markers | `<<<<<<< HEAD` - ваш вариант, `=======` - граница, `>>>>>>> ветка` - вариант ветки. / Markers around the two versions. |
| Разрешение конфликта | Konfliktni hal qilish | Resolving a conflict | Оставить нужный текст, убрать маркеры, `git add`, `git commit`. / Edit, remove markers, add, commit. |
| `both modified` | `both modified` | `both modified` | Строка `git status`: файл изменён в обеих ветках, в нём конфликт. / A file with a conflict. |
| `git merge --abort` | `git merge --abort` | `git merge --abort` | Отменить слияние с конфликтом и вернуть всё как было. / Cancel the merge and restore everything. |
| Current / Incoming | Current / Incoming | Current / Incoming | Кнопки VS Code: оставить вариант текущей ветки / входящей / оба (Both). / VS Code buttons for choosing a side. |

## Урок 8 / Lesson 8 / 8-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Удалённый репозиторий | Masofaviy repozitoriy | Remote repository | Копия репозитория на сервере, например на GitHub. / A copy of the repository on a server. |
| Локальный репозиторий | Lokal repozitoriy | Local repository | Репозиторий на вашем компьютере. / The repository on your computer. |
| `origin` | `origin` | `origin` | Обычное имя главного удалённого репозитория: `git remote add origin адрес`. / The usual name of the main remote. |
| Upstream | Upstream | Upstream | «Адрес по умолчанию» ветки на сервере; задаётся `git push -u`. / The default server branch for a branch. |
| `origin/main` | `origin/main` | `origin/main` | Последнее известное состояние ветки `main` на сервере; обновляется при `fetch`, `pull`, `push`. / The last known state of the server. |
| `ahead` / `behind` | `ahead` / `behind` | `ahead` / `behind` | В `git status`: у вас есть неотправленные коммиты / на сервере есть новые. / You have unpushed / the server has new commits. |
| Push | Yuborish | Push | Отправить коммиты на сервер: `git push`. / Send commits to the server. |
| Клонирование | Klonlash | Cloning | Скачать репозиторий целиком со всей историей: `git clone адрес`. / Download a whole repository. |
| Fetch | Fetch | Fetch | Скачать новые коммиты в `origin/main`, не трогая ваши файлы. / Download without changing your files. |
| Pull | Pull | Pull | `fetch` и сразу объединение с текущей веткой. / Fetch and combine with the current branch. |
| Токен | Token | Personal access token | «Пропуск» вместо пароля для входа в GitHub по HTTPS. / Used instead of a password over HTTPS. |
| SSH-ключ | SSH kaliti | SSH key | Пара ключей: открытый (`.pub`) кладут на GitHub, закрытый никому не дают. / A public and a private key. |
| Git Credential Manager | Git Credential Manager | Git Credential Manager | Помощник, который сам проводит вход в GitHub и запоминает его. / A helper that signs you in and remembers it. |

## Урок 9 / Lesson 9 / 9-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| GitHub Flow | GitHub Flow | GitHub Flow | Правило команды: `main` всегда рабочая, каждая задача - в своей ветке и через PR. / Every task in its own branch and PR. |
| Pull request (PR) | Pull request (PR) | Pull request (PR) | Предложение влить ветку в `main` на GitHub, с обсуждением. / A proposal to merge a branch on GitHub. |
| Ревью | Ko‘rib chiqish (review) | Code review | Товарищ читает изменения до слияния и оставляет замечания. / A teammate reads the changes before the merge. |
| Отклонённый `push` | Rad etilgan `push` | Rejected `push` | Сервер не принял коммиты: `! [rejected] ... (fetch first)` - сначала заберите новое. / The server has commits you don't have. |
| Расхождение веток | Tarmoqlarning ajralishi | Diverged branches | И у вас, и на сервере есть новые коммиты; их нужно объединить. / New commits on both sides. |
| `pull.rebase` | `pull.rebase` | `pull.rebase` | Настройка способа `git pull`: `false` - слияние, `true` - rebase. / Chooses how `git pull` combines. |
| Rebase | Rebase | Rebase | «Пересадить» свои коммиты поверх свежей ветки: `git rebase main`. История становится прямой. / Replay your commits on top. |
| Stash | Stash | Stash | «Карман» для незакоммиченных правок: `git stash`, потом `git stash pop`. / A pocket for uncommitted edits. |
| Запись stash | Stash yozuvi | Stash entry | Одна отложенная правка: `stash@{0}` - самая свежая. / One saved change. |
| Cherry-pick | Cherry-pick | Cherry-pick | Скопировать один коммит в текущую ветку: `git cherry-pick <хеш>`. / Copy one commit. |
| `git push --force` | `git push --force` | `git push --force` | Заставить сервер принять вашу историю. В общей ветке стирает чужие коммиты - нельзя. / Overwrites the server; never in a shared branch. |

## Урок 10 / Lesson 10 / 10-dars

| RU | UZ | EN | Пояснение / Explanation |
| --- | --- | --- | --- |
| Тег | Teg | Tag | Неподвижная метка на коммите, обычно номер версии: `v1.0`. / A fixed label on a commit. |
| Лёгкий тег | Yengil teg | Lightweight tag | Только имя на коммите: `git tag v0.1`. / Just a name on a commit. |
| Аннотированный тег | Annotatsiyali teg | Annotated tag | Тег с автором (`Tagger`), датой и сообщением: `git tag -a v1.0 -m "..."`. Для выпусков. / A tag with author, date and message. |
| Семантическое версионирование | Semantik versiyalash | Semantic versioning | Номер `MAJOR.MINOR.PATCH`: крупные / новые возможности / исправления. / Version number rules. |
| Релиз | Reliz | Release | Страница выпуска на GitHub на основе тега: описание и файлы. / A GitHub release page built on a tag. |
| Алиас | Alias | Alias | Своя короткая команда: `git config --global alias.lg "log --oneline --graph --all"`. / Your own short command. |
| GitHub Pages | GitHub Pages | GitHub Pages | Бесплатный хостинг сайта прямо из репозитория: `https://логин.github.io/репозиторий/`. / Free hosting from a repository. |
| Итоговый проект | Yakuniy loyiha | Final project | Ваш сайт на GitHub: история, ветки, `.gitignore`, тег `v1.0`, Pages. / Your site on GitHub with full history. |

---

[Содержание / Contents / Mundarija](README.md) · [Шпаргалка / Cheat sheet](CHEATSHEET.md) · [Источники / References](REFERENCES.md)
