'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Users, FileText, TrendingUp, Clock } from 'lucide-react'
import AdminStatsGrid from '@/components/admin/AdminStatsGrid'
import AdminPipeline from '@/components/admin/AdminPipeline'
import AdminClientsList from '@/components/admin/AdminClientsList'

export default function AdminDashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.4,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your client portfolio and pipeline</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mb-8"
      >
        <AdminStatsGrid />
      </motion.div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Pipeline (Left - 2 cols) */}
        <div className="lg:col-span-2">
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
          >
            <AdminPipeline />
          </motion.div>
        </div>

        {/* Recent Clients (Right - 1 col) */}
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4 }}
        >
          <AdminClientsList />
        </motion.div>
      </div>
    </div>
  )
}
