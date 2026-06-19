'use client'

import { useState, useEffect } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminDashboardSection from '@/components/admin/sections/AdminDashboardSection'
import AdminClientsSection from '@/components/admin/sections/AdminClientsSection'
import AdminPipelineSection from '@/components/admin/sections/AdminPipelineSection'
import AdminReportsAdvancedFull from '@/components/admin/sections/AdminReportsAdvancedFull'
import AdminMessagesAdvanced from '@/components/admin/sections/AdminMessagesAdvanced'
import AdminComptabiliteAdvanced from '@/components/admin/sections/AdminComptabiliteAdvanced'
import AdminConformiteAdvanced from '@/components/admin/sections/AdminConformiteAdvanced'
import AdminBusinessPlanAdvanced from '@/components/admin/sections/AdminBusinessPlanAdvanced'
import AdminContractsAdvanced from '@/components/admin/sections/AdminContractsAdvanced'
import AdminEventsAdvanced from '@/components/admin/sections/AdminEventsAdvanced'
import dynamic from 'next/dynamic'

const AdminAllClientDocuments = dynamic(
  () => import('@/components/admin/sections/AdminAllClientDocuments'),
  { ssr: false }
)

const AdminGoogleDriveImport = dynamic(
  () => import('@/components/admin/sections/AdminGoogleDriveImport'),
  { ssr: false }
)

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard')

  useEffect(() => {
    // Enable demo mode automatically
    if (!localStorage.getItem('demo_mode')) {
      localStorage.setItem('demo_mode', 'true')
    }
  }, [])

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboardSection />
      case 'clients':
        return <AdminClientsSection />
      case 'pipeline':
        return <AdminPipelineSection />
      case 'reports':
        return <AdminReportsAdvancedFull />
      case 'messages':
        return <AdminMessagesAdvanced />
      case 'comptabilite':
        return <AdminComptabiliteAdvanced />
      case 'conformite':
        return <AdminConformiteAdvanced />
      case 'business-plans':
        return <AdminBusinessPlanAdvanced />
      case 'contracts':
        return <AdminContractsAdvanced />
      case 'events':
        return <AdminEventsAdvanced />
      case 'documents':
        return <AdminAllClientDocuments />
      case 'gdrive-import':
        return <AdminGoogleDriveImport />
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
