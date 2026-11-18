"""Structural, local-resource and curriculum guardrails for the course."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote,urlsplit
from markdown_it import MarkdownIt
import re,json
R=Path(__file__).resolve().parents[1]; failures=[];links=0;pages=0;diagrams=0
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.refs=[];self.ids=[];self.labels=[];self.fields=[];self.headings=[];self.lang=None
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='html':self.lang=a.get('lang')
  if 'id' in a:self.ids.append(a['id'])
  if tag in ['a','link'] and 'href' in a:self.refs.append(a['href'])
  if tag in ['img','source','script'] and 'src' in a:self.refs.append(a['src'])
  if tag=='video' and 'poster' in a:self.refs.append(a['poster'])
  if tag=='label' and 'for' in a:self.labels.append(a['for'])
  if tag in ['input','select','textarea']:self.fields.append(a)
  if tag=='h1':self.headings.append(tag)
def checkref(p,href):
 global links
 if not href or href.startswith(('http:','https:','mailto:','tel:','data:','/')):return
 target=urlsplit(href);q=(p.parent/unquote(target.path)).resolve() if target.path else p
 links+=1
 if not q.exists():failures.append(f'Missing resource: {p.relative_to(R)} -> {href}')
 elif target.fragment and q.suffix=='.html':
  parser=Parser();parser.feed(q.read_text())
  if unquote(target.fragment) not in parser.ids:failures.append(f'Missing anchor: {p.relative_to(R)} -> {href}')
md=MarkdownIt('commonmark',{'html':False}).enable('table')
for p in R.glob('Lesson-*/*/*.md'):
 pages+=1;s=p.read_text();lang=p.parent.name
 if not re.match(r'^# [^#]',s):failures.append(f'No H1: {p}')
 if len(re.findall(r'^```',s,re.M))%2:failures.append(f'Unbalanced fence: {p}')
 if re.search(r'^##\s+(?:Блок|Block|Blok)\s*\d',s,re.M):failures.append(f'Numbered block: {p}')
 terms={'ru':['Самостоятельная работа','Критерии готовности'],'en':['Independent','criteria'],'uz':['Mustaqil','mezon']}
 for term in (terms[lang] if p.parent.parent.name!='Lesson-10' else {'ru':['Независимый','балл'],'en':['Independent','points'],'uz':['Mustaqil','ball']}[lang]):
  if term.lower() not in s.lower():failures.append(f'Missing {term}: {p}')
 for t in md.parse(s):
  if t.type=='fence' and t.info.strip()=='mermaid':diagrams+=1
  for c in t.children or []:
   if c.type=='link_open':checkref(p,c.attrGet('href') or '')
for p in [R/'README.md',R/'COURSE_MAP.md',R/'REFERENCES.md',R/'NOVICE_REVIEW.md',*(R/'learner-journey').rglob('*.md')]:
 if not p.exists():continue
 for t in md.parse(p.read_text()):
  for c in t.children or []:
   if c.type=='link_open':checkref(p,c.attrGet('href') or '')
for p in [*R.glob('Lesson-*/*.html'),*R.glob('reading/*.html')]:
 parser=Parser();parser.feed(p.read_text())
 if len(parser.ids)!=len(set(parser.ids)):failures.append(f'Duplicate IDs: {p.relative_to(R)}')
 if not parser.lang:failures.append(f'No lang: {p.relative_to(R)}')
 if len(parser.headings)!=1:failures.append(f'H1 count {len(parser.headings)}: {p.relative_to(R)}')
 for label in parser.labels:
  if label not in parser.ids:failures.append(f'Orphan label {label}: {p}')
 for href in parser.refs:checkref(p,href)
if pages!=30:failures.append(f'Expected 30 lessons: {pages}')
report={'lesson_versions':pages,'diagram_sources':diagrams,'local_links_and_resources':links,'failures':failures}
(R/'course-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2));raise SystemExit(bool(failures))
