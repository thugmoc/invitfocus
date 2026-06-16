-- ============================================================
-- INVITEFOCUS BETA — Migration 004: Messagerie client <-> admin
-- À exécuter dans Supabase > SQL Editor APRÈS migration_003
-- ============================================================

create table if not exists messages (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  client_id   uuid references clients(id) on delete cascade,
  sender      text not null check (sender in ('client', 'admin')),
  body        text not null,
  read        boolean default false
);

alter table messages enable row level security;

-- Le client ne voit/insère que dans son propre fil
create policy "client_read_own_messages" on messages
  for select using (
    client_id in (select id from clients where user_id = auth.uid())
  );

create policy "client_insert_own_messages" on messages
  for insert
  with check (
    sender = 'client'
    and client_id in (select id from clients where user_id = auth.uid())
  );

-- L'admin (clé service_role, via fonction serverless) bypass RLS nativement,
-- aucune policy supplémentaire n'est nécessaire pour ce rôle.

-- ============================================================
-- Édition de profil client (sans toucher status/quality_score)
-- ============================================================

create or replace function public.update_my_profile(
  p_name text, p_phone text, p_company text, p_sector text
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update clients
  set name = p_name, phone = p_phone, company = p_company, sector = p_sector
  where user_id = auth.uid();
end;
$$;

grant execute on function public.update_my_profile(text, text, text, text) to authenticated;
