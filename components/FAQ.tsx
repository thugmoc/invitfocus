'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: 'How does INVITEFOCUS work?',
      answer: 'INVITEFOCUS combines three core services—accounting, legal support, and strategic advisory—with AI-powered simulation tools. You connect your financial data, and we provide real-time visibility, automated compliance, and scenario modeling.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes. We use enterprise-grade encryption, comply with GDPR and local regulations, and never share your data with third parties. Your business information stays yours.',
    },
    {
      question: 'How quickly can I see results?',
      answer: 'Most founders see clarity within 48 hours of setup. Financial reports generate automatically, AI scenarios run in seconds, and strategic recommendations appear within the first week.',
    },
    {
      question: 'Do I still need an accountant?',
      answer: 'INVITEFOCUS automates routine accounting and compliance. If you need advanced tax strategy or audits, we integrate with your accountant. We\'re a copilot, not a replacement.',
    },
    {
      question: 'Can I model custom scenarios?',
      answer: 'Absolutely. The Scenario Builder lets you create unlimited what-if models. The AI learns from your inputs and suggests new scenarios based on your business.',
    },
    {
      question: 'What if I change my mind?',
      answer: 'No long-term contracts. You can pause or cancel anytime. Your data remains accessible, and we\'ll help with the transition.',
    },
  ]

  return (
    <section className="section container-max">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="mb-16 max-w-2xl"
      >
        <span className="text-[#2563EB] font-semibold text-sm">COMMON QUESTIONS</span>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mt-2">
          Answers to your questions
        </h2>
      </motion.div>

      <div className="max-w-3xl space-y-4">
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: idx * 0.05 }}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-[#2563EB] transition-colors"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <p className="font-semibold text-[#0F172A] text-lg">{faq.question}</p>
              {openIndex === idx ? (
                <Minus size={24} className="text-[#2563EB] flex-shrink-0" />
              ) : (
                <Plus size={24} className="text-[#64748B] flex-shrink-0" />
              )}
            </button>

            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-gray-200"
                >
                  <p className="px-6 py-4 text-[#64748B] leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
