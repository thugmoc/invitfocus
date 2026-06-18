'use client'
import { motion } from 'framer-motion'
import { FileText, Upload, Download, Eye } from 'lucide-react'
import { useState } from 'react'

export default function ClientContratsTab() {
  const [contracts, setContracts] = useState([
    { id: 1, name: 'Service Agreement 2026', type: 'Service Contract', date: '2026-01-15', status: 'Active' },
    { id: 2, name: 'Supplier Agreement', type: 'Supplier Contract', date: '2025-06-01', status: 'Active' },
  ])

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Contrats & Stratégie</h1>
        <p className="text-gray-600">Manage your agreements and strategic documents</p>
      </motion.div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-[#0F172A]">Active Contracts</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            <Upload size={18} />
            Upload Contract
          </button>
        </div>

        <div className="space-y-3">
          {contracts.map((contract) => (
            <motion.div
              key={contract.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <FileText className="text-blue-600" size={24} />
                <div>
                  <p className="font-semibold text-[#0F172A]">{contract.name}</p>
                  <p className="text-sm text-gray-600">{contract.type} • {contract.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">{contract.status}</span>
                <button className="p-2 hover:bg-gray-200 rounded-lg">
                  <Eye size={18} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-lg">
                  <Download size={18} className="text-gray-600" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-[#0F172A] mb-6">Strategic Documents</h2>
        <div className="text-gray-600 text-center py-8">
          <FileText className="mx-auto mb-3 text-gray-400" size={40} />
          <p>No strategy documents uploaded yet</p>
        </div>
      </div>
    </>
  )
}
