'use client'

import { motion } from 'framer-motion'
import { Send, Search } from 'lucide-react'
import { useState } from 'react'

export default function MessagesPage() {
  const [messageText, setMessageText] = useState('')
  const [selectedThread, setSelectedThread] = useState(0)

  const threads = [
    {
      id: 1,
      name: 'Account Manager',
      role: 'Your dedicated consultant',
      avatar: 'AM',
      lastMessage: 'Your monthly report is ready for review',
      timestamp: '2 hours ago',
      messages: [
        { sender: 'support', text: 'Hi John! How can I help you today?', time: '10:00 AM' },
        { sender: 'you', text: 'I have questions about the new features', time: '10:15 AM' },
        {
          sender: 'support',
          text: 'Great! I can walk you through the Simulator module. What specifically would you like to know?',
          time: '10:20 AM',
        },
        { sender: 'support', text: 'Your monthly report is ready for review', time: '2 hours ago' },
      ],
    },
    {
      id: 2,
      name: 'Support Team',
      role: 'Technical support',
      avatar: 'ST',
      lastMessage: 'We've resolved the issue',
      timestamp: 'Yesterday',
      messages: [
        { sender: 'you', text: 'I encountered an issue with the dashboard', time: 'Yesterday' },
        { sender: 'support', text: "Let's troubleshoot this together", time: 'Yesterday' },
        { sender: 'support', text: "We've resolved the issue", time: 'Yesterday' },
      ],
    },
    {
      id: 3,
      name: 'Billing',
      role: 'Invoices & payments',
      avatar: 'BL',
      lastMessage: 'Invoice for June is now available',
      timestamp: '1 week ago',
      messages: [
        { sender: 'support', text: 'Invoice for June is now available', time: '1 week ago' },
      ],
    },
  ]

  const current = threads[selectedThread]

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Messages</h1>
        <p className="text-gray-600">Communicate with our support and advisory team</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
        {/* Threads List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2 bg-[#FAFAFA] rounded-lg px-3 py-2 border border-gray-200">
              <Search size={16} className="text-gray-400" />
              <input type="text" placeholder="Search..." className="bg-transparent outline-none flex-1 text-sm" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
            {threads.map((thread, idx) => (
              <motion.button
                key={thread.id}
                onClick={() => setSelectedThread(idx)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`w-full p-4 text-left hover:bg-[#FAFAFA] transition-colors ${
                  selectedThread === idx ? 'bg-blue-50 border-l-2 border-[#2563EB]' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#0F172A] rounded-full text-white flex items-center justify-center text-xs font-bold">
                    {thread.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#0F172A] text-sm">{thread.name}</p>
                    <p className="text-xs text-gray-500">{thread.role}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 truncate">{thread.lastMessage}</p>
                <p className="text-xs text-gray-400 mt-1">{thread.timestamp}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Chat Window */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <p className="font-semibold text-[#0F172A]">{current.name}</p>
            <p className="text-xs text-gray-500">{current.role}</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {current.messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'you'
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-[#FAFAFA] text-[#0F172A] border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'you' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#2563EB] transition-colors"
              />
              <button className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors flex items-center gap-2">
                <Send size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
