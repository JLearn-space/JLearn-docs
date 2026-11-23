# Шпаргалка по курсу / Course cheat sheet / Kurs bo‘yicha qisqa qo‘llanma

Все команды курса на одной странице, по урокам. Команды записаны так, как их вводят в терминал (Git 2.56), без знака `$`. Используются современные команды курса: `git switch` вместо `git checkout` для веток, `git restore` вместо `git checkout --` и `git reset HEAD` для файлов. Основная ветка - `main`, сообщения коммитов - на английском, в повелительном наклонении.

All course commands on one page, by lesson. Commands are written as you type them in the terminal (Git 2.56), without the `$` sign. The course uses modern commands: `git switch` for branches and `git restore` for files. The main branch is `main`; commit messages are in English, in the imperative mood.

Kursdagi barcha buyruqlar bitta sahifada, darslar bo‘yicha. Buyruqlar terminalga qanday kiritilsa, shunday yozilgan (Git 2.56), `$` belgisisiz. Kursdagi zamonaviy buyruqlar: tarmoqlar uchun `git switch`, fayllar uchun `git restore`. Asosiy tarmoq - `main`, kommit xabarlari - ingliz tilida, buyruq maylida.

## 1. Git и терминал / Git and the terminal / Git va terminal

| Задача / Task / Vazifa | Команда / Command / Buyruq |
| --- | --- |
| Проверить версию Git / Check the Git version / Git versiyasini tekshirish | `git --version` |
| Где я / Where am I / Qayerdaman | `pwd` |
| Что в папке (со скрытыми) / What is in the folder (with hidden) / Papkada nima bor (yashirinlari bilan) | `ls`, `ls -a` |
| Перейти в папку / выше / домой / Go into a folder / up / home / Papkaga / yuqoriga / uyga o‘tish | `cd site`, `cd ..`, `cd ~` |
| Создать папку / Create a folder / Papka yaratish | `mkdir site` |
| Создать файл с текстом / Create a file with text / Matnli fayl yaratish | `echo "<h1>Hello</h1>" > index.html` |
| Показать файл / Show a file / Faylni ko‘rsatish | `cat index.html` |
| Посмотреть настройки / View the settings / Sozlamalarni ko‘rish | `git config --global --list` |
| Создать репозиторий / Create a repository / Repozitoriy yaratish | `git init` (в папке проекта / in the project folder / loyiha papkasida) |
| Что происходит / What is going on / Nima bo‘lyapti | `git status` |

```bash
# Один раз на компьютере / Once per computer / Kompyuterda bir marta
git config --global user.name "Anna Karimova"
git config --global user.email "anna@example.com"
git config --global init.defaultBranch main

# Новый проект / New project / Yangi loyiha
mkdir site
cd site
git init
git status
```

## 2. Первый коммит / The first commit / Birinchi kommit

| Задача / Task / Vazifa | Команда / Command / Buyruq |
| --- | --- |
| Положить файл в индекс / Put a file into the index / Faylni indeksga qo‘yish | `git add index.html` |
| Положить несколько файлов / Put several files / Bir nechta faylni qo‘yish | `git add index.html style.css` |
| Положить всё новое и изменённое / Put everything new and modified / Barcha yangi va o‘zgargan narsalarni qo‘yish | `git add .` |
| Короткий статус / Short status / Qisqa holat | `git status -s` |
| Сделать коммит / Make a commit / Kommit qilish | `git commit -m "Add home page"` |
| Коммит всех изменённых отслеживаемых файлов / Commit all modified tracked files / Barcha o‘zgargan kuzatiladigan fayllarni kommit qilish | `git commit -am "Update README"` |
| Дописать строку в файл / Append a line to a file / Faylga qator qo‘shish | `echo "Built with HTML and CSS." >> README.md` |

Коды `git status -s` / `git status -s` codes / `git status -s` kodlari: `??` - untracked, `A ` - новый в индексе / new in the index / indeksdagi yangi, ` M` - изменён, не в индексе / modified, not staged / o‘zgargan, indeksda emas, `M ` - изменение в индексе / staged change / indeksdagi o‘zgarish, `MM` / `AM` - изменён после `git add` / changed after `git add` / `git add` dan keyin o‘zgargan.

