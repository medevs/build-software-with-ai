# Architecture Decisions — Template

This is the template for the architecture decisions doc (Lessons 17–18) — the twin of the strategic doc, one altitude down. Where the strategic doc says what and why, this one records the shape of the solution: the stack, the key components, how data flows, and where the work plugs into what already exists. It deliberately stops one level above implementation — it records decisions ("we'll add a new adapter here, following the existing pattern"), never pseudocode or file-by-file task lists; that comes later, per ticket. Ground every decision in the real codebase: a decision made in the abstract is a guess wearing a suit.

## Context

<!-- What we're deciding and why now. Link the strategic doc this serves,
     and name the parts of the existing codebase this touches — its real
     structure, established patterns, and the seams new code is meant to
     plug into. -->

- Strategic doc: [link]
- Relevant existing code: [areas / patterns / seams this work touches]

## Options considered

<!-- The two or three real approaches you weighed, briefly, so the final
     call has visible reasoning behind it instead of appearing from nowhere. -->

### Option A: [name]

- How it works: [one or two sentences]
- Pros: [...]
- Cons: [...]

### Option B: [name]

- How it works: [...]
- Pros: [...]
- Cons: [...]

## Decision & reasoning

<!-- The approach you're committing to: stack, key components, and how data
     moves between them — and WHY it beat the alternatives. -->

We will [chosen approach], because [reasoning against the options above].

- Key components: [...]
- Data flow: [where data enters, how it moves, where it lands]
- Integration points: [the existing seams this plugs into — prefer known
  extension points over inventing new ones; if something new must be
  invented, call it out explicitly as a decision]

## Reversibility — door check

<!-- Sort the calls above by door type (Lesson 18). Two-way doors are cheap
     to undo: decide fast, move on, don't re-debate them. One-way doors are
     expensive or impossible to undo — a schema change that ripples through
     the API and downstream consumers, a boundary a dozen pieces of code
     will depend on. Those get real deliberation. -->

| Decision | Door type | If wrong, undoing it costs... |
|---|---|---|
| [e.g. library choice for X] | Two-way | [a small, contained change] |
| [e.g. shared schema change] | One-way | [re-touching everything built on it] |

## Risks & spikes

<!-- For each genuine one-way door: what's the riskiest assumption, and can
     a spike test it cheaply first? A spike is deliberately small — just
     enough real code to prove or disprove the risky part, not a feature.
     Whatever needs a spike is usually the least certain part of the plan,
     which makes it doubly worth doing early. -->

- Risk: [assumption that could sink this] → Spike: [smallest proof-of-concept
  that would confirm or kill it]

---

<!-- Why decide all this before slicing tickets: every ticket that comes out
     of this work inherits the same shape — same stack, same boundaries,
     same conventions — instead of each one quietly reinventing its own.
     That's what keeps separately-implemented pieces compatible later. -->
