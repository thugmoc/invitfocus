'use client'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

export default function AdminBusinessPlansSection() {
  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Business Plans</h1>
        <p className="text-gray-600">Strategic planning and forecasting for clients</p>
      </motion.div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex gap-3">
          <Briefcase className="text-blue-600 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Business Plans Module</h3>
            <p className="text-sm text-blue-800">Interactive planning tool for clients to build and track business plans</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <p className="text-gray-600">Business planning tools and client workspaces coming soon</p>
      </div>
    </>
  )
}
