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
    { cat: 'starters', name: 'Osciètre Caviar & Crème Fraîche', price: 68, cal: 210, img: 'photo-1770802824762-ade41bb50a07',
      desc: '30g aged osciètre on hand-pressed buckwheat blinis with cultured crème fraîche and preserved lemon oil.',
      ingredients: 'Osciètre caviar · buckwheat · crème fraîche · lemon', allergens: 'Fish, Gluten, Dairy',
      pairing: 'Billecart-Salmon Brut Réserve', tags: ['signature'] },
    { cat: 'starters', name: 'White Asparagus Velouté', price: 28, cal: 240, img: 'photo-1636044989956-6eb5031017ce',
      desc: 'Silken velouté of Alsatian white asparagus, brown-butter emulsion, micro-herbs and a hen\'s egg yolk.',
      ingredients: 'White asparagus · brown butter · egg yolk', allergens: 'Egg, Dairy',
      pairing: 'Riesling Grand Cru, Alsace', tags: ['vegetarian'] },
    { cat: 'starters', name: 'Burrata & Black Truffle', price: 38, cal: 320, img: 'photo-1596924699736-be026ddb5b0c',
      desc: 'Hand-pulled Pugliese burrata with 5g black Périgord truffle, smoked hazelnut oil and aged balsamic.',
      ingredients: 'Burrata · black truffle · hazelnut · balsamic', allergens: 'Dairy, Nuts',
      pairing: 'Chardonnay, Meursault', tags: ['vegetarian', 'signature'] },
    { cat: 'seafood', name: 'Tuna & Avocado Tataki', price: 34, cal: 260, img: 'photo-1579584425555-c3ce17fd4351',
      desc: 'Line-caught bluefin lightly seared, Kyoto sesame dressing, shiso and crystallised ginger.',
      ingredients: 'Bluefin tuna · avocado · sesame · shiso', allergens: 'Fish, Sesame, Soy',
      pairing: 'Sancerre, Loire Valley', tags: ['chefs-pick'] },
    { cat: 'seafood', name: 'Langoustine Bisque', price: 42, cal: 310, img: 'photo-1741315034217-33e3438b205f',
      desc: 'Deeply reduced Scottish langoustine bisque, finished with cognac, tarragon cream and grilled sourdough.',
      ingredients: 'Langoustine · cognac · tarragon · cream', allergens: 'Shellfish, Gluten, Dairy',
      pairing: 'Chablis Premier Cru', tags: ['signature', 'chefs-pick'] },
    { cat: 'seafood', name: 'Oyster Rockefeller', price: 36, cal: 190, img: 'photo-1700913281386-e2cfc713f117',
      desc: 'Freshly shucked Irish rock oysters baked with herb butter, spinach and a gratin of aged parmesan.',
      ingredients: 'Rock oysters · spinach · parmesan · butter', allergens: 'Shellfish, Dairy',
      pairing: 'Muscadet Sèvre-et-Maine', tags: ['signature'] },
    { cat: 'mains', name: 'Beef Wellington for Two', price: 165, cal: 980, img: 'photo-1675718341348-65224936b742',
      desc: '28-day dry-aged Hereford fillet, duxelles of wild porcini and a gossamer puff pastry crust, carved tableside.',
      ingredients: 'Hereford beef · porcini · puff pastry', allergens: 'Gluten, Egg, Dairy',
      pairing: 'Pauillac, Bordeaux 2015', tags: ['signature'] },
    { cat: 'mains', name: 'Duck à l\'Orange Revisited', price: 58, cal: 720, img: 'photo-1577271141104-b6bd7b76b8e9',
      desc: 'Aged Gressingham duck breast, smoked blood-orange reduction, Savoy cabbage confit and duck-fat pommes purée.',
      ingredients: 'Gressingham duck · blood orange · cabbage', allergens: 'Dairy',
      pairing: 'Pinot Noir, Nuits-Saint-Georges', tags: ['chefs-pick'] },
    { cat: 'mains', name: 'Côte de Veau Rôtie', price: 68, cal: 810, img: 'photo-1529692236671-f1f6cf9683ba',
      desc: 'Milk-fed Normandy veal rib, bone-in, with a vivid salsa verde, roasted white asparagus and pommes sarladaises.',
      ingredients: 'Normandy veal · salsa verde · asparagus', allergens: 'None',
      pairing: 'Saint-Émilion Grand Cru', tags: ['signature'] },
    { cat: 'seafood', name: 'Turbot en Croûte de Sel', price: 72, cal: 540, img: 'photo-1656389863625-59de2275fb7e',
      desc: 'Whole Breton turbot baked in a herb salt crust, presented whole then filleted, with beurre blanc and capers.',
      ingredients: 'Breton turbot · herbs · beurre blanc', allergens: 'Fish, Dairy',
      pairing: 'Puligny-Montrachet', tags: ['chefs-pick'] },
    { cat: 'vegetarian', name: 'Mushroom & Chestnut Royale', price: 46, cal: 480, img: 'photo-1595908129746-57ca1a63dd4d',
      desc: 'Roasted girolles, chestnut cream, smoked celeriac and a deeply umami black-garlic jus.',
      ingredients: 'Girolles · chestnut · celeriac · black garlic', allergens: 'Nuts',
      pairing: 'Barolo, Piedmont', tags: ['vegan', 'chefs-pick'] },
    { cat: 'vegetarian', name: 'Truffle Risotto', price: 48, cal: 620, img: 'photo-1682428617976-f25633ed8469',
      desc: 'Carnaroli risotto with black-truffle shavings, aged parmesan and a drizzle of aged balsamic.',
      ingredients: 'Carnaroli rice · black truffle · parmesan', allergens: 'Dairy',
      pairing: 'Barbaresco', tags: ['vegetarian', 'signature'] },
    { cat: 'vegetarian', name: 'Artichoke Barigoule', price: 30, cal: 280, img: 'photo-1615368255396-752c69784041',
      desc: 'Braised artichokes in white wine and thyme, with olive oil, lemon zest and shaved pecorino.',
      ingredients: 'Artichoke · white wine · pecorino', allergens: 'Dairy, Sulphites',
      pairing: 'Vermentino, Sardinia', tags: ['vegetarian'] },
    { cat: 'desserts', name: 'Valrhona Soufflé', price: 22, cal: 430, img: 'photo-1617305855058-336d24456869',
      desc: 'Airy Guanaja 70% chocolate soufflé, risen to order, with a cold vanilla Chantilly poured tableside.',
      ingredients: 'Valrhona chocolate · egg · vanilla', allergens: 'Egg, Dairy, Gluten',
      pairing: 'Banyuls, Roussillon', tags: ['chefs-pick', 'signature'] },
    { cat: 'desserts', name: 'Tarte Tatin Déstructurée', price: 18, cal: 390, img: 'photo-1562007908-17c67e878c88',
      desc: 'Individual Reine de Reinette apple tart, caramelised in copper, with Calvados ice cream and feuilletine.',
      ingredients: 'Apple · caramel · Calvados · pastry', allergens: 'Gluten, Dairy',
      pairing: 'Coteaux du Layon', tags: [] },
    { cat: 'desserts', name: 'Crème Brûlée Parfumée', price: 16, cal: 350, img: 'photo-1554371650-1f19f803c220',
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
    { cat: 'cocktails', name: 'Lavender Bee\'s Knees', price: 20, cal: 190, img: 'photo-1551538827-9c037cb4f32a',
      desc: 'Gin, lavender-infused honey, fresh lemon juice and edible flowers, shaken over ice.',
      ingredients: 'Gin · lavender honey · lemon', allergens: 'None',
      pairing: 'An aperitif in the lounge', tags: [] },
    { cat: 'drinks', name: 'Rosé Water Kefir', price: 12, cal: 60, img: 'photo-1622990628493-249cca6603e9',
      desc: 'House-fermented rose-petal kefir, lightly effervescent, with Himalayan raspberry and lychee essence.',
      ingredients: 'Water kefir · rose · raspberry · lychee', allergens: 'None',
      pairing: 'Non-alcoholic', tags: ['vegan', 'gluten-free'] },
    { cat: 'drinks', name: 'Hibiscus Cooler', price: 14, cal: 70, img: 'photo-1499638673689-79a0b5115d87',
      desc: 'House-brewed hibiscus tea with fresh lime, agave nectar and a splash of sparkling water.',
      ingredients: 'Hibiscus · lime · agave', allergens: 'None',
      pairing: 'Non-alcoholic', tags: ['vegan', 'gluten-free'] },
    { cat: 'wine', name: 'Champagne Brut Réserve', price: 28, cal: 90, img: 'photo-1621866908556-4f0a830707c9',
      desc: 'House Billecart-Salmon by the glass — crisp, precise, and the perfect overture to any evening.',
      ingredients: 'Chardonnay · Pinot Noir · Pinot Meunier', allergens: 'Sulphites',
      pairing: 'Caviar & oysters', tags: ['signature'] },
    { cat: 'wine', name: 'Côtes du Rhône Blanc', price: 16, cal: 120, img: 'photo-1585553616435-2dc0a54e271d',
      desc: 'Domaine de la Mordorée La Dame Rousse — complex, mineral, with white peach and garrigue.',
      ingredients: 'Grenache Blanc · Viognier · Roussanne', allergens: 'Sulphites',
      pairing: 'Turbot & white meats', tags: ['chefs-pick'] },
    { cat: 'wine', name: 'Pauillac Grand Cru 2015', price: 46, cal: 125, img: 'photo-1553361371-9b22f78e8b1d',
      desc: 'A structured, cassis-driven left-bank Bordeaux from an exceptional vintage. By the glass or bottle.',
      ingredients: 'Cabernet Sauvignon · Merlot', allergens: 'Sulphites',
      pairing: 'Beef Wellington & veal', tags: ['signature'] },

    /* -------- Additional selections -------- */
    { cat: 'starters', name: 'Foie Gras au Torchon', price: 44, cal: 480, img: 'photo-1758972574371-57cf8c42bae8',
      desc: 'Silky Périgord foie gras poached in Sauternes, with toasted brioche, fig compote and Maldon salt.',
      ingredients: 'Foie gras · Sauternes · fig · brioche', allergens: 'Gluten',
      pairing: 'Sauternes, Château d\'Yquem', tags: ['signature'] },
    { cat: 'starters', name: 'Escargots à la Bourguignonne', price: 26, cal: 320, img: 'photo-1585684278104-4eee6e8b542f',
      desc: 'Six Burgundy snails baked in their shells with garlic-parsley butter and a whisper of Pernod.',
      ingredients: 'Burgundy snails · garlic · parsley · butter', allergens: 'Molluscs, Dairy',
      pairing: 'Bourgogne Aligoté', tags: ['chefs-pick'] },
    { cat: 'seafood', name: 'Seared Hokkaido Scallops', price: 44, cal: 280, img: 'photo-1650288016253-c1ec87f7c0ea',
      desc: 'Hand-dived scallops caramelised in brown butter, with cauliflower purée, pancetta crumb and apple.',
      ingredients: 'Scallops · cauliflower · pancetta · apple', allergens: 'Shellfish, Dairy',
      pairing: 'Chablis Premier Cru', tags: ['chefs-pick', 'signature'] },
    { cat: 'seafood', name: 'Lobster Thermidor', price: 78, cal: 610, img: 'photo-1707995546402-5057206e5161',
      desc: 'Native blue lobster grilled in a cognac-mustard cream, gratinéed with aged Gruyère.',
      ingredients: 'Blue lobster · cognac · mustard · Gruyère', allergens: 'Shellfish, Dairy, Mustard',
      pairing: 'Meursault, Côte de Beaune', tags: ['signature'] },
    { cat: 'mains', name: 'Herb-Crusted Rack of Lamb', price: 62, cal: 720, img: 'photo-1692106914421-e04e1066bd62',
      desc: 'Roasted rack of new-season lamb in a Dijon-herb crust, with confit shoulder, peas and mint jus.',
      ingredients: 'Lamb · Dijon · herbs · mint', allergens: 'Mustard',
      pairing: 'Châteauneuf-du-Pape', tags: ['chefs-pick'] },
    { cat: 'mains', name: 'Coq au Vin', price: 52, cal: 690, img: 'photo-1603496987351-f84a3ba5ec85',
      desc: 'Free-range cockerel slow-braised in Burgundy red with lardons, pearl onions and wild mushrooms.',
      ingredients: 'Cockerel · red wine · lardons · mushroom', allergens: 'Sulphites',
      pairing: 'Gevrey-Chambertin', tags: [] },
    { cat: 'vegetarian', name: 'Ratatouille Confite', price: 32, cal: 300, img: 'photo-1572453800999-e8d2d1589b7c',
      desc: 'Provençal ratatouille of slow-confit courgette, aubergine and heritage tomato on a basil coulis.',
      ingredients: 'Courgette · aubergine · tomato · basil', allergens: 'None',
      pairing: 'Bandol Rosé, Provence', tags: ['vegan', 'gluten-free'] },
    { cat: 'desserts', name: 'Tarte au Citron Meringuée', price: 17, cal: 380, img: 'photo-1519915028121-7d3463d20b13',
      desc: 'Sharp Menton lemon curd in crisp pâte sablée, crowned with a torched Italian meringue.',
      ingredients: 'Lemon · butter · egg · sugar', allergens: 'Gluten, Egg, Dairy',
      pairing: 'Limoncello, chilled', tags: ['signature'] },
    { cat: 'desserts', name: 'Opéra Grand Cru', price: 19, cal: 450, img: 'photo-1700448293876-07dca826c161',
      desc: 'Layers of almond joconde, coffee buttercream and Guanaja ganache, finished with edible gold.',
      ingredients: 'Almond · coffee · chocolate · gold', allergens: 'Gluten, Egg, Dairy, Nuts',
      pairing: 'Espresso or Pedro Ximénez', tags: ['chefs-pick'] },
    { cat: 'cocktails', name: 'Barrel-Aged Negroni', price: 22, cal: 210, img: 'photo-1668431471601-9da38263dc24',
      desc: 'Equal parts gin, Campari and sweet vermouth, rested six weeks in oak and served over clear ice.',
      ingredients: 'Gin · Campari · sweet vermouth', allergens: 'Sulphites',
      pairing: 'Serve before dinner', tags: ['signature'] },
    { cat: 'drinks', name: 'Cucumber & Elderflower Pressé', price: 11, cal: 50, img: 'photo-1536852386-74fd4d6daf8b',
      desc: 'Cold-pressed cucumber and elderflower cordial, fresh mint and a splash of soda over ice.',
      ingredients: 'Cucumber · elderflower · mint', allergens: 'None',
      pairing: 'Non-alcoholic', tags: ['vegan', 'gluten-free'] },
    { cat: 'wine', name: 'Chablis Premier Cru', price: 24, cal: 120, img: 'photo-1534409385199-b60aa1bcffa0',
      desc: 'Domaine William Fèvre — taut, flinty Chardonnay with citrus and oyster-shell minerality.',
      ingredients: 'Chardonnay', allergens: 'Sulphites',
      pairing: 'Scallops & oysters', tags: ['chefs-pick'] }
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
