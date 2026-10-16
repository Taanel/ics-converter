---
name: Reise-Kalender
description: Reisetermine als gelbe Flughafen-Wegweiser, mit einem Tipp in Apple oder Google Kalender.
colors:
  sign: "#FFCC00"
  sign-ink: "#111111"
  sign-soft: "#3A3000"
  band: "#111111"
  band-ink: "#FFFFFF"
  band-soft: "#B9B6AE"
  ground-light: "#D9DBDE"
  ink-soft-light: "#3E4146"
  ground-dark: "#2B2B2B"
  rule-dark: "#444444"
typography:
  display:
    fontFamily: "\"Hanken Grotesk\", system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 12vw, 4rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  time-next:
    fontFamily: "\"Hanken Grotesk\", system-ui, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "\"tnum\""
  time:
    fontFamily: "\"Hanken Grotesk\", system-ui, sans-serif"
    fontSize: "2.125rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "\"tnum\""
  headline:
    fontFamily: "\"Hanken Grotesk\", system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 800
    letterSpacing: "-0.01em"
  trip-title:
    fontFamily: "\"Hanken Grotesk\", system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    letterSpacing: "-0.02em"
  title:
    fontFamily: "\"Hanken Grotesk\", system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 700
    lineHeight: 1.25
  lead:
    fontFamily: "\"Hanken Grotesk\", system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "\"Hanken Grotesk\", system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "\"tnum\""
  body-small:
    fontFamily: "\"Hanken Grotesk\", system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "\"Hanken Grotesk\", system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
  state:
    fontFamily: "\"Hanken Grotesk\", system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 800
    letterSpacing: "0.06em"
rounded:
  none: "0px"
  sign: "2px"
spacing:
  band-gap: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  day: "28px"
  section: "40px"
components:
  button:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.sign-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sign}"
    padding: "0 12px"
    height: "48px"
  button-primary:
    backgroundColor: "{colors.sign}"
    textColor: "{colors.sign-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sign}"
    padding: "0 12px"
    height: "48px"
  button-on-sign:
    backgroundColor: "{colors.sign-ink}"
    textColor: "{colors.sign}"
    typography: "{typography.label}"
    rounded: "{rounded.sign}"
    padding: "0 12px"
    height: "48px"
  band:
    backgroundColor: "{colors.band}"
    textColor: "{colors.band-ink}"
    rounded: "{rounded.none}"
    padding: "18px 14px 16px"
  band-next:
    backgroundColor: "{colors.sign}"
    textColor: "{colors.sign-ink}"
    rounded: "{rounded.none}"
    padding: "18px 14px 16px"
  picto:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.sign-ink}"
    rounded: "{rounded.sign}"
    size: "44px"
  picto-on-sign:
    backgroundColor: "{colors.sign-ink}"
    textColor: "{colors.sign}"
    rounded: "{rounded.sign}"
    size: "44px"
  strip:
    backgroundColor: "{colors.sign}"
    textColor: "{colors.sign-ink}"
    rounded: "{rounded.none}"
    height: "56px"
  state-tag:
    backgroundColor: "{colors.band-ink}"
    textColor: "{colors.band}"
    typography: "{typography.state}"
    rounded: "{rounded.sign}"
    padding: "3px 7px 4px"
  trip-link:
    backgroundColor: "{colors.band}"
    textColor: "{colors.band-ink}"
    rounded: "{rounded.none}"
    padding: "18px 16px"
  trip-link-hover:
    backgroundColor: "{colors.sign}"
    textColor: "{colors.sign-ink}"
---

# Design System: Reise-Kalender

<!-- Aus dem fertigen Build abgeleitet (src/page.js, Funktion styles()). Die Werte im Kopf oben sind verbindlich; der Text erklärt, wo und warum sie eingesetzt werden. Ändert sich das CSS, muss diese Datei mitgezogen werden. -->

## Overview

**Creative North Star: "Die Wegweiser-Kette"**

Die Reise ist eine Kette von Flughafen-Wegweisern. Jeder Termin ist ein schwarzes Schildband, randlos und flach, mit Uhrzeit und Ort in großer, schwerer Schrift. Genau ein Band ist gelb: der nächste Termin. Gelb bedeutet immer „hier geht es weiter“ oder „hier tippen“, nie Schmuck. Wer die Seite am Busbahnhof mit einer Hand öffnet, soll in einer Sekunde sehen, wann und wo es als Nächstes losgeht.

