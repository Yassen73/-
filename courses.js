
addEventListener('error',e=>{const v=document.querySelector('#v')||document.querySelector('#fl');if(v&&!v.dataset.err){v.dataset.err=1;v.innerHTML='<div style="text-align:center;padding:40px 14px"><h3>اوبس! حصلت مشكلة 😅</h3><p style="color:var(--mut)">حدّث الصفحة وهتتحل.</p><pre dir="ltr" style="font-size:12px;white-space:pre-wrap;text-align:left;opacity:.7">'+String(e.message).replace(/</g,"&lt;").slice(0,300)+'</pre></div>'}});
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// ===== رقم الواتساب: نفس الرقم اللي في SITE.whatsapp في home.js (بصيغة دولية بدون +) =====
const WA_NUM='';
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2600)};
const root=document.documentElement,th=$('#th');
try{const t=localStorage.getItem('th');if(t)root.dataset.theme=t}catch(e){}
const sync=()=>th.textContent=root.dataset.theme=='dark'?'☾':'☀';sync();
th.onclick=()=>{root.dataset.theme=root.dataset.theme=='dark'?'light':'dark';sync();try{localStorage.setItem('th',root.dataset.theme)}catch(e){}};
$('#menu').onclick=()=>$('#links').classList.toggle('on');
// حالة الدخول (شكلية بس؛ الأمان الحقيقي في dashboard)
let LOGGED=false;
try{const t=JSON.parse(localStorage.getItem('sb-btviglpxeukwypkantqi-auth-token')||'null');LOGGED=!!(t&&(t.access_token||t.currentSession)&&(!t.expires_at||t.expires_at*1000>Date.now()||t.refresh_token))}catch(e){}
if(LOGGED){$$('a[href="register.html"]').forEach(a=>{a.href='dashboard.html';a.textContent='لوحتي ←'});$$('a[href="login.html"],a[href="parent.html"]').forEach(a=>a.style.display='none')}
// واتساب
(()=>{const a=$('#wa'),n=WA_NUM.replace(/\D/g,'');
if(n)a.href='https://wa.me/'+n+'?text='+encodeURIComponent('أهلاً، عندي استفسار عن منصة ابن رشدي');
else a.onclick=e=>{e.preventDefault();toast('رقم الواتساب هيتضاف قريب')}})();

