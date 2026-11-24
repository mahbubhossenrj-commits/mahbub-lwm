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

/* v4: typed roles, hero particles, hero parallax, cursor ring, click burst */
(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* typed roles */
  const el=document.getElementById('typed');
  if(el){
    const R={en:['Botany Student','Web Developer','Content Creator','Lifelong Learner'],bn:['উদ্ভিদবিজ্ঞানের শিক্ষার্থী','ওয়েব ডেভেলপার','কনটেন্ট ক্রিয়েটর','আজীবন শিক্ষার্থী']};
    const seg=s=>typeof Intl!=='undefined'&&Intl.Segmenter?[...new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(s)].map(x=>x.segment):[...s];
    let i=0,n=0,del=false;
    const tick=()=>{const l=document.body.classList.contains('bn')?'bn':'en';const g=seg(R[l][i%R[l].length]);
      if(reduce){el.textContent=g.join('');return}
      n+=del?-1:1;el.textContent=g.slice(0,n).join('');let d=del?40:85;
      if(!del&&n>=g.length){del=true;d=1500}else if(del&&n<=0){del=false;i++;d=350}
      setTimeout(tick,d)};
    tick();
  }
  /* hero particles + parallax */
  const hero=document.getElementById('home'),hc=document.querySelector('.hero-center');
  if(hero&&!reduce){
    const cv=document.createElement('canvas');cv.className='fx-canvas';hero.insertBefore(cv,hero.firstChild);
    const ctx=cv.getContext('2d');let W=0,H=0,dpr=Math.min(devicePixelRatio||1,2),P=[],m={x:-999,y:-999},vis=true;
    const cols=['#6485bd','#1f8a70','#d9a441'];
    const size=()=>{const r=hero.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
      const n=Math.min(70,Math.round(W/22));P=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:1.2+Math.random()*2.2,c:cols[Math.floor(Math.random()*3)]}))};
    size();addEventListener('resize',size);
    hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();m.x=e.clientX-r.left;m.y=e.clientY-r.top});
    hero.addEventListener('pointerleave',()=>{m.x=-999;m.y=-999});
    if('IntersectionObserver' in window)new IntersectionObserver(es=>{vis=es[0].isIntersecting}).observe(hero);
    const draw=()=>{requestAnimationFrame(draw);if(!vis||document.hidden)return;ctx.clearRect(0,0,W,H);
      for(let i=0;i<P.length;i++){const p=P[i];
        const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy);if(d<120&&d>0){p.x+=dx/d*1.6;p.y+=dy/d*1.6}
        p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);ctx.fillStyle=p.c;ctx.globalAlpha=.55;ctx.fill();
        for(let k=i+1;k<P.length;k++){const q=P[k],l=Math.hypot(p.x-q.x,p.y-q.y);if(l<110){ctx.globalAlpha=(1-l/110)*.22;ctx.strokeStyle='#6485bd';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}}
      ctx.globalAlpha=1};
    draw();
    let tk=false;addEventListener('scroll',()=>{if(tk||!hc)return;tk=true;requestAnimationFrame(()=>{tk=false;const r=hero.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const p=Math.min(1,Math.max(0,-r.top/r.height));hc.style.setProperty('--hs',(p*70)+'px');hc.style.setProperty('--hf',(1-p*.85).toFixed(3))})},{passive:true});
  }
  /* cursor ring + click burst */
  if(matchMedia('(hover:hover)').matches&&!reduce){
    const ring=document.createElement('div');ring.className='cursor-ring';document.body.appendChild(ring);
    let x=-100,y=-100,rx=-100,ry=-100;
    addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;ring.classList.add('on');ring.classList.toggle('big',!!e.target.closest&&!!e.target.closest('a,button,.tag,.subject-card,.platform-card,.yt-card,.cover-card,.stat,.panel'))},{passive:true});
    document.addEventListener('pointerleave',()=>ring.classList.remove('on'));
    (function l(){rx+=(x-rx)*.18;ry+=(y-ry)*.18;ring.style.transform='translate3d('+rx+'px,'+ry+'px,0)';requestAnimationFrame(l)})();
    const pal=['#6485bd','#1f8a70','#d9a441','#c8553d','#7a5bc0'];
    addEventListener('pointerdown',e=>{if(e.button!==0)return;for(let k=0;k<10;k++){const b=document.createElement('i');b.className='burst';const a=Math.PI*2*k/10+Math.random()*.5,d=36+Math.random()*44;
      b.style.left=e.clientX+'px';b.style.top=e.clientY+'px';b.style.background=pal[k%5];b.style.setProperty('--dx',Math.cos(a)*d+'px');b.style.setProperty('--dy',Math.sin(a)*d+'px');
      b.addEventListener('animationend',()=>b.remove());document.body.appendChild(b)}});
  }
})();
