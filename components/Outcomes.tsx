'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export default function Outcomes() {
  const outcomes = [
    {
      title: 'Accounting Outcomes',
      description: 'From chaos to clarity',
      color: 'from-blue-50 to-blue-100',
      benefits: [
        'Know your exact cash position daily',
        'Close your books in minutes, not weeks',
        'Tax compliance that saves thousands',
        'Financial reports that impress investors',
      ],
    },
    {
      title: 'Legal Outcomes',
      description: 'Confidence in compliance',
      color: 'from-purple-50 to-purple-100',
      benefits: [
        'Legally structured from day one',
        'Contracts that protect your business',
        'Regulatory compliance built-in',
        'Risk reduction and peace of mind',
      ],
    },
    {
      title: 'Strategy Outcomes',
      description: 'Growth that scales',
      color: 'from-green-50 to-green-100',
      benefits: [
        'Clear roadmap to scale',
        'Data-driven growth decisions',
        'Ready for investment or exits',
        'Market-competitive positioning',
      ],
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="section container-max">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="text-[#2563EB] font-semibold text-sm">OUTCOMES</span>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mt-2">
          What you gain by using INVITEFOCUS
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="grid md:grid-cols-3 gap-8"
      >
        {outcomes.map((outcome) => (
          <motion.div
            key={outcome.title}
            variants={item}
            className={`bg-gradient-to-br ${outcome.color} rounded-2xl p-8 border border-gray-200`}
          >
            <h3 className="text-2xl font-bold text-[#0F172A] mb-2">{outcome.title}</h3>
            <p className="text-lg text-[#2563EB] font-semibold mb-8">{outcome.description}</p>
            <div className="space-y-4">
              {outcome.benefits.map((benefit) => (
                <div key={benefit} className="flex gap-3">
                  <CheckCircle2 size={24} className="text-[#16A34A] flex-shrink-0 mt-0.5" />
                  <p className="text-[#0F172A] font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
