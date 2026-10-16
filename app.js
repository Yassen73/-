window.__fail=e=>{console.error('DASH ERROR:',e);const v=document.querySelector("#v");window.__err=(e&&(e.stack||e.message))||String(e);if(v)v.innerHTML='<div class="emp"><div class="edoor" aria-hidden="true"></div><h3>اوبس! حصلت مشكلة 😅</h3><p class="mt" style="margin:6px 0 16px">غالبًا النت ضعيف. حدّث الصفحة وهتتحل.</p><button class="btn gld" id="rl">حدّث الصفحة</button><pre dir="ltr" style="margin-top:16px;padding:12px;font-size:12px;white-space:pre-wrap;word-break:break-all;text-align:left;background:rgba(0,0,0,.35);border-radius:12px;color:#ffb4a8">'+String(window.__err).replace(/</g,'&lt;').slice(0,600)+'</pre></div>';const b=document.getElementById('rl');if(b)b.onclick=()=>location.reload()};
setTimeout(()=>{if(!document.querySelector('#nav .nv')&&!document.querySelector('.emp'))window.__fail(new Error('timeout: الداشبورد وقفت في التحميل (أكتر من '+(window.__WD||25)+' ثانية)'))},(window.__WD||25)*1000);
(async()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const P={home:'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',book:'M4 19V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2zm0 0a2 2 0 0 0 2 2h14',cap:'M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5',chat:'M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6A8 8 0 1 1 21 12z',user:'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',out:'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',moon:'M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z',check:'M5 12l5 5 9-10',play:'M7 4l13 8-13 8z',arr:'M19 12H5M11 6l-6 6 6 6',search:'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',phone:'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',clock:'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',send:'M22 2L11 13M22 2l-7 20-4-9-9-4z',cal:'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',copy:'M9 9h11v11H9zM5 15V4h11',spark:'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z'};
Object.assign(P,{sun:'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1',wallet:'M3 7a2 2 0 0 1 2-2h13v4M3 7v11a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1H5a2 2 0 0 1-2-2zM17 14.5h.01',exam:'M9 3h6l1 2h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h3zM8 12l2.5 2.5L16 9',up:'M12 16V4M7 9l5-5 5 5M4 20h16',x:'M6 6l12 12M18 6L6 18',retry:'M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.2L3 16M3 21v-5h5',pen:'M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4'});
const ic=n=>`<svg class="ic" viewBox="0 0 24 24"><path d="${P[n]}"/></svg>`;
const root=document.documentElement;try{const t=localStorage.getItem('th');if(t)root.dataset.theme=t}catch(e){}
const sb=supabase.createClient(SB_URL,SB_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false,lock:async(n,t,f)=>await f()}}),go=()=>location.replace('login.html');
const TO=(p,n)=>Promise.race([Promise.resolve(p),new Promise((_,r)=>setTimeout(()=>r(new Error('timeout: '+n)),(window.__TO||15)*1000))]);
const{data:{session}}=await TO(sb.auth.getSession(),'getSession');if(!session)return go();
const{data:me,error:meErr}=await TO(sb.from('profiles').select('*').eq('id',session.user.id).single(),'profiles');
if(meErr&&meErr.code!=='PGRST116')throw new Error('profiles: '+(meErr.message||meErr.code));
if(!me){try{await sb.auth.signOut()}catch(_){}throw new Error('الحساب ده ملوش صف في جدول profiles (الـ trigger بتاع التسجيل مش شغال). كلّم الدعم.')}
const parent=me.role==='parent',first=me.full_name.split(' ')[0];
const normP=p=>{if(!p)return p;let g=String(p.grade||''),t=p.track||null;const m=g.match(/^(?:الصف )?(الأول|الثاني) الثانوي(?:\s*[-–—]\s*(.+))?$/);if(m){g='الصف '+m[1]+' الثانوي';if(!t&&m[2])t=['بكالوريا','أزهر','عام'].find(k=>m[2].includes(k))||null}
 if(!t&&/الثانوي/.test(g)&&/^s[12][bag]$/.test(p.grade_code||''))t={b:'بكالوريا',a:'أزهر',g:'عام'}[p.grade_code[2]];p.grade=g||p.grade;p.track=t;return p};
normP(me);
if(me.banned&&me.role!=='admin'){try{await sb.auth.signOut()}catch(_){}const v=document.querySelector('#v');if(v)v.innerHTML='<div class="emp"><h3>🚫 الحساب ده موقوف</h3><p class="mt" style="margin:6px 0 16px">كلّم الدعم لو شايف إن ده حصل بالغلط.</p></div>';return}
const[{data:cs},{data:links}]=await TO(Promise.all([sb.from('courses').select('*').order('created_at'),sb.from('parent_links').select('*')]),'courses');
const allC=cs||[],L=links||[];let enr=[],kids=[],pend=[],KR=[],KRok=true;const KRP={};
if(parent){const ok=L.filter(l=>l.status==='approved').map(l=>l.student_id);
 if(ok.length){kids=((await sb.from('profiles').select('id,full_name,grade,track').in('id',ok)).data||[]).map(normP);enr=(await sb.from('enrollments').select('*').in('student_id',ok)).data||[]}}
else{enr=(await sb.from('enrollments').select('*')).data||[];
 const p=L.filter(l=>l.status==='pending'&&l.student_id===me.id).map(l=>l.parent_id);
 if(p.length)pend=(await sb.from('profiles').select('id,full_name').in('id',p)).data||[]}
const mine=new Set(enr.filter(e=>e.student_id===me.id).map(e=>e.course_id));
const SEC=['الصف الأول الثانوي','الصف الثاني الثانوي'];
const cg=c=>Array.isArray(c.grades)&&c.grades.length?c.grades.filter(Boolean):(c.grade?[c.grade]:[]);
/* مطابقة صارمة: المرحلة لازم تطابق، ولو المحتوى محدد مسارات فالطالب لازم يكون ثانوي وفي نفس المسار بالظبط */
const fitFor=(c,g,t)=>{const gs=cg(c),ts=Array.isArray(c.tracks)?c.tracks:[];if(gs.length&&!gs.includes(g))return false;if(ts.length&&!(SEC.includes(g)&&ts.includes(t)))return false;return true};
const fit=c=>parent?kids.some(k=>fitFor(c,k.grade,k.track)):fitFor(c,me.grade,me.track);
const noTrack=!parent&&SEC.includes(me.grade)&&!me.track;
const courses=allC.filter(c=>enr.some(e=>e.course_id===c.id&&(parent||e.student_id===me.id))||fit(c));
const RC='<div class="card rc"><b>🔑 عندك كود كورس أو حصة؟</b><div class="phn"><input placeholder="اكتب الكود هنا" dir="ltr" maxlength="24" style="margin:0;flex:1"><button class="btn gld" data-rc>تفعيل</button></div></div>';
const sf=async p=>{try{const r=await p;return r.error?[]:r.data||[]}catch(e){return[]}};
if(parent&&kids.length){try{const r=await TO(sb.rpc('parent_kids_results'),'parent_kids_results');if(r.error)KRok=false;else KR=Array.isArray(r.data)?r.data:[]}catch(e){KRok=false}}
let EX=[],EA=[],WR=[],TU=[],wal=0,CUR='home',AN=[];
if(!parent){[EX,EA,WR,TU]=await Promise.all([sf(sb.from('exams').select('*').order('created_at',{ascending:false})),sf(sb.from('exam_attempts').select('*').eq('student_id',me.id)),sf(sb.from('wrong_questions').select('*').eq('student_id',me.id).order('created_at',{ascending:false})),sf(sb.from('wallet_topups').select('*').eq('student_id',me.id).order('created_at',{ascending:false}))]);
 EX=EX.filter(x=>x.course_id?mine.has(x.course_id):fit(x)).map(x=>({...x,questions:Array.isArray(x.questions)?x.questions:[]})).filter(x=>x.questions.length&&x.questions.every(q=>q&&q.q&&Array.isArray(q.o)&&q.o.length>1));
 wal=Number((await sf(sb.from('wallets').select('balance').eq('student_id',me.id)))[0]?.balance)||0;
}
AN=(await sf(sb.from('announcements').select('*').eq('active',true).order('created_at',{ascending:false}).limit(50))).filter(fit).slice(0,3);
const WRQ=()=>WR.map(w=>{const x=EX.find(e=>String(e.id)===String(w.exam_id)),q=x&&x.questions[w.qidx];return q?{...q,ex:w.exam_id,i:w.qidx}:null}).filter(Boolean);

/* ألوان خلفيات الكورسات: نفس صورة المستر بخلفية مختلفة لكل باب */
const PAL=[['#FF8A1F','#E2431F','#1B2B4E'],['#8E2DE2','#E9449F','#FFD34D'],['#0E7FD6','#1CC1E6','#FF9F1C'],['#D8A33A','#7A5412','#2A1A07'],['#F6A6C1','#E8708F','#7A1F4B'],['#1F8A5B','#0E5A45','#CFF1D8'],['#5B3BD0','#2A1B7A','#FFC857'],['#F3D9A4','#E0B26A','#D2552B']];
const LET=['ع','ر','ب','ي','ن','ح','ك','ل'];
const gl=c=>{const g=cg(c).map(x=>x.replace('الصف ','')),t=Array.isArray(c.tracks)?c.tracks:[];return(g.length?g.join('، '):'كل المراحل')+(t.length&&t.length<3?' · '+t.join('، '):'')};
const pct=(e,c)=>c&&c.lessons_count?Math.min(100,Math.round((e.lessons_done||0)/c.lessons_count*100)):0;
const ring=(p,s=130)=>{const r=42,c=2*Math.PI*r;return`<div class="ring"><svg width="${s}" height="${s}" viewBox="0 0 100 100"><circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--bg2)" stroke-width="10"/><circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--gold)" stroke-width="10" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-p/100)}" transform="rotate(-90 50 50)" style="transition:stroke-dashoffset 1.2s"/></svg><b>${p}%</b></div>`};
const bar=(t,p)=>`<div class="bw"><div class="bwh"><span>${esc(t)}</span><b>${p}%</b></div><div class="pb"><i style="width:${p}%"></i></div></div>`;

