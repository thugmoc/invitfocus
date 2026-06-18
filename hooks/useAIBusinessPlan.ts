import { useState } from 'react'

export interface AIBusinessPlanInput {
  clientId: string
  clientName: string
  industry: string
  annualRevenue: number
}

export interface GeneratedBusinessPlan {
  clientId: string
  clientName: string
  industry: string
  createdAt: string
  status: 'draft' | 'review' | 'approved'
  version: string
  executiveSummary: string
  marketAnalysis: {
    marketSize: string
    targetSegment: string
    competitiveAdvantage: string
  }
  financialProjections: {
    year1Revenue: number
    year2Revenue: number
    year3Revenue: number
    year4Revenue: number
    year5Revenue: number
    profitMargin: number
  }
  strategies: string[]
  recommendations: string[]
}

export function useAIBusinessPlan() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [businessPlan, setBusinessPlan] = useState<GeneratedBusinessPlan | null>(null)

  const generateBusinessPlan = async (input: AIBusinessPlanInput) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/generate-business-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })

      if (!response.ok) throw new Error('Failed to generate business plan')

      const plan: GeneratedBusinessPlan = await response.json()
      setBusinessPlan(plan)
      return plan
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const resetPlan = () => {
    setBusinessPlan(null)
    setError(null)
  }

  return {
    businessPlan,
    loading,
    error,
    generateBusinessPlan,
    resetPlan,
  }
}
