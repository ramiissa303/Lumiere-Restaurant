/* ================================================================
   LUMIÈRE — core.js
   Shared behaviour for every page.
   Modules are self-contained IIFEs; each no-ops if its DOM is absent.
   ================================================================ */
'use strict';

const Lumiere = (() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const qs  = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));
  return { prefersReduced, isTouch, qs, qsa };
})();

/* ----------------------------------------------------------------
   THEME  (early flash-guard lives inline in each page <head>)
   ---------------------------------------------------------------- */
(function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  // Mark ready for transitions after first paint
  requestAnimationFrame(() => root.classList.add('theme-ready'));

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('lumiere-theme', theme); } catch (e) {}
    if (toggle) toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }
})();

/* ----------------------------------------------------------------
   PAGE LOADER
   ---------------------------------------------------------------- */
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  const hide = () => {
    loader.classList.add('hidden');
    document.body.classList.add('page-enter');
    setTimeout(() => { loader.style.display = 'none'; }, 900);
  };
  window.addEventListener('load', () => setTimeout(hide, Lumiere.prefersReduced ? 0 : 650));
  // Safety fallback
  setTimeout(hide, 3500);
})();

/* ----------------------------------------------------------------
   CUSTOM CURSOR
   ---------------------------------------------------------------- */
(function initCursor() {
  if (Lumiere.isTouch) return;
  const dot = Lumiere.qs('.cursor-dot');
  const ring = Lumiere.qs('.cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    dot.style.opacity = ring.style.opacity = '1';
  });
  (function loop() {
    rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();

  const hoverSel = 'a, button, .menu-item, .dish, .card, input, select, textarea, .chip, .area-card, .table-seat, .masonry-item, .cal-day, .time-slot';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverSel)) ring.classList.add('hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverSel)) ring.classList.remove('hover');
  });
  document.addEventListener('mouseleave', () => { dot.style.opacity = ring.style.opacity = '0'; });
})();

/* ----------------------------------------------------------------
   AMBIENT GLOW
   ---------------------------------------------------------------- */
(function initGlow() {
  if (Lumiere.isTouch) return;
  const orb = Lumiere.qs('.ambient-glow-orb');
  if (!orb) return;
  document.addEventListener('mousemove', e => {
    orb.style.left = e.clientX + 'px';
    orb.style.top = e.clientY + 'px';
  });
})();

/* ----------------------------------------------------------------
   NAVIGATION — scrolled state + hide on scroll down
   ---------------------------------------------------------------- */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    if (y > 400 && y > lastY) nav.classList.add('hidden-up');
    else nav.classList.remove('hidden-up');
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ----------------------------------------------------------------
   MEGA MENU
   ---------------------------------------------------------------- */
(function initMega() {
  const items = Lumiere.qsa('.nav-item.has-mega');
  if (!items.length) return;
  let closeTimer;
  items.forEach(item => {
    const trigger = Lumiere.qs('.nav-link', item);
    const open = () => { clearTimeout(closeTimer); items.forEach(i => i !== item && i.classList.remove('mega-open')); item.classList.add('mega-open'); trigger && trigger.setAttribute('aria-expanded', 'true'); };
    const close = () => { closeTimer = setTimeout(() => { item.classList.remove('mega-open'); trigger && trigger.setAttribute('aria-expanded', 'false'); }, 120); };
    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', close);
    if (trigger) {
      trigger.addEventListener('focus', open);
      trigger.addEventListener('click', e => { e.preventDefault(); item.classList.toggle('mega-open'); });
    }
    item.addEventListener('focusout', e => { if (!item.contains(e.relatedTarget)) close(); });
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') items.forEach(i => i.classList.remove('mega-open')); });
})();

/* ----------------------------------------------------------------
   MOBILE MENU
   ---------------------------------------------------------------- */
(function initMobileMenu() {
  const burger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!burger || !menu) return;
  const closeBtn = document.getElementById('mobileClose');
  const links = Lumiere.qsa('.mobile-menu__nav a', menu);
  let lastFocus = null;

  function toggle(force) {
    const open = force !== undefined ? force : !menu.classList.contains('open');
    burger.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) { lastFocus = document.activeElement; (closeBtn || menu).focus(); }
    else if (lastFocus && typeof lastFocus.focus === 'function') { lastFocus.focus(); }
  }

  burger.addEventListener('click', () => toggle());
  closeBtn && closeBtn.addEventListener('click', () => toggle(false));
  links.forEach(l => l.addEventListener('click', () => toggle(false)));
  // Close when tapping the empty backdrop (not the panel content)
  menu.addEventListener('click', e => { if (e.target === menu) toggle(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) toggle(false);
  });
})();

/* ----------------------------------------------------------------
   ACTIVE NAV LINK  (based on current filename)
   ---------------------------------------------------------------- */
(function initActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  Lumiere.qsa('[data-nav]').forEach(a => {
    if (a.getAttribute('data-nav') === path) a.classList.add('active');
  });
})();

/* ----------------------------------------------------------------
   SCROLL REVEAL
   ---------------------------------------------------------------- */