/* ===== كارت الكورس = باب ===== */
const door=(c,i,k)=>{const e=enr.find(x=>x.student_id===me.id&&x.course_id===c.id),p=e?pct(e,c):0,q=PAL[i%PAL.length];
 return`<article class="dc" style="--a:${q[0]};--b:${q[1]};--c:${q[2]};--k:${k}"><div class="dca"><span class="dc-l" aria-hidden="true">${LET[i%LET.length]}</span><i class="dc-c"></i><img class="dc-t" src="teacher-cut.webp" alt="" loading="lazy" draggable="false"><span class="gb" style="max-width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(gl(c))}</span>${e?'<span class="gb ok">مشترك ✓</span>':''}</div><div class="dcb"><h3>${esc(c.title)}</h3><p class="mt cl2">${esc(c.description)}</p><div class="mt2"><span>${ic('book')} ${c.lessons_count} درس</span><span>${ic('clock')} في أي وقت</span></div>${e?`${bar('تقدّمك',p)}<a class="btn gld" href="course.html?c=${encodeURIComponent(c.id)}" style="width:100%;justify-content:center;text-decoration:none">${ic('play')} ادخل الكورس</a>`:`<div class="pr"><b>${Number(c.price)>0?c.price+' <small>ج.م</small>':'مجاني'}</b>${parent?'':`<button class="btn gld" data-sub="${esc(c.id)}">${ic('spark')} اشترك</button>`}</div>`}</div></article>`};

/* ===== شريط الكورسات الأفقي (من اليمين للشمال) ===== */
const RAIL=l=>`<div class="rw"><button class="ra l" data-rn="-1" aria-label="التالي">${ic('arr')}</button><button class="ra r" data-rn="1" aria-label="السابق">${ic('arr')}</button><div class="rail" tabindex="0">${l}</div><div class="rp"><i></i></div></div>`;
let TM=[],OB=[];
const clearT=()=>{TM.forEach(clearInterval);OB.forEach(o=>o.disconnect());TM=[];OB=[]};
function rails(){clearT();const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
 $$('.rw').forEach(w=>{const r=w.querySelector('.rail'),bp=w.querySelector('.rp i'),bs=[...w.querySelectorAll('.ra')];let auto=!rm,vis=true;
  const step=()=>{const f=r.firstElementChild;return f?f.getBoundingClientRect().width+18:300},max=()=>r.scrollWidth-r.clientWidth,pos=()=>Math.abs(r.scrollLeft);
  const upd=()=>{const m=max();w.classList.toggle('ns',m<6);bp.style.width=Math.min(100,(pos()+r.clientWidth)/r.scrollWidth*100)+'%';bs[0].disabled=pos()>=m-4;bs[1].disabled=pos()<=4};
  const stop=()=>{auto=false};
  bs.forEach(b=>b.onclick=()=>{stop();r.scrollBy({left:b.dataset.rn*step(),behavior:'smooth'})});
  r.addEventListener('scroll',upd,{passive:true});['pointerdown','wheel','touchstart','focusin'].forEach(ev=>r.addEventListener(ev,stop,{passive:true}));
  let d=0,sx=0,ss=0;
  r.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.target.closest('button,a,input'))return;d=1;sx=e.clientX;ss=r.scrollLeft;r.classList.add('dg');r.setPointerCapture(e.pointerId)});
  r.addEventListener('pointermove',e=>{if(d)r.scrollLeft=ss-(e.clientX-sx)});
  ['pointerup','pointercancel'].forEach(ev=>r.addEventListener(ev,()=>{d=0;r.classList.remove('dg')}));
  if('IntersectionObserver' in window){const o=new IntersectionObserver(a=>{vis=a[0].isIntersecting},{threshold:.3});o.observe(w);OB.push(o)}
  TM.push(setInterval(()=>{if(!auto||document.hidden||!vis||max()<6)return;if(pos()>=max()-6)r.scrollTo({left:0,behavior:'smooth'});else r.scrollBy({left:-step(),behavior:'smooth'})},3600));
  upd()})}

const PG=(cls,tag,t,s,gl)=>`<header class="pg ${cls}"><small>${tag}</small><h2>${t}</h2><p>${s}</p><span class="pg-gl" aria-hidden="true">${gl}</span></header>`;
const EMP=(t,s,go)=>`<div class="emp"><div class="edoor" aria-hidden="true"></div><h3>${t}</h3><p class="mt">${s}</p>${go?`<button class="btn gld" data-go="${go}">شوف الكورسات</button>`:''}</div>`;
const QS=['الاستمرار أهم من السرعة. خطوة كل يوم توصلك.','المذاكرة بالفهم بتوفّر عليك نص الوقت.','راجع الدرس في نفس اليوم، هيثبت أكتر.','ابدأ بأصعب مادة وانت لسه نشيط.','العربي مش حفظ، العربي فهم وذوق.','اللي بيسأل بيتعلم، فاسأل من غير خجل.'];
const ORN=`<div class="orn"><i></i><svg viewBox="0 0 100 100"><rect x="24" y="24" width="52" height="52"/><rect x="24" y="24" width="52" height="52" transform="rotate(45 50 50)"/><circle cx="50" cy="50" r="13"/></svg><i></i></div>`;
const DOORS=(t,s,b)=>`<section class="doors"><div class="dimg"><img src="doors.webp" alt="ممر الأبواب، كل كورس بيفتحلك باب جديد" width="1100" height="614" loading="lazy"><i class="kg" aria-hidden="true"></i></div><div class="dt"><span class="tag2">🔑 مفتاحك جاهز</span><h3>${t}</h3><p>${s}</p><button class="btn gld" data-go="all">${b} ${ic('arr')}</button></div></section>`;
const hr=new Date().getHours(),greet=hr<12?'صباح الخير':hr<18?'نهارك سعيد':'مساء الخير';
const days=Math.max(1,Math.ceil((Date.now()-new Date(me.created_at))/864e5));
const stat=(n,l,t,i)=>`<div class="card sc"><div class="bx ${t}">${ic(i)}</div><div><b data-n="${n}">0</b><span>${l}</span></div></div>`;
const STAR=`<svg class="hstar" viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="#E3B25A" stroke-width=".5"><rect x="24" y="24" width="52" height="52"/><rect x="24" y="24" width="52" height="52" transform="rotate(45 50 50)"/><circle cx="50" cy="50" r="13"/><circle cx="50" cy="50" r="38"/><circle cx="50" cy="50" r="47" stroke-dasharray="1 2"/></g></svg>`;

/* ===== أرقام استلام الشحن: عدّل الأرقام دي بأرقامك ===== */


