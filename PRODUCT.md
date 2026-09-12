# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React 18 + TypeScript, React Router, TanStack Query, Tailwind CSS.
Decided earlier in the project's design brainstorm (not delegated to this
skill) — a plain SPA is the right shape because the backend is a separate,
already-deployed REST API (see Positioning).

## Users

Primary: a technical recruiter, hiring manager, or freelance client
evaluating Umut Eray Altay's frontend/full-stack ability — skimming a
GitHub repo and a live demo link for a few minutes, not a returning end
user. Secondary: an end user of the underlying social platform trying this
client as an alternate way into the same network.

## Product Purpose

A real, working React + TypeScript client for the existing `sosyal-medya`
social platform's REST API. It exists specifically to be credible evidence
behind a CV line ("React & TypeScript") that was previously unbacked by any
finished project — so "does this actually work against the real backend"
matters more here than in a typical app.

## Positioning

Unlike a tutorial clone or a client built against a backend invented to fit
it, this integrates with an already-live, already-tested production API
(306 commits, 300+ tests, a native Android client already consuming the
same endpoints, real users on `sosyalmedyadeneme.onrender.com`). The claim
this makes is "can integrate with a real, non-trivial backend," not "can
build a demo."

## Operating Context

Solo developer, portfolio-evaluation context: a stranger opens a GitHub
README or a live link cold, with no onboarding and a few minutes of
attention. Not a team-iterated product under live user load.

## Capabilities and Constraints

v1 scope (deliberately, not because of a technical limit): register/login,
a text feed with post creation, like, comment, and profile view + follow.
Image/video post creation and the platform's other ~100 API routes
(messaging, stories, polls, reels, ...) are out of scope for this client —
the backend supports them, this client intentionally doesn't surface them.
No SSR: the API lives on a separate origin (CORS-enabled for this client's
origin specifically), so a plain SPA is correct, not a shortcut.

## Brand Commitments

None. The sibling Jinja/vanilla-JS web frontend for the same backend has
its own existing look, but this client is presented as an independent
artifact, not a reskin — it is free to establish its own visual identity.

## Evidence on Hand

Backend source: github.com/UmutErayAltay/Sosyal-Medya-Web. Live backend:
https://sosyalmedyadeneme.onrender.com. No existing logo, mockup, or brand
asset for this client specifically — none should be invented as if real.

## Product Principles

- Prove real integration, not decoration: every screen reflects an actual
  backend call against real data; nothing is faked to look more finished.
- Fast first impression: a stranger should recognize this as a working
  social app within seconds of opening it.
- Scope discipline over feature breadth: v1 stays inside auth/feed/profile
  on purpose; resist filling empty space with more surface area.
- Never show a raw/unhandled error string — every failure state is
  designed, not a leaked "Request failed with status code 500".

## Accessibility & Inclusion

No product-specific requirement was established. Standard baseline
(keyboard-operable forms, semantic roles/labels) applies; no elevated
compliance target is claimed.
