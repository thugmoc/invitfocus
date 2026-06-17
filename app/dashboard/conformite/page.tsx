'use client'

import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Clock, Download } from 'lucide-react'

export default function ConformitePage() {
  const tasks = [
    { id: 1, title: 'Impôts 2026', status: 'completed', date: 'Janvier 2026' },
    { id: 2, title: 'Audits Financiers', status: 'in-progress', date: 'Février 2026' },
    { id: 3, title: 'Certifications', status: 'pending', date: 'Mars 2026' },
  ]

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Conformité & Compliance</h1>
      <p className="text-gray-600 mb-8">Suivi de vos obligations légales et réglementaires</p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 rounded-xl p-6 border border-green-200"
        >
          <CheckCircle size={32} className="text-green-600 mb-3" />
          <p className="text-sm text-gray-600 mb-1">Conformes</p>
          <p className="text-2xl font-bold text-[#0F172A]">2/3</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-orange-100 rounded-xl p-6 border border-orange-200"
        >
          <Clock size={32} className="text-orange-600 mb-3" />
          <p className="text-sm text-gray-600 mb-1">En cours</p>
          <p className="text-2xl font-bold text-[#0F172A]">1/3</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-100 rounded-xl p-6 border border-red-200"
        >
          <AlertCircle size={32} className="text-red-600 mb-3" />
          <p className="text-sm text-gray-600 mb-1">À faire</p>
          <p className="text-2xl font-bold text-[#0F172A]">0/3</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-bold text-[#0F172A]">Checklist de conformité</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {tasks.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="p-4 flex items-center justify-between hover:bg-[#FAFAFA]"
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${task.status === 'completed' ? 'bg-green-500 border-green-500' : task.status === 'in-progress' ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`} />
                <div>
                  <p className="font-medium text-[#0F172A]">{task.title}</p>
                  <p className="text-sm text-gray-500">{task.date}</p>
                </div>
              </div>
              <button className="text-sm text-[#2563EB]">Voir détails</button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
