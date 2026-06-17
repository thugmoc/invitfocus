'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Camera, FileText, TrendingUp, Calendar } from 'lucide-react'

export default function ComptabiliteDebPage() {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [showUpload, setShowUpload] = useState(false)

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      Array.from(files).forEach(file => {
        setUploadedFiles(prev => [...prev, {
          id: Date.now(),
          name: file.name,
          date: new Date().toLocaleDateString('fr-FR'),
          type: file.type,
          size: (file.size / 1024).toFixed(2) + ' KB'
        }])
      })
      setShowUpload(false)
    }
  }

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Comptabilité Day-to-Day</h1>
      <p className="text-gray-600 mb-8">Téléchargez et gérez vos factures quotidiennes</p>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border-2 border-dashed border-[#2563EB] p-8 mb-8 text-center cursor-pointer hover:border-[#1D4ED8] transition-colors"
      >
        <input
          type="file"
          multiple
          accept="image/*,application/pdf"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer block">
          <Upload size={48} className="mx-auto mb-4 text-[#2563EB]" />
          <h3 className="text-xl font-bold text-[#0F172A] mb-2">Déposer vos factures</h3>
          <p className="text-gray-600">Glissez-déposez ou cliquez pour sélectionner</p>
          <p className="text-sm text-gray-400 mt-2">PDF, JPG, PNG jusqu'à 10MB</p>
        </label>
      </motion.div>

      {/* Camera Upload */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-2 gap-6 mb-8"
      >
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-6 border border-blue-200 cursor-pointer hover:border-[#2563EB] transition-colors">
          <Camera size={32} className="text-[#2563EB] mb-3" />
          <h3 className="font-bold text-[#0F172A] mb-1">Photographier une facture</h3>
          <p className="text-sm text-gray-600">Utilisez votre caméra directement</p>
        </div>

        <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl p-6 border border-green-200">
          <FileText size={32} className="text-green-600 mb-3" />
          <h3 className="font-bold text-[#0F172A] mb-1">Modèles rapides</h3>
          <p className="text-sm text-gray-600">Créer une facture directement</p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-3 gap-4 mb-8"
      >
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Factures ce mois</p>
          <p className="text-2xl font-bold text-[#0F172A]">{uploadedFiles.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total saisi</p>
          <p className="text-2xl font-bold text-[#0F172A]">0 CFA</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Dernière mise à jour</p>
          <p className="text-sm font-bold text-[#0F172A]">Aujourd'hui</p>
        </div>
      </motion.div>

      {/* Files List */}
      {uploadedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-bold text-[#0F172A]">Factures téléchargées</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {uploadedFiles.map(file => (
              <div key={file.id} className="p-4 flex items-center justify-between hover:bg-[#FAFAFA]">
                <div className="flex items-center gap-3">
                  <FileText size={24} className="text-[#2563EB]" />
                  <div>
                    <p className="font-medium text-[#0F172A]">{file.name}</p>
                    <p className="text-sm text-gray-500">{file.date} • {file.size}</p>
                  </div>
                </div>
                <button className="px-3 py-1 text-sm text-[#2563EB] hover:bg-blue-50 rounded">
                  Voir
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
