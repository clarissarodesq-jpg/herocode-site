// Hero slideshow: cross-fade every 4.2s, initial slide index 2 (matches design prototype)
(function () {
  var slides = document.querySelectorAll('.hero__slide');
  var dots = document.querySelectorAll('.hero__dot');
  if (!slides.length) return;

  var active = 2;
  var timer;

  function show(idx) {
    active = idx;
    slides.forEach(function (s, i) { s.classList.toggle('is-active', i === idx); });
    dots.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });
  }

  function start() {
    timer = setInterval(function () { show((active + 1) % slides.length); }, 4200);
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      clearInterval(timer);
      show(i);
      start();
    });
  });

  start();
})();
