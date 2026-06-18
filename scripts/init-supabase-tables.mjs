#!/usr/bin/env node

const supabaseUrl = process.env.SUPABASE_URL || 'https://aeietcnhaxrwoqlyutal.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in environment')
  process.exit(1)
}

const requiredTables = [
  {
    name: 'journal_entries',
    columns: [
      'id uuid primary key default uuid_generate_v4()',
      'client_id text not null',
      'journal text not null',
      'date date not null',
      'description text',
      'entries jsonb',
      'status text default \'draft\'',
      'created_at timestamp default now()',
    ],
  },
  {
    name: 'invoices',
    columns: [
      'id uuid primary key default uuid_generate_v4()',
      'client_id text not null',
      'invoice_number text unique not null',
      'customer text not null',
      'date date not null',
      'due_date date',
      'items jsonb',
      'total decimal(10,2)',
      'status text default \'draft\'',
      'created_at timestamp default now()',
    ],
  },
  {
    name: 'events',
    columns: [
      'id uuid primary key default uuid_generate_v4()',
      'client_id text not null',
      'title text not null',
      'datetime timestamp not null',
      'location text not null',
      'description text',
      'attendees jsonb',
      'created_at timestamp default now()',
    ],
  },
  {
    name: 'documents',
    columns: [
      'id uuid primary key default uuid_generate_v4()',
      'client_id text not null',
      'category text not null',
      'filename text not null',
      'storage_path text not null',
      'file_size integer',
      'file_type text',
      'url text',
      'created_at timestamp default now()',
    ],
  },
]

async function checkTableExists(tableName) {
  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/${tableName}?limit=0`,
      {
        headers: {
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'apikey': supabaseServiceKey,
        },
      }
    )
    return response.ok
  } catch {
    return false
  }
}

async function initTables() {
  console.log('🔍 Checking Supabase tables...\n')

  for (const table of requiredTables) {
    const exists = await checkTableExists(table.name)

    if (exists) {
      console.log(`✅ ${table.name} - exists`)
    } else {
      console.log(`⚠️  ${table.name} - NOT FOUND (needs to be created in Supabase dashboard)`)
    }
  }

  console.log('\n📝 To create missing tables:')
  console.log('1. Go to https://app.supabase.com/project/_/sql')
  console.log('2. Create tables as shown in scripts/supabase-schema.sql')
  console.log('\nFor now, form submissions will be saved to database when tables are created.')
}

initTables()
