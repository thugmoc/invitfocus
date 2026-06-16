'use client'

import { motion } from 'framer-motion'
import { Zap, BarChart3, TrendingUp, Sparkles } from 'lucide-react'

export default function AISimulationSuite() {
  const modules = [
    {
      icon: BarChart3,
      title: 'Scenario Builder',
      desc: 'Drag-and-drop interface to build growth scenarios with AI-powered suggestions',
      features: ['Drag & drop blocks', 'Pre-built templates', 'AI suggestions'],
    },
    {
      icon: Zap,
      title: 'Financial Simulator',
      desc: 'Model the impact of every decision on revenue, costs, and cash flow in real-time',
      features: ['Real-time calculations', 'Multi-scenario comparison', 'Sensitivity analysis'],
    },
    {
      icon: TrendingUp,
      title: 'Leverage Analysis',
      desc: 'Identify the highest-impact levers for growth and see before/after outcomes',
      features: ['Lever identification', 'Impact visualization', 'What-if analysis'],
    },
    {
      icon: Sparkles,
      title: 'Conversational AI',
      desc: 'Chat naturally about your business. The AI refines assumptions and suggests strategies.',
      features: ['Natural language', 'Context awareness', 'Smart recommendations'],
    },
  ]

  return (
    <section id="features" className="section bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-[#2563EB] font-semibold text-sm">AI INTELLIGENCE</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mt-2 mb-4">
            Simulation suite powered by intelligence
          </h2>
          <p className="text-xl text-[#64748B] max-w-2xl">
            Model scenarios, test assumptions, and make confident decisions. All in real time.
          </p>
        </motion.div>

        {/* 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {modules.map((module, idx) => {
            const Icon = module.icon
            return (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-[#2563EB] hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Background glow */}
                <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={28} className="text-[#2563EB]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2">{module.title}</h3>
                  <p className="text-[#64748B] leading-relaxed mb-6">{module.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {module.features.map((feature) => (
                      <span key={feature} className="px-3 py-1 bg-blue-50 text-[#2563EB] rounded-full text-sm font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Large CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#0F172A] via-[#2563EB] to-[#0F172A] rounded-2xl p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">See the difference AI makes</h3>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Run your first scenario free. See real-time P&L, cash flow, and growth projections in seconds.
          </p>
          <button className="px-8 py-3 bg-white text-[#2563EB] font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Run a free simulation
          </button>
        </motion.div>
      </div>
    </section>
  )
}
