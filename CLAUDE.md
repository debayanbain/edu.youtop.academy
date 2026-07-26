# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Dev server (Turbopack) on http://localhost:3000
npm run build   # Production build
npm run start   # Serve the production build
npm run lint    # ESLint (eslint-config-next: core-web-vitals + typescript)
```

There is no test runner configured. The `db:push` / `db:studio` scripts reference `drizzle-kit`, but Drizzle is **not installed** and there is no schema/config — treat these as dead scripts; the database lives in the separate backend.

If the dev server won't start on a stale lock:

```bash
lsof -t -i:3000 -i:3001 | xargs kill -9 && rm -rf .next/dev/lock
```

## Big Picture

This is the **Next.js 16 / React 19 frontend only**. It is a thin, defensively-typed rendering layer over a **separate NestJS backend** (which itself sits in front of a **Strapi CMS**). This repo has no database, no server actions for data, and no business logic beyond payment orchestration and CMS-payload normalization.

Three external systems the frontend talks to:
- **Clerk** — authentication (`@clerk/nextjs`).
- **NestJS backend** at `NEXT_PUBLIC_API_URL` (default `http://localhost:3001`), everything under the `/api/v1` prefix. Every success response is wrapped as `{ success, data, ... }`.
- **Razorpay** — checkout for paid products (ebooks/notes), settled through the backend.

The product itself is an EdTech site for West Bengal students (Madhyamik / HS exam suggestions, notes, e-books, scholarships like SVMCM/OASIS/Nabanna, job results & news).

### Path alias
`@/*` maps to the **repo root** (`tsconfig.json` → `"@/*": ["./*"]`). There is **no `src/` directory** — `app/`, `lib/`, `components/`, `hooks/`, `store/`, `providers/` all live at the root. Note: `folder-structure.md` is **stale** and describes a `src/`-based layout that does not exist; do not trust it.

### Middleware is `proxy.ts`, not `middleware.ts`
Next.js 16 renamed the middleware convention to **`proxy.ts`**. That root file holds the Clerk `clerkMiddleware` and gates `/dashboard`, `/profile`, `/admin`.

### App boot & gating (`app/layout.tsx`)
The root layout is a server component that layers several guards, all inside `ClerkProvider` → `QueryProvider`:
1. **Missing Clerk key** → renders a full-screen "Awaiting Clerk Keys" onboarding page instead of the app (checks `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` isn't empty/placeholder). `proxy.ts` applies the same check to no-op the middleware.
2. **`<BackendErrorScreen />`** — blocks the UI if the backend connection fails.
3. **`<SyncUserProvider />`** — on sign-in, upserts the Clerk user to the backend (`POST /users/sync`) and mirrors the response into the Zustand store. Replaces an older `syncUserToDB()` server action. On failure it sets `backendError` in the store.
4. **`<ProfileWarning />`** — global banner for incomplete profiles.
5. `generateMetadata()` fetches title/favicon from `GET /api/v1/global-settings` server-side (revalidate 3600s) with a hardcoded fallback.

### Data flow
- **`lib/api.ts` — `apiClient`** is the single fetch wrapper (`get`/`post`). It attaches `Authorization: Bearer <clerk token>` when a token is passed, sends `credentials: 'include'`, and `unwrap()`s the backend's `{ data }` envelope so callers get the raw payload.
- **Auth-scoped calls** get their token from `useAuth().getToken()` (Clerk) and pass it into `apiClient`. See `hooks/use-sync-user.ts` (`useSyncUser`, `useGetMe`) for the pattern.
- **TanStack Query** (`providers/query-provider.tsx`) is the client cache — `staleTime` 1 min, no refetch on focus. Devtools mount only in development.
- **Zustand** (`store/user.store.ts`, exported via `store/index.ts`) holds the synced user, persisted to `localStorage` under key `youtop-user` (via `partialize`), plus `isSynced` / `backendError` status flags.

### Adapter layer (the core defensive pattern)
The Strapi/NestJS payloads are looser and smaller than the UI's types, so `lib/` normalizes every remote payload into a strict shape, defaulting anything missing/malformed rather than trusting the response:
- `lib/product-adapter.ts` — `ServerProduct` (ebooks/notes/courses) → UI `Book`/`Note`; includes an inline-SVG `PLACEHOLDER_IMAGE` so image fields are never empty (keeps `next/image` happy).
- `lib/content-adapters.ts` — job results & job news (`normJobResult`, `fetchJobResults`, etc.).
- `lib/global-settings.ts` — site name / logo / nav / footer, with `EMPTY_GLOBAL_SETTINGS` fallback.
- `lib/homepage-types.ts` — DTOs for the Strapi dynamic-zone homepage sections.

When adding a new backend-backed feature, follow this: define the `Server*` DTO (all fields optional/nullable), write a `norm*()` that coerces + defaults, expose a `fetch*()` that calls `apiClient` and maps. Never render a raw backend field directly.

### Payments
`hooks/useRazorpay.ts` lazy-loads the Razorpay script, creates an order via the backend, opens checkout, and verifies through the backend. Unauthenticated users are redirected to `/sign-up`. Purchase history: `apiClient.getPurchases()` → `POST /razorpay/my-purchases`.

## Conventions

- **Styling is a neo-brutalist design system.** Tailwind v4 (config in `app/globals.css` via `@theme`, no `tailwind.config.ts`). Custom tokens: `brutal-yellow/purple/green/dark/black/white/orange/pink`, plus `nb-*` accents. The look = thick black borders + hard offset box-shadows (e.g. `shadow-[4px_4px_0_0_#222222]`). Clerk components are themed to match in `layout.tsx`'s `appearance`. `components/ui/` holds the shadcn-style primitives (`components.json` present).
- **Env vars** (`.env.local`): `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_SIGN_IN_URL` / `SIGN_UP_URL` / `AFTER_SIGN_IN_URL` / `AFTER_SIGN_UP_URL`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_STRAPI_URL`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`.
- **Remote images** must have their host added to `next.config.ts` `images.remotePatterns` (currently unsplash, m.media-amazon, `cdn.oxland.in`, and localhost:4040 / 127.0.0.1:4040 for local backend assets).
- TypeScript is `strict`. Client components need the `"use client"` directive (framer-motion, hooks, Clerk client APIs).
