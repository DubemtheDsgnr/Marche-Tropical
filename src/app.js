const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const eur = n => n.toFixed(2).replace('.', ',') + ' €';
const store = { get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
const P = PRODUCTS, byId = id => P[+id];
const SV = {}; const pic = (p, eager) => p.img ? `<img src="${IMG[p.img]}" alt="" ${eager ? '' : 'loading="lazy"'} decoding="async">` : (SV[p.id] || (SV[p.id] = packshot(p)));
const price = (n, big) => { const [w, d] = n.toFixed(2).split('.'); return `<span class="pprice${big ? ' big' : ''}" aria-label="${eur(n)}"><span class="whole" aria-hidden="true">${w}</span><span class="dec" aria-hidden="true">,${d}</span><span class="cur" aria-hidden="true" style="margin-left:2px">€</span></span>`; };
const kg = p => { const m = p.name.match(/(\d+(?:\.\d+)?)\s?kg/i); return m ? +m[1] : 0; };
const isBulk = p => kg(p) >= 5;
const CAT_ORDER = ['Spices & Seasoning', 'Rice, Pasta & Noodles', 'Gari & Fufu', 'Drinks', 'Sauces & Marinades', 'Hair, Beauty & Health', 'Beans', 'Canned', 'Coconut Milk', 'Flour & Grains', 'Sweets & Snacks', 'Tea & Coffee', 'Dried Herbs'];
const ABOUT = {
  'Spices & Seasoning': ['A pantry essential for stews, jollof, curries, grills and marinades.', 'A little goes a long way: add gradually and taste as you cook.', 'Store in a cool, dry place with the lid tightly closed.'],
  'Dried Herbs': ['Dried and ready to use in soups, stews and rice.', 'Add early in cooking so the flavour has time to open up.', 'Store in a cool, dry place.'],
  'Sauces & Marinades': ['Ready to use straight from the bottle.', 'Brush on meat or fish before grilling, or serve on the side.', 'Refrigerate after opening.'],
  'Tea & Coffee': ['Brew hot, or steep and chill for a refreshing drink.', 'Store in a dry place away from strong smells.'],
  'Drinks': ['Best served chilled.', 'Great with meals or on its own.', 'Store in a cool place; refrigerate after opening.'],
  'Rice, Pasta & Noodles': ['Long, fragrant grains for everyday meals and party pots of jollof or biryani.', 'Rinse before cooking for fluffier rice.', 'Store in a dry, airtight container.'],
  'Beans': ['Ready to cook. Perfect for rice and peas, stews and salads.', 'Store in a cool, dry place.'],
  'Canned': ['A handy cupboard staple for sauces, stews and desserts.', 'Refrigerate any leftovers in a covered container.'],
  'Coconut Milk': ['Rich and creamy, for curries, soups, rice and desserts.', 'Shake well before opening.', 'Refrigerate after opening and use within 3 days.'],
  'Flour & Grains': ['A versatile staple for porridges, sauces and baking.', 'Store in a cool, dry place.'],
  'Gari & Fufu': ['A West African staple, ready to prepare as eba or fufu.', 'Serve with egusi, okra, ogbono or light soup.', 'Store in a dry, airtight container.'],
  'Sweets & Snacks': ['A crunchy snack for any time of day.', 'Reseal the bag to keep it crisp.'],
  'Hair, Beauty & Health': ['A favourite for textured hair and skin care.', 'Follow the directions on the pack.', 'For external use only.']
};
const ZONES = [
  { id: 'A', name: 'Zone A', area: 'Perl (Germany), postcode 66706', min: 20, fee: 4.5, free: 30 },
  { id: 'B', name: 'Zone B', area: 'Sierck les Bains (France), postcode 57480', min: 20, fee: 5.5, free: 35 },
  { id: '1', name: 'Zone 1', area: 'Canton of Remich, postcodes 5500 to 5599', min: 20, fee: 3.5, free: 25 },
  { id: '2', name: 'Zone 2', area: 'Cantons of Luxembourg, Esch sur Alzette and Grevenmacher', min: 25, fee: 8.5, free: 50 },
  { id: '3', name: 'Zone 3', area: 'Cantons of Echternach, Mersch and Capellen', min: 40, fee: 9.5, free: 70 },
  { id: '4', name: 'Zone 4', area: 'Cantons of Diekirch and Redange', min: 60, fee: 11.5, free: 100 },
  { id: '5', name: 'Zone 5', area: 'Cantons of Vianden and Wiltz', min: 125, fee: 13.5, free: 130 },
  { id: '6', name: 'Zone 6', area: 'Canton of Clervaux', min: 165, fee: 15.5, free: 170 }
];
const AREAS = [['Remich', '1'], ['Luxembourg', '2'], ['Esch sur Alzette', '2'], ['Grevenmacher', '2'], ['Echternach', '3'], ['Mersch', '3'], ['Capellen', '3'], ['Diekirch', '4'], ['Redange', '4'], ['Vianden', '5'], ['Wiltz', '5'], ['Clervaux', '6'], ['Perl, Germany', 'A'], ['Sierck les Bains, France', 'B']];
const zoneOf = id => ZONES.find(z => z.id === id);
const KIT_BRANDS = { African: ['Zena', 'Power Malt', 'Adja', 'Nouveau', 'AFP', 'Africa Village', 'Marguerite', 'African Beauty', 'Praise', 'Jumbo', 'Calnort', 'Dudu Osun', 'Checkers', 'De Rica', 'X Pression'], Caribbean: ['Tropical Sun', 'Encona', 'Old Jamaica', 'Goya', 'Sunny Isle', 'Jamaican Mango & Lime'], Asian: ['Daawat', 'Tilda', 'President', 'Laila', 'Desi', 'TRS', 'Shan', 'Chaokoh', 'Maaza'] };
const kitchenOf = p => Object.keys(KIT_BRANDS).find(k => KIT_BRANDS[k].includes(p.brand)) || '';
const KCLS = { African: 'af', Caribbean: 'ca', Asian: 'as' };
const sizeOf = p => (p.name.match(/\b(\d+(?:[.,]\d+)?\s?(?:kg|g|ml|L|oz|cl))\b/i) || [])[1] || '';

/* ---------- state ---------- */
let cart = store.get('mt3-cart', {}), saved = store.get('mt3-saved', []), wish = store.get('mt3-wish', []), recent = store.get('mt3-recent', []);
let area = store.get('mt3-area', null); // [label, zoneId]
let co = store.get('mt3-co', {});
let cur = byId(store.get('mt3-last', 7)) || P[7];
const F = { q: '', kitchen: '', cat: '', brands: new Set(), band: '', deal: '', sort: 'feat', page: 1 };
const PER = 24;
const ids = () => Object.keys(cart).filter(k => cart[k] > 0 && byId(k));
const count = () => ids().reduce((a, k) => a + cart[k], 0);
const subtotal = () => ids().reduce((a, k) => a + byId(k).price * cart[k], 0);
const persist = () => { store.set('mt3-cart', cart); store.set('mt3-saved', saved); store.set('mt3-wish', wish); };

/* ---------- delivery days ---------- */
function slots(n) {
  const out = [], now = new Date(), d = new Date(now); d.setHours(0, 0, 0, 0);
  for (let i = 0; out.length < n && i < 40; i++) { const day = new Date(d); day.setDate(d.getDate() + i); if (day.getDay() !== 2 && day.getDay() !== 4) continue; const c = new Date(day); c.setDate(day.getDate() - 1); c.setHours(17, 0, 0, 0); if (now < c) out.push({ date: day, cutoff: c }); }
  return out;
}
const SL = slots(4);
const shortDay = d => d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
const longDay = d => d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
function cutoffText() { const c = SL[0].cutoff, now = new Date(); const h = Math.floor((c - now) / 36e5); return h < 48 ? `Order within ${h} hr${h === 1 ? '' : 's'} ${Math.floor(((c - now) % 36e5) / 6e4)} mins` : `Order by ${c.toLocaleDateString('en-GB', { weekday: 'long' })} 17:00`; }

/* ---------- tiles ---------- */
function ctl(id) { const n = cart[id]; return n ? `<span class="stp" role="group" aria-label="Quantity in cart"><button data-dec="${id}" aria-label="Remove one">−</button><span>${n}</span><button data-inc="${id}" aria-label="Add one">+</button></span>` : `<button class="add" data-add="${id}" aria-label="Add ${esc(byId(id).name)} to cart"><svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>Add</button>`; }
function tile(p, o = {}) {
  const w = wish.includes(p.id), k = kitchenOf(p), sz = sizeOf(p), kgv = kg(p);
  const tag = isBulk(p) ? '<span class="tag g">Bulk</span>' : (p.price < 2 && o.deal ? '<span class="tag">Under 2 €</span>' : '');
  return `<article class="pt"><div style="position:relative"><a class="im" href="#product" data-pid="${p.id}" aria-label="${esc(p.name)}">${pic(p)}${k ? `<span class="kit ${KCLS[k]}">${k}</span>` : ''}${tag}</a>
  <button class="heart" data-wish="${p.id}" aria-pressed="${w}" aria-label="${w ? 'Remove from' : 'Save to'} wishlist"><svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z"/></svg></button></div>
  <div class="pt-b"><a class="nm" href="#product" data-pid="${p.id}">${esc(p.name)}</a><span class="meta">${esc(p.brand)}${sz ? ' · ' + esc(sz) : ''}</span>
  <div class="pt-f"><div class="pr">${price(p.price)}${kgv ? `<span class="unit">${eur(p.price / kgv)} / kg</span>` : ''}</div><div class="ctl" data-ctl="${p.id}">${ctl(p.id)}</div></div></div></article>`;
}
const quad4 = (title, list, more, attr) => `<div class="quad"><h2>${title}</h2><div class="q4">${list.map(([lbl, p, a]) => `<a href="${a ? '#shop' : '#product'}" ${a || `data-pid="${p.id}"`}><span class="im">${pic(p)}</span><span>${esc(lbl)}</span></a>`).join('')}</div><a class="more" href="#shop" ${attr}>${more}</a></div>`;

/* ---------- home ---------- */
function drawHome() {
  const still = [[9, '4%', '10%', '44%'], [24, '50%', '4%', '36%'], [72, '46%', '46%', '46%'], [1, '10%', '50%', '36%'], [15, '76%', '30%', '24%']];
  $('#still').innerHTML = still.map(([id, l, t, w]) => `<img src="${IMG[P[id].img]}" alt="" style="left:${l};top:${t};width:${w}">`).join('');
  $('#tDay').textContent = longDay(SL[0].date); $('#tCut').textContent = cutoffText();
  const KC = [['African', 'af', 'Gari, fufu, attiéké, pepper soup spice, malt and black soap.', [73, 62, 20]], ['Caribbean', 'ca', 'Jerk seasoning, hot pepper sauce, ginger beer and pigeon peas.', [2, 5, 15]], ['Asian', 'as', 'Basmati and sella rice, biryani mixes, dal, cumin and coconut milk.', [9, 24, 66]]];
  $('#kgrid').innerHTML = KC.map(([k, c, d, im]) => { const n = P.filter(p => kitchenOf(p) === k).length; return `<a class="kcard ${c}" href="#shop" data-kitchen="${k}"><div><h3>${k} kitchen</h3><p>${d}</p></div><span class="kfoot"><span class="arrow" aria-hidden="true">→</span>${n} products</span><span class="kimgs" aria-hidden="true">${im.map(i => `<img src="${IMG[P[i].img]}" alt="">`).join('')}</span></a>`; }).join('');
  const AI = [['Spices & Seasoning', 4], ['Rice, Pasta & Noodles', 9], ['Gari & Fufu', 72], ['Drinks', 14], ['Sauces & Marinades', 5], ['Beans', 74], ['Canned', 30], ['Coconut Milk', 24], ['Flour & Grains', 67], ['Sweets & Snacks', 25], ['Dried Herbs', 0], ['Tea & Coffee', 17], ['Hair, Beauty & Health', 43]];
  const cc = {}; P.forEach(p => cc[p.cat] = (cc[p.cat] || 0) + 1);
  $('#aislerow').innerHTML = AI.slice(0, 7).concat(AI.slice(7, 14)).map(([c, i]) => `<a class="aisle3" href="#shop" data-cat="${esc(c)}"><span class="c">${pic(P[i])}</span>${esc(c.replace(', Pasta & Noodles', '').replace(' & Seasoning', '').replace(', Beauty & Health', ' & beauty'))}<small>${cc[c]} item${cc[c] === 1 ? '' : 's'}</small></a>`).join('');
  drawPicks('staples');
  $('#bulkList').innerHTML = P.filter(isBulk).map(p => `<a class="bk" href="#product" data-pid="${p.id}"><span class="im">${pic(p)}</span><span><b>${esc(p.name)}</b><small>${esc(p.brand)}</small></span><span class="p">${eur(p.price)}<small>${eur(p.price / kg(p))} / kg</small></span></a>`).join('');
  $('#zcArea').innerHTML = '<option value="">Or choose your area</option>' + AREAS.map(([n, z]) => `<option value="${esc(n)}|${z}">${esc(n)}</option>`).join('');
  drawZC(); drawRecent(); drawZoneInfo();
  $('#mosaic').innerHTML = [9, 24, 5, 72, 2, 15, 43, 74].map(i => `<span>${pic(P[i])}</span>`).join('');
  $('#zoneRows').innerHTML = ZONES.map(z => `<tr><td><span class="zone ${/[AB]/.test(z.id) ? 'out' : ''}">${z.name}</span></td><td>${esc(z.area)}</td><td>${eur(z.min)}</td><td>${eur(z.fee)}</td><td><b>${eur(z.free)}</b></td></tr>`).join('');
  const di = (new Date().getDay() + 6) % 7; $$('.hours tbody').forEach(tb => tb.rows[di] && tb.rows[di].classList.add('today'));
  const H = ['Closed today', '14:00 to 19:00', '14:00 to 19:00', '09:00 to 19:00', '09:00 to 19:00', '09:00 to 19:00', '11:00 to 19:00'][new Date().getDay()];
  $('#openToday').textContent = 'Shop in Remich: ' + (H.startsWith('Closed') ? H : 'open today ' + H);
}
const PICKS = { staples: [9, 63, 73, 72, 71, 58, 54, 10, 11, 67], spice: [2, 78, 62, 29, 1, 4, 27, 66, 61, 60, 75], drinks: [20, 14, 15, 8, 28, 22, 19, 16, 18, 23], under2: null };
let pickTab = 'staples';
function drawPicks(t) { pickTab = t; const L = t === 'under2' ? P.filter(p => p.price < 2).sort((a, b) => a.price - b.price) : PICKS[t].map(byId); $('#pickRow').innerHTML = L.map(p => tile(p, { deal: t === 'under2' })).join(''); $$('#pickTabs button').forEach(b => b.setAttribute('aria-selected', b.dataset.tab === t)); }
$('#pickTabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) drawPicks(b.dataset.tab); });
function drawZC() {
  const z = area ? zoneOf(area[1]) : null, o = $('#zcOut'); if (!o) return;
  if (area) $('#zcArea').value = `${area[0]}|${area[1]}`;
  o.innerHTML = z ? `<span class="zn">${esc(area[0])} is in ${z.name}</span><div class="z"><small>Minimum order</small><b>${eur(z.min)}</b></div><div class="z"><small>Delivery fee</small><b>${eur(z.fee)}</b></div><div class="z hl"><small>Free delivery from</small><b>${eur(z.free)}</b></div><div class="z"><small>Next delivery</small><b style="font-size:16px">${shortDay(SL[0].date)}</b></div>` : '<p class="muted small">We deliver to all of Luxembourg, plus Perl (Germany) and Sierck les Bains (France).</p>';
}
$('#zcPc').addEventListener('input', () => { const r = fromPostcode($('#zcPc').value); if (r) setArea(...r); else if ($('#zcPc').value.replace(/\D/g, '').length >= 4) $('#zcOut').innerHTML = '<p class="muted small">We could not match that postcode automatically. Please choose your area.</p>'; });
$('#zcArea').addEventListener('change', () => { const v = $('#zcArea').value; if (v) { const [n, z] = v.split('|'); setArea(n, z); } });
function drawRecent() { const L = recent.map(byId).filter(Boolean); $('#recentWrap').hidden = !L.length; $('#rowRecent').innerHTML = L.map(p => tile(p)).join(''); }
$('#clearRecent').onclick = () => { recent = []; store.set('mt3-recent', recent); drawRecent(); };
function drawZoneInfo() {
  const z = area ? zoneOf(area[1]) : null;
  $('#deliverTo').textContent = area ? `${area[0]}, ${z.name}` : 'Choose area';
  $$('.bbZone').forEach(e => e.textContent = area ? area[0] : 'your area');
  const zi = $('#zoneInfo'); if (zi) zi.innerHTML = z ? `<li>Delivering to <b>${esc(area[0])}</b> (${z.name})</li><li>Minimum order ${eur(z.min)}</li><li>Free delivery from ${eur(z.free)}, otherwise ${eur(z.fee)}</li>` : '<li>Pick your area to see the minimum order and free delivery threshold.</li><li>Free delivery in Remich from 25 €.</li>';
}

/* ---------- results ---------- */
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const BANDS = [['u2', 'Under 2 €', p => p.price < 2], ['2-5', '2 € to 5 €', p => p.price >= 2 && p.price < 5], ['5-10', '5 € to 10 €', p => p.price >= 5 && p.price < 10], ['10+', '10 € and above', p => p.price >= 10]];
function base() {
  const t = norm(F.q);
  return P.filter(p => (!t || t.split(/\s+/).every(w => norm(p.name + ' ' + p.brand + ' ' + p.cat).includes(w))) && (!F.deal || (F.deal === 'under2' ? p.price < 2 : isBulk(p))) && (!F.kitchen || kitchenOf(p) === F.kitchen));
}
function results() {
  let L = base().filter(p => (!F.cat || p.cat === F.cat) && (!F.brands.size || F.brands.has(p.brand)) && (!F.band || BANDS.find(b => b[0] === F.band)[2](p)));
  if (F.sort === 'asc') L.sort((a, b) => a.price - b.price); if (F.sort === 'desc') L.sort((a, b) => b.price - a.price); if (F.sort === 'az') L.sort((a, b) => a.name.localeCompare(b.name));
  return L;
}
let brandsAll = false;
function drawResults() {
  const B = base(), L = results(), pages = Math.max(1, Math.ceil(L.length / PER)); F.page = Math.min(F.page, pages);
  const from = (F.page - 1) * PER;
  const label = F.kitchen && !F.q ? esc(F.kitchen) + ' kitchen' : F.q ? `"${esc(F.q)}"` : F.deal === 'under2' ? 'Under 2 €' : F.deal === 'bulk' ? 'Bulk buys' : F.cat ? esc(F.cat) : 'All products';
  $('#resCount').innerHTML = L.length ? `${from + 1}-${Math.min(from + PER, L.length)} of ${L.length} results for <b>${label}</b>` : `No results for <b>${label}</b>`;
  $('#grid').innerHTML = L.slice(from, from + PER).map(p => tile(p, { deal: F.deal === 'under2' })).join('');
  $('#empty').hidden = L.length > 0;
  $('.resh').textContent = F.cat && !F.q ? F.cat : F.kitchen && !F.q ? F.kitchen + ' kitchen' : 'Results';
  const cc = {}; B.forEach(p => cc[p.cat] = (cc[p.cat] || 0) + 1);
  $('#fCats').innerHTML = `<a href="#shop" class="${!F.cat ? 'on' : ''}" data-fcat="">Any department</a>` + CAT_ORDER.filter(c => cc[c]).map(c => `<a href="#shop" class="${F.cat === c ? 'on' : ''}" data-fcat="${esc(c)}">${esc(c)} <span class="ct">(${cc[c]})</span></a>`).join('');
  $('#fPrice').innerHTML = `<a href="#shop" class="${!F.band ? 'on' : ''}" data-band="">Any price</a>` + BANDS.map(b => `<a href="#shop" class="${F.band === b[0] ? 'on' : ''}" data-band="${b[0]}">${b[1]}</a>`).join('');
  const bc = {}; B.filter(p => !F.cat || p.cat === F.cat).forEach(p => bc[p.brand] = (bc[p.brand] || 0) + 1);
  const brands = Object.keys(bc).sort((a, b) => bc[b] - bc[a] || a.localeCompare(b));
  $('#fBrands').innerHTML = brands.slice(0, brandsAll ? 99 : 8).map(b => `<label><input type="checkbox" data-brand="${esc(b)}" ${F.brands.has(b) ? 'checked' : ''}>${esc(b)} <span class="ct">(${bc[b]})</span></label>`).join('');
  $('#moreBrands').hidden = brands.length <= 8; $('#moreBrands').textContent = brandsAll ? 'See less' : 'See more';
  const ch = [];
  if (F.q) ch.push(['q', `“${F.q}”`]); if (F.kitchen) ch.push(['kitchen', F.kitchen + ' kitchen']); if (F.deal) ch.push(['deal', F.deal === 'under2' ? 'Under 2 €' : 'Bulk buys']); if (F.cat) ch.push(['cat', F.cat]); if (F.band) ch.push(['band', BANDS.find(b => b[0] === F.band)[1]]); F.brands.forEach(b => ch.push(['brand:' + b, b]));
  $('#activeChips').innerHTML = ch.map(([k, l]) => `<button class="chip" data-unset="${esc(k)}">${esc(l)} <span aria-hidden="true">✕</span><span class="sr">Remove filter</span></button>`).join('') + (ch.length > 1 ? '<button class="lnk" data-unset="all">Clear all</button>' : '');
  $('#pager').innerHTML = pages > 1 ? `<button data-page="${F.page - 1}" ${F.page === 1 ? 'disabled' : ''}>‹ Previous</button>` + Array.from({ length: pages }, (_, i) => `<button data-page="${i + 1}" ${i + 1 === F.page ? 'aria-current="page"' : ''}>${i + 1}</button>`).join('') + `<button data-page="${F.page + 1}" ${F.page === pages ? 'disabled' : ''}>Next ›</button>` : '';
  $('#sort').value = F.sort;
}
function resetF(keepQ) { F.kitchen = ''; F.cat = ''; F.brands.clear(); F.band = ''; F.deal = ''; F.page = 1; if (!keepQ) F.q = ''; }
$('#sort').onchange = e => { F.sort = e.target.value; drawResults(); };
$('#moreBrands').onclick = () => { brandsAll = !brandsAll; drawResults(); };
$('#fBrands').addEventListener('change', e => { const b = e.target.dataset.brand; if (!b) return; e.target.checked ? F.brands.add(b) : F.brands.delete(b); F.page = 1; drawResults(); });
$('#fToggle').onclick = () => { const f = $('.filters'); f.classList.toggle('open'); $('#fToggle').setAttribute('aria-expanded', f.classList.contains('open')); };
$('#clearAll').onclick = () => { resetF(); $('#hq').value = ''; drawResults(); };

/* ---------- search ---------- */
$('#scat').innerHTML = '<option value="">All</option>' + CAT_ORDER.map(c => `<option>${esc(c)}</option>`).join('');
let sIdx = -1;
function suggest() {
  const t = norm($('#hq').value.trim()), box = $('#suggest'); if (t.length < 2) { box.hidden = true; return; }
  const sc = $('#scat').value; const L = P.filter(p => (!sc || p.cat === sc) && t.split(/\s+/).every(w => norm(p.name + ' ' + p.brand + ' ' + p.cat).includes(w)));
  box.innerHTML = L.length ? L.slice(0, 7).map(p => `<a href="#product" data-pid="${p.id}"><span class="th">${pic(p)}</span><span>${esc(p.name)}</span><span>${eur(p.price)}</span></a>`).join('') + `<a href="#shop" class="all" data-search>See all ${L.length} results</a>` : `<p>No products match “${esc($('#hq').value)}”.</p>`;
  box.hidden = false; sIdx = -1;
}
$('#hq').addEventListener('input', suggest); $('#hq').addEventListener('focus', suggest);
$('#hq').addEventListener('keydown', e => {
  const it = $$('#suggest a'); if (e.key === 'Escape') { $('#suggest').hidden = true; return; } if (!it.length || $('#suggest').hidden) return;
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); sIdx = (sIdx + (e.key === 'ArrowDown' ? 1 : -1) + it.length) % it.length; it.forEach((a, i) => a.classList.toggle('act', i === sIdx)); }
  if (e.key === 'Enter' && sIdx >= 0) { e.preventDefault(); it[sIdx].click(); }
});
function doSearch() { resetF(); F.q = $('#hq').value.trim(); F.cat = $('#scat').value; $('#suggest').hidden = true; drawResults(); if (location.hash !== '#shop') location.hash = 'shop'; else scrollTo(0, 0); }
$('#hsearch').addEventListener('submit', e => { e.preventDefault(); doSearch(); });

