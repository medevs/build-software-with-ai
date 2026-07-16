# Rules File — Starter Template

This is a starter template for your always-loaded rules file — the single markdown document at the root of your project that your coding agent reads at the start of every task (Lesson 22). Two things matter more than anything else: every rule must describe what your codebase *actually does* (never what you wish it did — brand-new projects are the one exception, where you write down what you've *decided*), and the file must stay lean, because it loads on every task whether it's relevant or not. Fill in the sections below, delete the guidance comments, and push anything long or situational into separate reference docs the agent opens only when needed.

<!-- Aim for well under a page. If a section grows long, that's your signal
     to move the detail into a separate reference doc and link to it. -->

## Project overview

<!-- Two or three sentences, maximum. What is this project, who is it for,
     and what does it do? Enough for the agent to orient, no more. -->

[Project name] is a [type of application] that [what it does] for [who uses it].

## Tech stack

<!-- Just the facts: language, framework, database, key libraries.
     Do NOT explain what these tools are — the agent already knows. -->

- Language: [e.g. TypeScript 5.x]
- Framework: [e.g. ...]
- Database: [e.g. ...]
- Testing: [e.g. ...]
- Other key libraries: [only the ones that shape how code is written here]

## Conventions

<!-- Only conventions that are (a) specific to THIS project and (b) true
     today — you should be able to point to code that follows each one.
     Never restate generic best practices the agent already knows. -->

- [e.g. All API input is validated at the route boundary using X]
- [e.g. Errors are logged with the structured logger in src/lib/log, never console]
- [e.g. Tests live next to the code they test, named *.test.ts]

## Architecture map — where new code goes

<!-- The highest-value section for day-to-day work: the handful of extension
     points where new work usually plugs in. It turns "I have no idea where
     to put this" into a five-second lookup. -->

- New API endpoint → [path / pattern to follow]
- New database change → [path / how migrations are done]
- New UI component → [path / pattern to follow]
- New integration with an external service → [path / pattern to follow]

## What NOT to do

<!-- The boundaries not to cross. Keep this to hard boundaries only —
     anything that "must never happen, no exceptions" is better enforced
     with a hook (Lesson 27) than a rule. -->

- Never edit [e.g. generated files / migration history / production config]
- Never [e.g. add a new dependency without flagging it first]
- Do not touch [e.g. the legacy /old-api directory — it is frozen]

---

<!-- Maintenance: this file is written once and stays mostly stable. After a
     chunk of new work lands, do a quick drift check — does the file still
     match what the code does today? Prune anything stale. A false rule is
     worse than no rule at all. -->
