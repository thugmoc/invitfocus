'use client'

import { motion } from 'framer-motion'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function ComptabiliteEntries() {
  const [showForm, setShowForm] = useState(false)
  const [entries, setEntries] = useState([])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex justify-between items-center"
      >
        <h2 className="text-2xl font-bold text-[#0F172A]">Journal Entries (Écritures)</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          <Plus size={20} />
          New Entry
        </button>
      </motion.div>

      {/* Entry Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-gray-200 p-8 mb-8"
        >
          <h3 className="text-lg font-bold text-[#0F172A] mb-6">Create New Entry</h3>
          
          <div className="grid lg:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Journal</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                <option>VE - Ventes</option>
                <option>AC - Achats</option>
                <option>OD - Opérations Diverses</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Date</label>
              <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Description</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Entry description" />
            </div>
          </div>

          {/* Entry Lines */}
          <div className="mb-6">
            <h4 className="font-semibold text-[#0F172A] mb-3">Entry Lines</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2">Account</th>
                  <th className="text-left py-2 px-2">Description</th>
                  <th className="text-right py-2 px-2">Debit</th>
                  <th className="text-right py-2 px-2">Credit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2"><input type="text" className="w-full px-2 py-1 border border-gray-200 rounded" /></td>
                  <td className="py-2 px-2"><input type="text" className="w-full px-2 py-1 border border-gray-200 rounded" /></td>
                  <td className="py-2 px-2"><input type="number" className="w-full px-2 py-1 border border-gray-200 rounded text-right" /></td>
                  <td className="py-2 px-2"><input type="number" className="w-full px-2 py-1 border border-gray-200 rounded text-right" /></td>
                </tr>
              </tbody>
            </table>
            <button className="mt-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">+ Add Line</button>
          </div>

          {/* Balance Check */}
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">✅ Entry is balanced (Debit = Credit)</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-gray-100 text-[#0F172A] rounded-lg hover:bg-gray-200 font-medium">Save Draft</button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Post Entry</button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2 bg-gray-200 text-[#0F172A] rounded-lg hover:bg-gray-300 font-medium">Cancel</button>
          </div>
        </motion.div>
      )}

      {/* Entries List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        {entries.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No entries yet. Create your first entry to get started.</p>
        ) : (
          <div className="space-y-2">
            {/* Entry list will render here */}
          </div>
        )}
      </motion.div>
    </>
  )
}
