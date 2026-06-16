'use client'

import { motion } from 'framer-motion'

export default function DashboardOverview() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-[#0F172A] mb-6">Your Account Overview</h2>

      <div className="space-y-6">
        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-[#FAFAFA] rounded-lg border border-gray-200"
        >
          <h3 className="font-semibold text-[#0F172A] mb-3">Company Information</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 mb-1">Legal Name</p>
              <p className="font-medium text-[#0F172A]">TechStart Africa Ltd</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Sector</p>
              <p className="font-medium text-[#0F172A]">Software & Technology</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Founded</p>
              <p className="font-medium text-[#0F172A]">January 2022</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Employees</p>
              <p className="font-medium text-[#0F172A]">12</p>
            </div>
          </div>
        </motion.div>

        {/* Service Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-[#FAFAFA] rounded-lg border border-gray-200"
        >
          <h3 className="font-semibold text-[#0F172A] mb-4">Active Services</h3>
          <div className="space-y-3">
            {[
              { name: 'Accounting', status: 'active', progress: 75 },
              { name: 'Legal Services', status: 'completed', progress: 100 },
              { name: 'Strategy & Growth', status: 'in-progress', progress: 40 },
            ].map((service) => (
              <div key={service.name}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-[#0F172A]">{service.name}</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    service.status === 'active' ? 'bg-blue-100 text-blue-700' :
                    service.status === 'completed' ? 'bg-green-100 text-green-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {service.status}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] transition-all"
                    style={{ width: `${service.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-[#FAFAFA] rounded-lg border border-gray-200"
        >
          <h3 className="font-semibold text-[#0F172A] mb-4">Key Metrics</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600 mb-2">Annual Revenue</p>
              <p className="text-2xl font-bold text-[#0F172A]">$294K</p>
              <p className="text-xs text-green-600 mt-1">+23% YoY</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Cash Balance</p>
              <p className="text-2xl font-bold text-[#0F172A]">$45K</p>
              <p className="text-xs text-gray-500 mt-1">As of today</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Burn Rate</p>
              <p className="text-2xl font-bold text-[#0F172A]">$8.5K</p>
              <p className="text-xs text-gray-500 mt-1">Monthly</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
