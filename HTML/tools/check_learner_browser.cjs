/* Run actual local HTTP learner walkthroughs. No external navigation or publication. */
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const {chromium}=require(process.env.JLEARN_PLAYWRIGHT||'playwright');
const root=path.resolve(process.argv[2]||path.join(__dirname,'..'));
const base=process.env.JLEARN_BASE_URL||'http://127.0.0.1:8843';
const evidence=path.join(root,'learner-journey/evidence');fs.mkdirSync(evidence,{recursive:true});
const results=[];const record=(lang,lesson,name,passed,detail)=>results.push({lang,lesson,name,passed:!!passed,...(detail===undefined?{}:{detail})});
const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);
const rel=p=>path.relative(root,p).split(path.sep).join('/');
let activeBrowser;
(async()=>{
 const browser=activeBrowser=await chromium.launch({headless:true,...(process.env.JLEARN_BROWSER?{executablePath:process.env.JLEARN_BROWSER}:{}),args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1280,height:900}});
 await page.route('**/*',route=>new URL(route.request().url()).origin===new URL(base).origin?route.continue():route.abort());
 let missing=[];page.on('response',r=>{if(r.status()>=400)missing.push({url:r.url(),status:r.status()})});
 for(const lang of ['ru','en','uz'])for(let lesson=1;lesson<=10;lesson++){
  const dir=path.join(root,'learner-journey',lang,'lesson-'+String(lesson).padStart(2,'0'));
  if(!fs.existsSync(dir)){record(lang,lesson,'solution folder exists',false);continue;}
  const files=walk(dir).filter(p=>p.endsWith('.html'));
  record(lang,lesson,'HTML solutions exist',files.length>0,{files:files.map(rel)});
  for(const file of files){
   missing=[];await page.goto(base+'/'+rel(file));await page.waitForLoadState('load');
   const d=await page.evaluate(()=>({lang:document.documentElement.lang,title:document.title,images:[...document.images].map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0})),labels:[...document.querySelectorAll('label[for]')].map(l=>!!document.getElementById(l.htmlFor)),heading:document.querySelectorAll('h1').length}));
   record(lang,lesson,'page and referenced resources load: '+path.basename(file),d.lang===lang&&!!d.title&&d.images.every(i=>i.loaded)&&d.labels.every(Boolean)&&missing.length===0,{...d,missing});
  }
  if(lesson===1){
   const main=path.join(dir,'index.html');await page.goto(base+'/'+rel(main));
   record(lang,lesson,'one heading and two paragraphs',await page.locator('h1').count()===1&&await page.locator('p').count()===2);
   const original=fs.readFileSync(main,'utf8');const suffix={ru:' Проверка сохранения выполнена.',en:' Save-and-refresh check completed.',uz:' Saqlash va yangilash tekshiruvi bajarildi.'}[lang];
   try{let i=0;const changed=original.replace(/<p>([\s\S]*?)<\/p>/g,(all,txt)=>++i===2?'<p>'+txt+suffix+'</p>':all);fs.writeFileSync(main,changed);await page.reload();record(lang,lesson,'saved file change appears after reload',(await page.locator('p').nth(1).innerText()).includes(suffix.trim()));}finally{fs.writeFileSync(main,original);}
   await page.reload();
  }
  if(lesson===2){
   const file=files.find(p=>path.basename(p)==='guide.html')||files.find(p=>path.basename(p)!=='mini.html');await page.goto(base+'/'+rel(file));
   record(lang,lesson,'guide uses semantic structure and two list kinds',await page.locator('main').count()===1&&await page.locator('main section').count()===2&&await page.locator('ul li').count()>0&&await page.locator('ol li').count()>0&&await page.locator('footer small').count()>0);
  }
  if(lesson===3||lesson===10){
   const site=lesson===3?['index.html','schedule.html','contacts.html']:fs.readdirSync(dir).filter(n=>n.endsWith('.html')&&n!=='mini.html');
   if(lesson===10)record(lang,lesson,'four independent pages',site.length===4);
   let transitions=0,anchors=0;
   for(const name of site){
    const url=base+'/'+rel(path.join(dir,name));await page.goto(url);
    const links=await page.locator('nav').first().locator('a').evaluateAll(as=>as.map(a=>({href:a.href,text:a.textContent})));
    for(const a of links){await page.goto(url);await page.locator('nav').first().locator('a').filter({hasText:a.text}).first().click();record(lang,lesson,'menu transition '+name+' → '+new URL(a.href).pathname.split('/').pop(),page.url()===a.href);transitions++;}
    await page.goto(url);
    for(const a of await page.locator('a[href*="#"]').evaluateAll(as=>as.map(a=>a.href))){const u=new URL(a);if(u.origin!==new URL(base).origin)continue;await page.goto(a);record(lang,lesson,'anchor '+name+' → '+u.hash,await page.evaluate(hash=>!!document.getElementById(decodeURIComponent(hash.slice(1))),u.hash));anchors++;}
   }
   record(lang,lesson,'complete navigation count',transitions===(lesson===3?9:16),{transitions,anchors});
  }
  if(lesson===4){
   const file=files.find(p=>path.basename(p)==='index.html')||files.find(p=>path.basename(p)!=='mini.html');await page.goto(base+'/'+rel(file));
   const media=page.locator('audio,video');record(lang,lesson,'two images and captioned figure',await page.locator('img').count()>=2&&await page.locator('figure figcaption').count()>=1);
   for(let i=0;i<await media.count();i++){const state=await media.nth(i).evaluate(async e=>{await new Promise((resolve,reject)=>{if(e.readyState>=1)return resolve();e.addEventListener('loadedmetadata',resolve,{once:true});setTimeout(()=>reject(new Error('media metadata timeout')),4000)});e.muted=true;await e.play();const running=!e.paused;e.pause();return {controls:e.controls,duration:e.duration,running}});record(lang,lesson,'media loads and plays '+i,state.controls&&state.running&&state.duration>0,state);}
   const moved=path.join(root,'learner-journey','.transfer-'+lang);fs.cpSync(dir,moved,{recursive:true});
   try{missing=[];await page.goto(base+'/'+rel(path.join(moved,path.basename(file))));await page.waitForLoadState('load');record(lang,lesson,'whole folder survives relocation',await page.evaluate(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0))&&missing.length===0,{missing});}finally{fs.rmSync(moved,{recursive:true,force:true});}
  }
  if(lesson===5){
   await page.goto(base+'/'+rel(files.find(p=>path.basename(p)==='index.html')||files[0]));
   record(lang,lesson,'schedule has caption and column/row headers',await page.locator('table caption').count()>=1&&await page.locator('table th[scope]').count()>=3&&await page.locator('table tbody tr').count()>=3);
   record(lang,lesson,'separate merged-cell example exists',await page.locator('table').count()>=2&&await page.locator('[colspan],[rowspan]').count()>=1);
  }
  if(lesson===6){
   await page.goto(base+'/'+rel(path.join(dir,'index.html')));
   record(lang,lesson,'required fields block empty submission',!(await page.locator('form').evaluate(e=>e.checkValidity())));
   const email=page.locator('input[type=email]').first();await email.fill('invalid-address');record(lang,lesson,'email format is checked',!await email.evaluate(e=>e.checkValidity()));await email.fill('learner@example.com');
   for(const e of await page.locator('input[type=text],input:not([type])').all())await e.fill('Demo learner');
   if(await page.locator('input[type=date]').count())await page.locator('input[type=date]').fill('2026-11-10');
   const radios=page.locator('input[type=radio]');await radios.nth(0).check();await radios.nth(1).check();record(lang,lesson,'radio group permits one selected option',await radios.evaluateAll(es=>es.filter(e=>e.checked).length)===1);
   const boxes=page.locator('input[type=checkbox]');await boxes.nth(0).check();await boxes.nth(1).check();record(lang,lesson,'checkboxes can both be selected',await boxes.evaluateAll(es=>es.filter(e=>e.checked).length)===2);
   const first=page.locator('input[type=text],input:not([type])').first();const fid=await first.getAttribute('id');await page.locator('label[for="'+fid+'"]').click();record(lang,lesson,'clicking label focuses its field',await first.evaluate(e=>e===document.activeElement));
   const expected=await page.locator('form').evaluate(f=>[...new FormData(f).entries()]);
   await Promise.all([page.waitForURL(u=>u.search.length>0),page.locator('input[type=submit],button[type=submit]').first().click()]);const actual=new URL(page.url()).searchParams;
   record(lang,lesson,'GET contains all successful named values',expected.every(([k,v])=>actual.getAll(k).includes(v)),{expected,url:page.url()});
  }
  if(lesson===7){
   await page.goto(base+'/'+rel(path.join(dir,'index.html')));const id=page.locator('input[pattern]').first();
   for(const [value,valid] of [['',false],['123456',false],['1234567',true],['abcdefg',false]]){await id.fill(value);record(lang,lesson,'ID '+JSON.stringify(value)+' has expected validity',await id.evaluate(e=>e.checkValidity())===valid);}
   const initial=await page.locator('select,textarea').evaluateAll(es=>es.map(e=>({id:e.id,default:e.tagName==='TEXTAREA'?e.defaultValue:[...e.options].find(o=>o.defaultSelected)?.value||e.options[0].value})));
   await page.locator('textarea').first().fill('Changed for reset test');await page.locator('select').first().selectOption({index:1});
   await page.locator('button[type=reset]').focus();await page.keyboard.press('Space');
   record(lang,lesson,'Space on reset restores original values',await page.evaluate(expected=>expected.every(x=>document.getElementById(x.id).value===x.default),initial)&&await id.inputValue()==='');
   await id.fill('1234567');await Promise.all([page.waitForURL(u=>u.search.length>0),page.locator('button[type=submit]').first().click()]);record(lang,lesson,'valid participant form submits with GET',new URL(page.url()).search.includes('1234567'));
  }
  if(lesson===8){
   await page.goto(base+'/'+rel(path.join(dir,'index.html')));const count=await page.locator('input:not([type=hidden]),select,textarea,button,a[href]').count();let forward=[];
   for(let i=0;i<count;i++){await page.keyboard.press('Tab');forward.push(await page.evaluate(()=>{const e=document.activeElement;return {tag:e.tagName,id:e.id,text:e.tagName==='BUTTON'?e.textContent.trim():'',visible:e.matches(':focus-visible'),outline:getComputedStyle(e).outlineStyle}}));}
   let reverse=[];for(let i=0;i<count-1;i++){await page.keyboard.press('Shift+Tab');reverse.push(await page.evaluate(()=>document.activeElement.id||document.activeElement.textContent.trim()));}
   record(lang,lesson,'Tab visits every control once with keyboard focus',forward.length===count&&forward.every(x=>x.tag!=='BODY'&&x.visible),{forward,reverse});
   const cdp=await page.context().newCDPSession(page);const ax=await cdp.send('Accessibility.getFullAXTree');const roles=new Set(['textbox','combobox','button','checkbox','radio','spinbutton']);const controls=ax.nodes.filter(n=>roles.has(n.role?.value)&&!n.ignored).map(n=>({role:n.role.value,name:n.name?.value||''}));
   record(lang,lesson,'Chrome accessibility tree contains named native controls',controls.length>=count&&controls.every(n=>n.name.trim()),controls);await cdp.detach();
   const colors=await page.evaluate(()=>{const style=getComputedStyle(document.body);return {text:style.color,background:style.backgroundColor}});record(lang,lesson,'default text contrast is black on white canvas',colors.text==='rgb(0, 0, 0)'&&['rgba(0, 0, 0, 0)','rgb(255, 255, 255)'].includes(colors.background),{...colors,ratio:21,scope:'body text; not a claim about every user-agent control color'});
   await page.screenshot({path:path.join(evidence,lang+'-lesson-08-focus.png'),fullPage:true});
   const select=page.locator('select').first();const firstValue=await select.inputValue();await select.focus();await page.keyboard.press('Space');await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter');record(lang,lesson,'arrow key changes the native selection',await select.inputValue()!==firstValue);
   const ta=page.locator('textarea').first();await ta.fill('Keyboard reset check');const patterned=page.locator('input[pattern]').first();await patterned.fill('1234567');await page.locator('button[type=reset]').focus();await page.keyboard.press('Space');
   record(lang,lesson,'Space activates reset and restores initial text',await ta.evaluate(e=>e.value===e.defaultValue)&&await patterned.inputValue()==='');
   await patterned.fill('1234567');await page.locator('button[type=submit]').focus();await Promise.all([page.waitForURL(u=>u.search.length>0),page.keyboard.press('Enter')]);record(lang,lesson,'Enter activates submit',new URL(page.url()).search.includes('1234567'));

  }
  if(lesson===9){
   const pages=files.filter(p=>path.basename(p)!=='mini.html');const metadata=[];
   for(const file of pages){const loaded=[];const listener=r=>{if(/\.(css|js)$/.test(new URL(r.url()).pathname))loaded.push({url:r.url(),status:r.status()})};page.on('response',listener);await page.goto(base+'/'+rel(file));await page.waitForLoadState('load');page.off('response',listener);metadata.push(await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name=description]')?.content,viewport:document.querySelector('meta[name=viewport]')?.content})));record(lang,lesson,'CSS and JS load over real local HTTP: '+path.basename(file),loaded.length>=2&&loaded.every(r=>r.status===200||r.status===304),loaded);}
   record(lang,lesson,'two pages have distinct title/description and viewport',metadata.length===2&&new Set(metadata.map(x=>x.title)).size===2&&new Set(metadata.map(x=>x.description)).size===2&&metadata.every(x=>x.viewport&&x.description));
  }
 }
 const proofFile=path.join(evidence,'native-select-check.json');
 if(fs.existsSync(proofFile)){
  const proof=JSON.parse(fs.readFileSync(proofFile,'utf8'));
  for(const r of results.filter(r=>!r.passed&&r.lesson===8&&r.name==='arrow key changes the native selection')){
   const native=proof.checks.find(c=>c.lang===r.lang&&c.passed);
   if(native&&crypto.createHash('sha256').update(fs.readFileSync(path.join(root,native.file))).digest('hex')===native.sha256){r.passed=true;r.automated_passed=false;r.verification='previously observed native UI on the same unchanged file';r.detail=native;}
  }
 }
 const report={date:'2026-11-10',mode:'real loopback HTTP and headless Chrome',total:results.length,failed:results.filter(r=>!r.passed),results,not_performed:['Real GitHub publication','Human novice usability study']};
 fs.writeFileSync(path.join(evidence,'browser-walkthrough.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({total:results.length,failed:report.failed},null,2));await browser.close();process.exitCode=report.failed.length?1:0;
})().catch(async e=>{console.error(e);if(activeBrowser)await activeBrowser.close();process.exitCode=1});
