<div align="center">

# Life in Dots

### See your year as dots and turn your days into wins

<a href="https://yourlifeindots.com">
  <img src="https://yourlifeindots.com/opengraph-image?v=en" alt="Life in Dots — Your year in dots" width="640" />
</a>

<p>
  <a href="https://yourlifeindots.com"><img src="https://img.shields.io/badge/demo-yourlifeindots.com-000?style=flat-square" alt="Demo" /></a>
  <img src="https://img.shields.io/badge/Next.js-15-000?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-Postgres%20%2B%20Auth-3ecf8e?style=flat-square&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Zustand-5-443e38?style=flat-square" alt="Zustand" />
  <img src="https://img.shields.io/badge/i18n-5%20languages-7c3aed?style=flat-square" alt="i18n" />
</p>

[**🌐 Try the app**](https://yourlifeindots.com) · [Report a bug](https://github.com/RaimundoDiaz/life-in-dots/issues)

</div>

---

## ✨ What is it?

**Life in Dots** turns each day of the year into a dot. Set up to **3 daily goals**, check them off, and watch your year's progress at a glance. Inspired by Tim Urban's *"Your Life in Weeks"* — but daily, and built for action, not contemplation.

> A year is 365 dots. Each dot is a decision. What are you doing with the ones you have left?

## 🎯 Features

- 📅 **Full year view** — all 365 days as dots in a grid
- ✅ **3 daily goals** — minimalist on purpose; this isn't yet another infinite-todo app
- 🎨 **Visual states** — completed, partial, missed, today, future
- 👤 **Guest mode** — try it without signing up; data lives in `localStorage`
- 🔐 **Sign in with Google** — your progress syncs to Postgres on sign-in
- 🌍 **5 languages** — Spanish, English, Portuguese, French, Italian (auto-detected)
- 📱 **Responsive** — desktop and mobile (with bottom sheet for goals)
- ⚡ **Instant** — Zustand as single source of truth, write-through mutations

## 🧱 Stack

| Layer | Tech |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) + [React 19](https://react.dev) |
| Language | [TypeScript 5](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS 3.4](https://tailwindcss.com) with custom design tokens |
| State | [Zustand 5](https://zustand-demo.pmnd.rs) (persisted to localStorage) |
| Backend | [Supabase](https://supabase.com) — Postgres + Auth (Google OAuth) |
| Icons | [lucide-react](https://lucide.dev) |
| Hosting | [Vercel](https://vercel.com) + [Vercel Analytics](https://vercel.com/analytics) |

## 🚀 Getting started

```bash
git clone https://github.com/RaimundoDiaz/life-in-dots.git
cd life-in-dots
npm install
cp .env.example .env.local   # fill in your Supabase credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server at `localhost:3000` |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check (the only correctness gate) |

## 🗂️ Structure

```
life-in-dots/
├─ app/
│  ├─ layout.tsx        # SEO metadata + JSON-LD
│  ├─ page.tsx          # single route — renders <MainView />
│  ├─ robots.ts         # dynamic robots.txt
│  ├─ sitemap.ts        # dynamic sitemap.xml
│  ├─ manifest.ts       # PWA manifest
│  ├─ opengraph-image.tsx
│  └─ auth/callback/    # Supabase OAuth callback
├─ components/          # 16 UI components
├─ lib/
│  ├─ store.ts          # Zustand (single source of truth)
│  ├─ sync.ts           # write-through mutations to Supabase
│  ├─ i18n.ts           # 5 languages, flat dictionaries
│  ├─ dates.ts          # Intl.DateTimeFormat helpers
│  ├─ dayState.ts       # derived day state
│  ├─ people.ts         # inspirational quotes
│  └─ supabase/         # 3 clients (browser, server, middleware)
└─ middleware.ts        # refreshes session cookies
```

## 🌍 i18n

5 languages ready (`es`, `en`, `pt`, `fr`, `it`). Auto-detection from `navigator.language` (2-letter prefix only: `pt-BR` → `pt`). Persisted to `profiles.locale` for signed-in users.

## 🚢 Deploy

Every push to `main` deploys automatically to Vercel. The live site is at **[yourlifeindots.com](https://yourlifeindots.com)**.

## 📄 License

MIT © [Raimundo Díaz](https://github.com/RaimundoDiaz)
