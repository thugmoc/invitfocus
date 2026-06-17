'use client'

import { useState, useEffect } from 'react'
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
  BookOpen,
  Shield,
  Calendar,
  Briefcase,
} from 'lucide-react'
import { getAllClients } from '@/lib/supabase'

const menuItems = [
  { icon: BarChart3, label: 'Overview', href: '/dashboard', id: 'overview', stage: 0 },
  { icon: FileText, label: 'Comptabilité', href: '/dashboard/comptabilite', id: 'comptabilite', stage: 1 },
  { icon: Shield, label: 'Conformité', href: '/dashboard/conformite', id: 'conformite', stage: 1 },
  { icon: BookOpen, label: 'Business Plan', href: '/dashboard/business-plan', id: 'business-plan', stage: 2 },
  { icon: Briefcase, label: 'Contrats', href: '/dashboard/contrats', id: 'contrats', stage: 2 },
  { icon: Calendar, label: 'Événements', href: '/dashboard/evenements', id: 'evenements', stage: 1 },
  { icon: Download, label: 'Legal', href: '/dashboard/legal', id: 'legal', stage: 5 },
  { icon: TrendingUp, label: 'Strategy', href: '/dashboard/strategy', id: 'strategy', stage: 5 },
  { icon: Zap, label: 'Simulator', href: '/dashboard/simulator', id: 'simulator', stage: 6 },
  { icon: Zap, label: 'AI Tools', href: '/dashboard/ai', id: 'ai', stage: 6 },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages', id: 'messages', stage: 6 },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings', id: 'settings', stage: 0 },
]

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [currentStage, setCurrentStage] = useState(5)
  const [clientName, setClientName] = useState('Dashboard')

  useEffect(() => {
    // Load first client from Supabase
    const loadClients = async () => {
      try {
        const data = await getAllClients()
        if (data && data.length > 0) {
          setCurrentStage(data[0].current_stage)
          setClientName(data[0].company_name || 'Dashboard')
        }
      } catch (error) {
        console.error('Failed to load clients:', error)
      }
    }

    loadClients()
  }, [])

  const isModuleUnlocked = (requiredStage: number) => currentStage >= requiredStage

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
          <p className="text-xs text-gray-500 mt-1">{clientName}</p>
          <div className="mt-3 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-semibold text-blue-700">Étape {currentStage}/6</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isUnlocked = isModuleUnlocked(item.stage)
            const isDisabled = !isUnlocked

            return (
              <div
                key={item.id}
                className={`relative group ${isDisabled ? 'opacity-50' : ''}`}
                title={isDisabled ? `Débloqué à l'étape ${item.stage}` : ''}
              >
                <a
                  href={isDisabled ? '#' : item.href}
                  onClick={(e) => isDisabled && e.preventDefault()}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                    isDisabled
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-[#FAFAFA] hover:text-[#2563EB]'
                  }`}
                >
                  <Icon size={18} className={isDisabled ? '' : 'group-hover:scale-110 transition-transform'} />
                  <span className="flex-1">{item.label}</span>
                  {isDisabled && <span className="text-xs">🔒</span>}
                </a>
                {isDisabled && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:block bg-[#0F172A] text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
                    Étape {item.stage}
                  </div>
                )}
              </div>
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
              const isUnlocked = isModuleUnlocked(item.stage)
              const isDisabled = !isUnlocked

              return (
                <a
                  key={item.id}
                  href={isDisabled ? '#' : item.href}
                  onClick={(e) => {
                    if (isDisabled) e.preventDefault()
                    setIsOpen(false)
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    isDisabled
                      ? 'text-gray-400 opacity-50 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-[#FAFAFA] hover:text-[#2563EB]'
                  }`}
                >
                  <Icon size={18} />
                  <span className="flex-1">{item.label}</span>
                  {isDisabled && <span className="text-xs">🔒</span>}
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
