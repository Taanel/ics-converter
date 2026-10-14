// HTML-Vorlagen für die Reiseseite und die Startseite.
// Design: gelbe Flughafen-Wegweiser. Gelb ist nur für Wegweisung da
// (nächster Termin, Aktionen), alles andere ist schwarz/anthrazit.

import { dayOf, formatDay, formatDuration, formatWeekdayShort, timeOf } from './dates.js';

// ---------------------------------------------------------------------------
// Hilfsfunktionen

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ESCAPES[c]);

// Piktogramme als SVG (24×24, 2px Strich), damit sie überall gleich aussehen.
const ICON_PATHS = {
  bus: '<rect x="4" y="3" width="16" height="15" rx="2"/><path d="M4 11h16M8 3v8M16 3v8M7 18v3M17 18v3"/><circle cx="8" cy="14.5" r=".6" fill="currentColor"/><circle cx="16" cy="14.5" r=".6" fill="currentColor"/>',
  train: '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 10h14M9 21l1.5-4M15 21l-1.5-4"/><circle cx="9" cy="13.5" r=".6" fill="currentColor"/><circle cx="15" cy="13.5" r=".6" fill="currentColor"/>',
  plane: '<path d="M2.5 13.5 21 6l-3.5 8.5L11 13l-2 5-2-6.5z"/>',
  home: '<path d="M3 11 12 4l9 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/>',
  pin: '<path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="1.5"/><path d="M3.5 10h17M8 3v4M16 3v4M12 13v5M9.5 15.5h5"/>',
  route: '<path d="M5 19 19 5M9 5h10v10"/>',
  sync: '<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.3 4.9L20 16"/><path d="M20 20v-4h-4"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
};

