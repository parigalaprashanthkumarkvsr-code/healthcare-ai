#!/usr/bin/env python3
"""Generate the Healthcare AI textbook figures.

Each figure is emitted twice:
  - assets/diagrams/<slug>.svg      (embedded by build.js)
  - figures/<slug>.html             (standalone editorial page, self-check target)

Design: aieng-blueprint profile — warm paper, blueprint blue, VT323 display,
Source Serif 4 names, JetBrains Mono metadata, 1px rules, hard geometry.
SVGs use CSS custom properties so light/dark themes flow through.
"""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SVG_DIR = ROOT / 'assets' / 'diagrams'
PAGE_DIR = ROOT / 'figures'

FONTS_LINK = ('<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500'
              '&amp;family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400'
              '&amp;family=VT323&display=swap" rel="stylesheet">')

VARS = """
      :root{--dg-paper:#fafaf5;--dg-surface:#f3f1e8;--dg-ink:#1a1a1a;--dg-soft:#4a4a4a;--dg-mute:#6f6f68;--dg-rule:#d9d6c8;--dg-accent:#3553ff;--dg-tint:rgba(53,83,255,0.10);}
      :root[data-theme="dark"]{--dg-paper:#0a0d1a;--dg-surface:#131830;--dg-ink:#e8e6dc;--dg-soft:#c9c7bd;--dg-mute:#8f8d86;--dg-rule:#2b3252;--dg-accent:#6b8eff;--dg-tint:rgba(107,142,255,0.18);}
      @media (prefers-color-scheme: dark){:root:not([data-theme="light"]):not([data-theme="dark"]){--dg-paper:#0a0d1a;--dg-surface:#131830;--dg-ink:#e8e6dc;--dg-soft:#c9c7bd;--dg-mute:#8f8d86;--dg-rule:#2b3252;--dg-accent:#6b8eff;--dg-tint:rgba(107,142,255,0.18);}}
"""

STYLE = (
    VARS
    + """
      .dg-nm{font-family:'Source Serif 4',Georgia,serif;font-weight:600;}
      .dg-it{font-family:'Source Serif 4',Georgia,serif;font-style:italic;}
      .dg-mono{font-family:'JetBrains Mono',ui-monospace,monospace;}
    """
)

_slug = ''  # set before each figure is built; arrow() references this figure's markers


