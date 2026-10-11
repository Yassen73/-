const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

// ===== إعدادات الموقع: عدّل هنا بس =====
const SITE={
 whatsapp:'',   // رقم واتساب بالصيغة الدولية بدون + (مثال 201001234567)
 phone:'',      // رقم للتواصل يظهر في الفوتر (مثال 01001234567)
 youtube:'',    // رابط قناة اليوتيوب
 telegram:'',   // رابط قناة/جروب التليجرام
 introVideo:''  // رابط فيديو يوتيوب التعريفي (أو رابط ملف mp4)
};
// نتايج الطلاب: صور النتايج (حطها في فولدر results). مثال: {img:'results/1.jpg',cap:'نتيجة أحمد'}
const RESULTS=[];
// الأوائل. مثال: {name:'أحمد محمد',grade:'الصف الثالث الثانوي',score:'98%',img:''}
const TOPPERS=[];
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const toast=m=>{const t=$('#toast');if(!t)return;t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2600)};
// أسنان الأسطرلاب
(()=>{let h='';for(let i=0;i<72;i++){const a=i*5*Math.PI/180,l=i%6?6:14;h+=`<line x1="${200+150*Math.cos(a)}" y1="${200+150*Math.sin(a)}" x2="${200+(150-l)*Math.cos(a)}" y2="${200+(150-l)*Math.sin(a)}"/>`}$('#tk').innerHTML=h})();
// الوضع
const root=document.documentElement,th=$('#th');
try{const t=localStorage.getItem('th');if(t)root.dataset.theme=t}catch(e){}
const sync=()=>th.textContent=root.dataset.theme=='dark'?'☾':'☀';sync();
th.onclick=()=>{root.dataset.theme=root.dataset.theme=='dark'?'light':'dark';sync();try{localStorage.setItem('th',root.dataset.theme)}catch(e){}};
$('#menu').onclick=()=>$('#links').classList.toggle('on');
$$('.links a').forEach(a=>a.onclick=()=>$('#links').classList.remove('on'));
// زرار الصعود مع حلقة التقدم
const up=$('#up'),rg=$('#rg');
const upd=()=>{const m=document.documentElement.scrollHeight-innerHeight,p=m>0?Math.min(scrollY/m,1):0;rg.style.strokeDashoffset=157.1*(1-p);up.classList.toggle('on',scrollY>300)};
addEventListener('scroll',upd,{passive:true});upd();
up.onclick=()=>scrollTo({top:0,behavior:'smooth'});
// العدادات
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);const el=e.target,n=+el.dataset.n,t0=performance.now();
const f=t=>{const k=Math.min((t-t0)/1400,1);el.textContent=Math.round(n*(1-Math.pow(1-k,3))).toLocaleString('en')+el.dataset.s;if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}),{threshold:.6});
$$('[data-n]').forEach(e=>io.observe(e));
// المراحل
const T=(l,t)=>[l,t];
const LV=[
{n:'الابتدائي',c:'var(--sage)',g:[
{t:'الصف الرابع الابتدائي',d:'بداية قوية: قراءة سليمة وإملاء صحيح وقواعد مبسطة.',n:[40,10,25],tp:[['ق','القراءة والفهم','قطع قصيرة وأسئلة'],['إ','الإملاء','الهمزة والتاء'],['ن','القواعد','الاسم والفعل والحرف'],['ت','التعبير','جمل وفقرة قصيرة']]},
{t:'الصف الخامس الابتدائي',d:'نصوص أطول، وقواعد أوضح، وكتابة أكثر ترابطًا.',n:[45,10,30],tp:[['ق','القراءة','استنتاج وفهم'],['إ','الإملاء','الهمزات والألف اللينة'],['ن','القواعد','الجملة الاسمية والفعلية'],['ت','التعبير','فقرة مترابطة']]},
{t:'الصف السادس الابتدائي',d:'تثبيت المهارات وتجهيز قوي لدخول المرحلة الإعدادية.',n:[55,12,35],tp:[['ق','القراءة','نصوص متنوعة'],['إ','الإملاء','مراجعة القواعد'],['ن','القواعد','المبتدأ والخبر والفاعل'],['ت','التعبير','موضوع وخطاب']]}]},
{n:'الإعدادي',c:'var(--sky)',g:[
{t:'الصف الأول الإعدادي',d:'أساس النحو والصرف مع تدريب على فهم النصوص.',n:[55,12,38],tp:[['ن','النحو','الجملة وأقسام الكلام'],['ص','الصرف','المشتقات والأفعال'],['ق','القراءة والنصوص','فهم وتحليل'],['ت','التعبير','فقرة وموضوع']]},
{t:'الصف الثاني الإعدادي',d:'إعراب أعمق وتذوق للنصوص الأدبية.',n:[65,14,45],tp:[['ع','الإعراب','الجمل والتراكيب'],['ب','البلاغة','مدخل مبسط'],['أ','الأدب والنصوص','قراءة وتذوق'],['ت','التعبير','مقال قصير']]},
{t:'الصف الثالث الإعدادي',d:'تحضير للشهادة الإعدادية بمراجعات وامتحانات تجريبية.',n:[85,20,60],tp:[['ن','النحو','مراجعة شاملة'],['ب','البلاغة','التشبيه والاستعارة'],['ن','النصوص','تحليل وأسئلة'],['م','نماذج امتحان','بتصحيح فوري']]}]},
{n:'الثانوي',c:'var(--rose)',g:[
{t:'الصف الأول الثانوي',d:'أساس قوي في اللغة: قواعد واضحة وفهم للنصوص من أول يوم.',n:[60,12,40],tp:[['ن','النحو','الجملة الاسمية والفعلية'],['ص','الصرف','الأفعال والمشتقات'],['ق','القراءة','فهم المقروء والاستنتاج'],['ت','التعبير','كتابة فقرة مترابطة']]},
{t:'الصف الثاني الثانوي',d:'تعمّق في الأدب والبلاغة، وتدريب مستمر على التحليل.',n:[80,15,55],tp:[['ب','البلاغة','التشبيه والاستعارة'],['أ','الأدب','من الجاهلي للعباسي'],['ع','الإعراب','أساليب وتراكيب متقدمة'],['ن','النصوص','تحليل وتذوق']]},
{t:'الصف الثالث الثانوي',d:'تحضير مكثف للامتحان النهائي بمراجعات وامتحانات تجريبية.',n:[100,25,70],tp:[['م','مراجعة شاملة','المنهج كله في خطة واضحة'],['ن','نماذج امتحان','بتصحيح فوري وشرح'],['ح','الأدب الحديث','أعلام ونصوص'],['ر','التعبير','مقال ورسالة']]}]}];
let li=0,gi=0;const pn=$('#pn');
function stg(){const L=LV[li],g=L.g[gi];pn.style.setProperty('--tint',L.c);pn.style.animation='none';pn.offsetHeight;pn.style.animation='';
$('#lv').innerHTML=LV.map((x,i)=>`<button role="tab" aria-selected="${i==li}" data-l="${i}">${x.n}</button>`).join('');
$('#gt').innerHTML=L.g.map((x,i)=>`<button role="tab" aria-selected="${i==gi}" data-g="${i}">${x.t.replace('الصف ','')}</button>`).join('');
pn.innerHTML=`<div><h3>${g.t}</h3><p class="d">${g.d}</p><div class="mn"><div><b>+${g.n[0]}</b><small>درس</small></div><div><b>+${g.n[1]}</b><small>امتحان</small></div><div><b>+${g.n[2]}</b><small>ساعة شرح</small></div></div><a class="btn p" href="register.html">سجّل في ${g.t.replace('الصف ','')}</a></div><div class="tp">${g.tp.map(x=>`<div><i>${x[0]}</i><p><b>${x[1]}</b><span>${x[2]}</span></p></div>`).join('')}</div>`;
$$('#lv button').forEach(b=>b.onclick=()=>{li=+b.dataset.l;gi=0;stg()});$$('#gt button').forEach(b=>b.onclick=()=>{gi=+b.dataset.g;stg()})}
stg();
// الأسئلة
const FQ=[['المنصة مناسبة لأي مرحلة؟','المنصة بتغطي من الصف الرابع الابتدائي لحد الثالث الثانوي، ولكل صف منهجه ودروسه وامتحاناته.'],
['إيه اللي بيميز المنصة؟','الشرح المبسط مع الفهم العميق، وامتحان بعد كل درس بتصحيح فوري وشرح للإجابة.'],
['هل في متابعة شخصية لكل طالب؟','أيوه، فريق الدعم بيتابع مستواك وبيرد على استفساراتك في أقل من 24 ساعة.'],
['ولي الأمر يقدر يتابع ابنه؟','طبعًا. من حساب ولي الأمر، وبرقم موبايل الطالب، بيتابع المستوى ونتايج الامتحانات.'],
['أقدر أذاكر من الموبايل؟','أكيد، المنصة شغالة على أي جهاز وبتحفظ مكان وقوفك وتكمل منه.'],
['أبدأ إزاي؟','أنشئ حسابك، اختار صفك، واشترك في الكورس. الدروس بتفتح بعد تأكيد الاشتراك.']];
let tm;
function ask(i){clearInterval(tm);$$('#ql button').forEach((b,k)=>b.setAttribute('aria-pressed',k==i));const t=FQ[i][1],el=$('#at');el.textContent='';let n=0;
if(matchMedia('(prefers-reduced-motion:reduce)').matches){el.textContent=t;return}
tm=setInterval(()=>{el.textContent=t.slice(0,++n);if(n>=t.length)clearInterval(tm)},16)}
$('#ql').innerHTML=FQ.map((q,i)=>`<button aria-pressed="false" data-i="${i}">${q[0]}</button>`).join('');
$$('#ql button').forEach(b=>b.onclick=()=>{ask(+b.dataset.i);if(innerWidth<860)$('#ans').scrollIntoView({block:'nearest',behavior:'smooth'})});ask(0);

