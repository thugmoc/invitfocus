'use client'

import { motion } from 'framer-motion'
import { Upload, File, CheckCircle, AlertCircle, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function StrategyPage() {
  const [submittedDocs, setSubmittedDocs] = useState([
    { id: 1, name: 'Business Plan 2024-2025.pdf', date: '2024-06-10', status: 'analyzed', type: 'Business Plan' },
    { id: 2, name: 'Financial Projections.xlsx', date: '2024-06-08', status: 'analyzed', type: 'Projections' },
    { id: 3, name: 'Market Research.pdf', date: '2024-06-05', status: 'reviewed', type: 'Market Analysis' },
    { id: 4, name: 'Partnership Opportunities.docx', date: '2024-06-01', status: 'pending', type: 'Partnership' },
  ])

  const statusConfig = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: AlertCircle, label: 'En attente d\'analyse' },
    analyzed: { bg: 'bg-blue-100', text: 'text-blue-700', icon: File, label: 'Analysé' },
    reviewed: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'Recommandations reçues' },
  }

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">🚀 Stratégie & Growth</h1>
        <p className="text-gray-600">
          Business plan, modélisation financière, conseil stratégique - Soumettez vos documents de croissance
        </p>
      </motion.div>

      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-dashed border-purple-500 rounded-lg p-12 text-center mb-8"
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center">
            <Upload size={32} className="text-purple-600" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-[#0F172A] mb-2">Soumettre vos documents stratégiques</h3>
        <p className="text-gray-600 mb-6">
          Business plan, projections financières, études de marché, partenariats potentiels...
        </p>
        <label className="inline-block cursor-pointer">
          <input type="file" multiple className="hidden" accept=".pdf,.xlsx,.xls,.docx,.doc" />
          <span className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-block">
            Sélectionner les fichiers
          </span>
        </label>
        <p className="text-xs text-gray-500 mt-4">PDF, Excel, Word acceptés (Max 50MB par fichier)</p>
      </motion.div>

      {/* Submitted Documents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold text-[#0F172A] mb-4">Vos documents soumis ({submittedDocs.length})</h2>
        <div className="space-y-3">
          {submittedDocs.map((doc, idx) => {
            const config = statusConfig[doc.status as keyof typeof statusConfig]
            const StatusIcon = config.icon
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                className={`${config.bg} rounded-lg p-4 border border-gray-300 flex items-center justify-between group hover:shadow-md transition-all`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0">
                    <StatusIcon size={24} className={config.text} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#0F172A] text-sm">{doc.name}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                      <span>{doc.type}</span>
                      <span>{doc.date}</span>
                      <span className={`font-semibold ${config.text}`}>{config.label}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 rounded-lg">
                  <Trash2 size={18} className="text-gray-400 hover:text-red-600" />
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
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg border border-gray-200 p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-[#0F172A] mb-4">Recommandations de croissance</h2>
        <div className="space-y-4">
          {[
            {
              title: 'Expansion marché',
              desc: 'Pénétrer 2 nouveaux segments',
              impact: '+35% revenue',
              timeline: 'Q3-Q4 2024',
            },
            {
              title: 'Développement produit',
              desc: 'Lancer tier premium',
              impact: '+25% ARPU',
              timeline: 'Q3 2024',
            },
            {
              title: 'Partenariats stratégiques',
              desc: 'Conclure 3 partenariats clés',
              impact: '+$50K MRR',
              timeline: 'Q2-Q4 2024',
            },
          ].map((rec, idx) => (
            <motion.div
              key={rec.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 flex items-start gap-4"
            >
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#0F172A]">{rec.title}</p>
                <p className="text-sm text-gray-600 mt-1">{rec.desc}</p>
                <div className="flex items-center gap-6 mt-2 text-sm">
                  <span className="font-semibold text-green-700">{rec.impact}</span>
                  <span className="text-gray-500">{rec.timeline}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-purple-50 border border-purple-200 rounded-lg p-4"
      >
        <p className="text-sm text-purple-700">
          <span className="font-semibold">💡 Info:</span> Nos consultants analysent vos documents et proposent une
          stratégie de croissance personnalisée avec modélisation financière complète.
        </p>
      </motion.div>
    </div>
  )
}
