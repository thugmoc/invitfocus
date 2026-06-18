'use client'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react'

export default function AdminComptabiliteSection() {
  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Comptabilité & Audit</h1>
        <p className="text-gray-600">Financial records, invoicing, and audit trails</p>
      </motion.div>
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A]">Total Revenue</h3>
            <DollarSign className="text-green-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A] mb-2">$0</p>
          <p className="text-sm text-gray-600">This month</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A]">Outstanding Invoices</h3>
            <AlertCircle className="text-orange-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A] mb-2">0</p>
          <p className="text-sm text-gray-600">Pending payments</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A]">Profit Margin</h3>
            <TrendingUp className="text-blue-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A] mb-2">0%</p>
          <p className="text-sm text-gray-600">Year to date</p>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <p className="text-gray-600">Detailed accounting features coming soon</p>
      </div>
    </>
  )
}
