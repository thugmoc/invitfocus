'use client'

import { motion } from 'framer-motion'
import { Zap, BarChart3, TrendingUp, MessageCircle, ArrowRight } from 'lucide-react'

export default function DashboardModules() {
  const modules = [
    {
      icon: BarChart3,
      title: 'Simulateur',
      desc: 'Model your growth',
      color: 'from-blue-100 to-blue-50',
      href: '/dashboard/simulator',
    },
    {
      icon: Zap,
      title: 'Builder',
      desc: 'Create scenarios',
      color: 'from-orange-100 to-orange-50',
      href: '/dashboard/builder',
    },
    {
      icon: TrendingUp,
      title: 'Levier',
      desc: 'Identify impact',
      color: 'from-green-100 to-green-50',
      href: '/dashboard/leverage',
    },
    {
      icon: MessageCircle,
      title: 'IA',
      desc: 'Ask questions',
      color: 'from-purple-100 to-purple-50',
      href: '/dashboard/ai',
    },
  ]

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
          return (
            <motion.a
              key={module.title}
              href={module.href}
              variants={item}
              initial="hidden"
              animate="show"
              transition={{ delay: idx * 0.1 }}
              className={`block bg-gradient-to-br ${module.color} rounded-lg p-4 border border-gray-200 hover:border-[#2563EB] hover:shadow-md transition-all cursor-pointer group`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm">{module.title}</p>
                    <p className="text-xs text-gray-600">{module.desc}</p>
                  </div>
                </div>
                <ArrowRight
                  size={18}
                  className="text-gray-400 group-hover:text-[#2563EB] transition-colors mt-1"
                />
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
