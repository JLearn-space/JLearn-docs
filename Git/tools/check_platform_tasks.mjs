#!/usr/bin/env node
import { spawnSync } from "node:child_process";
// Эмулятор JsTaskChecker: проверяет задания IDE в platform/**/lesson-NN.json.
// Окружение "git": код ученика - команды терминала, их выполняет учебный симулятор tools/gitsim/gitsim.js.
// Эталон должен проходить все тесты, ошибочные решения и стартовый код - нет.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
// Библиотеки, которые платформа подключает к странице задания до кода ученика.
const LIBRARIES = {};
const GitSim = createRequire(import.meta.url)(path.join(path.dirname(fileURLToPath(import.meta.url)), "gitsim/gitsim.js"));

export function stripComments(code) {
    // Учитывает строки и шаблонные строки, чтобы не резать "http://..."
    let out = "";
    let i = 0;
    let quote = null;
    while (i < code.length) {
        const ch = code[i];
        const next = code[i + 1];
        if (quote) {
            out += ch;
            if (ch === "\\") { out += next ?? ""; i += 2; continue; }
            if (ch === quote) quote = null;
            i += 1;
            continue;
        }
        if (ch === "\"" || ch === "'" || ch === "`") { quote = ch; out += ch; i += 1; continue; }
        if (ch === "/" && next === "/") { while (i < code.length && code[i] !== "\n") i += 1; continue; }
        if (ch === "/" && next === "*") {
            const end = code.indexOf("*/", i + 2);
            i = end === -1 ? code.length : end + 2;
            continue;
        }
        out += ch;
        i += 1;
    }
    return out;
}

function format(value) {
    if (typeof value === "string") return value;
    if (typeof value === "object" && value !== null) {
        try { return JSON.stringify(value); } catch { return String(value); }
    }
    return String(value);
}

function makeContext(task) {
    const logs = [];
    const fakeConsole = {};
    for (const m of ["log", "info", "warn", "error"]) {
        fakeConsole[m] = (...args) => { logs.push(args.map(format).join(" ")); };
    }
    if (task.environment === "dom") {
        let JSDOM;
        let VirtualConsole;
        try { ({ JSDOM, VirtualConsole } = require(path.join(ROOT, "tools/node_modules/jsdom"))); }
        catch { return null; }
        // Ошибки внутри обработчиков событий jsdom не бросает, а сообщает в virtualConsole.
        // Записываем их в __error, как ошибку в консоли браузера.
        const virtualConsole = new VirtualConsole();
        const dom = new JSDOM(task.html ?? "<!DOCTYPE html><html><body></body></html>", { runScripts: "outside-only", url: "https://ide.jlearn.space/", virtualConsole });
        virtualConsole.on("jsdomError", (err) => {
            const cause = err?.detail ?? err;
            dom.window.__error = `${cause?.name ?? "Error"}: ${cause?.message ?? cause}`;
        });
        const ctx = dom.getInternalVMContext();
        dom.window.console = fakeConsole;
        dom.window.__logs = logs;
        for (const lib of task.libraries ?? []) {
            const file = LIBRARIES[lib];
            if (!file) throw new Error(`неизвестная библиотека ${lib}`);
            vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), ctx, { filename: `${lib}.js` });
        }
        return { ctx, logs, dom };
    }
    const ctx = vm.createContext({ console: fakeConsole, __logs: logs });
    return { ctx, logs };
}

// Комментарии в сценарии терминала: строки и хвосты после # вне кавычек.
export function stripShellComments(code) {
    return code.split("\n").map((line) => {
        let quote = null;
        for (let i = 0; i < line.length; i += 1) {
            const c = line[i];
            if (quote) { if (c === quote) quote = null; } else if (c === "'" || c === "\"") quote = c;
            else if (c === "#" && (i === 0 || /\s/.test(line[i - 1]))) return line.slice(0, i).trimEnd();
        }
        return line;
    }).filter((l) => l.trim() !== "").join("\n");
}

