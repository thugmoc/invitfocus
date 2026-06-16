-- ============================================================
-- INVITEFOCUS BETA — Supabase Schema
-- Exécute ce fichier dans Supabase > SQL Editor
-- ============================================================

-- CLIENTS
create table if not exists clients (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz default now(),
  name          text not null,
  email         text not null unique,
  phone         text,
  company       text not null,
  sector        text,
  ninea         text,
  status        text default 'lead'
                check (status in ('lead','onboarded','collecting','validating','analyzing','delivered','feedback')),
  quality_score integer default 0,
  report_url    text,
  nps_score     integer,
  notes         text,
  user_id       uuid references auth.users(id)
);

-- DOCUMENTS
create table if not exists documents (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  client_id   uuid references clients(id) on delete cascade,
  type        text not null,  -- 'bp', 'compta', 'invoices', 'admin'
  file_url    text,
  file_name   text,
  status      text default 'pending'
              check (status in ('pending','received','verified','rejected')),
  notes       text
);

-- REPORTS
create table if not exists reports (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz default now(),
  client_id     uuid references clients(id) on delete cascade,
  pdf_url       text,
  score         numeric(3,1),
  f1            text,
  f2            text,
  f3            text,
  resume        text,
  financial_data jsonb
);

-- TASKS
create table if not exists tasks (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  client_id   uuid references clients(id) on delete cascade,
  type        text not null,
  due_date    date,
  owner       text check (owner in ('aminata','biboty')),
  status      text default 'open'
              check (status in ('open','in_progress','done')),
  notes       text
);

-- ── RLS (Row Level Security) ────────────────────────────────
-- Les clients ne voient que leurs propres données

alter table clients  enable row level security;
alter table documents enable row level security;
alter table reports  enable row level security;
alter table tasks    enable row level security;

-- Politique clients : chaque client voit uniquement son propre enregistrement
create policy "client_own_data" on clients
  for select using (auth.uid() = user_id);

-- Admins (service role) ont accès total — géré via la clé service_role côté Python

-- Politique documents : client voit ses propres documents
create policy "client_own_docs" on documents
  for select using (
    client_id in (select id from clients where user_id = auth.uid())
  );

-- Politique reports : client voit ses propres rapports
create policy "client_own_reports" on reports
  for select using (
    client_id in (select id from clients where user_id = auth.uid())
  );

-- ── STORAGE BUCKETS ─────────────────────────────────────────
-- À créer dans Supabase > Storage (interface graphique)
-- Bucket 1: "documents"  — pour les fichiers uploadés par les clients
-- Bucket 2: "reports"    — pour les PDFs générés

-- ── VUES UTILES ─────────────────────────────────────────────
create or replace view client_dashboard as
  select
    c.id, c.name, c.company, c.email, c.status, c.quality_score,
    count(distinct d.id) as doc_count,
    count(distinct r.id) as report_count,
    r.pdf_url as latest_report_url,
    r.score   as report_score
  from clients c
  left join documents d on d.client_id = c.id
  left join reports   r on r.client_id = c.id
  group by c.id, c.name, c.company, c.email, c.status, c.quality_score,
           r.pdf_url, r.score;
