'use client'

import { motion } from 'framer-motion'
import { Briefcase, Plus, Clock, CheckCircle } from 'lucide-react'

export default function ContratsPage() {
  const contracts = [
    { id: 1, title: 'Contrat Fournisseur', date: '2026-01-15', status: 'active' },
    { id: 2, title: 'Accord Service', date: '2026-01-20', status: 'pending' },
  ]

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Contrats & Stratégie</h1>
          <p className="text-gray-600">Gestion des contrats et planning stratégique</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 bg-[#2563EB] text-white rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Nouveau contrat
        </motion.button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <Briefcase size={32} className="text-[#2563EB] mb-3" />
          <p className="text-2xl font-bold text-[#0F172A]">{contracts.length}</p>
          <p className="text-sm text-gray-600">Contrats actifs</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <Clock size={32} className="text-orange-600 mb-3" />
          <p className="text-2xl font-bold text-[#0F172A]">1</p>
          <p className="text-sm text-gray-600">À renouveler bientôt</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-bold text-[#0F172A]">Contrats</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {contracts.map((contract, i) => (
            <motion.div
              key={contract.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="p-4 flex items-center justify-between hover:bg-[#FAFAFA]"
            >
              <div>
                <p className="font-medium text-[#0F172A]">{contract.title}</p>
                <p className="text-sm text-gray-500">{contract.date}</p>
              </div>
              {contract.status === 'active' ? (
                <CheckCircle size={20} className="text-green-600" />
              ) : (
                <Clock size={20} className="text-orange-600" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
