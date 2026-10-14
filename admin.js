(async()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const root=document.documentElement;try{const t=localStorage.getItem('th');if(t)root.dataset.theme=t}catch(e){}
const sb=supabase.createClient(SB_URL,SB_KEY),go=u=>location.replace(u);
const{data:{session}}=await sb.auth.getSession();if(!session)return go('login.html');
const{data:me}=await sb.from('profiles').select('*').eq('id',session.user.id).single();
if(!me||me.role!=='admin')return go('dashboard.html');

/* ===== المراحل والمسارات (مفيش ثالثة ثانوي) ===== */
const GR=['الصف الرابع الابتدائي','الصف الخامس الابتدائي','الصف السادس الابتدائي','الصف الأول الإعدادي','الصف الثاني الإعدادي','الصف الثالث الإعدادي','الصف الأول الثانوي','الصف الثاني الثانوي'];
const SECG=GR.slice(6),STG=[['ابتدائي',GR.slice(0,3)],['إعدادي',GR.slice(3,6)],['ثانوي',SECG]],TRK=['عام','بكالوريا','أزهر'];
const short=g=>String(g||'').replace('الصف ','');
const GP=(g=[],t=[])=>`<div class="gp"><label class="fl">المراحل (اختار صف أو أكتر، وسيبها فاضية لو للكل)</label>${STG.map(([n,l])=>`<div class="gs"><label class="chk"><input type="checkbox" data-st> <b>كل ${n}</b></label><div class="chs">${l.map(x=>`<label class="chp"><input type="checkbox" name="gr" value="${x}"${g.includes(x)?' checked':''}> ${short(x)}</label>`).join('')}</div></div>`).join('')}<div class="tkw"><label class="fl">المسار (إجباري للثانوي — المحتوى هيظهر لطلاب المسار ده بس)</label><div class="chs">${TRK.map(x=>`<label class="chp"><input type="checkbox" name="tr" value="${x}"${t.includes(x)?' checked':''}> ${x}</label>`).join('')}</div></div></div>`;
const secOn=m=>[...m.querySelectorAll('[name=gr]:checked')].some(i=>SECG.includes(i.value));
const GV=m=>({grades:[...m.querySelectorAll('[name=gr]:checked')].map(i=>i.value),tracks:secOn(m)?[...m.querySelectorAll('[name=tr]:checked')].map(i=>i.value):[]});
const GCHK=m=>{const v=GV(m);return secOn(m)&&!v.tracks.length?'اختار المسار (عام / بكالوريا / أزهر) للصف الثانوي.':''};
const gpc=(m,e)=>{const t=e&&e.target;if(t&&t.dataset.st!==undefined)t.closest('.gs').querySelectorAll('[name=gr]').forEach(i=>i.checked=t.checked);const w=m.querySelector('.tkw');if(w)w.style.display=secOn(m)?'':'none'};
const gtxt=(g,t)=>{g=Array.isArray(g)?g:[];t=Array.isArray(t)?t:[];return(g.length?g.map(short).join('، '):'كل المراحل')+(t.length&&t.length<3?' · '+t.join('، '):'')};

/* ===== أدوات عامة ===== */
const T=t=>{const d=document.createElement('div');d.className='toast';d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),3800)};
const LS=(t,q)=>sb.rpc('admin_list',{p_table:t}).then(r=>{if(r.error){q||T('خطأ: '+r.error.message);return[]}return r.data||[]});
const E=async(t,f,q)=>{let r=await LS(t,q),k=null,d=1,n=null;const o={select:()=>o,eq:(a,b)=>{r=r.filter(x=>String(x[a])===String(b));return o},order:(a,p)=>{k=a;d=p&&p.ascending===false?-1:1;return o},limit:x=>{n=x;return o}};f(o);if(k)r=[...r].sort((a,b)=>(a[k]>b[k]?1:a[k]<b[k]?-1:0)*d);return n?r.slice(0,n):r};
const SV=(tb,id,row)=>sb.rpc('admin_save',{p_table:tb,p_id:id==null?null:String(id),p_row:row});
const L=(a,d)=>sb.from('admin_log').insert({admin:me.id,action:a,detail:d});
const RP=async(n,a)=>{const r=await sb.rpc(n,a);if(r.error){T('خطأ: '+r.error.message);return 0}T('تم ✅');return 1};
const NEEDSQL=e=>/function|does not exist|schema cache|relation/i.test(e&&e.message||'')?'لازم تشغّل ملف database.sql في Supabase الأول.':'خطأ: '+(e&&e.message||'');
const dt=x=>new Date(x).toLocaleDateString('ar-EG',{day:'numeric',month:'short'});
const dtm=x=>new Date(x).toLocaleString('ar-EG',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'});
const num=n=>Number(n||0).toLocaleString('ar-EG');
const code=p=>p+'-'+(Math.random().toString(36)+'00000000').slice(2,10).toUpperCase();
const CP=async t=>{try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(_){}a.remove()}T('اتنسخ ✅')};
const CSV=rows=>rows.map(r=>r.map(c=>{c=String(c??'');if(/^[=+\-@]/.test(c))c="'"+c;return'"'+c.replace(/"/g,'""')+'"'}).join(',')).join('\r\n');
const DL=(n,t)=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+t],{type:'text/csv;charset=utf-8'}));a.download=n;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},600)};
function M(h){const m=document.createElement('div');m.className='mdl';m.innerHTML='<div class="mb card"><button class="mx" aria-label="إغلاق">✕</button>'+h+'</div>';document.body.appendChild(m);const c=()=>m.remove();m.onclick=e=>{if(e.target===m)c()};m.querySelector('.mx').onclick=c;m.addEventListener('change',e=>gpc(m,e));gpc(m);return{m,c}}
const F=(f,v={})=>f.map(([k,l,t,o])=>t==='gp'?GP(v.grades||[],v.tracks||[]):`<label class="fl">${l}</label>`+(t==='sel'?`<select name="${k}">${o.map(x=>`<option value="${esc(x[0])}"${String(v[k]??'')===String(x[0])?' selected':''}>${esc(x[1])}</option>`).join('')}</select>`:t==='ta'?`<textarea name="${k}">${esc(v[k]??'')}</textarea>`:`<input name="${k}" type="${t||'text'}" value="${esc(v[k]??'')}">`)).join('');
const V=(m,f)=>{const o={};f.forEach(([k,,t])=>{if(t==='gp'){Object.assign(o,GV(m));return}const x=m.querySelector('[name='+k+']').value;o[k]=t==='number'?(x===''?null:+x):x});return o};
/* نافذة تعديل/إضافة عامة */
function ED(title,f,v,tb,done,pre){const nw=!(v&&v.id);const{m,c}=M(`<h3>${title}</h3>${F(f,v||{})}<div class="acts"><button class="btn gld" id="sv">حفظ</button>${nw?'':'<button class="btn no" id="dl">حذف</button>'}</div>`);
 m.querySelector('#sv').onclick=async()=>{if(f.some(x=>x[2]==='gp')){const er=GCHK(m);if(er)return T(er)}let o=V(m,f);if(pre){o=pre(o);if(!o)return}const r=await SV(tb,nw?null:v.id,o);if(r.error)return T('خطأ: '+r.error.message);T('تم ✅');c();done&&done()};
 if(!nw)m.querySelector('#dl').onclick=async()=>{if(!confirm('متأكد من الحذف؟ مش هينفع ترجّعه.'))return;const r=await sb.rpc('admin_delete',{p_table:tb,p_id:String(v.id)});if(r.error)return T('خطأ: '+r.error.message);c();done&&done()}}
