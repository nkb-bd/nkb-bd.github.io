# Design

Visual system for **lukmannakib.com**. Anti-AI brand register. Committed
single-accent color strategy on a pure canvas. Grotesque display + text-serif
reading + mono only for code. All color in OKLCH.

## Theme — Minimalist (staff-engineer)

**Scene:** the quiet, text-first personal site of a senior engineer (rauchg /
leerob lineage). Design serves the words. Warm off-white paper by day, deep warm
ink by night. One accent. Lots of air. Fast. Credibility comes from the writing,
the case studies, and scannable proof — not decoration.

- **Register:** brand (design is the product)
- **Color strategy:** Restrained — near-monochrome warm neutrals + one terracotta
  accent (~oklch 0.55 0.16 42) for links, marks, and the active state.
- **Default mode:** light (warm off-white). Dark (warm ink) is a first-class toggle.
- **Type:** **Literata** (warm reading serif — deliberately NOT the reflex-reject
  Newsreader/Fraunces/Lora) for body + headings; **JetBrains Mono** for labels,
  meta, years, and code.
- **Signature devices:** dotted-leader index rows (`title …… year`) · per-project
  impact chips (`Fluent Forms · 700K+ installs`) · mono section labels · a live
  status pill + "Now" line · accent period on the name.
- **Personality within restraint:** avatar, status pulse, "Now" line, row hover —
  enough warmth that it never reads as bare.
- **Not:** gradient text · glassmorphism · hero-metric template · Inter-on-Inter ·
  reflex-reject display serifs.

## Color

OKLCH. Body text ≥4.5:1, large/UI ≥3:1. Accent is deliberately warm signal-orange
(vermilion), chosen against the olive-sage seed to dodge the editorial-sage lane.

### Light (default)

| Role          | OKLCH                    | Use |
|---------------|--------------------------|-----|
| `--bg`        | `oklch(1 0 0)`           | page background — pure white, no hidden warmth |
| `--surface`   | `oklch(0.975 0 0)`       | code blocks, subtle panels |
| `--border`    | `oklch(0.90 0 0)`        | hairlines, dividers |
| `--ink`       | `oklch(0.22 0 0)`        | body + headings (≈13:1 on bg) |
| `--ink-muted` | `oklch(0.44 0 0)`        | metadata, captions (≈6:1 on bg) |
| `--accent`    | `oklch(0.62 0.20 34)`    | wordmark brackets, CTA fills, marks |
| `--accent-ink`| `oklch(0.53 0.20 34)`    | inline text links (≥4.5:1 on bg) |
| `--olive`     | `oklch(0.48 0.07 110)`   | rare secondary (tags, seed nod) |

### Dark (toggle)

| Role          | OKLCH                    |
|---------------|--------------------------|
| `--bg`        | `oklch(0.17 0 0)`        |
| `--surface`   | `oklch(0.215 0 0)`       |
| `--border`    | `oklch(0.30 0 0)`        |
| `--ink`       | `oklch(0.93 0 0)`        |
| `--ink-muted` | `oklch(0.68 0 0)`        |
| `--accent`    | `oklch(0.72 0.18 42)`    |
| `--accent-ink`| `oklch(0.78 0.16 45)`    |
| `--olive`     | `oklch(0.72 0.10 110)`   |

Accent fills always pair with `oklch(1 0 0)` text (verify ≥4.5:1 per fill).

## Typography

Pairing on a contrast axis: grotesque (structure) + text serif (reading). Mono is
reserved for real code — not a costume for "technical."

- **Display / UI / wordmark:** **Schibsted Grotesk** (600/700). Characterful
  grotesque; carries headings, nav, buttons, the `< Lukman Nakib />` mark.
- **Long-form reading (article/case-study body):** **Spectral** (400/500, plus
  italic). Warm text serif, comfortable at 18–20px for prose.
- **Code only:** **JetBrains Mono** (400/500) inside `<pre>`/`<code>`.

### Scale (modular ~1.25, fluid)

- `--step--1`: 0.833rem · small/meta
- `--step-0`: 1rem (UI) / 1.15rem (prose body)
- `--step-1`: `clamp(1.2rem, 1.1rem + 0.5vw, 1.44rem)`
- `--step-2`: `clamp(1.5rem, 1.3rem + 1vw, 1.9rem)`
- `--step-3`: `clamp(1.9rem, 1.5rem + 2vw, 2.6rem)`
- `--step-4 (display)`: `clamp(2.4rem, 1.8rem + 3.2vw, 3.8rem)` — max well under 6rem

Rules: `text-wrap: balance` on h1–h3; `text-wrap: pretty` on prose; display
`letter-spacing: -0.02em` (floor −0.04em); prose measure 65–72ch; line-height 1.6
prose / 1.15 display; +0.06 line-height in dark mode.

## Layout

- Left-aligned, asymmetric editorial grid — not centered symmetry.
- Container: `min(92vw, 68rem)`; prose column `min(92vw, 42rem)`.
- Fluid vertical rhythm with `clamp()`; vary spacing (tight groups, generous
  section breaks) — no uniform stack.
- Cards used only where they're the right affordance (work index). No nested cards,
  no identical icon+heading+text grids.
- Spacing scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 px as CSS vars.

## Components

- **Wordmark:** `< Lukman Nakib />` in Schibsted Grotesk; `<` `/>` in `--accent`.
- **Nav:** left wordmark, right links (Work · Writing · Notes · About), theme
  toggle at far right. Sticky, hairline bottom border on scroll.
- **Button (primary CTA):** solid `--accent` fill, white text, no gradient, subtle
  press. Secondary: `--ink` outline.
- **Link (inline):** `--accent-ink`, underlined with offset; no color-only signal.
- **Case-study / article card:** title (grotesque), one-line problem statement,
  small meta (date · stack) in `--ink-muted`. Full hairline border, not side-stripe.
- **Subscribe block:** short honest line + email input + accent button; appears in
  footer and after long-form content.
- **Prose (`.prose`):** Spectral body, accent links, `--surface` code blocks with
  JetBrains Mono, real figures/diagrams with captions in `--ink-muted`.

## Motion

- One restrained page-load reveal on the homepage hero (opacity + small translate,
  ease-out-expo). Content is visible by default; motion enhances, never gates.
- Hover: 120–160ms color/opacity on links and buttons. No bounce/elastic.
- `@media (prefers-reduced-motion: reduce)`: crossfade or instant, no transforms.

## Bans (enforced)

No gradient text · no side-stripe borders · no glassmorphism-by-default · no
per-section tracked-uppercase eyebrows · no numbered `01/02/03` section scaffolding
· no cream/sand tinted body bg · no hero-metric template · no mono-as-costume.
