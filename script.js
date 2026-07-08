'use strict';

/* ================================================================
   UTILITY — Smooth scroll
   ================================================================ */
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
}


/* ================================================================
   MODULE 1 — NAVIGATION
   ================================================================ */
(function initNav() {
  const nav  = document.getElementById('nav');
  const hero = document.querySelector('.hero');
  if (!nav || !hero) return;
  const observer = new IntersectionObserver(
    ([entry]) => nav.classList.toggle('scrolled', !entry.isIntersecting),
    { rootMargin: '-80px 0px 0px 0px' }
  );
  observer.observe(hero);
})();


/* ================================================================
   MODULE 2 — MOBILE MENU
   ================================================================ */
(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  const mobileLinks = mobileMenu.querySelectorAll('a');

  function toggleMenu(force) {
    const isOpen = force !== undefined ? force : !hamburger.classList.contains('open');
    hamburger.classList.toggle('open', isOpen);
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggleMenu());
  mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });
})();


/* ================================================================
   MODULE 3 — HERO SCROLL BUTTONS
   ================================================================ */
(function initHeroScrollButtons() {
  document.querySelectorAll('.js-scroll-to').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      if (targetId) scrollToSection(targetId);
    });
  });
})();


/* ================================================================
   MODULE 4 — MENU TABS
   ================================================================ */
(function initMenuTabs() {
  const tabsContainer = document.getElementById('menuTabs');
  const indicator     = document.getElementById('tabIndicator');
  if (!tabsContainer || !indicator) return;

  const tabs   = tabsContainer.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');

  function moveIndicator(activeTab) {
    const containerRect = tabsContainer.getBoundingClientRect();
    const tabRect       = activeTab.getBoundingClientRect();
    indicator.style.left  = (tabRect.left - containerRect.left) + 'px';
    indicator.style.width = tabRect.width + 'px';
  }

  function activateTab(selectedTab) {
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    panels.forEach(p => p.classList.remove('active'));

    selectedTab.classList.add('active');
    selectedTab.setAttribute('aria-selected', 'true');

    const targetPanel = document.getElementById('panel-' + selectedTab.dataset.panel);
    if (targetPanel) targetPanel.classList.add('active');
    moveIndicator(selectedTab);
  }

  tabs.forEach(tab => tab.addEventListener('click', () => activateTab(tab)));

  tabsContainer.addEventListener('keydown', e => {
    const tabsArray   = Array.from(tabs);
    const activeIndex = tabsArray.findIndex(t => t.classList.contains('active'));
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (activeIndex + 1) % tabsArray.length;
      tabsArray[nextIndex].focus();
      activateTab(tabsArray[nextIndex]);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (activeIndex - 1 + tabsArray.length) % tabsArray.length;
      tabsArray[prevIndex].focus();
      activateTab(tabsArray[prevIndex]);
    }
  });

  requestAnimationFrame(() => {
    const initialActive = tabsContainer.querySelector('.menu-tab.active');
    if (initialActive) moveIndicator(initialActive);
  });

  window.addEventListener('resize', () => {
    const currentActive = tabsContainer.querySelector('.menu-tab.active');
    if (currentActive) moveIndicator(currentActive);
  });
})();


/* ================================================================
   MODULE 5 — SCROLL REVEAL
   ================================================================ */
(function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealElements.forEach(el => observer.observe(el));
})();


/* ================================================================
   MODULE 6 — RESERVATION FORM
   ================================================================ */