// Задание по Git: новый симулятор на каждый тест, setup (JS) готовит состояние, код ученика - сценарий терминала.
export function runGitTask(task, code) {
    const result = { forbidden: [], error: null, tests: [] };
    const clean = stripShellComments(code);
    for (const bad of task.forbidden ?? []) if (clean.includes(bad)) result.forbidden.push(bad);
    const execute = (setup) => {
        const sim = new GitSim({ lang: task.lang ?? "ru" });
        const ctx = vm.createContext({ sim, GitSim, console: { log() {} } });
        if (setup) vm.runInContext(setup, ctx, { filename: "setup.js" });
        sim.output = "";
        sim.history = [];
        let error = null;
        try { sim.run(code); } catch (err) { error = `${err?.name ?? "Error"}: ${err?.message ?? err}`; }
        Object.assign(ctx, { repo: sim.repo(), __output: sim.output, __code: clean, __error: error, __commands: sim.commands() });
        return { ctx, error };
    };
    const main = execute(task.setup ?? "");
    result.error = main.error;
    for (const t of task.tests) {
        const { ctx } = t.setup ? execute(t.setup) : execute(task.setup ?? "");
        let ok = false;
        try { ok = vm.runInContext(`(${t.check})`, ctx, { timeout: 1000 }) === true; } catch { ok = false; }
        result.tests.push({ name: t.name, ok });
    }
    result.passed = result.forbidden.length === 0 && result.tests.every((t) => t.ok);
    return result;
}

export function runTask(task, code) {
    if (task.environment === "git") return runGitTask(task, code);
    const result = { forbidden: [], error: null, tests: [] };
    const clean = stripComments(code);
    for (const bad of task.forbidden ?? []) {
        if (clean.includes(bad)) result.forbidden.push(bad);
    }
    // Каждый набор входных данных (setup) - отдельный чистый запуск кода ученика.
    const runs = new Map();
    // В DOM-заданиях тесты кликают и меняют страницу, поэтому каждый тест получает свою свежую страницу.
    const execute = (setup, key = setup) => {
        if (runs.has(key)) return runs.get(key);
        const env = makeContext(task);
        if (!env) return null;
        const { ctx } = env;
        vm.runInContext(`var __code = ${JSON.stringify(clean)}; var __error = null;`, ctx);
        if (setup) vm.runInContext(setup, ctx, { filename: "setup.js" });
        let error = null;
        try {
            vm.runInContext(code, ctx, { timeout: task.timeout_ms ?? 2000, filename: "student.js" });
        } catch (err) {
            error = `${err?.name ?? "Error"}: ${err?.message ?? err}`;
            vm.runInContext(`__error = ${JSON.stringify(error)};`, ctx);
        }
        const run = { ctx, error, dom: env.dom };
        runs.set(key, run);
        return run;
    };
    const main = execute(task.setup ?? "");
    if (!main) return { skipped: "jsdom не установлен" };
    result.error = main.error;
    for (const [idx, t] of task.tests.entries()) {
        const setup = t.setup ?? task.setup ?? "";
        const { ctx } = execute(setup, task.environment === "dom" ? `#${idx}\n${setup}` : setup);
        let ok = false;
        try { ok = vm.runInContext(`(${t.check})`, ctx, { timeout: 1000 }) === true; }
        catch { ok = false; }
        result.tests.push({ name: t.name, ok });
    }
    result.passed = result.forbidden.length === 0 && result.tests.every((t) => t.ok);
    // Закрываем страницы: иначе таймеры и окна jsdom копятся и съедают память
    for (const run of runs.values()) run.dom?.window.close();
    return result;
}

function checkTest(test, problems) {
    const qs = test?.questions ?? [];
    if (qs.length !== 12) problems.push(`в тесте ${qs.length} вопросов, нужно 12`);
    if (test?.pass_percent !== 70) problems.push("pass_percent должен быть 70");
    qs.forEach((q, i) => {
        const n = i + 1;
        if (!q.question) problems.push(`вопрос ${n}: нет текста`);
        if (!q.explanation) problems.push(`вопрос ${n}: нет пояснения`);
        if (q.type === "single" && !(Number.isInteger(q.answer) && q.options?.[q.answer] !== undefined)) problems.push(`вопрос ${n}: неверный индекс ответа`);
        if (q.type === "multiple" && !(Array.isArray(q.answer) && q.answer.length > 1 && q.answer.every((c) => q.options?.[c] !== undefined))) problems.push(`вопрос ${n}: неверные индексы ответов`);
        if (q.type === "matching" && !(Array.isArray(q.pairs) && q.pairs.length >= 3 && q.pairs.every((p) => p.length === 2))) problems.push(`вопрос ${n}: нужны пары`);
        if (q.type === "input" && !(Array.isArray(q.answers) && q.answers.length > 0)) problems.push(`вопрос ${n}: нет допустимых ответов`);
        if (!["single", "multiple", "matching", "input"].includes(q.type)) problems.push(`вопрос ${n}: неизвестный тип ${q.type}`);
    });
    const types = new Set(qs.map((q) => q.type));
    if (types.size < 4) problems.push(`в тесте ${types.size} типа вопросов, нужно 4`);
    qs.forEach(() => {
    });
}

