'use client'
import { motion } from 'framer-motion'

export default function ClientEvenementsTab() {
  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Événements</h1>
        <p className="text-gray-600">View scheduled events and team activities</p>
      </motion.div>
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <p className="text-gray-600">Upcoming events will appear here</p>
      </div>
    </>
  )
}
