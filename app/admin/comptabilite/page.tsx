'use client'

import { motion } from 'framer-motion'
import { FileText, TrendingUp, Users } from 'lucide-react'

export default function AdminComptabilitePage() {
  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-[#0F172A] mb-8">Comptabilité & Audit</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <FileText size={32} className="text-[#2563EB] mb-3" />
          <p className="text-sm text-gray-600 mb-1">Rapports générés</p>
          <p className="text-3xl font-bold text-[#0F172A]">28</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <TrendingUp size={32} className="text-green-600 mb-3" />
          <p className="text-sm text-gray-600 mb-1">Facturation totale</p>
          <p className="text-2xl font-bold text-[#0F172A]">45.2M CFA</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <Users size={32} className="text-[#2563EB] mb-3" />
          <p className="text-sm text-gray-600 mb-1">Clients audités</p>
          <p className="text-3xl font-bold text-[#0F172A]">12</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <h3 className="font-bold text-[#0F172A] mb-4">Audits en cours</h3>
        <p className="text-gray-600">Aucun audit en cours. Bonne gestion!</p>
      </motion.div>
    </div>
  )
}