/* ===== صور الطلاب (رسومات كرتونية) ===== */
const AVS=[{s:'#F1C7A0',h:'#2A1B12',c:'#1F3A5F',t:0},{s:'#E8B98C',h:'#1B1B1F',c:'#2E7D4F',t:0,g:1},{s:'#C98F63',h:'#2A1B12',c:'#C98A1F',t:2},{s:'#F1C7A0',h:'#5A3418',c:'#8A5FD0',t:3},{s:'#F1C7A0',h:'#C2456F',c:'#E8708F',t:4},{s:'#D9A57A',h:'#1F6F6A',c:'#16897F',t:4,g:1},{s:'#F4D2B0',h:'#3A2314',c:'#0E7FD6',t:5},{s:'#C98F63',h:'#1B1B1F',c:'#E2431F',t:6}];
const avSvg=i=>{const a=AVS[i%AVS.length],t=a.t,sk=a.s;let back='',front='';
 if(t===2)back=[[32,36],[42,27],[55,26],[67,33],[70,46],[30,47]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="10" fill="${a.h}"/>`).join('');
 if(t===4)back=`<path d="M20 56Q16 16 50 15Q84 16 80 56Q82 86 50 92Q18 86 20 56Z" fill="${a.h}"/>`;
 if(t===5)back=`<path d="M70 40Q94 46 84 78Q80 62 68 58Z" fill="${a.h}"/>`;
 if(t===6)back=`<circle cx="50" cy="15" r="9" fill="${a.h}"/>`;
 if(t===0||t===6)front=`<path d="M28 46Q24 20 50 20Q76 20 72 46Q68 32 50 32Q32 32 28 46Z" fill="${a.h}"/>`;
 if(t===2)front=`<path d="M31 38Q38 27 50 28Q62 27 69 38Q60 31 50 32Q40 31 31 38Z" fill="${a.h}"/>`;
 if(t===3)front=`<path d="M28 46Q28 38 32 36L68 36Q72 38 72 46Q66 38 50 38Q34 38 28 46Z" fill="${a.h}"/><path d="M28 40Q28 17 50 17Q72 17 72 40Z" fill="${a.c}"/><path d="M58 38Q82 35 87 44L58 44Z" fill="${a.c}"/>`;
 if(t===4)front=`<path d="M33 50Q33 29 50 29Q67 29 67 50Q63 37 50 37Q37 37 33 50Z" fill="${a.h}"/>`;
 if(t===5)front=`<path d="M28 46Q24 20 50 20Q76 20 72 46Q66 30 46 30Q34 32 28 46Z" fill="${a.h}"/>`;
 const hj=t===4,rx=hj?17:21,ry=hj?19:23;
 return`<svg class="avs" viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" fill="#FAF6EC"/><rect width="100" height="100" fill="${a.c}" opacity=".2"/><path d="M14 100Q16 73 50 71Q84 73 86 100Z" fill="${a.c}"/>${back}${hj?'':`<rect x="43" y="60" width="14" height="16" rx="6" fill="${sk}"/><circle cx="29.5" cy="49" r="4.2" fill="${sk}"/><circle cx="70.5" cy="49" r="4.2" fill="${sk}"/>`}<ellipse cx="50" cy="47" rx="${rx}" ry="${ry}" fill="${sk}"/><circle cx="43" cy="48" r="2.4" fill="#1B2433"/><circle cx="57" cy="48" r="2.4" fill="#1B2433"/><circle cx="38" cy="54.5" r="3.2" fill="#E8708F" opacity=".28"/><circle cx="62" cy="54.5" r="3.2" fill="#E8708F" opacity=".28"/><path d="M44 57.5Q50 63 56 57.5" stroke="#1B2433" stroke-width="2" fill="none" stroke-linecap="round"/>${a.g?'<g fill="none" stroke="#1B2433" stroke-width="1.8"><circle cx="43" cy="48" r="6.5"/><circle cx="57" cy="48" r="6.5"/><path d="M49.5 48h1"/></g>':''}${front}</svg>`};
let AVI=(()=>{let s=me.avatar;try{if(s==null)s=localStorage.getItem('av_'+me.id)}catch(e){}return s!=null&&s!==''&&!isNaN(+s)?+s%AVS.length:[...me.full_name].reduce((a,c)=>a+c.charCodeAt(0),0)%AVS.length})();
const setMc=()=>{$('#mc').innerHTML=avSvg(AVI)+'<span>'+esc(first)+'</span>'};

/* ===== الوضع الليلي ===== */
const applyTh=()=>{const d=root.dataset.theme==='dark';const t1=$('#th');if(t1)t1.innerHTML=ic(d?'sun':'moon');const t2=$('#th2');if(t2)t2.innerHTML=ic(d?'sun':'moon')+'<span>'+(d?'الوضع الفاتح':'الوضع الداكن')+'</span>';$$('[data-th]').forEach(b=>b.innerHTML=ic(d?'sun':'moon')+' تبديل الوضع');const m=document.querySelector('meta[name=theme-color]');if(m)m.content=d?'#0F1522':'#1F3A5F'};
const toggleTh=()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('th',root.dataset.theme)}catch(e){}applyTh()};

/* ===== أدوات: توست ونافذة ===== */
const toast=(t,ms=3800)=>{const d=document.createElement('div');d.className='toast';d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),ms)};
function modal(h){const m=document.createElement('div');m.className='mdl';m.innerHTML=`<div class="mb card" role="dialog" aria-modal="true"><button class="ib mx" aria-label="إغلاق">${ic('x')}</button>${h}</div>`;document.body.appendChild(m);const cl=()=>m.remove();m.onclick=e=>{if(e.target===m)cl()};m.querySelector('.mx').onclick=cl;return{m,cl}}
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelector('.mdl')?.remove()});
function openAv(){const{m,cl}=modal(`<h3>اختار صورتك</h3><p class="mt">رسومات بسيطة وشبهك. غيّرها وقت ما تحب.</p><div class="avg">${AVS.map((_,i)=>`<button class="avp ${i===AVI?'on':''}" data-p="${i}" aria-label="صورة ${i+1}">${avSvg(i)}</button>`).join('')}</div>`);
 m.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{AVI=+b.dataset.p;try{localStorage.setItem('av_'+me.id,AVI)}catch(e){}sb.from('profiles').update({avatar:AVI}).eq('id',me.id).then(()=>{},()=>{});setMc();cl();show(CUR)})}

/* ===== إعدادات الدفع عبر فوري =====
   FAWRY_ENABLED: خليها true بعد ما تاخد حساب التاجر ويتربط الباك إند (startFawryPayment تحت).
   PAY_METHODS: وسائل الدفع اللي بتظهر للطالب (افصل بينهم بـ ·)، عدّلها حسب عقدك مع فوري. */
const FAWRY_ENABLED=false,PAY_METHODS='بطاقات بنكية · محافظ إلكترونية · كود فوري';
const LG=(h,t)=>`<a href="legal.html#${h}" target="_blank" rel="noopener">${t}</a>`;
const POL=`<p class="pol">${LG('terms','الشروط والأحكام')}·${LG('tm-5','سياسة الاسترجاع والإلغاء')}·${LG('tm-6','سياسة التسليم')}·${LG('privacy','الخصوصية')}·${LG('tm-8','بيانات الشركة والتواصل')}</p>`;
/* نقطة الربط مع فوري: لما يجهز الباك إند (Supabase Edge Function) ترجع رابط/بيانات الدفع من هنا */
async function startFawryPayment(amount){
 const r=await sb.functions.invoke('fawry-checkout',{body:{amount}});
 if(r.error||!r.data||!r.data.url)throw new Error('fawry');
 location.href=r.data.url}

/* ===== شحن المحفظة ===== */
function openTopup(){
 const AM=[50,100,200,300,500,1000],MT=PAY_METHODS.split('·').map(x=>x.trim()).filter(Boolean);
 const{m,cl}=modal(`<h3>${ic('wallet')} شحن المحفظة</h3><p class="mt">اشحن رصيدك بأمان عبر <span class="fwb">فوري Fawry</span> وبعدها اشترك في كورساتك.</p>
 <div class="tp-bal"><span class="mt">رصيدك الحالي</span><b>${esc(wal)} <small>ج.م</small></b></div>
 <label class="fl">اختار المبلغ</label>
 <div class="tp-ch">${AM.map(a=>`<button type="button" class="chp" data-a="${a}">${a}</button>`).join('')}</div>
 <div class="tp-in"><input id="fa" type="number" inputmode="numeric" min="10" max="10000" placeholder="أو اكتب مبلغ تاني (من 10 لـ 10000)"><span>ج.م</span></div>
 <div class="tp-pm"><div class="tp-pmh"><b>طريقة الدفع</b><span class="fwb">فوري Fawry</span></div><div class="tp-pills">${MT.map(x=>`<span>${esc(x)}</span>`).join('')}</div></div>
 <div class="tp-sum"><div class="row"><span class="mt">المبلغ</span><b id="ts1">—</b></div><div class="row"><span class="mt">العملة</span><b>جنيه مصري (EGP)</b></div><div class="row tot"><span>الإجمالي</span><b id="ts2">—</b></div></div>
 <label class="agr"><input type="checkbox" id="fg"><span>قرأت ووافقت على ${LG('terms','الشروط والأحكام')} و${LG('tm-5','سياسة الاسترجاع')} و${LG('tm-6','سياسة التسليم')}.</span></label>
 <div class="er" id="fe"></div>
 <button class="btn gld" id="fp" style="width:100%"${FAWRY_ENABLED?'':' disabled'}></button>
 <p class="tp-sec">${ic('lock')} دفع آمن ومشفّر · مبنخزّنش بيانات بطاقتك</p>${POL}`);
 const g=s=>m.querySelector(s),inp=g('#fa'),fp=g('#fp'),fe=t=>g('#fe').textContent=t,val=()=>{const a=+inp.value;return a>=10&&a<=10000?a:0},fm=a=>a.toLocaleString('ar-EG');
 const upd=()=>{const a=val();g('#ts1').textContent=g('#ts2').textContent=a?fm(a)+' ج.م':'—';
  m.querySelectorAll('[data-a]').forEach(b=>b.classList.toggle('on',+b.dataset.a===+inp.value));
  fp.innerHTML=ic('lock')+' '+(FAWRY_ENABLED?(a?'ادفع '+fm(a)+' ج.م عبر فوري':'ادفع عبر فوري'):'الدفع عبر فوري قريبًا')};
 m.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{inp.value=b.dataset.a;fe('');upd()});
 inp.oninput=()=>{fe('');upd()};
 fp.onclick=async()=>{const a=val();
  if(!a)return fe('اكتب مبلغ من 10 لـ 10000 جنيه.');
  if(!g('#fg').checked)return fe('لازم توافق على الشروط وسياسة الاسترجاع الأول.');
  fe('');fp.disabled=true;fp.textContent='ثواني...';
  try{await startFawryPayment(a)}catch(e){console.error('fawry:',e);fe('الدفع الإلكتروني مش متاح دلوقتي، جرّب تاني بعد شوية.');fp.disabled=false;upd()}};
 upd()}

