'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Eye } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import DocumentPreview from './DocumentPreview'

interface Document {
  id: string
  filename: string
  category: string
  file_size: number
  file_type: string
  url: string
  created_at: string
}

interface ClientDocumentsModalProps {
  isOpen: boolean
  onClose: () => void
  clientId: string
  clientName: string
}

export default function ClientDocumentsModal({
  isOpen,
  onClose,
  clientId,
  clientName,
}: ClientDocumentsModalProps) {
  const { language } = useLanguage()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(false)
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null)

  const labels = {
    en: {
      clientDocuments: 'Client Documents',
      noDocuments: 'No documents',
      preview: 'Preview',
      download: 'Download',
      delete: 'Delete',
      category: 'Category',
      filename: 'File Name',
      size: 'Size',
      uploaded: 'Uploaded',
    },
    fr: {
      clientDocuments: 'Documents du Client',
      noDocuments: 'Pas de documents',
      preview: 'Aperçu',
      download: 'Télécharger',
      delete: 'Supprimer',
      category: 'Catégorie',
      filename: 'Nom du Fichier',
      size: 'Taille',
      uploaded: 'Téléchargé',
    },
  }

  const t = labels[language as keyof typeof labels] || labels.en

  useEffect(() => {
    if (isOpen) {
      fetchDocuments()
    }
  }, [isOpen, clientId])

  const fetchDocuments = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/documents?client_id=${clientId}`)
      if (response.ok) {
        const data = await response.json()
        setDocuments(data)
      }
    } catch (err) {
      console.error('Error fetching documents:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
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

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-semibold text-[#0F172A]">{t.clientDocuments}</h3>
                  <p className="text-sm text-gray-600 mt-1">{clientName}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-6">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full" />
                  </div>
                ) : documents.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">📭 {t.noDocuments}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {documents.map((doc, idx) => (
                      <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#0F172A] truncate">{doc.filename}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-1 rounded font-medium ${getCategoryColor(doc.category)}`}>
                              {doc.category}
                            </span>
                            <span className="text-xs text-gray-600">
                              {formatFileSize(doc.file_size)} • {formatDate(doc.created_at)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => setPreviewDoc(doc)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                            title={t.preview}
                          >
                            <Eye size={18} />
                          </button>
                          <a
                            href={doc.url}
                            download
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                            title={t.download}
                          >
                            <Download size={18} />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Document Preview */}
      {previewDoc && (
        <DocumentPreview
          isOpen={!!previewDoc}
          onClose={() => setPreviewDoc(null)}
          document={previewDoc}
        />
      )}
    </>
  )
}
