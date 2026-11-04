# CLAUDE.md — Life in Dots

Instructions for any AI coding agent (Claude Code or similar) working in this repo.
**Read this whole file before making changes.** These rules are set by the project owner
and take precedence over your defaults and over contributor-level preferences.

Live site: https://yourlifeindots.com — **every push to `main` deploys to production on Vercel.**

---

## 0. Before you start (mandatory workflow)

1. **Never commit or push directly to `main`.** Create a branch first:
   `git checkout -b <type>/<short-description>` (e.g. `design/goals-panel-spacing`, `fix/mobile-legend`).
2. Keep changes **small and scoped** to what was asked. No drive-by refactors, renames,
   dependency upgrades or file moves unless explicitly requested.
3. Before every commit, run and make sure both pass:
   ```bash
   npx tsc --noEmit   # type check — must report 0 errors
   npm run build      # must succeed
   ```
4. Open a **Pull Request** to `main` and let the owner (@RaimundoDiaz) review it. Never merge your own PR.
5. If a request requires touching anything in the **"Ask first"** list (section 7), stop and
   explain what would change instead of doing it.

## 1. Stack

- Next.js 15 (App Router) + React 19 + TypeScript 5 (`strict: true`)
- Tailwind CSS 3.4 with custom design tokens (`tailwind.config.ts`)
- Zustand 5 — single source of truth for client state (`lib/store.ts`)
- Supabase — Postgres + Auth (Google OAuth), via `@supabase/ssr`
- lucide-react for icons, Vercel for hosting + Analytics

Do not add new libraries (UI kits, CSS-in-JS, state managers, animation libs, icon packs, date libs)
without owner approval. Solve it with what is already installed.

## 2. Architecture (respect the boundaries)

```
app/               routes. Single page (page.tsx) + auth/callback + SEO files
components/        UI components (all client components)
lib/store.ts       Zustand store — ALL app state lives here
lib/sync.ts        the ONLY place that talks to Supabase tables
lib/supabase/      Supabase clients: client.ts (browser), server.ts (server)
lib/i18n.ts        translations for es / en / pt / fr / it
lib/dates.ts       date helpers (Intl-based)
lib/dayState.ts    derived state of a day (completed / partial / missed / ...)
middleware.ts      refreshes Supabase session cookies
```

Data flow: **component → store action → (if signed in) `lib/sync.ts` → Supabase.**

- Components **must not** import `@/lib/supabase/*` or call `supabase.from(...)` directly.
  Read state with `useAppStore` and mutate through store actions.
- New persistent data = new store field + action + sync function. Ask first (it implies a DB change).
- Guest mode (no account, data in `localStorage`) must keep working. Any feature must work for
  both guest and signed-in users, or be explicitly hidden for guests.
- Day keys come from `dateKey()` in `lib/dates.ts`. Don't build date strings by hand,
  and don't use `toLocaleDateString` without the locale from `useLocale()`.

## 3. UI / design rules

- **Use the Tailwind tokens** from `tailwind.config.ts` (`ink`, `paper`, `muted`, `line`, `surface`,
  `danger`, `success`, …) and `font-serif` / `font-sans`. Do not hardcode hex colors or
  arbitrary values (`text-[#123456]`, `mt-[13px]`) when a token or scale step exists. If a new
  color is genuinely needed, add it as a token in `tailwind.config.ts`.
- No inline `style={{...}}` for things Tailwind can express. No new global CSS except in `app/globals.css`, and only when unavoidable.
- **Responsive is required**: every change must work on mobile (~375px), desktop, and the
  large breakpoints (`2xl` 1400px, `3xl` 1920px). On mobile the goals panel is a bottom sheet — keep it that way.
- Reuse existing components (`Modal`, `ProfileAvatar`, etc.) before creating new ones.
  One component per file in `components/`, PascalCase file name = component name.
- Icons: `lucide-react` only. Images go in `public/`, optimized (prefer SVG/WebP, keep them small).
- Accessibility: interactive elements are `<button>`/`<a>` (not clickable `<div>`s), icon-only
  buttons have `aria-label`, keep visible focus states, keep sufficient contrast.

