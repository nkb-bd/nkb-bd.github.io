---
title: Building an inventory system inside a WordPress form builder
problem: Forms that sell limited things — event seats, appointment slots, limited stock — need to stop accepting submissions once a quantity runs out, without a real database of "products."
stack: ['PHP', 'MySQL', 'WordPress', 'REST', 'Vue']
impact: Fluent Forms · 700K+ active installs
outcome: A stock-aware form field that holds under concurrency, degrades safely, and never oversells.
date: 2024-11-10
draft: false
---

A form builder isn't a store. It has no products, no catalog, no cart. So when
people started asking Fluent Forms to "only let 50 people register" or "sell 20
tickets and then close," the interesting part wasn't the feature — it was doing
it without pretending to be a commerce plugin.

## The problem

The request sounds small: a field with a quantity, that decrements on submission,
and blocks once it hits zero. It stops being small the moment two people submit
the last unit at the same time. A naive "read count, compare, then write" leaks
oversells under any real traffic — exactly the moment a launch actually matters.

The constraints that shaped everything:

- **No product model.** Inventory had to attach to a *field option*, not a
  first-class product entity, because that's the mental model form builders have.
- **Concurrency is the whole game.** The rare path (two submissions racing for the
  last slot) is the only path that matters. If it's wrong, the feature is a lie.
- **It had to survive imports, edits, and duplication.** People clone forms and
  edit fields constantly. Inventory state couldn't live somewhere that a routine
  edit would silently reset.
- **Backward compatibility.** Existing forms and submissions had to keep working,
  untouched, with inventory simply absent.

## Architecture

Inventory is modeled as **stock counters keyed to a form field and its option
value**, stored separately from the form definition. The form definition stays
declarative ("this field has inventory enabled, initial stock N"); the *live
counts* live in their own table so editing a form never clobbers real sales.

The decrement happens inside the submission insert path, not before it:

```php
// Reserve inside the same transaction that stores the entry.
// The UPDATE ... WHERE remaining > 0 is the atomic guard: the row
// itself refuses to go negative, so the race is resolved by the DB,
// not by PHP reading-then-writing.
$claimed = $db->query(
    "UPDATE {$stockTable}
        SET remaining = remaining - ?
      WHERE field_key = ? AND option_hash = ? AND remaining >= ?",
    [$qty, $fieldKey, $optionHash, $qty]
);

if ($claimed < 1) {
    // Someone else took the last of it between render and submit.
    return $this->soldOut($fieldKey);
}
```

The rule that makes it correct: **the check and the decrement are the same
statement.** `WHERE remaining >= ?` means the database refuses to oversell; two
racing submissions can't both win because only one `UPDATE` actually matches the
row. PHP never holds the truth long enough to be wrong about it.

<figure>
  <img src="/images/inventory-atomic-guard.svg" alt="Two concurrent submissions both hit a single guarded UPDATE; one matches the row and is claimed, the other matches zero rows and is told sold out — so the last unit is never oversold." />
  <figcaption>Two submissions race for the last unit. The guarded UPDATE matches exactly one row, so the database — not PHP — decides the winner.</figcaption>
</figure>

## Trade-offs

- **Atomic UPDATE vs. row locks.** An explicit `SELECT ... FOR UPDATE` then write
  would also work, but it holds a lock across more PHP execution and interacts
  badly with the plugin's varied hosting reality (shared hosts, aggressive
  timeouts). A single guarded `UPDATE` keeps the critical section as small as
  physically possible.
- **Reservation vs. hard decrement.** True "hold the slot for 10 minutes while you
  pay" reservations are a different, heavier system. For most forms, decrement-on-
  submit is the honest match to how people actually use them; reservations were
  scoped out deliberately rather than half-built.
- **Field-scoped, not global.** Keying stock to `field_key + option_hash` means
  duplicating a form starts fresh stock instead of secretly sharing a counter with
  the original — the behavior people expect, at the cost of some bookkeeping when
  fields are renamed.

## What it taught me

The feature is 90% edge cases and 10% happy path, and the 10% was never the
risk. Every hard decision came from refusing to let PHP be the source of truth
for something two requests can touch at once. When state is contended, push the
invariant down to the layer that can actually enforce it — here, a `WHERE` clause
— and keep the window where you *could* be wrong as narrow as the platform allows.

The other lesson was about restraint: the right version of this shipped *without*
becoming a commerce system. Naming the thing it deliberately isn't ("this is not
reservations, not a catalog") was as important as the code.
