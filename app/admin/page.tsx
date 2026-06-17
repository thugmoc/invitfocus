'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowUpRight, Users, FileText, TrendingUp, Clock } from 'lucide-react'
import AdminStatsGrid from '@/components/admin/AdminStatsGrid'
import AdminPipeline from '@/components/admin/AdminPipeline'
import AdminClientsList from '@/components/admin/AdminClientsList'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.replace('/admin/auth')
    } else {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [router])

  if (loading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1e293b]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2563EB] border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white">Checking authentication...</p>
        </div>
      </div>
    )
  }

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
