'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useAIPipelineForecast, PipelineClient } from '@/hooks/useAIPipelineForecast'
import { CurrencyValue } from '@/components/CurrencyDisplay'
import { useLanguage } from '@/lib/language-context'

// Mock pipeline data - replace with real data from Supabase
const mockClients: PipelineClient[] = [
  {
    id: '1',
    name: 'Galerie Dakar Modern',
    status: 'active',
    lastContact: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    expectedValue: 5000000,
    conversionProbability: 0.95,
  },
  {
    id: '2',
    name: 'Sénégal Arts & Culture',
    status: 'negotiation',
    lastContact: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    expectedValue: 3500000,
    conversionProbability: 0.7,
  },
  {
    id: '3',
    name: 'West Africa Collectors',
    status: 'negotiation',
    lastContact: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    expectedValue: 8000000,
    conversionProbability: 0.65,
  },
  {
    id: '4',
    name: 'Dakar Investment Fund',
    status: 'prospect',
    lastContact: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    expectedValue: 12000000,
    conversionProbability: 0.3,
  },
  {
    id: '5',
    name: 'Pan-African Heritage',
    status: 'dormant',
    lastContact: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    expectedValue: 4000000,
    conversionProbability: 0.15,
  },
]

function AdminAIPipelineForecastingContent() {
  const { language } = useLanguage()
  const { forecast, loading, generateForecast } = useAIPipelineForecast()

  useEffect(() => {
    generateForecast(mockClients)
  }, [])

  const labels = {
    en: {
      title: '🤖 AI Pipeline Forecasting',
      subtitle: 'AI-powered revenue predictions & client analysis',
      loading: 'Analyzing pipeline...',
      forecast: 'Revenue Forecast',
      confidence: 'Confidence Score',
      expectedConversions: 'Expected Conversions',
      timeframe: 'Timeframe',
      atRisk: 'Clients At Risk',
      opportunities: 'Growth Opportunities',
      recommendations: 'AI Recommendations',
      noAtRisk: 'No clients at risk detected',
      days: 'days',
    },
    fr: {
      title: '🤖 Prévisions Pipeline IA',
      subtitle: 'Prédictions de revenus alimentées par l\'IA & analyse des clients',
      loading: 'Analyse du pipeline...',
      forecast: 'Prévisions de Revenus',
      confidence: 'Score de Confiance',
      expectedConversions: 'Conversions Attendues',
      timeframe: 'Période',
      atRisk: 'Clients à Risque',
      opportunities: 'Opportunités de Croissance',
      recommendations: 'Recommandations IA',
      noAtRisk: 'Aucun client à risque détecté',
      days: 'jours',
    },
  }

  const t = labels[language as keyof typeof labels] || labels.en

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-200 p-8"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="animate-spin w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full" />
          <p className="text-purple-700 font-medium">{t.loading}</p>
        </div>
      </motion.div>
    )
  }

  if (!forecast) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center"
      >
        <p className="text-gray-600">{language === 'en' ? 'Failed to load forecast' : 'Impossible de charger la prévision'}</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-1">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Main KPI Cards */}
      <div className="grid lg:grid-cols-4 gap-4">
        {/* Forecasted Revenue */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 p-6"
        >
          <p className="text-sm font-medium text-green-700 mb-2">{t.forecast}</p>
          <p className="text-3xl font-bold text-green-900 mb-1">
            <CurrencyValue amount={forecast.forecastedRevenue} />
          </p>
          <p className="text-xs text-green-600">{t.timeframe}: {forecast.timeframe}</p>
        </motion.div>

        {/* Expected Conversions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200 p-6"
        >
          <p className="text-sm font-medium text-blue-700 mb-2">{t.expectedConversions}</p>
          <p className="text-3xl font-bold text-blue-900 mb-1">{forecast.expectedConversions}</p>
          <p className="text-xs text-blue-600">out of {forecast.totalClients} clients</p>
        </motion.div>

        {/* Confidence Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 p-6"
        >
          <p className="text-sm font-medium text-purple-700 mb-2">{t.confidence}</p>
          <p className="text-3xl font-bold text-purple-900 mb-1">{forecast.confidenceScore}%</p>
          <div className="w-full bg-purple-200 rounded-full h-1.5 mt-2">
            <div
              className="bg-purple-600 h-1.5 rounded-full transition-all"
              style={{ width: `${forecast.confidenceScore}%` }}
            />
          </div>
        </motion.div>

        {/* Total Clients */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-200 p-6"
        >
          <p className="text-sm font-medium text-orange-700 mb-2">Pipeline Clients</p>
          <p className="text-3xl font-bold text-orange-900 mb-1">{forecast.totalClients}</p>
          <p className="text-xs text-orange-600">in active evaluation</p>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Clients At Risk */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg border border-red-200 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">⚠️</span>
            <h3 className="font-bold text-[#0F172A]">{t.atRisk}</h3>
          </div>

          {forecast.atRiskClients.length > 0 ? (
            <div className="space-y-3">
              {forecast.atRiskClients.map(client => (
                <div
                  key={client.id}
                  className="bg-red-50 rounded-lg p-3 border border-red-100"
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-[#0F172A]">{client.name}</p>
                    <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">
                      {client.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Expected value: <CurrencyValue amount={client.expectedValue} />
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-sm">{t.noAtRisk}</p>
          )}
        </motion.div>

        {/* Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg border border-green-200 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">💡</span>
            <h3 className="font-bold text-[#0F172A]">{t.opportunities}</h3>
          </div>

          <div className="space-y-2">
            {forecast.opportunities.length > 0 ? (
              forecast.opportunities.map((opp, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-1">✓</span>
                  <p className="text-gray-700">{opp}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-sm">{language === 'en' ? 'No opportunities detected' : 'Aucune opportunité détectée'}</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🤖</span>
          <h3 className="font-bold text-[#0F172A]">{t.recommendations}</h3>
        </div>

        <div className="space-y-2">
          {forecast.recommendations.length > 0 ? (
            forecast.recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-gray-700 text-sm">{rec}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-sm">{language === 'en' ? 'Pipeline is optimized' : 'Le pipeline est optimisé'}</p>
          )}
        </div>
      </motion.div>

      {/* Refresh Button */}
      <div className="flex justify-end">
        <button
          onClick={() => generateForecast(mockClients)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition"
        >
          {language === 'en' ? '🔄 Refresh Forecast' : '🔄 Actualiser les Prévisions'}
        </button>
      </div>
    </motion.div>
  )
}

export default AdminAIPipelineForecastingContent
