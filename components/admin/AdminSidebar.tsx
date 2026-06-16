'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
  TrendingUp,
  MessageSquare,
} from 'lucide-react'

const menuItems = [
  { icon: BarChart3, label: 'Dashboard', href: '/admin', id: 'dashboard' },
  { icon: Users, label: 'Clients', href: '/admin/clients', id: 'clients' },
  { icon: TrendingUp, label: 'Pipeline', href: '/admin/pipeline', id: 'pipeline' },
  { icon: FileText, label: 'Reports', href: '/admin/reports', id: 'reports' },
  { icon: MessageSquare, label: 'Messages', href: '/admin/messages', id: 'messages' },
  { icon: Settings, label: 'Settings', href: '/admin/settings', id: 'settings' },
]

export default function AdminSidebar() {
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
        animate={{ width: isOpen ? 280 : 0 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:flex flex-col bg-[#0F172A] text-white overflow-hidden border-r border-gray-800"
      >
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold">INVITEFOCUS</h1>
          <p className="text-sm text-gray-400 mt-1">Admin Console</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.id}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 group"
              >
                <Icon size={20} className="group-hover:text-[#2563EB] transition-colors" />
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-900/20 hover:text-red-400 transition-all duration-200">
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 top-16 z-30 bg-[#0F172A] text-white flex flex-col"
        >
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </a>
              )
            })}
          </nav>
          <div className="p-4 border-t border-gray-800">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-900/20 hover:text-red-400 transition-all">
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </motion.div>
      )}
    </>
  )
}
