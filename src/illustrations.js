/* Marché Tropical illustrations: flat, brand coloured, drawn in SVG. */
const C = { or: '#FF6500', orL: '#FF9A4D', gr: '#0F6D1E', grL: '#2E8B3E', dk: '#0A4A15', cr: '#FBF6EE', sd: '#F3ECE0', mg: '#FFB400', rd: '#D9361F', br: '#8A5A2B', brL: '#C08A52', ink: '#16201A', wh: '#FFFFFF' };
const leaf = (x, y, r, s, f = C.gr) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M0 0C-18-22-16-52 0-70 16-52 18-22 0 0z" fill="${f}"/><path d="M0-4V-62" stroke="${C.dk}" stroke-width="2" opacity=".5"/></g>`;
const ILLUS = {
  van: `<svg viewBox="0 0 640 170" class="ill-van"><path d="M0 150H640" stroke="${C.sd}" stroke-width="4"/><path class="road" d="M0 150H640" stroke="${C.line || '#D8D2C6'}" stroke-width="3" stroke-dasharray="16 14"/>
  <g class="tree" transform="translate(560 150)"><rect x="-4" y="-46" width="8" height="46" fill="${C.br}"/>${leaf(0, -40, -30, .7)}${leaf(0, -40, 30, .7, C.grL)}${leaf(0, -44, 0, .8)}</g>
  <g class="tree" transform="translate(40 150)"><rect x="-4" y="-38" width="8" height="38" fill="${C.br}"/>${leaf(0, -34, -35, .6, C.grL)}${leaf(0, -34, 35, .6)}</g>
  <g class="van-g"><g transform="translate(170 40)">
   <rect x="0" y="18" width="210" height="86" rx="10" fill="${C.wh}" stroke="${C.ink}" stroke-width="3"/>
   <path d="M210 40h52l36 34v30h-88z" fill="${C.or}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>
   <path d="M222 50h36l24 24h-60z" fill="#CDE7F3" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/>
   <rect x="0" y="86" width="298" height="18" fill="${C.gr}"/>
   <circle cx="20" cy="50" r="15" fill="${C.or}"/><circle cx="20" cy="50" r="9" fill="${C.mg}"/><circle cx="20" cy="50" r="4" fill="${C.rd}"/>
   <text x="44" y="56" font-family="Inter, Arial" font-weight="800" font-size="21" fill="${C.or}">Marché</text><text x="130" y="56" font-family="Inter, Arial" font-weight="800" font-size="21" fill="${C.gr}">Tropical</text>
   <text x="44" y="76" font-family="Inter, Arial" font-weight="600" font-size="11" fill="${C.ink}" opacity=".6">marchetropical.lu</text>
   <g transform="translate(60 108)"><g class="wheel"><circle r="20" fill="${C.ink}"/><circle r="8" fill="${C.sd}"/><path d="M0-8V8M-8 0H8" stroke="${C.ink}" stroke-width="2"/></g></g>
   <g transform="translate(250 108)"><g class="wheel"><circle r="20" fill="${C.ink}"/><circle r="8" fill="${C.sd}"/><path d="M0-8V8M-8 0H8" stroke="${C.ink}" stroke-width="2"/></g></g>
   <rect x="292" y="80" width="10" height="8" rx="2" fill="${C.mg}"/>
  </g><g class="puff" fill="${C.sd}"><circle cx="150" cy="128" r="8"/><circle cx="134" cy="122" r="6"/><circle cx="120" cy="128" r="4"/></g></g></svg>`,
  vanmini: `<svg viewBox="0 0 48 32"><rect x="2" y="6" width="28" height="18" rx="3" fill="${C.gr}"/><path d="M30 11h8l7 7v6H30z" fill="${C.or}"/><path d="M32 13h5l4 5h-9z" fill="#CDE7F3"/><circle cx="10" cy="26" r="4.5" fill="${C.ink}"/><circle cx="37" cy="26" r="4.5" fill="${C.ink}"/><circle cx="10" cy="26" r="1.6" fill="#fff"/><circle cx="37" cy="26" r="1.6" fill="#fff"/></svg>`,
  basket: `<svg viewBox="0 0 220 180"><ellipse cx="110" cy="168" rx="86" ry="8" fill="${C.ink}" opacity=".08"/>
   <path d="M58 70C58 22 162 22 162 70" fill="none" stroke="${C.br}" stroke-width="10" stroke-linecap="round"/>
   ${leaf(80, 78, -40, .9)}${leaf(140, 74, 35, .85, C.grL)}
   <circle cx="92" cy="74" r="20" fill="${C.rd}"/><path d="M92 54c4-6 10-8 14-6" stroke="${C.gr}" stroke-width="4" fill="none" stroke-linecap="round"/>
   <path d="M118 58c20-6 34 6 30 20-12 2-26-4-30-20z" fill="${C.mg}"/>
   <ellipse cx="128" cy="80" rx="20" ry="13" fill="${C.or}"/>
   <path d="M30 78h160l-18 82a10 10 0 0 1-10 8H58a10 10 0 0 1-10-8z" fill="${C.brL}"/>
   <path d="M30 78h160l-4 18H34z" fill="${C.br}"/>
   <path d="M44 110h132M50 134h120M70 96l6 70M110 96v70M150 96l-6 70" stroke="${C.br}" stroke-width="4" opacity=".55"/></svg>`,
  emptycart: `<svg viewBox="0 0 220 170"><ellipse cx="110" cy="160" rx="80" ry="7" fill="${C.ink}" opacity=".08"/>
   <path d="M30 40h26l22 86h92l18-62H66" fill="none" stroke="${C.ink}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
   <circle cx="92" cy="146" r="10" fill="${C.or}"/><circle cx="160" cy="146" r="10" fill="${C.or}"/>
   ${leaf(120, 78, -20, .55)}${leaf(130, 80, 25, .5, C.grL)}<circle cx="146" cy="44" r="5" fill="${C.mg}"/><circle cx="168" cy="30" r="3.5" fill="${C.or}"/><circle cx="186" cy="48" r="3" fill="${C.gr}"/></svg>`,
  heart: `<svg viewBox="0 0 220 170"><ellipse cx="110" cy="160" rx="70" ry="7" fill="${C.ink}" opacity=".08"/>${leaf(70, 140, -45, .9)}${leaf(150, 140, 45, .9, C.grL)}<path d="M110 146S44 104 44 66a30 30 0 0 1 66-14 30 30 0 0 1 66 14c0 38-66 80-66 80z" fill="${C.or}"/><path d="M78 62a18 18 0 0 1 18-12" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".6"/></svg>`,
  done: `<svg viewBox="0 0 260 170"><path d="M10 150H250" stroke="#D8D2C6" stroke-width="3" stroke-dasharray="12 10"/><g transform="translate(36 54) scale(.62)"><rect x="0" y="18" width="210" height="86" rx="10" fill="#fff" stroke="${C.ink}" stroke-width="4"/><path d="M210 40h52l36 34v30h-88z" fill="${C.or}" stroke="${C.ink}" stroke-width="4"/><rect x="0" y="86" width="298" height="18" fill="${C.gr}"/><circle cx="60" cy="112" r="20" fill="${C.ink}"/><circle cx="250" cy="112" r="20" fill="${C.ink}"/></g><circle class="tick" cx="206" cy="46" r="30" fill="${C.gr}"/><path class="tickp" d="M192 46l10 10 18-20" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  spread: `<svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice"><rect width="600" height="420" fill="${C.or}"/><circle cx="460" cy="90" r="160" fill="${C.orL}" opacity=".5"/><rect y="250" width="600" height="170" fill="${C.br}"/><rect y="250" width="600" height="14" fill="${C.brL}"/>
   <ellipse cx="170" cy="280" rx="120" ry="34" fill="#fff"/><ellipse cx="170" cy="272" rx="96" ry="22" fill="${C.rd}"/><circle cx="140" cy="266" r="8" fill="${C.mg}"/><circle cx="196" cy="270" r="7" fill="${C.gr}"/>
   <ellipse cx="420" cy="292" rx="110" ry="30" fill="#fff"/><ellipse cx="420" cy="284" rx="86" ry="18" fill="${C.mg}"/><ellipse cx="400" cy="280" rx="22" ry="8" fill="${C.br}"/><ellipse cx="446" cy="282" rx="18" ry="7" fill="${C.br}"/>
   ${leaf(60, 250, -30, 1.3)}${leaf(560, 250, 30, 1.3, C.grL)}${leaf(300, 240, 0, 1, C.gr)}</svg>`,
  spices: `<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice"><rect width="600" height="400" fill="${C.dk}"/><path d="M40 330L130 170 220 330z" fill="${C.or}"/><path d="M180 330L280 140 380 330z" fill="${C.rd}"/><path d="M330 330L420 180 510 330z" fill="${C.mg}"/><path d="M450 330L530 210 600 330z" fill="${C.grL}"/><rect y="330" width="600" height="70" fill="${C.br}"/></svg>`,
  pot: `<svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice"><rect width="500" height="400" fill="${C.gr}"/><ellipse cx="250" cy="250" rx="170" ry="60" fill="${C.ink}" opacity=".25"/><path d="M90 200h320l-20 120a30 30 0 0 1-30 26H140a30 30 0 0 1-30-26z" fill="${C.ink}"/><ellipse cx="250" cy="200" rx="160" ry="34" fill="${C.or}"/><circle cx="200" cy="192" r="10" fill="${C.mg}"/><circle cx="290" cy="198" r="9" fill="${C.rd}"/>${leaf(250, 170, 0, .8, C.grL)}</svg>`,
  stall: `<svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice"><rect width="500" height="400" fill="${C.orL}"/><path d="M40 90h420v40H40z" fill="${C.gr}"/><path d="M40 130q35 30 70 0t70 0 70 0 70 0 70 0 70 0" fill="${C.gr}"/><rect x="60" y="250" width="380" height="120" fill="${C.br}"/><circle cx="120" cy="240" r="24" fill="${C.mg}"/><circle cx="170" cy="236" r="22" fill="${C.or}"/><circle cx="220" cy="240" r="24" fill="${C.rd}"/><ellipse cx="300" cy="238" rx="40" ry="18" fill="${C.mg}"/><circle cx="380" cy="240" r="22" fill="${C.grL}"/></svg>`
};
function drawIllus(root = document) { root.querySelectorAll('[data-illus]').forEach(el => { if (!el.dataset.drawn) { el.innerHTML = ILLUS[el.dataset.illus] || ''; el.dataset.drawn = 1; } }); }
