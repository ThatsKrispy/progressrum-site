// Progress Rum — main.js

// Age Gate
(function () {
  var gate = document.getElementById('age-gate');
  if (!gate) return;
  var passed = sessionStorage.getItem('pr_age_ok');
  if (passed) {
    gate.classList.add('hidden');
    setTimeout(function () { gate.style.display = 'none'; }, 700);
  }
})();

function enterSite() {
  sessionStorage.setItem('pr_age_ok', '1');
  var gate = document.getElementById('age-gate');
  if (gate) {
    gate.classList.add('hidden');
    setTimeout(function () { gate.style.display = 'none'; }, 700);
  }
}

// Nav scroll behavior
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Mobile nav toggle
(function () {
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', function () {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });
  // Close on link click
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();

// Hero Ken Burns on load
(function () {
  var hero = document.querySelector('.hero');
  if (!hero) return;
  setTimeout(function () { hero.classList.add('loaded'); }, 100);
})();

// Contact form — Web3Forms
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    var data = new FormData(form);
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data
    })
      .then(function (res) { return res.json(); })
      .then(function (json) {
        if (json.success) {
          form.style.display = 'none';
          var succ = document.getElementById('formSuccess');
          if (succ) succ.style.display = 'block';
        } else {
          btn.textContent = 'Try Again';
          btn.disabled = false;
          alert('Something went wrong. Please email us at hello@progressrum.com');
        }
      })
      .catch(function () {
        btn.textContent = 'Try Again';
        btn.disabled = false;
        alert('Network error. Please email us at hello@progressrum.com');
      });
  });
})();

// Scroll reveal
(function () {
  if (!('IntersectionObserver' in window)) return;
  var style = document.createElement('style');
  style.textContent = '.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; } .reveal.visible { opacity: 1; transform: none; }';
  document.head.appendChild(style);
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.section, .founder, .cocktail-card, .exp-card, .rum-product').forEach(function (el) {
    el.classList.add('reveal');
    obs.observe(el);
  });
})();
