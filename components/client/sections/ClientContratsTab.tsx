'use client'
import { motion } from 'framer-motion'

export default function ClientContratsTab() {
  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Contrats & Stratégie</h1>
        <p className="text-gray-600">Review your agreements and strategic initiatives</p>
      </motion.div>
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <p className="text-gray-600">Your contracts and strategy documents will appear here</p>
      </div>
    </>
  )
}
