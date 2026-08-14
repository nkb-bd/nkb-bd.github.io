---
title: What maintaining a plugin on 700K+ sites taught me about backward compatibility
description: Backward compatibility isn't politeness — at scale it's the difference between a release and an outage across hundreds of thousands of sites you'll never see.
date: 2025-01-20
tags: ['WordPress', 'architecture', 'maintenance']
draft: false
---

When your plugin runs on a few hundred sites, a breaking change is an
inconvenience — a few support tickets, a quick patch. When it runs on 700,000,
a breaking change is a coordinated failure across sites you have no access to,
running WordPress versions you stopped testing years ago, alongside plugins you've
never heard of. You can't roll back someone else's site. That asymmetry changes how
you think about every line you ship.

Here's what that scale actually taught me.

## Your public surface is bigger than your public API

You *decided* which functions and hooks were public. Your users decided the rest.
Someone, somewhere, is calling that "internal" method, filtering that option you
assumed nobody touched, or reading that database column directly. At 700K sites,
"nobody depends on this" is never true — it's just a dependency you haven't heard
from yet.

The practical rule: treat anything reachable as a contract, whether you meant it
to be or not. Renaming an internal function is free at 100 sites and a support
fire at 700K. If you must change it, keep the old name as a thin shim that
forwards, and deprecate loudly instead of deleting quietly.

## Data migrations are the only truly irreversible thing

Code you can hotfix in an hour. A migration that mangled data ran once, per site,
and you weren't watching. There's no second chance and no undo.

So migrations earn a different standard of paranoia than features:

- They must be **idempotent** — running twice can't corrupt anything, because on
  some site it *will* run twice.
- They must **degrade** — if the migration can't complete, the old data stays
  readable, not half-transformed.
- They should be **lazy where possible** — transform on read, or in the background,
  rather than one blocking rewrite during an update on a host that'll time out
  halfway through.

The migration that assumes it runs exactly once, to completion, on a healthy
server, is the one that eats a customer's data.

## "Deprecated" is a feature, not a note

Deleting something and deleting it *gracefully* are entirely different releases.
Graceful means the old path still works, emits a deprecation signal, and points at
the replacement — for at least a few versions. It costs you carrying dead-ish code
for a while. It buys your users the ability to update without their site breaking
on a Tuesday.

At scale, the carrying cost is almost always cheaper than the outage. I've never
regretted keeping a shim one version too long. I've regretted the reverse.

## The mindset

Backward compatibility reads like politeness — being nice to people on old
versions. At scale it's not politeness, it's operational safety. Every update is a
change you're pushing, unsupervised, into hundreds of thousands of environments you
can't see, test, or roll back. The whole discipline is designing so that the worst
case of that is "a warning in a log," never "a site went down and I can't reach
it."

That constraint makes you a better engineer everywhere else, too. Once you've felt
the weight of an un-rollback-able change, you stop treating any interface as
casual.
