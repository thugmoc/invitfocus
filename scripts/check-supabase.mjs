#!/usr/bin/env node

const supabaseUrl = process.env.SUPABASE_URL || 'https://aeietcnhaxrwoqlyutal.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseServiceKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in environment')
  process.exit(1)
}

async function checkClients() {
  try {
    console.log('🔍 Checking Supabase clients table...')

    const response = await fetch(
      `${supabaseUrl}/rest/v1/clients?select=count`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'apikey': supabaseServiceKey,
          'Prefer': 'count=exact',
        },
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        console.log('⚠️  Clients table not found. Table may not exist yet.')
        return { exists: false, count: 0 }
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const contentRange = response.headers.get('Content-Range')
    const count = contentRange ? parseInt(contentRange.split('/')[1], 10) : 0
    console.log(`✅ Clients table exists. Current count: ${count}`)

    if (count > 0) {
      const dataResponse = await fetch(
        `${supabaseUrl}/rest/v1/clients?select=name&limit=3`,
        {
          headers: {
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'apikey': supabaseServiceKey,
          },
        }
      )
      const data = await dataResponse.json()
      console.log('Sample clients:', data.map(c => c.name).join(', '))
    }

    return { exists: true, count }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error)
    return { exists: false, count: 0 }
  }
}

checkClients().then(result => {
  if (result.count === 0) {
    console.log('\n💡 No clients found. Run: npm run db:migrate')
  }
  process.exit(0)
})
