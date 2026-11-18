"""Эмулятор серверной проверки JLearn (HtmlTaskChecker) для заданий курса.

Для каждого platform/lesson-NN.json проверяет:
  * эталонное решение (task.solution) проходит все правила;
  * стартовый код (task.starter_code) НЕ проходит;
  * каждое ошибочное решение из task.wrong_solutions НЕ проходит;
  * тест: 12 вопросов, все 4 типа, ответы корректно указаны.

Разбор, как на платформе: комментарии вырезаются, разметка разбирается libxml
(lxml.html), ничего не выполняется. Ключи правил совпадают с HtmlTaskChecker:
required, forbidden, tags, attrs, text, h1_exact, h2_required, for_id_pairs,
scope_values, button_submit, empty_link_a11y, href_targets, input_types.
Запуск: python3 tools/check_platform_tasks.py
"""
import json, re, sys
from pathlib import Path
from lxml import html as LH

R = Path(__file__).resolve().parents[1]

def strip_comments(code):
    return re.sub(r'<!--.*?-->', '', code, flags=re.S)

def visible_text(el):
    skip = {'script', 'style', 'head', 'template'}
    out = []
    def walk(n):
        if not isinstance(n.tag, str):
            return
        if n.tag in skip or n.get('hidden') is not None:
            if n.tail: out.append(n.tail)
            return
        if n.text: out.append(n.text)
        for c in n: walk(c)
        if n.tail: out.append(n.tail)
    walk(el)
    return re.sub(r'\s+', ' ', ''.join(out)).lower()

def check(code, rules):
    missing = []
    code = strip_comments(code or '')
    if not code.strip():
        return False, ['Код пустой']
    try:
        doc = LH.document_fromstring(code)
    except Exception:
        return False, ['HTML не удалось разобрать']
    low = code.lower()
    has_doctype = bool(re.match(r'\s*<!doctype\s+html\s*>', code, re.I))
    for s in rules.get('required', []):
        if s.lower() == '<!doctype html>':
            if not has_doctype: missing.append('required: <!DOCTYPE html>')
        elif s.lower() not in low:
            missing.append(f'required: {s}')
    for s in rules.get('forbidden', []):
        if s.lower() in low: missing.append(f'forbidden: {s}')
    for tag, n in rules.get('tags', {}).items():
        if len(list(doc.iter(tag))) < n:
            missing.append(f'tags: <{tag}> ×{n}')
    for tag, attrs in rules.get('attrs', {}).items():
        for a in attrs:
            if not any(e.get(a) is not None for e in doc.iter(tag)):
                missing.append(f'attrs: <{tag} {a}>')
    vt = visible_text(doc)
    for s in rules.get('text', []):
        if s.lower() not in vt: missing.append(f'text: {s}')
    if 'h1_exact' in rules and len(list(doc.iter('h1'))) != rules['h1_exact']:
        missing.append(f"h1_exact: {rules['h1_exact']}")
    if 'h2_required' in rules and len(list(doc.iter('h2'))) < rules['h2_required']:
        missing.append(f"h2_required: {rules['h2_required']}")
    if rules.get('for_id_pairs'):
        ids = {e.get('id') for e in doc.iter() if isinstance(e.tag, str) and e.get('id')}
        labels = [l.get('for') for l in doc.iter('label')]
        if not labels or any(f not in ids for f in labels):
            missing.append('for_id_pairs')
    for v in rules.get('scope_values', []):
        if not any((th.get('scope') or '').lower() == v for th in doc.iter('th')):
            missing.append(f'scope_values: {v}')
    if rules.get('button_submit'):
        if not any((b.get('type') or '').lower() == 'submit' for b in doc.iter('button')):
            missing.append('button_submit')
    if rules.get('empty_link_a11y'):
        ok = False
        for a in doc.iter('a'):
            if not a.text_content().strip() and a.get('aria-label', '').strip():
                ok = True
        if not ok: missing.append('empty_link_a11y')
    hrefs = [a.get('href') for a in doc.iter('a')]
    for h in rules.get('href_targets', []):
        if h not in hrefs: missing.append(f'href_targets: {h}')
    types = {(i.get('type') or 'text').lower() for i in doc.iter('input')}
    for t in rules.get('input_types', []):
        if t not in types: missing.append(f'input_types: {t}')
    return not missing, missing

def check_test(t, name, fails):
    qs = t.get('questions', [])
    kinds = {q['type'] for q in qs}
    if len(qs) != 12: fails.append(f'{name}: вопросов {len(qs)}, нужно 12')
    if kinds != {'single', 'multiple', 'matching', 'input'}:
        fails.append(f'{name}: типы {sorted(kinds)}')
    for i, q in enumerate(qs, 1):
        if q['type'] == 'single' and not (0 <= q['answer'] < len(q['options'])):
            fails.append(f'{name} q{i}: answer вне options')
        if q['type'] == 'multiple' and (len(q['answer']) < 2 or max(q['answer']) >= len(q['options'])):
            fails.append(f'{name} q{i}: multiple должен иметь ≥2 верных')
        if q['type'] == 'matching' and len(q['pairs']) < 3:
            fails.append(f'{name} q{i}: мало пар')
        if q['type'] == 'input' and not q.get('answers'):
            fails.append(f'{name} q{i}: нет answers')
        if not q.get('explanation'):
            fails.append(f'{name} q{i}: нет explanation')

def main():
    fails, report = [], []
    files = sorted((R / 'platform').glob('lesson-*.json'))
    for f in files:
        d = json.loads(f.read_text())
        t, rules = d['task'], d['task']['rules']
        ok, miss = check(t['solution'], rules)
        if not ok: fails.append(f'{f.name}: эталон не прошёл {miss}')
        ok, _ = check(t['starter_code'], rules)
        if ok: fails.append(f'{f.name}: стартовый код проходит проверку')
        for i, w in enumerate(t.get('wrong_solutions', []), 1):
            ok, _ = check(w['code'], rules)
            if ok: fails.append(f"{f.name}: ошибочное решение {i} ({w['mistake']}) проходит")
        check_test(d['test'], f.name, fails)
        report.append({'file': f.name, 'rules': len(rules), 'wrong_solutions': len(t.get('wrong_solutions', []))})
    out = {'tasks': len(files), 'details': report, 'failures': fails}
    (R / 'platform' / 'platform-check.json').write_text(json.dumps(out, ensure_ascii=False, indent=2))
    print(json.dumps(out, ensure_ascii=False, indent=2))
    sys.exit(bool(fails))

if __name__ == '__main__':
    main()
