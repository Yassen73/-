(async()=>{
const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const P={home:'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',book:'M4 19V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2zm0 0a2 2 0 0 0 2 2h14',cap:'M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5',chat:'M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6A8 8 0 1 1 21 12z',user:'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',out:'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',moon:'M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z',check:'M5 12l5 5 9-10',play:'M7 4l13 8-13 8z'};
const ic=n=>`<svg class="ic" viewBox="0 0 24 24"><path d="${P[n]}"/></svg>`;
const root=document.documentElement;try{const t=localStorage.getItem('th');if(t)root.dataset.theme=t}catch(e){}
const sb=supabase.createClient(SB_URL,SB_KEY),go=()=>location.replace('login.html');
const{data:{session}}=await sb.auth.getSession();if(!session)return go();
const{data:me}=await sb.from('profiles').select('*').eq('id',session.user.id).single();
if(!me){await sb.auth.signOut();return go()}
const parent=me.role==='parent',first=me.full_name.split(' ')[0];
const[{data:cs},{data:links}]=await Promise.all([sb.from('courses').select('*').order('created_at'),sb.from('parent_links').select('*')]);
const courses=cs||[],L=links||[];let enr=[],kids=[],pend=[];
if(parent){const ok=L.filter(l=>l.status==='approved').map(l=>l.student_id);
 if(ok.length){kids=(await sb.from('profiles').select('id,full_name,grade').in('id',ok)).data||[];enr=(await sb.from('enrollments').select('*').in('student_id',ok)).data||[]}}
else{enr=(await sb.from('enrollments').select('*')).data||[];
 const p=L.filter(l=>l.status==='pending'&&l.student_id===me.id).map(l=>l.parent_id);
 if(p.length)pend=(await sb.from('profiles').select('id,full_name').in('id',p)).data||[]}
const mine=new Set(enr.filter(e=>e.student_id===me.id).map(e=>e.course_id));
const GR=['linear-gradient(135deg,#1F3A5F,#3A6EA5)','linear-gradient(135deg,#C98A1F,#E8B45A)','linear-gradient(135deg,#2E7D4F,#5FB67F)','linear-gradient(135deg,#8A3B5C,#C4688D)','linear-gradient(135deg,#4A3F8F,#7B6FD0)'];
const pct=(e,c)=>c&&c.lessons_count?Math.min(100,Math.round((e.lessons_done||0)/c.lessons_count*100)):0;
const ring=(p,s=130)=>{const r=42,c=2*Math.PI*r;return`<div class="ring"><svg width="${s}" height="${s}" viewBox="0 0 100 100"><circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--bg2)" stroke-width="10"/><circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--gold)" stroke-width="10" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-p/100)}" transform="rotate(-90 50 50)" style="transition:stroke-dashoffset 1.2s"/></svg><b>${p}%</b></div>`};
const bar=(t,p)=>`<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between"><span>${esc(t)}</span><b>${p}%</b></div><div class="pb"><i style="width:${p}%"></i></div></div>`;
const cc=(c,i)=>{const e=enr.find(x=>x.student_id===me.id&&x.course_id===c.id),p=e?pct(e,c):0;return`<div class="card"><div class="cv" style="background:${GR[i%5]}"><i class="dr">${esc(c.emoji)}</i></div><h3>${esc(c.title)}</h3><p class="mt" style="margin:6px 0 10px">${esc(c.description)}</p><p style="margin-bottom:12px"><span class="bd">${esc(c.grade.replace('الصف ',''))}</span> <span class="bd">${c.lessons_count} درس</span> ${e?'<span class="bd ok">مشترك ✓</span>':''}</p>${e?`${bar('تقدمك',p)}<button class="btn p" disabled style="width:100%">${ic('play')} ابدأ التعلم (قريباً)</button>`:parent?`<b>${c.price} ج.م</b>`:`<div style="display:flex;justify-content:space-between;align-items:center"><b>${c.price} ج.م</b><button class="btn p" disabled>الاشتراك قريباً</button></div>`}</div>`};
const DOORS=`<div class="doors"><img src="doors.webp" alt=""><div class="dt"><h3>كل كورس بيفتحلك باب جديد</h3><p>اختار كورسك الأول وابدأ رحلتك، وتقدّمك هيظهر هنا خطوة بخطوة.</p><button class="btn gld" data-go="all">شوف الكورسات</button></div></div>`;
const QS=['الاستمرار أهم من السرعة. خطوة كل يوم توصلك.','المذاكرة بالفهم بتوفّر عليك نص الوقت.','راجع الدرس في نفس اليوم، هيثبت أكتر.','ابدأ بأصعب مادة وانت لسه نشيط.'];
const hr=new Date().getHours(),greet=hr<12?'صباح الخير':hr<18?'نهارك سعيد':'مساء الخير';
const days=Math.max(1,Math.ceil((Date.now()-new Date(me.created_at))/864e5));
const stat=(n,l,col,i)=>`<div class="card sc"><div class="bx" style="background:${col}">${ic(i)}</div><div><b data-n="${n}">0</b><span>${l}</span></div></div>`;
const V={
home(){const my=courses.map((c,i)=>[c,i]).filter(([c])=>mine.has(c.id)),myE=enr.filter(e=>e.student_id===me.id);
 const done=enr.reduce((a,e)=>a+(e.lessons_done||0),0),avg=enr.length?Math.round(enr.reduce((a,e)=>a+pct(e,courses.find(c=>c.id===e.course_id)),0)/enr.length):0;
 let h=`<div class="hero"><svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="none" stroke="#fff" stroke-width="2"/><circle cx="100" cy="100" r="70" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="3 6"/><path d="M100 5v190M5 100h190" stroke="#fff"/></svg><div class="tx"><span class="chip">${new Date().toLocaleDateString('ar-EG',{weekday:'long',day:'numeric',month:'long'})}</span><h2>${greet} يا ${esc(first)} 👋</h2><p>${parent?'تابع مستوى أبنائك وتقدّمهم خطوة بخطوة.':esc(me.grade)+' · كمّل رحلتك مع ابن رشدي.'}</p></div><div class="arch"><img src="mentor.webp" alt=""></div></div><div class="tip"><i>💡</i><span>${QS[new Date().getDate()%QS.length]}</span></div>`;
 h+=pend.map(p=>`<div class="card" style="margin-bottom:14px"><b>${esc(p.full_name)}</b> طلب يربط حسابه كولي أمر لحسابك. <button class="btn p" data-ap="${esc(p.id)}">موافقة</button></div>`).join('');
 h+=`<div class="st">${parent?stat(kids.length,'أبناء مرتبطين','#1F3A5F','user')+stat(enr.length,'اشتراكات','#2E7D4F','cap'):stat(myE.length,'كورساتي','#1F3A5F','cap')+stat(done,'دروس خلّصتها','#2E7D4F','check')}${stat(courses.length,'كورسات متاحة','#C98A1F','book')+stat(days,'يوم معانا','#8A3B5C','home')}</div>`;
 if(parent)return h+'<h3 class="sh">أبنائي</h3>'+(kids.length?kids.map(k=>{const ke=enr.filter(e=>e.student_id===k.id),a=ke.length?Math.round(ke.reduce((s,e)=>s+pct(e,courses.find(c=>c.id===e.course_id)),0)/ke.length):0;return`<div class="card" style="margin-bottom:14px;display:flex;gap:18px;align-items:center;flex-wrap:wrap">${ring(a,100)}<div style="flex:1;min-width:200px"><b>${esc(k.full_name)}</b> <span class="bd">${esc(k.grade)}</span>${ke.map(e=>{const c=courses.find(x=>x.id===e.course_id);return c?bar(c.title,pct(e,c)):''}).join('')||'<p class="mt">مش مشترك في كورسات لسه.</p>'}</div></div>`}).join(''):'<div class="card mt">لسه مفيش طالب مرتبط. لما الطالب يوافق على الربط هيظهر هنا.</div>');
 if(!my.length)return h+DOORS;
 h+=`<div class="g2"><div class="card" style="text-align:center"><h3 style="margin-bottom:10px">تقدّمك العام</h3>${ring(avg,150)}</div><div class="card"><h3 style="margin-bottom:14px">تقدّم كل كورس</h3>${my.length?my.map(([c])=>bar(c.title,pct(myE.find(e=>e.course_id===c.id),c))).join(''):'<p class="mt">اشترك في كورس وهتشوف تقدّمك هنا 📈</p>'}</div></div>`;
 return h+'<h3 class="sh">كورساتي</h3>'+(my.length?`<div class="gr">${my.map(([c,i])=>cc(c,i)).join('')}</div>`:'<div class="card mt">لسه مش مشترك في أي كورس. شوف "كل الكورسات".</div>')},
all(){const gs=[...new Set(courses.map(c=>c.grade))];let g=parent?'الكل':me.grade,q='';if(!gs.includes(g))g='الكل';
 const draw=()=>{const l=courses.map((c,i)=>[c,i]).filter(([c])=>(g==='الكل'||c.grade===g)&&(c.title+c.description).includes(q));
  $('#v').innerHTML=`<input id="q" placeholder="🔍 ابحث عن كورس..." value="${esc(q)}"><div class="fl">${['الكل',...gs].map(x=>`<button class="btn ${x===g?'on':''}" data-g="${esc(x)}">${esc(x.replace('الصف ',''))}</button>`).join('')}</div><div class="gr">${l.map(([c,i])=>cc(c,i)).join('')||'<p class="mt">مفيش كورسات هنا لسه.</p>'}</div>`;
  document.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{g=b.dataset.g;draw()});const i=$('#q');i.oninput=()=>{q=i.value.trim();draw();const n=$('#q');n.focus();n.setSelectionRange(q.length,q.length)}};return draw},
mine(){const my=courses.map((c,i)=>[c,i]).filter(([c])=>mine.has(c.id));return my.length?`<div class="gr">${my.map(([c,i])=>cc(c,i)).join('')}</div>`:'<div class="card mt">لسه مش مشترك في أي كورس.</div>'},
support(){const draw=async()=>{const{data:t}=await sb.from('support_tickets').select('*').order('created_at',{ascending:false});
  $('#v').innerHTML=`<div class="g2" style="grid-template-columns:1fr 1fr"><div class="card"><h3>كلّمنا</h3><label>الموضوع</label><input id="sj" maxlength="100"><label>رسالتك</label><textarea id="ms" maxlength="1000"></textarea><div class="er" id="er"></div><button class="btn p" id="sn">إرسال</button></div><div class="card"><h3 style="margin-bottom:6px">أسئلة شائعة</h3><details><summary>إزاي أشترك في كورس؟</summary><p>الاشتراك بيتفعّل من الإدارة لحد ما الدفع الإلكتروني يتجهز. ابعتلنا رسالة هنا.</p></details><details><summary>إزاي أربط حساب ولي الأمر؟</summary><p>ولي الأمر بيسجّل من صفحة "ولي أمر" برقم الطالب، والطالب بيوافق من الرئيسية.</p></details><details><summary>نسيت كلمة المرور</summary><p>ابعتلنا رسالة هنا باسمك ورقمك وهنساعدك.</p></details></div></div><h3 style="margin:22px 0 10px">رسايلك</h3><div class="card">${(t||[]).map(x=>`<div class="row"><div><b>${esc(x.subject)}</b><p class="mt">${esc(x.message)}</p></div><span class="bd">${x.status==='open'?'مفتوحة':'اتقفلت'}</span></div>`).join('')||'<p class="mt">مفيش رسايل لسه.</p>'}</div>`;
  $('#sn').onclick=async()=>{const s=$('#sj').value.trim(),m=$('#ms').value.trim();if(s.length<3||m.length<5){$('#er').textContent='اكتب الموضوع والرسالة.';return}
   $('#sn').disabled=true;const{error}=await sb.from('support_tickets').insert({subject:s,message:m});if(error){$('#er').textContent='حصلت مشكلة، جرّب تاني.';$('#sn').disabled=false}else draw()}};return draw},
account(){const ini=me.full_name.trim().split(/\s+/).slice(0,2).map(w=>w[0]).join('');
 return`<div class="card" style="max-width:560px"><div class="av">${esc(ini)}</div><h2 style="text-align:center">${esc(me.full_name)}</h2><p class="mt" style="text-align:center;margin-bottom:14px"><span class="bd">${parent?'ولي أمر':'طالب'}</span></p>${[['الموبايل',me.phone],...(parent?[]:[['المرحلة',me.grade],['موبايل ولي الأمر',me.parent_phone]]),['عضو من',new Date(me.created_at).toLocaleDateString('ar-EG')]].map(r=>`<div class="row"><span class="mt">${r[0]}</span><b dir="auto">${esc(r[1])}</b></div>`).join('')}<button class="btn" id="o2" style="width:100%;margin-top:16px">تسجيل الخروج</button></div>`}};
const N=[['home','home','الرئيسية'],['all','book','الكورسات'],...(parent?[]:[['mine','cap','كورساتي']]),['support','chat','الدعم'],['account','user','حسابي']];
$('#nav').innerHTML=N.map(n=>`<button class="nv" data-n="${n[0]}">${ic(n[1])}<span>${n[2]}</span></button>`).join('');
$('#out').innerHTML=ic('out')+'<span>تسجيل الخروج</span>';$('#th').innerHTML=ic('moon');
const out=async()=>{await sb.auth.signOut();go()};$('#out').onclick=out;
function count(){document.querySelectorAll('[data-n]').forEach(el=>{if(el.tagName==='BUTTON')return;const n=+el.dataset.n,t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/800);el.textContent=Math.round(n*k);if(k<1)requestAnimationFrame(f)})(t0)})}
async function show(k){document.querySelectorAll('.nv[data-n]').forEach(b=>b.classList.toggle('on',b.dataset.n===k));$('#tt').textContent=N.find(n=>n[0]===k)[2];
 const r=await V[k]();if(typeof r==='function')await r();else $('#v').innerHTML=r;count();scrollTo(0,0);
 document.querySelectorAll('.pb i').forEach(i=>{const w=i.style.width;i.style.width=0;setTimeout(()=>i.style.width=w,50)});
 document.querySelectorAll('[data-ap]').forEach(b=>b.onclick=async()=>{b.disabled=true;await sb.from('parent_links').update({status:'approved'}).eq('parent_id',b.dataset.ap).eq('student_id',me.id);location.reload()});
 const o=$('#o2');if(o)o.onclick=out;document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>document.querySelector('.nv[data-n="'+b.dataset.go+'"]').click())}
document.querySelectorAll('.nv[data-n]').forEach(b=>b.onclick=()=>{show(b.dataset.n);history.replaceState(0,'','#'+b.dataset.n)});
$('#th').onclick=()=>{root.dataset.theme=root.dataset.theme=='dark'?'light':'dark';try{localStorage.setItem('th',root.dataset.theme)}catch(e){}};
show(V[location.hash.slice(1)]&&N.some(n=>n[0]===location.hash.slice(1))?location.hash.slice(1):'home');
})();
