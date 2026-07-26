# AI Builder Academy

A multi-course learning platform built as a plain static site — no frameworks, no build step,
no dependencies. Host it anywhere that serves files (GitHub Pages works out of the box).

## Courses

| Course | What it teaches |
|---|---|
| [Software Sense](courses/software-sense/index.html) | Plain-English software-engineering literacy for non-technical people — what good software needs, so you can review and ship better software with AI. |
| [The Agentic Coding Course](courses/agentic-coding/index.html) | A beginner-friendly, tool-agnostic system for getting reliable, production-quality results from AI coding agents. |

Each course: 30 lessons in 7 modules, an interactive knowledge map, a curriculum index,
self-check quizzes, and downloadable resources. Progress is stored in the browser (localStorage) only.

## Structure

```
PRODUCT.md            durable product truth (users, purpose, constraints)
DESIGN.md             the visual system, documented from the built site
index.html            landing page — renders course cards from assets/courses.js
assets/               the ONE shared design system + machinery
  site.css            all styles (light + dark, print) — opens with the direction contract
  diagram.css         the figure vocabulary every lesson draws from (no JS)
  graph.js            the interactive knowledge-map renderer
  quiz.js             the inline self-check widget
  quizpage.js         the scored end-of-module quiz
  progress.js         lesson pages: route rail, scroll-spy, completion, reading bar
  coursehome.js       course homes: legend, progress chip, "continue"
  curriculum.js       curriculum pages: progress chart + module blocks
  search.js           in-course lesson search
  md.js               the resource-page Markdown renderer
  courses.js          the course manifest the landing page renders from
courses/
  <course-id>/
    index.html        course home: monograph head + knowledge map
    curriculum.html   module/lesson index + progress chart (rendered from course.js)
    resources.html    downloadable resources (files live in resources/)
    course.js         single source of truth: window.COURSE {title, centerLines, modules, lessons, edges}
    lessons/          NN-slug.html — one page per lesson
    resources/        real resource files (markdown)
tools/
  quiz-data.mjs       regenerates quiz-data.js + search-index.js from the lessons
  redesign-*.mjs      the one-time chrome codemods (idempotent; safe to re-run)
```

## Drawing a diagram in a lesson

`assets/diagram.css` is the whole vocabulary — no JS, no dependencies, correct in light,
dark, and print. Wrap any of them in a numbered plate:

```html
<figure class="fig">
  <figcaption><b>What the reader should see</b></figcaption>
  <div class="fig-b"> … one diagram … </div>
  <p class="fig-n">Optional note under the rule.</p>
</figure>
```

The diagrams: `.dgm-stack` (layers) · `.dgm-flow` (a chain; add `.loop` plus
`data-return` for a cycle) · `.dgm-vs` (two options) · `.dgm-matrix` (2×2) ·
`.dgm-bars` (proportions) · `.dgm-scale` (a range with a marker) · `.dgm-tree`
(a question and its branches) · `.dgm-seq` (numbered stops) · `.dgm-anat`
(numbered callouts) · `.dgm-checks` (comparison matrix) · `.dgm-fact` (one big
number). Each takes `--f` to set its ink; it defaults to the page's module colour.
The file's header comment documents the markup for every one.

## Adding a course

1. Copy an existing folder under `courses/` as a starting shape.
2. Write its `course.js` (modules, lessons, edges) and its lessons.
3. Add one entry to `assets/courses.js` — the landing page picks it up automatically.

## Adding a lesson to a course

1. Add the lesson page under `lessons/` (copy a sibling for the skeleton).
2. Add its entry (and any conceptual edges) to the course's `course.js` —
   the map and curriculum render from that file.
