'use client'

import { motion } from 'framer-motion'
import { Send, Search, Plus } from 'lucide-react'
import { useState } from 'react'

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [messageText, setMessageText] = useState('')

  const conversations = [
    {
      id: 1,
      client: 'TechStart Africa',
      lastMessage: 'Thanks for the report, very helpful!',
      timestamp: '2 hours ago',
      unread: false,
      messages: [
        { sender: 'client', text: 'Hi, can we discuss the financial report?', time: '10:30 AM' },
        { sender: 'admin', text: 'Of course! What would you like to know?', time: '10:35 AM' },
        { sender: 'client', text: 'Thanks for the report, very helpful!', time: '11:00 AM' },
      ],
    },
    {
      id: 2,
      client: 'Retail Plus',
      lastMessage: 'When can we schedule the next call?',
      timestamp: '5 hours ago',
      unread: true,
      messages: [
        { sender: 'client', text: 'When can we schedule the next call?', time: '1:30 PM' },
      ],
    },
    {
      id: 3,
      client: 'Digital Agency Co',
      lastMessage: 'The strategy looks great!',
      timestamp: 'Yesterday',
      unread: false,
      messages: [
        { sender: 'admin', text: 'Here is your strategy roadmap', time: 'Yesterday' },
        { sender: 'client', text: 'The strategy looks great!', time: 'Yesterday' },
      ],
    },
  ]

  const currentConversation = conversations[selectedConversation]

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Messages</h1>
        <p className="text-gray-600">Communicate with your clients</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2 bg-[#FAFAFA] rounded-lg px-3 py-2 border border-gray-200">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none flex-1 text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
            {conversations.map((conv, idx) => (
              <motion.button
                key={conv.id}
                onClick={() => setSelectedConversation(idx)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 + idx * 0.05 }}
                className={`w-full p-4 text-left hover:bg-[#FAFAFA] transition-colors ${
                  selectedConversation === idx ? 'bg-blue-50 border-l-2 border-[#2563EB]' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="font-semibold text-[#0F172A] text-sm">{conv.client}</p>
                  {conv.unread && <div className="w-2 h-2 bg-[#2563EB] rounded-full" />}
                </div>
                <p className="text-xs text-gray-600 truncate">{conv.lastMessage}</p>
                <p className="text-xs text-gray-400 mt-1">{conv.timestamp}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Chat Window */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <p className="font-semibold text-[#0F172A]">{currentConversation.client}</p>
              <p className="text-xs text-gray-500">Active now</p>
            </div>
            <button className="p-2 hover:bg-[#FAFAFA] rounded-lg transition-colors">
              <Plus size={18} className="text-gray-400" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentConversation.messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'admin'
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-[#FAFAFA] text-[#0F172A] border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'}`}>
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
                placeholder="Type a message..."
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
