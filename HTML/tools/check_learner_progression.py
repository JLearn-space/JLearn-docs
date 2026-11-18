"""Check learner artifacts against the cumulative HTML concepts taught so far."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,re
R=Path(__file__).resolve().parents[1];issues=[];records=[]
introduced={1:set('html head meta title body h1 p'.split()),2:set('h2 h3 h4 h5 h6 br hr strong em b i mark small ul ol li dl dt dd header nav main section article aside footer div'.split()),3:{'a'},4:set('img figure figcaption audio video source link'.split()),5:set('table caption thead tbody tfoot tr td th'.split()),6:set('form label input'.split()),7:set('select option optgroup textarea fieldset legend button'.split()),8:{'span'},9:{'script','pre','code'},10:set()}
attrs_min={'href':3,'target':3,'rel':3,'src':4,'alt':4,'width':4,'height':4,'controls':4,'poster':4,'colspan':5,'rowspan':5,'scope':5,'method':6,'action':6,'for':6,'name':1,'value':6,'required':6,'placeholder':6,'min':7,'max':7,'pattern':7,'maxlength':7,'rows':7,'cols':7,'selected':7,'multiple':7,'tabindex':8,'role':8,'style':8,'defer':9,'async':9}
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.tags=set();self.attrs=[];self.ids=[];self.refs=[];self.lang=None
 def handle_starttag(self,tag,attrs):
  self.tags.add(tag);a=dict(attrs)
  if tag=='html':self.lang=a.get('lang')
  if a.get('id'):self.ids.append(a['id'])
  for k,v in attrs:
   self.attrs.append(k)
   if k in ['href','src','poster'] and v:self.refs.append(v)
for lang in ['ru','en','uz']:
 for n in range(1,11):
  folder=R/'learner-journey'/lang/f'lesson-{n:02}'
  allowed=set.union(*(introduced[i] for i in range(1,n+1)))
  for p in sorted(folder.rglob('*.html')):
   parser=Parser();parser.feed(p.read_text());bad=[]
   for tag in parser.tags-allowed:bad.append(f'tag {tag} not introduced before lesson {n}')
   for attr in set(parser.attrs):
    minimum=8 if attr.startswith('aria-') else attrs_min.get(attr,1)
    if minimum>n:bad.append(f'attribute {attr} belongs to lesson {minimum}')
   if parser.lang!=lang:bad.append('document language does not match')
   if len(parser.ids)!=len(set(parser.ids)):bad.append('duplicate ID')
   for href in parser.refs:
    u=urlsplit(href)
    if u.scheme or href.startswith('/'):continue
    q=(p.parent/unquote(u.path)).resolve() if u.path else p
    if not q.exists():bad.append('missing local target '+href)
    elif u.fragment and q.suffix=='.html':
     target=Parser();target.feed(q.read_text())
     if unquote(u.fragment) not in target.ids:bad.append('missing fragment '+href)
   record={'file':str(p.relative_to(R)),'lesson':n,'lang':lang,'issues':bad};records.append(record)
   if bad:issues.append(record)
report={'files':len(records),'independent_lesson_sets':30,'issues':issues,'records':records,'scope':'Automated tag/attribute and local-reference guardrail; semantic dependency and comprehension review is recorded in journals.'}
(R/'learner-journey/evidence/progression-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps({'files':len(records),'issues':issues},ensure_ascii=False,indent=2));raise SystemExit(bool(issues))
