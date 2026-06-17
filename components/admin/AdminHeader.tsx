'use client'

import { Bell, Search, Settings, User, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminHeader() {
  const [showNotifications, setShowNotifications] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/auth')
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-[#FAFAFA] rounded-lg px-4 py-2 border border-gray-200 flex-1 max-w-md">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search clients, reports..."
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-[#FAFAFA] rounded-lg transition-colors relative"
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#2563EB] rounded-full" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-[#0F172A]">Notifications</h3>
                </div>
                <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 hover:bg-[#FAFAFA] transition-colors cursor-pointer">
                      <p className="text-sm font-medium text-[#0F172A]">New report submitted</p>
                      <p className="text-xs text-gray-400 mt-1">5 minutes ago</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-[#0F172A]">Admin User</p>
              <p className="text-xs text-gray-400">Authenticated</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#0F172A] rounded-full flex items-center justify-center text-white font-semibold text-sm">
              AU
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut size={20} className="text-red-600" />
          </button>
        </div>
      </div>
    </header>
  )
}
