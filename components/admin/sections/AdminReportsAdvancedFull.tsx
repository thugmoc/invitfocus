'use client'
import { motion } from 'framer-motion'
import { Download, Eye, BarChart3, Calendar, Plus, Filter } from 'lucide-react'
import { useState } from 'react'

const mockReports = [
  { id: 1, name: 'Monthly Revenue Report', type: 'Financial', date: '2026-06-01', generated: '2026-06-15', status: 'ready', clients: 'All', period: 'June 2026' },
  { id: 2, name: 'Client Activity Summary', type: 'Analytics', date: '2026-06-01', generated: '2026-06-14', status: 'ready', clients: 'All', period: 'June 2026' },
  { id: 3, name: 'Pipeline Analysis', type: 'Sales', date: '2026-06-01', generated: '2026-06-13', status: 'ready', clients: 'All', period: 'Q2 2026' },
  { id: 4, name: 'Compliance Audit Report', type: 'Compliance', date: '2026-05-30', generated: '2026-06-10', status: 'ready', clients: 'All', period: 'May 2026' },
  { id: 5, name: 'Year-to-Date Performance', type: 'Executive', date: '2026-06-15', generated: '', status: 'pending', clients: 'All', period: 'Jan-Jun 2026' },
]

const reportTemplates = [
  { id: 1, name: 'Monthly Financial Summary', icon: '📊', frequency: 'Monthly' },
  { id: 2, name: 'Client Accounting Report', icon: '📋', frequency: 'Monthly' },
  { id: 3, name: 'Compliance Status Report', icon: '✅', frequency: 'Monthly' },
  { id: 4, name: 'Pipeline & Revenue Report', icon: '📈', frequency: 'Weekly' },
  { id: 5, name: 'Executive Dashboard Report', icon: '👔', frequency: 'Weekly' },
  { id: 6, name: 'Client Activity Report', icon: '👥', frequency: 'Daily' },
]

export default function AdminReportsAdvancedFull() {
  const [activeTab, setActiveTab] = useState('generated')
  const [selectedClients, setSelectedClients] = useState('all')
  const [dateRange, setDateRange] = useState('month')

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Generate, schedule, and manage business reports</p>
      </motion.div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'generated', label: 'Generated Reports' },
            { id: 'templates', label: 'Report Templates' },
            { id: 'schedule', label: 'Scheduled Reports' },
            { id: 'analytics', label: 'Analytics Dashboard' },
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
          {/* Generated Reports */}
          {activeTab === 'generated' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#0F172A]">Generated Reports</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Plus size={18} />
                  Generate New
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {mockReports.map(report => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-[#0F172A]">{report.name}</h4>
                        <p className="text-sm text-gray-600">{report.type} • {report.period}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        report.status === 'ready' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {report.status === 'ready' ? 'Ready' : 'Generating'}
                      </span>
                    </div>
                    {report.generated && <p className="text-xs text-gray-600 mb-4">Generated: {report.generated}</p>}
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium">
                        <Eye size={18} />
                        Preview
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 font-medium">
                        <Download size={18} />
                        Download
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Templates */}
          {activeTab === 'templates' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">Report Templates</h3>
              <div className="grid lg:grid-cols-3 gap-4">
                {reportTemplates.map(template => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
                  >
                    <div className="text-3xl mb-3">{template.icon}</div>
                    <h4 className="font-semibold text-[#0F172A] mb-1">{template.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">{template.frequency}</p>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                      Use Template
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Scheduled Reports */}
          {activeTab === 'schedule' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">Scheduled Reports</h3>
              <div className="space-y-4 mb-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">Report Template</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Select a template...</option>
                    {reportTemplates.map(t => <option key={t.id}>{t.name}</option>)}
                  </select>
                </div>

                <div className="grid lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-2">Frequency</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Quarterly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-2">Send To</label>
                    <input type="email" placeholder="email@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>

                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  Schedule Report
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-[#0F172A] mb-3">Active Schedules</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium text-sm">Monthly Revenue Report</p>
                      <p className="text-xs text-gray-600">Every 1st of month at 8:00 AM</p>
                    </div>
                    <button className="text-red-600 hover:text-red-700 text-sm">Remove</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Analytics Dashboard */}
          {activeTab === 'analytics' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">Analytics Dashboard</h3>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-[#0F172A] mb-4">Revenue Trend (MTD)</h4>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
                    <p className="text-4xl font-bold text-[#0F172A] mb-2">$142,500</p>
                    <p className="text-green-600 font-medium">↑ 12% from last month</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-[#0F172A] mb-4">Compliance Rate</h4>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 text-center">
                    <p className="text-4xl font-bold text-[#0F172A] mb-2">95%</p>
                    <p className="text-green-600 font-medium">19 of 20 items complete</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-[#0F172A] mb-4">Client Activity</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Active clients</span>
                      <span className="font-bold">15/15</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <p className="text-sm text-gray-600">+2 new clients this month</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-[#0F172A] mb-4">Service Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Accounting</span>
                      <span className="font-bold">60%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Compliance</span>
                      <span className="font-bold">25%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Business Planning</span>
                      <span className="font-bold">15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
