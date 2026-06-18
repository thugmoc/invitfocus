'use client'
import { motion } from 'framer-motion'
import { Plus, Calendar, Users, DollarSign } from 'lucide-react'
import { useState } from 'react'

const mockEvents = [
  { id: 1, name: 'Q2 Business Review', client: 'ADAA ADA', type: 'Conference', date: '2026-06-25', attendees: 15, budget: 5000, status: 'planning' },
  { id: 2, name: 'Financial Planning Workshop', client: 'WATHIE GLOBAL', type: 'Workshop', date: '2026-07-10', attendees: 25, budget: 8000, status: 'confirmed' },
  { id: 3, name: 'Annual Gala', client: 'KOD LAB', type: 'Gala', date: '2026-08-15', attendees: 200, budget: 25000, status: 'planning' },
]

export default function AdminEventsAdvanced() {
  const [activeTab, setActiveTab] = useState('list')

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Events Manager</h1>
        <p className="text-gray-600">Manage client events, budgets, and timelines</p>
      </motion.div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'list', label: 'Events List' },
            { id: 'calendar', label: 'Calendar' },
            { id: 'budgets', label: 'Budget Tracking' },
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
                <h3 className="text-lg font-bold text-[#0F172A]">Events</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Plus size={18} />
                  New Event
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Event</th>
                      <th className="text-left py-3 px-4">Client</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-center py-3 px-4">Attendees</th>
                      <th className="text-right py-3 px-4">Budget</th>
                      <th className="text-center py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockEvents.map(event => (
                      <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{event.name}</td>
                        <td className="py-3 px-4">{event.client}</td>
                        <td className="py-3 px-4">{event.type}</td>
                        <td className="py-3 px-4">{event.date}</td>
                        <td className="py-3 px-4 text-center">{event.attendees}</td>
                        <td className="py-3 px-4 text-right">${event.budget}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 text-xs rounded font-medium ${
                            event.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {event.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'calendar' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">Events Calendar</h3>
              <div className="grid lg:grid-cols-3 gap-4">
                {mockEvents.map(event => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <Calendar size={16} className="text-blue-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#0F172A]">{event.name}</h4>
                        <p className="text-sm text-gray-600">{event.date}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{event.client}</p>
                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">{event.type}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'budgets' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">Budget Tracking</h3>
              <div className="space-y-4">
                {mockEvents.map(event => (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-[#0F172A]">{event.name}</h4>
                      <span className="text-lg font-bold text-[#0F172A]">${event.budget}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-600">
                      <span>Spent: $3,250</span>
                      <span>Remaining: $1,750</span>
                    </div>
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
