'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

export default function FinalCTA() {
  const features = [
    'Real-time financial clarity',
    'Legal compliance automated',
    'Strategic guidance included',
    'AI scenarios & simulations',
  ]

  return (
    <section className="section bg-white">
      <div className="container-max">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl font-bold text-[#0F172A] mb-6">
            Ready to make better decisions?
          </h2>
          <p className="text-2xl text-[#64748B] mb-12">
            Get clarity on your finances, strategy, and growth in one platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center justify-center gap-2 text-lg"
            >
              Book a demo
              <ArrowRight size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-lg"
            >
              See pricing
            </motion.button>
          </div>

          {/* Features list */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            {features.map((feature, idx) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-center gap-3 justify-center sm:justify-start bg-blue-50 rounded-lg px-4 py-3 border border-blue-200"
              >
                <Check size={20} className="text-[#16A34A] flex-shrink-0" />
                <span className="text-[#0F172A] font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social proof footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-gray-200 pt-12 text-center"
        >
          <p className="text-[#64748B] mb-4">Trusted by 500+ founders across Africa</p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#2563EB]">500+</div>
              <div className="text-sm text-[#64748B]">Active users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#2563EB]">$50M+</div>
              <div className="text-sm text-[#64748B]">Revenue modeled</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#2563EB]">98%</div>
              <div className="text-sm text-[#64748B]">Satisfaction rate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
