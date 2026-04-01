# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### `artifacts/cha-a-chumuk` — Cha A Chumuk Website
React + Vite website for Cha A Chumuk cafe/restaurant in Khanakul, Hooghly.

**Features:**
- Sticky responsive navbar with logo
- English / Bengali language toggle (using Zustand state)
- Light / Dark mode toggle
- Home page: hero with real cafe photos, floating elements, popular dishes, gallery, CTA
- Menu page: actual menu card image display + searchable/filterable item list
- Contact page: phone/WhatsApp buttons, embedded Google Map of Khanakul
- Smooth CSS animations (fadeInUp, float, reveal on scroll)
- Footer with links, location, social placeholders

**Key files:**
- `src/App.tsx` — routing (wouter)
- `src/lib/i18n.ts` — English/Bengali translations
- `src/lib/menuData.ts` — all menu items with prices
- `src/lib/store.ts` — Zustand store for lang/dark state
- `src/pages/Home.tsx` — home page
- `src/pages/Menu.tsx` — menu with search & category filters
- `src/pages/Contact.tsx` — contact info + map
- `src/components/Navbar.tsx` — sticky nav with toggles
- `src/components/Footer.tsx` — footer
- `public/` — cafe images copied from attached_assets

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── cha-a-chumuk/       # Cha A Chumuk cafe website (React + Vite)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```
