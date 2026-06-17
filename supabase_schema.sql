-- Clients table
CREATE TABLE clients (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  company_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  sector TEXT,
  employee_count INT,
  annual_revenue DECIMAL(15, 2),
  current_stage INT NOT NULL DEFAULT 1,
  started_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id)
);

-- Stages tracking
CREATE TABLE client_stages (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  client_id BIGINT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  stage_number INT NOT NULL,
  stage_name TEXT NOT NULL,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Generated reports
CREATE TABLE client_reports (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  client_id BIGINT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL,
  report_name TEXT NOT NULL,
  report_url TEXT,
  generated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Row-level security policies
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_reports ENABLE ROW LEVEL SECURITY;

-- Admin can see all clients
CREATE POLICY "Admin can see all clients" ON clients FOR SELECT USING (
  auth.jwt() ->> 'role' = 'admin'
);

-- Clients can only see their own data
CREATE POLICY "Clients can see their own data" ON clients FOR SELECT USING (
  auth.uid() = user_id
);

-- Admin can insert clients
CREATE POLICY "Admin can insert clients" ON clients FOR INSERT WITH CHECK (
  auth.jwt() ->> 'role' = 'admin'
);

-- Admin can update clients
CREATE POLICY "Admin can update clients" ON clients FOR UPDATE USING (
  auth.jwt() ->> 'role' = 'admin'
);

-- RLS for stages
CREATE POLICY "Clients can see their own stages" ON client_stages FOR SELECT USING (
  client_id IN (
    SELECT id FROM clients WHERE user_id = auth.uid()
  ) OR auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Admin can manage stages" ON client_stages FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);

-- RLS for reports
CREATE POLICY "Clients can see their own reports" ON client_reports FOR SELECT USING (
  client_id IN (
    SELECT id FROM clients WHERE user_id = auth.uid()
  ) OR auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Admin can manage reports" ON client_reports FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);

-- Indexes for performance
CREATE INDEX idx_clients_user_id ON clients(user_id);
CREATE INDEX idx_clients_stage ON clients(current_stage);
CREATE INDEX idx_client_stages_client_id ON client_stages(client_id);
CREATE INDEX idx_client_reports_client_id ON client_reports(client_id);