Die Dichte ist die einer Abflugtafel: Bänder stehen mit nur 4px Abstand untereinander, gruppiert nach Tagen. Die Schilder sind in hellem und dunklem Modus gleich schwarz; es wechselt nur der Seitengrund (helles Betongrau oder Anthrazit). Tiefe entsteht durch Kontrast, nicht durch Schatten. Bewegung ist knapp und mechanisch, wie ein umklappendes Fallblatt.

Bewusst abgelehnt ist die übliche Termin-Zeitleiste mit weißen Karten, weichen Schatten und blauem Punkt.

**Key Characteristics:**
- Schwarze Schildbänder, ein gelbes Band für den nächsten Termin.
- Gelb ausschließlich für Wegweisung und Aktionen.
- Hanken Grotesk, schwer (700–800), Satzschreibung, Tabellenziffern überall.
- Ecken höchstens 2px, keine Schatten, keine Verläufe.
- Weiße oder gelbe Piktogramm-Quadrate als SVG, 2px Strich.
- Hell und dunkel: Schilder bleiben schwarz, nur der Grund wechselt.

## Colors

Ein einziges Signalgelb auf Schwarz, umgeben von neutralem Grau; die Palette eines Flughafen-Leitsystems.

### Primary
- **Wegweiser-Gelb** (sign): Grund des nächsten Termin-Bands, des oben einrastenden Wegweisers, der Hauptaktion „Alle in Apple Kalender“, des Karten-Pfeils auf schwarzen Bändern, der Textmarkierung und der Fokusfarbe im dunklen Modus. Auch `theme-color` der Seite.
- **Schildschrift** (sign-ink): Schrift, Piktogramm-Quadrate und Buttons auf Gelb.
- **Gedämpfte Schildschrift** (sign-soft): Nebentexte auf Gelb (Ort, Dauer, Zeitangabe im Wegweiser).

### Neutral
- **Schildgrund** (band): Grund aller Termin-Bänder, der Box „Alle Termine auf einmal“ und der Reise-Links auf der Startseite. In beiden Modi gleich.
- **Schildweiß** (band-ink): Hauptschrift auf Schwarz und Grund der normalen Buttons und Piktogramm-Quadrate.
- **Warmes Steingrau** (band-soft): Nebentexte auf Schwarz (Ort, Dauer, Erklärtexte); im dunklen Modus zugleich die gedämpfte Seitenschrift.
- **Betongrau** (ground-light): Seitengrund im hellen Modus. Die Seitenschrift ist dort Schildschwarz, Nebentext ist **Schiefer** (ink-soft-light).
- **Anthrazit** (ground-dark): Seitengrund im dunklen Modus; Seitenschrift dort Weiß.
- **Fugengrau** (rule-dark): 1px-Oberkante der Bänder im dunklen Modus. Im hellen Modus ist diese Linie schwarz und verschmilzt mit dem Band.

### Named Rules
**Die Nur-Wegweisung-Regel.** Gelb erscheint nur dort, wo es den Weg zeigt oder eine Aktion auslöst: das Band des nächsten Termins, der Wegweiser oben, die eine Hauptaktion, der Karten-Pfeil. Nie als Fläche, Rahmen oder Dekoration.

**Die Ein-Gelbes-Band-Regel.** In der Terminliste ist immer höchstens ein Band gelb. Auf Gelb kehren sich Buttons und Piktogramme um: schwarzer Grund, gelbe Schrift.

**Die Schilder-bleiben-schwarz-Regel.** Der dunkle Modus ändert nur Seitengrund, Seitenschrift, Linien und Fokusfarbe. Bänder, Buttons und Gelb bleiben identisch.

## Typography

**Display Font:** Hanken Grotesk (mit system-ui, sans-serif), selbst gehostet als variable WOFF2 (100–900), Latin und Latin Extended.
**Body Font:** Hanken Grotesk
**Label/Mono Font:** keine eigene; Zahlen laufen über `font-variant-numeric: tabular-nums` auf dem ganzen Dokument.

**Character:** Eine humanistische Grotesk in schweren Schnitten, wie Beschilderung: freundlich, aber aus zehn Metern lesbar. Eine Familie für alles; Hierarchie entsteht über Größe und Gewicht.