/* ---------- product ---------- */
function openProduct(p) {
  cur = p; store.set('mt3-last', p.id);
  recent = [p.id, ...recent.filter(x => x !== p.id)].slice(0, 12); store.set('mt3-recent', recent);
  drawProduct();
}
function drawProduct() {
  const p = cur;
  $('#pdName').textContent = p.name;
  $('#pdBrandLink').textContent = `Visit the ${p.brand} store`; $('#pdBrandLink').dataset.brand = p.brand;
  $('#pdCatLink').textContent = p.cat; $('#pdCatLink').dataset.cat = p.cat;
  $('#pdPrice').innerHTML = price(p.price, true); $('#bbPrice').innerHTML = price(p.price, true);
  const k = kg(p); $('#pdUnit').textContent = k ? `(${eur(p.price / k)} / kg)` : '';
  const size = (p.name.match(/\b(\d+(?:[.,]\d+)?\s?(?:kg|g|ml|L|oz|cl))\b/i) || [])[1];
  $('#pdSpec').innerHTML = [['Brand', p.brand], ['Department', p.cat], size && ['Size', size], ['Delivery', 'Tuesday and Thursday'], ['Payment', 'On delivery']].filter(Boolean).map(([a, b]) => `<tr><th>${a}</th><td>${esc(b)}</td></tr>`).join('');
  $('#pdAbout').innerHTML = (p.id === 7 ? ['Dried hibiscus flowers for bissap, known as sorrel in the Caribbean.', 'Steep in hot water, sweeten and serve chilled over ice.'] : ABOUT[p.cat] || []).map(t => `<li>${esc(t)}</li>`).join('');
  $('#pdStage').className = 'pd-stage'; $('#pdStage').innerHTML = pic(p, true);
  $('#thumbs').innerHTML = ['', 'v2'].map((v, i) => `<button type="button" data-view="${v}" aria-current="${i === 0}" aria-label="Image ${i + 1}">${pic(p, true)}</button>`).join('');
  $('#pdQty').innerHTML = Array.from({ length: 10 }, (_, i) => `<option>${i + 1}</option>`).join('');
  $('#bbDay').textContent = longDay(SL[0].date);
  const z = area ? zoneOf(area[1]) : zoneOf('1'); $('#bbFee').textContent = `Free delivery on orders over ${eur(z.free)}${area ? '' : ' in Remich'}.`;
  setWishBtn();
  const rel = P.filter(x => x.cat === p.cat && x.id !== p.id); $('#related').innerHTML = rel.map(x => tile(x)).join(''); $('#relH').textContent = `More in ${p.cat}`;
  const br = P.filter(x => x.brand === p.brand && x.id !== p.id && x.cat !== p.cat || (x.brand === p.brand && x.id !== p.id && !rel.includes(x)));
  $('#brandWrap').hidden = !br.length; $('#brandH').textContent = `More from ${p.brand}`; $('#brandRow').innerHTML = br.map(x => tile(x)).join('');
  drawZoneInfo();
}
function setWishBtn() { const w = wish.includes(cur.id); $('#pdWish').textContent = w ? '♥ In your Wishlist' : 'Add to Wishlist'; }
$('#thumbs').addEventListener('click', e => { const b = e.target.closest('[data-view]'); if (!b) return; $$('#thumbs button').forEach(t => t.setAttribute('aria-current', t === b)); $('#pdStage').className = 'pd-stage ' + b.dataset.view; });
$('#pdStage').addEventListener('click', () => $('#pdStage').classList.toggle('zoom'));
$('#pdAdd').onclick = () => addToCart(cur.id, +$('#pdQty').value);
$('#pdBuy').onclick = () => { cart[cur.id] = (cart[cur.id] || 0) + +$('#pdQty').value; persist(); updCart(); location.hash = 'checkout'; };
$('#pdWish').onclick = () => toggleWish(cur.id);
$('#pdBrandLink').onclick = () => { resetF(); F.brands.add(cur.brand); drawResults(); location.hash = 'shop'; };