const NAMES={};(await E('profiles',q=>q.select('id,full_name'))).forEach(p=>NAMES[p.id]=p.full_name);
const PG=(t,s,p)=>`<header class="pg"><small>${s}</small><h2>${t}</h2><p>${p}</p></header>`;
const BR=(rows)=>{const mx=Math.max(1,...rows.map(r=>r[1]));return`<div class="bars">${rows.map(([l,n])=>`<div class="br"><span>${esc(l)}</span><em><i style="width:${Math.round(n/mx*100)}%"></i></em><b>${n}</b></div>`).join('')}</div>`};

/* ===== إرسال رابط تغيير كلمة المرور (Edge Function) ===== */
async function sendReset(s){
 if(!s.phone)return T('الحساب ده مفيهوش رقم موبايل.');
 if(!confirm('نبعت رابط تغيير كلمة المرور لـ '+s.full_name+'؟'))return;
 T('بنبعت الرابط...');
 try{
  const{data:{session:ss}}=await sb.auth.getSession();
  const r=await fetch(RESET_FN_URL,{method:'POST',headers:{'Content-Type':'application/json',apikey:SB_KEY,Authorization:'Bearer '+(ss?ss.access_token:SB_KEY)},body:JSON.stringify({phone:s.phone,student_id:s.id,by_admin:true})});
  let j={};try{j=await r.json()}catch(_){}
  if(!r.ok||j.error){T('معرفناش نبعت: '+(j.error&&(j.error.message||j.error)||j.message||r.status));return}
  T(j.message||'اتبعت الرابط ✅');L('رابط تغيير باسورد',s.full_name)
 }catch(x){T('مشكلة في الاتصال، جرّب تاني.')}}

/* ===== نافذة الطالب ===== */
const SF=s=>[['full_name','الاسم'],['phone','الموبايل','tel'],['parent_phone','موبايل ولي الأمر','tel'],['grade','المرحلة','sel',[['','—'],...[...new Set([...(s.grade?[s.grade]:[]),...GR])].map(g=>[g,g])]],['track','المسار (للثانوي)','sel',[['','—'],...TRK.map(x=>[x,x])]],['role','النوع','sel',[['student','طالب'],['parent','ولي أمر'],['admin','أدمن']]],['banned','الحساب','sel',[['false','شغّال'],['true','محظور']]]];
async function SM(s){const[cs,ls,en,gr,w]=await Promise.all([E('courses',q=>q.select('id,title,code')),E('lessons',q=>q.select('id,code,title').order('code')),E('enrollments',q=>q.select('course_id').eq('student_id',s.id)),E('lesson_grants',q=>q.select('lesson_id').eq('student_id',s.id)),E('wallets',q=>q.select('balance').eq('student_id',s.id))]);
 const has=new Set(en.map(x=>String(x.course_id))),gs=new Set(gr.map(x=>x.lesson_id)),bal=Number(w[0]?.balance)||0,F2=SF(s);
 const{m,c}=M(`<h3>${esc(s.full_name)} <span class="bd">${esc(s.role)}</span></h3><p class="mt">انضم ${dt(s.created_at)}${s.grade?' · '+esc(short(s.grade)):''}${s.track?' · '+esc(s.track):''}</p><div class="g3"><div><b>${s.points||0}</b><span>نقط</span></div><div><b>${bal}</b><span>رصيد (ج.م)</span></div><div><b>${has.size}</b><span>كورس</span></div></div>
 <div class="acts"><button class="btn sm" data-a="p+">+ نقط</button><button class="btn sm" data-a="p-">− نقط</button><button class="btn sm" data-a="w+">+ رصيد</button><button class="btn sm" data-a="w-">− رصيد</button></div>
 <h4>الباسورد</h4><div class="acts"><button class="btn sm" id="rs">🔑 ابعت رابط تغيير الباسورد</button><button class="btn sm" id="cpn">📋 نسخ الموبايل</button></div>
 <h4>بياناته</h4>${F(F2,{...s,banned:String(!!s.banned)})}<button class="btn gld" id="sv">حفظ البيانات</button>
 <h4>الكورسات (فتح / قفل كورس)</h4>${cs.map(x=>{const h=has.has(String(x.id));return`<div class="rw"><span class="gr"><span class="bd g">${esc(x.code||'بدون كود')}</span> ${esc(x.title)}</span><button class="btn sm ${h?'no':''}" data-e="${x.id}" data-o="${h?0:1}">${h?'قفل':'فتح'}</button></div>`}).join('')||'<p class="mt">مفيش كورسات لسه.</p>'}
 <h4>حصص مفتوحة له لوحدها</h4><div class="acts">${ls.filter(l=>gs.has(l.id)).map(l=>`<button class="btn sm" data-g="${l.id}" title="اضغط للقفل">${esc(l.code)} ✕</button>`).join('')||'<span class="mt">مفيش.</span>'}</div>
 <select id="ls">${ls.filter(l=>!gs.has(l.id)).map(l=>`<option value="${l.id}">${esc(l.code)} · ${esc(l.title)}</option>`).join('')}</select><button class="btn" id="gl">فتح الحصة دي</button>`);
 const re=async()=>{c();SM((await E('profiles',q=>q.eq('id',s.id)))[0]||s)};
 m.querySelector('#rs').onclick=()=>sendReset(s);m.querySelector('#cpn').onclick=()=>CP(s.phone||'');
 m.querySelector('#sv').onclick=async()=>{const o=V(m,F2);o.banned=o.banned==='true';o.grade=o.grade||null;o.track=o.track||null;
  if(o.role==='student'&&SECG.includes(o.grade)&&!o.track)return T('اختار المسار للطالب الثانوي.');
  if(!SECG.includes(o.grade))o.track=null;
  const r=await SV('profiles',s.id,o);if(r.error)return T('خطأ: '+r.error.message);T('تم ✅');L('تعديل بيانات',o.full_name);re()};
 m.addEventListener('click',async e=>{const b=e.target.closest('button'),d=b&&b.dataset;if(!d)return;let ok=0;
  if(d.a){const n=+prompt('كام؟');if(!(n>0))return;const g=d.a[1]==='+'?n:-n,p=d.a[0]==='p';ok=await RP(p?'admin_points':'admin_wallet',{p_student:s.id,p_delta:g});ok&&L(p?'نقط':'رصيد',s.full_name+' '+g)}
  else if(d.e){ok=await RP('admin_enroll',{p_student:s.id,p_course:d.e,p_open:d.o==='1'});ok&&L(d.o==='1'?'فتح كورس':'قفل كورس',s.full_name)}
  else if(d.g){ok=await RP('admin_grant',{p_student:s.id,p_lesson:d.g,p_open:false});ok&&L('قفل حصة',s.full_name)}
  else if(b.id==='gl'){const id=m.querySelector('#ls').value;if(!id)return;ok=await RP('admin_grant',{p_student:s.id,p_lesson:id,p_open:true});ok&&L('فتح حصة',s.full_name)}
  if(ok)re()})}

