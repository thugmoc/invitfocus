'use client'
import { motion } from 'framer-motion'
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react'

export default function AdminConformiteSection() {
  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Conformité & Compliance</h1>
        <p className="text-gray-600">Regulatory compliance and policy adherence</p>
      </motion.div>
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A]">Compliance Score</h3>
            <Shield className="text-green-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A] mb-2">100%</p>
          <p className="text-sm text-gray-600">All policies met</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A]">Completed Audits</h3>
            <CheckCircle className="text-blue-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A] mb-2">0</p>
          <p className="text-sm text-gray-600">This quarter</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A]">Open Issues</h3>
            <AlertTriangle className="text-orange-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A] mb-2">0</p>
          <p className="text-sm text-gray-600">Requiring attention</p>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <p className="text-gray-600">Compliance tracking and audit management coming soon</p>
      </div>
    </>
  )
}
