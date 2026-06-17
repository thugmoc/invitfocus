'use client'

export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic'
import DashboardHeader from '@/components/dashboard/DashboardHeader'

const DashboardSidebar = dynamicImport(() => import('@/components/dashboard/DashboardSidebar'), {
  ssr: false,
})

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
