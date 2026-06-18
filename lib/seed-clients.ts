import { supabase } from './supabase'

const clients = [
  {
    company_name: 'ADAA ADA INVITE FOCUS',
    contact_name: 'ADAA ADA',
    email: 'adaa@invitfocus.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Technology',
    stage: 3,
    status: 'active',
    documents_folder: 'ADAA ADA INVITE FOCUS',
  },
  {
    company_name: 'WATHIE GLOBAL SERVICES',
    contact_name: 'Ahmadou Wathie',
    email: 'wathie@global.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Global Services',
    stage: 3,
    status: 'active',
    documents_folder: 'WATHIE GLOBAL SERVICES',
  },
  {
    company_name: 'CHAMS TRAVEL SERVICES',
    contact_name: 'CHAMS',
    email: 'chams@travel.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Travel & Tourism',
    stage: 3,
    status: 'active',
    documents_folder: 'CHAMS TRAVEL SERVICES',
  },
  {
    company_name: 'SOLLY TRADING',
    contact_name: 'Ousseynou Solly',
    email: 'solly@trading.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Trading',
    stage: 3,
    status: 'active',
    documents_folder: 'SOLLY TRADING',
  },
  {
    company_name: 'KUDE KALOM',
    contact_name: 'KUDE',
    email: 'kude@kalom.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Business',
    stage: 2,
    status: 'active',
    documents_folder: 'KUDE KALOM',
  },
  {
    company_name: 'AR RAWDAH AS\'SHERIF',
    contact_name: 'AR RAWDAH',
    email: 'rawdah@sherif.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Business',
    stage: 2,
    status: 'active',
    documents_folder: 'AR RAWDAH AS\'SHERIF',
  },
  {
    company_name: 'AIDA DIALLO',
    contact_name: 'AIDA DIALLO',
    email: 'aida@diallo.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Personal Business',
    stage: 1,
    status: 'active',
    documents_folder: 'AIDA DIALLO',
  },
  {
    company_name: 'Ahmadou Wathie',
    contact_name: 'Ahmadou Wathie',
    email: 'ahmadou@wathie.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Services',
    stage: 1,
    status: 'active',
    documents_folder: 'Ahmadou Wathie',
  },
  {
    company_name: 'Bomaye agency',
    contact_name: 'Bomaye',
    email: 'bomaye@agency.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Agency',
    stage: 2,
    status: 'active',
    documents_folder: 'Bomaye agency',
  },
  {
    company_name: 'ECF ELECTROMENAGER',
    contact_name: 'ECF',
    email: 'ecf@electromenager.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Electronics & Appliances',
    stage: 2,
    status: 'active',
    documents_folder: 'ECF ELECTROMENAGER',
  },
  {
    company_name: 'KOD LAB',
    contact_name: 'KOD LAB',
    email: 'kodlab@tech.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Technology',
    stage: 3,
    status: 'active',
    documents_folder: 'KOD LAB',
  },
  {
    company_name: 'MAISON MERE - MARIE LOUISE DIAW',
    contact_name: 'MARIE LOUISE DIAW',
    email: 'marie@maisonmere.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Retail',
    stage: 2,
    status: 'active',
    documents_folder: 'MAISON MERE - MARIE LOUISE DIAW',
  },
  {
    company_name: 'Marché Fraicheur',
    contact_name: 'Marché Fraicheur',
    email: 'marche@fraicheur.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Retail & Fresh Produce',
    stage: 1,
    status: 'active',
    documents_folder: 'Marché Fraicheur',
  },
  {
    company_name: 'Taar institute',
    contact_name: 'Taar',
    email: 'taar@institute.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Education',
    stage: 2,
    status: 'active',
    documents_folder: 'Taar institute',
  },
  {
    company_name: 'UP TRIBE',
    contact_name: 'UP TRIBE',
    email: 'uptribe@business.com',
    phone: '+221 77 XXX XXXX',
    industry: 'Community & Events',
    stage: 2,
    status: 'active',
    documents_folder: 'UP TRIBE',
  },
]

export async function seedClients() {
  try {
    console.log('Seeding clients...')

    for (const client of clients) {
      const { data, error } = await supabase
        .from('clients')
        .insert([client])
        .select()

      if (error) {
        console.error(`Error seeding ${client.company_name}:`, error)
      } else {
        console.log(`Seeded: ${client.company_name}`)
      }
    }

    console.log('Client seeding complete!')
    return true
  } catch (error) {
    console.error('Seeding error:', error)
    return false
  }
}
