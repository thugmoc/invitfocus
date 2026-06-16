-- ============================================================
-- INVITEFOCUS BETA — Migration 002: Lead capture + auto-link
-- À exécuter dans Supabase > SQL Editor APRÈS schema.sql
-- ============================================================

-- Permet la capture de lead anonyme depuis la landing page,
-- sans donner à n'importe qui un accès INSERT brut sur "clients"
-- (qui pourrait sinon écrire n'importe quel champ, incl. status/score).

alter table clients add constraint clients_email_unique unique (email);

create or replace function public.create_lead(
  p_name text, p_email text, p_phone text, p_company text, p_sector text
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  insert into clients (name, email, phone, company, sector, status)
  values (p_name, p_email, p_phone, p_company, p_sector, 'lead')
  on conflict (email) do update
    set name = excluded.name, company = excluded.company, phone = excluded.phone
  returning id into v_id;
  return v_id;
end;
$$;

grant execute on function public.create_lead(text, text, text, text, text) to anon;

-- Quand le lead clique son lien magique et qu'un compte auth.users est créé,
-- on relie automatiquement ce compte à sa ligne "clients" existante (par email).

create or replace function public.link_client_to_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update clients set user_id = new.id where email = new.email and user_id is null;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.link_client_to_auth_user();
