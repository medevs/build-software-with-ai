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
index.html            landing page — renders course cards from assets/courses.js
assets/               the ONE shared design system + machinery
  site.css            all styles (light + dark, print)
  graph.js            the interactive knowledge-map renderer
  quiz.js             the self-check widget
  progress.js         marks lessons visited (localStorage)
  courses.js          the course manifest the landing page renders from
courses/
  <course-id>/
    index.html        course home: hero + knowledge map
    curriculum.html   module/lesson index (rendered from course.js)
    resources.html    downloadable resources (files live in resources/)
    course.js         single source of truth: window.COURSE {title, centerLines, modules, lessons, edges}
    lessons/          NN-slug.html — one page per lesson
    resources/        real resource files (markdown)
```

## Adding a course

1. Copy an existing folder under `courses/` as a starting shape.
2. Write its `course.js` (modules, lessons, edges) and its lessons.
3. Add one entry to `assets/courses.js` — the landing page picks it up automatically.

## Adding a lesson to a course

1. Add the lesson page under `lessons/` (copy a sibling for the skeleton).
2. Add its entry (and any conceptual edges) to the course's `course.js` —
   the map and curriculum render from that file.
