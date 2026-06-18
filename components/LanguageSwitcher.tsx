'use client'
import { useLanguage } from '@/lib/language-context'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-600">Language:</span>
      <div className="flex gap-2">
        <button
          onClick={() => setLanguage('en')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            language === 'en'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🇬🇧 English
        </button>
        <button
          onClick={() => setLanguage('fr')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            language === 'fr'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🇫🇷 Français
        </button>
      </div>
    </div>
  )
}
