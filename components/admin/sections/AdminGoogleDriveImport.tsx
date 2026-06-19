'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'
import { useGoogleDriveImport } from '@/hooks/useGoogleDriveImport'

// Mock clients for demo
const MOCK_CLIENTS = [
  { id: 'adaa-uuid', name: 'ADAA' },
  { id: 'galerie-dakar', name: 'Galerie Dakar Modern' },
  { id: 'senegal-arts', name: 'Sénégal Arts & Culture' },
]

// Mock Google Drive folders for ADAA
const MOCK_GDRIVE_FOLDERS = [
  {
    id: '1pZ-rmVLK5b8EjHqLn69nvkheQj2WTItJ',
    name: 'Financial Documents',
    category: 'financial',
    fileCount: 3,
  },
  {
    id: '1nzEetJteNS7ckYU3tc4yTpTjCZcKOekT',
    name: 'Legal Documents',
    category: 'legal',
    fileCount: 2,
  },
  {
    id: '1vfisG4LzB6s174CwfcZmlAZNmUj7YF-l',
    name: 'Contracts',
    category: 'legal',
    fileCount: 2,
  },
  {
    id: '1RyNzPyTzoEAqMHklF_nPGjXsuHMxsh_A',
    name: 'Compliance Documents',
    category: 'compliance',
    fileCount: 2,
  },
  {
    id: '151yKmuLnEwAz2Is3tx63imd0MVzUg0mQ',
    name: 'Reports',
    category: 'compliance',
    fileCount: 1,
  },
]

