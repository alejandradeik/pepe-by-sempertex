-- ============================================================
-- Pepe — Migration 002: Supplier enhancements
-- ============================================================
-- Run after 001_initial_schema.sql

-- Pricing model for realistic per-person quote generation
alter table public.supplier_profiles
  add column if not exists pricing_model text not null default 'flat'
    check (pricing_model in ('flat', 'per_child', 'per_adult', 'per_person'));

-- Unit price used when pricing_model != flat
-- e.g. 8000 COP per child for pasabocas
alter table public.supplier_profiles
  add column if not exists price_per_unit integer not null default 0;

-- Style / specialty tags for better matching (e.g. 'infantil', 'premium', 'Elmo')
alter table public.supplier_profiles
  add column if not exists tags text[] not null default '{}';

-- Maximum capacity for services that have a head-count limit
alter table public.supplier_profiles
  add column if not exists max_capacity integer;

-- Add budget_summary to quote_requests for quick display
alter table public.quote_requests
  add column if not exists budget_breakdown jsonb;

-- Index for tag-based filtering
create index if not exists idx_supplier_tags on public.supplier_profiles using gin(tags);
