import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

const stageNames: Record<number, string> = {
  1: 'Prise de contact',
  2: 'Audit',
  3: 'Cadrage',
  4: 'Exécution',
  5: 'Livraison',
  6: 'Suivi',
}

interface MockClient {
  id: number
  company_name: string
  contact_name: string
  contact_email: string
  sector: string
  employee_count: number
  annual_revenue: number
  current_stage: number
  started_at: string
  documents?: {
    accounting?: string[]
    legal?: string[]
    strategy?: string[]
  }
}

async function seedClients() {
  try {
    console.log('📦 Loading mock clients...')

    // Load mock data
    const mockDataPath = path.join(process.cwd(), 'mock_clients.json')
    const mockData = JSON.parse(fs.readFileSync(mockDataPath, 'utf-8'))
    const mockClients: MockClient[] = mockData.clients

    console.log(`📊 Found ${mockClients.length} clients to seed\n`)

    for (const mockClient of mockClients) {
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
        const { error: stageError } = await supabase
          .from('client_stages')
          .insert([
            {
              client_id: clientId,
              stage_number: i,
              stage_name: stageNames[i],
              completed_at: i < mockClient.current_stage ? new Date() : null,
            }
          ])

        if (stageError) {
          console.error(`      ❌ Error adding stage ${i}: ${stageError.message}`)
        }
      }

      // Insert generated reports based on stage
      if (mockClient.current_stage >= 5) {
        console.log(`   📄 Adding generated reports...`)

        const reports = [
          {
            type: 'accounting',
            name: `États Financiers - ${mockClient.company_name}`,
            description: 'Monthly financial statements and cash flow analysis',
          },
          {
            type: 'legal',
            name: `Audit Juridique - ${mockClient.company_name}`,
            description: 'Legal compliance audit and recommendations',
          },
          {
            type: 'strategy',
            name: `Stratégie de Croissance - ${mockClient.company_name}`,
            description: 'Growth strategy and 3-year projections',
          },
        ]

        for (const report of reports) {
          const { error: reportError } = await supabase
            .from('client_reports')
            .insert([
              {
                client_id: clientId,
                report_type: report.type,
                report_name: report.name,
                report_url: null, // Will be populated when actual files are uploaded
                generated_at: new Date(),
              }
            ])

          if (reportError) {
            console.error(`      ❌ Error adding ${report.type} report: ${reportError.message}`)
          }
        }

        console.log(`   ✅ Reports added`)
      }

      console.log(`✨ Completed: ${mockClient.company_name}\n`)
    }

    console.log('🎉 Seeding complete!')
    console.log(`\nSummary:`)
    console.log(`  • ${mockClients.length} clients inserted`)
    console.log(`  • Stage history recorded`)
    console.log(`  • Reports generated for stage 5+ clients`)
  } catch (error) {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  }
}

seedClients()
