// Erzeugt den Inhalt einer .ics-Datei (iCalendar, RFC 5545).
// Diese Dateien verstehen Apple Kalender, Google Kalender, Outlook usw.

import { toIcsUtc } from './dates.js';

// Sonderzeichen müssen in ICS mit Backslash geschützt werden.
export function escapeText(text) {
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

// Zeilen dürfen max. 75 Byte lang sein; längere werden umgebrochen
// und die Folgezeile beginnt mit einem Leerzeichen.
export function foldLine(line) {
  const chunks = [];
  let current = '';
  let currentBytes = 0;
  for (const char of line) {
    const bytes = Buffer.byteLength(char, 'utf8');
    const limit = chunks.length === 0 ? 75 : 74; // Folgezeilen: 1 Byte fürs Leerzeichen
    if (currentBytes + bytes > limit) {
      chunks.push(current);
      current = '';
      currentBytes = 0;
    }
    current += char;
    currentBytes += bytes;
  }
  chunks.push(current);
  return chunks.join('\r\n ');
}

function eventLines(event, stamp) {
  const lines = [
    'BEGIN:VEVENT',
    `UID:${event.uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toIcsUtc(event.start)}`,
    `DTEND:${toIcsUtc(event.end)}`,
    `SUMMARY:${escapeText(event.title)}`,
    `LOCATION:${escapeText(event.location)}`,
  ];
  if (event.description) lines.push(`DESCRIPTION:${escapeText(event.description)}`);
  if (event.url) lines.push(`URL:${event.url}`);
  for (const minutes of event.alarms ?? []) {
    lines.push(
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      `DESCRIPTION:${escapeText(event.title)}`,
      `TRIGGER:-PT${minutes}M`,
      'END:VALARM',
    );
  }
  lines.push('END:VEVENT');
  return lines;
}

/**
 * @param {object}   options
 * @param {string}   [options.name]  Kalendername (wichtig beim Abonnieren)
 * @param {object[]} options.events  { uid, title, start: Date, end: Date, location, description?, url?, alarms? }
 * @param {Date}     [options.now]   Erstellungszeitpunkt
 */
export function buildCalendar({ name, events, now = new Date() }) {
  const stamp = toIcsUtc(now);
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ics-converter//Reise-Kalender//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];
  if (name) lines.push(`X-WR-CALNAME:${escapeText(name)}`, 'REFRESH-INTERVAL;VALUE=DURATION:PT12H');
  for (const event of events) lines.push(...eventLines(event, stamp));
  lines.push('END:VCALENDAR');
  return lines.map(foldLine).join('\r\n') + '\r\n';
}
