# Software Sense Glossary

Every technical term the course introduces, explained in one plain-English sentence each. Terms are alphabetized and grouped by letter, and each entry notes the lesson where the idea is first explained — so any time a word from the course slips your mind, you can look it up here in seconds, no programming knowledge required.

## A

**Alert** — An automatic notification sent to a human when monitoring spots a real problem, so you find out something broke before your users tell you. (Lesson 21)

**API (application programming interface)** — The agreed "menu" of requests a server understands and is willing to answer; the client can only order from that list, and the server refuses anything not on it. (Lesson 3)

**API key** — A kind of password that lets your app use a paid service (sending email, processing payments, calling an AI model); whoever holds the key can use that service as you — and you get the bill. (Lesson 16)

**Authentication** — Proving you are who you claim to be, usually by logging in with a password; it answers exactly one question: "is this really you?" (Lesson 15)

**Authorization** — Checking what a logged-in person is actually allowed to do, on every single action — being logged in should never mean being allowed to do everything. (Lesson 15)

## B

**Backend** — The "kitchen" of an app: the brain, running on a server, that does the real work and enforces the rules, out of sight. (Lesson 2)

**Backup** — A regular, separate copy of the database, kept so a mistake, a bad migration, a hardware failure, or an attack doesn't mean the data is gone forever — and only trustworthy if you've actually practiced restoring from it. (Lesson 9)

**Billing alert** — A threshold you set on a paid service ("notify me if spending crosses $50 in a day") so a runaway cost gets caught in hours instead of discovered on next month's invoice. (Lesson 26)

**Bot** — An automated program that scans the internet at massive scale — including poking at your app for easy openings and searching public code for leaked keys. (Lessons 14, 16)

**Bug** — Any case where software does something other than what it was intended to do; a findable gap between what the instructions say and what they should have said. (Lesson 12)

**Bug report** — A short, useful description of a bug with three parts: the exact steps to reproduce it, what you expected, and what actually happened. (Lesson 12)

## C

**Cache / caching** — Keeping a ready-made copy of something expensive to produce, so the software doesn't redo the work every single time — do the expensive thing once, remember the answer, hand out the memory. (Lessons 8, 25)

**CI/CD (continuous integration / continuous delivery)** — An automated pipeline of checks and steps that runs the same careful process every time a change ships, instead of a nervous human copying files by hand. (Lesson 20)

**Client** — Your phone or laptop, running the frontend: the machine that asks for things and waits for the answer. (Lesson 3)

**Code** — The written instructions that make up software; when an AI "writes code," it's writing that instruction list for you. (Lesson 1)

**Code review** — A deliberate second look at a set of instructions before they go live, asking three plain questions: is this correct, is this clear, and is this safe? (Lesson 13)

**Codebase** — The complete collection of instruction files that make up an app — frontend, backend, and everything in between — like a restaurant's full recipe book. (Lesson 5)

**Column (field)** — In a database table, one piece of information every row has — name, email, signup date. (Lesson 6)

**Commit** — A labeled snapshot in version control of exactly what the codebase looked like, and what changed, at one moment in time. (Lesson 5)

**Cross-site scripting (XSS)** — A vulnerability where content one user submits (a comment, a bio) isn't properly checked and later acts against the other users who view it, instead of just displaying. (Lesson 17)

## D

**Data model / data modeling** — Deciding what pieces of information the app stores and how those pieces connect to each other — the foundation everything else is built on, and the costliest thing to fix later. (Lesson 7)

**Data transfer** — Moving information around (sending a video to a viewer, syncing between services), which is usually billed by how much data moves. (Lesson 26)

**Database** — The app's permanent memory: separate storage built to hold information so it survives closing the app, restarting the device, and updates. (Lesson 6)

**Debugging** — The detective work of finding and fixing a bug: reproduce it, find the cause, fix it — in that order. (Lesson 12)

**Defense in depth** — Using several layers of protection instead of one strong wall, so that one failure doesn't mean total loss. (Lesson 14)

**Definition of done** — A tiny written spec with three parts: the requirement, the edge cases you care about, and what "handled" looks like — written before you ask the AI to build. (Lesson 10)

**Dependency** — Pre-built code someone else wrote that your software relies on to work; you get its speed, and you inherit its bugs and security holes. (Lesson 4)

**Deployment (deploying, shipping)** — Publishing your software to the production environment — the live copy real users can reach. (Lesson 20)

**Development (environment)** — Your workbench: the copy of the software where you or the AI make changes and try things, safe to break because nobody but you sees it. (Lesson 19)

**Domain name** — The human-friendly address people type to reach your software — like example.com — instead of a long string of numbers. (Lesson 20)

## E

**Edge case** — An input at the boundary of what's expected — empty, huge, duplicate, invalid, malicious — unusual but entirely realistic, and exactly what real users hit in the first ordinary week. (Lesson 10)

**End-to-end test** — A test that acts like a real user clicking through the actual product — open the site, add to cart, check out — slow to run but closest to real experience. (Lesson 11)

**Environment** — One running copy of your software plus everything it needs (its own data and settings), kept separate from the other copies — most teams have development, staging, and production. (Lesson 19)

