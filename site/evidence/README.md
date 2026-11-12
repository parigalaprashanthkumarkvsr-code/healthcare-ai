# Verification Evidence — Healthcare AI (23A133403c) Site

Date: 2026-11-11 · Build: 36 chapters, 107 glossary entries, 8 labs, 90-question bank.

## Automated checks

| Check | Tool | Result |
|---|---|---|
| Diagram pages (6) | `diagram-design/scripts/self_check.py` | all `OK` |
| Site links/anchors/IDs (48 files) | `subject-site/scripts/check_site.py` | `broken_refs=0 missing_anchors=0 duplicate_ids=0` |
| Build JS syntax | `node --check build.js && node --check src/app.js` | pass |
| Build | `npm run build` | `Built 36 chapters, 107 glossary entries, 8 labs.` |

## Browser QA (CDP-driven Chromium, `qa-results.json`)

22/22 checks passed, 0 console errors across 13 pages:

- Landing 1440×1100: hero, theme toggle + persistence, ⌘K palette open/search ("sepsis" → 14 results), triage drill verdict, carousel advance, unit modal + Esc close, copy citation.
- Reader: chapter render, inline figure present, mark-as-read persists across reload (`healthai:progress:v1`), next-chapter nav.
- Contents lists 36 chapters; glossary 113 matched IDs; question bank has all 20 `D.1–D.20` sections; labs page lists 8 labs.
- Tablet 1024×900 render; mobile 390×844: hamburger nav opens, zero horizontal overflow, ch-19 figure renders.
- Sweep of 13 pages (index, contents, glossary, labs, reading, question-bank, ch-01/04/19/26/33/35/36): no console errors or exceptions.
- Standalone figure pages contain zero scripts (static contract honored).

## Screenshots (`shots/`)

`01-index-dark-1440`, `02-palette-1440`, `03-triage-1440`, `04-carousel-1440`, `05-unit-modal-1440`,
`06-ch01-1440`, `07-contents-1440`, `08-question-bank-1440`, `09-index-1024`, `10-mobile-nav-390`,
`11-index-390`, `12-ch19-390`, `13-figure-page`, `14-ch19-figure-inline`, `15-ch04-figure-inline`,
and one full-page shot per figure (`fig-*.png`, 6 figures).

## Question bank redesign (2026-11-11, second pass)

All 90 model answers restructured from prose paragraphs into **structured form** — one-line key point
per answer, numbered sub-topics each with its own key point + short bullets/comparison tables,
takeaways on 5-mark answers, (A)–(F) parts + synthesis on 10-mark answers. Verified: 20 `D.` sections,
90 `**Q` questions, 91 key-point lines (one table-form), rebuilt site, `check_site.py` clean
(`broken_refs=0 missing_anchors=0 duplicate_ids=0`), rendering confirmed in
`16-qb-structured-top.png` and `17-qb-structured-10mark.png`. Textbook copy and its README
(QB organization table) updated to match.

## Fixes made during verification

- `readDiagram(slug, suffix)` — namespaced IDs for the second embed of the ecosystem figure on `index.html` (duplicate-ID fix).
- Search index now indexes section body text (the palette's own suggestions, e.g. "sepsis", previously matched nothing).
- Diagram `arrow()` marker references were missing the slug prefix → arrowheads never rendered; fixed and re-verified visually.
- Added `favicon.ico` at site root (browser default request 404'd on pages without a favicon `<link>`).