(function initReservationForm() {
  const form    = document.getElementById('reservationForm');
  const success = document.getElementById('formSuccess');
  const dateInput = document.getElementById('date');
  if (!form || !success) return;

  if (dateInput) {
    dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
  }

  function markFieldInvalid(field) {
    field.classList.add('invalid');
    const clearError = () => field.classList.remove('invalid');
    field.addEventListener('input',  clearError, { once: true });
    field.addEventListener('change', clearError, { once: true });
  }

  function validateForm() {
    let isValid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const value = field.value.trim();
      if (!value) { markFieldInvalid(field); isValid = false; }
      if (field.type === 'email' && value) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { markFieldInvalid(field); isValid = false; }
      }
    });
    return isValid;
  }

  function showSuccessState() {
    form.style.transition = 'opacity 0.35s ease-out, transform 0.35s ease-out';
    form.style.opacity    = '0';
    form.style.transform  = 'translateY(-10px)';

    setTimeout(() => {
      form.style.display = 'none';
      success.classList.add('show');
      success.style.opacity    = '0';
      success.style.transform  = 'translateY(10px)';
      success.style.transition = 'opacity 0.45s var(--ease-out), transform 0.45s var(--ease-out)';
      requestAnimationFrame(() => {
        success.style.opacity   = '1';
        success.style.transform = 'translateY(0)';
      });
    }, 350);
  }

  function submitForm(submitBtn) {
    const originalText = submitBtn.innerHTML;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
    setTimeout(() => { showSuccessState(); }, 1400);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm()) return;
    submitForm(form.querySelector('[type="submit"]'));
  });
})();


/* ================================================================
   MODULE 7 — MICRO-INTERACTIONS
   ================================================================ */
(function initMicroInteractions() {
  document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
    btn.addEventListener('mousedown', () => {
      btn.style.transition = 'transform 0.1s ease-out';
      btn.style.transform  = 'scale(0.97)';
    });
    const releaseFn = () => {
      btn.style.transform = '';
      setTimeout(() => { btn.style.transition = ''; }, 150);
    };
    btn.addEventListener('mouseup',    releaseFn);
    btn.addEventListener('mouseleave', releaseFn);
  });
})();


/* ================================================================
   MODULE 8 — CUSTOM CURSOR
   ================================================================ */
(function initCustomCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Add hover effect on interactive elements
  document.querySelectorAll('a, button, .menu-item, .testimonial-card, input, select, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
})();


/* ================================================================
   MODULE 9 — AMBIENT GLOW (mouse-follow)
   ================================================================ */
(function initAmbientGlow() {
  const orb = document.querySelector('.ambient-glow-orb');
  if (!orb) return;

  document.addEventListener('mousemove', e => {
    orb.style.left = e.clientX + 'px';
    orb.style.top  = e.clientY + 'px';
  });
})();


/* ================================================================
   MODULE 10 — 3D TILT ON CARDS
   ================================================================ */
(function initTiltCards() {
  const cards = document.querySelectorAll('.menu-item, .testimonial-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -4;
      const rotateY = (x - centerX) / centerX * 4;
      card.style.transform = `translateY(-4px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ================================================================
   MODULE 11 — STAT COUNTER ANIMATION
   ================================================================ */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num, .philosophy-num');

  if (!counters.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent.trim();
          const match = text.match(/([\d.]+)/);
          if (!match) return;

          const targetNum = parseFloat(match[1]);
          const suffix = text.replace(match[1], '');
          let current = 0;
          const duration = 1500;
          const step = targetNum / (duration / 16);

          function animate() {
            current += step;
            if (current >= targetNum) {
              el.textContent = text;
              return;
            }
            if (Number.isInteger(targetNum)) {
              el.textContent = Math.floor(current) + suffix;
            } else {
              el.textContent = current.toFixed(0) + suffix;
            }
            requestAnimationFrame(animate);
          }
          animate();
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(c => observer.observe(c));
})();


/* ================================================================
   MODULE 12 — PARALLAX ON SCROLL
   ================================================================ */
(function initParallax() {
  const parallaxElements = document.querySelectorAll('.chef-img-main');

  if (!parallaxElements.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxElements.forEach(el => {
      const speed = 0.05;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const yPos = (rect.top - window.innerHeight / 2) * speed;
        el.style.transform = `translateY(${yPos}px)`;
      }
    });
  }, { passive: true });
})();
