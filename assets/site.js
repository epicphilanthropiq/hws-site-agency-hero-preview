(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.getElementById('siteHeader');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primaryNav');

  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 24), {passive:true});
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open');
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:.12});
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  const portal = document.getElementById('portalShell');
  if (portal && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    portal.addEventListener('pointermove', e => {
      const r = portal.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      portal.style.setProperty('--ry', `${x * 5}deg`);
      portal.style.setProperty('--rx', `${-y * 4}deg`);
    });
    portal.addEventListener('pointerleave', () => {
      portal.style.setProperty('--ry', '0deg');
      portal.style.setProperty('--rx', '0deg');
    });
  }

  const journey = document.querySelector('.journey');
  const progress = document.getElementById('journeyProgress');
  if (journey && progress && !reduceMotion) {
    const updateJourney = () => {
      const r = journey.getBoundingClientRect();
      const distance = window.innerHeight - r.top;
      const total = window.innerHeight + r.height;
      const pct = Math.max(0, Math.min(1, distance / total));
      progress.style.width = `${pct * 100}%`;
    };
    updateJourney();
    window.addEventListener('scroll', updateJourney, {passive:true});
  }

  const canvas = document.getElementById('particleCanvas');
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width = 0, height = 0, raf = 0;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    ctx.setTransform(ratio,0,0,ratio,0,0);
    const count = Math.min(48, Math.max(24, Math.round(width / 28)));
    particles = Array.from({length:count}, () => ({
      x:Math.random()*width,y:Math.random()*height,
      vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,
      r:Math.random()*1.5+.5
    }));
  }
  function draw() {
    ctx.clearRect(0,0,width,height);
    particles.forEach((p,i) => {
      p.x += p.vx; p.y += p.vy;
      if(p.x<0)p.x=width;if(p.x>width)p.x=0;if(p.y<0)p.y=height;if(p.y>height)p.y=0;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba(145,220,255,.45)';ctx.fill();
      for(let j=i+1;j<particles.length;j++){
        const q=particles[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.hypot(dx,dy);
        if(d<105){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
          ctx.strokeStyle=`rgba(138,92,255,${.08*(1-d/105)})`;ctx.stroke();}
      }
    });
    raf=requestAnimationFrame(draw);
  }
  resize();draw();
  window.addEventListener('resize', () => {cancelAnimationFrame(raf);resize();draw();}, {passive:true});
})();

document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.querySelector('.nav-dropdown');
  const toggle = document.querySelector('.nav-dropdown-toggle');

  if (dropdown && toggle) {
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = dropdown.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        dropdown.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('primaryNav');
  const menu = document.querySelector('.menu-toggle');
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  }));
});