```bash
echo "# Portfolio" > README.md
git add README.md
git commit -m "Add README"

# Файл из нескольких строк / Multi-line file / Bir necha qatorli fayl
cat > index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
  <title>Anna Karimova</title>
</head>
<body>
  <h1>Anna Karimova</h1>
</body>
</html>
EOF
git add index.html
git commit -m "Add home page"

# Новый файл - только через git add / New file needs git add / Yangi fayl - faqat git add orqali
echo "body { font-family: sans-serif; }" > style.css
git add style.css
git commit -m "Add styles"

# Изменённый отслеживаемый файл / Modified tracked file / O‘zgargan kuzatiladigan fayl
echo "Built with HTML and CSS." >> README.md
git commit -am "Describe project in README"
git log --oneline
```

## 3. История и изменения / History and changes / Tarix va o‘zgarishlar

| Задача / Task / Vazifa | Команда / Command / Buyruq |
| --- | --- |
| История подробно / кратко / Detailed / short history / Batafsil / qisqa tarix | `git log`, `git log --oneline` |
| Последние 3 коммита / The last 3 commits / Oxirgi 3 ta kommit | `git log -n 3` или / or / yoki `git log -3` |
| Какие файлы менял каждый коммит / Which files each commit changed / Har bir kommit qaysi fayllarni o‘zgartirgan | `git log --stat` |
| Все изменённые строки / All changed lines / Barcha o‘zgargan qatorlar | `git log -p` |
| Рисунок истории / A picture of the history / Tarix rasmi | `git log --oneline --graph` |
| Выйти из просмотра / Leave the pager / Ko‘rish rejimidan chiqish | клавиша / key / tugma `q` |
| Один коммит целиком / One whole commit / Bitta kommit to‘liq | `git show HEAD~1`, `git show e35750c` |
| Файл из прошлого коммита / A file from a past commit / O‘tgan kommitdagi fayl | `git show HEAD~2:contacts.html` |
| Изменения не в индексе / Changes not in the index / Indeksda bo‘lmagan o‘zgarishlar | `git diff` |
| Что войдёт в коммит / What goes into the commit / Kommitga nima kiradi | `git diff --staged` |
| Разница между коммитами / The difference between commits / Kommitlar orasidagi farq | `git diff HEAD~3 HEAD` |

```bash
# Вернуть удалённый текст новым коммитом / Bring deleted text back with a new commit / O‘chirilgan matnni yangi kommit bilan qaytarish
git log --oneline
git show HEAD~3:contacts.html > contacts.html
git diff
git add contacts.html
git commit -m "Restore phone number"
```

## 4. Отмена изменений / Undoing changes / O‘zgarishlarni bekor qilish

| Где ошибка / Where the mistake is / Xato qayerda | Команда / Command / Buyruq |
| --- | --- |
| Правки в файле, не в индексе / Edits not in the index / Indeksda bo‘lmagan tuzatishlar | `git restore index.html`, все / all / hammasi: `git restore .` |
| Файл случайно в индексе / A file staged by accident / Indeksga tasodifan qo‘shilgan fayl | `git restore --staged passwords.txt` |
| Сообщение последнего коммита / The last commit's message / Oxirgi kommit xabari | `git commit --amend -m "Add about page"` |
| Забытый файл в последнем коммите / A forgotten file in the last commit / Oxirgi kommitdagi unutilgan fayl | `git add about.html`, затем / then / keyin `git commit --amend --no-edit` |
| Коммит уже опубликован / The commit is already published / Kommit allaqachon e’lon qilingan | `git revert --no-edit HEAD~1` |
| Убрать последний коммит, изменения - в индекс / Remove the last commit, changes to the index / Oxirgi kommitni olib tashlash, o‘zgarishlar - indeksga | `git reset --soft HEAD~1` |
| Убрать последний коммит, изменения - в файлы / Remove the last commit, changes to the files / Oxirgi kommitni olib tashlash, o‘zgarishlar - fayllarga | `git reset HEAD~1` (`--mixed`) |
| Выбросить последний коммит целиком (опасно) / Throw away the last commit (dangerous) / Oxirgi kommitni butunlay tashlab yuborish (xavfli) | `git reset --hard HEAD~1` |
| Журнал перемещений HEAD / Log of HEAD movements / HEAD surilishlari jurnali | `git reflog` |
| Вернуться к состоянию из reflog / Go back to a reflog state / Reflog’dagi holatga qaytish | `git reset --hard HEAD@{1}` |

