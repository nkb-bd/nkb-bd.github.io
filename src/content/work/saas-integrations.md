---
title: What building 30+ SaaS integrations taught me about API abstraction
problem: Every CRM, email tool, and payment provider wants to be integrated its own way. Wiring each one directly turns a form builder into a pile of bespoke, un-testable glue.
stack: ['PHP', 'REST', 'OAuth', 'WordPress']
impact: Fluent Forms · 30+ integrations
outcome: A single integration contract that new providers implement, instead of the core learning each provider's quirks.
date: 2024-06-18
draft: false
---

Integrations are where a product's architecture gets honest. One or two, you can
hand-wire. Thirty, and every shortcut you took on the first three becomes a tax
you pay on every provider after.

## The problem

Each provider has its own auth (API key, OAuth, account-scoped tokens), its own
field mapping, its own idea of what "create a contact" means, and its own failure
modes. Wired directly into the submission flow, that's thirty special cases in the
hottest path in the plugin.

## The shape that worked

The core stopped knowing about providers. It knows about a **contract**: given a
mapped payload and a connection, `push()` it and report a typed result. Each
integration is an adapter that implements that contract and owns its own quirks —
auth refresh, field mapping, retry semantics — behind it.

```php
interface IntegrationFeed {
    public function authenticate(array $settings): Connection;
    public function fields(Connection $c): array;      // for the mapping UI
    public function push(array $payload, Connection $c): FeedResult;
}
```

The mapping UI is generated from `fields()`, so adding a provider doesn't mean
building a new settings screen. The submission flow calls `push()` and handles a
`FeedResult`, so a provider being down degrades to a logged, retryable failure
instead of a broken submission.

## The lesson

Good abstraction is measured at provider number thirty, not number one. The test
was always: *can a new integration be added without touching the core?* Every time
the answer drifted to "no," the seam was in the wrong place. Push the provider's
weirdness to the edge; keep the middle boring.
