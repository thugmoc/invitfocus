'use client'

import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, CreditCard, PieChart } from 'lucide-react'

export default function ComptabiliteDashboard() {
  const quickStats = [
    { label: 'Total Assets', value: '$0', icon: DollarSign, color: 'text-blue-600' },
    { label: 'Total Liabilities', value: '$0', icon: CreditCard, color: 'text-orange-600' },
    { label: 'Equity', value: '$0', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Bank Balance', value: '$0', icon: PieChart, color: 'text-purple-600' },
  ]

  return (
    <>
      {/* Quick Stats */}
      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#0F172A] text-sm">{stat.label}</h3>
                <Icon className={`${stat.color}`} size={24} />
              </div>
              <p className="text-3xl font-bold text-[#0F172A] mb-2">{stat.value}</p>
              <p className="text-xs text-gray-600">Current balance</p>
            </motion.div>
          )
        })}
      </div>

      {/* Chart of Accounts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <h2 className="text-lg font-bold text-[#0F172A] mb-4">Chart of Accounts</h2>
          <div className="space-y-2">
            <details className="cursor-pointer">
              <summary className="font-semibold text-[#0F172A] hover:text-blue-600">
                🏦 Assets
              </summary>
              <div className="ml-4 mt-2 space-y-1 text-sm text-gray-600">
                <p>• Current Assets</p>
                <p>• Fixed Assets</p>
                <p>• Intangible Assets</p>
              </div>
            </details>
            <details className="cursor-pointer">
              <summary className="font-semibold text-[#0F172A] hover:text-blue-600">
                📊 Liabilities
              </summary>
              <div className="ml-4 mt-2 space-y-1 text-sm text-gray-600">
                <p>• Current Liabilities</p>
                <p>• Long-term Liabilities</p>
              </div>
            </details>
            <details className="cursor-pointer">
              <summary className="font-semibold text-[#0F172A] hover:text-blue-600">
                💰 Equity
              </summary>
              <div className="ml-4 mt-2 space-y-1 text-sm text-gray-600">
                <p>• Capital</p>
                <p>• Retained Earnings</p>
              </div>
            </details>
          </div>
        </motion.div>

        {/* Recent Journal Entries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <h2 className="text-lg font-bold text-[#0F172A] mb-4">Recent Journal Entries</h2>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">No entries yet</p>
            <button className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors">
              Create First Entry
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bank Reconciliation Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h2 className="text-lg font-bold text-[#0F172A] mb-4">Bank Reconciliation Status</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-600 h-3 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
          <span className="font-bold text-[#0F172A]">0% Matched</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">No transactions to reconcile</p>
      </motion.div>
    </>
  )
}
