import { createClient } from '@supabase/supabase-js'
import { NextResponse, NextRequest } from 'next/server'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const clientId = formData.get('client_id') as string
    const category = formData.get('category') as string

    if (!file || !clientId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create a unique filename
    const timestamp = Date.now()
    const filename = `${clientId}/${category}/${timestamp}_${file.name}`

    // Upload to Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filename, file, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) throw uploadError

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('documents')
      .getPublicUrl(filename)

    // Save metadata to database
    const { error: dbError } = await supabase
      .from('documents')
      .insert({
        client_id: clientId,
        category,
        filename: file.name,
        storage_path: filename,
        file_size: file.size,
        file_type: file.type,
        url: publicUrlData?.publicUrl,
        created_at: new Date().toISOString(),
      })

    if (dbError) throw dbError

    return NextResponse.json({
      success: true,
      filename: file.name,
      path: filename,
      url: publicUrlData?.publicUrl,
    })
  } catch (error) {
    console.error('Error uploading document:', error)
    return NextResponse.json(
      { error: 'Failed to upload document' },
      { status: 500 }
    )
  }
}
