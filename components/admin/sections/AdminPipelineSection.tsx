'use client'
import { motion } from 'framer-motion'
import AdminPipeline from '../AdminPipeline'

export default function AdminPipelineSection() {
  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Sales Pipeline</h1>
        <p className="text-gray-600">Track deals and conversion rates</p>
      </motion.div>
      <AdminPipeline />
    </>
  )
}
