/*!
 * GitSim - учебный симулятор Git для платформы JLearn (курс «Git: за 10 уроков»).
 * Выполняет команды оболочки и git в памяти: файлы, индекс, коммиты, ветки,
 * слияния и конфликты, удалённые репозитории («GitHub»), несколько пользователей.
 * Вывод повторяет Git 2.56 настолько, насколько это нужно ученику.
 *
 * Использование:
 *   const sim = new GitSim({ lang: "ru" });
 *   sim.run('mkdir site && cd site\ngit init');
 *   sim.output;               // текст терминала
 *   sim.repo().log();         // коммиты текущего репозитория
 *
 * Лицензия: CC BY-NC-SA 4.0, JLearn (jlearn.space).
 */
(function (root, factory) {
    if (typeof module === "object" && module.exports) module.exports = factory();
    else root.GitSim = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
    "use strict";

    const GIT_VERSION = "2.56.1";
    const START_TIME = Date.UTC(2026, 8, 1, 5, 0, 0); // 1 сентября 2026, 10:00 по Ташкенту

    const NOTES = {
        ru: {
            editor: "В учебном терминале нет текстового редактора. Создайте или измените файл командой echo \"текст\" > файл или cat > файл << 'EOF'.",
            commitEditor: "В учебном терминале нет редактора для сообщения коммита. Используйте: git commit -m \"сообщение\"",
            unsupported: "Эта команда не поддерживается учебным терминалом.",
            unsupportedOption: "Этот параметр не поддерживается учебным терминалом:",
            interactive: "Интерактивный режим (-i, -p) в учебном терминале недоступен.",
        },
        uz: {
            editor: "O‘quv terminalida matn muharriri yo‘q. Faylni echo \"matn\" > fayl yoki cat > fayl << 'EOF' buyrug‘i bilan yarating yoki o‘zgartiring.",
            commitEditor: "O‘quv terminalida kommit xabari uchun muharrir yo‘q. Foydalaning: git commit -m \"xabar\"",
            unsupported: "Bu buyruq o‘quv terminalida qo‘llab-quvvatlanmaydi.",
            unsupportedOption: "Bu parametr o‘quv terminalida qo‘llab-quvvatlanmaydi:",
            interactive: "Interaktiv rejim (-i, -p) o‘quv terminalida mavjud emas.",
        },
        en: {
            editor: "There is no text editor in the learning terminal. Create or change a file with echo \"text\" > file or cat > file << 'EOF'.",
            commitEditor: "There is no editor for the commit message in the learning terminal. Use: git commit -m \"message\"",
            unsupported: "This command is not supported by the learning terminal.",
            unsupportedOption: "This option is not supported by the learning terminal:",
            interactive: "Interactive mode (-i, -p) is not available in the learning terminal.",
        },
    };

    // ---------- вспомогательные функции ----------

    class GitError extends Error {
        constructor(message, code = 128) {
            super(message);
            this.code = code;
        }
    }

    function hashHex(text) {
        // Детерминированный «хеш» из 40 шестнадцатеричных символов (не криптографический).
        let out = "";
        for (let seed = 0; out.length < 40; seed += 1) {
            let h = 0x811c9dc5 ^ (seed * 0x9e3779b1);
            for (let i = 0; i < text.length; i += 1) {
                h ^= text.charCodeAt(i);
                h = Math.imul(h, 0x01000193);
            }
            h ^= h >>> 13;
            h = Math.imul(h, 0x5bd1e995);
            h ^= h >>> 15;
            out += (h >>> 0).toString(16).padStart(8, "0");
        }
        return out.slice(0, 40);
    }

    function lines(text) {
        if (text === null || text === undefined || text === "") return [];
        const arr = text.split("\n");
        if (arr[arr.length - 1] === "") arr.pop();
        return arr;
    }

    function lcsPairs(a, b) {
        const n = a.length;
        const m = b.length;
        const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
        for (let i = n - 1; i >= 0; i -= 1) {
            for (let j = m - 1; j >= 0; j -= 1) {
                dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
            }
        }
        const pairs = [];
        let i = 0;
        let j = 0;
        while (i < n && j < m) {
            if (a[i] === b[j]) { pairs.push([i, j]); i += 1; j += 1; }
            else if (dp[i + 1][j] >= dp[i][j + 1]) i += 1;
            else j += 1;
        }
        return pairs;
    }

    function diffOps(oldText, newText) {
        const a = lines(oldText);
        const b = lines(newText);
        const ops = [];
        let i = 0;
        let j = 0;
        for (const [pi, pj] of lcsPairs(a, b)) {
            while (i < pi) ops.push({ t: "-", line: a[i++] });
            while (j < pj) ops.push({ t: "+", line: b[j++] });
            ops.push({ t: " ", line: a[i] });
            i += 1;
            j += 1;
        }
        while (i < a.length) ops.push({ t: "-", line: a[i++] });
        while (j < b.length) ops.push({ t: "+", line: b[j++] });
        return ops;
    }

    function countChanges(oldText, newText) {
        let ins = 0;
        let del = 0;
        for (const op of diffOps(oldText, newText)) {
            if (op.t === "+") ins += 1;
            else if (op.t === "-") del += 1;
        }
        return { ins, del };
    }

    function unifiedDiff(path, oldText, newText) {
        const out = [`diff --git a/${path} b/${path}`];
        if (oldText === null) out.push("new file mode 100644");
        if (newText === null) out.push("deleted file mode 100644");
        out.push(`index ${oldText === null ? "0000000" : hashHex(oldText).slice(0, 7)}..${newText === null ? "0000000" : hashHex(newText).slice(0, 7)}${oldText !== null && newText !== null ? " 100644" : ""}`);
        out.push(oldText === null ? "--- /dev/null" : `--- a/${path}`);
        out.push(newText === null ? "+++ /dev/null" : `+++ b/${path}`);
        const ops = diffOps(oldText ?? "", newText ?? "");
        const changed = ops.map((op, k) => (op.t !== " " ? k : -1)).filter((k) => k >= 0);
        if (changed.length === 0) return out.join("\n");
        const ctx = 3;
        const hunks = [];
        let start = Math.max(0, changed[0] - ctx);
        let end = Math.min(ops.length - 1, changed[0] + ctx);
        for (const k of changed.slice(1)) {
            if (k - ctx <= end + 1) end = Math.min(ops.length - 1, k + ctx);
            else { hunks.push([start, end]); start = Math.max(0, k - ctx); end = Math.min(ops.length - 1, k + ctx); }
        }
        hunks.push([start, end]);
        for (const [s, e] of hunks) {
            let oldLine = 1;
            let newLine = 1;
            for (let k = 0; k < s; k += 1) {
                if (ops[k].t !== "+") oldLine += 1;
                if (ops[k].t !== "-") newLine += 1;
            }
            let oldCount = 0;
            let newCount = 0;
            const body = [];
            for (let k = s; k <= e; k += 1) {
                const op = ops[k];
                if (op.t !== "+") oldCount += 1;
                if (op.t !== "-") newCount += 1;
                body.push(op.t + op.line);
            }
            const oldStart = oldCount === 0 ? oldLine - 1 : oldLine;
            const newStart = newCount === 0 ? newLine - 1 : newLine;
            const fmt = (st, c) => (c === 1 ? `${st}` : `${st},${c}`);
            out.push(`@@ -${fmt(oldStart, oldCount)} +${fmt(newStart, newCount)} @@`);
            out.push(...body);
        }
        if (newText !== null && newText !== "" && !newText.endsWith("\n")) out.push("\\ No newline at end of file");
        return out.join("\n");
    }

    // Трёхстороннее слияние по строкам (упрощённый diff3).
    function merge3(base, ours, theirs, oursLabel, theirsLabel) {
        const B = lines(base);
        const O = lines(ours);
        const T = lines(theirs);
        const mo = new Map(lcsPairs(B, O));
        const mt = new Map(lcsPairs(B, T));
        const result = [];
        let conflict = false;
        let i = 0;
        let a = 0;
        let b = 0;
        const eq = (x, y) => x.length === y.length && x.every((v, k) => v === y[k]);
        const resolve = (bs, os, ts) => {
            if (eq(os, ts)) result.push(...os);
            else if (eq(os, bs)) result.push(...ts);
            else if (eq(ts, bs)) result.push(...os);
            else {
                conflict = true;
                result.push(`<<<<<<< ${oursLabel}`, ...os, "=======", ...ts, `>>>>>>> ${theirsLabel}`);
            }
        };
        for (;;) {
            let k = i;
            while (k < B.length && !(mo.has(k) && mt.has(k) && mo.get(k) >= a && mt.get(k) >= b)) k += 1;
            if (k >= B.length) {
                resolve(B.slice(i), O.slice(a), T.slice(b));
                break;
            }
            resolve(B.slice(i, k), O.slice(a, mo.get(k)), T.slice(b, mt.get(k)));
            result.push(B[k]);
            i = k + 1;
            a = mo.get(k) + 1;
            b = mt.get(k) + 1;
        }
        return { text: result.length ? `${result.join("\n")}\n` : "", conflict };
    }

    function globToRegex(glob) {
        let re = "";
        for (let i = 0; i < glob.length; i += 1) {
            const c = glob[i];
            if (c === "*") {
                if (glob[i + 1] === "*") {
                    i += 1;
                    if (glob[i + 1] === "/") { i += 1; re += "(?:.*/)?"; } else re += ".*";
                } else re += "[^/]*";
            } else if (c === "?") re += "[^/]";
            else if (c === "[") {
                const close = glob.indexOf("]", i);
                if (close > i) { re += glob.slice(i, close + 1).replace("[!", "[^"); i = close; } else re += "\\[";
            } else re += c.replace(/[.+^${}()|\\]/g, "\\$&");
        }
        return re;
    }

    function hasGlob(s) {
        return /[*?[]/.test(s);
    }

    function levenshtein(a, b) {
        const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
        for (let j = 1; j <= b.length; j += 1) d[0][j] = j;
        for (let i = 1; i <= a.length; i += 1) {
            for (let j = 1; j <= b.length; j += 1) {
                d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
            }
        }
        return d[a.length][b.length];
    }

    function plural(n, word) {
        return `${n} ${word}${n === 1 ? "" : "s"}`;
    }

    function formatDate(ms) {
        const d = new Date(ms + 5 * 3600 * 1000);
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const p = (n) => String(n).padStart(2, "0");
        return `${days[d.getUTCDay()]} ${months[d.getUTCMonth()]} ${d.getUTCDate()} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())} ${d.getUTCFullYear()} +0500`;
    }

    // ---------- разбор строки оболочки ----------

    function tokenize(line) {
        const tokens = [];
        let cur = "";
        let has = false;
        let quoted = false;
        const push = () => {
            if (has) tokens.push({ v: cur, q: quoted });
            cur = "";
            has = false;
            quoted = false;
        };
        for (let i = 0; i < line.length; i += 1) {
            const c = line[i];
            if (c === "'") {
                const end = line.indexOf("'", i + 1);
                if (end < 0) throw new GitError("bash: unexpected EOF while looking for matching `''", 2);
                cur += line.slice(i + 1, end);
                has = true;
                quoted = true;
                i = end;
            } else if (c === "\"") {
                let j = i + 1;
                for (; j < line.length && line[j] !== "\""; j += 1) {
                    if (line[j] === "\\" && /["\\$`]/.test(line[j + 1] ?? "")) { cur += line[j + 1]; j += 1; } else cur += line[j];
                }
                if (j >= line.length) throw new GitError("bash: unexpected EOF while looking for matching `\"'", 2);
                has = true;
                quoted = true;
                i = j;
            } else if (c === "\\" && i + 1 < line.length) {
                cur += line[i + 1];
                has = true;
                i += 1;
            } else if (c === " " || c === "\t") {
                push();
            } else if (c === "#" && !has) {
                break;
            } else if (c === "&" && line[i + 1] === "&") {
                push();
                tokens.push({ op: "&&" });
                i += 1;
            } else if (c === "|" && line[i + 1] === "|") {
                push();
                tokens.push({ op: "||" });
                i += 1;
            } else if (c === ";") {
                push();
                tokens.push({ op: ";" });
            } else if (c === ">") {
                push();
                if (line[i + 1] === ">") { tokens.push({ op: ">>" }); i += 1; } else tokens.push({ op: ">" });
            } else if (c === "<" && line[i + 1] === "<") {
                push();
                tokens.push({ op: "<<" });
                i += 1;
                if (line[i + 1] === "-") i += 1;
            } else if (c === "|") {
                push();
                tokens.push({ op: "|" });
            } else if (c === "<") {
                push();
                tokens.push({ op: "<" });
            } else {
                cur += c;
                has = true;
            }
        }
        push();
        return tokens;
    }

    // ---------- симулятор ----------

    class GitSim {
        constructor(options = {}) {
            this.lang = NOTES[options.lang] ? options.lang : "ru";
            this.notes = NOTES[this.lang];
            this.files = new Map(); // абсолютный путь -> содержимое
            this.dirs = new Set(["/", "/home"]);
            this.repos = new Map(); // корень -> репозиторий
            this.servers = new Map(); // url -> удалённый репозиторий
            this.objects = new Map(); // хеш -> коммит
            this.users = new Map();
            this.clock = START_TIME;
            this.counter = 0;
            this.output = "";
            this.history = [];
            this.addUser(options.user ?? "student", { name: options.name, email: options.email });
            this.useUser(options.user ?? "student");
        }

        // ----- пользователи и время -----

        addUser(login, identity = {}) {
            const home = `/home/${login}`;
            this.dirs.add(home);
            const config = {};
            if (identity.name) config["user.name"] = identity.name;
            if (identity.email) config["user.email"] = identity.email;
            if (identity.defaultBranch) config["init.defaultBranch"] = identity.defaultBranch;
            this.users.set(login, { login, home, cwd: home, config, oldpwd: home });
            return this;
        }

        useUser(login) {
            if (!this.users.has(login)) this.addUser(login);
            this.user = this.users.get(login);
            return this;
        }

        tick(seconds = 60) {
            this.clock += seconds * 1000;
            return this.clock;
        }

        // ----- файловая система -----

        abs(p) {
            let path = p;
            if (path === "~" || path.startsWith("~/")) path = this.user.home + path.slice(1);
            else if (!path.startsWith("/")) path = `${this.user.cwd}/${path}`;
            const parts = [];
            for (const part of path.split("/")) {
                if (part === "" || part === ".") continue;
                if (part === "..") parts.pop();
                else parts.push(part);
            }
            return `/${parts.join("/")}`;
        }

        isDir(abs) {
            return this.dirs.has(abs);
        }

        isFile(abs) {
            return this.files.has(abs);
        }

        mkdirp(abs) {
            const parts = abs.split("/").filter(Boolean);
            let cur = "";
            for (const part of parts) {
                cur += `/${part}`;
                if (this.files.has(cur)) throw new GitError(`mkdir: cannot create directory '${cur}': File exists`, 1);
                this.dirs.add(cur);
            }
        }

        writeFile(abs, content) {
            const parent = abs.slice(0, abs.lastIndexOf("/")) || "/";
            if (!this.isDir(parent)) throw new GitError(`bash: ${abs}: No such file or directory`, 1);
            if (this.isDir(abs)) throw new GitError(`bash: ${abs}: Is a directory`, 1);
            this.files.set(abs, content);
        }

        listDir(abs) {
            const prefix = abs === "/" ? "/" : `${abs}/`;
            const names = new Set();
            for (const p of [...this.files.keys(), ...this.dirs]) {
                if (p.startsWith(prefix) && p !== abs) names.add(p.slice(prefix.length).split("/")[0]);
            }
            return [...names].sort();
        }

        removePath(abs) {
            for (const p of [...this.files.keys()]) if (p === abs || p.startsWith(`${abs}/`)) this.files.delete(p);
            for (const p of [...this.dirs]) if (p === abs || p.startsWith(`${abs}/`)) this.dirs.delete(p);
            if (this.repos.has(abs)) this.repos.delete(abs);
            for (const r of [...this.repos.keys()]) if (r.startsWith(`${abs}/`)) this.repos.delete(r);
        }

        // ----- запуск сценария -----

        run(script, opts = {}) {
            const prevUser = this.user.login;
            if (opts.user) this.useUser(opts.user);
            if (opts.cwd) this.user.cwd = this.abs(opts.cwd);
            const quiet = Boolean(opts.quiet);
            const rawLines = String(script).replace(/\r\n/g, "\n").split("\n");
            let lastCode = 0;
            for (let li = 0; li < rawLines.length; li += 1) {
                const line = rawLines[li];
                if (line.trim() === "" || line.trim().startsWith("#")) continue;
                let tokens;
                const echo = (text) => { if (!quiet) this.output += text; };
                try {
                    tokens = tokenize(line);
                } catch (err) {
                    echo(`$ ${line}\n${err.message}\n`);
                    this.history.push({ cmd: line, code: 2, out: err.message, user: this.user.login });
                    lastCode = 2;
                    continue;
                }
                // heredoc: cat > file << 'EOF'
                const hd = tokens.findIndex((t) => t.op === "<<");
                let heredoc = null;
                let shown = line;
                if (hd >= 0) {
                    const delim = tokens[hd + 1]?.v ?? "EOF";
                    const body = [];
                    li += 1;
                    while (li < rawLines.length && rawLines[li].trim() !== delim) {
                        body.push(rawLines[li]);
                        li += 1;
                    }
                    heredoc = body.length ? `${body.join("\n")}\n` : "";
                    shown = `${line}\n${body.map((b) => `> ${b}`).join("\n")}${body.length ? "\n" : ""}> ${delim}`;
                    tokens.splice(hd, 2);
                }
                echo(`$ ${shown}\n`);
                // разбиение на команды по && || ;
                const cmds = [];
                let cur = [];
                for (const t of tokens) {
                    if (t.op === "&&" || t.op === "||" || t.op === ";") { cmds.push({ tokens: cur, next: t.op }); cur = []; } else cur.push(t);
                }
                cmds.push({ tokens: cur, next: null });
                let skip = false;
                for (let ci = 0; ci < cmds.length; ci += 1) {
                    const c = cmds[ci];
                    if (!skip && c.tokens.length) {
                        const { code, out } = this.exec(c.tokens, heredoc);
                        if (out) echo(out.endsWith("\n") ? out : `${out}\n`);
                        this.history.push({ cmd: c.tokens.map((t) => t.v ?? t.op).join(" "), code, out, user: this.user.login });
                        lastCode = code;
                    }
                    if (c.next === "&&") skip = skip || lastCode !== 0;
                    else if (c.next === "||") skip = !skip && lastCode === 0;
                    else skip = false;
                }
            }
            if (opts.user) this.useUser(prevUser);
            return lastCode;
        }

        exec(tokens, heredoc) {
            // перенаправление вывода
            let redirect = null;
            const words = [];
            for (let i = 0; i < tokens.length; i += 1) {
                // сначала проверка синтаксиса, как в bash
                if ([">", ">>", "<"].includes(tokens[i].op)) {
                    const next = tokens[i + 1];
                    if (!next) return { code: 2, out: "bash: syntax error near unexpected token `newline'" };
                    if (next.op) return { code: 2, out: `bash: syntax error near unexpected token \`${next.op}'` };
                }
            }
            for (let i = 0; i < tokens.length; i += 1) {
                const t = tokens[i];
                if (t.op === ">" || t.op === ">>" || t.op === "<") {
                    const target = tokens[i + 1];
                    if (!target) return { code: 2, out: "bash: syntax error near unexpected token `newline'" };
                    if (target.op) return { code: 2, out: `bash: syntax error near unexpected token \`${target.op}'` };
                    if (t.op === "<") {
                        if (!this.isFile(this.abs(target.v))) return { code: 1, out: `bash: ${target.v}: No such file or directory` };
                        heredoc = this.files.get(this.abs(target.v));
                        i += 1;
                        continue;
                    }
                    redirect = { append: t.op === ">>", path: target.v };
                    i += 1;
                } else if (t.op === "|") {
                    return { code: 2, out: `bash: ${this.notes.unsupported} (|)` };
                } else words.push(t);
            }
            const argv = words.map((w) => w.v);
            let result;
            try {
                result = this.command(argv, words, heredoc, redirect);
            } catch (err) {
                if (err instanceof GitError) result = { code: err.code, out: err.message };
                else throw err;
            }
            if (redirect && result.code === 0) {
                const abs = this.abs(redirect.path);
                try {
                    const prev = redirect.append && this.files.has(abs) ? this.files.get(abs) : "";
                    this.writeFile(abs, prev + (result.stdout ?? ""));
                } catch (err) {
                    return { code: 1, out: err.message };
                }
                return { code: 0, out: result.out ?? "" };
            }
            const out = [result.out, result.stdout].filter((x) => x).join("\n");
            return { code: result.code, out: out.replace(/\n+$/, "") };
        }

        command(argv, words, heredoc, redirect) {
            const [name, ...args] = argv;
            const ok = (stdout = "") => ({ code: 0, stdout });
            switch (name) {
                case "git":
                    return this.git(args, words.slice(1));
                case "pwd":
                    return ok(`${this.user.cwd}\n`);
                case "whoami":
                    return ok(`${this.user.login}\n`);
                case "cd": {
                    if (args.length > 1) return { code: 1, out: "bash: cd: too many arguments" };
                    let target = args[0] ?? "~";
                    if (target === "-") target = this.user.oldpwd;
                    const abs = this.abs(target);
                    if (!this.isDir(abs)) {
                        return { code: 1, out: this.isFile(abs) ? `bash: cd: ${target}: Not a directory` : `bash: cd: ${target}: No such file or directory` };
                    }
                    this.user.oldpwd = this.user.cwd;
                    this.user.cwd = abs;
                    return ok();
                }
                case "mkdir": {
                    const parents = args.includes("-p");
                    for (const a of args.filter((x) => !x.startsWith("-"))) {
                        const abs = this.abs(a);
                        const parent = abs.slice(0, abs.lastIndexOf("/")) || "/";
                        if (this.isDir(abs) || this.isFile(abs)) {
                            if (!parents) return { code: 1, out: `mkdir: cannot create directory '${a}': File exists` };
                            continue;
                        }
                        if (!parents && !this.isDir(parent)) return { code: 1, out: `mkdir: cannot create directory '${a}': No such file or directory` };
                        this.mkdirp(abs);
                    }
                    return ok();
                }
                case "touch":
                    for (const a of args.filter((x) => !x.startsWith("-"))) {
                        const abs = this.abs(a);
                        if (!this.files.has(abs)) {
                            try { this.writeFile(abs, ""); } catch { return { code: 1, out: `touch: cannot touch '${a}': No such file or directory` }; }
                        }
                    }
                    return ok();
                case "echo": {
                    let rest = args;
                    let newline = true;
                    let escapes = false;
                    while (rest[0] === "-n" || rest[0] === "-e") {
                        if (rest[0] === "-n") newline = false;
                        if (rest[0] === "-e") escapes = true;
                        rest = rest.slice(1);
                    }
                    let text = rest.join(" ");
                    if (escapes) text = text.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
                    return ok(text + (newline ? "\n" : ""));
                }
                case "printf": {
                    const fmt = (args[0] ?? "").replace(/\\n/g, "\n").replace(/\\t/g, "\t");
                    let k = 1;
                    return ok(fmt.replace(/%s/g, () => args[k++] ?? ""));
                }
                case "cat": {
                    if (heredoc !== null && heredoc !== undefined) return ok(heredoc);
                    let out = "";
                    for (const a of args) {
                        const abs = this.abs(a);
                        if (this.isDir(abs)) return { code: 1, out: `cat: ${a}: Is a directory`, stdout: out };
                        if (!this.isFile(abs)) return { code: 1, out: `cat: ${a}: No such file or directory`, stdout: out };
                        out += this.files.get(abs);
                    }
                    return ok(out);
                }
                case "ls": {
                    const all = args.some((a) => /^-[a-zA-Z]*a/.test(a));
                    const long = args.some((a) => /^-[a-zA-Z]*l/.test(a));
                    const targets = args.filter((a) => !a.startsWith("-"));
                    const out = [];
                    for (const t of targets.length ? targets : ["."]) {
                        const abs = this.abs(t);
                        if (this.isFile(abs)) { out.push(t); continue; }
                        if (!this.isDir(abs)) return { code: 2, out: `ls: cannot access '${t}': No such file or directory` };
                        let names = this.listDir(abs);
                        if (this.repos.has(abs)) names = [".git", ...names];
                        names.sort((x, y) => x.replace(/^\./, "").localeCompare(y.replace(/^\./, "")));
                        if (!all) names = names.filter((n) => !n.startsWith("."));
                        else names = [".", "..", ...names];
                        if (targets.length > 1) out.push(`${t}:`);
                        if (long) {
                            for (const n of names) {
                                const p = n === "." || n === ".." ? abs : `${abs === "/" ? "" : abs}/${n}`;
                                const dir = n === "." || n === ".." || n === ".git" || this.isDir(p);
                                const size = dir ? 4096 : new TextEncoder().encode(this.files.get(p) ?? "").length;
                                out.push(`${dir ? "drwxr-xr-x" : "-rw-r--r--"} 1 ${this.user.login} ${this.user.login} ${String(size).padStart(5)} Sep  1 10:00 ${n}`);
                            }
                        } else if (names.length) out.push(names.join("  "));
                    }
                    return ok(out.length ? `${out.join("\n")}\n` : "");
                }
                case "tree": {
                    const start = this.abs(args[0] ?? ".");
                    const out = [args[0] ?? "."];
                    let dirsCount = 0;
                    let filesCount = 0;
                    const walk = (abs, prefix) => {
                        const names = this.listDir(abs).filter((n) => !n.startsWith("."));
                        names.forEach((n, k) => {
                            const last = k === names.length - 1;
                            const p = `${abs}/${n}`;
                            out.push(`${prefix}${last ? "└── " : "├── "}${n}`);
                            if (this.isDir(p)) { dirsCount += 1; walk(p, prefix + (last ? "    " : "│   ")); } else filesCount += 1;
                        });
                    };
                    walk(start, "");
                    out.push("", `${plural(dirsCount, "director").replace(/directors?$/, (m) => (m === "director" ? "directory" : "directories"))}, ${plural(filesCount, "file")}`);
                    return ok(`${out.join("\n")}\n`);
                }
                case "rm": {
                    const flags = args.filter((a) => a.startsWith("-")).join("");
                    const recursive = /r/i.test(flags);
                    const force = flags.includes("f");
                    for (const a of args.filter((x) => !x.startsWith("-"))) {
                        const matches = hasGlob(a) ? this.globCwd(a) : [this.abs(a)];
                        if (matches.length === 0 && !force) return { code: 1, out: `rm: cannot remove '${a}': No such file or directory` };
                        for (const abs of matches) {
                            if (this.isDir(abs)) {
                                if (!recursive) return { code: 1, out: `rm: cannot remove '${a}': Is a directory` };
                                this.removePath(abs);
                            } else if (this.isFile(abs)) this.files.delete(abs);
                            else if (!force) return { code: 1, out: `rm: cannot remove '${a}': No such file or directory` };
                        }
                    }
                    return ok();
                }
                case "mv":
                case "cp": {
                    const list = args.filter((x) => !x.startsWith("-"));
                    if (list.length < 2) return { code: 1, out: `${name}: missing destination file operand after '${list[0] ?? ""}'` };
                    const dest = this.abs(list[list.length - 1]);
                    for (const s of list.slice(0, -1)) {
                        const src = this.abs(s);
                        if (!this.isFile(src) && !this.isDir(src)) return { code: 1, out: `${name}: cannot stat '${s}': No such file or directory` };
                        const target = this.isDir(dest) ? `${dest}/${src.split("/").pop()}` : dest;
                        if (this.isFile(src)) {
                            this.writeFile(target, this.files.get(src));
                            if (name === "mv") this.files.delete(src);
                        } else {
                            if (name === "cp" && !args.some((a) => /^-[a-zA-Z]*r/i.test(a))) return { code: 1, out: `cp: -r not specified; omitting directory '${s}'` };
                            this.mkdirp(target);
                            for (const d of [...this.dirs]) if (d.startsWith(`${src}/`)) this.dirs.add(target + d.slice(src.length));
                            for (const [p, c] of [...this.files]) if (p.startsWith(`${src}/`)) this.files.set(target + p.slice(src.length), c);
                            if (name === "mv") this.removePath(src);
                        }
                    }
                    return ok();
                }
                case "clear":
                    this.output = "";
                    return ok();
                case "nano":
                case "vim":
                case "vi":
                case "code":
                case "notepad":
                case "open":
                case "start":
                    return { code: 1, out: `${name}: ${this.notes.editor}` };
                case "exit":
                    return ok();
                default:
                    return { code: 127, out: `bash: ${name}: command not found` };
            }
        }

        globCwd(pattern) {
            const abs = this.abs(pattern);
            const re = new RegExp(`^${globToRegex(abs)}$`);
            return [...this.files.keys(), ...this.dirs].filter((p) => re.test(p));
        }

        // ----- репозитории -----

        findRepo(abs = this.user.cwd) {
            let cur = abs;
            for (;;) {
                if (this.repos.has(cur)) return this.repos.get(cur);
                if (cur === "/") return null;
                cur = cur.slice(0, cur.lastIndexOf("/")) || "/";
            }
        }

        needRepo() {
            const repo = this.findRepo();
            if (!repo) throw new GitError("fatal: not a git repository (or any of the parent directories): .git");
            return repo;
        }

        newRepo(rootPath, branch) {
            const repo = {
                root: rootPath,
                heads: {},
                tags: {},
                remoteRefs: {}, // "origin/main" -> hash
                head: { branch },
                index: new Map(),
                config: {},
                remotes: {},
                upstream: {},
                reflog: [],
                stash: [],
                state: null, // { kind: "merge" | "rebase" | "revert" | "cherry-pick", ... }
            };
            this.repos.set(rootPath, repo);
            return repo;
        }

        cfg(repo, key) {
            if (repo && key in repo.config) return repo.config[key];
            return this.user.config[key];
        }

        rel(repo, abs) {
            return abs === repo.root ? "" : abs.slice(repo.root.length + 1);
        }

        relFromCwd(repo, relPath) {
            // путь относительно текущей папки для вывода, как в git status
            const cwdRel = this.rel(repo, this.user.cwd);
            if (!cwdRel) return relPath;
            const from = cwdRel.split("/");
            const to = relPath.split("/");
            while (from.length && to.length && from[0] === to[0]) { from.shift(); to.shift(); }
            return [...from.map(() => ".."), ...to].join("/");
        }

        worktree(repo) {
            const map = new Map();
            const prefix = `${repo.root}/`;
            for (const [p, c] of this.files) {
                if (!p.startsWith(prefix)) continue;
                const rel = p.slice(prefix.length);
                if (rel === ".git" || rel.startsWith(".git/")) continue;
                // вложенный репозиторий не входит в рабочую папку внешнего
                let nested = false;
                for (const r of this.repos.keys()) if (r !== repo.root && p.startsWith(`${r}/`) && r.startsWith(prefix)) nested = true;
                if (!nested) map.set(rel, c);
            }
            return map;
        }

        headHash(repo) {
            if (repo.head.branch !== undefined) return repo.heads[repo.head.branch] ?? null;
            return repo.head.detached;
        }

        commitTree(hash) {
            return hash ? new Map(Object.entries(this.objects.get(hash).tree)) : new Map();
        }

        headTree(repo) {
            return this.commitTree(this.headHash(repo));
        }

        makeCommit(repo, parents, tree, message, extra = {}) {
            const name = this.cfg(repo, "user.name");
            const email = this.cfg(repo, "user.email");
            this.tick();
            this.counter += 1;
            const treeObj = Object.fromEntries([...tree.entries()].sort(([x], [y]) => (x < y ? -1 : 1)));
            const hash = hashHex(JSON.stringify([parents, treeObj, message, name, email, this.clock, this.counter]));
            const commit = { hash, parents, tree: Object.freeze(treeObj), message, author: { name, email }, time: this.clock, ...extra };
            this.objects.set(hash, commit);
            return commit;
        }

        log(repo, msg) {
            repo.reflog.unshift({ hash: this.headHash(repo), msg });
        }

        setHead(repo, hash, msg) {
            if (repo.head.branch !== undefined) repo.heads[repo.head.branch] = hash;
            else repo.head.detached = hash;
            if (msg) this.log(repo, msg);
        }

        ancestors(hash) {
            const seen = new Set();
            const stack = hash ? [hash] : [];
            while (stack.length) {
                const h = stack.pop();
                if (seen.has(h)) continue;
                seen.add(h);
                stack.push(...this.objects.get(h).parents);
            }
            return seen;
        }

        isAncestor(a, b) {
            return this.ancestors(b).has(a);
        }

        mergeBase(a, b) {
            const anc = this.ancestors(a);
            // ближайший общий предок: обход b в ширину
            const queue = [b];
            const seen = new Set();
            while (queue.length) {
                const h = queue.shift();
                if (seen.has(h)) continue;
                seen.add(h);
                if (anc.has(h)) return h;
                queue.push(...this.objects.get(h).parents);
            }
            return null;
        }

        resolve(repo, rev, quietFail = false) {
            const fail = () => {
                if (quietFail) return null;
                throw new GitError(`fatal: ambiguous argument '${rev}': unknown revision or path not in the working tree.\nUse '--' to separate paths from revisions, like this:\n'git <command> [<revision>...] -- [<file>...]'`);
            };
            const search = /^(?::\/([^~^]+)|(.+?)\^\{\/([^}]+)\})((?:[~^]\d*)*)$/.exec(rev);
            if (search) {
                const text = search[1] ?? search[3];
                const start = search[2] ? this.resolve(repo, search[2], quietFail) : this.headHash(repo);
                let found = null;
                try { found = start ? this.orderedCommits([start]).find((h) => new RegExp(text).test(this.objects.get(h).message)) : null; } catch { found = null; }
                if (!found) return fail();
                return search[4] ? this.resolve(repo, found + search[4], quietFail) : found;
            }
            const m = /^(.*?)((?:[~^]\d*)*)$/.exec(rev);
            let base = m[1];
            const suffix = m[2];
            let hash = null;
            const reflogM = /^(?:HEAD)?@\{(\d+)\}$/.exec(base);
            if (base === "HEAD" || base === "@") {
                hash = this.headHash(repo);
                if (!hash) return fail();
            } else if (reflogM) {
                hash = repo.reflog[Number(reflogM[1])]?.hash ?? null;
            } else if (base in repo.heads) hash = repo.heads[base];
            else if (base.startsWith("refs/heads/") && base.slice(11) in repo.heads) hash = repo.heads[base.slice(11)];
            else if (base in repo.tags) hash = repo.tags[base].hash;
            else if (base in repo.remoteRefs) hash = repo.remoteRefs[base];
            else if (base.startsWith("remotes/") && base.slice(8) in repo.remoteRefs) hash = repo.remoteRefs[base.slice(8)];
            else if (base in repo.remotes && `${base}/${this.remoteHead(repo, base)}` in repo.remoteRefs) hash = repo.remoteRefs[`${base}/${this.remoteHead(repo, base)}`];
            else if (/^[0-9a-f]{4,40}$/.test(base)) {
                const reach = new Set();
                const all = [...Object.values(repo.heads), ...Object.values(repo.remoteRefs), ...Object.values(repo.tags).map((t) => t.hash), ...repo.reflog.map((r) => r.hash), ...repo.stash.map((s) => s.base)];
                for (const h of all) if (h) for (const a of this.ancestors(h)) reach.add(a);
                const found = [...reach].filter((h) => h.startsWith(base));
                if (found.length === 1) hash = found[0];
                else if (found.length > 1) throw new GitError(`error: short object ID ${base} is ambiguous`);
            }
            if (!hash) return fail();
            for (const sm of suffix.matchAll(/([~^])(\d*)/g)) {
                const n = sm[2] === "" ? 1 : Number(sm[2]);
                if (sm[1] === "~") {
                    for (let k = 0; k < n; k += 1) {
                        hash = this.objects.get(hash).parents[0];
                        if (!hash) return fail();
                    }
                } else {
                    if (n === 0) continue;
                    hash = this.objects.get(hash).parents[n - 1];
                    if (!hash) return fail();
                }
            }
            return hash;
        }

        remoteHead(repo, remote) {
            const names = Object.keys(repo.remoteRefs).filter((r) => r.startsWith(`${remote}/`)).map((r) => r.slice(remote.length + 1));
            return names.includes("main") ? "main" : names.includes("master") ? "master" : names[0];
        }

        short(hash) {
            return hash.slice(0, 7);
        }

        subject(hash) {
            return this.objects.get(hash).message.split("\n")[0];
        }

        // ----- .gitignore -----

        ignoreRules(repo) {
            const rules = [];
            const wt = this.worktree(repo);
            for (const [rel, content] of wt) {
                if (rel !== ".gitignore" && !rel.endsWith("/.gitignore")) continue;
                const dir = rel.includes("/") ? rel.slice(0, rel.lastIndexOf("/")) : "";
                for (let line of lines(content)) {
                    line = line.replace(/\s+$/, "");
                    if (!line || line.startsWith("#")) continue;
                    let negate = false;
                    if (line.startsWith("!")) { negate = true; line = line.slice(1); }
                    let dirOnly = false;
                    if (line.endsWith("/")) { dirOnly = true; line = line.slice(0, -1); }
                    let anchored = line.includes("/");
                    if (line.startsWith("/")) line = line.slice(1);
                    if (line.startsWith("**/")) { anchored = false; line = line.slice(3); }
                    const body = globToRegex(line);
                    const prefix = dir ? `${dir.replace(/[.+^${}()|\\]/g, "\\$&")}/` : "";
                    const re = anchored ? new RegExp(`^${prefix}${body}$`) : new RegExp(`^${prefix}(?:.*/)?${body}$`);
                    rules.push({ re, negate, dirOnly });
                }
            }
            return rules;
        }

        isIgnored(repo, rel, rules = this.ignoreRules(repo)) {
            // файл игнорируется, если игнорируется он сам или любая папка над ним
            const parts = rel.split("/");
            for (let k = 1; k <= parts.length; k += 1) {
                const sub = parts.slice(0, k).join("/");
                const isDirPart = k < parts.length;
                let ignored = false;
                for (const r of rules) {
                    if (r.dirOnly && !isDirPart) continue;
                    if (r.re.test(sub)) ignored = !r.negate;
                }
                if (ignored) return true;
            }
            return false;
        }

        // ----- состояние для status -----

        changes(repo) {
            const head = this.headTree(repo);
            const wt = this.worktree(repo);
            const rules = this.ignoreRules(repo);
            const staged = [];
            const unstaged = [];
            const untracked = [];
            const unmerged = repo.state?.conflicts ? [...repo.state.conflicts].sort() : [];
            const paths = new Set([...head.keys(), ...repo.index.keys()]);
            for (const p of [...paths].sort()) {
                if (unmerged.includes(p)) continue;
                const h = head.get(p);
                const i = repo.index.get(p);
                if (h === undefined && i !== undefined) staged.push({ kind: "new file", path: p });
                else if (h !== undefined && i === undefined) staged.push({ kind: "deleted", path: p });
                else if (h !== i) staged.push({ kind: "modified", path: p });
            }
            // переименование: удалённый и новый файл с одинаковым содержимым
            for (const d of staged.filter((x) => x.kind === "deleted")) {
                const n = staged.find((x) => x.kind === "new file" && repo.index.get(x.path) === head.get(d.path));
                if (n) {
                    staged.splice(staged.indexOf(d), 1);
                    n.kind = "renamed";
                    n.from = d.path;
                }
            }
            for (const p of [...repo.index.keys()].sort()) {
                if (unmerged.includes(p)) continue;
                const w = wt.get(p);
                if (w === undefined) unstaged.push({ kind: "deleted", path: p });
                else if (w !== repo.index.get(p)) unstaged.push({ kind: "modified", path: p });
            }
            for (const p of [...wt.keys()].sort()) {
                if (!repo.index.has(p) && !unmerged.includes(p) && !this.isIgnored(repo, p, rules)) untracked.push(p);
            }
            for (const r of this.repos.keys()) {
                if (r !== repo.root && r.startsWith(`${repo.root}/`)) {
                    const rel = `${r.slice(repo.root.length + 1)}/`;
                    if (!this.isIgnored(repo, rel.slice(0, -1), rules)) untracked.push(rel);
                }
            }
            return { staged, unstaged, untracked, unmerged };
        }

        ignoredList(repo) {
            const rules = this.ignoreRules(repo);
            const shown = new Set();
            for (const p of [...this.worktree(repo).keys()].sort()) {
                if (repo.index.has(p) || !this.isIgnored(repo, p, rules)) continue;
                const parts = p.split("/");
                let label = p;
                for (let k = 1; k < parts.length; k += 1) {
                    const dir = parts.slice(0, k).join("/");
                    if (this.isIgnored(repo, `${dir}/x`, rules) && rules.some((r) => r.dirOnly && r.re.test(dir))) { label = `${dir}/`; break; }
                }
                shown.add(label);
            }
            return [...shown];
        }

        collapseUntracked(repo, untracked) {
            const tracked = [...repo.index.keys()];
            const shown = new Set();
            for (const p of untracked) {
                if (p.endsWith("/")) { shown.add(p); continue; }
                const parts = p.split("/");
                let label = p;
                for (let k = 1; k < parts.length; k += 1) {
                    const dir = parts.slice(0, k).join("/");
                    if (!tracked.some((t) => t.startsWith(`${dir}/`))) { label = `${dir}/`; break; }
                }
                shown.add(label);
            }
            return [...shown];
        }

        aheadBehind(repo, branch) {
            const up = repo.upstream[branch];
            if (!up) return null;
            const remoteRef = `${up.remote}/${up.merge}`;
            const local = repo.heads[branch];
            const remote = repo.remoteRefs[remoteRef];
            if (remote === undefined) return { ref: remoteRef, gone: true };
            const la = this.ancestors(local);
            const ra = this.ancestors(remote);
            let ahead = 0;
            let behind = 0;
            for (const h of la) if (!ra.has(h)) ahead += 1;
            for (const h of ra) if (!la.has(h)) behind += 1;
            return { ref: remoteRef, ahead, behind };
        }

        // ----- git -----

        git(args, words) {
            const repoOrNull = this.findRepo();
            // глобальные параметры
            if (args.length === 0) {
                return { code: 1, out: "usage: git [-v | --version] [-h | --help] [-C <path>] [-c <name>=<value>]\n           <command> [<args>]\n\nThese are common Git commands used in various situations:\n\nstart a working area\n   clone     Clone a repository into a new directory\n   init      Create an empty Git repository or reinitialize an existing one\n\nwork on the current change\n   add       Add file contents to the index\n   mv        Move or rename a file, a directory, or a symlink\n   restore   Restore working tree files\n   rm        Remove files from the working tree and from the index\n\nexamine the history and state\n   diff      Show changes between commits, commit and working tree, etc\n   log       Show commit logs\n   show      Show various types of objects\n   status    Show the working tree status\n\ngrow, mark and tweak your common history\n   branch    List, create, or delete branches\n   commit    Record changes to the repository\n   merge     Join two or more development histories together\n   rebase    Reapply commits on top of another base tip\n   reset     Reset current HEAD to the specified state\n   switch    Switch branches\n   tag       Create, list, delete or verify a tag object signed with GPG\n\ncollaborate\n   fetch     Download objects and refs from another repository\n   pull      Fetch from and integrate with another repository or a local branch\n   push      Update remote refs along with associated objects" };
            }
            const [sub, ...rest0] = args;
            const quiet = rest0.includes("-q") || rest0.includes("--quiet") || (sub === "commit" && rest0.some((a) => /^-[a-pr-z]*q[a-z]*$/.test(a) && a.length > 2));
            const rest = rest0.filter((a) => a !== "-q" && a !== "--quiet").map((a) => (sub === "commit" && /^-[a-z]+$/.test(a) && a.includes("q") ? a.replace("q", "") : a)).filter((a) => a !== "-");
            if (quiet && ["commit", "push", "pull", "fetch", "clone", "checkout", "switch", "merge", "init", "reset", "stash", "rm"].includes(sub)) {
                const r = this.git([sub, ...rest], words);
                return r.code === 0 ? { code: 0 } : r;
            }
            if (sub === "--version" || sub === "-v" || sub === "version") return { code: 0, stdout: `git version ${GIT_VERSION}\n` };
            if (sub === "--help" || sub === "help" || sub === "-h") return this.git([], words);
            const handlers = {
                init: () => this.gInit(rest),
                config: () => this.gConfig(rest, repoOrNull),
                clone: () => this.gClone(rest),
                status: () => this.gStatus(rest),
                add: () => this.gAdd(rest),
                commit: () => this.gCommit(rest),
                log: () => this.gLog(rest),
                show: () => this.gShow(rest),
                diff: () => this.gDiff(rest),
                restore: () => this.gRestore(rest),
                checkout: () => this.gCheckout(rest),
                switch: () => this.gSwitch(rest),
                branch: () => this.gBranch(rest),
                merge: () => this.gMerge(rest),
                rebase: () => this.gRebase(rest),
                "cherry-pick": () => this.gCherryPick(rest),
                reset: () => this.gReset(rest),
                revert: () => this.gRevert(rest),
                rm: () => this.gRm(rest),
                mv: () => this.gMv(rest),
                stash: () => this.gStash(rest),
                tag: () => this.gTag(rest),
                remote: () => this.gRemote(rest),
                push: () => this.gPush(rest),
                fetch: () => this.gFetch(rest),
                pull: () => this.gPull(rest),
                reflog: () => this.gReflog(rest),
                "check-ignore": () => {
                    const repo = this.needRepo();
                    const paths = rest.filter((a) => !a.startsWith("-"));
                    if (!paths.length) return { code: 128, out: "fatal: no path specified" };
                    const hits = paths.filter((p) => this.isIgnored(repo, this.rel(repo, this.abs(p))));
                    return { code: hits.length ? 0 : 1, stdout: hits.map((p) => `${p}\n`).join("") };
                },
                "ls-files": () => { const repo = this.needRepo(); return { code: 0, stdout: [...repo.index.keys()].sort().map((p) => `${this.relFromCwd(repo, p)}\n`).join("") }; },
            };
            if (handlers[sub]) return handlers[sub]();
            const alias = this.cfg(repoOrNull, `alias.${sub}`);
            if (alias) return this.git([...tokenize(alias).map((t) => t.v), ...rest], words);
            const known = Object.keys(handlers);
            const best = known.map((k) => [k, levenshtein(sub, k)]).sort((x, y) => x[1] - y[1])[0];
            let msg = `git: '${sub}' is not a git command. See 'git --help'.`;
            if (best && best[1] <= 2) msg += `\n\nThe most similar command is\n\t${best[0]}`;
            return { code: 1, out: msg };
        }

        gInit(args) {
            let branch = null;
            let dir = null;
            for (let i = 0; i < args.length; i += 1) {
                const a = args[i];
                if (a === "-b" || a === "--initial-branch") branch = args[++i];
                else if (a.startsWith("--initial-branch=")) branch = a.split("=")[1];
                else if (a === "-q" || a === "--quiet") continue;
                else if (!a.startsWith("-")) dir = a;
            }
            const rootPath = this.abs(dir ?? ".");
            if (!this.isDir(rootPath)) this.mkdirp(rootPath);
            if (this.repos.has(rootPath)) return { code: 0, stdout: `Reinitialized existing Git repository in ${rootPath}/.git/\n` };
            let hint = "";
            if (!branch) {
                branch = this.user.config["init.defaultBranch"];
                if (!branch) {
                    branch = "master";
                    hint = "hint: Using 'master' as the name for the initial branch. This default branch name\nhint: will change to \"main\" in Git 3.0. To configure the initial branch name\nhint: to use in all of your new repositories, which will suppress this warning,\nhint: call:\nhint:\nhint: \tgit config --global init.defaultBranch <name>\nhint:\nhint: Names commonly chosen instead of 'master' are 'main', 'trunk' and\nhint: 'development'. The just-created branch can be renamed via this command:\nhint:\nhint: \tgit branch -m <name>\nhint:\nhint: Disable this message with \"git config set advice.defaultBranchName false\"\n";
                }
            }
            this.newRepo(rootPath, branch);
            return { code: 0, out: hint.trimEnd(), stdout: `Initialized empty Git repository in ${rootPath}/.git/\n` };
        }

        gConfig(args, repo) {
            let scope = "local";
            const rest = [];
            let list = false;
            let unset = false;
            for (const a of args) {
                if (a === "--global") scope = "global";
                else if (a === "--local") scope = "local";
                else if (a === "--list" || a === "-l") list = true;
                else if (a === "--unset") unset = true;
                else if (a === "set" || a === "get") continue;
                else rest.push(a);
            }
            if (scope === "local" && !repo && (rest.length > 1 || unset)) throw new GitError("fatal: --local can only be used inside a git repository");
            const store = scope === "global" ? this.user.config : repo?.config;
            if (list) {
                const entries = scope === "global" || !repo ? Object.entries(this.user.config) : [...Object.entries(this.user.config), ...Object.entries(repo.config)];
                if (args.includes("--global") || !repo) return { code: 0, stdout: entries.map(([k, v]) => `${k}=${v}\n`).join("") };
                const local = Object.entries(repo.config).map(([k, v]) => `${k}=${v}\n`).join("");
                return { code: 0, stdout: entries.slice(0, Object.keys(this.user.config).length).map(([k, v]) => `${k}=${v}\n`).join("") + "core.repositoryformatversion=0\ncore.bare=false\n" + local };
            }
            const unknown = args.find((a) => a.startsWith("-") && !["--global", "--local", "--list", "-l", "--unset"].includes(a));
            if (unknown) return { code: 129, out: `error: unknown option \`${unknown.replace(/^-+/, "")}'\nusage: git config [<options>]` };
            const [key, ...valueParts0] = rest;
            const valueParts = valueParts0.slice(0, 1);
            if (!key) return { code: 129, out: "error: no action specified" };
            if (!/^[a-zA-Z][\w-]*(\.[\w-]+)+$/.test(key)) return { code: 1, out: `error: key does not contain a section: ${key}` };
            const lower = key.replace(/^([^.]+)\./, (m) => m.toLowerCase());
            if (unset) {
                if (!store || !(lower in store)) return { code: 5, out: "" };
                delete store[lower];
                return { code: 0 };
            }
            if (valueParts.length === 0) {
                const value = scope === "global" && args.includes("--global") ? this.user.config[lower] : this.cfg(repo, lower);
                return value === undefined ? { code: 1 } : { code: 0, stdout: `${value}\n` };
            }
            store[lower] = valueParts.join(" ");
            return { code: 0 };
        }

        gStatus(args) {
            const repo = this.needRepo();
            const short = args.includes("-s") || args.includes("--short");
            const ch = this.changes(repo);
            if (short) {
                const out = [];
                const map = new Map();
                for (const s of ch.staged) map.set(s.path, [s.kind === "new file" ? "A" : s.kind === "deleted" ? "D" : s.kind === "renamed" ? "R" : "M", " ", s.from]);
                for (const u of ch.unstaged) {
                    const e = map.get(u.path) ?? [" ", " ", null];
                    e[1] = u.kind === "deleted" ? "D" : "M";
                    map.set(u.path, e);
                }
                for (const p of ch.unmerged) out.push(`UU ${this.relFromCwd(repo, p)}`);
                for (const [p, e] of [...map].sort(([x], [y]) => (x < y ? -1 : 1))) out.push(`${e[0]}${e[1]} ${e[2] ? `${this.relFromCwd(repo, e[2])} -> ` : ""}${this.relFromCwd(repo, p)}`);
                for (const p of this.collapseUntracked(repo, ch.untracked)) out.push(`?? ${this.relFromCwd(repo, p)}`);
                return { code: 0, stdout: out.length ? `${out.join("\n")}\n` : "" };
            }
            const out = [];
            if (repo.head.branch !== undefined) out.push(`On branch ${repo.head.branch}`);
            else out.push(`HEAD detached at ${this.short(repo.head.detached)}`);
            if (repo.state?.kind === "rebase") out.push(`You are currently rebasing branch '${repo.state.branch}' on '${this.short(repo.state.onto)}'.\n  (fix conflicts and then run "git rebase --continue")\n  (use "git rebase --skip" to skip this patch)\n  (use "git rebase --abort" to check out the original branch)`);
            const ab = repo.head.branch !== undefined ? this.aheadBehind(repo, repo.head.branch) : null;
            if (ab && repo.state?.kind !== "rebase") {
                if (ab.gone) out.push(`Your branch is based on '${ab.ref}', but the upstream is gone.\n  (use "git branch --unset-upstream" to fixup)`);
                else if (ab.ahead && ab.behind) out.push(`Your branch and '${ab.ref}' have diverged,\nand have ${ab.ahead} and ${ab.behind} different commits each, respectively.\n  (use "git pull" if you want to integrate the remote branch with yours)`);
                else if (ab.ahead) out.push(`Your branch is ahead of '${ab.ref}' by ${plural(ab.ahead, "commit")}.\n  (use "git push" to publish your local commits)`);
                else if (ab.behind) out.push(`Your branch is behind '${ab.ref}' by ${plural(ab.behind, "commit")}, and can be fast-forwarded.\n  (use "git pull" to update your local branch)`);
                else out.push(`Your branch is up to date with '${ab.ref}'.`);
            }
            const noCommits = !this.headHash(repo);
            if (noCommits) out.push("", "No commits yet");
            if (repo.state?.kind === "merge" || repo.state?.kind === "revert" || repo.state?.kind === "cherry-pick") {
                if (ch.unmerged.length) {
                    const what = repo.state.kind === "merge" ? "You have unmerged paths.\n  (fix conflicts and run \"git commit\")\n  (use \"git merge --abort\" to abort the merge)" : `You are currently ${repo.state.kind === "revert" ? "reverting" : "cherry-picking"} commit ${this.short(repo.state.commit)}.\n  (fix conflicts and run "git ${repo.state.kind} --continue")\n  (use "git ${repo.state.kind} --abort" to cancel the operation)`;
                    out.push(what);
                } else out.push("All conflicts fixed but you are still merging.\n  (use \"git commit\" to conclude merge)");
            }
            const fmt = (kind, p) => `\t${`${kind}:`.padEnd(12)}${this.relFromCwd(repo, p)}`;
            if (ch.staged.length) {
                out.push("", "Changes to be committed:");
                if (!repo.state) out.push(noCommits ? "  (use \"git rm --cached <file>...\" to unstage)" : "  (use \"git restore --staged <file>...\" to unstage)");
                for (const s of ch.staged) out.push(s.kind === "renamed" ? `${fmt("renamed", s.from)} -> ${this.relFromCwd(repo, s.path)}` : fmt(s.kind, s.path));
            }
            if (ch.unmerged.length) {
                out.push("", "Unmerged paths:", "  (use \"git add <file>...\" to mark resolution)");
                for (const p of ch.unmerged) out.push(`\t${"both modified:".padEnd(17)}${this.relFromCwd(repo, p)}`);
            }
            if (ch.unstaged.length) {
                out.push("", "Changes not staged for commit:", "  (use \"git add" + (ch.unstaged.some((u) => u.kind === "deleted") ? "/rm" : "") + " <file>...\" to update what will be committed)", "  (use \"git restore <file>...\" to discard changes in working directory)");
                for (const u of ch.unstaged) out.push(fmt(u.kind, u.path));
            }
            const untracked = this.collapseUntracked(repo, ch.untracked);
            if (untracked.length) {
                out.push("", "Untracked files:", "  (use \"git add <file>...\" to include in what will be committed)");
                for (const p of untracked) out.push(`\t${this.relFromCwd(repo, p)}`);
            }
            if (args.includes("--ignored")) {
                const ign = this.ignoredList(repo);
                if (ign.length) {
                    out.push("", "Ignored files:", "  (use \"git add -f <file>...\" to include in what will be committed)");
                    for (const p of ign) out.push(`\t${this.relFromCwd(repo, p)}`);
                }
            }
            out.push("");
            if (!ch.staged.length && !ch.unmerged.length) {
                if (ch.unstaged.length) out.push("no changes added to commit (use \"git add\" and/or \"git commit -a\")");
                else if (untracked.length) out.push("nothing added to commit but untracked files present (use \"git add\" to track)");
                else if (noCommits) out.push("nothing to commit (create/copy files and use \"git add\" to track)");
                else if (!repo.state) out.push("nothing to commit, working tree clean");
                else out.pop();
            } else if (ch.unmerged.length && !ch.staged.length) out.push("no changes added to commit (use \"git add\" and/or \"git commit -a\")");
            else out.pop();
            // как в Git: после строки «On branch ...» без сведений об upstream пустой строки нет
            if (out[1] === "" && out[2] !== "No commits yet") out.splice(1, 1);
            return { code: 0, stdout: `${out.join("\n")}\n` };
        }

        // Превращает аргументы-пути в список относительных путей репозитория.
        pathspec(repo, specs, candidates) {
            const result = new Set();
            const missing = [];
            for (const spec of specs) {
                const abs = this.abs(spec);
                if (abs !== repo.root && !abs.startsWith(`${repo.root}/`)) throw new GitError(`fatal: ${spec}: '${spec}' is outside repository at '${repo.root}'`);
                const rel = this.rel(repo, abs);
                let matched = false;
                for (const c of candidates) {
                    const hit = hasGlob(spec)
                        ? new RegExp(`^${globToRegex(rel)}$`).test(c) || new RegExp(`^${globToRegex(rel)}/`).test(c)
                        : rel === "" || c === rel || c.startsWith(`${rel}/`);
                    if (hit) { result.add(c); matched = true; }
                }
                if (!matched) missing.push(spec);
            }
            return { paths: [...result].sort(), missing };
        }

        gAdd(args) {
            const repo = this.needRepo();
            if (args.includes("-i") || args.includes("-p") || args.includes("--patch")) return { code: 1, out: this.notes.interactive };
            const force = args.includes("-f") || args.includes("--force");
            const all = args.includes("-A") || args.includes("--all");
            let specs = args.filter((a) => !a.startsWith("-") || a === "-");
            if (all && specs.length === 0) specs = [repo.root];
            if (specs.length === 0) return { code: 0, out: "Nothing specified, nothing added.\nhint: Maybe you wanted to say 'git add .'?\nhint: Disable this message with \"git config set advice.addEmptyPathspec false\"" };
            const wt = this.worktree(repo);
            const rules = this.ignoreRules(repo);
            const candidates = new Set([...wt.keys(), ...repo.index.keys()]);
            const { paths, missing } = this.pathspec(repo, specs, candidates);
            const ignoredHits = [];
            for (const spec of missing) {
                const rel = this.rel(repo, this.abs(spec));
                if (this.isDir(this.abs(spec))) continue;
                if (!force && wt.has(rel) && this.isIgnored(repo, rel, rules)) ignoredHits.push(rel);
                else throw new GitError(`fatal: pathspec '${spec}' did not match any files`);
            }
            const explicitIgnored = [];
            for (const p of paths) {
                const inWt = wt.has(p);
                if (!inWt) {
                    repo.index.delete(p);
                    continue;
                }
                if (!repo.index.has(p) && !force && this.isIgnored(repo, p, rules)) {
                    if (specs.some((s) => this.rel(repo, this.abs(s)) === p)) explicitIgnored.push(p);
                    continue;
                }
                repo.index.set(p, wt.get(p));
                if (repo.state?.conflicts) repo.state.conflicts.delete(p);
            }
            if (repo.state?.kind === "stash" && repo.state.conflicts.size === 0) repo.state = null;
            const ign = [...ignoredHits, ...explicitIgnored];
            if (ign.length) {
                return { code: 1, out: `The following paths are ignored by one of your .gitignore files:\n${ign.join("\n")}\nhint: Use -f if you really want to add them.\nhint: Disable this message with "git config set advice.addIgnoredFile false"` };
            }
            return { code: 0 };
        }

        statLine(oldTree, newTree) {
            const renames = [];
            const oldT = new Map(oldTree);
            const newT = new Map(newTree);
            for (const [p, c] of oldTree) {
                if (newTree.has(p)) continue;
                const to = [...newTree].find(([q, d]) => !oldTree.has(q) && d === c && !renames.some((r) => r[1] === q));
                if (to) { renames.push([p, to[0]]); oldT.delete(p); newT.delete(to[0]); }
            }
            oldTree = oldT;
            newTree = newT;
            const paths = new Set([...oldTree.keys(), ...newTree.keys()]);
            let files = 0;
            let ins = 0;
            let del = 0;
            const creates = [];
            const deletes = [];
            const rows = [];
            for (const p of [...paths].sort()) {
                const a = oldTree.get(p);
                const b = newTree.get(p);
                if (a === b) continue;
                files += 1;
                const c = countChanges(a ?? "", b ?? "");
                ins += c.ins;
                del += c.del;
                rows.push({ p, n: c.ins + c.del, c });
                if (a === undefined) creates.push(p);
                if (b === undefined) deletes.push(p);
            }
            files += renames.length;
            for (const [a, b] of renames) rows.push({ p: `${a} => ${b}`, n: 0, c: { ins: 0, del: 0 } });
            let summary = ` ${plural(files, "file")} changed`;
            if (ins || !del) summary += `, ${ins} insertion${ins === 1 ? "" : "s"}(+)`;
            if (del || !ins) summary += `, ${del} deletion${del === 1 ? "" : "s"}(-)`;
            return { files, summary, creates, deletes, rows, renames };
        }

        statBlock(oldTree, newTree, rowsShown = true) {
            const st = this.statLine(oldTree, newTree);
            const width = Math.max(0, ...st.rows.map((r) => r.p.length));
            const nw = Math.max(1, ...st.rows.map((r) => String(r.n).length));
            const out = rowsShown ? st.rows.map((r) => ` ${r.p.padEnd(width)} | ${String(r.n).padStart(nw)} ${"+".repeat(Math.min(r.c.ins, 40))}${"-".repeat(Math.min(r.c.del, 40))}`) : [];
            out.push(st.summary);
            for (const p of st.creates) out.push(` create mode 100644 ${p}`);
            for (const p of st.deletes) out.push(` delete mode 100644 ${p}`);
            for (const [a, b] of st.renames) out.push(` rename ${a} => ${b} (100%)`);
            return out.join("\n");
        }

        gCommit(args) {
            const repo = this.needRepo();
            const messages = [];
            let all = false;
            let amend = false;
            let noEdit = false;
            let allowEmpty = false;
            for (let i = 0; i < args.length; i += 1) {
                const a = args[i];
                if (a === "-m" || a === "--message") {
                    if (args[i + 1] === undefined) return { code: 129, out: "error: switch `m' requires a value" };
                    messages.push(args[++i]);
                } else if (/^-[a-zA-Z]*m$/.test(a) && a.length > 2) {
                    if (a.includes("a")) all = true;
                    messages.push(args[++i]);
                } else if (a.startsWith("--message=")) messages.push(a.slice(10));
                else if (a === "-a" || a === "--all") all = true;
                else if (a === "--amend") amend = true;
                else if (a === "--no-edit") noEdit = true;
                else if (a === "--allow-empty") allowEmpty = true;
                else if (a === "-q" || a === "--quiet") continue;
                else if (!a.startsWith("-")) {
                    const extra = args.slice(i).filter((x) => !x.startsWith("-"));
                    return { code: 1, out: extra.map((x) => `error: pathspec '${x}' did not match any file(s) known to git`).join("\n") };
                }
                else return { code: 129, out: `error: unknown option '${a.replace(/^-+/, "")}'` };
            }
            if (!this.cfg(repo, "user.name") || !this.cfg(repo, "user.email")) {
                return { code: 128, out: `Author identity unknown\n\n*** Please tell me who you are.\n\nRun\n\n  git config --global user.email "you@example.com"\n  git config --global user.name "Your Name"\n\nto set your account's default identity.\nOmit --global to set the identity only in this repository.\n\nfatal: unable to auto-detect email address (got '${this.user.login}@jlearn.(none)')` };
            }
            if (repo.state?.conflicts?.size) {
                return { code: 128, out: "error: Committing is not possible because you have unmerged files.\nhint: Fix them up in the work tree, and then use 'git add/rm <file>'\nhint: as appropriate to mark resolution and make a commit.\nfatal: Exiting because of an unresolved conflict." };
            }
            if (repo.state?.kind === "rebase") return { code: 128, out: "fatal: You are in the middle of a rebase.\nhint: Use \"git rebase --continue\" after resolving conflicts." };
            if (all) {
                const wt = this.worktree(repo);
                for (const p of [...repo.index.keys()]) {
                    if (wt.has(p)) repo.index.set(p, wt.get(p));
                    else repo.index.delete(p);
                }
            }
            const parentHash = this.headHash(repo);
            const headCommit = parentHash ? this.objects.get(parentHash) : null;
            let message = messages.join("\n\n");
            if (amend && !headCommit) return { code: 128, out: "fatal: You have nothing to amend." };
            if (!message && amend && noEdit) message = headCommit.message;
            if (!message && repo.state) message = repo.state.message;
            if (!message && amend) message = headCommit.message;
            if (!message && messages.length) return { code: 1, out: "Aborting commit due to empty commit message." };
            if (!message) return { code: 1, out: this.notes.commitEditor };
            const baseTree = amend ? this.commitTree(headCommit.parents[0]) : this.headTree(repo);
            const same = (x, y) => x.size === y.size && [...x].every(([k, v]) => y.get(k) === v);
            if (!amend && !repo.state && !allowEmpty && same(repo.index, this.headTree(repo))) {
                const st = this.gStatus([]).stdout.replace(/\n$/, "").replace("\nNo commits yet\n", "\nInitial commit\n");
                return { code: 1, stdout: `${st}\n` };
            }
            let parents;
            if (amend) parents = headCommit.parents;
            else if (repo.state?.kind === "merge") parents = [parentHash, repo.state.theirs];
            else parents = parentHash ? [parentHash] : [];
            const commit = this.makeCommit(repo, parents, new Map(repo.index), message);
            const wasMerge = repo.state?.kind === "merge" && !amend;
            const kind = amend ? "commit (amend)" : wasMerge ? "commit (merge)" : parents.length === 0 ? "commit (initial)" : "commit";
            this.setHead(repo, commit.hash, `${kind}: ${message.split("\n")[0]}`);
            repo.state = null;
            const where = repo.head.branch !== undefined ? repo.head.branch : "detached HEAD";
            const head = `[${where}${parents.length === 0 ? " (root-commit)" : ""} ${this.short(commit.hash)}] ${message.split("\n")[0]}`;
            const extra = amend ? `\n Date: ${formatDate(headCommit.time)}` : "";
            if (wasMerge) return { code: 0, stdout: `${head}\n` };
            return { code: 0, stdout: `${head}${extra}\n${this.statBlock(baseTree, new Map(repo.index), false)}\n` };
        }

        decorations(repo) {
            const map = new Map();
            const add = (h, label) => {
                if (!h) return;
                if (!map.has(h)) map.set(h, []);
                map.get(h).push(label);
            };
            const headHash = this.headHash(repo);
            if (repo.head.branch !== undefined) add(headHash, `HEAD -> ${repo.head.branch}`);
            else add(headHash, "HEAD");
            for (const [t, v] of Object.entries(repo.tags).sort()) add(v.hash, `tag: ${t}`);
            for (const [r, h] of Object.entries(repo.remoteRefs).sort()) add(h, r);
            for (const [b, h] of Object.entries(repo.heads).sort()) if (b !== repo.head.branch) add(h, b);
            return map;
        }

        orderedCommits(starts) {
            const all = new Set();
            for (const s of starts) for (const h of this.ancestors(s)) all.add(h);
            // по времени, новые сверху; родитель всегда ниже потомка
            return [...all].sort((x, y) => this.objects.get(y).time - this.objects.get(x).time || (this.objects.get(y).hash < this.objects.get(x).hash ? -1 : 1));
        }

        gLog(args) {
            const repo = this.needRepo();
            let oneline = false;
            let graph = false;
            let all = false;
            let limit = Infinity;
            let stat = false;
            let patch = false;
            const revs = [];
            let paths = [];
            for (let i = 0; i < args.length; i += 1) {
                const a = args[i];
                if (a === "--oneline") oneline = true;
                else if (a === "--graph") graph = true;
                else if (a === "--all") all = true;
                else if (a === "--decorate") continue;
                else if (a === "--stat") stat = true;
                else if (a === "-p" || a === "--patch") patch = true;
                else if (a === "-n" || a === "--max-count") {
                    const v = args[++i];
                    if (v === undefined) return { code: 129, out: "error: switch `n' requires a value" };
                    if (!/^\d+$/.test(v)) return { code: 128, out: `fatal: '${v}': not a non-negative integer` };
                    limit = Number(v);
                }
                else if (/^-\d+\D/.test(a)) return { code: 128, out: `fatal: '${a.slice(1)}': not a non-negative integer` };
                else if (/^-\d+$/.test(a)) limit = Number(a.slice(1));
                else if (a.startsWith("--max-count=")) limit = Number(a.split("=")[1]);
                else if (a.startsWith("--pretty=oneline") || a === "--format=oneline") oneline = true;
                else if (a === "--") { paths = args.slice(i + 1); break; }
                else if (a.startsWith("-")) return { code: 128, out: `fatal: unrecognized argument: ${a}` };
                else revs.push(a);
            }
            const headHash = this.headHash(repo);
            if (!headHash && !all && revs.length === 0) {
                return { code: 128, out: `fatal: your current branch '${repo.head.branch}' does not have any commits yet` };
            }
            let starts = [];
            let exclude = new Set();
            if (all) starts = [...Object.values(repo.heads), ...Object.values(repo.remoteRefs), ...Object.values(repo.tags).map((t) => t.hash), headHash].filter(Boolean);
            for (const r of revs) {
                const range = /^(.*)\.\.(.*)$/.exec(r);
                if (range) {
                    exclude = this.ancestors(this.resolve(repo, range[1] || "HEAD"));
                    starts.push(this.resolve(repo, range[2] || "HEAD"));
                } else {
                    const h = this.resolve(repo, r, true);
                    if (h) starts.push(h);
                    else if (this.worktree(repo).has(this.rel(repo, this.abs(r))) || this.headTree(repo).has(this.rel(repo, this.abs(r)))) paths.push(r);
                    else this.resolve(repo, r);
                }
            }
            if (!all && starts.length === 0) starts = [headHash];
            let commits = this.orderedCommits(starts).filter((h) => !exclude.has(h));
            if (paths.length) {
                const rels = paths.map((p) => this.rel(repo, this.abs(p)));
                commits = commits.filter((h) => {
                    const c = this.objects.get(h);
                    const parent = this.commitTree(c.parents[0]);
                    return rels.some((r) => [...new Set([...Object.keys(c.tree), ...parent.keys()])].some((p) => (p === r || p.startsWith(`${r}/`)) && c.tree[p] !== parent.get(p)));
                });
            }
            if (graph) commits = this.topoOrder(commits);
            commits = commits.slice(0, limit);
            const deco = this.decorations(repo);
            const decoStr = (h) => (deco.has(h) ? ` (${deco.get(h).join(", ")})` : "");
            const out = [];
            const graphPrefixes = graph ? this.graphLines(commits) : null;
            commits.forEach((h, k) => {
                const c = this.objects.get(h);
                const pre = graph ? graphPrefixes[k] : { star: "", after: [], cont: "" };
                if (oneline) {
                    out.push(`${pre.star}${this.short(h)}${decoStr(h)} ${c.message.split("\n")[0]}`);
                    if (stat || patch) {
                        const parent = this.commitTree(c.parents[0]);
                        const cur = this.commitTree(h);
                        if (stat) for (const l of this.statBlock(parent, cur).split("\n").filter((x) => !x.startsWith(" create") && !x.startsWith(" delete"))) out.push(l);
                        if (patch) out.push(this.diffTrees(parent, cur));
                        if (k < commits.length - 1) out.push("");
                    }
                } else {
                    const ind = graph ? pre.cont : "";
                    out.push(`${pre.star}commit ${h}${decoStr(h)}`);
                    if (c.parents.length > 1) out.push(`${ind}Merge: ${c.parents.map((p) => this.short(p)).join(" ")}`);
                    out.push(`${ind}Author: ${c.author.name} <${c.author.email}>`, `${ind}Date:   ${formatDate(c.time)}`, ind.trimEnd());
                    for (const l of c.message.split("\n")) out.push(`${ind}    ${l}`.trimEnd());
                    if (stat || patch) {
                        const parent = this.commitTree(c.parents[0]);
                        const cur = this.commitTree(h);
                        out.push(ind.trimEnd());
                        if (stat) for (const l of this.statBlock(parent, cur).split("\n").filter((x) => !x.startsWith(" create") && !x.startsWith(" delete"))) out.push(`${ind}${l}`);
                        if (patch) out.push(this.diffTrees(parent, cur));
                    }
                    if (k < commits.length - 1) out.push(ind.trimEnd());
                }
                for (const l of pre.after) out.push(l);
            });
            return { code: 0, stdout: `${out.join("\n")}\n` };
        }

        topoOrder(commits) {
            // как git --topo-order: потомки раньше предков, ветка второго родителя показывается первой
            const set = new Set(commits);
            const children = new Map(commits.map((h) => [h, 0]));
            for (const h of commits) for (const p of this.objects.get(h).parents) if (set.has(p)) children.set(p, children.get(p) + 1);
            const stack = commits.filter((h) => children.get(h) === 0).reverse();
            const out = [];
            while (stack.length) {
                const h = stack.pop();
                out.push(h);
                for (const p of this.objects.get(h).parents) {
                    if (!set.has(p)) continue;
                    children.set(p, children.get(p) - 1);
                    if (children.get(p) === 0) stack.push(p);
                }
            }
            return out;
        }

        graphLines(commits) {
            // простой построитель графа: столбцы ожидаемых коммитов
            let cols = [];
            const result = [];
            for (const h of commits) {
                let col = cols.indexOf(h);
                if (col < 0) { cols.push(h); col = cols.length - 1; }
                const isMerge = this.objects.get(h).parents.length > 1;
                const star = cols.map((_, k) => (k === col ? "*" : "|")).join(" ") + (isMerge ? "   " : " ");
                const cont = cols.map(() => "|").join(" ") + " ";
                const after = [];
                const parents = this.objects.get(h).parents;
                // слияние нескольких столбцов в этот коммит
                const dupes = cols.map((x, k) => (x === h && k !== col ? k : -1)).filter((k) => k >= 0);
                if (parents.length === 0) {
                    cols.splice(col, 1);
                } else {
                    cols[col] = parents[0];
                    if (parents.length > 1) {
                        const p2 = parents[1];
                        if (!cols.includes(p2)) {
                            cols.splice(col + 1, 0, p2);
                            after.push(cols.map((_, k) => (k === col + 1 ? "\\" : "|")).slice(0, cols.length).join(" ").replace(/\| \\$/, "|\\").replace(/ \\/, "\\"));
                        }
                    }
                }
                for (const d of dupes.reverse()) {
                    cols.splice(d, 1);
                    after.push(`${cols.map(() => "|").join(" ")}/`.replace(/\| \/$/, "|/"));
                }
                // если родитель уже ведётся в другом столбце - сливаем
                const first = cols.indexOf(parents[0]);
                const last = cols.lastIndexOf(parents[0]);
                if (parents.length && first !== last) {
                    cols.splice(last, 1);
                    after.push(`${"| ".repeat(Math.max(0, cols.length - 1))}|/`);
                }
                result.push({ star, cont, after: after.map((l) => l.trimEnd()) });
            }
            return result;
        }

        diffTrees(a, b, onlyPaths = null) {
            const paths = [...new Set([...a.keys(), ...b.keys()])].sort();
            const out = [];
            for (const p of paths) {
                if (onlyPaths && !onlyPaths.some((r) => r === "" || p === r || p.startsWith(`${r}/`))) continue;
                const x = a.has(p) ? a.get(p) : null;
                const y = b.has(p) ? b.get(p) : null;
                if (x === y) continue;
                out.push(unifiedDiff(p, x, y));
            }
            return out.join("\n");
        }

        gShow(args) {
            const repo = this.needRepo();
            const target = args.find((a) => !a.startsWith("-")) ?? "HEAD";
            const colon = target.startsWith(":/") ? null : /^((?:[^:{]|\{[^}]*\})*):(.+)$/.exec(target);
            if (colon) {
                const h = this.resolve(repo, colon[1] || "HEAD");
                const tree = this.objects.get(h).tree;
                const rel = colon[2].replace(/^\.\//, "");
                if (!(rel in tree)) return { code: 128, out: `fatal: path '${rel}' does not exist in '${colon[1] || "HEAD"}'` };
                return { code: 0, stdout: tree[rel] };
            }
            const h = this.resolve(repo, target);
            const c = this.objects.get(h);
            const out = [];
            const tag = Object.entries(repo.tags).find(([t, v]) => t === target && v.message);
            if (tag) out.push(`tag ${tag[0]}`, `Tagger: ${tag[1].tagger.name} <${tag[1].tagger.email}>`, `Date:   ${formatDate(tag[1].time)}`, "", tag[1].message, "");
            const deco = this.decorations(repo);
            out.push(`commit ${h}${deco.has(h) ? ` (${deco.get(h).join(", ")})` : ""}`);
            if (c.parents.length > 1) out.push(`Merge: ${c.parents.map((p) => this.short(p)).join(" ")}`);
            out.push(`Author: ${c.author.name} <${c.author.email}>`, `Date:   ${formatDate(c.time)}`, "");
            for (const l of c.message.split("\n")) out.push(`    ${l}`.trimEnd());
            if (c.parents.length <= 1) {
                const parent = this.commitTree(c.parents[0]);
                if (args.includes("--stat")) out.push("", ...this.statBlock(parent, this.commitTree(h)).split("\n").filter((x) => !x.startsWith(" create") && !x.startsWith(" delete")));
                else if (!args.includes("-s") && !args.includes("--no-patch")) {
                    const d = this.diffTrees(parent, this.commitTree(h));
                    if (d) out.push("", d);
                }
            }
            return { code: 0, stdout: `${out.join("\n")}\n` };
        }

        gDiff(args) {
            const repo = this.needRepo();
            let staged = false;
            let stat = false;
            let nameOnly = false;
            const revs = [];
            let paths = null;
            for (let i = 0; i < args.length; i += 1) {
                const a = args[i];
                if (a === "--staged" || a === "--cached") staged = true;
                else if (a === "--stat") stat = true;
                else if (a === "--name-only") nameOnly = true;
                else if (a === "--") { paths = args.slice(i + 1); break; }
                else if (a.startsWith("-")) continue;
                else revs.push(a);
            }
            // аргумент может быть путём
            const realRevs = [];
            for (const r of revs) {
                const range = /^(.+?)\.\.\.?(.+)$/.exec(r);
                if (range) { realRevs.push(range[1], range[2]); continue; }
                if (this.resolve(repo, r, true)) realRevs.push(r);
                else {
                    const rel = this.rel(repo, this.abs(r));
                    if (this.worktree(repo).has(rel) || repo.index.has(rel) || this.isDir(this.abs(r))) (paths ??= []).push(r);
                    else this.resolve(repo, r);
                }
            }
            let a;
            let b;
            if (realRevs.length >= 2) { a = this.commitTree(this.resolve(repo, realRevs[0])); b = this.commitTree(this.resolve(repo, realRevs[1])); }
            else if (realRevs.length === 1) { a = this.commitTree(this.resolve(repo, realRevs[0])); b = staged ? new Map(repo.index) : this.worktreeTracked(repo); }
            else if (staged) { a = this.headTree(repo); b = new Map(repo.index); }
            else { a = new Map(repo.index); b = this.worktreeTracked(repo, true); }
            const rels = paths ? paths.map((p) => this.rel(repo, this.abs(p))) : null;
            const filter = (m) => (rels ? new Map([...m].filter(([p]) => rels.some((r) => r === "" || p === r || p.startsWith(`${r}/`)))) : m);
            a = filter(a);
            b = filter(b);
            if (nameOnly) return { code: 0, stdout: [...new Set([...a.keys(), ...b.keys()])].sort().filter((p) => a.get(p) !== b.get(p)).map((p) => `${p}\n`).join("") };
            if (stat) {
                const st = this.statLine(a, b);
                if (!st.files) return { code: 0 };
                return { code: 0, stdout: `${this.statBlock(a, b).split("\n").filter((x) => !x.startsWith(" create") && !x.startsWith(" delete")).join("\n")}\n` };
            }
            const d = this.diffTrees(a, b);
            return { code: 0, stdout: d ? `${d}\n` : "" };
        }

        // рабочая папка, но только по отслеживаемым файлам (для git diff)
        worktreeTracked(repo, keepIndexForMissing = false) {
            const wt = this.worktree(repo);
            const m = new Map();
            for (const p of repo.index.keys()) {
                if (wt.has(p)) m.set(p, wt.get(p));
                else if (!keepIndexForMissing) continue;
            }
            for (const p of this.headTree(repo).keys()) if (!m.has(p) && wt.has(p) && !keepIndexForMissing) m.set(p, wt.get(p));
            return m;
        }

        writeWorktreeFile(repo, rel, content) {
            const abs = `${repo.root}/${rel}`;
            this.mkdirp(abs.slice(0, abs.lastIndexOf("/")));
            this.files.set(abs, content);
        }

        deleteWorktreeFile(repo, rel) {
            this.files.delete(`${repo.root}/${rel}`);
        }

        gRestore(args) {
            const repo = this.needRepo();
            let staged = false;
            let worktree = false;
            let source = null;
            const specs = [];
            for (let i = 0; i < args.length; i += 1) {
                const a = args[i];
                if (a === "--staged" || a === "-S") staged = true;
                else if (a === "--worktree" || a === "-W") worktree = true;
                else if (a === "-s" || a === "--source") source = args[++i];
                else if (a.startsWith("--source=")) source = a.slice(9);
                else if (a === "--") continue;
                else if (a === "-p" || a === "--patch") return { code: 1, out: this.notes.interactive };
                else if (a.startsWith("-")) return { code: 129, out: `error: unknown option \`${a.replace(/^-+/, "")}'\nusage: git restore [<options>] [--source=<branch>] <file>...` };
                else specs.push(a);
            }
            if (!staged) worktree = true;
            if (specs.length === 0) return { code: 128, out: "fatal: you must specify path(s) to restore" };
            const srcTree = source ? this.commitTree(this.resolve(repo, source)) : null;
            const headTree = this.headTree(repo);
            const wt = this.worktree(repo);
            void wt;
            const candidates = new Set([...repo.index.keys(), ...headTree.keys(), ...(srcTree ? srcTree.keys() : [])]);
            const { paths, missing } = this.pathspec(repo, specs, candidates);
            if (missing.length) return { code: 1, out: `error: pathspec '${missing[0]}' did not match any file(s) known to git` };
            for (const p of paths) {
                if (staged) {
                    const from = srcTree ?? headTree;
                    if (from.has(p)) repo.index.set(p, from.get(p));
                    else repo.index.delete(p);
                }
                if (worktree) {
                    const from = srcTree ?? (staged ? headTree : repo.index);
                    if (from.has(p)) this.writeWorktreeFile(repo, p, from.get(p));
                    else if (repo.index.has(p) || headTree.has(p) || srcTree) this.deleteWorktreeFile(repo, p);
                }
            }
            return { code: 0 };
        }

        // Переход рабочей папки и индекса с одного дерева на другое с сохранением незакоммиченных правок.
        moveTree(repo, toHash, verb) {
            const from = this.headTree(repo);
            const to = this.commitTree(toHash);
            const wt = this.worktree(repo);
            const blocked = [];
            for (const p of new Set([...from.keys(), ...to.keys()])) {
                if (from.get(p) === to.get(p)) continue;
                const dirty = repo.index.get(p) !== from.get(p) || (wt.has(p) ? wt.get(p) : undefined) !== repo.index.get(p);
                if (dirty) blocked.push(p);
            }
            const untrackedHit = [...to.keys()].filter((p) => !from.has(p) && !repo.index.has(p) && wt.has(p) && wt.get(p) !== to.get(p));
            if (blocked.length) throw new GitError(`error: Your local changes to the following files would be overwritten by ${verb}:\n${blocked.map((p) => `\t${p}`).join("\n")}\nPlease commit your changes or stash them before you ${verb === "checkout" ? "switch branches" : verb}.\nAborting`, 1);
            if (untrackedHit.length) throw new GitError(`error: The following untracked working tree files would be overwritten by ${verb}:\n${untrackedHit.map((p) => `\t${p}`).join("\n")}\nPlease move or remove them before you ${verb === "checkout" ? "switch branches" : verb}.\nAborting`, 1);
            for (const p of new Set([...from.keys(), ...to.keys()])) {
                if (from.get(p) === to.get(p)) continue;
                if (to.has(p)) { this.writeWorktreeFile(repo, p, to.get(p)); repo.index.set(p, to.get(p)); } else { this.deleteWorktreeFile(repo, p); repo.index.delete(p); }
            }
            this.cleanEmptyDirs(repo);
        }

        cleanEmptyDirs(repo) {
            // удаляем папки, в которых не осталось файлов (git не хранит пустые папки)
            const dirs = [...this.dirs].filter((d) => d.startsWith(`${repo.root}/`)).sort((x, y) => y.length - x.length);
            for (const d of dirs) {
                const hasFiles = [...this.files.keys()].some((f) => f.startsWith(`${d}/`));
                const hasRepo = [...this.repos.keys()].some((r) => r === d || r.startsWith(`${d}/`));
                if (!hasFiles && !hasRepo && this.user.cwd !== d && !this.user.cwd.startsWith(`${d}/`)) this.dirs.delete(d);
            }
        }

        localChangesSummary(repo) {
            const ch = this.changes(repo);
            const rows = [];
            const map = new Map();
            for (const s of ch.staged) map.set(s.path, s.kind === "new file" ? "A" : s.kind === "deleted" ? "D" : "M");
            for (const u of ch.unstaged) if (!map.has(u.path)) map.set(u.path, u.kind === "deleted" ? "D" : "M");
            for (const [p, k] of [...map].sort()) rows.push(`${k}\t${p}`);
            return rows.join("\n");
        }

        switchTo(repo, branch, verb = "checkout") {
            const target = repo.heads[branch];
            const fromName = repo.head.branch ?? this.short(repo.head.detached);
            if (this.headHash(repo) || target) this.moveTree(repo, target, verb);
            repo.head = { branch };
            this.log(repo, `checkout: moving from ${fromName} to ${branch}`);
        }

        gSwitch(args) {
            const repo = this.needRepo();
            if (repo.state?.kind === "merge") return { code: 128, out: "fatal: cannot switch branch while merging\nConsider \"git merge --quit\" or \"git worktree add\"." };
            let create = null;
            let force = false;
            let detach = false;
            const pos = [];
            for (let i = 0; i < args.length; i += 1) {
                const a = args[i];
                if (a === "-c" || a === "--create" || a === "-C") create = args[++i];
                else if (a === "-f" || a === "--force" || a === "--discard-changes") force = true;
                else if (a === "-d" || a === "--detach") detach = true;
                else pos.push(a);
            }
            if (create) {
                if (create in repo.heads && !args.includes("-C")) throw new GitError(`fatal: a branch named '${create}' already exists`);
                const start = pos[0] ? this.resolve(repo, pos[0]) : this.headHash(repo);
                const prev = repo.head.branch ?? this.short(repo.head.detached);
                if (start && start !== this.headHash(repo)) this.moveTree(repo, start, "checkout");
                if (start) repo.heads[create] = start;
                repo.head = { branch: create };
                this.log(repo, `checkout: moving from ${prev} to ${create}`);
                let note = "";
                if (pos[0] && pos[0] in repo.remoteRefs) {
                    const [remote, ...rb] = pos[0].split("/");
                    repo.upstream[create] = { remote, merge: rb.join("/") };
                    note = `branch '${create}' set up to track '${pos[0]}'.\n`;
                }
                return { code: 0, out: `${note}Switched to a new branch '${create}'` };
            }
            let name = pos[0];
            if (!name) return { code: 128, out: "fatal: missing branch or commit argument" };
            if (name === "-") {
                const prev = repo.reflog.find((r) => r.msg.startsWith("checkout: moving from "));
                if (!prev) throw new GitError("fatal: invalid reference: @{-1}");
                name = /moving from (\S+) to/.exec(prev.msg)[1];
            }
            if (detach) {
                const h = this.resolve(repo, name);
                this.moveTree(repo, h, "checkout");
                const prev = repo.head.branch ?? this.short(repo.head.detached);
                repo.head = { detached: h };
                this.log(repo, `checkout: moving from ${prev} to ${this.short(h)}`);
                return { code: 0, out: `HEAD is now at ${this.short(h)} ${this.subject(h)}` };
            }
            if (!(name in repo.heads)) {
                const remotes = Object.keys(repo.remoteRefs).filter((r) => r.split("/").slice(1).join("/") === name);
                if (remotes.length === 1) return this.gSwitch(["-c", name, remotes[0]]);
                if (this.resolve(repo, name, true)) return { code: 128, out: `fatal: a branch is expected, got commit '${name}'\nhint: If you want to detach HEAD at the commit, try again with the --detach option.\nhint: Disable this message with "git config set advice.suggestDetachingHead false"` };
                return { code: 128, out: `fatal: invalid reference: ${name}` };
            }
            if (repo.head.branch === name) return { code: 0, out: `Already on '${name}'` };
            if (force) {
                const h = this.headTree(repo);
                for (const p of [...repo.index.keys()]) if (!h.has(p)) { this.deleteWorktreeFile(repo, p); repo.index.delete(p); }
                for (const [p, c] of h) { repo.index.set(p, c); this.writeWorktreeFile(repo, p, c); }
            }
            let leaving = "";
            if (repo.head.detached) {
                const d = repo.head.detached;
                const reach = new Set();
                for (const h of [...Object.values(repo.heads), ...Object.values(repo.remoteRefs), ...Object.values(repo.tags).map((t) => t.hash)]) for (const a of this.ancestors(h)) reach.add(a);
                const lost = this.orderedCommits([d]).filter((h) => !reach.has(h));
                if (lost.length) {
                    leaving = `Warning: you are leaving ${plural(lost.length, "commit")} behind, not connected to\nany of your branches:\n\n${lost.slice(0, 4).map((h) => `  ${this.short(h)} ${this.subject(h)}`).join("\n")}\n\nIf you want to keep ${lost.length === 1 ? "it" : "them"} by creating a new branch, this may be a good time\nto do so with:\n\n git branch <new-branch-name> ${this.short(d)}\n\n`;
                } else leaving = `Previous HEAD position was ${this.short(d)} ${this.subject(d)}\n`;
            }
            this.switchTo(repo, name);
            const summary = this.localChangesSummary(repo);
            const ab = this.aheadBehind(repo, name);
            let tail = "";
            if (ab && !ab.gone) {
                if (ab.ahead && ab.behind) tail = `\nYour branch and '${ab.ref}' have diverged,\nand have ${ab.ahead} and ${ab.behind} different commits each, respectively.`;
                else if (ab.ahead) tail = `\nYour branch is ahead of '${ab.ref}' by ${plural(ab.ahead, "commit")}.\n  (use "git push" to publish your local commits)`;
                else if (ab.behind) tail = `\nYour branch is behind '${ab.ref}' by ${plural(ab.behind, "commit")}, and can be fast-forwarded.\n  (use "git pull" to update your local branch)`;
                else tail = `\nYour branch is up to date with '${ab.ref}'.`;
            }
            return { code: 0, stdout: summary ? `${summary}\n` : "", out: `${leaving}Switched to branch '${name}'${tail}` };
        }

        gCheckout(args) {
            const repo = this.needRepo();
            const dd = args.indexOf("--");
            if (dd >= 0) {
                const rev = args.slice(0, dd).find((a) => !a.startsWith("-"));
                return this.gRestore([...(rev ? [`--source=${rev}`, "--staged", "--worktree"] : []), ...args.slice(dd + 1)]);
            }
            if (args[0] === "-b" || args[0] === "-B") return this.gSwitch(["-c", ...args.slice(1)]);
            const target = args.find((a) => !a.startsWith("-"));
            if (!target) return { code: 128, out: "fatal: you must specify path(s) to restore" };
            if (target in repo.heads) return this.gSwitch([target]);
            const remotes = Object.keys(repo.remoteRefs).filter((r) => r.split("/").slice(1).join("/") === target);
            if (remotes.length === 1) return this.gSwitch(["-c", target, remotes[0]]);
            const h = this.resolve(repo, target, true);
            if (h) {
                this.moveTree(repo, h, "checkout");
                const prev = repo.head.branch ?? this.short(repo.head.detached);
                repo.head = { detached: h };
                this.log(repo, `checkout: moving from ${prev} to ${target}`);
                return { code: 0, out: `Note: switching to '${target}'.\n\nYou are in 'detached HEAD' state. You can look around, make experimental\nchanges and commit them, and you can discard any commits you make in this\nstate without impacting any branches by switching back to a branch.\n\nIf you want to create a new branch to retain commits you create, you may\ndo so (now or later) by using -c with the switch command. Example:\n\n  git switch -c <new-branch-name>\n\nOr undo this operation with:\n\n  git switch -\n\nTurn off this advice by setting config variable advice.detachedHead to false\n\nHEAD is now at ${this.short(h)} ${this.subject(h)}` };
            }
            // иначе это путь
            return this.gRestore(args);
        }

        gBranch(args) {
            const repo = this.needRepo();
            const flags = new Set(args.filter((a) => a.startsWith("-")));
            const pos = args.filter((a) => !a.startsWith("-"));
            const headHash = this.headHash(repo);
            if (flags.has("-d") || flags.has("-D") || flags.has("--delete")) {
                const out = [];
                for (const name of pos) {
                    if (!(name in repo.heads)) return { code: 1, out: `error: branch '${name}' not found` };
                    if (name === repo.head.branch) return { code: 1, out: `error: cannot delete branch '${name}' used by worktree at '${repo.root}'` };
                    const tip = repo.heads[name];
                    const up = repo.upstream[name];
                    const upHash = up ? repo.remoteRefs[`${up.remote}/${up.merge}`] : undefined;
                    const merged = (headHash && this.isAncestor(tip, headHash)) || (upHash && this.isAncestor(tip, upHash));
                    if (!merged && !flags.has("-D") && !flags.has("--force")) {
                        return { code: 1, out: `error: the branch '${name}' is not fully merged\nhint: If you are sure you want to delete it, run 'git branch -D ${name}'\nhint: Disable this message with "git config set advice.forceDeleteBranch false"` };
                    }
                    delete repo.heads[name];
                    delete repo.upstream[name];
                    out.push(`Deleted branch ${name} (was ${this.short(tip)}).`);
                }
                return { code: 0, stdout: `${out.join("\n")}\n` };
            }
            if (flags.has("-m") || flags.has("-M")) {
                const [a, b] = pos.length === 1 ? [repo.head.branch, pos[0]] : pos;
                if (b in repo.heads && !flags.has("-M")) return { code: 128, out: `fatal: a branch named '${b}' already exists` };
                if (a in repo.heads) { repo.heads[b] = repo.heads[a]; delete repo.heads[a]; }
                else if (a !== repo.head.branch) return { code: 128, out: `error: refname refs/heads/${a} not found\nfatal: branch rename failed` };
                if (repo.upstream[a]) { repo.upstream[b] = repo.upstream[a]; delete repo.upstream[a]; }
                if (repo.head.branch === a) repo.head = { branch: b };
                return { code: 0 };
            }
            const setUp = args.find((a) => a.startsWith("--set-upstream-to=") || a === "-u" || a === "--set-upstream-to");
            if (setUp) {
                const value = setUp.includes("=") ? setUp.split("=")[1] : pos.shift();
                const branch = pos[0] ?? repo.head.branch;
                if (!(value in repo.remoteRefs)) return { code: 128, out: `fatal: the requested upstream branch '${value}' does not exist` };
                const [remote, ...rb] = value.split("/");
                repo.upstream[branch] = { remote, merge: rb.join("/") };
                return { code: 0, stdout: `branch '${branch}' set up to track '${value}'.\n` };
            }
            if (pos.length && !flags.has("--list")) {
                const [name, start] = pos;
                if (!/^[\w./-]+$/.test(name) || name.startsWith("-") || name.includes("..") || name.endsWith("/") || name.endsWith(".")) return { code: 128, out: `fatal: '${name}' is not a valid branch name` };
                if (name in repo.heads) return { code: 128, out: `fatal: a branch named '${name}' already exists` };
                const h = start ? this.resolve(repo, start, true) : headHash;
                if (!h) return { code: 128, out: start ? `fatal: not a valid object name: '${start}'` : `fatal: not a valid object name: '${repo.head.branch}'` };
                repo.heads[name] = h;
                if (start && start in repo.remoteRefs) {
                    const [remote, ...rb] = start.split("/");
                    repo.upstream[name] = { remote, merge: rb.join("/") };
                    return { code: 0, stdout: `branch '${name}' set up to track '${start}'.\n` };
                }
                return { code: 0 };
            }
            const verbose = flags.has("-v") || flags.has("-vv") || flags.has("--verbose");
            const vv = flags.has("-vv");
            const showRemote = flags.has("-r") || flags.has("--remotes");
            const showAll = flags.has("-a") || flags.has("--all");
            const rows = [];
            let names = Object.keys(repo.heads).sort();
            if (flags.has("--merged") || flags.has("--no-merged")) {
                const base = pos[0] ? this.resolve(repo, pos[0]) : headHash;
                names = names.filter((n) => this.isAncestor(repo.heads[n], base) === flags.has("--merged"));
            }
            const width = Math.max(0, ...names.map((n) => n.length), ...(showAll || showRemote ? Object.keys(repo.remoteRefs).map((r) => (showAll ? `remotes/${r}` : r).length) : [0]));
            const line = (mark, name, h, extra = "") => (verbose ? `${mark} ${name.padEnd(width)} ${this.short(h)} ${extra}${this.subject(h)}` : `${mark} ${name}`);
            if (!showRemote) {
                if (repo.head.detached) rows.push(line("*", `(HEAD detached at ${this.short(repo.head.detached)})`, repo.head.detached));
                for (const n of names) {
                    let extra = "";
                    if (vv && repo.upstream[n]) {
                        const ab = this.aheadBehind(repo, n);
                        const parts = [];
                        if (ab.gone) parts.push("gone");
                        if (ab.ahead) parts.push(`ahead ${ab.ahead}`);
                        if (ab.behind) parts.push(`behind ${ab.behind}`);
                        extra = `[${ab.ref}${parts.length ? `: ${parts.join(", ")}` : ""}] `;
                    }
                    rows.push(line(n === repo.head.branch ? "*" : " ", n, repo.heads[n], extra));
                }
            }
            if (showRemote || showAll) {
                for (const r of Object.keys(repo.remoteRefs).sort()) rows.push(line(" ", showAll ? `remotes/${r}` : r, repo.remoteRefs[r]));
            }
            return { code: 0, stdout: rows.length ? `${rows.join("\n")}\n` : "" };
        }

        // Слияние дерева theirs в текущее состояние; возвращает конфликты.
        mergeTrees(repo, baseTree, oursTree, theirsTree, oursLabel, theirsLabel) {
            const result = new Map();
            const conflicts = [];
            const messages = [];
            for (const p of [...new Set([...baseTree.keys(), ...oursTree.keys(), ...theirsTree.keys()])].sort()) {
                const b = baseTree.get(p);
                const o = oursTree.get(p);
                const t = theirsTree.get(p);
                if (o === t) { if (o !== undefined) result.set(p, o); continue; }
                if (o === b) { if (t !== undefined) result.set(p, t); continue; }
                if (t === b) { if (o !== undefined) result.set(p, o); continue; }
                if (o === undefined || t === undefined) {
                    const deletedIn = o === undefined ? oursLabel : theirsLabel;
                    const kept = o === undefined ? t : o;
                    result.set(p, kept);
                    conflicts.push(p);
                    messages.push(`CONFLICT (modify/delete): ${p} deleted in ${deletedIn} and modified in ${o === undefined ? theirsLabel : oursLabel}.  Version ${o === undefined ? theirsLabel : oursLabel} of ${p} left in tree.`);
                    continue;
                }
                messages.push(`Auto-merging ${p}`);
                const m = merge3(b ?? "", o, t, oursLabel, theirsLabel);
                result.set(p, m.text);
                if (m.conflict) {
                    conflicts.push(p);
                    messages.push(b === undefined ? `CONFLICT (add/add): Merge conflict in ${p}` : `CONFLICT (content): Merge conflict in ${p}`);
                }
            }
            return { result, conflicts, messages };
        }

        checkCleanFor(repo, paths, verb) {
            const head = this.headTree(repo);
            const wt = this.worktree(repo);
            const dirty = paths.filter((p) => repo.index.get(p) !== head.get(p) || (wt.has(p) ? wt.get(p) : undefined) !== repo.index.get(p));
            if (dirty.length) {
                throw new GitError(`error: Your local changes to the following files would be overwritten by ${verb}:\n${dirty.map((p) => `\t${p}`).join("\n")}\nPlease commit your changes or stash them before you ${verb}.\nAborting`, verb === "merge" ? 2 : 1);
            }
        }

        doMerge(repo, theirsHash, theirsName, opts = {}) {
            const oursHash = this.headHash(repo);
            const out = [];
            if (!oursHash) {
                this.moveTree(repo, theirsHash, "merge");
                this.setHead(repo, theirsHash, `${opts.reflog ?? `merge ${theirsName}`}: Fast-forward`);
                return { code: 0, stdout: "" };
            }
            if (this.isAncestor(theirsHash, oursHash)) return { code: 0, stdout: "Already up to date.\n" };
            const ff = this.isAncestor(oursHash, theirsHash);
            if (ff && !opts.noFf) {
                if (opts.ffOnlyFail) return opts.ffOnlyFail();
                const before = this.headTree(repo);
                this.moveTree(repo, theirsHash, "merge");
                this.setHead(repo, theirsHash, `${opts.reflog ?? `merge ${theirsName}`}: Fast-forward`);
                out.push(`Updating ${this.short(oursHash)}..${this.short(theirsHash)}`, "Fast-forward", this.statBlock(before, this.commitTree(theirsHash)));
                return { code: 0, stdout: `${out.join("\n")}\n` };
            }
            if (opts.ffOnly) return { code: 128, out: "hint: Diverging branches can't be fast-forwarded, you need to either:\nhint:\nhint: \tgit merge --no-ff\nhint:\nhint: or:\nhint:\nhint: \tgit rebase\nhint:\nhint: Disable this message with \"git config set advice.diverging false\"\nfatal: Not possible to fast-forward, aborting." };
            const base = this.mergeBase(oursHash, theirsHash);
            const baseTree = this.commitTree(base);
            const oursTree = this.headTree(repo);
            const theirsTree = this.commitTree(theirsHash);
            const touched = [...new Set([...oursTree.keys(), ...theirsTree.keys()])].filter((p) => oursTree.get(p) !== theirsTree.get(p) && theirsTree.get(p) !== baseTree.get(p));
            this.checkCleanFor(repo, touched, "merge");
            if (!this.cfg(repo, "user.name") || !this.cfg(repo, "user.email")) return this.gCommit(["-m", "merge"]);
            const { result, conflicts, messages } = this.mergeTrees(repo, baseTree, oursTree, theirsTree, "HEAD", opts.label ?? theirsName);
            const message = opts.message ?? `Merge branch '${theirsName}'${opts.suffix ?? ""}`;
            // применяем результат к рабочей папке и индексу (только изменённые файлы)
            for (const p of new Set([...oursTree.keys(), ...result.keys()])) {
                if (result.get(p) === oursTree.get(p)) continue;
                if (result.has(p)) { this.writeWorktreeFile(repo, p, result.get(p)); repo.index.set(p, result.get(p)); } else { this.deleteWorktreeFile(repo, p); repo.index.delete(p); }
            }
            for (const p of conflicts) repo.index.set(p, oursTree.get(p) ?? theirsTree.get(p));
            if (conflicts.length) {
                repo.state = { kind: "merge", theirs: theirsHash, message, conflicts: new Set(conflicts), orig: oursHash, origTree: oursTree };
                return { code: 1, stdout: `${messages.join("\n")}\nAutomatic merge failed; fix conflicts and then commit the result.\n` };
            }
            const commit = this.makeCommit(repo, [oursHash, theirsHash], new Map(repo.index), message);
            this.setHead(repo, commit.hash, `${opts.reflog ?? `merge ${theirsName}`}: Merge made by the 'ort' strategy.`);
            const auto = messages.length ? `${messages.join("\n")}\n` : "";
            return { code: 0, stdout: `${auto}Merge made by the 'ort' strategy.\n${this.statBlock(oursTree, this.commitTree(commit.hash))}\n` };
        }

        gMerge(args) {
            const repo = this.needRepo();
            if (args.includes("--abort")) {
                if (repo.state?.kind !== "merge") return { code: 128, out: "fatal: There is no merge to abort (MERGE_HEAD missing)." };
                const tree = repo.state.origTree;
                const current = this.worktree(repo);
                for (const p of new Set([...current.keys(), ...repo.index.keys()])) if (!tree.has(p) && repo.index.has(p)) this.deleteWorktreeFile(repo, p);
                repo.index = new Map(tree);
                for (const [p, c] of tree) this.writeWorktreeFile(repo, p, c);
                repo.state = null;
                return { code: 0 };
            }
            if (args.includes("--continue")) return this.gCommit([]);
            if (repo.state) return { code: 128, out: "error: Merging is not possible because you have unmerged files.\nhint: Fix them up in the work tree, and then use 'git add/rm <file>'\nhint: as appropriate to mark resolution and make a commit.\nfatal: Exiting because of an unresolved conflict." };
            let message = null;
            const pos = [];
            let noFf = false;
            let ffOnly = false;
            for (let i = 0; i < args.length; i += 1) {
                const a = args[i];
                if (a === "-m") message = args[++i];
                else if (a === "--no-ff") noFf = true;
                else if (a === "--ff-only") ffOnly = true;
                else if (a === "--no-edit" || a === "--ff") continue;
                else pos.push(a);
            }
            if (!pos.length) {
                const up = repo.upstream[repo.head.branch];
                if (!up) return { code: 128, out: "fatal: No remote for the current branch." };
                pos.push(`${up.remote}/${up.merge}`);
            }
            const theirs = this.resolve(repo, pos[0], true);
            if (!theirs) return { code: 1, out: `merge: ${pos[0]} - not something we can merge` };
            const name = pos[0] in repo.remoteRefs ? `remote-tracking branch '${pos[0]}'` : pos[0];
            const res = this.doMerge(repo, theirs, pos[0], { noFf, ffOnly, message: message ?? (pos[0] in repo.remoteRefs ? `Merge ${name}` : undefined) });
            return res;
        }

        // применяет изменения коммита (cherry-pick / шаг rebase / revert)
        applyCommit(repo, hash, reverse = false) {
            const c = this.objects.get(hash);
            const parentTree = this.commitTree(c.parents[0]);
            const thisTree = this.commitTree(hash);
            const [baseTree, theirsTree] = reverse ? [thisTree, parentTree] : [parentTree, thisTree];
            const oursTree = this.headTree(repo);
            const label = `${this.short(hash)} (${c.message.split("\n")[0]})`;
            const touched = [...new Set([...baseTree.keys(), ...theirsTree.keys()])].filter((p) => baseTree.get(p) !== theirsTree.get(p));
            const verb = repo.state?.kind === "rebase" ? "rebase" : reverse ? "revert" : "cherry-pick";
            const sameTree = (x, y) => x.size === y.size && [...x].every(([k, v]) => y.get(k) === v);
            if (verb !== "rebase" && !sameTree(repo.index, oursTree)) throw new GitError(`error: your local changes would be overwritten by ${verb}.\nhint: commit your changes or stash them to proceed.\nfatal: ${verb} failed`);
            const wt = this.worktree(repo);
            const dirty = touched.filter((p) => (wt.has(p) ? wt.get(p) : undefined) !== oursTree.get(p));
            if (dirty.length) throw new GitError(`error: Your local changes to the following files would be overwritten by merge:\n${dirty.map((p) => `\t${p}`).join("\n")}\nPlease commit your changes or stash them before you merge.\nAborting\nfatal: ${verb} failed`);
            const { result, conflicts, messages } = this.mergeTrees(repo, baseTree, oursTree, theirsTree, "HEAD", reverse ? `parent of ${label}` : label);
            for (const p of new Set([...oursTree.keys(), ...result.keys()])) {
                if (result.get(p) === oursTree.get(p)) continue;
                if (result.has(p)) { this.writeWorktreeFile(repo, p, result.get(p)); repo.index.set(p, result.get(p)); } else { this.deleteWorktreeFile(repo, p); repo.index.delete(p); }
            }
            for (const p of conflicts) repo.index.set(p, oursTree.get(p) ?? theirsTree.get(p));
            return { conflicts, messages, oursTree };
        }

        gCherryPick(args) {
            const repo = this.needRepo();
            if (args.includes("--abort")) return this.abortState(repo, "cherry-pick");
            if (args.includes("--continue")) return this.continueState(repo, "cherry-pick");
            const out = [];
            for (const r of args.filter((a) => !a.startsWith("-"))) {
                const h = this.resolve(repo, r, true);
                if (!h) return { code: 128, out: `fatal: bad revision '${r}'` };
                const c = this.objects.get(h);
                const { conflicts, messages, oursTree } = this.applyCommit(repo, h);
                if (conflicts.length) {
                    repo.state = { kind: "cherry-pick", commit: h, message: c.message, conflicts: new Set(conflicts), orig: this.headHash(repo), origTree: oursTree };
                    return { code: 1, stdout: `${messages.join("\n")}\nerror: could not apply ${this.short(h)}... ${c.message.split("\n")[0]}\nhint: After resolving the conflicts, mark them with\nhint: "git add/rm <pathspec>", then run\nhint: "git cherry-pick --continue".\nhint: You can instead skip this commit with "git cherry-pick --skip".\nhint: To abort and get back to the state before "git cherry-pick",\nhint: run "git cherry-pick --abort".\n` };
                }
                const nc = this.makeCommit(repo, [this.headHash(repo)], new Map(repo.index), c.message);
                this.setHead(repo, nc.hash, `cherry-pick: ${c.message.split("\n")[0]}`);
                out.push(`[${repo.head.branch ?? "detached HEAD"} ${this.short(nc.hash)}] ${c.message.split("\n")[0]}`, ` Date: ${formatDate(c.time)}`, this.statBlock(oursTree, new Map(repo.index), false));
            }
            return { code: 0, stdout: `${out.join("\n")}\n` };
        }

        abortState(repo, kind) {
            if (repo.state?.kind !== kind) return { code: 128, out: `error: no ${kind} in progress\nfatal: ${kind} failed` };
            const tree = repo.state.origTree;
            for (const p of repo.index.keys()) if (!tree.has(p)) this.deleteWorktreeFile(repo, p);
            repo.index = new Map(tree);
            for (const [p, c] of tree) this.writeWorktreeFile(repo, p, c);
            repo.state = null;
            return { code: 0 };
        }

        continueState(repo, kind) {
            if (repo.state?.kind !== kind) return { code: 128, out: `error: no ${kind} in progress\nfatal: ${kind} failed` };
            if (repo.state.conflicts.size) return { code: 128, out: `error: Committing is not possible because you have unmerged files.\nhint: Fix them up in the work tree, and then use 'git add/rm <file>'\nhint: as appropriate to mark resolution and make a commit.\nfatal: Exiting because of an unresolved conflict.` };
            const before = this.headTree(repo);
            const c = this.makeCommit(repo, [this.headHash(repo)], new Map(repo.index), repo.state.message);
            this.setHead(repo, c.hash, `${kind}: ${repo.state.message.split("\n")[0]}`);
            repo.state = null;
            return { code: 0, stdout: `[${repo.head.branch ?? "detached HEAD"} ${this.short(c.hash)}] ${c.message.split("\n")[0]}\n${this.statBlock(before, new Map(repo.index), false)}\n` };
        }

        gRevert(args) {
            const repo = this.needRepo();
            if (args.includes("--abort")) return this.abortState(repo, "revert");
            if (args.includes("--continue")) return this.continueState(repo, "revert");
            const noEdit = true;
            const rev = args.find((a) => !a.startsWith("-"));
            if (!rev) return { code: 129, out: "usage: git revert [--[no-]edit] [-n] [-m <parent-number>] [-s] [-S[<keyid>]] <commit>..." };
            const h = this.resolve(repo, rev, true);
            if (!h) return { code: 128, out: `fatal: bad revision '${rev}'` };
            const c = this.objects.get(h);
            if (c.parents.length > 1) return { code: 128, out: `error: commit ${h} is a merge but no -m option was given.\nfatal: revert failed` };
            const subj = c.message.split("\n")[0];
            const re = /^Revert "(.*)"$/.exec(subj);
            const message = `${re ? `Reapply "${re[1]}"` : `Revert "${subj}"`}\n\nThis reverts commit ${h}.`;
            const { conflicts, messages, oursTree } = this.applyCommit(repo, h, true);
            if (conflicts.length) {
                repo.state = { kind: "revert", commit: h, message, conflicts: new Set(conflicts), orig: this.headHash(repo), origTree: oursTree };
                return { code: 1, stdout: `${messages.join("\n")}\nerror: could not revert ${this.short(h)}... ${c.message.split("\n")[0]}\nhint: After resolving the conflicts, mark them with\nhint: "git add/rm <pathspec>", then run\nhint: "git revert --continue".\nhint: You can instead skip this commit with "git revert --skip".\nhint: To abort and get back to the state before "git revert",\nhint: run "git revert --abort".\n` };
            }
            void noEdit;
            const nc = this.makeCommit(repo, [this.headHash(repo)], new Map(repo.index), message);
            this.setHead(repo, nc.hash, `revert: ${message.split("\n")[0]}`);
            return { code: 0, stdout: `[${repo.head.branch ?? "detached HEAD"} ${this.short(nc.hash)}] ${message.split("\n")[0]}\n${this.statBlock(oursTree, new Map(repo.index), false)}\n` };
        }

        gRebase(args) {
            const repo = this.needRepo();
            if (args.includes("-i") || args.includes("--interactive")) return { code: 1, out: this.notes.interactive };
            if (args.includes("--abort")) {
                if (repo.state?.kind !== "rebase") return { code: 128, out: "fatal: no rebase in progress" };
                const st = repo.state;
                repo.state = null;
                repo.head = { detached: this.headHash(repo) };
                const curTree = this.headTree(repo);
                repo.heads[st.branch] = st.orig;
                repo.head = { branch: st.branch };
                const tree = this.commitTree(st.orig);
                for (const p of new Set([...curTree.keys(), ...repo.index.keys()])) if (!tree.has(p)) this.deleteWorktreeFile(repo, p);
                repo.index = new Map(tree);
                for (const [p, c] of tree) this.writeWorktreeFile(repo, p, c);
                this.log(repo, `rebase (abort): returning to refs/heads/${st.branch}`);
                return { code: 0 };
            }
            if (args.includes("--continue") || args.includes("--skip")) {
                if (repo.state?.kind !== "rebase") return { code: 128, out: "fatal: no rebase in progress" };
                const st = repo.state;
                if (args.includes("--skip")) {
                    const tree = this.headTree(repo);
                    for (const p of repo.index.keys()) if (!tree.has(p)) this.deleteWorktreeFile(repo, p);
                    repo.index = new Map(tree);
                    for (const [p, c] of tree) this.writeWorktreeFile(repo, p, c);
                    st.conflicts = new Set();
                } else {
                    if (st.conflicts.size) return { code: 1, out: `${[...st.conflicts].map((p) => `${p}: needs merge`).join("\n")}\nYou must edit all merge conflicts and then\nmark them as resolved using git add` };
                    const c = this.objects.get(st.todo[0]);
                    const nc = this.makeCommit(repo, [this.headHash(repo)], new Map(repo.index), c.message);
                    repo.head.detached = nc.hash;
                    this.log(repo, `rebase (continue): ${c.message.split("\n")[0]}`);
                }
                st.todo.shift();
                return this.rebaseSteps(repo);
            }
            if (repo.state) return { code: 128, out: "fatal: It seems that there is already a rebase-merge directory" };
            const upstreamName = args.find((a) => !a.startsWith("-")) ?? (repo.upstream[repo.head.branch] ? `${repo.upstream[repo.head.branch].remote}/${repo.upstream[repo.head.branch].merge}` : null);
            if (!upstreamName) return { code: 128, out: "There is no tracking information for the current branch.\nPlease specify which branch you want to rebase against." };
            if (repo.head.branch === undefined) return { code: 128, out: "fatal: rebase in detached HEAD is not supported by the learning terminal" };
            const onto = this.resolve(repo, upstreamName);
            return this.startRebase(repo, onto, upstreamName);
        }

        startRebase(repo, onto, upstreamName) {
            const head = this.headHash(repo);
            const ch = this.changes(repo);
            if (ch.staged.length || ch.unstaged.length) return { code: 1, out: "error: cannot rebase: You have unstaged changes.\nerror: Please commit or stash them." };
            if (this.isAncestor(head, onto) && head !== onto) {
                // просто перемотка вперёд
                this.moveTree(repo, onto, "checkout");
                repo.heads[repo.head.branch] = onto;
                this.log(repo, `rebase (finish): refs/heads/${repo.head.branch} onto ${onto}`);
                return { code: 0, stdout: `Successfully rebased and updated refs/heads/${repo.head.branch}.\n` };
            }
            if (this.isAncestor(onto, head)) return { code: 0, stdout: "Current branch " + repo.head.branch + " is up to date.\n" };
            const base = this.mergeBase(head, onto);
            const ontoAnc = this.ancestors(onto);
            const todo = this.orderedCommits([head]).filter((h) => !ontoAnc.has(h) && this.objects.get(h).parents.length < 2).reverse();
            void base;
            const branch = repo.head.branch;
            repo.state = { kind: "rebase", branch, orig: head, onto, todo, conflicts: new Set(), origTree: this.headTree(repo) };
            this.moveTree(repo, onto, "checkout");
            repo.head = { detached: onto };
            this.log(repo, `rebase (start): checkout ${upstreamName}`);
            return this.rebaseSteps(repo);
        }

        rebaseSteps(repo) {
            const st = repo.state;
            while (st.todo.length) {
                const h = st.todo[0];
                const c = this.objects.get(h);
                const { conflicts, messages } = this.applyCommit(repo, h);
                if (conflicts.length) {
                    st.conflicts = new Set(conflicts);
                    return { code: 1, stdout: `${messages.join("\n")}\nerror: could not apply ${this.short(h)}... ${c.message.split("\n")[0]}\nhint: Resolve all conflicts manually, mark them as resolved with\nhint: "git add/rm <conflicted_files>", then run "git rebase --continue".\nhint: You can instead skip this commit: run "git rebase --skip".\nhint: To abort and get back to the state before "git rebase", run "git rebase --abort".\nhint: Disable this message with "git config set advice.mergeConflict false"\nCould not apply ${this.short(h)}... ${c.message.split("\n")[0]}\n` };
                }
                const nc = this.makeCommit(repo, [this.headHash(repo)], new Map(repo.index), c.message);
                repo.head.detached = nc.hash;
                this.log(repo, `rebase (pick): ${c.message.split("\n")[0]}`);
                st.todo.shift();
            }
            const tip = this.headHash(repo);
            repo.heads[st.branch] = tip;
            repo.head = { branch: st.branch };
            repo.state = null;
            this.log(repo, `rebase (finish): returning to refs/heads/${st.branch}`);
            return { code: 0, stdout: `Successfully rebased and updated refs/heads/${st.branch}.\n` };
        }

        gReset(args) {
            const repo = this.needRepo();
            let mode = "mixed";
            const pos = [];
            let afterDash = null;
            for (let i = 0; i < args.length; i += 1) {
                const a = args[i];
                if (a === "--soft" || a === "--mixed" || a === "--hard") mode = a.slice(2);
                else if (a === "--") { afterDash = args.slice(i + 1); break; }
                else if (a === "-q" || a === "--quiet") continue;
                else if (a === "-p" || a === "--patch") return { code: 1, out: this.notes.interactive };
                else pos.push(a);
            }
            // git reset <путь> - убрать файл из индекса
            let paths = afterDash;
            let rev = null;
            if (!paths && pos.length && args.some((a) => a === "--soft" || a === "--hard" || a === "--mixed") && !this.resolve(repo, pos[0], true)) {
                this.resolve(repo, pos[0]);
            }
            if (!paths && pos.length) {
                if (this.resolve(repo, pos[0], true) && !(this.worktree(repo).has(this.rel(repo, this.abs(pos[0]))) && pos.length === 1 && !(pos[0] in repo.heads) && pos[0] !== "HEAD")) { rev = pos[0]; paths = pos.slice(1).length ? pos.slice(1) : null; }
                else paths = pos;
            } else if (pos.length) rev = pos[0];
            if (paths && paths.length) {
                if (mode !== "mixed") return { code: 128, out: `fatal: Cannot do ${mode} reset with paths.` };
                const src = rev ? this.commitTree(this.resolve(repo, rev)) : this.headTree(repo);
                const { paths: rels, missing } = this.pathspec(repo, paths, new Set([...repo.index.keys(), ...src.keys(), ...this.worktree(repo).keys()]));
                if (missing.length) return { code: 128, out: `fatal: ambiguous argument '${missing[0]}': unknown revision or path not in the working tree.` };
                for (const p of rels) { if (src.has(p)) repo.index.set(p, src.get(p)); else repo.index.delete(p); }
                const summary = this.localChangesSummary(repo).split("\n").filter((l) => /^[MD]\t/.test(l) && rels.includes(l.slice(2)));
                return { code: 0, stdout: summary.length ? `Unstaged changes after reset:\n${summary.join("\n")}\n` : "" };
            }
            const target = this.resolve(repo, rev ?? "HEAD");
            const targetTree = this.commitTree(target);
            if (mode === "hard") {
                const wt = this.worktree(repo);
                for (const p of new Set([...repo.index.keys(), ...this.headTree(repo).keys()])) if (!targetTree.has(p) && wt.has(p)) this.deleteWorktreeFile(repo, p);
                repo.index = new Map(targetTree);
                for (const [p, c] of targetTree) this.writeWorktreeFile(repo, p, c);
                this.cleanEmptyDirs(repo);
            } else if (mode === "mixed") repo.index = new Map(targetTree);
            repo.state = null;
            this.setHead(repo, target, `reset: moving to ${rev ?? "HEAD"}`);
            if (mode === "hard") return { code: 0, stdout: `HEAD is now at ${this.short(target)} ${this.subject(target)}\n` };
            if (mode === "mixed") {
                const summary = this.changes(repo);
                const rows = summary.unstaged.map((u) => `${u.kind === "deleted" ? "D" : "M"}\t${u.path}`);
                return { code: 0, stdout: rows.length ? `Unstaged changes after reset:\n${rows.join("\n")}\n` : "" };
            }
            return { code: 0 };
        }

        gRm(args) {
            const repo = this.needRepo();
            const cached = args.includes("--cached");
            const recursive = args.includes("-r") || args.includes("-rf") || args.includes("-fr");
            const force = args.includes("-f") || args.includes("-rf") || args.includes("-fr");
            const dryRun = args.includes("-n") || args.includes("--dry-run");
            const specs = args.filter((a) => !a.startsWith("-"));
            if (!specs.length) return { code: 129, out: "usage: git rm [-f | --force] [-n] [-r] [--cached] [--ignore-unmatch]\n              [--quiet] [--pathspec-from-file=<file> [--pathspec-file-nul]]\n              [--] [<pathspec>...]" };
            const { paths, missing } = this.pathspec(repo, specs, new Set(repo.index.keys()));
            if (missing.length) return { code: 128, out: `fatal: pathspec '${missing[0]}' did not match any files` };
            const head = this.headTree(repo);
            const wt = this.worktree(repo);
            for (const s of specs) {
                const rel = this.rel(repo, this.abs(s));
                if (!recursive && !repo.index.has(rel) && paths.some((p) => p.startsWith(`${rel}/`))) return { code: 128, out: `fatal: not removing '${s}' recursively without -r` };
            }
            if (!cached && !force) {
                const bad = paths.filter((p) => wt.has(p) && (wt.get(p) !== repo.index.get(p) || repo.index.get(p) !== head.get(p)));
                if (bad.length) return { code: 1, out: `error: the following file${bad.length > 1 ? "s have" : " has"} local modifications:\n${bad.map((p) => `    ${p}`).join("\n")}\n(use --cached to keep the file, or -f to force removal)` };
            }
            const out = [];
            for (const p of paths) {
                out.push(`rm '${p}'`);
                if (dryRun) continue;
                repo.index.delete(p);
                if (!cached) this.deleteWorktreeFile(repo, p);
            }
            if (!cached) this.cleanEmptyDirs(repo);
            return { code: 0, stdout: `${out.join("\n")}\n` };
        }

        gMv(args) {
            const repo = this.needRepo();
            const pos = args.filter((a) => !a.startsWith("-"));
            if (pos.length !== 2) return { code: 129, out: "usage: git mv [<options>] <source>... <destination>" };
            const src = this.rel(repo, this.abs(pos[0]));
            let dst = this.rel(repo, this.abs(pos[1]));
            if (this.isDir(this.abs(pos[1]))) dst = `${dst ? `${dst}/` : ""}${src.split("/").pop()}`;
            if (!this.isFile(`${repo.root}/${src}`) && !repo.index.has(src)) return { code: 128, out: `fatal: bad source, source=${src}, destination=${dst}` };
            if (!repo.index.has(src)) return { code: 128, out: `fatal: not under version control, source=${src}, destination=${dst}` };
            if (this.worktree(repo).has(dst)) return { code: 128, out: `fatal: destination exists, source=${src}, destination=${dst}` };
            const content = this.files.get(`${repo.root}/${src}`);
            this.deleteWorktreeFile(repo, src);
            this.writeWorktreeFile(repo, dst, content);
            repo.index.set(dst, repo.index.get(src));
            repo.index.delete(src);
            return { code: 0 };
        }

        gStash(args) {
            const repo = this.needRepo();
            const sub = ["list", "pop", "apply", "drop", "clear", "push", "save", "show"].includes(args[0]) ? args[0] : "push";
            const rest = sub === "push" && args[0] !== "push" ? args : args.slice(1);
            const ref = (s) => {
                const m = /^stash@\{(\d+)\}$/.exec(s ?? "stash@{0}") ?? /^(\d+)$/.exec(s ?? "");
                const n = m ? Number(m[1]) : 0;
                if (!repo.stash[n]) throw new GitError(repo.stash.length ? `error: stash@{${n}} is not a valid reference` : "No stash entries found.", 1);
                return n;
            };
            if (sub === "list") return { code: 0, stdout: repo.stash.map((s, k) => `stash@{${k}}: ${s.label}\n`).join("") };
            if (sub === "clear") { repo.stash = []; return { code: 0 }; }
            if (sub === "drop") {
                const n = ref(rest[0]);
                const [s] = repo.stash.splice(n, 1);
                return { code: 0, stdout: `Dropped stash@{${n}} (${s.hash})\n` };
            }
            if (sub === "show") {
                const n = ref(rest.find((a) => !a.startsWith("-")));
                const s = repo.stash[n];
                const tracked = new Map([...s.worktree].filter(([p]) => !(s.untracked ?? []).includes(p)));
                return { code: 0, stdout: `${this.statBlock(this.commitTree(s.base), tracked).split("\n").filter((l) => !l.startsWith(" create") && !l.startsWith(" delete")).join("\n")}\n` };
            }
            if (sub === "pop" || sub === "apply") {
                const n = ref(rest.find((a) => !a.startsWith("-")));
                const s = repo.stash[n];
                const head = this.headTree(repo);
                const wt = this.worktree(repo);
                const base = this.commitTree(s.base);
                const conflicts = [];
                const touched = [...new Set([...base.keys(), ...s.worktree.keys()])].filter((p) => base.get(p) !== s.worktree.get(p));
                const dirty = touched.filter((p) => (wt.has(p) ? wt.get(p) : undefined) !== head.get(p));
                if (dirty.length) return { code: 1, out: `error: Your local changes to the following files would be overwritten by merge:\n${dirty.map((p) => `\t${p}`).join("\n")}\nPlease commit your changes or stash them before you merge.\nAborting` };
                for (const p of touched) {
                    const b = base.get(p);
                    const o = head.get(p);
                    const t = s.worktree.get(p);
                    let r;
                    if (o === b) r = t;
                    else if (t === undefined && o === b) r = undefined;
                    else {
                        const m = merge3(b ?? "", o ?? "", t ?? "", "Updated upstream", "Stashed changes");
                        r = m.text;
                        if (m.conflict) conflicts.push(p);
                    }
                    if (r === undefined) { this.deleteWorktreeFile(repo, p); repo.index.delete(p); } else this.writeWorktreeFile(repo, p, r);
                }
                for (const [p, c] of s.index) if (!head.has(p) || head.get(p) !== c) { if (!conflicts.includes(p) && s.index.get(p) === s.worktree.get(p) && !base.has(p)) repo.index.set(p, c); }
                for (const p of s.untracked ?? []) this.writeWorktreeFile(repo, p, s.worktree.get(p));
                if (conflicts.length) {
                    repo.state = { kind: "stash", conflicts: new Set(conflicts), message: "", origTree: head };
                    return { code: 1, stdout: `${conflicts.map((p) => `Auto-merging ${p}\nCONFLICT (content): Merge conflict in ${p}`).join("\n")}\nOn branch ${repo.head.branch}\nThe stash entry is kept in case you need it again.\n` };
                }
                const status = this.gStatus([]).stdout;
                if (sub === "pop") { repo.stash.splice(n, 1); return { code: 0, stdout: `${status}Dropped refs/stash@{${n}} (${s.hash})\n` }; }
                return { code: 0, stdout: status };
            }
            // push
            const includeUntracked = rest.includes("-u") || rest.includes("--include-untracked");
            const mi = rest.findIndex((a) => a === "-m" || a === "--message");
            const msg = mi >= 0 ? rest[mi + 1] : sub === "save" ? rest.filter((a) => !a.startsWith("-")).join(" ") || null : null;
            const head = this.headHash(repo);
            if (!head) return { code: 1, out: "You do not have the initial commit yet" };
            const ch = this.changes(repo);
            if (!ch.staged.length && !ch.unstaged.length && !(includeUntracked && ch.untracked.length)) return { code: 1, stdout: "No local changes to save\n" };
            const wt = this.worktree(repo);
            const worktree = new Map();
            for (const p of repo.index.keys()) if (wt.has(p)) worktree.set(p, wt.get(p));
            const untracked = includeUntracked ? ch.untracked : [];
            for (const p of untracked) worktree.set(p, wt.get(p));
            const branch = repo.head.branch ?? "(no branch)";
            const label = msg ? `On ${branch}: ${msg}` : `WIP on ${branch}: ${this.short(head)} ${this.subject(head)}`;
            this.counter += 1;
            const hash = hashHex(`stash${this.counter}${label}`);
            repo.stash.unshift({ base: head, index: new Map(repo.index), worktree, untracked, label, hash });
            const tree = this.headTree(repo);
            for (const p of repo.index.keys()) if (!tree.has(p)) this.deleteWorktreeFile(repo, p);
            for (const p of untracked) this.deleteWorktreeFile(repo, p);
            repo.index = new Map(tree);
            for (const [p, c] of tree) this.writeWorktreeFile(repo, p, c);
            return { code: 0, stdout: `Saved working directory and index state ${label}\n` };
        }

        gTag(args) {
            const repo = this.needRepo();
            const del = args.includes("-d") || args.includes("--delete");
            const annotated = args.includes("-a");
            const mi = args.findIndex((a) => a === "-m");
            const message = mi >= 0 ? args[mi + 1] : null;
            const pos = args.filter((a, k) => !a.startsWith("-") && !(mi >= 0 && k === mi + 1));
            const showN = args.some((a) => /^-n\d*$/.test(a));
            if (args.includes("-l") || args.includes("--list") || pos.length === 0 || showN) {
                const pattern = pos[0] ? new RegExp(`^${globToRegex(pos[0])}$`) : null;
                const names = Object.keys(repo.tags).sort().filter((t) => !pattern || pattern.test(t));
                return { code: 0, stdout: names.map((t) => (showN ? `${t.padEnd(15)} ${(repo.tags[t].message ?? this.subject(repo.tags[t].hash)).split("\n")[0]}` : t) + "\n").join("") };
            }
            if (del) {
                const out = [];
                for (const t of pos) {
                    if (!(t in repo.tags)) return { code: 1, out: `error: tag '${t}' not found.` };
                    out.push(`Deleted tag '${t}' (was ${this.short(repo.tags[t].hash)})`);
                    delete repo.tags[t];
                }
                return { code: 0, stdout: `${out.join("\n")}\n` };
            }
            const [name, rev] = pos;
            if (name in repo.tags && !args.includes("-f")) return { code: 128, out: `fatal: tag '${name}' already exists` };
            if ((annotated || message) && !message) return { code: 1, out: this.notes.commitEditor.replace("git commit -m", "git tag -a v1.0 -m") };
            const h = this.resolve(repo, rev ?? "HEAD", true);
            if (!h) return { code: 128, out: `fatal: Failed to resolve '${rev ?? "HEAD"}' as a valid ref.` };
            this.tick(1);
            repo.tags[name] = message ? { hash: h, message, tagger: { name: this.cfg(repo, "user.name"), email: this.cfg(repo, "user.email") }, time: this.clock } : { hash: h };
            return { code: 0 };
        }

        // ----- удалённые репозитории -----

        createRemote(url, opts = {}) {
            // «Создать репозиторий на GitHub»: пустой или с README
            const server = { url, heads: {}, tags: {}, head: opts.defaultBranch ?? "main", writers: opts.writers ?? null };
            this.servers.set(url, server);
            if (opts.readme) {
                const prevUser = this.user;
                const owner = opts.owner ?? "GitHub";
                this.tick();
                this.counter += 1;
                const tree = { "README.md": `# ${url.split("/").pop().replace(/\.git$/, "")}\n` };
                const hash = hashHex(JSON.stringify(["init", url, this.counter]));
                this.objects.set(hash, { hash, parents: [], tree: Object.freeze(tree), message: "Initial commit", author: { name: owner, email: `${owner.toLowerCase()}@users.noreply.github.com` }, time: this.clock });
                server.heads[server.head] = hash;
                this.user = prevUser;
            }
            return server;
        }

        server(url) {
            return this.servers.get(url) ?? this.servers.get(`${url}.git`) ?? this.servers.get(url.replace(/\.git$/, "")) ?? null;
        }

        remoteUrl(repo, nameOrUrl) {
            if (nameOrUrl in repo.remotes) return repo.remotes[nameOrUrl];
            if (/^(https?:\/\/|git@|\/)/.test(nameOrUrl)) return nameOrUrl;
            return null;
        }

        gRemote(args) {
            const repo = this.needRepo();
            const [sub, ...rest] = args;
            if (!sub || sub === "-v" || sub === "--verbose") {
                const names = Object.keys(repo.remotes);
                if (sub) return { code: 0, stdout: names.map((n) => `${n}\t${repo.remotes[n]} (fetch)\n${n}\t${repo.remotes[n]} (push)\n`).join("") };
                return { code: 0, stdout: names.map((n) => `${n}\n`).join("") };
            }
            if (sub === "add") {
                const [name, url] = rest.filter((a) => !a.startsWith("-"));
                if (!name || !url) return { code: 129, out: "usage: git remote add [<options>] <name> <url>" };
                if (name in repo.remotes) return { code: 3, out: `error: remote ${name} already exists.` };
                repo.remotes[name] = url;
                return { code: 0 };
            }
            if (sub === "remove" || sub === "rm") {
                const [name] = rest;
                if (!(name in repo.remotes)) return { code: 2, out: `error: No such remote: '${name}'` };
                delete repo.remotes[name];
                for (const r of Object.keys(repo.remoteRefs)) if (r.startsWith(`${name}/`)) delete repo.remoteRefs[r];
                for (const b of Object.keys(repo.upstream)) if (repo.upstream[b].remote === name) delete repo.upstream[b];
                return { code: 0 };
            }
            if (sub === "rename") {
                const [a, b] = rest;
                if (!(a in repo.remotes)) return { code: 2, out: `error: No such remote: '${a}'` };
                repo.remotes[b] = repo.remotes[a];
                delete repo.remotes[a];
                for (const r of Object.keys(repo.remoteRefs)) if (r.startsWith(`${a}/`)) { repo.remoteRefs[b + r.slice(a.length)] = repo.remoteRefs[r]; delete repo.remoteRefs[r]; }
                for (const u of Object.values(repo.upstream)) if (u.remote === a) u.remote = b;
                return { code: 0 };
            }
            if (sub === "get-url") {
                const [name] = rest;
                if (!(name in repo.remotes)) return { code: 2, out: `error: No such remote '${name}'` };
                return { code: 0, stdout: `${repo.remotes[name]}\n` };
            }
            if (sub === "set-url") {
                const [name, url] = rest;
                if (!(name in repo.remotes)) return { code: 2, out: `error: No such remote '${name}'` };
                repo.remotes[name] = url;
                return { code: 0 };
            }
            return { code: 1, out: `error: unknown subcommand: \`${sub}'` };
        }

        notFound(url) {
            return new GitError(`remote: Repository not found.\nfatal: repository '${url.replace(/\.git$/, "")}/' not found`);
        }

        gClone(args) {
            const pos = args.filter((a) => !a.startsWith("-"));
            const [url, dirArg] = pos;
            if (!url) return { code: 129, out: "fatal: You must specify a repository to clone." };
            const name = dirArg ?? url.replace(/\/+$/, "").split("/").pop().replace(/\.git$/, "");
            const target = this.abs(name);
            if (this.isFile(target) || (this.isDir(target) && this.listDir(target).length)) return { code: 128, out: `fatal: destination path '${name}' already exists and is not an empty directory.` };
            const server = this.server(url);
            const out = [`Cloning into '${name}'...`];
            if (!server) {
                const err = this.notFound(url);
                return { code: 128, out: `${out[0]}\n${err.message}` };
            }
            this.mkdirp(target);
            const branch = server.head in server.heads ? server.head : Object.keys(server.heads)[0] ?? server.head;
            const repo = this.newRepo(target, branch);
            repo.remotes.origin = url;
            for (const [b, h] of Object.entries(server.heads)) repo.remoteRefs[`origin/${b}`] = h;
            for (const [t, v] of Object.entries(server.tags)) repo.tags[t] = { ...v };
            if (server.heads[branch]) {
                repo.heads[branch] = server.heads[branch];
                repo.upstream[branch] = { remote: "origin", merge: branch };
                const tree = this.commitTree(server.heads[branch]);
                repo.index = new Map(tree);
                for (const [p, c] of tree) this.writeWorktreeFile(repo, p, c);
                this.log(repo, `clone: from ${url}`);
            } else out.push("warning: You appear to have cloned an empty repository.");
            return { code: 0, out: out.join("\n") };
        }

        // список коммитов, которых нет на сервере (для подсчёта объектов)
        newObjectsCount(server, hash) {
            const known = new Set();
            for (const h of Object.values(server.heads)) for (const a of this.ancestors(h)) known.add(a);
            let n = 0;
            for (const a of this.ancestors(hash)) if (!known.has(a)) n += 1;
            return n;
        }

        gPush(args) {
            const repo = this.needRepo();
            let setUpstream = false;
            let force = false;
            let tags = false;
            let del = false;
            let followTags = false;
            const pos = [];
            for (const a of args) {
                if (a === "-u" || a === "--set-upstream") setUpstream = true;
                else if (a === "-f" || a === "--force" || a === "--force-with-lease") force = true;
                else if (a === "--tags") tags = true;
                else if (a === "--follow-tags") followTags = true;
                else if (a === "-d" || a === "--delete") del = true;
                else if (a === "--all") pos.push(...(pos.length ? [] : ["origin"]), ...Object.keys(repo.heads));
                else pos.push(a);
            }
            let [remote, ...refspecs] = pos;
            const branch = repo.head.branch;
            if (!remote) {
                const up = branch ? repo.upstream[branch] : null;
                if (up) remote = up.remote;
                else if (Object.keys(repo.remotes).length === 0) return { code: 128, out: "fatal: No configured push destination.\nEither specify the URL from the command-line or configure a remote repository using\n\n    git remote add <name> <url>\n\nand then push using the remote name\n\n    git push <name>\n" };
                else if (Object.keys(repo.remotes).length === 1 && !tags) {
                    return { code: 128, out: `fatal: The current branch ${branch} has no upstream branch.\nTo push the current branch and set the remote as upstream, use\n\n    git push --set-upstream ${Object.keys(repo.remotes)[0]} ${branch}\n\nTo have this happen automatically for branches without a tracking\nupstream, see 'push.autoSetupRemote' in 'git help config'.\n` };
                } else remote = Object.keys(repo.remotes)[0];
            }
            const url = this.remoteUrl(repo, remote);
            if (!url) return { code: 128, out: `fatal: '${remote}' does not appear to be a git repository\nfatal: Could not read from remote repository.\n\nPlease make sure you have the correct access rights\nand the repository exists.` };
            const server = this.server(url);
            if (!server) throw this.notFound(url);
            if (server.writers && !server.writers.includes(this.user.login)) {
                const name = url.replace(/^https?:\/\/[^/]+\//, "").replace(/^git@[^:]+:/, "");
                return { code: 128, out: `remote: Permission to ${name} denied to ${this.user.login}.\nfatal: unable to access '${url.replace(/\.git$/, "")}/': The requested URL returned error: 403` };
            }
            if (refspecs.length === 0 && !tags) {
                const up = branch ? repo.upstream[branch] : null;
                if (up && up.remote === remote) refspecs = [`${branch}:${up.merge}`];
                else if (branch) {
                    if (!setUpstream && !(pos.length)) return { code: 128, out: `fatal: The current branch ${branch} has no upstream branch.` };
                    refspecs = [branch];
                } else return { code: 128, out: "fatal: You are not currently on a branch." };
            }
            const out = [];
            const lines2 = [];
            const errors = [];
            let objects = 0;
            const notes = [];
            for (const spec of refspecs) {
                const [srcName, dstName0] = spec.includes(":") ? spec.split(":") : [spec, spec];
                const dstName = dstName0 || srcName;
                if (del || srcName === "") {
                    const name = del ? srcName : dstName;
                    if (name in server.tags && !(name in server.heads)) {
                        delete server.tags[name];
                        lines2.push(` - [deleted]         ${name}`);
                        continue;
                    }
                    if (!(name in server.heads)) { errors.push(`error: unable to delete '${name}': remote ref does not exist`); continue; }
                    delete server.heads[name];
                    delete repo.remoteRefs[`${remote}/${name}`];
                    lines2.push(` - [deleted]         ${name}`);
                    continue;
                }
                if (srcName in repo.tags && !(srcName in repo.heads)) {
                    if (server.tags[srcName]?.hash === repo.tags[srcName].hash) continue;
                    objects += this.newObjectsCount(server, repo.tags[srcName].hash);
                    server.tags[srcName] = { ...repo.tags[srcName] };
                    lines2.push(` * [new tag]         ${srcName} -> ${srcName}`);
                    continue;
                }
                const h = this.resolve(repo, srcName, true);
                if (!h) { errors.push(`error: src refspec ${srcName} does not match any`); continue; }
                const old = server.heads[dstName];
                if (old === h) { continue; }
                if (old && !this.isAncestor(old, h) && !force) {
                    const known = this.objects.has(old) && Object.values(repo.remoteRefs).some((r) => this.ancestors(r).has(old));
                    lines2.push(` ! [rejected]        ${srcName} -> ${dstName} (${known ? "non-fast-forward" : "fetch first"})`);
                    errors.push(known
                        ? "hint: Updates were rejected because the tip of your current branch is behind\nhint: its remote counterpart. If you want to integrate the remote changes,\nhint: use 'git pull' before pushing again.\nhint: See the 'Note about fast-forwards' in 'git push --help' for details."
                        : "hint: Updates were rejected because the remote contains work that you do not\nhint: have locally. This is usually caused by another repository pushing to\nhint: the same ref. If you want to integrate the remote changes, use\nhint: 'git pull' before pushing again.\nhint: See the 'Note about fast-forwards' in 'git push --help' for details.");
                    errors.unshift("__failed__");
                    continue;
                }
                objects += this.newObjectsCount(server, h);
                server.heads[dstName] = h;
                repo.remoteRefs[`${remote}/${dstName}`] = h;
                if (!old) lines2.push(` * [new branch]      ${srcName} -> ${dstName}`);
                else if (force && !this.isAncestor(old, h)) lines2.push(` + ${this.short(old)}...${this.short(h)} ${srcName} -> ${dstName} (forced update)`);
                else lines2.push(`   ${this.short(old)}..${this.short(h)}  ${srcName} -> ${dstName}`);
                if (setUpstream && srcName in repo.heads) {
                    repo.upstream[srcName] = { remote, merge: dstName };
                    notes.push(`branch '${srcName}' set up to track '${remote}/${dstName}'.`);
                }
            }
            if (tags || followTags) {
                const reach = new Set();
                for (const h of Object.values(server.heads)) for (const a of this.ancestors(h)) reach.add(a);
                for (const [t, v] of Object.entries(repo.tags)) {
                    if (server.tags[t]?.hash === v.hash) continue;
                    if (followTags && !tags && (!v.message || !reach.has(v.hash))) continue;
                    objects += this.newObjectsCount(server, v.hash);
                    server.tags[t] = { ...v };
                    lines2.push(` * [new tag]         ${t} -> ${t}`);
                }
            }
            const failed = errors[0] === "__failed__";
            const errList = errors.filter((e) => e !== "__failed__");
            if (!lines2.length && !errList.length) return { code: 0, out: "Everything up-to-date" };
            if (objects > 0) out.push(`Enumerating objects: ${objects * 3}, done.`, `Writing objects: 100% (${objects * 3}/${objects * 3}), done.`, `Total ${objects * 3} (delta 0), reused 0 (delta 0), pack-reused 0`);
            if (lines2.length) out.push(`To ${url}`, ...lines2);
            const srcErrors = errList.filter((e) => e.startsWith("error: src refspec") || e.startsWith("error: unable"));
            const hints = errList.filter((e) => e.startsWith("hint:"));
            out.push(...srcErrors);
            if (failed || srcErrors.length) out.push(`error: failed to push some refs to '${url}'`);
            out.push(...hints);
            out.push(...notes);
            return { code: failed || srcErrors.length ? 1 : 0, out: out.join("\n") };
        }

        fetchFrom(repo, remote) {
            const url = this.remoteUrl(repo, remote);
            if (!url) throw new GitError(`fatal: '${remote}' does not appear to be a git repository\nfatal: Could not read from remote repository.\n\nPlease make sure you have the correct access rights\nand the repository exists.`);
            const server = this.server(url);
            if (!server) throw this.notFound(url);
            const out = [];
            for (const [b, h] of Object.entries(server.heads).sort()) {
                const ref = `${remote}/${b}`;
                const old = repo.remoteRefs[ref];
                if (old === h) continue;
                repo.remoteRefs[ref] = h;
                if (!old) out.push(` * [new branch]      ${b.padEnd(10)} -> ${ref}`);
                else if (!this.isAncestor(old, h)) out.push(` + ${this.short(old)}...${this.short(h)} ${b.padEnd(10)} -> ${ref}  (forced update)`);
                else out.push(`   ${this.short(old)}..${this.short(h)}  ${b.padEnd(10)} -> ${ref}`);
            }
            const pruned = [];
            for (const ref of Object.keys(repo.remoteRefs)) {
                if (ref.startsWith(`${remote}/`) && !(ref.slice(remote.length + 1) in server.heads) && repo.config["fetch.prune"]) { delete repo.remoteRefs[ref]; pruned.push(` - [deleted]         (none)     -> ${ref}`); }
            }
            out.unshift(...pruned);
            for (const [t, v] of Object.entries(server.tags)) {
                if (!(t in repo.tags)) { repo.tags[t] = { ...v }; out.push(` * [new tag]         ${t.padEnd(10)} -> ${t}`); }
            }
            return out.length ? `From ${url.replace(/\.git$/, "")}\n${out.join("\n")}` : "";
        }

        gFetch(args) {
            const repo = this.needRepo();
            const prune = args.includes("--prune") || args.includes("-p");
            const remotes = args.includes("--all") ? Object.keys(repo.remotes) : [args.find((a) => !a.startsWith("-")) ?? repo.upstream[repo.head.branch]?.remote ?? Object.keys(repo.remotes)[0]];
            if (!remotes[0]) return { code: 128, out: "fatal: No remote repository specified.  Please, specify either a URL or a\nremote name from which new revisions should be fetched." };
            const outs = [];
            for (const r of remotes) {
                if (prune) repo.config["fetch.prune"] = "true";
                outs.push(this.fetchFrom(repo, r));
                if (prune) delete repo.config["fetch.prune"];
            }
            return { code: 0, out: outs.filter(Boolean).join("\n") };
        }

        gPull(args) {
            const repo = this.needRepo();
            let rebase = null;
            let ffOnly = false;
            const pos = [];
            for (const a of args) {
                if (a === "--rebase" || a === "-r") rebase = true;
                else if (a === "--no-rebase") rebase = false;
                else if (a === "--ff-only") ffOnly = true;
                else if (a === "--ff" || a === "--no-edit") continue;
                else pos.push(a);
            }
            const branch = repo.head.branch;
            let [remote, rbranch] = pos;
            const up = branch ? repo.upstream[branch] : null;
            if (!remote) {
                if (!up) {
                    if (Object.keys(repo.remotes).length === 0) return { code: 1, out: "There is no tracking information for the current branch.\nPlease specify which branch you want to merge with.\nSee git-pull(1) for details.\n\n    git pull <remote> <branch>\n\nIf you wish to set tracking information for this branch you can do so with:\n\n    git branch --set-upstream-to=<remote>/<branch> " + branch };
                    remote = Object.keys(repo.remotes)[0];
                    const fetchOut = this.fetchFrom(repo, remote);
                    return { code: 1, out: `${fetchOut ? `${fetchOut}\n` : ""}There is no tracking information for the current branch.\nPlease specify which branch you want to merge with.\nSee git-pull(1) for details.\n\n    git pull <remote> <branch>\n\nIf you wish to set tracking information for this branch you can do so with:\n\n    git branch --set-upstream-to=${remote}/<branch> ${branch}\n` };
                }
                remote = up.remote;
                rbranch = up.merge;
            }
            if (!rbranch) rbranch = up?.merge ?? branch;
            const fetchOut = this.fetchFrom(repo, remote);
            const theirs = repo.remoteRefs[`${remote}/${rbranch}`];
            if (!theirs) return { code: 1, out: `${fetchOut}\nfatal: couldn't find remote ref ${rbranch}`.trim() };
            const ours = this.headHash(repo);
            if (rebase === null) {
                const cfg = this.cfg(repo, "pull.rebase");
                if (cfg === "true") rebase = true;
                else if (cfg === "false") rebase = false;
            }
            if (!ffOnly && this.cfg(repo, "pull.ff") === "only") ffOnly = true;
            const prefix = fetchOut ? `${fetchOut}\n` : "";
            const diverged = ours && !this.isAncestor(ours, theirs) && !this.isAncestor(theirs, ours);
            if (diverged && rebase === null && !ffOnly) {
                return { code: 128, out: `${prefix}hint: You have divergent branches and need to specify how to reconcile them.\nhint: You can do so by running one of the following commands sometime before\nhint: your next pull:\nhint:\nhint:   git config pull.rebase false  # merge\nhint:   git config pull.rebase true   # rebase\nhint:   git config pull.ff only       # fast-forward only\nhint:\nhint: You can replace "git config" with "git config --global" to set a default\nhint: preference for all repositories. You can also pass --rebase, --no-rebase,\nhint: or --ff-only on the command line to override the configured default per\nhint: invocation.\nfatal: Need to specify how to reconcile divergent branches.` };
            }
            if (rebase && diverged) {
                const chg = this.changes(repo);
                if (chg.staged.length || chg.unstaged.length) return { code: 128, out: `${prefix}error: cannot pull with rebase: You have unstaged changes.\nerror: Please commit or stash them.` };
                const r = this.startRebase(repo, theirs, `${remote}/${rbranch}`);
                return { code: r.code, out: (prefix + (r.out ?? "")).trimEnd(), stdout: r.stdout };
            }
            const url = repo.remotes[remote] ?? remote;
            const r = this.doMerge(repo, theirs, `${remote}/${rbranch}`, { ffOnly, message: `Merge branch '${rbranch}' of ${url.replace(/\.git$/, "")}`, reflog: "pull", label: theirs });
            return { code: r.code, out: (prefix + (r.out ?? "")).trimEnd(), stdout: r.stdout };
        }

        gReflog(args = []) {
            const repo = this.needRepo();
            const deco = this.decorations(repo);
            let limit = Infinity;
            for (let i = 0; i < args.length; i += 1) {
                if (args[i] === "-n") limit = Number(args[++i]);
                else if (/^-\d+$/.test(args[i])) limit = Number(args[i].slice(1));
            }
            const out = repo.reflog.slice(0, limit).map((r, k) => `${this.short(r.hash)}${k === 0 && deco.has(r.hash) ? ` (${deco.get(r.hash).join(", ")})` : ""} HEAD@{${k}}: ${r.msg}`);
            return { code: 0, stdout: out.length ? `${out.join("\n")}\n` : "" };
        }

        // ---------- API для тестов ----------

        repo(path) {
            const repo = path ? this.repos.get(this.abs(path)) ?? this.findRepo(this.abs(path)) : this.findRepo();
            return repo ? new RepoView(this, repo) : null;
        }

        read(path) {
            const abs = this.abs(path);
            return this.files.has(abs) ? this.files.get(abs) : null;
        }

        exists(path) {
            const abs = this.abs(path);
            return this.files.has(abs) || this.dirs.has(abs);
        }

        remote(url) {
            const s = this.server(url);
            return s ? new ServerView(this, s) : null;
        }

        commands(filter) {
            return this.history.filter((h) => h.user === "student" && (!filter || h.cmd.startsWith(filter)));
        }

        get cwd() {
            return this.user.cwd;
        }
    }

    class RepoView {
        constructor(sim, repo) {
            this.sim = sim;
            this.r = repo;
        }

        get root() { return this.r.root; }

        get branch() { return this.r.head.branch ?? null; }

        get detached() { return this.r.head.branch === undefined; }

        head() { return this.sim.headHash(this.r); }

        commit(rev = "HEAD") {
            const h = this.sim.resolve(this.r, rev, true);
            return h ? this.view(h) : null;
        }

        view(h) {
            const c = this.sim.objects.get(h);
            return { hash: h, short: h.slice(0, 7), message: c.message, subject: c.message.split("\n")[0], parents: [...c.parents], files: { ...c.tree }, author: c.author.name, email: c.author.email };
        }

        log(rev = "HEAD") {
            const h = this.sim.resolve(this.r, rev, true);
            if (!h) return [];
            return this.sim.orderedCommits([h]).map((x) => this.view(x));
        }

        branches() { return Object.keys(this.r.heads).sort(); }

        tip(branch) { return this.r.heads[branch] ?? null; }

        remoteBranches() { return Object.keys(this.r.remoteRefs).sort(); }

        tags() { return Object.keys(this.r.tags).sort(); }

        tag(name) { return this.r.tags[name] ? { hash: this.r.tags[name].hash, message: this.r.tags[name].message ?? null } : null; }

        remotes() { return { ...this.r.remotes }; }

        upstream(branch = this.branch) { const u = this.r.upstream[branch]; return u ? `${u.remote}/${u.merge}` : null; }

        index() { return Object.fromEntries(this.r.index); }

        staged() {
            const head = this.sim.headTree(this.r);
            return [...new Set([...head.keys(), ...this.r.index.keys()])].filter((p) => head.get(p) !== this.r.index.get(p)).sort();
        }

        status() {
            const ch = this.sim.changes(this.r);
            return {
                staged: ch.staged.map((s) => s.path),
                modified: ch.unstaged.filter((u) => u.kind === "modified").map((u) => u.path),
                deleted: ch.unstaged.filter((u) => u.kind === "deleted").map((u) => u.path),
                untracked: ch.untracked,
                conflicts: ch.unmerged,
                clean: !ch.staged.length && !ch.unstaged.length && !ch.untracked.length && !ch.unmerged.length,
            };
        }

        config(key) { return this.sim.cfg(this.r, key) ?? null; }

        isIgnored(path) { return this.sim.isIgnored(this.r, path); }

        state() { return this.r.state ? this.r.state.kind : null; }

        stash() { return this.r.stash.map((s) => s.label); }

        isAncestor(a, b) {
            const x = this.sim.resolve(this.r, a, true);
            const y = this.sim.resolve(this.r, b, true);
            return Boolean(x && y && this.sim.isAncestor(x, y));
        }

        reflog() { return this.r.reflog.map((e) => e.msg); }
    }

    class ServerView {
        constructor(sim, server) {
            this.sim = sim;
            this.s = server;
        }

        get url() { return this.s.url; }

        branches() { return Object.keys(this.s.heads).sort(); }

        tags() { return Object.keys(this.s.tags).sort(); }

        tag(name) { const t = this.s.tags[name]; return t ? { hash: t.hash, message: t.message ?? null } : null; }

        tip(branch) { return this.s.heads[branch] ?? null; }

        log(branch = this.s.head) {
            const h = this.s.heads[branch];
            if (!h) return [];
            return this.sim.orderedCommits([h]).map((x) => {
                const c = this.sim.objects.get(x);
                return { hash: x, short: x.slice(0, 7), message: c.message, subject: c.message.split("\n")[0], parents: [...c.parents], files: { ...c.tree }, author: c.author.name };
            });
        }

        files(branch = this.s.head) {
            const h = this.s.heads[branch];
            return h ? { ...this.sim.objects.get(h).tree } : {};
        }
    }

    GitSim.VERSION = GIT_VERSION;
    GitSim.GitError = GitError;
    GitSim.merge3 = merge3;
    return GitSim;
});