export default function AdminGoogleDriveImport() {
  const { language } = useLanguage()
  const { importFromGoogleDrive, loading, progress, error } = useGoogleDriveImport()

  const [selectedClient, setSelectedClient] = useState('')
  const [selectedFolders, setSelectedFolders] = useState<string[]>([])
  const [importResults, setImportResults] = useState<any>(null)
  const [showResults, setShowResults] = useState(false)

  const labels = {
    en: {
      title: '📥 Import Documents from Google Drive',
      subtitle: 'Bulk import client documents from Google Drive folders',
      selectClient: 'Select Client',
      selectFolders: 'Select Google Drive Folders',
      noFolders: 'No folders available for this client',
      import: 'Import Selected',
      importing: 'Importing...',
      results: 'Import Results',
      success: 'Success',
      failed: 'Failed',
      imported: 'Imported',
      errors: 'Errors',
      close: 'Close',
      selectAtLeastOne: 'Please select at least one folder',
      importedSuccessfully: 'files imported successfully',
      noErrors: 'No errors',
    },
    fr: {
      title: '📥 Importer les Documents depuis Google Drive',
      subtitle: 'Importer en masse les documents des clients depuis les dossiers Google Drive',
      selectClient: 'Sélectionner le Client',
      selectFolders: 'Sélectionner les Dossiers Google Drive',
      noFolders: 'Aucun dossier disponible pour ce client',
      import: 'Importer la Sélection',
      importing: 'Importation en cours...',
      results: 'Résultats d\'Importation',
      success: 'Succès',
      failed: 'Échecs',
      imported: 'Importés',
      errors: 'Erreurs',
      close: 'Fermer',
      selectAtLeastOne: 'Veuillez sélectionner au moins un dossier',
      importedSuccessfully: 'fichiers importés avec succès',
      noErrors: 'Aucune erreur',
    },
  }

  const t = labels[language as keyof typeof labels] || labels.en

  const handleImport = async () => {
    if (selectedFolders.length === 0) {
      alert(t.selectAtLeastOne)
      return
    }

    // Import all selected folders
    const results = {
      totalImported: 0,
      totalFailed: 0,
      folderResults: [] as any[],
    }

    for (const folderId of selectedFolders) {
      const folder = MOCK_GDRIVE_FOLDERS.find(f => f.id === folderId)
      const result = await importFromGoogleDrive(folderId, selectedClient, folder?.category as any)

      results.folderResults.push({
        folderName: folder?.name,
        ...result,
      })

      results.totalImported += result.imported
      results.totalFailed += result.failed
    }

    setImportResults(results)
    setShowResults(true)
  }

  const toggleFolder = (folderId: string) => {
    setSelectedFolders(prev =>
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
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

      {!showResults ? (
        <div className="space-y-6">
          {/* Client Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <label className="block text-lg font-semibold text-[#0F172A] mb-4">{t.selectClient}</label>
            <div className="grid lg:grid-cols-2 gap-3">
              {MOCK_CLIENTS.map(client => (
                <button
                  key={client.id}
                  onClick={() => {
                    setSelectedClient(client.id)
                    setSelectedFolders([])
                  }}
                  className={`p-4 rounded-lg border-2 transition-all text-left font-medium ${
                    selectedClient === client.id
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-400'
                  }`}
                >
                  👤 {client.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Folders Selection */}
          {selectedClient && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <label className="block text-lg font-semibold text-[#0F172A] mb-4">{t.selectFolders}</label>

              {MOCK_GDRIVE_FOLDERS.length === 0 ? (
                <p className="text-gray-600">{t.noFolders}</p>
              ) : (
                <div className="space-y-3">
                  {MOCK_GDRIVE_FOLDERS.map(folder => (
                    <motion.label
                      key={folder.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFolders.includes(folder.id)}
                        onChange={() => toggleFolder(folder.id)}
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#0F172A]">📁 {folder.name}</span>
                          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                            {folder.fileCount} {language === 'en' ? 'files' : 'fichiers'}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded font-medium ${
                            folder.category === 'financial'
                              ? 'bg-blue-100 text-blue-800'
                              : folder.category === 'legal'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {folder.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{language === 'en' ? 'Folder ID:' : 'ID du Dossier:'} {folder.id.substring(0, 20)}...</p>
                      </div>
                    </motion.label>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Import Button & Progress */}
          {selectedClient && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <button
                onClick={handleImport}
                disabled={loading || selectedFolders.length === 0}
                className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition text-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    {t.importing}
                  </span>
                ) : (
                  `📥 ${t.import} (${selectedFolders.length} ${language === 'en' ? 'folders' : 'dossiers'})`
                )}
              </button>

              {loading && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="bg-blue-600 h-2 rounded-full"
                    />
                  </div>
                  <p className="text-sm text-blue-700 mt-2">{progress}% {language === 'en' ? 'completed' : 'complété'}</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <p className="font-medium">⚠️ {language === 'en' ? 'Error' : 'Erreur'}</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
          >
            <p className="text-sm text-blue-800">
              💡 {language === 'en'
                ? 'Select one or more Google Drive folders to import all documents. Documents will be categorized automatically.'
                : 'Sélectionnez un ou plusieurs dossiers Google Drive pour importer tous les documents. Les documents seront catégorisés automatiquement.'}
            </p>
          </motion.div>
        </div>
      ) : (
        /* Results Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Success Summary */}
          <div className="grid lg:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-green-50 border border-green-200 rounded-lg p-6"
            >
              <p className="text-sm text-green-700 font-medium">{t.imported}</p>
              <p className="text-3xl font-bold text-green-900">{importResults.totalImported}</p>
              <p className="text-xs text-green-600 mt-2">{t.importedSuccessfully}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-red-50 border border-red-200 rounded-lg p-6"
            >
              <p className="text-sm text-red-700 font-medium">{t.failed}</p>
              <p className="text-3xl font-bold text-red-900">{importResults.totalFailed}</p>
              <p className="text-xs text-red-600 mt-2">{t.errors}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-purple-50 border border-purple-200 rounded-lg p-6"
            >
              <p className="text-sm text-purple-700 font-medium">Total</p>
              <p className="text-3xl font-bold text-purple-900">
                {importResults.totalImported + importResults.totalFailed}
              </p>
              <p className="text-xs text-purple-600 mt-2">{language === 'en' ? 'files processed' : 'fichiers traités'}</p>
            </motion.div>
          </div>

          {/* Detailed Results */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-4">{t.results}</h3>
            <div className="space-y-4">
              {importResults.folderResults.map((result: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-[#0F172A]">📁 {result.folderName}</h4>
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded ${
                        result.success
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {result.success ? '✓ Success' : '✗ Failed'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{result.message}</p>
                  {result.errors && result.errors.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {result.errors.map((err: string, i: number) => (
                        <p key={i} className="text-xs text-red-600">
                          • {err}
                        </p>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              setShowResults(false)
              setImportResults(null)
              setSelectedClient('')
              setSelectedFolders([])
            }}
            className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold transition"
          >
            {t.close}
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
