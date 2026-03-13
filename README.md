# MikroTik Produktvergleich

Interaktive Vergleichsapp für MikroTik-Netzwerkprodukte — gebaut mit React + Vite + Tailwind CSS.

## Funktionen

- **4 Produktkategorien**: Router, Switches, Wireless/AP, Richtfunk
- Detailansicht mit technischen Spezifikationen pro Produkt
- Vergleichstabelle pro Kategorie
- Kategorie-Filter und Volltextsuche
- Direktlinks zu MikroTik Produktseiten und Geizhals Preisvergleich

## Produktumfang

| Kategorie | Modelle |
|-----------|---------|
| Router | hEX lite/hEX/hEX S/hEX PoE, L009, RB3011, RB4011, RB5009, RB1100, CCR2004/2116/2216 |
| Switches | CSS106/318/610, CRS305–518, CRS804, CRS418 (Wi-Fi) |
| Wireless | hAP ax²/ax³, cAP ax, wAP ax, Audience |
| Richtfunk | SXT, Disc, LHG 5G/60G, Wireless Wire Dish |

## Lokale Entwicklung

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Die Build-Ausgabe liegt in `dist/` und kann direkt auf einem Webserver oder über GitHub Pages gehostet werden.

## Deployment

Das Projekt enthält eine GitHub Actions Pipeline (`.github/workflows/build.yml`), die bei jedem Push auf `main` automatisch baut und auf GitHub Pages deployt.

> Alle Preise sind unverbindliche Richtwerte (MSRP) in USD/EUR — ohne Gewähr.
