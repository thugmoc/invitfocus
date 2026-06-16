'use client'

import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

export default function DashboardQuickStats() {
  const stats = [
    {
      label: 'Financial Health',
      value: '8.5/10',
      status: 'good',
      icon: BarChart3,
      color: 'from-green-100 to-green-50',
    },
    {
      label: 'Revenue (This Month)',
      value: '$24,500',
      change: '+12% vs last month',
      icon: TrendingUp,
      color: 'from-blue-100 to-blue-50',
    },
    {
      label: 'Action Items',
      value: '3 pending',
      status: 'attention',
      icon: AlertCircle,
      color: 'from-orange-100 to-orange-50',
    },
    {
      label: 'Compliance Status',
      value: 'All clear',
      status: 'good',
      icon: CheckCircle,
      color: 'from-purple-100 to-purple-50',
    },
  ]

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.label}
            variants={item}
            className={`bg-gradient-to-br ${stat.color} rounded-lg p-4 border border-gray-200 hover:border-[#2563EB] transition-all`}
          >
            <div className="flex items-center justify-between mb-2">
              <Icon size={18} className="text-[#2563EB]" />
            </div>
            <p className="text-xs text-gray-600 font-medium mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-[#0F172A]">{stat.value}</p>
            {stat.change && <p className="text-xs text-green-600 mt-1">{stat.change}</p>}
          </motion.div>
        )
      })}
    </div>
  )
}
