const menu=document.getElementById('menu');const nav=document.getElementById('nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰'});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));let lang='en';document.getElementById('language').addEventListener('click',()=>{lang=lang==='en'?'bn':'en';document.documentElement.lang=lang;document.body.classList.toggle('bn',lang==='bn');document.querySelectorAll('[data-en][data-bn]').forEach(el=>el.innerHTML=el.dataset[lang]);document.getElementById('language').textContent=lang==='en'?'বাংলা':'English'});document.getElementById('year').textContent=new Date().getFullYear();
/* motion: scroll reveal, card spotlight, progress bar */
(function(){
  const sel='.section-label,.about-grid h2,.about-copy,.interest-grid article,.platform-heading,.chips,.subject-card,.platform-card,.contact-content>*';
  const els=[...document.querySelectorAll(sel)];
  els.forEach(el=>{el.classList.add('reveal');const sib=[...el.parentElement.children].filter(c=>c.matches(sel));el.style.setProperty('--d',(Math.max(sib.indexOf(el),0)%3*0.12)+'s')});
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(el=>io.observe(el));
  }else{els.forEach(el=>el.classList.add('in'))}
  document.querySelectorAll('.subject-card').forEach(card=>card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',(e.clientX-r.left)+'px');card.style.setProperty('--my',(e.clientY-r.top)+'px')}));
  const bar=document.getElementById('progress');
  const upd=()=>{const h=document.documentElement;const m=h.scrollHeight-h.clientHeight;bar.style.transform='scaleX('+(m>0?h.scrollTop/m:0)+')'};
  addEventListener('scroll',upd,{passive:true});upd();
})();
