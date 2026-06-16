'use client'

import { motion } from 'framer-motion'
import { MoreVertical, TrendingUp } from 'lucide-react'

export default function AdminClientsList() {
  const clients = [
    {
      name: 'TechStart Africa',
      status: 'active',
      sector: 'Technology',
      revenue: '$12K',
      trend: '+15%',
    },
    {
      name: 'Retail Plus',
      status: 'active',
      sector: 'E-commerce',
      revenue: '$8.5K',
      trend: '+12%',
    },
    {
      name: 'AgriFood Solutions',
      status: 'onboarding',
      sector: 'Agriculture',
      revenue: '$0',
      trend: 'New',
    },
    {
      name: 'Digital Agency Co',
      status: 'active',
      sector: 'Services',
      revenue: '$6K',
      trend: '+8%',
    },
    {
      name: 'Fashion Retail Ltd',
      status: 'active',
      sector: 'Retail',
      revenue: '$15K',
      trend: '+22%',
    },
  ]

  const statusStyles = {
    active: 'bg-green-100 text-green-700',
    onboarding: 'bg-blue-100 text-blue-700',
    completed: 'bg-purple-100 text-purple-700',
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#0F172A]">Recent Clients</h2>
        <a href="/admin/clients" className="text-sm text-[#2563EB] hover:underline font-semibold">
          View all
        </a>
      </div>

      <div className="space-y-3">
        {clients.map((client, idx) => (
          <motion.div
            key={client.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-4 rounded-lg border border-gray-200 hover:border-[#2563EB] hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-semibold text-[#0F172A] text-sm">{client.name}</p>
                <p className="text-xs text-gray-500 mt-1">{client.sector}</p>
              </div>
              <button className="p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={16} className="text-gray-400" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    statusStyles[client.status as keyof typeof statusStyles]
                  }`}
                >
                  {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                </span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[#0F172A] text-xs">{client.revenue}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 justify-end mt-0.5">
                  <TrendingUp size={12} />
                  {client.trend}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
