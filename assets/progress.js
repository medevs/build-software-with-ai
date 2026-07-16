/* progress.js — lesson-page enhancements. Completion is explicit now: the
   "Mark lesson complete" button writes the same visited:<slug> key the map,
   curriculum, and nav chip already read, so old progress data stays valid.
   Also: computed reading time, a reading-position bar, and ←/→ navigation. */
(function () {
  var slug = document.body.getAttribute("data-lesson");
  if (!slug) return;
  var wrap = document.querySelector(".wrap");

  // remember the last-opened lesson per course, for "continue where you left off"
  var cm = location.pathname.match(/courses\/([^/]+)\/lessons\//);
  try { if (cm) localStorage.setItem("last:" + cm[1], slug); } catch (e) {}

  // reading time from actual word count (~200 wpm) instead of the static "~5 min"
  if (wrap) {
    var words = (wrap.innerText || "").split(/\s+/).filter(Boolean).length;
    var mins = Math.max(2, Math.round(words / 200));
    document.querySelectorAll(".lesson-meta span").forEach(function (s) {
      if (/^~\s*\d+\s*min$/.test(s.textContent.trim())) s.textContent = "~" + mins + " min";
    });
  }

  // reading-position bar
  var bar = document.createElement("div");
  bar.className = "readbar";
  document.body.appendChild(bar);
  function onScroll() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // explicit "mark complete" button (replaces the old silent visited-on-open)
  function isDone() { try { return !!localStorage.getItem("visited:" + slug); } catch (e) { return false; } }
  var btn = document.createElement("button");
  btn.type = "button"; btn.className = "complete-btn";
  function paint() {
    btn.classList.toggle("done", isDone());
    btn.textContent = isDone() ? "✓ Lesson completed — click to undo" : "✓ Mark lesson complete";
  }
  btn.addEventListener("click", function () {
    try { isDone() ? localStorage.removeItem("visited:" + slug) : localStorage.setItem("visited:" + slug, "1"); } catch (e) {}
    paint();
  });
  paint();
  var pn = document.querySelector(".prevnext");
  if (pn) pn.parentNode.insertBefore(btn, pn);
  else if (wrap) wrap.appendChild(btn);

  // ← / → keyboard navigation via the prev/next links
  window.addEventListener("keydown", function (e) {
    if (e.altKey || e.metaKey || e.ctrlKey) return;
    var t = e.target;
    if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    var go = null;
    document.querySelectorAll(".prevnext a[href]").forEach(function (a) {
      if (a.classList.contains("r")) { if (e.key === "ArrowRight") go = a; }
      else if (e.key === "ArrowLeft") go = a;
    });
    if (go) location.href = go.getAttribute("href");
  });
})();
