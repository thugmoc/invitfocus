'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ClientSidebar from '@/components/client/ClientSidebar'
import DashboardOverview from '@/components/dashboard/DashboardOverview'
import DashboardActionPlan from '@/components/dashboard/DashboardActionPlan'
import DashboardQuickStats from '@/components/dashboard/DashboardQuickStats'

// Placeholder components for other tabs
const TabPlaceholder = ({ title, id }: { title: string; id: string }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-8">
    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">{title}</h2>
    <p className="text-gray-600">Tab: {id}</p>
  </div>
)

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

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

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Welcome back, John</h1>
              <p className="text-gray-600">Here's what's happening with your business today</p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="mb-8"
            >
              <DashboardQuickStats />
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2"
              >
                <DashboardOverview />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <DashboardActionPlan />
            </motion.div>
          </>
        )
      case 'comptabilite':
        return <TabPlaceholder title="Comptabilité" id="comptabilite" />
      case 'conformite':
        return <TabPlaceholder title="Conformité" id="conformite" />
      case 'contrats':
        return <TabPlaceholder title="Contrats & Stratégie" id="contrats" />
      case 'evenements':
        return <TabPlaceholder title="Événements" id="evenements" />
      case 'messages':
        return <TabPlaceholder title="Messages" id="messages" />
      case 'settings':
        return <TabPlaceholder title="Profile & Settings" id="settings" />
      default:
        return <TabPlaceholder title="Dashboard" id={activeTab} />
    }
  }

  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      <ClientSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {renderTab()}
        </main>
      </div>
    </div>
  )
}
