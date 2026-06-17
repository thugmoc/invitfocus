'use client'

import { motion } from 'framer-motion'
import { Search, Eye, Edit, ArrowRight } from 'lucide-react'
import { useState, useMemo } from 'react'
import mockClientsData from '@/mock_clients.json'

export default function AdminClientsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStage, setFilterStage] = useState('all')

  const stageNames: Record<number, string> = {
    1: 'Prise de contact',
    2: 'Audit',
    3: 'Cadrage',
    4: 'Exécution',
    5: 'Livraison',
    6: 'Suivi',
  }

  const stageColors: Record<number, string> = {
    1: 'bg-gray-100 text-gray-700',
    2: 'bg-blue-100 text-blue-700',
    3: 'bg-purple-100 text-purple-700',
    4: 'bg-orange-100 text-orange-700',
    5: 'bg-green-100 text-green-700',
    6: 'bg-green-100 text-green-700',
  }

  const filteredClients = useMemo(() => {
    return mockClientsData.clients.filter((client) => {
      const matchesSearch =
        client.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.sector.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStage = filterStage === 'all' || client.current_stage.toString() === filterStage

      return matchesSearch && matchesStage
    })
  }, [searchQuery, filterStage])

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Gestion des Clients</h1>
        <p className="text-gray-600">Suivi de tous les dossiers clients et des étapes du process</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid md:grid-cols-4 gap-4 mb-8"
      >
        {[
          {
            label: 'Total Clients',
            value: mockClientsData.clients.length,
            icon: '👥',
            color: 'bg-blue-50 border-blue-200',
          },
          {
            label: 'En Livraison (5)',
            value: mockClientsData.clients.filter((c) => c.current_stage === 5).length,
            icon: '📦',
            color: 'bg-green-50 border-green-200',
          },
          {
            label: 'En Suivi (6)',
            value: mockClientsData.clients.filter((c) => c.current_stage === 6).length,
            icon: '🎯',
            color: 'bg-purple-50 border-purple-200',
          },
          {
            label: 'Revenus Totaux',
            value: `$${(mockClientsData.clients.reduce((acc, c) => acc + c.annual_revenue, 0) / 1000).toFixed(0)}K`,
            icon: '💰',
            color: 'bg-amber-50 border-amber-200',
          },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + idx * 0.05 }}
            className={`${stat.color} rounded-lg border p-4`}
          >
            <p className="text-sm text-gray-600 font-medium mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-[#0F172A]">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg border border-gray-200 p-4 mb-6 flex gap-4"
      >
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou secteur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2563EB]"
          />
        </div>
        <select
          value={filterStage}
          onChange={(e) => setFilterStage(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2563EB]"
        >
          <option value="all">Toutes étapes</option>
          {Object.entries(stageNames).map(([stage, name]) => (
            <option key={stage} value={stage}>
              Étape {stage} — {name}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Clients Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-[#FAFAFA]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">ENTREPRISE</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">SECTEUR</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">ÉTAPE</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">REVENU ANNUEL</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">EMPLOIS</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">DÉMARRAGE</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, idx) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 + idx * 0.03 }}
                  className="border-b border-gray-200 hover:bg-[#FAFAFA] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#0F172A] rounded-lg flex items-center justify-center text-white font-bold text-xs">
                        {client.company_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-[#0F172A] text-sm">{client.company_name}</p>
                        <p className="text-xs text-gray-500">{client.contact_email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{client.sector}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stageColors[client.current_stage]}`}>
                      {client.current_stage} — {stageNames[client.current_stage]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#0F172A] text-sm">
                      ${(client.annual_revenue / 1000).toFixed(0)}K
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{client.employee_count}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{client.started_at}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button title="Voir le dossier" className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <Eye size={16} className="text-gray-600" />
                      </button>
                      <button title="Éditer" className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <Edit size={16} className="text-gray-600" />
                      </button>
                      <button title="Accéder au dashboard" className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                        <ArrowRight size={16} className="text-blue-600" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredClients.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p>Aucun client trouvé avec les critères sélectionnés</p>
          </div>
        )}
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 bg-gray-50 rounded-lg border border-gray-200 p-4"
      >
        <p className="text-sm font-semibold text-gray-600 mb-3">Légende des étapes:</p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { stage: 1, name: 'Prise de contact', desc: 'Première qualification' },
            { stage: 2, name: 'Audit/Diagnostic', desc: 'Analyse de l\'existant' },
            { stage: 3, name: 'Cadrage', desc: 'Devis & approbation' },
            { stage: 4, name: 'Exécution', desc: 'Production des rapports' },
            { stage: 5, name: 'Livraison', desc: 'Rapports disponibles' },
            { stage: 6, name: 'Suivi', desc: 'Support & croissance' },
          ].map((item) => (
            <div key={item.stage} className="flex items-start gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stageColors[item.stage]}`}>
                {item.stage}
              </span>
              <div>
                <p className="font-semibold text-[#0F172A] text-xs">{item.name}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
