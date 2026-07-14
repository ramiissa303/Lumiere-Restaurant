/* ================================================================
   LUMIÈRE — reservations.js
   Airline-style multi-step booking wizard + interactive floor map.
   ================================================================ */
'use strict';

(function () {
  const shell = document.querySelector('.wpanel-shell');
  if (!shell) return;

  const TOTAL = 8;
  const state = {
    step: 1, date: null, time: null, guests: 2,
    area: null, table: null, occasion: [], diet: [], notes: '',
    fname: '', lname: '', email: '', phone: ''
  };

  const $ = id => document.getElementById(id);
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const fmtDate = d => d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  /* ---------------- STEP 1 · CALENDAR ---------------- */
  let calView = new Date(); calView.setDate(1);
  const today = new Date(); today.setHours(0, 0, 0, 0);

  (function dows() {
    $('calDows').innerHTML = ['Mo','Tu','We','Th','Fr','Sa','Su'].map(d => `<div class="cal-dow">${d}</div>`).join('');
  })();

  function renderCal() {
    $('calTitle').textContent = `${monthNames[calView.getMonth()]} ${calView.getFullYear()}`;
    const year = calView.getFullYear(), month = calView.getMonth();
    const first = new Date(year, month, 1);
    let startDow = (first.getDay() + 6) % 7; // Monday-first
    const days = new Date(year, month + 1, 0).getDate();
    let html = '';
    for (let i = 0; i < startDow; i++) html += '<div class="cal-day empty"></div>';
    for (let d = 1; d <= days; d++) {
      const date = new Date(year, month, d);
      const dow = date.getDay();
      const isPast = date < today;
      const isClosed = dow === 0 || dow === 1; // Sun/Mon closed
      const disabled = isPast || isClosed;
      const sel = state.date && date.toDateString() === state.date.toDateString();
      html += `<button class="cal-day${sel ? ' selected' : ''}" ${disabled ? 'disabled' : ''} data-day="${d}">${d}</button>`;
    }
    $('calDays').innerHTML = html;
  }
  $('calPrev').addEventListener('click', () => { calView.setMonth(calView.getMonth() - 1); renderCal(); });
  $('calNext').addEventListener('click', () => { calView.setMonth(calView.getMonth() + 1); renderCal(); });
  $('calDays').addEventListener('click', e => {
    const btn = e.target.closest('.cal-day'); if (!btn || btn.disabled) return;
    state.date = new Date(calView.getFullYear(), calView.getMonth(), +btn.dataset.day);
    renderCal(); updateNav();
  });
  renderCal();

  /* ---------------- STEP 2 · TIME ---------------- */
  const TIMES = [
    { t: '18:00', label: 'Early' }, { t: '18:30' }, { t: '19:00' }, { t: '19:30' },
    { t: '20:00', label: 'Prime', soldOut: false }, { t: '20:30' }, { t: '21:00' }, { t: '21:30', label: 'Late' }
  ];
  // pseudo-random sold-out for realism
  const soldOut = new Set(['19:30', '20:30']);
  $('timeGrid').innerHTML = TIMES.map(x =>
    `<button class="time-slot" data-time="${x.t}" ${soldOut.has(x.t) ? 'disabled' : ''}>${x.t}${x.label ? `<small>${x.label}</small>` : ''}</button>`
  ).join('');
  $('timeGrid').addEventListener('click', e => {
    const btn = e.target.closest('.time-slot'); if (!btn || btn.disabled) return;
    document.querySelectorAll('.time-slot').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected'); state.time = btn.dataset.time; updateNav();
  });

  /* ---------------- STEP 3 · GUESTS ---------------- */
  function renderGuests() {
    $('guestCount').textContent = state.guests;
    const notes = { 1: 'An intimate table for one.', 2: 'A table for two.' };
    let n = notes[state.guests] || `A party of ${state.guests}.`;
    if (state.guests >= 7) n = 'Parties of 7+ are hosted in our private dining rooms.';
    $('guestNote').textContent = n;
    $('guestMinus').disabled = state.guests <= 1;
    $('guestPlus').disabled = state.guests >= 12;
  }
  $('guestMinus').addEventListener('click', () => { if (state.guests > 1) { state.guests--; renderGuests(); } });
  $('guestPlus').addEventListener('click', () => { if (state.guests < 12) { state.guests++; renderGuests(); } });
  renderGuests();

  /* ---------------- STEP 4 · AREAS ---------------- */
  const AREAS = [
    { id: 'main', name: 'Main Hall', cap: 'Up to 6 · lively', img: 'photo-1517248135467-4c7edcad34c4' },
    { id: 'window', name: 'Window Seating', cap: 'Up to 4 · street views', img: 'photo-1424847651672-bf20a4b0982b' },
    { id: 'private', name: 'Private Room', cap: '6–18 · exclusive', img: 'photo-1600891964599-f61ba0e24092' },
    { id: 'chef', name: "Chef's Table", cap: 'Up to 8 · the pass', img: 'photo-1466637574441-749b8f19452f' },
    { id: 'terrace', name: 'Outdoor Terrace', cap: 'Up to 6 · seasonal', img: 'photo-1414235077428-338989a2e8c0' },
    { id: 'vip', name: 'VIP Lounge', cap: 'Up to 10 · intimate', img: 'photo-1559339352-11d035aa65de' }
  ];
  $('areaGrid').innerHTML = AREAS.map(a =>
    `<button type="button" class="area-card" data-area="${a.id}" data-name="${a.name}">
       <img src="https://images.unsplash.com/${a.img}?w=400&h=300&fit=crop&auto=format" alt="${a.name}" loading="lazy" />
       <span class="area-card__check"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12l5 5L20 7" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
       <span class="area-card__body"><h4 class="serif">${a.name}</h4><span class="area-card__cap">${a.cap}</span></span>
     </button>`
  ).join('');
  $('areaGrid').addEventListener('click', e => {
    const card = e.target.closest('.area-card'); if (!card) return;
    document.querySelectorAll('.area-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    state.area = card.dataset.name; state.table = null;
    buildFloor(); updateNav();
  });

  /* ---------------- STEP 5 · FLOOR MAP ---------------- */
  function buildFloor() {
    $('floorHint').innerHTML = `Choose an available table in the <b>${state.area || 'Main Hall'}</b>. Reserved tables are shown crossed out.`;
    // Generate a pseudo layout: positions in %, capacity, some reserved
    const layout = [
      { id: 'T1', x: 18, y: 18, cap: 2, r: false }, { id: 'T2', x: 40, y: 15, cap: 2, r: true },
      { id: 'T3', x: 62, y: 18, cap: 4, r: false }, { id: 'T4', x: 84, y: 20, cap: 2, r: false, round: true },
      { id: 'T5', x: 16, y: 45, cap: 4, r: false }, { id: 'T6', x: 40, y: 44, cap: 6, r: true },
      { id: 'T7', x: 66, y: 46, cap: 2, r: false, round: true }, { id: 'T8', x: 86, y: 48, cap: 4, r: false },
      { id: 'T9', x: 20, y: 76, cap: 2, r: false, round: true }, { id: 'T10', x: 44, y: 78, cap: 8, r: false },
      { id: 'T11', x: 70, y: 76, cap: 2, r: true, round: true }, { id: 'T12', x: 88, y: 78, cap: 4, r: false }
    ];
    // realistic: hide tables smaller than party size only when big party
    $('tables').innerHTML = layout.map(t => {
      const tooSmall = t.cap < state.guests;
      const reserved = t.r || tooSmall;
      const size = 34 + t.cap * 4;
      return `<button type="button" class="table-seat${t.round ? ' round' : ''}${reserved ? ' reserved' : ''}" ${reserved ? 'disabled' : ''}
        style="left:${t.x}%;top:${t.y}%;width:${size}px;height:${size}px" data-id="${t.id}" data-cap="${t.cap}" aria-label="Table ${t.id}, seats ${t.cap}${reserved ? ', reserved' : ''}">
        <b>${t.id}</b><small>${t.cap}p</small></button>`;
    }).join('');
  }
  buildFloor();
  $('tables').addEventListener('click', e => {
    const seat = e.target.closest('.table-seat'); if (!seat || seat.disabled) return;
    document.querySelectorAll('.table-seat').forEach(s => s.classList.remove('selected'));
    seat.classList.add('selected');
    state.table = seat.dataset.id;
    $('tableDetail').innerHTML = `<h5>Table ${seat.dataset.id}</h5><p>Seats up to ${seat.dataset.cap} · ${state.area || 'Main Hall'} · a lovely position in the room.</p>`;
    updateNav();
  });

  /* ---------------- STEP 6 · REQUESTS ---------------- */
  function chipGroup(id, key) {
    $(id).addEventListener('click', e => {
      const chip = e.target.closest('.chip'); if (!chip) return;
      chip.classList.toggle('selected');
      const val = chip.dataset.val;
      const arr = state[key];
      const i = arr.indexOf(val);
      if (i === -1) arr.push(val); else arr.splice(i, 1);
    });
  }
  chipGroup('occasionChips', 'occasion');
  chipGroup('dietChips', 'diet');

  /* ---------------- STEP 7 · DETAILS ---------------- */
  function validateDetails() {
    const fields = [['fname'], ['lname'], ['gemail', 'email'], ['gphone']];
    let ok = true;
    fields.forEach(([id]) => {
      const el = $(id); const v = el.value.trim();
      let bad = !v;
      if (id === 'gemail' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) bad = true;
      el.classList.toggle('invalid', bad);
      if (bad) ok = false;
    });
    return ok;
  }

  /* ---------------- STEP 8 · SUMMARY ---------------- */
  function renderSummary() {
    state.fname = $('fname').value.trim(); state.lname = $('lname').value.trim();
    state.email = $('gemail').value.trim(); state.phone = $('gphone').value.trim();
    state.notes = $('notes').value.trim();
    const rows = [
      ['Date', state.date ? fmtDate(state.date) : '—'],
      ['Time', state.time || '—'],
      ['Guests', state.guests],
      ['Area', state.area || '—'],
      ['Table', state.table || '—'],
      ['Occasion', state.occasion.length ? state.occasion.join(', ') : '—'],
      ['Dietary', state.diet.length ? state.diet.join(', ') : 'None noted'],
      ['Name', `${state.fname} ${state.lname}`.trim() || '—'],
      ['Email', state.email || '—'],
      ['Phone', state.phone || '—']
    ];
    if (state.notes) rows.push(['Notes', state.notes]);
    $('summary').innerHTML = rows.map(([k, v]) => `<div class="summary-row"><dt>${k}</dt><dd>${v}</dd></div>`).join('');
  }

  /* ---------------- WIZARD NAV ---------------- */
  const stepValid = {
    1: () => !!state.date,
    2: () => !!state.time,
    3: () => true,
    4: () => !!state.area,
    5: () => !!state.table,
    6: () => true,
    7: () => validateDetails(),
    8: () => true
  };

  function showStep(n) {
    state.step = n;
    document.querySelectorAll('.wpanel').forEach(p => p.classList.toggle('active', +p.dataset.panel === n));
    document.querySelectorAll('.wstep').forEach(s => {
      const sn = +s.dataset.step;
      s.classList.toggle('active', sn === n);
      s.classList.toggle('done', sn < n);
    });
    $('wizPrev').classList.toggle('hidden-btn', n === 1);
    const next = $('wizNext');
    if (n === TOTAL) { next.innerHTML = 'Confirm Reservation'; }
    else if (n === 7) { next.innerHTML = 'Review'; }
    else { next.innerHTML = 'Continue <span class="btn-icon" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'; }
    if (n === 8) renderSummary();
    shell.scrollIntoView({ behavior: 'smooth', block: 'start' });
    updateNav();
  }

  function updateNav() {
    const valid = stepValid[state.step] ? stepValid[state.step]() : true;
    $('wizNext').disabled = state.step < 7 ? !valid : false;
  }

  $('wizPrev').addEventListener('click', () => { if (state.step > 1) showStep(state.step - 1); });
  $('wizNext').addEventListener('click', () => {
    if (!stepValid[state.step]()) { updateNav(); return; }
    if (state.step < TOTAL) { showStep(state.step + 1); return; }
    // Final confirm
    const ref = 'LUM-' + Math.floor(100000 + Math.random() * 900000);
    $('bookingRef').textContent = ref;
    $('summaryView').style.display = 'none';
    $('confirmedView').style.display = 'block';
    $('wizNext').style.display = $('wizPrev').style.display = 'none';
    document.querySelectorAll('.wstep').forEach(s => s.classList.add('done'));
  });

  // Allow clicking a completed step to jump back
  $('wizardSteps').addEventListener('click', e => {
    const li = e.target.closest('.wstep'); if (!li) return;
    const n = +li.dataset.step;
    if (n < state.step) showStep(n);
  });

  showStep(1);
})();
