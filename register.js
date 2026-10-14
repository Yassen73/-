(()=>{
'use strict';
const $=s=>document.querySelector(s),T0=Date.now();
const GOV=['القاهرة','الجيزة','الإسكندرية','القليوبية','الشرقية','الدقهلية','البحيرة','المنوفية','الغربية','كفر الشيخ','دمياط','بورسعيد','الإسماعيلية','السويس','شمال سيناء','جنوب سيناء','الفيوم','بني سويف','المنيا','أسيوط','سوهاج','قنا','الأقصر','أسوان','البحر الأحمر','الوادي الجديد','مطروح'];
const ST={primary:['ابتدائي',[['p4','الصف الرابع الابتدائي'],['p5','الصف الخامس الابتدائي'],['p6','الصف السادس الابتدائي']]],
prep:['إعدادي',[['m1','الصف الأول الإعدادي'],['m2','الصف الثاني الإعدادي'],['m3','الصف الثالث الإعدادي']]],
sec:['ثانوي',[['s1b','الأول الثانوي - بكالوريا'],['s2b','الثاني الثانوي - بكالوريا'],['s1a','الأول الثانوي - أزهر'],['s2a','الثاني الثانوي - أزهر'],['s1g','الأول الثانوي - عام'],['s2g','الثاني الثانوي - عام']]]};
const dig=v=>String(v||'').replace(/[\u0660-\u0669]/g,d=>d.charCodeAt(0)-1632).replace(/[\u06F0-\u06F9]/g,d=>d.charCodeAt(0)-1776);
const cl=v=>String(v==null?'':v).normalize('NFC').replace(/[\u0000-\u001f\u007f<>]/g,'').replace(/\s+/g,' ').trim();
const np=v=>dig(cl(v)).replace(/[\s-]/g,'');
const val=id=>{const e=$('#'+id);return e?e.value:''};
const NM=/^[\u0621-\u064A\u0671A-Za-z ]+$/;
const nameV=(a,b)=>v=>{v=cl(v);return(v.length>=a&&v.length<=b&&NM.test(v))||'اكتب الاسم بحروف عربية أو إنجليزية فقط ('+a+' حروف على الأقل).'};
const isPh=v=>/^01[0125]\d{8}$/.test(np(v));
const phV=v=>isPh(v)||'رقم الموبايل لازم يكون 11 رقم ويبدأ بـ 01.';
const COMMON=['12345678','123456789','1234567890','11111111','password','password1','qwerty123','abc12345','00000000','01234567','a1234567','aa123456'];
const waOn=()=>!$('#wc').checked;
const isSec=()=>val('st')==='sec';
const gcode=()=>isSec()?'s'+val('sg')+val('tr'):val('sg');
const V={
 n:nameV(3,60),fn:nameV(2,40),gn:nameV(2,40),
 gv:v=>GOV.includes(v)||'اختار المحافظة.',
 st:v=>!!ST[v]||'اختار المرحلة.',
 sg:v=>{if(isSec())return['1','2'].includes(v)||'اختار الصف.';const s=ST[val('st')];return(!!s&&s[1].some(x=>x[0]===v))||'اختار الصف.'},
 tr:v=>!isSec()||['b','a','g'].includes(v)||'اختار المسار.',
 em:v=>{v=cl(v).toLowerCase();return(v.length<=120&&/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))||'اكتب إيميل صحيح.'},
 p:phV,
 wa:v=>!waOn()||phV(v),
 mp:v=>!cl(v)||phV(v),fp:v=>!cl(v)||phV(v),
 w:v=>{if(v.length<8||v.length>72||!/[A-Za-z\u0600-\u06FF]/.test(v)||!/\d/.test(v))return'كلمة المرور 8 حروف على الأقل وفيها حروف وأرقام.';
  const l=v.toLowerCase();if(COMMON.includes(l))return'كلمة المرور سهلة التخمين، اختار غيرها.';
  for(const k of['p','wa','mp','fp']){const x=np(val(k));if(x&&dig(v).includes(x))return'متحطش رقم موبايل جوه كلمة المرور.'}return true},
 w2:v=>v===val('w')||'كلمتين المرور مش متطابقتين.'
};
const S=[['n','fn','gn','gv'],['st','sg','tr'],['em','p','wa','mp','fp'],['w','w2']];
const parOk=()=>(!!cl(val('mp'))||!!cl(val('fp')))&&V.mp(val('mp'))===true&&V.fp(val('fp'))===true;
function stepErr(i){
 for(const id of S[i]){const r=V[id](val(id));if(r!==true)return[id,r]}
 if(i===2){
  if(!cl(val('mp'))&&!cl(val('fp')))return['mp','اكتب رقم الأم أو الأب على الأقل.'];
  const p=np(val('p'));if(p&&(p===np(val('mp'))||p===np(val('fp'))))return[np(val('mp'))===p?'mp':'fp','رقم ولي الأمر لازم يكون مختلف عن رقم الطالب.']}
 return null}
function pct(){
 const ids=['n','fn','gn','gv','st','sg'].concat(isSec()?['tr']:[],['em','p']).concat(waOn()?['wa']:[],['par','w','w2']);
 const ok=ids.filter(id=>id==='par'?parOk():V[id](val(id))===true).length;
 const t=Math.round(ok/ids.length*100);
 $('#pgf').style.width=t+'%';$('#pgt').textContent=t+'%';$('#pgb').setAttribute('aria-valuenow',t)}
let cur=0,busy=false;
const fs=[...document.querySelectorAll('fieldset[data-s]')],li=[...document.querySelectorAll('#stp li')];
function show(i){cur=i;fs.forEach((f,k)=>f.hidden=k!==i);li.forEach((l,k)=>{l.className=k===i?'on':k<i?'dn':''});
 $('#bk').hidden=i===0;$('#nx').textContent=i===3?'أنشئ حسابك':'التالي';$('#er').textContent='';
 const f=fs[i].querySelector('input,select');if(f&&i>0)f.focus()}
function flag(x){document.querySelectorAll('.bad').forEach(e=>e.classList.remove('bad'));const e=$('#'+x[0]);if(e){e.classList.add('bad');e.focus()}$('#er').textContent=x[1]}
const opt=(s,v,t)=>{const o=document.createElement('option');o.value=v;o.textContent=t;s.appendChild(o)};
opt($('#gv'),'','اختار المحافظة');GOV.forEach(g=>opt($('#gv'),g,g));
opt($('#st'),'','اختار المرحلة');Object.keys(ST).forEach(k=>opt($('#st'),k,ST[k][0]));
$('#st').onchange=()=>{const s=ST[val('st')],g=$('#sg'),t=$('#tr');g.textContent='';t.textContent='';$('#trw').hidden=true;
 if(!s){$('#sgw').hidden=true;return}
 opt(g,'','اختار الصف');
 if(isSec()){opt(g,'1','الأول الثانوي');opt(g,'2','الثاني الثانوي');opt(t,'','اختار المسار');opt(t,'b','بكالوريا');opt(t,'a','أزهر');opt(t,'g','عام')}
 else s[1].forEach(x=>opt(g,x[0],x[1]));
 $('#sgw').hidden=false};
$('#sg').onchange=()=>{$('#trw').hidden=!(isSec()&&!!val('sg'));if($('#trw').hidden)$('#tr').value=''};
$('#wc').onchange=()=>{$('#waw').hidden=!waOn();pct()};
$('#bk').onclick=()=>show(cur-1);
$('#f').addEventListener('input',pct);$('#f').addEventListener('change',pct);
async function submit(){
 const er=$('#er'),A=window.AUTH;if(busy||!A)return;
 for(let i=0;i<4;i++){const x=stepErr(i);if(x){show(i);flag(x);return}}
 if($('#hp').value)return;
 if(Date.now()-T0<8000){er.textContent='استنى ثواني وراجع بياناتك قبل الإرسال.';return}
 const w=A.locked();if(w){er.textContent='استنى '+w+' ثانية قبل المحاولة الجاية.';return}
 if(A.needCf()&&!A.getCf()){er.textContent='أكمل التحقق الأمني الأول.';return}
 busy=true;$('#nx').disabled=true;er.textContent='';
 const stg=val('st'),gc=gcode(),p=np(val('p')),mp=np(val('mp')),fp=np(val('fp'));
 const data={role:'student',full_name:cl(val('n')),father_name:cl(val('fn')),grandfather_name:cl(val('gn')),governorate:val('gv'),
  contact_email:cl(val('em')).toLowerCase(),phone:p,whatsapp:waOn()?np(val('wa')):p,mother_phone:mp,father_phone:fp,parent_phone:fp||mp,
  stage:stg,grade_code:gc,grade:stg==='sec'?'الصف '+(gc[1]==='1'?'الأول':'الثاني')+' الثانوي':ST[stg][1].find(x=>x[0]===gc)[1]};
 if(stg==='sec')data.track={b:'بكالوريا',a:'أزهر',g:'عام'}[gc[2]];
 let res;
 try{res=await A.sb.auth.signUp({email:A.toEmail(p),password:val('w'),options:{captchaToken:A.getCf()||undefined,data}})}catch(x){res={error:x}}
 busy=false;$('#nx').disabled=false;
 if(res.error||!res.data||!res.data.session){
  if(res.error){A.fail();er.textContent=A.msg(res.error)}else er.textContent='التسجيل اتم لكن محتاج تأكيد. كلّم الدعم.';
  A.resetCf();return}
 $('#w').value='';$('#w2').value='';
 try{sessionStorage.setItem('fc',0)}catch(_){}
 $('#fm').style.display='none';$('#ok').style.display='block';
 setTimeout(()=>location.href='dashboard.html',1000)}
window.REG=e=>{
 if(cur<3){const x=stepErr(cur);if(x){flag(x);return}show(cur+1);return}
 submit()};
show(0);pct();
})();
