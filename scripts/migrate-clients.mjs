#!/usr/bin/env node

const supabaseUrl = process.env.SUPABASE_URL || 'https://aeietcnhaxrwoqlyutal.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in environment')
  process.exit(1)
}

// Match the actual table structure
const clients = [
  {
    name: 'WATHIE GLOBAL SERVICES',
    company: 'WATHIE',
    email: 'wathie@global.com',
    phone: '+221 77 XXX XXXX',
    sector: 'Services',
    status: 'lead',
    quality_score: 7,
    nps_score: 8,
    notes: 'Global services provider - imported 2026-06-18',
  },
  {
    name: 'CHAMS TRAVEL SERVICES',
    company: 'CHAMS',
    email: 'chams@travel.com',
    phone: '+221 77 XXX XXXX',
    sector: 'Travel & Tourism',
    status: 'lead',
    quality_score: 8,
    nps_score: 7,
    notes: 'Travel services company - imported 2026-06-18',
  },
  {
    name: 'SOLLY TRADING',
    company: 'SOLLY',
    email: 'solly@trading.com',
    phone: '+221 77 XXX XXXX',
    sector: 'Trading',
    status: 'lead',
    quality_score: 9,
    nps_score: 8,
    notes: 'Trading company - imported 2026-06-18',
  },
  {
    name: 'KUDE KALOM',
    company: 'KUDE',
    email: 'kude@kalom.com',
    phone: '+221 77 XXX XXXX',
    sector: 'Business Services',
    status: 'lead',
    quality_score: 6,
    nps_score: 7,
    notes: 'Business services - imported 2026-06-18',
  },
  {
    name: 'AR RAWDAH AS\'SHERIF',
    company: 'AR RAWDAH',
    email: 'rawdah@sherif.com',
    phone: '+221 77 XXX XXXX',
    sector: 'Business',
    status: 'lead',
    quality_score: 7,
    nps_score: 8,
    notes: 'Import/Export business - imported 2026-06-18',
  },
  {
    name: 'AIDA DIALLO',
    company: 'AIDA',
    email: 'aida@diallo.com',
    phone: '+221 77 XXX XXXX',
    sector: 'Consulting',
    status: 'lead',
    quality_score: 8,
    nps_score: 8,
    notes: 'Individual consultant - imported 2026-06-18',
  },
  {
    name: 'Ahmadou Wathie',
    company: 'WATHIE INT',
    email: 'ahmadou@wathie.com',
    phone: '+221 77 XXX XXXX',
    sector: 'International Trade',
    status: 'lead',
    quality_score: 9,
    nps_score: 9,
    notes: 'International trade expert - imported 2026-06-18',
  },
  {
    name: 'Bomaye agency',
    company: 'BOMAYE',
    email: 'bomaye@agency.com',
    phone: '+221 77 XXX XXXX',
    sector: 'Agency Services',
    status: 'lead',
    quality_score: 6,
    nps_score: 7,
    notes: 'Creative agency - imported 2026-06-18',
  },
  {
    name: 'ECF ELECTROMENAGER',
    company: 'ECF',
    email: 'ecf@electromenager.com',
    phone: '+221 77 XXX XXXX',
    sector: 'Electronics & Appliances',
    status: 'lead',
    quality_score: 7,
    nps_score: 8,
    notes: 'Electronics retailer - imported 2026-06-18',
  },
  {
    name: 'KOD LAB',
    company: 'KOD LAB',
    email: 'kodlab@tech.com',
    phone: '+221 77 XXX XXXX',
    sector: 'Technology',
    status: 'lead',
    quality_score: 9,
    nps_score: 9,
    notes: 'Tech startup - imported 2026-06-18',
  },
  {
    name: 'MAISON MERE - MARIE LOUISE DIAW',
    company: 'MAISON MERE',
    email: 'marie@maisonmere.com',
    phone: '+221 77 XXX XXXX',
    sector: 'Retail',
    status: 'lead',
    quality_score: 8,
    nps_score: 8,
    notes: 'Retail establishment - imported 2026-06-18',
  },
  {
    name: 'Marché Fraicheur',
    company: 'MARCHE',
    email: 'marche@fraicheur.com',
    phone: '+221 77 XXX XXXX',
    sector: 'Fresh Produce',
    status: 'lead',
    quality_score: 7,
    nps_score: 8,
    notes: 'Fresh market vendor - imported 2026-06-18',
  },
  {
    name: 'Taar institute',
    company: 'TAAR',
    email: 'taar@institute.com',
    phone: '+221 77 XXX XXXX',
    sector: 'Education',
    status: 'lead',
    quality_score: 8,
    nps_score: 8,
    notes: 'Educational institution - imported 2026-06-18',
  },
  {
    name: 'UP TRIBE',
    company: 'UP TRIBE',
    email: 'uptribe@business.com',
    phone: '+221 77 XXX XXXX',
    sector: 'Community Building',
    status: 'lead',
    quality_score: 7,
    nps_score: 8,
    notes: 'Community platform - imported 2026-06-18',
  },
]

async function migrateClients() {
  try {
    console.log('📥 Inserting 14 additional clients into Supabase...')

    const response = await fetch(`${supabaseUrl}/rest/v1/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify(clients),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`HTTP ${response.status}: ${error}`)
    }

    const data = await response.json()
    console.log(`✅ Successfully inserted ${data.length} clients`)

    // Display sample
    console.log('\nInserted clients:')
    data.slice(0, 5).forEach(c => {
      console.log(`  • ${c.name} (${c.sector})`)
    })
    if (data.length > 5) {
      console.log(`  ... and ${data.length - 5} more`)
    }

    console.log('\n✨ Migration complete! 1 existing + 14 new = 15 total clients')
    return { success: true, count: data.length }
  } catch (error) {
    console.error('❌ Migration failed:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

migrateClients()