const sb=supabase.createClient(SB_URL,SB_KEY,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
let ALL=[],stage='all',q='',tab=null;
const TINT=['var(--sage)','var(--sky)','var(--rose)'],EMO=['📘','📗','📙','📕'];
const short=g=>String(g||'').replace('الصف ','');
const cg=c=>Array.isArray(c.grades)&&c.grades.length?c.grades.filter(Boolean):(c.grade?[c.grade]:[]);
const stOf=g=>/ابتدائي/.test(g)?'p':/إعدادي/.test(g)?'m':/ثانوي/.test(g)?'s':'';
const STG=[['all','الكل'],['p','ابتدائي'],['m','إعدادي'],['s','ثانوي']];
const norm=s=>String(s??'').toLowerCase().replace(/[\u064B-\u0652\u0640]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه');
const price=c=>Number(c.price)>0?`<div class="pr">${esc(c.price)} <small>ج.م</small></div>`:`<div class="pr free">مجاني</div>`;
const lessonsOf=c=>Array.isArray(c.lessons)?c.lessons:[],examsOf=(c,k)=>(Array.isArray(c.exams)?c.exams:[]).filter(x=>x.kind===k);
const nLes=c=>lessonsOf(c).length||Number(c.lessons_count)||0;
const gtxt=c=>{const g=cg(c);return g.length?g.map(short):['كل المراحل']};
const tracks=c=>Array.isArray(c.tracks)&&c.tracks.length&&c.tracks.length<3?c.tracks:[];
const getId=()=>new URLSearchParams(location.search).get('c');
const link=c=>'course.html?c='+encodeURIComponent(c.id);
function fitStage(c){if(stage==='all')return true;const g=cg(c);return !g.length||g.some(x=>stOf(x)===stage)}
function list(){const nq=norm(q.trim());
 return ALL.filter(c=>fitStage(c)&&(!nq||norm(c.title+' '+(c.description||'')).includes(nq)))}
function head(c){const h=$('#head');
 if(c){h.innerHTML=`<a class="crumb" href="courses.html" data-back>← كل الكورسات</a>`;return}
 h.innerHTML=`<h1>الكورسات</h1><p class="lead">كل الكورسات النازلة على المنصة. ادخل أي كورس وشوف فيه إيه من حصص وامتحانات وواجبات قبل ما تشترك.</p>
 <div class="tool"><label class="srch"><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">ابحث عن كورس</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3"/></svg><input id="q" type="search" placeholder="ابحث عن كورس..." autocomplete="off" value="${esc(q)}"></label></div>
 <div class="chips" id="st" role="group" aria-label="المرحلة" style="margin-top:14px">${STG.map(s=>`<button aria-pressed="${s[0]===stage}" data-s="${s[0]}">${s[1]}</button>`).join('')}</div><div class="cnt" id="cnt"></div>`;
 $('#q').oninput=e=>{q=e.target.value;drawList()};
 $$('#st button').forEach(b=>b.onclick=()=>{stage=b.dataset.s;$$('#st button').forEach(x=>x.setAttribute('aria-pressed',x===b));drawList()})}
function card(c,i){const g=gtxt(c),t=tracks(c),ne=examsOf(c,'exam').length,nh=examsOf(c,'homework').length;
 return `<article class="card cc">${c.image_url?`<img class="cim" src="${esc(c.image_url)}" alt="${esc(c.title)}" loading="lazy" onerror="this.remove()">`:''}<div class="band" style="background:${TINT[i%3]}"><b>${esc(g.length>2?g[0]+' + '+(g.length-1):g.join(' · '))}</b><i aria-hidden="true">${EMO[i%4]}</i></div>
 <h3>${esc(c.title)}</h3><p class="ds">${esc(c.description||'')}</p>
 ${t.length?`<div class="pills">${t.map(x=>`<span>${esc(x)}</span>`).join('')}</div>`:''}
 <div class="mt2"><span>🎬 ${nLes(c)} محاضرة</span><span>📝 ${ne} امتحان</span><span>📚 ${nh} واجب</span></div>
 <div class="ft">${price(c)}<a class="btn p s" href="${link(c)}">ادخل الكورس</a></div></article>`}
function drawList(){const l=list(),v=$('#v');
 const cn=$('#cnt');if(cn)cn.textContent=ALL.length?l.length+' كورس':'';
 v.innerHTML=l.length?`<div class="cgrid">${l.map(card).join('')}</div>`:`<div class="empty">${ALL.length?'🔎 مفيش كورس مطابق للبحث. جرّب مرحلة أو كلمة تانية.':'📚 الكورسات هتنزل قريب، خليك معانا!'}</div>`;
 bind()}
function detail(c){const lp=lessonsOf(c),ex=examsOf(c,'exam'),hw=examsOf(c,'homework');
 const T=[['les','الشرح',lp.length],['ex','الامتحانات',ex.length],['hw','الواجبات',hw.length]];
 if(!tab||!T.find(x=>x[0]===tab))tab=(T.find(x=>x[2])||T[0])[0];
 const row=(n,t,s)=>`<div class="li"><i>${n}</i><p>${esc(t)}</p><small>${s}</small></div>`;
 const body={les:lp.length?lp.map((l,i)=>row(i+1,l.title,'🔒 بعد الاشتراك')).join(''):'<div class="empty">🎬 حصص الشرح هتتضاف قريب.</div>',
  ex:ex.length?ex.map((x,i)=>row(i+1,x.title,(x.questions||0)+' سؤال')).join(''):'<div class="empty">📝 مفيش امتحانات في الكورس ده لسه.</div>',
  hw:hw.length?hw.map((x,i)=>row(i+1,x.title,(x.questions||0)+' سؤال')).join(''):'<div class="empty">📚 مفيش واجبات في الكورس ده لسه.</div>'}[tab];
 const t=tracks(c);
 $('#v').innerHTML=`<section class="card dh"><div class="pills">${gtxt(c).map(x=>`<span>${esc(x)}</span>`).join('')}${t.map(x=>`<span>${esc(x)}</span>`).join('')}</div>
 <h1>${esc(c.title)}</h1><p class="ds">${esc(c.description||'')}</p>
 <div class="stats"><div><b>${nLes(c)}</b><small>حصة</small></div><div><b>${ex.length}</b><small>امتحان</small></div><div><b>${hw.length}</b><small>واجب</small></div></div>
 <div class="buy">${price(c)}${LOGGED?'<a class="btn p" href="dashboard.html">افتح لوحتك وفعّل الكورس ←</a>':'<a class="btn p" href="register.html">أنشئ حساب واشترك ←</a><a class="btn" href="login.html">عندي حساب</a>'}</div>
 <p class="note">🔑 الفيديوهات والامتحانات بتفتح بعد الاشتراك. ولو معاك كود تفعيل، فعّله من حسابك.</p></section>
 <div class="chips tabs" role="tablist">${T.map(x=>`<button role="tab" aria-pressed="${x[0]===tab}" data-t="${x[0]}">${x[1]}<span>(${x[2]})</span></button>`).join('')}</div>
 <div class="ls">${body}</div>`;
 $$('.tabs button').forEach(b=>b.onclick=()=>{tab=b.dataset.t;detail(c)});bind()}
function bind(){$$('a[data-c]').forEach(a=>a.onclick=e=>{if(e.metaKey||e.ctrlKey||e.shiftKey)return;e.preventDefault();history.pushState(null,'',a.href);tab=null;render();scrollTo(0,0)});
 $$('a[data-back]').forEach(a=>a.onclick=e=>{if(e.metaKey||e.ctrlKey||e.shiftKey)return;e.preventDefault();history.pushState(null,'','courses.html');render();scrollTo(0,0)})}
function render(){const id=getId();
 if(id){location.replace('course.html?c='+encodeURIComponent(id));return} // تفاصيل الكورس في course.html بس (المحتوى مقفول لغير المشتركين)
 const c=null;
 if(id&&!c){head(null);$('#v').innerHTML='<div class="empty">🤔 الكورس ده مش موجود أو اتشال. <a href="courses.html" data-back style="text-decoration:underline;font-weight:600">شوف كل الكورسات</a></div>';drawList2();return}
 head(c);c?(document.title=c.title+' | منصة ابن رشدي',detail(c)):(document.title='الكورسات | منصة ابن رشدي',drawList())}
function drawList2(){bind()}
addEventListener('popstate',()=>{if(ALL.length||window.__loaded)render()});
async function load(){
 try{const r=await Promise.race([sb.rpc('public_courses'),new Promise((_,j)=>setTimeout(()=>j(new Error('timeout')),15000))]);
  if(r.error)throw r.error;ALL=Array.isArray(r.data)?r.data:[];window.__loaded=1;render()}
 catch(e){console.error('courses:',e);head(null);$('#v').innerHTML='<div class="err"><h3>اوبس! الكورسات مجتش 😅</h3><p>غالبًا النت ضعيف. جرّب تاني.</p><button class="btn p" id="rt">حاول تاني</button></div>';$('#rt').onclick=()=>{$('#v').innerHTML='<div class="cgrid"><div class="sk"></div><div class="sk"></div><div class="sk"></div></div>';load()}}}
if(LOGGED)$('#fin').hidden=true;
head(null);load();
