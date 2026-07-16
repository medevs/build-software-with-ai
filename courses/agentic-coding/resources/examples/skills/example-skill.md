# Example Skill: Pre-Commit Review

A skill is a repeatable workflow packaged under a name you can trigger (Lesson 23) — you write the steps down once, and from then on you say the skill's name instead of re-explaining the routine. This example is a pre-commit review: a quick, consistent quality pass the agent runs over your uncommitted changes before anything gets committed. It's a good first skill because almost every project needs it, it runs the same way every time, and — like most skills — it travels cleanly from one project to the next.

## Name

`pre-commit-review`

## When to use

<!-- This is the "always visible" part: a short description the agent sees
     up front, so it knows when the skill is relevant without loading the
     full instructions. That's progressive disclosure — the reason you can
     keep dozens of skills around at no real cost. -->

Run this after finishing a chunk of work and before committing it. It reviews
the current uncommitted changes for problems worth fixing now, while they're
still cheap to fix.

## Instructions the agent follows

<!-- This is the "loaded on demand" part: the full step-by-step routine,
     read only when the skill is actually invoked. Same checks, same order,
     same output shape, every time. -->

1. **List the changes.** Get the set of modified, added, and deleted files in
   the working tree. If there are no changes, say so and stop.
2. **Run the cheap checks first.** Run the project's linter and type checker
   (find the commands in the rules file or the project's scripts). Report any
   failures before going further.
3. **Read the diff, file by file.** For each changed file, look for:
   - Logic that doesn't match what the change was supposed to do
   - Leftover debug output, commented-out code, or TODOs added in this change
   - Secrets, keys, or credentials accidentally included
   - Changes to files unrelated to the task (scope creep)
4. **Check the tests.** Confirm the change is covered: new behavior has new
   tests, and the existing test suite passes.
5. **Write the result in this shape, every time:**
   - **Verdict:** ready to commit / fix these first
   - **Must fix:** numbered list (empty if none)
   - **Worth considering:** smaller suggestions, clearly optional
6. **Do not commit anything.** This skill only reviews; committing is a
   separate, human-approved step.

## Why this shape works

The value isn't saved typing — it's that the review happens the *same way*
every time, instead of drifting a little each time you explain it under time
pressure. Consistency is what makes a workflow trustworthy enough to stop
watching closely.
