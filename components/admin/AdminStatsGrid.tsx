'use client'

import { motion } from 'framer-motion'
import { Users, TrendingUp, FileText, Clock, ArrowUpRight } from 'lucide-react'

export default function AdminStatsGrid() {
  const stats = [
    {
      label: 'Active Clients',
      value: '24',
      change: '+3 this month',
      icon: Users,
      color: 'from-blue-100 to-blue-50',
    },
    {
      label: 'In Progress',
      value: '8',
      change: '+2 this week',
      icon: Clock,
      color: 'from-orange-100 to-orange-50',
    },
    {
      label: 'Reports Delivered',
      value: '156',
      change: '+12 this month',
      icon: FileText,
      color: 'from-green-100 to-green-50',
    },
    {
      label: 'Revenue (MRR)',
      value: '$18.5K',
      change: '+15% MoM',
      icon: TrendingUp,
      color: 'from-purple-100 to-purple-50',
    },
  ]

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.label}
            variants={item}
            className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 border border-gray-200 hover:border-[#2563EB] transition-all duration-300`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <Icon size={24} className="text-[#2563EB]" />
              </div>
              <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-[#16A34A] flex items-center gap-1">
                <ArrowUpRight size={14} />
                {stat.change}
              </span>
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-[#0F172A]">{stat.value}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
