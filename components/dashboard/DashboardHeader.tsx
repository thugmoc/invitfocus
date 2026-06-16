'use client'

import { Bell, HelpCircle, Settings } from 'lucide-react'
import { useState } from 'react'

export default function DashboardHeader() {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Dashboard</h1>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Help */}
          <button className="p-2 hover:bg-[#FAFAFA] rounded-lg transition-colors hidden sm:block">
            <HelpCircle size={20} className="text-gray-600" />
          </button>

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
                  <h3 className="font-semibold text-[#0F172A]">Updates</h3>
                </div>
                <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 hover:bg-[#FAFAFA] transition-colors cursor-pointer">
                      <p className="text-sm font-medium text-[#0F172A]">Your report is ready</p>
                      <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-[#0F172A]">John Doe</p>
              <p className="text-xs text-gray-400">TechStart Africa</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#0F172A] rounded-full flex items-center justify-center text-white font-semibold text-sm">
              JD
            </div>
          </div>

          {/* Settings */}
          <button className="p-2 hover:bg-[#FAFAFA] rounded-lg transition-colors hidden sm:block">
            <Settings size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  )
}
