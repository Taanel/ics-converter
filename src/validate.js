// Prüft eine Reisedatei, bevor daraus Seiten gebaut werden.
// Gibt eine Liste mit verständlichen Fehlermeldungen zurück (leer = alles gut).

import { isLocalDateTime, isValidTimeZone, localToUtc } from './dates.js';

export const ICONS = ['bus', 'train', 'plane', 'home', 'pin'];

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// Das Repo ist öffentlich. Diese Muster deuten auf Daten hin, die nicht online gehören.
const PRIVATE_PATTERNS = [
  { pattern: /\d{8,}/, hint: 'eine lange Zahl (Buchungs- oder Ticketnummer?)' },
  { pattern: /\d{3} \d{3} \d{4}/, hint: 'eine Buchungsnummer' },
  { pattern: /buchungsnummer|bestätigungscode|confirmation code|booking (number|code)/i, hint: 'einen Buchungscode' },
  { pattern: /[A-Z0-9]{10}/, hint: 'einen 10-stelligen Code (Airbnb-Bestätigungscode?)' },
  { pattern: /€\s?\d|\d\s?(€|EUR)\b/, hint: 'einen Preis' },
];

export function validateTrip(trip, fileName = 'Reisedatei') {
  const errors = [];
  const fail = (message) => errors.push(`${fileName}: ${message}`);

  if (!trip || typeof trip !== 'object') {
    fail('Die Datei enthält kein gültiges JSON-Objekt.');
    return errors;
  }
  if (!SLUG_PATTERN.test(trip.slug ?? '')) {
    fail('"slug" fehlt oder ist ungültig. Nur Kleinbuchstaben, Zahlen und Bindestriche, z. B. "prag-2026".');
  }
  if (!trip.title) fail('"title" fehlt.');
  if (!isValidTimeZone(trip.timezone ?? '')) {
    fail(`"timezone" ist ungültig ("${trip.timezone}"). Beispiel: "Europe/Berlin".`);
  }
  if (!Array.isArray(trip.events) || trip.events.length === 0) {
    fail('"events" muss eine Liste mit mindestens einem Termin sein.');
    return errors;
  }

  const seenIds = new Set();
  trip.events.forEach((event, index) => {
    const where = `Termin ${index + 1}${event.id ? ` ("${event.id}")` : ''}`;
    if (!SLUG_PATTERN.test(event.id ?? '')) {
      fail(`${where}: "id" fehlt oder ist ungültig, z. B. "bus-hin".`);
    } else if (event.id === 'alle') {
      fail(`${where}: Die id "alle" ist reserviert.`);
    } else if (seenIds.has(event.id)) {
      fail(`${where}: Die id "${event.id}" kommt doppelt vor.`);
    }
    seenIds.add(event.id);

    if (!event.title) fail(`${where}: "title" fehlt.`);
    if (!event.location) fail(`${where}: "location" fehlt.`);
    if (event.icon && !ICONS.includes(event.icon)) {
      fail(`${where}: "icon" muss eines davon sein: ${ICONS.join(', ')}.`);
    }

    const startOk = isLocalDateTime(event.start);
    const endOk = isLocalDateTime(event.end);
    if (!startOk) fail(`${where}: "start" muss so aussehen: "2026-10-16T11:00".`);
    if (!endOk) fail(`${where}: "end" muss so aussehen: "2026-10-16T15:40".`);
    if (startOk && endOk && isValidTimeZone(trip.timezone ?? '')) {
      if (localToUtc(event.end, trip.timezone) <= localToUtc(event.start, trip.timezone)) {
        fail(`${where}: "end" muss nach "start" liegen.`);
      }
    }

    if (event.notes !== undefined && !(Array.isArray(event.notes) && event.notes.every((n) => typeof n === 'string'))) {
      fail(`${where}: "notes" muss eine Liste von Texten sein.`);
    }
    if (event.alarms !== undefined && !(Array.isArray(event.alarms) && event.alarms.every((a) => Number.isInteger(a) && a > 0))) {
      fail(`${where}: "alarms" muss eine Liste von Minuten sein, z. B. [120, 30].`);
    }
  });

  // Datenschutz-Check über den gesamten Text der Datei
  const text = JSON.stringify(trip);
  for (const { pattern, hint } of PRIVATE_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      fail(`Enthält vermutlich ${hint}: "${match[0]}". Die Seite ist öffentlich – bitte entfernen.`);
    }
  }

  return errors;
}
