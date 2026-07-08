# Lumière — Fine Dining Restaurant Website

A sophisticated, single-page restaurant website built with **pure HTML, CSS, and vanilla JavaScript** — no frameworks, no build tools, no dependencies. Designed to showcase modern front-end craft: micro-interactions, scroll-driven animations, accessible UI patterns, and a responsive luxury aesthetic.

---

## Features

- **Custom animated cursor** with a smooth ring that follows the pointer and expands on interactive elements
- **Scroll-reveal animations** using the Intersection Observer API
- **Accessible tab navigation** with animated sliding indicator and full keyboard support (Arrow keys)
- **Reservation form** with client-side validation, visual error states, and an animated success transition
- **3D tilt effect** on menu and testimonial cards
- **Ambient glow** that tracks the cursor across the page
- **Counter animation** on statistics when they enter the viewport
- **Parallax scroll** on the chef portrait
- **Animated hamburger menu** with full-screen mobile overlay
- **CSS design tokens** (`--` custom properties) for consistent, maintainable theming
- **Paper grain texture** via an inline SVG filter — zero extra HTTP requests
- **Fully responsive** — tested at 320 px, 768 px, and 1440 px+

---

## Technologies

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Markup     | HTML5 (semantic, ARIA-labelled)         |
| Styles     | CSS3 — Grid, Flexbox, Custom Properties |
| Behaviour  | Vanilla JavaScript (ES6+, no libraries) |
| Fonts      | Google Fonts — Cormorant Garamond, DM Sans |
| Icons      | Font Awesome 6 (CDN)                    |
| Images     | Unsplash (CDN) + local chef photography |

---

## Folder Structure

```
lumiere-restaurant/
├── index.html        # Single-page entry point
├── style.css         # All styles — 23 organised sections
├── script.js         # Vanilla JS — 12 self-contained IIFE modules
├── img/
│   ├── chef1.jpg     # Executive Chef portrait
│   ├── chef2.jpg     # Kitchen herbs
│   └── chef3.jpg     # Artisan spices
├── .gitignore
├── LICENSE
└── README.md
```

---

## Getting Started

No build step required. Open directly or serve locally:

```bash
# Clone
git clone https://github.com/ramiissa303/lumiere-restaurant.git
cd lumiere-restaurant

# Option 1 — Python
python -m http.server 8000

# Option 2 — Node.js
npx serve .

# Option 3 — VS Code
# Install the "Live Server" extension, then right-click index.html → Open with Live Server
```

Open `http://localhost:8000` in your browser.

---

## Screenshots

> Replace the placeholders below with real screenshots after deployment.

| Hero Section | Menu Tabs | Reservation Form |
|:---:|:---:|:---:|
| *(screenshot)* | *(screenshot)* | *(screenshot)* |

| Chef Section | Testimonials | Mobile View |
|:---:|:---:|:---:|
| *(screenshot)* | *(screenshot)* | *(screenshot)* |

---

## Live Demo

[View Live Demo](https://ramiissa303.github.io/lumiere-restaurant) *(deploy to GitHub Pages and update this link)*

---

## JavaScript Architecture

The script is structured as twelve independent IIFEs (Immediately Invoked Function Expressions), each responsible for a single feature. This pattern avoids global scope pollution and makes each module easy to locate, test, and remove independently.

| Module | Responsibility |
|--------|---------------|
| `initNav` | Sticky nav — adds `.scrolled` class via IntersectionObserver |
| `initMobileMenu` | Hamburger toggle, Escape key, body scroll lock |
| `initHeroScrollButtons` | Smooth scroll on `.js-scroll-to` buttons |
| `initMenuTabs` | Tab switching, animated indicator, Arrow-key navigation |
| `initScrollReveal` | `.reveal` class system using IntersectionObserver |
| `initReservationForm` | Validation, invalid field highlighting, success animation |
| `initMicroInteractions` | Press-scale effect on all buttons |
| `initCustomCursor` | Dot + ring cursor with RAF-smoothed ring tracking |
| `initAmbientGlow` | Mouse-follow radial gradient orb |
| `initTiltCards` | 3D perspective tilt on menu and testimonial cards |
| `initCounters` | Number count-up animation on stat elements |
| `initParallax` | Subtle scroll parallax on the chef portrait |

---

## Future Improvements

- [ ] Deploy to GitHub Pages and update the Live Demo link
- [ ] Add real form submission via [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com)
- [ ] Add a tasting-menu PDF viewer / download section
- [ ] Dark mode toggle (CSS custom property swap)
- [ ] Integrate an OpenTable or Resy reservation widget
- [ ] Add a press & awards gallery section
- [ ] Performance audit and image optimisation (WebP conversion, lazy loading review)

---

## License

[MIT](LICENSE) © 2025 Rami Issa

---

## Author

Built by **Rami Issa**

- GitHub: [@ramiissa303](https://github.com/ramiissa303)
- Email: ramiissa303@gmail.com
