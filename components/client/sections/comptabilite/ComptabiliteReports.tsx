'use client'

import { motion } from 'framer-motion'
import { Download, Eye } from 'lucide-react'

const reports = [
  { name: 'Trial Balance', description: 'Verify all accounts are balanced' },
  { name: 'Balance Sheet (Bilan)', description: 'Assets, Liabilities, and Equity summary' },
  { name: 'Income Statement', description: 'Revenue, Expenses, and Profit summary' },
  { name: 'General Ledger', description: 'Detailed account transactions' },
]

export default function ComptabiliteReports() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-[#0F172A] mb-8">Financial Reports</h2>

        {/* Date Range Filter */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h3 className="font-semibold text-[#0F172A] mb-4">Report Period</h3>
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">From</label>
              <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">To</label>
              <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {reports.map((report) => (
            <motion.div
              key={report.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <h3 className="font-semibold text-[#0F172A] mb-2">{report.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium">
                  <Eye size={16} />
                  Preview
                </button>
                <button className="flex items-center gap-2 flex-1 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 font-medium">
                  <Download size={16} />
                  PDF
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  )
}