**Environment variable** — A configuration value kept outside the code, like a sticky note attached to the computer running the app — the standard place to keep secrets so they never appear in the code itself. (Lesson 16)

**Error handling** — Expecting things to occasionally go wrong and having a plan for that moment: a friendly message instead of a crash, contained failure instead of total collapse, no punishing the user for it. (Lesson 22)

**Exposed data** — Private information that turns out to be reachable simply by changing a number or address in a request, because the app never rechecked who's allowed to see it. (Lesson 17)

## F

**Framework** — A large pre-built structure — like a house's foundation and skeleton kit — that decides a lot about how everything else in your app fits together. (Lesson 4)

**Frontend** — The "dining room" of an app: the screens, buttons, and text you see and click. (Lesson 2)

**Full-stack** — All three parts of an app — frontend, backend, database — working together as one, the way a restaurant needs a dining room, kitchen, and pantry. (Lesson 2)

## G

**GDPR** — A data-protection law covering people in the European Union that requires clear disclosure of what you collect and a genuine right to have your data deleted. (Lesson 18)

**Git** — The most common version control system: a save-history for your entire codebase where every meaningful change is recorded, labeled, and reversible. (Lesson 5)

**Gradual rollout** — Releasing a change to a small slice of users first, watching what happens, then expanding — so a hidden problem reaches few people before someone notices. (Lesson 20)

## H

**Happy path** — The scenario where everything goes exactly right — real name, valid email, one click, done; demos almost always show only this. (Lesson 10)

**Hashing** — A one-way scrambling process for passwords: the app stores only the scrambled result, so even a stolen database doesn't hand attackers everyone's real password. (Lesson 15)

**Hosting** — A computer, owned by someone else, that keeps your software running and reachable around the clock — you rent space, like renting a storefront. (Lesson 20)

## I

**Incident** — When something breaks in production, for real users; the effective response is calm — notice, understand what changed, take the safest fast action (often a rollback), then investigate. (Lesson 22)

**Index (database)** — Like a book's table of contents inside the database: it tells the database roughly where to look so it can jump straight to a record instead of scanning everything. (Lesson 25)

**Injection** — An attack where input typed into an ordinary-looking box is crafted to be understood as a command by the system underneath, so the app runs the attacker's instructions instead of treating the text as data. (Lesson 17)

**Integration test** — A test that checks several pieces work correctly together — like "when the order is saved, does the confirmation email actually get sent?" (Lesson 11)

## L

**Latency** — The wait between you doing something (clicking, submitting) and the software giving you a result; everything about performance is really about shrinking that gap or making it feel smaller. (Lesson 23)

**Least access** — Giving every person and every part of the system the smallest amount of access it needs to do its job, and nothing more — less access means less to go wrong. (Lesson 14)

**Library** — A smaller pre-built piece of code — like a pre-made doorknob or window unit — that you bolt onto your app where you need it. (Lesson 4)

**Live** — See **Production**; a change isn't real for your users until it's actually live. (Lesson 5)

**Local copy** — The copy of the codebase being worked on, on a developer's or AI's own machine, as opposed to the copy actually running for real users. (Lesson 5)

**Logs** — A running, timestamped diary of what your software did ("user logged in," "payment attempted," "something went wrong") — the record you dig through afterward to reconstruct exactly what happened, in order. (Lesson 21)

## M

**Maintainability** — How easy the software is to understand, fix, and extend later, by anyone — including a future AI session that doesn't remember today's conversation. (Lesson 29)

**Memory (in-process)** — The most temporary place state can live: information held only while a screen or feature is actively running, gone the instant it closes. (Lesson 8)

**Migration** — A written, step-by-step, tracked change to the shape of the database — adding a column, splitting a table — done in a way that doesn't damage the data already there. (Lesson 9)

**Monitoring** — Automatic, ongoing watching of your software's key signals — is it up, is it fast, is it throwing errors — like a heart monitor rather than a once-a-year checkup. (Lesson 21)

## N

**Never trust user input** — The core security rule: anything a user types, uploads, or sends should be treated as potentially hostile until it's checked, because the app can't tell a real customer from an attacker using the same box. (Lesson 14)

**NoSQL database** — The family of databases that store more flexible, loosely-shaped records — handy when the shape of your data varies a lot. (Lesson 6)

## O

**Observability** — The broader idea that logs, monitoring, and alerts together give you enough visibility to understand *why* something is happening inside your software, not just that something is wrong. (Lesson 21)

**OWASP Top Ten** — The industry's best-known list of the most common, most damaging security mistakes found in real software, maintained by a nonprofit. (Lessons 14, 17)

## P

**Perceived speed** — How fast something *feels*, which isn't identical to how fast it is — a page with a progress bar can feel faster than a technically quicker page that stays blank. (Lesson 23)

**Performance** — How fast and responsive a piece of software feels while you're using it; a feature people notice immediately when it's missing, even though nobody writes it in a request. (Lesson 23)

**PII (personally identifiable information)** — Any piece of data that can identify a specific real person, like a name, email address, or home location. (Lesson 18)

