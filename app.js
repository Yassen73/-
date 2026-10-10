(async()=>{
const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const root=document.documentElement;try{const t=localStorage.getItem('th');if(t)root.dataset.theme=t}catch(e){}
const sb=supabase.createClient(SB_URL,SB_KEY);
const go=()=>location.replace('login.html');
const{data:{session}}=await sb.auth.getSession();if(!session)return go();
const{data:me}=await sb.from('profiles').select('*').eq('id',session.user.id).single();
if(!me){await sb.auth.signOut();return go()}
const parent=me.role==='parent',first=me.full_name.split(' ')[0];
const[{data:cs},{data:links}]=await Promise.all([sb.from('courses').select('*').order('created_at'),sb.from('parent_links').select('*')]);
const courses=cs||[],L=links||[];
let enr=[],kids=[],pend=[];
if(parent){
 const ok=L.filter(l=>l.status==='approved').map(l=>l.student_id);
 if(ok.length){kids=(await sb.from('profiles').select('id,full_name,grade').in('id',ok)).data||[];enr=(await sb.from('enrollments').select('*').in('student_id',ok)).data||[]}
}else{
 enr=(await sb.from('enrollments').select('*')).data||[];
 const p=L.filter(l=>l.status==='pending'&&l.student_id===me.id).map(l=>l.parent_id);
 if(p.length)pend=(await sb.from('profiles').select('id,full_name').in('id',p)).data||[];
}
const mine=new Set(enr.filter(e=>e.student_id===me.id).map(e=>e.course_id));
const cc=c=>{const on=mine.has(c.id);return`<div class="card"><div class="cv">${esc(c.emoji)}</div><h3>${esc(c.title)}</h3><p class="mt" style="margin:6px 0">${esc(c.description)}</p><p style="margin-bottom:12px"><span class="bd">${esc(c.grade.replace('الصف ',''))}</span> <span class="bd">${c.lessons_count} درس</span> ${on?'<span class="bd ok">مشترك ✓</span>':''}</p>${parent?`<b>${c.price} ج.م</b>`:on?'<button class="btn p" disabled>ابدأ التعلم (قريباً)</button>':`<div style="display:flex;justify-content:space-between;align-items:center"><b>${c.price} ج.م</b><button class="btn p" disabled>الاشتراك قريباً</button></div>`}</div>`};
const V={
home(){const my=courses.filter(c=>mine.has(c.id));
 let h=`<div class="hero"><h2>أهلاً يا ${esc(first)} 👋</h2><p>${parent?'تابع مستوى أبنائك من هنا.':esc(me.grade)+' · كمّل رحلتك مع ابن رشدي.'}</p></div>`;
 h+=pend.map(p=>`<div class="card" style="margin-bottom:14px"><b>${esc(p.full_name)}</b> طلب يربط حسابه كولي أمر لحسابك. <button class="btn p" data-ap="${esc(p.id)}" style="margin-right:8px">موافقة</button></div>`).join('');
 h+=`<div class="st"><div class="card"><b>${parent?kids.length:my.length}</b>${parent?'أبناء مرتبطين':'كورساتي'}</div><div class="card"><b>${courses.length}</b>كورسات متاحة</div></div>`;
 if(parent){h+='<h3 style="margin-bottom:12px">أبنائي</h3>'+(kids.length?kids.map(k=>{const ks=enr.filter(e=>e.student_id===k.id).map(e=>courses.find(c=>c.id===e.course_id)).filter(Boolean);return`<div class="card" style="margin-bottom:12px"><b>${esc(k.full_name)}</b> <span class="bd">${esc(k.grade)}</span><p class="mt">${ks.length?ks.map(c=>esc(c.title)).join(' · '):'مش مشترك في كورسات لسه'}</p></div>`}).join(''):'<div class="card mt">لسه مفيش طالب مرتبط. لما الطالب يوافق على الربط هيظهر هنا.</div>')}
 else h+='<h3 style="margin-bottom:12px">كورساتي</h3>'+(my.length?`<div class="gr">${my.map(cc).join('')}</div>`:'<div class="card mt">لسه مش مشترك في أي كورس. شوف "كل الكورسات".</div>');
 return h},
all(){const gs=[...new Set(courses.map(c=>c.grade))];let g=parent?'الكل':me.grade;if(!gs.includes(g))g='الكل';
 const draw=()=>{$('#v').innerHTML=`<div class="fl">${['الكل',...gs].map(x=>`<button class="btn ${x===g?'on':''}" data-g="${esc(x)}">${esc(x.replace('الصف ',''))}</button>`).join('')}</div><div class="gr">${courses.filter(c=>g==='الكل'||c.grade===g).map(cc).join('')||'<p class="mt">مفيش كورسات هنا لسه.</p>'}</div>`;
  document.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{g=b.dataset.g;draw()})};return draw},
mine(){const my=courses.filter(c=>mine.has(c.id));return my.length?`<div class="gr">${my.map(cc).join('')}</div>`:'<div class="card mt">لسه مش مشترك في أي كورس.</div>'},
async support(){const draw=async()=>{const{data:t}=await sb.from('support_tickets').select('*').order('created_at',{ascending:false});
  $('#v').innerHTML=`<div class="card"><h3>كلّمنا</h3><label>الموضوع</label><input id="sj" maxlength="100"><label>رسالتك</label><textarea id="ms" maxlength="1000"></textarea><div class="er" id="er"></div><button class="btn p" id="sn">إرسال</button></div><h3 style="margin:22px 0 10px">رسايلك</h3><div class="card">${(t||[]).map(x=>`<div class="row"><div><b>${esc(x.subject)}</b><p class="mt">${esc(x.message)}</p></div><span class="bd">${x.status==='open'?'مفتوحة':'اتقفلت'}</span></div>`).join('')||'<p class="mt">مفيش رسايل لسه.</p>'}</div>`;
  $('#sn').onclick=async()=>{const s=$('#sj').value.trim(),m=$('#ms').value.trim();if(s.length<3||m.length<5){$('#er').textContent='اكتب الموضوع والرسالة.';return}
   $('#sn').disabled=true;const{error}=await sb.from('support_tickets').insert({subject:s,message:m});if(error){$('#er').textContent='حصلت مشكلة، جرّب تاني.';$('#sn').disabled=false}else draw()}};return draw},
account(){return`<div class="card">${[['الاسم',me.full_name],['الموبايل',me.phone],['النوع',parent?'ولي أمر':'طالب'],...(parent?[]:[['المرحلة',me.grade],['موبايل ولي الأمر',me.parent_phone]])].map(r=>`<div class="row"><span class="mt">${r[0]}</span><b dir="auto">${esc(r[1])}</b></div>`).join('')}</div>`}};
const N=[['home','🏠','الرئيسية'],['all','📚','كل الكورسات'],...(parent?[]:[['mine','🎓','كورساتي']]),['support','💬','الدعم'],['account','👤','حسابي']];
$('#nav').innerHTML=N.map(n=>`<button class="nv" data-n="${n[0]}">${n[1]} ${n[2]}</button>`).join('');
async function show(k){document.querySelectorAll('.nv[data-n]').forEach(b=>b.classList.toggle('on',b.dataset.n===k));$('#tt').textContent=N.find(n=>n[0]===k)[2];$('#sd').classList.remove('on');
 const r=V[k]();if(typeof r==='function'){await r()}else{const x=await r;$('#v').innerHTML=x}
 document.querySelectorAll('[data-ap]').forEach(b=>b.onclick=async()=>{b.disabled=true;await sb.from('parent_links').update({status:'approved'}).eq('parent_id',b.dataset.ap).eq('student_id',me.id);location.reload()})}
document.querySelectorAll('.nv[data-n]').forEach(b=>b.onclick=()=>{show(b.dataset.n);location.hash=b.dataset.n});
$('#mb').onclick=()=>$('#sd').classList.toggle('on');
$('#th').onclick=()=>{root.dataset.theme=root.dataset.theme=='dark'?'light':'dark';try{localStorage.setItem('th',root.dataset.theme)}catch(e){}};
$('#out').onclick=async()=>{await sb.auth.signOut();go()};
show(V[location.hash.slice(1)]?location.hash.slice(1):'home');
})();
