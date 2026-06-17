'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, BarChart3, TrendingUp, MessageCircle, ArrowRight, Lock } from 'lucide-react'
import { getAllClients } from '@/lib/supabase'

export default function DashboardModules() {
  const [currentStage, setCurrentStage] = useState(5)

  useEffect(() => {
    // Load first client stage from Supabase
    const loadClientStage = async () => {
      try {
        const data = await getAllClients()
        if (data && data.length > 0) {
          setCurrentStage(data[0].current_stage)
        }
      } catch (error) {
        console.error('Failed to load client stage:', error)
      }
    }

    loadClientStage()
  }, [])

  const modules = [
    {
      icon: BarChart3,
      title: 'Simulateur',
      desc: 'Model your growth',
      color: 'from-blue-100 to-blue-50',
      href: '/dashboard/simulator',
      requiredStage: 6,
    },
    {
      icon: Zap,
      title: 'Builder',
      desc: 'Create scenarios',
      color: 'from-orange-100 to-orange-50',
      href: '/dashboard/builder',
      requiredStage: 6,
    },
    {
      icon: TrendingUp,
      title: 'Levier',
      desc: 'Identify impact',
      color: 'from-green-100 to-green-50',
      href: '/dashboard/leverage',
      requiredStage: 6,
    },
    {
      icon: MessageCircle,
      title: 'IA',
      desc: 'Ask questions',
      color: 'from-purple-100 to-purple-50',
      href: '/dashboard/ai',
      requiredStage: 6,
    },
  ]

  const isModuleUnlocked = (requiredStage: number) => currentStage >= requiredStage

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-[#0F172A] mb-4">AI & Simulation Tools</h2>
      <p className="text-sm text-gray-600 mb-6">Explore scenarios and make better decisions</p>

      <div className="space-y-3">
        {modules.map((module, idx) => {
          const Icon = module.icon
          const isUnlocked = isModuleUnlocked(module.requiredStage)
          const isDisabled = !isUnlocked

          return (
            <motion.a
              key={module.title}
              href={isDisabled ? '#' : module.href}
              onClick={(e) => isDisabled && e.preventDefault()}
              variants={item}
              initial="hidden"
              animate="show"
              transition={{ delay: idx * 0.1 }}
              className={`block bg-gradient-to-br ${module.color} rounded-lg p-4 border transition-all group ${
                isDisabled
                  ? 'opacity-50 border-gray-200 cursor-not-allowed'
                  : 'border-gray-200 hover:border-[#2563EB] hover:shadow-md cursor-pointer'
              }`}
              title={isDisabled ? `Débloqué à l'étape ${module.requiredStage}` : ''}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className={isDisabled ? 'text-gray-400' : 'text-[#2563EB]'} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm">{module.title}</p>
                    <p className={`text-xs ${isDisabled ? 'text-gray-400' : 'text-gray-600'}`}>{module.desc}</p>
                  </div>
                </div>
                {isDisabled ? (
                  <Lock size={18} className="text-gray-400 mt-1" />
                ) : (
                  <ArrowRight
                    size={18}
                    className="text-gray-400 group-hover:text-[#2563EB] transition-colors mt-1"
                  />
                )}
              </div>
            </motion.a>
          )
        })}
      </div>

      <button className="w-full mt-6 px-4 py-3 rounded-lg bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition-colors text-sm">
        Explore All Tools
      </button>
    </div>
  )
}
