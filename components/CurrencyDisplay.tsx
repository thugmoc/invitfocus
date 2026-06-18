'use client'
import { formatCurrency } from '@/lib/currency'
import { useCurrency } from './CurrencySwitcher'

export function CurrencyDisplay({
  amount,
  className = '',
}: {
  amount: number
  className?: string
}) {
  const [currency] = useCurrency()
  const formatted = formatCurrency(amount, currency)

  return <span className={className}>{formatted}</span>
}

// Quick display helpers
export function CurrencyValue({ amount, className = '' }: { amount: number; className?: string }) {
  const [currency] = useCurrency()
  return (
    <span className={className}>
      {formatCurrency(amount, currency)}
    </span>
  )
}
