'use client'

import { motion } from 'framer-motion'
import { Calendar, Plus, Clock, AlertCircle } from 'lucide-react'

export default function EvenementsPage() {
  const events = [
    { id: 1, title: 'Réunion Stratégique', date: '2026-06-20', type: 'meeting' },
    { id: 2, title: 'Audit Trimestriel', date: '2026-06-25', type: 'audit' },
    { id: 3, title: 'Clôture Fiscal', date: '2026-12-31', type: 'deadline' },
  ]

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Événements</h1>
          <p className="text-gray-600">Suivi des événements et jalons importants</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 bg-[#2563EB] text-white rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Ajouter événement
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-bold text-[#0F172A]">Calendrier</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 flex items-center justify-between hover:bg-[#FAFAFA]"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {event.type === 'meeting' && <Calendar size={24} className="text-[#2563EB]" />}
                  {event.type === 'audit' && <AlertCircle size={24} className="text-orange-600" />}
                  {event.type === 'deadline' && <Clock size={24} className="text-red-600" />}
                </div>
                <div>
                  <p className="font-medium text-[#0F172A]">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
              </div>
              <button className="text-sm text-[#2563EB]">Voir</button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
