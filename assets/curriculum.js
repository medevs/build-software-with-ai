/* curriculum.js — renders the module/lesson index and the progress chart from
   window.COURSE. Shared by every course's curriculum.html. Reads the same
   visited:<slug> and quiz:<course>:<module> keys the map and lessons write. */
(function () {
  var C = window.COURSE, root = document.getElementById("mods");
  if (!C || !root) return;
  var courseId = location.pathname.split("/").slice(-2, -1)[0];

  function got(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  // per-module tallies, computed once and reused by the chart and the blocks
  var stats = C.modules.map(function (m) {
    var mine = C.lessons.filter(function (l) { return l.module === m.id; });
    var done = mine.filter(function (l) { return got("visited:" + l.slug); }).length;
    return { m: m, lessons: mine, done: done, total: mine.length,
             best: got("quiz:" + courseId + ":" + m.id) };
  });
  var doneAll = stats.reduce(function (n, s) { return n + s.done; }, 0);

  // --- the progress plate: a real chart of where this reader actually is ---
  var chart = document.getElementById("progresschart");
  if (chart) {
    chart.innerHTML =
      '<figure class="fig wide">' +
        '<figcaption><b>Your progress, module by module</b></figcaption>' +
        '<div class="fig-b">' +
          '<div class="dgm-fact" style="margin-bottom:1.1rem">' +
            "<b>" + doneAll + "<span style=\"font-size:.42em;letter-spacing:0\"> / " +
              C.lessons.length + "</span></b>" +
            "<span>lessons marked complete on this device. Nothing is sent anywhere — " +
              "clearing your browser data clears this.</span>" +
          "</div>" +
          '<ul class="dgm-bars">' +
            stats.map(function (s) {
              var pct = s.total ? Math.round(s.done / s.total * 100) : 0;
              return '<li' + (s.done ? "" : ' class="mute"') +
                ' style="--f:' + s.m.color + ';--p:' + pct + '">' +
                '<span class="bl">' + s.m.n + ". " + s.m.title + "</span>" +
                '<span class="bt"></span>' +
                '<span class="bn">' + s.done + "/" + s.total + "</span></li>";
            }).join("") +
          "</ul>" +
        "</div>" +
        '<p class="fig-n">A filled bar is a module you finished. Empty bars are where to go next.</p>' +
      "</figure>";
  }

  // --- the module blocks ---
  stats.forEach(function (s) {
    var m = s.m, pct = s.total ? Math.round(s.done / s.total * 100) : 0;
    var block = document.createElement("section");
    block.className = "modblock";
    block.style.setProperty("--field", m.color);

    var h = document.createElement("h2");
    h.innerHTML = '<span class="mnum">Module ' + m.n + "</span>" + m.title;
    block.appendChild(h);

    var meta = document.createElement("div");
    meta.className = "modmeta";
    meta.innerHTML =
      "<span>" + s.done + " / " + s.total + " done</span>" +
      '<span class="modbar"><i style="width:' + pct + '%"></i></span>' +
      '<a class="modquiz" href="quiz.html?m=' + m.id + '">Module ' + m.n + " quiz →</a>" +
      (s.best ? '<span class="quizbest">Best ' + s.best + "</span>" : "");
    block.appendChild(meta);

    var grid = document.createElement("div");
    grid.className = "lessongrid";
    s.lessons.forEach(function (l) {
      var a = document.createElement("a");
      a.className = "lcard" + (got("visited:" + l.slug) ? " visited" : "");
      a.href = "lessons/" + l.slug + ".html";
      a.innerHTML = '<span class="n">Lesson ' + l.n + "</span>" +
        '<div class="t">' + l.title + "</div>" +
        '<div class="b">' + l.blurb + "</div>";
      grid.appendChild(a);
    });
    block.appendChild(grid);
    root.appendChild(block);
  });

  // nav chip
  var np = document.getElementById("navpct");
  if (np && doneAll) {
    np.hidden = false;
    np.innerHTML = "<b>" + doneAll + "</b>&nbsp;/&nbsp;" + C.lessons.length + " done";
  }
})();
