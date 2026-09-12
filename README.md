# sosyal.log

A React + TypeScript client for [Sosyal-Medya-Web](https://github.com/UmutErayAltay/Sosyal-Medya-Web) — a real, already-deployed Flask/Supabase social platform (306 commits, 300+ tests, a native Android client on the same API). This is a third, independent client against that same live REST API: auth, a feed with post creation, likes, comments, and profiles with follow.

It exists to be real, checkable evidence behind a portfolio claim, not a demo — every screen here is a real request against `https://sosyalmedyadeneme.onrender.com`, no mocked data.

## Stack

Vite + React 18 + TypeScript, React Router, TanStack Query for all server state, Tailwind CSS. Auth token in `localStorage`, injected via a small `fetch` wrapper (`src/lib/api.ts`).

## Scope (v1, deliberately)

Register/login, feed (list + create text posts), like, comment, profile view + follow. The backend exposes ~100 more routes (messaging, stories, polls, reels, ...); this client intentionally doesn't surface them — see `PRODUCT.md` for why.

## Design

Visual direction ("field notebook / lab log" — see `.impeccable/surfaces/app.md`) was picked via the `impeccable` design skill's direction roll rather than a default template look: a working record of activity, not a card-based feed. No rounded cards, no gradients — flush-left dated entries, monospace metadata, one accent color reserved for the liked state.

## Run it

```bash
npm install
cp .env.example .env   # point VITE_API_BASE_URL at a running backend
npm run dev
```

By default `.env.example` points at `http://localhost:5000/api/v1` — run the [Sosyal-Medya-Web](https://github.com/UmutErayAltay/Sosyal-Medya-Web) backend locally (`python run.py`) with `API_CORS_ORIGINS=http://localhost:5173` in its `.env`, or point `VITE_API_BASE_URL` at the live backend once its CORS allow-list includes this client's deployed origin.

## Test

```bash
npm test        # Vitest + React Testing Library + MSW
npm run build   # type-check + production build
```
