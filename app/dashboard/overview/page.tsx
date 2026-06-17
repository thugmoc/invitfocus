'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Circle, Lock, Calendar, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function OverviewPage() {
  // Mock client data - will be replaced with real Supabase data
  const clientData = {
    id: 1,
    name: 'TechStart Africa',
    company: 'TechStart Africa Ltd',
    currentStage: 5, // Étape 5 = Livraison
    startDate: '2024-01-15',
    nextAction: 'Accéder aux rapports générés',
  }

  const stages = [
    {
      number: 1,
      name: 'Prise de Contact',
      description: 'Qualification du besoin',
      completed: true,
      current: false,
      modules: [],
    },
    {
      number: 2,
      name: 'Audit/Diagnostic',
      description: 'Analyse de l\'existant',
      completed: true,
      current: false,
      modules: [],
    },
    {
      number: 3,
      name: 'Cadrage',
      description: 'Proposition & validation',
      completed: true,
      current: false,
      modules: [],
    },
    {
      number: 4,
      name: 'Exécution',
      description: 'Production des rapports',
      completed: true,
      current: false,
      modules: [],
    },
    {
      number: 5,
      name: 'Livraison',
      description: 'Rapports & recommandations',
      completed: clientData.currentStage > 5,
      current: clientData.currentStage === 5,
      modules: ['◐ Comptable', '⚖ Juridique', '🚀 Stratégie'],
    },
    {
      number: 6,
      name: 'Suivi',
      description: 'Fidélisation & croissance',
      completed: clientData.currentStage > 6,
      current: clientData.currentStage === 6,
      modules: ['⚡ Simulateur', '🤖 IA', '💬 Messages'],
    },
  ]

  const unlockedModules = stages
    .filter((s) => s.number <= clientData.currentStage)
    .flatMap((s) => s.modules)

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Aperçu de votre dossier</h1>
        <p className="text-gray-600">Suivi du process INVITEFOCUS — de l'audit à la croissance</p>
      </motion.div>

      {/* Current Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg border border-gray-200 p-8 mb-8"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-gray-600 font-semibold mb-2">DOSSIER</p>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-4">{clientData.company}</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 font-semibold">ÉTAPE ACTUELLE</p>
                <p className="text-lg font-bold text-[#2563EB] mt-1">
                  Étape {clientData.currentStage} — {stages[clientData.currentStage - 1].name}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold">PROCHAINE ACTION</p>
                <p className="text-sm text-gray-700 mt-1 flex items-center gap-2">
                  <ArrowRight size={16} className="text-[#2563EB]" />
                  {clientData.nextAction}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-3">
            {[
              { label: 'Étapes complétées', value: `${clientData.currentStage}/6` },
              { label: 'Modules débloqués', value: `${unlockedModules.length}/6` },
              { label: 'Date de démarrage', value: '15 janv 2024' },
              { label: 'Durée estimée complète', value: '6 mois' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className="p-3 bg-[#FAFAFA] rounded-lg border border-gray-200"
              >
                <p className="text-xs text-gray-500 font-semibold mb-1">{stat.label}</p>
                <p className="text-lg font-bold text-[#0F172A]">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h3 className="text-xl font-bold text-[#0F172A] mb-6">Timeline du process</h3>
        <div className="relative">
          {stages.map((stage, idx) => (
            <motion.div
              key={stage.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.08 }}
              className="mb-6 last:mb-0"
            >
              <div className="flex gap-6">
                {/* Timeline dot */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                      stage.completed
                        ? 'bg-[#16A34A]'
                        : stage.current
                          ? 'bg-[#2563EB]'
                          : 'bg-gray-300'
                    }`}
                  >
                    {stage.completed ? '✓' : stage.number}
                  </div>
                  {idx < stages.length - 1 && (
                    <div
                      className={`w-1 h-12 ${stage.completed || stage.current ? 'bg-[#2563EB]' : 'bg-gray-300'}`}
                    />
                  )}
                </div>

                {/* Stage content */}
                <div className="pt-2 pb-6 flex-1">
                  <div
                    className={`p-4 rounded-lg border ${
                      stage.current
                        ? 'bg-blue-50 border-[#2563EB]'
                        : stage.completed
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-[#0F172A] text-lg">{stage.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{stage.description}</p>
                      </div>
                      {stage.completed && <CheckCircle size={24} className="text-[#16A34A]" />}
                      {stage.current && <Circle size={24} className="text-[#2563EB]" />}
                      {!stage.completed && !stage.current && <Lock size={24} className="text-gray-400" />}
                    </div>

                    {/* Modules for this stage */}
                    {stage.modules.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-300/50">
                        <p className="text-xs font-semibold text-gray-600 mb-2">MODULES ACCESSIBLES:</p>
                        <div className="flex flex-wrap gap-2">
                          {stage.modules.map((module) => {
                            const isUnlocked = unlockedModules.includes(module)
                            return (
                              <span
                                key={module}
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  isUnlocked
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-200 text-gray-500'
                                }`}
                              >
                                {isUnlocked ? '✓' : '🔒'} {module}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modules Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h3 className="text-xl font-bold text-[#0F172A] mb-6">Accès aux modules</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: '◐ Comptable', stage: 5, icon: '📊' },
            { name: '⚖ Juridique', stage: 5, icon: '⚖️' },
            { name: '🚀 Stratégie', stage: 5, icon: '🎯' },
            { name: '⚡ Simulateur', stage: 6, icon: '⚡' },
            { name: '🤖 IA Conversationnelle', stage: 6, icon: '🤖' },
            { name: '💬 Messages', stage: 6, icon: '💬' },
          ].map((module) => {
            const isUnlocked = clientData.currentStage >= module.stage
            return (
              <motion.div
                key={module.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`p-4 rounded-lg border ${
                  isUnlocked
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{module.icon}</span>
                    <div>
                      <p className="font-semibold text-[#0F172A] text-sm">{module.name}</p>
                      <p className="text-xs text-gray-500">
                        {isUnlocked ? '✓ Accessible' : `Étape ${module.stage}`}
                      </p>
                    </div>
                  </div>
                  {isUnlocked ? (
                    <CheckCircle size={20} className="text-[#16A34A]" />
                  ) : (
                    <Lock size={20} className="text-gray-400" />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
