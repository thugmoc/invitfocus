#!/usr/bin/env node

const supabaseUrl = process.env.SUPABASE_URL || 'https://aeietcnhaxrwoqlyutal.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

async function inspectTable() {
  try {
    console.log('🔍 Inspecting clients table structure...\n')

    // Try to get metadata from PostgreSQL info schema
    const response = await fetch(`${supabaseUrl}/rest/v1/information_schema.columns`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey,
      },
    })

    if (!response.ok) {
      console.log('Method 1 failed, trying direct table fetch...\n')

      // Alternative: Try fetching one row to see columns
      const tableResponse = await fetch(`${supabaseUrl}/rest/v1/clients?select=*&limit=1`, {
        headers: {
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'apikey': supabaseServiceKey,
          'Accept': 'application/json',
        },
      })

      if (!tableResponse.ok) {
        const error = await tableResponse.text()
        console.error('Error:', error)
        return
      }

      const data = await tableResponse.json()
      console.log('Sample data from clients table:')
      console.log(JSON.stringify(data[0] || {}, null, 2))

      if (data.length === 0) {
        console.log('\n📋 Table exists but is empty. Columns expected: id, name, email, phone, etc.')
      }
      return
    }

    const columns = await response.json()
    const clientCols = columns.filter(col => col.table_name === 'clients')

    console.log(`Found ${clientCols.length} columns in clients table:\n`)
    clientCols.forEach(col => {
      console.log(`  • ${col.column_name} (${col.data_type})`)
    })
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error)
  }
}

inspectTable()
