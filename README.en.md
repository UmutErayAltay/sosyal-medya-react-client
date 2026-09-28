# sosyal.log

[Türkçe](README.md) · English

## Description

sosyal.log is a React + TypeScript client wired to the REST API of the [Sosyal-Medya-Web](https://github.com/UmutErayAltay/Sosyal-Medya-Web) backend. It covers register/login, the feed, text-post creation, likes, post detail with comments, and profiles with follow. All server state goes through TanStack Query, the session token lives in `localStorage` (`smrc_auth`), and a small `fetch` wrapper in `src/lib/api.ts` attaches it as an `Authorization` header. Because the backend is itself a real, already-deployed Flask/Supabase app (300+ tests, plus a native Android client on the same API), this is the third and an independent client speaking to that API: the goal is not a demo, but checkable evidence you can put behind a portfolio claim.

## Screenshots

![Feed view](docs/screenshots/feed-desktop.png)

![Profile view](docs/screenshots/profile-desktop.png)

![Login screen](docs/screenshots/login-desktop.png)

## Stack

Vite + React 19 + TypeScript, React Router, TanStack Query for server state, Tailwind CSS 4. Type comes from self-hosted `@fontsource` packages (Space Grotesk + Inter); no icon library.

## Scope (v1, deliberately narrow)

Register/login, feed (list + text-post creation), like, post detail + comment, profile view + follow. The backend exposes roughly 100 more routes (messaging, stories, polls, reels, ...); this client intentionally doesn't surface them — the reasoning is in `PRODUCT.md`.

A few boundaries are deliberate: likes and their counts update **optimistically**, so the heart and the counter flip before the network responds and roll back on failure. The composer accepts text only (though it posts `FormData`, so adding image/video at the API layer is a small step later) and `visibility` is `public` for now. Comments read nested replies, but this client doesn't offer writing them.

## Design

Visual direction ("Afterhours" — see `DESIGN.md` and `.impeccable/surfaces/app.md`), built with the `impeccable` design skill: a dark-first social feed rather than a light SaaS default. Layered near-black surfaces, self-hosted Space Grotesk/Inter type, and one indigo-to-magenta gradient accent reserved for primary actions and the liked state. This replaced an earlier lighter "field notebook" direction after real use showed it reading as flat and washed-out; an independent finish review (contrast measurements, touch-target sizing, states) ran before it shipped.

Every failure state is designed: API error codes (`invalid_credentials`, `rate_limited`, `mfa_required`, ...) are translated into user-facing messages, so a raw `Request failed with status code 500` never reaches the screen.

## Run it

```bash
npm install
cp .env.example .env   # point VITE_API_BASE_URL at a running backend
npm run dev
```

By default `.env.example` points at `http://localhost:5000/api/v1` — run the [Sosyal-Medya-Web](https://github.com/UmutErayAltay/Sosyal-Medya-Web) backend locally (`python run.py` with `API_CORS_ORIGINS=http://localhost:5173` in its `.env`), or point `VITE_API_BASE_URL` at the live backend, in which case its CORS allow-list must already include this client's deployed origin.

## Test

```bash
npm test        # Vitest + React Testing Library + MSW
npm run build   # type-check + production build
```

`.github/workflows/ci.yml` runs `npm ci` → `npm test` → `npm run build` on Node 22 for every PR and every push to `main`.
