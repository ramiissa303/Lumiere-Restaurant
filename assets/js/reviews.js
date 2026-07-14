/* ================================================================
   LUMIÈRE — reviews.js
   Render reviews, animate rating bars, filter + search.
   ================================================================ */
'use strict';

(function () {
  const grid = document.getElementById('reviewsGrid');
  if (!grid) return;

  const REVIEWS = [
    { name: 'Jonathan M.', loc: 'London', date: 'March 2025', stars: 5, exp: 'Tasting Menu', verified: true,
      text: 'The finest thing I have put in my mouth in thirty years of dining. Every element a masterpiece in itself — the Wellington was transcendent.' },
    { name: 'Stefan L.', loc: 'Zürich', date: 'February 2025', stars: 5, exp: 'Special Occasion', verified: true,
      text: 'We celebrated our anniversary here. They remembered my wife\'s favourite flower and placed one at her setting. Extraordinary attention to detail.' },
    { name: 'Amélie C.', loc: 'Paris', date: 'January 2025', stars: 5, exp: 'À la Carte', verified: true,
      text: 'The soufflé alone is worth the reservation. Chef Moreau\'s restraint is what elevates it — he trusts the chocolate completely, and so do we.' },
    { name: 'Priya N.', loc: 'Mumbai', date: 'December 2024', stars: 5, exp: 'Tasting Menu', verified: true,
      text: 'Nine courses that felt like a single, flowing sentence. The sommelier pairings turned dinner into a conversation. Faultless from arrival to farewell.' },
    { name: 'Marcus T.', loc: 'New York', date: 'November 2024', stars: 5, exp: 'Private Dining', verified: true,
      text: 'Hosted twelve clients in the Salon Doré. The room, the service, the food — everything closed the deal before dessert. Camille thought of everything.' },
    { name: 'Élodie R.', loc: 'Lyon', date: 'November 2024', stars: 5, exp: 'Special Occasion', verified: true,
      text: 'My husband proposed at the Chef\'s Table. Antoine himself brought out a plate that read "Elle a dit oui." I will never forget this night.' },
    { name: 'Hiroshi K.', loc: 'Tokyo', date: 'October 2024', stars: 5, exp: 'Tasting Menu', verified: true,
      text: 'As someone raised on kaiseki, I recognise true seasonal discipline. Lumière has it. The turbot in salt crust was the equal of anything in Kyoto.' },
    { name: 'Bianca F.', loc: 'Milan', date: 'October 2024', stars: 4, exp: 'À la Carte', verified: true,
      text: 'Sublime cooking and a cellar to lose yourself in. A touch slow between courses on a busy Saturday, but every plate justified the wait.' },
    { name: 'George W.', loc: 'Edinburgh', date: 'September 2024', stars: 5, exp: 'Special Occasion', verified: true,
      text: 'My parents\' golden wedding. The team turned a dinner into a ceremony. There were tears — the good kind — before the mignardises even arrived.' },
    { name: 'Nadia S.', loc: 'Dubai', date: 'September 2024', stars: 5, exp: 'Private Dining', verified: true,
      text: 'The Cellar Table is pure theatre. Marguerite guided us through vintages I\'d only read about. An education wrapped in the most gracious hospitality.' },
    { name: 'Thomas B.', loc: 'Berlin', date: 'August 2024', stars: 5, exp: 'Tasting Menu', verified: true,
      text: 'Minimalism done maximally well. Four elements per plate, not one of them negotiable. This is what two stars should taste like.' },
    { name: 'Clara V.', loc: 'Barcelona', date: 'July 2024', stars: 5, exp: 'À la Carte', verified: true,
      text: 'The burrata with black truffle stopped conversation at our table. We ordered a second. No regrets, only reservations for our return.' }
  ];

  const initials = n => n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const stars = n => '★★★★★☆☆☆☆☆'.slice(5 - n, 10 - n);
  const check = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l5 5L20 7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function render(list) {
    grid.innerHTML = list.map(r => `
      <article class="review-card" data-exp="${r.exp}" data-text="${(r.text + ' ' + r.name + ' ' + r.loc).toLowerCase()}">
        <div class="review-head">
          <div class="review-avatar">${initials(r.name)}</div>
          <div class="review-who">
            <div class="review-name">${r.name}${r.verified ? ` <span class="badge badge--verified">${check}Verified</span>` : ''}</div>
            <div class="review-date">${r.loc} · ${r.date}</div>
          </div>
        </div>
        <div class="review-stars">${stars(r.stars)}</div>
        <p class="review-text">"${r.text}"</p>
        <div class="review-foot"><span class="review-exp">Dined: ${r.exp}</span></div>
      </article>`).join('');
    document.getElementById('reviewsEmpty').classList.toggle('show', list.length === 0);
  }
  render(REVIEWS);

  const state = { filter: 'all', q: '' };
  function apply() {
    let list = REVIEWS.filter(r =>
      (state.filter === 'all' || r.exp === state.filter) &&
      (!state.q || (r.text + ' ' + r.name + ' ' + r.loc).toLowerCase().includes(state.q))
    );
    render(list);
  }

  document.getElementById('reviewFilters').addEventListener('click', e => {
    const btn = e.target.closest('.menu-cat'); if (!btn) return;
    document.querySelectorAll('#reviewFilters .menu-cat').forEach(b => b.classList.remove('active'));
    btn.classList.add('active'); state.filter = btn.dataset.filter; apply();
  });
  const s = document.getElementById('reviewSearch');
  let deb; s.addEventListener('input', () => { clearTimeout(deb); deb = setTimeout(() => { state.q = s.value.trim().toLowerCase(); apply(); }, 160); });

  /* Animate rating bars when in view */
  const bars = document.querySelectorAll('.rating-fill');
  const io = new IntersectionObserver(es => es.forEach(x => {
    if (x.isIntersecting) { x.target.style.width = x.target.dataset.fill + '%'; io.unobserve(x.target); }
  }), { threshold: 0.4 });
  bars.forEach(b => io.observe(b));
})();
