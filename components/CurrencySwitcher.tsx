'use client'
import { useState, useEffect } from 'react'
import { Currency, CURRENCIES } from '@/lib/currency'

export function CurrencySwitcher() {
  const [currency, setCurrency] = useState<Currency>('USD')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load saved currency from localStorage
    const saved = localStorage.getItem('currency') as Currency | null
    if (saved && Object.keys(CURRENCIES).includes(saved)) {
      setCurrency(saved)
    }
    setMounted(true)
  }, [])

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency)
    localStorage.setItem('currency', newCurrency)
    // Trigger a custom event so other components can update
    window.dispatchEvent(new CustomEvent('currencyChanged', { detail: newCurrency }))
  }

  if (!mounted) return null

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-600">Currency:</span>
      <div className="flex gap-2">
        {(Object.keys(CURRENCIES) as Currency[]).map(curr => (
          <button
            key={curr}
            onClick={() => handleCurrencyChange(curr)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              currency === curr
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {CURRENCIES[curr].symbol} {curr}
          </button>
        ))}
      </div>
    </div>
  )
}

// Hook to use current currency
export function useCurrency(): [Currency, (cur: Currency) => void] {
  const [currency, setCurrency] = useState<Currency>('USD')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('currency') as Currency | null
    if (saved && Object.keys(CURRENCIES).includes(saved)) {
      setCurrency(saved)
    }
    setMounted(true)

    // Listen for currency changes
    const handleChange = (e: Event) => {
      const event = e as CustomEvent<Currency>
      setCurrency(event.detail)
    }
    window.addEventListener('currencyChanged', handleChange)
    return () => window.removeEventListener('currencyChanged', handleChange)
  }, [])

  return [currency, (cur: Currency) => {
    setCurrency(cur)
    localStorage.setItem('currency', cur)
    window.dispatchEvent(new CustomEvent('currencyChanged', { detail: cur }))
  }]
}
