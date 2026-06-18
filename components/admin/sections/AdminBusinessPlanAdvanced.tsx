'use client'
import { motion } from 'framer-motion'
import { Plus, Eye, Download, Check, X } from 'lucide-react'
import { useState } from 'react'

const mockPlans = [
  { id: 1, client: 'ADAA ADA', status: 'approved', version: 'V2', created: '2026-05-15', updated: '2026-06-10' },
  { id: 2, client: 'WATHIE GLOBAL', status: 'in_review', version: 'V1', created: '2026-06-01', updated: '2026-06-15' },
  { id: 3, client: 'KOD LAB', status: 'draft', version: 'V1', created: '2026-06-10', updated: '2026-06-17' },
]

export default function AdminBusinessPlanAdvanced() {
  const [activeTab, setActiveTab] = useState('list')

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Business Plans</h1>
        <p className="text-gray-600">Manage business plans, approvals, and financial projections</p>
      </motion.div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'list', label: 'Business Plans List' },
            { id: 'approvals', label: 'Approval Workflow' },
            { id: 'analytics', label: 'Financial Analytics' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 font-medium text-sm transition ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'list' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#0F172A]">Business Plans</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Plus size={18} />
                  New Plan
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Client</th>
                      <th className="text-left py-3 px-4">Version</th>
                      <th className="text-left py-3 px-4">Created</th>
                      <th className="text-left py-3 px-4">Updated</th>
                      <th className="text-center py-3 px-4">Status</th>
                      <th className="text-center py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPlans.map(plan => (
                      <tr key={plan.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{plan.client}</td>
                        <td className="py-3 px-4">{plan.version}</td>
                        <td className="py-3 px-4">{plan.created}</td>
                        <td className="py-3 px-4">{plan.updated}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 text-xs rounded font-medium ${
                            plan.status === 'approved' ? 'bg-green-100 text-green-700' :
                            plan.status === 'in_review' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {plan.status === 'approved' ? 'Approved' : plan.status === 'in_review' ? 'In Review' : 'Draft'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center flex gap-2 justify-center">
                          <button className="text-blue-600 hover:underline text-xs">View</button>
                          <button className="text-gray-600 hover:underline text-xs">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'approvals' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">Approval Workflow</h3>
              <div className="space-y-4">
                {mockPlans.filter(p => p.status !== 'draft').map(plan => (
                  <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-[#0F172A]">{plan.client} - {plan.version}</h4>
                        <p className="text-sm text-gray-600">Submitted: {plan.updated}</p>
                      </div>
                      <span className={`px-3 py-1 text-sm rounded font-medium ${
                        plan.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {plan.status === 'approved' ? 'Approved' : 'Pending Review'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100">
                        <Check size={16} />
                        Approve
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100">
                        <X size={16} />
                        Request Changes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">Financial Projections Analytics</h3>
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600 mb-4">5-Year Financial Projections by Client</p>
                <div className="grid lg:grid-cols-3 gap-4">
                  {['Optimistic Scenario', 'Realistic Scenario', 'Pessimistic Scenario'].map((scenario, idx) => (
                    <div key={idx} className="bg-white rounded p-4 border border-gray-200">
                      <h4 className="font-semibold text-[#0F172A] mb-3">{scenario}</h4>
                      <p className="text-3xl font-bold text-blue-600 mb-2">+42%</p>
                      <p className="text-sm text-gray-600">5-year growth projection</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
