import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { build } from '../src/build.js';

test('Build erzeugt Seiten und .ics-Dateien für jede Reise', async () => {
  const outDir = await mkdtemp(path.join(tmpdir(), 'ics-build-'));
  try {
    const { files } = await build({ outDir, baseUrl: 'https://example.org/kalender/' });
    for (const file of ['index.html', 'prag-2026/index.html', 'prag-2026/alle.ics', 'prag-2026/bus-hin.ics']) {
      assert.ok(files.includes(file), `fehlt: ${file}`);
    }
    const html = await readFile(path.join(outDir, 'prag-2026/index.html'), 'utf8');
    assert.match(html, /href="bus-hin\.ics"/);
    assert.match(html, /webcal:\/\/example\.org\/kalender\/prag-2026\/alle\.ics/);
    assert.match(html, /calendar\.google\.com\/calendar\/render/);

    const all = await readFile(path.join(outDir, 'prag-2026/alle.ics'), 'utf8');
    assert.equal(all.match(/BEGIN:VEVENT/g).length, 3);
  } finally {
    await rm(outDir, { recursive: true, force: true });
  }
});

test('Build bricht bei fehlerhaften Reisedaten mit verständlicher Meldung ab', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'ics-trips-'));
  try {
    await mkdir(path.join(dir, 'trips'));
    await writeFile(path.join(dir, 'trips', 'kaputt.json'), JSON.stringify({ slug: 'x', title: 'X', timezone: 'Europe/Berlin', events: [] }));
    await assert.rejects(
      build({ tripsDir: path.join(dir, 'trips'), outDir: path.join(dir, 'dist'), baseUrl: 'https://example.org/' }),
      /mindestens einem Termin/,
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
