'use client'

import { motion } from 'framer-motion'
import { GripHorizontal, Plus } from 'lucide-react'

export default function PipelinePage() {
  const stages = [
    {
      name: 'Leads',
      color: 'bg-gray-100',
      count: 5,
      clients: [
        { name: 'New Startup Co', value: '$0', joinedDate: '2024-06-10' },
        { name: 'Potential Client Ltd', value: '$0', joinedDate: '2024-06-08' },
        { name: 'Prospect Inc', value: '$0', joinedDate: '2024-06-05' },
        { name: 'Future Growth LLC', value: '$0', joinedDate: '2024-06-03' },
        { name: 'Rising Business', value: '$0', joinedDate: '2024-06-01' },
      ],
    },
    {
      name: 'Onboarding',
      color: 'bg-blue-100',
      count: 3,
      clients: [
        { name: 'AgriFood Solutions', value: '$0', status: 'Documents pending' },
        { name: 'Tech Innovators', value: '$0', status: 'Setup in progress' },
        { name: 'Creative Agency', value: '$0', status: 'Initial review' },
      ],
    },
    {
      name: 'Active',
      color: 'bg-green-100',
      count: 14,
      clients: [
        { name: 'TechStart Africa', value: '$12K', phase: 'Strategy' },
        { name: 'Retail Plus', value: '$8.5K', phase: 'Accounting' },
        { name: 'Digital Agency Co', value: '$6K', phase: 'Legal' },
        { name: 'Fashion Retail Ltd', value: '$15K', phase: 'Growth' },
        { name: '+ 10 more clients', value: '$156K', phase: 'Various' },
      ],
    },
    {
      name: 'Completed',
      color: 'bg-purple-100',
      count: 2,
      clients: [
        { name: 'Success Case 1', value: '$200K', completedDate: '2024-04-15' },
        { name: 'Success Case 2', value: '$150K', completedDate: '2024-03-20' },
      ],
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Pipeline</h1>
        <p className="text-gray-600">Manage client progression through stages</p>
      </motion.div>

      {/* Pipeline Kanban */}
      <div className="grid lg:grid-cols-4 gap-6 overflow-x-auto pb-4">
        {stages.map((stage, stageIdx) => (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stageIdx * 0.1 }}
            className={`flex-shrink-0 w-full lg:w-auto ${stage.color} rounded-xl p-4 border border-gray-300 min-h-96`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-[#0F172A] text-lg">{stage.name}</h2>
                <p className="text-xs text-gray-600 mt-1">{stage.count} clients</p>
              </div>
              <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                <Plus size={18} className="text-gray-600" />
              </button>
            </div>

            <div className="space-y-3">
              {stage.clients.map((client, idx) => (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: stageIdx * 0.1 + idx * 0.05 }}
                  className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group"
                >
                  <div className="flex items-start gap-3">
                    <GripHorizontal size={14} className="text-gray-400 mt-1 group-hover:text-[#2563EB]" />
                    <div className="flex-1">
                      <p className="font-semibold text-[#0F172A] text-sm">{client.name}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {client.value || 'Value: ' + (client.status || client.phase || client.completedDate || '')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4"
      >
        <p className="text-sm text-blue-700">
          <span className="font-semibold">💡 Tip:</span> Drag cards between stages to update client status. Click on any
          client for more details.
        </p>
      </motion.div>
    </div>
  )
}
