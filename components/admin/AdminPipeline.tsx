'use client'

import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'

export default function AdminPipeline() {
  const stages = [
    {
      name: 'Lead',
      count: 5,
      color: 'from-gray-100 to-gray-50',
      clients: ['Tech Startup', 'Retail Plus', 'AgriFood Co'],
    },
    {
      name: 'Onboarding',
      count: 3,
      color: 'from-blue-100 to-blue-50',
      clients: ['E-commerce Hub', 'Digital Agency'],
    },
    {
      name: 'Active',
      count: 14,
      color: 'from-green-100 to-green-50',
      clients: ['TechStart Africa', 'Fashion Retail', '+ 12 more'],
    },
    {
      name: 'Completed',
      count: 2,
      color: 'from-purple-100 to-purple-50',
      clients: ['Success Case 1', 'Success Case 2'],
    },
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0F172A]">Client Pipeline</h2>
        <span className="text-sm text-gray-500 font-medium">24 Total Clients</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stages.map((stage, idx) => (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-gradient-to-br ${stage.color} rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-[#0F172A]">{stage.name}</h3>
              <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-sm font-bold text-[#2563EB]">
                {stage.count}
              </span>
            </div>

            <div className="space-y-2">
              {stage.clients.map((client) => (
                <p key={client} className="text-xs text-gray-600 truncate">
                  {client}
                </p>
              ))}
            </div>

            <button className="w-full mt-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#2563EB] hover:bg-white transition-colors flex items-center justify-center gap-1">
              <Eye size={14} />
              View all
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
