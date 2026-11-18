"""Build the offline reading edition from the three Markdown source versions."""
from pathlib import Path
from markdown_it import MarkdownIt
from html import escape
from urllib.parse import unquote,quote
import re,json
R=Path(__file__).resolve().parents[1];O=R/'reading'; O.mkdir(exist_ok=True)
md=MarkdownIt('commonmark',{'html':False,'xhtmlOut':False}).enable('table')
css='''*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:2rem}body{margin:0;background:#f6f7fb;color:#202a3b;font:17px/1.8 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}a{color:#3730a3;text-underline-offset:.2em}a:hover{color:#7c3aed}header{background:#172554;color:white;padding:2.3rem max(5vw,1.5rem)}header p{max-width:70ch;color:#dbeafe}header a{color:white}main{display:grid;grid-template-columns:260px minmax(0,850px);max-width:1200px;gap:3rem;margin:3rem auto;padding:0 1.5rem}aside{position:sticky;top:1.5rem;align-self:start;font-size:14px;max-height:90vh;overflow:auto}aside a{display:block;padding:.4rem .8rem;text-decoration:none;border-radius:6px}aside a:hover{background:#e0e7ff}article{background:white;padding:clamp(1.5rem,4vw,3.5rem);border:1px solid #e2e8f0;border-radius:16px;min-width:0;box-shadow:0 6px 24px #17255406}h1,h2,h3,h4{line-height:1.3;color:#172554;letter-spacing:-.02em}h1{font-size:2.3rem;margin:0 0:1.5rem}h2{font-size:1.65rem;margin:3rem 0 1.2rem;padding-top:1rem;border-top:1px solid #e2e8f0}h3{font-size:1.16rem;margin:2rem 0 .7rem}p,ul,ol{margin:.9rem 0}li{padding:.15rem 0}li.check{list-style:none;margin-left:-1.2rem}li.check input{accent-color:#4338ca;width:1rem;height:1rem;margin-right:.35rem}blockquote{border-left:4px solid #6366f1;background:#eef2ff;padding:.7rem 1.3rem;margin:1.4rem 0;border-radius:0 8px 8px 0}pre{background:#111d32;color:#e2e8f0;border-radius:10px;padding:1.3rem;overflow:auto;font:14px/1.65 ui-monospace,SFMono-Regular,Consolas,monospace}code{font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:.88em}p code,li code,td code{background:#eef2ff;padding:.15em .3em;border-radius:4px}table{border-collapse:collapse;width:100%;font-size:15px;display:block;overflow:auto;margin:1.5rem 0}th{text-align:left;background:#eef2ff;color:#172554}td,th{border:1px solid #dbe2ee;padding:.7rem .85rem;vertical-align:top}tr:nth-child(even){background:#f8fafc}hr{display:none}header .lesson-meta{color:#c7d2fe}header>a{font-size:1.15rem;font-weight:600}figure{margin:2rem 0;padding:1rem;border:1px solid #dbe2ee;border-radius:10px;background:#fff;overflow:auto}figure img{display:block;height:auto;margin:auto}.diagram-viewport{overflow-x:auto;padding:.75rem .25rem;max-width:100%}.diagram-viewport img{max-width:none}.diagram-viewport:focus-visible{outline:3px solid #4338ca;outline-offset:3px}figure figcaption a{display:inline-block;margin-left:.8rem}figcaption{font-size:13px;color:#526079;margin-top:.6rem}.lesson-meta{font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:.12em}footer{max-width:850px;margin:2rem auto;padding:1rem 1.5rem;color:#526079;font-size:14px}.diagram-error{background:#fee2e2;color:#991b1b;padding:1rem}@media(max-width:900px){main{display:block;margin:1rem auto}aside{position:static;max-height:none;margin:1rem 0 2rem}aside details{background:#eef2ff;padding:.8rem;border-radius:8px}article{padding:1.3rem}h1{font-size:1.9rem}header{padding:1.5rem}}@media print{body{background:white;font-size:11pt}header,aside,footer{display:none}main{display:block;margin:0;padding:0}article{border:0;box-shadow:none;padding:0}pre{white-space:pre-wrap;break-inside:avoid;background:#f1f5f9;color:#172554}figure,table{break-inside:avoid}a{color:inherit}h2,h3{break-after:avoid}}'''.replace('margin:0 0:1.5rem','margin:0 0 1.5rem')
(O/'style.css').write_text(css)
files=[R/'README.md']+sorted(R.glob('Lesson-*/*/*.md'),key=lambda p:(int(p.parts[-3].split('-')[1]),p.parts[-2]))
mapnames={str(p.relative_to(R)):('index.html' if p.name=='README.md' else f'{p.parent.name}-{p.parent.parent.name.lower()}.html') for p in files}
diagrams=[]
labels={'ru':('HTML за 10 уроков','Учебное издание · Русский','Содержание урока','Схема','Открыть исходный Markdown','Схема с горизонтальной прокруткой','Открыть схему отдельно'),'en':('HTML in 10 lessons','Reading edition · English','On this page','Diagram','Open Markdown source','Diagram with horizontal scrolling','Open diagram separately'),'uz':('HTML — 10 darsda','O‘qish nashri · O‘zbekcha','Dars mazmuni','Chizma','Markdown manbasini ochish','Gorizontal aylantiriladigan chizma','Chizmani alohida ochish')}
for p in files:
    lang=p.parent.name if p.name!='README.md' else 'ru';lab=labels[lang];src=p.read_text(); headings=[];counter=[0];diagramcounter=[0]
    tokens=md.parse(src)
    for i,t in enumerate(tokens):
        if t.type=='heading_open':
            counter[0]+=1;anchor=f'section-{counter[0]}';t.attrSet('id',anchor)
            if t.tag=='h2': headings.append((anchor,tokens[i+1].content))
        if t.type=='inline':
            for child in t.children or []:
                if child.type=='link_open':
                    href=child.attrGet('href') or ''
                    if not re.match(r'\w+:|#|/',href):
                        target=(p.parent/unquote(href.split('#')[0])).resolve()
                        try:rel=str(target.relative_to(R))
                        except ValueError:continue
                        if rel in mapnames:child.attrSet('href',mapnames[rel])
                        else:child.attrSet('href','../'+rel)
        if t.type=='fence' and t.info.strip()=='mermaid':
            diagramcounter[0]+=1;ident=f'{lang}-{p.parent.parent.name.lower()}-{diagramcounter[0]}'
            diagrams.append({'id':ident,'source':t.content,'file':str(p.relative_to(R))})
            t.type='html_block';t.content=f'<figure><div class="diagram-viewport" role="region" tabindex="0" aria-label="{escape(lab[5])}"><img src="diagrams/{ident}.svg" alt="{escape(lab[3])} {diagramcounter[0]}: {escape(p.stem)}"></div><figcaption>{escape(lab[3])} {diagramcounter[0]} · {escape(lab[5])}<a href="diagrams/{ident}.svg">{escape(lab[6])}</a></figcaption></figure>';t.tag='';t.nesting=0
    body=md.renderer.render(tokens,md.options,{})
    body=re.sub(r'<li>\[ \] (.*?)</li>', r'<li class="check"><label><input type="checkbox"> \1</label></li>', body, flags=re.S)
    if p.name=='README.md':
        for heading,section_lang in [('English','en'),('O‘zbekcha','uz')]:
            body=re.sub(r'(<h3[^>]*>'+re.escape(heading)+r'</h3>)(.*?)(?=<h[123]\b|$)',lambda m:'<section lang="'+section_lang+'">'+m[0]+'</section>',body,flags=re.S)
        body=re.sub(r'<p>(The course consists|Course materials are distributed)(.*?)</p>',r'<p lang="en">\1\2</p>',body,flags=re.S)
        def multilingual_table(m):
            table=m[0]
            if '<th>Русский</th>' not in table:return table
            def multilingual_row(row):
                cells=[0]
                def cell(c):
                    i=cells[0];cells[0]+=1
                    return '<td lang="'+['ru','ru','uz','en'][i]+'">'+c[1]+'</td>'
                return re.sub(r'<td>(.*?)</td>',cell,row[0],flags=re.S)
            return re.sub(r'<tr>.*?</tr>',multilingual_row,table,flags=re.S)
        body=re.sub(r'<table>.*?</table>',multilingual_table,body,flags=re.S)

    nav=''.join(f'<a href="#{a}">{escape(title.replace(chr(96), ""))}</a>' for a,title in headings)
    title=next((tokens[i+1].content for i,t in enumerate(tokens) if t.type=='heading_open'),'HTML')
    name=mapnames[str(p.relative_to(R))]
    html=f'''<!DOCTYPE html><html lang="{lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{escape(title)} · JLearn</title><link rel="stylesheet" href="style.css"></head><body><header><p class="lesson-meta">JLearn · {escape(lab[1])}</p><a href="index.html">{escape(lab[0])}</a></header><main><aside><details open><summary>{escape(lab[2])}</summary>{nav}</details></aside><article>{body}</article></main><footer><a href="../{escape(quote(str(p.relative_to(R)),safe="/"))}">{escape(lab[4])}</a> · © 2026 Javlonbek Saydullaev · CC BY-NC-SA 4.0</footer><script>if(innerWidth<900)document.querySelector("aside details").open=false;</script></body></html>'''
    (O/name).write_text(html)
(O/'diagrams').mkdir(exist_ok=True)
(O/'diagrams.json').write_text(json.dumps(diagrams,ensure_ascii=False,indent=2))
print(f'Built {len(files)} pages and {len(diagrams)} diagram sources.')
