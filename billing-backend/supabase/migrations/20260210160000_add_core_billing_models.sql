-- Core billing models for the hiring challenge.

do $$
begin
  if not exists (select 1 from pg_type where typname = 'subscription_status') then
    create type public.subscription_status as enum ('active', 'paused', 'cancelled');
  end if;
end $$;

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(12,2) not null
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id),
  customer_id uuid not null references public.customers(id),
  price numeric(12,2) not null,
  status public.subscription_status not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz null
);

create index if not exists subscriptions_customer_id_idx on public.subscriptions(customer_id);
create index if not exists subscriptions_product_id_idx on public.subscriptions(product_id);
create index if not exists subscriptions_deleted_at_idx on public.subscriptions(deleted_at);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_subscriptions_updated_at on public.subscriptions;
create trigger set_subscriptions_updated_at
before update on public.subscriptions
for each row execute function public.set_updated_at();

alter table public.customers enable row level security;
alter table public.products enable row level security;
alter table public.subscriptions enable row level security;

-- For this challenge repo, keep data accessible locally without auth complexity.
drop policy if exists "public read customers" on public.customers;
create policy "public read customers" on public.customers for select using (true);
drop policy if exists "public read products" on public.products;
create policy "public read products" on public.products for select using (true);
drop policy if exists "public read subscriptions" on public.subscriptions;
create policy "public read subscriptions" on public.subscriptions for select using (true);
