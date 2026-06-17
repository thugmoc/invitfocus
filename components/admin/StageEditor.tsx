'use client'

import { useState } from 'react'
import { updateClientStage } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle } from 'lucide-react'

interface StageEditorProps {
  clientId: number
  currentStage: number
  onStageChange?: (newStage: number) => void
}

const stageNames: Record<number, string> = {
  1: 'Prise de contact',
  2: 'Audit',
  3: 'Cadrage',
  4: 'Exécution',
  5: 'Livraison',
  6: 'Suivi',
}

const stageDescriptions: Record<number, string> = {
  1: 'Initial contact and qualification',
  2: 'Comprehensive audit of current state',
  3: 'Proposal and scope definition',
  4: 'Report generation and production',
  5: 'Delivery of reports to client',
  6: 'Ongoing support and growth tools',
}

export function StageEditor({ clientId, currentStage, onStageChange }: StageEditorProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleStageChange(newStage: number) {
    if (newStage === currentStage) return

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Verify admin authentication
      const adminToken = localStorage.getItem('admin_token')
      if (!adminToken) {
        setError('Unauthorized: Admin token required')
        return
      }

      // Update stage in database
      await updateClientStage(clientId, newStage)

      // Trigger email notification (Phase 5)
      // Note: This requires the Supabase edge function to be deployed
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
        const response = await fetch(`${supabaseUrl}/functions/v1/notify-stage-change`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}`,
          },
          body: JSON.stringify({
            clientId,
            newStage,
            clientEmail: 'client@example.com', // Will be replaced with real email from context
            clientName: 'Client Name', // Will be replaced with real name
          }),
        })

        if (response.ok) {
          console.log('✅ Notification sent')
        }
      } catch (notificationError) {
        console.warn('Note: Email notification not configured. Configure RESEND_API_KEY to enable.')
      }

      setSuccess(`✅ Stage updated to ${stageNames[newStage]}`)
      onStageChange?.(newStage)

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update stage'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-6"
    >
      <h3 className="text-lg font-bold text-[#0F172A] mb-4">Update Client Stage</h3>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
        >
          <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </motion.div>
      )}

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2"
        >
          <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-700">{success}</p>
        </motion.div>
      )}

      {/* Stage Buttons Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {Object.entries(stageNames).map(([num, name]) => {
          const stage = parseInt(num)
          const isActive = stage === currentStage
          const isCompleted = stage < currentStage

          return (
            <motion.button
              key={stage}
              onClick={() => handleStageChange(stage)}
              disabled={loading || isActive}
              whileHover={{ scale: !loading && !isActive ? 1.05 : 1 }}
              whileTap={{ scale: !loading && !isActive ? 0.95 : 1 }}
              className={`px-4 py-3 rounded-lg font-semibold transition-all text-sm ${
                isActive
                  ? 'bg-[#2563EB] text-white ring-2 ring-[#2563EB] ring-offset-2'
                  : isCompleted
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-center gap-2">
                {isCompleted && <CheckCircle size={16} />}
                <span>
                  {stage}
                  <span className="hidden sm:inline"> — {name}</span>
                </span>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Current Stage Info */}
      <motion.div
        key={currentStage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 bg-blue-50 rounded-lg border border-blue-200"
      >
        <p className="text-xs font-semibold text-blue-600 mb-1">CURRENT STAGE</p>
        <p className="text-lg font-bold text-[#0F172A]">
          Stage {currentStage} — {stageNames[currentStage]}
        </p>
        <p className="text-sm text-gray-600 mt-2">{stageDescriptions[currentStage]}</p>

        {/* Module Unlock Info */}
        <div className="mt-3 pt-3 border-t border-blue-200">
          <p className="text-xs font-semibold text-blue-600 mb-2">UNLOCKED MODULES</p>
          {currentStage >= 5 ? (
            <div className="flex flex-wrap gap-2">
              {['◐ Comptable', '⚖ Juridique', '🚀 Stratégie'].map(module => (
                <span key={module} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                  ✓ {module}
                </span>
              ))}
              {currentStage >= 6 && ['⚡ Simulateur', '🤖 IA', '💬 Messages'].map(module => (
                <span key={module} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                  ✓ {module}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">No modules unlocked yet. Reach stage 5 to unlock reports.</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
