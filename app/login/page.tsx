'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const { signInWithGitHub, user, loading } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F172A] to-[#1e293b]">
        <motion.div
          animate={{ opacity: [0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white text-center"
        >
          <div className="w-12 h-12 border-4 border-[#2563EB] border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </motion.div>
      </div>
    )
  }

  const handleGitHubSignIn = async () => {
    try {
      setError(null)
      await signInWithGitHub()
    } catch (err) {
      setError('Failed to sign in with GitHub. Please try again.')
      console.error(err)
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
        {/* Logo */}
        <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#0F172A] rounded-lg flex items-center justify-center text-white font-bold text-lg mx-auto mb-6">
          IF
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2 text-center">INVITEFOCUS</h1>
        <p className="text-gray-600 text-center mb-8">Financial Diagnostic Platform for African SMEs</p>

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

        {/* Sign In Button */}
        <motion.button
          onClick={handleGitHubSignIn}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-6 py-4 bg-[#0F172A] text-white rounded-lg font-semibold hover:bg-[#1a1f35] transition-colors flex items-center justify-center gap-3 mb-4"
        >
          <Github size={20} />
          Sign in with GitHub
        </motion.button>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue as demo</span>
          </div>
        </div>

        {/* Demo Access */}
        <motion.button
          onClick={() => router.push('/dashboard')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-6 py-3 bg-blue-50 text-[#2563EB] rounded-lg font-semibold hover:bg-blue-100 transition-colors border border-blue-200"
        >
          Enter as Demo User
        </motion.button>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Demo access shows TechStart Africa (Stage 5). Full access requires GitHub authentication.
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
