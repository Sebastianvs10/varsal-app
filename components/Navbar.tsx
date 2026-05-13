'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Productos', href: '#productos' },
  { label: 'Tecnologías', href: '#tecnologias' },
  { label: 'Casos', href: '#casos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '#contacto' },
]

function VarsalLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
          <path
            d="M4 6L10 18M14 18L20 6M8 12H16"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
      </div>
      <span className="font-semibold text-[15px] tracking-tight text-slate-100">
        VARSAL
        <span className="font-normal text-slate-400"> Systems</span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass-strong border-b border-white/[0.06]'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <VarsalLogo />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.href)}
                  className="px-3 py-2 text-[13.5px] text-slate-300 hover:text-white rounded-md hover:bg-white/[0.05] transition-colors duration-150 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => handleNav('#contacto')}
                className="px-2.5 py-2 text-[13.5px] text-slate-300 hover:text-white rounded-md hover:bg-white/[0.05] transition-colors cursor-pointer"
              >
                Iniciar sesión
              </button>
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNav('#contacto')}
                className="px-4 py-2 rounded-lg text-[13.5px] font-semibold text-white
                  bg-gradient-to-r from-blue-600 to-blue-500
                  hover:from-blue-500 hover:to-blue-400
                  shadow-[0_4px_14px_-2px_rgba(37,99,235,0.5)]
                  transition-all duration-200 cursor-pointer"
              >
                Agenda una reunión
              </motion.button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 glass-strong border-b border-white/10 lg:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => handleNav(item.href)}
                  className="text-left px-4 py-3 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer"
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="pt-2 border-t border-white/[0.08] mt-2">
                <button
                  onClick={() => handleNav('#contacto')}
                  className="w-full px-4 py-3 rounded-lg text-sm font-semibold text-white
                    bg-gradient-to-r from-blue-600 to-blue-500 cursor-pointer"
                >
                  Agenda una reunión
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
