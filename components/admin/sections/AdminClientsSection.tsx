'use client'

import { motion } from 'framer-motion'
import AdminClientsList from '../AdminClientsList'

export default function AdminClientsSection() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Clients Management</h1>
        <p className="text-gray-600">Manage and track all your clients</p>
      </motion.div>

      <AdminClientsList />
    </>
  )
}