def svg_doc(slug, w, h, title, desc, body):
    """Wrap diagram body in the accessible SVG shell."""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-labelledby="{slug}-title {slug}-desc">
  <title id="{slug}-title">{title}</title>
  <desc id="{slug}-desc">{desc}</desc>
  <style>{STYLE}</style>
  <defs>
    <marker id="{slug}-arw" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--dg-mute)"/></marker>
    <marker id="{slug}-acc" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--dg-accent)"/></marker>
  </defs>
  <rect width="{w}" height="{h}" fill="var(--dg-paper)"/>
{body}
</svg>
'''


def node(x, y, w, h, name, sub, accent=False, sub2=None):
    fill = 'var(--dg-tint)' if accent else 'var(--dg-surface)'
    stroke = 'var(--dg-accent)' if accent else 'var(--dg-ink)'
    cx = x + w / 2
    ny = y + 30
    sy = y + 54
    out = (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="{fill}" stroke="{stroke}" stroke-width="1.2"/>\n'
           f'<text class="dg-nm" x="{cx}" y="{ny}" font-size="16" text-anchor="middle" fill="var(--dg-ink)">{name}</text>\n'
           f'<text class="dg-mono" x="{cx}" y="{sy}" font-size="10" letter-spacing="0.04em" text-anchor="middle" fill="var(--dg-mute)">{sub}</text>\n')
    if sub2:
        out += f'<text class="dg-mono" x="{cx}" y="{sy + 16}" font-size="10" letter-spacing="0.04em" text-anchor="middle" fill="var(--dg-mute)">{sub2}</text>\n'
    return out


def arrow(d, label=None, lx=None, ly=None, accent=False, dashed=False):
    marker = f'{_slug}-acc' if accent else f'{_slug}-arw'
    dash = ' stroke-dasharray="5,4"' if dashed else ''
    stroke = 'var(--dg-accent)' if accent else 'var(--dg-mute)'
    out = f'<path d="{d}" fill="none" stroke="{stroke}" stroke-width="1.5"{dash} marker-end="url(#{marker})"/>\n'
    if label:
        # Opaque mask behind the label, with a clear gap from the stroke.
        est = 6.6 * len(label)
        mx = lx - est / 2 - 8
        out += (f'<rect x="{mx:.0f}" y="{ly - 10:.0f}" width="{est + 16:.0f}" height="14" fill="var(--dg-paper)"/>\n'
                f'<text class="dg-mono" x="{lx}" y="{ly + 1}" font-size="10" letter-spacing="0.06em" text-anchor="middle" fill="var(--dg-soft)">{label}</text>\n')
    return out


def chip(x, y, w, h, name, sub):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="var(--dg-surface)" stroke="var(--dg-rule)" stroke-width="1"/>\n'
            f'<text class="dg-nm" x="{x + w / 2}" y="{y + 26}" font-size="14" text-anchor="middle" fill="var(--dg-ink)">{name}</text>\n'
            f'<text class="dg-mono" x="{x + w / 2}" y="{y + 46}" font-size="10" text-anchor="middle" fill="var(--dg-mute)">{sub}</text>\n')


def legend(items, y, x0=40):
    x = x0
    out = '<rect x="0" y="0" width="0" height="0"/>'  # no-op keeps ordering stable
    parts = []
    for kind, label in items:
        if kind == 'chip':
            parts.append(f'<rect x="{x}" y="{y - 10}" width="18" height="12" rx="3" fill="var(--dg-surface)" stroke="var(--dg-rule)"/>')
        elif kind == 'band':
            parts.append(f'<rect x="{x}" y="{y - 10}" width="18" height="12" rx="3" fill="var(--dg-surface)" stroke="var(--dg-ink)"/>')
        elif kind == 'accent':
            parts.append(f'<rect x="{x}" y="{y - 10}" width="18" height="12" rx="3" fill="var(--dg-tint)" stroke="var(--dg-accent)"/>')
        parts.append(f'<text class="dg-mono" x="{x + 26}" y="{y}" font-size="10" fill="var(--dg-mute)">{label}</text>')
        x += 26 + 6.6 * len(label) + 40
    return '\n'.join(parts) + '\n'


# ---------------------------------------------------------------- FIG_001
def fig_ecosystem():
    w, h = 1120, 660
    chips = [('EHR', 'FHIR resources'), ('IMAGING', 'DICOM · PACS'), ('SIGNALS', 'ECG · EEG · PPG'),
             ('GENOMICS', 'FASTQ → VCF'), ('NOTES', 'free text · NLP')]
    b = []
    b.append('<text class="dg-mono" x="40" y="58" font-size="10" letter-spacing="0.14em" fill="var(--dg-accent)">01 · SOURCES — WHAT CLINICAL CARE GENERATES</text>')
    for i, (n, s) in enumerate(chips):
        b.append(chip(40 + i * 208, 70, 188, 60, n, s))
    b.append(arrow('M540 138 V204', 'standards apply', 640, 176))
    b.append('<rect x="40" y="212" width="1020" height="64" rx="6" fill="var(--dg-surface)" stroke="var(--dg-ink)" stroke-width="1.2"/>')
    b.append('<text class="dg-nm" x="64" y="240" font-size="16" fill="var(--dg-ink)">02 · STANDARDS &amp; TERMINOLOGY</text>')
    b.append('<text class="dg-mono" x="64" y="262" font-size="11" fill="var(--dg-mute)">HL7 v2 · FHIR · DICOM · ICD · SNOMED CT · LOINC · RxNorm</text>')
    b.append(arrow('M540 284 V328', 'join on patient identifier', 660, 312))
    b.append('<rect x="40" y="336" width="1020" height="64" rx="6" fill="var(--dg-tint)" stroke="var(--dg-accent)" stroke-width="1.2"/>')
    b.append('<text class="dg-nm" x="64" y="364" font-size="16" fill="var(--dg-ink)">03 · INFRASTRUCTURE</text>')
    b.append('<text class="dg-mono" x="64" y="386" font-size="11" fill="var(--dg-mute)">warehouse / lake · de-identification · access governance</text>')
    b.append(arrow('M540 408 V456'))
    b.append('<rect x="40" y="464" width="1020" height="64" rx="6" fill="var(--dg-surface)" stroke="var(--dg-ink)" stroke-width="1.2"/>')
    b.append('<text class="dg-nm" x="64" y="492" font-size="16" fill="var(--dg-ink)">04 · CONSUMERS</text>')
    b.append('<text class="dg-mono" x="64" y="514" font-size="11" fill="var(--dg-mute)">CDSS at the bedside · ML training · population dashboards</text>')
    b.append('<text class="dg-it" x="40" y="576" font-size="14" fill="var(--dg-soft)">Every movement of the joined data is a compliance decision — HIPAA and GDPR govern each arrow.</text>')
    b.append(legend([('chip', 'data source'), ('band', 'shared layer'), ('accent', 'governed boundary')], 620))
    return svg_doc('clinical-data-ecosystem', w, h,
                   'The clinical data ecosystem',
                   'Clinical data sources flow through shared standards and governed infrastructure into decision support and machine learning.',
                   '\n'.join(b))


# ---------------------------------------------------------------- FIG_002
def fig_nested():
    w, h = 1120, 600
    b = []
    b.append('<rect x="40" y="90" width="1040" height="440" rx="8" fill="var(--dg-surface)" stroke="var(--dg-ink)" stroke-width="1.5"/>')
    b.append('<text class="dg-nm" x="70" y="124" font-size="18" fill="var(--dg-ink)">ARTIFICIAL INTELLIGENCE</text>')
    b.append('<text class="dg-mono" x="70" y="146" font-size="11" fill="var(--dg-mute)">the whole umbrella · includes hand-coded rules (MYCIN, 1970s)</text>')
    b.append('<rect x="120" y="176" width="840" height="310" rx="8" fill="var(--dg-paper)" stroke="var(--dg-ink)" stroke-width="1.2"/>')
    b.append('<text class="dg-nm" x="150" y="210" font-size="17" fill="var(--dg-ink)">MACHINE LEARNING</text>')
    b.append('<text class="dg-mono" x="150" y="232" font-size="11" fill="var(--dg-mute)">learns patterns from data · logistic regression · gradient boosting · survival models</text>')
    b.append('<rect x="280" y="278" width="560" height="170" rx="8" fill="var(--dg-tint)" stroke="var(--dg-accent)" stroke-width="1.5"/>')
    b.append('<text class="dg-nm" x="310" y="312" font-size="17" fill="var(--dg-ink)">DEEP LEARNING</text>')
    b.append('<text class="dg-mono" x="310" y="334" font-size="11" fill="var(--dg-mute)">learns representations from raw pixels · signals · text</text>')
    b.append(chip(310, 358, 150, 56, 'CNN', 'imaging'))
    b.append(chip(485, 358, 150, 56, 'LSTM', 'trajectories'))
    b.append(chip(660, 358, 150, 56, 'LLM', 'notes · genomics'))
    b.append('<text class="dg-it" x="40" y="572" font-size="14" fill="var(--dg-soft)">Nested, not interchangeable — each family answers a different question with different data requirements.</text>')
    return svg_doc('ai-ml-dl', w, h,
                   'AI, ML, and deep learning, nested',
                   'Deep learning sits inside machine learning, which sits inside the broader field of artificial intelligence.',
                   '\n'.join(b))


# ---------------------------------------------------------------- FIG_003
def fig_cdss():
    w, h = 1200, 560
    b = []
    b.append(node(50, 180, 200, 110, 'PATIENT DATA', 'EHR · labs · images', sub2='via HL7 / FHIR'))
    b.append(node(390, 180, 240, 110, 'INFERENCE ENGINE', 'rules · statistics · ML model', accent=True))
    b.append(node(730, 180, 190, 110, 'INTERFACE', 'alerts · order sets', sub2='dashboards'))
    b.append(node(970, 180, 180, 110, 'CLINICIAN', 'decision · accountability'))
    b.append(node(390, 400, 240, 100, 'KNOWLEDGE BASE', 'guidelines · drug DB', sub2='learned parameters'))
    b.append(arrow('M250 235 H378', 'patient-specific', 314, 219))
    b.append(arrow('M630 235 H718', 'score / advice', 674, 219))
    b.append(arrow('M920 235 H958', 'five rights', 939, 219))
    b.append(arrow('M470 400 V298', 'grounding', 424, 352))
    b.append(arrow('M1060 290 V370 H518 V302', 'override · audit', 800, 370, dashed=True))
    b.append('<text class="dg-it" x="50" y="532" font-size="14" fill="var(--dg-soft)">The five rights decide where the advice lands — most CDSS failures are interface failures, not accuracy failures.</text>')
    return svg_doc('cdss-architecture', w, h,
                   'CDSS architecture with an AI engine',
                   'Patient data and a knowledge base feed an inference engine whose advice reaches the clinician through the interface layer.',
                   '\n'.join(b))


# ---------------------------------------------------------------- FIG_004
def fig_quadrant():
    w, h = 1120, 680
    b = []
    # Axes
    b.append('<path d="M120 560 H1032" stroke="var(--dg-mute)" stroke-width="1.5" marker-end="url(#evaluation-quadrant-arw)"/>')
    b.append('<path d="M120 560 V108" stroke="var(--dg-mute)" stroke-width="1.5" marker-end="url(#evaluation-quadrant-arw)"/>')
    b.append('<text class="dg-mono" x="580" y="600" font-size="11" letter-spacing="0.08em" text-anchor="middle" fill="var(--dg-soft)">DISEASE PREVALENCE — COMMON → RARE</text>')
    b.append('<text class="dg-mono" x="120" y="84" font-size="11" letter-spacing="0.08em" fill="var(--dg-soft)">COST OF A MISS (FALSE NEGATIVE) — LOW → HIGH</text>')
    # Grid
    b.append('<path d="M580 120 V560" stroke="var(--dg-rule)" stroke-width="1"/>')
    b.append('<path d="M140 340 H1040" stroke="var(--dg-rule)" stroke-width="1"/>')

    def cell(x, y, title, l1, l2, accent=False):
        fill = 'var(--dg-tint)' if accent else 'var(--dg-surface)'
        stroke = 'var(--dg-accent)' if accent else 'var(--dg-rule)'
        return (f'<rect x="{x}" y="{y}" width="420" height="190" rx="6" fill="{fill}" stroke="{stroke}" stroke-width="1.2"/>\n'
                f'<text class="dg-nm" x="{x + 24}" y="{y + 44}" font-size="17" fill="var(--dg-ink)">{title}</text>\n'
                f'<text class="dg-mono" x="{x + 24}" y="{y + 78}" font-size="11" fill="var(--dg-soft)">{l1}</text>\n'
                f'<text class="dg-mono" x="{x + 24}" y="{y + 100}" font-size="11" fill="var(--dg-soft)">{l2}</text>\n')

    b.append(cell(140, 120, 'Catch it — do not miss', 'optimize: sensitivity', 'at a stated specificity floor'))
    b.append(cell(600, 120, 'Rare + cannot miss', 'optimize: sensitivity + AUPRC', 'report absolute numbers', accent=True))
    b.append(cell(140, 350, 'Rule out safely', 'optimize: specificity · NPV', 'protect the healthy'))
    b.append(cell(600, 350, 'Rare + costly follow-up', 'optimize: AUPRC · precision@k', 'the base-rate trap lives here'))
    b.append('<text class="dg-mono" x="120" y="640" font-size="11" fill="var(--dg-soft)">ALWAYS ADD: calibration curves · per-subgroup breakdowns · the confusion matrix at the chosen operating point.</text>')
    return svg_doc('evaluation-quadrant', w, h,
                   'Choosing metrics by prevalence and cost',
                   'The right evaluation metric depends on how rare the disease is and which error the clinic can afford.',
                   '\n'.join(b))


# ---------------------------------------------------------------- FIG_005
def fig_federated():
    w, h = 1120, 640
    b = []
    b.append(node(460, 60, 200, 84, 'DISTRIBUTE', 'server → global model'))
    b.append(node(800, 250, 200, 84, 'TRAIN LOCALLY', 'each hospital', sub2='data never moves'))
    b.append(node(640, 440, 200, 84, 'SEND UPDATES', 'weights only', sub2='no records'))
    b.append(node(280, 440, 200, 84, 'AGGREGATE', 'secure sum of updates', accent=True))
    b.append(node(120, 250, 200, 84, 'NEW GLOBAL', 'weighted average', sub2='FedAvg'))
    b.append(arrow('M660 102 H892 A8 8 0 0 1 900 110 V242'))
    b.append(arrow('M900 334 V378 A8 8 0 0 1 892 386 H748 A8 8 0 0 0 740 394 V432'))
    b.append(arrow('M640 482 H488'))
    b.append(arrow('M280 482 H228 A8 8 0 0 1 220 474 V342'))
    b.append(arrow('M220 250 V110 A8 8 0 0 1 228 102 H452'))
    b.append('<text class="dg-it" x="560" y="296" font-size="15" text-anchor="middle" fill="var(--dg-accent)">patient data never leaves the site —</text>')
    b.append('<text class="dg-it" x="560" y="320" font-size="15" text-anchor="middle" fill="var(--dg-accent)">only model updates travel.</text>')
    b.append('<text class="dg-mono" x="560" y="580" font-size="10" letter-spacing="0.06em" text-anchor="middle" fill="var(--dg-mute)">STANDING CAVEATS: NON-IID SITES · GRADIENT-INVERSION ATTACKS · DIFFERENTIAL PRIVACY BUDGET ε</text>')
    return svg_doc('federated-loop', w, h,
                   'The federated learning loop',
                   'Hospitals train locally and share only model updates, which are securely aggregated into a new global model each round.',
                   '\n'.join(b))


# ---------------------------------------------------------------- FIG_006
def fig_deployment():
    w, h = 1200, 520
    stages = [
        ('01', 'LOCAL VALIDATION', "this hospital's data", 'per-subgroup metrics'),
        ('02', 'SHADOW MODE', 'silent parallel run', 'compare vs outcomes'),
        ('03', 'STAGED ROLLOUT', 'unit → service → site', 'rollback plan'),
        ('04', 'MONITORED OPERATION', 'drift · equity · incidents', 'model card live'),
        ('05', 'RETIREMENT', 'committee decision', 'replaced or retired'),
    ]
    b = []
    for i, (num, name, s1, s2) in enumerate(stages):
        x = 40 + i * 224
        accent = (num == '04')
        fill = 'var(--dg-tint)' if accent else 'var(--dg-surface)'
        stroke = 'var(--dg-accent)' if accent else 'var(--dg-ink)'
        b.append(f'<rect x="{x}" y="110" width="188" height="140" rx="6" fill="{fill}" stroke="{stroke}" stroke-width="1.2"/>')
        b.append(f'<text class="dg-mono" x="{x + 20}" y="140" font-size="10" letter-spacing="0.14em" fill="var(--dg-accent)">{num}</text>')
        b.append(f'<text class="dg-nm" x="{x + 20}" y="170" font-size="15" fill="var(--dg-ink)">{name}</text>')
        b.append(f'<text class="dg-mono" x="{x + 20}" y="198" font-size="10" fill="var(--dg-mute)">{s1}</text>')
        b.append(f'<text class="dg-mono" x="{x + 20}" y="216" font-size="10" fill="var(--dg-mute)">{s2}</text>')
        if i < 4:
            b.append(arrow(f'M{x + 188 + 4} 180 H{x + 224 - 12}'))
        b.append(f'<path d="M{x + 94} 250 V322" stroke="var(--dg-rule)" stroke-width="1" stroke-dasharray="4,3"/>')
    b.append('<rect x="40" y="330" width="1084" height="72" rx="6" fill="var(--dg-tint)" stroke="var(--dg-accent)" stroke-width="1.2"/>')
    b.append('<text class="dg-nm" x="64" y="360" font-size="16" fill="var(--dg-ink)">GOVERNANCE — CONTINUOUS</text>')
    b.append('<text class="dg-mono" x="64" y="384" font-size="11" fill="var(--dg-mute)">AI committee · thresholds · versioning · incident review · model cards</text>')
    b.append('<text class="dg-it" x="40" y="456" font-size="14" fill="var(--dg-soft)">Trust is an operational property: earned by validation, preserved by monitoring, governed by people whose names are on the decision.</text>')
    return svg_doc('deployment-chain', w, h,
                   'The responsible deployment chain',
                   'A model moves through validation, shadow mode, and staged rollout into monitored operation, under continuous governance.',
                   '\n'.join(b))


# ---------------------------------------------------------------- pages
FIGS = [
    ('clinical-data-ecosystem', 'FIG_001', fig_ecosystem,
     'Sources, standards, and infrastructure feed every clinical AI application — and privacy governs every movement.'),
    ('ai-ml-dl', 'FIG_002', fig_nested,
     'The three families are nested, not interchangeable: rules, learning from data, and learning representations.'),
    ('cdss-architecture', 'FIG_003', fig_cdss,
     'Patient data and a knowledge base meet in an inference engine — rule-based or learned — and surface through the interface.'),
    ('evaluation-quadrant', 'FIG_004', fig_quadrant,
     'What to optimize depends on how rare the disease is and which error the clinic can afford.'),
    ('federated-loop', 'FIG_005', fig_federated,
     'Data never leaves each hospital; only model updates travel, are securely aggregated, and return.'),
    ('deployment-chain', 'FIG_006', fig_deployment,
     'Local validation → shadow mode → staged rollout → monitored operation, with governance at every link.'),
]

PAGE_TMPL = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>@@LABEL@@ · @@TITLE@@ — Healthcare AI</title>
@@FONTS@@
<style>
  body{margin:0;background:var(--dg-paper);color:var(--dg-ink);}
  .wrap{max-width:1240px;margin:0 auto;padding:48px 24px;}
  .eyebrow{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--dg-accent);}
  h1{font-family:'VT323',monospace;font-weight:400;font-size:clamp(40px,5vw,58px);line-height:1.05;margin:10px 0 8px;}
  .cap{font-family:'Source Serif 4',Georgia,serif;font-size:16px;color:var(--dg-mute);max-width:62ch;margin:0;}
  .plate{border:1px solid var(--dg-rule);margin-top:30px;background:var(--dg-paper);overflow-x:auto;}
  .plate svg{display:block;width:100%;min-width:@@VW@@px;height:auto;}
  .foot{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--dg-mute);margin-top:18px;}
</style>
</head>
<body>
<div class="wrap">
  <div class="eyebrow">Healthcare AI · @@LABEL@@</div>
  <h1>@@TITLE@@</h1>
  <p class="cap">@@CAPTION@@</p>
  <div class="plate">
@@SVG@@
  </div>
  <div class="foot">Healthcare AI (23A133403c) · First edition · Chapter @@CHAPTER@@</div>
</div>
</body>
</html>
'''


