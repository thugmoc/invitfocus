import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Warn if credentials are missing at runtime (not at build time)
if (typeof window !== 'undefined' && (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
  console.warn('⚠️ Missing Supabase credentials. Some features may not work.')
}

export async function getClient(clientId: number) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', clientId)
    .single()

  if (error) throw error
  return data
}

export async function getAllClients() {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getClientReports(clientId: number) {
  const { data, error } = await supabase
    .from('client_reports')
    .select('*')
    .eq('client_id', clientId)
    .order('generated_at', { ascending: false })

  if (error) throw error
  return data
}

export async function updateClientStage(clientId: number, newStage: number) {
  const { error: updateError } = await supabase
    .from('clients')
    .update({ current_stage: newStage, updated_at: new Date() })
    .eq('id', clientId)

  if (updateError) throw updateError

  const stageNames: Record<number, string> = {
    1: 'Prise de contact',
    2: 'Audit',
    3: 'Cadrage',
    4: 'Exécution',
    5: 'Livraison',
    6: 'Suivi',
  }

  const { error: stageError } = await supabase
    .from('client_stages')
    .insert([
      {
        client_id: clientId,
        stage_number: newStage,
        stage_name: stageNames[newStage],
        completed_at: new Date(),
      }
    ])

  if (stageError) throw stageError
}
