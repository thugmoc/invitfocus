// Load environment variables from .env
require('dotenv').config()

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
const ws = require('ws')

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing Supabase credentials in .env')
  console.error('   SUPABASE_URL:', supabaseUrl ? '✅' : '❌')
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceRoleKey ? '✅' : '❌')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  realtime: {
    transport: ws,
  },
})

// Real client data extracted from folder names
const realClients = [
  { name: 'ADAA ADA INVITE FOCUS', company: 'ADAA ADA', sector: 'Consulting' },
  { name: 'Ahmadou Wathie', company: 'Ahmadou Wathie Trading', sector: 'Commerce' },
  { name: 'AIDA DIALLO', company: 'AIDA DIALLO', sector: 'Services' },
  { name: 'AR RAWDAH AS\'SHERIF', company: 'AR RAWDAH AS\'SHERIF', sector: 'Retail' },
  { name: 'Bomaye agency', company: 'Bomaye Agency', sector: 'Media' },
  { name: 'CHAMS TRAVEL SERVICES', company: 'CHAMS TRAVEL', sector: 'Tourism' },
  { name: 'ECF ELECTROMENAGER', company: 'ECF ELECTROMENAGER', sector: 'Retail' },
  { name: 'KOD LAB', company: 'KOD LAB', sector: 'Technology' },
  { name: 'KUDE KALOM', company: 'KUDE KALOM', sector: 'Commerce' },
  { name: 'MAISON MERE - MARIE LOUISE DIAW', company: 'MAISON MERE', sector: 'Retail' },
  { name: 'Marché Fraicheur', company: 'Marché Fraicheur', sector: 'Food & Beverage' },
  { name: 'SOLLY TRADING', company: 'SOLLY TRADING', sector: 'Commerce' },
  { name: 'Taar institute', company: 'Taar Institute', sector: 'Education' },
  { name: 'UP TRIBE', company: 'UP TRIBE', sector: 'Consulting' },
  { name: 'WATHIE GLOBAL SERVICES', company: 'WATHIE GLOBAL', sector: 'Services' },
]

async function seedRealClients() {
  try {
    console.log('📦 Seeding real clients from folder structure...')
    console.log(`📊 Found ${realClients.length} real clients to import\n`)

    let successCount = 0

    for (const clientData of realClients) {
      try {
        console.log(`📝 Inserting ${clientData.name}...`)

        const { data: insertedData, error } = await supabase
          .from('clients')
          .insert([
            {
              name: clientData.name,
              company: clientData.company,
              sector: clientData.sector,
              email: `contact@${clientData.company.toLowerCase().replace(/\s+/g, '-')}.com`,
              phone: null,
              ninea: null,
              quality_score: 8,
              nps_score: 9,
              notes: `Imported from real client data - ${new Date().toISOString()}`,
              user_id: null,
            }
          ])
          .select()

        if (error) {
          console.error(`   ❌ Error: ${error.message}`)
          continue
        }

        console.log(`   ✅ Inserted: ${clientData.name} (ID: ${insertedData[0].id})`)
        successCount++
      } catch (err) {
        console.error(`   ❌ Failed: ${err.message}`)
      }
    }

    console.log('\n🎉 Seeding complete!')
    console.log(`\n✅ Summary:`)
    console.log(`   • ${successCount}/${realClients.length} clients inserted`)
    console.log(`   • Total: ${successCount} real clients now in database`)

    if (successCount === realClients.length) {
      console.log('\n✅ All real clients imported successfully!')
      process.exit(0)
    } else {
      console.log(`\n⚠️  ${realClients.length - successCount} clients failed`)
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  }
}

seedRealClients()
