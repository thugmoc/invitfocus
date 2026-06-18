'use client'
import { useState } from 'react'

export interface PipelineClient {
  id: string
  name: string
  status: 'prospect' | 'negotiation' | 'active' | 'dormant'
  lastContact: string
  expectedValue: number
  conversionProbability: number
}

export interface PipelineForecast {
  totalClients: number
  expectedConversions: number
  forecastedRevenue: number
  confidenceScore: number
  atRiskClients: PipelineClient[]
  opportunities: string[]
  recommendations: string[]
  timeframe: string
}

export function useAIPipelineForecast() {
  const [forecast, setForecast] = useState<PipelineForecast | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateForecast = async (clients: PipelineClient[]) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/forecast-pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clients }),
      })

      if (!response.ok) throw new Error('Failed to generate forecast')

      const data = await response.json()
      setForecast(data)
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { forecast, loading, error, generateForecast }
}
