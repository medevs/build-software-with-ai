/* graph.js — renders the course knowledge graph as an interactive SVG mindmap.
   Deterministic layout: modules arranged on a ring, lessons clustered around each
   module hub. Auto fit-to-screen, pan + zoom (+ controls), hover/tap highlight with
   a tooltip card, completion rings per module, click-to-open. No dependencies. */
(function () {
  var C = window.COURSE, svg = document.getElementById("graph");
  if (!C || !svg) return;
  var SVGNS = "http://www.w3.org/2000/svg";
  var W = 1200, H = 820, cx = W / 2, cy = H / 2; // layout coordinate space
  var vw = W, vh = H;                             // viewBox, kept at element aspect

  var modColor = {}, modName = {};
  C.modules.forEach(function (m) { modColor[m.id] = m.color; modName[m.id] = m.n + ". " + m.title; });

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
  var doneByMod = {};
  C.lessons.forEach(function (l) { if (visited[l.slug]) doneByMod[l.module] = (doneByMod[l.module] || 0) + 1; });

  // wrap the svg so controls + tooltip can be positioned over it (no HTML changes needed)
  var wrap = document.createElement("div");
  wrap.className = "graph-wrap";
  svg.parentNode.insertBefore(wrap, svg);
  wrap.appendChild(svg);

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

  // module hubs: halo + completion ring + label
  C.modules.forEach(function (m) {
    var h = hub[m.id], total = (byMod[m.id] || []).length, done = doneByMod[m.id] || 0;
    var halo = el("circle", { cx: h.x, cy: h.y, r: 6, fill: m.color, opacity: .5 });
    gRoot.appendChild(halo);
    if (done > 0 && total > 0) {
      var r = 14, circ = 2 * Math.PI * r, arc = circ * done / total;
      gRoot.appendChild(el("circle", { cx: h.x, cy: h.y, r: r, fill: "none",
        stroke: "rgba(255,255,255,.14)", "stroke-width": 2.5 }));
      gRoot.appendChild(el("circle", { cx: h.x, cy: h.y, r: r, fill: "none",
        stroke: m.color, "stroke-width": 2.5, "stroke-linecap": "round",
        "stroke-dasharray": arc + " " + circ,
        transform: "rotate(-90 " + h.x + " " + h.y + ")" }));
    }
    var t = el("text", { class: "mod-title", x: h.x, y: h.y - 22, "text-anchor": "middle", "font-size": "13" });
    t.textContent = m.n + ". " + m.title.replace(/—.*/, "").trim();
    gRoot.appendChild(t);
  });
  var lines = C.centerLines || ["The", "Course"];
  var ctr = el("text", { x: cx, y: cy - 6, "text-anchor": "middle", "font-size": "22", fill: "#fff", "font-weight": "800", "font-family": "var(--sans)" });
  ctr.textContent = lines[0];
  var ctr2 = el("text", { x: cx, y: cy + 20, "text-anchor": "middle", "font-size": "22", fill: "#fff", "font-weight": "800", "font-family": "var(--sans)" });
  ctr2.textContent = lines[1] || "";
  gRoot.appendChild(ctr); gRoot.appendChild(ctr2);

  // "next up": first uncompleted lesson gets a gentle pulse (killed by reduced-motion CSS)
  var nextUp = C.lessons.filter(function (l) { return !visited[l.slug]; })
                        .sort(function (a, b) { return a.n - b.n; })[0];

  // nodes
  var nodeEls = [], selected = null, pinnedMod = null, lastPointerType = "mouse";
  C.lessons.forEach(function (l) {
    var p = pos[l.slug]; if (!p) return;
    var g = el("g", { class: "gnode" });
    var href = "lessons/" + l.slug + ".html";
    var link = el("a");
    link.setAttributeNS("http://www.w3.org/1999/xlink", "href", href);
    link.setAttribute("href", href);
    link.setAttribute("aria-label", "Lesson " + l.n + ": " + l.title + (visited[l.slug] ? " (completed)" : ""));
    if (nextUp && nextUp.slug === l.slug)
      g.appendChild(el("circle", { class: "gpulse", cx: p.x, cy: p.y, r: 16, stroke: modColor[l.module] }));
    var c = el("circle", { cx: p.x, cy: p.y, r: 10, fill: modColor[l.module], opacity: visited[l.slug] ? 1 : .82 });
    var num = el("text", { class: "gnum", x: p.x, y: p.y + 3.5, "text-anchor": "middle", fill: "#0c0b10", "font-weight": "800" });
    num.textContent = l.n;
    var lbl = el("text", { class: "glabel", x: p.x, y: p.y - 15, "text-anchor": "middle" });
    lbl.textContent = l.title.length > 26 ? l.title.slice(0, 24) + "…" : l.title;
    link.appendChild(c); link.appendChild(num); link.appendChild(lbl);
    if (visited[l.slug]) { // completed badge: small ✓ at the node's shoulder
      link.appendChild(el("circle", { cx: p.x + 8.5, cy: p.y - 8.5, r: 5.5, fill: "#10b981", stroke: "#0c0b10", "stroke-width": 1 }));
      var ck = el("text", { x: p.x + 8.5, y: p.y - 5.8, "text-anchor": "middle", "font-size": "8", "font-weight": "900", fill: "#04140d" });
      ck.textContent = "✓"; ck.setAttribute("class", "gnum");
      link.appendChild(ck);
    }
    g.appendChild(link);
    g._slug = l.slug;
    gRoot.appendChild(g); nodeEls.push(g);

    g.addEventListener("mouseenter", function () { if (!selected) { cancelHide(); highlight(l.slug); showTip(l.slug, false); } });
    g.addEventListener("mouseleave", function () { if (!selected) scheduleHide(); });
    link.addEventListener("focus", function () { highlight(l.slug); showTip(l.slug, false); });
    link.addEventListener("blur", function () { if (!selected) { restore(); hideTip(); } });
    link.addEventListener("click", function (e) {
      if (moved) { e.preventDefault(); return; }           // it was a pan, not a tap
      if (lastPointerType === "touch" && selected !== l.slug) {
        e.preventDefault();                                 // first tap: highlight + tooltip
        selected = l.slug;
        nodeEls.forEach(function (n) { n.classList.toggle("sel", n._slug === l.slug); });
        highlight(l.slug); showTip(l.slug, true);
      }
    });
  });

  function highlight(slug) {
    var keep = {}; keep[slug] = 1;
    edgeEls.forEach(function (ed) {
      if (ed._n.indexOf(slug) > -1) { ed.classList.remove("dim"); keep[ed._n[0]] = 1; keep[ed._n[1]] = 1; }
      else ed.classList.add("dim");
    });
    nodeEls.forEach(function (n) { n.classList.toggle("dim", !keep[n._slug]); });
  }
  function highlightModule(mid) {
    nodeEls.forEach(function (n) { n.classList.toggle("dim", pos[n._slug].mod !== mid); });
    edgeEls.forEach(function (e) { e.classList.toggle("dim", !(pos[e._n[0]].mod === mid && pos[e._n[1]].mod === mid)); });
  }
  function clearDim() { edgeEls.forEach(function (e) { e.classList.remove("dim"); }); nodeEls.forEach(function (n) { n.classList.remove("dim"); }); }
  function restore() { pinnedMod ? highlightModule(pinnedMod) : clearDim(); }
  function deselect() {
    selected = null;
    nodeEls.forEach(function (n) { n.classList.remove("sel"); });
    restore(); hideTip();
  }

  // tooltip card
  var tip = document.createElement("div");
  tip.className = "gtip"; tip.hidden = true;
  tip.innerHTML = '<span class="gtip-mod"></span><span class="gtip-done" hidden>✓ completed</span>' +
                  '<p class="gtip-t"></p><p class="gtip-b"></p><a class="gtip-open">Open lesson →</a>';
  wrap.appendChild(tip);
  // grace period so the pointer can travel from a node onto the card (to click "Open lesson")
  var hideTimer = null;
  function cancelHide() { clearTimeout(hideTimer); hideTimer = null; }
  function scheduleHide() {
    cancelHide();
    hideTimer = setTimeout(function () { restore(); hideTip(); }, 300);
  }
  tip.addEventListener("mouseenter", cancelHide);
  tip.addEventListener("mouseleave", function () { if (!selected) scheduleHide(); });
  function showTip(slug, touch) {
    var p = pos[slug], l = p.l;
    tip.querySelector(".gtip-mod").textContent = modName[p.mod];
    tip.querySelector(".gtip-mod").style.background = modColor[p.mod];
    tip.querySelector(".gtip-done").hidden = !visited[slug];
    tip.querySelector(".gtip-t").textContent = l.n + " · " + l.title;
    tip.querySelector(".gtip-b").textContent = l.blurb || "";
    tip.querySelector(".gtip-open").setAttribute("href", "lessons/" + slug + ".html");
    tip.classList.toggle("touch", !!touch);
    tip.hidden = false;
    var r = svg.getBoundingClientRect(), k = r.width / vw;
    var x = (p.x * scale + tx) * k + 14, y = (p.y * scale + ty) * k + 14;
    x = Math.max(6, Math.min(x, r.width - tip.offsetWidth - 6));
    y = Math.max(6, Math.min(y, r.height - tip.offsetHeight - 6));
    tip.style.left = x + "px"; tip.style.top = y + "px";
  }
  function hideTip() { tip.hidden = true; }

  // legend: hover previews a module, click pins it; show completion counts
  document.querySelectorAll(".legend span[data-mod]").forEach(function (s) {
    var mid = s.getAttribute("data-mod");
    var done = doneByMod[mid] || 0, total = (byMod[mid] || []).length;
    if (done > 0) {
      var em = document.createElement("em");
      em.textContent = done + "/" + total + " ✓";
      s.appendChild(em);
    }
    s.addEventListener("mouseenter", function () { if (!selected) highlightModule(mid); });
    s.addEventListener("mouseleave", function () { if (!selected) restore(); });
    s.addEventListener("click", function () {
      deselect();
      pinnedMod = pinnedMod === mid ? null : mid;
      document.querySelectorAll(".legend span[data-mod]").forEach(function (o) {
        o.classList.toggle("on", o.getAttribute("data-mod") === pinnedMod);
      });
      restore();
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      pinnedMod = null;
      document.querySelectorAll(".legend span.on").forEach(function (o) { o.classList.remove("on"); });
      deselect();
    }
  });

  // pan + zoom (mouse drag/wheel, touch drag/pinch) + fit-to-screen
  var scale = 1, tx = 0, ty = 0, dragging = false, sx, sy, dx0, dy0, moved = false;
  var pointers = {}, pinchDist = 0;
  function apply() { gRoot.setAttribute("transform", "translate(" + tx + "," + ty + ") scale(" + scale + ")"); }
  function zoomAt(px, py, f) {
    var ns = Math.min(2.5, Math.max(0.3, scale * f));
    var r = svg.getBoundingClientRect(), mx = (px - r.left) / r.width * vw, my = (py - r.top) / r.height * vh;
    tx = mx - (mx - tx) * (ns / scale); ty = my - (my - ty) * (ns / scale); scale = ns; apply();
  }
  function contentBox() {
    var xs = [], ys = [];
    Object.keys(pos).forEach(function (k) { xs.push(pos[k].x); ys.push(pos[k].y); });
    Object.keys(hub).forEach(function (k) { xs.push(hub[k].x); ys.push(hub[k].y); });
    var pad = 85; // room for labels around outer nodes
    var x0 = Math.min.apply(null, xs) - pad, x1 = Math.max.apply(null, xs) + pad;
    var y0 = Math.min.apply(null, ys) - pad, y1 = Math.max.apply(null, ys) + pad;
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  }
  function fit() {
    var r = svg.getBoundingClientRect();
    if (!r.width || !r.height) return;
    vw = W; vh = Math.max(300, Math.round(W * r.height / r.width));
    svg.setAttribute("viewBox", "0 0 " + vw + " " + vh);
    var b = contentBox();
    scale = Math.min(2.5, Math.max(0.3, Math.min(vw / b.w, vh / b.h)));
    tx = (vw - b.w * scale) / 2 - b.x * scale;
    ty = (vh - b.h * scale) / 2 - b.y * scale;
    apply(); hideTip();
  }
  svg.addEventListener("pointerdown", function (e) {
    lastPointerType = e.pointerType || "mouse";
    pointers[e.pointerId] = e;
    dragging = true; moved = false;
    sx = e.clientX - tx; sy = e.clientY - ty; dx0 = e.clientX; dy0 = e.clientY;
    try { svg.setPointerCapture(e.pointerId); } catch (err) {}
  });
  svg.addEventListener("pointermove", function (e) {
    if (pointers[e.pointerId]) pointers[e.pointerId] = e;
    var ids = Object.keys(pointers);
    if (ids.length === 2) { // pinch
      var a = pointers[ids[0]], b = pointers[ids[1]];
      var d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      if (pinchDist) zoomAt((a.clientX + b.clientX) / 2, (a.clientY + b.clientY) / 2, d / pinchDist);
      pinchDist = d; moved = true;
      return;
    }
    if (!dragging) return;
    if (Math.hypot(e.clientX - dx0, e.clientY - dy0) > 6) { moved = true; hideTip(); }
    if (!moved) return;
    tx = e.clientX - sx; ty = e.clientY - sy; apply();
  });
  function lift(e) { delete pointers[e.pointerId]; pinchDist = 0; dragging = false; }
  svg.addEventListener("pointerup", lift);
  svg.addEventListener("pointercancel", lift);
  svg.addEventListener("wheel", function (e) { e.preventDefault(); hideTip(); zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.1 : 0.9); }, { passive: false });
  // tap/click on empty canvas clears the selection
  svg.addEventListener("click", function (e) { if (!moved && e.target === svg) deselect(); });

  // control cluster: zoom in / out / fit
  var ctrls = document.createElement("div");
  ctrls.className = "graph-controls";
  [["+", "Zoom in", function () { var r = svg.getBoundingClientRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, 1.3); }],
   ["−", "Zoom out", function () { var r = svg.getBoundingClientRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, 0.77); }],
   ["⤢", "Fit map to screen", fit]
  ].forEach(function (b) {
    var btn = document.createElement("button");
    btn.type = "button"; btn.textContent = b[0]; btn.setAttribute("aria-label", b[1]); btn.title = b[1];
    btn.addEventListener("click", function () { hideTip(); b[2](); });
    ctrls.appendChild(btn);
  });
  wrap.appendChild(ctrls);

  // initial fit + refit on resize
  fit();
  var rzt;
  window.addEventListener("resize", function () { clearTimeout(rzt); rzt = setTimeout(fit, 150); });

  function el(name, attrs) {
    var n = document.createElementNS(SVGNS, name);
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
})();
