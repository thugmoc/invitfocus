'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      quote: 'We went from monthly financial confusion to daily clarity. INVITEFOCUS is like having a CFO in your corner.',
      author: 'Sarah Chen',
      role: 'Founder & CEO',
      company: 'TechStart Africa',
      rating: 5,
    },
    {
      quote: 'The AI simulation feature alone has saved us from two bad decisions. It pays for itself immediately.',
      author: 'Kofi Mensah',
      role: 'Growth Director',
      company: 'Retail Plus',
      rating: 5,
    },
    {
      quote: 'Finally, a platform that brings together accounting, legal, and strategy. No more juggling three services.',
      author: 'Amina Diallo',
      role: 'Founder',
      company: 'E-Commerce Solutions',
      rating: 5,
    },
  ]

  const stats = [
    { number: '500+', label: 'Active entrepreneurs' },
    { number: '$50M+', label: 'Modeled growth' },
    { number: '98%', label: 'Customer satisfaction' },
    { number: '24h', label: 'Average implementation' },
  ]

  return (
    <section className="section bg-white">
      <div className="container-max">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-[#2563EB] mb-2">{stat.number}</div>
                <p className="text-[#64748B]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-[#2563EB] font-semibold text-sm">SOCIAL PROOF</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mt-2">
            Trusted by founders everywhere
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:border-[#2563EB] transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-[#2563EB] text-[#2563EB]" />
                ))}
              </div>
              <p className="text-[#0F172A] font-semibold text-lg mb-6 leading-relaxed">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-[#0F172A]">{testimonial.author}</p>
                <p className="text-[#64748B] text-sm">{testimonial.role}</p>
                <p className="text-[#2563EB] font-medium text-sm">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
