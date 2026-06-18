'use client'
import { motion } from 'framer-motion'
import { Send, Bell, Clock, CheckCircle, AlertCircle, Search } from 'lucide-react'
import { useState } from 'react'

const mockConversations = [
  { id: 1, client: 'ADAA ADA', manager: 'Aminata', lastMessage: 'Invoice INV-001 is ready for review', time: '2 hours ago', unread: 2, status: 'active' },
  { id: 2, client: 'WATHIE GLOBAL', manager: 'Bi Boty', lastMessage: 'Please confirm the business plan dates', time: '5 hours ago', unread: 1, status: 'active' },
  { id: 3, client: 'KOD LAB', manager: 'Aminata', lastMessage: 'Compliance documents received', time: '1 day ago', unread: 0, status: 'resolved' },
]

const mockNotifications = [
  { id: 1, type: 'urgent', title: 'Compliance Deadline', message: 'DGID filing due in 2 days for WATHIE GLOBAL', time: '1 hour ago' },
  { id: 2, type: 'warning', title: 'Unbalanced Entries', message: 'KOD LAB has 3 journal entries with debit ≠ credit', time: '3 hours ago' },
  { id: 3, type: 'info', title: 'Report Generated', message: 'Monthly financial report for all clients ready', time: '5 hours ago' },
]

export default function AdminMessagesAdvanced() {
  const [activeTab, setActiveTab] = useState('conversations')
  const [selectedConv, setSelectedConv] = useState(1)
  const [messageText, setMessageText] = useState('')

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Messages & Communications</h1>
        <p className="text-gray-600">Manage client communications, notifications, and internal alerts</p>
      </motion.div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'conversations', label: 'Conversations', badge: 3 },
            { id: 'notifications', label: 'Notifications', badge: 3 },
            { id: 'broadcast', label: 'Broadcast Messages' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 flex-1 px-6 py-4 font-medium text-sm transition ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {tab.badge && <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{tab.badge}</span>}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Conversations Tab */}
          {activeTab === 'conversations' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid lg:grid-cols-3 gap-6 h-96">
              {/* Conversation List */}
              <div className="border border-gray-200 rounded-lg flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div className="flex-1 overflow-y-auto">
                  {mockConversations.map(conv => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConv(conv.id)}
                      className={`w-full p-4 border-b border-gray-100 text-left transition ${
                        selectedConv === conv.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-semibold text-[#0F172A] text-sm">{conv.client}</p>
                        {conv.unread > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{conv.unread}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 truncate">with {conv.manager}</p>
                      <p className="text-xs text-gray-500 mt-1">{conv.time}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Conversation Detail */}
              <div className="lg:col-span-2 border border-gray-200 rounded-lg flex flex-col">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="flex gap-2">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Invoice INV-001 is ready for your review. Please check the amounts.</p>
                      <p className="text-xs text-gray-600 mt-1">10:30 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Looks good! I'll approve it now.</p>
                      <p className="text-xs opacity-75 mt-1">10:35 AM</p>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 flex gap-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#0F172A]">System Notifications</h3>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                  Mark all as read
                </button>
              </div>

              <div className="space-y-3">
                {mockNotifications.map(notif => (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-lg border-l-4 flex gap-4 ${
                      notif.type === 'urgent'
                        ? 'bg-red-50 border-red-400'
                        : notif.type === 'warning'
                          ? 'bg-yellow-50 border-yellow-400'
                          : 'bg-blue-50 border-blue-400'
                    }`}
                  >
                    <div className="mt-1">
                      {notif.type === 'urgent' && <AlertCircle className="text-red-600" size={20} />}
                      {notif.type === 'warning' && <Clock className="text-yellow-600" size={20} />}
                      {notif.type === 'info' && <CheckCircle className="text-blue-600" size={20} />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#0F172A]">{notif.title}</h4>
                      <p className="text-sm text-gray-700 mt-1">{notif.message}</p>
                      <p className="text-xs text-gray-600 mt-2">{notif.time}</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">✕</button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Broadcast Tab */}
          {activeTab === 'broadcast' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">Send Broadcast Message</h3>
              <div className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">Recipient(s)</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option>All Clients</option>
                    <option>Active Clients Only</option>
                    <option>Specific Client</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">Subject</label>
                  <input type="text" placeholder="Message subject..." className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0F172A] mb-2">Message</label>
                  <textarea
                    placeholder="Type your message..."
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  ></textarea>
                </div>

                <div className="flex gap-2">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    Send Message
                  </button>
                  <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
                    Schedule
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
