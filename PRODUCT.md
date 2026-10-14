# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: Statische HTML-Seiten, erzeugt von einem kleinen Node.js-Build-Skript ohne Abhängigkeiten (`npm run build`), gehostet auf GitHub Pages (öffentliches Repo `Taanel/ics-converter`). Inline-CSS, kein Framework. Der Grund: Der Besitzer ist Einsteiger, das Projekt soll leicht verständlich und erweiterbar bleiben.

## Users

- **Mitreisende** (kleine Freundesgruppe, etwa gleich viele iPhone- und Android-Nutzer): Sie öffnen den Link aus einer WhatsApp-Gruppe auf dem Handy. Sie wollen die Reisetermine schnell in den eigenen Kalender übernehmen (Apple oder Google) und während der Reise Zeiten, Adressen und Sitzplätze nachschauen.
- **Besitzer** (Thanh): legt pro Reise eine JSON-Datei an, pusht sie, teilt den Link.

## Product Purpose

Pro Reise gibt es eine Seite, auf der jede:r selbst entscheidet, welche Termine in den eigenen Kalender kommen: einzeln, alle zusammen oder als abonnierbarer eigener Kalender. Geteilt wird immer nur diese eine Reise, nie ein ganzer persönlicher Kalender. Die Seite ist gelungen, wenn alle Mitreisenden die Termine in unter einer Minute im Kalender haben und die Seite unterwegs als Nachschlage-Übersicht nutzen.

## Operating Context

- Der Link wird aus WhatsApp geöffnet, oft im In-App-Browser. Ein `.ics`-Import auf dem iPhone funktioniert zuverlässig nur in Safari.
- Die Seite wird unterwegs genutzt: am Busbahnhof, mit einer Hand, bei schlechtem Netz, im Hellen und im Dunkeln.
- Kalender-Ziele: Apple Kalender (`.ics` / `webcal://`) und Google Kalender (Template-Link).

## Capabilities and Constraints

- Termine einzeln oder alle zusammen hinzufügen, für Apple oder Google, oder als Kalender abonnieren (`webcal`).
- Pro Termin: Zeit, Ort mit Karten-Link, Notizen (z. B. Sitzplätze), Erinnerungen in der `.ics`-Datei.
- Ein öffentliches Repo und eine öffentliche Seite bedeuten: **keine Buchungsnummern, Bestätigungscodes, Preise oder Nachnamen**.
- UI-Sprache: Deutsch.

## Evidence on Hand

- Erste Reise: Prag, 16.–18.10.2026 (FlixBus hin, Airbnb Praha 8, FlixBus zurück).

## Product Principles

1. Die Kalender-Aktion steht im Mittelpunkt: Jeder Termin ist mit einem Tipp im Kalender.
2. Volle Kontrolle für Empfänger: Sie wählen selbst, welche Termine sie übernehmen.
3. Nachschlagbar unterwegs: Zeiten und Orte lassen sich auf einen Blick lesen.
4. Privatsphäre zuerst: Was nicht öffentlich sein darf, gehört nicht in die Daten.
5. Für Einsteiger erweiterbar: Eine neue Reise ist eine neue JSON-Datei.

## Accessibility & Inclusion

Große Tap-Flächen (mind. 44px), hoher Kontrast im hellen und dunklen Modus, gut lesbar im Freien.