(function initReveal() {
  const els = Lumiere.qsa('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!els.length) return;
  if (Lumiere.prefersReduced) { els.forEach(el => el.classList.add('visible')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

/* ----------------------------------------------------------------
   SCROLL PROGRESS
   ---------------------------------------------------------------- */
(function initProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  const update = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

/* ----------------------------------------------------------------
   BACK TO TOP
   ---------------------------------------------------------------- */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 700), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: Lumiere.prefersReduced ? 'auto' : 'smooth' }));
})();

/* ----------------------------------------------------------------
   COUNTERS
   ---------------------------------------------------------------- */
(function initCounters() {
  const counters = Lumiere.qsa('[data-count]');
  if (!counters.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const text = el.textContent.trim();
      const match = text.match(/([\d.]+)/);
      io.unobserve(el);
      if (!match || Lumiere.prefersReduced) return;
      const target = parseFloat(match[1]);
      const suffix = text.slice(match.index + match[1].length);
      const prefix = text.slice(0, match.index);
      const decimals = (match[1].split('.')[1] || '').length;
      let cur = 0; const step = target / (1400 / 16);
      (function tick() {
        cur += step;
        if (cur >= target) { el.textContent = text; return; }
        el.textContent = prefix + cur.toFixed(decimals) + suffix;
        requestAnimationFrame(tick);
      })();
    });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
})();

/* ----------------------------------------------------------------
   TILT CARDS
   ---------------------------------------------------------------- */
(function initTilt() {
  if (Lumiere.isTouch || Lumiere.prefersReduced) return;
  Lumiere.qsa('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
      card.style.transform = `translateY(-4px) perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

/* ----------------------------------------------------------------
   NEWSLETTER FORMS
   ---------------------------------------------------------------- */
(function initNewsletters() {
  Lumiere.qsa('[data-newsletter]').forEach(form => {
    const note = Lumiere.qs('[data-newsletter-note]', form.parentElement) || Lumiere.qs('.newsletter-note, .footer-newsletter-note', form.parentElement);
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = Lumiere.qs('input', form);
      const val = input ? input.value.trim() : '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        if (note) { note.textContent = 'Please enter a valid email address.'; note.classList.remove('success'); }
        return;
      }
      if (note) { note.textContent = '✦ Merci — you are on the guest list.'; note.classList.add('success'); }
      form.reset();
    });
  });
})();

/* ----------------------------------------------------------------
   GENERIC MODALS  (data-modal-open="id" / data-modal-close)
   ---------------------------------------------------------------- */
const LumModal = (() => {
  let lastFocus = null;
  function open(id, fill) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    lastFocus = document.activeElement;
    if (typeof fill === 'function') fill(overlay);
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const focusable = overlay.querySelector('button, a, input, [tabindex]');
    focusable && focusable.focus();
  }
  function close(overlay) {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastFocus && lastFocus.focus();
  }
  document.addEventListener('click', e => {
    const opener = e.target.closest('[data-modal-open]');
    if (opener) { open(opener.getAttribute('data-modal-open')); return; }
    if (e.target.closest('[data-modal-close]') || e.target.classList.contains('modal-overlay')) {
      const overlay = e.target.closest('.modal-overlay');
      if (overlay) close(overlay);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { const o = Lumiere.qs('.modal-overlay.open'); if (o) close(o); }
  });
  return { open, close };
})();

/* ----------------------------------------------------------------
   PAGE TRANSITIONS  (intra-site links get a veil sweep)
   ---------------------------------------------------------------- */
(function initPageTransition() {
  const veil = document.getElementById('pageVeil');
  if (!veil || Lumiere.prefersReduced) return;
  document.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    const target = a.getAttribute('target');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || target === '_blank' || a.hasAttribute('data-no-transition')) return;
    e.preventDefault();
    veil.classList.add('enter');
    setTimeout(() => { window.location.href = href; }, 560);
  });
})();

/* ----------------------------------------------------------------
   IMAGE FALLBACK  — graceful champagne placeholder for any image
   that fails to load (remote sources can occasionally 404).
   ---------------------------------------------------------------- */
(function initImageFallback() {
  const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23ede8e1'/%3E%3Cstop offset='0.5' stop-color='%23e8dcc4'/%3E%3Cstop offset='1' stop-color='%23d8c9a8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='600' height='600' fill='url(%23g)'/%3E%3Ctext x='50%25' y='52%25' font-family='Georgia,serif' font-size='120' fill='%23b8942e' fill-opacity='0.35' text-anchor='middle'%3E%E2%9C%A6%3C/text%3E%3C/svg%3E";
  document.addEventListener('error', e => {
    const el = e.target;
    if (el && el.tagName === 'IMG' && el.src !== placeholder && !el.dataset.fallbackApplied) {
      el.dataset.fallbackApplied = '1';
      el.src = placeholder;
    }
  }, true);
})();

/* ----------------------------------------------------------------
   SMOOTH ANCHOR SCROLL  (for in-page #targets)
   ---------------------------------------------------------------- */
(function initAnchors() {
  Lumiere.qsa('a[href^="#"]:not([href="#"])').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: Lumiere.prefersReduced ? 'auto' : 'smooth' }); }
    });
  });
})();
