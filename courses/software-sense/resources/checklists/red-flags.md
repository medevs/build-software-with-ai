# The Red-Flag Collection

Every "Red flags to catch" warning from all 30 lessons, gathered in one place and grouped by area. A red flag doesn't always mean disaster — it means *stop and ask a question before going further*. Skim the area that matches what you're doing (data, security, shipping, AI output...), and if any bullet describes your situation, that's your cue to dig in. Each group cites the lesson it comes from, so you can jump back for the full explanation.

## How software works

**Fundamentals (Lesson 1)**
- You (or the AI) call it "done" before anyone ever said what "done" should mean.
- It worked once in a quick test, and that gets treated as proof it's ready for real users.
- You can't explain, in one plain sentence, what a piece of the software is *for*.

**The stack: frontend, backend, database (Lesson 2)**
- Someone shows you a slick screen and calls the feature "done" — but nothing was actually saved anywhere.
- You can't say whether a rule ("only admins can do this") lives in the frontend or the backend — if it's only in the frontend, it's not really enforced.
- "It works on my machine" with no mention of where the data is actually stored.

**Client, server & APIs (Lesson 3)**
- "It's not our servers' fault" said with no actual evidence of where the request failed.
- A feature that works fine for the builder but is never tested on a slow or unreliable connection.
- An API that will quietly accept requests it was never designed to handle safely.

**Dependencies (Lesson 4)**
- Nobody can tell you roughly how many dependencies the project relies on, or when they were last updated.
- A new dependency gets added for something trivial that a few lines of custom code could have done.
- "It's just a library, it's fine" as the entire justification for trusting a piece of borrowed code.

**Version control & the codebase (Lesson 5)**
- Changes are being made with no version control at all — no history, no undo.
- "I already fixed it" with no clarity on whether that fix is only on a local copy or actually live for users.
- Nobody can tell you what changed between "it worked yesterday" and "it's broken today."

## Data

**Databases (Lesson 6)**
- The AI stores real user data only in memory or in a plain file with no database at all, "for now."
- Nobody can tell you which table a piece of information — like a user's order history — actually lives in.
- The app lets you save something the data clearly shouldn't allow, like an order with no customer.

**Data modeling (Lesson 7)**
- Nobody can describe, in one sentence, how two of the app's main things (like users and orders) relate.
- The model has a fixed number of "slots" for something that's naturally unlimited (book_1, book_2, book_3...).
- A small new feature request ("let a user save multiple addresses") suddenly requires reshaping existing tables.

**State & storage (Lesson 8)**
- Something the user would expect to survive closing the app — a cart, a draft, a setting — is only ever kept in memory or a session.
- Sensitive information (like a full card number) is kept around in storage longer than it needs to be.
- Nobody can tell you, for a given piece of data, which of the four places (database, session, file, memory) it actually lives.

**Migrations & backups (Lesson 9)**
- A change to the database's shape gets run directly on real user data with no test first.
- Backups exist "in theory," but no one has ever actually restored one to check it works.
- "We'll add backups later" is said about an app that already has real users on it.

## Correctness & testing

**Requirements & edge cases (Lesson 10)**
- The feature was declared "done" the moment the happy path worked once.
- Nobody can name what happens on an empty, duplicate, or malicious input — because nobody asked.
- The requirement only exists in your head, not written anywhere the AI or a teammate can see it.

**Testing (Lesson 11)**
- "It looked right when I tried it" is being treated as equivalent to "there's a test for it."
- New features get added with no mention of tests for the edge cases.
- Nobody re-runs the tests after a change — they were only ever run once, at the start.

**Bugs & debugging (Lesson 12)**
- A fix gets applied for a bug nobody could actually reproduce first.
- Bug reports say only "it's broken" with no steps, expected result, or actual result.
- A bug gets called "fixed" with no test added, so it could silently return unnoticed.

**Code review (Lesson 13)**
- Nobody asked the AI to explain its own work in plain English before it shipped.
- The explanation you got was vague, and you accepted it anyway instead of asking again.
- The only thing reviewed was whether it ran — not whether it was correct, clear, and safe.

## Security & privacy

**The security mindset (Lesson 14)**
- The plan for "what if someone tries to abuse this" is "we'll deal with it if it happens."
- One tool, login, or service has far more access than the task in front of it actually requires.
- There's exactly one layer of protection, and if it fails, everything is exposed at once.

