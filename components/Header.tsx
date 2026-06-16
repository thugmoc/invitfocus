'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Why Us', href: '#why' },
  ]

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
      <nav className="container-max flex items-center justify-between py-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#0F172A]">
          INVITEFOCUS
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[#64748B] hover:text-[#0F172A] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden md:flex gap-3">
          <a href="#" className="btn-ghost">
            Sign in
          </a>
          <a href="#" className="btn-primary">
            Book a demo
          </a>
        </div>

        {/* Mobile Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container-max py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[#0F172A] hover:text-[#2563EB] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
              <a href="#" className="btn-ghost text-center">
                Sign in
              </a>
              <a href="#" className="btn-primary text-center">
                Book a demo
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