// ===== حالة الدخول (شكلية بس؛ الأمان الحقيقي في dashboard) =====
(()=>{let on=false;try{const t=JSON.parse(localStorage.getItem('sb-btviglpxeukwypkantqi-auth-token')||'null');on=!!(t&&(t.access_token||t.currentSession)&&(!t.expires_at||t.expires_at*1000>Date.now()||t.refresh_token))}catch(e){}
 if(!on)return;
 document.querySelectorAll('a[href="register.html"]').forEach(a=>{a.href='dashboard.html';a.textContent='لوحتي ←'});
 document.querySelectorAll('a[href="login.html"],a[href="parent.html"]').forEach(a=>{a.style.display='none'})})();
// ===== واتساب العايم (بيظهر دايمًا؛ لو الرقم فاضي بيطلع رسالة) =====
(()=>{const a=document.getElementById('wa');if(!a)return;const WA=(SITE.whatsapp||'').replace(/\D/g,'');a.style.display='grid';document.body.classList.add('wa-on');
if(WA)a.href='https://wa.me/'+WA+'?text='+encodeURIComponent('أهلاً، عندي استفسار عن منصة ابن رشدي');
else a.onclick=e=>{e.preventDefault();toast('رقم الواتساب هيتضاف قريب')}})();

// ===== الفيديو التعريفي =====
(()=>{const b=$('#vp');if(!b)return;
b.onclick=()=>{const v=(SITE.introVideo||'').trim();if(!v){toast('الفيديو التعريفي هيتضاف قريب');return}
const m=v.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)||(/^[\w-]{11}$/.test(v)?[0,v]:null);
b.parentElement.innerHTML=m?`<iframe src="https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0" title="فيديو تعريفي" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`:`<video src="${esc(v)}" controls autoplay playsinline></video>`}})();

