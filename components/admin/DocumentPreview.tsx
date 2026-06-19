'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

interface DocumentPreviewProps {
  isOpen: boolean
  onClose: () => void
  document: {
    filename: string
    url: string
    file_type: string
    file_size: number
  }
}

export default function DocumentPreview({ isOpen, onClose, document }: DocumentPreviewProps) {
  const { language } = useLanguage()

  const labels = {
    en: {
      download: 'Download',
      openInNewTab: 'Open in New Tab',
      preview: 'Preview',
      noPreview: 'Preview not available for this file type',
    },
    fr: {
      download: 'Télécharger',
      openInNewTab: 'Ouvrir dans un nouvel onglet',
      preview: 'Aperçu',
      noPreview: 'L\'aperçu n\'est pas disponible pour ce type de fichier',
    },
  }

  const t = labels[language as keyof typeof labels] || labels.en

  const isPDF = document.file_type === 'application/pdf'
  const isImage = document.file_type.startsWith('image/')

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-[#0F172A]">{t.preview}</h3>
                <p className="text-sm text-gray-600 mt-1">{document.filename}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Preview Area */}
            <div className="flex-1 overflow-auto bg-gray-50 flex items-center justify-center">
              {isPDF ? (
                <iframe
                  src={`${document.url}#toolbar=0`}
                  className="w-full h-full"
                  title={document.filename}
                />
              ) : isImage ? (
                <img
                  src={document.url}
                  alt={document.filename}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-center p-8">
                  <p className="text-gray-600 mb-4">📄 {t.noPreview}</p>
                  <a
                    href={document.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
                  >
                    {t.openInNewTab}
                  </a>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-600">
                {document.file_type} • {(document.file_size / 1024 / 1024).toFixed(2)} MB
              </div>
              <div className="flex gap-3">
                <a
                  href={document.url}
                  download
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
                >
                  📥 {t.download}
                </a>
                <a
                  href={document.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-medium transition"
                >
                  🔗 {t.openInNewTab}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
