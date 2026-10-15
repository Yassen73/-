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
let LOGGED=false;

function embed(u){u=String(u||'').trim();if(!u)return '';
 let m=u.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
 if(m)return `<iframe src="https://www.youtube-nocookie.com/embed/${m[1]}?rel=0&autoplay=1" title="فيديو الشرح" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
 m=u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
 if(m)return `<iframe src="https://player.vimeo.com/video/${m[1]}?autoplay=1" title="فيديو الشرح" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
 if(/^https?:\/\//i.test(u))return `<video src="${esc(u)}" controls autoplay playsinline controlsList="nodownload"></video>`;
 return ''}

const item=(x,open)=>{const k=KINDS[x.kind]||KINDS.exam;
 return `<div class="it"><span class="ic" style="background:${k[2]}">${k[0]}</span><p><b>${esc(x.title)}</b><small>${Number(x.questions)||0} سؤال</small></p>${open?`<a class="btn p s" href="dashboard.html?x=${encodeURIComponent(x.id)}">ابدأ</a>`:'<span class="lk">🔒 بعد الاشتراك</span>'}</div>`};

function part(kind,list,open){if(!list.length)return '';const k=KINDS[kind];
 return `<div class="pt"><h4>${k[0]} ${k[1]}${list.length>1?' ('+list.length+')':''}</h4>${list.map(x=>item(x,open)).join('')}</div>`}

function lecture(l,i,enrolled){const open=!!l.open,items=Array.isArray(l.items)?l.items:[];
 const by=k=>items.filter(x=>x.kind===k);
 const known=new Set(ORDER);const other=items.filter(x=>!known.has(x.kind));
 const tags=[l.video_url||!open?'🎬 شرح':'',by('homework').length?'📚 واجب':'',by('practice').length?'✍️ حل أسئلة':'',by('exam').length+other.length?'📝 امتحان':''].filter(Boolean).join(' · ');
 const video=open?(l.video_url?`<div class="pt"><h4>🎬 الشرح</h4><div class="vbox" data-v="${i}"><div class="it"><span class="ic" style="background:var(--sage)">▶️</span><p><b>فيديو الشرح</b><small>اضغط للتشغيل</small></p><button class="btn p s" data-play="${i}">شغّل</button></div></div></div>`:`<div class="pt"><h4>🎬 الشرح</h4><div class="it"><span class="ic" style="background:var(--sage)">⏳</span><p><b>الشرح هيتضاف قريب</b></p></div></div>`)
  :`<div class="pt"><h4>🎬 الشرح</h4><div class="it"><span class="ic" style="background:var(--sage)">🔒</span><p><b>فيديو الشرح</b><small>بيفتح بعد الاشتراك</small></p></div></div>`;
 return `<section class="card lec${i===0?' on':''}" data-i="${i}"><button class="lh" aria-expanded="${i===0}"><span class="n">${i+1}</span><span class="tx"><small>المحاضرة ${i+1}</small><b>${esc(l.title)}</b><span>${tags||'—'}</span></span><span class="ch" aria-hidden="true">⌄</span></button>
 <div class="lb">${video}${ORDER.map(k=>part(k,by(k),open)).join('')}${other.length?part('exam',other,open):''}</div></section>`}

function render(d){const c=d.course||{},L=Array.isArray(d.lessons)?d.lessons:[],G=Array.isArray(d.general)?d.general:[],enrolled=!!d.enrolled;
 const all=[...L.flatMap(l=>l.items||[]),...G];
 const nHw=all.filter(x=>x.kind==='homework').length,nEx=all.filter(x=>x.kind==='exam').length,nPr=all.filter(x=>x.kind==='practice').length;
 const g=cg(c).map(short);document.title=(c.title||'الكورس')+' | منصة ابن رشدي';$('#tt').textContent=c.title||'الكورس';
 const price=Number(c.price)>0?`<div class="pr">${esc(c.price)} <small>ج.م</small></div>`:'<div class="pr free">مجاني</div>';
 const cta=enrolled?'<span class="ok">✓ مشترك في الكورس</span><a class="btn p" href="#cur">كمّل التعلم ↓</a>'
  :`${price}${LOGGED?'<button class="btn p" disabled>الاشتراك قريباً</button>':'<a class="btn p" href="register.html">أنشئ حساب واشترك ←</a><a class="btn" href="login.html">عندي حساب</a>'}`;
 V.innerHTML=`<div class="cov">${c.image_url?`<img src="${esc(c.image_url)}" alt="${esc(c.title)}" onerror="this.remove()">`:''}<span class="ph" aria-hidden="true">📘</span><div class="gb">${(g.length?g:['كل المراحل']).map(x=>`<span class="pill">${esc(x)}</span>`).join('')}</div></div>
 <section class="card hd"><h1>${esc(c.title)}</h1>${c.description?`<p class="ds">${esc(c.description)}</p>`:''}
 <div class="stats"><div><b>${L.length}</b><small>محاضرة</small></div><div><b>${nHw}</b><small>واجب</small></div><div><b>${nPr}</b><small>حل أسئلة</small></div><div><b>${nEx}</b><small>امتحان</small></div></div>
 <div class="buy">${cta}</div>${enrolled?'':'<p class="note">🔑 الفيديوهات والواجبات والامتحانات بتفتح بعد الاشتراك. ولو معاك كود تفعيل، فعّله من <a href="dashboard.html">حسابك</a>.</p>'}</section>
 <h2 class="sec" id="cur">محتوى الكورس</h2>
 ${L.length?L.map((l,i)=>lecture(l,i,enrolled)).join(''):'<div class="empty">📚 المحاضرات هتنزل قريب، خليك معانا!</div>'}
 ${G.length?`<h2 class="sec">على الكورس كله</h2><section class="card lec on"><div class="lb" style="display:block;border:0">${ORDER.map(k=>part(k,G.filter(x=>x.kind===k),enrolled)).join('')}${part('exam',G.filter(x=>!ORDER.includes(x.kind)),enrolled)}</div></section>`:''}`;
 $$('.lh').forEach(b=>b.onclick=()=>{const s=b.parentElement,o=s.classList.toggle('on');b.setAttribute('aria-expanded',o)});
 $$('[data-play]').forEach(b=>b.onclick=()=>{const l=L[+b.dataset.play],h=embed(l.video_url),box=b.closest('.vbox');
  box.innerHTML=h?`<div class="vp">${h}</div>`:'<div class="empty">رابط الفيديو مش شغال. كلّم الدعم.</div>'})}

(async()=>{
 if(!id)return fail('مفيش كورس محدد. ارجع لقايمة الكورسات.');
 const{data:{session}}=await TO(sb.auth.getSession(),'session');LOGGED=!!session;
 $('#bk').href=LOGGED?'dashboard.html#all':'courses.html';
 const r=await TO(sb.rpc('course_content',{p_course:String(id)}),'course');
 if(r.error)throw r.error;
 if(!r.data){V.innerHTML='<div class="empty">🤔 الكورس ده مش موجود أو اتشال.<br><a class="btn p" style="margin-top:14px" href="courses.html">شوف كل الكورسات</a></div>';return}
 render(r.data);
})().catch(e=>{console.error('course:',e);fail('غالبًا النت ضعيف أو الدالة لسه متشغلتش في Supabase. جرّب تاني.')});
