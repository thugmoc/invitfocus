'use client'

import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

export default function ComptabiliteBankReconciliation() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-[#0F172A] mb-8">Bank Reconciliation</h2>

        {/* Status Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h3 className="font-semibold text-[#0F172A] mb-4">Reconciliation Status</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <span className="font-bold text-[#0F172A]">0% Matched</span>
          </div>
          <p className="text-sm text-gray-600">No unreconciled transactions</p>
        </div>

        {/* Unreconciled Transactions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A]">Unreconciled Transactions</h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
              Auto-Reconcile
            </button>
          </div>
          <p className="text-gray-600 text-center py-8">No unreconciled transactions. Your accounts are balanced!</p>
        </div>

        {/* Manual Matching Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex gap-3">
          <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Manual Matching</h4>
            <p className="text-sm text-blue-800">Drag and drop journal entries onto bank transactions to reconcile them manually.</p>
          </div>
        </div>
      </motion.div>
    </>
  )
}
