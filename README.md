<div align="center">

# Lumière — Luxury Fine-Dining Website

**A premium, fully responsive multi-page website for a fictional two-Michelin-star restaurant in Paris.**

Hand-built with semantic HTML5, modern CSS3 and vanilla JavaScript (ES6+) — no frameworks, no build step.

[![Made with HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](#)
[![Styled with CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](#)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-c9a24b.svg)](LICENSE)

[Live Demo](#-live-demo) · [Features](#-features) · [Tech Stack](#-technologies-used) · [Getting Started](#-installation)

</div>

---

## Overview

**Lumière** is a design-led marketing website for an upscale restaurant, built to showcase production-quality front-end craft: cinematic layouts, refined typography, tasteful motion and genuine attention to accessibility. Every page is hand-authored — there is no framework and no bundler, so the entire project runs by simply opening a file in the browser.

The design language pairs **Michelin-star restraint** with **luxury-hotel editorial** styling and **Apple-level attention to detail**: a palette of ivory, champagne gold, deep espresso and soft beige, set in the *Cormorant Garamond* display serif over *DM Sans*.

> This is a portfolio / concept project. The restaurant, reviews and imagery are fictional and used for demonstration purposes only.

---

## ✨ Features

- **10 fully designed pages** — Home, About, Menu, Reservations, Private Dining, Events, Gallery, Reviews, Journal and Contact.
- **Light / dark mode** — persisted in `localStorage` and respects the visitor's system preference.
- **Shared chrome, injected once** — the navigation, mega-menu, mobile menu and footer live in a single source file and are mounted into every page, so markup never drifts.
- **Interactive reservation wizard** — a multi-step, airline-style booking flow with a calendar and an interactive floor map for picking your exact table.
- **Data-driven menu** — live search, category navigation, dietary filters, sorting, allergens, calories and wine pairings.
- **Keyboard-navigable gallery** — masonry layout with category filters and an accessible lightbox.
- **Reviews & events** — animated rating bars, filtering and search; event cards with detail modals.
- **Premium micro-interactions** — loading screen, custom cursor, scroll-progress bar, sticky auto-hiding nav, page-transition veil, animated counters, 3D tilt cards and reveal-on-scroll.
- **Form validation** — custom-styled inputs with inline validation and success states.
- **Accessible by design** — semantic landmarks, skip link, ARIA on interactive widgets, visible focus rings and full `prefers-reduced-motion` support.
- **SEO-ready** — per-page titles and meta descriptions, Open Graph tags, a canonical URL and `Restaurant` JSON-LD structured data.
- **Fully responsive** — mobile-first, fluid typography, tested from small phones to large desktops.

---

## 🛠 Technologies Used

| Area | Stack |
|------|-------|
| Markup | Semantic **HTML5** |
| Styling | **CSS3** — custom properties (design tokens), Grid, Flexbox, `clamp()` fluid type, keyframe animation |
| Scripting | **Vanilla JavaScript (ES6+)** — modular files, `IntersectionObserver`, no dependencies |
| Typography | Google Fonts — *Cormorant Garamond* & *DM Sans* |
| Icons | Font Awesome 6 (via CDN) |
| Imagery | Local photography + Unsplash (remote demo images) |
| Tooling | **None required** — no framework, no bundler, no build step |

---

## 📁 Folder Structure

```
Lumiere-Restaurant/
├── index.html              # Home — hero, featured dishes, chef, awards, testimonials, events
├── about.html              # Story, philosophy, timeline, team
├── menu.html               # Data-driven menu with search, filters and sorting
├── reservations.html       # Multi-step booking wizard + interactive floor map
├── private-dining.html     # Occasion types, room previews, quote form
├── events.html             # Event cards + detail modals
├── gallery.html            # Masonry gallery with filters and lightbox
├── reviews.html            # Rating summary, animated bars, filters
├── journal.html            # Editorial blog grid with category filter
├── contact.html            # Validated contact form, map, opening hours
│
├── assets/
│   ├── css/
│   │   ├── base.css        # Design tokens, reset, typography, dark theme, utilities
│   │   ├── layout.css      # Loader, cursor, nav + mega menu, footer, scroll progress
│   │   ├── components.css  # Buttons, cards, forms, badges, modals, stats
│   │   ├── pages.css       # Per-page sections (hero, menu, wizard, gallery, reviews…)
│   │   └── responsive.css  # Breakpoints and mobile refinements
│   │
│   └── js/
│       ├── partials.js     # Single source of truth for shared chrome (nav/footer)
│       ├── core.js         # Theme, loader, cursor, nav, reveal, counters, modals
│       ├── menu.js         # Menu data + search / filter / sort / render
│       ├── reservations.js # Booking wizard + calendar + floor map
│       ├── gallery.js      # Masonry filter + lightbox
│       ├── reviews.js      # Review render + filter / search + rating bars
│       ├── events.js       # Event cards + detail modal
│       ├── journal.js      # Article grid + category filter
│       └── forms.js        # Generic form validation + success state
│
├── img/                    # Local chef photography
├── .gitignore
├── LICENSE                 # MIT
└── README.md
```

### How the shared layout works
The navigation, mega-menu, mobile menu and footer are defined **once** in `assets/js/partials.js`. Each page includes lightweight mount points — `<div data-partial="header"></div>` and `<div data-partial="footer"></div>` — that `partials.js` replaces on load. It runs before `core.js` (both deferred) so all shared elements exist before behaviour binds. **To change the nav or footer, edit `partials.js` — never the individual pages.**

---

## 🚀 Installation

No dependencies and no build step. Clone the repository:

```bash
git clone https://github.com/ramiissa303/Lumiere-Restaurant.git
cd Lumiere-Restaurant
```

---

## ▶️ How to Run

**Option 1 — Open directly**

Double-click `index.html`, or open it in your browser.

**Option 2 — Serve locally (recommended)**

A static server avoids any browser file-path restrictions:

```bash
# Python 3
python -m http.server 8000

# or Node
npx serve
```

Then visit **http://localhost:8000**.

> **Tip:** The hero supports an optional local background video — drop a file at `assets/video/hero.mp4` and it plays automatically, falling back to a poster image if absent.

---

## 📸 Screenshots

> Replace the placeholders below with real captures once deployed (e.g. save them under `screenshots/`).

| Home | Menu |
|------|------|
| ![Home page](screenshots/home.png) | ![Menu page](screenshots/menu.png) |

| Reservations | Gallery |
|--------------|---------|
| ![Reservations](screenshots/reservations.png) | ![Gallery](screenshots/gallery.png) |

---

## 🌐 Live Demo

**Live site:** https://lumiere-restaurantt.netlify.app/

> Deployed on **Netlify** — connected to this repository for automatic deploys on every push to `main`.

---

## 📦 GitHub Repository

**Repository:** https://github.com/ramiissa303/Lumiere-Restaurant

```bash
git clone https://github.com/ramiissa303/Lumiere-Restaurant.git
```

---

## 🔭 Future Improvements

- Wire forms (reservations, contact, newsletter) to a real backend or a service such as Formspree.
- Add a lightweight build step to minify assets and self-host fonts for offline / privacy-friendly delivery.
- Replace remote Unsplash demo imagery with optimised, locally hosted `WebP`/`AVIF` assets.
- Progressive Web App support — offline caching and an installable manifest.
- Internationalisation (English / French) to match the Parisian setting.
- Automated Lighthouse and accessibility checks in CI.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Rami Issa**

- GitHub: [@ramiissa303](https://github.com/ramiissa303)
- Email: [ramiissa303@gmail.com](mailto:ramiissa303@gmail.com)

---

<div align="center">

If you find this project useful or inspiring, consider giving it a ⭐ — it helps a lot!

</div>
