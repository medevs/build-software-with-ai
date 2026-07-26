# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two deliberately distinct audiences, one per course. The design must let a
newcomer self-select between them within seconds of landing.

- **Non-coder builders** — founders, PMs, designers, indie makers who are
  shipping real software with an AI agent but cannot read code. Their job is to
  *review and trust* what the AI produced: is this actually done, is it safe, is
  the data really saved. Served by **Software Sense**. They need plain English,
  concrete analogies, and language they can take back to a conversation with a
  developer or an agent.
- **Developers new to agentic work** — people who can already code but have no
  system for directing an AI agent. Their job is getting production-quality,
  repeatable results instead of almost-right guesses. Served by **The Agentic
  Coding Course**. They want method and rigor, not hand-holding.

Both read self-paced, in short sittings, on desktop and phone, with no account
and no cohort. Nobody is grading them; the only thing that keeps them going is
that reading it is worth the time.

## Product Purpose

Two free, self-paced courses that together take someone from "I have an idea"
to "it's live and I trust it." Software Sense teaches *what* good software
needs; The Agentic Coding Course teaches the *system* for building it reliably
with an AI agent. One gives judgment, the other gives method.

Success is a reader who finishes a lesson, comes back for the next one, and
shares the site.

## Positioning

Tool-agnostic and brand-free: no framework worship, no vendor lock-in, no
"install this CLI" — the mental models and the working system, which stay true
whichever agent the reader uses. The site itself is the proof: a genuinely
well-made reading experience built as plain static files, with no accounts and
no tracking, given away free.

## Operating Context

- Reading happens in short sittings (~5 min per lesson), interleaved with the
  reader's actual building work. Many readers arrive mid-course from a search
  result or a shared link, not from lesson 1.
- Readers move between the knowledge map (spatial orientation), the curriculum
  index (linear progress), and individual lessons.
- Resources (glossary, checklists, prompt pack, templates) are meant to be
  taken away and used next to real work; some are printed.
- Progress lives only in the reader's browser, so the experience must degrade
  gracefully for a first-time or private-mode visitor.

## Capabilities and Constraints

**Confirmed functionality:** landing page with course cards and
continue-where-you-left-off; per-course interactive knowledge map (pan, zoom,
fit, tooltips, tap-to-highlight, completed badges, module progress rings,
legend filter); curriculum index with per-module progress bars; 30 lessons per
course; inline self-check quizzes; scored end-of-module quiz pages with best-score
chips; client-side in-course search; rendered Markdown resource pages;
explicit mark-complete progress; reading-position bar; keyboard prev/next;
dark/light toggle with OS default; print styles; SEO and Open Graph per page.

**Hard technical constraints:**

- Plain HTML, CSS, and JS. No framework, no build step, no runtime
  dependencies, no external asset requests. Must work as static files served
  from GitHub Pages.
- One shared design system in `assets/` styles every page of every course.
- A course is defined by its `course.js` (`window.COURSE`: title, centerLines,
  modules, lessons, edges); the map and curriculum render from it. Adding a
  course is one entry in `assets/courses.js`.
- Generated data (`quiz-data.js`, `search-index.js`) comes from
  `node tools/quiz-data.mjs`; never hand-edit it.
- No accounts, no backend, no tracking. State is `localStorage` only.
- URLs are stable and indexed — routes and filenames must not change.

**Content constraints (standing, must never be broken):**

- The Agentic Coding Course never says "PIV" or "AI Layer" — always "the core
  loop" and "the context layer" — and names no brands, repos, or videos.
- Software Sense lessons always end with "Red flags to catch" and "Ask your AI"
  boxes before "Check yourself".

**Undecided:** content license; custom domain; whether analytics is ever added
(if so, anonymous page counts only, stated openly).

## Brand Commitments

- Name: **AI Builder Academy**. Course names: **Software Sense**, **The Agentic
  Coding Course**. Repo is `build-software-with-ai`; the name/branding split is
  a known, deliberately deferred decision.
- Voice: plain, direct, unhyped. Analogies over jargon. Short sentences. Never
  sells, never condescends, never pads.
- Each course carries its own accent color; the seven modules within a course
  each carry a color used consistently across map, curriculum, and lesson pills.

## Evidence on Hand

- Real content: 60 written lessons, two `course.js` manifests, harvested quiz
  data, and real resource files (glossary, checklists, prompt pack, templates)
  under `courses/*/resources/`.
- Generated Open Graph cards in `assets/og/`.
- `ROADMAP.md` records shipped and pending work and the working agreements.

No testimonials, no student numbers, no completion statistics, no press, no
customer logos, no revenue — none exist. Future work must not fabricate any of
them, and must not imply a cohort, an instructor, or a community larger than
the GitHub Discussions that exist.

## Product Principles

1. **Experience first.** A visitor on any page should think "this is really
   well made" and finish the lesson. Quality beats quantity.
2. **Free and open, honestly.** No paywall, no accounts, no tracking — and the
   footer says so plainly.
3. **Tool-agnostic and brand-free.** Teach the model and the method, never the
   vendor.
4. **Dependency-free forever.** Every new capability must survive as plain
   static files with no build step.
5. **Two tracks, one system.** Judgment and method are distinct courses that
   must feel like siblings, never like one product wearing two hats.

## Accessibility & Inclusion

Target WCAG 2.1 AA.

Readers include non-technical people, so plain language is an accessibility
requirement, not just a voice choice. Motion respects `prefers-reduced-motion`.
The knowledge map must remain keyboard-operable and must never be the only path
to a lesson — the curriculum index and in-course search are always available.

**Standing rule, learned the hard way:** every coloured ink exists twice — the
bare token fills (a field, a button, a filled bar, always with `#fff` type) and
the `-t` token writes (type, and any 1–3px rule, marker, or tick). Colouring
small caps with a fill token looks fine in light theme and drops to ~1.7:1 after
the dark-theme inversion. Never colour type or a thin indicator with a fill.

Shipped: skip-to-content link, `<main>` landmark, and named `<nav>`s on every
page; stable slug ids on lesson headings; keyboard-operable map legend; quiz
questions grouped and labelled; `aria-live` search results.