/* ===== الاشتراك في كورس بالمحفظة ===== */
function openSub(id){const c=allC.find(x=>String(x.id)===String(id));if(!c)return;
 const p=Number(c.price)||0,rows=(b)=>`<div class="rc" style="margin:14px 0"><div class="row"><span class="mt">سعر الكورس</span><b>${p>0?esc(p)+' ج.م':'مجاني'}</b></div>${p>0?`<div class="row"><span class="mt">رصيد محفظتك</span><b>${esc(b)} ج.م</b></div>${b>=p?`<div class="row"><span class="mt">الرصيد بعد الاشتراك</span><b>${esc(+(b-p).toFixed(2))} ج.م</b></div>`:`<div class="row"><span class="mt">ناقصك</span><b style="color:#c2563f">${esc(+(p-b).toFixed(2))} ج.م</b></div>`}`:''}</div>`;
 let bal=wal;const{m,cl}=modal('');const box=m.querySelector('.mb');
 const draw=()=>{const ok=p<=0||bal>=p;
  box.innerHTML=`<button class="ib mx" aria-label="إغلاق">${ic('x')}</button><h3>${ic('spark')} ${p>0?'الاشتراك في الكورس':'تفعيل الكورس'}</h3><p class="mt">${esc(c.title)}</p>${rows(bal)}${ok?'':'<p class="mt">رصيدك أقل من سعر الكورس. اشحن محفظتك الأول وبعدها اشترك. الشحن بيتم إلكترونيًا عبر <span class="fwb">فوري</span>.</p>'}${ok&&p>0?`<label class="agr"><input type="checkbox" id="sa"><span>قرأت ووافقت على ${LG('terms','الشروط والأحكام')} و${LG('tm-5','سياسة الاسترجاع')} و${LG('tm-6','سياسة التسليم')}.</span></label>`:''}<div class="er" id="se"></div><div class="acts2">${ok?`<button class="btn gld" id="sg" style="flex:1"${p>0?' disabled':''}>${p>0?'تأكيد وخصم '+esc(p)+' ج.م':'تفعيل مجاني'}</button>`:`<button class="btn gld" id="sw" style="flex:1">${ic('wallet')} اشحن محفظتك</button>`}<button class="btn" id="sx">إلغاء</button></div>`;
  box.querySelector('.mx').onclick=cl;box.querySelector('#sx').onclick=cl;
  const w=box.querySelector('#sw');if(w)w.onclick=()=>{cl();openTopup()};
  const sa=box.querySelector('#sa'),g=box.querySelector('#sg');if(sa&&g)sa.onchange=()=>{g.disabled=!sa.checked};
  if(g)g.onclick=async()=>{g.disabled=true;g.textContent='ثواني...';
   let r;try{r=await TO(sb.rpc('enroll_course',{p_course:String(c.id)}),'enroll_course')}catch(e){r={error:e}}
   const d=r.data;
   if(r.error||!d){box.querySelector('#se').textContent='حصلت مشكلة ومفيش فلوس اتخصمت. جرّب تاني.';g.disabled=false;g.textContent='حاول تاني';return}
   if(d.ok||d.error==='already'){cl();toast(d.ok&&p>0?'✅ اتخصم '+p+' ج.م وتم الاشتراك':'✅ تم الاشتراك');setTimeout(()=>location.replace('dashboard.html?s='+encodeURIComponent(c.id)+'#mine'),900);return}
   if(d.error==='insufficient'){bal=Number(d.balance)||0;wal=bal;draw();return}
   box.querySelector('#se').textContent=d.message||'الكورس ده مش متاح للاشتراك حاليًا.';g.disabled=false;g.textContent='تمام'}};
 draw()}

/* ===== أيام متواصلة ===== */
const streak=(()=>{try{const k='vd_'+me.id,t=new Date().toISOString().slice(0,10);let a=JSON.parse(localStorage.getItem(k)||'[]');if(!a.includes(t)){a.push(t);a=a.slice(-60);localStorage.setItem(k,JSON.stringify(a))}let n=0,d=new Date();while(a.includes(d.toISOString().slice(0,10))){n++;d.setDate(d.getDate()-1)}return n||1}catch(e){return 1}})();

/* ===== الامتحانات ===== */
const shuf=a=>[...a].sort(()=>Math.random()-.5),hs=s=>{let h=5381;for(const c of s)h=(h*33^c.charCodeAt(0))>>>0;return h.toString(36)},qh=q=>hs(q.q+'|'+q.o.join('|')),strip=q=>({q:q.q,o:q.o,a:q.a,e:q.e,img:q.img});
const fmtD=d=>{try{return new Date(d).toLocaleDateString('ar-EG',{day:'numeric',month:'long',year:'numeric'})}catch(e){return''}};
const reloadEA=async()=>{EA=await sf(sb.from('exam_attempts').select('*').eq('student_id',me.id))};
function resultView(o){const{title,qs,res,exam,date,review,noAns}=o,L=['أ','ب','ج','د','هـ','و'],tot=qs.length,sc=res.filter(x=>x.ok).length,wr=res.length?tot-sc:0,p=Math.round((o.score!=null?o.score:sc)/(o.total||tot)*100),bad=res.filter(x=>!x.ok),S=o.score!=null?o.score:sc,T=o.total||tot;
 const head=`<div class="card" style="text-align:center;margin-bottom:14px"><span class="bd">${exam?(review?'تم الحل ✓':'اتسلّم ✓'):'تدريب'}</span><h3 class="sh" style="justify-content:center;margin-top:8px">${esc(title)}</h3>${ring(p,150)}<h3 style="margin-top:8px">${p>=90?'ممتاز! 🏆':p>=60?'كويس، كمّل 💪':'محتاج مراجعة 🔁'}</h3><p style="font-weight:700;margin:6px 0">درجتك ${S} من ${T} (${p}%)</p><p class="mt">${noAns?'':`حليت ${tot} سؤال من ${tot} — صح ${sc} وغلط ${wr}`}</p>${date?`<small class="mt">${review?'اتحل':'اتسلّم'} يوم ${fmtD(date)}</small>`:''}${exam?'<p class="mt" style="margin-top:8px">الامتحان ده بيتحل مرة واحدة بس. تقدر تراجع إجاباتك من «الامتحانات».</p>':''}</div>`;
 const stats=noAns?'':`<div class="mini"><div><b>${S}/${T}</b><span>درجتك</span></div><div><b style="color:var(--ok)">${sc}</b><span>صح</span></div><div><b style="color:#c2563f">${wr}</b><span>غلط</span></div></div>`;
 const acts=`<div class="acts2" style="margin-bottom:16px">${bad.length&&!noAns?`<button class="btn gld" id="rt">${ic('retry')} تدريب على أخطائي (${bad.length})</button>`:''}<button class="btn" id="bk">رجوع للامتحانات</button></div>`;
 const list=noAns?'<div class="card"><p class="mt">إجاباتك القديمة على الامتحان ده مش محفوظة، لكن درجتك محفوظة فوق.</p></div>':res.map((r,i)=>`<div class="card qz ${r.ok?'rt':'wr'}"><p class="qn">${i+1}. ${esc(qs[i].q)}</p>${qs[i].img?`<img class="qimg" src="${esc(qs[i].img)}" alt="">`:''}<div class="ops">${qs[i].o.map((op,j)=>`<div class="opt ${(r.ok&&j===r.u)||(r.a!=null&&j===r.a)?'ok':j===r.u?'no':''}"><i>${L[j]||j+1}</i><span>${esc(op)}</span></div>`).join('')}</div>${r.e?`<p class="ex">💡 ${esc(r.e)}</p>`:!r.ok?'<p class="ex">إجابتك غلط.</p>':''}</div>`).join('');
 $('#v').innerHTML=head+stats+acts+list;scrollTo(0,0);$('#bk').onclick=()=>show('exams');const rt=$('#rt');if(rt)rt.onclick=()=>quiz('تدريب على أخطائك',shuf(bad.map(x=>({...qs[res.indexOf(x)],ex:exam?exam.id:qs[res.indexOf(x)].ex,i:qs[res.indexOf(x)].i}))),null)}
async function reviewExam(x){$('#v').innerHTML='<div class="card"><p class="mt">بنحمّل إجاباتك...</p></div>';
 let r;try{r=await TO(sb.rpc('exam_review',{p_exam:x.id}),'exam_review')}catch(e){r={error:e}}
 if(r.error||!r.data){console.error('exam_review:',r.error);toast('مقدرناش نفتح الإجابات دلوقتي. جرّب تاني.',5000);show('exams');return}
 const d=r.data;WR=await sf(sb.from('wrong_questions').select('*').eq('student_id',me.id).order('created_at',{ascending:false}));
 const qs=x.questions.map((q,i)=>({...q,ex:x.id,i}));
 resultView({title:x.title,qs,res:Array.isArray(d.results)?d.results:[],exam:x,date:d.created_at,review:true,score:d.score,total:d.total,noAns:!!d.no_answers})}