/* ---------- cart, saved, wishlist ---------- */
let tt;
function toast(html, p) { const t = $('#toast'); t.innerHTML = (p ? `<span class="ti">${pic(p)}</span>` : '') + `<span>${html}</span>`; t.hidden = false; clearTimeout(tt); tt = setTimeout(() => t.hidden = true, 3000); }
function addToCart(id, n = 1) { cart[id] = Math.min(99, (cart[id] || 0) + n); persist(); updCart(); refreshTiles(); toast(`Added to cart <a href="#cart">Go to cart</a>`, byId(id)); }
function setQty(id, n) { if (n <= 0) delete cart[id]; else cart[id] = Math.min(99, n); persist(); updCart(); refreshTiles(); }
function toggleWish(id) { id = +id; const i = wish.indexOf(id); i >= 0 ? wish.splice(i, 1) : wish.push(id); persist(); updWish(); $$(`[data-wish="${id}"]`).forEach(b => { b.setAttribute('aria-pressed', i < 0); b.setAttribute('aria-label', (i < 0 ? 'Remove from' : 'Add to') + ' wishlist'); }); if (cur.id === id) setWishBtn(); if (location.hash === '#wishlist') drawWish(); toast(i >= 0 ? 'Removed from your Wishlist' : 'Saved to your Wishlist <a href="#wishlist">View</a>', byId(id)); }
function updWish() { const b = $('#wishCount'); b.textContent = wish.length; b.hidden = !wish.length; }
function refreshTiles() { $$('[data-ctl]').forEach(el => el.innerHTML = ctl(el.dataset.ctl)); }
function zoneNow() { return area ? zoneOf(area[1]) : null; }
function freeHtml() { const z = zoneNow() || zoneOf('1'), s = subtotal(), left = z.free - s; return `<div class="fb">${left > 0 ? `Add <b>${eur(left)}</b> of eligible items for <b>free delivery</b>${area ? ' to ' + esc(area[0]) : ' in Remich'}.` : `<b style="color:var(--green)">Your order qualifies for free delivery${area ? ' to ' + esc(area[0]) : ' in Remich'}.</b>`}</div><div class="bar"><i style="width:${Math.min(100, s / z.free * 100)}%"></i></div>`; }
function updCart() { const c = count(); $('#cartCount').textContent = c; $('#cartCount').hidden = !c; $('.cartlink').setAttribute('aria-label', `Cart, ${c} item${c === 1 ? '' : 's'}`); const r = location.hash.slice(1); if (r === 'cart') drawCart(); if (r === 'checkout') drawCheckout(); }
function drawCart() {
  const I = ids(), s = subtotal(), c = count();
  const main = I.length ? `<div class="card cartmain"><div class="hdrow"><h1>Shopping Cart</h1><span>Price</span></div>${I.map(id => { const p = byId(id); return `<div class="cline"><a class="im" href="#product" data-pid="${id}" aria-label="${esc(p.name)}">${pic(p)}</a><div><h3><a href="#product" data-pid="${id}">${esc(p.name)}</a></h3><div class="ok">Available from the shop</div><div class="small muted">Delivery ${shortDay(SL[0].date)} · Pay on delivery</div><div class="ops"><span class="stepper" role="group" aria-label="Quantity"><button data-dec="${id}" aria-label="Decrease">${cart[id] === 1 ? '🗑' : '−'}</button><span>${cart[id]}</span><button data-inc="${id}" aria-label="Increase">+</button></span><span class="sep"></span><button class="lnk" data-rm="${id}">Delete</button><span class="sep"></span><button class="lnk" data-save="${id}">Save for later</button></div></div><div class="lp">${eur(p.price * cart[id])}</div></div>`; }).join('')}<div class="subline">Subtotal (${c} item${c === 1 ? '' : 's'}): <b>${eur(s)}</b></div></div>`
    : `<div class="card cartmain"><h1>Your Marché Tropical cart is empty</h1><p><a href="#shop" data-cat="">Shop today's products</a></p></div>`;
  const side = I.length ? `<aside class="card cartside">${freeHtml()}<div style="font-size:18px">Subtotal (${c} item${c === 1 ? '' : 's'}): <b>${eur(s)}</b></div><a class="btn y full" href="#checkout">Proceed to checkout</a><p class="small muted" style="margin:10px 0 0">Delivery fee and minimum order depend on your area. Pay on delivery.</p></aside>` : '<aside></aside>';
  const sv = saved.map(byId).filter(Boolean);
  const savedHtml = sv.length ? `<div class="card saved" style="grid-column:1/-1"><h2>Saved for later (${sv.length})</h2><div class="savedgrid">${sv.map(p => `<article class="pt"><a class="im" href="#product" data-pid="${p.id}" aria-label="${esc(p.name)}">${pic(p)}</a><a class="nm" href="#product" data-pid="${p.id}">${esc(p.name)}</a>${price(p.price)}<div class="act"><button class="btn w" data-move="${p.id}">Move to cart</button><button class="lnk" data-unsave="${p.id}">Delete</button></div></article>`).join('')}</div></div>` : '';
  $('#cartPage').innerHTML = main + side + savedHtml;
}
function drawWish() {
  const L = wish.map(byId).filter(Boolean);
  $('#wishList').innerHTML = L.length ? `<div class="savedgrid" style="margin-top:12px">${L.map(p => tile(p)).join('')}</div>` : '<p>Your Wishlist is empty. Tap the heart on any product to save it here.</p><a class="btn y" href="#shop" data-cat="">Browse products</a>';
}

