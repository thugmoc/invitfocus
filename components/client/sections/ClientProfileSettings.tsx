'use client'
import { motion } from 'framer-motion'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { CurrencySwitcher } from '@/components/CurrencySwitcher'
import { useLanguage } from '@/lib/language-context'

export default function ClientProfileSettings() {
  const { t, language } = useLanguage()

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">
          {language === 'en' ? 'Profile & Settings' : 'Profil & Paramètres'}
        </h1>
        <p className="text-gray-600">
          {language === 'en' ? 'Manage your account and preferences' : 'Gérez votre compte et vos préférences'}
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Company Profile */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-[#0F172A] mb-4">
            {language === 'en' ? 'Company Profile' : 'Profil Entreprise'}
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'en' ? 'Business Name' : 'Nom de l\'Entreprise'}
              </label>
              <input type="text" placeholder="Your company name" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NINEA</label>
              <input type="text" placeholder="Your NINEA" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              {language === 'en' ? 'Save Changes' : 'Enregistrer les Modifications'}
            </button>
          </div>
        </motion.div>

        {/* Language & Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-[#0F172A] mb-4">
            {language === 'en' ? 'Language & Settings' : 'Langue & Paramètres'}
          </h3>
          <div className="space-y-4">
            <LanguageSwitcher />

            <div className="border-t border-gray-200 pt-4">
              <CurrencySwitcher />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Notification Preferences' : 'Préférences de Notification'}
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-gray-700">
                    {language === 'en' ? 'Email on invoices' : 'Email sur factures'}
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-gray-700">
                    {language === 'en' ? 'Compliance reminders' : 'Rappels de conformité'}
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-gray-700">
                    {language === 'en' ? 'Monthly summaries' : 'Résumés mensuels'}
                  </span>
                </label>
              </div>
            </div>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium w-full">
              {language === 'en' ? 'Save Preferences' : 'Enregistrer les Préférences'}
            </button>
          </div>
        </motion.div>

        {/* Support */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-[#0F172A] mb-4">
            {language === 'en' ? 'Support' : 'Support'}
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              {language === 'en' ? 'Account Manager:' : 'Gestionnaire de Compte:'}
              <br />
              <span className="font-semibold">Aminata Ndiaye</span>
              <br />
              aminata@invitfocus.com
            </p>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium w-full">
              {language === 'en' ? 'Contact Support' : 'Contacter le Support'}
            </button>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-[#0F172A] mb-4">
            {language === 'en' ? 'Security' : 'Sécurité'}
          </h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
              {language === 'en' ? 'Change Password' : 'Modifier le Mot de Passe'}
            </button>
            <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
              {language === 'en' ? 'Two-Factor Authentication' : 'Authentification à Deux Facteurs'}
            </button>
          </div>
        </motion.div>
      </div>
    </>
  )
}
