'use client'

import { motion } from 'framer-motion'
import { Target, TrendingUp, BarChart3, Zap } from 'lucide-react'

export default function BusinessPlanPage() {
  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Business Plan Interactif</h1>
      <p className="text-gray-600 mb-8">Planifiez et suivez les objectifs de votre entreprise</p>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-6 border border-blue-200 cursor-pointer hover:border-[#2563EB] transition-colors"
        >
          <Target size={32} className="text-[#2563EB] mb-3" />
          <h3 className="font-bold text-[#0F172A] mb-1">Objectifs Annuels</h3>
          <p className="text-sm text-gray-600">Définir vos cibles 2026</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl p-6 border border-green-200 cursor-pointer hover:border-green-600 transition-colors"
        >
          <TrendingUp size={32} className="text-green-600 mb-3" />
          <h3 className="font-bold text-[#0F172A] mb-1">Croissance</h3>
          <p className="text-sm text-gray-600">Projections de croissance</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl p-6 border border-purple-200 cursor-pointer hover:border-purple-600 transition-colors"
        >
          <BarChart3 size={32} className="text-purple-600 mb-3" />
          <h3 className="font-bold text-[#0F172A] mb-1">Finances</h3>
          <p className="text-sm text-gray-600">Budget et prévisions</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl p-6 border border-orange-200 cursor-pointer hover:border-orange-600 transition-colors"
        >
          <Zap size={32} className="text-orange-600 mb-3" />
          <h3 className="font-bold text-[#0F172A] mb-1">Leviers</h3>
          <p className="text-sm text-gray-600">Accélérateurs de croissance</p>
        </motion.div>
      </div>
    </div>
  )
}