/* ---------- global clicks ---------- */
document.addEventListener('click', e => {
  const t = e.target;
  const a = t.closest('[data-add]'); if (a) { e.preventDefault(); addToCart(a.dataset.add); return; }
  const w = t.closest('[data-wish]'); if (w) { e.preventDefault(); toggleWish(w.dataset.wish); return; }
  const inc = t.closest('[data-inc]'); if (inc) { setQty(inc.dataset.inc, cart[inc.dataset.inc] + 1); return; }
  const dec = t.closest('[data-dec]'); if (dec) { setQty(dec.dataset.dec, cart[dec.dataset.dec] - 1); return; }
  const rm = t.closest('[data-rm]'); if (rm) { setQty(rm.dataset.rm, 0); return; }
  const sv = t.closest('[data-save]'); if (sv) { const id = +sv.dataset.save; delete cart[id]; saved = [id, ...saved.filter(x => x !== id)]; persist(); updCart(); return; }
  const mv = t.closest('[data-move]'); if (mv) { const id = +mv.dataset.move; saved = saved.filter(x => x !== id); cart[id] = (cart[id] || 0) + 1; persist(); updCart(); return; }
  const us = t.closest('[data-unsave]'); if (us) { saved = saved.filter(x => x !== +us.dataset.unsave); persist(); drawCart(); return; }
  const pid = t.closest('[data-pid]'); if (pid) { openProduct(byId(pid.dataset.pid)); $('#suggest').hidden = true; if (location.hash === '#product') scrollTo(0, 0); }
  const c = t.closest('[data-cat]'); if (c) { resetF(); F.cat = c.dataset.cat; $('#hq').value = ''; drawResults(); closeSide(); if (location.hash === '#shop') scrollTo(0, 0); }
  const kk = t.closest('[data-kitchen]'); if (kk) { resetF(); F.kitchen = kk.dataset.kitchen; $('#hq').value = ''; drawResults(); closeSide(); if (location.hash === '#shop') scrollTo(0, 0); }
  const sc = t.closest('[data-scroll]'); if (sc) { const el = document.getElementById(sc.dataset.scroll); if (el) el.scrollIntoView({ behavior: 'smooth' }); }
  const d = t.closest('[data-deal]'); if (d) { resetF(); F.deal = d.dataset.deal; $('#hq').value = ''; drawResults(); closeSide(); if (location.hash === '#shop') scrollTo(0, 0); }
  const fc = t.closest('[data-fcat]'); if (fc) { e.preventDefault(); F.cat = fc.dataset.fcat; F.brands.clear(); F.page = 1; drawResults(); }
  const fb = t.closest('[data-band]'); if (fb) { e.preventDefault(); F.band = fb.dataset.band; F.page = 1; drawResults(); }
  const un = t.closest('[data-unset]'); if (un) { const k = un.dataset.unset; if (k === 'all') { resetF(); $('#hq').value = ''; } else if (k.startsWith('brand:')) F.brands.delete(k.slice(6)); else { F[k] = ''; if (k === 'q') $('#hq').value = ''; } F.page = 1; drawResults(); }
  const pg = t.closest('[data-page]'); if (pg && !pg.disabled) { F.page = +pg.dataset.page; drawResults(); scrollTo(0, 0); }
  if (t.closest('[data-search]')) { e.preventDefault(); doSearch(); }
  if (t.closest('[data-open-zone]')) openZone();
  if (!t.closest('#hsearch')) $('#suggest').hidden = true;
  if (t.closest('[data-demo-btn]')) toast('Accounts are not part of this demo yet.');
});

