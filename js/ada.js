/* ============================================================
   Progress Rum — Self-hosted ADA Accessibility Widget
   Features: text resize, high contrast, reduced motion,
   focus indicators, dyslexia font, skip link
   ============================================================ */
(function () {
  var ADA_KEY = 'pr_ada_v1';
  var state = { textSize: 0, contrast: false, motion: false, dyslexia: false };
  var panel, btn;

  function loadState() {
    try { var s = JSON.parse(localStorage.getItem(ADA_KEY)); if (s) state = s; } catch (e) {}
  }
  function saveState() { localStorage.setItem(ADA_KEY, JSON.stringify(state)); }

  function applyAll() {
    var root = document.documentElement;
    // Text resize: 0 = normal, 1 = +2px, 2 = +4px
    var sizes = [16, 18, 20];
    root.style.fontSize = sizes[state.textSize] + 'px';
    // High contrast
    if (state.contrast) { root.classList.add('ada-contrast'); }
    else { root.classList.remove('ada-contrast'); }
    // Reduced motion
    if (state.motion) { root.classList.add('ada-reduce-motion'); }
    else { root.classList.remove('ada-reduce-motion'); }
    // Dyslexia font
    if (state.dyslexia) { root.classList.add('ada-dyslexia'); }
    else { root.classList.remove('ada-dyslexia'); }
  }

  function injectStyles() {
    var s = document.createElement('style');
    s.textContent = [
      // High contrast
      '.ada-contrast body{background:#000!important;color:#fff!important;}',
      '.ada-contrast .nav,.ada-contrast .hero,.ada-contrast section,.ada-contrast .split__text,.ada-contrast .hero-panel__text,.ada-contrast .rum-section__text,.ada-contrast .exp-row__text,.ada-contrast .membership-panel__text,.ada-contrast .cocktail-intro__text,.ada-contrast .cocktail-body__left,.ada-contrast .cocktail-body__right,.ada-contrast .contact-info,.ada-contrast .founder-panel__text,.ada-contrast .banner-headline,.ada-contrast .rum-tagline,.ada-contrast .age-gate,.ada-contrast .footer{background:#000!important;color:#fff!important;}',
      '.ada-contrast a,.ada-contrast .btn--link{color:#ff0!important;}',
      '.ada-contrast .btn--gold{background:#ff0!important;color:#000!important;}',
      '.ada-contrast img{opacity:0.9;}',
      // Reduced motion
      '.ada-reduce-motion *{transition:none!important;animation:none!important;}',
      // Dyslexia font
      '@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap");',
      '.ada-dyslexia body,.ada-dyslexia p,.ada-dyslexia li,.ada-dyslexia label{font-family:"Open Sans",sans-serif!important;letter-spacing:0.03em;word-spacing:0.1em;line-height:1.9;}',
      // Focus visible
      ':focus-visible{outline:3px solid #b8962e!important;outline-offset:3px!important;}',
      // Widget button
      '#ada-btn{position:fixed;bottom:1.5rem;right:1.5rem;z-index:7000;width:52px;height:52px;border-radius:50%;background:#b8962e;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,0.5);transition:background 0.2s;color:#0d0d0d;}',
      '#ada-btn:hover{background:#d4b05a;}',
      '#ada-btn:focus-visible{outline:3px solid #fff!important;}',
      '#ada-panel{position:fixed;bottom:5.5rem;right:1.5rem;z-index:7000;background:#1a1a1a;border:1px solid rgba(184,150,46,0.4);width:260px;padding:1.25rem;box-shadow:0 8px 32px rgba(0,0,0,0.6);display:none;font-family:Nunito,system-ui,sans-serif;}',
      '#ada-panel.open{display:block;}',
      '#ada-panel h3{font-size:0.72rem;letter-spacing:0.15em;text-transform:uppercase;color:#b8962e;margin-bottom:1rem;}',
      '.ada-option{display:flex;align-items:center;justify-content:space-between;padding:0.6rem 0;border-bottom:1px solid rgba(255,255,255,0.07);gap:0.5rem;}',
      '.ada-option:last-child{border-bottom:none;}',
      '.ada-label{font-size:0.8rem;color:rgba(240,234,216,0.8);}',
      '.ada-controls{display:flex;gap:0.4rem;align-items:center;}',
      '.ada-btn-sm{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#f0ead8;width:30px;height:30px;cursor:pointer;font-size:0.9rem;display:flex;align-items:center;justify-content:center;transition:background 0.15s;}',
      '.ada-btn-sm:hover{background:rgba(184,150,46,0.3);border-color:#b8962e;}',
      '.ada-btn-sm.active{background:#b8962e;border-color:#b8962e;color:#000;}',
      '.ada-reset{width:100%;margin-top:1rem;background:none;border:1px solid rgba(240,234,216,0.2);color:rgba(240,234,216,0.5);padding:0.45rem;font-size:0.7rem;letter-spacing:0.12em;text-transform:uppercase;cursor:pointer;font-family:inherit;transition:border-color 0.2s;}',
      '.ada-reset:hover{border-color:#b8962e;color:#b8962e;}',
    ].join('\n');
    document.head.appendChild(s);
  }

  function buildWidget() {
    // Skip link
    var skip = document.createElement('a');
    skip.href = '#main-content';
    skip.textContent = 'Skip to main content';
    skip.style.cssText = 'position:fixed;top:-100%;left:1rem;z-index:9999;background:#b8962e;color:#000;padding:0.5rem 1rem;font-weight:700;font-size:0.8rem;font-family:Nunito,sans-serif;transition:top 0.2s;';
    skip.addEventListener('focus', function () { skip.style.top = '1rem'; });
    skip.addEventListener('blur',  function () { skip.style.top = '-100%'; });
    document.body.insertBefore(skip, document.body.firstChild);

    // Add id to first main element or body
    var main = document.querySelector('main') || document.querySelector('.hero-panels') || document.querySelector('.page-hero');
    if (main && !main.id) main.id = 'main-content';

    // Toggle button
    btn = document.createElement('button');
    btn.id = 'ada-btn';
    btn.setAttribute('aria-label', 'Accessibility options');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true"><path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 6c1.1 0 2 .9 2 2v4h2v2h-2v4h-2v-4h-1v4h-2v-4H7v-2h2v-4c0-1.1.9-2 2-2z"/></svg>';
    document.body.appendChild(btn);

    // Panel
    panel = document.createElement('div');
    panel.id = 'ada-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Accessibility settings');
    panel.innerHTML = [
      '<h3>Accessibility</h3>',
      // Text size
      '<div class="ada-option">',
        '<span class="ada-label">Text Size</span>',
        '<div class="ada-controls">',
          '<button class="ada-btn-sm" id="ada-text-dec" aria-label="Decrease text size">A−</button>',
          '<button class="ada-btn-sm" id="ada-text-inc" aria-label="Increase text size">A+</button>',
        '</div>',
      '</div>',
      // High contrast
      '<div class="ada-option">',
        '<span class="ada-label">High Contrast</span>',
        '<div class="ada-controls">',
          '<button class="ada-btn-sm" id="ada-contrast" aria-label="Toggle high contrast" aria-pressed="false">⬤</button>',
        '</div>',
      '</div>',
      // Reduce motion
      '<div class="ada-option">',
        '<span class="ada-label">Reduce Motion</span>',
        '<div class="ada-controls">',
          '<button class="ada-btn-sm" id="ada-motion" aria-label="Toggle reduce motion" aria-pressed="false">⏸</button>',
        '</div>',
      '</div>',
      // Dyslexia
      '<div class="ada-option">',
        '<span class="ada-label">Dyslexia Font</span>',
        '<div class="ada-controls">',
          '<button class="ada-btn-sm" id="ada-dyslexia" aria-label="Toggle dyslexia-friendly font" aria-pressed="false">Aa</button>',
        '</div>',
      '</div>',
      '<button class="ada-reset" id="ada-reset">Reset All</button>',
    ].join('');
    document.body.appendChild(panel);

    // Toggle panel
    btn.addEventListener('click', function () {
      var open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !panel.contains(e.target)) {
        panel.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Controls
    document.getElementById('ada-text-inc').addEventListener('click', function () {
      state.textSize = Math.min(2, state.textSize + 1); saveState(); applyAll(); updateUI();
    });
    document.getElementById('ada-text-dec').addEventListener('click', function () {
      state.textSize = Math.max(0, state.textSize - 1); saveState(); applyAll(); updateUI();
    });
    document.getElementById('ada-contrast').addEventListener('click', function () {
      state.contrast = !state.contrast; saveState(); applyAll(); updateUI();
    });
    document.getElementById('ada-motion').addEventListener('click', function () {
      state.motion = !state.motion; saveState(); applyAll(); updateUI();
    });
    document.getElementById('ada-dyslexia').addEventListener('click', function () {
      state.dyslexia = !state.dyslexia; saveState(); applyAll(); updateUI();
    });
    document.getElementById('ada-reset').addEventListener('click', function () {
      state = { textSize: 0, contrast: false, motion: false, dyslexia: false };
      saveState(); applyAll(); updateUI();
    });

    updateUI();
  }

  function updateUI() {
    if (!panel) return;
    var toggleBtn = function (id, active) {
      var el = document.getElementById(id);
      if (!el) return;
      el.classList.toggle('active', !!active);
      el.setAttribute('aria-pressed', active ? 'true' : 'false');
    };
    toggleBtn('ada-contrast', state.contrast);
    toggleBtn('ada-motion', state.motion);
    toggleBtn('ada-dyslexia', state.dyslexia);
    // Text size visual feedback
    var dec = document.getElementById('ada-text-dec');
    var inc = document.getElementById('ada-text-inc');
    if (dec) dec.classList.toggle('active', state.textSize > 0);
    if (inc) inc.classList.toggle('active', state.textSize > 0);
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectStyles();
    loadState();
    applyAll();
    buildWidget();
  });
})();
