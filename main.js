function setLanguage(lang) {
  var fa = lang === 'fa', h = document.documentElement;
  try { localStorage.setItem('preferredLanguage', lang); } catch (e) {}
  h.lang = lang;
  h.dir = fa ? 'rtl' : 'ltr';
  var label = document.getElementById('currentLangLabel'), flag = document.getElementById('currentFlag');
  if (label) label.textContent = fa ? 'FA' : 'EN';
  if (flag) flag.textContent = fa ? '🇮🇷' : '🇬🇧';
  document.querySelectorAll('[data-en][data-fa]').forEach(function (el) {
    el.innerHTML = el.getAttribute('data-' + lang);
  });
  document.querySelectorAll('.lang-option').forEach(function (o) {
    o.classList.toggle('active-lang', o.dataset.lang === lang);
  });
  document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
}

function closeLang() {
  var d = document.getElementById('langDropdown'), a = document.getElementById('langArrow');
  if (d) d.classList.remove('open');
  if (a) a.classList.remove('open');
}
function toggleLangDropdown(e) {
  if (e) e.stopPropagation();
  var d = document.getElementById('langDropdown'), a = document.getElementById('langArrow');
  if (d && a) { d.classList.toggle('open'); a.classList.toggle('open'); }
}
function switchLanguage(lang, e) {
  if (e) e.stopPropagation();
  closeLang();
  setLanguage(lang);
}
function toggleMenu() {
  var nav = document.getElementById('navLinks');
  if (nav) nav.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', function () {
  var saved = null;
  try { saved = localStorage.getItem('preferredLanguage'); } catch (e) {}
  setLanguage(saved || 'fa');

  document.addEventListener('click', closeLang);
  document.querySelectorAll('.links a').forEach(function (a) {
    a.addEventListener('click', function () {
      var nav = document.getElementById('navLinks');
      if (nav) nav.classList.remove('open');
    });
  });
  window.addEventListener('resize', function () {
    var nav = document.getElementById('navLinks');
    if (window.innerWidth > 900 && nav) nav.classList.remove('open');
  });

  document.querySelectorAll('.course-card').forEach(function (c) {
    var l = c.querySelector('.course-level');
    c.classList.add('b-' + (l ? l.textContent.trim().charAt(0) : 'P'));
  });

  document.querySelectorAll('.teacher-card').forEach(function (c) {
    var h3 = c.querySelector('h3');
    var name = (h3 && h3.getAttribute('data-en')) || '';
    var ini = name.split(' ').map(function (w) { return w.charAt(0); }).slice(0, 2).join('');
    var av = document.createElement('div');
    av.className = 'avatar';
    av.setAttribute('aria-hidden', 'true');
    av.textContent = ini;
    c.insertBefore(av, c.firstChild);
  });

  var fa = document.getElementById('bubFa'), en = document.getElementById('bubEn');
  if (fa && en) {
    var P = [
      ['سلام، حالت چطوره؟', "Hi, how's it going?"],
      ['می‌شه کمکم کنی؟', 'Could you give me a hand?'],
      ['فردا ساعت چند جلسه داریم؟', 'What time is the meeting tomorrow?'],
      ['دلم برات تنگ شده بود', "I've really missed you"]
    ], i = 0;
    var show = function () {
      fa.textContent = P[i][0];
      en.textContent = P[i][1];
      [fa, en].forEach(function (b) {
        b.style.animation = 'none';
        void b.offsetWidth;
        b.style.animation = '';
      });
    };
    show();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInterval(function () { i = (i + 1) % P.length; show(); }, 4200);
    }
  }
});
