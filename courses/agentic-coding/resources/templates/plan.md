# Implementation Plan — Template

This is the template for a one-pass-ready implementation plan (Lesson 11) — the document that turns a loose planning conversation into something a completely fresh agent could build from, with no memory of the conversation that produced it. The bar is the "no prior knowledge" test: if a fresh session would still need to ask questions before starting, the plan isn't done. Passing that test is exactly what makes it safe to clear context and implement in a brand-new session (Lesson 12).

## Goal

<!-- What this task is for, in plain terms. One short paragraph. -->

[What we're building and why, in one or two sentences.]

## Success criteria

<!-- What "done" means, concretely. Observable outcomes, not vibes. -->

- [ ] [e.g. A logged-in user can update their display name and see it persist after reload]
- [ ] [e.g. All existing tests still pass; new behavior is covered by tests]

## References & context

<!-- Real file paths, not descriptions. "The settings page" fails the test;
     src/routes/settings/profile.tsx passes it. Include the patterns the new
     code should follow and any constraints discovered during research. -->

- Files involved: [e.g. `src/routes/settings/profile.tsx`, `src/api/users.ts`]
- Pattern to follow: [e.g. mirror how `src/routes/settings/email.tsx` handles form save]
- Constraints: [e.g. must not change the shape of the `users` table; business rule X applies]
- Related docs: [link to the strategic doc / architecture doc / ticket this came from]

## Out of scope

<!-- Just as important as what's in. Name what this task deliberately does
     NOT touch, so the agent doesn't wander into adjacent work. -->

- Does not touch [e.g. billing or notification preferences]
- Does not [e.g. refactor the existing form components]

## Step-by-step tasks

<!-- The concrete list of changes, in an order that makes sense to build in.
     Each step should be small and checkable. -->

1. [First change — file, what changes, why]
2. [Second change]
3. [Third change]
4. [Add / update tests for the above]

## Validation strategy

<!-- The most important section — iterate on it the most. Exactly how the
     agent will prove, on its own, that the work is correct. Cheapest checks
     first (Lesson 13): lint/types → unit tests → integration → end-to-end. -->

1. Run [lint / type check command] — must pass clean.
2. Run [test command] — all tests pass, including the new ones.
3. [Integration check, if applicable]
4. End-to-end: [e.g. start the dev server, load the settings page, change the
   name, save, reload, and confirm the new name persists].

<!-- Bad version: "make sure it works." One-pass-ready version: the exact
     commands and the exact user-visible behavior to confirm. -->
