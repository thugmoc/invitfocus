'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import ClientSidebar from '@/components/client/ClientSidebar'

// Enable demo mode automatically
if (typeof window !== 'undefined' && !localStorage.getItem('demo_mode')) {
  localStorage.setItem('demo_mode', 'true')
}
import ClientOverviewTab from '@/components/client/sections/ClientOverviewTab'
import ClientComptabiliteTab from '@/components/client/sections/ClientComptabiliteTab'
import ClientConformiteTab from '@/components/client/sections/ClientConformiteTab'
import ClientContratsTab from '@/components/client/sections/ClientContratsTab'
import ClientEvenementsTab from '@/components/client/sections/ClientEvenementsTab'
import ClientMessagesTab from '@/components/client/sections/ClientMessagesTab'
import ClientSettingsTab from '@/components/client/sections/ClientSettingsTab'

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return <ClientOverviewTab />
      case 'comptabilite':
        return <ClientComptabiliteTab />
      case 'conformite':
        return <ClientConformiteTab />
      case 'contrats':
        return <ClientContratsTab />
      case 'evenements':
        return <ClientEvenementsTab />
      case 'messages':
        return <ClientMessagesTab />
      case 'settings':
        return <ClientSettingsTab />
      default:
        return <ClientOverviewTab />
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
