-- Create e-commerce tables for Supabase
-- Categories
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Subcategories
create table if not exists public.subcategories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category_id uuid not null references public.categories(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Brands
create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price_cents integer not null default 0,
  old_price_cents integer,
  image_url text,
  is_featured boolean default false,
  rating real default 0,
  stock integer default 0,
  category_id uuid not null references public.categories(id) on delete cascade,
  subcategory_id uuid references public.subcategories(id) on delete set null,
  brand_id uuid references public.brands(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.categories enable row level security;
alter table public.subcategories enable row level security;
alter table public.brands enable row level security;
alter table public.products enable row level security;

-- Admin policies for all tables
create policy "Admins can manage categories" on public.categories
for all using (coalesce(public.has_role(auth.uid(), 'admin'), true))
with check (coalesce(public.has_role(auth.uid(), 'admin'), true));

create policy "Admins can manage subcategories" on public.subcategories
for all using (coalesce(public.has_role(auth.uid(), 'admin'), true))
with check (coalesce(public.has_role(auth.uid(), 'admin'), true));

create policy "Admins can manage brands" on public.brands
for all using (coalesce(public.has_role(auth.uid(), 'admin'), true))
with check (coalesce(public.has_role(auth.uid(), 'admin'), true));

create policy "Admins can manage products" on public.products
for all using (coalesce(public.has_role(auth.uid(), 'admin'), true))
with check (coalesce(public.has_role(auth.uid(), 'admin'), true));

-- Public read policies for products and categories
create policy "Public can view categories" on public.categories
for select using (true);

create policy "Public can view subcategories" on public.subcategories
for select using (true);

create policy "Public can view brands" on public.brands
for select using (true);

create policy "Public can view products" on public.products
for select using (true);

-- Update triggers
create trigger update_categories_updated_at
before update on public.categories
for each row execute function public.update_updated_at_column();

create trigger update_subcategories_updated_at
before update on public.subcategories
for each row execute function public.update_updated_at_column();

create trigger update_brands_updated_at
before update on public.brands
for each row execute function public.update_updated_at_column();

create trigger update_products_updated_at
before update on public.products
for each row execute function public.update_updated_at_column();

-- Insert some sample data
insert into public.categories (name, slug) values 
  ('Soin du visage', 'soin-du-visage'),
  ('Maquillage', 'maquillage'),
  ('Corps et bain', 'corps-et-bain'),
  ('Cheveux', 'cheveux')
on conflict (slug) do nothing;

insert into public.brands (name, slug) values 
  ('L''Oréal', 'loreal'),
  ('Nivea', 'nivea'),
  ('Garnier', 'garnier')
on conflict (slug) do nothing;
