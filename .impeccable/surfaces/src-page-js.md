---
version: 1
slug: "src-page-js"
primary_target: "src/page.js"
related_targets: []
---

Scope: Reiseseite (eine Seite pro Reise, z. B. /prag-2026/) plus schlichte Startseite. Mode: Operate.
Audience/job: Mitreisende öffnen den WhatsApp-Link am Handy (iPhone und Android gemischt), übernehmen Termine selektiv in Apple/Google Kalender und schlagen unterwegs Zeit, Ort, Sitzplätze nach.
Constraints: statisches HTML aus Node-Build, inline CSS, deutsch, keine sensiblen Daten, Tap-Ziele ≥44px, hell & dunkel.

## Direction contract
THESIS: Die Reise als Kette gelber Flughafen-Wegweiser: jede Station ein Schildband, Zeit und Ort monumental, nur die nächste Entscheidung laut. Verweigert die Standard-Zeitleiste mit weißen Karten und blauem Punkt.
OWN-WORLD: Gelb #FFCC00 nur für Wegweisung (Bänder des nächsten Termins, Aktionen), Schwarz #111 als Schildgrund, Anthrazit #2B2B2B Seitengrund, weiße Piktogramme in schwarzen Quadraten (SVG: Bus, Haus), Pfeile an der Bandkante. Humanistische Grotesk (Hanken Grotesk), Satzschreibung, Zeiten in Tabellenziffern, keine Rundungen über 2px, keine Schatten.
STORY: Besucher sieht sofort Reise + Datum, erkennt den nächsten Termin, tippt Apple oder Google pro Termin oder „Alle“/„Abonnieren“; unterwegs liest er Zeit, Ort, Sitzplatz.
FIRST VIEWPORT: Kopf „Prag“ + Datum + Terminzahl; darunter das gelbe Band des nächsten Termins (Label, Uhrzeit 56px, Titel, Ort, Buttons Apple/Google/Karte); darunter schwarze Bänder der übrigen Termine; dann „Alle Termine hinzufügen“ und „Als Kalender abonnieren“. Signature move: das „Nächster Termin“-Band klebt (sticky) oben und wechselt per Datum automatisch; vergangene Termine fallen als „erledigt“ zurück.
FORM: terminal-yellow-wayfinding (gewählter Challenger), Position 1 der Auswahl; seed key ee4101a3.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