### Hierarchy
- **Display** (800, clamp 2.75–4rem, 0.95): nur der Reisename im Kopf („Prag“) und „Reise-Kalender“ auf der Startseite.
- **Zeit nächster Termin** (time-next, 800, 3.5rem): Startzeit im gelben Band. Größte Zahl der Seite.
- **Zeit** (time, 800, 2.125rem): Startzeit in jedem schwarzen Band. Daneben die Endzeit in 1.0625rem/600.
- **Headline** (800, 1.375rem): Abschnittstitel wie „Alle Termine auf einmal“. Reisename auf der Startseite in 1.5rem/800.
- **Title** (700, 1.1875rem, 1.25): Termintitel im Band.
- **Body** (400, 1rem, 1.5): Fließtext, Erklärungen max. 60ch. Kopfzeile unter dem Reisenamen in 1.0625rem/500.
- **Body small** (400, 0.9375rem, 1.4): Orte, Notizen, Tagesüberschriften (diese in 700, Seiten-Nebenfarbe).
- **Label** (700, 0.875rem): Button-Beschriftungen, Dauer, Fußzeile.
- **State** (800, 0.75rem, 0.06em, Großbuchstaben): nur der Zustands-Marker im Band, siehe Komponenten.

### Named Rules
**Die Tabellenziffern-Regel.** Alle Zahlen stehen in Tabellenziffern, damit Uhrzeiten untereinander bündig stehen und beim Umschalten nicht springen.

**Die Satzschreibung-Regel.** Überschriften, Buttons und Hinweise stehen in normaler Satzschreibung. Großbuchstaben gibt es ausschließlich im Zustands-Marker.

## Layout

Eine einzige Spalte, max. 38rem breit, zentriert, 16px Seitenrand. Kein Raster mit mehreren Spalten, auch nicht auf dem Desktop; die Seite ist eine Tafel, die man von oben nach unten liest.

- **Rhythmus:** Bänder 4px auseinander; Tagesüberschrift 28px darüber, 8px darunter; Box „Alle Termine“ 40px Abstand; Kopf 32px oben, 20px unten; Fußzeile 40px oben, 48px unten.
- **Band-Innenraster:** zwei Spalten, Piktogramm (44px) und Inhalt, 14px Abstand. Die Buttons spannen über beide Spalten und brechen automatisch um (Mindestbreite 9.5rem), auf schmalen Handys also zwei nebeneinander.
- **Ab 40rem:** Band-Polster 22px 24px 20px, Piktogramm 52px, Spaltenabstand 18px; Box „Alle Termine“ 28px 24px.
- **Tap-Ziele:** Buttons mindestens 48px hoch, Karten-Link 44px, Wegweiser oben 56px.
- Sprungziele haben 72px `scroll-margin-top`, damit der Wegweiser oben sie nicht verdeckt.

## Elevation & Depth

Völlig flach. Es gibt keinen einzigen Schatten. Tiefe entsteht nur durch Kontrast (Schwarz auf Grau, Gelb auf Schwarz), durch die 1px-Oberkante der Bänder und durch Deckkraft: vergangene Termine fallen auf 55% zurück. Der Wegweiser oben liegt über dem Inhalt (fixiert), wirkt aber nur durch seine gelbe Fläche abgehoben.

### Named Rules
**Die Kein-Schatten-Regel.** Weder Box- noch Textschatten, keine Verläufe, keine Unschärfe. Was hervortreten soll, wird gelb oder größer.

## Shapes

Rechteckig wie Blechschilder. Flächen (Bänder, Boxen, Wegweiser, Reise-Links) haben gar keine Rundung. Kleine Elemente (Buttons, Piktogramm-Quadrate, Zustands-Marker, Pfeil-Kästchen) haben 2px, gerade genug, damit sie nicht schneiden. Listenpunkte sind kurze Striche (6×2px), keine Kreise. Piktogramme: 24×24-Raster, 2px Strich, runde Enden.

**Die 2px-Regel.** Keine Rundung über 2px, nirgends.

## Components

### Buttons
Groß, rechteckig, eindeutig: Schild zum Antippen.
- **Shape:** fast eckig (2px), mind. 48px hoch, 12px seitlich, Icon 20px mit 8px Abstand.
- **Standard (auf Schwarz):** weißer Grund, schwarze Schrift.
- **Primär:** gelber Grund, schwarze Schrift; genau eine pro Bereich („Alle in Apple Kalender“).
- **Auf Gelb:** schwarzer Grund, gelbe Schrift (im Band des nächsten Termins).
- **Hover / Focus / Active:** Hover hellt per `brightness(1.12)` auf; Drücken skaliert auf 0.97 (0.15s). Fokus: 3px Kontur mit 2px Abstand in der Kontextfarbe (Gelb auf schwarzen Flächen, Schwarz auf Gelb und im hellen Seitengrund).

