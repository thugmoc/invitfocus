import { useState, useEffect } from 'react'

export interface Client {
  id: string
  name: string
  email: string
  phone: string | null
  company: string
  sector: string
  ninea: string | null
  status: string
  quality_score: number
  nps_score: number
  notes: string | null
  created_at: string
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Demo mode: use mock data
        const demoMode = typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true'

        if (demoMode) {
          // Mock clients for demo
          setClients([
            {
              id: '1',
              name: 'ADAA ADA INVITE FOCUS',
              email: 'adaa@invitfocus.com',
              phone: '+221 77 XXX XXXX',
              company: 'ADAA ADA',
              sector: 'Technology',
              ninea: null,
              status: 'lead',
              quality_score: 8,
              nps_score: 9,
              notes: 'Main client',
              created_at: new Date().toISOString(),
            },
          ])
        } else {
          // Fetch from Supabase (backend call)
          const response = await fetch('/api/clients')
          if (!response.ok) throw new Error('Failed to fetch clients')
          const data = await response.json()
          setClients(data)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

  return { clients, loading, error }
}
