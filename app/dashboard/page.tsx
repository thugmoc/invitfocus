'use client'

import { motion } from 'framer-motion'
import DashboardOverview from '@/components/dashboard/DashboardOverview'
import DashboardModules from '@/components/dashboard/DashboardModules'
import DashboardActionPlan from '@/components/dashboard/DashboardActionPlan'
import DashboardQuickStats from '@/components/dashboard/DashboardQuickStats'

export default function ClientDashboard() {
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

  return (
    <div className="p-6 lg:p-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Welcome back, John</h1>
        <p className="text-gray-600">Here's what's happening with your business today</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mb-8"
      >
        <DashboardQuickStats />
      </motion.div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Overview (Left - 2 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <DashboardOverview />
        </motion.div>

        {/* Modules Sidebar (Right) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <DashboardModules />
        </motion.div>
      </div>

      {/* Action Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <DashboardActionPlan />
      </motion.div>
    </div>
  )
}
