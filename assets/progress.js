/* progress.js — everything a lesson page does beyond being read.

   Builds the route rail (section list + scroll-spy + module progress), fills the
   specification strip's live fields, tracks explicit completion, draws the
   reading-position bar, and wires ←/→ navigation.

   Completion is explicit: the "Mark lesson complete" button writes the same
   visited:<slug> key the map, curriculum, and nav chip already read, so progress
   recorded by earlier versions of the site stays valid. */
(function () {
  var slug = document.body.getAttribute("data-lesson");
  if (!slug) return;
  var main = document.querySelector(".main") || document.querySelector(".wrap");
  var C = window.COURSE;

  function got(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function isDone() { return !!got("visited:" + slug); }

  // remember the last-opened lesson per course, for "continue where you left off"
  var cm = location.pathname.match(/courses\/([^/]+)\/lessons\//);
  try { if (cm) localStorage.setItem("last:" + cm[1], slug); } catch (e) {}

  /* ---------------------------------------------------- the route rail ---- */
  // section list, built from the lesson's own h2s so no page hand-authors a TOC
  var toc = document.getElementById("railtoc"), spy = [];
  if (toc && main) {
    var used = {};
    main.querySelectorAll("h2").forEach(function (h) {
      if (!h.id) {                                  // stable slug ids, deep-linkable
        var base = (h.textContent || "").toLowerCase().trim()
          .replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").slice(0, 40) || "section";
        h.id = used[base] ? base + "-" + ++used[base] : ((used[base] = 1), base);
      }
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      toc.appendChild(li);
      spy.push({ h: h, a: a });
    });
    if (!spy.length) {
      var sec = document.querySelector(".rail-sec");
      if (sec) sec.hidden = true;
    }
  }

  // scroll-spy: mark the section currently being read
  if (spy.length) {
    var raf = null;
    function mark() {
      raf = null;
      var current = 0;
      spy.forEach(function (s, i) {
        if (s.h.getBoundingClientRect().top < 130) current = i;
      });
      spy.forEach(function (s, i) {
        if (i === current) s.a.setAttribute("aria-current", "true");
        else s.a.removeAttribute("aria-current");
      });
    }
    window.addEventListener("scroll", function () {
      if (!raf) raf = requestAnimationFrame(mark);
    }, { passive: true });
    mark();
  }

  /* ------------------------------------------- module progress + titles --- */
  var thisLesson = C && C.lessons.filter(function (l) { return l.slug === slug; })[0];
  var myModule = null, siblings = [];
  if (C && thisLesson) {
    myModule = C.modules.filter(function (m) { return m.id === thisLesson.module; })[0];
    siblings = C.lessons.filter(function (l) { return l.module === thisLesson.module; });

    // the rail and the spec strip take the module's real title from course.js, so a
    // shortened title baked into an older page can't drift from the manifest
    if (myModule) {
      var rt = document.querySelector(".rail-mt");
      if (rt) rt.textContent = myModule.title;
      var sp = document.querySelector(".spec .pill");
      if (sp) sp.textContent = myModule.n + " · " + myModule.title;
    }
    paintModule();

    // once the whole module is done, the rail's jump becomes the module quiz
    var jump = document.querySelector(".rail-jump");
    var mdone = siblings.filter(function (l) { return got("visited:" + l.slug); }).length;
    if (jump && myModule && mdone === siblings.length) {
      jump.href = "../quiz.html?m=" + myModule.id;
      jump.textContent = "Module " + myModule.n + " quiz →";
    }
  }

  function paintModule() {
    if (!myModule) return;
    var d = siblings.filter(function (l) { return got("visited:" + l.slug); }).length;
    var rp = document.getElementById("railprog"), rb = document.getElementById("railbar");
    if (rp) rp.textContent = "Module " + myModule.n + " · " + d + "/" + siblings.length + " done";
    if (rb) rb.style.setProperty("--p", (d / siblings.length).toFixed(3));
  }

  /* ------------------------------------------------ spec strip: live bits -- */
  if (main) {
    var words = (main.innerText || "").split(/\s+/).filter(Boolean).length;
    var rtime = document.getElementById("rtime");
    if (rtime) rtime.textContent = "~" + Math.max(2, Math.round(words / 200)) + " min";
  }

  /* ----------------------------------------------- reading-position bar --- */
  var bar = document.createElement("div");
  bar.className = "readbar";
  document.body.appendChild(bar);
  function onScroll() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* -------------------------------------------------- mark complete ------- */
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "complete-btn";
  var status = document.getElementById("lstatus");
  function paint() {
    var done = isDone();
    btn.classList.toggle("done", done);
    btn.textContent = done ? "✓ Completed — click to undo" : "Mark lesson complete";
    btn.setAttribute("aria-pressed", done ? "true" : "false");
    if (status) {
      status.textContent = done ? "✓ Complete" : "Not complete";
      status.classList.toggle("done", done);
    }
  }
  btn.addEventListener("click", function () {
    try {
      if (isDone()) localStorage.removeItem("visited:" + slug);
      else localStorage.setItem("visited:" + slug, "1");
    } catch (e) {}
    paint();
    paintModule();                     // the rail reflects the change without a reload
  });
  paint();
  var pn = document.querySelector(".prevnext");
  if (pn) pn.parentNode.insertBefore(btn, pn);
  else if (main) main.appendChild(btn);

  /* ------------------------------------------------- ← / → navigation ----- */
  window.addEventListener("keydown", function (e) {
    if (e.altKey || e.metaKey || e.ctrlKey) return;
    var t = e.target;
    if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    var go = null;
    document.querySelectorAll(".prevnext a[href]").forEach(function (a) {
      if (a.classList.contains("r")) { if (e.key === "ArrowRight") go = a; }
      else if (e.key === "ArrowLeft") go = a;
    });
    if (go) location.href = go.getAttribute("href");
  });
})();
