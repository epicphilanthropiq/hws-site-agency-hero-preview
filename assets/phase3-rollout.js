(() => {
  'use strict';
  const body = document.body;
  body.classList.add('phase3-page');
  const file = (location.pathname.split('/').pop() || 'index.html').replace('.html','');
  body.classList.add(`page-${file}`);

  const progress = document.createElement('div');
  progress.className = 'phase3-progress'; progress.setAttribute('aria-hidden','true');
  body.appendChild(progress);
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener('scroll', updateProgress, {passive:true}); updateProgress();

  if (matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const glow = document.createElement('div'); glow.className='phase3-cursor-glow'; glow.setAttribute('aria-hidden','true'); body.prepend(glow);
    addEventListener('pointermove', e => { glow.style.left=`${e.clientX}px`; glow.style.top=`${e.clientY}px`; }, {passive:true});
  }

  document.querySelectorAll('main > section').forEach((section, i) => {
    section.dataset.p3Reveal = '';
    if (i > 0 && !section.classList.contains('reveal')) section.classList.add('reveal');
  });

  const filterConfig = {
    portfolio: {container:'.portfolio-gallery-section .shell', items:'.portfolio-tile', labels:['All','Brand','Digital','Campaigns']},
    blog: {container:'.latest-insights .shell', items:'.insight-card', labels:['All','AI','Business','Publishing','Creative']},
    marketplace: {container:'.market-products .shell', items:'.flagship-card', labels:['All','Build','Create','Grow']}
  }[file];
  if (filterConfig) {
    const host = document.querySelector(filterConfig.container);
    const items = [...document.querySelectorAll(filterConfig.items)];
    if (host && items.length > 2) {
      const bar = document.createElement('div'); bar.className='phase3-toolbar'; bar.setAttribute('aria-label','Filter content');
      filterConfig.labels.forEach((label, idx) => {
        const b=document.createElement('button'); b.className='phase3-filter'; b.type='button'; b.textContent=label; b.setAttribute('aria-pressed',idx===0?'true':'false');
        b.addEventListener('click',()=>{
          bar.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed','false')); b.setAttribute('aria-pressed','true');
          items.forEach((item,i)=>{ const show=idx===0 || i% (filterConfig.labels.length-1) === idx-1; item.classList.toggle('phase3-hidden',!show); });
        }); bar.appendChild(b);
      });
      const heading = host.querySelector('.section-heading,.section-intro');
      heading ? heading.insertAdjacentElement('afterend',bar) : host.prepend(bar);
    }
  }

  // Add meaningful hover labels to image-led cards without altering source content.
  document.querySelectorAll('.portfolio-tile,.featured-book,.featured-music,.platform-card').forEach(card => card.setAttribute('data-premium-interaction','true'));
})();