const syncAttempt=async x=>{try{await reloadEA();return EA.some(a=>String(a.exam_id)===String(x.id))}catch(e){return false}};
function quiz(title,qs,exam){const ans=qs.map(()=>-1),L=['أ','ب','ج','د','هـ','و'];
 $('#v').innerHTML=`<div class="card qzh"><div><b>${esc(title)}</b><small class="mt" id="qc">0/${qs.length} اتجاوب</small></div><div class="pb"><i id="qb" style="width:0"></i></div></div>`+qs.map((q,i)=>`<div class="card qz"><p class="qn">${i+1}. ${esc(q.q)}</p>${q.img?`<img class="qimg" src="${esc(q.img)}" alt="">`:''}<div class="ops">${q.o.map((o,j)=>`<button class="opt" data-i="${i}" data-j="${j}"><i>${L[j]||j+1}</i><span>${esc(o)}</span></button>`).join('')}</div></div>`).join('')+`<div class="acts2"><button class="btn gld" id="qs" disabled>${ic('check')} سلّم الإجابات</button><button class="btn" id="qx">إلغاء</button></div>`;
 scrollTo(0,0);
 $$('.opt').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;ans[i]=+b.dataset.j;$$('.opt[data-i="'+i+'"]').forEach(x=>x.classList.toggle('on',x===b));const n=ans.filter(x=>x>=0).length;$('#qc').textContent=n+'/'+qs.length+' اتجاوب';$('#qb').style.width=n/qs.length*100+'%';$('#qs').disabled=n<qs.length});
 $('#qx').onclick=()=>show('exams');
 $('#qs').onclick=async()=>{const bt=$('#qs');bt.disabled=true;const lbl=bt.innerHTML;bt.textContent='بنسلّم إجاباتك...';
 const call=()=>exam?sb.rpc('submit_exam',{p_exam:exam.id,p_answers:ans}):sb.rpc('submit_practice',{p_exams:qs.map(q=>q.ex),p_idx:qs.map(q=>q.i),p_ans:ans});
 const run=async()=>{try{return await Promise.race([call(),new Promise(res=>setTimeout(()=>res({error:{message:'timeout',code:'TIMEOUT'}}),30000))])}catch(e){return{error:{message:String(e&&e.message||e),code:'NETWORK'}}}};
 const isAuth=e=>!!e&&/jwt|expired|not authenticated|not_authenticated|invalid claim|JWT/i.test(String(e.message||'')+' '+String(e.code||''));
 let r=await run();
 if(r.error&&isAuth(r.error)){try{await sb.auth.refreshSession()}catch(_){}r=await run()}
 const mism=!r.error&&(!r.data||!Array.isArray(r.data.results)||r.data.results.length!==qs.length);
 if(r.error||mism){const er=r.error||{},msg=String(er.message||''),code=String(er.code||''),all=msg+' '+code;console.error('submit failed:',r.error||r.data);
  if(exam&&(/already_solved/.test(all)||(/TIMEOUT|NETWORK|fetch|network/i.test(all)&&await syncAttempt(exam)))){toast(/already_solved/.test(all)?'الامتحان ده اتحل قبل كده.':'تسليمك وصل ✅',4500);await reloadEA();await reviewExam(exam);return}
  const why=/not_in_bank/.test(all)?'التمرين ده اتحدّث. ارجع للامتحانات وابدأ تاني.'
   :/attempts/i.test(all)?'خلّصت محاولات الامتحان ده.'
   :isAuth(er)?'الجلسة انتهت. سجّل دخولك تاني وجرّب.'
   :/no_key/.test(all)?'الامتحان ده مالوش مفتاح إجابات لسه. كلّم المدرس أو الدعم.'
   :/bad_answers/.test(all)?'عدد الإجابات مش مطابق لأسئلة الامتحان. حدّث الصفحة وابدأ تاني.'
   :/exam_not_found/.test(all)?'الامتحان ده مش موجود أو اتحذف.'
   :/no_attempts_left/.test(all)?'خلّصت محاولات الامتحان ده.'
   :code==='P0001'?'السيرفر رفض التسليم: '+(msg||'بدون تفاصيل')
   :/PGRST202|42883|could not find the function|does not exist/i.test(all)?'تسليم الامتحان مش متظبط على السيرفر لسه. كلّم الدعم.'
   :/42501|row-level|permission|not enrolled|enroll|subscri/i.test(all)?'لازم تكون مشترك في الكورس ده عشان تسلّم.'
   :/TIMEOUT|NETWORK|fetch|network/i.test(all)?'النت ضعيف. إجاباتك لسه قدامك، دوس سلّم تاني.'
   :mism?'الامتحان اتغيّر. حدّث الصفحة وابدأ تاني.'
   :'حصلت مشكلة. إجاباتك لسه قدامك، دوس سلّم تاني.';
  toast(why+(code&&!mism?' ['+code+']':''),6500);bt.disabled=false;bt.innerHTML=lbl;return}
 try{
  const res=r.data.results.map((x,i)=>({ok:!!x.ok,u:ans[i],a:x.a,e:x.e})),sc=res.filter(x=>x.ok).length;
  if(exam){await reloadEA();if(!EA.some(a=>String(a.exam_id)===String(exam.id)))EA.push({exam_id:exam.id,score:sc,total:qs.length,created_at:new Date().toISOString()})}
  WR=await sf(sb.from('wrong_questions').select('*').eq('student_id',me.id).order('created_at',{ascending:false}));
  resultView({title,qs,res,exam,date:new Date().toISOString(),review:false});
  }catch(e){console.error('result render:',e);toast('اتسلّمت إجاباتك، بس حصلت مشكلة في عرض النتيجة. شوفها من «الامتحانات».',6500);show('exams')}}}