// ===== نتايج الطلاب =====
(()=>{const rs=$('#rs'),tp=$('#tops');if(!rs||!tp)return;
const R=RESULTS.length?RESULTS:[null,null,null,null];
rs.innerHTML=R.map((r,i)=>r?`<button class="rf" data-i="${i}" aria-label="${esc(r.cap||'عرض النتيجة')}"><img src="${esc(r.img)}" alt="${esc(r.cap||'نتيجة طالب')}" loading="lazy"></button>`:`<div class="rf ph"><div><span>🏆</span>صورة نتيجة طالب</div></div>`).join('');
const T=TOPPERS.length?TOPPERS:[null,null,null,null,null,null];
tp.innerHTML=T.map(t=>t?`<div class="top-row"><i>${t.img?`<img src="${esc(t.img)}" alt="">`:esc(t.name.trim().charAt(0))}</i><p><b>${esc(t.name)}</b><span>${esc(t.grade||'')}</span></p>${t.score?`<em>${esc(t.score)}</em>`:''}</div>`:`<div class="top-row ph"><i>★</i><p><b>اسم الطالب</b><span>الصف الدراسي</span></p><em>الدرجة</em></div>`).join('');
const lb=$('#lb'),lbi=$('#lbi');
rs.addEventListener('click',e=>{const b=e.target.closest('.rf[data-i]');if(!b)return;const r=R[+b.dataset.i];lbi.src=r.img;lbi.alt=r.cap||'';lb.classList.add('on')});
lb.onclick=()=>lb.classList.remove('on');addEventListener('keydown',e=>{if(e.key=='Escape')lb.classList.remove('on')})})();

// ===== الفوتر: سوشيال وتواصل =====
(()=>{const s=$('#soc'),c=$('#ct');if(!s)return;
const add=(href,label,d)=>s.insertAdjacentHTML('beforeend',`<a href="${esc(href)}" target="_blank" rel="noopener noreferrer" aria-label="${label}"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg></a>`);
if(SITE.youtube)add(SITE.youtube,'قناتنا على يوتيوب','M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z');
if(SITE.telegram)add(SITE.telegram,'تليجرام','M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z');
const WA=(SITE.whatsapp||'').replace(/\D/g,'');
if(WA)add('https://wa.me/'+WA,'واتساب','M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.3c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.6-.1 1.1z');
if(SITE.phone&&c)c.innerHTML=`<a href="tel:${esc(SITE.phone.replace(/\s/g,''))}" dir="ltr" style="text-align:right">${esc(SITE.phone)}</a>`})();

// ===== حركة دخول الأقسام (خفيفة، مرة واحدة) =====
(()=>{if(matchMedia('(prefers-reduced-motion:reduce)').matches||!('IntersectionObserver' in window))return;
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
$$('section:not(.hero) h2,section:not(.hero) .sub,.grid3>.card,.steps>.step,.st,.pn,.qa,.final,.vf,.rs,.tops,.ab>*,#branches .wrap>div>div').forEach(el=>{const i=[...el.parentElement.children].indexOf(el);el.style.setProperty('--d',Math.min(i,5)*.07+'s');el.classList.add('rv');ro.observe(el)})})();
