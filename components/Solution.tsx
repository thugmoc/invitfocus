'use client'

import { motion } from 'framer-motion'
import { BarChart3, Shield, TrendingUp, Sparkles } from 'lucide-react'

export default function Solution() {
  const pillars = [
    {
      icon: BarChart3,
      title: 'Accounting',
      description: 'Real-time financial clarity',
      features: ['Automated bookkeeping', 'Live cash flow tracking', 'Tax compliance'],
      color: 'from-blue-100 to-blue-50',
    },
    {
      icon: Shield,
      title: 'Legal',
      description: 'Compliance without friction',
      features: ['Contract templates', 'Regulatory updates', 'Legal documentation'],
      color: 'from-purple-100 to-purple-50',
    },
    {
      icon: TrendingUp,
      title: 'Strategy',
      description: 'Growth that scales',
      features: ['Business planning', 'Market analysis', 'Growth roadmaps'],
      color: 'from-green-100 to-green-50',
    },
    {
      icon: Sparkles,
      title: 'AI Intelligence',
      description: 'Decisions made smarter',
      features: ['Scenario modeling', 'Smart recommendations', 'Conversational interface'],
      color: 'from-orange-100 to-orange-50',
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.6,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="solutions" className="section bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-[#2563EB] font-semibold text-sm">THE PLATFORM</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mt-2 mb-4">
            One platform. Four integrated solutions.
          </h2>
          <p className="text-xl text-[#64748B] max-w-2xl">
            INVITEFOCUS unifies everything your business needs to scale—from daily accounting to strategic planning, powered by AI.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 gap-8"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                variants={item}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-[#2563EB] hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${pillar.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={32} className="text-[#2563EB]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-2">{pillar.title}</h3>
                <p className="text-lg text-[#2563EB] font-semibold mb-4">{pillar.description}</p>
                <ul className="space-y-3">
                  {pillar.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-[#64748B]">
                      <div className="w-2 h-2 bg-[#2563EB] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
