---
name: sosyal.log
description: A working social feed rendered as a flush-left field notebook — ruled paper, monospace metadata, ink-only rules, one accent reserved for the liked state.
colors:
  paper: "#f7f3ea"
  paper-line: "#cabfa4"
  ink: "#1c1710"
  ink-soft: "#4f4636"
  accent: "#c1440e"
  accent-soft: "#e8ceb8"
typography:
  body:
    fontFamily: "Public Sans, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  chrome:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  chrome-label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0.05em"
rounded:
  none: "0px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-primary-disabled:
    textColor: "{colors.ink-soft}"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "6px 0"
---

# Design System: sosyal.log

## Overview

**Creative North Star: "The Field Notebook"**

sosyal.log renders a real, working social feed as the record of what happened, not a feed styled to impress. It refuses the rounded-card, purple-gradient SaaS default: no cards, no shadows, no rounded corners anywhere in the shipped build. Structure comes from a warm paper ground, thin ink-colored rules between entries, and a strict split between two typefaces — a plain humanist sans for what was said (post content, bio) and monospace for the metadata of when and who and how much (timestamps, usernames-as-handles, counts, form labels, nav). One accent, a fountain-pen red-orange, is spent on exactly one thing: the liked state. Everything else — errors, disabled states, borders, hover — stays ink-only.

This is a code-led build: there was no image-generation step, so there is no comp or raster asset provenance to record here. Every value below is read directly from `src/index.css` and the component source, not from a mockup.

**Key Characteristics:**
- Flush-left, ruled log-entry layout; the hairline rule between entries is the boundary — there is no card
- Two-typeface split by role (sans = content, mono = structural chrome), not by size ladder
- Zero border-radius, zero box-shadow anywhere in the build
- One accent color, reserved for the liked state only
- Counts tick (scale-pulse) on change instead of snapping instantly

## Colors

A warm, low-saturation paper-and-ink palette with a single spent accent.

### Primary
- **Fountain-Pen Accent** (`#c1440e`, `--color-accent`): reserved exclusively for the liked state — the like button's border/text when active, and the like count's tick-flash animation (`.tick-accent`). Not used for links, focus rings, primary buttons, or any other "something happened" signal.

### Neutral
- **Warm Paper** (`#f7f3ea`, `--color-paper`): page background; also the hover-state text color on filled ink buttons.
- **Paper Rule** (`#cabfa4`, `--color-paper-line`): the repeating horizontal rule lines behind the composer's textarea (`.ruled`), evoking ruled notebook paper.
- **Ink** (`#1c1710`, `--color-ink`): primary text, borders, filled-button backgrounds.
- **Ink Soft** (`#4f4636`, `--color-ink-soft`): secondary/metadata text — timestamps, disabled states, placeholder copy.
- **Accent Soft** (`#e8ceb8`, `--color-accent-soft`): defined as a token in `src/index.css` but not observed in any shipped component; carried here as an incumbent token, not exercised yet.

### Named Rules
**The One Accent Rule.** The red-orange accent marks the liked state and nothing else. Errors, disabled controls, hover, and focus all stay ink-only so the accent's rarity keeps its meaning — an AI-generated screen must not reach for it as a general "active" or "success" color.

## Typography

**Body Font:** Public Sans (with system-ui, -apple-system, "Segoe UI", sans-serif fallback)
**Label/Mono Font:** ui-monospace (with SFMono-Regular, Menlo, Consolas, monospace fallback)

**Character:** A plain humanist sans carries anything a person wrote (post content, bio, comment text); monospace carries anything the system generated about the post (handle, timestamp, counts, form labels, nav actions). The pairing itself signals "log," not size or weight variation.

Public Sans is self-hosted via `@fontsource/public-sans` (400, 400-italic, 500, 600), imported in `src/main.tsx` — not an `index.html` `<link>`/`@font-face`, which is why a search limited to `index.html`/`src/index.css` alone won't find it. Confirmed actually rendering (not a silent fallback) via `document.fonts` in the running app: multiple Public Sans faces report `status: "loaded"`.

### Hierarchy
- **Body** (400, 14px `text-sm`, 1.5 line-height): post content, bio, comment text. Uses the sans stack.
- **Label/Chrome** (400, 12px `text-xs`, 1.4 line-height): timestamps, usernames-as-metadata, nav links, counts, error text. Uses the mono stack via the `font-mono-chrome` utility.
- **Chrome Label — small caps** (400, 11px, 0.05em letter-spacing, uppercase): form field labels and section eyebrised-free micro-headers ("yeni kayıt", "e-posta", "giriş") — mono, uppercase, wide-tracked.
- The wordmark ("sosyal.log" in `Navbar`) is the one deliberate exception: sans, semibold, `text-lg`, tight tracking — a brand mark, not a hierarchy level.

### Named Rules
**The One Size Per Role Rule.** Rank is carried by weight, case, and monospace-vs-sans choice, not by a size ladder — confirmed in the build: body text is uniformly `text-sm`, all structural chrome is uniformly `text-xs` (with one `11px` uppercase micro-label step for form fields), with no intermediate display/headline sizes anywhere in the app.

## Layout

Single-column, flush-left log column capped at `max-w-2xl` (`FeedPage`, `ProfilePage`), `max-w-sm` for auth forms (`LoginPage`), centered via `mx-auto`. `ProfilePage`/`FeedPage` add a `border-l border-ink/10` hairline down the left edge of the column — the only vertical rule in the layout, reinforcing the ruled-notebook-margin feel. Entries stack directly against each other; there is no gutter or gap component between them — the closing `border-b` of one entry is the opening edge of the next. Standard internal padding is `px-4` horizontally with `py-3`–`py-6` vertical depending on density (composer/post: `py-3`–`py-4`; profile header: `py-6`; empty/loading states: `py-10`).

