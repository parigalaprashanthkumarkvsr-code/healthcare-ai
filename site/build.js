#!/usr/bin/env node
/* Build the static textbook site from the Markdown sources. */
'use strict';

const fs = require('fs');
const path = require('path');
const { marked, Renderer } = require('marked');
const hljs = require('highlight.js');

const ROOT = __dirname;
const CONTENT = path.join(ROOT, 'content');
const OUT = ROOT;
const DIAGRAMS = path.join(ROOT, 'assets', 'diagrams');

const UNIT_META = [
  { id: 'unit-1', roman: 'I', file: '01-unit1.md', focus: 'Foundations of AI in medicine, CDSS, the clinical data ecosystem, specialty applications, telemedicine' },
  { id: 'unit-2', roman: 'II', file: '02-unit2.md', focus: 'Cleaning, missing data and bias, EHR and time-series features, dimensionality reduction, clinical NLP, ICD/CPT' },
  { id: 'unit-3', roman: 'III', file: '03-unit3.md', focus: 'Supervised and unsupervised learning, CNNs and transfer learning, RNNs/LSTMs, evaluation metrics, imbalance, LIME/SHAP, HIPAA' },
  { id: 'unit-4', roman: 'IV', file: '04-unit4.md', focus: 'Disease diagnosis, multi-modal systems, segmentation, ICU analytics, genomics, drug discovery, digital health' },
  { id: 'unit-5', roman: 'V', file: '05-unit5.md', focus: 'Bioethics, bias and fairness, FDA/CE for SaMD, responsible deployment, XAI and trust, federated learning, clinical trials' }
];

const DIAGRAM_META = {
  'clinical-data-ecosystem': { label: 'FIG_001', title: 'The clinical data ecosystem', caption: 'Sources, standards, and infrastructure feed every clinical AI application — and privacy governs every movement.' },
  'ai-ml-dl': { label: 'FIG_002', title: 'AI ⊃ ML ⊃ DL', caption: 'The three families, nested. Rules, learning, and representation learning are not the same bet.' },
  'cdss-architecture': { label: 'FIG_003', title: 'CDSS architecture with an AI engine', caption: 'Patient data and a knowledge base meet in an inference engine — rule-based or learned — and surface through the interface.' },
  'evaluation-quadrant': { label: 'FIG_004', title: 'Choosing metrics by prevalence and cost', caption: 'What to optimize depends on how rare the disease is and which error the clinic can afford.' },
  'federated-loop': { label: 'FIG_005', title: 'The federated learning loop', caption: 'Data never leaves each hospital; only model updates travel, are securely aggregated, and return.' },
  'deployment-chain': { label: 'FIG_006', title: 'The responsible deployment chain', caption: 'Local validation → shadow mode → staged rollout → monitored operation, with governance at every link.' }
};