/* ===== محرر الامتحانات ===== */
let RQ=0;
const IM=u=>`<img class="qp" data-u="${esc(u)}" src="${esc(u)}" alt=""><button class="btn sm no" data-ri>شيل الصورة</button>`;
const op=(o,rn,ok)=>`<div class="rw" style="flex-wrap:nowrap"><input type="radio" name="${rn}"${ok?' checked':''} aria-label="الإجابة الصح"><input class="oi" value="${esc(o)}" placeholder="الاختيار" style="margin:0"><button class="btn sm no" data-do>✕</button></div>`;
const qc=q=>{const rn='r'+(++RQ);return`<div class="card qb" data-rn="${rn}"><div class="rw"><b class="gr qno">سؤال</b><button class="btn sm" data-up2 title="لفوق">▲</button><button class="btn sm" data-dn title="لتحت">▼</button><button class="btn sm" data-cq>نسخ</button><button class="btn sm no" data-dq>حذف</button></div><textarea class="qt" placeholder="نص السؤال">${esc(q.q||'')}</textarea><div class="qi">${q.img?IM(q.img):''}</div><label class="btn sm">📷 ضيف صورة<input type="file" accept="image/*" hidden data-up></label><div class="qo">${(q.o&&q.o.length?q.o:['','','','']).map((o,j)=>op(o,rn,q.a===j)).join('')}</div><button class="btn sm" data-ao>+ اختيار</button><label class="fl">شرح الإجابة (اختياري)</label><input class="qe" value="${esc(q.e||'')}"></div>`};
const renum=m=>m.querySelectorAll('.qb').forEach((b,i)=>b.querySelector('.qno').textContent='سؤال '+(i+1));
const readQ=cd=>{const os=[...cd.querySelectorAll('.oi')].map(z=>z.value.trim()),im=cd.querySelector('.qp');return{q:cd.querySelector('.qt').value.trim(),o:os,a:[...cd.querySelectorAll('input[type=radio]')].findIndex(r=>r.checked),e:cd.querySelector('.qe').value.trim(),img:im?im.dataset.u:null}};
/* استيراد أسئلة من نص: سطر السؤال، وبعده الاختيارات (أ) ب) ج) د))، والصح عليه * ، وسطر "شرح:" اختياري */
const LB={'أ':0,'ا':0,'ب':1,'ج':2,'د':3,'ه':4,'هـ':4,'و':5,'a':0,'b':1,'c':2,'d':3,'e':4,'f':5};
function PARSE(t){const ok=[],bad=[];t.replace(/\r/g,'').split(/\n\s*\n/).map(b=>b.trim()).filter(Boolean).forEach((b,bi)=>{
 const ls=b.split('\n').map(x=>x.trim()).filter(Boolean);let q=[],o=[],a=-1,e='',ans=null;
 ls.forEach((ln,i)=>{let m;
  if(i===0){q.push(ln.replace(/^\d+\s*[\.\-\)]\s*/,''));return}
  if((m=ln.match(/^(?:شرح|الشرح|التفسير|ملاحظة)\s*[:：]\s*(.+)$/)))e=m[1];
  else if((m=ln.match(/^(?:الإجابة|الاجابة|الاجابه|الجواب|answer)\s*[:：]\s*(.+)$/i)))ans=m[1].trim();
  else if((m=ln.match(/^([*✓✔])?\s*(هـ|[أابجدهو]|[A-Fa-f])\s*[\)\.\-:：]\s*(.+?)\s*([✓✔*])?$/))){o.push(m[3]);if(m[1]||m[4])a=o.length-1}
  else if(!o.length)q.push(ln)});
 if(ans!==null&&a<0){const k=LB[ans.toLowerCase()[0]==='ه'&&ans.length>1?'هـ':ans.toLowerCase()[0]];if(k!==undefined)a=k;else if(/^\d+$/.test(ans))a=+ans-1}
 const qq=q.join(' ').trim();
 if(qq&&o.length>=2&&a>=0&&a<o.length)ok.push({q:qq,o,a,e,img:null});else bad.push(bi+1)});return{ok,bad}}
const XF=[['title','العنوان'],['kind','النوع','sel',[['exam','امتحان'],['homework','واجب']]]];
function exm(x,cs,done){x=x||{};const{m,c}=M(`<h3>${x.id!=null?'تعديل':'امتحان / واجب جديد'}</h3>${F([...XF,['course_id','الكورس (أو سيبه عام)','sel',[['','عام'],...cs.map(k=>[k.id,k.title])]],['gp','','gp']],x)}<h4>الأسئلة <span class="bd" id="qn"></span></h4><div class="acts"><button class="btn sm" id="imp">📥 استيراد أسئلة من نص</button></div><p class="mt" style="font-size:13px">الدايرة جنب الاختيار = الإجابة الصح.</p><div id="qs">${(x.questions||[{}]).map(qc).join('')}</div><div class="acts"><button class="btn" id="aq">+ سؤال جديد</button></div><div class="acts"><button class="btn gld" id="sv">حفظ</button>${x.id!=null?'<button class="btn" id="dp">نسخ الامتحان</button><button class="btn no" id="dl">حذف</button>':''}</div>`);
 const cnt=()=>{renum(m);m.querySelector('#qn').textContent=m.querySelectorAll('.qb').length+' سؤال'};cnt();
 m.addEventListener('change',async e=>{if(e.target.dataset.up===undefined)return;const f=e.target.files[0];if(!f)return;if(f.size>5*1048576)return T('الصورة أكبر من 5 ميجا');const p=Date.now()+'-'+Math.random().toString(36).slice(2,8)+'.'+((f.name.split('.').pop()||'jpg').toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,5)||'jpg');T('بنرفع الصورة...');const u=await sb.storage.from('qimg').upload(p,f,{contentType:f.type});if(u.error)return T('مقدرتش أرفع الصورة: '+u.error.message);e.target.closest('.qb').querySelector('.qi').innerHTML=IM(sb.storage.from('qimg').getPublicUrl(p).data.publicUrl);T('تم رفع الصورة ✅')});
 m.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset,cd=b.closest('.qb');
  if(d.dq!==undefined){cd.remove();cnt()}
  else if(d.ri!==undefined)cd.querySelector('.qi').innerHTML='';
  else if(d.do!==undefined){if(cd.querySelectorAll('.oi').length>2)b.parentElement.remove();else T('لازم اختيارين على الأقل')}
  else if(d.ao!==undefined)cd.querySelector('.qo').insertAdjacentHTML('beforeend',op('',cd.dataset.rn,false))
  else if(d.up2!==undefined){const p=cd.previousElementSibling;if(p){p.before(cd);cnt()}}
  else if(d.dn!==undefined){const n=cd.nextElementSibling;if(n){n.after(cd);cnt()}}
  else if(d.cq!==undefined){cd.insertAdjacentHTML('afterend',qc(readQ(cd)));cnt()}});
 m.querySelector('#aq').onclick=()=>{m.querySelector('#qs').insertAdjacentHTML('beforeend',qc({}));cnt()};
 m.querySelector('#imp').onclick=()=>{const w=M(`<h3>استيراد أسئلة</h3><p class="mt" style="font-size:13.5px">اكتب كل سؤال في فقرة، وسيب سطر فاضي بين الأسئلة. علّم الإجابة الصح بنجمة * قبلها (أو اكتب سطر "الإجابة: ب"). سطر "شرح:" اختياري.</p><textarea id="it" style="min-height:240px" dir="rtl" placeholder="1. عاصمة مصر؟&#10;أ) الإسكندرية&#10;*ب) القاهرة&#10;ج) أسوان&#10;شرح: القاهرة هي العاصمة.&#10;&#10;2. الفاعل مرفوع؟&#10;أ) صح&#10;ب) غلط&#10;الإجابة: أ"></textarea><div class="acts"><button class="btn gld" id="ia">إضافة الأسئلة</button></div>`);
  w.m.querySelector('#ia').onclick=()=>{const r=PARSE(w.m.querySelector('#it').value);if(!r.ok.length)return T('مفيش سؤال صالح. اتأكد إن كل سؤال ليه اختيارين على الأقل وإجابة صح معلّمة.');const first=m.querySelector('.qb');if(m.querySelectorAll('.qb').length===1&&first&&!first.querySelector('.qt').value.trim()&&![...first.querySelectorAll('.oi')].some(i=>i.value.trim()))first.remove();m.querySelector('#qs').insertAdjacentHTML('beforeend',r.ok.map(qc).join(''));cnt();w.c();T('اتضاف '+r.ok.length+' سؤال'+(r.bad.length?' · في مشكلة في الفقرات: '+r.bad.join('، '):''))}};
 const collect=()=>{if(!m.querySelector('[name=title]').value.trim())return T('اكتب العنوان'),null;const er=GCHK(m);if(er)return T(er),null;const o=V(m,[...XF,['course_id'],['gp','','gp']]),qs=[];let i=0;
  for(const cd of m.querySelectorAll('.qb')){i++;const q=readQ(cd);if(!q.q||q.o.length<2||q.o.some(z=>!z)||q.a<0)return T('سؤال '+i+': اكتب السؤال وكل اختياراته وحدد الإجابة الصح'),null;qs.push(q)}
  if(!qs.length)return T('ضيف سؤال واحد على الأقل'),null;return{title:o.title.trim(),kind:o.kind,course_id:o.course_id||null,grades:o.grades,tracks:o.tracks,questions:qs}};
 m.querySelector('#sv').onclick=async()=>{const row=collect();if(!row)return;const r=await SV('exams',x.id,row);if(r.error)return T('خطأ: '+r.error.message);T('تم ✅');L(x.id!=null?'تعديل امتحان':'امتحان جديد',row.title);c();done()};
 const dp=m.querySelector('#dp');if(dp)dp.onclick=async()=>{const row=collect();if(!row)return;row.title+=' (نسخة)';const r=await SV('exams',null,row);if(r.error)return T('خطأ: '+r.error.message);T('اتعمل نسخة ✅');c();done()};
 const dl=m.querySelector('#dl');if(dl)dl.onclick=async()=>{if(!confirm('متأكد من الحذف؟'))return;const r=await sb.rpc('admin_delete',{p_table:'exams',p_id:String(x.id)});if(r.error)return T('خطأ: '+r.error.message);L('حذف امتحان',x.title);c();done()}}

