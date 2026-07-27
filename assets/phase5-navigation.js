(() => {
  'use strict';
  const d=document; const header=d.getElementById('hwsHeader'); const nav=d.getElementById('hwsPrimaryNav'); const openBtn=d.querySelector('.hws-nav-toggle'); const closeBtn=d.querySelector('.hws-nav-close'); const backdrop=d.querySelector('.hws-nav-backdrop');
  if(!header||!nav||!openBtn) return;
  const groups=[...nav.querySelectorAll('.hws-nav-group')]; let lastFocus=null;
  const closeGroups=(except=null)=>groups.forEach(g=>{if(g!==except){g.classList.remove('is-open');g.querySelector('.hws-nav-group-toggle')?.setAttribute('aria-expanded','false')}});
  const setMenu=(open)=>{openBtn.setAttribute('aria-expanded',String(open));openBtn.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');nav.classList.toggle('is-open',open);d.body.classList.toggle('hws-nav-locked',open);if(backdrop){backdrop.hidden=!open;requestAnimationFrame(()=>backdrop.classList.toggle('is-visible',open));}if(open){lastFocus=d.activeElement;setTimeout(()=>closeBtn?.focus(),60)}else{closeGroups();lastFocus?.focus?.();}};
  openBtn.addEventListener('click',()=>setMenu(openBtn.getAttribute('aria-expanded')!=='true')); closeBtn?.addEventListener('click',()=>setMenu(false)); backdrop?.addEventListener('click',()=>setMenu(false));
  groups.forEach(group=>{const btn=group.querySelector('.hws-nav-group-toggle'); if(!btn)return; btn.addEventListener('click',e=>{e.stopPropagation();const willOpen=!group.classList.contains('is-open');closeGroups(group);group.classList.toggle('is-open',willOpen);btn.setAttribute('aria-expanded',String(willOpen));});});
  d.addEventListener('click',e=>{if(!nav.contains(e.target)) closeGroups();});
  d.addEventListener('keydown',e=>{if(e.key==='Escape'){if(nav.classList.contains('is-open'))setMenu(false);else closeGroups();}if(e.key==='Tab'&&nav.classList.contains('is-open')){const f=[...nav.querySelectorAll('a,button')].filter(x=>!x.disabled&&x.offsetParent!==null);if(!f.length)return;const first=f[0],last=f[f.length-1];if(e.shiftKey&&d.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&d.activeElement===last){e.preventDefault();first.focus()}}});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  const current=(location.pathname.split('/').pop()||'index.html').split('?')[0]; nav.querySelectorAll('a[href]').forEach(a=>{const href=(a.getAttribute('href')||'').split('#')[0];if(href===current)a.setAttribute('aria-current','page')});
  const onScroll=()=>header.classList.toggle('scrolled',scrollY>18);onScroll();addEventListener('scroll',onScroll,{passive:true});
  addEventListener('resize',()=>{if(innerWidth>920&&nav.classList.contains('is-open'))setMenu(false)},{passive:true});
})();
