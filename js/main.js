// Hero slideshow: 21 slides cross-fading every 2.8s (matches design prototype)
(function () {
  var slides = document.querySelectorAll('.hero__slide');
  var dotsWrap = document.querySelector('.hero__dots');
  if (!slides.length || !dotsWrap) return;

  var active = 0;
  var timer;
  var dots = [];

  slides.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.className = 'hero__dot' + (i === active ? ' is-active' : '');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.addEventListener('click', function () {
      clearInterval(timer);
      show(i);
      start();
    });
    dotsWrap.appendChild(dot);
    dots.push(dot);
  });

  function show(idx) {
    active = idx;
    slides.forEach(function (s, i) { s.classList.toggle('is-active', i === idx); });
    dots.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });
  }

  function start() {
    timer = setInterval(function () { show((active + 1) % slides.length); }, 2800);
  }

  start();
})();

// FAQ background: portraits rotating in reverse order every 3.4s
(function () {
  var slides = document.querySelectorAll('.faq__bg');
  if (!slides.length) return;

  var active = 0;

  setInterval(function () {
    active = (active + slides.length - 1) % slides.length;
    slides.forEach(function (s, i) { s.classList.toggle('is-active', i === active); });
  }, 3400);
})();
