# ics-converter – Reise-Kalender zum Teilen

Aus einer kleinen Datei mit Reisedaten wird eine Webseite. Den Link schickst du in die WhatsApp-Gruppe, und alle Mitreisenden übernehmen die Termine mit einem Tipp in ihren Kalender:

- **Einzeln:** Für jeden Termin gibt es einen Button für **Apple Kalender** und einen für **Google Kalender**. Jede:r entscheidet selbst, was übernommen wird.
- **Alle auf einmal:** Alle Termine mit einem Tipp übernehmen.
- **Abonnieren:** Legt einen eigenen Kalender, z. B. „Prag“, an. Er aktualisiert sich selbst und lässt sich mit einem Tipp wieder komplett entfernen.

Unterwegs dient die Seite als Übersicht mit Zeiten, Adressen, Route und Sitzplätzen. Oben zeigt ein gelbes Band immer den **nächsten Termin**.

**Live:** https://taanel.github.io/ics-converter/prag-2026/

---

## Einmalig einrichten

Du brauchst drei Programme. Auf dem Mac installierst du sie mit [Homebrew](https://brew.sh):

```bash
brew install node git gh
```

| Werkzeug | Wofür |
|---|---|
| **Node.js + npm** | Node führt den Code aus. npm ist der Package Manager, er startet die Befehle unten. |
| **git** | Versionsverwaltung: speichert jede Änderung als „Commit“ |
| **gh** | GitHub im Terminal: Repo anlegen, Status des Deploys ansehen |

Danach einmal im Projektordner ausführen:

```bash
npm install
```

## Die wichtigsten Befehle

| Befehl | Was passiert |
|---|---|
| `npm run dev` | Baut die Seite und startet sie unter http://localhost:8080 |
| `npm test` | Prüft, ob alles funktioniert und die Reisedaten gültig sind |
| `npm run build` | Erzeugt die fertige Seite im Ordner `dist/` |

## Eine neue Reise anlegen

1. Kopiere `trips/prag-2026.json` und benenne die Kopie um, z. B. `trips/hamburg-2027.json`.
2. Passe die Werte an. Die Pfeile `←` sind nur Erklärungen hier in der Anleitung, nicht mit abschreiben:

   ```json
   {
     "slug": "hamburg-2027",            ← wird Teil des Links: …/ics-converter/hamburg-2027/
     "title": "Hamburg",
     "subtitle": "12. bis 14. März 2027",
     "timezone": "Europe/Berlin",
     "travelers": ["Thanh", "Son"],
     "events": [
       {
         "id": "zug-hin",                 ← eindeutig, nur Kleinbuchstaben und Bindestriche
         "icon": "train",                 ← bus, train, plane, home oder pin
         "title": "ICE Berlin → Hamburg",
         "start": "2027-03-12T09:00",     ← Ortszeit, Format JJJJ-MM-TTTHH:MM
         "end": "2027-03-12T10:45",
         "location": "Berlin Hbf",
         "arrival": "Hamburg Hbf",        ← optional
         "notes": ["Wagen 7"],            ← optional, beliebig viele Zeilen
         "alarms": [60]                   ← optional, Erinnerung x Minuten vorher
       }
     ]
   }
   ```

3. Prüfen und ansehen: `npm test`, dann `npm run dev`.
4. Veröffentlichen:

   ```bash
   git add trips/hamburg-2027.json
   git commit -m "Reise nach Hamburg hinzugefügt"
   git push
   ```

   Nach etwa einer Minute ist die Seite online. Den Fortschritt siehst du mit `gh run watch`.

Hat sich ein Termin geändert? Einfach die Datei anpassen und wieder pushen. Wer abonniert hat, bekommt die Änderung automatisch. Wer einzeln hinzugefügt hat, muss den Termin neu übernehmen.

## ⚠️ Datenschutz

Das Repo und die Seite sind **öffentlich**. Trage deshalb **keine Buchungsnummern, Bestätigungscodes, Preise oder Nachnamen** ein. `npm test` schlägt Alarm, wenn etwas danach aussieht.

## Wie das Projekt aufgebaut ist

```
trips/            Die Reisedaten (eine JSON-Datei pro Reise) ← hier arbeitest du
src/
  build.js        Liest trips/ und erzeugt dist/ (HTML-Seiten + .ics-Dateien)
  validate.js     Prüft die Reisedaten und gibt verständliche Fehlermeldungen
  ics.js          Erzeugt Kalenderdateien im iCalendar-Format
  links.js        Links für Google Kalender, Abonnieren und Google Maps
  dates.js        Umrechnung von Ortszeit nach UTC, deutsche Datumsangaben
  page.js         Aussehen der Seiten (HTML + CSS)
  serve.js        Kleiner lokaler Webserver für npm run dev
  assets/fonts/   Schrift „Hanken Grotesk“ (SIL Open Font License)
test/             Automatische Tests (node --test)
.github/workflows/deploy.yml   Veröffentlicht bei jedem Push automatisch auf GitHub Pages
PRODUCT.md, DESIGN.md          Wofür die Seite da ist und wie sie aussieht
```

Das Projekt hat keine externen Abhängigkeiten, nur Node.js selbst.

## Warum funktioniert das auf dem iPhone?

Eine `.ics`-Datei, die man per WhatsApp schickt, kann das iPhone nicht importieren. Öffnet man dagegen in Safari einen **Link** auf eine `.ics`-Datei, fragt das iPhone direkt „Zum Kalender hinzufügen?“. Mit `webcal://`-Links abonniert man einen Kalender. Darum gibt es diese Webseite.
