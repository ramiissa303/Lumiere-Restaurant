/* ================================================================
   LUMIÈRE — journal.js  ·  Article grid + category filter
   ================================================================ */
'use strict';

(function () {
  const grid = document.getElementById('journalGrid');
  if (!grid) return;

  const ARTICLES = [
    { cat: "Chef's Insight", title: 'Why We Cook to the Calendar', read: '5 min', date: '12 Jun', img: 'photo-1512621776951-a57141f2eefd',
      excerpt: 'Antoine on the discipline of letting the season, not the menu, make the decisions.' },
    { cat: 'Wine Guide', title: 'Champagne Beyond the Toast', read: '7 min', date: '28 May', img: 'photo-1569529465841-dfecdab7503b',
      excerpt: 'How grower champagnes changed the way our sommeliers think about the first pour.' },
    { cat: 'Food Story', title: 'The Life of a Langoustine', read: '6 min', date: '14 May', img: 'photo-1565557623262-b51c2513a641',
      excerpt: 'From a Scottish creel to the bisque — the twelve hours that define our signature soup.' },
    { cat: 'Seasonal Update', title: 'Asparagus: The Three-Week Window', read: '4 min', date: '30 Apr', img: 'photo-1547592166-23ac45744acd',
      excerpt: 'Alsatian white asparagus arrives — and briefly, it is the only vegetable that matters.' },
    { cat: "Chef's Insight", title: 'On Removing, Not Adding', read: '5 min', date: '18 Apr', img: 'photo-1600891964599-f61ba0e24092',
      excerpt: 'The hardest lesson in the kitchen: knowing what to leave off the plate.' },
    { cat: 'Wine Guide', title: 'Reading a Burgundy Label', read: '8 min', date: '02 Apr', img: 'photo-1510812431401-41d2bd2722f3',
      excerpt: 'Village, premier cru, grand cru — a plain-language map to the Côte d\'Or.' },
    { cat: 'Food Story', title: 'The Soufflé That Refuses to Fall', read: '5 min', date: '20 Mar', img: 'photo-1541783245831-57d6fb0926d3',
      excerpt: 'Pastry chef Luc Bernard on the physics, patience and nerve behind our Valrhona soufflé.' },
    { cat: 'Seasonal Update', title: 'Winter\'s Quiet Larder', read: '4 min', date: '08 Mar', img: 'photo-1473093295043-cdd812d0e601',
      excerpt: 'Chestnut, celeriac and black garlic — how restraint becomes richness in the cold months.' },
    { cat: 'Food Story', title: 'A Short History of the Blini', read: '6 min', date: '22 Feb', img: 'photo-1551218808-94e220e084d2',
      excerpt: 'The humble pancake beneath our caviar has a longer, stranger story than you\'d think.' }
  ];

  const IMG = id => `https://images.unsplash.com/${id}?w=600&h=380&fit=crop&auto=format`;

  function render(list) {
    grid.innerHTML = list.map((a, i) => `
      <article class="article-card reveal${i % 3 ? ' reveal-delay-' + (i % 3) : ''}" data-cat="${a.cat}">
        <a href="#" data-no-transition>
          <div class="article-media"><img src="${IMG(a.img)}" alt="${a.title}" loading="lazy" /><span class="article-cat"><span class="badge badge--gold">${a.cat}</span></span></div>
          <div class="article-body">
            <div class="article-meta">${a.date} · ${a.read} read</div>
            <h3 class="serif">${a.title}</h3>
            <p>${a.excerpt}</p>
            <span class="btn-text">Read article <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          </div>
        </a>
      </article>`).join('');
    // trigger reveal for freshly-inserted cards
    const io = new IntersectionObserver(es => es.forEach(x => x.isIntersecting && (x.target.classList.add('visible'), io.unobserve(x.target))), { threshold: 0.1 });
    grid.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }
  render(ARTICLES);

  document.querySelector('.menu-cats').addEventListener('click', e => {
    const btn = e.target.closest('[data-jcat]'); if (!btn) return;
    document.querySelectorAll('[data-jcat]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const c = btn.dataset.jcat;
    render(c === 'all' ? ARTICLES : ARTICLES.filter(a => a.cat === c));
  });
})();
