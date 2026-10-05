-- Practice tests: progress database (Supabase / Postgres).
-- Paste this whole file into Supabase → SQL Editor → New query → Run. Safe to run again.
--
-- Design: one append-only table of events. The public site (publishable/anon key) may only
-- INSERT events. It cannot read, change or delete anything. Reading goes through two functions:
--   public_flags()   → which tests are completed (+ first score), for the menu page
--   admin_events(pin) → every event, only with the correct admin PIN (checked here, server-side)
-- The overnight job reads with the secret service-role key instead.

create table if not exists public.events (
  id          bigint generated always as identity primary key,
  at          timestamptz not null default now(),
  kind        text not null check (kind in ('section', 'finish', 'flag', 'unflag')),
  version     int  not null check (version between 1 and 9999),
  attempt_id  text check (attempt_id is null or length(attempt_id) <= 40),
  payload     jsonb not null default '{}'::jsonb check (pg_column_size(payload) < 20000)
);
create index if not exists events_version_idx on public.events (version, at);

alter table public.events enable row level security;

drop policy if exists "site can add events" on public.events;
create policy "site can add events" on public.events
  for insert to anon, authenticated
  with check (true);
-- (no select / update / delete policies: the site can only add rows)

revoke all on public.events from anon, authenticated;
grant insert on public.events to anon, authenticated;

-- Which tests are completed. Completed = the latest flag/unflag/finish event for that test
-- is 'flag' or 'finish'. first_total = score of the first finished attempt.
create or replace function public.public_flags()
returns table (version int, completed boolean, at timestamptz, first_total int)
language sql stable security definer set search_path = public as $$
  with last_state as (
    select distinct on (e.version) e.version, e.kind, e.at
    from events e
    where e.kind in ('flag', 'unflag', 'finish')
    order by e.version, e.at desc, e.id desc
  ), first_finish as (
    select distinct on (e.version) e.version, (e.payload->>'total')::int as total
    from events e
    where e.kind = 'finish'
    order by e.version, e.at, e.id
  )
  select l.version, l.kind <> 'unflag', l.at, f.total
  from last_state l left join first_finish f using (version);
$$;

-- Every event, only with the right PIN. The PIN itself is never stored, only its hash.
create or replace function public.admin_events(p_pin text)
returns setof public.events
language plpgsql stable security definer set search_path = public as $$
begin
  if encode(sha256(convert_to('prac-admin:' || coalesce(p_pin, ''), 'UTF8')), 'hex')
     <> '88e4eb6c3c041225c1cec20d38f53a35bf13c9909242528f10224affc9a473b2' then
    perform pg_sleep(1);  -- slows down guessing
    raise exception 'wrong pin' using errcode = '28000';
  end if;
  return query select * from events order by id;
end;
$$;

revoke all on function public.public_flags() from public;
revoke all on function public.admin_events(text) from public;
grant execute on function public.public_flags() to anon, authenticated, service_role;
grant execute on function public.admin_events(text) to anon, authenticated, service_role;
