# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Trip data (`trips/*.json`) becomes a static website: one page per trip, with "Apple Kalender" / "Google Kalender" buttons per event, "add all", and calendar subscription (`webcal://`). Friends open the link from WhatsApp or Messenger on their phones. Live at https://taanel.github.io/ics-converter/. The repo is `Taanel/ics-converter` and is **public**.

## Commands

- `npm run build`: validates trips and writes `dist/` (HTML + `.ics` per event + `alle.ics` per trip)
- `npm run dev`: build, then serve `dist/` on http://localhost:8080
- `npm test`: `node --test` (tests in `test/`)

Every push to `main` runs `.github/workflows/deploy.yml`, which tests, builds and deploys to GitHub Pages.

## Architecture

Plain Node.js ESM, **zero dependencies**: keep it that way unless there is a strong reason.

- `src/build.js`: loads + validates trips, converts local times to UTC (`prepareTrip`), writes pages and `.ics` files. Base URL comes from `SITE_URL` or `homepage` in `package.json`.
- `src/validate.js`: German error messages. Includes the **privacy check** that rejects booking numbers, long codes and prices.
- `src/ics.js`: RFC 5545 output (escaping, 75-byte folding, CRLF, VALARM). Times are always written in UTC (`Z`).
- `src/dates.js`: local time → UTC via `Intl` (any IANA timezone), German date formatting.
- `src/links.js`: Google Calendar template/subscribe links, webcal, Google Maps.
- `src/page.js`: all HTML/CSS (inline) and two small inline scripts. `INAPP_SCRIPT` detects in-app browsers: on Android it redirects to Chrome via `intent://`, on iOS it shows the "In Safari öffnen" banner (`x-safari-https`). `TRIP_SCRIPT` handles the next-event highlight, the sticky strip and the split-flap time animation.
- `src/serve.js`: dev server only.

## Rules

- **Privacy:** never put booking numbers, confirmation codes, prices or last names into `trips/`, tests or anything committed. Use obviously fake values in tests.
- **Design:** the visual system is documented in `DESIGN.md` (direction "Flughafen-Wegweiser", Impeccable). `PRODUCT.md` holds product context. Yellow `#FFCC00` is only for the next event, wayfinding and actions. Signs are black in both themes. Run `impeccable detect --json dist/prag-2026/index.html` after UI changes, and keep the type ramp in sync with `DESIGN.md`.
- **Motion:** every animation needs a `prefers-reduced-motion` fallback. Hidden start states apply only under `html.js`, so content stays visible without JS.
- **iPhone constraints:** `.ics` import and `webcal://` only work in Safari, not in in-app browsers (Messenger, Instagram). Keep the in-app handling intact.
- UI text is German. The trip data format is documented for beginners in `README.md`. Update it when the format changes.
