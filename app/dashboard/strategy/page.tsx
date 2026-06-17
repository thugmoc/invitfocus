'use client'

import { motion } from 'framer-motion'
import { Target, TrendingUp, Users, Zap } from 'lucide-react'

export default function StrategyPage() {
  const strategies = [
    {
      icon: Target,
      title: 'Market Expansion',
      description: 'Enter 2 new market segments',
      timeline: 'Q3-Q4 2024',
      impact: '+35% Revenue',
      color: 'from-blue-100 to-blue-50',
    },
    {
      icon: Users,
      title: 'Team Growth',
      description: 'Hire 3 new team members',
      timeline: 'Q3 2024',
      impact: '+20% Capacity',
      color: 'from-green-100 to-green-50',
    },
    {
      icon: Zap,
      title: 'Product Development',
      description: 'Launch premium tier features',
      timeline: 'Q2 2024',
      impact: '+25% ARPU',
      color: 'from-orange-100 to-orange-50',
    },
    {
      icon: TrendingUp,
      title: 'Customer Retention',
      description: 'Reduce churn by 15%',
      timeline: 'Q2-Q3 2024',
      impact: '+$5K MRR',
      color: 'from-purple-100 to-purple-50',
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Strategy & Growth</h1>
        <p className="text-gray-600">Your strategic initiatives and growth roadmap</p>
      </motion.div>

      {/* Strategic Initiatives */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold text-[#0F172A] mb-6">Strategic Initiatives</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {strategies.map((strategy, idx) => {
            const Icon = strategy.icon
            return (
              <motion.div
                key={strategy.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.1 }}
                className={`bg-gradient-to-br ${strategy.color} rounded-lg border border-gray-300 p-6 hover:shadow-lg transition-all`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-[#2563EB]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg">{strategy.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{strategy.description}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-gray-300/50">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-600">Timeline</p>
                    <p className="text-sm font-semibold text-[#0F172A]">{strategy.timeline}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-600">Projected Impact</p>
                    <p className="text-sm font-semibold text-green-600">{strategy.impact}</p>
                  </div>
                </div>

                <button className="w-full mt-4 px-3 py-2 bg-white text-[#2563EB] rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
                  View Details
                </button>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* OKRs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h2 className="text-xl font-bold text-[#0F172A] mb-6">Objectives & Key Results (OKRs)</h2>
        <div className="space-y-4">
          {[
            {
              objective: 'Achieve sustainable growth',
              keyResults: [
                '50% revenue increase YoY',
                '3 new product features launched',
                '90% customer satisfaction score',
              ],
            },
            {
              objective: 'Build strong team',
              keyResults: [
                'Hire 5 new team members',
                'Zero critical skill gaps',
                '95% employee satisfaction',
              ],
            },
          ].map((okr, idx) => (
            <motion.div
              key={okr.objective}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className="p-4 bg-[#FAFAFA] rounded-lg border border-gray-200"
            >
              <p className="font-semibold text-[#0F172A] mb-3">{okr.objective}</p>
              <ul className="space-y-2">
                {okr.keyResults.map((kr) => (
                  <li key={kr} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#2563EB] font-bold mt-1">•</span>
                    {kr}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
