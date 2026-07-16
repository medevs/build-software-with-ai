# The Core Loop — Checklist

This is the four-step rhythm — Research, Plan, Implement, Validate — run on **one small task at a time** (Lessons 9–13). Print it, pin it, or keep it open until the rhythm is habit: handing an agent a whole feature at once is a passenger move; one task, one loop, is the driver move. Everything below is per task or ticket.

## Before you start

- [ ] The task is one granular, well-defined piece of work — not a whole
      feature, not a stack of unrelated changes bundled together.

## 1. Research — build the understanding the task needs

Research is a dial, not a switch: light for familiar ground, real effort for
anything new or vague.

- [ ] Gut-check: could I explain, in one or two sentences, exactly what part
      of the system this touches and why? (If not — research first.)
- [ ] Read the relevant code — the actual files involved, not just a summary.
- [ ] Check how a similar thing was built elsewhere in the project.
- [ ] Confirm the constraints: rules that can't be broken, data shapes that
      must be matched, business rules that apply.
- [ ] Get clear on what "done" concretely looks like for this task.

## 2. Plan — turn the conversation into an artifact

First a loose brain-dump conversation (let the agent research, propose
approaches, and ask *you* clarifying questions — multiple-choice ones are
fastest). Then convert it into a written plan.

- [ ] The plan states the goal and what success looks like.
- [ ] It names real file paths — not "the settings page" but the actual files.
- [ ] It lists task-by-task steps, in a sensible build order.
- [ ] It states what's explicitly out of scope.
- [ ] It has a concrete validation strategy — the section worth iterating on
      most.
- [ ] **The "no prior knowledge" test:** could a fresh agent that never saw
      the conversation implement this correctly from the document alone? If
      it would need to ask anything first, the plan isn't done.

## 3. Implement — fresh session, plan only

- [ ] Save the plan somewhere durable — it's your rollback point.
- [ ] Clear the conversation. The planning chat did its job; it's disposable.
- [ ] Open a brand-new session and hand it nothing but the plan. (No carrying
      over the brain-dump, the dead ends, or the rejected approaches — that's
      noise, not context, and long conversations degrade the agent well
      before its official limit.)

## 4. Validate — two separate questions, never one

**Does it work?** (validation — the agent checks and self-corrects, cheapest
checks first)

- [ ] Lint and type checks pass.
- [ ] Unit tests pass.
- [ ] Integration checks pass.
- [ ] End-to-end: the agent drives the real, running application the way a
      user would, and the whole path works.

**Is it built well?** (review — a genuinely fresh perspective)

- [ ] The review runs in a separate session (or subagent) that did not write
      the code — a student shouldn't grade their own exam.

**The human gate**

- [ ] You do your own manual check and look over the result. Every task ends
      at a human gate — it has to clear before anything merges or before
      dependent work moves forward.