/* ===== الصفحات ===== */
let CUR='ov',PRE=null;
const N=[['ov','🏠','نظرة عامة'],['st','👥','الطلاب'],['co','📚','الكورسات'],['cd','🔑','الأكواد'],['tp','💰','الشحن'],['ex','📝','الامتحانات'],['an','📣','الإعلانات'],['sp','💬','الدعم'],['se','⚙️','الإعدادات'],['lg','📜','السجل']];
const VW={
async ov(){const[ps,tp,tk,cs,ls,lg]=await Promise.all([E('profiles',q=>q.select('*')),E('wallet_topups',q=>q.select('*')),E('support_tickets',q=>q.select('id,status')),E('courses',q=>q.select('id')),E('lessons',q=>q.select('id')),E('admin_log',q=>q.select('*').order('at',{ascending:false}).limit(8))]);
 const stu=ps.filter(p=>p.role==='student'),par=ps.filter(p=>p.role==='parent'),wk=Date.now()-7*864e5,sum=a=>a.reduce((s,t)=>s+(+t.amount||0),0);
 const pend=tp.filter(t=>t.status==='pending'),apr=tp.filter(t=>t.status==='approved'),m0=new Date();m0.setDate(1);m0.setHours(0,0,0,0);
 const nt=stu.filter(p=>SECG.includes(p.grade)&&!p.track).length,op2=tk.filter(t=>t.status==='open').length,last=[...stu].sort((a,b)=>new Date(b.created_at)-new Date(a.created_at)).slice(0,6);
 const sc=(x,l,t,i,g)=>`<div class="card sc" data-go="${g}"><div class="bx ${t}">${i}</div><div><b>${x}</b><span>${l}</span></div></div>`;
 setTimeout(()=>{$$('[data-p]').forEach(x=>x.onclick=()=>SM(ps.find(p=>p.id===x.dataset.p)));const b=$('#fixtr');if(b)b.onclick=()=>{PRE={t:'-'};show('st')}});
 return PG('لوحة الإدارة','أهلاً '+esc((me.full_name||'').split(' ')[0]),'كل حاجة في المنصة بتتحكم فيها من هنا.')
 +(nt?`<div class="card" style="border-color:var(--gold)"><div class="rw" style="border:0"><span class="gr">⚠️ <b>${nt}</b> طالب ثانوي من غير مسار — مش هيشوفوا غير المحتوى العام لحد ما تحدد لهم المسار.</span><button class="btn sm gld" id="fixtr">حدّد المسارات</button></div></div>`:'')
 +`<div class="st">${sc(stu.length,'طالب','t1','🎓','st')+sc(par.length,'ولي أمر','t2','👨‍👩‍👧','st')+sc(cs.length,'كورس','t3','📚','co')+sc(ls.length,'حصة','t4','🎬','co')}</div>
 <div class="st">${sc(pend.length+(pend.length?' · '+num(sum(pend))+' ج.م':''),'طلب شحن منتظر','t4','💰','tp')+sc(op2,'رسالة دعم مفتوحة','t2','💬','sp')+sc(stu.filter(p=>new Date(p.created_at)>wk).length,'طالب جديد آخر 7 أيام','t1','✨','st')+sc(num(sum(apr)),'إجمالي الشحن المقبول (ج.م)','t3','📈','tp')}</div>
 <div class="g2"><div class="card"><h3>الطلاب حسب المرحلة</h3><div style="margin-top:10px">${BR(GR.map(g=>[short(g),stu.filter(p=>p.grade===g).length]))}</div></div>
 <div class="card"><h3>الثانوي حسب المسار</h3><div style="margin-top:10px">${BR([...TRK.map(t=>[t,stu.filter(p=>SECG.includes(p.grade)&&p.track===t).length]),['بدون مسار',nt]])}</div><p class="mt" style="margin-top:10px;font-size:13.5px">شحن الشهر ده (المقبول): <b>${num(sum(apr.filter(t=>new Date(t.created_at)>=m0)))} ج.م</b></p></div></div>
 <div class="g2"><div class="card"><h3>آخر المسجّلين</h3>${last.map(p=>`<div class="rw" data-p="${p.id}" style="cursor:pointer"><b class="gr">${esc(p.full_name)}</b><span class="bd">${esc(short(p.grade)||'—')}${p.track?' · '+esc(p.track):''}</span><small class="mt">${dt(p.created_at)}</small></div>`).join('')||'<p class="mt">لسه مفيش.</p>'}</div>
 <div class="card"><h3>آخر العمليات</h3>${lg.map(x=>`<div class="rw"><span class="bd g">${esc(x.action)}</span><span class="gr">${esc(x.detail)}</span><small class="mt">${dt(x.at)}</small></div>`).join('')||'<p class="mt">لسه مفيش عمليات.</p>'}</div></div>`},

async st(){const ps=await E('profiles',q=>q.select('*').order('created_at',{ascending:false}));let q='',r='all',g='',t='',b='',so='new',lim=150;if(PRE){t=PRE.t||'';PRE=null}
 const flt=()=>{const nq=q.toLowerCase();let l=ps.filter(p=>(r==='all'||p.role===r)&&(!g||p.grade===g)&&(!t||(t==='-'?(SECG.includes(p.grade)&&!p.track):p.track===t))&&(!b||(b==='1'?!!p.banned:!p.banned))&&((p.full_name||'')+' '+(p.phone||'')+' '+(p.parent_phone||'')).toLowerCase().includes(nq));
  return[...l].sort(so==='name'?(a,c)=>(a.full_name||'').localeCompare(c.full_name||'','ar'):so==='pts'?(a,c)=>(c.points||0)-(a.points||0):(a,c)=>new Date(c.created_at)-new Date(a.created_at))};
 const dr=()=>{const l=flt();$('#cn').textContent=l.length+' من '+ps.length+' حساب';$('#sl').innerHTML=l.slice(0,lim).map(p=>`<div class="rw" data-p="${p.id}" style="cursor:pointer"><b class="gr">${esc(p.full_name)}</b><span class="mt" dir="ltr">${esc(p.phone)}</span><span class="bd">${esc(short(p.grade||p.role))}${p.track?' · '+esc(p.track):''}</span><span class="bd g">${p.points||0} نقطة</span>${p.banned?'<span class="bd no">محظور</span>':''}</div>`).join('')+(l.length>lim?`<button class="btn" id="mr" style="margin-top:10px">اعرض أكتر (${l.length-lim})</button>`:'')||'<p class="mt">مفيش نتيجة.</p>';
  $$('[data-p]').forEach(x=>x.onclick=()=>SM(ps.find(p=>p.id===x.dataset.p)));const mr=$('#mr');if(mr)mr.onclick=()=>{lim+=200;dr()}};
 setTimeout(()=>{$('#q').oninput=e=>{q=e.target.value.trim();lim=150;dr()};[['#fr',v=>r=v],['#fg',v=>g=v],['#ft',v=>t=v],['#fb',v=>b=v],['#so',v=>so=v]].forEach(([s,f])=>$(s).onchange=e=>{f(e.target.value);lim=150;dr()});$('#ft').value=t;
  $('#ex').onclick=()=>{const l=flt();DL('students.csv',CSV([['الاسم','الموبايل','موبايل ولي الأمر','المرحلة','المسار','النوع','النقط','تاريخ التسجيل'],...l.map(p=>[p.full_name,p.phone,p.parent_phone,p.grade,p.track,p.role,p.points||0,p.created_at&&p.created_at.slice(0,10)])]))};
  $('#bk').onclick=async()=>{const l=flt().filter(p=>p.role==='student');if(!l.length)return T('مفيش طلاب في النتيجة.');const cs=await E('courses',q=>q.select('id,title'));if(!cs.length)return T('مفيش كورسات.');
   const w=M(`<h3>فتح كورس لـ ${l.length} طالب</h3><p class="mt">هيتفتح الكورس لكل الطلاب اللي ظاهرين دلوقتي في القايمة (حسب الفلاتر).</p><select id="bc">${cs.map(c=>`<option value="${c.id}">${esc(c.title)}</option>`).join('')}</select><div class="acts"><button class="btn gld" id="bg">تنفيذ</button></div>`);
   w.m.querySelector('#bg').onclick=async e=>{const id=w.m.querySelector('#bc').value,tt=cs.find(c=>String(c.id)===id).title;if(!confirm('نفتح "'+tt+'" لـ '+l.length+' طالب؟'))return;e.target.disabled=true;let ok=0,bad=0;
    for(let i=0;i<l.length;i++){e.target.textContent='...'+(i+1)+'/'+l.length;const r=await sb.rpc('admin_enroll',{p_student:l[i].id,p_course:id,p_open:true});r.error?bad++:ok++}
    L('فتح كورس جماعي',tt+' · '+ok+' طالب');w.c();T('تم لـ '+ok+' طالب'+(bad?' · فشل '+bad:''))}};dr()});
 return PG('الطلاب','إدارة الحسابات',ps.length+' حساب. دوس على أي واحد تتحكم فيه.')+`<div class="tools"><input id="q" placeholder="ابحث بالاسم أو الموبايل"><select id="fr"><option value="all">الكل</option><option value="student">طلاب</option><option value="parent">أولياء أمور</option><option value="admin">أدمن</option></select><select id="fg"><option value="">كل المراحل</option>${GR.map(x=>`<option>${x}</option>`).join('')}</select><select id="ft"><option value="">كل المسارات</option>${TRK.map(x=>`<option>${x}</option>`).join('')}<option value="-">ثانوي بدون مسار</option></select><select id="fb"><option value="">كل الحالات</option><option value="0">شغّال</option><option value="1">محظور</option></select><select id="so"><option value="new">الأحدث</option><option value="name">بالاسم</option><option value="pts">بالنقط</option></select></div><div class="acts"><button class="btn sm" id="ex">⬇️ تصدير CSV</button><button class="btn sm" id="bk">📚 فتح كورس للي ظاهرين</button><span class="mt" id="cn" style="align-self:center"></span></div><div class="card" id="sl"></div>`},

async co(){const[cs,ls]=await Promise.all([E('courses',q=>q.select('*').order('created_at')),E('lessons',q=>q.select('*').order('pos'))]);
 const CF=[['code','كود الكورس'],['title','اسم الكورس'],['description','الوصف','ta'],['gp','','gp'],['price','السعر (ج.م)','number'],['lessons_count','عدد الحصص','number']];
 const cd=c=>ED(c?'تعديل كورس':'كورس جديد',CF,c||{code:code('C'),price:0,lessons_count:0},'courses',()=>show('co'),o=>{if(!o.title.trim()){T('اكتب اسم الكورس');return null}if(!(o.price>=0)){T('اكتب سعر صحيح');return null}return{...o,grade:(o.grades&&o.grades[0])||null}});
 const lm=async c=>{const mine=(await E('lessons',q=>q.select('*').order('pos'))).filter(l=>String(l.course_id)===String(c.id));
  const{m,c:cl}=M(`<h3>حصص: ${esc(c.title)}</h3>${mine.map((l,i)=>`<div class="rw"><span class="bd g">${esc(l.code)}</span><span class="gr">${esc(l.title)}</span><button class="btn sm" data-mv="${l.id}" data-d="-1"${i?'':' disabled'}>▲</button><button class="btn sm" data-mv="${l.id}" data-d="1"${i<mine.length-1?'':' disabled'}>▼</button><button class="btn sm" data-l="${l.id}">تعديل</button></div>`).join('')||'<p class="mt">مفيش حصص لسه.</p>'}<div class="acts"><button class="btn gld" id="nl">+ حصة جديدة</button></div>`);
  const LF=[['code','كود الحصة'],['title','اسم الحصة'],['video_url','رابط الفيديو'],['pos','الترتيب','number']],sync=async()=>{const n=(await E('lessons',q=>q.select('id').eq('course_id',String(c.id)))).length;await SV('courses',c.id,{lessons_count:n});show('co')};
  const open=l=>{cl();ED(l?'تعديل حصة':'حصة جديدة',LF,l||{code:code('L'),pos:mine.length+1},'lessons',sync,o=>{if(!o.title.trim()){T('اكتب اسم الحصة');return null}return{...o,course_id:String(c.id)}})};
  m.querySelector('#nl').onclick=()=>open();m.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>open(mine.find(l=>String(l.id)===b.dataset.l)));
  m.querySelectorAll('[data-mv]').forEach(b=>b.onclick=async()=>{const i=mine.findIndex(l=>String(l.id)===b.dataset.mv),j=i+ +b.dataset.d;if(j<0||j>=mine.length)return;const a=[...mine];[a[i],a[j]]=[a[j],a[i]];b.disabled=true;
   for(let k=0;k<a.length;k++)if(a[k].pos!==k+1){const r=await SV('lessons',a[k].id,{pos:k+1});if(r.error)return T('خطأ: '+r.error.message)}cl();lm(c)})};
 setTimeout(()=>{$('#nc').onclick=()=>cd();$$('[data-c]').forEach(b=>b.onclick=()=>cd(cs.find(c=>String(c.id)===b.dataset.c)));$$('[data-ls]').forEach(b=>b.onclick=()=>lm(cs.find(c=>String(c.id)===b.dataset.ls)))});
 return PG('الكورسات والحصص','المحتوى',cs.length+' كورس · '+ls.length+' حصة')+`<div class="acts"><button class="btn gld" id="nc">+ كورس جديد</button></div><div class="card">${cs.map(c=>`<div class="rw"><span class="bd g">${esc(c.code||'بدون كود')}</span><div class="gr"><b>${esc(c.title)}</b><br><small class="mt">${esc(gtxt(Array.isArray(c.grades)&&c.grades.length?c.grades:(c.grade?[c.grade]:[]),c.tracks))} · ${c.price} ج.م · ${ls.filter(l=>String(l.course_id)===String(c.id)).length} حصة</small></div><button class="btn sm" data-ls="${c.id}">الحصص</button><button class="btn sm" data-c="${c.id}">تعديل</button></div>`).join('')||'<p class="mt">ضيف أول كورس.</p>'}</div>`},

