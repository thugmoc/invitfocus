'use client'

import { motion } from 'framer-motion'
import { Plus, Download, Eye } from 'lucide-react'
import { useState } from 'react'

export default function ComptabiliteInvoices() {
  const [showForm, setShowForm] = useState(false)
  const [invoices, setInvoices] = useState([])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex justify-between items-center"
      >
        <h2 className="text-2xl font-bold text-[#0F172A]">Invoices (Factures)</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          <Plus size={20} />
          New Invoice
        </button>
      </motion.div>

      {/* Invoice Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-gray-200 p-8 mb-8"
        >
          <h3 className="text-lg font-bold text-[#0F172A] mb-6">Create New Invoice</h3>
          
          <div className="grid lg:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Customer</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>Select customer...</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Invoice Date</label>
              <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Due Date</label>
              <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Status</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>Draft</option>
                <option>Posted</option>
                <option>Paid</option>
              </select>
            </div>
          </div>

          {/* Invoice Lines */}
          <div className="mb-6">
            <h4 className="font-semibold text-[#0F172A] mb-3">Invoice Items</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2">Description</th>
                  <th className="text-right py-2 px-2">Qty</th>
                  <th className="text-right py-2 px-2">Unit Price</th>
                  <th className="text-right py-2 px-2">Tax %</th>
                  <th className="text-right py-2 px-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2"><input type="text" className="w-full px-2 py-1 border border-gray-200 rounded" /></td>
                  <td className="py-2 px-2"><input type="number" className="w-full px-2 py-1 border border-gray-200 rounded text-right" /></td>
                  <td className="py-2 px-2"><input type="number" className="w-full px-2 py-1 border border-gray-200 rounded text-right" /></td>
                  <td className="py-2 px-2"><input type="number" className="w-full px-2 py-1 border border-gray-200 rounded text-right" /></td>
                  <td className="py-2 px-2 text-right font-semibold">$0.00</td>
                </tr>
              </tbody>
            </table>
            <button className="mt-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">+ Add Item</button>
          </div>

          {/* Total */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-end gap-8 text-sm">
              <div><span className="text-gray-600">Subtotal:</span> <span className="font-semibold">$0.00</span></div>
              <div><span className="text-gray-600">Tax:</span> <span className="font-semibold">$0.00</span></div>
              <div><span className="text-gray-600">Total:</span> <span className="font-bold text-lg">$0.00</span></div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-gray-100 text-[#0F172A] rounded-lg hover:bg-gray-200 font-medium">Save Draft</button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Post Invoice</button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2 bg-gray-200 text-[#0F172A] rounded-lg hover:bg-gray-300 font-medium">Cancel</button>
          </div>
        </motion.div>
      )}

      {/* Invoices List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        {invoices.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No invoices yet. Create your first invoice to get started.</p>
        ) : (
          <div className="space-y-2">
            {/* Invoice list will render here */}
          </div>
        )}
      </motion.div>
    </>
  )
}
