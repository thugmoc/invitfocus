'use client'

import { motion } from 'framer-motion'
import { Search, Filter, MoreVertical, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const clients = [
    {
      id: 1,
      name: 'TechStart Africa',
      sector: 'Technology',
      status: 'active',
      mrr: '$12K',
      growth: '+15%',
      joinedDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Retail Plus',
      sector: 'E-commerce',
      status: 'active',
      mrr: '$8.5K',
      growth: '+12%',
      joinedDate: '2024-02-20',
    },
    {
      id: 3,
      name: 'AgriFood Solutions',
      sector: 'Agriculture',
      status: 'onboarding',
      mrr: '$0',
      growth: 'New',
      joinedDate: '2024-06-01',
    },
    {
      id: 4,
      name: 'Digital Agency Co',
      sector: 'Services',
      status: 'active',
      mrr: '$6K',
      growth: '+8%',
      joinedDate: '2024-03-10',
    },
    {
      id: 5,
      name: 'Fashion Retail Ltd',
      sector: 'Retail',
      status: 'active',
      mrr: '$15K',
      growth: '+22%',
      joinedDate: '2024-01-05',
    },
  ]

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const statusStyles = {
    active: 'bg-green-100 text-green-700',
    onboarding: 'bg-blue-100 text-blue-700',
    completed: 'bg-purple-100 text-purple-700',
  }

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Clients</h1>
        <p className="text-gray-600">Manage and monitor your client portfolio</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex gap-4"
      >
        <div className="flex-1 flex items-center gap-2 bg-[#FAFAFA] rounded-lg px-4 border border-gray-200">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none flex-1 text-sm"
          />
        </div>
        <button className="px-4 py-2 flex items-center gap-2 text-gray-600 hover:bg-[#FAFAFA] rounded-lg transition-colors">
          <Filter size={18} />
          Filter
        </button>
      </motion.div>

      {/* Clients Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FAFAFA] border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Client Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Sector</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">MRR</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Growth</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Joined</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClients.map((client, idx) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-[#FAFAFA] transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#0F172A] text-sm">{client.name}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{client.sector}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusStyles[client.status as keyof typeof statusStyles]
                      }`}
                    >
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#0F172A] text-sm">{client.mrr}</td>
                  <td className="px-6 py-4 text-sm text-green-600 flex items-center gap-1">
                    <ArrowUpRight size={14} />
                    {client.growth}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{client.joinedDate}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-[#FAFAFA] rounded-lg transition-colors">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
