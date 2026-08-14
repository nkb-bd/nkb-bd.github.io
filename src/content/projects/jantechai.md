---
title: JanteChai — a Bengali AI answer engine, with sources
description: An independent AI question-and-answer platform that answers in Bengali and cites where the answer came from. Built to make trustworthy AI answers accessible in a language most tools underserve.
url: https://jantechai.bd
date: 2025-05-01
draft: false
---

> **Draft — add your own details.** Fill in the real story: why you started it, the
> stack, the model/retrieval setup, current status, and any numbers you're happy to
> share.

**JanteChai** (জানতে চাই — "I want to know") is an independent project: an AI
answer engine for Bengali speakers that returns answers *with their sources*,
rather than a confident paragraph you can't check.

It sits outside my WordPress product work on purpose. It's where I get to make the
architectural calls end to end — retrieval, grounding, citation, latency, cost —
and ship something in a language that most AI tooling still treats as an
afterthought.

## Why it exists

Most AI answer tools are English-first and source-optional. For Bengali, the gap is
wider: fewer tools, weaker grounding, and answers you can't trace. JanteChai is an
attempt to close that — answers a reader can actually verify, in their own language.

## What it exercises

- Retrieval and grounding so answers cite real sources instead of hallucinating.
- Serving an LLM-backed product at a cost and latency that work outside a
  well-funded lab.
- Language-first product design for Bengali, not a translation afterthought.

*(Live at [jantechai.bd](https://jantechai.bd).)*
