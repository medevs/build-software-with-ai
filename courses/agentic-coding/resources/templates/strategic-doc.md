# Strategic Doc — Template

This is the template for the strategic doc (Lesson 15) — the document at the very top of the planning stack. It captures intent: the problem, the users, the bet. It deliberately says nothing about *how* to build anything — no stack, no data model, no file layout. That belongs one altitude down, in the architecture decisions doc. Use the same sections, in the same order, every time: a repeatable shape beats a clever one, because it's what makes the doc quick to review, easy for an agent to ground later work in, and hard to skip something important. If you're starting something brand new this is your product requirements doc; if you're adding to something that exists, it's your epic — same shape, same job.

## Problem

<!-- What's actually broken or missing today? Plain language, no solutions. -->

[What's broken or missing, and for whom, in a few sentences.]

## Evidence

<!-- What makes you believe this, rather than just guess it? Usage data,
     support requests, observed behavior, prior feedback. If you have no
     evidence yet, say so honestly — that itself shapes the bet below. -->

- [e.g. 40% of support requests last quarter were about X]
- [e.g. Analytics show users abandon the flow at step 3]

## Falsifiable hypothesis

<!-- The bet, stated so reality can prove it wrong (Lesson 16):
     "We believe [this change] will cause [this measurable outcome]."
     Name the number AND the condition that would mean you were wrong.
     If nothing could ever prove it false, it's a wish, not a hypothesis. -->

We believe [this change] will cause [this measurable outcome, with a number].
If [the measurable outcome stays below / above X by Y date], we were wrong.

## Users

<!-- Who this is for — specifically enough that "everyone" is not a valid
     answer. -->

- Primary: [who, and in what situation they hit the problem]
- Secondary: [if any]

## Scope

<!-- What's explicitly IN for this pass. Keep it to the smallest slice that
     can test the hypothesis. -->

- [In-scope item 1]
- [In-scope item 2]

## Non-goals

<!-- Just as important: what you're deliberately leaving out, so nobody —
     human or agent — quietly expands the work. -->

- [Not doing X in this pass]
- [Not touching Y]

## Success metrics

<!-- How you'll know it worked. These should line up with the hypothesis
     above — intent and its testable bet belong together. -->

- [Metric, target, and when you'll check it]

## Open questions

<!-- Anything unresolved that downstream planning needs answered. -->

- [Question 1]

---

<!-- Remember why this doc earns its keep: every later plan — architecture,
     tickets, implementation — inherits its assumptions from here. A wrong
     guess about the user or about what "done" means doesn't cost one bad
     line of code; it cascades into wrong boundaries, wrong tickets, and
     hundreds of lines built confidently in the wrong direction. -->
