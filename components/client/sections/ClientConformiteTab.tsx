'use client'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle } from 'lucide-react'

const complianceItems = [
  { name: 'Tax Filing Status', status: 'compliant', dueDate: '2026-12-31' },
  { name: 'Financial Audit', status: 'pending', dueDate: '2026-09-30' },
  { name: 'Legal Documents', status: 'compliant', dueDate: '2026-12-31' },
  { name: 'Licenses & Permits', status: 'compliant', dueDate: '2026-06-30' },
]

export default function ClientConformiteTab() {
  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Conformité</h1>
        <p className="text-gray-600">Track your compliance status and regulatory requirements</p>
      </motion.div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-bold text-[#0F172A] mb-4">Compliance Score</h2>
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-green-600 h-4 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          <span className="font-bold text-[#0F172A] text-2xl">100%</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {complianceItems.map((item) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-[#0F172A]">{item.name}</h3>
              {item.status === 'compliant' ? (
                <CheckCircle className="text-green-600" size={24} />
              ) : (
                <AlertCircle className="text-orange-600" size={24} />
              )}
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Status: <span className="font-semibold capitalize">{item.status}</span></p>
              <p className="text-sm text-gray-600">Due: {item.dueDate}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}