Старые формы из чужих инструкций / Old forms in other guides / Boshqa yo‘riqnomalardagi eski shakllar: `git checkout -- index.html` = `git restore index.html`, `git reset HEAD passwords.txt` = `git restore --staged passwords.txt`.

Правило: `--amend`, `reset` - только для коммитов, которых ещё нет на GitHub; опубликованное отменяют `git revert`. / Rule: amend and reset only for unpublished commits; use `git revert` for published ones. / Qoida: amend va reset - faqat e’lon qilinmagan kommitlar uchun; e’lon qilinganlari `git revert` bilan bekor qilinadi.

## 5. `.gitignore` и порядок в проекте / `.gitignore` and a tidy project / `.gitignore` va loyihada tartib

| Задача / Task / Vazifa | Команда / Command / Buyruq |
| --- | --- |
| Дописать правило / Append a rule / Qoida qo‘shish | `echo 'dist/' >> .gitignore` |
| Добавить игнорируемый файл принудительно / Force-add an ignored file / E’tiborsiz qoldirilgan faylni majburan qo‘shish | `git add -f error.log` |
| Перестать отслеживать файл, оставить на диске / Stop tracking, keep on disk / Kuzatishni to‘xtatish, diskda qoldirish | `git rm --cached .env` |
| То же для папки / The same for a folder / Papka uchun ham | `git rm -r --cached node_modules` |
| Удалить файл из проекта / Delete a file from the project / Faylni loyihadan o‘chirish | `git rm old.html` |
| Переименовать / Rename / Qayta nomlash | `git mv contacts.htm contacts.html` |
| Сохранить пустую папку / Keep an empty folder / Bo‘sh papkani saqlash | `touch images/.gitkeep` |

| Шаблон / Pattern / Shablon | Что значит / Meaning / Ma’nosi |
| --- | --- |
| `*.log` | Все файлы `.log` / All `.log` files / Barcha `.log` fayllar |
| `temp?.txt` | `?` - ровно один символ / exactly one character / aynan bitta belgi |
| `build/` | Только папка и всё внутри / Only a folder and its contents / Faqat papka va ichidagilar |
| `/todo.txt` | Только в корне проекта / Only in the project root / Faqat loyiha ildizida |
| `**/cache` | В любой папке на любой глубине / In any folder at any depth / Istalgan chuqurlikdagi istalgan papkada |
| `!important.log` | Исключение: не игнорировать / Exception: do not ignore / Istisno: e’tiborsiz qoldirmaslik |
| `# logs` | Комментарий / Comment / Izoh |

```bash
cat > .gitignore << 'EOF'
node_modules/
dist/
*.log
.env
.DS_Store
EOF
git status

# Секрет уже в коммите: смените ключ и уберите файл из отслеживания
# The secret is already committed: change the key and stop tracking the file
# Sir allaqachon kommitda: kalitni almashtiring va faylni kuzatuvdan chiqaring
git rm --cached .env
git add .gitignore
git commit -m "Add .gitignore, stop tracking .env"
```

В настоящем терминале строки с `!` пишут в одинарных кавычках: `echo '!keep.log' >> .gitignore`. / In a real terminal, put lines with `!` in single quotes. / Haqiqiy terminalda `!` li qatorlarni bittalik qo‘shtirnoqda yozing.

## 6. Ветки / Branches / Tarmoqlar

| Задача / Task / Vazifa | Команда / Command / Buyruq |
| --- | --- |
| Список веток / с последними коммитами / List branches / with last commits / Tarmoqlar ro‘yxati / oxirgi kommitlari bilan | `git branch`, `git branch -v` |
| Создать ветку (не переходя) / Create a branch (without switching) / Tarmoq yaratish (o‘tmasdan) | `git branch feature/contacts` |
| Перейти на ветку / Switch to a branch / Tarmoqqa o‘tish | `git switch feature/contacts` |
| Создать и перейти / Create and switch / Yaratish va o‘tish | `git switch -c feature/contacts` |
| Создать от `main` / Create from `main` / `main` dan yaratish | `git switch -c feature/contacts main` |
| Вернуться на предыдущую ветку / Go back to the previous branch / Oldingi tarmoqqa qaytish | `git switch -` |
| Граф всех веток / Graph of all branches / Barcha tarmoqlar grafi | `git log --oneline --graph --all` |
| Переименовать текущую / любую ветку / Rename the current / any branch / Joriy / istalgan tarmoqni qayta nomlash | `git branch -m feature/about`, `git branch -m old new` |
| Удалить слитую ветку / Delete a merged branch / Birlashtirilgan tarmoqni o‘chirish | `git branch -d feature/contacts` |
| Удалить принудительно (осторожно!) / Force-delete (careful!) / Majburan o‘chirish (ehtiyot bo‘ling!) | `git branch -D experiment` |
| Посмотреть старый коммит / Look at an old commit / Eski kommitni ko‘rish | `git switch --detach c0adb88` |
| Выйти из отделённого HEAD / Leave a detached HEAD / Ajratilgan HEAD’dan chiqish | `git switch main` или / or / yoki `git switch -c new-branch` |

