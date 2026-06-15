(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initReveal() {
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    if (prefersReducedMotion) {
      items.forEach((el) => el.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((el) => observer.observe(el));
  }

  function initCountUp() {
    const strip = document.querySelector('[data-proof-strip]');
    if (!strip) return;

    const counters = strip.querySelectorAll('[data-countup]');
    if (!counters.length) return;

    const format = (el, value) => {
      const suffix = el.getAttribute('data-countup-suffix') || '';
      const prefix = el.getAttribute('data-countup-prefix') || '';
      el.textContent = `${prefix}${Math.round(value)}${suffix}`;
    };

    const run = (el) => {
      const target = Number(el.getAttribute('data-countup-to') || '0');
      if (prefersReducedMotion) {
        format(el, target);
        return;
      }

      const duration = 1200;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        format(el, target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    if (prefersReducedMotion) {
      counters.forEach((el) => run(el));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    let ticking = false;

    const update = () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initReveal();
      initCountUp();
      initHeaderScroll();
    });
  } else {
    initReveal();
    initCountUp();
    initHeaderScroll();
  }
})();
