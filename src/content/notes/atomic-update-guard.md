---
title: The one-line fix for oversold inventory
date: 2025-02-04
draft: false
---

Any "check the count, then decrement" logic in PHP is a race waiting to happen.
Two requests read the same remaining value, both pass the check, both write.

Collapse the check and the write into one statement and let the database be the
referee:

```sql
UPDATE stock
   SET remaining = remaining - 1
 WHERE id = ? AND remaining >= 1;
```

If the affected-rows count is `0`, it was sold out — no separate `SELECT`, no
window where two requests can both win. The invariant lives in the `WHERE`, which
is the only place two concurrent requests can't both be right.
