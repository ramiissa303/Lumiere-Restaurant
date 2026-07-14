/* ================================================================
   LUMIÈRE — partials.js
   Single source of truth for shared site chrome (nav, mega menu,
   mobile menu, footer, cursor, veil, progress). Injected into every
   page so markup never drifts. Runs before core.js (both deferred,
   this one first) so all elements exist when behaviour binds.
   ================================================================ */
'use strict';

(function injectChrome() {
  const chrome = `
  <div class="page-veil" id="pageVeil" aria-hidden="true"></div>
  <div class="scroll-progress" id="scrollProgress" aria-hidden="true"></div>
  <div class="cursor-dot" aria-hidden="true"></div>
  <div class="cursor-ring" aria-hidden="true"></div>
  <div class="ambient-glow" aria-hidden="true"><div class="ambient-glow-orb"></div></div>

  <nav class="nav" id="nav" aria-label="Primary">
    <a href="index.html" class="nav-logo" data-no-transition>Lumi<span>è</span>re</a>
    <ul class="nav-links">
      <li class="nav-item has-mega">
        <a href="menu.html" class="nav-link has-mega" data-nav="menu.html" aria-haspopup="true" aria-expanded="false">Menu <span class="caret" aria-hidden="true"></span></a>
        <div class="mega" role="menu">
          <div class="mega-grid">
            <div class="mega-col">
              <h5>The Carte</h5>
              <div class="mega-links">
                <a href="menu.html#starters" class="mega-link"><strong>Starters &amp; Seafood</strong><span>Caviar, crudo, langoustine bisque</span></a>
                <a href="menu.html#mains" class="mega-link"><strong>Main Courses</strong><span>Wellington, turbot, Normandy veal</span></a>
                <a href="menu.html#desserts" class="mega-link"><strong>Desserts &amp; Cheese</strong><span>Valrhona soufflé, affiné selection</span></a>
                <a href="menu.html#wine" class="mega-link"><strong>Wine &amp; Cocktails</strong><span>Cellar of 900 references</span></a>
              </div>
            </div>
            <a href="menu.html" class="mega-feature">
              <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&h=400&fit=crop&auto=format" alt="Signature tasting plate" loading="lazy" />
              <span class="mega-feature-text"><span class="eyebrow eyebrow--left">Chef's Table</span><strong>The Nine-Course Menu</strong></span>
            </a>
          </div>
        </div>
      </li>
      <li class="nav-item has-mega">
        <a href="private-dining.html" class="nav-link has-mega" data-nav="private-dining.html" aria-haspopup="true" aria-expanded="false">Experiences <span class="caret" aria-hidden="true"></span></a>
        <div class="mega" role="menu">
          <div class="mega-grid">
            <div class="mega-col">
              <h5>Discover</h5>
              <div class="mega-links">
                <a href="private-dining.html" class="mega-link"><strong>Private Dining</strong><span>Intimate rooms for 6–60 guests</span></a>
                <a href="events.html" class="mega-link"><strong>Events</strong><span>Wine tastings &amp; chef's nights</span></a>
                <a href="gallery.html" class="mega-link"><strong>Gallery</strong><span>A visual portrait of Lumière</span></a>
                <a href="reviews.html" class="mega-link"><strong>Guest Reviews</strong><span>1,284 stories, 4.9 ★</span></a>
              </div>
            </div>
            <a href="events.html" class="mega-feature">
              <img src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&h=400&fit=crop&auto=format" alt="Wine tasting evening" loading="lazy" />
              <span class="mega-feature-text"><span class="eyebrow eyebrow--left">This Season</span><strong>Grand Cru Tasting</strong></span>
            </a>
          </div>
        </div>
      </li>
      <li class="nav-item"><a href="about.html" class="nav-link" data-nav="about.html">About</a></li>
      <li class="nav-item"><a href="journal.html" class="nav-link" data-nav="journal.html">Journal</a></li>
      <li class="nav-item"><a href="contact.html" class="nav-link" data-nav="contact.html">Contact</a></li>
    </ul>
    <div class="nav-right">
      <button class="theme-toggle" id="themeToggle" aria-label="Switch theme" title="Toggle light / dark">
        <svg class="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke-linecap="round"/></svg>
        <svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
      </button>
      <a href="reservations.html" class="nav-cta desktop-only" data-nav="reservations.html">Reserve</a>
      <button class="nav-hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </nav>

  <div class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden="true">
    <div class="mobile-menu__top">
      <a href="index.html" class="mobile-menu__logo" data-no-transition>Lumi<span>è</span>re</a>
      <button class="mobile-menu__close" id="mobileClose" type="button" aria-label="Close menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>
      </button>
    </div>
    <nav class="mobile-menu__nav" aria-label="Mobile navigation">
      <a href="index.html" data-nav="index.html">Home</a>
      <a href="about.html" data-nav="about.html">About</a>
      <a href="menu.html" data-nav="menu.html">Menu</a>
      <a href="reservations.html" data-nav="reservations.html">Reservations</a>
      <a href="private-dining.html" data-nav="private-dining.html">Private Dining</a>
      <a href="events.html" data-nav="events.html">Events</a>
      <a href="gallery.html" data-nav="gallery.html">Gallery</a>
      <a href="reviews.html" data-nav="reviews.html">Reviews</a>
      <a href="journal.html" data-nav="journal.html">Journal</a>
      <a href="contact.html" data-nav="contact.html">Contact</a>
    </nav>
    <div class="mobile-menu__foot">
      <div class="mobile-menu__social" aria-label="Social links">
        <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
        <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="#" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>
        <a href="#" aria-label="Pinterest"><i class="fa-brands fa-pinterest-p"></i></a>
      </div>
      <a href="reservations.html" class="btn-primary mobile-menu__cta" data-nav="reservations.html">Reserve a Table
        <span class="btn-icon" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      </a>
    </div>
  </div>`;

  const footer = `
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-cta reveal">
        <span class="eyebrow">Your Table Awaits</span>
        <h2 class="serif">Reserve an evening to remember</h2>
        <p>We hold only forty covers each evening. Secure your place at the table.</p>
        <a href="reservations.html" class="btn-primary">Book a Reservation <span class="btn-icon" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span></a>
      </div>
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>Lumi<span>è</span>re</h3>
          <p>A two-Michelin-star restaurant dedicated to the art of the season, the mastery of craft, and the joy of a perfectly set table.</p>
          <div class="footer-social">
            <a href="#" class="social-link" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" class="social-link" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" class="social-link" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>
            <a href="#" class="social-link" aria-label="Pinterest"><i class="fa-brands fa-pinterest-p"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="menu.html">The Menu</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="private-dining.html">Private Dining</a></li>
            <li><a href="events.html">Events</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="journal.html">Journal</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Visit</h4>
          <address>
            12 Rue Saint-Dominique<br>75007 Paris, France<br><br>
            <a href="tel:+33142555050">+33 1 42 55 50 50</a><br>
            <a href="mailto:hello@lumiere.paris">hello@lumiere.paris</a>
          </address>
        </div>
        <div class="footer-col footer-newsletter">
          <h4>Le Journal</h4>
          <p>Seasonal menus, chef's insights and first access to events.</p>
          <form class="footer-newsletter-form" data-newsletter novalidate>
            <input type="email" placeholder="Your email" aria-label="Email address" required />
            <button type="submit" aria-label="Subscribe"><svg width="16" height="16" viewBox="0 0 12 12"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          </form>
          <p class="footer-newsletter-note" data-newsletter-note>No spam. Unsubscribe anytime.</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Lumière Restaurant. All rights reserved.</p>
        <div class="footer-bottom-links"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Accessibility</a></div>
      </div>
    </div>
  </footer>
  <button class="back-to-top" id="backToTop" aria-label="Back to top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;

  // Mount points: pages include <div data-partial="header"></div> / footer,
  // OR we fall back to injecting at body edges.
  const headerMount = document.querySelector('[data-partial="header"]');
  const footerMount = document.querySelector('[data-partial="footer"]');

  if (headerMount) headerMount.outerHTML = chrome;
  else document.body.insertAdjacentHTML('afterbegin', chrome);

  if (footerMount) footerMount.outerHTML = footer;
  else document.body.insertAdjacentHTML('beforeend', footer);
})();
