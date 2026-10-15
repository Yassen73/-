(()=>{
const $=s=>document.querySelector(s);
try{const t=localStorage.getItem('th');if(t)document.documentElement.dataset.theme=t}catch(e){}
const dig=v=>String(v||'').replace(/[\u0660-\u0669]/g,d=>d.charCodeAt(0)-1632).replace(/[\u06F0-\u06F9]/g,d=>d.charCodeAt(0)-1776).replace(/[\s-]/g,'').replace(/^(?:\+|00)?20(?=1\d{9}$)/,'0');
let kind='student',cfToken=null,cfId=null,busy=false;
document.querySelectorAll('.tabs a').forEach(a=>a.onclick=e=>{e.preventDefault();kind=a.dataset.k;
 document.querySelectorAll('.tabs a').forEach(x=>x.classList.toggle('on',x===a));
 $('#lb').textContent=kind==='parent'?'رقم موبايل ولي الأمر':'رقم موبايل الطالب';
 $('#hn').textContent=kind==='parent'?'هيتبعت اللينك على إيميل الطالب المربوط بحسابك.':'هيوصلك اللينك على الإيميل اللي سجلت بيه.';
 $('#er').textContent=''});
if(TURNSTILE_SITE_KEY){const s=document.createElement('script');s.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';s.async=true;
 s.onload=()=>{cfId=turnstile.render('#cf',{sitekey:TURNSTILE_SITE_KEY,language:'ar',callback:t=>cfToken=t,'expired-callback':()=>cfToken=null,'error-callback':()=>cfToken=null})};document.head.appendChild(s)}
const resetCf=()=>{cfToken=null;if(cfId!==null&&window.turnstile)turnstile.reset(cfId)};
let rt=null,rti=null;
const cool=()=>{const box=$('#ok');
 if(!rt){rt=document.createElement('button');rt.type='button';rt.style.cssText='display:block;margin:14px auto 0;background:none;border:0;color:var(--mut);font:inherit;font-weight:600;text-decoration:underline;cursor:pointer';
  rt.onclick=()=>{$('#ok').style.display='none';$('#fm').style.display='';$('#er').textContent=''};
  const ft=box.querySelector('.ft');box.insertBefore(rt,ft)}
 let n=60;clearInterval(rti);rt.disabled=true;rt.textContent='ما وصلكش؟ تقدر تبعت تاني بعد 60 ثانية';
 rti=setInterval(()=>{n--;if(n<=0){clearInterval(rti);rt.disabled=false;rt.textContent='ما وصلكش؟ ابعت تاني'}else rt.textContent='ما وصلكش؟ تقدر تبعت تاني بعد '+n+' ثانية'},1000)};
$('#f').onsubmit=async e=>{
 e.preventDefault();if(busy)return;
 const er=$('#er'),btn=$('#btn'),p=dig($('#p').value);
 if(!/^01[0125]\d{8}$/.test(p)){er.textContent='رقم الموبايل لازم يكون 11 رقم ويبدأ بـ 01.';return}
 if(TURNSTILE_SITE_KEY&&!cfToken){er.textContent='أكمل التحقق الأمني الأول.';return}
 busy=true;btn.disabled=true;er.textContent='';
 try{
  const r=await fetch(SB_URL+'/functions/v1/request-reset-gmail',{method:'POST',headers:{'Content-Type':'application/json',apikey:SB_KEY},body:JSON.stringify({phone:p,cf:cfToken||undefined})});
  if(r.ok){
   $('#fm').style.display='none';$('#ok').style.display='block';cool();
   if(kind==='parent'){$('#okt').textContent='تم الإرسال إلى إيميل الطالب';$('#oks').textContent='اطلب من الطالب يفتح الإيميل (ويراجع الـ Spam) ويديك اللينك. اللينك صالح لمدة ساعة.'}
   else{$('#okt').textContent='تم الإرسال إلى إيميلك';$('#oks').textContent='افتح الإيميل (وراجع الـ Spam) واتبع اللينك. اللينك صالح لمدة ساعة.'}
  }else{
   let j={};try{j=await r.json()}catch(_){}
   er.textContent=j.error==='captcha'?'فشل التحقق الأمني، جرّب تاني.':r.status===429?'محاولات كتير، استنى شوية وجرّب تاني.':'حصلت مشكلة، جرّب تاني بعد شوية.';
  }
 }catch(x){er.textContent='مفيش اتصال، جرّب تاني.'}
 busy=false;btn.disabled=false;resetCf();
};
})();
