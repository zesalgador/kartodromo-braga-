-- Sistema privado de vouchers KIB
-- Executar no SQL Editor do Supabase (ou via CLI).
-- Desativar "Enable sign ups" em Authentication > Providers > Email.

create extension if not exists pgcrypto;

do $$ begin
  create type public.user_role as enum ('admin', 'staff');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.voucher_status as enum ('active', 'used', 'cancelled', 'expired');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.kart_type as enum ('270cc', '390cc', 'bilugar', 'crianca');
exception when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text not null,
  role public.user_role not null default 'staff',
  created_at timestamptz not null default now()
);

create table if not exists public.vouchers (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  kart_type public.kart_type not null,
  duration_minutes integer not null check (duration_minutes in (10, 20, 30)),
  price_eur numeric(10, 2) not null check (price_eur >= 0),
  recipient_name text,
  purchaser_name text,
  valid_until date,
  status public.voucher_status not null default 'active',
  notes text,
  created_by uuid not null references public.profiles (id),
  created_at timestamptz not null default now(),
  used_at timestamptz,
  used_by uuid references public.profiles (id),
  cancelled_at timestamptz,
  cancelled_by uuid references public.profiles (id),
  constraint vouchers_code_format check (code ~ '^KIB-[A-Z0-9]{8}$')
);

create unique index if not exists vouchers_code_unique on public.vouchers (code);

create table if not exists public.voucher_events (
  id uuid primary key default gen_random_uuid(),
  voucher_id uuid not null references public.vouchers (id) on delete cascade,
  event_type text not null check (
    event_type in ('created', 'lookup', 'consume_attempt', 'consumed', 'cancelled')
  ),
  actor_id uuid references public.profiles (id),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists voucher_events_voucher_id_idx on public.voucher_events (voucher_id, created_at desc);
create index if not exists vouchers_status_idx on public.vouchers (status, created_at desc);

alter table public.profiles enable row level security;
alter table public.vouchers enable row level security;
alter table public.voucher_events enable row level security;

revoke all on public.profiles from anon, public;
revoke all on public.vouchers from anon, public;
revoke all on public.voucher_events from anon, public;

grant select on public.profiles to authenticated;
grant select, insert, update on public.vouchers to authenticated;
grant select, insert on public.voucher_events to authenticated;

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select role = 'admin' from public.profiles where id = auth.uid()), false);
$$;

create or replace function public.is_staff_or_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select role in ('admin', 'staff') from public.profiles where id = auth.uid()),
    false
  );
$$;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists "vouchers_select_admin" on public.vouchers;
create policy "vouchers_select_admin"
  on public.vouchers for select
  to authenticated
  using (public.is_admin());

drop policy if exists "vouchers_insert_admin" on public.vouchers;
create policy "vouchers_insert_admin"
  on public.vouchers for insert
  to authenticated
  with check (public.is_admin() and created_by = auth.uid());

drop policy if exists "vouchers_update_admin_cancel" on public.vouchers;
create policy "vouchers_update_admin_cancel"
  on public.vouchers for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "voucher_events_select_admin" on public.voucher_events;
create policy "voucher_events_select_admin"
  on public.voucher_events for select
  to authenticated
  using (public.is_admin());

drop policy if exists "voucher_events_insert_admin" on public.voucher_events;
create policy "voucher_events_insert_admin"
  on public.voucher_events for insert
  to authenticated
  with check (public.is_admin());

