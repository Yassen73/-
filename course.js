const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const V=$('#v');
const fail=m=>{V.innerHTML='<div class="err"><h3>اوبس! حصلت مشكلة 😅</h3><p>'+esc(m||'غالبًا النت ضعيف. جرّب تاني.')+'</p><button class="btn p" id="rl">حدّث الصفحة</button></div>';const b=$('#rl');if(b)b.onclick=()=>location.reload()};
addEventListener('error',e=>fail('حدّث الصفحة وهتتحل. ('+String(e.message).slice(0,120)+')'));
// الوضع
const root=document.documentElement,th=$('#th');
try{const t=localStorage.getItem('th');if(t)root.dataset.theme=t}catch(e){}
const sync=()=>th.textContent=root.dataset.theme=='dark'?'☾':'☀';sync();
th.onclick=()=>{root.dataset.theme=root.dataset.theme=='dark'?'light':'dark';sync();try{localStorage.setItem('th',root.dataset.theme)}catch(e){}};

const TO=(p,n)=>Promise.race([Promise.resolve(p),new Promise((_,r)=>setTimeout(()=>r(new Error('timeout: '+n)),15000))]);
const sb=supabase.createClient(SB_URL,SB_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false,lock:async(n,t,f)=>await f()}});
const id=new URLSearchParams(location.search).get('c');
const short=g=>String(g||'').replace('الصف ','');
const cg=c=>Array.isArray(c.grades)&&c.grades.length?c.grades.filter(Boolean):(c.grade?[c.grade]:[]);
const KINDS={homework:['📚','الواجب','var(--sky)'],practice:['✍️','حل أسئلة','var(--sage)'],exam:['📝','الامتحان','var(--rose)']};
const ORDER=['homework','practice','exam'];
let LOGGED=false,DATA=null,BUSY=false;
const fmt=n=>Number(n).toLocaleString('ar-EG',{maximumFractionDigits:2});
const priceOf=c=>Number(c.price)||0;