**Login & permissions (Lesson 15)**
- A page or action checks "are you logged in?" but never checks "is this your data?"
- Passwords appear anywhere in the database, logs, or code in plain, readable form.
- Every logged-in user, regardless of role, can reach admin-only pages or actions.

**Secrets & keys (Lesson 16)**
- A real API key, password, or token appears directly inside a code file.
- The project's repository is public and nobody has checked it for secrets before pushing.
- A leaked key was quietly replaced, but the old one was never actually disabled ("revoked").

**Common vulnerabilities (Lesson 17)**
- User-typed text gets combined directly into a command or lookup without being checked first.
- Changing an ID number in a web address shows you information that isn't yours.
- Content one user submits (a comment, a bio) is shown to other users without being checked or cleaned first.

**Privacy & user data (Lesson 18)**
- A form collects information (birthday, address, phone) that this particular feature doesn't actually need.
- Users have no clear way to see, correct, or delete the personal data the app holds on them.
- Sensitive data (health, payment) is stored or handled with no more care than an ordinary comment field.

## Running it in the real world

**Environments (Lesson 19)**
- Someone says "let's just try it in production, it's quick" — for anything touching real user data.
- There's no staging environment at all, so every change's first real test is with live users.
- Staging is so out of date or different from production that passing tests there doesn't mean much.

**Deployment (Lesson 20)**
- Deploying means someone manually copying files with no automated checks in between.
- Every change goes out to 100% of users immediately, with no gradual rollout or way to watch first.
- Nobody can explain, in one sentence, what actually happens between "change is ready" and "users see it."

**Monitoring & logs (Lesson 21)**
- Nobody knows whether the software is healthy right now without asking a user first.
- There are no logs at all, so a problem can never be reconstructed after the fact.
- Something is clearly broken and no one gets notified until a customer complains.

**Failure & recovery (Lesson 22)**
- One small failing part takes down the entire app instead of staying contained.
- There's no way to quickly revert to the last working version if a new change breaks things.
- Errors show users raw technical messages instead of a plain, honest, friendly one.

## Performance, scale & cost

**Performance (Lesson 23)**
- A screen goes blank or freezes with no spinner, message, or any sign it's working.
- The AI can't explain why a page or action is slow — "it's just slow sometimes" isn't a diagnosis.
- Every action re-fetches or recalculates everything from scratch, even things that haven't changed.

**Scale (Lesson 24)**
- Heavy, complex infrastructure built for a scale the product is nowhere near reaching yet.
- A core design choice that "can't be changed later" without starting over, made early with no discussion.
- Nobody has ever asked what happens if usage suddenly doubles or triples.

**Caching & optimizing (Lesson 25)**
- Time is being spent "optimizing" a feature before anyone has confirmed it's actually slow for users.
- Cached information is shown as if it's live, with no plan for how or when it gets refreshed.
- Nobody can point to which specific part of the app is actually the slow one.

**Cost (Lesson 26)**
- No billing alerts are set up on any paid service or cloud account the project uses.
- Data is being stored "just in case," forever, with no decision about when it gets cleaned up.
- A feature calls a paid API (especially an AI service) on every tiny action, with no limit or check.

## Working with AI

**Directing the AI (Lesson 27)**
- You asked for "a whole app" in one request and got a wall of code back with no plan explained first.
- You can't point to the sentence where you said what "done" meant for this feature.
- You skipped mentioning a constraint you actually care about (security, data, scale, cost) and hoped the AI would just know.

**Reviewing AI output (Lesson 28)**
- The AI answers "yes, it's secure / tested / handled" with no specific example to back it up.
- You only tried the happy path yourself before calling the review done.
- Nobody has looked at what data gets stored, or whether it's backed up, even once.

**Maintainability & technical debt (Lesson 29)**
- The same logic appears to be copy-pasted in several different places instead of written once.
- Nobody, including the AI, can explain in plain English why a non-obvious piece was built the way it was.
- Every new feature request seems to take longer than the last one, for no clear reason.

**Shipping (Lesson 30)**
- Something gets called "ready to ship" because it worked once, with no checklist run against it at all.
- You can't say, in one sentence, what "done" meant for this feature before it was built.
- Nobody can answer more than one or two rows of the shipping checklist with actual evidence.
