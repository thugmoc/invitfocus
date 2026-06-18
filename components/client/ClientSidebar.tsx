'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  DollarSign,
  Shield,
  FileText,
  Calendar,
  MessageSquare,
  Settings,
  Menu,
  X,
} from 'lucide-react'

const clientTabs = [
  { icon: BarChart3, label: 'Overview', id: 'overview' },
  { icon: DollarSign, label: 'Comptabilité', id: 'comptabilite' },
  { icon: Shield, label: 'Conformité', id: 'conformite' },
  { icon: FileText, label: 'Contrats & Stratégie', id: 'contrats' },
  { icon: Calendar, label: 'Événements', id: 'evenements' },
  { icon: MessageSquare, label: 'Messages', id: 'messages' },
  { icon: Settings, label: 'Profile & Settings', id: 'settings' },
]

interface ClientSidebarProps {
  activeTab: string
  setActiveTab: (id: string) => void
}

export default function ClientSidebar({ activeTab, setActiveTab }: ClientSidebarProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-lg border border-gray-200 hover:border-[#2563EB] transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 260 : 0 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:flex flex-col bg-white border-r border-gray-200 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#0F172A] rounded-lg flex items-center justify-center text-white font-bold mb-3">
            IF
          </div>
          <h1 className="text-base font-bold text-[#0F172A]">My Dashboard</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {clientTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium text-left ${
                  isActive
                    ? 'bg-[#2563EB] text-white'
                    : 'text-gray-600 hover:bg-[#FAFAFA] hover:text-[#2563EB]'
                }`}
              >
                <Icon size={18} />
                <span className="flex-1">{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </motion.aside>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 top-16 z-30 bg-white flex flex-col"
        >
          <nav className="flex-1 p-4 space-y-2">
            {clientTabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-sm ${
                    isActive
                      ? 'bg-[#2563EB] text-white'
                      : 'text-gray-600 hover:bg-[#FAFAFA] hover:text-[#2563EB]'
                  }`}
                >
                  <Icon size={18} />
                  <span className="flex-1">{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </motion.div>
      )}
    </>
  )
}
