'use client'

import { useState } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminDashboardSection from '@/components/admin/sections/AdminDashboardSection'
import AdminClientsSection from '@/components/admin/sections/AdminClientsSection'
import AdminPipelineSection from '@/components/admin/sections/AdminPipelineSection'
import AdminReportsSection from '@/components/admin/sections/AdminReportsSection'
import AdminMessagesSection from '@/components/admin/sections/AdminMessagesSection'
import AdminComptabiliteSection from '@/components/admin/sections/AdminComptabiliteSection'
import AdminConformiteSection from '@/components/admin/sections/AdminConformiteSection'
import AdminBusinessPlansSection from '@/components/admin/sections/AdminBusinessPlansSection'
import AdminContractsSection from '@/components/admin/sections/AdminContractsSection'
import AdminEventsSection from '@/components/admin/sections/AdminEventsSection'

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard')

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboardSection />
      case 'clients':
        return <AdminClientsSection />
      case 'pipeline':
        return <AdminPipelineSection />
      case 'reports':
        return <AdminReportsSection />
      case 'messages':
        return <AdminMessagesSection />
      case 'comptabilite':
        return <AdminComptabiliteSection />
      case 'conformite':
        return <AdminConformiteSection />
      case 'business-plans':
        return <AdminBusinessPlansSection />
      case 'contracts':
        return <AdminContractsSection />
      case 'events':
        return <AdminEventsSection />
      default:
        return <AdminDashboardSection />
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
