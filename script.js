const menu=document.getElementById('menu');const nav=document.getElementById('nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰'});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));let lang='en';document.getElementById('language').addEventListener('click',()=>{lang=lang==='en'?'bn':'en';document.documentElement.lang=lang;document.body.classList.toggle('bn',lang==='bn');document.querySelectorAll('[data-en][data-bn]').forEach(el=>el.innerHTML=el.dataset[lang]);document.getElementById('language').textContent=lang==='en'?'বাংলা':'English'});document.getElementById('year').textContent=new Date().getFullYear();
/* motion: scroll reveal, card spotlight, progress bar */
(function(){
  const sel='.section-label,.about-grid h2,.about-copy,.interest-grid article,.platform-heading,.chips,.subject-card,.platform-card,.contact-content>*,.road-scene,.yt-wrap,.webdev-info,.review-cta,.review-block h2,.review-lead,.sub-h3,.panel,.check-list li,.tag-cloud,.table-wrap,.review-note,.quote-block';
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

/* review page: table-of-contents scrollspy */
(function(){
  const links=[...document.querySelectorAll('.toc a')];if(!links.length||!('IntersectionObserver' in window))return;
  const map=new Map(links.map(a=>[a.getAttribute('href').slice(1),a]));
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.remove('active'));const a=map.get(e.target.id);if(a){a.classList.add('active');a.scrollIntoView({inline:'center',block:'nearest'})}}}),{rootMargin:'-35% 0px -60% 0px'});
  map.forEach((a,id)=>{const s=document.getElementById(id);if(s)io.observe(s)});
})();

/* v2 motion: stagger indexes, counters, tilt, parallax numerals, back-to-top */
(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.panel-list,.tag-cloud,.review-table tbody').forEach(g=>[...g.children].forEach((c,i)=>c.style.setProperty('--k',i)));
  const counters=[...document.querySelectorAll('[data-count]')];
  const run=el=>{const to=+el.dataset.count;if(reduce){el.textContent=to;return}const t0=performance.now(),d=1500;const f=t=>{const p=Math.min((t-t0)/d,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
  if(counters.length){if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){run(e.target);io.unobserve(e.target)}}),{threshold:.6});counters.forEach(c=>io.observe(c))}else counters.forEach(c=>c.textContent=c.dataset.count)}
  if(matchMedia('(hover:hover)').matches&&!reduce){document.querySelectorAll('.panel').forEach(p=>{p.addEventListener('pointermove',e=>{const r=p.getBoundingClientRect();p.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*5+'deg');p.style.setProperty('--rx',-((e.clientY-r.top)/r.height-.5)*5+'deg')});p.addEventListener('pointerleave',()=>{p.style.setProperty('--rx','0deg');p.style.setProperty('--ry','0deg')})})}
  const blocks=[...document.querySelectorAll('.review-block')];const top=document.getElementById('toTop');let tick=false;
  const upd=()=>{tick=false;const vh=innerHeight;if(!reduce)blocks.forEach(b=>{const r=b.getBoundingClientRect();if(r.bottom>0&&r.top<vh)b.style.setProperty('--py',((r.top-vh/2)*-0.12)+'px')});
    if(top){const h=document.documentElement,m=h.scrollHeight-h.clientHeight;top.style.setProperty('--p',m>0?h.scrollTop/m*100:0);top.classList.toggle('show',h.scrollTop>600)}};
  addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});upd();
  if(top)top.addEventListener('click',()=>scrollTo({top:0,behavior:reduce?'auto':'smooth'}));
})();

/* v3: cursor glow + magnetic buttons */
(function(){
  if(!matchMedia('(hover:hover)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const g=document.createElement('div');g.className='cursor-glow';document.body.appendChild(g);
  let x=innerWidth/2,y=innerHeight/2,cx=x,cy=y;
  addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;g.classList.add('on')},{passive:true});
  document.addEventListener('pointerleave',()=>g.classList.remove('on'));
  (function loop(){cx+=(x-cx)*.12;cy+=(y-cy)*.12;g.style.transform='translate3d('+cx+'px,'+cy+'px,0)';requestAnimationFrame(loop)})();
  document.querySelectorAll('.hero-primary,.header-contact,.language,.to-top').forEach(b=>{
    b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.25)+'px,'+((e.clientY-r.top-r.height/2)*.35)+'px)'});
    b.addEventListener('pointerleave',()=>{b.style.transform=''});
  });
})();

/* cover tilt */
(function(){
  if(!matchMedia('(hover:hover)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const c=document.querySelector('.cover-card');if(!c)return;
  c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*4+'deg');c.style.setProperty('--rx',-((e.clientY-r.top)/r.height-.5)*4+'deg')});
  c.addEventListener('pointerleave',()=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')});
})();

/* web development: scroll-driven car + lite YouTube embed */
(function(){
  const sc=document.querySelector('.road-scene');
  if(sc){
    const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cur=0,tgt=0,run=false;
    const calc=()=>{const r=sc.getBoundingClientRect(),vh=innerHeight;const p=(vh-r.top)/(vh+r.height);tgt=Math.min(1,Math.max(0,(p-.08)/.84))};
    const step=()=>{const d=tgt-cur;if(reduce||Math.abs(d)<.0004){cur=tgt;run=false;sc.classList.remove('moving')}else{cur+=d*.09;sc.classList.toggle('moving',Math.abs(d)>.002)}sc.style.setProperty('--car',cur.toFixed(4));if(run)requestAnimationFrame(step)};
    const kick=()=>{calc();if(!run){run=true;requestAnimationFrame(step)}};
    addEventListener('scroll',kick,{passive:true});addEventListener('resize',kick);kick();
  }
  document.querySelectorAll('.yt-card').forEach(b=>b.addEventListener('click',()=>{
    const f=document.createElement('iframe');f.className='yt-frame';
    f.src='https://www.youtube-nocookie.com/embed/'+b.dataset.yt+'?autoplay=1&rel=0';
    f.title='YouTube video';f.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';f.allowFullscreen=true;
    b.replaceWith(f);
  }));
})();
