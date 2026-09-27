# Amal AirWatch — Medical Weather Bulletin

Bilingual (EN/AR) allergy, asthma and Ghibli dust-storm bulletin for Al Amal Medical Group, covering Tripoli, Benghazi, Misrata, Zawiya, Surman and Sabha.

## Files
- `index.html` — the whole application (HTML, CSS and JavaScript in one file, no build step)
- `assets/logo.svg` — official Al Amal Group logo
- `assets/aerius.jpg`, `assets/nasonex.jpg`, `assets/singulair.jpg` — product packshots (from amalgrp.com)
- `assets/banner.jpg` — "الأصلي" authenticity sticker banner

## Deploy on GitHub Pages
1. Copy `index.html` and the `assets/` folder to the root of the repository (replacing the old `index.html`).
2. Commit and push. GitHub Pages serves it as before.
3. The page fetches live weather and air quality from Open-Meteo in the browser; no API key, no server, no Python job required. If the request fails it falls back to clearly labelled sample data.

## Where to change things
Everything configurable is at the top of the `<script>` block in `index.html`:
- `ASSETS` — image paths
- `CONTACT` — WhatsApp contact, hotline
- `CITIES` — cities, coordinates, branch flag
- `PRODUCTS` — product copy and approved dosing (EN/AR)
- `T` — every UI string in both languages
- `indices()` — allergy / asthma / Ghibli formulas and thresholds
- `uplift()` — demand-signal factor for the Sales & Inventory tab

Colours are CSS custom properties at the top of the `<style>` block (`--amal`, `--navy`, `--amal-red`, …).

## AI assistant
Inside Claude artifacts the assistant uses Claude. On GitHub Pages it answers from the bulletin data with built-in rules (dosing, availability, contact, summaries). To connect an LLM API on the hosted version, replace `sampleFn` in `answer()` with your own fetch call — never embed an API key in the page.

## Data source
Open-Meteo forecast and air-quality APIs (CAMS model). WHO Air Quality Guidelines 2021 thresholds. Indices are estimates for awareness and do not replace clinical assessment.
