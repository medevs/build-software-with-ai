/* redesign-pages.mjs — the same chrome conversion as redesign-lessons.mjs, for the
   course pages that aren't lessons (resources.html, resource.html, quiz.html):
   skip link, <main> landmark, labelled nav, course ink, the new mark.

   Idempotent: a page already carrying a .skip link is skipped.
   Run from the repo root:  node tools/redesign-pages.mjs
*/
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const COURSE = {
  "software-sense": { accent: "course-a", mark:
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='%232b3a8f'/><rect x='5' y='5' width='22' height='7' fill='%23fff'/><rect x='5' y='15' width='22' height='5' fill='%23fff' opacity='.65'/><rect x='5' y='23' width='22' height='4' fill='%23fff' opacity='.4'/></svg>" },
  "agentic-coding": { accent: "course-b", mark:
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='%23a8480c'/><rect x='5' y='5' width='22' height='6' fill='%23fff'/><rect x='5' y='14' width='14' height='6' fill='%23fff'/><rect x='5' y='23' width='18' height='4' fill='%23fff'/></svg>" },
};
const PAGES = ["resources.html", "resource.html", "quiz.html"];

let changed = 0, skipped = 0;
const problems = [];

for (const [course, { accent, mark }] of Object.entries(COURSE)) {
  for (const page of PAGES) {
    const path = join("courses", course, page);
    if (!existsSync(path)) continue;
    let html = readFileSync(path, "utf8");
    if (html.includes('class="skip"')) { skipped++; continue; }

    html = html
      .replace(/<link rel="icon" href="data:image\/svg\+xml,[^"]*">/,
               `<link rel="icon" href="data:image/svg+xml,${mark}">`)
      .replace('content="#faf9f6"', 'content="#ffffff"')
      .replace('content="#191813"', 'content="#0f1017"')
      // two inks per role: the bare token fills, the -t token writes (site.css)
      .replace("<body>",
               `<body style="--field:var(--${accent});--field-t:var(--${accent}-t);` +
               `--accent:var(--${accent});--accent-t:var(--${accent}-t)">\n` +
               `<a class="skip" href="#main">Skip to content</a>`)
      .replace('<nav class="topnav">', '<nav class="topnav" aria-label="Course">')
      .replace(/\s*<span class="navsep"><\/span>/, "")
      .replace(/(<a class="brand"[^>]*>[\s\S]*?<\/a>\n)/, '$1  <span class="spacer"></span>\n')
      .replace('title="AI Builder Academy - all courses">&#8962;',
               'title="AI Builder Academy — all courses">⌂');

    if (!html.includes('<div class="wrap">')) { problems.push(`${path}: no .wrap`); continue; }
    // index pages get the wide sheet; their prose still holds the measure
    const wide = page === "resources.html" ? " wide" : "";
    html = html.replace('<div class="wrap">', `<main class="wrap${wide}" id="main">`);
    // close the container that used to be a div
    const tail = html.match(/<\/div>\s*\n+(<script)/);
    if (!tail) { problems.push(`${path}: no .wrap close`); continue; }
    html = html.replace(tail[0], `</main>\n\n${tail[1]}`);

    // the quiz page renders diagram-styled score blocks; give it the figure sheet too
    if (page === "quiz.html" && !html.includes("diagram.css"))
      html = html.replace(/(<link rel="stylesheet" href="\.\.\/\.\.\/assets\/site\.css">)/,
                          '$1\n<link rel="stylesheet" href="../../assets/diagram.css">');

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
