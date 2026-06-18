'use client'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, AlertCircle, Eye, Download } from 'lucide-react'

export default function AdminComptabiliteSection() {
  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Comptabilité & Audit</h1>
        <p className="text-gray-600">Monitor all client accounting records, invoices, and audit compliance</p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A] text-sm">Total Client Revenue</h3>
            <DollarSign className="text-green-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A] mb-2">$0</p>
          <p className="text-sm text-gray-600">Across all clients</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A] text-sm">Outstanding Invoices</h3>
            <AlertCircle className="text-orange-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A] mb-2">0</p>
          <p className="text-sm text-gray-600">Awaiting payment</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A] text-sm">Audit Compliance</h3>
            <TrendingUp className="text-green-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A] mb-2">100%</p>
          <p className="text-sm text-gray-600">All clients compliant</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A] text-sm">Journal Entries</h3>
            <DollarSign className="text-blue-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A] mb-2">0</p>
          <p className="text-sm text-gray-600">Pending review</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <h2 className="text-lg font-bold text-[#0F172A] mb-4">Recent Client Invoices</h2>
          <p className="text-gray-600 text-center py-8">No invoices submitted yet</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <h2 className="text-lg font-bold text-[#0F172A] mb-4">Journal Entry Queue</h2>
          <p className="text-gray-600 text-center py-8">No entries pending review</p>
        </motion.div>
      </div>

      {/* Financial Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h2 className="text-lg font-bold text-[#0F172A] mb-4">Admin Controls</h2>
        <div className="grid lg:grid-cols-3 gap-4">
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium">
            <Eye size={18} />
            Audit All Clients
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 font-medium">
            <Download size={18} />
            Export Report
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 font-medium">
            <AlertCircle size={18} />
            Compliance Check
          </button>
        </div>
      </motion.div>
    </>
  )
}
