-- InvitFocus Database Schema for Supabase
-- Run these commands in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Journal Entries Table
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id text NOT NULL,
  journal text NOT NULL,
  date date NOT NULL,
  description text,
  entries jsonb,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'posted')),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Invoices Table
CREATE TABLE IF NOT EXISTS public.invoices (
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id text NOT NULL,
  invoice_number text NOT NULL UNIQUE,
  customer text NOT NULL,
  date date NOT NULL,
  due_date date,
  items jsonb,
  total numeric(12, 2),
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'posted', 'paid')),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Events Table
CREATE TABLE IF NOT EXISTS public.events (
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id text NOT NULL,
  title text NOT NULL,
  datetime timestamp with time zone NOT NULL,
  location text NOT NULL,
  description text,
  attendees jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Documents Table
CREATE TABLE IF NOT EXISTS public.documents (
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id text NOT NULL,
  category text NOT NULL,
  filename text NOT NULL,
  storage_path text NOT NULL,
  file_size integer,
  file_type text,
  url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Messages Table (optional - for the Messages tab)
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id text NOT NULL,
  sender_id text NOT NULL,
  recipient_id text NOT NULL,
  content text NOT NULL,
  conversation_id text,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_journal_entries_client ON journal_entries(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_client ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_events_client ON events(client_id);
CREATE INDEX IF NOT EXISTS idx_documents_client ON documents(client_id);
CREATE INDEX IF NOT EXISTS idx_messages_client ON messages(client_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);

-- Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Allow all for demo mode - update for production)
CREATE POLICY "Allow all operations on journal_entries" ON journal_entries
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on invoices" ON invoices
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on events" ON events
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on documents" ON documents
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on messages" ON messages
  FOR ALL USING (true) WITH CHECK (true);