## Elevation & Depth

Flat, unconditionally. No `box-shadow` appears anywhere in `src/`. Depth and grouping are conveyed entirely by hairline rules (`border-ink/10`, `border-ink/15`, `border-ink/20`, `border-ink/25`, `border-ink/30` at increasing opacity for increasing emphasis) and by the ruled-paper background behind the composer. There is no tonal-surface layering either — every surface is the same paper color; only the border opacity changes.

### Named Rules
**The Rule-Is-The-Boundary Rule.** No entry, form, or panel is ever wrapped in a card, shadow, or filled surface distinct from the page. A `border-b` (or `border-l`/`border-t` for nested contexts, e.g. comment replies) closes it instead.

## Shapes

Zero border-radius anywhere in the build (`rounded-none` is the implicit default; the only `rounded-full` uses are on avatar images, which are circular photo frames, not UI chrome). All interactive controls (buttons, inputs) are rectangular with 1px hairline borders in ink at varying opacity — no fill at rest, ink-filled on hover for primary actions.

## Components

### Buttons
- **Shape:** rectangular, 0px radius, 1px ink border (`border-ink` at full opacity for the primary/only button style; nav's logout and error-state retry buttons use a softer `border-ink/25`–`border-ink/40`).
- **Primary (submit/follow/like):** transparent background, ink text/border at rest; on hover, background and border invert to solid ink with paper-colored text (`hover:bg-ink hover:text-paper`). Padding scales with context: `px-3 py-1` (compact, like/comment controls) up to `px-4 py-2` (login submit).
- **Disabled:** border and text drop to `ink/25` and `ink-soft`; hover invert is suppressed (`disabled:hover:bg-transparent`); cursor becomes `not-allowed`.
- **Active/liked (like button only):** border and text switch to the accent color (`border-accent text-accent`) — the single place any button carries color.

### Inputs / Fields
- **Style:** no boxed input anywhere. Auth-form fields (email/password) and the comment field are bottom-border-only (`border-0 border-b border-ink/25`), transparent background, flush to the label above. The composer's textarea has no border at all and sits directly on the `.ruled` notebook-line background.
- **Focus:** border-bottom darkens to full ink (`focus:border-ink`); the composer textarea has no visible focus ring, relying on the ruled background and cursor.
- **Placeholder:** `text-ink-soft`.

### Navigation
`Navbar` is a single hairline-bottomed bar (`border-b border-ink/15`) at `max-w-2xl`. The wordmark is the one sans, semibold, larger-than-chrome element in the whole app. The rest of the nav (own handle, logout) is mono chrome text, `hover:text-ink` for the plain link and a bordered ink button for logout — no active/current-page indicator beyond that.

### Ink-Stamp Icon System (signature component)
`src/components/icons.tsx` — `LikeStamp` and `CommentStamp`. Both are small (15×15) hand-drawn-feeling SVGs: a circular ring plus a simple interior glyph (a heart-like double-curve for like, three ruled lines for comment), stroked in `currentColor` so they inherit the parent button's ink/accent state. This is a deliberate ink-stamp mark system, not a generic icon library (no Lucide/Heroicons) and not a bare emoji/Unicode glyph standing in for a control. `LikeStamp` fills solid when `filled` (liked); `CommentStamp` has no filled state.

### Ticking Count (signature interaction)
`src/components/TickingCount.tsx` — every count that can change (likes, comments, follower/following/post-count) re-keys on `value` change to replay a CSS scale-pulse (`.tick`, 260ms ease-out, `scale(1.35 → 1)`) instead of the number snapping instantly. Only the like count passes `accent`, which additionally flashes the number to the accent color mid-pulse (`.tick-accent`) — because that count already sits next to the liked-state accent color on the button. Every other counter (comments, followers, following, post count) ticks in plain ink. This asymmetry is load-bearing: it is what keeps the accent reserved for "liked," rather than becoming a generic "this number changed" signal.

## Do's and Don'ts

### Do:
- **Do** keep post content and bios in the sans stack (`font-sans`/default body) and all structural chrome (timestamps, handles, counts, labels, nav) in `font-mono-chrome`.
- **Do** close every entry/section with a hairline `border-*-ink/NN` rule rather than a card or shadow.
- **Do** reserve the accent (`#c1440e`) for the liked state only; every other emphasis (errors, disabled, hover) stays ink-valued.
- **Do** make every count that can change re-key and play the `.tick` scale-pulse on update rather than snapping.
- **Do** keep buttons and inputs at 0px radius with 1px ink-opacity borders, filling to solid ink only on hover for primary actions.

### Don't:
- **Don't** introduce a size ladder for hierarchy (display/headline/title steps). Rank is carried by weight, case, and mono-vs-sans choice — confirmed by the build's two-size-only type system.
- **Don't** add box-shadow, card surfaces, or rounded corners to any new component; the build has zero instances of any of the three.
- **Don't** use the accent color for links, focus states, primary-button fills, or generic "success" — it is spent entirely on the liked state.
- **Don't** pull in a generic icon library (Lucide/Heroicons/emoji glyphs) for new controls; extend the ink-stamp SVG pattern in `icons.tsx` (ring + simple interior glyph, `currentColor`-stroked) instead.
- **Don't** add a second font-loading path (a Google Fonts `<link>`, another `@fontsource` package) for body text — Public Sans is already self-hosted via `src/main.tsx`'s `@fontsource/public-sans` imports; reuse that import, don't duplicate it.
