'use client'
import { motion } from 'framer-motion'
import { Plus, AlertCircle, Clock, CheckCircle, Download } from 'lucide-react'
import { useState } from 'react'

const mockContracts = [
  { id: 1, client: 'ADAA ADA', counterparty: 'Service Provider A', type: 'Service', status: 'signed', startDate: '2026-01-15', endDate: '2026-12-31', renewal: '2026-11-15', daysUntilRenewal: 150 },
  { id: 2, client: 'WATHIE GLOBAL', counterparty: 'Supplier B', type: 'Supply', status: 'negotiation', startDate: '2026-06-01', endDate: '2027-06-01', renewal: '2027-05-01', daysUntilRenewal: 317 },
  { id: 3, client: 'KOD LAB', counterparty: 'Partner C', type: 'Partnership', status: 'signed', startDate: '2025-03-01', endDate: '2027-03-01', renewal: '2026-12-01', daysUntilRenewal: 166 },
]

export default function AdminContractsAdvanced() {
  const [activeTab, setActiveTab] = useState('list')

  const getStatusColor = (status: string) => {
    if (status === 'signed') return 'bg-green-100 text-green-700'
    if (status === 'negotiation') return 'bg-yellow-100 text-yellow-700'
    return 'bg-gray-100 text-gray-700'
  }

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Contracts Manager</h1>
        <p className="text-gray-600">Manage client contracts, negotiations, and renewals</p>
      </motion.div>

      {/* Alert */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-yellow-600" size={24} />
          <div>
            <h3 className="font-semibold text-yellow-900">Renewal Alerts</h3>
            <p className="text-sm text-yellow-700">2 contracts expiring within 90 days</p>
          </div>
        </div>
      </motion.div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'list', label: 'Contracts List' },
            { id: 'negotiations', label: 'Active Negotiations' },
            { id: 'renewals', label: 'Renewal Alerts' },
            { id: 'archive', label: 'Archive' },
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
                <h3 className="text-lg font-bold text-[#0F172A]">All Contracts</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Plus size={18} />
                  New Contract
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Client</th>
                      <th className="text-left py-3 px-4">Counterparty</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Start Date</th>
                      <th className="text-left py-3 px-4">End Date</th>
                      <th className="text-center py-3 px-4">Status</th>
                      <th className="text-center py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockContracts.map(contract => (
                      <tr key={contract.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">{contract.client}</td>
                        <td className="py-3 px-4 font-medium">{contract.counterparty}</td>
                        <td className="py-3 px-4">{contract.type}</td>
                        <td className="py-3 px-4">{contract.startDate}</td>
                        <td className="py-3 px-4">{contract.endDate}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 text-xs rounded font-medium ${getStatusColor(contract.status)}`}>
                            {contract.status === 'signed' ? 'Signed' : 'Negotiating'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button className="text-blue-600 hover:underline text-xs">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'negotiations' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">Active Negotiations</h3>
              <div className="space-y-4">
                {mockContracts.filter(c => c.status === 'negotiation').map(contract => (
                  <div key={contract.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-[#0F172A]">{contract.client}</h4>
                        <p className="text-sm text-gray-600">with {contract.counterparty}</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-sm font-medium">Negotiating</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{contract.type} Agreement</p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                        View Contract
                      </button>
                      <button className="px-3 py-1 text-sm bg-green-50 text-green-600 rounded hover:bg-green-100">
                        Mark as Signed
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'renewals' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">Renewal Alerts</h3>
              <div className="space-y-4">
                {mockContracts.filter(c => c.daysUntilRenewal < 180).map(contract => (
                  <div key={contract.id} className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                    <div className="flex items-start gap-4">
                      <Clock className="text-blue-600 mt-1" size={20} />
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#0F172A]">{contract.client}</h4>
                        <p className="text-sm text-gray-600">{contract.counterparty}</p>
                        <p className="text-sm font-medium text-blue-700 mt-1">
                          Renewal Date: {contract.renewal} ({contract.daysUntilRenewal} days)
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium">
                        Take Action
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'archive' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">Contract Archive</h3>
              <div className="flex flex-col gap-2">
                {mockContracts.filter(c => c.status === 'signed').map(contract => (
                  <div key={contract.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-600" size={20} />
                      <div>
                        <p className="font-medium text-[#0F172A]">{contract.client} - {contract.counterparty}</p>
                        <p className="text-xs text-gray-600">{contract.type} • {contract.endDate}</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:underline">
                      <Download size={14} />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
