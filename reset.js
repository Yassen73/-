(()=>{
const $=s=>document.querySelector(s);
try{const t=localStorage.getItem('th');if(t)document.documentElement.dataset.theme=t}catch(e){}
const th=new URLSearchParams(location.search).get('th');
try{history.replaceState(null,'',location.pathname)}catch(e){}
const sb=supabase.createClient(SB_URL,SB_KEY,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
const COMMON=['12345678','123456789','1234567890','11111111','password','password1','qwerty123','abc12345','00000000','01234567','a1234567','aa123456'];
const er=$('#er'),btn=$('#btn');let busy=false;
if(!th){er.textContent='اللينك مش صالح. اطلب لينك جديد.';btn.disabled=true}
$('#f').onsubmit=async e=>{
 e.preventDefault();if(busy||!th)return;
 const w=$('#w').value,w2=$('#w2').value;
 if(w.length<8||w.length>72||!/[A-Za-z\u0600-\u06FF]/.test(w)||!/\d/.test(w)){er.textContent='كلمة المرور 8 حروف على الأقل وفيها حروف وأرقام.';return}
 if(COMMON.includes(w.toLowerCase())){er.textContent='كلمة المرور سهلة التخمين، اختار غيرها.';return}
 if(w!==w2){er.textContent='كلمتين المرور مش متطابقتين.';return}
 busy=true;btn.disabled=true;er.textContent='';
 try{
  const v=await sb.auth.verifyOtp({token_hash:th,type:'recovery'});
  if(v.error||!v.data||!v.data.session){er.textContent='اللينك منتهي أو اتستخدم قبل كده. اطلب لينك جديد.';busy=false;btn.disabled=false;return}
  const u=await sb.auth.updateUser({password:w});
  if(u.error){const m=(u.error.message||'').toLowerCase();er.textContent=m.includes('same')?'اختار كلمة مرور مختلفة عن القديمة.':m.includes('password')?'كلمة المرور ضعيفة، اختار كلمة أقوى.':'حصلت مشكلة، جرّب تاني بعد شوية.';busy=false;btn.disabled=false;return}
  try{await sb.auth.signOut()}catch(_){}
  $('#fm').style.display='none';$('#ok').style.display='block';
  setTimeout(()=>location.replace('login.html'),1800);
 }catch(x){er.textContent='مفيش اتصال، جرّب تاني.';busy=false;btn.disabled=false}
};
})();
