/* Healthcare AI — shared runtime */
(function () {
  'use strict';

  var THEME_KEY = 'healthai:theme';
  var BANNER_KEY = 'healthai:banner:dismissed';
  var PROGRESS_KEY = 'healthai:progress:v1';
  var LAST_KEY = 'healthai:last-chapter';

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function storeGet(key, fallback) {
    try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
    catch (e) { return fallback; }
  }
  function storeSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  /* ---------------- theme ---------------- */
  function effectiveTheme() {
    var stored = null;
    try { stored = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function applyTheme(mode) {
    if (mode === 'system') {
      try { localStorage.removeItem(THEME_KEY); } catch (e) {}
      var dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    } else {
      try { localStorage.setItem(THEME_KEY, mode); } catch (e) {}
      document.documentElement.setAttribute('data-theme', mode);
    }
    updateThemeMenu();
  }
  function updateThemeMenu() {
    var menu = $('#themeMenu');
    if (!menu) return;
    var stored = null;
    try { stored = localStorage.getItem(THEME_KEY); } catch (e) {}
    var current = stored === 'light' || stored === 'dark' ? stored : 'system';
    $$('button[data-mode]', menu).forEach(function (btn) {
      btn.setAttribute('aria-checked', btn.getAttribute('data-mode') === current ? 'true' : 'false');
    });
  }
  function wireTheme() {
    var toggle = $('#themeToggle');
    var menu = $('#themeMenu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !menu.hasAttribute('hidden');
      if (open) { menu.setAttribute('hidden', ''); toggle.setAttribute('aria-expanded', 'false'); }
      else { menu.removeAttribute('hidden'); toggle.setAttribute('aria-expanded', 'true'); updateThemeMenu(); }
    });
    $$('button[data-mode]', menu).forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyTheme(btn.getAttribute('data-mode'));
        menu.setAttribute('hidden', '');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      });
    });
    document.addEventListener('click', function (e) {
      if (menu.hasAttribute('hidden')) return;
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.setAttribute('hidden', '');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hasAttribute('hidden')) {
        menu.setAttribute('hidden', '');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
    updateThemeMenu();
  }

  /* ---------------- banner ---------------- */
  function wireBanner() {
    var banner = $('#siteBanner');
    if (!banner) return;
    var dismissed = null;
    try { dismissed = localStorage.getItem(BANNER_KEY); } catch (e) {}
    if (dismissed === '1') { banner.hidden = true; return; }
    var close = $('#bannerClose');
    if (close) close.addEventListener('click', function () {
      banner.hidden = true;
      try { localStorage.setItem(BANNER_KEY, '1'); } catch (e) {}
      var header = $('#siteHeader');
      if (header) header.style.top = '0px';
    });
  }

  /* ---------------- mobile nav ---------------- */
  function wireMobileNav() {
    var toggle = $('#menuToggle');
    var panel = $('#mobileNav');
    if (!toggle || !panel) return;
    function setOpen(open) {
      if (open) {
        var header = $('#siteHeader');
        if (header) {
          var bottom = Math.max(0, Math.round(header.getBoundingClientRect().bottom));
          panel.style.top = bottom + 'px';
        }
      }
      panel.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    window.addEventListener('scroll', function () {
      if (panel.classList.contains('open')) setOpen(true);
    }, { passive: true });
    toggle.addEventListener('click', function () { setOpen(!panel.classList.contains('open')); });
    $$('a', panel).forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  /* ---------------- progress ---------------- */
  function progress() {
    var data = storeGet(PROGRESS_KEY, { read: {} });
    if (!data.read) data.read = {};
    return data;
  }
  function saveProgress(data) {
    data.updatedAt = Date.now();
    storeSet(PROGRESS_KEY, data);
    document.dispatchEvent(new CustomEvent('healthai:progress', { detail: data }));
  }
  function isRead(slug) { return !!progress().read[slug]; }
  function toggleRead(slug) {
    var data = progress();
    if (data.read[slug]) delete data.read[slug];
    else data.read[slug] = Date.now();
    saveProgress(data);
    return !!data.read[slug];
  }
  function readCount() { return Object.keys(progress().read).length; }
  window.HEALTHAI = {
    isRead: isRead,
    toggleRead: toggleRead,
    readCount: readCount,
    progress: progress
  };

  function paintProgress() {
    var count = readCount();
    $$('[data-read-count]').forEach(function (el) { el.textContent = String(count); });
    $$('[data-progress-total]').forEach(function (el) {
      var total = Number(el.getAttribute('data-progress-total')) || 0;
      if (!total) return;
      var pct = Math.round((count / total) * 100);
      var bar = $('i', el);
      if (bar) bar.style.width = Math.min(100, pct) + '%';
      el.setAttribute('aria-valuenow', String(pct));
    });
    $$('[data-chapter-status]').forEach(function (el) {
      var slug = el.getAttribute('data-chapter-status');
      var done = isRead(slug);
      el.textContent = done ? 'read' : 'unread';
      el.classList.toggle('done', done);
    });
    $$('[data-read-toggle]').forEach(function (btn) {
      var slug = btn.getAttribute('data-read-toggle');
      var done = isRead(slug);
      btn.classList.toggle('done', done);
      btn.textContent = done ? '✓ Chapter read' : 'Mark chapter read';
      btn.setAttribute('aria-pressed', done ? 'true' : 'false');
    });
    $$('.reader-nav__chapters a').forEach(function (a) {
      var check = $('.check', a);
      if (!check) return;
      check.textContent = isRead(a.getAttribute('data-slug')) ? '✓' : '';
    });
  }
  document.addEventListener('healthai:progress', paintProgress);

  /* ---------------- copy ---------------- */
  function wireCopy() {
    $$('[data-copy]').forEach(function (btn) {
      var timer = null;
      var label = btn.getAttribute('data-copy-label') || 'copy';
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy');
        if (!text && btn.getAttribute('data-copy-target')) {
          var target = $(btn.getAttribute('data-copy-target'));
          if (target) text = target.innerText;
        }
        if (!text) return;
        function done() {
          var original = btn.textContent;
          btn.textContent = 'copied';
          btn.classList.add('copied');
          if (timer) clearTimeout(timer);
          timer = setTimeout(function () {
            btn.textContent = original || label;
            btn.classList.remove('copied');
          }, 1500);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(function () {
            var ta = document.createElement('textarea');
            ta.value = text; document.body.appendChild(ta); ta.select();
            try { document.execCommand('copy'); done(); } catch (e) {}
            document.body.removeChild(ta);
          });
        } else {
          var ta = document.createElement('textarea');
          ta.value = text; document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); done(); } catch (e) {}
          document.body.removeChild(ta);
        }
      });
    });
  }

  /* ---------------- triage ---------------- */
  var TRIAGE = [
    {
      time: '04:00',
      tag: 'CASE / VITALS',
      question: 'Hour 6 of an ICU stay: lactate has tripled over four hours, mean arterial pressure is drifting down, urine output is falling. The NEWS score is still "borderline". What do you do?',
      options: ['Wait for the next scheduled round', 'Escalate to the rapid-response team now', 'Give fluids and re-check in 6 hours'],
      correct: 1,
      verdict: 'Escalate on the trajectory, not the threshold.',
      body: 'A static score samples the patient twice a day; the trajectory of one lab value over six hours is often the strongest early-warning signal there is. Deterioration models earn their keep by surfacing exactly this — hours ahead, not at the next round.',
      sources: [['Chapter 7.4', 'read/ch-07.html#s-7-4'], ['Chapter 26.2', 'read/ch-26.html#s-26-2']]
    },
    {
      time: '02:17',
      tag: 'CASE / SCREENING',
      question: 'A screening model for a 1-in-10,000 disease reports AUROC 0.99. At the vendor\'s default threshold it flags 400 people per 10,000, of whom about 4 are true positives. What do you do?',
      options: ['Deploy as-is — AUROC 0.99 is excellent', 'Set the operating point from the confirmatory-test budget', 'Abandon the model'],
      correct: 1,
      verdict: 'The base-rate trap is an operations problem.',
      body: 'AUROC ranks patients; it does not decide how many false positives your clinic can work up. At low prevalence, precision is the honest metric — choose the threshold from the confirmatory pathway\'s budget, and report the confusion matrix in absolute numbers.',
      sources: [['Chapter 19.3', 'read/ch-19.html#s-19-3'], ['Chapter 20.4', 'read/ch-20.html#s-20-4']]
    },
    {
      time: '11:42',
      tag: 'CASE / RADIOLOGY',
      question: 'A chest X-ray model scores 0.94 AUPRC locally. Grad-CAM shows its attention concentrated on a lateral "L/R" marker on the films. Deploy?',
      options: ['Deploy — the metrics are strong', 'Do not deploy; retrain and re-validate until attention is clinical', 'Deploy but warn radiologists'],
      correct: 1,
      verdict: 'Shortcut learning hides inside good metrics.',
      body: 'The marker encodes laterality and correlates with scan provenance — a shortcut, not a finding. Attention checks (Grad-CAM/saliency) are part of validation for exactly this reason: fix the training data, re-validate externally, and only then return to the deployment gate.',
      sources: [['Chapter 17.4', 'read/ch-17.html#s-17-4'], ['Chapter 33.2', 'read/ch-33.html#s-33-2']]
    }
  ];

  function wireTriage() {
    var root = $('#triage');
    if (!root) return;
    var idx = 0, answers = 0, correct = 0, locked = false;
    var clock = $('.triage__clock', root);
    var tag = $('.triage__scenario', root);
    var question = $('.triage__question', root);
    var options = $('.triage__options', root);
    var verdict = $('.triage__verdict', root);
    var score = $('.triage__score b', root);
    var next = $('.triage__next', root);

    function render() {
      var item = TRIAGE[idx];
      locked = false;
      clock.textContent = item.time;
      tag.textContent = item.tag;
      question.textContent = item.question;
      options.innerHTML = '';
      item.options.forEach(function (label, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'triage__opt';
        b.textContent = label;
        b.addEventListener('click', function () { choose(i, b); });
        options.appendChild(b);
      });
      verdict.classList.remove('show');
      verdict.innerHTML = '';
      next.hidden = true;
      score.textContent = correct + ' / ' + answers;
    }
    function choose(i, btn) {
      if (locked) return;
      locked = true;
      var item = TRIAGE[idx];
      answers += 1;
      var right = i === item.correct;
      if (right) correct += 1;
      $$('.triage__opt', options).forEach(function (b, j) {
        b.disabled = true;
        if (j === item.correct) b.classList.add('is-correct');
        if (j === i && !right) b.classList.add('is-wrong');
      });
      score.textContent = correct + ' / ' + answers;
      verdict.innerHTML = '<div class="eyebrow">' + (right ? 'MATCH / CLINICAL NOTE' : 'MISS / CLINICAL NOTE') + '</div>' +
        '<h3>' + item.verdict + '</h3><p>' + item.body + '</p>' +
        '<div class="sources">' + item.sources.map(function (s) {
          return '<a href="' + s[1] + '">' + s[0] + ' →</a>';
        }).join('') + '</div>';
      verdict.classList.add('show');
      next.hidden = false;
      next.textContent = idx === TRIAGE.length - 1 ? 'Restart drill' : 'Next case →';
      next.focus();
    }
    next.addEventListener('click', function () {
      idx = (idx + 1) % TRIAGE.length;
      if (idx === 0) { answers = 0; correct = 0; }
      render();
      clock.focus();
    });
    render();
  }

  /* ---------------- carousel ---------------- */
  function wireCarousel() {
    var root = $('#figureCarousel');
    if (!root) return;
    var plates = $$('.carousel__plate', root);
    var dots = $$('.carousel__dot', root);
    var caption = $('.carousel__caption', root);
    var prev = $('.carousel__prev', root);
    var next = $('.carousel__next', root);
    if (plates.length < 2) return;
    var index = 0, timer = null, cycles = 0;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function show(i) {
      index = (i + plates.length) % plates.length;
      plates.forEach(function (p, j) { p.classList.toggle('is-active', j === index); p.setAttribute('aria-hidden', j === index ? 'false' : 'true'); });
      dots.forEach(function (d, j) { d.classList.toggle('is-active', j === index); d.setAttribute('aria-current', j === index ? 'true' : 'false'); });
      var plate = plates[index];
      if (caption) {
        caption.innerHTML = '<b>Plate ' + (index + 1) + ' of ' + plates.length + '.</b> ' + plate.getAttribute('data-caption');
      }
    }
    function start() {
      if (reduced || timer) return;
      timer = setInterval(function () {
        if (document.hidden) return;
        show(index + 1);
        if (index === 0) { cycles += 1; if (cycles >= 1) stop(); }
      }, 8000);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    prev.addEventListener('click', function () { stop(); show(index - 1); });
    next.addEventListener('click', function () { stop(); show(index + 1); });
    dots.forEach(function (d, j) { d.addEventListener('click', function () { stop(); show(j); }); });
    root.addEventListener('mouseenter', stop);
    root.addEventListener('focusin', stop);
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { stop(); show(index - 1); }
      if (e.key === 'ArrowRight') { stop(); show(index + 1); }
    });
    show(0);
    if (!reduced) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { if (entry.isIntersecting) start(); else stop(); });
      }, { threshold: 0.35 });
      io.observe(root);
    }
  }

  /* ---------------- unit modal ---------------- */
  function wireUnitModal() {
    var modal = $('#unitModal');
    if (!modal || !window.HEALTHAI_UNITS) return;
    var panel = $('.modal__panel', modal);
    var title = $('#unitModalTitle', modal);
    var kicker = $('#unitModalKicker', modal);
    var body = $('#unitModalBody', modal);
    var search = $('#unitModalSearch', modal);
    var close = $('#unitModalClose', modal);
    var lastFocus = null;

    function chapterRow(ch) {
      var done = isRead(ch.slug);
      return '<li data-title="' + (ch.title + ' ' + ch.n).toLowerCase() + '">' +
        '<a href="read/' + ch.slug + '.html">' +
        '<span class="modal-list__num">' + String(ch.n).padStart(2, '0') + '</span>' +
        '<span class="modal-list__title">' + ch.title + '</span>' +
        '<span class="modal-list__status' + (done ? ' done' : '') + '" data-chapter-status="' + ch.slug + '">' + (done ? 'read' : 'unread') + '</span>' +
        '</a></li>';
    }
    function open(unitId) {
      var unit = window.HEALTHAI_UNITS.filter(function (u) { return u.id === unitId; })[0];
      if (!unit) return;
      lastFocus = document.activeElement;
      title.textContent = unit.title;
      kicker.textContent = 'UNIT ' + unit.roman + ' · ' + unit.chapters.length + ' CHAPTERS · ' + unit.focus;
      body.innerHTML = '<ul class="modal-list">' + unit.chapters.map(chapterRow).join('') + '</ul>' +
        '<p class="modal__empty" hidden>No chapters match that filter.</p>';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (search) { search.value = ''; }
      var first = $('a', body); if (first) first.focus();
    }
    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }
    $$('[data-unit]').forEach(function (btn) {
      btn.addEventListener('click', function () { open(btn.getAttribute('data-unit')); });
    });
    close.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal || e.target.classList.contains('modal__backdrop')) closeModal(); });
    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'Tab') {
        var focusables = $$('a[href], button:not([disabled]), input', panel).filter(function (el) { return el.offsetParent !== null; });
        if (!focusables.length) return;
        var first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    if (search) {
      search.addEventListener('input', function () {
        var q = search.value.trim().toLowerCase();
        var shown = 0;
        $$('li', body).forEach(function (li) {
          var visible = !q || li.getAttribute('data-title').indexOf(q) !== -1;
          li.style.display = visible ? '' : 'none';
          if (visible) shown += 1;
        });
        var empty = $('.modal__empty', body);
        if (empty) {
          empty.hidden = shown > 0;
          empty.textContent = q ? 'No chapters match “' + search.value.trim() + '”.' : '';
        }
      });
    }
    document.addEventListener('healthai:progress', function () {
      $$('[data-chapter-status]', body).forEach(function (el) {
        var done = isRead(el.getAttribute('data-chapter-status'));
        el.textContent = done ? 'read' : 'unread';
        el.classList.toggle('done', done);
      });
    });
  }

  /* ---------------- search palette ---------------- */
  function wirePalette() {
    var dialog = $('#cmdPalette');
    if (!dialog) return;
    var input = $('#cpInput', dialog);
    var results = $('#cpResults', dialog);
    var summary = $('#cpSummary', dialog);
    var data = window.HEALTHAI_SEARCH || [];
    var active = -1;
    var lastFocus = null;
    var typeLabel = { chapter: 'CH', section: '§', glossary: 'TERM', lab: 'LAB', page: 'PAGE' };
    var typeName = { chapter: 'Chapters', section: 'Sections', glossary: 'Glossary', lab: 'Labs', page: 'Reference' };

    function score(item, q) {
      if (!q) return 1;
      var title = item.title.toLowerCase();
      var text = (item.text || '').toLowerCase();
      var kicker = (item.kicker || '').toLowerCase();
      var s = 0;
      if (title === q) s += 100;
      if (title.indexOf(q) === 0) s += 60;
      if (title.indexOf(q) !== -1) s += 30;
      if (kicker.indexOf(q) !== -1) s += 12;
      if (text.indexOf(q) !== -1) s += 8;
      var words = q.split(/\s+/).filter(Boolean);
      words.forEach(function (w) {
        if (title.indexOf(w) !== -1) s += 8;
        if (text.indexOf(w) !== -1) s += 2;
      });
      return s;
    }

    function render(q) {
      var query = q.trim().toLowerCase();
      var matches = data.map(function (item) { return { item: item, s: score(item, query) }; })
        .filter(function (m) { return m.s > 0; })
        .sort(function (a, b) { return b.s - a.s || a.item.title.localeCompare(b.item.title); })
        .slice(0, 24)
        .map(function (m) { return m.item; });
      active = -1;
      results.innerHTML = '';
      if (!matches.length) {
        results.innerHTML = '<div class="cp__empty">No matches. Try “sepsis”, “DICOM”, “fairness”, or “federated”.</div>';
        return;
      }
      var groups = {};
      matches.forEach(function (item) { (groups[item.type] = groups[item.type] || []).push(item); });
      var order = ['chapter', 'section', 'glossary', 'lab', 'page'];
      order.forEach(function (type) {
        if (!groups[type]) return;
        var wrap = document.createElement('div');
        wrap.className = 'cp__group';
        wrap.innerHTML = '<div class="cp__group-title">' + typeName[type] + '</div>';
        groups[type].forEach(function (item, i) {
          var a = document.createElement('a');
          a.className = 'cp__result';
          a.href = item.url;
          a.setAttribute('data-result', '');
          a.innerHTML = '<span class="cp__type">' + typeLabel[type] + '</span>' +
            '<span class="cp__title">' + item.title + '<small>' + (item.kicker || '') + '</small></span>' +
            '<span class="cp__hint">enter</span>';
          wrap.appendChild(a);
        });
        results.appendChild(wrap);
      });
      if (summary) {
        summary.textContent = matches.length + ' results' + (query ? ' for “' + q.trim() + '”' : '');
      }
    }

    function openPalette() {
      lastFocus = document.activeElement;
      dialog.classList.add('open');
      dialog.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      input.value = '';
      render('');
      input.focus();
    }
    function closePalette() {
      dialog.classList.remove('open');
      dialog.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }
    function move(dir) {
      var nodes = $$('.cp__result', results);
      if (!nodes.length) return;
      active = (active + dir + nodes.length) % nodes.length;
      nodes.forEach(function (n, i) { n.classList.toggle('is-active', i === active); });
      nodes[active].scrollIntoView({ block: 'nearest' });
    }
    $$('.search-trigger').forEach(function (b) { b.addEventListener('click', openPalette); });
    document.addEventListener('keydown', function (e) {
      var key = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && key === 'k') { e.preventDefault(); openPalette(); return; }
      if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); openPalette(); return; }
      if (!dialog.classList.contains('open')) return;
      if (e.key === 'Escape') { e.preventDefault(); closePalette(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      if (e.key === 'Enter') {
        var nodes = $$('.cp__result', results);
        if (active >= 0 && nodes[active]) { e.preventDefault(); window.location.href = nodes[active].href; }
      }
    });
    input.addEventListener('input', function () { render(input.value); });
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog || e.target.classList.contains('cp__panel') === false && e.target.closest('.cp__panel') === null) closePalette();
    });
    var closeBtn = $('.cp__close', dialog);
    if (closeBtn) closeBtn.addEventListener('click', closePalette);
    render('');
  }

  /* ---------------- reader ---------------- */
  function wireReader() {
    var article = $('.chapter-body');
    if (!article) return;
    var slug = document.body.getAttribute('data-chapter');
    var bar = $('#readerBar');
    var tocLinks = $$('.chapter-rail__toc a');
    var headings = $$('.chapter-section[id]', article);
    var toggle = $('[data-read-toggle]');
    var progressLabel = $('[data-rail-count]');

    try { localStorage.setItem(LAST_KEY, slug); } catch (e) {}

    function paintScroll() {
      var rect = article.getBoundingClientRect();
      var total = article.offsetHeight - window.innerHeight * 0.65;
      var seen = Math.min(Math.max(-rect.top + 120, 0), Math.max(total, 1));
      var pct = Math.round((seen / Math.max(total, 1)) * 100);
      if (bar) bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
      if (progressLabel) progressLabel.textContent = Math.min(100, Math.max(0, pct)) + '%';
    }
    window.addEventListener('scroll', paintScroll, { passive: true });
    window.addEventListener('resize', paintScroll);
    paintScroll();

    if (headings.length && tocLinks.length) {
      var map = {};
      tocLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          tocLinks.forEach(function (a) { a.classList.remove('active'); });
          var link = map[entry.target.id];
          if (link) link.classList.add('active');
        });
      }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
      headings.forEach(function (h) { io.observe(h); });
    }

    if (toggle) {
      toggle.addEventListener('click', function () {
        toggleRead(slug);
        paintProgress();
      });
    }

    $$('[data-copy]').forEach(function (btn) {
      if (btn.closest('.code-block')) return;
      // code copy buttons are wired by wireCopy
    });

    document.addEventListener('keydown', function (e) {
      if (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        var link = e.key === 'ArrowLeft' ? $('[data-prev]') : $('[data-next]');
        if (link) window.location.href = link.href;
      }
    });
  }

  function init() {
    wireTheme();
    wireBanner();
    wireMobileNav();
    wireCopy();
    wireTriage();
    wireCarousel();
    wireUnitModal();
    wirePalette();
    wireReader();
    paintProgress();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