/* ---------- side nav ---------- */
const side = $('#side'), sideBg = $('#sideBg');
$('#sideCats').innerHTML = CAT_ORDER.map(c => `<a href="#shop" data-cat="${esc(c)}">${esc(c)} <span aria-hidden="true">›</span></a>`).join('');
function openSide() { side.hidden = sideBg.hidden = false; $('#burger').setAttribute('aria-expanded', 'true'); $('#sideClose').focus(); }
function closeSide() { if (side.hidden) return; side.hidden = sideBg.hidden = true; $('#burger').setAttribute('aria-expanded', 'false'); }
$('#allBtn').onclick = openSide; $('#burger').onclick = openSide; $('#sideClose').onclick = closeSide; sideBg.onclick = closeSide;
side.addEventListener('click', e => { if (e.target.closest('a')) closeSide(); });

/* ---------- zone modal ---------- */
function openZone() { $('#zGrid').innerHTML = AREAS.map(([n, z]) => `<button type="button" data-area="${esc(n)}|${z}" aria-pressed="${!!area && area[0] === n}">${esc(n)}<small>${zoneOf(z).name} · free from ${eur(zoneOf(z).free)}</small></button>`).join(''); $('#zpcMsg').textContent = ''; $('#zoneModal').hidden = $('#zoneModalBg').hidden = false; $('#zmClose').focus(); }
function closeZone() { $('#zoneModal').hidden = $('#zoneModalBg').hidden = true; }
function setArea(n, z) { area = [n, z]; store.set('mt3-area', area); drawZoneInfo(); drawZC(); if (location.hash === '#product') drawProduct(); updCart(); syncZoneSelect(); }
$('#deliverBtn').onclick = openZone; $('#zmClose').onclick = closeZone; $('#zoneModalBg').onclick = closeZone;
$('#zGrid').addEventListener('click', e => { const b = e.target.closest('[data-area]'); if (!b) return; const [n, z] = b.dataset.area.split('|'); setArea(n, z); closeZone(); toast(`Delivering to ${esc(n)} (${zoneOf(z).name})`); });
function fromPostcode(v) { v = v.replace(/\D/g, ''); const n = +v; if (v === '66706') return ['Perl, Germany', 'A']; if (v === '57480') return ['Sierck les Bains, France', 'B']; if (v.length === 4 && n >= 5500 && n <= 5599) return ['Remich', '1']; if (v.length === 4 && n >= 1000 && n <= 2999) return ['Luxembourg', '2']; return null; }
$('#zpcGo').onclick = () => { const r = fromPostcode($('#zpc').value); if (r) { setArea(...r); closeZone(); toast(`Delivering to ${esc(r[0])} (${zoneOf(r[1]).name})`); } else $('#zpcMsg').textContent = 'We could not match that postcode. Please pick your area above.'; };
document.addEventListener('keydown', e => { if (e.key === 'Escape') { if (!$('#zoneModal').hidden) closeZone(); closeSide(); } });

