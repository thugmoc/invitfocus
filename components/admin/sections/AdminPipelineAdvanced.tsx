'use client'
import { motion } from 'framer-motion'
import { TrendingUp, Users, DollarSign } from 'lucide-react'

const pipelineStages = [
  { stage: 'Lead', count: 12, value: '$0', percentage: 5 },
  { stage: 'Discovery', count: 8, value: '$0', percentage: 15 },
  { stage: 'Proposal', count: 5, value: '$0', percentage: 25 },
  { stage: 'Negotiation', count: 3, value: '$0', percentage: 45 },
  { stage: 'Closed Won', count: 4, value: '$0', percentage: 100 },
]

export default function AdminPipelineAdvanced() {
  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Sales Pipeline</h1>
        <p className="text-gray-600">Track deals and conversion rates across all stages</p>
      </motion.div>

      {/* Pipeline Metrics */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A]">Total Deals</h3>
            <Users className="text-blue-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">32</p>
          <p className="text-sm text-gray-600">In pipeline</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A]">Pipeline Value</h3>
            <DollarSign className="text-green-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">$0</p>
          <p className="text-sm text-gray-600">Total value</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A]">Conversion Rate</h3>
            <TrendingUp className="text-purple-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">12%</p>
          <p className="text-sm text-gray-600">Last quarter</p>
        </div>
      </div>

      {/* Pipeline Stages */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-[#0F172A] mb-6">Deal Stages</h2>
        <div className="space-y-6">
          {pipelineStages.map((item) => (
            <div key={item.stage}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-[#0F172A]">{item.stage}</span>
                <span className="text-sm text-gray-600">{item.count} deals • {item.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${item.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  )
}
