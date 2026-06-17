'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to admin dashboard immediately
    router.replace('/admin')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1e293b]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#2563EB] border-t-white rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white">Loading admin dashboard...</p>
      </div>
    </div>
  )
}
