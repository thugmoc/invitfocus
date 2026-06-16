'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="pt-32 pb-20 sm:pt-40 sm:pb-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container-max">
        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-3 justify-center mb-8"
        >
          {['Human experts', 'AI-powered', 'Tax compliant', 'Real-time insights'].map((badge) => (
            <div
              key={badge}
              className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-[#64748B] flex items-center gap-2"
            >
              <Zap size={16} className="text-[#2563EB]" />
              {badge}
            </div>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto mb-8"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0F172A] leading-tight mb-6">
            Manage your business with the clarity of a{' '}
            <span className="text-gradient">large enterprise</span>
          </h1>
          <p className="text-xl sm:text-2xl text-[#64748B] leading-relaxed max-w-3xl mx-auto">
            Accounting, legal services, strategic guidance and AI simulations unified in one platform.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <button className="btn-primary flex items-center justify-center gap-2 text-lg">
            Book a demo
            <ArrowRight size={20} />
          </button>
          <button className="btn-secondary text-lg">
            Run a simulation
          </button>
        </motion.div>

        {/* Dashboard preview teaser */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#2563EB] to-[#0F172A] rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500" />
            <div className="relative bg-white rounded-2xl p-1 border border-gray-200">
              <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-[#64748B]">Premium Dashboard Experience Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
