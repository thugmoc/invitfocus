'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Download, BarChart3, PieChart } from 'lucide-react'

export default function AccountingPage() {
  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Accounting & Financial Reports</h1>
        <p className="text-gray-600">Your bookkeeping, cash flow, and financial statements</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* KPIs */}
        {[
          { label: 'Monthly Revenue', value: '$24,500', change: '+12% MoM' },
          { label: 'Operating Expenses', value: '$8,200', change: '-3% vs budget' },
          { label: 'Net Profit', value: '$16,300', change: '+18% YoY' },
        ].map((kpi, idx) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <p className="text-sm text-gray-600 font-medium mb-2">{kpi.label}</p>
            <p className="text-3xl font-bold text-[#0F172A] mb-2">{kpi.value}</p>
            <p className="text-sm text-green-600">{kpi.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg border border-gray-200 p-6 mb-6"
      >
        <h2 className="text-xl font-bold text-[#0F172A] mb-4">Financial Statements</h2>
        <div className="space-y-3">
          {[
            { name: 'Income Statement (P&L)', date: 'June 2024', icon: TrendingUp },
            { name: 'Cash Flow Statement', date: 'June 2024', icon: BarChart3 },
            { name: 'Balance Sheet', date: 'June 2024', icon: PieChart },
          ].map((report, idx) => {
            const Icon = report.icon
            return (
              <motion.div
                key={report.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-lg border border-gray-200 hover:border-[#2563EB] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon size={20} className="text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm">{report.name}</p>
                    <p className="text-xs text-gray-500">{report.date}</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  <Download size={16} />
                  Download
                </button>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h2 className="text-xl font-bold text-[#0F172A] mb-4">Recent Transactions</h2>
        <div className="space-y-3">
          {[
            { desc: 'Salary payments', amount: '-$8,000', type: 'expense' },
            { desc: 'Client Invoice #1024', amount: '+$5,500', type: 'income' },
            { desc: 'Software subscription', amount: '-$299', type: 'expense' },
            { desc: 'Product sales', amount: '+$3,200', type: 'income' },
          ].map((tx, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
              <p className="text-sm text-gray-600">{tx.desc}</p>
              <p className={`font-semibold text-sm ${tx.type === 'income' ? 'text-green-600' : 'text-gray-600'}`}>
                {tx.amount}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
