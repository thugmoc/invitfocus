'use client'
import { motion } from 'framer-motion'
import { Users, Filter, Download, Eye, Edit, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AdminClientsAdvanced() {
  const [clients, setClients] = useState([
    { id: 1, name: 'ADAA ADA INVITE FOCUS', email: 'adaa@invitfocus.com', stage: 3, status: 'active', revenue: '$0', industry: 'Technology' },
    { id: 2, name: 'WATHIE GLOBAL SERVICES', email: 'wathie@global.com', stage: 3, status: 'active', revenue: '$0', industry: 'Global Services' },
    { id: 3, name: 'CHAMS TRAVEL SERVICES', email: 'chams@travel.com', stage: 3, status: 'active', revenue: '$0', industry: 'Travel & Tourism' },
    { id: 4, name: 'SOLLY TRADING', email: 'solly@trading.com', stage: 3, status: 'active', revenue: '$0', industry: 'Trading' },
  ])
  const [filter, setFilter] = useState('all')

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Clients Management</h1>
        <p className="text-gray-600">View and manage all your clients</p>
      </motion.div>

      {/* Filters & Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="flex gap-4 justify-between items-center">
          <div className="flex gap-2">
            {['all', 'active', 'inactive'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 font-medium">
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#0F172A]">Company</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#0F172A]">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#0F172A]">Industry</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#0F172A]">Stage</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#0F172A]">Revenue</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-[#0F172A]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold text-[#0F172A]">{client.name}</td>
                <td className="px-6 py-3 text-gray-600 text-sm">{client.email}</td>
                <td className="px-6 py-3 text-gray-600 text-sm">{client.industry}</td>
                <td className="px-6 py-3"><span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Stage {client.stage}</span></td>
                <td className="px-6 py-3 font-semibold">{client.revenue}</td>
                <td className="px-6 py-3 text-right space-x-2">
                  <button className="p-2 hover:bg-blue-100 rounded-lg">
                    <Eye size={18} className="text-blue-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded-lg">
                    <Edit size={18} className="text-gray-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </>
  )
}
