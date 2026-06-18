'use client'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'

export default function AdminEventsSection() {
  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Events Manager</h1>
        <p className="text-gray-600">Schedule and manage team and client events</p>
      </motion.div>
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A]">Upcoming Events</h3>
            <Calendar className="text-blue-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">0</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0F172A]">Attendees This Month</h3>
            <Calendar className="text-green-600" size={24} />
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">0</p>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <p className="text-gray-600">Event scheduling and calendar management coming soon</p>
      </div>
    </>
  )
}
