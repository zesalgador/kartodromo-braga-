-- Consulta pública de vouchers (só leitura).
-- Não concede SELECT nas tabelas a anon. O consumo continua autenticado.
--
-- O token NÃO é criado pelo primeiro pedido. Configure-o no SQL Editor:
--   insert into public.internal_settings (key, value)
--   values ('voucher_lookup_token', 'COLE_AQUI_O_MESMO_VALOR_DO_ENV')
--   on conflict (key) do update set value = excluded.value;
-- Nunca coloque o valor real neste ficheiro nem no Git.

create table if not exists public.internal_settings (
  key text primary key,
  value text not null
);

create table if not exists public.public_voucher_lookup_throttle (
  bucket_key text not null,
  window_start timestamptz not null,
  hits integer not null default 0,
  primary key (bucket_key, window_start)
);

alter table public.internal_settings enable row level security;
alter table public.public_voucher_lookup_throttle enable row level security;

revoke all on public.internal_settings from anon, authenticated, public;
revoke all on public.public_voucher_lookup_throttle from anon, authenticated, public;

create or replace function public.public_lookup_voucher(p_code text, p_ip_hash text, p_token text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v public.vouchers%rowtype;
  normalized text;
  stored_token text;
  ip_window timestamptz;
  global_window timestamptz;
  ip_hits integer;
  global_hits integer;
  effective_status public.voucher_status;
begin
  if p_token is null or length(p_token) < 32 then
    return jsonb_build_object('ok', false, 'error', 'forbidden');
  end if;

  select value into stored_token
  from public.internal_settings
  where key = 'voucher_lookup_token';

  if stored_token is null or stored_token is distinct from p_token then
    return jsonb_build_object('ok', false, 'error', 'forbidden');
  end if;

  -- Limites só para consulta anónima. lookup_voucher e consume_voucher não usam
  -- esta tabela e continuam disponíveis para administrador e funcionário.
  if not public.is_staff_or_admin() then
    if p_ip_hash is null or p_ip_hash !~ '^[a-f0-9]{64}$' then
      return jsonb_build_object('ok', false, 'error', 'rate_limited');
    end if;

    ip_window := date_trunc('minute', now()) - make_interval(mins => mod(extract(minute from now())::int, 15));
    global_window := date_trunc('minute', now()) - make_interval(mins => mod(extract(minute from now())::int, 5));

    insert into public.public_voucher_lookup_throttle (bucket_key, window_start, hits)
    values ('ip:' || p_ip_hash, ip_window, 1)
    on conflict (bucket_key, window_start)
    do update set hits = public.public_voucher_lookup_throttle.hits + 1
    returning hits into ip_hits;

    insert into public.public_voucher_lookup_throttle (bucket_key, window_start, hits)
    values ('global', global_window, 1)
    on conflict (bucket_key, window_start)
    do update set hits = public.public_voucher_lookup_throttle.hits + 1
    returning hits into global_hits;

    if ip_hits > 15 or global_hits > 80 then
      return jsonb_build_object('ok', false, 'error', 'rate_limited');
    end if;
  end if;

  normalized := upper(trim(p_code));
  if normalized !~ '^KIB-[A-Z0-9]{8}$' then
    return jsonb_build_object('ok', false, 'error', 'not_found');
  end if;

  select * into v
  from public.vouchers
  where code = normalized;

  if not found then
    return jsonb_build_object('ok', false, 'error', 'not_found');
  end if;

  if v.status = 'active' and v.valid_until is not null and v.valid_until < current_date then
    effective_status := 'expired';
  else
    effective_status := v.status;
  end if;

  return jsonb_build_object(
    'ok', true,
    'voucher', jsonb_build_object(
      'code', v.code,
      'status', effective_status,
      'kart_type', v.kart_type,
      'duration_minutes', v.duration_minutes
    )
  );
end;
$$;

revoke all on function public.public_lookup_voucher(text, text, text) from public;
grant execute on function public.public_lookup_voucher(text, text, text) to anon, authenticated;

-- O consumo e o lookup interno continuam bloqueados para anon.
revoke all on function public.lookup_voucher(text) from public, anon;
revoke all on function public.consume_voucher(text) from public, anon;
grant execute on function public.lookup_voucher(text) to authenticated;
grant execute on function public.consume_voucher(text) to authenticated;
