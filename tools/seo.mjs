/* seo.mjs — one-off (re-runnable) SEO generator for the static site.
   Run from the repo root:  node tools/seo.mjs
   Injects a marker-delimited <head> block into every HTML page (unique meta
   description, canonical, Open Graph/Twitter, theme-color, theme pre-paint
   snippet, JSON-LD) and writes sitemap.xml + robots.txt. Idempotent: re-run
   after adding lessons or editing blurbs and only real changes show in git.
   The deployment base URL lives in BASE below — update it (and re-run) if the
   site ever moves to a custom domain. */
import fs from "node:fs";
import path from "node:path";

const BASE = "https://medevs.github.io/build-software-with-ai/";
const SITE = "AI Builder Academy";

const COURSES = {
  "agentic-coding": {
    name: "The Agentic Coding Course",
    desc: "A free, beginner-friendly, tool-agnostic course on building a system around your AI coding agent — 30 lessons on planning, context, and validation so it ships production-quality software.",
    curriculum: "All 30 lessons of The Agentic Coding Course in 7 modules — from why AI coding needs a system to putting it to work on real code this week.",
    resources: "Templates, worked examples, and checklists from The Agentic Coding Course — rules files, plan templates, skills, subagents, and hooks to copy into your own project.",
    viewer: "Read the course resources — templates, examples, and checklists — as styled pages, with raw Markdown downloads.",
    og: "assets/og/agentic-coding.png",
  },
  "software-sense": {
    name: "Software Sense",
    desc: "A free, plain-English course on software literacy for people who build with AI — 30 lessons on data, security, testing, and deployment so you can judge what your AI ships.",
    curriculum: "All 30 lessons of Software Sense in 7 modules — the plain-English software-engineering literacy that lets a non-coder ship with confidence.",
    resources: "The take-anywhere companions to Software Sense — a pre-ship checklist, plain-English glossary, red-flag reference, and ready-to-use AI review prompts.",
    viewer: "Read the course resources — the checklist, glossary, and prompt pack — as styled pages, with raw Markdown downloads.",
    og: "assets/og/software-sense.png",
  },
};
const LANDING_DESC = "Two free, self-paced courses for building real software with AI: Software Sense teaches what good software needs; The Agentic Coding Course teaches the system for building it reliably with an AI agent.";

const root = process.cwd();
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function loadCourse(dir) {
  const src = fs.readFileSync(path.join(root, "courses", dir, "course.js"), "utf8");
  const window = {};
  new Function("window", src)(window);
  return window.COURSE;
}

function pageUrl(rel) {
  rel = rel.replace(/\\/g, "/");
  if (rel === "index.html") return BASE;
  return BASE + rel.replace(/(^|\/)index\.html$/, "$1");
}

function titleOf(html, file) {
  const m = html.match(/<title>([^<]*)<\/title>/);
  if (!m) throw new Error("no <title> in " + file);
  return m[1];
}

function block(rel, html, { desc, type = "website", og, jsonld, extra = [] }) {
  const url = pageUrl(rel);
  const title = titleOf(html, rel);
  const tags = [
    `<meta name="description" content="${esc(desc)}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:site_name" content="${esc(SITE)}">`,
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(desc)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${BASE}${og}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="theme-color" content="#faf9f6" media="(prefers-color-scheme: light)">`,
    `<meta name="theme-color" content="#191813" media="(prefers-color-scheme: dark)">`,
    // apply a stored dark/light choice before first paint (theme.js adds the toggle)
    `<script>try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}</script>`,
    ...extra,
  ];
  if (jsonld) tags.push(`<script type="application/ld+json">${JSON.stringify(jsonld)}</script>`);
  return tags.join("\n");
}

function inject(rel, opts) {
  const file = path.join(root, rel);
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/\n?<!-- seo:start -->[\s\S]*?<!-- seo:end -->\n?/, "\n");
  html = html.replace(/<meta name="description"[^>]*>\n?/, ""); // script owns descriptions now
  const b = "<!-- seo:start -->\n" + block(rel, html, opts) + "\n<!-- seo:end -->\n";
  html = html.replace(/<\/head>/, b + "</head>");
  fs.writeFileSync(file, html);
  return pageUrl(rel);
}

const urls = [];

// landing
urls.push(inject("index.html", {
  desc: LANDING_DESC,
  og: "assets/og/default.png",
  jsonld: { "@context": "https://schema.org", "@type": "WebSite", name: SITE, url: BASE, description: LANDING_DESC },
}));

for (const [dir, c] of Object.entries(COURSES)) {
  const course = loadCourse(dir);
  const courseUrl = pageUrl(`courses/${dir}/index.html`);

  urls.push(inject(`courses/${dir}/index.html`, {
    desc: c.desc, og: c.og,
    jsonld: {
      "@context": "https://schema.org", "@type": "Course",
      name: c.name, description: c.desc, url: courseUrl,
      provider: { "@type": "Organization", name: SITE, url: BASE },
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
      hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT3H" },
    },
  }));
  urls.push(inject(`courses/${dir}/curriculum.html`, { desc: c.curriculum, og: c.og }));
  urls.push(inject(`courses/${dir}/resources.html`, { desc: c.resources, og: c.og }));
  inject(`courses/${dir}/resource.html`, { desc: c.viewer, og: c.og }); // viewer: not in sitemap itself

  for (const l of course.lessons) {
    urls.push(inject(`courses/${dir}/lessons/${l.slug}.html`, {
      desc: `${l.blurb} — lesson ${l.n} of 30 in ${c.name}, free and self-paced.`,
      type: "article", og: c.og,
      extra: [`<script src="../../../assets/theme.js" defer></script>`],
      jsonld: {
        "@context": "https://schema.org", "@type": "Article",
        headline: l.title,
        description: l.blurb,
        isPartOf: { "@type": "Course", name: c.name, url: courseUrl },
      },
    }));
  }

  // shareable resource pages (rendered by the viewer)
  for (const f of walkMd(path.join(root, "courses", dir, "resources"))) {
    urls.push(pageUrl(`courses/${dir}/resource.html`) + "?f=" + f);
  }
}

function walkMd(dirPath) {
  const out = [];
  (function rec(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) rec(p);
      else if (e.name.endsWith(".md")) out.push(path.relative(path.dirname(dirPath), p).replace(/\\/g, "/"));
    }
  })(dirPath);
  return out.sort();
}

// sitemap.xml + robots.txt
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${u.replace(/&/g, "&amp;")}</loc><lastmod>${today}</lastmod></url>`).join("\n") +
  `\n</urlset>\n`);
fs.writeFileSync(path.join(root, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${BASE}sitemap.xml\n`);

console.log(`Injected SEO into pages; sitemap.xml has ${urls.length} URLs.`);
