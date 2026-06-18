'use client'
import { motion } from 'framer-motion'
import { Download, Eye, BarChart3 } from 'lucide-react'

const reports = [
  { name: 'Monthly Revenue Report', type: 'Financial', date: '2026-06-01', status: 'Ready' },
  { name: 'Client Activity Summary', type: 'Analytics', date: '2026-06-01', status: 'Ready' },
  { name: 'Pipeline Analysis', type: 'Sales', date: '2026-06-01', status: 'Ready' },
  { name: 'Compliance Audit', type: 'Compliance', date: '2026-05-30', status: 'Ready' },
  { name: 'Year-to-Date Performance', type: 'Executive', date: '2026-06-15', status: 'Pending' },
]

export default function AdminReportsAdvanced() {
  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Generate and download business reports</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {reports.map((report) => (
          <motion.div
            key={report.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-[#0F172A]">{report.name}</h3>
                <p className="text-sm text-gray-600">{report.type} • {report.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                report.status === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {report.status}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium">
                <Eye size={18} />
                View
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 font-medium">
                <Download size={18} />
                Download
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}
