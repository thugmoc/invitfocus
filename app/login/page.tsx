'use client'

export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import dynamicImport from 'next/dynamic'
import { motion } from 'framer-motion'

const LoginContent = dynamicImport(() => import('./login-content'), {
  loading: () => (
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
  ),
})

export default function LoginPage() {
  return (
    <Suspense
      fallback={
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
      }
    >
      <LoginContent />
    </Suspense>
  )
}
