import { useState } from 'react'

export interface Event {
  id?: string
  title: string
  date: string
  time: string
  location: string
  description?: string
  attendees?: string[]
}

export function useEvents(clientId: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const saveEvent = async (event: Event) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...event,
          client_id: clientId,
          datetime: `${event.date}T${event.time}`,
        }),
      })

      if (!response.ok) throw new Error('Failed to save event')

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

  return { saveEvent, loading, error }
}
