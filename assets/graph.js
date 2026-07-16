/* graph.js — renders the course knowledge graph as an interactive SVG mindmap.
   Deterministic layout: modules arranged on a ring, lessons clustered around each
   module hub. Pan + zoom, hover highlight, click-to-open. No dependencies. */
(function () {
  var C = window.COURSE, svg = document.getElementById("graph");
  if (!C || !svg) return;
  var SVGNS = "http://www.w3.org/2000/svg";
  var W = 1200, H = 820, cx = W / 2, cy = H / 2;
  svg.setAttribute("viewBox", "0 0 " + W + " " + H);

  var modColor = {}, modIndex = {};
  C.modules.forEach(function (m, i) { modColor[m.id] = m.color; modIndex[m.id] = i; });

  // module hub positions on a ring
  var M = C.modules.length, hub = {};
  C.modules.forEach(function (m, i) {
    var a = (i / M) * Math.PI * 2 - Math.PI / 2;
    hub[m.id] = { x: cx + Math.cos(a) * 300, y: cy + Math.sin(a) * 300, a: a };
  });

  // place lessons around their module hub
  var pos = {}, byMod = {};
  C.lessons.forEach(function (l) { (byMod[l.module] = byMod[l.module] || []).push(l); });
  Object.keys(byMod).forEach(function (mid) {
    var arr = byMod[mid], h = hub[mid], k = arr.length;
    arr.forEach(function (l, j) {
      var spread = 1.25, base = h.a;
      var a = base + (k === 1 ? 0 : (j / (k - 1) - 0.5) * spread);
      var r = 118 + (j % 2) * 46;
      pos[l.slug] = { x: h.x + Math.cos(a) * r, y: h.y + Math.sin(a) * r, mod: mid, l: l };
    });
  });

  var visited = {};
  try { C.lessons.forEach(function (l) { if (localStorage.getItem("visited:" + l.slug)) visited[l.slug] = 1; }); } catch (e) {}

  var gRoot = el("g");
  svg.appendChild(gRoot);

  // edges
  var edgeEls = [];
  C.edges.forEach(function (e) {
    var a = pos[e[0]], b = pos[e[1]];
    if (!a || !b) return;
    var ln = el("path", { class: "gedge",
      d: "M" + a.x + "," + a.y + " Q" + (a.x + b.x) / 2 + "," + ((a.y + b.y) / 2 - 18) + " " + b.x + "," + b.y });
    ln._n = [e[0], e[1]];
    gRoot.appendChild(ln); edgeEls.push(ln);
  });

  // module hub labels + center title
  C.modules.forEach(function (m) {
    var h = hub[m.id];
    var t = el("text", { class: "mod-title", x: h.x, y: h.y, "text-anchor": "middle", "font-size": "13" });
    t.textContent = m.n + ". " + m.title.replace(/—.*/, "").trim();
    var halo = el("circle", { cx: h.x, cy: h.y, r: 6, fill: m.color, opacity: .5 });
    gRoot.appendChild(halo); gRoot.appendChild(t);
  });
  var lines = C.centerLines || ["The", "Course"];
  var ctr = el("text", { x: cx, y: cy - 6, "text-anchor": "middle", "font-size": "22", fill: "#fff", "font-weight": "800", "font-family": "var(--sans)" });
  ctr.textContent = lines[0];
  var ctr2 = el("text", { x: cx, y: cy + 20, "text-anchor": "middle", "font-size": "22", fill: "#fff", "font-weight": "800", "font-family": "var(--sans)" });
  ctr2.textContent = lines[1] || "";
  gRoot.appendChild(ctr); gRoot.appendChild(ctr2);

  // nodes
  var nodeEls = [];
  C.lessons.forEach(function (l) {
    var p = pos[l.slug]; if (!p) return;
    var g = el("g", { class: "gnode" });
    var link = el("a"); link.setAttributeNS("http://www.w3.org/1999/xlink", "href", "lessons/" + l.slug + ".html");
    link.setAttribute("href", "lessons/" + l.slug + ".html");
    var c = el("circle", { cx: p.x, cy: p.y, r: 10, fill: modColor[l.module], opacity: visited[l.slug] ? 1 : .82 });
    if (visited[l.slug]) c.setAttribute("stroke", "#10b981"), c.setAttribute("stroke-width", "2.5");
    var num = el("text", { class: "gnum", x: p.x, y: p.y + 3.5, "text-anchor": "middle", fill: "#0c0b10", "font-weight": "800" });
    num.textContent = l.n;
    var lbl = el("text", { class: "glabel", x: p.x, y: p.y - 15, "text-anchor": "middle" });
    lbl.textContent = l.title.length > 26 ? l.title.slice(0, 24) + "…" : l.title;
    link.appendChild(c); link.appendChild(num); link.appendChild(lbl); g.appendChild(link);
    g._slug = l.slug;
    gRoot.appendChild(g); nodeEls.push(g);

    g.addEventListener("mouseenter", function () { highlight(l.slug); });
    g.addEventListener("mouseleave", clear);
  });

  function highlight(slug) {
    var keep = {}; keep[slug] = 1;
    edgeEls.forEach(function (ed) {
      if (ed._n.indexOf(slug) > -1) { ed.classList.remove("dim"); keep[ed._n[0]] = 1; keep[ed._n[1]] = 1; }
      else ed.classList.add("dim");
    });
    nodeEls.forEach(function (n) { n.classList.toggle("dim", !keep[n._slug]); });
  }
  function clear() { edgeEls.forEach(function (e) { e.classList.remove("dim"); }); nodeEls.forEach(function (n) { n.classList.remove("dim"); }); }

  // legend click -> highlight a whole module
  document.querySelectorAll(".legend span[data-mod]").forEach(function (s) {
    s.addEventListener("mouseenter", function () {
      var mid = s.getAttribute("data-mod"), keep = {};
      nodeEls.forEach(function (n) { keep[n._slug] = pos[n._slug].mod === mid; });
      nodeEls.forEach(function (n) { n.classList.toggle("dim", !keep[n._slug]); });
      edgeEls.forEach(function (e) { e.classList.toggle("dim", !(keep[e._n[0]] && keep[e._n[1]])); });
    });
    s.addEventListener("mouseleave", clear);
  });

  // pan + zoom (mouse drag/wheel, touch drag/pinch)
  var scale = 1, tx = 0, ty = 0, dragging = false, sx, sy;
  var pointers = {}, pinchDist = 0;
  function apply() { gRoot.setAttribute("transform", "translate(" + tx + "," + ty + ") scale(" + scale + ")"); }
  function zoomAt(px, py, f) {
    var ns = Math.min(2.5, Math.max(0.5, scale * f));
    var r = svg.getBoundingClientRect(), mx = (px - r.left) / r.width * W, my = (py - r.top) / r.height * H;
    tx = mx - (mx - tx) * (ns / scale); ty = my - (my - ty) * (ns / scale); scale = ns; apply();
  }
  svg.addEventListener("pointerdown", function (e) {
    pointers[e.pointerId] = e;
    dragging = true; sx = e.clientX - tx; sy = e.clientY - ty; svg.setPointerCapture(e.pointerId);
  });
  svg.addEventListener("pointermove", function (e) {
    if (pointers[e.pointerId]) pointers[e.pointerId] = e;
    var ids = Object.keys(pointers);
    if (ids.length === 2) { // pinch
      var a = pointers[ids[0]], b = pointers[ids[1]];
      var d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      if (pinchDist) zoomAt((a.clientX + b.clientX) / 2, (a.clientY + b.clientY) / 2, d / pinchDist);
      pinchDist = d;
      return;
    }
    if (!dragging) return; tx = e.clientX - sx; ty = e.clientY - sy; apply();
  });
  function lift(e) { delete pointers[e.pointerId]; pinchDist = 0; dragging = false; }
  svg.addEventListener("pointerup", lift);
  svg.addEventListener("pointercancel", lift);
  svg.addEventListener("wheel", function (e) {
    e.preventDefault();
    var f = e.deltaY < 0 ? 1.1 : 0.9, ns = Math.min(2.5, Math.max(0.5, scale * f));
    var r = svg.getBoundingClientRect(), mx = (e.clientX - r.left) / r.width * W, my = (e.clientY - r.top) / r.height * H;
    tx = mx - (mx - tx) * (ns / scale); ty = my - (my - ty) * (ns / scale); scale = ns; apply();
  }, { passive: false });

  function el(name, attrs) {
    var n = document.createElementNS(SVGNS, name);
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
})();
