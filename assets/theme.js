/* theme.js — dark/light override toggle in the topnav, persisted in localStorage.
   Without a stored choice the site keeps following the OS (prefers-color-scheme). */
(function () {
  var root = document.documentElement;
  try { var t = localStorage.getItem("theme"); if (t) root.setAttribute("data-theme", t); } catch (e) {}
  var nav = document.querySelector(".topnav");
  if (!nav) return;
  function cur() {
    return root.getAttribute("data-theme") ||
      (window.matchMedia && matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light");
  }
  var b = document.createElement("button");
  b.type = "button"; b.className = "themetoggle";
  function paint() {
    var dark = cur() === "dark";
    b.textContent = dark ? "☀" : "☾";
    b.setAttribute("aria-label", "Switch to " + (dark ? "light" : "dark") + " theme");
    b.title = b.getAttribute("aria-label");
  }
  b.addEventListener("click", function () {
    var next = cur() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    paint();
  });
  paint();
  nav.appendChild(b);
})();
