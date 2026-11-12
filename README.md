# Healthcare AI (23A133403c) — Textbook & Learning Site

Complete learning material for **Healthcare AI (23A133403c)** — B.Tech IV Year I Semester (R23 Regulation), Dept. of CSE (AI & ML), Dr. K. V. Subba Reddy Institute of Technology (Autonomous).

## Contents

| Folder | What it is |
|---|---|
| `textbook/` | The canonical Markdown textbook: 36 chapters across 5 units + appendices (glossary, 8 labs, reading list, and the official **question bank — 90 questions with full structured model answers**) |
| `site/` | A polished static learning site generated from that corpus |

## The textbook

- `textbook/README.md` — course info, preface, full table of contents
- `textbook/01-unit1.md` … `05-unit5.md` — the five units, chapter by chapter
- `textbook/06-appendices.md` — Appendix A: glossary (107 terms) · B: 8 labs + datasets · C: reading list · D: question bank

Every question-bank answer is presented in **structured form**: a one-line key point, then numbered sub-topics, each carrying its own key point and short bullets or comparison tables — tiered by mark weight (2 → recall, 3 → comparison, 5 → structured explanation, 10 → integrated essay/design).

## The site

```bash
cd site
npm install
npm run build      # node build.js — generates 36 chapter pages + landing/contents/glossary/labs/question-bank
npm run diagrams   # python3 diagrams/build_diagrams.py — regenerates the 6 SVG figures
npm run serve      # http://127.0.0.1:8777
```

Features: ⌘K command palette over all section text, reading progress (localStorage), light/dark themes, clinical triage drill, inline + standalone figures, fully responsive. Verification evidence in `site/evidence/`.

## Verification

- `node --check build.js && node --check src/app.js`
- `python3 scripts/check_site.py .` → 0 broken refs / 0 missing anchors / 0 duplicate IDs
- Diagram self-check (`diagram-design/scripts/self_check.py figures/*.html`) → all OK
- Browser QA (22 checks, 0 console errors) — results in `site/evidence/qa-results.json`

## Attribution

Design language derived from *AI Engineering from Scratch* (MIT). All content is original.