## 4. Text and i18n

- **No hardcoded user-facing strings in components.** Every visible text goes through
  `const t = useT()` and a key in `lib/i18n.ts`.
- When you add or change a key, add it to **all 5 locales** (`es`, `en`, `pt`, `fr`, `it`).
  Never leave a locale missing a key.
- Key naming: `section.thing` (e.g. `goals.addPlaceholder`). Interpolation uses `{name}`.

## 5. Code standards

- TypeScript strict. **No `any`**, no `@ts-ignore` / `@ts-expect-error`, no non-null `!`
  except on the existing `process.env.NEXT_PUBLIC_*` reads.
- Use the `@/` import alias (e.g. `@/lib/store`), not long relative paths.
- Function components + hooks only. Keep components focused; if one grows past ~250 lines, propose splitting.
- Don't leave `console.log`, commented-out code, unused imports, or TODOs without context.
- Mark client components with `"use client"` only when they use state/effects/browser APIs.
- Performance: avoid new effects that run on every render, subscribe to narrow Zustand
  selectors (`useAppStore(s => s.days)`, not the whole store), don't re-render the 365-dot grid
  unnecessarily, use `next/image` for raster images.

## 6. Security (non-negotiable)

- **Never commit secrets.** `.env*` files are git-ignored — keep it that way. Never paste keys
  into code, comments, README, or commit messages. Only `NEXT_PUBLIC_SUPABASE_URL` and
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` may be used in the browser.
- Never use or add a Supabase **service role / secret key** anywhere in this app.
- Data security relies on Postgres **Row Level Security** (each user only sees their own
  `profiles` / `goals`). Never disable RLS, never write queries that assume you can read other users' data.
- Don't render user content with `dangerouslySetInnerHTML`. Don't use `eval` / `new Function`.
- Keep `safeNext()` in `app/auth/callback/route.ts` (prevents open redirects) and the security
  headers in `next.config.mjs` intact.
- Don't add third-party scripts, trackers, fonts from new CDNs, or external API calls without approval.

## 7. Ask the owner first — do NOT change on your own

- Database schema, migrations, RLS policies, or anything in the Supabase dashboard
- `lib/store.ts` shape, `lib/sync.ts`, `lib/supabase/*`, `middleware.ts`, `app/auth/**`
- `next.config.mjs`, `tsconfig.json`, `package.json` / `package-lock.json` (deps), Vercel config
- SEO files: `app/layout.tsx` metadata/JSON-LD, `robots.ts`, `sitemap.ts`, `manifest.ts`, `opengraph-image.tsx`
- Deleting files or features, or changing guest-mode behavior

Pure UI/visual work inside `components/`, `app/globals.css`, `tailwind.config.ts` tokens,
`public/` assets and new i18n keys is fine to do directly (on a branch, via PR).

## 8. Git conventions

- Everything versioned is **in English**: commit messages, code, comments, PR descriptions.
- Commit messages: imperative, concise, describing the why (e.g. `Tighten goals panel spacing on mobile`).
- **Do not add `Co-Authored-By` or any AI attribution trailer to commits.**
- One logical change per commit. Never commit `.next/`, `node_modules/`, `.env*`, `.DS_Store`, or `*.tsbuildinfo`.
- Never force-push, rewrite history on shared branches, or delete branches you didn't create.

## 9. Definition of done (checklist for every PR)

- [ ] Work is on a branch, not `main`
- [ ] `npx tsc --noEmit` passes with 0 errors
- [ ] `npm run build` succeeds
- [ ] Checked in the browser (`npm run dev`) on mobile width and desktop width
- [ ] Works as guest **and** signed in (if the change touches anything data-related)
- [ ] All new texts translated in the 5 locales
- [ ] Only Tailwind tokens used; no hardcoded colors
- [ ] No secrets, no new dependencies, nothing from the "Ask first" list touched
- [ ] PR description explains what changed and includes screenshots for visual changes
