'use client'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Clock, Mail, Calendar, Plus } from 'lucide-react'
import { useState } from 'react'

const mockComplianceItems = [
  { id: 1, client: 'ADAA ADA', item: 'NINEA', status: 'done', deadline: '2026-12-31', daysUntil: 196 },
  { id: 2, client: 'ADAA ADA', item: 'RCCM', status: 'done', deadline: '2026-06-30', daysUntil: 12 },
  { id: 3, client: 'WATHIE GLOBAL', item: 'DGID', status: 'pending', deadline: '2026-07-15', daysUntil: 27 },
  { id: 4, client: 'WATHIE GLOBAL', item: 'IPRES', status: 'overdue', deadline: '2026-05-31', daysUntil: -18 },
  { id: 5, client: 'KOD LAB', item: 'CSS', status: 'pending', deadline: '2026-06-20', daysUntil: 2 },
]

export default function AdminConformiteAdvanced() {
  const [activeTab, setActiveTab] = useState('overview')

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'done': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'overdue': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    if (status === 'done') return <CheckCircle size={20} className="text-green-600" />
    if (status === 'overdue') return <AlertCircle size={20} className="text-red-600" />
    return <Clock size={20} className="text-yellow-600" />
  }

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Conformité & Compliance</h1>
        <p className="text-gray-600">Track compliance status, deadlines, and certificates for all clients</p>
      </motion.div>

      {/* Alert Cards */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="text-red-600" size={24} />
            <h3 className="font-bold text-red-900">Critical Alerts</h3>
          </div>
          <p className="text-2xl font-bold text-red-900">3</p>
          <p className="text-sm text-red-700 mt-1">Overdue compliance items</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-yellow-600" size={24} />
            <h3 className="font-bold text-yellow-900">Due Soon</h3>
          </div>
          <p className="text-2xl font-bold text-yellow-900">5</p>
          <p className="text-sm text-yellow-700 mt-1">Due within 7 days</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="text-green-600" size={24} />
            <h3 className="font-bold text-green-900">Compliant</h3>
          </div>
          <p className="text-2xl font-bold text-green-900">12</p>
          <p className="text-sm text-green-700 mt-1">Items completed</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'tracker', label: 'Compliance Tracker' },
            { id: 'calendar', label: 'Calendar' },
            { id: 'reports', label: 'Certificates & Reports' },
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
          {/* Overview */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">Compliance Status by Client</h3>
              <div className="space-y-4">
                {['ADAA ADA', 'WATHIE GLOBAL', 'KOD LAB'].map((client, idx) => {
                  const items = mockComplianceItems.filter(i => i.client === client)
                  const completed = items.filter(i => i.status === 'done').length
                  const percentage = (completed / items.length) * 100
                  return (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-[#0F172A]">{client}</h4>
                        <span className="text-sm font-bold text-[#0F172A]">{completed}/{items.length} Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {items.map(item => (
                          <span
                            key={item.id}
                            className={`px-2 py-1 text-xs rounded font-medium ${getStatusColor(item.status)}`}
                          >
                            {item.item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Tracker */}
          {activeTab === 'tracker' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#0F172A]">Compliance Items Tracker</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Plus size={18} />
                  New Item
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Client</th>
                      <th className="text-left py-3 px-4">Item</th>
                      <th className="text-left py-3 px-4">Deadline</th>
                      <th className="text-left py-3 px-4">Days Until</th>
                      <th className="text-center py-3 px-4">Status</th>
                      <th className="text-center py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockComplianceItems.map(item => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">{item.client}</td>
                        <td className="py-3 px-4 font-medium">{item.item}</td>
                        <td className="py-3 px-4">{item.deadline}</td>
                        <td className="py-3 px-4">
                          <span className={item.daysUntil < 0 ? 'text-red-600' : 'text-gray-600'}>
                            {item.daysUntil < 0 ? `${item.daysUntil} (Overdue)` : `${item.daysUntil} days`}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center">
                            {getStatusIcon(item.status)}
                          </div>
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

          {/* Calendar */}
          {activeTab === 'calendar' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">Compliance Calendar</h3>
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <Calendar size={48} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600">Calendar view with color-coded deadlines</p>
                <p className="text-sm text-gray-500 mt-2">Integration with Google Calendar available</p>
              </div>
            </motion.div>
          )}

          {/* Reports */}
          {activeTab === 'reports' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">Compliance Certificates & Reports</h3>
              <div className="space-y-4 mb-6">
                {['ADAA ADA', 'WATHIE GLOBAL', 'KOD LAB'].map((client, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-[#0F172A]">{client}</h4>
                      <p className="text-sm text-gray-600">Compliance Certificate</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium text-sm">
                        Generate
                      </button>
                      <button className="px-4 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100 font-medium text-sm">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-[#0F172A] mb-4">Bulk Actions</h4>
                <div className="flex gap-2 flex-wrap">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                    Generate All Certificates
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-[#0F172A] rounded hover:bg-gray-200 text-sm">
                    Export to CSV
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100 text-sm">
                    <Mail size={16} />
                    Send Reminders
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
