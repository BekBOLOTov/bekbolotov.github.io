(function () {
  'use strict';

  var sections = ['experience', 'skills', 'achievements', 'contact'];
  var navLinks = {};

  sections.forEach(function (id) {
    var link = document.querySelector('nav a[href="#' + id + '"]');
    if (link) navLinks[id] = link;
  });

  if (!('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var id = entry.target.id;
      if (navLinks[id]) {
        if (entry.isIntersecting) {
          Object.values(navLinks).forEach(function (l) { l.classList.remove('active'); });
          navLinks[id].classList.add('active');
        }
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}());
