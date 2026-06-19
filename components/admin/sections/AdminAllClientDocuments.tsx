'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

interface Document {
  id: string
  client_id: string
  client_name?: string
  category: string
  filename: string
  file_size: number
  file_type: string
  url: string
  created_at: string
}

export default function AdminAllClientDocuments() {
  const { language } = useLanguage()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const labels = {
    en: {
      title: '📁 All Client Documents',
      subtitle: 'View and manage documents for all clients',
      noDocuments: 'No documents found',
      filter: 'Filter by Category',
      search: 'Search by filename or client...',
      all: 'All',
      financial: 'Financial',
      legal: 'Legal',
      compliance: 'Compliance',
      general: 'General',
      client: 'Client',
      category: 'Category',
      filename: 'File Name',
      size: 'Size',
      uploadedAt: 'Uploaded',
      actions: 'Actions',
      download: 'Download',
    },
    fr: {
      title: '📁 Tous les Documents des Clients',
      subtitle: 'Consultez et gérez les documents pour tous les clients',
      noDocuments: 'Aucun document trouvé',
      filter: 'Filtrer par Catégorie',
      search: 'Rechercher par nom de fichier ou client...',
      all: 'Tous',
      financial: 'Financier',
      legal: 'Juridique',
      compliance: 'Conformité',
      general: 'Général',
      client: 'Client',
      category: 'Catégorie',
      filename: 'Nom du Fichier',
      size: 'Taille',
      uploadedAt: 'Téléchargé le',
      actions: 'Actions',
      download: 'Télécharger',
    },
  }

  const t = labels[language as keyof typeof labels] || labels.en

  useEffect(() => {
    fetchAllDocuments()
  }, [])

  const fetchAllDocuments = async () => {
    setLoading(true)
    try {
      // Mock: Return all documents
      // In production, you'd fetch from /api/documents/all or similar
      const response = await fetch('/api/documents/all').catch(() => null)
      if (response?.ok) {
        const data = await response.json()
        setDocuments(data)
      } else {
        // For now, show empty state until backend is ready
        setDocuments([])
      }
    } catch (err) {
      console.error('Error fetching documents:', err)
      setDocuments([])
    } finally {
      setLoading(false)
    }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = filter === 'all' || doc.category === filter
    const matchesSearch =
      searchTerm === '' ||
      doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    return matchesCategory && matchesSearch
  })

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

  const getCategoryLabel = (category: string): string => {
    const labels: { [key: string]: string } = {
      financial: t.financial,
      legal: t.legal,
      compliance: t.compliance,
      general: t.general,
    }
    return labels[category] || category
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-50 rounded-lg p-8"
      >
        <div className="flex items-center justify-center gap-3">
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
      className="space-y-6"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-1">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Filters */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.filter}</label>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{t.all}</option>
            <option value="financial">{t.financial}</option>
            <option value="legal">{t.legal}</option>
            <option value="compliance">{t.compliance}</option>
            <option value="general">{t.general}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.search}</label>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={t.search}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filteredDocuments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="mb-2">📭</p>
            <p>{t.noDocuments}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.client}</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.category}</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.filename}</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.size}</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.uploadedAt}</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.actions}</th>
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
                      <p className="font-medium text-[#0F172A]">{doc.client_name || 'Unknown'}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getCategoryColor(doc.category)}`}>
                        {getCategoryLabel(doc.category)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline truncate max-w-xs block"
                        title={doc.filename}
                      >
                        {doc.filename}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{formatFileSize(doc.file_size)}</td>
                    <td className="py-3 px-4 text-gray-600">{formatDate(doc.created_at)}</td>
                    <td className="py-3 px-4">
                      <a
                        href={doc.url}
                        download
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                      >
                        {t.download}
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats */}
      {documents.length > 0 && (
        <div className="grid lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-700 font-medium">{language === 'en' ? 'Total Documents' : 'Documents Totaux'}</p>
            <p className="text-2xl font-bold text-blue-900">{documents.length}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-sm text-green-700 font-medium">{language === 'en' ? 'Total Size' : 'Taille Totale'}</p>
            <p className="text-2xl font-bold text-green-900">
              {formatFileSize(documents.reduce((sum, doc) => sum + doc.file_size, 0))}
            </p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <p className="text-sm text-yellow-700 font-medium">{t.compliance}</p>
            <p className="text-2xl font-bold text-yellow-900">
              {documents.filter(d => d.category === 'compliance').length}
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-purple-700 font-medium">{t.financial}</p>
            <p className="text-2xl font-bold text-purple-900">
              {documents.filter(d => d.category === 'financial').length}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  )
}
