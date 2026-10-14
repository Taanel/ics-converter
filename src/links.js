// Links zu Google Kalender und Google Maps.

import { toIcsUtc } from './dates.js';

// Öffnet Google Kalender mit einem fertig ausgefüllten Termin.
export function googleEventUrl({ title, start, end, location, description }) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${toIcsUtc(start)}/${toIcsUtc(end)}`,
    location,
    details: description ?? '',
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

// Fügt in Google Kalender einen abonnierten Kalender hinzu (aktualisiert sich selbst).
export function googleSubscribeUrl(icsUrl) {
  const webcal = icsUrl.replace(/^https?:\/\//, 'webcal://');
  return `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(webcal)}`;
}

// webcal:// öffnet auf dem iPhone und Mac direkt „Kalender abonnieren“.
export function webcalUrl(icsUrl) {
  return icsUrl.replace(/^https?:\/\//, 'webcal://');
}

// Funktioniert auf iPhone und Android (öffnet die Karten-App oder Google Maps).
export function mapsUrl(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
