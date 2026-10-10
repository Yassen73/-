const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
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
