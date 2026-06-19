'use client'
import { useState } from 'react'

export interface ImportResult {
  success: boolean
  imported: number
  failed: number
  message: string
  errors?: string[]
}

export function useGoogleDriveImport() {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const importFromGoogleDrive = async (
    folderId: string,
    clientId: string,
    category: 'financial' | 'legal' | 'compliance' | 'general' = 'general'
  ): Promise<ImportResult> => {
    setLoading(true)
    setError(null)
    setProgress(0)

    try {
      const response = await fetch('/api/documents/import-gdrive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          folderId,
          clientId,
          category,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to import from Google Drive')
      }

      const result: ImportResult = await response.json()
      setProgress(100)
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(message)
      return {
        success: false,
        imported: 0,
        failed: 0,
        message,
        errors: [message],
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    importFromGoogleDrive,
    loading,
    progress,
    error,
  }
}
