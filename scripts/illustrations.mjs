// Original SVG illustrations for the question library, drawn for this
// project (no third-party artwork, nothing to license or credit).
//
// They are inlined into the generated pages so they cost no extra requests,
// stay sharp at any zoom, and take their colours from CSS variables
// (--ill-*) in css/style.css, which switch for dark mode.
//
// All illustrations are decorative: they carry aria-hidden="true" and the
// text next to them says everything they show.

const svg = (viewBox, body, cls) =>
  `<svg class="${cls}" viewBox="${viewBox}" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

// ── LANDSCAPE ─────────────────────────────────────────────────────────────────
// A path winding through hills toward a dawn horizon, under a crescent moon.
// Used as the home page hero and, cropped shorter, as the topic page banner.
const STARS = [
  [40, 30, 1.2], [92, 62, 0.9], [138, 22, 1.4], [196, 48, 0.8], [240, 18, 1.1],
  [292, 58, 0.9], [350, 26, 1.3], [404, 52, 0.8], [520, 30, 1], [566, 66, 1.3],
  [612, 24, 0.9], [640, 52, 1.1], [70, 96, 0.8], [176, 90, 1], [460, 86, 0.9],
  [600, 104, 0.8], [26, 70, 0.9], [318, 92, 0.7],
];

function landscape(id) {
  const stars = STARS.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join("");
  return `<defs>
    <linearGradient id="${id}-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" style="stop-color:var(--ill-sky-top)"/>
      <stop offset=".72" style="stop-color:var(--ill-sky-mid)"/>
      <stop offset="1" style="stop-color:var(--ill-sky-low)"/>
    </linearGradient>
    <radialGradient id="${id}-glow" cx="330" cy="176" r="230" gradientUnits="userSpaceOnUse">
      <stop offset="0" style="stop-color:var(--ill-glow);stop-opacity:.95"/>
      <stop offset="1" style="stop-color:var(--ill-glow);stop-opacity:0"/>
    </radialGradient>
  </defs>
  <rect width="660" height="260" fill="url(#${id}-sky)"/>
  <rect width="660" height="260" fill="url(#${id}-glow)"/>
  <g class="ill-stars">${stars}</g>
  <path class="ill-moon" d="M520 50a24 24 0 1 0 22 33a19 19 0 1 1 -22 -33z"/>
  <path class="ill-hill3" d="M0 182 C70 160 130 168 190 176 C250 184 290 170 330 172 C390 175 430 160 500 164 C570 168 620 176 660 170 V260 H0z"/>
  <path class="ill-hill2" d="M0 204 C60 186 120 190 180 198 C240 206 280 192 330 190 C380 188 420 200 470 196 C540 190 600 184 660 194 V260 H0z"/>
  <path class="ill-hill1" d="M0 232 C80 214 160 212 240 222 C300 230 360 214 430 216 C520 218 590 230 660 222 V260 H0z"/>
  <path class="ill-path" d="M262 260 C300 240 404 232 372 214 C346 202 316 200 327 195 C330 194 332 193 334 193 L337 193 C339 194 340 195 341 196 C348 202 392 204 404 214 C432 236 388 246 404 260z"/>
  <path class="ill-path-edge" d="M262 260 C300 240 404 232 372 214 C346 202 316 200 327 195 C330 194 332 193 334 193"/>`;
}

export function heroArt() {
  return svg("0 0 660 260", landscape("hero"), "ill ill-hero");
}

// The banner shows the bottom of the same landscape, with the topic's own
// icon on a disc over the horizon.
export function bannerArt(topic) {
  const icon = ICONS[topic] || "";
  return svg("0 100 660 160", `${landscape("bn")}
  <circle class="ill-disc" cx="330" cy="168" r="44"/>
  <g class="ill-icon" transform="translate(298 136)">${icon}</g>`, "ill ill-banner");
}

// ── TOPIC ICONS ───────────────────────────────────────────────────────────────
// 64×64 line drawings. `ill-f` marks the parts filled with the accent tint.
const ICONS = {
  // An eye: can we trust what we perceive?
  "reality": `<path d="M6 32 C16 18 48 18 58 32 C48 46 16 46 6 32z"/><circle class="ill-f" cx="32" cy="32" r="9"/><circle cx="32" cy="32" r="3.5" class="ill-solid"/>`,
  // A burst from a single point: the beginning of the universe.
  "beginning": `<circle class="ill-f" cx="32" cy="32" r="6"/><path d="M32 6v10M32 48v10M6 32h10M48 32h10M13.6 13.6l7 7M43.4 43.4l7 7M13.6 50.4l7-7M43.4 20.6l7-7"/><circle cx="32" cy="32" r="14" stroke-dasharray="2 5"/>`,
  // Falling dominoes: a chain of causes needs a first one.
  "cause": `<rect class="ill-f" x="6" y="24" width="9" height="30" rx="1.5" transform="rotate(25 6 54)"/><rect x="27" y="24" width="9" height="30" rx="1.5" transform="rotate(12 27 54)"/><rect x="46" y="24" width="9" height="30" rx="1.5"/><path d="M4 56h56"/>`,
  // Several orbits around one centre: one source behind every law.
  "one-god": `<circle class="ill-f" cx="32" cy="32" r="7"/><ellipse cx="32" cy="32" rx="24" ry="10"/><ellipse cx="32" cy="32" rx="24" ry="10" transform="rotate(60 32 32)"/><ellipse cx="32" cy="32" rx="24" ry="10" transform="rotate(120 32 32)"/>`,
  // Rain falling from a cloud, with light breaking through.
  "suffering": `<path class="ill-f" d="M44 18a10 10 0 0 0-19 3"/><path d="M44 18a10 10 0 0 0-19 3"/><path d="M18 38h28a9 9 0 0 0 0-18a13 13 0 0 0-25 3a8 8 0 0 0-3 15z"/><path d="M22 44l-3 7M32 44l-3 7M42 44l-3 7"/><path d="M50 8v4M58 14l-3 3"/>`,
  // A lantern: guidance as light.
  "revelation": `<path d="M32 4v6M26 10h12"/><path d="M24 14h16l4 8v20l-4 8H24l-4-8V22z"/><path class="ill-f" d="M32 24c5 6 5 12 0 16c-5-4-5-10 0-16z"/><path d="M26 54h12M28 58h8"/>`,
  // A palm tree over desert dunes: 7th-century Arabia.
  "muhammad": `<path d="M33 54C34 42 33 30 30 20"/><path class="ill-f" d="M30 20C24 12 14 12 8 18C16 16 22 18 30 20z"/><path class="ill-f" d="M30 20C34 10 46 8 54 14C46 14 38 16 30 20z"/><path d="M30 20C24 22 18 28 16 36M30 20C38 22 44 28 46 36"/><path d="M4 58C16 50 26 52 34 56C42 52 52 50 60 56"/>`,
  // An open book held safe: preservation.
  "quran-preserved": `<path d="M32 18C26 13 16 12 8 14v34c8-2 18-1 24 4c6-5 16-6 24-4V14c-8-2-18-1-24 4z"/><path d="M32 18v34"/><path class="ill-f" d="M32 4l10 4v6c0 6-4 9-10 11c-6-2-10-5-10-11V8z"/>`,
  // A spiral galaxy: the natural world described in the text.
  "quran-science": `<circle class="ill-f" cx="32" cy="32" r="5"/><path d="M32 27C42 22 52 30 48 40C44 50 26 52 18 44C8 34 14 18 28 12"/><path d="M32 37C22 42 12 34 16 24C20 14 38 12 46 20C56 30 50 46 36 52"/><circle cx="54" cy="12" r="1.6" class="ill-solid"/><circle cx="10" cy="54" r="1.4" class="ill-solid"/>`,
  // A reed pen (qalam) and inkwell: the literary challenge.
  "quran-literary": `<path d="M48 6L22 40l-3 9l8-5L52 10z"/><path d="M44 11l4 4"/><path class="ill-f" d="M10 46h18v10a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2z"/><path d="M14 46v-4h10v4"/><path d="M34 56c6-4 14-4 22 0"/>`,
  // A compass: direction and purpose.
  "purpose": `<circle cx="32" cy="32" r="24"/><path class="ill-f" d="M40 24l-5 11l-11 5l5-11z"/><circle cx="32" cy="32" r="2" class="ill-solid"/><path d="M32 4v5M32 55v5M4 32h5M55 32h5"/>`,
};

export function topicIcon(topic) {
  return ICONS[topic] ? svg("0 0 64 64", ICONS[topic], "ill ill-topic") : "";
}

// ── ORNAMENT ──────────────────────────────────────────────────────────────────
// An eight-pointed star (two overlapping squares), a motif common across
// Islamic geometric art, used to mark section headings.
export function starOrnament() {
  return svg("0 0 24 24", `<rect x="5" y="5" width="14" height="14"/><rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)"/><circle cx="12" cy="12" r="2.2" class="ill-solid"/>`, "ill ill-star");
}

export const TOPICS_WITH_ICONS = Object.keys(ICONS);
