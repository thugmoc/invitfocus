'use client'
import { motion } from 'framer-motion'
import { Send, MessageCircle, Clock } from 'lucide-react'
import { useState } from 'react'

const conversations = [
  { id: 1, name: 'Support Team', lastMessage: 'Your account has been updated', time: '2 hours ago', unread: 0 },
  { id: 2, name: 'Account Manager', lastMessage: 'Please review the attached documents', time: '1 day ago', unread: 1 },
]

export default function ClientMessagesTab() {
  const [selectedId, setSelectedId] = useState(1)

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Messages</h1>
        <p className="text-gray-600">Communicate with your support team</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 h-96">
        <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <input type="text" placeholder="Search..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedId(conv.id)}
                className={`w-full p-4 border-b border-gray-100 text-left ${selectedId === conv.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              >
                <p className="font-semibold text-[#0F172A] text-sm">{conv.name}</p>
                <p className="text-xs text-gray-600 truncate mt-1">{conv.lastMessage}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <MessageCircle className="mx-auto mb-2 text-gray-400" size={40} />
              <p>No messages yet</p>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 flex gap-2">
            <input type="text" placeholder="Type message..." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg" />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Send size={20} /></button>
          </div>
        </div>
      </div>
    </>
  )
}