Старая форма / Old form / Eski shakl: `git checkout feature/contacts` = `git switch feature/contacts`, `git checkout -b feature/contacts` = `git switch -c feature/contacts`.

## 7. Слияние и конфликты / Merging and conflicts / Birlashtirish va konfliktlar

| Задача / Task / Vazifa | Команда / Command / Buyruq |
| --- | --- |
| Влить ветку в `main` / Merge a branch into `main` / Tarmoqni `main` ga birlashtirish | `git switch main`, затем / then / keyin `git merge feature/menu` |
| Влить без редактора сообщения / Merge without the editor / Muharrirsiz birlashtirish | `git merge --no-edit feature/salad` |
| Всегда коммит слияния / Always a merge commit / Har doim birlashtirish kommiti | `git merge --no-ff feature/about` |
| Где конфликт / Where the conflict is / Konflikt qayerda | `git status` → `both modified:` |
| Отметить конфликт решённым / Mark the conflict resolved / Konfliktni hal qilingan deb belgilash | `git add index.html` |
| Закончить слияние / Finish the merge / Birlashtirishni tugatish | `git commit --no-edit` |
| Отменить слияние с конфликтом / Cancel a merge with a conflict / Konfliktli birlashtirishni bekor qilish | `git merge --abort` |
| Родители коммита слияния / Parents of a merge commit / Birlashtirish kommitining ota kommitlari | `git show HEAD` → строка / line / qator `Merge:` |
| Удалить влитые ветки / Delete merged branches / Birlashtirilgan tarmoqlarni o‘chirish | `git branch -d feature/soup feature/salad` |

```text
<h1>Coffee House</h1>
<<<<<<< HEAD
<p>Open 9:00-20:00</p>
=======
<p>Open daily 9:00-18:00</p>
>>>>>>> feature/hours
```

`<<<<<<< HEAD` ... `=======` - вариант текущей ветки / your current branch / joriy tarmoq varianti; `=======` ... `>>>>>>> feature/hours` - вариант вливаемой ветки / the incoming branch / birlashtirilayotgan tarmoq varianti.

```bash
git merge feature/hours
git status
cat index.html
cat > index.html << 'EOF'
<h1>Coffee House</h1>
<p>Open daily 9:00-20:00</p>
EOF
git add index.html
git commit --no-edit
git branch -d feature/hours
```

## 8. GitHub и удалённые репозитории / GitHub and remote repositories / GitHub va masofaviy repozitoriylar

| Задача / Task / Vazifa | Команда / Command / Buyruq |
| --- | --- |
| Подключить удалённый репозиторий / Connect a remote / Masofaviy repozitoriyni ulash | `git remote add origin https://github.com/anna/portfolio.git` |
| Посмотреть адреса / See the addresses / Manzillarni ko‘rish | `git remote -v` |
| Сменить адрес / Change the address / Manzilni almashtirish | `git remote set-url origin https://github.com/anna/portfolio.git` |
| Первая отправка ветки + upstream / First push + upstream / Birinchi yuborish + upstream | `git push -u origin main` |
| Следующие отправки / Next pushes / Keyingi yuborishlar | `git push` |
| Отправить новую ветку / Send a new branch / Yangi tarmoqni yuborish | `git push -u origin feature/about` |
| Ветки и их upstream / Branches and their upstreams / Tarmoqlar va upstream’lari | `git branch -vv` |
| Скачать репозиторий / Download a repository / Repozitoriyni yuklab olish | `cd ~`, затем / then / keyin `git clone https://github.com/aziz/notes.git` |
| Скачать новые коммиты, файлы не трогать / Download without touching files / Fayllarga tegmasdan yuklab olish | `git fetch` |
| Скачать и влить в текущую ветку / Download and merge / Yuklab olish va birlashtirish | `git pull` |
| Создать SSH-ключ / Create an SSH key / SSH kalitini yaratish | `ssh-keygen -t ed25519 -C "anna@example.com"` |
| Проверить SSH-доступ / Check SSH access / SSH orqali kirishni tekshirish | `ssh -T git@github.com` |