function read(file) { return fs.readFileSync(path.join(CONTENT, file), 'utf8'); }
function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function stripHtml(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ').trim();
}
function slugify(s) {
  return String(s).toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
}
function readingTime(md) {
  const words = stripHtml(marked.parse(md)).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
function pad(n, width) { return String(n).padStart(width || 2, '0'); }

/* ------------------------------------------------------------------ */
/* Markdown rendering                                                   */
/* ------------------------------------------------------------------ */

function makeRenderer(sectionIds) {
  const renderer = new Renderer();

  renderer.heading = function (token) {
    const text = token.text;
    const level = token.depth;
    if (level === 1) {
      return '<h1>' + this.parser.parseInline(token.tokens) + '</h1>\n';
    }
    if (level === 2) {
      const id = sectionIds.get(text) || ('sec-' + slugify(text));
      let label = '';
      let rest = text;
      const m = text.match(/^(\d+\.\d+)\s+(.+)$/);
      if (m) { label = m[1]; rest = m[2]; }
      const inner = (label ? '<span class="sec-num">' + label + '</span>' : '') + stripInline(rest);
      return '</section>\n<section class="chapter-section" id="' + id + '" data-section="' + esc(text) + '">\n<h2>' + inner + '</h2>\n';
    }
    const id = 'sec-' + slugify(text);
    return '<h' + level + ' id="' + id + '">' + this.parser.parseInline(token.tokens) + '</h' + level + '>\n';
  };

  renderer.code = function (token) {
    const lang = (token.lang || '').trim().split(/\s+/)[0];
    const code = token.text;
    let highlighted, label;
    if (lang === 'python' || lang === 'py') {
      highlighted = hljs.highlight(code, { language: 'python' }).value;
      label = 'Python';
    } else if (lang === 'json') {
      highlighted = hljs.highlight(code, { language: 'json' }).value;
      label = 'JSON';
    } else if (lang === 'bash' || lang === 'sh') {
      highlighted = hljs.highlight(code, { language: 'bash' }).value;
      label = 'Shell';
    } else {
      highlighted = esc(code);
      label = 'Text';
    }
    const ascii = !lang || lang === 'text';
    return '<div class="code-block' + (ascii ? ' code-block--ascii' : '') + '" data-lang="' + esc(label) + '">' +
      '<div class="code-block__head"><span>' + esc(label) + '</span>' +
      '<button type="button" class="code-block__copy" data-copy="' + esc(code) + '">copy</button></div>' +
      '<pre><code class="hljs language-' + esc(lang || 'text') + '">' + highlighted + '</code></pre></div>\n';
  };

  renderer.blockquote = function (token) {
    let inner = this.parser.parse(token.tokens);
    let cls = 'callout';
    let label = 'Note';
    const raw = token.text || '';
    if (/^\*\*(Clinical in practice)/i.test(raw)) {
      cls += ' callout--clinical';
      label = 'Clinical in practice';
      inner = inner.replace(/<strong>(Clinical in practice)\.<\/strong>\s*/i, '');
    } else if (/^\*\*Why this matters/i.test(raw)) {
      cls += ' callout--why';
      label = 'Why this matters';
      inner = inner.replace(/<strong>Why this matters\.<\/strong>\s*/i, '');
    } else if (/^\*\*Field note/i.test(raw)) {
      label = 'Field note';
      inner = inner.replace(/<strong>Field note\.<\/strong>\s*/i, '');
    } else {
      inner = inner.replace(/<strong>(.*?)<\/strong>\s*/, '');
    }
    return '<blockquote class="' + cls + '"><span class="callout__label">' + esc(label) + '</span>' + inner + '</blockquote>\n';
  };

  return renderer;
}

// marked's table renderer is easier to leave alone; we post-process wrappers.
function stripInline(text) {
  return esc(text);
}

function prepareMarkdown(unitText, chapter) {
  // Collect H2 headings to assign stable ids before rendering.
  const ids = new Map();
  const headings = [];
  const lines = unitText.split('\n');
  for (const line of lines) {
    const m = line.match(/^## (.+)$/);
    if (!m) continue;
    const text = m[1].trim();
    let id;
    const num = text.match(/^(\d+\.\d+)\s+/);
    if (num) id = 's-' + num[1].replace(/\./g, '-');
    else id = 's-' + slugify(text);
    ids.set(text, id);
    headings.push({ text, id });
  }
  const renderer = makeRenderer(ids);
  let html = marked.parse(unitText, { renderer, gfm: true, breaks: false });
  return { html, headings };
}

function splitSections(html, headings) {
  // Renderer emits a closing </section> before every H2 and opens a new one.
  // Normalize the leading fragment and close the final section.
  const first = html.indexOf('<section class="chapter-section"');
  let intro = first === -1 ? html : html.slice(0, first);
  let body = first === -1 ? '' : html.slice(first);
  if (body) body += '\n</section>';
  // Remove stray leading </section> if the first block was a section.
  intro = intro.replace(/<\/section>\s*$/, '');
  // Add semantic classes and list treatments per section.
  body = body.replace(/<section class="chapter-section"([^>]*)>\s*<h2[^>]*>([\s\S]*?)<\/h2>/g,
    function (m, attrs, h2inner) {
      const title = stripHtml(h2inner.replace(/<span class="sec-num">[\s\S]*?<\/span>\s*/, '')).replace(/^\d+\.\d+\s*/, '');
      let extra = '';
      if (/^Chapter objectives$/i.test(title)) extra = ' chapter-section--brief';
      else if (/^Key terms$/i.test(title)) extra = ' chapter-section--terms';
      else if (/^Review questions$/i.test(title)) extra = ' chapter-section--review';
      return '<section class="chapter-section' + extra + '"' + attrs + '><h2>' + h2inner + '</h2>';
    });
  // Key terms list → definition rows.
  body = body.replace(/<section class="chapter-section chapter-section--terms"([\s\S]*?)<\/section>/g, function (whole, inner) {
    inner = inner.replace(/<ul>([\s\S]*?)<\/ul>/, function (m, list) {
      const items = list.split(/<li>/).slice(1).map(function (li) {
        li = li.replace(/<\/li>[\s\S]*$/, '').trim();
        const match = li.match(/^\s*<strong>(.*?)<\/strong>\s*(?:—|-)\s*([\s\S]*)$/);
        if (match) {
          return '<div class="terms-list__item"><div class="terms-list__term">' + match[1] + '</div><div class="terms-list__def">' + match[2] + '</div></div>';
        }
        return '<div class="terms-list__item"><div class="terms-list__term">Term</div><div class="terms-list__def">' + li + '</div></div>';
      });
      return '<div class="terms-list">' + items.join('') + '</div>';
    });
    return '<section class="chapter-section chapter-section--terms"' + inner + '</section>';
  });
  // Review questions → numbered review list.
  body = body.replace(/<section class="chapter-section chapter-section--review"([\s\S]*?)<\/section>/g, function (whole, inner) {
    inner = inner.replace(/<ol>/, '<ol class="review-list">');
    return '<section class="chapter-section chapter-section--review"' + inner + '</section>';
  });
  // Wrap tables that marked emitted without our wrapper.
  body = body.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  return { intro, body };
}

function renderChapter(md, chapter) {
  const { html, headings } = prepareMarkdown(md, chapter);
  const parts = splitSections(html, headings);
  return { intro: parts.intro, body: parts.body, headings };
}

/* ------------------------------------------------------------------ */
/* Content extraction                                                   */
/* ------------------------------------------------------------------ */

function extractFrontMatter() {
  const readme = fs.readFileSync(path.join(CONTENT, 'README.md'), 'utf8');
  const preface = readme.split('## Preface')[1].split('### Who this book is for')[0].trim();
  const howto = readme.split('## How to use this book')[1].split('## Notation')[0].trim();
  const notation = readme.split('## Notation')[1].split('*Let’s begin.*')[0].trim();
  return { readme, preface, howto, notation };
}

function extractChapter(md, number, title) {
  const lines = md.split('\n');
  const start = lines.findIndex(l => new RegExp('^# Chapter ' + number + '\\. ' + title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$').test(l));
  if (start === -1) throw new Error('Chapter not found: ' + number + ' ' + title);
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^# Chapter \d+\. /.test(lines[i])) { end = i; break; }
  }
  return lines.slice(start + 1, end).join('\n').trim();
}

function chapterSummary(md) {
  const m = md.match(/## \d+\.\d+ Chapter objectives\s*\n([\s\S]*?)(?=\n## )/);
  if (m) {
    const li = m[1].match(/^\s*(?:\d+\.|[-*])\s+(.+)$/m);
    if (li) return stripHtml(marked.parseInline(li[1])).replace(/\s+/g, ' ').trim();
  }
  const p = md.split('\n\n').find(s => s && !s.startsWith('#') && !s.startsWith('---'));
  return p ? stripHtml(marked.parseInline(p)) : '';
}

function parseUnits(front) {
  const units = [];
  for (const meta of UNIT_META) {
    const text = read(meta.file);
    const titleLine = text.split('\n').find(l => l.startsWith('# UNIT '));
    const m = titleLine.match(/^# UNIT ([IVX]+) — (.+)$/);
    if (!m) throw new Error('Bad unit heading: ' + titleLine);
    const chapters = [];
    const chapterHeads = [...text.matchAll(/^# Chapter (\d+)\. (.+)$/gm)];
    chapterHeads.forEach(function (match, i) {
      const n = Number(match[1]);
      const title = match[2].trim();
      const start = match.index + match[0].length;
      const end = i + 1 < chapterHeads.length ? chapterHeads[i + 1].index : text.length;
      const md = text.slice(start, end).replace(/\n---\s*\n---\s*$/, '').trim();
      const slug = 'ch-' + pad(n);
      chapters.push({
        n, title, slug,
        md,
        summary: chapterSummary(md),
        minutes: readingTime(md),
        sections: [...md.matchAll(/^## (.+)$/gm)].map(x => x[1].trim())
      });
      // Section body snippets for the search index.
      chapters[chapters.length - 1].sectionTexts = (() => {
        const heads = [...md.matchAll(/^## (.+)$/gm)];
        return heads.map((h, i) => {
          const body = md.slice(h.index + h[0].length, i + 1 < heads.length ? heads[i + 1].index : md.length);
          return stripHtml(marked.parse(body)).replace(/\s+/g, ' ').trim().slice(0, 400);
        });
      })();
    });
    units.push({
      id: meta.id, roman: m[1], title: m[2].trim(), focus: meta.focus,
      chapters
    });
  }
  return units;
}

function parseGlossary() {
  const text = read('06-appendices.md');
  const block = text.split('# Appendix A. Glossary of Key Terms')[1].split('# Appendix B.')[0];
  const groups = [];
  let current = null;
  for (const line of block.split('\n')) {
    const h = line.match(/^## (A\.\d+) (.+)$/);
    if (h) { current = { id: 'g-' + slugify(h[2]), num: h[1], title: h[2].trim(), entries: [] }; groups.push(current); continue; }
    const li = line.match(/^-\s+\*\*(.+?)\*\*\s*(?:—|-)\s*(.+)$/);
    if (li && current) {
      current.entries.push({
        term: li[1].trim(),
        def: li[2].trim(),
        id: 'g-' + slugify(li[1]).slice(0, 48)
      });
    }
  }
  return groups;
}

function parseLabs() {
  const text = read('06-appendices.md');
  const block = text.split('# Appendix B. Suggested Lab Exercises and Datasets')[1].split('# Appendix C.')[0];
  const labs = [];
  const matches = [...block.matchAll(/^## (Lab \d+[^\n]*)\n/gm)];
  matches.forEach(function (m, i) {
    const heading = m[1].trim();
    const start = m.index + m[0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : block.length;
    let content = block.slice(start, end).trim();
    content = content.split(/\n## Datasets commonly used/)[0].trim();
    const h = heading.match(/^Lab (\d+)\s*(?:\((.*?)\))?\.\s*(.+)$/);
    labs.push({
      n: h ? Number(h[1]) : i + 1,
      chapters: h ? (h[2] || '') : '',
      title: h ? h[3].trim() : heading,
      md: content,
      id: 'lab-' + (h ? Number(h[1]) : i + 1)
    });
  });
  const datasetsBlock = block.split('## Datasets commonly used (verify licenses/availability)')[1] || '';
  return { labs, datasetsMd: datasetsBlock.trim() };
}

function parseAppendices() {
  const text = read('06-appendices.md');
  const parts = [...text.matchAll(/^# Appendix ([A-D])\. (.+)$/gm)];
  return parts.map(function (m, i) {
    const start = m.index + m[0].length;
    const end = i + 1 < parts.length ? parts[i + 1].index : text.length;
    return {
      letter: m[1],
      title: m[2].trim(),
      id: 'appendix-' + m[1].toLowerCase(),
      md: text.slice(start, end).trim()
    };
  });
}

/* ------------------------------------------------------------------ */
/* Templates                                                            */
/* ------------------------------------------------------------------ */

function themeBoot() {
  return `<script>
  (function(){try{var t=localStorage.getItem('healthai:theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();
  </script>`;
}

function head(opts) {
  const title = opts.title ? opts.title + ' — Healthcare AI' : 'Healthcare AI — A Complete Textbook';
  const desc = opts.description || 'A complete textbook on artificial intelligence in healthcare: five units, thirty-six chapters, eight labs, and a full question bank with model answers.';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="color-scheme" content="light dark">
  ${themeBoot()}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=VT323&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${opts.base || ''}assets/styles.css">
  <link rel="icon" href="${opts.base || ''}assets/favicon.svg" type="image/svg+xml">
  ${opts.extraHead || ''}
</head>
<body data-page="${opts.page || 'page'}"${opts.bodyAttrs || ''}>
  <a class="skip-link" href="#main">Skip to content</a>
  ${banner(opts.base || '')}
  ${header(opts)}
  ${opts.content}
  ${footer(opts.base || '')}
  ${palette(opts.base || '')}
  ${opts.modal || ''}
  <script src="${opts.base || ''}assets/search-index.js"></script>
  <script src="${opts.base || ''}assets/app.js"></script>
</body>
</html>`;
}

function banner(base) {
  return `<div class="banner" id="siteBanner">
    <div class="banner__inner">
      <strong>First edition · 2026</strong>
      <span><span class="banner__lead">Five units, thirty-six chapters, a full question bank with model answers.</span> <a href="${base}index.html#preface">Read the preface</a> or <a href="${base}read/ch-01.html">start with Chapter 1</a>.</span>
    </div>
    <button class="banner__close" id="bannerClose" type="button" aria-label="Dismiss the announcement">×</button>
  </div>`;
}

function header(opts) {
  const base = opts.base || '';
  const page = opts.page || '';
  function current(name) { return page === name ? ' aria-current="page"' : ''; }
  return `<header class="site-header" id="siteHeader">
    <div class="site-header__inner">
      <a class="brand" href="${base}index.html" aria-label="Healthcare AI, home">
        <span class="brand__mark">HEALTH<span>/</span>CARE&nbsp;AI</span>
        <span class="brand__tag">A complete<br>textbook</span>
      </a>
      <nav class="site-nav" aria-label="Primary">
        <a href="${base}contents.html"${current('contents')}>Contents</a>
        <a href="${base}index.html#units">Units</a>
        <a href="${base}labs.html"${current('labs')}>Labs</a>
        <a href="${base}glossary.html"${current('glossary')}>Glossary</a>
        <a href="${base}reading.html"${current('reading')}>Reading</a>
        <a href="${base}question-bank.html"${current('question-bank')}>Questions</a>
      </nav>
      <div class="header-tools">
        <button class="search-trigger" type="button" aria-label="Search the textbook (Command K)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4.2-4.2"></path></svg>
          <span>Search</span>
          <kbd>⌘K</kbd>
        </button>
        <div class="theme-wrap">
          <button class="icon-btn" id="themeToggle" type="button" aria-label="Change theme" aria-haspopup="true" aria-expanded="false" aria-controls="themeMenu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"></path></svg>
          </button>
          <div class="theme-menu" id="themeMenu" role="menu" aria-label="Theme" hidden>
            <div class="theme-menu__label">Appearance</div>
            <button type="button" role="menuitemradio" data-mode="system" aria-checked="true">System</button>
            <button type="button" role="menuitemradio" data-mode="light" aria-checked="false">Light</button>
            <button type="button" role="menuitemradio" data-mode="dark" aria-checked="false">Dark</button>
          </div>
        </div>
        <a class="btn btn--primary btn--sm header-cta" href="${base}read/ch-01.html">Start reading</a>
        <button class="icon-btn menu-toggle" id="menuToggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="mobileNav">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>
        </button>
      </div>
    </div>
  </header>
  <div class="mobile-nav" id="mobileNav">
    <a href="${base}contents.html">Contents <span>36 chapters</span></a>
    <a href="${base}index.html#units">Units <span>5 units</span></a>
    <a href="${base}labs.html">Labs <span>8 exercises</span></a>
    <a href="${base}glossary.html">Glossary <span>key terms</span></a>
    <a href="${base}reading.html">Reading list <span>appendix C</span></a>
    <a href="${base}question-bank.html">Question bank <span>appendix D</span></a>
    <div class="mobile-nav__tools">
      <a class="btn btn--primary btn--sm" href="${base}read/ch-01.html">Start reading</a>
      <a class="btn btn--ghost btn--sm" href="${base}contents.html">Open contents</a>
    </div>
  </div>`;
}

function palette(base) {
  return `<div class="cp" id="cmdPalette" role="dialog" aria-modal="true" aria-label="Search the textbook" aria-hidden="true">
    <div class="cp__panel">
      <div class="cp__head">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4.2-4.2"></path></svg>
        <input class="cp__input" id="cpInput" type="text" placeholder="Search chapters, sections, glossary, labs…" autocomplete="off" spellcheck="false" aria-controls="cpResults" aria-expanded="true">
        <span class="cp__esc">ESC</span>
        <button class="icon-btn cp__close" type="button" aria-label="Close search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>
        </button>
      </div>
      <div class="cp__body" id="cpResults" role="listbox" aria-label="Search results"></div>
      <div class="cp__foot">
        <span id="cpSummary">Search 36 chapters, 200+ sections, glossary, labs, and the question bank.</span>
        <span><kbd>↑</kbd> <kbd>↓</kbd> to move · <kbd>enter</kbd> to open · <kbd>esc</kbd> to close</span>
      </div>
    </div>
  </div>`;
}

function footer(base) {
  return `<footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="brand" href="${base}index.html"><span class="brand__mark">HEALTH<span>/</span>CARE&nbsp;AI</span></a>
          <p>Healthcare AI (23A133403c) — from the clinical data ecosystem to the ethics and regulation that decide whether a model reaches a patient.</p>
        </div>
        <div class="footer-col">
          <h4>Read</h4>
          <a href="${base}contents.html">Contents</a>
          <a href="${base}read/ch-01.html">Chapter 1</a>
          <a href="${base}reading.html">Reading list</a>
          <a href="${base}question-bank.html">Question bank</a>
        </div>
        <div class="footer-col">
          <h4>Practice</h4>
          <a href="${base}labs.html">Lab manual</a>
          <a href="${base}glossary.html">Glossary</a>
          <a href="${base}contents.html#unit-3">ML &amp; deep learning</a>
          <a href="${base}contents.html#unit-5">Ethics &amp; future</a>
        </div>
        <div class="footer-col">
          <h4>About</h4>
          <a href="${base}index.html#preface">Preface</a>
          <a href="${base}index.html#colophon">Colophon</a>
          <a href="${base}index.html#reading-paths">Reading paths</a>
          <a href="${base}index.html#units">Units</a>
        </div>
      </div>
      <div class="footer-base">
        <span>First edition · 2026 · Static site · Progress stays in your browser</span>
        <span>Design language inspired by <a href="https://aiengineeringfromscratch.com/" rel="noopener">AI Engineering from Scratch</a> (MIT)</span>
      </div>
    </div>
  </footer>`;
}

function figure(slug, opts) {
  const meta = DIAGRAM_META[slug] || { label: 'FIG', title: slug, caption: '' };
  let svg = '';
  const file = path.join(DIAGRAMS, slug + '.svg');
  if (fs.existsSync(file)) {
    svg = fs.readFileSync(file, 'utf8').trim();
    svg = svg.replace(/<svg /, '<svg class="diagram-svg" ');
  } else {
    svg = '<div class="diagram-placeholder">Diagram pending: ' + esc(slug) + '</div>';
  }
  return `<figure class="figure" id="fig-${slug}">
    <div class="figure__label"><b>${meta.label}</b><span>${esc(meta.title)}</span></div>
    ${svg}
    <figcaption class="figure__caption">${opts && opts.caption ? opts.caption : '<b>' + esc(meta.title) + '.</b> ' + esc(meta.caption)}</figcaption>
  </figure>`;
}

/* ------------------------------------------------------------------ */
/* Pages                                                                */
/* ------------------------------------------------------------------ */

function buildLanding(units, glossary, labs) {
  const totalChapters = units.reduce((n, u) => n + u.chapters.length, 0);
  const totalTerms = glossary.reduce((n, g) => n + g.entries.length, 0);
  const firstChapters = units.map(u => u.chapters[0]);
  const preface = extractFrontMatter().preface;
  const short = { 'I': 'Introduction', 'II': 'Preprocessing', 'III': 'ML &amp; DL', 'IV': 'Applications', 'V': 'Ethics &amp; regulation' };
  const totalLabs = labs.labs.length;
  const unitRows = units.map(function (u) {
    return `<button class="unit-row" type="button" data-unit="${u.id}" aria-haspopup="dialog">
      <span class="unit-row__num">${u.roman}</span>
      <span class="unit-row__title">${esc(u.title)}<small>${esc(u.focus)}</small></span>
      <span class="unit-row__count">${u.chapters.length} chapters</span>
      <span class="unit-row__progress">Progress
        <span class="unit-row__bar" data-progress-total="${totalChapters}" role="progressbar" aria-label="Reading progress" aria-valuemin="0" aria-valuemax="100"><i></i></span>
      </span>
      <span class="unit-row__arrow" aria-hidden="true">→</span>
    </button>`;
  }).join('\n');

  const triage = `<div class="triage" id="triage">
    <div class="triage__side">
      <div class="eyebrow">60-second drill</div>
      <div class="triage__clock" tabindex="-1">04:00</div>
      <div class="triage__label">Case clock</div>
      <div class="triage__score">Score <b>0 / 0</b><br><span class="muted">Three cases. One clinician.</span></div>
    </div>
    <div class="triage__main">
      <div class="triage__scenario">CASE / TRIAGE</div>
      <p class="triage__question"></p>
      <div class="triage__options"></div>
      <div class="triage__verdict" aria-live="polite"></div>
      <button class="btn btn--primary btn--sm triage__next" type="button" hidden>Next case →</button>
    </div>
  </div>`;

  const carousel = `<div class="carousel" id="figureCarousel" aria-roledescription="carousel" aria-label="Three figures from the textbook">
    <div class="carousel__stage">
      <div class="carousel__plate is-active" data-caption="The clinical data ecosystem. Sources, standards, and infrastructure feed every clinical AI application — and privacy governs every movement." aria-hidden="false">${readDiagram('clinical-data-ecosystem', 'carousel')}</div>
      <div class="carousel__plate" data-caption="CDSS architecture. Patient data and a knowledge base meet in an inference engine — rule-based or learned — and surface through the interface." aria-hidden="true">${readDiagram('cdss-architecture')}</div>
      <div class="carousel__plate" data-caption="The federated learning loop. Data never leaves each hospital; only model updates travel, are securely aggregated, and return." aria-hidden="true">${readDiagram('federated-loop')}</div>
    </div>
    <div class="carousel__bar">
      <div class="carousel__caption" aria-live="polite"></div>
      <div class="carousel__controls">
        <div class="carousel__dots">
          <button class="carousel__dot is-active" type="button" aria-label="Plate 1" aria-current="true">01</button>
          <button class="carousel__dot" type="button" aria-label="Plate 2" aria-current="false">02</button>
          <button class="carousel__dot" type="button" aria-label="Plate 3" aria-current="false">03</button>
        </div>
        <button class="carousel__arrow carousel__prev" type="button" aria-label="Previous plate">←</button>
        <button class="carousel__arrow carousel__next" type="button" aria-label="Next plate">→</button>
      </div>
    </div>
  </div>`;

  const readCards = [
    { num: '01', eyebrow: 'Data', title: 'Fix the inputs', body: 'Cleaning, missing-data mechanisms, EHR and time-series feature engineering, and the leakage discipline that keeps evaluations honest.', href: 'contents.html#unit-2', link: 'Unit II →' },
    { num: '02', eyebrow: 'Models', title: 'Learn the pattern', body: 'Supervised and unsupervised learning, CNNs and transfer learning, sequence models, and the metrics that survive rare diseases.', href: 'contents.html#unit-3', link: 'Unit III →' },
    { num: '03', eyebrow: 'Governance', title: 'Earn the trust', body: 'Bias and fairness audits, FDA/CE pathways for SaMD, explainability, federated learning, and the evidence that settles claims.', href: 'contents.html#unit-5', link: 'Unit V →' }
  ].map(c => `<article class="card">
      <div class="card__num">${c.num}</div>
      <div class="card__eyebrow">${esc(c.eyebrow)}</div>
      <h3>${esc(c.title)}</h3>
      <p>${esc(c.body)}</p>
      <a class="card__link" href="${c.href}">${esc(c.link)}</a>
    </article>`).join('');

  const paths = [
    { title: '14-week semester', body: 'Units I–II in weeks 1–5, Unit III in weeks 6–9, Unit IV in weeks 10–12, Unit V in weeks 13–14; labs alongside Units II–IV.', route: ['I', 'II', 'III', 'IV', 'V', 'LABS'] },
    { title: 'Self-study', body: 'Read in order. Units III and IV build directly on the feature-engineering and evaluation discipline of Units I–II.', route: ['I', 'II', 'III', 'IV', 'V'] },
    { title: 'Exam crash course', body: 'Read the key-terms sections of each chapter, then work Appendix D: attempt every model answer from memory before reading it.', route: ['KEY TERMS', 'QB-D', 'LABS'] }
  ].map(c => `<article class="card path-card">
      <div class="card__eyebrow">${esc(c.route.join(' · '))}</div>
      <h3>${esc(c.title)}</h3>
      <p>${esc(c.body)}</p>
      <div class="path-card__route">${c.route.map(r => `<span>${esc(r)}</span>`).join('')}</div>
      <a class="card__link" href="#units">Choose a unit</a>
    </article>`).join('');

  const figures = ['clinical-data-ecosystem', 'evaluation-quadrant', 'deployment-chain'].map(function (slug) {
    const meta = DIAGRAM_META[slug];
    const chapter = slug === 'clinical-data-ecosystem' ? 4 : slug === 'evaluation-quadrant' ? 19 : 33;
    return `<a class="figure-card" href="read/ch-${pad(chapter)}.html#fig-${slug}">
      ${readDiagram(slug)}
      <div class="figure-card__meta"><span>${meta.label}</span><span>Chapter ${chapter}</span></div>
      <h3>${esc(meta.title)}</h3>
      <p>${esc(meta.caption)}</p>
    </a>`;
  }).join('');

  const labItems = labs.labs.slice(0, 4).map(l => `<div class="lab-list__item">
      <b>${pad(l.n)}</b><span>${esc(l.title)}</span><span>${esc(l.chapters || 'capstone')}</span>
    </div>`).join('');

  const content = `<main id="main">
    <section class="hero">
      <div class="container hero__grid">
        <div>
          <div class="hero__eyebrow eyebrow">Healthcare AI · 23A133403c · A complete textbook · First edition · 2026</div>
          <h1><span class="line">Healthcare</span><span class="line"><em>AI</em></span></h1>
          <p class="hero__lede">From the clinical data ecosystem to the ethics that govern deployment. A structured, practical textbook in <strong>five units, thirty-six chapters</strong>, eight labs, and a full question bank with model answers.</p>
          <div class="hero__meta">
            <span>5 units</span><span>36 chapters</span><span>8 labs</span><span>${totalTerms} glossary entries</span>
          </div>
          <div class="hero__actions">
            <a class="btn btn--primary" href="read/ch-01.html">Start with Chapter 1 →</a>
            <a class="btn" href="contents.html">Open the contents</a>
          </div>
        </div>
        <aside class="dossier" aria-label="Course dossier">
          <div class="dossier__head"><span>Course dossier</span><b>v1.0</b></div>
          <div class="dossier__body">
            <div class="dossier__terminal">
              <div><span class="prompt">$</span> cat syllabus.txt</div>
              <div class="dim">────────────────────────────</div>
              ${units.map(u => `<div class="row"><span>${u.roman} · ${short[u.roman] || ''}</span><b>${String(u.chapters.length).padStart(2, '0')} ch</b></div>`).join('\n              ')}
              <div class="dim">────────────────────────────</div>
              <div class="row"><span>labs</span><b>${totalLabs}</b></div>
              <div class="row"><span>glossary</span><b>${totalTerms}</b></div>
              <div class="row"><span>progress</span><b><span data-read-count>0</span> / ${totalChapters}</b></div>
              <span class="bar" data-progress-total="${totalChapters}" role="progressbar" aria-label="Reading progress" aria-valuemin="0" aria-valuemax="100"><i></i></span>
            </div>
          </div>
          <div class="dossier__foot"><span><span class="dot">●</span> local progress</span><span>first edition / 2026</span></div>
        </aside>
      </div>
    </section>

    <section class="section section--tight" id="triage-section">
      <div class="container">
        <div class="section__head section__head--stack">
          <div class="fig-tag">01 · Triage drill</div>
          <h2>One case. Three moves.</h2>
          <p>Clinical AI is a decision discipline before it is a model. Read the case, pick a move, then compare your reasoning with the textbook.</p>
        </div>
        ${triage}
      </div>
    </section>

    <section class="section section--tight" id="carousel-section">
      <div class="container">
        <div class="section__head section__head--stack">
          <div class="fig-tag">02 · Three plates from the book</div>
          <h2>The shape of the problem.</h2>
        </div>
        ${carousel}
      </div>
    </section>

    <section class="section" id="preface">
      <div class="container preface-grid">
        <div>
          <div class="fig-tag">03 · Preface</div>
          <h2 style="font-size:clamp(34px,3.4vw,44px);margin-top:14px;overflow-wrap:break-word;">Predictions with consequences.</h2>
        </div>
        <div class="preface-copy">
          <p class="dropcap">${marked.parseInline(preface.split('\n\n')[0])}</p>
          <blockquote class="pullquote">“Data richness matters less than data joined to the right question.”<cite>Chapter 4 · The medical data ecosystem</cite></blockquote>
          <p>The book maps the field in five units: the foundations of AI in medicine and the decision systems it feeds; the preprocessing and feature engineering that decide most projects; the machine learning and deep learning architectures that dominate clinical analytics; the specialized applications at the bedside; and the ethics, regulation, and governance that decide whether any of it is allowed to touch a patient.</p>
          <div class="stat-strip">
            <div class="stat-strip__item"><div class="stat-strip__num">05</div><div class="stat-strip__label">Units</div></div>
            <div class="stat-strip__item"><div class="stat-strip__num">36</div><div class="stat-strip__label">Chapters</div></div>
            <div class="stat-strip__item"><div class="stat-strip__num">08</div><div class="stat-strip__label">Lab exercises</div></div>
            <div class="stat-strip__item"><div class="stat-strip__num">${totalTerms}</div><div class="stat-strip__label">Glossary entries</div></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--surface" id="reading-paths">
      <div class="container">
        <div class="section__head">
          <div>
            <div class="fig-tag">04 · Reading paths</div>
            <h2 style="margin-top:14px;">Read it your way.</h2>
          </div>
          <p>Three routes through the same book. Every route ends with the lab manual and the question bank.</p>
        </div>
        <div class="card-grid">${paths}</div>
      </div>
    </section>

    <section class="section" id="frontiers">
      <div class="container">
        <div class="section__head">
          <div>
            <div class="fig-tag">05 · Three frontiers</div>
            <h2 style="margin-top:14px;">Diagnose. Predict. Govern.</h2>
          </div>
          <p>The textbook is organized around three kinds of work. Each one has a different failure mode.</p>
        </div>
        <div class="card-grid">${readCards}</div>
      </div>
    </section>

    <section class="section section--surface" id="units">
      <div class="container">
        <div class="section__head">
          <div>
            <div class="fig-tag">06 · Contents</div>
            <h2 style="margin-top:14px;">Five units. Thirty-six chapters.</h2>
          </div>
          <p>Open a unit to see its chapters, filter the list, and jump straight into the reader. Your progress is stored locally.</p>
        </div>
        <div class="units">${unitRows}</div>
        <div class="units__foot">
          <span class="eyebrow">Each chapter ends with key terms and review questions.</span>
          <a class="btn btn--sm" href="contents.html">Full contents →</a>
        </div>
      </div>
    </section>

    <section class="section" id="figures">
      <div class="container">
        <div class="section__head">
          <div>
            <div class="fig-tag">07 · Selected figures</div>
            <h2 style="margin-top:14px;">Three figures, three arguments.</h2>
          </div>
          <p>Every figure is drawn from the chapter it belongs to. Click one to read the surrounding argument.</p>
        </div>
        <div class="figure-grid">${figures}</div>
      </div>
    </section>

    <section class="section section--dark" id="lab-program">
      <div class="container lab-spotlight">
        <div>
          <div class="lab-spotlight__num">${String(totalLabs).padStart(2, '0')}<small>lab exercises · appendix B</small></div>
        </div>
        <div>
          <div class="section__head section__head--stack" style="margin-bottom:20px;">
            <div class="fig-tag">08 · Lab program</div>
            <h2 style="font-size:clamp(40px,5vw,64px);color:#ece9dc;">Build the evidence.</h2>
            <p style="color:#b9b7ae;">Every lab ends with a written report. The datasets are public or synthetic; the ground rule is data-use compliance.</p>
          </div>
          <div class="lab-list">${labItems}</div>
          <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap;">
            <a class="btn btn--primary" href="labs.html">Open the lab manual →</a>
            <a class="btn" style="background:transparent;color:#ece9dc;border-color:#ece9dc;box-shadow:3px 3px 0 #6b8eff;" href="contents.html#unit-2">See the data chapters</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="colophon">
      <div class="container colophon">
        <div>
          <div class="fig-tag">09 · Colophon</div>
          <h2 style="font-size:clamp(40px,4.8vw,62px);margin-top:14px;">How to cite it.</h2>
        </div>
        <div>
          <div class="cite-block" id="citation">
            <strong>Healthcare AI (23A133403c):</strong> A Complete Textbook and Question Bank with Model Answers. First Edition, 2026. Dr. K. V. Subba Reddy Institute of Technology (Autonomous) — Dept. of CSE (AI &amp; ML). A complete textbook in five units, thirty-six chapters, and eight labs.
            <div class="cite-block__actions">
              <button class="btn btn--sm" type="button" data-copy="Healthcare AI (23A133403c): A Complete Textbook and Question Bank with Model Answers. First Edition, 2026.">Copy citation</button>
              <a class="btn btn--ghost btn--sm" href="contents.html">Open contents</a>
            </div>
          </div>
          <div class="colophon__notes" style="margin-top:22px;">
            <p>Typeset in <strong>VT323</strong> for display, <strong>Source Serif 4</strong> for reading, and <strong>JetBrains Mono</strong> for metadata and code. The interface uses a warm paper ground, blueprint blue, hard shadows, and a dotted grid.</p>
            <p>The design language is deliberately borrowed from <a href="https://aiengineeringfromscratch.com/" rel="noopener">AI Engineering from Scratch</a> (MIT): editorial structure, figure plates, numbered contents, and a local-first reading model. The textbook content is this book’s own.</p>
            <p>Progress, theme, and reading position are stored in <code>localStorage</code>. No account, no server, no telemetry.</p>
          </div>
        </div>
      </div>
    </section>

    <div class="marquee" aria-label="Who the book is for">
      <div class="marquee__label">Written for</div>
      <div class="marquee__track">
        <span class="marquee__item">B.Tech students</span><span class="marquee__item">Clinicians</span><span class="marquee__item">Health-informatics students</span><span class="marquee__item">ML engineers</span><span class="marquee__item">Clinical data scientists</span><span class="marquee__item">Researchers</span>
        <span class="marquee__item">B.Tech students</span><span class="marquee__item">Clinicians</span><span class="marquee__item">Health-informatics students</span><span class="marquee__item">ML engineers</span><span class="marquee__item">Clinical data scientists</span><span class="marquee__item">Researchers</span>
      </div>
    </div>
  </main>`;

  const unitModal = `<div class="modal" id="unitModal" role="dialog" aria-modal="true" aria-labelledby="unitModalTitle" aria-hidden="true">
    <div class="modal__backdrop"></div>
    <div class="modal__panel">
      <div class="modal__head">
        <div>
          <h2 id="unitModalTitle">Unit</h2>
          <p id="unitModalKicker"></p>
        </div>
        <button class="icon-btn modal__close" id="unitModalClose" type="button" aria-label="Close unit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>
        </button>
      </div>
      <div class="modal__body">
        <div class="modal__search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4.2-4.2"></path></svg>
          <input id="unitModalSearch" type="search" placeholder="Filter chapters…" aria-label="Filter chapters">
        </div>
        <div id="unitModalBody"></div>
        <div class="modal__foot">
          <span class="eyebrow">Progress is stored locally.</span>
          <a class="btn btn--sm" href="contents.html">Full contents →</a>
        </div>
      </div>
    </div>
  </div>`;

  const extraHead = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: 'Healthcare AI',
    alternateName: 'Healthcare AI (23A133403c)',
    bookEdition: 'First Edition',
    datePublished: '2026',
    numberOfPages: 0,
    description: 'A complete textbook on artificial intelligence in healthcare: five units, thirty-six chapters, eight labs, and a question bank with model answers.',
    genre: 'Health informatics'
  })}</script>`;

  return head({
    title: 'A Complete Textbook',
    description: 'Healthcare AI (23A133403c): from the clinical data ecosystem to the ethics that govern deployment. Five units, thirty-six chapters, eight labs, and a full question bank with model answers.',
    page: 'home',
    base: '',
    content,
    modal: unitModal,
    extraHead
  });
}

function readDiagram(slug, idSuffix) {
  const file = path.join(DIAGRAMS, slug + '.svg');
  if (!fs.existsSync(file)) return '<div class="diagram-placeholder">Diagram pending: ' + esc(slug) + '</div>';
  let svg = fs.readFileSync(file, 'utf8').trim();
  if (idSuffix) {
    // Namespaced second embed: rename every id/fragment reference so pages
    // that show the same figure twice keep unique IDs.
    svg = svg.replace(new RegExp('id="' + slug + '-', 'g'), 'id="' + slug + '-' + idSuffix + '-');
    svg = svg.replace(new RegExp('aria-labelledby="' + slug + '-', 'g'), 'aria-labelledby="' + slug + '-' + idSuffix + '-');
    svg = svg.replace(new RegExp('url\\(#' + slug + '-', 'g'), 'url(#' + slug + '-' + idSuffix + '-');
  }
  return svg;
}

function buildContents(units) {
  const total = units.reduce((n, u) => n + u.chapters.length, 0);
  const groups = units.map(function (u) {
    return `<section class="contents-unit" id="${u.id}">
      <div class="contents-unit__head">
        <h2>Unit ${u.roman} — ${esc(u.title)}</h2>
        <span>${u.chapters.length} chapters</span>
      </div>
      <ul class="contents-list">
        ${u.chapters.map(ch => `<li data-title="${esc((ch.title + ' ' + ch.n + ' ' + ch.slug).toLowerCase())}">
          <a href="read/${ch.slug}.html">
            <span class="n">${pad(ch.n)}</span>
            <span class="t">${esc(ch.title)}</span>
            <span class="u">${ch.minutes} min</span>
            <span class="read" data-chapter-status="${ch.slug}"></span>
          </a>
        </li>`).join('')}
      </ul>
    </section>`;
  }).join('');

  const content = `<main id="main">
    <div class="container">
      <header class="page-head">
        <div class="fig-tag">FIG_010 · Contents</div>
        <h1>Contents</h1>
        <p>Five units, thirty-six chapters, one argument: clinical prediction is a data problem, a modelling problem, and a governance problem at the same time.</p>
      </header>
      <div class="contents-layout">
        <aside class="contents-filter">
          <label class="eyebrow" for="contentsSearch">Filter</label>
          <input id="contentsSearch" type="search" placeholder="Chapter title or number…" autocomplete="off">
          <div class="contents-filter__count"><span id="contentsCount">${total}</span> chapters · <span data-read-count>0</span> read</div>
          <div style="margin-top:20px;">
            <a class="btn btn--sm btn--ghost" href="labs.html">Lab manual →</a>
          </div>
        </aside>
        <div id="contentsUnits">${groups}</div>
      </div>
    </div>
  </main>`;

  const extra = `<script>
  (function(){
    var input=document.getElementById('contentsSearch');
    var count=document.getElementById('contentsCount');
    if(!input) return;
    input.addEventListener('input',function(){
      var q=input.value.trim().toLowerCase(); var shown=0;
      document.querySelectorAll('#contentsUnits li[data-title]').forEach(function(li){
        var ok=!q||li.getAttribute('data-title').indexOf(q)!==-1;
        li.style.display=ok?'':'none'; if(ok) shown++;
      });
      document.querySelectorAll('.contents-unit').forEach(function(unit){
        var any=Array.prototype.some.call(unit.querySelectorAll('li[data-title]'),function(li){return li.style.display!=='none';});
        unit.style.display=any?'':'none';
      });
      if(count) count.textContent=String(shown);
    });
  })();
  </script>`;

  return head({
    title: 'Contents',
    description: 'Full table of contents for Healthcare AI: five units and thirty-six chapters.',
    page: 'contents',
    base: '',
    content,
    extraHead: extra
  });
}

function buildChapter(units, chapter, unit, prev, next) {
  const rendered = renderChapter(chapter.md, chapter);
  let body = rendered.body;

  // Inject figures at the end of chosen sections.
  const figMap = {
    1: [{ id: 's-1-2', slug: 'ai-ml-dl' }],
    3: [{ id: 's-3-2', slug: 'cdss-architecture' }],
    4: [{ id: 's-4-2', slug: 'clinical-data-ecosystem' }],
    19: [{ id: 's-19-3', slug: 'evaluation-quadrant' }],
    33: [{ id: 's-33-2', slug: 'deployment-chain' }],
    35: [{ id: 's-35-2', slug: 'federated-loop' }]
  };
  const figs = figMap[chapter.n] || [];
  figs.forEach(function (f) {
    const idx = body.indexOf('id="' + f.id + '"');
    if (idx === -1) return;
    // Find the end of this section.
    const nextIdx = body.indexOf('<section class="chapter-section"', idx + 10);
    const end = nextIdx === -1 ? body.length : nextIdx;
    let insertAt = body.lastIndexOf('</section>', end);
    if (insertAt === -1) insertAt = end;
    const figHtml = '\n' + figure(f.slug, {});
    body = body.slice(0, insertAt) + figHtml + body.slice(insertAt);
  });

  const toc = rendered.headings.map(function (h) {
    return `<li><a href="#${h.id}">${esc(h.text)}</a></li>`;
  }).join('');

  const nav = `<nav class="reader-nav" aria-label="Book navigation">
    <div class="reader-nav__label">The textbook</div>
    ${units.map(function (u) {
      return `<div class="reader-nav__unit">
        <a href="../contents.html#${u.id}">${u.roman} · ${esc(u.title)}<span>${u.chapters.length}</span></a>
        <ul class="reader-nav__chapters">
          ${u.chapters.map(function (c) {
            return `<li><a href="../read/${c.slug}.html" data-slug="${c.slug}" class="${c.slug === chapter.slug ? 'current' : ''}"${c.slug === chapter.slug ? ' aria-current="page"' : ''}>
              <span class="n">${pad(c.n)}</span><span>${esc(c.title)}</span><span class="check"></span>
            </a></li>`;
          }).join('')}
        </ul>
      </div>`;
    }).join('')}
    <div class="reader-nav__toc">
      <div class="reader-nav__label">Reference</div>
      <ul class="reader-nav__chapters">
        <li><a href="../glossary.html"><span class="n">A</span><span>Glossary</span><span></span></a></li>
        <li><a href="../labs.html"><span class="n">B</span><span>Lab manual</span><span></span></a></li>
        <li><a href="../reading.html"><span class="n">C</span><span>Further reading</span><span></span></a></li>
        <li><a href="../question-bank.html"><span class="n">D</span><span>Question bank</span><span></span></a></li>
      </ul>
    </div>
  </nav>`;

  const content = `<div class="reader-progress" aria-hidden="true"><i id="readerBar"></i></div>
  <div class="reader-shell">
    ${nav}
    <main class="chapter" id="main" data-chapter="${chapter.slug}">
      <header class="chapter-head">
        <div class="chapter-head__meta">
          <span><b>Unit ${unit.roman}</b></span><span>Chapter ${pad(chapter.n)}</span><span>${chapter.minutes} min read</span><span>${chapter.sections.length} sections</span>
        </div>
        <h1>${esc(chapter.title)}</h1>
        <p class="chapter-head__dek">${esc(chapter.summary)}</p>
        <div class="chapter-head__foot">
          <div class="chapter-head__stats"><span><b>${chapter.sections.length}</b> sections</span><span><b>${chapter.minutes}</b> min</span><span><b>Unit ${unit.roman}</b></span></div>
          <button class="btn btn--sm" type="button" data-read-toggle="${chapter.slug}" aria-pressed="false">Mark chapter read</button>
        </div>
      </header>
      <div class="chapter-body">
        ${rendered.intro}
        ${body}
      </div>
      <footer class="chapter-foot">
        <div class="chapter-foot__label">Continue</div>
        <div class="chapter-foot__cards">
          ${prev ? `<a class="chapter-foot__card" href="${prev.slug}.html" data-prev><small>← Previous</small><span>${esc(prev.title)}</span></a>` : `<a class="chapter-foot__card" href="../contents.html"><small>← Back</small><span>Contents</span></a>`}
          ${next ? `<a class="chapter-foot__card" href="${next.slug}.html" data-next><small>Next →</small><span>${esc(next.title)}</span></a>` : `<a class="chapter-foot__card" href="../question-bank.html"><small>Next →</small><span>Question bank</span></a>`}
        </div>
      </footer>
    </main>
    <aside class="chapter-rail">
      <div class="chapter-rail__progress">
        <strong data-rail-count>0%</strong>
        <span>Scroll position</span>
      </div>
      <div class="chapter-rail__label">On this page</div>
      <ul class="chapter-rail__toc">${toc}</ul>
      <div class="chapter-rail__label">Navigate</div>
      <div class="chapter-rail__nav">
        ${prev ? `<a href="${prev.slug}.html" data-prev><small>← Previous</small>${esc(prev.title)}</a>` : ''}
        ${next ? `<a href="${next.slug}.html" data-next><small>Next →</small>${esc(next.title)}</a>` : ''}
        <a href="../contents.html"><small>Reference</small>Full contents</a>
      </div>
    </aside>
  </div>`;

  return head({
    title: 'Chapter ' + chapter.n + '. ' + chapter.title,
    description: chapter.summary,
    page: 'chapter',
    base: '../',
    content,
    bodyAttrs: ' data-chapter="' + chapter.slug + '"'
  });
}

function buildGlossary(glossary) {
  const total = glossary.reduce((n, g) => n + g.entries.length, 0);
  const side = glossary.map(g => `<a href="#${g.id}">${g.num} · ${esc(g.title)}</a>`).join('');
  const groups = glossary.map(function (g) {
    return `<section class="glossary-group" id="${g.id}">
      <h2>${g.num} · ${esc(g.title)}</h2>
      <dl>
        ${g.entries.map(function (e) {
          return `<div class="glossary-entry" id="${e.id}">
            <dt>${esc(e.term)}</dt>
            <dd>${marked.parseInline(e.def)}</dd>
          </div>`;
        }).join('')}
      </dl>
    </section>`;
  }).join('');
  const content = `<main id="main">
    <div class="container">
      <header class="page-head">
        <div class="fig-tag">Appendix A · Reference</div>
        <h1>Glossary</h1>
        <p>${total} entries grouped by theme. Chapter references point back to the argument where the term is defined.</p>
      </header>
      <div class="glossary-layout">
        <aside class="glossary-side">${side}</aside>
        <div>${groups}</div>
      </div>
    </div>
  </main>`;
  return head({ title: 'Glossary', description: 'Glossary of key terms for Healthcare AI.', page: 'glossary', base: '', content });
}

function buildLabs(labsData) {
  const cards = labsData.labs.map(function (lab) {
    const body = marked.parse(lab.md, { gfm: true });
    return `<details class="lab-card" id="${lab.id}">
      <summary>
        <span class="lab-card__num">${pad(lab.n)}</span>
        <span class="lab-card__title">${esc(lab.title)}<small>${lab.chapters ? 'Chapters ' + esc(lab.chapters) : 'Capstone'}</small></span>
        <span class="lab-card__toggle" aria-hidden="true">+</span>
      </summary>
      <div class="lab-card__body">${body}</div>
    </details>`;
  }).join('');
  const datasets = marked.parse(labsData.datasetsMd, { gfm: true }).replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  const content = `<main id="main">
    <div class="container">
      <header class="page-head">
        <div class="fig-tag">Appendix B · Practice</div>
        <h1>Lab manual</h1>
        <p>Eight exercises that mirror the chapters. Every lab ends with a written report. Use only de-identified, synthetic, or licensed datasets, and follow each dataset's data-use agreement.</p>
      </header>
      <div class="labs-layout">
        ${cards}
        <h2 class="datasets-title">Datasets</h2>
        ${datasets}
      </div>
    </div>
  </main>`;
  return head({ title: 'Lab manual', description: 'Eight lab exercises and public datasets for Healthcare AI.', page: 'labs', base: '', content });
}

const APPENDIX_DEK = {
  C: 'Primary sources and further reading, arranged to map to the chapters they support.',
  D: 'The official question bank by unit and tier — 2, 3, 5, and 10 marks — every question with a full model answer.'
};

function buildAppendixPage(appendix, pageName) {
  const rendered = renderChapter(appendix.md, {});
  const toc = rendered.headings.map(h => `<li><a href="#${h.id}">${esc(h.text)}</a></li>`).join('');
  const content = `<main id="main">
    <div class="container">
      <header class="page-head">
        <div class="fig-tag">Appendix ${appendix.letter} · Reference</div>
        <h1>${esc(appendix.title)}</h1>
        <p>${esc(APPENDIX_DEK[appendix.letter] || 'Reference material for the textbook.')}</p>
      </header>
      <div class="appendix-layout">
        <div class="appendix-body">
          <div class="chapter-body">
            ${rendered.intro}
            ${rendered.body}
          </div>
        </div>
        <aside class="chapter-rail">
          <div class="chapter-rail__label">On this page</div>
          <ul class="chapter-rail__toc">${toc}</ul>
        </aside>
      </div>
    </div>
  </main>`;
  return head({ title: appendix.title, description: appendix.title + ' — Healthcare AI.', page: pageName || 'reading', base: '', content });
}

/* ------------------------------------------------------------------ */
/* Search index                                                         */
/* ------------------------------------------------------------------ */

function buildSearch(units, glossary, labs, appendices) {
  const entries = [];
  entries.push({ type: 'page', title: 'Contents', kicker: 'All units and chapters', url: 'contents.html', text: 'Full table of contents' });
  entries.push({ type: 'page', title: 'Glossary', kicker: 'Appendix A', url: 'glossary.html', text: 'Key terms and definitions' });
  entries.push({ type: 'page', title: 'Lab manual', kicker: 'Appendix B', url: 'labs.html', text: 'Eight lab exercises and datasets' });
  entries.push({ type: 'page', title: 'Further reading', kicker: 'Appendix C', url: 'reading.html', text: 'Reference list' });
  entries.push({ type: 'page', title: 'Question bank', kicker: 'Appendix D', url: 'question-bank.html', text: 'Exam practice questions' });

  units.forEach(function (u) {
    u.chapters.forEach(function (ch) {
      entries.push({
        type: 'chapter', title: ch.title,
        kicker: 'Unit ' + u.roman + ' · Chapter ' + pad(ch.n),
        url: 'read/' + ch.slug + '.html',
        text: ch.summary + ' ' + ch.sections.join(' ')
      });
      let sectionCounter = 0;
      ch.sections.forEach(function (s) {
        sectionCounter += 1;
        const num = s.match(/^(\d+\.\d+)\s+/);
        const id = num ? 's-' + num[1].replace(/\./g, '-') : 's-' + slugify(s);
        entries.push({
          type: 'section', title: s,
          kicker: 'Chapter ' + pad(ch.n) + ' · ' + ch.title,
          url: 'read/' + ch.slug + '.html#' + id,
          text: ch.sectionTexts ? (ch.sectionTexts[sectionCounter - 1] || '') : ''
        });
      });
    });
  });
  glossary.forEach(function (g) {
    g.entries.forEach(function (e) {
      entries.push({
        type: 'glossary', title: e.term,
        kicker: g.num + ' · ' + g.title,
        url: 'glossary.html#' + e.id,
        text: e.def
      });
    });
  });
  labs.labs.forEach(function (l) {
    entries.push({
      type: 'lab', title: 'Lab ' + l.n + '. ' + l.title,
      kicker: l.chapters ? 'Chapters ' + l.chapters : 'Capstone',
      url: 'labs.html#' + l.id,
      text: stripHtml(marked.parse(l.md)).slice(0, 220)
    });
  });
  appendices.forEach(function (a) {
    if (a.letter === 'A' || a.letter === 'B') return;
    entries.push({
      type: 'page', title: 'Appendix ' + a.letter + '. ' + a.title,
      kicker: 'Reference',
      url: (a.letter === 'C' ? 'reading' : 'question-bank') + '.html',
      text: ''
    });
  });
  return 'window.HEALTHAI_SEARCH = ' + JSON.stringify(entries) + ';\n';
}

function buildUnitData(units) {
  return 'window.HEALTHAI_UNITS = ' + JSON.stringify(units.map(function (u) {
    return {
      id: u.id, roman: u.roman, title: u.title, focus: u.focus,
      chapters: u.chapters.map(function (c) { return { n: c.n, slug: c.slug, title: c.title }; })
    };
  })) + ';\n';
}

/* ------------------------------------------------------------------ */
/* Main                                                                 */
/* ------------------------------------------------------------------ */

function main() {
  ensureDir(path.join(OUT, 'read'));
  ensureDir(path.join(OUT, 'assets', 'diagrams'));

  const units = parseUnits();
  const glossary = parseGlossary();
  const labs = parseLabs();
  const appendices = parseAppendices();
  const totalChapters = units.reduce((n, u) => n + u.chapters.length, 0);

  fs.writeFileSync(path.join(OUT, 'index.html'), buildLanding(units, glossary, labs));
  fs.writeFileSync(path.join(OUT, 'contents.html'), buildContents(units));
  fs.writeFileSync(path.join(OUT, 'glossary.html'), buildGlossary(glossary));
  fs.writeFileSync(path.join(OUT, 'labs.html'), buildLabs(labs));
  fs.writeFileSync(path.join(OUT, 'reading.html'), buildAppendixPage(appendices.find(a => a.letter === 'C'), 'reading'));
  fs.writeFileSync(path.join(OUT, 'question-bank.html'), buildAppendixPage(appendices.find(a => a.letter === 'D'), 'question-bank'));

  units.forEach(function (u) {
    u.chapters.forEach(function (ch, i) {
      const prev = i > 0 ? u.chapters[i - 1] : (units[units.indexOf(u) - 1] || { chapters: [] }).chapters.slice(-1)[0];
      const next = i < u.chapters.length - 1 ? u.chapters[i + 1] : (units[units.indexOf(u) + 1] || { chapters: [] }).chapters[0];
      fs.writeFileSync(path.join(OUT, 'read', ch.slug + '.html'), buildChapter(units, ch, u, prev, next));
    });
  });

  fs.writeFileSync(path.join(OUT, 'assets', 'search-index.js'), buildUnitData(units) + '\n' + buildSearch(units, glossary, labs, appendices));
  fs.copyFileSync(path.join(ROOT, 'src', 'styles.css'), path.join(OUT, 'assets', 'styles.css'));
  fs.copyFileSync(path.join(ROOT, 'src', 'app.js'), path.join(OUT, 'assets', 'app.js'));

  console.log('Built ' + totalChapters + ' chapters, ' + glossary.reduce((n, g) => n + g.entries.length, 0) + ' glossary entries, ' + labs.labs.length + ' labs.');
}

main();
