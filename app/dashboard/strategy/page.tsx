'use client'

import { motion } from 'framer-motion'
import { Download, FileText, TrendingUp, BarChart3, Calendar } from 'lucide-react'

export default function StrategyPage() {
  const generatedReports = [
    {
      id: 1,
      name: 'Stratégie de Croissance 2024-2026',
      type: 'Growth Strategy',
      date: '2024-07-10',
      generated: '2024-07-10',
      icon: TrendingUp,
      status: 'completed',
    },
    {
      id: 2,
      name: 'Plan de Marché & Positionnement',
      type: 'Market Strategy',
      date: '2024-07-08',
      generated: '2024-07-10',
      icon: BarChart3,
      status: 'completed',
    },
    {
      id: 3,
      name: 'Projections Financières 3 ans',
      type: 'Financial Projections',
      date: '2024-07-10',
      generated: '2024-07-10',
      icon: FileText,
      status: 'completed',
    },
    {
      id: 4,
      name: 'Feuille de Route Exécution',
      type: 'Implementation Roadmap',
      date: '2024-07-10',
      generated: '2024-07-10',
      icon: TrendingUp,
      status: 'completed',
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">🚀 Stratégie & Growth</h1>
        <p className="text-gray-600">
          Vos rapports stratégiques générés par INVITEFOCUS — Plan de croissance, marché, financier
        </p>
      </motion.div>

      {/* Generated Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold text-[#0F172A] mb-6">Vos rapports générés ({generatedReports.length})</h2>
        <div className="space-y-3">
          {generatedReports.map((report, idx) => {
            const Icon = report.icon
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200 flex items-center justify-between group hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#0F172A] text-sm">{report.name}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                      <span className="font-medium text-purple-700">{report.type}</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {report.date}
                      </span>
                      <span>Généré: {report.generated}</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-700 flex items-center gap-2">
                  <Download size={16} />
                  Télécharger
                </button>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Growth Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg border border-gray-200 p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-[#0F172A] mb-6">Recommandations clés de croissance</h2>
        <div className="space-y-4">
          {[
            {
              title: 'Expansion marché régionale',
              desc: 'Pénétrer 2-3 nouveaux segments client avec focus géographique',
              impact: '+35% revenue',
              timeline: 'Q3-Q4 2024',
              priority: 'High',
            },
            {
              title: 'Développement produit / service',
              desc: 'Lancer tier premium et packages d\'accompagnement long terme',
              impact: '+25% ARPU',
              timeline: 'Q3 2024',
              priority: 'High',
            },
            {
              title: 'Partenariats stratégiques B2B',
              desc: 'Conclure 3-5 partenariats clés pour distribution cross-selling',
              impact: '+$80K MRR',
              timeline: 'Q2-Q4 2024',
              priority: 'Medium',
            },
            {
              title: 'Optimisation rentabilité',
              desc: 'Automatiser processus, réduire coûts opérationnels de 15-20%',
              impact: '+40% marge',
              timeline: 'H2 2024',
              priority: 'Medium',
            },
          ].map((rec, idx) => (
            <motion.div
              key={rec.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + idx * 0.08 }}
              className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#0F172A]">{rec.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{rec.desc}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ml-4 ${
                    rec.priority === 'High'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {rec.priority}
                </span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span className="font-semibold text-green-700">{rec.impact}</span>
                <span className="text-gray-500">{rec.timeline}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* KPIs to Track */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h3 className="text-lg font-bold text-[#0F172A] mb-6">KPIs à suivre</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: 'ARR Cible', value: '$180K', color: 'text-green-600' },
            { label: 'CAC Payback', value: '12 mois', color: 'text-blue-600' },
            { label: 'Marge Nette', value: '35%+', color: 'text-amber-600' },
            { label: 'Rétention', value: '95%+', color: 'text-purple-600' },
          ].map((metric) => (
            <div key={metric.label} className="p-4 bg-[#FAFAFA] rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 font-semibold mb-2">{metric.label}</p>
              <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-4"
      >
        <p className="text-sm text-purple-700">
          <span className="font-semibold">💡 Info:</span> Ces rapports stratégiques ont été générés par nos
          consultants après analyse complète de votre activité. Ils incluent plan de marché, projections financières
          détaillées et feuille de route d'exécution.
        </p>
      </motion.div>
    </div>
  )
}