Вход по HTTPS: Git Credential Manager, `gh auth login` или токен вместо пароля. / Signing in over HTTPS: Git Credential Manager, `gh auth login` or a token instead of the password. / HTTPS orqali kirish: Git Credential Manager, `gh auth login` yoki parol o‘rniga token.

```bash
# Репозиторий на GitHub создан пустым (без README) / Created empty on GitHub / GitHub’da bo‘sh yaratilgan
git remote add origin https://github.com/student/site.git
git push -u origin main
git status          # Your branch is up to date with 'origin/main'.
git fetch
git status          # ahead / behind
git pull
```

## 9. Командная работа / Teamwork / Jamoada ishlash

| Задача / Task / Vazifa | Команда / Command / Buyruq |
| --- | --- |
| Отправить ветку для pull request / Push a branch for a PR / PR uchun tarmoqni yuborish | `git push -u origin feature/contacts` |
| После merge PR / After the PR merge / PR birlashtirilgandan keyin | `git switch main`, `git pull`, `git branch -d feature/contacts` |
| `push` отклонён (`fetch first`) / `push` rejected / `push` rad etildi | `git pull`, затем / then / keyin `git push` |
| Выбрать слияние для `pull` / Choose merge for `pull` / `pull` uchun birlashtirish | `git config pull.rebase false` или / or / yoki `git pull --no-rebase` |
| Выбрать rebase для `pull` / Choose rebase for `pull` / `pull` uchun rebase | `git config pull.rebase true` или / or / yoki `git pull --rebase` |
| Только перемотка / Fast-forward only / Faqat oldinga o‘tkazish | `git config pull.ff only` или / or / yoki `git pull --ff-only` |
| Отложить правку / с подписью / с новыми файлами / Stash / with a label / with new files / Chetga qo‘yish / yorliq bilan / yangi fayllar bilan | `git stash`, `git stash -m "footer idea"`, `git stash -u` |
| Список, содержимое записи / List, entry contents / Ro‘yxat, yozuv tarkibi | `git stash list`, `git stash show` |
| Вернуть и удалить запись / вернуть и оставить / Restore and drop / restore and keep / Qaytarish va o‘chirish / qaytarish va qoldirish | `git stash pop`, `git stash apply` |
| Перенести ветку поверх свежей `main` / Rebase onto fresh `main` / Tarmoqni yangi `main` ustiga ko‘chirish | `git switch feature/menu`, `git rebase main` |
| Продолжить / отменить rebase / Continue / cancel a rebase / Rebase’ni davom ettirish / bekor qilish | `git rebase --continue`, `git rebase --abort` |
| Скопировать один коммит / Copy one commit / Bitta kommitni nusxalash | `git cherry-pick b823ea5` |

```bash
# push отклонён, а в папке есть незакоммиченная правка
# push was rejected and there is an uncommitted edit
# push rad etildi, papkada esa kommit qilinmagan tahrir bor
git stash
git config pull.rebase false
git pull
git push
git stash pop
```

Не «чините» отклонённый `push` через `git push --force`: в общей ветке он сотрёт коммиты товарища. / Never fix a rejected push with `git push --force` in a shared branch. / Rad etilgan `push` ni umumiy tarmoqda `git push --force` bilan «tuzatmang».

## 10. Теги, релизы и итоговый проект / Tags, releases and final project / Teglar, relizlar va yakuniy loyiha

| Задача / Task / Vazifa | Команда / Command / Buyruq |
| --- | --- |
| Список тегов / List tags / Teglar ro‘yxati | `git tag` |
| Аннотированный тег на `HEAD` / Annotated tag on `HEAD` / `HEAD` dagi annotatsiyali teg | `git tag -a v1.0 -m "First release"` |
| Лёгкий тег на старом коммите / Lightweight tag on an old commit / Eski kommitdagi yengil teg | `git tag v0.1 HEAD~2` |
| Посмотреть тег и его коммит / View a tag and its commit / Teg va uning kommitini ko‘rish | `git show v1.0` |
| Отправить один тег / все теги / Push one tag / all tags / Bitta / barcha teglarni yuborish | `git push origin v1.0`, `git push --tags` |
| Удалить тег у себя / на сервере / Delete a tag locally / on the server / Tegni o‘zingizda / serverda o‘chirish | `git tag -d v0.1`, `git push origin --delete v0.1` |
| Создать / удалить алиас / Create / delete an alias / Alias yaratish / o‘chirish | `git config --global alias.lg "log --oneline --graph --all"`, `git config --global --unset alias.lg` |
| Релиз / Release / Reliz | GitHub: Releases → Draft a new release → тег / tag / teg → Publish release |
| Сайт на GitHub Pages / Website on GitHub Pages / GitHub Pages’dagi sayt | Settings → Pages → Deploy from a branch → `main`, `/ (root)` → Save |

