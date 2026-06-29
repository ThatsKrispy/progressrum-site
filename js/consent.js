/* ============================================================
   Progress Rum — Cookie Consent (self-hosted, no third-party)
   Categories: Essential (always), Analytics (opt-in)
   ============================================================ */
(function () {
  var CONSENT_KEY = 'pr_consent_v1';
  var banner, overlay;

  function getConsent() {
    try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); } catch (e) { return null; }
  }

  function setConsent(analytics) {
    var val = { essential: true, analytics: analytics, ts: Date.now() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(val));
    applyConsent(val);
    hideBanner();
  }

  function applyConsent(val) {
    // Only load GA if analytics accepted
    if (val && val.analytics && typeof window.loadGA === 'function') {
      window.loadGA();
    }
  }

  function hideBanner() {
    if (banner) {
      banner.style.transform = 'translateY(100%)';
      setTimeout(function () { banner && banner.remove(); }, 400);
    }
    if (overlay) { overlay.remove(); }
  }

  function showBanner() {
    // Overlay dim
    overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:8998;';
    document.body.appendChild(overlay);

    banner = document.createElement('div');
    banner.id = 'consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'true');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.style.cssText = [
      'position:fixed;bottom:0;left:0;right:0;z-index:8999',
      'background:#111;border-top:1px solid rgba(184,150,46,0.4)',
      'padding:1.5rem 2rem',
      'display:flex;flex-wrap:wrap;gap:1rem;align-items:center;justify-content:space-between',
      'font-family:Nunito,system-ui,sans-serif;font-size:0.84rem;color:rgba(240,234,216,0.8)',
      'transform:translateY(100%);transition:transform 0.35s ease',
    ].join(';');

    banner.innerHTML = [
      '<div style="flex:1;min-width:240px;max-width:680px">',
        '<strong style="color:#f0ead8;letter-spacing:0.08em;text-transform:uppercase;font-size:0.75rem;">Cookie Preferences</strong>',
        '<p style="margin:0.4rem 0 0;">We use essential cookies to run this site. With your permission we\'d also like to use analytics cookies to understand how visitors use our site. You can update preferences at any time.</p>',
      '</div>',
      '<div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center">',
        '<button id="consent-settings" style="background:none;border:1px solid rgba(240,234,216,0.3);color:rgba(240,234,216,0.65);padding:0.55rem 1.1rem;font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;cursor:pointer;font-family:inherit;transition:border-color 0.2s;">Preferences</button>',
        '<button id="consent-reject"   style="background:none;border:1px solid rgba(240,234,216,0.3);color:rgba(240,234,216,0.65);padding:0.55rem 1.1rem;font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;cursor:pointer;font-family:inherit;transition:border-color 0.2s;">Reject All</button>',
        '<button id="consent-accept"   style="background:#b8962e;border:none;color:#0d0d0d;padding:0.55rem 1.4rem;font-size:0.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;cursor:pointer;font-family:inherit;transition:background 0.2s;">Accept All</button>',
      '</div>',
    ].join('');

    document.body.appendChild(banner);

    // Animate in
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { banner.style.transform = 'translateY(0)'; });
    });

    document.getElementById('consent-accept').onclick = function () { setConsent(true); };
    document.getElementById('consent-reject').onclick = function () { setConsent(false); };
    document.getElementById('consent-settings').onclick = showPreferences;
  }

  // Preferences modal
  function showPreferences() {
    var existing = getConsent();
    var analyticsChecked = existing ? existing.analytics : false;

    var modal = document.createElement('div');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Cookie preferences');
    modal.style.cssText = [
      'position:fixed;inset:0;z-index:9100',
      'display:flex;align-items:center;justify-content:center',
      'padding:1rem',
    ].join(';');

    modal.innerHTML = [
      '<div style="background:#1a1a1a;border:1px solid rgba(184,150,46,0.4);max-width:500px;width:100%;padding:2rem;font-family:Nunito,system-ui,sans-serif;">',
        '<h2 style="font-family:Roboto Slab,serif;font-weight:300;font-size:1.3rem;letter-spacing:0.12em;text-transform:uppercase;color:#f0ead8;margin-bottom:1.5rem;">Cookie Preferences</h2>',

        '<div style="border-top:1px solid rgba(255,255,255,0.08);padding:1rem 0;">',
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">',
            '<strong style="font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;color:#f0ead8;">Essential</strong>',
            '<span style="font-size:0.72rem;color:#b8962e;letter-spacing:0.1em;">Always Active</span>',
          '</div>',
          '<p style="font-size:0.82rem;color:rgba(240,234,216,0.6);margin:0;">Required for the site to function — age gate, session, navigation.</p>',
        '</div>',

        '<div style="border-top:1px solid rgba(255,255,255,0.08);padding:1rem 0;">',
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">',
            '<strong style="font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;color:#f0ead8;">Analytics</strong>',
            '<label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer;">',
              '<input type="checkbox" id="pref-analytics" ' + (analyticsChecked ? 'checked' : '') + ' style="width:16px;height:16px;accent-color:#b8962e;">',
              '<span style="font-size:0.72rem;letter-spacing:0.1em;text-transform:uppercase;color:rgba(240,234,216,0.6);">Enable</span>',
            '</label>',
          '</div>',
          '<p style="font-size:0.82rem;color:rgba(240,234,216,0.6);margin:0;">Helps us understand how visitors use our site (Google Analytics). No personal data is sold.</p>',
        '</div>',

        '<div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:1.5rem;display:flex;gap:0.75rem;justify-content:flex-end;flex-wrap:wrap;">',
          '<button id="pref-cancel" style="background:none;border:1px solid rgba(240,234,216,0.25);color:rgba(240,234,216,0.6);padding:0.55rem 1.1rem;font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;cursor:pointer;font-family:inherit;">Cancel</button>',
          '<button id="pref-save"   style="background:#b8962e;border:none;color:#0d0d0d;padding:0.55rem 1.4rem;font-size:0.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;cursor:pointer;font-family:inherit;">Save Preferences</button>',
        '</div>',
      '</div>',
    ].join('');

    document.body.appendChild(modal);
    document.getElementById('pref-cancel').onclick = function () { modal.remove(); };
    document.getElementById('pref-save').onclick = function () {
      var analytics = document.getElementById('pref-analytics').checked;
      setConsent(analytics);
      modal.remove();
    };
    modal.onclick = function (e) { if (e.target === modal) modal.remove(); };
  }

  // Init
  document.addEventListener('DOMContentLoaded', function () {
    var saved = getConsent();
    if (!saved) {
      // Small delay so age gate resolves first
      setTimeout(showBanner, 800);
    } else {
      applyConsent(saved);
    }
  });
})();
