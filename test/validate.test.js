import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { validateTrip } from '../src/validate.js';

const validTrip = () => ({
  slug: 'test-reise',
  title: 'Test',
  timezone: 'Europe/Berlin',
  events: [{ id: 'bus', title: 'Bus', start: '2026-10-16T11:00', end: '2026-10-16T15:40', location: 'Berlin ZOB' }],
});

test('eine gültige Reise hat keine Fehler', () => {
  assert.deepEqual(validateTrip(validTrip()), []);
});

test('die Prag-Reise im Repo ist gültig', () => {
  const trip = JSON.parse(readFileSync(new URL('../trips/prag-2026.json', import.meta.url)));
  assert.deepEqual(validateTrip(trip, 'prag-2026.json'), []);
});

test('fehlende Felder und falsche Formate werden erkannt', () => {
  const trip = validTrip();
  trip.slug = 'Mit Leerzeichen';
  trip.timezone = 'Mond/Basis';
  trip.events[0].start = '16.10.2026 11:00';
  delete trip.events[0].location;
  const errors = validateTrip(trip).join('\n');
  assert.match(errors, /slug/);
  assert.match(errors, /timezone/);
  assert.match(errors, /"start"/);
  assert.match(errors, /"location"/);
});

test('Ende vor Start und doppelte IDs werden erkannt', () => {
  const trip = validTrip();
  trip.events[0].end = '2026-10-16T10:00';
  trip.events.push({ ...trip.events[0] });
  const errors = validateTrip(trip).join('\n');
  assert.match(errors, /nach "start"/);
  assert.match(errors, /doppelt/);
});

test('Buchungsnummern, Codes und Preise werden abgelehnt', () => {
  for (const secret of ['Buchungsnummer 1234567890', '123 456 7890', 'Code ABCD1234XY', 'Preis €99.00']) {
    const trip = validTrip();
    trip.events[0].notes = [secret];
    assert.ok(validateTrip(trip).some((e) => e.includes('öffentlich')), `nicht erkannt: ${secret}`);
  }
});
