'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

interface Document {
  id: string
  client_id: string
  category: string
  filename: string
  file_size: number
  file_type: string
  url: string
  created_at: string
}

interface AdminClientDocumentsProps {
  clientId: string
  clientName: string
}

export default function AdminClientDocuments({ clientId, clientName }: AdminClientDocumentsProps) {
  const { language } = useLanguage()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const labels = {
    en: {
      documents: 'Documents',
      noDocuments: 'No documents uploaded yet',
      category: 'Category',
      filename: 'File Name',
      size: 'Size',
      uploadedAt: 'Uploaded',
      actions: 'Actions',
      download: 'Download',
      delete: 'Delete',
      deleteConfirm: 'Are you sure you want to delete this document?',
    },
    fr: {
      documents: 'Documents',
      noDocuments: 'Aucun document téléchargé',
      category: 'Catégorie',
      filename: 'Nom du Fichier',
      size: 'Taille',
      uploadedAt: 'Téléchargé le',
      actions: 'Actions',
      download: 'Télécharger',
      delete: 'Supprimer',
      deleteConfirm: 'Êtes-vous sûr de vouloir supprimer ce document?',
    },
  }

  const t = labels[language as keyof typeof labels] || labels.en

  useEffect(() => {
    fetchDocuments()
  }, [clientId])

  const fetchDocuments = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/documents?client_id=${clientId}`)
      if (!response.ok) throw new Error('Failed to fetch documents')
      const data = await response.json()
      setDocuments(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (documentId: string) => {
    if (!confirm(t.deleteConfirm)) return

    try {
      const response = await fetch(`/api/documents?document_id=${documentId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete document')
      setDocuments(prev => prev.filter(d => d.id !== documentId))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')
  }

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      financial: 'bg-blue-100 text-blue-800',
      legal: 'bg-red-100 text-red-800',
      compliance: 'bg-yellow-100 text-yellow-800',
      general: 'bg-gray-100 text-gray-800',
    }
    return colors[category] || colors.general
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-50 rounded-lg p-6"
      >
        <div className="flex items-center gap-3">
          <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full" />
          <p className="text-gray-600">{language === 'en' ? 'Loading documents...' : 'Chargement des documents...'}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-6"
    >
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#0F172A] mb-1">
          📄 {t.documents} — {clientName}
        </h3>
        <p className="text-sm text-gray-600">{documents.length} {language === 'en' ? 'files' : 'fichiers'}</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {documents.length === 0 ? (
        <p className="text-gray-500 text-center py-8">{t.noDocuments}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.category}</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.filename}</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.size}</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.uploadedAt}</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, idx) => (
                <motion.tr
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getCategoryColor(doc.category)}`}>
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {doc.filename}
                    </a>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{formatFileSize(doc.file_size)}</td>
                  <td className="py-3 px-4 text-gray-600">{formatDate(doc.created_at)}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <a
                        href={doc.url}
                        download
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                      >
                        {t.download}
                      </a>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="text-red-600 hover:text-red-800 text-xs font-medium"
                      >
                        {t.delete}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          💡 {language === 'en' ? 'Tip: Upload documents via the upload API or import from Google Drive' : 'Conseil: Téléchargez les documents via l\'API ou importez depuis Google Drive'}
        </p>
      </div>
    </motion.div>
  )
}