def main():
    SVG_DIR.mkdir(parents=True, exist_ok=True)
    PAGE_DIR.mkdir(parents=True, exist_ok=True)
    for slug, label, fn, caption in FIGS:
        global _slug
        _slug = slug
        svg = fn()
        w, h = (int(v) for v in svg.split('viewBox="0 0 ')[1].split('"')[0].split(' ')[:2])
        chapter = {'clinical-data-ecosystem': 4, 'ai-ml-dl': 1, 'cdss-architecture': 3,
                   'evaluation-quadrant': 19, 'federated-loop': 35, 'deployment-chain': 33}[slug]
        (SVG_DIR / f'{slug}.svg').write_text(svg)
        title = svg.split('<title id')[1].split('">')[1].split('</title>')[0]
        page = (PAGE_TMPL
                .replace('@@LABEL@@', label)
                .replace('@@TITLE@@', title)
                .replace('@@CAPTION@@', caption)
                .replace('@@FONTS@@', FONTS_LINK)
                .replace('@@VW@@', str(w))
                .replace('@@SVG@@', svg.rstrip())
                .replace('@@CHAPTER@@', str(chapter)))
        (PAGE_DIR / f'{slug}.html').write_text(page)
        print(f'wrote assets/diagrams/{slug}.svg + figures/{slug}.html ({w}x{h})')


if __name__ == '__main__':
    main()