**Pipeline** — See **CI/CD**: the automated series of checks a change goes through — like airport security for luggage — before it reaches production. (Lesson 20)

**Premature optimization** — Spending time making something fast before you know it needs to be fast (or even that it's correct) — a classic trap that wastes effort and complicates the code. (Lesson 25)

**Privacy** — Respecting the personal information people hand over: what you collect, what you do with it, who else can see it, and whether people can get it back or removed. (Lesson 18)

**Production** — The real thing: the live copy of your software that actual users touch, with their actual data — where a mistake isn't a lesson, it's an incident. (Lessons 5, 19)

**Programming language** — One of many vocabularies and grammars (Python, JavaScript, and others) for writing software's instructions — like French and Japanese both ordering the same meal with different words. (Lesson 4)

## R

**Repository** — An online, shared copy of a project's code; if it's set to "public," anyone on the internet can read it — including bots hunting for leaked secrets. (Lesson 16)

**Request** — The client asking the server for something ("show me my messages," "save this photo") — one half of every round trip an app makes. (Lesson 3)

**Requirement** — A plain statement of what the software must do — not how, just what — written down before you build. (Lesson 10)

**Response** — The answer the server sends back to the client after doing the work — the other half of the round trip. (Lesson 3)

**Revoke** — Turning a leaked or exposed secret off entirely and issuing a fresh one — deleting the line of code doesn't undo who already saw it. (Lesson 16)

**Rollback** — Quickly reverting to the last version that was known to work — an "undo" button for the entire live software, buying time to fix the real problem calmly. (Lesson 22)

**Row (record)** — In a database table, one specific item — one user, one order; 4,000 customers means 4,000 rows in the Users table. (Lesson 6)

## S

**Scale** — How well software keeps working as the number of people using it grows — 10 users, versus 10,000, versus a million. (Lesson 24)

**Scaling out** — Adding more machines running the same software side by side, sharing the load — like opening more checkout lanes. (Lesson 24)

**Scaling up** — Replacing the current machine with a bigger, more powerful one — like trading your bicycle for a car. (Lesson 24)

**Secret** — Any piece of information that would let someone else do damage if they got hold of it — API keys, database passwords, tokens — which must live outside the code. (Lesson 16)

**Sensitive data** — Information that could seriously harm someone if it leaked — health information, payment details — deserving extra layers of protection and an even smaller circle of access than ordinary personal data. (Lesson 18)

**Server** — An always-on computer, often in a data center you'll never see, running the backend and waiting to answer clients' requests. (Lesson 3)

**Session** — A temporary "you are logged in as..." note the app keeps only while you're actively using it, then discards when you log out or leave. (Lesson 8)

**Skeleton screen** — Gray placeholder boxes shown before content arrives — not decoration, but a signal that the wait is happening and hasn't been forgotten. (Lesson 23)

**Software** — A list of very precise instructions a computer follows, step by step, to get something done — followed exactly, with zero common sense to fill in gaps. (Lesson 1)

**SQL database** — The family of databases that use strict, predefined tables — great when your data has a clear, stable shape. (Lesson 6)

**Stack** — The three parts almost every app is built from — frontend, backend, and database — sitting on top of each other, each depending on the one below. (Lesson 2)

**Staging** — The rehearsal environment: a copy that mimics production as closely as possible (same setup, fake or copied data), where you test before anything reaches real users. (Lesson 19)

**Stale (cache)** — When the real data changes but the cached copy doesn't get refreshed, so people see old information — the tricky failure mode every caching plan has to handle. (Lesson 25)

**State** — Everything an app currently knows about what's going on — are you logged in, what's in your cart, which tab is open — and it can live in the database, a session, a file, or memory. (Lesson 8)

## T

**Table** — How a database organizes information, very close to a spreadsheet sheet: one table per kind of thing (Users, Orders, Products), with rows as records and columns as fields. (Lesson 6)

**Technical debt** — The future cost of a shortcut taken today; a little on purpose can be a fair trade, but debt nobody wrote down and nobody came back for compounds until small changes become slow and risky. (Lesson 29)

**Test** — A short piece of software whose whole job is to check that another piece of software behaves the way it's supposed to — written once, then run automatically, forever, like a smoke detector. (Lesson 11)

**Token** — A small credential string that proves your app is allowed to talk to another service — a secret, and treated like one. (Lesson 16)

**Two-factor authentication (2FA)** — A second proof on top of your password — usually a code sent to your phone — so a stolen password alone still isn't enough to get in. (Lesson 15)

## U

**Unit test** — A test that checks one small piece in isolation — like "does this function correctly calculate a discount?" — fast, narrow, and the first line of defense. (Lesson 11)

**Usage-based billing** — The way running software is almost always charged: by how much you store, move, and request — convenient when usage is low, dangerous when it spikes and nobody's watching. (Lesson 26)

## V

**Version control** — A save-history and time machine for your entire codebase: every meaningful change recorded, labeled, and reversible. (Lesson 5)

**Vulnerability** — A weakness in software that lets someone make it do something it was never meant to do — the common ones (injection, exposed data, cross-site scripting) all trace back to trusting input that shouldn't have been trusted. (Lesson 17)
