'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, AlertCircle } from 'lucide-react'

export default function AdminAuthPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Authentication failed')
        return
      }

      localStorage.setItem('admin_token', data.token)
      router.push('/admin')
    } catch (err) {
      setError('Connection error. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F172A] to-[#1e293b] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
      >
        {/* Icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#0F172A] rounded-lg flex items-center justify-center text-white font-bold text-lg mx-auto mb-6">
          IF
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2 text-center">Admin Access</h1>
        <p className="text-gray-600 text-center mb-8">Enter password to access dashboard</p>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
          >
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Admin Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
              disabled={loading}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full px-6 py-3 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1D4ED8] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Lock size={20} />
            {loading ? 'Authenticating...' : 'Unlock Dashboard'}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Secure access to admin dashboard controls
          </p>
        </div>
      </motion.div>

      {/* Background accent */}
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-10 right-10 w-96 h-96 bg-[#2563EB] rounded-full blur-3xl"
      />
    </div>
  )
}
