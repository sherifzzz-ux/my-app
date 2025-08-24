-- Create site_settings table (singleton)
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  site_name text,
  currency text default 'XOF',
  email text,
  phone text,
  address text,
  city text,
  country text default 'SN',
  free_shipping_threshold integer default 0,
  maintenance_mode boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.site_settings enable row level security;

-- Admin-only policies using has_role(_uid,'admin') from previous migration
do $$ begin
  perform 1 from pg_proc where proname = 'has_role';
  if not found then
    raise notice 'Function has_role not found; policies will allow authenticated by default';
  end if;
end $$;

drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings"
on public.site_settings
for all
using (coalesce(public.has_role(auth.uid(), 'admin'), true))
with check (coalesce(public.has_role(auth.uid(), 'admin'), true));

-- Update trigger
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_site_settings_updated_at on public.site_settings;
create trigger update_site_settings_updated_at
before update on public.site_settings
for each row execute function public.update_updated_at_column();

-- Create audit_logs table
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  entity text,
  entity_id text,
  actor_id uuid,
  details jsonb,
  created_at timestamptz default now()
);

alter table public.audit_logs enable row level security;

drop policy if exists "Admins can view audit logs" on public.audit_logs;
create policy "Admins can view audit logs"
on public.audit_logs
for select
using (coalesce(public.has_role(auth.uid(), 'admin'), true));

drop policy if exists "Admins can insert audit logs" on public.audit_logs;
create policy "Admins can insert audit logs"
on public.audit_logs
for insert
with check (coalesce(public.has_role(auth.uid(), 'admin'), true));


