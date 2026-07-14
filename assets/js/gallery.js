/* ================================================================
   LUMIÈRE — gallery.js
   Masonry render, category filter, and keyboard-navigable lightbox.
   ================================================================ */
'use strict';

(function () {
  const masonry = document.getElementById('masonry');
  if (!masonry) return;

  const PHOTOS = [
    { id: 'photo-1600891964599-f61ba0e24092', cat: 'food', title: 'Signature Plate', sub: 'The Pass' },
    { id: 'photo-1517248135467-4c7edcad34c4', cat: 'interior', title: 'The Main Hall', sub: 'Interior' },
    { id: 'photo-1559339352-11d035aa65de', cat: 'chef', title: 'Final Touches', sub: 'Chef Moment' },
    { id: 'photo-1551024709-8f23befc6f87', cat: 'food', title: 'Petit Dessert', sub: 'Pastry' },
    { id: 'photo-1424847651672-bf20a4b0982b', cat: 'interior', title: 'The Cellar', sub: 'Interior' },
    { id: 'photo-1470337458703-46ad1756a187', cat: 'food', title: 'Saffron Old Fashioned', sub: 'Bar' },
    { id: 'photo-1519225421980-715cb0215aed', cat: 'events', title: 'A Wedding', sub: 'Events' },
    { id: 'photo-1466637574441-749b8f19452f', cat: 'chef', title: 'On the Line', sub: 'Chef Moment' },
    { id: 'photo-1547592166-23ac45744acd', cat: 'food', title: 'Velouté', sub: 'Starters' },
    { id: 'photo-1530103862676-de8c9debad1d', cat: 'events', title: 'The Toast', sub: 'Events' },
    { id: 'photo-1414235077428-338989a2e8c0', cat: 'interior', title: 'Evening Service', sub: 'Interior' },
    { id: 'photo-1559737558-2f5a35f4523b', cat: 'food', title: 'Oyster Rockefeller', sub: 'Seafood' },
    { id: 'photo-1583394293214-28ded15ee548', cat: 'chef', title: 'The Sommelier', sub: 'Chef Moment' },
    { id: 'photo-1511795409834-ef04bbd61622', cat: 'events', title: 'Celebration', sub: 'Events' },
    { id: 'photo-1562007908-17c67e878c88', cat: 'food', title: 'Tarte Tatin', sub: 'Desserts' },
    { id: 'photo-1547573854-74d2a71d0826', cat: 'chef', title: 'From the Garden', sub: 'Chef Moment' },
    { id: 'photo-1600891964599-f61ba0e24092', cat: 'food', title: 'Composition', sub: 'The Pass' },
    { id: 'photo-1519167758481-83f550bb49b3', cat: 'interior', title: 'Garden Pavilion', sub: 'Interior' }
  ];

  const src = (id, w) => `https://images.unsplash.com/${id}?w=${w}&auto=format&fit=crop`;

  masonry.innerHTML = PHOTOS.map((p, i) =>
    `<a class="masonry-item" data-cat="${p.cat}" data-i="${i}" href="${src(p.id, 1400)}" aria-label="${p.title}">
       <img src="${src(p.id, 600)}" alt="${p.title}" loading="lazy" />
       <span class="m-cap"><span>${p.title}</span><small>${p.sub}</small></span>
     </a>`).join('');

  /* Filter */
  document.getElementById('galleryFilter').addEventListener('click', e => {
    const btn = e.target.closest('.menu-cat'); if (!btn) return;
    document.querySelectorAll('#galleryFilter .menu-cat').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    masonry.querySelectorAll('.masonry-item').forEach(item => {
      item.classList.toggle('hide', f !== 'all' && item.dataset.cat !== f);
    });
  });

  /* Lightbox */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  let visible = [];   // currently-shown indices
  let pos = 0;

  function currentVisible() {
    return [...masonry.querySelectorAll('.masonry-item:not(.hide)')].map(el => +el.dataset.i);
  }
  function show(i) {
    const p = PHOTOS[i];
    lbImg.src = src(p.id, 1400); lbImg.alt = p.title;
    lbCap.textContent = `${p.title} · ${p.sub}`;
  }
  function open(i) {
    visible = currentVisible();
    pos = visible.indexOf(i);
    show(i);
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
  function step(dir) { pos = (pos + dir + visible.length) % visible.length; show(visible[pos]); }

  masonry.addEventListener('click', e => {
    const item = e.target.closest('.masonry-item'); if (!item) return;
    e.preventDefault();
    open(+item.dataset.i);
  });
  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', () => step(-1));
  document.getElementById('lbNext').addEventListener('click', () => step(1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();
