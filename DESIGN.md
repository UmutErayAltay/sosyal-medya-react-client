---
name: sosyal.log
description: A dark-first social feed — near-black layered surfaces, one indigo-to-magenta gradient accent reserved for primary/liked/active states, self-hosted Space Grotesk display type over Inter body copy.
colors:
  bg: "#0a0a10"
  surface: "#14141c"
  surface-2: "#1c1c26"
  border: "rgba(255,255,255,0.09)"
  border-strong: "rgba(255,255,255,0.18)"
  text: "#f2f1f6"
  text-soft: "#9d9ab0"
  accent: "#9b82ff"
  accent-strong: "#6845e8"
  accent-2: "#c92a72"
  danger: "#ff6b81"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 600
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  chrome:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.05em"
rounded:
  card: "1rem"
  card-lg: "1.5rem"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    background: "linear-gradient(to right, {colors.accent-strong}, {colors.accent-2})"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    minHeight: "44px"
  button-primary-disabled:
    background: "{colors.surface-2}"
    textColor: "{colors.text-soft}"
  card:
    background: "{colors.surface}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.card}"
---

# Design System: sosyal.log — "Afterhours"

## Overview

**Creative North Star: "Afterhours"**

sosyal.log is a social feed for after the sun goes down — the app checked
from bed, not from a desk under office light. This replaces an earlier
"field notebook" direction (warm cream paper, ink-black text, monospace
metadata) that read as flat and washed-out once actually lived in, and it
deliberately goes further than the sibling Flask web client for the same
backend, whose own design is a conventional light-first coral/teal card
layout behind a manual dark-mode toggle: this client commits to dark as the
default scene, not an opt-in.

Structure comes from layered near-black surfaces (never pure black, never a
single flat gray), a self-hosted Space Grotesk display face for the wordmark
and page headings against a self-hosted Inter body face, and one reserved
accent — an indigo-violet-to-magenta gradient — spent only on primary
actions, the liked state, and follow/submit buttons. Everything else stays
neutral. Cards carry real depth: soft, color-tinted, offset-and-blurred
shadows, not a flat outline or a bevel standing in for elevation.

**Key characteristics:**
- Layered dark surfaces (`#0a0a10` ground → `#14141c` cards → `#1c1c26`
  raised/disabled state), not a single flat charcoal
- One reserved gradient accent (`#6845e8 → #c92a72`), spent only on primary
  actions, the liked state, and follow/submit — never on links or body text
- Self-hosted Space Grotesk (display) + Inter (body), both via `@fontsource`
  imports in `src/main.tsx` — no system-font fallback used as a display voice
- Real shadow depth (`.shadow-card`, `.shadow-glow` in `src/index.css`):
  offset, blurred, and — for the glow variant — tinted from the accent
- Authored ring-and-glyph SVG marks for like/comment (`src/components/icons.tsx`),
  not emoji and not a generic icon library
- Every count that changes scale-pulses once (`.tick`), applied uniformly

## Colors

### Surfaces
- **Ground** (`#0a0a10`, `--color-bg`): page background.
- **Surface** (`#14141c`, `--color-surface`): cards (posts, composer, comments,
  auth forms).
- **Surface Raised** (`#1c1c26`, `--color-surface-2`): the disabled state of a
  gradient-filled button — a deliberate flat swap, not a dimmed gradient (see
  Buttons below for why).

### Accent
- **Accent** (`#9b82ff`, `--color-accent`): text/link/icon color on dark
  surfaces — links ("kayıt ol"), hover borders, focus rings. Chosen lighter
  than the button-fill accent specifically so it clears 4.5:1 as small text
  against the near-black ground (measured ~5.9:1).
- **Accent Strong → Accent 2** (`#6845e8 → #c92a72`, `--color-accent-strong` /
  `--color-accent-2`): the gradient fill for primary buttons, the liked
  state, and follow/submit — both stops individually verified ≥4.5:1 against
  white label text (~5.8:1 and ~5.2:1 respectively), because a single mid-tone
  violet strong enough for a light-on-fill button reads too dark for
  small text on the ground, and vice versa. Two roles, two shades.

### Text
- **Text** (`#f2f1f6`, `--color-text`): primary content.
- **Text Soft** (`#9d9ab0`, `--color-text-soft`): metadata, placeholders, and
  disabled-button labels — verified ~6.2:1 against both `surface` and
  `surface-2`.
- **Danger** (`#ff6b81`, `--color-danger`): inline error text only.

### Named Rules
**The One Accent Rule.** The gradient marks a primary action or the liked
state and nothing else — never a link color, a focus ring, or a generic
"success" signal. Comment controls and hover states stay neutral so the
accent's rarity keeps its meaning.

**The Two-Shade Accent Rule.** The same hue never serves both "text on dark"
and "white text on fill" — one shade is measurably too light for the former
or too dark for the latter. `accent` (light) is for text/icons on the
ground; `accent-strong`/`accent-2` (deep) are for gradient fills only.

## Typography

**Display:** Space Grotesk, 600–700 weight — the wordmark and every page
`<h1>` (`LoginPage`, `RegisterPage`, `ProfilePage`). Self-hosted via
`@fontsource/space-grotesk` imports in `src/main.tsx`.

**Body:** Inter, 400–600 weight — everything else (post content, bio,
comments, labels, buttons). Self-hosted via `@fontsource/inter`.

