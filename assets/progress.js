// progress.js — mark a lesson visited (localStorage). Include on every lesson page.
(function () {
  var m = document.body.getAttribute("data-lesson");
  if (m) { try { localStorage.setItem("visited:" + m, "1"); } catch (e) {} }
})();
