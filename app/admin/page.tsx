'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminStatsGrid from '@/components/admin/AdminStatsGrid'
import AdminPipeline from '@/components/admin/AdminPipeline'
import AdminClientsList from '@/components/admin/AdminClientsList'

// Placeholder components for other sections
const SectionPlaceholder = ({ title, id }: { title: string; id: string }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-8">
    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">{title}</h2>
    <p className="text-gray-600">Section: {id}</p>
  </div>
)

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard')

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

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Dashboard</h1>
              <p className="text-gray-600">Overview of your client portfolio and pipeline</p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="mb-8"
            >
              <AdminStatsGrid />
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
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

              <motion.div
                variants={item}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.4 }}
              >
                <AdminClientsList />
              </motion.div>
            </div>
          </>
        )
      case 'clients':
        return <SectionPlaceholder title="Clients Management" id="clients" />
      case 'pipeline':
        return <SectionPlaceholder title="Sales Pipeline" id="pipeline" />
      case 'reports':
        return <SectionPlaceholder title="Reports" id="reports" />
      case 'messages':
        return <SectionPlaceholder title="Messages" id="messages" />
      case 'comptabilite':
        return <SectionPlaceholder title="Comptabilité & Audit" id="comptabilite" />
      case 'conformite':
        return <SectionPlaceholder title="Conformité & Compliance" id="conformite" />
      case 'business-plans':
        return <SectionPlaceholder title="Business Plans" id="business-plans" />
      case 'contracts':
        return <SectionPlaceholder title="Contracts Manager" id="contracts" />
      case 'events':
        return <SectionPlaceholder title="Events Manager" id="events" />
      default:
        return <SectionPlaceholder title="Dashboard" id={activeSection} />
    }
  }

  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  )
}
