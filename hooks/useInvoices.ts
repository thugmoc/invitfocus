import { useState } from 'react'

export interface Invoice {
  id?: string
  invoice_number?: string
  customer: string
  date: string
  due_date: string
  items: {
    description: string
    quantity: number
    unit_price: number
    tax_percent: number
  }[]
  total?: number
  status: 'draft' | 'posted' | 'paid'
}

export function useInvoices(clientId: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const saveInvoice = async (invoice: Invoice) => {
    setLoading(true)
    setError(null)

    try {
      // Calculate total
      const total = invoice.items.reduce((sum, item) => {
        const subtotal = item.quantity * item.unit_price
        const tax = subtotal * (item.tax_percent / 100)
        return sum + subtotal + tax
      }, 0)

      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...invoice,
          client_id: clientId,
          total,
        }),
      })

      if (!response.ok) throw new Error('Failed to save invoice')

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

  return { saveInvoice, loading, error }
}