Rank is carried by face (display vs. body), weight, and size together, not a
long size ladder: body copy sits at `text-[15px]`, chrome/metadata at
`text-xs`/`text-sm`, page headings at `text-2xl` display weight — three
steps, not a dozen.

### Named Rules
**No Gradient Text.** Emphasis comes from weight, size, or the wordmark's
single accent-colored glyph (the "." in "sosyal.log") — never a
`bg-clip-text` gradient fill on a text run. Verified absent from every
`bg-linear-to-r` use in the build; all of them sit behind solid white or
`currentColor` text, not behind transparent text.

## Elevation & Depth

Every card (`shadow-card`) and every gradient-filled primary control
(`shadow-glow`) carries a real shadow: layered, offset, and blurred — never a
1px outline standing in for depth, and never a hard-edged neobrutalist block
shadow. `shadow-glow` additionally tints from the accent
(`rgba(104,69,232,0.55)`), so a primary action visibly "lifts" toward the
brand color; `shadow-card` stays neutral black so ordinary content (posts,
comments) doesn't compete with it.

## Shapes

Cards: `rounded-2xl`/`rounded-3xl`. Buttons and pills: fully rounded
(`rounded-full`). No sharp-cornered interactive control anywhere in the
build.

## Components

### Buttons
- **Primary (submit/follow/paylaş/gönder):** `bg-linear-to-r from-accent-strong to-accent-2`,
  white text, `shadow-glow`, `min-h-11` (44px — the verified touch-target
  floor on every pill and submit control, checked with real
  `getBoundingClientRect()` measurements, not eyeballed).
- **Disabled:** swaps the gradient to a **flat** `surface-2` fill with
  `text-soft` label color (`disabled:from-surface-2 disabled:to-surface-2`)
  rather than dimming the gradient with `opacity`. A finish review measured
  the earlier `opacity-30` approach at ~2.6:1 contrast — fading a light label
  and a colored fill together crushes contrast long before the button looks
  "disabled enough." The flat-swap fixes this at the shared root (five call
  sites) rather than tuning an opacity value that would have drifted again
  the next time the gradient changed.
- **Ghost (like/comment/logout/retry, unliked state):** transparent,
  `border-border`, `text-soft`; hover swaps border+text to `accent`.
- **Liked (like button only):** the one ghost control that fills solid with
  the gradient — the single place in the whole app where "liked" and "the
  brand accent" are the same visual event.

### Inputs
- Boxed, `rounded-xl`, `border-border`, `bg-bg/50`, `focus:border-accent`.
  `min-h-11` on every text input for the same touch-target floor as buttons.
- Comment field and its send button are both `rounded-full` (pill row)
  instead of the boxed auth-form style, matching the lighter, inline feel of
  a reply composer versus a full auth form.

### Cards (posts, composer, comment threads, auth forms, profile header)
`rounded-2xl`/`rounded-3xl` `surface` background, `border-border`,
`shadow-card`. No nested cards — a post card's like/comment controls are
pills sitting directly on the card surface, not sub-cards.

### Ink-Stamp Icon System
`src/components/icons.tsx` — `LikeStamp` (heart) and `CommentStamp` (speech
bubble), both authored stroke SVGs using `currentColor`, `aria-hidden`. Not a
generic icon library, not an emoji/Unicode glyph standing in for a control.

### Ticking Count
`src/components/TickingCount.tsx` — every count that can change (likes,
comments, follower/following/post stats) re-keys on value change and plays
one `.tick` scale-pulse (`240ms`, `scale(1.3 → 1)`). Applied uniformly — no
special-cased color flash on any one counter, since the accent's reservation
is already carried by the like button's fill state, not by the number.

## Browser Surfaces

Themed per `src/index.css`: text selection (`::selection`) uses
`accent-strong`; the custom scrollbar thumb is `border-strong`, brightening
to `accent` on hover; every focusable element gets a 2px `accent`
`outline` via `:focus-visible`; text inputs get an `accent` caret color.

## Do's and Don'ts

### Do:
- **Do** reserve the gradient for primary actions, the liked state, and
  follow/submit — everywhere else stays neutral ink/soft-text.
- **Do** use `accent` (light) for text/links/icons on dark surfaces and
  `accent-strong`/`accent-2` (deep) only for gradient fills behind white
  text — never swap the two roles.
- **Do** keep every button, pill, and text input at `min-h-11` (44px).
- **Do** swap a disabled gradient button to a flat `surface-2` fill with
  `text-soft` label — never dim the gradient with `opacity`.
- **Do** give every card real offset-and-blurred shadow depth
  (`shadow-card`/`shadow-glow`), never a flat outline standing in for it.

### Don't:
- **Don't** put gradient text (`bg-clip-text`) anywhere — emphasis comes from
  weight, size, or a single solid-colored glyph.
- **Don't** add a second display face; Space Grotesk is already self-hosted
  via `src/main.tsx`'s `@fontsource/space-grotesk` imports.
- **Don't** pull in a generic icon library or an emoji glyph for a new
  control; extend the ring-and-glyph pattern in `icons.tsx`.
- **Don't** nest a card inside a card; post actions are pills on the card
  surface, not sub-cards.
- **Don't** reach for a hard-edged block shadow — this world's depth is
  always soft and blurred, tinted from the accent only on primary actions.