/* ---------- checkout ---------- */
const FIELDS = ['fn', 'ln', 'em', 'ph', 'ad', 'pc', 'ci', 'fl'];
$('#zone').innerHTML = '<option value="">Choose your area</option>' + AREAS.map(([n, z]) => `<option value="${esc(n)}|${z}">${esc(n)} (${zoneOf(z).name})</option>`).join('');
function syncZoneSelect() { $('#zone').value = area ? `${area[0]}|${area[1]}` : ''; }
FIELDS.forEach(f => { if (co[f]) $('#' + f).value = co[f]; $('#' + f).addEventListener('change', () => { co[f] = $('#' + f).value; store.set('mt3-co', co); }); });
$('#zone').addEventListener('change', () => { const v = $('#zone').value; if (v) { const [n, z] = v.split('|'); setArea(n, z); } });
$('#pc').addEventListener('input', () => { const r = fromPostcode($('#pc').value); if (r) { setArea(...r); $('#zoneHint').textContent = 'Filled in from your postcode.'; } });
let slot = 0;
function fees() { const s = subtotal(), z = zoneNow(); if (!z) return { s, z, fee: null, total: s, below: false }; const fee = s >= z.free ? 0 : z.fee; return { s, z, fee, total: s + fee, below: s < z.min }; }
function drawCheckout() {
  const I = ids(), f = fees(); $('#coItems').textContent = `${count()} item${count() === 1 ? '' : 's'}`;
  $('#slots').innerHTML = SL.map((s, i) => `<button type="button" class="slot" data-slot="${i}" aria-pressed="${i === slot}"><b>${s.date.toLocaleDateString('en-GB', { weekday: 'long' })}</b><span>${s.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}</span><small>12:00 to 18:00</small></button>`).join('');
  $('#coLines').innerHTML = I.map(id => { const p = byId(id); return `<div class="co-line"><span class="im">${pic(p)}</span><span>${esc(p.name)}<br><span class="small muted">Qty ${cart[id]}</span></span><b>${eur(p.price * cart[id])}</b></div>`; }).join('');
  $('#coSum').innerHTML = `<button class="btn y full" id="place" style="margin:0">Place your order</button><label class="check"><input type="checkbox" id="agree"><span>I accept the <a href="#terms">terms of sale</a>.</span></label><p class="err" id="err3" role="alert" hidden></p><hr style="border:0;border-top:1px solid var(--line)"><b style="font-size:17px">Order summary</b>
  <div class="srow"><span>Items (${count()}):</span><span>${eur(f.s)}</span></div><div class="srow"><span>Delivery${f.z ? ' (' + f.z.name + ')' : ''}:</span><span>${f.z ? (f.fee ? eur(f.fee) : 'FREE') : 'Choose area'}</span></div>
  ${f.below ? `<p class="note-min">Minimum order for ${f.z.name} is ${eur(f.z.min)}. Add ${eur(f.z.min - f.s)} more.</p>` : ''}${f.z && f.fee ? `<p class="small muted">Free delivery to ${esc(area[0])} from ${eur(f.z.free)}.</p>` : ''}
  <div class="srow tot"><span>Order total:</span><span>${eur(f.total)}</span></div><p class="small muted">Pay on delivery. Prices include VAT.</p>`;
  $('#place').onclick = place;
}
$('#slots').addEventListener('click', e => { const b = e.target.closest('[data-slot]'); if (!b) return; slot = +b.dataset.slot; drawCheckout(); });
function place() {
  const bad = []; ['fn', 'ln', 'em', 'ph', 'ad', 'pc', 'ci', 'zone'].forEach(f => { const el = $('#' + f); const ok = el.value.trim() && (f !== 'em' || /.+@.+\..+/.test(el.value)); el.classList.toggle('bad', !ok); el.setAttribute('aria-invalid', String(!ok)); if (!ok) bad.push(el.previousElementSibling.textContent.toLowerCase()); });
  const e1 = $('#err1'); e1.hidden = !bad.length; e1.textContent = bad.length ? 'Please complete: ' + bad.join(', ') + '.' : '';
  const e3 = $('#err3'); const f = fees();
  if (bad.length) { $('#sec1').scrollIntoView({ behavior: 'smooth' }); e3.hidden = false; e3.textContent = 'Please complete your delivery address.'; return; }
  if (f.below) { e3.hidden = false; e3.innerHTML = `Minimum order for ${f.z.name} is ${eur(f.z.min)}. <a href="#shop" data-cat="">Add more items</a>.`; return; }
  if (!$('#agree').checked) { e3.hidden = false; e3.textContent = 'Please accept the terms of sale.'; $('#agree').focus(); return; }
  FIELDS.forEach(k => co[k] = $('#' + k).value); store.set('mt3-co', co);
  $('#oName').textContent = co.fn; $('#oRef').textContent = '#MT' + String(Date.now()).slice(-7);
  $('#oBody').innerHTML = `<div class="rv"><div><h4>Delivery</h4>${longDay(SL[slot].date)}<br>12:00 to 18:00</div><div><h4>Address</h4>${esc(co.ad)}<br>${esc(co.pc)} ${esc(co.ci)}</div><div><h4>Pay on delivery</h4><b style="font-size:20px">${eur(f.total)}</b><br>${count()} items${f.fee ? ', delivery ' + eur(f.fee) : ', free delivery'}</div></div>`;
  cart = {}; persist(); updCart(); location.hash = 'order';
}

