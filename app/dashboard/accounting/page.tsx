'use client'

import { motion } from 'framer-motion'
import { Upload, File, CheckCircle, AlertCircle, Download, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function AccountingPage() {
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: 'Factures Juin 2024.pdf', date: '2024-06-15', status: 'classified', type: 'Invoices' },
    { id: 2, name: 'Relevé bancaire juin.pdf', date: '2024-06-14', status: 'processed', type: 'Bank Statement' },
    { id: 3, name: 'Fiches de paie.xlsx', date: '2024-06-10', status: 'processed', type: 'Payroll' },
    { id: 4, name: 'Reçus dépenses.pdf', date: '2024-06-08', status: 'pending', type: 'Receipts' },
  ])

  const statusConfig = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: AlertCircle, label: 'En cours de classement' },
    classified: { bg: 'bg-blue-100', text: 'text-blue-700', icon: File, label: 'Classé' },
    processed: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'Traité' },
  }

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">◐ Assistance Comptable</h1>
        <p className="text-gray-600">
          Classement, saisie comptable, suivi de trésorerie et états financiers - Soumettez vos documents
        </p>
      </motion.div>

      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-dashed border-[#2563EB] rounded-lg p-12 text-center mb-8"
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-[#2563EB]/10 rounded-full flex items-center justify-center">
            <Upload size={32} className="text-[#2563EB]" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-[#0F172A] mb-2">Soumettre vos documents comptables</h3>
        <p className="text-gray-600 mb-6">
          Factures, relevés bancaires, fiches de paie, reçus de dépenses...
        </p>
        <label className="inline-block cursor-pointer">
          <input type="file" multiple className="hidden" accept=".pdf,.xlsx,.xls,.jpg,.png" />
          <span className="px-6 py-3 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1D4ED8] transition-colors inline-block">
            Sélectionner les fichiers
          </span>
        </label>
        <p className="text-xs text-gray-500 mt-4">PDF, Excel, Images acceptées (Max 50MB par fichier)</p>
      </motion.div>

      {/* Submitted Files */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold text-[#0F172A] mb-4">Vos documents soumis ({uploadedFiles.length})</h2>
        <div className="space-y-3">
          {uploadedFiles.map((file, idx) => {
            const config = statusConfig[file.status as keyof typeof statusConfig]
            const StatusIcon = config.icon
            return (
              <motion.div
                key={file.id}
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
                    <p className="font-semibold text-[#0F172A] text-sm">{file.name}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                      <span>{file.type}</span>
                      <span>{file.date}</span>
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

      {/* Financial Summary */}
      <div className="grid lg:grid-cols-3 gap-6">
        {[
          { label: 'Revenus ce mois', value: '$24,500', change: '+12% MoM' },
          { label: 'Dépenses', value: '$8,200', change: '-3% vs budget' },
          { label: 'Solde net', value: '$16,300', change: '+18% YoY' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <p className="text-sm text-gray-600 font-medium mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-[#0F172A] mb-2">{stat.value}</p>
            <p className="text-sm text-green-600">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4"
      >
        <p className="text-sm text-blue-700">
          <span className="font-semibold">💡 Info:</span> Nos experts classent automatiquement vos documents et
          génèrent vos états financiers mensuels. Suivi de trésorerie en temps réel.
        </p>
      </motion.div>
    </div>
  )
}
