'use client'

export const dynamic = 'force-dynamic'

import { motion } from 'framer-motion'
import { Download, FileText, Scale, Shield, Calendar } from 'lucide-react'

export default function LegalPage() {
  const generatedReports = [
    {
      id: 1,
      name: 'Audit Juridique Complet',
      type: 'Legal Audit',
      date: '2024-07-08',
      icon: Scale,
      status: 'completed',
    },
    {
      id: 2,
      name: 'Dossier de Formalisation',
      type: 'Formation Documents',
      date: '2024-07-06',
      icon: FileText,
      status: 'completed',
    },
    {
      id: 3,
      name: 'Checklist Conformité',
      type: 'Compliance Checklist',
      date: '2024-07-05',
      icon: Shield,
      status: 'completed',
    },
    {
      id: 4,
      name: 'Recommandations Juridiques',
      type: 'Legal Recommendations',
      date: '2024-07-08',
      icon: FileText,
      status: 'completed',
    },
  ]

  const complianceStatus = [
    { label: 'Statut légal', status: 'Formalisé', color: 'green' },
    { label: 'Enregistrement fiscal', status: 'À jour', color: 'green' },
    { label: 'Conformité', status: 'En cours', color: 'yellow' },
  ]

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">⚖ Services Juridiques</h1>
        <p className="text-gray-600">
          Vos rapports légaux générés par INVITEFOCUS — Audit, formalisation, conformité
        </p>
      </motion.div>

      {/* Compliance Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-3 gap-6 mb-8"
      >
        {complianceStatus.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.1 }}
            className={`bg-${item.color}-50 border border-${item.color}-200 rounded-lg p-6`}
          >
            <p className="text-sm text-gray-600 font-medium mb-2">{item.label}</p>
            <p className={`text-2xl font-bold text-${item.color}-700 mb-2`}>{item.status}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Generated Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
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
                transition={{ delay: 0.2 + idx * 0.05 }}
                className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200 flex items-center justify-between group hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#0F172A] text-sm">{report.name}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                      <span className="font-medium text-green-700">{report.type}</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {report.date}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-green-700 flex items-center gap-2">
                  <Download size={16} />
                  Télécharger
                </button>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Compliance Checklist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg border border-gray-200 p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-[#0F172A] mb-6">Statut de conformité</h2>
        <div className="space-y-3">
          {[
            { item: 'Formalisation juridique', checked: true },
            { item: 'Enregistrement auprès des autorités', checked: true },
            { item: 'Numérotation fiscale (NINEA/SIRET)', checked: true },
            { item: 'Mise à jour contrats commerciaux', checked: false },
            { item: 'Vérification conformité réglementaire', checked: false },
          ].map((item) => (
            <div key={item.item} className="flex items-center gap-3">
              <input type="checkbox" checked={item.checked} readOnly className="w-5 h-5 accent-green-600" />
              <span className={`text-sm ${item.checked ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                {item.item}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-green-50 border border-green-200 rounded-lg p-4"
      >
        <p className="text-sm text-green-700">
          <span className="font-semibold">💡 Info:</span> Ces rapports juridiques ont été générés par nos experts
          après audit complet de votre structure. Vous pouvez les télécharger pour transmission aux autorités.
        </p>
      </motion.div>
    </div>
  )
}