/* ===== أكواد الحصص والكورسات ===== */
async cd(){const[cs,ls]=await Promise.all([E('courses',q=>q.select('id,title')),E('lessons',q=>q.select('id,title,code,course_id').order('code'))]);const CT={};cs.forEach(c=>CT[c.id]=c.title);
 let all=[],f='all',qq='',lim=100;
 const target=()=>{const k=$('#ck').value;$('#ct').innerHTML=(k==='course'?cs.map(c=>`<option value="${c.id}">${esc(c.title)}</option>`):ls.map(l=>`<option value="${l.id}">${esc(l.title)}${CT[l.course_id]?' — '+esc(CT[l.course_id]):''}</option>`)).join('')};
 const est=()=>{const a=+$('#cl').value||0,d=+$('#cdg').value||0,n=a+d;if(n<6||a<0||d<0||n>20){$('#ce').textContent='الطول من 6 لـ 20 خانة.';return}let c=1;for(let i=0;i<a;i++)c=c*(n-i)/(i+1);const v=c*Math.pow(24,a)*Math.pow(8,d);$('#ce').textContent='عدد الاحتمالات ≈ '+(v>=1e12?(v/1e12).toFixed(1)+' تريليون':v>=1e9?(v/1e9).toFixed(1)+' مليار':v>=1e6?(v/1e6).toFixed(1)+' مليون':Math.round(v).toLocaleString('ar-EG'))+' — كل ما زاد كان أصعب في التخمين.'};
 const status=c=>!c.active?'off':(c.expires_at&&new Date(c.expires_at)<new Date())?'exp':c.used_count>=c.max_uses?'used':'on';
 const ld=async()=>{const r=await sb.rpc('admin_codes_list');if(r.error){$('#cls').innerHTML='<p class="mt">'+esc(NEEDSQL(r.error))+'</p>';return}all=r.data||[];dr()};
 const dr=()=>{const l=all.filter(c=>(f==='all'||status(c)===f)&&(!qq||(c.code+' '+(c.target_title||'')+' '+(c.note||'')).toLowerCase().includes(qq)));const ST={on:['شغّال',''],used:['خلص','g'],off:['موقوف','no'],exp:['منتهي','no']};
  $('#cc').textContent=l.length+' كود';
  $('#cls').innerHTML=l.slice(0,lim).map(c=>{const s=status(c);return`<div class="rw"><b class="cdv" data-cp="${esc(c.code)}" title="اضغط للنسخ">${esc(c.code)}</b><div class="gr"><small>${c.kind==='course'?'كورس':'حصة'}: ${esc(c.target_title||'')}${c.note?' · '+esc(c.note):''}</small><br><small class="mt">${c.used_count}/${c.max_uses} استخدام${c.expires_at?' · ينتهي '+dt(c.expires_at):''} · ${dt(c.created_at)}</small></div><span class="bd ${ST[s][1]}">${ST[s][0]}</span><button class="btn sm" data-tg="${c.id}" data-v="${c.active?0:1}">${c.active?'إيقاف':'تشغيل'}</button><button class="btn sm no" data-rm="${c.id}">حذف</button></div>`}).join('')+(l.length>lim?`<button class="btn" id="cm" style="margin-top:10px">اعرض أكتر (${l.length-lim})</button>`:'')||'<p class="mt">مفيش أكواد.</p>';
  $$('[data-cp]').forEach(b=>b.onclick=()=>CP(b.dataset.cp));const cm=$('#cm');if(cm)cm.onclick=()=>{lim+=200;dr()};
  $$('[data-tg]').forEach(b=>b.onclick=async()=>{const r=await sb.rpc('admin_code_set',{p_id:+b.dataset.tg,p_active:b.dataset.v==='1',p_delete:false});if(r.error)return T(NEEDSQL(r.error));ld()});
  $$('[data-rm]').forEach(b=>b.onclick=async()=>{if(!confirm('نحذف الكود ده؟'))return;const r=await sb.rpc('admin_code_set',{p_id:+b.dataset.rm,p_active:null,p_delete:true});if(r.error)return T(NEEDSQL(r.error));ld()})};
 setTimeout(()=>{target();est();$('#ck').onchange=target;$('#cl').oninput=est;$('#cdg').oninput=est;
  $$('[data-cf]').forEach(b=>b.onclick=()=>{f=b.dataset.cf;$$('[data-cf]').forEach(x=>x.classList.toggle('on',x===b));lim=100;dr()});$('#cq').oninput=e=>{qq=e.target.value.trim().toLowerCase();lim=100;dr()};
  $('#cx').onclick=()=>{const rows=all.filter(c=>f==='all'||status(c)===f);DL('codes.csv',CSV([['الكود','النوع','الهدف','الاستخدام','الحالة','ملاحظة'],...rows.map(c=>[c.code,c.kind==='course'?'كورس':'حصة',c.target_title,c.used_count+'/'+c.max_uses,status(c),c.note])]))};
  $('#cg').onclick=async e=>{const tg=$('#ct').value;if(!tg)return T('اختار الحصة أو الكورس.');const n=+$('#cn').value,a=+$('#cl').value,d=+$('#cdg').value,u=+$('#cu').value,ex=$('#cex').value;
   if(!(n>=1&&n<=500))return T('عدد الأكواد من 1 لـ 500.');if(!(a>=0&&d>=0&&a+d>=6&&a+d<=20))return T('الحروف + الأرقام لازم يكونوا من 6 لـ 20.');if(!(u>=1))return T('عدد مرات استخدام الكود لازم 1 على الأقل.');
   e.target.disabled=true;const r=await sb.rpc('admin_make_codes',{p_kind:$('#ck').value,p_target:String(tg),p_count:n,p_letters:a,p_digits:d,p_uses:u,p_expires:ex?new Date(ex+'T23:59:59').toISOString():null,p_note:$('#cno').value.trim()||null});e.target.disabled=false;
   if(r.error)return T(NEEDSQL(r.error));const list=(r.data||[]).map(x=>x.code),tt=$('#ct').selectedOptions[0].textContent;L('توليد أكواد',list.length+' · '+tt);
   const w=M(`<h3>اتولّد ${list.length} كود ✅</h3><p class="mt">${esc(tt)} — كل كود يتفعّل ${u} مرة. احفظهم دلوقتي ووزّعهم على الطلاب.</p><textarea readonly dir="ltr" style="min-height:200px;font-family:ui-monospace,Menlo,monospace;font-weight:700;letter-spacing:1.5px">${esc(list.join('\n'))}</textarea><div class="acts"><button class="btn gld" id="a1">📋 نسخ الكل</button><button class="btn" id="a2">⬇️ تنزيل CSV</button></div>`);
   w.m.querySelector('#a1').onclick=()=>CP(list.join('\n'));w.m.querySelector('#a2').onclick=()=>DL('codes-'+Date.now()+'.csv',CSV([['الكود','الهدف'],...list.map(c=>[c,tt])]));ld()};
  ld()});
 return PG('أكواد الحصص والكورسات','الأكواد','ولّد أكواد صعبة (حروف وأرقام) ووزّعها على الطلاب، وكل طالب يدخل الكود من صفحته ويتفتح له المحتوى على طول.')
 +`<div class="card"><h3>توليد أكواد جديدة</h3><div class="frm"><div><label class="fl">النوع</label><select id="ck"><option value="lesson">حصة</option><option value="course">كورس كامل</option></select></div><div><label class="fl">الحصة / الكورس</label><select id="ct"></select></div><div><label class="fl">عدد الأكواد</label><input id="cn" type="number" min="1" max="500" value="10"></div><div><label class="fl">كل كود يتفعّل كام مرة؟</label><input id="cu" type="number" min="1" value="1"></div><div><label class="fl">عدد الحروف</label><input id="cl" type="number" min="0" max="20" value="5"></div><div><label class="fl">عدد الأرقام</label><input id="cdg" type="number" min="0" max="20" value="5"></div><div><label class="fl">ينتهي في (اختياري)</label><input id="cex" type="date"></div><div><label class="fl">ملاحظة (مثلا: سنتر النور)</label><input id="cno" maxlength="60"></div></div><p class="mt" id="ce" style="font-size:13.5px;margin-bottom:10px"></p><button class="btn gld" id="cg">🔑 توليد الأكواد</button></div>`
 +`<div class="tools"><input id="cq" placeholder="ابحث في الأكواد"><span class="mt" id="cc" style="align-self:center"></span></div><div class="chs">${[['all','الكل'],['on','شغّال'],['used','خلص'],['off','موقوف'],['exp','منتهي']].map(x=>`<button class="chp ${x[0]==='all'?'on':''}" data-cf="${x[0]}">${x[1]}</button>`).join('')}<button class="btn sm" id="cx">⬇️ تصدير CSV</button></div><div class="card" id="cls"><p class="mt">بنحمّل...</p></div>`},

