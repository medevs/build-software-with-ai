/* redesign-lessons.mjs — one-time structural codemod that moves all 60 lesson pages
   onto the "Data Sheet" lesson architecture: skip link, <main> landmark, labelled
   navs, the specification strip, and the three-track sheet with its route rail.

   Idempotent: a page already carrying class="lesson" is skipped. Fails loudly on any
   page whose shape it does not recognise rather than writing half a conversion.

   Run from the repo root:  node tools/redesign-lessons.mjs
*/
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// old tailwind-default pill colour -> the module ink token that replaced it
const INK = {
  "#818cf8": "m1", "#0ea5e9": "m2", "#10b981": "m3", "#f59e0b": "m4",
  "#ec4899": "m5", "#a78bfa": "m6", "#ef4444": "m7",
  // idempotency: a page already carrying the new inks maps to itself
  "#2b3a8f": "m1", "#0d6e8c": "m2", "#157347": "m3", "#a8480c": "m4",
  "#a82a68": "m5", "#5f3a9c": "m6", "#b8332a": "m7",
};
const COURSE = {
  "software-sense": { accent: "course-a", mark:
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='%232b3a8f'/><rect x='5' y='5' width='22' height='7' fill='%23fff'/><rect x='5' y='15' width='22' height='5' fill='%23fff' opacity='.65'/><rect x='5' y='23' width='22' height='4' fill='%23fff' opacity='.4'/></svg>" },
  "agentic-coding": { accent: "course-b", mark:
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='%23a8480c'/><rect x='5' y='5' width='22' height='6' fill='%23fff'/><rect x='5' y='14' width='14' height='6' fill='%23fff'/><rect x='5' y='23' width='18' height='4' fill='%23fff'/></svg>" },
};

let changed = 0, skipped = 0;
const problems = [];

for (const course of Object.keys(COURSE)) {
  const dir = join("courses", course, "lessons");
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".html"))) {
    const path = join(dir, file);
    let html = readFileSync(path, "utf8");
    if (html.includes('class="lesson"')) { skipped++; continue; }

    const fail = (why) => problems.push(`${path}: ${why}`);

    // ---- read what the page already knows about itself ----------------------
    const meta = html.match(
      /<div class="lesson-meta">\s*<span class="pill" style="background:(#[0-9a-f]{6})">Module (\d+) · ([^<]+)<\/span>\s*<span>Lesson (\d+) of (\d+)<\/span>[\s\S]*?<\/div>/
    );
    if (!meta) { fail("no recognisable .lesson-meta block"); continue; }
    const [metaBlock, oldHex, modN, modTitle, lessonN, lessonTotal] = meta;
    const ink = INK[oldHex.toLowerCase()];
    if (!ink) { fail(`unknown module colour ${oldHex}`); continue; }
    const { accent, mark } = COURSE[course];

    // ---- head --------------------------------------------------------------
    html = html.replace(
      /<link rel="icon" href="data:image\/svg\+xml,[^"]*">/,
      `<link rel="icon" href="data:image/svg+xml,${mark}">`
    );
    if (!html.includes("diagram.css"))
      html = html.replace(
        /(<link rel="stylesheet" href="(\.\.\/){3}assets\/site\.css">)/,
        '$1\n<link rel="stylesheet" href="../../../assets/diagram.css">'
      );
    html = html.replace('content="#faf9f6"', 'content="#ffffff"')
               .replace('content="#191813"', 'content="#0f1017"');

    // ---- body tag + skip link ---------------------------------------------
    const bodyTag = html.match(/<body data-lesson="([^"]+)">/);
    if (!bodyTag) { fail("no <body data-lesson>"); continue; }
    html = html.replace(
      bodyTag[0],
      `<body class="lesson" data-lesson="${bodyTag[1]}" ` +
      // two inks per role: the bare token fills, the -t token writes. See the
      // "two-ink rule" comment in site.css — this is what keeps small caps
      // legible after the dark-theme inversion.
      `style="--field:var(--${ink});--field-t:var(--${ink}t);` +
      `--accent:var(--${accent});--accent-t:var(--${accent}-t)">\n` +
      `<a class="skip" href="#main">Skip to content</a>`
    );

    // ---- nav: label it, drop the decorative separator, push links right ----
    html = html.replace('<nav class="topnav">', '<nav class="topnav" aria-label="Course">')
               .replace(/\s*<span class="navsep"><\/span>/, "")
               .replace(/(<a class="brand"[^>]*>[\s\S]*?<\/a>\n)/, '$1  <span class="spacer"></span>\n')
               .replace('title="AI Builder Academy - all courses">&#8962;',
                        'title="AI Builder Academy — all courses">⌂');

    // ---- the sheet: rail + main -------------------------------------------
    const rail =
`<div class="sheet">
  <aside class="rail" aria-label="Lesson navigation">
    <div class="rail-field">
      <span class="rail-mn">${String(modN).padStart(2, "0")}</span>
      <span class="rail-mt">${modTitle.trim()}</span>
    </div>
    <p class="rail-sec">On this page</p>
    <ul class="rail-toc" id="railtoc"></ul>
    <div class="rail-foot">
      <p class="rail-prog" id="railprog">Module ${modN}</p>
      <div class="rail-bar"><i id="railbar"></i></div>
      <a class="rail-jump" href="../curriculum.html">All ${lessonTotal} lessons →</a>
    </div>
  </aside>

  <main class="main" id="main">`;
    if (!html.includes('<div class="wrap">')) { fail("no .wrap container"); continue; }
    html = html.replace('<div class="wrap">', rail);

    // ---- the specification strip replaces the old meta line ----------------
    html = html.replace(metaBlock,
`<dl class="spec">
      <div><dt>Module</dt><dd><span class="pill">${modN} · ${modTitle.trim()}</span></dd></div>
      <div><dt>Lesson</dt><dd>${lessonN} of ${lessonTotal}</dd></div>
      <div><dt>Reading time</dt><dd id="rtime">~5 min</dd></div>
      <div><dt>Status</dt><dd class="v" id="lstatus">Not complete</dd></div>
    </dl>`);

    // ---- .steps was a <div> full of bare <li>s; make it a real list --------
    html = html.replace(/<div class="steps">([\s\S]*?)<\/div>/g, '<ol class="steps">$1</ol>');

    // ---- close the sheet, and give lessons the course data the rail needs --
    const tail = html.match(/<\/div>\s*\n+(<script src="(\.\.\/){3}assets\/progress\.js"><\/script>)/);
    if (!tail) { fail("no .wrap close before progress.js"); continue; }
    html = html.replace(tail[0],
      `</main>\n</div>\n\n<script src="../course.js"></script>\n${tail[1]}`);
    if (!html.includes("theme.js"))
      html = html.replace(/(<script src="(\.\.\/){3}assets\/quiz\.js"><\/script>)/,
                          '$1\n<script src="../../../assets/theme.js"></script>');

    writeFileSync(path, html);
    changed++;
  }
}

console.log(`rewritten: ${changed}   already done: ${skipped}`);
if (problems.length) {
  console.error(`\n${problems.length} page(s) NOT converted:`);
  problems.forEach((p) => console.error("  " + p));
  process.exit(1);
}
