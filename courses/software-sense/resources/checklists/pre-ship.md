# The Pre-Ship Checklist

One check per module — seven questions to walk through before you put anything in front of real users. This is the same checklist Lesson 30 ties the whole course together with: every line is a question you're equipped to ask out loud, to an AI or to a person, and to actually judge the answer to. Don't accept "yes" — ask for evidence on each line.

- [ ] **Does it work — including the edge cases?** *(Module 3 · Making It Correct, and Module 1's big trap)*
  Not just the happy path once, in a demo. Empty fields, duplicates, invalid input — checked, not assumed. Working once is not the same as being ready.

- [ ] **Is it tested?** *(Module 3 · Making It Correct)*
  Something automated actually re-checks this behavior, so you're not relying on "it worked when I tried it." A test turns a moment in time into a standing promise.

- [ ] **Is the data modeled sensibly, and backed up?** *(Module 2 · Where Data Lives)*
  You know what's stored, why, and that losing the running copy wouldn't mean losing everything. A backup nobody has ever restored is an assumption, not a safety net.

- [ ] **Are secrets safe and permissions checked?** *(Module 4 · Keeping It Safe)*
  Nothing sensitive sits in the code itself, and every sensitive action confirms who's asking before it acts — not just "are you logged in?" but "is this yours?"

- [ ] **Is it running somewhere real, with eyes on it?** *(Module 5 · Running It in the Real World)*
  Deployed to an actual environment, with some way to notice if it breaks — not just running on someone's laptop. Silence is not the same as health.

- [ ] **Is it fast and affordable enough for how it'll actually be used?** *(Module 6 · Fast, Big & Affordable)*
  Checked against realistic traffic and a realistic budget, not just "fine for one person testing it." Usage-based billing means every design decision has a cost shadow.

- [ ] **Is it maintainable?** *(Module 7 · Doing It With AI)*
  Readable, consistent, not copy-pasted everywhere — safe for you or an AI to change again next month. "It ran once" was never the finish line; "it stays easy to change" is.

**How to use it:** walk the list before shipping anything, and require evidence for each line — "show me," not "trust me." If you can only answer one or two rows with actual proof, you're not ready yet; the unanswered rows are the risks you'd be shipping blind.
