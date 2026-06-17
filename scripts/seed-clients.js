// Load environment variables from .env
require('dotenv').config()

const { createClient } = require('@supabase/supabase-js')
const ws = require('ws')
const fs = require('fs')
const path = require('path')

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

const stageNames = {
  1: 'Prise de contact',
  2: 'Audit',
  3: 'Cadrage',
  4: 'Exécution',
  5: 'Livraison',
  6: 'Suivi',
}

async function seedClients() {
  try {
    console.log('📦 Loading mock clients...')

    // Load mock data
    const mockDataPath = path.join(process.cwd(), 'mock_clients.json')
    const mockData = JSON.parse(fs.readFileSync(mockDataPath, 'utf-8'))
    const mockClients = mockData.clients

    console.log(`📊 Found ${mockClients.length} clients to seed\n`)

    let successCount = 0

    for (const mockClient of mockClients) {
      try {
        // Insert client
        console.log(`📝 Inserting ${mockClient.company_name}...`)

        const { data: clientData, error: clientError } = await supabase
          .from('clients')
          .insert([
            {
              company_name: mockClient.company_name,
              contact_email: mockClient.contact_email,
              contact_name: mockClient.contact_name,
              sector: mockClient.sector,
              employee_count: mockClient.employee_count,
              annual_revenue: mockClient.annual_revenue,
              current_stage: mockClient.current_stage,
              started_at: mockClient.started_at,
            }
          ])
          .select()

        if (clientError) {
          console.error(`   ❌ Error: ${clientError.message}`)
          continue
        }

        const clientId = clientData[0].id
        console.log(`   ✅ Created client (ID: ${clientId})`)

        // Insert stage history (1 to current_stage)
        console.log(`   📈 Adding stage history (1-${mockClient.current_stage})...`)

        for (let i = 1; i <= mockClient.current_stage; i++) {
          await supabase
            .from('client_stages')
            .insert([
              {
                client_id: clientId,
                stage_number: i,
                stage_name: stageNames[i],
                completed_at: i < mockClient.current_stage ? new Date() : null,
              }
            ])
        }

        // Insert generated reports based on stage
        if (mockClient.current_stage >= 5) {
          console.log(`   📄 Adding generated reports...`)

          const reports = [
            {
              type: 'accounting',
              name: `États Financiers - ${mockClient.company_name}`,
            },
            {
              type: 'legal',
              name: `Audit Juridique - ${mockClient.company_name}`,
            },
            {
              type: 'strategy',
              name: `Stratégie de Croissance - ${mockClient.company_name}`,
            },
          ]

          for (const report of reports) {
            await supabase
              .from('client_reports')
              .insert([
                {
                  client_id: clientId,
                  report_type: report.type,
                  report_name: report.name,
                  report_url: null,
                  generated_at: new Date(),
                }
              ])
          }

          console.log(`   ✅ Reports added`)
        }

        console.log(`✨ Completed: ${mockClient.company_name}\n`)
        successCount++
      } catch (error) {
        console.error(`   ❌ Failed to insert ${mockClient.company_name}:`, error)
      }
    }

    console.log('🎉 Seeding complete!')
    console.log(`\n✅ Summary:`)
    console.log(`   • ${successCount}/${mockClients.length} clients inserted`)
    console.log(`   • Stage history recorded`)
    console.log(`   • Reports generated for stage 5+ clients`)

    if (successCount === mockClients.length) {
      console.log('\n✅ All clients seeded successfully!')
      process.exit(0)
    } else {
      console.log(`\n⚠️  ${mockClients.length - successCount} clients failed`)
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  }
}

seedClients()
