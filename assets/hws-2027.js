(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const progress = document.createElement('div');
  progress.className = 'hws27-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.prepend(progress);

  const header = document.querySelector('.site-header');
  const updateScrollUI = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    header?.classList.toggle('hws27-scrolled', y > 18);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? Math.min(100, (y / max) * 100) : 0}%`;
  };
  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });

  const revealTargets = [
    ...document.querySelectorAll('main > section:not(.hero), .section-intro, .welcome-grid, .founder-grid, .featured-grid, .cta-box')
  ];
  revealTargets.forEach(el => el.classList.add('hws27-reveal'));

  const staggerTargets = document.querySelectorAll(
    '.card-grid, .why-grid, .solution-grid, .business-values, .industry-list, .growth-track, .blog-grid, .category-grid, .guide-grid, .services-grid, .process-grid, .contact-grid'
  );
  staggerTargets.forEach(el => el.classList.add('hws27-stagger'));

  const targets = document.querySelectorAll('.hws27-reveal, .hws27-stagger');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('hws27-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('hws27-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(el => observer.observe(el));
  }

  // Preserve keyboard accessibility while giving pointer users a refined tilt.
  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.media-frame, .feature-large, .feature-small').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - .5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - .5) * 2;
        card.style.transform = `perspective(1000px) rotateX(${-y * 1.4}deg) rotateY(${x * 1.7}deg) translateY(-3px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }
})();
