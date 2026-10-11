/* legal.js - تبويبات الخصوصية والشروط، الوضع الليلي، الفهرس، زر الصعود */
try{document.documentElement.className+=' js'}catch(e){}
(function(){
var d=document,root=d.documentElement;
function $(i){return d.getElementById(i)}
/* الوضع الليلي: نفس المفتاح المستخدم في باقي الموقع */
var th=$('th');
try{var t=localStorage.getItem('th');if(t)root.setAttribute('data-theme',t)}catch(e){}
function sync(){th.innerHTML=root.getAttribute('data-theme')=='dark'?'&#9790;':'&#9728;'}
sync();
th.onclick=function(){var n=root.getAttribute('data-theme')=='dark'?'light':'dark';root.setAttribute('data-theme',n);sync();try{localStorage.setItem('th',n)}catch(e){}};
/* التبويبات */
var names=['privacy','terms'];
function show(n){
  for(var i=0;i<names.length;i++){
    var on=names[i]==n,p=$(names[i]),b=$('tb-'+names[i]);
    p.className='panel'+(on?' on':'');
    b.className=on?'on':'';
    b.setAttribute('aria-selected',on?'true':'false');
  }
  setTimeout(function(){if(window.spy)window.spy()},60);
  d.title=(n=='terms'?'شروط الاستخدام':'سياسة الخصوصية')+' | منصة ابن رشدي';
}
function route(scroll){
  var h=(location.hash||'').replace('#',''),n='privacy';
  if(h=='terms'||h.indexOf('tm-')===0)n='terms';
  show(n);
  if(scroll){
    var el=(h&&h!=n)?$(h):null;
    setTimeout(function(){
      if(el){el.scrollIntoView()}
      else{window.scrollTo(0,$('top').offsetHeight>0&&h==n?document.querySelector('main').offsetTop-90:0)}
    },30);
  }
}
window.onhashchange=function(){route(true)};
route(location.hash&&location.hash!=='#privacy'&&location.hash!=='#terms');
/* شريط التقدم وزر الأعلى */
var bar=$('bar'),up=$('up'),rg=$('rg'),tick=false;
function upd(){
  tick=false;
  var s=window.pageYOffset||root.scrollTop,h=root.scrollHeight-window.innerHeight;
  bar.style.width=(h>0?Math.min(100,s/h*100):0)+'%';
  var pg=h>0?Math.min(s/h,1):0;if(rg)rg.style.strokeDashoffset=157.1*(1-pg);
  up.className=s>300?'on':'';
  spy();
}
window.spy=function(){spy()};
var links=null,secs=null;
function spy(){
  var pn=d.querySelector('.panel.on');if(!pn)return;
  var ls=pn.querySelectorAll('.toc a'),ss=pn.querySelectorAll('.sec'),cur=-1,y=(window.pageYOffset||root.scrollTop)+150;
  for(var i=0;i<ss.length;i++){if(getTop(ss[i])<=y)cur=i}
  for(var j=0;j<ls.length;j++){ls[j].className=(j==cur)?'act':''}
}
function getTop(el){var t=0;while(el){t+=el.offsetTop;el=el.offsetParent}return t}
var pr=$('pr');if(pr)pr.onclick=function(){window.print()};
/* حالة الدخول: نفس اللي بيحصل في الصفحة الرئيسية */
(function(){var on=false;try{var tk=JSON.parse(localStorage.getItem('sb-btviglpxeukwypkantqi-auth-token')||'null');on=!!(tk&&(tk.access_token||tk.currentSession)&&(!tk.expires_at||tk.expires_at*1000>Date.now()||tk.refresh_token))}catch(e){}
if(!on)return;var a=$('cta-a'),f=$('ft-reg');if(a){a.href='dashboard.html';a.innerHTML='لوحتي &larr;'}if(f){f.href='dashboard.html';f.innerHTML='لوحتي'}
var h=d.querySelector('.cta h3'),pp=d.querySelector('.cta p');if(h)h.innerHTML='أهلاً بيك تاني';if(pp)pp.innerHTML='كمّل مذاكرتك من نفس النقطة اللي وقفت عندها.'})();
window.onscroll=function(){if(!tick){tick=true;(window.requestAnimationFrame||function(f){setTimeout(f,16)})(upd)}};
up.onclick=function(){try{window.scrollTo({top:0,behavior:'smooth'})}catch(e){window.scrollTo(0,0)}};
upd();
})();