function main() {
    const files = [];
    for (const dir of ["platform", "platform/uz", "platform/en"]) {
        const abs = path.join(ROOT, dir);
        if (!fs.existsSync(abs)) continue;
        for (const f of fs.readdirSync(abs).sort()) {
            if (/^lesson-\d\d\.json$/.test(f)) files.push(path.join(dir, f));
        }
    }
    let failures = 0;
    // Каждый файл проверяется в отдельном процессе: jsdom с jQuery занимает много памяти,
    // и в одном процессе десятки тысяч страниц не помещаются.
    for (const rel of files) {
        const child = spawnSync(process.execPath, [fileURLToPath(import.meta.url), rel], { stdio: "inherit" });
        if (child.status !== 0) failures += 1;
    }
    // Версии на трёх языках должны совпадать по структуре: тесты, окружение, вопросы и верные ответы.
    for (let n = 1; n <= 10; n += 1) {
        const name = `lesson-${String(n).padStart(2, "0")}.json`;
        const ruPath = path.join(ROOT, "platform", name);
        if (!fs.existsSync(ruPath)) continue;
        const shape = (d) => JSON.stringify({
            env: d.task.environment,
            libs: d.task.libraries ?? [],
            tests: d.task.tests.map((t) => Boolean(t.setup)),
            wrong: d.task.wrong_solutions.length,
            // Для вопросов с вводом число допустимых ответов зависит от языка и не сравнивается.
            questions: d.test.questions.map((q) => [q.type, q.answer ?? null, q.options?.length ?? q.pairs?.length ?? null]),
        });
        const ru = shape(JSON.parse(fs.readFileSync(ruPath, "utf8")));
        for (const lang of ["uz", "en"]) {
            const p = path.join(ROOT, "platform", lang, name);
            if (!fs.existsSync(p)) continue;
            const data = JSON.parse(fs.readFileSync(p, "utf8"));
            const problems = [];
            if (shape(data) !== ru) problems.push("структура отличается от русской версии");
            if (data.language !== lang) problems.push(`language = ${data.language}`);
            if (problems.length) {
                failures += 1;
                console.log(`FAIL platform/${lang}/${name}: ${problems.join("; ")}`);
            }
        }
    }
    console.log(failures ? `\nОшибок: ${failures}` : `\nВсе файлы прошли проверку (${files.length}), языковые версии совпадают.`);
    process.exitCode = failures ? 1 : 0;
}

function checkFile(rel) {
    const data = JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
    const task = data.task;
    const problems = [];
    const sol = runTask(task, task.solution);
    if (sol.skipped) { console.log(`SKIP ${rel}: ${sol.skipped}`); return true; }
    if (!sol.passed) problems.push(`эталон не проходит: ${JSON.stringify(sol)}`);
    if (runTask(task, task.starter_code).passed) problems.push("стартовый код засчитывается");
    for (const w of task.wrong_solutions ?? []) {
        if (runTask(task, w.code).passed) problems.push(`ошибочное решение засчитывается: ${w.mistake}`);
    }
    checkTest(data.test, problems);
    if (problems.length) {
        console.log(`FAIL ${rel}`);
        for (const p of problems) console.log(`  - ${p}`);
        return false;
    }
    console.log(`ok   ${rel}: ${task.tests.length} тестов, ${(task.wrong_solutions ?? []).length} ошибочных решений`);
    return true;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    // node check_platform_tasks.mjs platform/uz/lesson-03.json - проверить один файл
    if (process.argv[2]) process.exit(checkFile(process.argv[2]) ? 0 : 1);
    main();
}
