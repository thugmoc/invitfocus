'use client'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, AlertCircle, Eye, Download, Plus, Filter } from 'lucide-react'
import { useState } from 'react'
import { CurrencyValue } from '@/components/CurrencyDisplay'

const mockJournalEntries = [
  { id: 1, date: '2026-06-18', journal: 'VE', entry: 'ENT-001', description: 'Service revenue', debit: 5000, credit: 0, status: 'posted', client: 'ADAA ADA' },
  { id: 2, date: '2026-06-17', journal: 'AC', entry: 'ENT-002', description: 'Expense payment', debit: 0, credit: 2000, status: 'posted', client: 'WATHIE GLOBAL' },
  { id: 3, date: '2026-06-16', journal: 'OD', entry: 'ENT-003', description: 'Balance adjustment', debit: 1500, credit: 1500, status: 'draft', client: 'KOD LAB' },
]

const mockInvoices = [
  { id: 1, number: 'INV-001', client: 'ADAA ADA', type: 'Service', amount: 5000, status: 'paid', date: '2026-06-01' },
  { id: 2, number: 'INV-002', client: 'WATHIE GLOBAL', type: 'Consultation', amount: 3500, status: 'posted', date: '2026-06-10' },
  { id: 3, number: 'INV-003', client: 'KOD LAB', type: 'Development', amount: 8000, status: 'draft', date: '2026-06-15' },
]

const mockClients = [
  { id: 1, name: 'ADAA ADA INVITE FOCUS', ninea: '00123456789-7', rccm: '001234567', compliance: 4, reconciliation: '100%' },
  { id: 2, name: 'WATHIE GLOBAL SERVICES', ninea: '00987654321-8', rccm: '009876543', compliance: 3, reconciliation: '80%' },
  { id: 3, name: 'KOD LAB', ninea: '00555666777-2', rccm: '005556667', compliance: 5, reconciliation: '60%' },
]

export default function AdminComptabiliteAdvanced() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedClient, setSelectedClient] = useState<string | null>(null)

  const tabs = [
    { id: 'overview', label: 'Dashboard' },
    { id: 'entries', label: 'Journal Entries Audit' },
    { id: 'invoices', label: 'Invoices Audit' },
    { id: 'reconciliation', label: 'Bank Reconciliation' },
    { id: 'reports', label: 'Financial Reports' },
  ]

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Comptabilité & Audit</h1>
        <p className="text-gray-600">Monitor all client accounting records, invoices, and audit compliance</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A] text-sm">Total Revenue</h3>
            <DollarSign className="text-green-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A] mb-2">
            <CurrencyValue amount={142500} />
          </p>
          <p className="text-sm text-green-600">↑ 12% from last month</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A] text-sm">Outstanding Invoices</h3>
            <AlertCircle className="text-orange-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A] mb-2">5</p>
          <p className="text-sm text-orange-600">
            <CurrencyValue amount={18500} /> pending
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A] text-sm">Balanced Entries</h3>
            <TrendingUp className="text-blue-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A] mb-2">98%</p>
          <p className="text-sm text-blue-600">42 of 43 entries</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A] text-sm">Reconciliation</h3>
            <DollarSign className="text-purple-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A] mb-2">80%</p>
          <p className="text-sm text-purple-600">3 of 4 clients completed</p>
        </motion.div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-lg border border-gray-200 mb-8">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map(tab => (
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

        {/* Tab Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">Accounting Dashboard</h3>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-[#0F172A] mb-4">Recent Journal Entries</h4>
                  <div className="space-y-2">
                    {mockJournalEntries.slice(0, 3).map(entry => (
                      <div key={entry.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-sm">{entry.entry}</p>
                          <p className="text-xs text-gray-600">{entry.client} • {entry.date}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded ${entry.status === 'posted' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {entry.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-[#0F172A] mb-4">Recent Invoices</h4>
                  <div className="space-y-2">
                    {mockInvoices.slice(0, 3).map(invoice => (
                      <div key={invoice.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-sm">{invoice.number}</p>
                          <p className="text-xs text-gray-600">{invoice.client} • ${invoice.amount}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded ${
                          invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                          invoice.status === 'posted' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {invoice.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Journal Entries Tab */}
          {activeTab === 'entries' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#0F172A]">Journal Entries Audit</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Filter size={18} />
                  Filter
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Entry #</th>
                      <th className="text-left py-3 px-4">Client</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Journal</th>
                      <th className="text-right py-3 px-4">Debit</th>
                      <th className="text-right py-3 px-4">Credit</th>
                      <th className="text-center py-3 px-4">Balance</th>
                      <th className="text-center py-3 px-4">Status</th>
                      <th className="text-center py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockJournalEntries.map(entry => (
                      <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{entry.entry}</td>
                        <td className="py-3 px-4">{entry.client}</td>
                        <td className="py-3 px-4">{entry.date}</td>
                        <td className="py-3 px-4">{entry.journal}</td>
                        <td className="py-3 px-4 text-right">${entry.debit}</td>
                        <td className="py-3 px-4 text-right">${entry.credit}</td>
                        <td className="py-3 px-4 text-center">
                          {entry.debit === entry.credit ? (
                            <span className="text-green-600">✓</span>
                          ) : (
                            <span className="text-red-600">✗</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 text-xs rounded ${entry.status === 'posted' ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}>
                            {entry.status}
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

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#0F172A]">Invoices Audit</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Filter size={18} />
                  Filter
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Invoice #</th>
                      <th className="text-left py-3 px-4">Client</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-right py-3 px-4">Amount</th>
                      <th className="text-center py-3 px-4">Status</th>
                      <th className="text-center py-3 px-4">Paid</th>
                      <th className="text-center py-3 px-4">Posted</th>
                      <th className="text-center py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInvoices.map(invoice => (
                      <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{invoice.number}</td>
                        <td className="py-3 px-4">{invoice.client}</td>
                        <td className="py-3 px-4">{invoice.type}</td>
                        <td className="py-3 px-4 text-right">${invoice.amount}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 text-xs rounded ${
                            invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                            invoice.status === 'posted' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100'
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <input type="checkbox" checked={invoice.status === 'paid'} className="rounded" />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-green-600">✓</span>
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

          {/* Reconciliation Tab */}
          {activeTab === 'reconciliation' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">Bank Reconciliation</h3>
              <div className="space-y-4">
                {mockClients.map(client => (
                  <div key={client.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-[#0F172A]">{client.name}</h4>
                        <p className="text-xs text-gray-600">NINEA: {client.ninea}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-[#0F172A]">{client.reconciliation}</p>
                        <p className="text-xs text-gray-600">Reconciled</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: client.reconciliation }}
                      ></div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                        View Unreconciled
                      </button>
                      <button className="px-3 py-1 text-sm bg-green-50 text-green-600 rounded hover:bg-green-100">
                        Auto-Reconcile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">Financial Reports</h3>
              <div className="grid lg:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">Select Client(s)</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option>All Clients</option>
                    {mockClients.map(c => <option key={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">Date Range</label>
                  <input type="month" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium">
                  <Download size={20} />
                  Trial Balance
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium">
                  <Download size={20} />
                  Balance Sheet
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium">
                  <Download size={20} />
                  Income Statement
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium">
                  <Download size={20} />
                  General Ledger
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
