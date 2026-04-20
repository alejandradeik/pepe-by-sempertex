-- ============================================================
-- Pepe — Initial Schema
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ─── profiles ────────────────────────────────────────────────────────────────
-- One row per authenticated user (created via trigger on auth.users)
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  role        text not null default 'customer' check (role in ('customer', 'supplier', 'admin')),
  full_name   text not null default '',
  email       text not null default '',
  phone       text,
  city        text,
  created_at  timestamptz not null default now()
);

-- Auto-create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── supplier_profiles ───────────────────────────────────────────────────────
create table public.supplier_profiles (
  id                  uuid primary key default gen_random_uuid(),
  profile_id          uuid references public.profiles(id) on delete set null,
  business_name       text not null,
  contact_name        text not null,
  email               text not null,
  phone               text not null,
  city                text not null,
  service_categories  text[] not null default '{}',
  price_range_min     integer not null default 0,
  price_range_max     integer not null default 0,
  description         text not null default '',
  instagram_url       text,
  website_url         text,
  years_experience    integer not null default 0,
  status              text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  rating              numeric(3,2),
  created_at          timestamptz not null default now()
);

create index idx_supplier_profiles_city     on public.supplier_profiles(city);
create index idx_supplier_profiles_status   on public.supplier_profiles(status);
create index idx_supplier_profiles_services on public.supplier_profiles using gin(service_categories);

-- ─── quote_requests ──────────────────────────────────────────────────────────
create table public.quote_requests (
  id            uuid primary key default gen_random_uuid(),
  customer_id   uuid not null references public.profiles(id) on delete cascade,
  event_type    text not null,
  event_theme   text,
  honoree_age   integer,
  budget_cop    integer not null,
  city          text not null,
  venue_type    text not null check (venue_type in ('salon_social','casa','finca','restaurante','otro')),
  children_count integer not null default 0,
  adult_count   integer not null default 0,
  event_date    date,
  notes         text,
  created_at    timestamptz not null default now()
);

create index idx_quote_requests_customer on public.quote_requests(customer_id);

-- ─── quote_request_services ──────────────────────────────────────────────────
create table public.quote_request_services (
  id                uuid primary key default gen_random_uuid(),
  quote_request_id  uuid not null references public.quote_requests(id) on delete cascade,
  service_type      text not null
);

create index idx_qrs_request on public.quote_request_services(quote_request_id);

-- ─── quote_options ───────────────────────────────────────────────────────────
create table public.quote_options (
  id                uuid primary key default gen_random_uuid(),
  quote_request_id  uuid not null references public.quote_requests(id) on delete cascade,
  option_type       text not null check (option_type in ('economica','balanceada','premium')),
  total_price_cop   integer not null,
  summary           text not null,
  fit_explanation   text not null,
  created_at        timestamptz not null default now()
);

create index idx_quote_options_request on public.quote_options(quote_request_id);

-- ─── quote_option_items ──────────────────────────────────────────────────────
create table public.quote_option_items (
  id                    uuid primary key default gen_random_uuid(),
  quote_option_id       uuid not null references public.quote_options(id) on delete cascade,
  supplier_profile_id   uuid not null references public.supplier_profiles(id),
  service_type          text not null,
  item_name             text not null,
  estimated_price_cop   integer not null,
  notes                 text
);

create index idx_qoi_option on public.quote_option_items(quote_option_id);

-- ─── saved_quotes ────────────────────────────────────────────────────────────
create table public.saved_quotes (
  id                uuid primary key default gen_random_uuid(),
  customer_id       uuid not null references public.profiles(id) on delete cascade,
  quote_request_id  uuid not null references public.quote_requests(id) on delete cascade,
  quote_option_id   uuid not null references public.quote_options(id) on delete cascade,
  created_at        timestamptz not null default now(),
  unique (customer_id, quote_option_id)
);

create index idx_saved_quotes_customer on public.saved_quotes(customer_id);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.profiles             enable row level security;
alter table public.supplier_profiles    enable row level security;
alter table public.quote_requests       enable row level security;
alter table public.quote_request_services enable row level security;
alter table public.quote_options        enable row level security;
alter table public.quote_option_items   enable row level security;
alter table public.saved_quotes         enable row level security;

-- profiles: users can read/update their own row
create policy "profiles: own read"   on public.profiles for select using (auth.uid() = id);
create policy "profiles: own update" on public.profiles for update using (auth.uid() = id);

-- supplier_profiles: anyone can read approved suppliers; only the linked user can update
create policy "suppliers: public read approved"
  on public.supplier_profiles for select
  using (status = 'approved');

create policy "suppliers: own update"
  on public.supplier_profiles for update
  using (profile_id = auth.uid());

-- Anyone (including anon) can INSERT a supplier application (apply flow)
create policy "suppliers: insert application"
  on public.supplier_profiles for insert
  with check (true);

-- quote_requests: customers own their data
create policy "quote_requests: own all"
  on public.quote_requests for all
  using (customer_id = auth.uid());

-- Allow insert for authenticated users
create policy "quote_requests: insert"
  on public.quote_requests for insert
  with check (customer_id = auth.uid());

-- quote_request_services: tied to quote_requests ownership
create policy "qrs: own read"
  on public.quote_request_services for select
  using (
    exists (
      select 1 from public.quote_requests qr
      where qr.id = quote_request_id and qr.customer_id = auth.uid()
    )
  );

create policy "qrs: insert"
  on public.quote_request_services for insert
  with check (
    exists (
      select 1 from public.quote_requests qr
      where qr.id = quote_request_id and qr.customer_id = auth.uid()
    )
  );

-- quote_options: tied to quote_requests ownership
create policy "quote_options: own read"
  on public.quote_options for select
  using (
    exists (
      select 1 from public.quote_requests qr
      where qr.id = quote_request_id and qr.customer_id = auth.uid()
    )
  );

create policy "quote_options: insert"
  on public.quote_options for insert
  with check (
    exists (
      select 1 from public.quote_requests qr
      where qr.id = quote_request_id and qr.customer_id = auth.uid()
    )
  );

-- quote_option_items: readable if linked option is readable
create policy "qoi: own read"
  on public.quote_option_items for select
  using (
    exists (
      select 1 from public.quote_options qo
      join public.quote_requests qr on qr.id = qo.quote_request_id
      where qo.id = quote_option_id and qr.customer_id = auth.uid()
    )
  );

create policy "qoi: insert"
  on public.quote_option_items for insert
  with check (
    exists (
      select 1 from public.quote_options qo
      join public.quote_requests qr on qr.id = qo.quote_request_id
      where qo.id = quote_option_id and qr.customer_id = auth.uid()
    )
  );

-- saved_quotes: customers own their saved items
create policy "saved_quotes: own all"
  on public.saved_quotes for all
  using (customer_id = auth.uid());

create policy "saved_quotes: insert"
  on public.saved_quotes for insert
  with check (customer_id = auth.uid());