function embed(u){u=String(u||'').trim();if(!u)return '';
 let m=u.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
 if(m)return `<iframe src="https://www.youtube-nocookie.com/embed/${m[1]}?rel=0&autoplay=1" title="فيديو الشرح" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
 m=u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
 if(m)return `<iframe src="https://player.vimeo.com/video/${m[1]}?autoplay=1" title="فيديو الشرح" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
 if(/^https?:\/\//i.test(u))return `<video src="${esc(u)}" controls autoplay playsinline controlsList="nodownload"></video>`;
 return ''}

const item=x=>{const k=KINDS[x.kind]||KINDS.exam;
 return `<div class="it"><span class="ic" style="background:${k[2]}">${k[0]}</span><p><b>${esc(x.title)}</b><small>${Number(x.questions)||0} سؤال</small></p><a class="btn p s" href="dashboard.html?x=${encodeURIComponent(x.id)}">ابدأ</a></div>`};
function part(kind,list){if(!list.length)return '';const k=KINDS[kind];
 return `<div class="pt"><h4>${k[0]} ${k[1]}${list.length>1?' ('+list.length+')':''}</h4>${list.map(item).join('')}</div>`}

// محاضرة مفتوحة (للمشترك فقط)
function lecture(l,i){const items=Array.isArray(l.items)?l.items:[];
 const by=k=>items.filter(x=>x.kind===k);
 const other=items.filter(x=>!ORDER.includes(x.kind));
 const tags=[l.video_url?'🎬 شرح':'',by('homework').length?'📚 واجب':'',by('practice').length?'✍️ حل أسئلة':'',by('exam').length+other.length?'📝 امتحان':''].filter(Boolean).join(' · ');
 const video=l.video_url?`<div class="pt"><h4>🎬 الشرح</h4><div class="vbox"><div class="it"><span class="ic" style="background:var(--sage)">▶️</span><p><b>فيديو الشرح</b><small>اضغط للتشغيل</small></p><button class="btn p s" data-play="${i}">شغّل</button></div></div></div>`
  :`<div class="pt"><h4>🎬 الشرح</h4><div class="it"><span class="ic" style="background:var(--sage)">⏳</span><p><b>الشرح هيتضاف قريب</b></p></div></div>`;
 return `<section class="card lec${i===0?' on':''}"><button class="lh" aria-expanded="${i===0}"><span class="n">${i+1}</span><span class="tx"><small>المحاضرة ${i+1}</small><b>${esc(l.title)}</b><span>${tags||'—'}</span></span><span class="ch" aria-hidden="true">⌄</span></button>
 <div class="lb">${video}${ORDER.map(k=>part(k,by(k))).join('')}${other.length?part('exam',other):''}</div></section>`}

// غلاف الكورس العريض
const LK='<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/><circle cx="12" cy="16" r="1.3"/></svg>',
 OPN='<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="3"/><path d="M8 11V8a4 4 0 0 1 7.5-2"/><circle cx="12" cy="16" r="1.3"/></svg>';
function cover(c,g,enrolled){const l=String(c.title||'ع').trim()[0]||'ع';
 return `<div class="cvr${enrolled?' open':''}"><div class="cvm">${c.image_url?`<img src="${esc(c.image_url)}" alt="${esc(c.title)}" onerror="this.remove()">`:''}<i class="cl" aria-hidden="true">${esc(l)}</i></div><span class="shine" aria-hidden="true"></span><div class="shade"></div>
 <div class="gb">${(g.length?g:['كل المراحل']).map(x=>`<span class="pill">${esc(x)}</span>`).join('')}</div>
 <span class="chip ${enrolled?'ok':''}">${enrolled?OPN+'مفتوح':LK+'مقفول'}</span>
 <h1>${esc(c.title)}</h1></div>`}

function render(d){DATA=d;const c=d.course||{},L=Array.isArray(d.lessons)?d.lessons:[],G=Array.isArray(d.general)?d.general:[],enrolled=!!d.enrolled;
 const all=[...L.flatMap(l=>l.items||[]),...G];
 const nHw=all.filter(x=>x.kind==='homework').length,nEx=all.filter(x=>x.kind==='exam').length,nPr=all.filter(x=>x.kind==='practice').length;
 const g=cg(c).map(short);document.title=(c.title||'الكورس')+' | منصة ابن رشدي';$('#tt').textContent=c.title||'الكورس';
 const p=priceOf(c);
 const price=p>0?`<div class="pr">${esc(fmt(p))} <small>ج.م</small></div>`:'<div class="pr free">مجاني</div>';
 const cta=enrolled?'<span class="ok">✓ مشترك في الكورس</span><a class="btn p" href="#cur">كمّل التعلم ↓</a>'
  :LOGGED?`${price}<button class="btn p big" id="sub"><span class="sh2"></span>${p>0?'اشترك في الكورس 🔑':'ابدأ الكورس مجانًا 🔑'}</button>`
  :`${price}<a class="btn p big" href="register.html">أنشئ حساب واشترك ←</a><a class="btn" href="login.html">عندي حساب</a>`;
 const hero=`<section class="hero">${cover(c,g,enrolled)}
  <div class="info card"><div class="stats"><div><b>${L.length}</b><small>محاضرة</small></div><div><b>${nHw}</b><small>واجب</small></div><div><b>${nPr}</b><small>حل أسئلة</small></div><div><b>${nEx}</b><small>امتحان</small></div></div>
  <div class="buy">${cta}</div>
  ${enrolled?'':(LOGGED?'<p class="note">💳 السعر بيتخصم من رصيد محفظتك، ولو معاك كود تفعيل فعّله من <a href="dashboard.html">حسابك</a>.</p>':'<p class="note">🔑 لازم تشترك الأول عشان تدخل الكورس. ولو معاك كود تفعيل، فعّله من <a href="dashboard.html">حسابك</a>.</p>')}</div></section>`;
 const inc=[['🎬',L.length,'محاضرة شرح بالفيديو'],['📚',nHw,'واجب'],['✍️',nPr,'حل أسئلة'],['📝',nEx,'امتحان']].filter(x=>x[1]>0);
 const about=`<section class="card about"><h2>عن الكورس</h2><p>${c.description?esc(c.description):'كورس متكامل بيشرحلك المنهج خطوة بخطوة، مع واجبات وامتحانات تثبّت المعلومة وتقيس مستواك.'}</p>${inc.length?`<h3>هتلاقي في الكورس</h3><div class="inc">${inc.map(x=>`<span><i>${x[0]}</i><b>${x[1]}</b> ${x[2]}</span>`).join('')}</div>`:''}</section>`;
 let body='';
 if(enrolled){
  body=`<h2 class="sec" id="cur">محتوى الكورس</h2>
  ${L.length?L.map(lecture).join(''):'<div class="empty">📚 المحاضرات هتنزل قريب، خليك معانا!</div>'}
  ${G.length?`<h2 class="sec">على الكورس كله</h2><section class="card lec on"><div class="lb" style="display:block;border:0">${ORDER.map(k=>part(k,G.filter(x=>x.kind===k))).join('')}${part('exam',G.filter(x=>!ORDER.includes(x.kind)))}</div></section>`:''}`;
 }
 V.innerHTML=hero+about+body;
 $$('.lh').forEach(b=>b.onclick=()=>{const s=b.parentElement,o=s.classList.toggle('on');b.setAttribute('aria-expanded',o)});
 $$('[data-play]').forEach(b=>b.onclick=()=>{const l=L[+b.dataset.play],h=embed(l.video_url),box=b.closest('.vbox');
  box.innerHTML=h?`<div class="vp">${h}</div>`:'<div class="empty">رابط الفيديو مش شغال. كلّم الدعم.</div>'});
 const s=$('#sub');if(s)s.onclick=()=>askSub(c)}

// ===== نافذة الاشتراك =====
function modal(html){closeM();const m=document.createElement('div');m.className='mdl';m.id='md';m.innerHTML=`<div class="mb card" role="dialog" aria-modal="true">${html}</div>`;
 m.onclick=e=>{if(e.target===m&&!BUSY)closeM()};document.body.appendChild(m);return m}
function closeM(){$('#md')?.remove()}
function askSub(c){const p=priceOf(c);
 const m=modal(`<div class="mi">🔑</div><h3>تأكيد الاشتراك</h3>
 <p class="mt">${esc(c.title)}</p>
 <div class="rcp"><div><span>سعر الكورس</span><b>${p>0?esc(fmt(p))+' ج.م':'مجاني'}</b></div>${p>0?'<div><span>الخصم من</span><b>💳 محفظتك</b></div>':''}</div>
 <div class="mact"><button class="btn p" id="go">${p>0?'تأكيد وخصم '+esc(fmt(p))+' ج.م':'تفعيل مجاني'}</button><button class="btn" id="no">إلغاء</button></div>`);
 $('#no').onclick=closeM;$('#go').onclick=()=>doSub(c)}
async function doSub(c){if(BUSY)return;BUSY=true;
 const b=$('#go');b.disabled=true;b.textContent='ثواني...';
 let r;try{r=await TO(sb.rpc('enroll_course',{p_course:String(id)}),'enroll')}catch(e){r={error:e}}
 BUSY=false;
 if(r.error||!r.data){console.error('enroll:',r.error);modal(`<div class="mi">😅</div><h3>حصلت مشكلة</h3><p class="mt">مقدرناش نكمّل الاشتراك، ومفيش فلوس اتخصمت. جرّب تاني بعد شوية.</p><div class="mact"><button class="btn p" id="no">تمام</button></div>`);$('#no').onclick=closeM;return}
 const d=r.data;
 if(d.ok||d.error==='already'){
  closeM();
  const fresh=await TO(sb.rpc('course_content',{p_course:String(id)}),'course').catch(()=>null);
  if(fresh&&fresh.data){render(fresh.data);scrollTo({top:0,behavior:'smooth'});party();
   toast(d.ok&&priceOf(c)>0?`✅ اتخصم ${fmt(priceOf(c))} ج.م وفُتح الكورس. رصيدك: ${fmt(d.balance??0)} ج.م`:'✅ اتفتح الكورس')}
  else location.reload();return}
 if(d.error==='insufficient'){
  const bal=Number(d.balance)||0,pr=Number(d.price)||priceOf(c),need=Math.max(pr-bal,0);
  modal(`<div class="mi">👛</div><h3>رصيدك مش كفاية</h3>
  <p class="mt">محتاج تشحن محفظتك الأول عشان تقدر تشترك.</p>
  <div class="rcp"><div><span>رصيدك الحالي</span><b>${esc(fmt(bal))} ج.م</b></div><div><span>سعر الكورس</span><b>${esc(fmt(pr))} ج.م</b></div><div class="lo"><span>ناقصك</span><b>${esc(fmt(need))} ج.م</b></div></div>
  <div class="mact"><a class="btn p" href="dashboard.html">اشحن محفظتك ←</a><button class="btn" id="no">رجوع</button></div>`);$('#no').onclick=closeM;return}
 if(d.error==='auth'){location.href='login.html';return}
 modal(`<div class="mi">🤔</div><h3>مش قادرين نكمّل</h3><p class="mt">${esc(d.message||'الكورس ده مش متاح للاشتراك حاليًا.')}</p><div class="mact"><button class="btn p" id="no">تمام</button></div>`);$('#no').onclick=closeM}

function toast(m){let t=$('#ts');if(!t){t=document.createElement('div');t.id='ts';t.className='toast';document.body.appendChild(t)}
 t.textContent=m;t.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>t.hidden=true,5000)}
