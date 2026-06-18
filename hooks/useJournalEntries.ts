import { useState } from 'react'

export interface JournalEntry {
  id?: string
  journal: string
  date: string
  description: string
  entries: {
    account: string
    description: string
    debit: number
    credit: number
  }[]
  status: 'draft' | 'posted'
}

export function useJournalEntries(clientId: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const saveEntry = async (entry: JournalEntry) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/journal-entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...entry, client_id: clientId }),
      })

      if (!response.ok) throw new Error('Failed to save journal entry')

      const data = await response.json()
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { saveEntry, loading, error }
}
