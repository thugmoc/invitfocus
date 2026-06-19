import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET() {
  try {
    // Fetch all documents with client info
    const { data, error } = await supabase
      .from('documents')
      .select(`
        id,
        client_id,
        category,
        filename,
        file_size,
        file_type,
        url,
        created_at,
        clients!inner(name as client_name)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Flatten the client_name from nested clients object
    const documents = (data || []).map((doc: any) => ({
      id: doc.id,
      client_id: doc.client_id,
      category: doc.category,
      filename: doc.filename,
      file_size: doc.file_size,
      file_type: doc.file_type,
      url: doc.url,
      created_at: doc.created_at,
      client_name: doc.clients?.name || 'Unknown',
    }))

    return NextResponse.json(documents)
  } catch (error) {
    console.error('Error fetching all documents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    )
  }
}
