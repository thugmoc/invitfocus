'use client'

import { Mail, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  const sections = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'Security', 'Roadmap'],
    },
    {
      title: 'Company',
      links: ['About', 'Blog', 'Careers', 'Press'],
    },
    {
      title: 'Legal',
      links: ['Privacy', 'Terms', 'Cookies', 'Compliance'],
    },
  ]

  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="container-max py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-2">INVITEFOCUS</div>
            <p className="text-gray-400 text-sm">Your business copilot for smarter decisions.</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-gray-400 text-sm">
            © {year} INVITEFOCUS. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Designed for African entrepreneurs. Powered by AI.
          </p>
        </div>
      </div>
    </footer>
  )
}
