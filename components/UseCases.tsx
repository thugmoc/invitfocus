'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function UseCases() {
  const cases = [
    {
      title: 'The Founder',
      subtitle: 'From spreadsheets to scale',
      challenge: 'Building a 10-person team meant no longer understanding the finances',
      solution: 'INVITEFOCUS gave real-time visibility and a clear growth roadmap',
      metrics: ['20% cost reduction', 'Monthly close in 2 hours', '3 scenarios modeled for growth'],
      gradient: 'from-blue-100 to-blue-50',
    },
    {
      title: 'The Growing SME',
      subtitle: 'Planning the next 12 months',
      challenge: 'Deciding where to invest: New team? Equipment? Market expansion?',
      solution: 'Modeled all three scenarios and found the optimal growth path',
      metrics: ['4 scenarios tested', '32% revenue projection', 'Approved for bank credit'],
      gradient: 'from-purple-100 to-purple-50',
    },
    {
      title: 'The Solopreneur',
      subtitle: 'Professional appearance, minimal overhead',
      challenge: 'Needed legal structure and accounting without expensive consultants',
      solution: 'Automated compliance + AI templates reduced advisory costs by 70%',
      metrics: ['Legally compliant', '$5K saved in advisory fees', 'Ready for investment'],
      gradient: 'from-green-100 to-green-50',
    },
  ]

  return (
    <section className="section container-max">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="text-[#2563EB] font-semibold text-sm">REAL JOURNEYS</span>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mt-2 mb-4">
          How entrepreneurs use INVITEFOCUS
        </h2>
        <p className="text-xl text-[#64748B] max-w-2xl">
          From founding to scaling, founders gain clarity at every stage.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {cases.map((useCase, idx) => (
          <motion.div
            key={useCase.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className={`bg-gradient-to-br ${useCase.gradient} rounded-2xl p-8 border border-gray-200 group hover:shadow-xl transition-all duration-300`}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#0F172A]">{useCase.title}</h3>
              <p className="text-[#2563EB] font-semibold mt-1">{useCase.subtitle}</p>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <p className="text-sm text-[#64748B] font-semibold mb-1">Challenge</p>
                <p className="text-[#0F172A]">{useCase.challenge}</p>
              </div>
              <div>
                <p className="text-sm text-[#64748B] font-semibold mb-1">Solution</p>
                <p className="text-[#0F172A]">{useCase.solution}</p>
              </div>
            </div>

            <div className="space-y-2 mb-8 pt-8 border-t border-gray-300/50">
              {useCase.metrics.map((metric) => (
                <div key={metric} className="flex items-center gap-2 text-[#0F172A]">
                  <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full" />
                  {metric}
                </div>
              ))}
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3 bg-white text-[#2563EB] font-semibold rounded-lg hover:bg-gray-100 transition-colors group-hover:translate-x-1 transition-transform">
              View story
              <ArrowRight size={18} />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