async tp(){const ts=await E('wallet_topups',q=>q.select('*').order('created_at',{ascending:false}));let f='pending';const ST={pending:'منتظر',approved:'اتقبل',rejected:'اترفض'};
 const dr=()=>{const l=ts.filter(t=>f==='all'||t.status===f),tot=l.reduce((a,t)=>a+(+t.amount||0),0);$('#tl').innerHTML=(l.length?`<p class="mt" style="margin-bottom:6px">${l.length} طلب · ${num(tot)} ج.م</p>`:'')+l.map(t=>`<div class="rw"><div class="gr"><b>${esc(NAMES[t.student_id]||'؟')}</b><br><small class="mt">${esc(t.method)} · ${esc(t.phone)} · ${dtm(t.created_at)}</small></div><b>${esc(t.amount)} ج.م</b><span class="bd ${t.status==='approved'?'ok':t.status==='rejected'?'no':''}">${ST[t.status]||t.status}</span><button class="btn sm" data-r="${esc(t.receipt||t.receipt_path||'')}">الإيصال</button>${t.status==='pending'?`<button class="btn sm gld" data-k="${t.id}" data-o="1">قبول</button><button class="btn sm no" data-k="${t.id}" data-o="0">رفض</button>`:''}</div>`).join('')||'<p class="mt">مفيش طلبات.</p>';
  $$('[data-r]').forEach(b=>b.onclick=async()=>{const r=await sb.storage.from('receipts').createSignedUrl(b.dataset.r,300);r.error?T('مقدرتش أفتح الإيصال'):window.open(r.data.signedUrl,'_blank')});
  $$('[data-k]').forEach(b=>b.onclick=async()=>{const t=ts.find(x=>String(x.id)===b.dataset.k),ok=b.dataset.o==='1';if(t.status!=='pending')return;if(!confirm((ok?'قبول ':'رفض ')+t.amount+' ج.م؟'))return;$$('[data-k]').forEach(x=>x.disabled=true);if(await RP('admin_topup',{p_id:String(t.id),p_ok:ok})){L(ok?'قبول شحن':'رفض شحن',(NAMES[t.student_id]||'')+' '+t.amount)}show('tp')})};
 setTimeout(()=>{$$('[data-f]').forEach(b=>b.onclick=()=>{f=b.dataset.f;$$('[data-f]').forEach(x=>x.classList.toggle('on',x===b));dr()});dr()});
 return PG('الشحن','المحفظة','راجع صورة التحويل وبعدين اقبل. القبول بيضيف الرصيد مرة واحدة بس.')+`<div class="chs">${[['pending','منتظر'],['approved','اتقبل'],['rejected','اترفض'],['all','الكل']].map(x=>`<button class="chp ${x[0]===f?'on':''}" data-f="${x[0]}">${x[1]}</button>`).join('')}</div><div class="card" id="tl"></div>`},

