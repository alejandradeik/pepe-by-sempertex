# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies (first time)
npm run dev          # Start dev server → http://localhost:3000
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript — no emit
```

## Environment Setup

Copy `.env.local.example` → `.env.local` and fill in Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Database Setup

Run in the Supabase SQL editor **in order**:

1. `supabase/migrations/001_initial_schema.sql` — tables, triggers, RLS
2. `supabase/migrations/002_supplier_enhancements.sql` — adds `pricing_model`, `price_per_unit`, `tags`, `max_capacity`
3. `supabase/seed.sql` — 40+ realistic Colombian suppliers

## Architecture

**Stack:** Next.js 15 App Router · TypeScript · Supabase (Postgres + Auth) · Tailwind CSS 3

### Key flows

| Flow | Files |
|---|---|
| Quote request | `POST /api/cotizaciones` → saves `quote_requests` + services → `generateQuoteOptions()` → saves options + items → redirect to `/cotizacion/[id]` |
| Save quote | `POST /api/cotizaciones/guardar` — requires auth |
| Auth | Supabase cookie sessions; middleware at `src/middleware.ts` protects `/dashboard`; DB trigger auto-creates `profiles` row on signup |
| Supplier apply | Direct Supabase insert from client; status defaults to `pending` |

### Pricing models (`src/lib/quote-generator.ts`)

Suppliers have a `pricing_model` field that determines how their price is calculated:

| Model | Used by | Calculation |
|---|---|---|
| `flat` | decorator, photographer, cake, recreacionista | Fixed price from range |
| `per_child` | pasabocas_ninos, souvenirs | `price_per_unit × children_count` |
| `per_adult` | picadas_adultos | `price_per_unit × adult_count` |
| `per_person` | mobiliario | `price_per_unit × (children + adults)` |

Tier multipliers: `low = 0.85×`, `mid = 1.0×`, `high = 1.2×` the unit price.

### Directory structure

```
src/
  app/
    api/cotizaciones/         # POST: generate & save quotes
    api/cotizaciones/guardar/ # POST: save a quote option
    cotizar/                  # Multi-step quote form (Client Component)
    cotizacion/[id]/          # Results — Server shell + Client cards
    dashboard/                # Customer dashboard (Server Component, auth-protected)
    login/ registro/          # Auth pages
    proveedores/aplicar/      # Supplier application form
  components/
    layout/                   # Navbar (sticky + scroll shadow), Footer
    ui/                       # Button, Input, Select, Textarea, Badge, Skeleton
  lib/
    supabase/client.ts        # Browser client — use in "use client" files
    supabase/server.ts        # Server client — use in Server Components / Routes
    supabase/middleware.ts    # Session refresh + /dashboard guard
    quote-generator.ts        # Core business logic: fetch suppliers → 3-tier options
    utils.ts                  # cn(), formatCOP(), formatDate()
  types/index.ts              # All domain types, SERVICE_LABELS/ICONS/DESCRIPTIONS, CITIES
supabase/
  migrations/001_initial_schema.sql
  migrations/002_supplier_enhancements.sql
  seed.sql
```

### Supabase client pattern

| Context | Import |
|---|---|
| `"use client"` component | `from "@/lib/supabase/client"` |
| Server Component / Route Handler | `from "@/lib/supabase/server"` (async) |

**Never** import the server client in a Client Component.

### Guest vs authenticated quote flow

Unauthenticated users can generate quotes — the API encodes the result into the redirect URL as `guest:<json>`. Saving any quote requires auth; the UI redirects to `/registro` in that case.

### Adding a new service type

1. Add the key to `ServiceType` in `src/types/index.ts`
2. Add entries to `SERVICE_LABELS`, `SERVICE_ICONS`, `SERVICE_DESCRIPTIONS`
3. Add matching suppliers to `seed.sql` with the correct `service_categories` and `pricing_model`
4. No changes needed in the generator — it's data-driven

## Suggested next steps

- Admin dashboard to approve/reject supplier applications
- Supplier auth + their own profile/metrics dashboard
- Email notifications with Resend (quote created, supplier approved)
- Stripe integration for platform commissions
- WhatsApp deep-link instead of mailto for supplier contact
- Supplier capacity checks against event size before recommending
