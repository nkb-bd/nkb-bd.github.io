---
title: Validation across PHP, JavaScript, and REST — one set of rules, three runtimes
problem: A form validates in the browser for UX, on the server for safety, and over REST for programmatic submissions. Three implementations of the same rule drift, and the drift is always a security bug.
stack: ['PHP', 'JavaScript', 'REST', 'Vue']
outcome: A single rule definition that drives client hints, server enforcement, and API validation — so they can't disagree.
date: 2024-03-02
draft: false
---

The browser validates for speed and kindness. The server validates because the
browser can be bypassed. The REST endpoint validates because not every submission
comes from a browser at all. The danger is that these are usually three separate
codebases enforcing "the same" rule — and the day they disagree is the day the
weakest one becomes the exploit.

## The problem

A required field, a max length, an allowed set of options, a number range. Trivial
individually. But the client version exists in JavaScript, the server version in
PHP, and the REST version has to reject the same things the form UI would — without
the form UI present. Three sources of truth is three chances to be wrong, and the
attacker only needs one.

## The approach

Rules are declared once, on the field, as data — not as code in three places. That
declaration is:

- **serialized to the client** as validation hints (fast, friendly, non-authoritative),
- **enforced on the server** by a single validator that reads the same declaration,
- **reused by REST**, which runs the identical server validator before anything is stored.

The client is treated as a hint layer with no authority. The server validator is
the one that matters, and REST doesn't get its own softer copy — it calls the same
one. If a rule changes, it changes in one place and all three runtimes move
together.

## The lesson

Whenever "the same rule" lives in more than one runtime, assume they'll drift and
design so they physically can't. Make one of them authoritative, make the others
derive from the same declaration, and never let a second enforcement path grow its
own opinion. The bug you prevent this way is the one you'd never have found in
testing — because it only appears when someone skips the layer you trusted.
