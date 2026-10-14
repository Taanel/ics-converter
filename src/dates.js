// Hilfsfunktionen für Datum und Uhrzeit.
// In den Reisedateien stehen Ortszeiten wie "2026-10-16T11:00".
// Kalender brauchen aber eindeutige Zeitpunkte, deshalb rechnen wir in UTC um.

const LOCAL_PATTERN = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/;

export function isLocalDateTime(value) {
  return typeof value === 'string' && LOCAL_PATTERN.test(value);
}

export function isValidTimeZone(timeZone) {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone });
    return true;
  } catch {
    return false;
  }
}

// Wie viele Millisekunden liegt die Zeitzone zum Zeitpunkt `timestamp` vor UTC?
function timeZoneOffset(timestamp, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(new Date(timestamp));
  const p = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return asUtc - timestamp;
}

// "2026-10-16T11:00" in Europe/Berlin  →  Date für 2026-10-16 09:00 UTC
export function localToUtc(local, timeZone) {
  const [, y, m, d, h, min] = local.match(LOCAL_PATTERN).map(Number);
  const wallClock = Date.UTC(y, m - 1, d, h, min);
  let utc = wallClock - timeZoneOffset(wallClock, timeZone);
  // Zweiter Durchlauf, falls genau dazwischen die Sommerzeit wechselt.
  utc = wallClock - timeZoneOffset(utc, timeZone);
  return new Date(utc);
}

// Date → "20261016T090000Z" (Format für ICS-Dateien und Google-Links)
export function toIcsUtc(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

// "2026-10-16T11:00" → "11:00"
export function timeOf(local) {
  return local.slice(11, 16);
}

// "2026-10-16T11:00" → "2026-10-16"
export function dayOf(local) {
  return local.slice(0, 10);
}

// "2026-10-16" → "Freitag, 16. Oktober"
export function formatDay(day) {
  const date = new Date(`${day}T12:00:00Z`);
  return new Intl.DateTimeFormat('de-DE', {
    weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC',
  }).format(date);
}

// "2026-10-18" → "So"
export function formatWeekdayShort(day) {
  const date = new Date(`${day}T12:00:00Z`);
  return new Intl.DateTimeFormat('de-DE', { weekday: 'short', timeZone: 'UTC' })
    .format(date)
    .replace('.', '');
}

// Dauer zwischen zwei Zeitpunkten, z. B. "4 Std. 40 Min."
export function formatDuration(start, end) {
  const minutes = Math.round((end - start) / 60000);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} Min.`;
  return m === 0 ? `${h} Std.` : `${h} Std. ${m} Min.`;
}
