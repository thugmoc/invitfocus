'use client'

import { motion } from 'framer-motion'
import { AlertCircle, FileText, Users } from 'lucide-react'

export default function Problem() {
  const problems = [
    {
      icon: FileText,
      title: 'Spreadsheet Chaos',
      desc: 'Scattered data across Excel, Google Sheets, and emails with no single source of truth.',
    },
    {
      icon: Users,
      title: 'Multiple Advisors',
      desc: 'Talking to accountants, lawyers, and business advisors independently—no alignment.',
    },
    {
      icon: AlertCircle,
      title: 'Uncertainty',
      desc: 'No way to model decisions or understand the financial impact of growth plans.',
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
        <span className="text-[#2563EB] font-semibold text-sm">THE CHALLENGE</span>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mt-2 mb-4">
          Entrepreneurs juggle three impossible things
        </h2>
        <p className="text-xl text-[#64748B] max-w-2xl">
          Growing a business shouldn't mean managing chaos. Yet most founders are stuck with scattered processes, misaligned advice, and no visibility into what drives growth.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="grid md:grid-cols-3 gap-8"
      >
        {problems.map((problem) => {
          const Icon = problem.icon
          return (
            <motion.div key={problem.title} variants={item} className="bg-white rounded-xl p-8 border border-gray-200 hover:border-[#2563EB] transition-colors duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Icon size={24} className="text-[#2563EB]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-3">{problem.title}</h3>
              <p className="text-[#64748B] leading-relaxed">{problem.desc}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
