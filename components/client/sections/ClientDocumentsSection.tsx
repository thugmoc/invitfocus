'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

interface Document {
  id: string
  filename: string
  category: string
  file_size: number
  url: string
  created_at: string
}

export default function ClientDocumentsSection() {
  const { language } = useLanguage()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  const labels = {
    en: {
      documents: 'My Documents',
      subtitle: 'View and manage your uploaded documents',
      noDocuments: 'No documents uploaded yet',
      allFiles: 'All Files',
      financial: 'Financial',
      legal: 'Legal',
      compliance: 'Compliance',
      general: 'General',
      filename: 'File Name',
      category: 'Category',
      size: 'Size',
      uploadedAt: 'Uploaded',
      download: 'Download',
      uploadNew: 'Upload New Document',
      comingSoon: 'Coming Soon',
    },
    fr: {
      documents: 'Mes Documents',
      subtitle: 'Consultez et gérez vos documents téléchargés',
      noDocuments: 'Aucun document téléchargé',
      allFiles: 'Tous les Fichiers',
      financial: 'Financier',
      legal: 'Juridique',
      compliance: 'Conformité',
      general: 'Général',
      filename: 'Nom du Fichier',
      category: 'Catégorie',
      size: 'Taille',
      uploadedAt: 'Téléchargé le',
      download: 'Télécharger',
      uploadNew: 'Télécharger un Nouveau Document',
      comingSoon: 'Bientôt Disponible',
    },
  }

  const t = labels[language as keyof typeof labels] || labels.en

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    setLoading(true)
    try {
      // TODO: Replace with actual client ID from auth context
      const mockClientId = 'demo-client-id'
      const response = await fetch(`/api/documents?client_id=${mockClientId}`)
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

  const filteredDocuments = documents.filter(doc =>
    filter === 'all' || doc.category === filter
  )

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="bg-gray-50 rounded-lg h-96 animate-pulse" />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">
          📄 {t.documents}
        </h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-blue-300 p-8 text-center"
      >
        <p className="text-lg font-semibold text-blue-900 mb-2">📤 {t.uploadNew}</p>
        <p className="text-sm text-blue-700 mb-4">{t.comingSoon}</p>
        <button
          disabled
          className="px-6 py-2 bg-blue-600 text-white rounded-lg opacity-50 cursor-not-allowed font-medium"
        >
          {t.uploadNew}
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2"
      >
        {[
          { id: 'all', label: t.allFiles },
          { id: 'financial', label: t.financial },
          { id: 'legal', label: t.legal },
          { id: 'compliance', label: t.compliance },
          { id: 'general', label: t.general },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === cat.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Documents List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        {filteredDocuments.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 mb-3">📭</p>
            <p className="text-gray-600">{t.noDocuments}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.filename}</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.category}</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.size}</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.uploadedAt}</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.download}</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc, idx) => (
                  <motion.tr
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
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
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getCategoryColor(doc.category)}`}>
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{formatFileSize(doc.file_size)}</td>
                    <td className="py-3 px-4 text-gray-600">{formatDate(doc.created_at)}</td>
                    <td className="py-3 px-4">
                      <a
                        href={doc.url}
                        download
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        ⬇️
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-4"
      >
        <p className="text-sm text-blue-800">
          💡 {language === 'en'
            ? 'Your documents are securely stored and can be accessed anytime. Contact support if you need to upload additional documents.'
            : 'Vos documents sont stockés en toute sécurité et sont accessibles à tout moment. Contactez le support si vous devez télécharger des documents supplémentaires.'}
        </p>
      </motion.div>
    </motion.div>
  )
}
