'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Circle } from 'lucide-react'

export default function DashboardActionPlan() {
  const phases = [
    {
      title: 'Months 1-2: Legal Formalization',
      service: 'Legal Services',
      status: 'completed',
      tasks: [
        'Finalize company incorporation',
        'Register for tax identification',
        'Establish banking relationships',
      ],
    },
    {
      title: 'Months 3-6: Accounting Structure',
      service: 'Accounting',
      status: 'in-progress',
      tasks: [
        'Set up bookkeeping system',
        'Implement cash flow tracking',
        'Monthly financial reporting',
      ],
    },
    {
      title: 'Months 7-12: Growth Strategy',
      service: 'Strategy & Growth',
      status: 'upcoming',
      tasks: [
        'Create business plan',
        'Identify growth levers',
        'Plan for scaling',
      ],
    },
  ]

  const statusConfig = {
    completed: { bg: 'bg-green-100', text: 'text-green-700', badge: 'Completed' },
    'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700', badge: 'In Progress' },
    upcoming: { bg: 'bg-gray-100', text: 'text-gray-700', badge: 'Upcoming' },
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Your 12-Month Action Plan</h2>
      <p className="text-gray-600 mb-8">Structured roadmap for your business success</p>

      <div className="space-y-6">
        {phases.map((phase, idx) => {
          const config = statusConfig[phase.status as keyof typeof statusConfig]
          return (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className={`rounded-lg border-2 p-6 ${config.bg} border-opacity-30`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-1">{phase.title}</h3>
                  <p className="text-sm text-gray-600">{phase.service}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
                >
                  {config.badge}
                </span>
              </div>

              <ul className="space-y-2">
                {phase.tasks.map((task) => (
                  <li key={task} className="flex items-center gap-3 text-sm text-gray-700">
                    {phase.status === 'completed' ? (
                      <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
                    ) : (
                      <Circle size={18} className="text-gray-400 flex-shrink-0" />
                    )}
                    {task}
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700">
          <span className="font-semibold">💡 Tip:</span> Use the Simulator to model how these phases impact your
          financial projections.
        </p>
      </div>
    </div>
  )
}