async ex(){const[xs,cs]=await Promise.all([E('exams',q=>q.select('*').order('created_at',{ascending:false})),E('courses',q=>q.select('id,title'))]);let k='all',qq='';const CT={};cs.forEach(c=>CT[c.id]=c.title);
 const ed=x=>exm(x,cs,()=>show('ex'));
 const dr=()=>{const l=xs.filter(x=>(k==='all'||x.kind===k)&&(!qq||(x.title||'').toLowerCase().includes(qq)));$('#xl').innerHTML=l.map(x=>`<div class="rw"><span class="bd">${x.kind==='homework'?'واجب':'امتحان'}</span><div class="gr"><b>${esc(x.title)}</b><br><small class="mt">${(x.questions||[]).length} سؤال · ${esc(CT[x.course_id]||'عام')} · ${esc(gtxt(x.grades,x.tracks))}</small></div><button class="btn sm" data-x="${x.id}">تعديل</button></div>`).join('')||'<p class="mt">لسه مفيش.</p>';$$('[data-x]').forEach(b=>b.onclick=()=>ed(xs.find(x=>String(x.id)===b.dataset.x)))};
 setTimeout(()=>{$('#nx').onclick=()=>ed();$('#xq').oninput=e=>{qq=e.target.value.trim().toLowerCase();dr()};$$('[data-xk]').forEach(b=>b.onclick=()=>{k=b.dataset.xk;$$('[data-xk]').forEach(x=>x.classList.toggle('on',x===b));dr()});dr()});
 return PG('الامتحانات والواجبات','الاختبارات',xs.length+' عنصر')+`<div class="acts"><button class="btn gld" id="nx">+ جديد</button></div><div class="tools"><input id="xq" placeholder="ابحث بالعنوان"></div><div class="chs">${[['all','الكل'],['exam','امتحانات'],['homework','واجبات']].map(x=>`<button class="chp ${x[0]==='all'?'on':''}" data-xk="${x[0]}">${x[1]}</button>`).join('')}</div><div class="card" id="xl"></div>`},

/* ===== الإعلانات ===== */
async an(){const r=await sb.from('announcements').select('*').order('created_at',{ascending:false});const l=r.data||[],er=r.error;
 const AF=[['title','العنوان'],['body','النص','ta'],['gp','','gp'],['active','الحالة','sel',[['true','ظاهر للطلاب'],['false','مخفي']]]];
 const ed=a=>{const nw=!a;const{m,c}=M(`<h3>${nw?'إعلان جديد':'تعديل إعلان'}</h3>${F(AF,a?{...a,active:String(!!a.active)}:{active:'true'})}<div class="acts"><button class="btn gld" id="sv">حفظ</button>${nw?'':'<button class="btn no" id="dl">حذف</button>'}</div>`);
  m.querySelector('#sv').onclick=async()=>{const e=GCHK(m);if(e)return T(e);const o=V(m,AF);if(!o.title.trim())return T('اكتب العنوان');const row={title:o.title.trim(),body:o.body.trim()||null,grades:o.grades,tracks:o.tracks,active:o.active==='true'};const q=nw?await sb.from('announcements').insert(row):await sb.from('announcements').update(row).eq('id',a.id);if(q.error)return T(NEEDSQL(q.error));L(nw?'إعلان جديد':'تعديل إعلان',row.title);T('تم ✅');c();show('an')};
  if(!nw)m.querySelector('#dl').onclick=async()=>{if(!confirm('نحذف الإعلان؟'))return;const q=await sb.from('announcements').delete().eq('id',a.id);if(q.error)return T(NEEDSQL(q.error));L('حذف إعلان',a.title);c();show('an')}};
 setTimeout(()=>{$('#na').onclick=()=>ed();$$('[data-a]').forEach(b=>b.onclick=()=>ed(l.find(x=>String(x.id)===b.dataset.a)))});
 return PG('الإعلانات','تواصل مع الطلاب','الإعلان بيظهر في رئيسية الطالب، وتقدر تحدده لمرحلة أو مسار معيّن.')+(er?`<div class="card">${esc(NEEDSQL(er))}</div>`:`<div class="acts"><button class="btn gld" id="na">+ إعلان جديد</button></div><div class="card">${l.map(a=>`<div class="rw"><span class="bd ${a.active?'ok':''}">${a.active?'ظاهر':'مخفي'}</span><div class="gr"><b>${esc(a.title)}</b><br><small class="mt">${esc(gtxt(a.grades,a.tracks))} · ${dt(a.created_at)}</small></div><button class="btn sm" data-a="${a.id}">تعديل</button></div>`).join('')||'<p class="mt">مفيش إعلانات.</p>'}</div>`)},

