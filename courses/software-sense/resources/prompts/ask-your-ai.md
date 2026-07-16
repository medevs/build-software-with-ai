# The "Ask your AI" Prompt Pack

Every "Ask your AI" question from all 30 lessons, collected as copy-paste prompts and grouped by lesson. Use them while building: when you're working on the area a lesson covers, paste the matching prompts to your AI and make it show its work. You don't need to understand the code to use these — each one asks for an answer in plain English, with evidence.

## Lesson 1 · What Software Really Is

- Explain what this code does in plain English, as if I'm not a programmer.
- What assumptions did you make that I should double-check?
- What would need to be true for this to be safe to show real users?

## Lesson 2 · The Stack

- Which parts of this feature are frontend, backend, and database?
- Is this rule enforced in the backend, or only checked in the frontend?
- If I close the app and reopen it, what happens to this data — where is it actually stored?

## Lesson 3 · Client & Server

- When I do this action, what request gets sent to the server, and what response comes back?
- What does this API actually accept — and what happens if I send it something outside that?
- If the server is slow or down, what does the user see right now?

## Lesson 4 · Languages & Dependencies

- What frameworks and libraries does this depend on, and why did you choose them?
- Are any of these dependencies outdated or known to have security issues?
- Could this feature be done with fewer dependencies, and what would we trade off?

## Lesson 5 · How Apps Get Built

- Is this change being tracked with version control, and can we undo it if needed?
- Is this fix only on my local copy, or is it actually live for users yet?
- Can you show me the history of changes to this part of the codebase?

## Lesson 6 · What Is a Database

- Where is this app's data actually stored, and will it survive a restart?
- What tables does this app use, and what does each one store?
- What stops two people from saving conflicting changes to the same record at the same time?

## Lesson 7 · Modeling Your Data

- Explain the data model for this app in plain English — what are the main things, and how do they connect?
- What happens to this model if a user needs to have more than one of [X]?
- Is any of this shape hard-coded in a way that will break if the business rules change?

## Lesson 8 · State & Storage

- Where exactly is [this specific piece of data] stored — database, session, file, or just memory?
- If the user closes the app right now, what will they lose?
- Is anything here being saved permanently that should really just be temporary?

## Lesson 9 · Migrations & Backups

- Walk me through this migration step by step — could it delete or damage any existing data?
- Has this migration been tested against a copy of real data before running it for real?
- How often are backups taken, and when was one last actually restored to confirm it works?

## Lesson 10 · What "Done" Means

- Here's my requirement: [one sentence]. What edge cases should we handle before this is done?
- What happens right now if this field is left empty, or the input is a duplicate?
- Show me what the user sees when something goes wrong, not just when it goes right.

## Lesson 11 · Testing, Explained

- Write tests for this feature that cover the edge cases we listed, not just the happy path.
- Run the existing tests and tell me if this change broke anything.
- In plain English, what does each of these tests actually check?

## Lesson 12 · Bugs & Debugging

- Here are the exact steps to reproduce this, what I expected, and what actually happened — what's the likely cause?
- Once you fix this, write a test so this specific bug can't come back unnoticed.
- What else in the code makes the same assumption that caused this bug?

## Lesson 13 · Reviewing Code

- Explain what this does in plain English, as if I've never coded — what does each part handle?
- Walk me through what happens on a wrong, empty, or malicious input here.
- What's the one part of this you're least confident about, and why?

## Lesson 14 · The Security Mindset

- Where in this code do we trust something a user typed or sent without checking it first?
- Does every part of this system have only the access it actually needs, or more?
- If this one layer of protection failed, what would an attacker be able to reach next?

## Lesson 15 · Login & Permissions

- For this feature, does it check that the logged-in user actually owns the data being requested?
- Are passwords hashed before being stored, and never logged or stored in plain text?
- Which pages or actions here should be limited to admins, and are they actually restricted?

## Lesson 16 · Secrets & Keys

- Is there any API key, password, or token written directly in this code? Where?
- Set this up so the secret comes from an environment variable instead of being hardcoded.
- Is the file holding my secrets excluded from what gets pushed to the repository?

## Lesson 17 · Common Vulnerabilities

- Is any user input combined directly into a command or database lookup without being checked first?
- If I change an ID number in this request, could I see or edit something that isn't mine?
- Is user-submitted content (comments, bios) properly checked before it's shown to other users?

## Lesson 18 · Privacy & User Data

- Does this form collect anything the feature doesn't actually need? What could we remove?
- Is there a way for a user to see, correct, or delete the personal data we store about them?
- Is any health, payment, or other sensitive data being handled with extra care compared to regular data?

## Lesson 19 · Environments: Dev, Staging, Production

- Which environment does this change get tested in before it reaches real users?
- What's different between our staging setup and production that could cause surprises?
- Is this change risky enough that it needs to go through staging first?

## Lesson 20 · Deployment

- Walk me through exactly what happens, step by step, when this change gets deployed.
- Is there an automated pipeline that checks changes before they reach production?
- Could this change be rolled out to a small group first instead of everyone at once?

## Lesson 21 · Monitoring & Logs

- Does this software log important events, and where would I find those logs?
- What monitoring is in place to tell us if this is down or erroring?
- If something breaks at 2am, who or what gets alerted, and how fast?

## Lesson 22 · When It Breaks

- What happens to the user if this specific part fails — do they see a friendly message, or a crash?
- Can we roll back this change quickly if something goes wrong after deploying it?
- If this fails, does it fail safely, or could it lose data or take down other parts too?

## Lesson 23 · Performance: Why Speed Is a Feature

- Which part of this feature is likely to be the slowest, and why?
- Is this making more requests to the database than it needs to?
- Can you add a loading indicator so people know something is happening while they wait?

## Lesson 24 · Scale: When Usage Grows

- What would break first if this had a thousand users instead of ten?
- Are we over-building for scale we don't need yet?
- Is there a decision here that would be hard to undo later if we grow?

## Lesson 25 · Caching & Optimizing

- Is this data a good candidate for caching, or does it need to be live every time?
- If we cache this, how and when does the cached copy get refreshed?
- Is this optimization actually necessary right now, or are we solving a problem we don't have yet?

## Lesson 26 · The Cost of Running It

- What in this feature could cause an unexpectedly large bill if usage spiked?
- Is there any risk of a loop or retry here running without limit?
- Where are secrets or API keys used here, and are they safely stored?

## Lesson 27 · Directing Your AI

- Before you write any code, explain your plan and the assumptions you're making.
- Here's my definition of done: [requirement + edge cases + handling]. Build to that, one piece at a time.
- What constraints should I be telling you about that I haven't mentioned — security, data, scale, or cost?

## Lesson 28 · Reviewing AI's Work

- Walk me through what happens for each edge case in my definition of done — show me, don't just tell me.
- Is there anywhere untrusted input reaches this code without being checked first?
- If a hundred times more people used this tomorrow, what's the first thing that would break or get expensive?

## Lesson 29 · Maintainability & Debt

- Is any of this logic duplicated elsewhere? If so, can it live in one place instead?
- What's the one part of this you'd want a future developer — or a future you — to understand before changing it?
- Did you take any shortcuts here I should know about, even ones that are reasonable for now?

## Lesson 30 · Your Shipping Checklist

- Walk me through this shipping checklist, one line at a time, with evidence for each — not just "yes."
- Which line of this checklist are we weakest on right now, honestly?
- If I could only fix one thing before shipping, based on this checklist, what should it be and why?