Версии / Versions / Versiyalar: `MAJOR.MINOR.PATCH` - `v1.0.1` исправление / fix / tuzatish, `v1.1.0` новая возможность / new feature / yangi imkoniyat, `v2.0.0` несовместимые изменения / breaking changes / mos kelmaydigan o‘zgarishlar.

```bash
# Итоговый проект: полный цикл / Final project: the full cycle / Yakuniy loyiha: to‘liq sikl
cd my-site
git init
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
git add .
git commit -m "Add site files"
git switch -c feature/contacts
echo "<h1>Contacts</h1>" > contacts.html
git add contacts.html
git commit -m "Add contacts page"
git switch main
git merge --no-ff feature/contacts
git branch -d feature/contacts
git config --global alias.lg "log --oneline --graph --all"
git remote add origin https://github.com/anna/my-site.git
git push -u origin main
git tag -a v1.0 -m "First release"
git push --tags
git lg
```

## Частые сообщения об ошибках / Common error messages / Ko‘p uchraydigan xato xabarlari

Сообщения Git показаны так, как их выводит терминал. В скобках - урок, где сообщение разбирается подробно.

Git messages are shown exactly as the terminal prints them. The number in brackets is the lesson that explains the message.

Git xabarlari terminal qanday chiqarsa, shunday ko‘rsatilgan. Qavs ichida - xabar batafsil tushuntirilgan dars.

