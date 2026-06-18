import { createClient } from '@supabase/supabase-js'
import { NextResponse, NextRequest } from 'next/server'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { client_id, title, datetime, location, description, attendees } = body

    // Validate required fields
    if (!client_id || !title || !datetime || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save event
    const { data, error } = await supabase
      .from('events')
      .insert({
        client_id,
        title,
        datetime,
        location,
        description: description || '',
        attendees: attendees || [],
        created_at: new Date().toISOString(),
      })
      .select()

    if (error) throw error

    return NextResponse.json(data?.[0] || {})
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const clientId = request.nextUrl.searchParams.get('client_id')

    if (!clientId) {
      return NextResponse.json(
        { error: 'client_id is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('client_id', clientId)
      .order('datetime', { ascending: true })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}
