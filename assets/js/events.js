/* ================================================================
   LUMIÈRE — events.js
   Renders event cards from data and opens a detail modal.
   ================================================================ */
'use strict';

(function () {
  const list = document.getElementById('eventList');
  if (!list) return;

  const EVENTS = [
    { d: '18', m: 'Jul', title: 'Grand Cru Tasting', type: 'Wine Tasting', time: '19:00', seats: '8 seats left', price: '£220',
      img: 'photo-1510812431401-41d2bd2722f3',
      desc: 'A guided journey through Burgundy\'s greatest terroirs, led by head sommelier Marguerite Vidal. Six grands crus, six canapés, one unforgettable evening in the cellar.' },
    { d: '02', m: 'Aug', title: "Chef's Table Night", type: "Chef's Night", time: '20:00', seats: 'Waitlist only', price: '£380',
      img: 'photo-1466637574441-749b8f19452f',
      desc: 'Twelve guests, one counter, and Antoine cooking an off-menu tasting inches from your seat. The most intimate way to experience Lumière.' },
    { d: '16', m: 'Aug', title: 'Summer Garden Series', type: 'Seasonal Experience', time: '18:30', seats: '20 seats left', price: '£145',
      img: 'photo-1414235077428-338989a2e8c0',
      desc: 'An al-fresco menu celebrating the height of summer produce, served in our glass pavilion as the light fades over the garden.' },
    { d: '30', m: 'Aug', title: 'Jazz & Champagne', type: 'Live Music', time: '21:00', seats: '30 seats left', price: '£95',
      img: 'photo-1511192336575-5a79af67a629',
      desc: 'A late-night session of live jazz paired with grower champagnes and a flight of savoury bites from the pastry team.' },
    { d: '12', m: 'Sep', title: 'Truffle & Terroir', type: 'Seasonal Experience', time: '19:30', seats: '10 seats left', price: '£260',
      img: 'photo-1476124369491-e7addf5db371',
      desc: 'The first white truffles of the season, shaved tableside across a five-course menu built to showcase their perfume.' },
    { d: '27', m: 'Sep', title: 'Harvest Winemaker Dinner', type: 'Wine Tasting', time: '19:00', seats: '14 seats left', price: '£240',
      img: 'photo-1524594152303-9fd13543fe6e',
      desc: 'A visiting winemaker from the Rhône hosts a five-course dinner paired with library vintages you won\'t find on any list.' }
  ];

  const IMG = (id, w, h) => `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;
  const clock = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" stroke-linecap="round"/></svg>`;
  const tagI = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 12l9-9 9 9-9 9z" stroke-linejoin="round"/></svg>`;

  list.innerHTML = EVENTS.map((e, i) => `
    <article class="event-card reveal${i % 2 ? ' reveal-delay-1' : ''}" data-i="${i}">
      <div class="event-media"><img src="${IMG(e.img, 500, 400)}" alt="${e.title}" loading="lazy" />
        <div class="event-date"><span class="d serif">${e.d}</span><span class="m">${e.m}</span></div></div>
      <div class="event-info">
        <h3 class="serif">${e.title}</h3>
        <p>${e.desc}</p>
        <div class="event-meta"><span>${tagI}${e.type}</span><span>${clock}${e.time}</span><span>${e.seats}</span></div>
      </div>
      <div class="event-cta"><span class="event-price serif">${e.price}</span><button class="btn-primary" data-open="${i}">Details</button></div>
    </article>`).join('');

  // reveal
  const io = new IntersectionObserver(es => es.forEach(x => x.isIntersecting && (x.target.classList.add('visible'), io.unobserve(x.target))), { threshold: 0.1 });
  list.querySelectorAll('.reveal').forEach(el => io.observe(el));

  list.addEventListener('click', ev => {
    const btn = ev.target.closest('[data-open]'); if (!btn) return;
    const e = EVENTS[+btn.dataset.open];
    document.getElementById('emImg').src = IMG(e.img, 700, 400);
    document.getElementById('emImg').alt = e.title;
    document.getElementById('emDate').textContent = `${e.d} ${e.m} · ${e.time}`;
    document.getElementById('emTitle').textContent = e.title;
    document.getElementById('emDesc').textContent = e.desc;
    document.getElementById('emMeta').innerHTML = `<span>${tagI}${e.type}</span><span>${clock}${e.time}</span><span>${e.seats}</span>`;
    document.getElementById('emPrice').textContent = e.price + ' per guest';
    LumModal.open('eventModal');
  });
})();
