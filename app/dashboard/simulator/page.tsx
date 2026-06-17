'use client'

export const dynamic = 'force-dynamic'

import { motion } from 'framer-motion'
import { Play, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function SimulatorPage() {
  const [scenarios, setScenarios] = useState([
    { name: 'Conservative', revenue: '$20K', expenses: '$8K', profit: '$12K', color: 'bg-orange-100' },
    { name: 'Base Case', revenue: '$24.5K', expenses: '$8.2K', profit: '$16.3K', color: 'bg-green-100' },
    { name: 'Aggressive', revenue: '$35K', expenses: '$10K', profit: '$25K', color: 'bg-blue-100' },
  ])

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Financial Simulator</h1>
        <p className="text-gray-600">Model different scenarios and see real-time impact on your finances</p>
      </motion.div>

      {/* Scenarios */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#0F172A]">Your Scenarios</h2>
          <button className="px-4 py-2 bg-[#2563EB] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#1D4ED8] transition-colors">
            <Plus size={18} />
            New Scenario
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {scenarios.map((scenario, idx) => (
            <motion.div
              key={scenario.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.1 }}
              className={`${scenario.color} rounded-lg border border-gray-300 p-6 relative group`}
            >
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">{scenario.name}</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-[#0F172A]">{scenario.revenue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">Operating Expenses</p>
                  <p className="text-2xl font-bold text-[#0F172A]">{scenario.expenses}</p>
                </div>
                <div className="pt-4 border-t border-gray-300/50">
                  <p className="text-sm text-gray-600 font-medium mb-1">Net Profit</p>
                  <p className="text-2xl font-bold text-green-600">{scenario.profit}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-white text-[#2563EB] rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  <Play size={16} />
                  Explore
                </button>
                <button className="p-2 bg-white text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h2 className="text-xl font-bold text-[#0F172A] mb-6">Comparison</h2>
        <div className="space-y-4">
          {[
            { label: 'Monthly Revenue', values: ['$20K', '$24.5K', '$35K'] },
            { label: 'Operating Expenses', values: ['$8K', '$8.2K', '$10K'] },
            { label: 'Net Profit', values: ['$12K', '$16.3K', '$25K'] },
          ].map((row) => (
            <div key={row.label}>
              <p className="text-sm font-semibold text-gray-600 mb-2">{row.label}</p>
              <div className="grid grid-cols-3 gap-4">
                {row.values.map((val, idx) => (
                  <div key={idx} className="px-4 py-2 bg-[#FAFAFA] rounded-lg text-center">
                    <p className="font-semibold text-[#0F172A]">{val}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
