/* ================================================================
   LUMIÈRE — menu.js
   Data-driven menu: render, search, category, dietary filter, sort.
   ================================================================ */
'use strict';

(function () {
  const grid = document.getElementById('dishes');
  if (!grid) return;

  /* -------- Dataset -------- */
  const DISHES = [
    { cat: 'starters', name: 'Osciètre Caviar & Crème Fraîche', price: 68, cal: 210, img: 'photo-1551218808-94e220e084d2',
      desc: '30g aged osciètre on hand-pressed buckwheat blinis with cultured crème fraîche and preserved lemon oil.',
      ingredients: 'Osciètre caviar · buckwheat · crème fraîche · lemon', allergens: 'Fish, Gluten, Dairy',
      pairing: 'Billecart-Salmon Brut Réserve', tags: ['signature'] },
    { cat: 'starters', name: 'White Asparagus Velouté', price: 28, cal: 240, img: 'photo-1547592166-23ac45744acd',
      desc: 'Silken velouté of Alsatian white asparagus, brown-butter emulsion, micro-herbs and a hen\'s egg yolk.',
      ingredients: 'White asparagus · brown butter · egg yolk', allergens: 'Egg, Dairy',
      pairing: 'Riesling Grand Cru, Alsace', tags: ['vegetarian'] },
    { cat: 'starters', name: 'Burrata & Black Truffle', price: 38, cal: 320, img: 'photo-1476124369491-e7addf5db371',
      desc: 'Hand-pulled Pugliese burrata with 5g black Périgord truffle, smoked hazelnut oil and aged balsamic.',
      ingredients: 'Burrata · black truffle · hazelnut · balsamic', allergens: 'Dairy, Nuts',
      pairing: 'Chardonnay, Meursault', tags: ['vegetarian', 'signature'] },
    { cat: 'seafood', name: 'Tuna & Avocado Tataki', price: 34, cal: 260, img: 'photo-1579584425555-c3ce17fd4351',
      desc: 'Line-caught bluefin lightly seared, Kyoto sesame dressing, shiso and crystallised ginger.',
      ingredients: 'Bluefin tuna · avocado · sesame · shiso', allergens: 'Fish, Sesame, Soy',
      pairing: 'Sancerre, Loire Valley', tags: ['chefs-pick'] },
    { cat: 'seafood', name: 'Langoustine Bisque', price: 42, cal: 310, img: 'photo-1565557623262-b51c2513a641',
      desc: 'Deeply reduced Scottish langoustine bisque, finished with cognac, tarragon cream and grilled sourdough.',
      ingredients: 'Langoustine · cognac · tarragon · cream', allergens: 'Shellfish, Gluten, Dairy',
      pairing: 'Chablis Premier Cru', tags: ['signature', 'chefs-pick'] },
    { cat: 'seafood', name: 'Oyster Rockefeller', price: 36, cal: 190, img: 'photo-1559737558-2f5a35f4523b',
      desc: 'Freshly shucked Irish rock oysters baked with herb butter, spinach and a gratin of aged parmesan.',
      ingredients: 'Rock oysters · spinach · parmesan · butter', allergens: 'Shellfish, Dairy',
      pairing: 'Muscadet Sèvre-et-Maine', tags: ['signature'] },
    { cat: 'mains', name: 'Beef Wellington for Two', price: 165, cal: 980, img: 'photo-1558030006-450675393462',
      desc: '28-day dry-aged Hereford fillet, duxelles of wild porcini and a gossamer puff pastry crust, carved tableside.',
      ingredients: 'Hereford beef · porcini · puff pastry', allergens: 'Gluten, Egg, Dairy',
      pairing: 'Pauillac, Bordeaux 2015', tags: ['signature'] },
    { cat: 'mains', name: 'Duck à l\'Orange Revisited', price: 58, cal: 720, img: 'photo-1545247181-516773cae754',
      desc: 'Aged Gressingham duck breast, smoked blood-orange reduction, Savoy cabbage confit and duck-fat pommes purée.',
      ingredients: 'Gressingham duck · blood orange · cabbage', allergens: 'Dairy',
      pairing: 'Pinot Noir, Nuits-Saint-Georges', tags: ['chefs-pick'] },
    { cat: 'mains', name: 'Côte de Veau Rôtie', price: 68, cal: 810, img: 'photo-1529692236671-f1f6cf9683ba',
      desc: 'Milk-fed Normandy veal rib, bone-in, with a vivid salsa verde, roasted white asparagus and pommes sarladaises.',
      ingredients: 'Normandy veal · salsa verde · asparagus', allergens: 'None',
      pairing: 'Saint-Émilion Grand Cru', tags: ['signature'] },
    { cat: 'seafood', name: 'Turbot en Croûte de Sel', price: 72, cal: 540, img: 'photo-1519708227418-c8fd9a32b7a2',
      desc: 'Whole Breton turbot baked in a herb salt crust, presented whole then filleted, with beurre blanc and capers.',
      ingredients: 'Breton turbot · herbs · beurre blanc', allergens: 'Fish, Dairy',
      pairing: 'Puligny-Montrachet', tags: ['chefs-pick'] },
    { cat: 'vegetarian', name: 'Mushroom & Chestnut Royale', price: 46, cal: 480, img: 'photo-1473093295043-cdd812d0e601',
      desc: 'Roasted girolles, chestnut cream, smoked celeriac and a deeply umami black-garlic jus.',
      ingredients: 'Girolles · chestnut · celeriac · black garlic', allergens: 'Nuts',
      pairing: 'Barolo, Piedmont', tags: ['vegan', 'chefs-pick'] },
    { cat: 'vegetarian', name: 'Truffle Risotto', price: 48, cal: 620, img: 'photo-1546069901-ba9599a7e63c',
      desc: 'Carnaroli risotto with black-truffle shavings, aged parmesan and a drizzle of aged balsamic.',
      ingredients: 'Carnaroli rice · black truffle · parmesan', allergens: 'Dairy',
      pairing: 'Barbaresco', tags: ['vegetarian', 'signature'] },
    { cat: 'vegetarian', name: 'Artichoke Barigoule', price: 30, cal: 280, img: 'photo-1512621776951-a57141f2eefd',
      desc: 'Braised artichokes in white wine and thyme, with olive oil, lemon zest and shaved pecorino.',
      ingredients: 'Artichoke · white wine · pecorino', allergens: 'Dairy, Sulphites',
      pairing: 'Vermentino, Sardinia', tags: ['vegetarian'] },
    { cat: 'desserts', name: 'Valrhona Soufflé', price: 22, cal: 430, img: 'photo-1541783245831-57d6fb0926d3',
      desc: 'Airy Guanaja 70% chocolate soufflé, risen to order, with a cold vanilla Chantilly poured tableside.',
      ingredients: 'Valrhona chocolate · egg · vanilla', allergens: 'Egg, Dairy, Gluten',
      pairing: 'Banyuls, Roussillon', tags: ['chefs-pick', 'signature'] },
    { cat: 'desserts', name: 'Tarte Tatin Déstructurée', price: 18, cal: 390, img: 'photo-1562007908-17c67e878c88',
      desc: 'Individual Reine de Reinette apple tart, caramelised in copper, with Calvados ice cream and feuilletine.',
      ingredients: 'Apple · caramel · Calvados · pastry', allergens: 'Gluten, Dairy',
      pairing: 'Coteaux du Layon', tags: [] },
    { cat: 'desserts', name: 'Crème Brûlée Parfumée', price: 16, cal: 350, img: 'photo-1470124182917-cc6e71b22ecc',
      desc: 'Vanilla-bean custard infused with lemon verbena, under a perfectly even caramelised sugar crust.',
      ingredients: 'Cream · vanilla · lemon verbena', allergens: 'Egg, Dairy',
      pairing: 'Sauternes, Château Rieussec', tags: ['gluten-free', 'signature'] },
    { cat: 'desserts', name: 'Raspberry & Rose Panna Cotta', price: 16, cal: 300, img: 'photo-1488477181946-6428a0291777',
      desc: 'Silky panna cotta with raspberry gel, rose-scented cream and fresh edible petals.',
      ingredients: 'Cream · raspberry · rose', allergens: 'Dairy',
      pairing: 'Moscato d\'Asti', tags: ['gluten-free', 'chefs-pick'] },
    { cat: 'cocktails', name: 'Saffron Old Fashioned', price: 24, cal: 220, img: 'photo-1470337458703-46ad1756a187',
      desc: 'Bourbon infused with Kashmiri saffron, house demerara syrup, Angostura and a flamed orange zest.',
      ingredients: 'Bourbon · saffron · demerara · bitters', allergens: 'None',
      pairing: 'Serve before dinner', tags: ['chefs-pick', 'signature'] },
    { cat: 'cocktails', name: 'Noir & Or Espresso', price: 14, cal: 180, img: 'photo-1461023058943-07fcbe16d735',
      desc: 'A theatrical double espresso cocktail with Kahlúa, crème de cacao and a 24-carat gold-dust finish.',
      ingredients: 'Espresso · Kahlúa · crème de cacao · gold', allergens: 'Dairy',
      pairing: 'After dessert', tags: ['signature'] },
    { cat: 'cocktails', name: 'Lavender Bee\'s Knees', price: 20, cal: 190, img: 'photo-1495474472287-4d71bcdd2085',
      desc: 'Gin, lavender-infused honey, fresh lemon juice and edible flowers, shaken over ice.',
      ingredients: 'Gin · lavender honey · lemon', allergens: 'None',
      pairing: 'An aperitif in the lounge', tags: [] },
    { cat: 'drinks', name: 'Rosé Water Kefir', price: 12, cal: 60, img: 'photo-1544145945-f90425340c7e',
      desc: 'House-fermented rose-petal kefir, lightly effervescent, with Himalayan raspberry and lychee essence.',
      ingredients: 'Water kefir · rose · raspberry · lychee', allergens: 'None',
      pairing: 'Non-alcoholic', tags: ['vegan', 'gluten-free'] },
    { cat: 'drinks', name: 'Hibiscus Cooler', price: 14, cal: 70, img: 'photo-1488477181946-6428a0291777',
      desc: 'House-brewed hibiscus tea with fresh lime, agave nectar and a splash of sparkling water.',
      ingredients: 'Hibiscus · lime · agave', allergens: 'None',
      pairing: 'Non-alcoholic', tags: ['vegan', 'gluten-free'] },
    { cat: 'wine', name: 'Champagne Brut Réserve', price: 28, cal: 90, img: 'photo-1569529465841-dfecdab7503b',
      desc: 'House Billecart-Salmon by the glass — crisp, precise, and the perfect overture to any evening.',
      ingredients: 'Chardonnay · Pinot Noir · Pinot Meunier', allergens: 'Sulphites',
      pairing: 'Caviar & oysters', tags: ['signature'] },
    { cat: 'wine', name: 'Côtes du Rhône Blanc', price: 16, cal: 120, img: 'photo-1510812431401-41d2bd2722f3',
      desc: 'Domaine de la Mordorée La Dame Rousse — complex, mineral, with white peach and garrigue.',
      ingredients: 'Grenache Blanc · Viognier · Roussanne', allergens: 'Sulphites',
      pairing: 'Turbot & white meats', tags: ['chefs-pick'] },
    { cat: 'wine', name: 'Pauillac Grand Cru 2015', price: 46, cal: 125, img: 'photo-1553361371-9b22f78e8b1d',
      desc: 'A structured, cassis-driven left-bank Bordeaux from an exceptional vintage. By the glass or bottle.',
      ingredients: 'Cabernet Sauvignon · Merlot', allergens: 'Sulphites',
      pairing: 'Beef Wellington & veal', tags: ['signature'] }
  ];

  const IMG = id => `https://images.unsplash.com/${id}?w=320&h=320&fit=crop&auto=format`;

  const state = { cat: 'all', filters: new Set(), search: '', sort: 'default' };

  /* -------- Render -------- */
  function tagLabel(t) { return { 'signature': 'Signature', 'chefs-pick': "Chef's Pick", 'vegetarian': 'Vegetarian', 'vegan': 'Vegan', 'gluten-free': 'Gluten-free' }[t] || t; }

  function cardHTML(d, i) {
    const tags = d.tags.map(t => `<span class="tag">${tagLabel(t)}</span>`).join('');
    return `<article class="dish" style="transition-delay:${Math.min(i, 8) * 0.04}s" data-name="${d.name.toLowerCase()}" data-ingredients="${d.ingredients.toLowerCase()}">
      <div class="dish-img"><img src="${IMG(d.img)}" alt="${d.name}" loading="lazy" /></div>
      <div class="dish-body">
        <div class="dish-top"><h3 class="dish-name">${d.name}</h3><span class="dish-price serif">£${d.price}</span></div>
        <p class="dish-desc">${d.desc}</p>
        <div class="dish-meta">
          <span><b>Ingredients</b><br>${d.ingredients}</span>
          <span><b>Calories</b><br>${d.cal} kcal</span>
        </div>
        ${tags ? `<div class="dish-tags">${tags}</div>` : ''}
        <div class="dish-allergens">Allergens: ${d.allergens}</div>
        <div class="dish-pairing">Pairs with ${d.pairing}</div>
      </div>
    </article>`;
  }

  function apply() {
    let list = DISHES.slice();
    if (state.cat !== 'all') list = list.filter(d => d.cat === state.cat);
    if (state.filters.size) list = list.filter(d => [...state.filters].every(f => d.tags.includes(f)));
    if (state.search) {
      const q = state.search.toLowerCase();
      list = list.filter(d => d.name.toLowerCase().includes(q) || d.ingredients.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q));
    }
    switch (state.sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'name': list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'cal-asc': list.sort((a, b) => a.cal - b.cal); break;
    }
    grid.innerHTML = list.map(cardHTML).join('');
    document.getElementById('menuEmpty').classList.toggle('show', list.length === 0);
    requestAnimationFrame(() => grid.querySelectorAll('.dish').forEach(el => el.classList.add('in')));
  }

  /* -------- Events -------- */
  document.getElementById('menuCats').addEventListener('click', e => {
    const btn = e.target.closest('.menu-cat'); if (!btn) return;
    document.querySelectorAll('.menu-cat').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
    state.cat = btn.dataset.cat; apply();
  });
  document.getElementById('menuFilters').addEventListener('click', e => {
    const btn = e.target.closest('.menu-filter'); if (!btn) return;
    const f = btn.dataset.filter;
    if (state.filters.has(f)) { state.filters.delete(f); btn.classList.remove('active'); }
    else { state.filters.add(f); btn.classList.add('active'); }
    apply();
  });
  const search = document.getElementById('menuSearch');
  let deb; search.addEventListener('input', () => { clearTimeout(deb); deb = setTimeout(() => { state.search = search.value.trim(); apply(); }, 160); });
  document.getElementById('menuSort').addEventListener('change', e => { state.sort = e.target.value; apply(); });

  /* -------- Deep-link to category via hash (#mains etc.) -------- */
  const hash = location.hash.slice(1);
  if (hash) {
    const btn = document.querySelector(`.menu-cat[data-cat="${hash}"]`);
    if (btn) { document.querySelectorAll('.menu-cat').forEach(b => b.classList.remove('active')); btn.classList.add('active'); state.cat = hash; }
  }

  apply();
})();