| Сообщение / Message | Что значит и что делать / Meaning and fix / Ma’nosi va nima qilish kerak |
| --- | --- |
| `fatal: not a git repository (or any of the parent directories): .git` | Команда Git вне папки проекта: `cd` в проект, проверить `pwd` (1). / A Git command outside the project folder. / Git buyrug‘i loyiha papkasidan tashqarida berilgan. |
| `Author identity unknown` | Не настроены имя и email: `git config --global user.name` и `user.email` (1). / Name and email are not set. / Ism va email sozlanmagan. |
| `nothing added to commit but untracked files present (use "git add" to track)` | Коммит без `git add`: сначала `git add файл` (2). / A commit without `git add`. / `git add` siz kommit. |
| `error: pathspec 'home' did not match any file(s) known to git` | Сообщение коммита без кавычек: `git commit -m "Add home page"` (2). / A commit message without quotes. / Qo‘shtirnoqsiz kommit xabari. |
| `fatal: pathspec 'readme.md' did not match any files` | Опечатка или неверный регистр в имени файла: проверить `ls` (2). / A typo or wrong letter case. / Fayl nomida xato yoki harflar katta-kichikligi noto‘g‘ri. |
| `fatal: ambiguous argument 'HEAD~9': unknown revision or path not in the working tree.` | Такого коммита нет: посчитать коммиты в `git log --oneline` (3). / No such commit. / Bunday kommit yo‘q. |
| `fatal: your current branch 'main' does not have any commits yet` | В репозитории ещё нет коммитов: сначала коммит (3). / No commits yet. / Repozitoriyda hali kommit yo‘q. |
| `fatal: you must specify path(s) to restore` | `git restore --staged` без имени файла: указать файл или `.` (4). / `git restore` needs a file name. / `git restore` ga fayl nomi kerak. |
| `The following paths are ignored by one of your .gitignore files:` | Файл в `.gitignore`; если он правда нужен - `git add -f` (5). / The file is ignored; force-add only if really needed. / Fayl e’tiborsiz qoldirilgan; rostdan kerak bo‘lsa - `git add -f`. |
| `error: the following file has local modifications:` | `git rm` для изменённого файла: `--cached` - оставить на диске, `git restore` - отменить правку (5). / `git rm` on a modified file. / O‘zgargan faylga `git rm`. |
| `fatal: invalid reference: feature/contact` | Опечатка в имени ветки: список - `git branch` (6). / A typo in the branch name. / Tarmoq nomida xato. |
| `fatal: a branch named 'feature/contacts' already exists` | Ветка уже есть: перейти без `-c` - `git switch feature/contacts` (6). / The branch exists; switch without `-c`. / Tarmoq bor; `-c` siz o‘ting. |
| `error: the branch 'experiment' is not fully merged` | Работа ветки никуда не влита: слить или, если не нужна, `-D` (6). / The branch is not merged. / Tarmoq birlashtirilmagan. |
| `error: Your local changes to the following files would be overwritten by checkout:` | Незакоммиченные правки мешают переключению: коммит, `git restore` или `git stash` (6, 9). / Uncommitted edits block the switch. / Kommit qilinmagan tahrirlar tarmoq almashtirishga xalaqit beradi. |
| `HEAD detached at c0adb88` | Отделённый HEAD: `git switch main` или `git switch -c имя` (6). / Detached HEAD. / Ajratilgan HEAD. |
| `CONFLICT (content): Merge conflict in index.html` | Одно место изменено в обеих ветках: исправить файл, `git add`, `git commit` или `git merge --abort` (7). / The same place changed in both branches. / Bitta joy ikkala tarmoqda o‘zgartirilgan. |
| `error: Committing is not possible because you have unmerged files.` | Конфликт не решён: исправить файл и `git add` (7). / The conflict is not resolved yet. / Konflikt hali hal qilinmagan. |
| `merge: feature/nope - not something we can merge` | Опечатка в имени ветки: `git branch` (7). / A typo in the branch name. / Tarmoq nomida xato. |
| `fatal: No configured push destination.` | Нет удалённого репозитория: `git remote add origin адрес` (8). / No remote is configured. / Masofaviy repozitoriy ulanmagan. |
| `fatal: The current branch feature/about has no upstream branch.` | Первая отправка ветки: `git push -u origin feature/about` (8). / The first push of a branch needs `-u`. / Tarmoqni birinchi yuborishda `-u` kerak. |
| `error: src refspec master does not match any` | Такой ветки нет (ветка `main`) или нет ни одного коммита (8). / No such branch or no commits. / Bunday tarmoq yo‘q yoki kommit yo‘q. |
| `remote: Repository not found.` | Опечатка в адресе или нет доступа: `git remote -v`, `git remote set-url` (8). / Wrong address or no access. / Manzil xato yoki ruxsat yo‘q. |
| `fatal: Authentication failed for 'https://github.com/anna/portfolio.git/'` | Пароль GitHub в поле `Password` не работает: токен, Git Credential Manager или SSH-ключ (8). / Use a token, GCM or an SSH key. / Token, GCM yoki SSH kalitidan foydalaning. |
| `fatal: destination path 'notes' already exists and is not an empty directory.` | Проект уже скачан: `cd notes && git pull` (8). / The project is already cloned. / Loyiha allaqachon yuklab olingan. |
| `! [rejected] main -> main (fetch first)` | На сервере есть коммиты, которых нет у вас: `git pull`, затем `git push`. Не `--force` (8, 9). / The server has commits you don't have. / Serverda sizda yo‘q kommitlar bor. |
| `fatal: Need to specify how to reconcile divergent branches.` | Ветки разошлись, способ `pull` не выбран: `git config pull.rebase false` или `git pull --rebase` (9). / Choose how `pull` combines. / `pull` usulini tanlang. |
| `fatal: Not possible to fast-forward, aborting.` | Задано `pull.ff only`, а ветки разошлись: `git pull --no-rebase` или `--rebase` (9). / Fast-forward only, but branches diverged. / Faqat oldinga o‘tkazish, tarmoqlar esa ajralgan. |
| `error: Your local changes to the following files would be overwritten by merge:` | Незакоммиченная правка мешает `pull` или `merge`: `git stash`, `git pull`, `git stash pop` (7, 9). / An uncommitted edit blocks the merge. / Kommit qilinmagan tahrir birlashtirishga xalaqit beradi. |
| `fatal: tag 'v1.0' already exists` | Тег с таким именем есть: другое имя или `git tag -d v1.0`, если тег не отправлен (10). / The tag exists. / Bunday teg bor. |

---

[Содержание / Contents / Mundarija](README.md) · [Словарь / Glossary](GLOSSARY.md) · [Источники / References](REFERENCES.md)
