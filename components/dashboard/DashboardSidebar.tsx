'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Zap,
  TrendingUp,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Download,
} from 'lucide-react'

const menuItems = [
  { icon: BarChart3, label: 'Overview', href: '/dashboard', id: 'overview' },
  { icon: FileText, label: 'Accounting', href: '/dashboard/accounting', id: 'accounting' },
  { icon: Download, label: 'Simulator', href: '/dashboard/simulator', id: 'simulator' },
  { icon: TrendingUp, label: 'Strategy', href: '/dashboard/strategy', id: 'strategy' },
  { icon: Zap, label: 'AI Tools', href: '/dashboard/ai', id: 'ai' },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages', id: 'messages' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings', id: 'settings' },
]

export default function DashboardSidebar() {
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
          <h1 className="text-base font-bold text-[#0F172A]">My Account</h1>
          <p className="text-xs text-gray-500 mt-1">TechStart Africa</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.id}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-[#FAFAFA] hover:text-[#2563EB] transition-all duration-200 group text-sm font-medium"
              >
                <Icon size={18} className="group-hover:scale-110 transition-transform" />
                <span>{item.label}</span>
              </a>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-3">
          <div className="px-4 py-3 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-xs font-semibold text-[#2563EB] mb-1">Account Status</p>
            <p className="text-xs text-gray-600">Active</p>
          </div>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all text-sm font-medium">
            <LogOut size={18} />
            Logout
          </button>
        </div>
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
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-[#FAFAFA] hover:text-[#2563EB] transition-all font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </a>
              )
            })}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all font-medium">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </>
  )
}
