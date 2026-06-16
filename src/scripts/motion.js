import { inView } from 'motion';
import { animate } from 'motion/mini';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealEase = [0.17, 0.55, 0.55, 1];

function getDelay(el, index) {
  const inlineDelay = el.style.getPropertyValue('--reveal-delay').trim();
  if (inlineDelay.endsWith('ms')) {
    return parseFloat(inlineDelay) / 1000;
  }

  const attrDelay = el.getAttribute('data-reveal-index');
  if (attrDelay !== null) {
    return Number(attrDelay) * 0.06;
  }

  return index * 0.06;
}

function setFinalState(el) {
  el.style.opacity = '1';
  el.style.transform = 'translateY(0)';
}

function prepareHidden(el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
}

function animateReveal(el, delay = 0) {
  return animate(
    el,
    { opacity: [0, 1], y: [24, 0] },
    {
      duration: 0.7,
      delay,
      easing: revealEase,
    }
  );
}

function initScrollReveals() {
  const items = document.querySelectorAll('[data-animate-child], [data-reveal]');
  if (!items.length) return;

  items.forEach((el, index) => {
    if (prefersReducedMotion) {
      setFinalState(el);
      return;
    }

    prepareHidden(el);

    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    const delay = getDelay(el, index);

    // Elements already visible at load should animate immediately.
    if (inViewport) {
      animateReveal(el, delay);
      return;
    }

    inView(
      el,
      () => {
        animateReveal(el, delay);
      },
      { amount: 0.2 }
    );

    // Safety net: if intersection never triggers, don't leave content invisible.
    window.setTimeout(() => {
      if (el.style.opacity === '0') {
        setFinalState(el);
      }
    }, 1400);
  });
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

  inView(
    strip,
    () => {
      counters.forEach((el) => run(el));
    },
    { amount: 0.3 }
  );
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

function init() {
  document.documentElement.classList.add('motion-ready');
  initScrollReveals();
  initCountUp();
  initHeaderScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