const V={
home(){const my=courses.map((c,i)=>[c,i]).filter(([c])=>mine.has(c.id)),myE=enr.filter(e=>e.student_id===me.id);
 const done=enr.reduce((a,e)=>a+(e.lessons_done||0),0),avg=myE.length?Math.round(myE.reduce((a,e)=>a+pct(e,courses.find(c=>c.id===e.course_id)),0)/myE.length):0;
 const dt=new Date().toLocaleDateString('ar-EG',{weekday:'long',day:'numeric',month:'long'}),rec=courses.map((c,i)=>[c,i]).filter(([c])=>!mine.has(c.id)&&fit(c));
 const cp=parent?[['أبناء مرتبطين','👨‍👩‍👧 '+kids.length],['اشتراكات','🎓 '+enr.length]]:[['يوم معانا','🔥 '+days],['دروس خلّصتها','✓ '+done]];
 let h=`<section class="hero2"><div class="hfx" aria-hidden="true"><span>ع</span><span>ر</span><span>ب</span><span>ي</span></div>${STAR}<div class="hg2"><div class="htx"><span class="tag2">${dt}</span><h1>${greet}<br>يا <em>${esc(first)}</em> 👋</h1><p class="lead2">${parent?'تابع مستوى أبنائك وتقدّمهم خطوة بخطوة.':esc(me.grade)+(me.track?' · '+esc(me.track):'')+' · كمّل رحلتك مع ابن رشدي، خطوة كل يوم توصلك.'}</p><div class="cta2"><button class="btn gld" data-go="${!parent&&my.length?'mine':'all'}">${!parent&&my.length?'كمّل التعلم':'تصفّح الكورسات'} ${ic('arr')}</button><button class="btn gh" data-go="support">محتاج مساعدة؟</button></div></div><div class="hch">${cp.map(x=>`<div class="gc">${x[0]}<b>${x[1]}</b></div>`).join('')}</div></div></section>`;
 h+=(noTrack?'<div class="card pnd"><span>⚠️ <b>مسارك لسه ما اتحددش</b> فبتشوف المحتوى العام بس. كلّم الدعم يحدد لك مسارك (عام / بكالوريا / أزهر).</span><button class="btn gld" data-go="support">كلّم الدعم</button></div>':'')+AN.map(a=>`<div class="card pnd"><span><b>📣 ${esc(a.title)}</b>${a.body?'<br><span class="mt">'+esc(a.body)+'</span>':''}</span></div>`).join('');
 h+=pend.map(p=>`<div class="card pnd"><span><b>${esc(p.full_name)}</b> طلب يربط حسابه كولي أمر لحسابك.</span> <button class="btn p" data-ap="${esc(p.id)}">موافقة</button></div>`).join('');
 h+=(parent?'':RC)+`<div class="st">${parent?stat(kids.length,'أبناء مرتبطين','t1','user')+stat(enr.length,'اشتراكات','t2','cap'):stat(myE.length,'كورساتي','t1','cap')+stat(done,'دروس خلّصتها','t2','check')}${stat(courses.length,'كورسات متاحة','t3','book')+stat(days,'يوم معانا','t4','home')}</div>`;
 const bot=`<div class="g2b"><div class="card qt"><span class="qm" aria-hidden="true">”</span>${ORN}<p>${QS[new Date().getDate()%QS.length]}</p><small>حكمة اليوم</small></div>${parent?'<div class="card pl"><div class="pic" aria-hidden="true">💬</div><h3>محتاج مساعدة؟</h3><p class="mt">فريق الدعم بيرد عليك في أقل من 24 ساعة.</p><button class="btn gld" style="margin-top:14px" data-go="support">كلّمنا</button></div>':`<div class="card pl"><div class="pic" aria-hidden="true">👨‍👩‍👧</div><h3>خلّي ولي أمرك يتابعك</h3><p class="mt">ولي أمرك بيسجّل من صفحة "ولي أمر" برقم موبايلك، وبعدها توافق على الربط من هنا.</p><div class="phn"><b dir="ltr">${esc(me.phone)}</b><button class="btn" data-cp="${esc(me.phone)}">نسخ الرقم</button></div><a class="btn gld" href="parent.html">صفحة ولي الأمر</a></div>`}</div>`;
 const recH=rec.length?`<h3 class="sh">${my.length?'كورسات تانية ممكن تعجبك':parent?'كورسات المنصة':'كورسات مرحلتك'}<span class="shl">اسحب ←</span></h3>${RAIL(rec.map(([c,i],k)=>door(c,i,k)).join(''))}`:'';
 if(parent){const pl=L.filter(l=>l.status==='pending'&&l.parent_id===me.id).length,pcx=r=>r.total?Math.round((r.score||0)/r.total*100):0,tn=p=>p>=85?'ok':p>=50?'md':'lo',dd=x=>new Date(x).toLocaleDateString('ar-EG',{day:'numeric',month:'short'}),
 kcard=k=>{const ke=enr.filter(e=>e.student_id===k.id),a=ke.length?Math.round(ke.reduce((s,e)=>s+pct(e,courses.find(c=>c.id===e.course_id)),0)/ke.length):0,
  rs=KR.filter(r=>r.student_id===k.id).sort((x,y)=>new Date(y.created_at)-new Date(x.created_at)),dn=ke.reduce((s,e)=>s+(e.lessons_done||0),0),
  av=rs.length?Math.round(rs.reduce((s,r)=>s+pcx(r),0)/rs.length):null,ago=rs.length?Math.max(0,Math.floor((Date.now()-new Date(rs[0].created_at))/864e5)):null,
  agt=ago===null?'—':ago===0?'النهارده':ago===1?'امبارح':ago+' يوم',
  fl=av===null?'':av<50?'<span class="bd no">محتاج متابعة</span>':av>=85?'<span class="bd ok">مستواه ممتاز 🌟</span>':'',
  row=r=>`<div class="kr"><span class="bd">${r.kind==='homework'?'واجب':'امتحان'}</span><span class="krt">${esc(r.title||'امتحان')}</span><b class="kp ${tn(pcx(r))}">${r.score||0}/${r.total||0}</b><small class="mt">${dd(r.created_at)}</small></div>`,
  bars=ke.map(e=>{const c=courses.find(x=>x.id===e.course_id);return c?bar(c.title,pct(e,c)):''}).join('')||'<p class="mt">مش مشترك في كورسات لسه.</p>',
  res=!KRok?'<p class="mt">النتايج مش متاحة دلوقتي، جرّب تحدّث الصفحة بعد شوية.</p>':rs.length?rs.slice(0,5).map(row).join('')+(rs.length>5?`<details class="krm"><summary>كل النتايج (${rs.length})</summary>${rs.slice(5).map(row).join('')}</details>`:''):'<p class="mt">لسه ما حلّش امتحانات أو واجبات.</p>';
  KRP[k.id]=['📊 تقرير '+k.full_name+' - منصة ابن رشدي',k.grade+(k.track?' · '+k.track:''),'',
   'التقدّم في الكورسات: '+a+'%','دروس خلّصها: '+dn,KRok?'متوسط الدرجات: '+(av===null?'لسه ما حلّش امتحانات':av+'% ('+rs.length+' امتحان وواجب)'):'',
   ...(rs.length?['','آخر النتايج:',...rs.slice(0,5).map(r=>'• '+(r.title||'امتحان')+': '+(r.score||0)+'/'+(r.total||0))]:[]),'','https://ibn-roshdy.vercel.app'].join('\n');
  return`<div class="card kid">${ring(a,100)}<div style="flex:1;min-width:200px"><div class="kh"><b>${esc(k.full_name)}</b><span class="bd">${esc(k.grade)}${k.track?' · '+esc(k.track):''}</span>${fl}</div><div class="kst"><div><b>${dn}</b><span>درس خلّصه</span></div><div><b>${KRok?rs.length:'—'}</b><span>امتحان وواجب</span></div><div><b>${KRok&&av!==null?av+'%':'—'}</b><span>متوسط الدرجات</span></div><div><b>${KRok?agt:'—'}</b><span>آخر امتحان</span></div></div><h4 class="kt">التقدّم في الكورسات</h4>${bars}<h4 class="kt">آخر النتايج</h4>${res}<div class="kact"><button class="btn sm" data-kr="${k.id}">📤 ابعت التقرير</button></div></div></div>`};
 return h+'<h3 class="sh">أبنائي</h3>'+(pl?`<div class="card kpend"><b>⏳ ${pl===1?'طلب ربط واحد':pl+' طلبات ربط'} مستني موافقة الطالب</b><p class="mt" style="margin-top:6px">اطلب من ابنك يدخل حسابه ويدوس «موافقة» على طلبك، وبعدها هيظهر هنا بكل نتايجه.</p></div>`:'')+(kids.length?kids.map(kcard).join(''):(pl?'':'<div class="card mt">لسه مفيش طالب مرتبط. لما الطالب يوافق على الربط هيظهر هنا.</div>'))+recH+bot}
 const sp=[['أنشأت حسابك','وكل كورساتك في مكان واحد',1],['اختار كورسك','من صفحة الكورسات',myE.length>0],['ذاكر دروسك','وتقدّمك بيتسجّل لوحده',done>0],['اختبر مستواك','حلّ أول امتحان من صفحة الامتحانات',EA.length>0]],cur=sp.findIndex(x=>!x[2]);
 if(my.length)h+=`<h3 class="sh">كورساتي<span class="shl">اسحب ←</span></h3>${RAIL(my.map(([c,i],k)=>door(c,i,k)).join(''))}<div class="g2"><div class="card" style="text-align:center"><h3 style="margin-bottom:10px">تقدّمك العام</h3>${ring(avg,150)}</div><div class="card"><h3 style="margin-bottom:14px">تقدّم كل كورس</h3>${my.map(([c])=>bar(c.title,pct(myE.find(e=>e.course_id===c.id),c))).join('')}</div></div>`;
 else h+=DOORS('كل كورس بيفتحلك باب جديد','اختار كورسك الأول وافتح بابك، وتقدّمك هيظهر هنا خطوة بخطوة.','شوف الكورسات');
 h+=(!parent&&WRQ().length?`<div class="card cont" style="margin-bottom:14px"><div class="ct"><span class="tag3">مراجعة سريعة</span><h3>${WRQ().length} سؤال محتاج مراجعة</h3><p class="mt">اعمل امتحان من أخطائك وثبّت المعلومة.</p></div><button class="btn gld" data-go="exams">${ic('retry')} راجع دلوقتي</button></div>`:'')+recH;
 h+=`<div class="card jr"><h3 class="sh">رحلتك مع ابن رشدي</h3><div class="road">${sp.map((x,i)=>`<div class="stn ${x[2]?'ok':i===cur?'now':''}"><b>${x[2]?'✓':i+1}</b><h4>${x[0]}</h4><p>${x[1]}</p></div>`).join('')}</div></div>`;
 return h+bot},
all(){const gs=[...new Set(courses.flatMap(cg))].filter(x=>x&&(parent||x===me.grade));let g=parent?'الكل':me.grade,q='';if(!gs.includes(g))g='الكل';
 const draw=()=>{const l=courses.map((c,i)=>[c,i]).filter(([c])=>(g==='الكل'||!cg(c).length||cg(c).includes(g))&&(c.title+c.description).includes(q));
  $('#v').innerHTML=PG('pg-all','بوابة الأبواب','كل الكورسات','اختار اللي يناسب مرحلتك وافتح بابك النهاردة 🚀','ب')+`<div class="sbx">${ic('search')}<input id="q" placeholder="ابحث عن كورس..." value="${esc(q)}"></div><div class="chs">${['الكل',...gs].map(x=>`<button class="chp ${x===g?'on':''}" data-g="${esc(x)}">${esc(x.replace('الصف ',''))}</button>`).join('')}</div><p class="cnt">${l.length} كورس متاح <span class="shl">اسحب ←</span></p>${l.length?RAIL(l.map(([c,i],k)=>door(c,i,k)).join('')):EMP('مفيش كورسات هنا لسه','بنجهّز لك حاجات حلوة، خليك قريب 😉')}`;
  $$('[data-g]').forEach(b=>b.onclick=()=>{g=b.dataset.g;draw()});const i=$('#q');i.oninput=()=>{q=i.value.trim();draw();const n=$('#q');n.focus();n.setSelectionRange(q.length,q.length)};rails()};return draw},
mine(){const my=courses.map((c,i)=>[c,i]).filter(([c])=>mine.has(c.id)),myE=enr.filter(e=>e.student_id===me.id),done=myE.reduce((a,e)=>a+(e.lessons_done||0),0),avg=my.length?Math.round(my.reduce((a,[c])=>a+pct(myE.find(e=>e.course_id===c.id),c),0)/my.length):0;
 if(!my.length)return PG('pg-mine','رحلتك','كورساتي','رحلتك بتبدأ من أول باب 🎓','م')+DOORS('لسه ما فتحتش أي باب','اختار كورسك الأول وهتلاقي كل حاجة هنا: تقدّمك ودروسك وإنجازاتك.','افتح أول باب');
 const cur=my.map(([c,i])=>({c,i,p:pct(myE.find(e=>e.course_id===c.id),c)})).sort((a,b)=>(a.p>=100)-(b.p>=100)||b.p-a.p)[0];
 return PG('pg-mine','رحلتك',"كورساتي",avg>=100?'خلّصت كل حاجة! أنت أسطورة 🏆':avg>0?'كمّل، أنت ماشي صح 🔥':'ابدأ أول درس النهاردة ✨','م')+`<div class="mini"><div><b data-n="${my.length}">0</b><span>كورس</span></div><div><b data-n="${done}">0</b><span>درس خلّصته</span></div><div><b data-n="${avg}">0</b><span>% تقدّم عام</span></div></div><div class="card cont">${ring(cur.p,104)}<div class="ct"><span class="tag3">كمّل من حيث وقفت</span><h3>${esc(cur.c.title)}</h3><p class="mt">${esc(cur.c.description)}</p></div><button class="btn gld" disabled>${ic('play')} ابدأ التعلم (قريباً)</button></div><h3 class="sh">أبوابي المفتوحة<span class="shl">اسحب ←</span></h3>${RAIL(my.map(([c,i],k)=>door(c,i,k)).join(''))}`},
support(){let sent=0;const draw=async()=>{const{data:t}=await sb.from('support_tickets').select('*').order('created_at',{ascending:false});
  const TP=[['🔬','سؤال علمي'],['🛠','مشكلة تقنية'],['🔑','حسابي'],['💡','اقتراح']],FQ=[['إزاي أسأل سؤال علمي؟','اختار "سؤال علمي" من فوق، واكتب المادة والدرس وسؤالك بالتفصيل. فريق المدرسين هيرد عليك في أقل من 24 ساعة.'],['إزاي أربط حساب ولي الأمر؟','ولي الأمر بيسجّل من صفحة "ولي أمر" برقم الطالب، والطالب بيوافق من الرئيسية.'],['نسيت كلمة المرور','من صفحة الدخول دوس "نسيت كلمة المرور"، أو ابعتلنا رسالة هنا باسمك ورقمك.'],['الفيديو مش بيشتغل معايا','حدّث الصفحة وجرّب نت تاني، ولو المشكلة مستمرة ابعتلنا نوع جهازك.']];
  $('#v').innerHTML=PG('pg-sup','احنا معاك','الدعم','احنا هنا نسمعك، ومفيش سؤال صغير 🎤','س')+(sent?'<div class="okb">✅ وصلت رسالتك! هنرد عليك في أقل من 24 ساعة.</div>':'')+`<div class="tiles"><div>${ic('clock')}<b>أقل من 24 ساعة</b><span>وقت الرد</span></div><div>${ic('chat')}<b>بنقرا كل رسالة</b><span>فريق حقيقي</span></div><div><i class="live"></i><b>متاحين دايمًا</b><span>ابعت في أي وقت</span></div></div><div class="g2s"><div class="card"><h3>ابعتلنا رسالة ${ic('send')}</h3><p class="mt" style="margin:4px 0 12px">اختار الموضوع أو اكتبه بنفسك:</p><div class="tpg">${TP.map(x=>`<button class="tpc" data-tp="${x[1]}"><i>${x[0]}</i><span>${x[1]}</span></button>`).join('')}</div><input id="sj" maxlength="100" placeholder="الموضوع"><textarea id="ms" maxlength="1000" placeholder="اكتب رسالتك بالتفصيل..."></textarea><div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><span class="er" id="er"></span><small class="mt" id="cn">0/1000</small></div><button class="btn gld" id="sn" style="width:100%;margin-top:8px">إرسال الرسالة</button></div><div class="card"><h3 style="margin-bottom:6px">أسئلة شائعة 💡</h3>${FQ.map(f=>`<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('')}</div></div><h3 class="sh">رسايلك</h3><div class="tl">${(t||[]).map(x=>`<div class="tk"><span class="dot ${x.status==='open'?'o':'c'}"></span><div><b>${esc(x.subject)}</b><p class="mt">${esc(x.message)}</p><small class="mt">${new Date(x.created_at).toLocaleDateString('ar-EG',{day:'numeric',month:'long'})}</small></div><span class="bd ${x.status==='open'?'':'ok'}">${x.status==='open'?'بنراجعها':'اتحلّت ✓'}</span></div>`).join('')||EMP('مفيش رسايل لسه','لو محتاج أي حاجة ابعتلنا فوق وهنرد عليك.')}</div>`;
  $$('[data-tp]').forEach(b=>b.onclick=()=>{$('#sj').value=b.dataset.tp;$('#ms').placeholder=b.dataset.tp==='سؤال علمي'?'اكتب سؤالك العلمي: المادة والدرس والسؤال بالتفصيل...':'اكتب رسالتك بالتفصيل...';$$('[data-tp]').forEach(x=>x.classList.toggle('on',x===b))});$('#ms').oninput=e=>$('#cn').textContent=e.target.value.length+'/1000';
  $('#sn').onclick=async()=>{const s=$('#sj').value.trim(),m=$('#ms').value.trim();if(s.length<3||m.length<5){$('#er').textContent='اكتب الموضوع والرسالة.';return}
   $('#sn').disabled=true;const{error}=await sb.from('support_tickets').insert({subject:s,message:m});if(error){$('#er').textContent='حصلت مشكلة، جرّب تاني.';$('#sn').disabled=false}else{sent=1;draw();scrollTo(0,0)}}};return draw},
account(){const nm=me.full_name.trim(),myE=enr.filter(e=>e.student_id===me.id),done=myE.reduce((a,e)=>a+(e.lessons_done||0),0),
 xp=parent?0:done*10+myE.length*25+EA.length*15+days*2,lv=Math.floor(xp/100)+1,xr=xp%100,R=54,C=2*Math.PI*R,
 best=EA.length?Math.max(...EA.map(a=>Math.round(a.score/a.total*100))):0,ST={pending:'بنراجعه',approved:'اتقبل ✓',rejected:'اترفض'},
 rows=[['phone','الموبايل',me.phone],...(parent?[]:[['cap','المرحلة',me.grade],...(me.track?[['cap','المسار',me.track]]:[]),['user','موبايل ولي الأمر',me.parent_phone]]),['cal','عضو من',new Date(me.created_at).toLocaleDateString('ar-EG')]],
 bg=[['🌱','أول خطوة','أنشأت حسابك',1],['🎓','مشترك','اشتركت في كورس',myE.length>0],['📚','مجتهد','خلّصت 5 دروس',done>=5],['🔥','مثابر','أسبوع معانا',days>=7],['📝','مختبِر','حلّيت أول امتحان',EA.length>0],['🏆','متفوق','جبت 90% أو أكتر',best>=90],['🎯','صايد الأخطاء','فضّيت بنك أخطائك',EA.length>0&&!WRQ().length],['💰','شاحن','أول طلب شحن',TU.length>0]],
 wl=parent?'':`<div class="card wal"><div class="wal-t"><div class="wal-i">${ic('wallet')}</div><div><span class="mt">رصيد المحفظة</span><b class="wal-b"><span data-n="${wal}">0</span> <small>ج.م</small></b></div><button class="btn gld" data-wal>${ic('up')} اشحن المحفظة</button></div>${TU.length?`<div class="wal-l">${TU.slice(0,3).map(t=>`<div class="row"><span>${esc(t.method||'تحويل')} · ${new Date(t.created_at).toLocaleDateString('ar-EG',{day:'numeric',month:'short'})}</span><span><b>${esc(t.amount)} ج.م</b> <span class="bd ${t.status==='approved'?'ok':t.status==='rejected'?'no':''}">${ST[t.status]||'بنراجعه'}</span></span></div>`).join('')}</div>`:'<p class="mt" style="margin-top:10px">لسه ما شحنتش. دوس "اشحن المحفظة" وادفع بأمان عبر فوري.</p>'}<p class="pol">الدفع الإلكتروني عبر <span class="fwb">فوري</span> · بالجنيه المصري<br>${LG('terms','الشروط والأحكام')}·${LG('tm-5','الاسترجاع')}·${LG('tm-6','التسليم')}·${LG('privacy','الخصوصية')}</p></div>`;
 return`<section class="pass"><div class="pass-top"><div class="avr"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="${R}" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="6"/><circle cx="60" cy="60" r="${R}" fill="none" stroke="#F0C46E" stroke-width="6" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-(parent?1:xr/100))}" transform="rotate(-90 60 60)" style="transition:stroke-dashoffset 1.2s"/></svg><div class="av2">${avSvg(AVI)}</div><button class="avb" data-av aria-label="تغيير الصورة">${ic('pen')}</button></div><div class="pass-id"><span class="tag2">${parent?'ولي أمر':'طالب'} · بطاقة الرحلة</span><h2>${esc(nm)}</h2>${parent?'<p class="lead2" style="margin:0">متابع لرحلة أبنائه خطوة بخطوة</p>':`<div class="lvl"><b>المستوى ${lv}</b><div class="pb"><i style="width:${xr}%"></i></div><small>${xr}/100 للمستوى التالي</small></div>`}</div></div>${parent?`<div class="mini"><div><b data-n="${days}">0</b><span>يوم معانا</span></div><div><b data-n="${kids.length}">0</b><span>أبناء</span></div><div><b data-n="${enr.length}">0</b><span>اشتراك</span></div></div>`:`<div class="mini m4"><div><b data-n="${streak}">0</b><span>يوم متواصل 🔥</span></div><div><b data-n="${myE.length}">0</b><span>كورس</span></div><div><b data-n="${done}">0</b><span>درس</span></div><div><b data-n="${EA.length}">0</b><span>امتحان</span></div></div>`}</section>${wl}<div class="g2s"><div class="card"><h3 style="margin-bottom:8px">بياناتك</h3>${rows.map(r=>`<div class="row"><span class="mt">${ic(r[0])} ${r[1]}</span><b dir="auto">${esc(r[2])}</b></div>`).join('')}</div><div class="card"><h3 style="margin-bottom:12px">أختام الإنجاز 🏅</h3><div class="stamps">${(parent?[bg[0]]:bg).map((x,i)=>`<div class="stm ${x[3]?'':'lk'}" style="--r:${i%2?5:-5}deg"><i>${x[0]}</i><b>${x[1]}</b><small>${x[2]}</small></div>`).join('')}</div></div></div><div class="acts2"><button class="btn" data-th>${ic('moon')} تبديل الوضع</button><button class="btn" data-av>${ic('pen')} تغيير الصورة</button>${parent?'':`<button class="btn" data-cp="${esc(me.phone)}">${ic('copy')} نسخ رقمك لولي الأمر</button>`}<button class="btn" id="o2">${ic('out')} تسجيل الخروج</button></div>`},
