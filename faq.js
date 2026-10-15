
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

const FAQ=[["عن المنصة", "المنصة مناسبة لأي مرحلة؟", "المنصة بتغطي من الصف الرابع الابتدائي لحد الثاني الثانوي، ولكل صف منهجه ودروسه وامتحاناته."], ["عن المنصة", "إيه اللي بيميز المنصة؟", "الشرح المبسط مع الفهم العميق، وامتحان بعد كل درس بتصحيح فوري وشرح للإجابة. وكمان المنصة بتحفظ الأسئلة اللي غلطت فيها في «بنك أخطائي» عشان تراجعها وقت ما تحب."], ["عن المنصة", "أقدر أذاكر من الموبايل؟", "أكيد، المنصة شغالة على أي جهاز (موبايل أو تابلت أو كمبيوتر)، وفيها وضع داكن وفاتح تختار منهم اللي يريّح عينك."], ["عن المنصة", "هل في متابعة شخصية لكل طالب؟", "أيوه، فريق الدعم بيتابع مستواك وبيرد على استفساراتك في أقل من 24 ساعة."], ["الحساب والتسجيل", "أبدأ إزاي؟", "أنشئ حسابك من صفحة <a href=\"register.html\">إنشاء حساب</a>، اختار صفك، وبعدها هتلاقي الكورسات المناسبة ليك جوه حسابك. الدروس بتفتح بعد تأكيد الاشتراك."], ["الحساب والتسجيل", "أنا في تانية أو تالتة ثانوي، لازم أختار مسار؟", "في الصف الأول والثاني الثانوي بتختار مسارك (بكالوريا أو أزهر أو عام) وقت التسجيل، وبعدها الكورسات والامتحانات بتظهرلك على حسب صفك ومسارك بالظبط."], ["الحساب والتسجيل", "أقدر أشوف الكورسات قبل ما أعمل حساب؟", "أيوه، من صفحة <a href=\"courses.html\">الكورسات</a> تقدر تشوف كل كورس نازل وتفاصيله: الحصص والامتحانات والواجبات اللي جواه والسعر، من غير ما تسجّل. بس الفيديوهات والامتحانات نفسها بتفتح بعد الاشتراك."], ["الاشتراك والمحفظة", "إزاي أفعّل كورس أو حصة؟", "لو معاك كود كورس أو حصة، اكتبه في خانة «عندك كود كورس أو حصة؟» جوه حسابك ودوس تفعيل. لو محتاج مساعدة ابعتلنا من قسم الدعم وهنساعدك."], ["الاشتراك والمحفظة", "إزاي أشحن المحفظة؟", "من حسابك دوس «شحن المحفظة»، حوّل المبلغ على الرقم اللي بيظهرلك، وبعدها اكتب رقم الموبايل اللي حوّلت منه وارفع صورة التحويل. هنراجع الطلب ونضيف الرصيد."], ["الاشتراك والمحفظة", "طلب الشحن بياخد وقت قد إيه؟", "الطلبات بتتراجع يدويًا عشان الأمان، وبنضيف الرصيد بعد المراجعة. لو اتأخر، ابعتلنا من قسم الدعم وإنت محضّر صورة التحويل."], ["ولي الأمر", "ولي الأمر يقدر يتابع ابنه؟", "طبعًا. ولي الأمر بيعمل حساب من صفحة <a href=\"parent.html\">ولي أمر</a> ويبعت طلب ربط برقم موبايل الطالب، والطالب بيوافق من حسابه. بعدها بيتابع المستوى ونتايج الامتحانات والواجبات."], ["ولي الأمر", "ابني مش شايف طلب الربط، أعمل إيه؟", "الطلب بيظهر للطالب جوه حسابه في الصفحة الرئيسية للوحة. اتأكد إن رقم الموبايل اللي كتبته هو نفس رقم الطالب المسجّل، ولو لسه مش ظاهر كلّم الدعم."], ["الامتحانات والدعم", "الامتحانات والواجبات بتتصحح إزاي؟", "التصحيح فوري أول ما تخلص، وبتشوف درجتك والإجابة الصح مع الشرح. الأسئلة اللي غلطت فيها بتتحفظ في «بنك أخطائي» تراجعها بعدين."], ["الامتحانات والدعم", "لو عندي مشكلة أو استفسار أكلم مين؟", "من داخل حسابك افتح قسم الدعم وابعت رسالتك، وبنرد في أقل من 24 ساعة. وتقدر كمان تكلمنا على واتساب من الزرار الأخضر في الصفحة."]];
const CATS=['الكل',...new Set(FAQ.map(x=>x[0]))];
let cat='الكل',q='';
const norm=s=>String(s).toLowerCase().replace(/[\u064B-\u0652\u0640]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه');
$('#cats').innerHTML=CATS.map(c=>`<button aria-pressed="${c===cat}" data-c="${esc(c)}">${esc(c)}</button>`).join('');
const strip=h=>h.replace(/<[^>]+>/g,'');
function draw(){const nq=norm(q.trim());
 const l=FAQ.filter(x=>(cat==='الكل'||x[0]===cat)&&(!nq||norm(x[1]+' '+strip(x[2])).includes(nq)));
 $('#fl').innerHTML=l.map(x=>`<details><summary><span>${esc(x[1])}${cat==='الكل'?`<span class="tg">${esc(x[0])}</span>`:''}</span></summary><p>${x[2]}</p></details>`).join('');
 $('#none').hidden=!!l.length;$('#cnt').textContent=l.length?l.length+' سؤال':'';
 $$('#cats button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.c===cat))}
$$('#cats button').forEach(b=>b.onclick=()=>{cat=b.dataset.c;draw()});
$('#q').oninput=e=>{q=e.target.value;draw()};
draw();
(()=>{const a=$('#wb'),n=WA_NUM.replace(/\D/g,'');if(n){a.href='https://wa.me/'+n+'?text='+encodeURIComponent('أهلاً، عندي استفسار عن منصة ابن رشدي');a.target='_blank';a.rel='noopener noreferrer'}else a.onclick=e=>{e.preventDefault();toast('رقم الواتساب هيتضاف قريب')}})();
