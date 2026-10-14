(()=>{
const $=s=>document.querySelector(s);
try{const t=localStorage.getItem('th');if(t)document.documentElement.dataset.theme=t}catch(e){}
function back(){let ok=false;try{ok=history.length>1&&document.referrer&&new URL(document.referrer).origin===location.origin}catch(e){}ok?history.back():location.href='index.html'}
$('#x').onclick=e=>{e.preventDefault();back()};
addEventListener('keydown',e=>{if(e.key=='Escape')back()});
document.querySelectorAll('.tabs a,.ft a').forEach(a=>a.onclick=e=>{e.preventDefault();location.replace(a.href)});

const GRADES=['الصف الرابع الابتدائي','الصف الخامس الابتدائي','الصف السادس الابتدائي','الصف الأول الإعدادي','الصف الثاني الإعدادي','الصف الثالث الإعدادي','الصف الأول الثانوي','الصف الثاني الثانوي'];
const R={
 name:v=>(v.trim().length>=3&&v.trim().length<=80)||'اكتب الاسم بالكامل (3 حروف على الأقل).',
 phone:v=>/^01[0125]\d{8}$/.test(v.trim())||'رقم الموبايل لازم يكون 11 رقم ويبدأ بـ 01.',
 pass:v=>(v.length>=8&&v.length<=72&&/[A-Za-z\u0600-\u06FF]/.test(v)&&/\d/.test(v))||'كلمة المرور 8 حروف على الأقل وفيها حروف وأرقام.',
 req:v=>!!v.trim()||'املأ الحقل ده.'
};
const toEmail=p=>p.trim()+'@'+PHONE_EMAIL_DOMAIN;
const sb=supabase.createClient(SB_URL,SB_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});

// Turnstile (يشتغل بس لما تحط الـ Site Key)
let cfToken=null,cfId=null;
if(TURNSTILE_SITE_KEY){
 const s=document.createElement('script');s.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';s.async=true;
 s.onload=()=>{cfId=turnstile.render('#cf',{sitekey:TURNSTILE_SITE_KEY,language:'ar',callback:t=>cfToken=t,'expired-callback':()=>cfToken=null,'error-callback':()=>cfToken=null})};
 document.head.appendChild(s);
}
const resetCf=()=>{cfToken=null;if(cfId!==null&&window.turnstile)turnstile.reset(cfId)};

// حد محاولات في المتصفح (تحسين تجربة بس — الحماية الحقيقية على السيرفر)
const K='lk_'+location.pathname;
function locked(){try{const u=+localStorage.getItem(K)||0;return u>Date.now()?Math.ceil((u-Date.now())/1000):0}catch(e){return 0}}
function fail(){try{const n=(+sessionStorage.getItem('fc')||0)+1;sessionStorage.setItem('fc',n);if(n>=5){localStorage.setItem(K,Date.now()+60000);sessionStorage.setItem('fc',0)}}catch(e){}}

function msg(err){
 const m=(err&&err.message||'').toLowerCase();
 if(m.includes('invalid login'))return 'رقم الموبايل أو كلمة المرور غلط.';
 if(m.includes('already registered')||m.includes('already been registered'))return 'لو الرقم ده مسجّل قبل كده جرّب تسجّل دخول، أو راجع بياناتك.';
 if(m.includes('captcha'))return 'فشل التحقق الأمني، جرّب تاني.';
 if(m.includes('rate')||err&&err.status===429)return 'محاولات كتير، استنى شوية وجرّب تاني.';
 if(m.includes('password'))return 'كلمة المرور ضعيفة، اختار كلمة أقوى.';
 return 'حصلت مشكلة، جرّب تاني بعد شوية.';
}

window.AUTH=Object.freeze({sb,toEmail,locked,fail,resetCf,msg,getCf:()=>cfToken,needCf:()=>!!TURNSTILE_SITE_KEY});
$('#f').onsubmit=async e=>{
 e.preventDefault();
 const f=e.target,mode=f.dataset.mode,er=$('#er'),btn=f.querySelector('button[type=submit]');
 if(mode==='register'){if(window.REG)window.REG(e);return}
 for(const i of f.querySelectorAll('[data-v]')){i.classList.remove('bad');const r=R[i.dataset.v](i.value);if(r!==true){i.classList.add('bad');er.textContent=r;i.focus();return}}
 const wait=locked();if(wait){er.textContent='استنى '+wait+' ثانية قبل المحاولة الجاية.';return}
 if(TURNSTILE_SITE_KEY&&!cfToken){er.textContent='أكمل التحقق الأمني الأول.';return}
 er.textContent='';btn.disabled=true;
 const g=id=>$('#'+id).value;
 let res;
 try{
  if(mode==='login'){
   res=await sb.auth.signInWithPassword({email:toEmail(g('p')),password:g('w'),options:{captchaToken:cfToken||undefined}});
  }else if(mode==='register'){
   if(!GRADES.includes(g('sg'))){er.textContent='اختار المرحلة الدراسية.';btn.disabled=false;return}
   if(g('p').trim()===g('pp').trim()){er.textContent='رقم ولي الأمر لازم يكون مختلف عن رقمك.';btn.disabled=false;return}
   res=await sb.auth.signUp({email:toEmail(g('p')),password:g('w'),options:{captchaToken:cfToken||undefined,data:{role:'student',full_name:g('n').trim(),phone:g('p').trim(),parent_phone:g('pp').trim(),grade:g('sg')}}});
  }else{
   if(g('p').trim()===g('sp').trim()){er.textContent='رقم ولي الأمر لازم يكون مختلف عن رقم الطالب.';btn.disabled=false;return}
   res=await sb.auth.signUp({email:toEmail(g('p')),password:g('w'),options:{captchaToken:cfToken||undefined,data:{role:'parent',full_name:g('n').trim(),phone:g('p').trim(),student_phone:g('sp').trim()}}});
  }
 }catch(x){res={error:x}}
 btn.disabled=false;
 if(res.error||!res.data||!res.data.session){
  if(res.error){fail();er.textContent=msg(res.error)}
  else er.textContent='التسجيل اتم لكن محتاج تأكيد. كلّم الدعم.';
  resetCf();return;
 }
 try{sessionStorage.setItem('fc',0)}catch(_){}
 $('#fm').style.display='none';$('#ok').style.display='block';
 const p=$('#ok .s');if(p)p.textContent='جاري تحويلك للوحتك...';
 setTimeout(()=>location.href='dashboard.html',1000);
};
})();
