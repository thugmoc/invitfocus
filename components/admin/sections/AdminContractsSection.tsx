'use client'
import { motion } from 'framer-motion'
import { FileCheck } from 'lucide-react'

export default function AdminContractsSection() {
  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Contracts Manager</h1>
        <p className="text-gray-600">Manage client agreements and contract lifecycle</p>
      </motion.div>
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A]">Active Contracts</h3>
            <FileCheck className="text-green-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">0</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A]">Expiring Soon</h3>
            <FileCheck className="text-orange-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">0</p>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <p className="text-gray-600">Contract management and tracking coming soon</p>
      </div>
    </>
  )
}
