import { test } from 'node:test';
import assert from 'node:assert/strict';

import { buildCalendar, escapeText, foldLine } from '../src/ics.js';
import { localToUtc, toIcsUtc } from '../src/dates.js';

test('Sonderzeichen werden geschützt', () => {
  assert.equal(escapeText('a,b;c\\d\ne'), 'a\\,b\\;c\\\\d\\ne');
});

test('lange Zeilen werden nach max. 75 Byte umgebrochen', () => {
  const line = `DESCRIPTION:${'Křižíkova '.repeat(20)}`;
  const folded = foldLine(line).split('\r\n');
  assert.ok(folded.length > 1);
  for (const part of folded) assert.ok(Buffer.byteLength(part) <= 75, `zu lang: ${part}`);
  assert.equal(folded.map((p, i) => (i ? p.slice(1) : p)).join(''), line);
});

test('Ortszeit wird korrekt nach UTC umgerechnet (Sommer- und Winterzeit)', () => {
  assert.equal(toIcsUtc(localToUtc('2026-10-16T11:00', 'Europe/Berlin')), '20261016T090000Z');
  assert.equal(toIcsUtc(localToUtc('2026-12-24T18:00', 'Europe/Berlin')), '20261224T170000Z');
  assert.equal(toIcsUtc(localToUtc('2026-10-16T11:00', 'Asia/Ho_Chi_Minh')), '20261016T040000Z');
});

test('Kalender hat gültige Struktur mit CRLF-Zeilenenden', () => {
  const ics = buildCalendar({
    name: 'Test',
    now: new Date('2026-01-01T00:00:00Z'),
    events: [{
      uid: 'a@test',
      title: 'Bus',
      start: new Date('2026-10-16T09:00:00Z'),
      end: new Date('2026-10-16T13:40:00Z'),
      location: 'Berlin ZOB',
      alarms: [30],
    }],
  });
  assert.ok(ics.startsWith('BEGIN:VCALENDAR\r\nVERSION:2.0\r\n'));
  assert.ok(ics.endsWith('END:VCALENDAR\r\n'));
  assert.ok(!/[^\r]\n/.test(ics), 'jede Zeile muss mit CRLF enden');
  assert.match(ics, /DTSTART:20261016T090000Z/);
  assert.match(ics, /X-WR-CALNAME:Test/);
  assert.match(ics, /TRIGGER:-PT30M/);
});
