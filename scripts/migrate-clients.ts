import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'https://aeietcnhaxrwoqlyutal.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const clients = [
  {
    company_name: 'ADAA ADA INVITE FOCUS',
    contact_name: 'ADAA ADA',
    email: 'adaa@invitfocus.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Technology',
    current_stage: 3,
    status: 'active',
    documents_folder: 'ADAA ADA INVITE FOCUS',
  },
  {
    company_name: 'WATHIE GLOBAL SERVICES',
    contact_name: 'Ahmadou Wathie',
    email: 'wathie@global.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Global Services',
    current_stage: 3,
    status: 'active',
    documents_folder: 'WATHIE GLOBAL SERVICES',
  },
  {
    company_name: 'CHAMS TRAVEL SERVICES',
    contact_name: 'CHAMS',
    email: 'chams@travel.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Travel & Tourism',
    current_stage: 3,
    status: 'active',
    documents_folder: 'CHAMS TRAVEL SERVICES',
  },
  {
    company_name: 'SOLLY TRADING',
    contact_name: 'Ousseynou Solly',
    email: 'solly@trading.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Trading',
    current_stage: 3,
    status: 'active',
    documents_folder: 'SOLLY TRADING',
  },
  {
    company_name: 'KUDE KALOM',
    contact_name: 'KUDE',
    email: 'kude@kalom.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Business',
    current_stage: 2,
    status: 'active',
    documents_folder: 'KUDE KALOM',
  },
  {
    company_name: 'AR RAWDAH AS\'SHERIF',
    contact_name: 'AR RAWDAH',
    email: 'rawdah@sherif.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Business',
    current_stage: 2,
    status: 'active',
    documents_folder: 'AR RAWDAH AS\'SHERIF',
  },
  {
    company_name: 'AIDA DIALLO',
    contact_name: 'AIDA DIALLO',
    email: 'aida@diallo.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Personal Business',
    current_stage: 1,
    status: 'active',
    documents_folder: 'AIDA DIALLO',
  },
  {
    company_name: 'Ahmadou Wathie',
    contact_name: 'Ahmadou Wathie',
    email: 'ahmadou@wathie.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Services',
    current_stage: 1,
    status: 'active',
    documents_folder: 'Ahmadou Wathie',
  },
  {
    company_name: 'Bomaye agency',
    contact_name: 'Bomaye',
    email: 'bomaye@agency.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Agency',
    current_stage: 2,
    status: 'active',
    documents_folder: 'Bomaye agency',
  },
  {
    company_name: 'ECF ELECTROMENAGER',
    contact_name: 'ECF',
    email: 'ecf@electromenager.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Electronics & Appliances',
    current_stage: 2,
    status: 'active',
    documents_folder: 'ECF ELECTROMENAGER',
  },
  {
    company_name: 'KOD LAB',
    contact_name: 'KOD LAB',
    email: 'kodlab@tech.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Technology',
    current_stage: 3,
    status: 'active',
    documents_folder: 'KOD LAB',
  },
  {
    company_name: 'MAISON MERE - MARIE LOUISE DIAW',
    contact_name: 'MARIE LOUISE DIAW',
    email: 'marie@maisonmere.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Retail',
    current_stage: 2,
    status: 'active',
    documents_folder: 'MAISON MERE - MARIE LOUISE DIAW',
  },
  {
    company_name: 'Marché Fraicheur',
    contact_name: 'Marché Fraicheur',
    email: 'marche@fraicheur.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Retail & Fresh Produce',
    current_stage: 1,
    status: 'active',
    documents_folder: 'Marché Fraicheur',
  },
  {
    company_name: 'Taar institute',
    contact_name: 'Taar',
    email: 'taar@institute.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Education',
    current_stage: 2,
    status: 'active',
    documents_folder: 'Taar institute',
  },
  {
    company_name: 'UP TRIBE',
    contact_name: 'UP TRIBE',
    email: 'uptribe@business.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Community & Events',
    current_stage: 2,
    status: 'active',
    documents_folder: 'UP TRIBE',
  },
]

async function migrateClients() {
  try {
    console.log('🔍 Checking existing clients...')

    const { data: existingClients, error: checkError } = await supabase
      .from('clients')
      .select('count', { count: 'exact' })

    if (checkError) throw checkError

    const count = existingClients?.[0]?.count || 0
    console.log(`Found ${count} existing clients`)

    if (count > 0) {
      console.log('✅ Clients already exist. Skipping migration.')
      return
    }

    console.log('📥 Inserting 16 clients into Supabase...')

    const { data, error } = await supabase
      .from('clients')
      .insert(clients.map((c) => ({
        ...c,
        created_at: new Date(),
        updated_at: new Date(),
      })))
      .select()

    if (error) throw error

    console.log(`✅ Successfully inserted ${data?.length || 0} clients`)

    // Insert stage history
    for (const client of clients) {
      const stageNames: Record<number, string> = {
        1: 'Prise de contact',
        2: 'Audit',
        3: 'Cadrage',
        4: 'Exécution',
        5: 'Livraison',
        6: 'Suivi',
      }

      const clientData = data?.find((c) => c.company_name === client.company_name)
      if (clientData) {
        await supabase
          .from('client_stages')
          .insert({
            client_id: clientData.id,
            stage_number: client.current_stage,
            stage_name: stageNames[client.current_stage],
            completed_at: new Date(),
          })
      }
    }

    console.log('✅ Migration complete!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

migrateClients()
