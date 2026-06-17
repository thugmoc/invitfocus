'use client'

import { motion } from 'framer-motion'
import { Upload, File, CheckCircle, AlertCircle, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function LegalPage() {
  const [submittedDocs, setSubmittedDocs] = useState([
    { id: 1, name: 'Statuts de la société.pdf', date: '2024-06-12', status: 'approved', type: 'Statuts' },
    { id: 2, name: 'Registre de commerce.pdf', date: '2024-06-10', status: 'approved', type: 'Commerce Registration' },
    { id: 3, name: 'Contrats clients.pdf', date: '2024-06-08', status: 'reviewed', type: 'Contracts' },
    { id: 4, name: 'Documentation conformité.docx', date: '2024-06-05', status: 'pending', type: 'Compliance Docs' },
  ])

  const statusConfig = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: AlertCircle, label: 'En révision' },
    reviewed: { bg: 'bg-blue-100', text: 'text-blue-700', icon: File, label: 'Révisé' },
    approved: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'Approuvé' },
  }

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">⚖ Services Juridiques</h1>
        <p className="text-gray-600">
          Formalisation, conformité, création d'entreprise - Soumettez vos documents légaux
        </p>
      </motion.div>

      {/* Compliance Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-3 gap-6 mb-8"
      >
        {[
          { label: 'Statut légal', status: 'Formalisé', icon: '✓', color: 'green' },
          { label: 'Enregistrement fiscal', status: 'À jour', icon: '✓', color: 'green' },
          { label: 'Conformité', status: 'En cours', icon: '⚠', color: 'yellow' },
        ].map((item, idx) => (
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

      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-dashed border-green-500 rounded-lg p-12 text-center mb-8"
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
            <Upload size={32} className="text-green-600" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-[#0F172A] mb-2">Soumettre vos documents légaux</h3>
        <p className="text-gray-600 mb-6">
          Statuts, contrats, registres commerciaux, documents de conformité...
        </p>
        <label className="inline-block cursor-pointer">
          <input type="file" multiple className="hidden" accept=".pdf,.docx,.doc" />
          <span className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block">
            Sélectionner les fichiers
          </span>
        </label>
        <p className="text-xs text-gray-500 mt-4">PDF, Word acceptés (Max 50MB par fichier)</p>
      </motion.div>

      {/* Submitted Documents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
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
                transition={{ delay: 0.3 + idx * 0.05 }}
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

      {/* Compliance Checklist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg border border-gray-200 p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-[#0F172A] mb-4">Checklist de conformité</h2>
        <div className="space-y-3">
          {[
            { item: 'Formalisation juridique', checked: true },
            { item: 'Enregistrement auprès des autorités', checked: true },
            { item: 'Numérotation fiscale (NINEA/SIRET)', checked: true },
            { item: 'Mise à jour contrats commerciaux', checked: false },
            { item: 'Vérification conformité réglementaire', checked: false },
          ].map((item) => (
            <label key={item.item} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={item.checked} readOnly className="w-5 h-5" />
              <span className={`text-sm ${item.checked ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                {item.item}
              </span>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-green-50 border border-green-200 rounded-lg p-4"
      >
        <p className="text-sm text-green-700">
          <span className="font-semibold">💡 Info:</span> Nos experts juridiques examinent vos documents, assurent la
          conformité légale complète et mettent à jour votre structure si nécessaire.
        </p>
      </motion.div>
    </div>
  )
}