function party(){if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 const w=document.createElement('div');w.className='pty';
 const cols=['#F0C46E','#C98A1F','#2E9A6B','#3A6EA5','#E3B25A'];
 for(let i=0;i<46;i++){const s=document.createElement('i');s.style.cssText=`left:${Math.random()*100}%;background:${cols[i%5]};animation-delay:${Math.random()*.5}s;animation-duration:${1.6+Math.random()*1.4}s;--x:${(Math.random()-.5)*160}px;width:${6+Math.random()*7}px;height:${8+Math.random()*10}px`;w.appendChild(s)}
 document.body.appendChild(w);setTimeout(()=>w.remove(),3600)}

(async()=>{
 if(!id)return fail('مفيش كورس محدد. ارجع لقايمة الكورسات.');
 const{data:{session}}=await TO(sb.auth.getSession(),'session');LOGGED=!!session;
 $('#bk').href=LOGGED?'dashboard.html#all':'courses.html';
 const r=await TO(sb.rpc('course_content',{p_course:String(id)}),'course');
 if(r.error)throw r.error;
 if(!r.data){V.innerHTML='<div class="empty">🤔 الكورس ده مش موجود أو اتشال.<br><a class="btn p" style="margin-top:14px" href="courses.html">شوف كل الكورسات</a></div>';return}
 render(r.data);
})().catch(e=>{console.error('course:',e);fail('غالبًا النت ضعيف أو الدالة لسه متشغلتش في Supabase. جرّب تاني.')});