### Termin-Band (Signature)
Das Grundelement der Seite.
- **Aufbau:** Piktogramm-Quadrat links; rechts Zeitzeile (Startzeit, Endzeit, Zustands-Marker, Dauer rechtsbündig), Titel, Ort(e) mit fettem „ab“/„an“, Link „Route in Karten“ mit Pfeil-Kästchen, Notizen als Strichliste; darunter die zwei Kalender-Buttons.
- **Farbe:** schwarzer Grund, weiße Schrift, 1px Oberkante.
- **Nächster Termin:** das ganze Band wird gelb, alle Farben kehren sich um, die Startzeit wächst auf 3.5rem. Ohne JavaScript bleibt der erste Termin markiert.
- **Vergangen:** 55% Deckkraft, Notizen und Buttons ausgeblendet.

### Zustands-Marker
- **Style:** kleines Schild in Gegenfarbe zum Band (weiß auf Schwarz, schwarz auf Gelb), 2px Rundung, Großbuchstaben mit 0.06em Laufweite.
- **Inhalt:** nur Live-Zustände aus der Uhrzeit („Als Nächstes“, „Läuft gerade“, „Vorbei“), vom Skript gesetzt. Kein Platz für Kategorien oder Überschriften.

### Piktogramm-Quadrat
- 44px (ab 40rem 52px), 2px Rundung, Icon 24px. Auf Schwarz: weißes Quadrat, schwarzes Icon. Auf Gelb: schwarzes Quadrat, gelbes Icon. Vorhandene Motive: Bus, Zug, Flug, Unterkunft, Ort; dazu Kalender, Route, Abo, Pfeil für Aktionen.

### Wegweiser oben (Navigation)
- Volle Breite, gelb, mind. 56px; schwarzes Pfeil-Quadrat, Termintitel (800, 1.0625rem, einzeilig mit Auslassung), darunter Tag, Uhrzeit und relative Zeit („in 2 Tagen“) in Gedämpfter Schildschrift.
- Fährt von oben herein (0.35s), sobald das gelbe Band aus dem Bild ist; der Text klappt beim Laden einmal wie ein Fallblatt auf (0.5s). Tippen springt zum Band.

### Reise-Link (Startseite)
- Schwarzes Band, Reisename 1.5rem/800, Untertitel in Steingrau, Pfeil rechts. Hover: das Band wird gelb.

### Box „Alle Termine“
- Schwarze Fläche, 24px 16px Polster, Headline, Erklärtext, Buttons untereinander in voller Breite (Primär zuerst), darunter ein abgetrennter Hinweis in 0.875rem.

## Do's and Don'ts

### Do:
- **Do** zeige jeden Termin als schwarzes Band und genau den nächsten als gelbes.
- **Do** kehre auf Gelb alles um: schwarze Buttons und Quadrate mit gelber Schrift.
- **Do** setze Uhrzeiten groß (2.125rem, im nächsten Termin 3.5rem) in Gewicht 800 und Tabellenziffern.
- **Do** halte Tap-Ziele bei mindestens 44px, Buttons bei 48px.
- **Do** zeichne neue Piktogramme als SVG im 24px-Raster mit 2px Strich und runden Enden.
- **Do** lass im dunklen Modus die Schilder unverändert und wechsle nur Grund, Seitenschrift, Linien und Fokusfarbe.
- **Do** respektiere `prefers-reduced-motion`: dann keine Animationen und Übergänge.

### Don't:
- **Don't** nutze Gelb als Dekoration, Rahmen oder Hintergrund ohne Wegweiser-Funktion.
- **Don't** runde Ecken über 2px.
- **Don't** setze Schatten, Verläufe oder Unschärfe ein.
- **Don't** baue die Standard-Zeitleiste mit weißen Karten und blauem Punkt nach.
- **Don't** schreibe Überschriften oder Buttons in Großbuchstaben; die gibt es nur im Zustands-Marker.
- **Don't** ersetze Piktogramme durch Emoji oder Schriftzeichen.
