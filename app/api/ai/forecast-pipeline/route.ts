import { NextRequest, NextResponse } from 'next/server'

interface PipelineClient {
  id: string
  name: string
  status: 'prospect' | 'negotiation' | 'active' | 'dormant'
  lastContact: string
  expectedValue: number
  conversionProbability: number
}

// Mock AI forecast logic - ready for Claude API integration
function generateMockForecast(clients: PipelineClient[]) {
  const active = clients.filter(c => c.status === 'active').length
  const negotiation = clients.filter(c => c.status === 'negotiation').length
  const prospect = clients.filter(c => c.status === 'prospect').length
  const dormant = clients.filter(c => c.status === 'dormant').length

  // Forecast logic
  const expectedConversions = Math.ceil(
    active * 0.95 + negotiation * 0.6 + prospect * 0.15
  )

  const totalValue = clients.reduce((sum, c) => sum + c.expectedValue, 0)
  const forecastedRevenue = Math.round(
    totalValue * (expectedConversions / (clients.length || 1))
  )

  // Identify at-risk clients
  const atRiskClients = clients.filter(c => {
    const daysSinceContact = Math.floor(
      (Date.now() - new Date(c.lastContact).getTime()) / (1000 * 60 * 60 * 24)
    )
    return c.status === 'dormant' || daysSinceContact > 30
  })

  const recommendations = [
    dormant > 0 ? `Re-engage ${dormant} dormant clients with personalized outreach` : null,
    prospect > 0 ? `Accelerate ${prospect} prospects with demo or free trial` : null,
    atRiskClients.length > 0 ? `Schedule check-ins with ${atRiskClients.length} at-risk clients` : null,
    negotiation > 0 && negotiation < 3 ? `Increase sales efforts on active negotiations` : null,
  ].filter(Boolean)

  const opportunities = [
    active > 5 ? 'High pipeline momentum - consider scaling support team' : null,
    negotiation > 3 ? 'Multiple deals closing - prepare onboarding' : null,
    prospect > 8 ? 'Strong prospect pool - invest in nurturing' : null,
    forecastedRevenue > 10000000 ? 'Forecasted revenue exceeds 10M - prepare growth plan' : null,
  ].filter(Boolean)

  return {
    totalClients: clients.length,
    expectedConversions,
    forecastedRevenue,
    confidenceScore: Math.round(75 + Math.random() * 20), // 75-95%
    atRiskClients,
    recommendations,
    opportunities,
    timeframe: '30 days',
  }
}

export async function POST(request: NextRequest) {
  try {
    const { clients } = await request.json() as { clients: PipelineClient[] }

    if (!clients || !Array.isArray(clients)) {
      return NextResponse.json(
        { error: 'Invalid clients data' },
        { status: 400 }
      )
    }

    // TODO: Replace with Claude API call
    // const forecast = await callClaudeAPI({
    //   prompt: `Analyze this pipeline and forecast revenue...`,
    //   clients
    // })

    const forecast = generateMockForecast(clients)

    return NextResponse.json(forecast)
  } catch (error) {
    console.error('Pipeline forecast error:', error)
    return NextResponse.json(
      { error: 'Failed to generate forecast' },
      { status: 500 }
    )
  }
}
