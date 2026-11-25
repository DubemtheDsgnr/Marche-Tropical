// Draws an illustrated packshot for a product as inline SVG.
const PALETTES = [
  ['#0C6B49', '#FFF6DC', '#FFB400'], ['#D9361F', '#FFF6DC', '#13241C'], ['#FFB400', '#13241C', '#D9361F'],
  ['#13241C', '#FFB400', '#D9361F'], ['#2E6FB5', '#FFFFFF', '#FFB400'], ['#7A2E8C', '#FFF6DC', '#FFB400'],
  ['#E86A1C', '#FFFFFF', '#0C6B49'], ['#1F8A70', '#FFFFFF', '#D9361F'], ['#B8262E', '#FFE8A3', '#0C6B49'],
  ['#3B2A20', '#F5D28A', '#D9361F'], ['#F2E3C6', '#0C6B49', '#D9361F'], ['#5A8F29', '#FFFFFF', '#FFB400']
];
function hashStr(s) { let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; }
function svgEsc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function shortDesc(p) {
  let d = p.name.replace(p.brand, '').replace(/\(.*?\)/g, '').replace(/\b\d+(\.\d+)?\s?(kg|g|ml|l|L|oz|cl|lt)\b/gi, '').replace(/[,]/g, ' ').replace(/\s+/g, ' ').trim();
  const words = d.split(' ').filter(w => !/^(with|and|the|of)$/i.test(w));
  return words.slice(0, 3).join(' ');
}
function sizeTag(p) { const m = p.name.match(/\b(\d+(?:[.,]\d+)?\s?(?:kg|g|ml|L|l|oz|cl))\b/i); return m ? m[1].replace(/\s/g, '') : ''; }
function label(x, y, w, h, pal, p, opts = {}) {
  const brand = svgEsc(p.brand.toUpperCase());
  const desc = svgEsc(shortDesc(p));
  const sz = svgEsc(sizeTag(p));
  const bf = Math.min(opts.bf || 15, (w * 1.45) / Math.max(brand.length, 4));
  const df = Math.min(opts.df || 10, (w * 1.45) / Math.max(desc.length, 6));
  const cx = x + w / 2;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${opts.r || 4}" fill="${pal[1]}"/>
  <rect x="${x}" y="${y + h - 6}" width="${w}" height="6" fill="${pal[2]}"/>
  <text x="${cx}" y="${y + h * 0.42}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="${bf.toFixed(1)}" fill="${pal[0] === pal[1] ? '#13241C' : (pal[1] === '#13241C' || pal[1] === '#0C6B49' ? '#fff' : pal[0])}">${brand}</text>
  <text x="${cx}" y="${y + h * 0.42 + df + 5}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="${df.toFixed(1)}" fill="${pal[1] === '#13241C' || pal[1] === '#0C6B49' ? '#fff' : '#13241C'}">${desc}</text>
  ${sz ? `<text x="${cx}" y="${y + h - 11}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="700" font-size="9" fill="${pal[1] === '#13241C' || pal[1] === '#0C6B49' ? '#fff' : '#46564D'}">${sz}</text>` : ''}`;
}
function packshot(p) {
  const pal = PALETTES[hashStr(p.brand + p.cat) % PALETTES.length];
  const [c0, c1, c2] = pal;
  const shine = '<linearGradient id="sh" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset=".18" stop-color="#fff" stop-opacity=".35"/><stop offset=".3" stop-color="#fff" stop-opacity="0"/><stop offset=".85" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>';
  const shadow = (cx, w) => `<ellipse cx="${cx}" cy="186" rx="${w}" ry="7" fill="#13241C" opacity=".18"/>`;
  let g = '';
  switch (p.shape) {
    case 'can':
      g = shadow(100, 40) + `<rect x="62" y="38" width="76" height="146" rx="10" fill="${c0}"/>${label(62, 78, 76, 70, pal, p, { r: 0, bf: 14 })}<rect x="62" y="38" width="76" height="146" rx="10" fill="url(#sh)"/><ellipse cx="100" cy="40" rx="38" ry="7" fill="#C9CFCB"/><ellipse cx="100" cy="40" rx="30" ry="4.5" fill="#AEB6B1"/>`; break;
    case 'bottle':
      g = shadow(100, 34) + `<path d="M88 16h24v26c0 10 22 18 22 40v96a8 8 0 0 1-8 8H74a8 8 0 0 1-8-8V82c0-22 22-30 22-40z" fill="${c0}"/><rect x="86" y="8" width="28" height="14" rx="3" fill="${c2}"/>${label(66, 96, 68, 64, pal, p, { r: 2, bf: 13, df: 9 })}<path d="M88 16h24v26c0 10 22 18 22 40v96a8 8 0 0 1-8 8H74a8 8 0 0 1-8-8V82c0-22 22-30 22-40z" fill="url(#sh)"/>`; break;
    case 'sauce':
      g = shadow(100, 32) + `<path d="M92 30h16v16c0 6 22 14 22 34v96a8 8 0 0 1-8 8H78a8 8 0 0 1-8-8V80c0-20 22-28 22-34z" fill="${c0}"/><path d="M90 14h20l-2 18H92z" fill="${c2}"/>${label(70, 96, 60, 66, pal, p, { r: 2, bf: 12, df: 9 })}<path d="M92 30h16v16c0 6 22 14 22 34v96a8 8 0 0 1-8 8H78a8 8 0 0 1-8-8V80c0-20 22-28 22-34z" fill="url(#sh)"/>`; break;
    case 'lotion':
      g = shadow(100, 36) + `<rect x="64" y="40" width="72" height="144" rx="14" fill="${c0}"/><rect x="82" y="22" width="36" height="22" rx="4" fill="${c2}"/><rect x="94" y="10" width="12" height="14" fill="${c2}"/><rect x="94" y="10" width="34" height="7" rx="3" fill="${c2}"/>${label(70, 80, 60, 72, pal, p, { r: 4, bf: 12, df: 9 })}<rect x="64" y="40" width="72" height="144" rx="14" fill="url(#sh)"/>`; break;
    case 'bag':
      g = shadow(100, 52) + `<path d="M48 30l8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8v148a6 6 0 0 1-6 6H54a6 6 0 0 1-6-6z" fill="${c0}"/>${label(58, 62, 84, 84, pal, p, { r: 6, bf: 16, df: 10 })}<path d="M48 30l8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8v148a6 6 0 0 1-6 6H54a6 6 0 0 1-6-6z" fill="url(#sh)"/>`; break;
    case 'sack':
      g = shadow(100, 62) + `<path d="M40 30q60-14 120 0l6 146q-66 14-132 0z" fill="${c0}"/><path d="M40 30q60-14 120 0" stroke="${c2}" stroke-width="5" fill="none"/>${label(56, 66, 88, 86, pal, p, { r: 6, bf: 17, df: 10 })}<path d="M40 30q60-14 120 0l6 146q-66 14-132 0z" fill="url(#sh)"/><path d="M64 40v4M80 38v4M96 37v4M112 37v4M128 38v4M140 40v4" stroke="#fff" stroke-opacity=".5" stroke-width="2"/>`; break;
    case 'tin':
      g = shadow(100, 44) + `<rect x="58" y="70" width="84" height="114" rx="8" fill="${c0}"/>${label(58, 92, 84, 72, pal, p, { r: 0, bf: 14 })}<rect x="58" y="70" width="84" height="114" rx="8" fill="url(#sh)"/><ellipse cx="100" cy="72" rx="42" ry="8" fill="#C9CFCB"/><ellipse cx="100" cy="72" rx="34" ry="5" fill="#AEB6B1"/><path d="M58 90h84M58 168h84" stroke="#000" stroke-opacity=".12"/>`; break;
    case 'shaker':
      g = shadow(100, 32) + `<rect x="70" y="58" width="60" height="126" rx="8" fill="${c0}"/><rect x="68" y="36" width="64" height="26" rx="5" fill="${c2}"/><path d="M76 44h48M76 52h48" stroke="#000" stroke-opacity=".15"/>${label(70, 88, 60, 70, pal, p, { r: 2, bf: 12, df: 9 })}<rect x="70" y="58" width="60" height="126" rx="8" fill="url(#sh)"/>`; break;
    case 'pouch':
      g = shadow(100, 50) + `<path d="M52 24h96v140q0 20-12 20H64q-12 0-12-20z" fill="${c0}"/><path d="M52 24h96v8H52z" fill="#000" opacity=".15"/><circle cx="140" cy="38" r="3" fill="#fff" opacity=".7"/>${label(62, 64, 76, 80, pal, p, { r: 6, bf: 15, df: 10 })}<path d="M52 24h96v140q0 20-12 20H64q-12 0-12-20z" fill="url(#sh)"/>`; break;
    case 'box':
      g = shadow(100, 52) + `<path d="M50 52l14-16h86l-14 16z" fill="${c2}"/><path d="M136 52l14-16v132l-14 16z" fill="#000" opacity=".25"/><rect x="50" y="52" width="86" height="132" fill="${c0}"/><path d="M136 52l14-16v132l-14 16z" fill="${c0}" opacity=".7"/>${label(56, 74, 74, 82, pal, p, { r: 4, bf: 15, df: 10 })}<rect x="50" y="52" width="86" height="132" fill="url(#sh)"/>`; break;
    case 'tub':
      g = shadow(100, 52) + `<path d="M50 64h100l-6 112a8 8 0 0 1-8 8H64a8 8 0 0 1-8-8z" fill="${c0}"/><rect x="46" y="48" width="108" height="20" rx="5" fill="${c2}"/>${label(60, 84, 80, 76, pal, p, { r: 4, bf: 15, df: 10 })}<path d="M50 64h100l-6 112a8 8 0 0 1-8 8H64a8 8 0 0 1-8-8z" fill="url(#sh)"/>`; break;
    case 'jar':
      g = shadow(100, 48) + `<rect x="56" y="82" width="88" height="102" rx="16" fill="${c0}"/><rect x="60" y="62" width="80" height="24" rx="6" fill="${c2}"/>${label(62, 102, 76, 64, pal, p, { r: 6, bf: 13, df: 9 })}<rect x="56" y="82" width="88" height="102" rx="16" fill="url(#sh)"/>`; break;
    case 'carton':
      g = shadow(100, 40) + `<path d="M66 50l16-26h36l16 26z" fill="${c2}"/><rect x="92" y="14" width="16" height="12" rx="2" fill="${c0}"/><rect x="66" y="50" width="68" height="134" fill="${c0}"/>${label(70, 80, 60, 76, pal, p, { r: 4, bf: 13, df: 9 })}<rect x="66" y="50" width="68" height="134" fill="url(#sh)"/>`; break;
    case 'chips':
      g = shadow(100, 56) + `<path d="M46 34q54-10 108 0l-4 18 4 18-4 18 4 18-4 18 4 18-4 18 4 18q-54 10-108 0l4-18-4-18 4-18-4-18 4-18-4-18 4-18z" fill="${c0}"/><circle cx="100" cy="112" r="34" fill="${c2}" opacity=".35"/>${label(60, 70, 80, 74, pal, p, { r: 8, bf: 14, df: 10 })}<path d="M46 34q54-10 108 0l-4 18 4 18-4 18 4 18-4 18 4 18-4 18 4 18q-54 10-108 0l4-18-4-18 4-18-4-18 4-18-4-18 4-18z" fill="url(#sh)"/>`; break;
    case 'braid': {
      const col = /Burgundy/.test(p.name) ? '#6E1730' : /27\/30/.test(p.name) ? '#A4602A' : /35/.test(p.name) ? '#7A2F1C' : '#3A2418';
      g = shadow(100, 46) + `<rect x="58" y="16" width="84" height="168" rx="6" fill="${c0}"/><path d="M72 66c4 40-6 70 2 112M84 66c-4 40 6 70-2 112M96 66c4 40-6 70 2 112M108 66c-4 40 6 70-2 112M120 66c4 40-6 70 2 112" stroke="${col}" stroke-width="7" fill="none" stroke-linecap="round"/>${label(64, 22, 72, 44, pal, p, { r: 4, bf: 12, df: 8 })}<rect x="58" y="16" width="84" height="168" rx="6" fill="url(#sh)"/>`; break; }
    case 'soap':
      g = shadow(100, 60) + `<rect x="38" y="96" width="124" height="80" rx="12" fill="${c0}"/><path d="M38 120h124" stroke="${c2}" stroke-width="6"/>${label(60, 104, 80, 62, pal, p, { r: 6, bf: 14, df: 10 })}<rect x="38" y="96" width="124" height="80" rx="12" fill="url(#sh)"/>`; break;
    default:
      g = shadow(100, 40) + `<rect x="60" y="40" width="80" height="144" rx="10" fill="${c0}"/>${label(64, 80, 72, 70, pal, p)}`;
  }
  return `<svg viewBox="0 0 200 200" role="img" aria-label="${svgEsc(p.name)}" xmlns="http://www.w3.org/2000/svg"><defs>${shine}</defs>${g}</svg>`;
}
