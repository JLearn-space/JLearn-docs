const fs=require('fs'); const path=require('path');
const {chromium}=require(process.env.JLEARN_PLAYWRIGHT || 'playwright');
(async()=>{
 const root=process.argv[2] || path.resolve(__dirname,'..');
 const browser=await chromium.launch({...(process.env.JLEARN_BROWSER ? {executablePath:process.env.JLEARN_BROWSER}:{}),headless:true,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1400,height:1000}});
 await page.setContent('<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>');
 await page.addScriptTag({path:process.env.JLEARN_MERMAID_BUNDLE || path.join(path.dirname(require.resolve('mermaid')),'mermaid.min.js')});
 await page.evaluate(()=>mermaid.initialize({startOnLoad:false,htmlLabels:false,securityLevel:'strict',theme:'base',themeVariables:{fontFamily:'Arial, sans-serif',fontSize:'16px',primaryColor:'#eef2ff',primaryBorderColor:'#6366f1',primaryTextColor:'#172554',lineColor:'#64748b',secondaryColor:'#e0f2fe',tertiaryColor:'#f8fafc'},flowchart:{htmlLabels:false,useMaxWidth:false},mindmap:{useMaxWidth:false}}));
 let failures=[];let ds=JSON.parse(fs.readFileSync(root+'/reading/diagrams.json','utf8'));
 for(let i=0;i<ds.length;i++){
  const d=ds[i];
  try{const result=await page.evaluate(async({id,source})=>{await mermaid.parse(source);let {svg}=await mermaid.render(id,source);const doc=new DOMParser().parseFromString(svg,"image/svg+xml");const walker=doc.createTreeWalker(doc,NodeFilter.SHOW_TEXT);const entities={"&lt;":"<","&gt;":">","&amp;":"&","&quot;":"\"","&#60;":"<","&#62;":">"};while(walker.nextNode()){const n=walker.currentNode;for(let pass=0;pass<4;pass++){const before=n.nodeValue;n.nodeValue=n.nodeValue.replace(/&(?:lt|gt|amp|quot);|&#(?:60|62);/g,x=>entities[x]);if(n.nodeValue===before)break;}}const empty=[...doc.querySelectorAll("g.node")].filter(n=>!n.textContent.trim());if(empty.length)throw new Error("Rendered diagram contains "+empty.length+" empty node labels");return new XMLSerializer().serializeToString(doc)},d);fs.writeFileSync(root+'/reading/diagrams/'+d.id+'.svg',result)}
  catch(e){failures.push({id:d.id,file:d.file,error:e.message});}
 }
 fs.writeFileSync(root+'/reading/diagram-check.json',JSON.stringify({total:ds.length,rendered:ds.length-failures.length,failures},null,2));
 console.log(JSON.stringify({total:ds.length,rendered:ds.length-failures.length,failures},null,2));
 await browser.close();
})();
