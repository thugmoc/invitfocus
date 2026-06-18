export type Currency = 'USD' | 'EUR' | 'XOF'

export interface CurrencyConfig {
  symbol: string
  code: string
  name: string
  decimalPlaces: number
  exchangeRate: number // rate relative to USD
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  USD: {
    symbol: '$',
    code: 'USD',
    name: 'US Dollar',
    decimalPlaces: 2,
    exchangeRate: 1,
  },
  EUR: {
    symbol: '€',
    code: 'EUR',
    name: 'Euro',
    decimalPlaces: 2,
    exchangeRate: 0.92, // approximate
  },
  XOF: {
    symbol: 'Fr',
    code: 'XOF',
    name: 'West African CFA franc',
    decimalPlaces: 0,
    exchangeRate: 603.5, // approximate USD to XOF
  },
}

export function formatCurrency(
  amount: number,
  currency: Currency = 'USD',
  locale: string = 'en-US'
): string {
  const config = CURRENCIES[currency]

  if (!config) {
    throw new Error(`Unknown currency: ${currency}`)
  }

  // For XOF, don't show decimal places
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: config.decimalPlaces,
    maximumFractionDigits: config.decimalPlaces,
  })

  return formatter.format(amount)
}

export function convertCurrency(
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number {
  if (fromCurrency === toCurrency) {
    return amount
  }

  const fromRate = CURRENCIES[fromCurrency].exchangeRate
  const toRate = CURRENCIES[toCurrency].exchangeRate

  // Convert to USD first, then to target currency
  const amountInUSD = amount / fromRate
  return amountInUSD * toRate
}

export function getCurrencySymbol(currency: Currency): string {
  return CURRENCIES[currency].symbol
}

export function getCurrencyCode(currency: Currency): string {
  return CURRENCIES[currency].code
}

// Quick format helpers for common currencies
export const Format = {
  usd: (amount: number) => formatCurrency(amount, 'USD'),
  eur: (amount: number) => formatCurrency(amount, 'EUR'),
  xof: (amount: number) => formatCurrency(amount, 'XOF'),
}
