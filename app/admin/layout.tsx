'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if admin token exists in localStorage
    const token = localStorage.getItem('admin_token')
    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
      router.replace('/admin/auth')
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1e293b]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2563EB] border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
