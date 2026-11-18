"""Проверка структуры курса CSS: заголовки, разделы, схемы, локальные ссылки.

Запуск: python3 tools/check_course.py  (нужен markdown-it-py)
"""
from pathlib import Path
from urllib.parse import unquote, urlsplit
from markdown_it import MarkdownIt
import json, re

R = Path(__file__).resolve().parents[1]
md = MarkdownIt('commonmark', {'html': False}).enable('table')
fails, links, diagrams = [], 0, 0

def check_link(page, href):
    global links
    if not href or href.startswith(('http:', 'https:', 'mailto:', 'tel:', '#')):
        return
    target = (page.parent / unquote(urlsplit(href).path)).resolve()
    links += 1
    if not target.exists():
        fails.append(f'Нет файла: {page.relative_to(R)} -> {href}')

REQUIRED = {
    'ru': ['Зачем это вам', 'Чему вы научитесь', 'Повторение', 'План урока', 'Самостоятельная работа',
           'Задание в IDE', 'Вопросы для самопроверки', 'Ответы'],
    'uz': ['Bu sizga nima uchun kerak', 'Nimani o‘rganasiz', 'Takrorlash', 'Reja', 'Mustaqil ish',
           'IDE topshirig‘i', 'O‘zini tekshirish uchun savollar', 'Javoblar'],
    'en': ['Why you need this', 'What you will learn', 'Review', 'Lesson plan', 'Independent work',
           'IDE task', 'Self-check questions', 'Answers'],
}
CRITERIA = {'ru': 'Критерии готовности', 'uz': 'Tayyorlik mezonlari', 'en': 'Acceptance criteria'}
EXAM = {'ru': ('Независимый', 'балл'), 'uz': ('Mustaqil yakuniy imtihon', 'ball'), 'en': ('Independent final exam', 'points')}
lessons = sorted(p for lang in REQUIRED for p in R.glob(f'Lesson-*/{lang}/*.md'))
per_lang = {lang: 0 for lang in REQUIRED}
for p in lessons:
    s = p.read_text()
    lang = p.parts[-2]
    per_lang[lang] += 1
    if not re.match(r'^# [^#]', s):
        fails.append(f'Нет заголовка H1: {p.relative_to(R)}')
    if len(re.findall(r'^# ', s, re.M)) != 1:
        fails.append(f'Больше одного H1: {p.relative_to(R)}')
    if re.search(r'^##\s+(Блок|Хронометраж)', s, re.M):
        fails.append(f'Старые заголовки «Блок»/«Хронометраж»: {p.relative_to(R)}')
    if '{{NAV}}' in s:
        fails.append(f'Не подставлена навигация: {p.relative_to(R)}')
    for part in REQUIRED[lang]:
        if part not in s:
            fails.append(f'Нет раздела «{part}»: {p.relative_to(R)}')
    if p.parts[-3] == 'Lesson-10' and (EXAM[lang][0] not in s or EXAM[lang][1] not in s.lower()):
        fails.append(f'Урок 10 ({lang}): нет независимого экзамена с баллами')
    elif CRITERIA[lang] not in s and p.parts[-3] != 'Lesson-10':
        fails.append(f'Нет критериев готовности: {p.relative_to(R)}')
    if len(re.findall(r'^```', s, re.M)) % 2:
        fails.append(f'Незакрытый блок кода: {p.relative_to(R)}')
    n = 0
    for t in md.parse(s):
        if t.type == 'fence' and t.info.strip() == 'mermaid':
            n += 1
        for c in t.children or []:
            if c.type == 'link_open':
                check_link(p, c.attrGet('href'))
    diagrams += n
    if n < 2:
        fails.append(f'Меньше двух схем: {p.relative_to(R)}')

for p in [R / 'README.md', R / 'COURSE_MAP.md', R / 'platform' / 'README.md', R / 'final-project' / 'README.md']:
    for t in md.parse(p.read_text()):
        for c in t.children or []:
            if c.type == 'link_open':
                check_link(p, c.attrGet('href'))

for lang, count in per_lang.items():
    if count != 10:
        fails.append(f'Уроков ({lang}) {count}, ожидается 10')
report = {'lessons': per_lang, 'diagrams': diagrams, 'local_links': links, 'failures': fails}
(R / 'course-check.json').write_text(json.dumps(report, ensure_ascii=False, indent=2))
print(json.dumps(report, ensure_ascii=False, indent=2))
raise SystemExit(bool(fails))
