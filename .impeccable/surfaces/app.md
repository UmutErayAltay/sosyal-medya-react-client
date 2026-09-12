---
version: 2
slug: "app"
primary_target: "app"
related_targets: []
---

## Direction contract

THESIS: A social feed for after the sun goes down — the app you check from
bed, not from a desk under office light. Replaces the earlier field-notebook
world (warm cream paper, ink-black text), which read as flat and washed-out
once it was actually lived in rather than described. Also deliberately
exceeds the sibling Flask web client for the same backend, whose own design
is a conventional light-first coral/teal card layout with a manual dark-mode
toggle — this client commits to dark as the default scene, not an opt-in.

OWN-WORLD: Near-black ground (#0a0a10) with layered dark surfaces (#14141c
cards, #1c1c26 raised state), never pure black and never a flat single dark
gray. One reserved accent system — an indigo-violet-to-magenta gradient
(#6845e8 → #c92a72) — spent only on primary actions, the liked state, and
follow/submit buttons; everywhere else stays neutral ink/soft-text. A
self-hosted display face (Space Grotesk, bold/semibold) carries the wordmark
and page headings; a self-hosted body face (Inter) carries everything else.
Cards are rounded-2xl/3xl with soft, color-tinted, offset-and-blurred shadows
— real depth, not a flat outline. Authored ring-and-glyph SVG marks (not
emoji, not a generic icon library) for like/comment. One motion signature:
every count that changes scale-pulses once instead of snapping.

STORY: A visitor opens a live link late, in low light, and the app doesn't
fight their eyes — it feels like a considered product, not a Bootstrap
default with the colors inverted. They register, post, watch the count
pulse when they like something, and land on a profile that reads as a real
account, not a placeholder.

FIRST VIEWPORT: Composer as an elevated dark card at the top of the feed
column. Below it, posts as individual elevated cards — avatar with a subtle
ring, username + relative timestamp, content in the body face, then a row of
pill-shaped like/comment controls that fill with the gradient only when
active (liked) or is the one filled action (comment counts stay neutral,
matching the field-notebook world's "reserve the accent" discipline carried
into the new palette).

FORM: Direct redesign, not a concept-seed roll — the user explicitly asked
for a result better than both the discarded world and the sibling project,
without being consulted step by step first, so the direction was committed
and built in one pass rather than offered as a menu of concepts.

FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, and DESIGN.md rewritten to describe what actually
shipped.
