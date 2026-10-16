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

const IC={
 play:'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
 pen:'<svg viewBox="0 0 24 24"><path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/></svg>',
 book:'<svg viewBox="0 0 24 24"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/></svg>',
 exam:'<svg viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="17" rx="3"/><path d="M9 4V3h6v1M9 11h6M9 15h4"/></svg>',
 check:'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
 lock:'<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/><circle cx="12" cy="16" r="1.3"/></svg>',
 open:'<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="3"/><path d="M8 11V8a4 4 0 0 1 7.5-2"/><circle cx="12" cy="16" r="1.3"/></svg>',
 flag:'<svg viewBox="0 0 24 24"><path d="M6 21V4M6 4h11l-2 4 2 4H6"/></svg>',
 chev:'<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>',
 search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4-4"/></svg>',
 once:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>'};
const KD={video:{n:'الشرح',c:'var(--sky)',i:'play'},practice:{n:'حل أسئلة',c:'var(--sage)',i:'pen'},homework:{n:'الواجب',c:'color-mix(in srgb,var(--gold) 26%,var(--sf))',i:'book'},exam:{n:'الامتحان',c:'var(--rose)',i:'exam'}};
const ORDER=['practice','homework','exam'];
const kk=x=>ORDER.includes(x.kind)?x.kind:'exam';
const once=k=>k==='exam'||k==='homework';
let LOGGED=false,DATA=null,BUSY=false,TAB='cur',OPEN='',CUR=null,ENR=false,C={},L=[],G=[],ATT={},ITM={};
const fmt=n=>Number(n).toLocaleString('ar-EG',{maximumFractionDigits:2});
const priceOf=c=>Number(c.price)||0;
const att=x=>ATT[String(x.id)];
const pc=a=>a&&a.total?Math.round(a.score/a.total*100):0;
const its=l=>ORDER.flatMap(k=>(l.items||[]).filter(x=>kk(x)===k));
const stat=l=>{const it=l.items||[],d=it.filter(att).length;return{t:it.length,d,all:it.length>0&&d===it.length}};
const imgOf=c=>[c.image_url,c.image,c.cover_url,c.cover,c.thumbnail,c.thumb,c.poster,c.img].find(v=>typeof v==='string'&&v.trim());
/* وسائل الدفع اللي بتظهر للطالب: عدّلها حسب اللي مفعّل في عقدك مع فوري */
const PAY_METHODS='بطاقات بنكية · محافظ إلكترونية · كود فوري';
const LG=(h,t)=>`<a href="legal.html#${h}" target="_blank" rel="noopener">${t}</a>`;
const payBox=p=>p>0?`<div class="payi"><div class="pih">💳 الدفع الإلكتروني الآمن عبر <span class="fwb">فوري Fawry</span></div><ul><li>سعر الكورس: <b>${esc(fmt(p))} ج.م</b> (جنيه مصري)</li><li>بتشحن محفظتك عبر فوري (${PAY_METHODS})، والاشتراك بيخصم من رصيدها.</li><li>الكورس بيتفعّل فورًا بعد الاشتراك، ومبنخزّنش بيانات بطاقتك.</li></ul><p class="pil">${LG('tm-4','طرق الدفع')}·${LG('tm-5','الاسترجاع والإلغاء')}·${LG('tm-6','التسليم')}·${LG('terms','الشروط والأحكام')}·${LG('privacy','الخصوصية')}</p></div>`:'';

function embed(u){u=String(u||'').trim();if(!u)return '';
 let m=u.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
 if(m)return `<iframe src="https://www.youtube-nocookie.com/embed/${m[1]}?rel=0&autoplay=1" title="فيديو الشرح" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
 m=u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
 if(m)return `<iframe src="https://player.vimeo.com/video/${m[1]}?autoplay=1" title="فيديو الشرح" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
 if(/^https?:\/\//i.test(u))return `<video src="${esc(u)}" controls autoplay playsinline controlsList="nodownload"></video>`;
 return ''}

/* ===== صف الخطوة (واجب / حل أسئلة / امتحان) ===== */
function row(x){ITM[String(x.id)]=x;const k=kk(x),K=KD[k],a=att(x),q=Number(x.questions)||0;
 if(a){const p=pc(a);
  return `<div class="sp done"><span class="ic">${IC.check}</span><p><b>${esc(x.title)}</b><small><span class="sc ${p>=60?'g':'r'}" dir="ltr">${fmt(a.score)}/${fmt(a.total)} · ${fmt(p)}%</span>${K.n} اتحل</small></p><a class="btn s" href="dashboard.html?x=${encodeURIComponent(x.id)}">راجع</a></div>`}
 return `<div class="sp"><span class="ic" style="background:${K.c}">${IC[K.i]}</span><p><b>${esc(x.title)}</b><small>${fmt(q)} سؤال${once(k)?`<span class="once">${IC.once}بيتفتح مرة واحدة</span>`:''}</small></p><button class="btn p s" data-go="${esc(x.id)}">ابدأ</button></div>`}

/* ===== المحاضرة على خريطة الرحلة ===== */
function lecture(l,i,end){const j=end?'end':String(i),items=its(l),s=stat(l),vid=!end&&l.video_url;
 const pk=[...(vid?['video']:[]),...ORDER.filter(k=>items.some(x=>kk(x)===k))];
 const pips=pk.map(k=>{const on=k!=='video'&&items.filter(x=>kk(x)===k).every(att);return `<i class="${on?'on':''}" title="${KD[k].n}">${IC[KD[k].i]}</i>`}).join('');
 const video=end?'':vid?`<div class="sp"><span class="ic" style="background:var(--sky)">${IC.play}</span><p><b>فيديو الشرح</b><small>اضغط للتشغيل</small></p><button class="btn p s" data-play="${i}">شغّل</button></div>`
  :`<div class="sp soon"><span class="ic" style="background:var(--sky)">${IC.play}</span><p><b>الشرح هيتضاف قريب</b></p></div>`;
 const cls=s.all?'done':String(CUR)===j?'cur':'';
 return `<article class="ln ${cls}${j===OPEN?' on':''}" data-j="${j}" data-t="${esc(l.title)}"><span class="nd">${s.all?IC.check:end?IC.flag:fmt(i+1)}</span><div class="lc card"><button class="lh" aria-expanded="${j===OPEN}"><span class="tx"><small>${end?'المحطة الأخيرة':'المحاضرة '+fmt(i+1)}</small><b>${esc(l.title)}</b><span class="pips">${pips}</span></span>${s.t?`<span class="cn">${fmt(s.d)}/${fmt(s.t)}</span>`:''}<span class="ch">${IC.chev}</span></button><div class="lb">${video}${items.map(row).join('')}${!vid&&!items.length&&end?'<div class="sp soon"><p><b>لسه مفيش محتوى</b></p></div>':''}</div></div></article>`}
function lockedLec(l,i){const items=its(l),pk=[...(l.video_url?['video']:[]),...ORDER.filter(k=>items.some(x=>kk(x)===k))];
 return `<article class="ln lk" data-j="${i}" data-t="${esc(l.title)}"><span class="nd">${IC.lock}</span><div class="lc card"><div class="lh"><span class="tx"><small>المحاضرة ${fmt(i+1)}</small><b>${esc(l.title)}</b><span class="pips">${pk.map(k=>`<i title="${KD[k].n}">${IC[KD[k].i]}</i>`).join('')}<em>بتتفتح بعد الاشتراك</em></span></span></div></div></article>`}

function curHTML(){
 if(!L.length&&!G.length)return '<div class="empty">📚 المحاضرات هتنزل قريب، خليك معانا!</div>';
 const rail=ENR&&L.length>6?`<div class="rail" role="navigation" aria-label="تنقّل بين المحاضرات">${L.map((l,i)=>`<button data-r="${i}" class="${stat(l).all?'done':''}${String(CUR)===String(i)?' cur':''}" aria-label="المحاضرة ${i+1}">${fmt(i+1)}</button>`).join('')}</div>`:'';
 const srch=L.length>8?`<div class="sr">${IC.search}<input id="q" type="search" placeholder="ابحث عن محاضرة..." aria-label="ابحث عن محاضرة"></div>`:'';
 return `${srch}${rail}<div class="path">${L.map((l,i)=>ENR?lecture(l,i):lockedLec(l,i)).join('')}${ENR&&G.length?lecture({title:'امتحانات وتدريبات الكورس كله',items:G},0,true):''}</div><p class="empty" id="nr" hidden>مفيش محاضرة بالاسم ده.</p>`}
function aboutHTML(){const nHw=ALL.filter(x=>x.kind==='homework').length,nEx=ALL.filter(x=>x.kind==='exam').length,nPr=ALL.filter(x=>x.kind==='practice').length;
 const inc=[[IC.play,L.length,'محاضرة شرح بالفيديو'],[IC.book,nHw,'واجب'],[IC.pen,nPr,'حل أسئلة'],[IC.exam,nEx,'امتحان']].filter(x=>x[1]>0);
 return `<section class="card about"><h2>عن الكورس</h2><p>${C.description?esc(C.description):'كورس متكامل بيشرحلك المنهج خطوة بخطوة، مع واجبات وامتحانات تثبّت المعلومة وتقيس مستواك.'}</p>${inc.length?`<h3>هتلاقي في الكورس</h3><div class="inc">${inc.map(x=>`<span><i>${x[0]}</i><b>${fmt(x[1])}</b> ${x[2]}</span>`).join('')}</div>`:''}</section>`}
function howHTML(){const p=priceOf(C);
 return `<section class="card about"><h2>إزاي تشترك؟</h2><ol class="how"><li><b>1</b><div><b>${p>0?'اشحن محفظتك':'سجّل دخولك'}</b><span>${p>0?'من حسابك عبر فوري، أو فعّل كود تفعيل لو معاك.':'أنشئ حساب أو سجّل دخول.'}</span></div></li><li><b>2</b><div><b>اضغط «${p>0?'اشترك في الكورس':'ابدأ الكورس مجانًا'}»</b><span>${p>0?'السعر بيتخصم من رصيد محفظتك، وهتأكّد قبل الخصم.':'بيتفعّل مباشرة.'}</span></div></li><li><b>3</b><div><b>الكورس بيتفتح فورًا</b><span>هتلاقي كل المحاضرات والواجبات والامتحانات قدامك.</span></div></li></ol>${payBox(p)}</section>`}

let ALL=[];
function paint(){$('#pn').innerHTML=TAB==='cur'?curHTML():TAB==='about'?aboutHTML():howHTML();wire()}
function setTab(t){TAB=t;$$('.tabs button').forEach(b=>{const o=b.dataset.t===t;b.classList.toggle('on',o);b.setAttribute('aria-selected',o)});paint()}
function openL(j,force){j=String(j);const n=$('.ln[data-j="'+j+'"]');if(!n||n.classList.contains('lk'))return;const was=n.classList.contains('on');
 $$('.ln.on').forEach(x=>{x.classList.remove('on');x.querySelector('.lh')?.setAttribute('aria-expanded','false')});
 if(!was||force){n.classList.add('on');n.querySelector('.lh')?.setAttribute('aria-expanded','true');OPEN=j;try{localStorage.setItem('lo_'+id,j)}catch(e){}}else OPEN='';
 if(force)setTimeout(()=>n.scrollIntoView({behavior:'smooth',block:'start'}),30)}
function wire(){
 $$('.lh').forEach(b=>{if(b.tagName==='BUTTON')b.onclick=()=>openL(b.closest('.ln').dataset.j)});
 $$('[data-r]').forEach(b=>b.onclick=()=>openL(b.dataset.r,true));
 $$('[data-play]').forEach(b=>b.onclick=()=>{const l=L[+b.dataset.play],h=embed(l.video_url);b.closest('.sp').outerHTML=h?`<div class="vp">${h}</div>`:'<div class="empty">رابط الفيديو مش شغال. كلّم الدعم.</div>'});
 $$('[data-go]').forEach(b=>b.onclick=()=>{const x=ITM[b.dataset.go];if(x)ticket(x)});
 const q=$('#q');if(q)q.oninput=()=>{const v=q.value.trim().toLowerCase();let n=0;$$('.ln').forEach(e=>{const h=!!v&&!e.dataset.t.toLowerCase().includes(v);e.hidden=h;if(!h)n++});$('#nr').hidden=n>0}}

/* ===== تذكرة البدء (توضيح إن الامتحان مرة واحدة) ===== */
function ticket(x){const k=kk(x),K=KD[k],q=Number(x.questions)||0,one=once(k);
 const rules=one?[[1,'بيتفتح مرة واحدة بس على حسابك.'],[1,'بعد التسليم مش هتقدر تعيده.'],[0,'لازم تجاوب كل الأسئلة قبل ما تسلّم.'],[0,'تصحيحك وإجاباتك الصح بتظهر بعد التسليم، وتقدر تراجعها في أي وقت.']]
  :[[0,'لازم تجاوب كل الأسئلة قبل ما تسلّم.'],[0,'بتشوف تصحيحك بعد التسليم، وتقدر تراجع إجاباتك في أي وقت.']];
 modal(`<div class="mi" style="background:${K.c}">${IC[K.i]}</div><h3>${esc(x.title)}</h3><p class="mt">${K.n} · ${fmt(q)} سؤال</p><div class="tkp"></div><ul class="rules">${rules.map(r=>`<li class="${r[0]?'w':''}">${IC.check}<span>${r[1]}</span></li>`).join('')}</ul><div class="mact"><button class="btn p" id="gox">${one?'فاهم، ابدأ '+K.n:'ابدأ'}</button><button class="btn" id="no">مش دلوقتي</button></div>`);
 $('#no').onclick=closeM;$('#gox').onclick=()=>{location.href='dashboard.html?x='+encodeURIComponent(x.id)}}

/* ===== الغلاف ===== */
function cover(c,g,enrolled){const img=imgOf(c),l=String(c.title||'ع').trim()[0]||'ع';
 return `<div class="cov${img?' has':''}">${img?`<img src="${esc(img)}" alt="${esc(c.title)}" onerror="this.parentNode.classList.remove('has');this.remove()">`:''}<div class="fb" aria-hidden="true"><i>${esc(l)}</i></div>
 <div class="gb">${(g.length?g:['كل المراحل']).map(x=>`<span class="pill">${esc(x)}</span>`).join('')}</div>
 <span class="chip ${enrolled?'ok':''}">${enrolled?IC.open+'مفتوح':IC.lock+'مقفول'}</span></div>`}
const LVL=p=>p>=100?'وصلت للقمة 🏆':p>=67?'قربت توصل 🔥':p>=34?'في نص الطريق 💪':p>0?'بداية موفقة 🌱':'جاهز تبدأ';

function render(d){DATA=d;C=d.course||{};L=Array.isArray(d.lessons)?d.lessons:[];G=Array.isArray(d.general)?d.general:[];ENR=!!d.enrolled;ITM={};
 ALL=[...L.flatMap(l=>l.items||[]),...G];
 const g=cg(C).map(short);document.title=(C.title||'الكورس')+' | منصة ابن رشدي';$('#tt').textContent=C.title||'الكورس';
 const p=priceOf(C),total=ALL.length,done=ALL.filter(att).length,pct=total?Math.round(done/total*100):0;
 /* أول محاضرة لسه فيها حاجة ناقصة */
 CUR=null;const k=L.findIndex(l=>{const s=stat(l);return s.t>0&&!s.all});
 if(k>=0)CUR=String(k);else if(G.length&&!G.every(att))CUR='end';else if(!total&&L.length)CUR='0';
 let saved='';try{saved=localStorage.getItem('lo_'+id)||''}catch(e){}
 OPEN=ENR?(saved&&(saved==='end'?G.length:L[+saved])?saved:CUR!==null?CUR:'0'):'';
 const stats=[[L.length,'محاضرة'],[ALL.filter(x=>x.kind==='practice').length,'حل أسئلة'],[ALL.filter(x=>x.kind==='homework').length,'واجب'],[ALL.filter(x=>x.kind==='exam').length,'امتحان']].filter(x=>x[0]>0).map(x=>`<span><b>${fmt(x[0])}</b> ${x[1]}</span>`).join('');
 const price=p>0?`<div class="pr">${esc(fmt(p))} <small>ج.م</small></div>`:'<div class="pr free">مجاني</div>';
 const C2=2*Math.PI*36;
 const resume=CUR!==null?`<button class="btn p big" id="rs">${total&&pct===0?'ابدأ من':'كمّل من'} ${CUR==='end'?'المحطة الأخيرة':'المحاضرة '+fmt(+CUR+1)}</button>`:(L.length?'<button class="btn big" id="rs0">راجع المحاضرات</button>':'');
 const blk=ENR?`<div class="pg"><div class="rg"><svg viewBox="0 0 84 84" aria-hidden="true"><circle class="t" cx="42" cy="42" r="36"/><circle class="f" cx="42" cy="42" r="36" style="stroke-dasharray:${C2};stroke-dashoffset:${C2*(1-pct/100)}"/></svg><b dir="ltr">${fmt(pct)}%</b></div><div class="pt2"><b>${LVL(pct)}</b><small>${total?`${fmt(done)} من ${fmt(total)} خطوة اتحلت`:'ابدأ بأول محاضرة'}</small></div></div><div class="buy">${resume}</div>`
  :`<div class="buy">${price}${LOGGED?`<button class="btn p big" id="sub"><span class="sh2"></span>${p>0?'اشترك في الكورس 🔑':'ابدأ الكورس مجانًا 🔑'}</button>`:`<a class="btn p big" href="register.html">أنشئ حساب واشترك ←</a><a class="btn" href="login.html">عندي حساب</a>`}</div>${LOGGED?'<p class="note">💳 السعر بيتخصم من رصيد محفظتك، ولو معاك كود تفعيل فعّله من <a href="dashboard.html">حسابك</a>.</p>':'<p class="note">🔑 لازم تشترك الأول عشان تدخل الكورس. ولو معاك كود تفعيل، فعّله من <a href="dashboard.html">حسابك</a>.</p>'}`;
 const tabs=[['cur','المحاضرات'],['about','عن الكورس'],...(ENR?[]:[['how','إزاي أشترك؟']])];
 V.innerHTML=`<section class="hero">${cover(C,g,ENR)}<div class="head card"><h1>${esc(C.title)}</h1>${stats?`<div class="sm">${stats}</div>`:''}${blk}</div></section><nav class="tabs" role="tablist">${tabs.map(t=>`<button role="tab" data-t="${t[0]}" aria-selected="${t[0]===TAB}" class="${t[0]===TAB?'on':''}">${t[1]}</button>`).join('')}</nav><div id="pn"></div>`;
 $$('.tabs button').forEach(b=>b.onclick=()=>setTab(b.dataset.t));
 paint();
 const go=()=>{TAB='cur';setTab('cur');openL(CUR===null?'0':CUR,true)};
 const rs=$('#rs');if(rs)rs.onclick=go;const r0=$('#rs0');if(r0)r0.onclick=()=>{TAB='cur';setTab('cur');$('.path')?.scrollIntoView({behavior:'smooth',block:'start'})};
 const s=$('#sub');if(s)s.onclick=()=>askSub(C);
 /* شريط الاشتراك السفلي لما زرار الاشتراك يختفي من الشاشة */
 $('#sbar')?.remove();
 if(!ENR){const sb2=document.createElement('div');sb2.className='sb';sb2.id='sbar';
  sb2.innerHTML=`<div>${price}${LOGGED?`<button class="btn p" id="sub2">${p>0?'اشترك في الكورس':'ابدأ مجانًا'}</button>`:'<a class="btn p" href="register.html">أنشئ حساب واشترك</a>'}</div>`;
  document.body.appendChild(sb2);const s2=$('#sub2');if(s2)s2.onclick=()=>askSub(C);
  const tg=$('.buy');if(tg&&'IntersectionObserver'in window)new IntersectionObserver(e=>sb2.classList.toggle('on',!e[0].isIntersecting)).observe(tg);else sb2.classList.add('on')}}

// ===== نافذة الاشتراك =====
function modal(html){closeM();const m=document.createElement('div');m.className='mdl';m.id='md';m.innerHTML=`<div class="mb card" role="dialog" aria-modal="true">${html}</div>`;
 m.onclick=e=>{if(e.target===m&&!BUSY)closeM()};document.body.appendChild(m);return m}
function closeM(){$('#md')?.remove()}
function askSub(c){const p=priceOf(c);
 const m=modal(`<div class="mi">🔑</div><h3>تأكيد الاشتراك</h3>
 <p class="mt">${esc(c.title)}</p>
 <div class="rcp"><div><span>سعر الكورس</span><b>${p>0?esc(fmt(p))+' ج.م':'مجاني'}</b></div>${p>0?'<div><span>العملة</span><b>جنيه مصري (EGP)</b></div><div><span>الخصم من</span><b>💳 رصيد محفظتك</b></div>':''}</div>
 ${p>0?`<p class="fnote">شحن المحفظة بيتم إلكترونيًا عبر <span class="fwb">فوري</span></p><label class="agr"><input type="checkbox" id="ag"><span>قرأت ووافقت على ${LG('terms','الشروط والأحكام')} و${LG('tm-5','سياسة الاسترجاع والإلغاء')} و${LG('tm-6','سياسة التسليم')}.</span></label>`:''}
 <div class="mact"><button class="btn p" id="go"${p>0?' disabled':''}>${p>0?'تأكيد وخصم '+esc(fmt(p))+' ج.م':'تفعيل مجاني'}</button><button class="btn" id="no">إلغاء</button></div>`);
 $('#no').onclick=closeM;$('#go').onclick=()=>doSub(c);
 const ag=$('#ag');if(ag)ag.onchange=()=>{$('#go').disabled=!ag.checked}}
async function doSub(c){if(BUSY)return;if(priceOf(c)>0&&!$('#ag')?.checked)return;BUSY=true;
 const b=$('#go');b.disabled=true;b.textContent='ثواني...';
 let r;try{r=await TO(sb.rpc('enroll_course',{p_course:String(id)}),'enroll')}catch(e){r={error:e}}
 BUSY=false;
 if(r.error||!r.data){console.error('enroll:',r.error);modal(`<div class="mi">😅</div><h3>حصلت مشكلة</h3><p class="mt">مقدرناش نكمّل الاشتراك، ومفيش فلوس اتخصمت. جرّب تاني بعد شوية.</p><div class="mact"><button class="btn p" id="no">تمام</button></div>`);$('#no').onclick=closeM;return}
 const d=r.data;
 if(d.ok||d.error==='already'){
  closeM();
  toast(d.ok&&priceOf(c)>0?`✅ اتخصم ${fmt(priceOf(c))} ج.م. بنوديك للوحتك...`:'✅ تم الاشتراك. بنوديك للوحتك...');
  setTimeout(()=>location.replace('dashboard.html?s='+encodeURIComponent(id)+'#mine'),1000);return}
 if(d.error==='insufficient'){
  const bal=Number(d.balance)||0,pr=Number(d.price)||priceOf(c),need=Math.max(pr-bal,0);
  modal(`<div class="mi">👛</div><h3>رصيدك مش كفاية</h3>
  <p class="mt">محتاج تشحن محفظتك الأول عشان تقدر تشترك.</p>
  <div class="rcp"><div><span>رصيدك الحالي</span><b>${esc(fmt(bal))} ج.م</b></div><div><span>سعر الكورس</span><b>${esc(fmt(pr))} ج.م</b></div><div class="lo"><span>ناقصك</span><b>${esc(fmt(need))} ج.م</b></div></div>
  <ul class="rules"><li>${IC.check}<span>افتح «حسابك» واشحن محفظتك عبر فوري، أو فعّل كود تفعيل لو معاك.</span></li><li>${IC.check}<span>ارجع هنا واضغط «اشترك»، والسعر بيتخصم من رصيدك والكورس بيتفتح فورًا.</span></li></ul><div class="mact"><a class="btn p" href="dashboard.html?w=1#account">اشحن محفظتك ←</a><button class="btn" id="no">رجوع</button></div>`);$('#no').onclick=closeM;return}
 if(d.error==='auth'){location.href='login.html';return}
 modal(`<div class="mi">🤔</div><h3>مش قادرين نكمّل</h3><p class="mt">${esc(d.message||'الكورس ده مش متاح للاشتراك حاليًا.')}</p><div class="mact"><button class="btn p" id="no">تمام</button></div>`);$('#no').onclick=closeM}

function toast(m){let t=$('#ts');if(!t){t=document.createElement('div');t.id='ts';t.className='toast';document.body.appendChild(t)}
 t.textContent=m;t.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>t.hidden=true,5000)}

(async()=>{
 if(!id)return fail('مفيش كورس محدد. ارجع لقايمة الكورسات.');
 const{data:{session}}=await TO(sb.auth.getSession(),'session');LOGGED=!!session;
 $('#bk').href=LOGGED?'dashboard.html#all':'courses.html';
 const r=await TO(sb.rpc('course_content',{p_course:String(id)}),'course');
 if(r.error)throw r.error;
 if(!r.data){V.innerHTML='<div class="empty">🤔 الكورس ده مش موجود أو اتشال.<br><a class="btn p" style="margin-top:14px" href="courses.html">شوف كل الكورسات</a></div>';return}
 /* لو الدالة مرجّعتش صورة الغلاف، نجيبها من جدول الكورسات */
 if(!imgOf(r.data.course||{})){try{const q=await TO(sb.from('courses').select('*').eq('id',id).maybeSingle(),'cover');if(q.data)r.data.course={...q.data,...(r.data.course||{})}}catch(e){console.warn('cover:',e)}}
 /* درجات الطالب علشان نعرض اللي اتحل وتقدّمه */
 if(LOGGED&&r.data.enrolled){try{const a=await TO(sb.from('exam_attempts').select('exam_id,score,total,created_at').eq('student_id',session.user.id),'attempts');
  (a.data||[]).forEach(x=>{const o=ATT[String(x.exam_id)];if(!o||new Date(x.created_at)>new Date(o.created_at))ATT[String(x.exam_id)]=x})}catch(e){console.warn('attempts:',e)}}
 render(r.data);
})().catch(e=>{console.error('course:',e);fail('غالبًا النت ضعيف أو الدالة لسه متشغلتش في Supabase. جرّب تاني.')});