exams(){let tab='exam';const cn=id=>courses.find(c=>c.id===id)?.title||'',last=id=>EA.filter(a=>a.exam_id===id).sort((a,b)=>new Date(b.created_at)-new Date(a.created_at))[0];
 const draw=()=>{const avg=EA.length?Math.round(EA.reduce((a,x)=>a+x.score/x.total*100,0)/EA.length):0,wq=WRQ();let body='';
  if(tab==='bank'){const g={};wq.forEach(w=>(g[String(w.ex)]=g[String(w.ex)]||[]).push(w));
   body=wq.length?`<div class="card cont"><div class="ct"><span class="tag3">بنك أخطائي</span><h3>${wq.length} سؤال محتاج مراجعة</h3><p class="mt">اعمل امتحان من الأسئلة اللي غلطت فيها. لما تجاوبها صح هتتشال من البنك.</p></div><button class="btn gld" data-bank="all">${ic('retry')} امتحان من كل أخطائي</button></div>`+Object.entries(g).map(([id,l])=>{const x=EX.find(e=>String(e.id)===id);return`<div class="card exg"><div class="exg-h"><div><b>${esc(x?x.title:'أسئلة متفرقة')}</b><small class="mt">${esc(x?cn(x.course_id):'')}</small></div><span class="bd">${l.length} غلط</span><button class="btn" data-bank="${esc(id)}">${ic('retry')} تدرّب</button></div>${l.map(w=>`<p class="wq">${esc(w.q)}</p>`).join('')}</div>`}).join(''):EMP('بنك الأخطاء فاضي 🎉','كل ما تغلط في سؤال هيتضاف هنا علشان تراجعه.')}
  else{const l=EX.filter(x=>x.kind===tab);
   body=l.length?`<div class="exl">${l.map(x=>{const a=last(x.id),p=a?Math.round(a.score/a.total*100):null;return`<article class="card exc"><span class="bd">${esc(cn(x.course_id)||'عام')}</span><h3>${esc(x.title)}</h3><p class="mt">${x.questions.length} سؤال</p>${a?`<div class="pb"><i style="width:${p}%"></i></div><small class="mt"><b>تم الحل ✓</b> — درجتك ${a.score} من ${a.total} (${p}%) — ${fmtD(a.created_at)}</small><button class="btn" data-rv="${esc(x.id)}">${ic('check')} شوف إجاباتك</button>`:`<small class="mt">لسه ما اتحلش. بيتحل مرة واحدة بس.</small><button class="btn gld" data-ex="${esc(x.id)}">${ic('play')} ابدأ</button>`}</article>`}).join('')}</div>`:EMP(tab==='exam'?'مفيش امتحانات لسه':'مفيش واجبات لسه','أول ما المدرس يضيف حاجة لكورساتك هتلاقيها هنا.')}
  $('#v').innerHTML=PG('pg-ex','اختبر نفسك','الامتحانات','حلّ، صحّح، وراجع أخطاءك علشان تتفوق 🎯','ا')+`<div class="mini"><div><b>${EA.length}</b><span>محاولة</span></div><div><b>${avg}%</b><span>متوسط درجاتك</span></div><div><b>${wq.length}</b><span>سؤال للمراجعة</span></div></div><div class="chs">${[['exam','الامتحانات'],['homework','الواجبات'],['bank','بنك أخطائي ('+wq.length+')']].map(x=>`<button class="chp ${tab===x[0]?'on':''}" data-t="${x[0]}">${x[1]}</button>`).join('')}</div>`+body;
  $$('[data-t]').forEach(b=>b.onclick=()=>{tab=b.dataset.t;draw()});
  $$('[data-ex]').forEach(b=>b.onclick=async()=>{const x=EX.find(e=>String(e.id)===b.dataset.ex);if(!x)return;await reloadEA();if(last(x.id)){draw();return}if(!confirm((x.kind==='homework'?'الواجب':'الامتحان')+' ده بيتحل مرة واحدة بس، ومش هتقدر تعيده بعد التسليم.\nمتأكد إنك عايز تبدأ؟'))return;quiz(x.title,x.questions.map((q,i)=>({...q,ex:x.id,i})),x)});
  $$('[data-rv]').forEach(b=>b.onclick=()=>{const x=EX.find(e=>String(e.id)===b.dataset.rv);if(x)reviewExam(x)});
  $$('[data-bank]').forEach(b=>b.onclick=()=>{const id=b.dataset.bank;quiz('امتحان من أخطائك',shuf(WRQ().filter(w=>id==='all'||String(w.ex)===id)).slice(0,10),null)})};
 return draw}
};
const N=[['home','home','الرئيسية'],['all','book','الكورسات'],...(parent?[]:[['mine','cap','كورساتي'],['exams','exam','امتحانات']]),['support','chat','الدعم'],['account','user','حسابي']];
$('#nav').innerHTML=N.map(n=>`<button class="nv" data-n="${n[0]}">${ic(n[1])}<span>${n[2]}</span></button>`).join('');
$('#out').innerHTML=ic('out')+'<span>تسجيل الخروج</span>';applyTh();setMc();const mc=$('#mc');mc.onclick=()=>$('.nv[data-n="account"]').click();mc.onkeydown=e=>{if(e.key==='Enter')mc.click()};
const out=async()=>{await sb.auth.signOut();go()};$('#out').onclick=out;
function count(){$$('[data-n]').forEach(el=>{if(el.tagName==='BUTTON')return;const n=+el.dataset.n,t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/800);el.textContent=Math.round(n*k);if(k<1)requestAnimationFrame(f)})(t0)})}
async function show(k){CUR=k;clearT();$$('.nv[data-n]').forEach(b=>b.classList.toggle('on',b.dataset.n===k));$('#tt').textContent=N.find(n=>n[0]===k)[2];
 const r=await V[k]();if(typeof r==='function')await r();else{$('#v').innerHTML=r;rails()}count();scrollTo(0,0);
 $$('.pb i').forEach(i=>{const w=i.style.width;i.style.width=0;setTimeout(()=>i.style.width=w,50)});
 $$('[data-ap]').forEach(b=>b.onclick=async()=>{b.disabled=true;await sb.from('parent_links').update({status:'approved'}).eq('parent_id',b.dataset.ap).eq('student_id',me.id);location.reload()});
 const o=$('#o2');if(o)o.onclick=out;$$('[data-go]').forEach(b=>b.onclick=()=>document.querySelector('.nv[data-n="'+b.dataset.go+'"]').click());$$('[data-cp]').forEach(b=>b.onclick=()=>{try{navigator.clipboard.writeText(b.dataset.cp)}catch(e){}b.textContent='اتنسخ ✓'});$$('[data-th]').forEach(b=>b.onclick=toggleTh);applyTh();$$('[data-wal]').forEach(b=>b.onclick=openTopup);$$('[data-sub]').forEach(b=>b.onclick=()=>openSub(b.dataset.sub));$$('[data-kr]').forEach(b=>b.onclick=async()=>{const t=KRP[b.dataset.kr]||'';if(!t)return;try{if(navigator.share){await navigator.share({text:t});return}}catch(e){if(e&&e.name==='AbortError')return}try{await navigator.clipboard.writeText(t);toast('اتنسخ التقرير ✅')}catch(e){toast('مقدرتش أنسخ التقرير')}});$$('[data-av]').forEach(b=>b.onclick=openAv);$$('[data-rc]').forEach(b=>b.onclick=async()=>{const v=b.parentElement.querySelector('input').value.trim();if(!v)return;b.disabled=true;const r=await sb.rpc('redeem_code',{p_code:v});b.disabled=false;const d=r.data;if(r.error||!d)return toast('حصلت مشكلة، جرّب تاني.');if(d.ok){toast('تم التفعيل: '+d.t+' ✅');setTimeout(()=>location.reload(),900)}else toast(d.r==='too_many'?'محاولات كتير، استنى 10 دقايق.':'الكود غلط.')})}
