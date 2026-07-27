(() => {
  'use strict';
  const d = document;
  const body = d.body;
  body.classList.add('phase4-page-ready');

  const main = d.querySelector('main');
  if (main) {
    if (!main.id) main.id = 'main-content';
    if (!d.querySelector('.skip-link')) {
      const skip = d.createElement('a');
      skip.className = 'skip-link';
      skip.href = `#${main.id}`;
      skip.textContent = 'Skip to main content';
      body.prepend(skip);
    }
  }

  const current = (location.pathname.split('/').pop() || 'index.html').replace(/\?.*$/, '');
  d.querySelectorAll('.site-nav a[href]').forEach(link => {
    const href = link.getAttribute('href').split('#')[0];
    if (href === current || (current === '' && href === 'index.html')) link.setAttribute('aria-current', 'page');
  });

  d.querySelectorAll('a[target="_blank"]').forEach(link => {
    const rel = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
    rel.add('noopener'); rel.add('noreferrer');
    link.setAttribute('rel', [...rel].join(' '));
  });

  d.querySelectorAll('img').forEach((img, index) => {
    if (!img.hasAttribute('decoding')) img.decoding = 'async';
    if (!img.hasAttribute('loading') && index > 1) img.loading = 'lazy';
  });

  const top = d.createElement('button');
  top.type = 'button';
  top.className = 'phase4-back-to-top';
  top.setAttribute('aria-label', 'Back to top');
  top.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6.5 10.5 12 5l5.5 5.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  body.appendChild(top);
  const syncTop = () => top.classList.toggle('is-visible', scrollY > 700);
  addEventListener('scroll', syncTop, { passive: true });
  syncTop();
  top.addEventListener('click', () => scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));

  const announcer = d.createElement('div');
  announcer.className = 'phase4-announcer';
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  body.appendChild(announcer);

  d.querySelectorAll('form').forEach(form => {
    form.addEventListener('invalid', event => {
      const field = event.target;
      const label = field.labels?.[0]?.textContent?.trim() || field.name || 'This field';
      announcer.textContent = `${label} needs attention.`;
    }, true);
  });
})();