/* ---------- demo forms ---------- */
$$('form[data-demo]').forEach(fm => fm.addEventListener('submit', e => { e.preventDefault(); let n = fm.querySelector('.formnote'); if (!n) { n = document.createElement('p'); n.className = 'formnote'; n.setAttribute('role', 'status'); fm.appendChild(n); } n.textContent = fm.dataset.demo; }));
$('#backTop').onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

/* ---------- router ---------- */
const ROUTES = ['home', 'shop', 'product', 'cart', 'checkout', 'order', 'wishlist', 'account', 'about', 'delivery', 'contact', 'terms'];
const TITLES = { shop: 'Results', cart: 'Shopping Cart', checkout: 'Checkout', order: 'Order placed', wishlist: 'Wishlist', account: 'Sign in', about: 'Our store', delivery: 'Delivery', contact: 'Customer service', terms: 'Terms of sale' };
function route() {
  let r = location.hash.slice(1); if (!ROUTES.includes(r)) r = 'home';
  if (r === 'checkout' && !ids().length) { location.hash = 'cart'; return; }
  if (r === 'order' && !$('#oRef').textContent) { location.hash = 'home'; return; }
  $$('.route').forEach(s => s.hidden = s.dataset.route !== r);
  closeSide(); $('#suggest').hidden = true;
  if (r === 'cart') drawCart(); if (r === 'wishlist') drawWish(); if (r === 'checkout') { syncZoneSelect(); drawCheckout(); } if (r === 'home') drawRecent(); if (r === 'shop') drawResults();
  document.title = r === 'home' ? 'Marché Tropical: African, Caribbean and Asian groceries' : (r === 'product' ? cur.name : TITLES[r]) + ' | Marché Tropical';
  scrollTo(0, 0);
}
addEventListener('hashchange', route);
drawHome(); drawResults(); drawProduct(); updCart(); updWish(); route();