$$('.nv[data-n]').forEach(b=>b.onclick=()=>{show(b.dataset.n);history.replaceState(0,'','#'+b.dataset.n)});
{const t1=$('#th'),t2=$('#th2');if(t1)t1.onclick=toggleTh;if(t2)t2.onclick=toggleTh}
await show(V[location.hash.slice(1)]&&N.some(n=>n[0]===location.hash.slice(1))?location.hash.slice(1):'home');
{const q=new URLSearchParams(location.search),sid=q.get('s'),wq=q.get('w');
 if(!parent&&(sid||wq)){history.replaceState(0,'','dashboard.html'+location.hash);
  if(sid){const c=allC.find(x=>String(x.id)===sid);if(c&&mine.has(c.id))toast('✅ اشتركت في «'+c.title+'». هتلاقيه في «كورساتي»، دوس «ادخل الكورس» وقت ما تحب.')}
  if(wq)openTopup()}}
{const xid=new URLSearchParams(location.search).get('x');if(xid&&!parent&&typeof EX!=='undefined'){const x=EX.find(e=>String(e.id)===xid);if(x){history.replaceState(0,'','dashboard.html');if(EA.some(a=>String(a.exam_id)===String(x.id)))reviewExam(x);else quiz(x.title,x.questions.map((q,i)=>({...q,ex:x.id,i})),x)}}}
})().catch(e=>window.__fail(e));
