/* coursehome.js — the shared behaviour of every course home page.
   Builds the module legend the map reads, fills the nav progress chip, and adds a
   "continue" action pointing at the first uncompleted lesson. Was duplicated inline
   in each course's index.html; one file now serves every course. */
(function () {
  var C = window.COURSE;
  if (!C) return;

  // --- module legend (graph.js binds its filter behaviour to these spans) ---
  var lg = document.getElementById("legend");
  if (lg && !lg.children.length) {
    C.modules.forEach(function (m) {
      var s = document.createElement("span");
      s.setAttribute("data-mod", m.id);
      s.innerHTML = '<i style="background:' + m.color + '"></i>' + m.n + ". " + m.title;
      lg.appendChild(s);
    });
  }

  // --- progress: how far this reader has got ---
  var done = 0;
  C.lessons.forEach(function (l) {
    try { if (localStorage.getItem("visited:" + l.slug)) done++; } catch (e) {}
  });

  var np = document.getElementById("navpct");
  if (np && done) {
    np.hidden = false;
    np.innerHTML = "<b>" + done + "</b>&nbsp;/&nbsp;" + C.lessons.length + " done";
  }

  // --- continue where you left off ---
  if (done && done < C.lessons.length) {
    var next = C.lessons.filter(function (l) {
      try { return !localStorage.getItem("visited:" + l.slug); } catch (e) { return true; }
    }).sort(function (a, b) { return a.n - b.n; })[0];
    var actions = document.querySelector(".monohead-body .actions");
    if (next && actions) {
      var a = document.createElement("a");
      a.className = "cta";
      a.href = "lessons/" + next.slug + ".html";
      a.textContent = "Continue → lesson " + next.n;
      actions.insertBefore(a, actions.firstChild);
      // the "start at 1" action is no longer the primary one for a returning reader
      var start = actions.querySelector('a[href$="' + C.lessons[0].slug + '.html"]');
      if (start) start.className = "cta secondary";
    }
  }
})();
