// Baut die Webseite: liest alle Reisen aus trips/*.json und schreibt nach dist/:
//   dist/index.html                 Startseite mit allen Reisen
//   dist/<reise>/index.html         Reiseseite mit den Buttons
//   dist/<reise>/<termin>.ics       ein Termin (für „Apple Kalender“)
//   dist/<reise>/alle.ics           alle Termine (auch zum Abonnieren)
//
// Aufruf: npm run build

import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { localToUtc } from './dates.js';
import { buildCalendar } from './ics.js';
import { googleEventUrl, googleSubscribeUrl, mapsUrl, webcalUrl } from './links.js';
import { renderIndexPage, renderTripPage } from './page.js';
import { validateTrip } from './validate.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Text für die Notizen im Kalendertermin
function describe(event, pageUrl) {
  const lines = [];
  if (event.arrival) lines.push(`Ankunft: ${event.arrival}`);
  lines.push(...(event.notes ?? []));
  lines.push('', `Alle Infos: ${pageUrl}`);
  return lines.join('\n');
}

// Ergänzt jeden Termin um alles, was Seite und Kalender brauchen.
export function prepareTrip(trip, baseUrl) {
  const pageUrl = new URL(`${trip.slug}/`, baseUrl).href;
  const allIcsUrl = new URL('alle.ics', pageUrl).href;
  const events = trip.events
    .map((event) => {
      const startUtc = localToUtc(event.start, trip.timezone);
      const endUtc = localToUtc(event.end, trip.timezone);
      const description = describe(event, pageUrl);
      const calendarEvent = {
        uid: `${trip.slug}-${event.id}@ics-converter`,
        title: event.title,
        start: startUtc,
        end: endUtc,
        location: event.location,
        description,
        url: `${pageUrl}#${event.id}`,
        alarms: event.alarms,
      };
      return {
        ...event,
        startUtc,
        endUtc,
        calendarEvent,
        googleUrl: googleEventUrl(calendarEvent),
        mapsUrl: mapsUrl(event.location),
      };
    })
    .sort((a, b) => a.startUtc - b.startUtc);

  return {
    ...trip,
    events,
    pageUrl,
    webcalUrl: webcalUrl(allIcsUrl),
    googleSubscribeUrl: googleSubscribeUrl(allIcsUrl),
  };
}

async function loadTrips(tripsDir) {
  const files = (await readdir(tripsDir)).filter((f) => f.endsWith('.json')).sort();
  const trips = [];
  const errors = [];
  for (const file of files) {
    let trip;
    try {
      trip = JSON.parse(await readFile(path.join(tripsDir, file), 'utf8'));
    } catch (error) {
      errors.push(`${file}: Kein gültiges JSON – ${error.message}`);
      continue;
    }
    errors.push(...validateTrip(trip, file));
    trips.push(trip);
  }
  const slugs = trips.map((t) => t.slug);
  slugs.forEach((slug, i) => {
    if (slugs.indexOf(slug) !== i) errors.push(`Der slug "${slug}" wird von mehreren Reisen benutzt.`);
  });
  return { trips, errors };
}

export async function build({
  tripsDir = path.join(ROOT, 'trips'),
  outDir = path.join(ROOT, 'dist'),
  baseUrl,
  now = new Date(),
} = {}) {
  // Adresse der fertigen Seite: aus SITE_URL oder "homepage" in package.json
  baseUrl ??= process.env.SITE_URL
    ?? JSON.parse(await readFile(path.join(ROOT, 'package.json'), 'utf8')).homepage;

  const { trips, errors } = await loadTrips(tripsDir);
  if (errors.length) {
    const error = new Error(`Die Reisedaten haben Fehler:\n  - ${errors.join('\n  - ')}`);
    error.validationErrors = errors;
    throw error;
  }
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  await cp(path.join(ROOT, 'src', 'assets'), path.join(outDir, 'assets'), { recursive: true });

  const written = ['index.html'];
  const prepared = trips.map((trip) => prepareTrip(trip, base));

  for (const trip of prepared) {
    const dir = path.join(outDir, trip.slug);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), renderTripPage(trip));
    for (const event of trip.events) {
      await writeFile(path.join(dir, `${event.id}.ics`), buildCalendar({ events: [event.calendarEvent], now }));
      written.push(`${trip.slug}/${event.id}.ics`);
    }
    await writeFile(
      path.join(dir, 'alle.ics'),
      buildCalendar({ name: trip.title, events: trip.events.map((e) => e.calendarEvent), now }),
    );
    written.push(`${trip.slug}/index.html`, `${trip.slug}/alle.ics`);
  }

  await writeFile(path.join(outDir, 'index.html'), renderIndexPage(prepared));
  return { trips: prepared, files: written };
}

// Direkt aufgerufen (npm run build)?
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const { trips, files } = await build();
    console.log(`✓ ${trips.length} Reise(n), ${files.length} Dateien in dist/ erstellt:`);
    for (const file of files) console.log(`  dist/${file}`);
  } catch (error) {
    console.error(`✗ ${error.message}`);
    process.exit(1);
  }
}