async sp(){const ts=await E('support_tickets',q=>q.select('*').order('created_at',{ascending:false}));let f='open';
 const dr=()=>{const l=ts.filter(t=>f==='all'||t.status===f);$('#sl').innerHTML=l.map(t=>`<div class="rw"><div class="gr"><b>${esc(t.subject)}</b><br><small class="mt">${esc(NAMES[t.student_id||t.user_id]||'')} · ${esc((t.message||'').slice(0,60))}</small></div><span class="bd ${t.status==='open'?'':'ok'}">${t.status==='open'?'مفتوحة':'اتحلّت'}</span><button class="btn sm" data-t="${t.id}">فتح</button></div>`).join('')||'<p class="mt">مفيش رسايل.</p>';
  $$('[data-t]').forEach(b=>b.onclick=()=>{const t=ts.find(x=>String(x.id)===b.dataset.t);const{m,c}=M(`<h3>${esc(t.subject)}</h3><p class="mt">${esc(NAMES[t.student_id||t.user_id]||'')} · ${dt(t.created_at)}</p><div class="card" style="background:var(--bg2)">${esc(t.message)}</div>${F([['reply','ردك','ta'],['status','الحالة','sel',[['open','مفتوحة'],['closed','اتحلّت']]]],t)}<button class="btn gld" id="sv">حفظ الرد</button>`);
   m.querySelector('#sv').onclick=async()=>{const o=V(m,[['reply',,'ta'],['status']]);const r=await SV('support_tickets',t.id,o);if(r.error)return T('خطأ: '+r.error.message);L('رد دعم',t.subject);c();show('sp')}})};
 setTimeout(()=>{$$('[data-f]').forEach(b=>b.onclick=()=>{f=b.dataset.f;$$('[data-f]').forEach(x=>x.classList.toggle('on',x===b));dr()});dr()});
 return PG('الدعم','الرسائل',ts.filter(t=>t.status==='open').length+' مفتوحة')+`<div class="chs">${[['open','مفتوحة'],['closed','اتحلّت'],['all','الكل']].map(x=>`<button class="chp ${x[0]===f?'on':''}" data-f="${x[0]}">${x[1]}</button>`).join('')}</div><div class="card" id="sl"></div>`},

/* ===== الإعدادات (أرقام الشحن) ===== */
async se(){const r=await sb.from('app_settings').select('value').eq('key','pay_methods');let pm=r.data&&r.data[0]&&Array.isArray(r.data[0].value)?r.data[0].value:[['فودافون كاش',''],['انستا باي','']];
 const row=(n,v)=>`<div class="rw" style="flex-wrap:nowrap"><input class="pn" placeholder="الاسم (فودافون كاش)" value="${esc(n)}" style="margin:0"><input class="pv" dir="ltr" placeholder="الرقم أو الحساب" value="${esc(v)}" style="margin:0"><button class="btn sm no" data-rm>✕</button></div>`;
 setTimeout(()=>{const box=$('#pb');box.onclick=e=>{if(e.target.closest('[data-rm]'))e.target.closest('.rw').remove()};$('#pa').onclick=()=>box.insertAdjacentHTML('beforeend',row('',''));
  $('#ps').onclick=async()=>{const v=[...box.querySelectorAll('.rw')].map(w=>[w.querySelector('.pn').value.trim(),w.querySelector('.pv').value.trim()]).filter(x=>x[0]||x[1]);if(!v.length||v.some(x=>!x[0]||!x[1]))return T('املأ الاسم والرقم لكل وسيلة.');const q=await sb.from('app_settings').upsert({key:'pay_methods',value:v});if(q.error)return T(NEEDSQL(q.error));L('تعديل أرقام الشحن',v.map(x=>x[0]).join('، '));T('تم ✅ الطلاب هيشوفوا الأرقام الجديدة');}});
 return PG('الإعدادات','المنصة','التحكم في إعدادات عامة للمنصة.')+(r.error?`<div class="card">${esc(NEEDSQL(r.error))}</div>`:`<div class="card"><h3>أرقام استلام الشحن</h3><p class="mt" style="margin-bottom:10px">دي الأرقام اللي بتظهر للطالب لما يدوس "اشحن المحفظة".</p><div id="pb">${pm.map(x=>row(x[0],x[1])).join('')}</div><div class="acts"><button class="btn" id="pa">+ وسيلة</button><button class="btn gld" id="ps">حفظ</button></div></div>`)},

async lg(){const l=await E('admin_log',q=>q.select('*').order('at',{ascending:false}).limit(300));let qq='';
 const dr=()=>{$('#ll').innerHTML=l.filter(x=>!qq||((x.action||'')+' '+(x.detail||'')).toLowerCase().includes(qq)).map(x=>`<div class="rw"><span class="bd g">${esc(x.action)}</span><span class="gr">${esc(x.detail)}</span><small class="mt">${dtm(x.at)}</small></div>`).join('')||'<p class="mt">فاضي.</p>'};
 setTimeout(()=>{$('#lq').oninput=e=>{qq=e.target.value.trim().toLowerCase();dr()};dr()});
 return PG('السجل','الشفافية','آخر 300 عملية عملتها في اللوحة.')+`<div class="tools"><input id="lq" placeholder="ابحث في السجل"></div><div class="card" id="ll"></div>`}};
async function show(k){CUR=k;$$('.nv[data-n]').forEach(b=>b.classList.toggle('on',b.dataset.n===k));$('#v').innerHTML='<p class="mt" style="padding:40px;text-align:center">بنحمّل...</p>';try{$('#v').innerHTML=await VW[k]()}catch(x){$('#v').innerHTML='<p style="padding:30px;text-align:center">حصلت مشكلة: '+esc(x&&x.message)+'</p>';return}$$('[data-go]').forEach(b=>b.onclick=()=>show(b.dataset.go));history.replaceState(0,'','#'+k);scrollTo(0,0)}
$('#nav').innerHTML=N.map(n=>`<button class="nv" data-n="${n[0]}"><i>${n[1]}</i><span>${n[2]}</span></button>`).join('');
$$('.nv[data-n]').forEach(b=>b.onclick=()=>show(b.dataset.n));
$('#th').onclick=()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('th',root.dataset.theme)}catch(e){}};
$('#out').onclick=async()=>{await sb.auth.signOut();go('login.html')};
show(VW[location.hash.slice(1)]?location.hash.slice(1):'ov');
})().catch(e=>{document.querySelector('#v').innerHTML='<p style="padding:40px;text-align:center">حصلت مشكلة في تحميل اللوحة. حدّث الصفحة. '+(e&&e.message||'')+'</p>'});
