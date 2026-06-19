'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Users,
  LogOut,
  Menu,
  X,
  FileText,
  TrendingUp,
  MessageSquare,
  DollarSign,
  Shield,
  Briefcase,
  FileCheck,
  Calendar,
  Folder,
} from 'lucide-react'

const adminSections = [
  { icon: BarChart3, label: 'Dashboard', id: 'dashboard' },
  { icon: Users, label: 'Clients', id: 'clients' },
  { icon: TrendingUp, label: 'Pipeline', id: 'pipeline' },
  { icon: FileText, label: 'Reports', id: 'reports' },
  { icon: MessageSquare, label: 'Messages', id: 'messages' },
  { icon: Folder, label: 'Documents', id: 'documents' },
  { icon: DollarSign, label: 'Comptabilité & Audit', id: 'comptabilite' },
  { icon: Shield, label: 'Conformité', id: 'conformite' },
  { icon: Briefcase, label: 'Business Plans', id: 'business-plans' },
  { icon: FileCheck, label: 'Contracts', id: 'contracts' },
  { icon: Calendar, label: 'Events', id: 'events' },
]

interface AdminSidebarProps {
  activeSection: string
  setActiveSection: (id: string) => void
}

export default function AdminSidebar({ activeSection, setActiveSection }: AdminSidebarProps) {
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

        <nav className="flex-1 p-4 space-y-1">
          {adminSections.map((section) => {
            const Icon = section.icon
            const isActive = activeSection === section.id
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium text-left ${
                  isActive
                    ? 'bg-[#2563EB] text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span>{section.label}</span>
              </button>
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
            {adminSections.map((section) => {
              const Icon = section.icon
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium text-left ${
                    isActive
                      ? 'bg-[#2563EB] text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span>{section.label}</span>
                </button>
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
