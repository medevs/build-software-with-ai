# Example Tool Connection: Your Issue Tracker

A tool connection wires your agent directly into an external system so it can read real data instead of working from secondhand descriptions (Lesson 25). The Model Context Protocol (MCP) is the common standard that makes this a small, repeatable setup step instead of a custom integration project. This example walks through the most common first connection: your issue tracker — worth adding the moment you notice you keep copy-pasting ticket text into the conversation by hand.

## What you're connecting

Your team's issue tracker — wherever tickets, their descriptions, comments,
and statuses live. Most trackers publish an MCP server with straightforward
setup docs; you typically don't need to hand-write anything. Point your agent
at the setup docs and have it configure the connection and handle
authentication for you.

## What it enables

- **Fetch a ticket by its ID.** Instead of pasting a ticket's description and
  comments into the conversation, the agent reads it directly — always
  current, never stale. "Plan the work for ticket ABC-123" becomes a
  one-line request.
- **Ground plans in the real requirement.** The plan step of the core loop can
  reference the actual ticket text, acceptance notes, and discussion — not
  your memory of them.
- **Check status and context.** The agent can see linked tickets, what's
  already been discussed, and what "done" was agreed to mean.

## Cautions

- **Read-only first.** Start with a connection that can only *read* tickets.
  Only grant write access (creating or updating tickets) later, once the
  read-only connection has earned trust and you have a real need.
- **Least privilege.** Scope the credentials to the one project or space the
  agent actually needs, not your whole workspace. The agent should be able to
  reach exactly what its tasks require and nothing more.
- **Don't add connections speculatively.** A connection earns its place when a
  real, recurring need shows up — you keep pasting the same kind of
  information in by hand. Until then, it's just surface area you have to
  think about.

## The same pattern, elsewhere

The identical shape applies to other systems: a **database** connection (start
with a read-only user — the agent can check the real shape of your data
instead of inferring it from possibly-stale code), an **analytics platform**
(real usage numbers instead of hunches), or your team's **document store**
(pull the spec itself instead of someone's memory of it). In every case:
read-only first, least privilege, added only when the friction is real.
