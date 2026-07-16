# Example Hook: Block Edits to Migration Files

A hook is a deterministic script wired to a specific moment in the agent's workflow — it fires automatically at that moment, every time, with no dependence on the agent choosing to comply (Lesson 27). Rules ask; hooks enforce. This example enforces one of the most common hard boundaries: database migration files that have already been applied must never be edited, because changing history that other environments have already run is exactly the kind of mistake you don't want to leave to a well-followed request.

## The guarantee

No file inside the migrations directory is ever modified — regardless of what
the agent intended, remembered, or was asked to do. New migrations are still
allowed; editing existing ones is not.

## The lifecycle event

**Before a file edit.** Most coding agents can run a check at the moment the
agent is about to write to a file — before anything touches disk. That's the
right moment here: the point of this hook is that the edit never happens, not
that it gets flagged afterward.

## The check

1. The hook receives the path of the file the agent wants to edit.
2. If the path is inside the migrations directory **and** the file already
   exists, the hook exits with a failure — which blocks the edit and tells the
   agent why.
3. Otherwise, the hook exits successfully and the edit proceeds normally.

## Shell sketch

```sh
#!/bin/sh
# Runs before every file edit. Receives the target file path.
FILE_PATH="$1"

case "$FILE_PATH" in
  *migrations/*)
    if [ -f "$FILE_PATH" ]; then
      echo "Blocked: existing migration files must never be edited." >&2
      echo "Create a NEW migration instead." >&2
      exit 1   # non-zero exit = the edit is refused
    fi
    ;;
esac

exit 0
```

Adapt the path pattern and the wiring to your own agent — every mainstream
coding agent has some way to run a command at this point in its lifecycle; the
shape of the check stays the same.

## Why a hook and not a rule

A line in the rules file saying "never edit migrations" works most of the
time — but it's still a request, and under a long, complicated task even a
well-written instruction can get missed. A hook can't forget, get talked out
of it, or decide the rule doesn't apply this time. Reach for a hook whenever
the honest phrasing is "this must happen every single time, no exceptions."
And like skills, hooks are behavior rather than codebase-specific truth, so
this one travels to your next project almost unchanged.