function icon(name, label) {
  const a11y = label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true"';
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${a11y}>${ICON_PATHS[name]}</svg>`;
}

const ICON_LABELS = { bus: 'Bus', train: 'Zug', plane: 'Flug', home: 'Unterkunft', pin: 'Ort' };

// ---------------------------------------------------------------------------
// Styles (gemeinsam für alle Seiten)

function styles(root) {
  return `
@font-face{font-family:"Hanken Grotesk";font-weight:100 900;font-display:swap;
  src:url("${root}assets/fonts/hanken-grotesk-latin.woff2") format("woff2");
  unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2190-2199,U+2212}
@font-face{font-family:"Hanken Grotesk";font-weight:100 900;font-display:swap;
  src:url("${root}assets/fonts/hanken-grotesk-latin-ext.woff2") format("woff2");
  unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}

:root{
  /* Schilder sind in beiden Modi schwarz; nur der Seitengrund wechselt. */
  --sign:#FFCC00; --sign-ink:#111111; --sign-soft:#3A3000;
  --ground:#D9DBDE; --ink:#111111; --ink-soft:#3E4146;
  --band:#111111; --band-ink:#FFFFFF; --band-soft:#B9B6AE; --rule:#111111;
  --picto:#FFFFFF; --picto-ink:#111111;
  --btn:#FFFFFF; --btn-ink:#111111;
  --focus:#111111;
  color-scheme:light;
}
@media (prefers-color-scheme:dark){:root{
  --ground:#2B2B2B; --ink:#FFFFFF; --ink-soft:#B9B6AE; --rule:#444444;
  --focus:#FFCC00;
  color-scheme:dark;
}}

*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
body{margin:0;background:var(--ground);color:var(--ink);
  font:400 1rem/1.5 "Hanken Grotesk",system-ui,sans-serif;font-variant-numeric:tabular-nums;
  -webkit-font-smoothing:antialiased}
::selection{background:var(--sign);color:var(--sign-ink)}
a{color:inherit;text-underline-offset:.2em;text-decoration-thickness:1px}
:focus-visible{outline:3px solid var(--focus);outline-offset:2px}
h1,h2,h3,p,ul{margin:0}
.wrap{max-width:38rem;margin:0 auto;padding:0 16px}
.icon{width:24px;height:24px;flex:none}

/* Kopf */
.head{padding-top:32px;padding-bottom:20px}
.head h1{font-size:clamp(2.75rem,12vw,4rem);font-weight:800;line-height:.95;letter-spacing:-.03em}
.head p{margin-top:10px;font-size:1.0625rem;font-weight:500;color:var(--ink-soft);text-wrap:balance}

/* Klebender Wegweiser: immer sichtbar, zeigt den nächsten Termin */
.strip{position:fixed;top:0;left:0;right:0;z-index:5;background:var(--sign);color:var(--sign-ink);
  transform:translateY(-100%);transition:transform .35s cubic-bezier(.16,1,.3,1)}
.strip.show{transform:none}
.strip a{display:flex;align-items:center;gap:12px;min-height:56px;padding-top:8px;padding-bottom:8px;text-decoration:none}
.strip .picto{background:var(--sign-ink);color:var(--sign)}
.strip-text{flex:1;min-width:0;line-height:1.25}
.strip-text b{display:block;font-weight:800;font-size:1.0625rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.strip-text span{font-weight:600;font-size:.9375rem;color:var(--sign-soft)}
.strip .icon:last-child{width:28px;height:28px}
.strip-text.flip{animation:flip .5s cubic-bezier(.16,1,.3,1)}
@keyframes flip{from{clip-path:inset(0 0 100% 0);transform:translateY(-6px)}to{clip-path:inset(0);transform:none}}

/* Tage und Termine */
.day{margin:28px 0 8px;font-size:.9375rem;font-weight:700;color:var(--ink-soft)}
.bands{display:grid;gap:4px}
.band{display:grid;grid-template-columns:44px 1fr;gap:0 14px;padding:18px 14px 16px;
  background:var(--band);color:var(--band-ink);scroll-margin-top:72px;
  border-top:1px solid var(--rule);--focus:var(--sign)}
.picto{width:44px;height:44px;display:grid;place-items:center;background:var(--picto);color:var(--picto-ink);border-radius:2px}
.time-row{display:flex;align-items:baseline;flex-wrap:wrap;gap:0 10px}
.time{font-size:2.125rem;font-weight:800;line-height:1;letter-spacing:-.02em}
.until{font-size:1.0625rem;font-weight:600}
.dur{margin-left:auto;font-size:.875rem;font-weight:600;color:var(--band-soft)}
.state{display:none;margin-left:2px;padding:3px 7px 4px;border-radius:2px;font-size:.75rem;font-weight:800;
  letter-spacing:.06em;text-transform:uppercase;background:var(--band-ink);color:var(--band)}
.band h3{margin-top:8px;font-size:1.1875rem;font-weight:700;line-height:1.25}
.place{margin-top:4px;font-size:.9375rem;line-height:1.4;color:var(--band-soft)}
.place b{font-weight:700;color:var(--band-ink)}
.notes{margin-top:10px;padding:0;list-style:none;font-size:.9375rem;line-height:1.45;display:grid;gap:4px}
.notes li{padding-left:14px;position:relative}
.notes li::before{content:"";position:absolute;left:0;top:.62em;width:6px;height:2px;background:currentColor}
.actions{grid-column:1/-1;display:grid;grid-template-columns:repeat(auto-fit,minmax(9.5rem,1fr));gap:8px;margin-top:16px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 12px;border-radius:2px;white-space:nowrap;
  background:var(--btn);color:var(--btn-ink);font-weight:700;font-size:.875rem;text-decoration:none;
  transition:transform .15s cubic-bezier(.16,1,.3,1),filter .15s}
.btn:hover{filter:brightness(1.12)}
.btn:active{transform:scale(.97)}
.btn .icon{width:20px;height:20px}
.route{display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:44px;margin-top:4px;font-weight:700;font-size:.9375rem;color:var(--band-ink)}
.route .icon{width:28px;height:28px;padding:5px;background:var(--sign);color:var(--sign-ink);border-radius:2px}
.band.is-next .route .icon{background:var(--sign-ink);color:var(--sign)}

/* Der nächste Termin wird zum gelben Schild */
.band.is-next{background:var(--sign);color:var(--sign-ink);border-top-color:var(--sign);
  --band-ink:var(--sign-ink);--band-soft:var(--sign-soft);--band:var(--sign);
  --btn:var(--sign-ink);--btn-ink:var(--sign);--focus:var(--sign-ink)}
.band.is-next .picto{background:var(--sign-ink);color:var(--sign)}
.band.is-next .time{font-size:3.5rem}
.band.is-next .state,.band[data-state="now"] .state,.band[data-state="past"] .state{display:inline-block}
.band[data-state="past"]{opacity:.55}
.band[data-state="past"] .notes,.band[data-state="past"] .actions{display:none}

/* Alle Termine */
.all{margin-top:40px;padding:24px 16px;background:var(--band);color:var(--band-ink);border-top:1px solid var(--rule);--focus:var(--sign)}
.all h2{font-size:1.375rem;font-weight:800;letter-spacing:-.01em}
.all > p:not(.hint){margin-top:6px;color:var(--band-soft);max-width:60ch}
.all .actions{margin-top:16px;grid-template-columns:1fr}
.all .btn.primary{background:var(--sign);color:var(--sign-ink)}
.hint{margin-top:20px;padding-top:14px;border-top:1px solid #3A3A3A;font-size:.875rem;color:var(--band-soft)}
.hint b{color:var(--band-ink)}

/* Startseite */
.trip-link{display:grid;grid-template-columns:1fr auto;align-items:center;gap:12px;padding:18px 16px;
  background:var(--band);color:var(--band-ink);text-decoration:none;border-top:1px solid var(--rule)}
.trip-link b{display:block;font-size:1.5rem;font-weight:800;letter-spacing:-.02em}
.trip-link span{color:var(--band-soft);font-weight:500}
.trip-link{--focus:var(--sign)}
.trip-link:hover{background:var(--sign);color:var(--sign-ink);--band-soft:var(--sign-soft)}

.foot{padding-top:40px;padding-bottom:48px;font-size:.875rem;color:var(--ink-soft)}

@media (min-width:40rem){
  .band{padding:22px 24px 20px;grid-template-columns:52px 1fr;gap:0 18px}
  .picto{width:52px;height:52px}
  .all{padding:28px 24px}
}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`;
}

function documentShell({ title, description, root, body, script = '' }) {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta name="theme-color" content="#FFCC00">
<link rel="preload" href="${root}assets/fonts/hanken-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin>
<style>${styles(root)}</style>
</head>
<body>
${body}
${script ? `<script>${script}</script>` : ''}
</body>
</html>
`;
}

// ---------------------------------------------------------------------------
// Reiseseite

function eventBand(event, trip) {
  const sameDay = dayOf(event.start) === dayOf(event.end);
  const until = sameDay
    ? `– ${timeOf(event.end)}`
    : `bis ${formatWeekdayShort(dayOf(event.end))} ${timeOf(event.end)}`;
  const duration = sameDay ? formatDuration(event.startUtc, event.endUtc) : '';
  const iconName = event.icon ?? 'pin';

  const places = event.arrival
    ? `<p class="place"><b>ab</b> ${esc(event.location)}</p><p class="place"><b>an</b> ${esc(event.arrival)}</p>`
    : `<p class="place">${esc(event.location)}</p>`;
  const notes = event.notes?.length
    ? `<ul class="notes">${event.notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>`
    : '';

  return `
<article class="band" id="${esc(event.id)}" data-start="${event.startUtc.toISOString()}" data-end="${event.endUtc.toISOString()}" data-title="${esc(event.title)}" aria-labelledby="${esc(event.id)}-title">
  <div class="picto">${icon(iconName, ICON_LABELS[iconName])}</div>
  <div>
    <div class="time-row">
      <p class="time">${timeOf(event.start)}</p>
      <p class="until">${esc(until)}</p>
      <span class="state" aria-live="polite"></span>
      ${duration ? `<p class="dur">${duration}</p>` : ''}
    </div>
    <h3 id="${esc(event.id)}-title">${esc(event.title)}</h3>
    ${places}
    <a class="route" href="${esc(event.mapsUrl)}" target="_blank" rel="noopener">Route in Karten${icon('route')}</a>
    ${notes}
  </div>
  <div class="actions">
    <a class="btn" href="${esc(event.id)}.ics">${icon('calendar')}Apple Kalender</a>
    <a class="btn" href="${esc(event.googleUrl)}" target="_blank" rel="noopener">${icon('calendar')}Google Kalender</a>
  </div>
</article>`;
}

// Kleines Skript: markiert den nächsten Termin und füllt den Wegweiser oben.
// Ohne JavaScript bleibt der erste Termin markiert – die Seite funktioniert trotzdem.
const TRIP_SCRIPT = `(() => {
  const bands = [...document.querySelectorAll('.band[data-start]')];
  const strip = document.querySelector('.strip-text');
  const now = Date.now();
  const HOUR = 36e5;
  let next = null;
  for (const band of bands) {
    const start = Date.parse(band.dataset.start);
    const end = Date.parse(band.dataset.end);
    const state = band.querySelector('.state');
    if (end <= now) { band.dataset.state = 'past'; state.textContent = 'Vorbei'; continue; }
    if (start <= now) { band.dataset.state = 'now'; state.textContent = 'Läuft gerade'; }
    // Lange Termine (z. B. Unterkunft) überspringen, solange sie laufen – wichtiger ist die nächste Abfahrt.
    if (!next && (start > now || end - start < 12 * HOUR)) next = band;
  }
  bands.forEach((band) => band.classList.toggle('is-next', band === next));
  if (next && !next.dataset.state) next.querySelector('.state').textContent = 'Als Nächstes';

  const link = strip.closest('a');
  if (!next) {
    strip.innerHTML = '<b>Die Reise ist vorbei</b><span>Alle Termine liegen in der Vergangenheit</span>';
    link.href = '#termine';
  } else {
    const start = Date.parse(next.dataset.start);
    const diff = start - now;
    const days = Math.round((new Date(start).setHours(0,0,0,0) - new Date(now).setHours(0,0,0,0)) / 864e5);
    const relative = diff <= 0 ? 'läuft gerade'
      : diff < HOUR ? 'in ' + Math.max(1, Math.round(diff / 6e4)) + ' Min.'
      : days === 0 ? 'heute, in ' + Math.round(diff / HOUR) + ' Std.'
      : days === 1 ? 'morgen' : 'in ' + days + ' Tagen';
    const date = new Date(start);
    const when = date.toLocaleDateString('de-DE', { weekday: 'short' }).replace('.', '') + ' '
      + date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    const b = document.createElement('b');
    b.textContent = next.dataset.title;
    const span = document.createElement('span');
    span.textContent = when + ' · ' + relative;
    strip.replaceChildren(b, span);
    link.href = '#' + next.id;
  }
  strip.classList.add('flip');

  // Der Wegweiser oben erscheint erst, wenn das gelbe Band aus dem Bild ist.
  const bar = document.querySelector('.strip');
  if (!next) { bar.classList.add('show'); return; }
  new IntersectionObserver(([entry]) => {
    bar.classList.toggle('show', !entry.isIntersecting);
  }).observe(next);
})();`;

export function renderTripPage(trip) {
  const days = [];
  for (const event of trip.events) {
    const day = dayOf(event.start);
    if (days.at(-1)?.day !== day) days.push({ day, events: [] });
    days.at(-1).events.push(event);
  }
  const first = trip.events[0];
  const people = trip.travelers?.length ? ` · ${trip.travelers.length} Reisende` : '';
  const count = `${trip.events.length} ${trip.events.length === 1 ? 'Termin' : 'Termine'}`;

  const body = `
<header class="wrap head">
  <h1>${esc(trip.title)}</h1>
  <p>${esc(trip.subtitle ?? '')}${trip.subtitle ? ' · ' : ''}${count}${people}</p>
</header>

<nav class="strip" aria-label="Nächster Termin">
  <a class="wrap" href="#${esc(first.id)}">
    <span class="picto">${icon('arrow')}</span>
    <span class="strip-text"><b>${esc(first.title)}</b><span>${formatWeekdayShort(dayOf(first.start))} ${timeOf(first.start)}</span></span>
  </a>
</nav>

<main class="wrap" id="termine">
  ${days.map(({ day, events }) => `
  <h2 class="day">${formatDay(day)}</h2>
  <div class="bands">${events.map((e) => eventBand(e, trip)).join('')}
  </div>`).join('')}

  <section class="all" aria-labelledby="all-title">
    <h2 id="all-title">Alle Termine auf einmal</h2>
    <p>Abonnieren legt einen eigenen Kalender „${esc(trip.title)}“ an. Ändert sich ein Termin, wird er automatisch aktualisiert – und du kannst den ganzen Kalender jederzeit wieder löschen.</p>
    <div class="actions">
      <a class="btn primary" href="alle.ics">${icon('calendar')}Alle in Apple Kalender</a>
      <a class="btn" href="${esc(trip.webcalUrl)}">${icon('sync')}In Apple abonnieren</a>
      <a class="btn" href="${esc(trip.googleSubscribeUrl)}" target="_blank" rel="noopener">${icon('sync')}In Google abonnieren</a>
    </div>
    <p class="hint"><b>iPhone:</b> Wenn nach dem Tippen nichts passiert, öffne die Seite in Safari (in WhatsApp über ••• → „In Safari öffnen“). <b>Android:</b> Am einfachsten über die Google-Buttons.</p>
  </section>
</main>

<footer class="wrap foot">
  <p>Erstellt mit <a href="https://github.com/Taanel/ics-converter">ics-converter</a> · Zeiten in Ortszeit (${esc(trip.timezone)})</p>
</footer>`;

  return documentShell({
    title: `${trip.title} – Reise-Kalender`,
    description: `${trip.subtitle ?? ''} · Termine mit einem Tipp in Apple oder Google Kalender übernehmen.`,
    root: '../',
    body,
    script: TRIP_SCRIPT,
  });
}

// ---------------------------------------------------------------------------
// Startseite: Liste aller Reisen

export function renderIndexPage(trips) {
  const list = trips
    .map((trip) => `<a class="trip-link" href="${esc(trip.slug)}/"><span><b>${esc(trip.title)}</b><span>${esc(trip.subtitle ?? '')}</span></span>${icon('arrow')}</a>`)
    .join('');
  const body = `
<header class="wrap head">
  <h1>Reise-Kalender</h1>
  <p>Wähle eine Reise und übernimm die Termine in deinen Kalender.</p>
</header>
<main class="wrap"><div class="bands">${list}</div></main>
<footer class="wrap foot"><p>Erstellt mit <a href="https://github.com/Taanel/ics-converter">ics-converter</a></p></footer>`;
  return documentShell({
    title: 'Reise-Kalender',
    description: 'Reisetermine mit einem Tipp in Apple oder Google Kalender übernehmen.',
    root: './',
    body,
  });
}