-- Leitura e consumo passam por funções SECURITY DEFINER (não consomem no lookup).
create or replace function public.lookup_voucher(p_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.vouchers%rowtype;
  used_name text;
  normalized text;
begin
  if auth.uid() is null or not public.is_staff_or_admin() then
    return jsonb_build_object('ok', false, 'error', 'forbidden');
  end if;

  normalized := upper(trim(p_code));

  select * into v
  from public.vouchers
  where code = normalized;

  if not found then
    return jsonb_build_object('ok', false, 'error', 'not_found');
  end if;

  if v.status = 'active' and v.valid_until is not null and v.valid_until < current_date then
    update public.vouchers
      set status = 'expired'
      where id = v.id and status = 'active';
    v.status := 'expired';
  end if;

  insert into public.voucher_events (voucher_id, event_type, actor_id, metadata)
  values (
    v.id,
    'lookup',
    auth.uid(),
    jsonb_build_object('status', v.status)
  );

  select full_name into used_name from public.profiles where id = v.used_by;

  return jsonb_build_object(
    'ok', true,
    'voucher', jsonb_build_object(
      'id', v.id,
      'code', v.code,
      'kart_type', v.kart_type,
      'duration_minutes', v.duration_minutes,
      'price_eur', v.price_eur,
      'recipient_name', v.recipient_name,
      'purchaser_name', v.purchaser_name,
      'valid_until', v.valid_until,
      'status', v.status,
      'created_at', v.created_at,
      'used_at', v.used_at,
      'used_by_name', used_name,
      'notes', v.notes
    )
  );
end;
$$;

create or replace function public.consume_voucher(p_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.vouchers%rowtype;
  used_name text;
  normalized text;
begin
  if auth.uid() is null or not public.is_staff_or_admin() then
    return jsonb_build_object('ok', false, 'error', 'forbidden');
  end if;

  normalized := upper(trim(p_code));

  select * into v
  from public.vouchers
  where code = normalized
  for update;

  if not found then
    return jsonb_build_object('ok', false, 'error', 'not_found');
  end if;

  insert into public.voucher_events (voucher_id, event_type, actor_id, metadata)
  values (v.id, 'consume_attempt', auth.uid(), jsonb_build_object('from_status', v.status));

  if v.status = 'used' then
    select full_name into used_name from public.profiles where id = v.used_by;
    return jsonb_build_object(
      'ok', false,
      'error', 'already_used',
      'voucher', jsonb_build_object(
        'code', v.code,
        'used_at', v.used_at,
        'used_by_name', used_name,
        'status', v.status
      )
    );
  end if;

  if v.status = 'cancelled' then
    return jsonb_build_object('ok', false, 'error', 'cancelled');
  end if;

  if v.status = 'expired' or (v.valid_until is not null and v.valid_until < current_date) then
    update public.vouchers
      set status = 'expired'
      where id = v.id and status = 'active';
    return jsonb_build_object('ok', false, 'error', 'expired');
  end if;

  if v.status <> 'active' then
    return jsonb_build_object('ok', false, 'error', 'invalid_status');
  end if;

  update public.vouchers
    set status = 'used',
        used_at = now(),
        used_by = auth.uid()
    where id = v.id
      and status = 'active';

  if not found then
    return jsonb_build_object('ok', false, 'error', 'already_used');
  end if;

  select * into v from public.vouchers where id = v.id;
  select full_name into used_name from public.profiles where id = v.used_by;

  insert into public.voucher_events (voucher_id, event_type, actor_id, metadata)
  values (v.id, 'consumed', auth.uid(), jsonb_build_object('used_at', v.used_at));

  return jsonb_build_object(
    'ok', true,
    'voucher', jsonb_build_object(
      'id', v.id,
      'code', v.code,
      'kart_type', v.kart_type,
      'duration_minutes', v.duration_minutes,
      'price_eur', v.price_eur,
      'recipient_name', v.recipient_name,
      'status', v.status,
      'used_at', v.used_at,
      'used_by_name', used_name
    )
  );
end;
$$;

revoke all on function public.lookup_voucher(text) from public, anon;
revoke all on function public.consume_voucher(text) from public, anon;
revoke all on function public.current_user_role() from public, anon;
revoke all on function public.is_admin() from public, anon;
revoke all on function public.is_staff_or_admin() from public, anon;

grant execute on function public.lookup_voucher(text) to authenticated;
grant execute on function public.consume_voucher(text) to authenticated;
grant execute on function public.current_user_role() to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_staff_or_admin() to authenticated;

-- Após criar o utilizador em Authentication > Users (sem signup público):
-- insert into public.profiles (id, email, full_name, role)
-- values ('UUID-DO-AUTH-USER', 'secretaria@kib.pt', 'Secretaria KIB', 'admin');
