-- ============================================================
-- INVITEFOCUS BETA — Migration 003: Upload de documents client
-- À exécuter dans Supabase > SQL Editor APRÈS migration_002
-- ============================================================

-- Chemin de stockage brut (le bucket "documents" est privé, donc on régénère
-- une URL signée à la demande plutôt que de stocker une URL publique figée).
alter table documents add column if not exists storage_path text;

-- Permet à un client connecté d'ajouter ses propres documents
-- (la lecture était déjà couverte par la policy "client_own_docs")
create policy "client_insert_own_docs" on documents
  for insert
  with check (
    client_id in (select id from clients where user_id = auth.uid())
  );

-- Permet à un client connecté de supprimer un document qu'il vient
-- d'ajouter par erreur (ex: mauvais fichier)
create policy "client_delete_own_docs" on documents
  for delete
  using (
    client_id in (select id from clients where user_id = auth.uid())
  );

-- ── STORAGE: bucket "documents" (privé) ─────────────────────
-- Chaque fichier est stocké sous le chemin "{client_id}/{categorie}/{nom_fichier}".
-- Ces policies restreignent l'accès au dossier du client connecté uniquement.

create policy "client_upload_own_storage_docs"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'documents'
  and (storage.foldername(name))[1] in (
    select id::text from clients where user_id = auth.uid()
  )
);

create policy "client_read_own_storage_docs"
on storage.objects for select
to authenticated
using (
  bucket_id = 'documents'
  and (storage.foldername(name))[1] in (
    select id::text from clients where user_id = auth.uid()
  )
);

create policy "client_delete_own_storage_docs"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'documents'
  and (storage.foldername(name))[1] in (
    select id::text from clients where user_id = auth.uid()
  )
);
