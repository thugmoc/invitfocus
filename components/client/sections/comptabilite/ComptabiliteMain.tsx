'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, BookOpen, Building2, FileText } from 'lucide-react'
import ComptabiliteDashboard from './ComptabiliteDashboard'
import ComptabiliteEntries from './ComptabiliteEntries'
import ComptabiliteInvoices from './ComptabiliteInvoices'
import ComptabiliteBankReconciliation from './ComptabiliteBankReconciliation'
import ComptabiliteReports from './ComptabiliteReports'

const comptaSubTabs = [
  { icon: BarChart3, label: 'Dashboard', id: 'dashboard' },
  { icon: BookOpen, label: 'Écritures', id: 'entries' },
  { icon: Building2, label: 'Factures', id: 'invoices' },
  { icon: BarChart3, label: 'Bank Reconciliation', id: 'reconciliation' },
  { icon: FileText, label: 'Reports', id: 'reports' },
]

export default function ComptabiliteMain() {
  const [activeSubTab, setActiveSubTab] = useState('dashboard')

  const renderSubTab = () => {
    switch (activeSubTab) {
      case 'dashboard':
        return <ComptabiliteDashboard />
      case 'entries':
        return <ComptabiliteEntries />
      case 'invoices':
        return <ComptabiliteInvoices />
      case 'reconciliation':
        return <ComptabiliteBankReconciliation />
      case 'reports':
        return <ComptabiliteReports />
      default:
        return <ComptabiliteDashboard />
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Comptabilité</h1>
        <p className="text-gray-600">Manage your financial records, invoices, and accounting entries</p>
      </motion.div>

      {/* Sub-tabs navigation */}
      <div className="bg-white rounded-lg border border-gray-200 mb-8 overflow-x-auto">
        <div className="flex gap-1 p-4">
          {comptaSubTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeSubTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-[#2563EB] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      {renderSubTab()}
    </>
  )
}
