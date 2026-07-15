'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, CalendarDays, Home, Layers, Workflow, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import ThemeToggle from '@/components/ui/ThemeToggle'

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '#contacto' },
]

/** Accesos rápidos de la barra de navegación inferior fija (móvil). */
const quickNavItems = [
  { label: 'Inicio', href: '#inicio', icon: Home },
  { label: 'Servicios', href: '#servicios', icon: Layers },
  { label: 'Proceso', href: '#proceso', icon: Workflow },
  { label: 'Nosotros', href: '#nosotros', icon: Users },
]

const sectionIds = navItems.filter((i) => i.href.startsWith('#')).map((i) => i.href.slice(1))

function VarsalLogo() {
  return (
    <Link href="/" className="flex items-center shrink-0 group" aria-label="VARSAL Systems — Inicio">
      <Image
        src="/logo-varsal.png"
        alt="VARSAL Systems"
        width={977}
        height={354}
        priority
        className="h-9 lg:h-10 w-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] transition-transform duration-200 group-hover:scale-[1.03]"
      />
    </Link>
  )
}

interface NavLinkProps {
  item: (typeof navItems)[number]
  active: boolean
  pillId: string
  onNavigate: (href: string) => void
  size?: 'default' | 'compact'
}

function NavLink({ item, active, pillId, onNavigate, size = 'default' }: NavLinkProps) {
  const base = cn(
    'relative rounded-lg font-medium transition-colors duration-150 cursor-pointer',
    size === 'compact' ? 'px-3 py-2 text-[14px]' : 'px-4 py-2 text-[15px]',
    active ? 'text-accent' : 'text-subtle hover:text-foreground'
  )

  const content = (
    <>
      {active && (
        <motion.span
          layoutId={pillId}
          className="absolute inset-0 rounded-lg bg-accent/12 border border-accent/20"
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative z-10">{item.label}</span>
    </>
  )

  if (item.href.startsWith('#')) {
    return (
      <button onClick={() => onNavigate(item.href)} className={base}>
        {content}
      </button>
    )
  }
  return (
    <Link href={item.href} className={base}>
      {content}
    </Link>
  )
}

interface BottomNavItemProps {
  item: (typeof quickNavItems)[number]
  active: boolean
  onNavigate: (href: string) => void
}

function BottomNavItem({ item, active, onNavigate }: BottomNavItemProps) {
  return (
    <button
      onClick={() => onNavigate(item.href)}
      className="flex flex-col items-center justify-center gap-1 h-full cursor-pointer"
      aria-label={item.label}
      aria-current={active ? 'page' : undefined}
    >
      <item.icon
        className={cn('w-[19px] h-[19px] transition-colors duration-150', active ? 'text-accent' : 'text-faint')}
        strokeWidth={active ? 2 : 1.75}
      />
      <span className={cn('text-[10px] font-medium transition-colors duration-150', active ? 'text-accent' : 'text-faint')}>
        {item.label}
      </span>
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const isActive = (href: string) => href.startsWith('#') && href.slice(1) === activeSection

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          mobileOpen
            ? 'bg-surface border-b border-line'
            : scrolled
              ? 'glass-header border-b border-line shadow-[var(--vs-shadow-sm)]'
              : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div
            className={cn(
              'flex items-center justify-between gap-6 transition-all duration-300',
              scrolled ? 'h-[62px]' : 'h-[76px]'
            )}
          >
            <VarsalLogo />

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  item={item}
                  active={isActive(item.href)}
                  pillId="nav-pill-desktop"
                  onNavigate={handleNav}
                />
              ))}
            </nav>

            {/* Compact nav for lg */}
            <nav className="hidden lg:flex xl:hidden items-center gap-0.5">
              {navItems.slice(0, 5).map((item) => (
                <NavLink
                  key={item.label}
                  item={item}
                  active={isActive(item.href)}
                  pillId="nav-pill-compact"
                  onNavigate={handleNav}
                  size="compact"
                />
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <ThemeToggle />
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleNav('#contacto')}
                className="btn-shine group flex items-center gap-2 px-5 py-2.5 rounded-lg text-[14px] font-semibold
                  text-white brand-gradient btn-glow-accent hover:brightness-110
                  transition-all duration-150 cursor-pointer whitespace-nowrap"
              >
                <CalendarDays className="w-4 h-4" strokeWidth={2} />
                Agenda una reunión
              </motion.button>
            </div>

            {/* Mobile toggle */}
            <div className="lg:hidden flex items-center gap-1.5">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-subtle hover:text-foreground hover:bg-surface-2 transition-colors"
                aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="block"
                    >
                      <X className="w-5 h-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="block"
                    >
                      <Menu className="w-5 h-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Barra de progreso de scroll */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute bottom-0 left-0 right-0 h-[2px] brand-gradient origin-left"
          aria-hidden="true"
        />
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-30 bg-black/40 lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
              style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
              className="fixed left-0 right-0 bottom-0 z-45 bg-surface border-t border-line rounded-t-2xl shadow-(--vs-shadow-lg) lg:hidden"
            >
              {/* Handle visual de bottom sheet */}
              <div className="flex justify-center pt-3 pb-1" aria-hidden="true">
                <span className="w-10 h-1 rounded-full bg-line-strong" />
              </div>

              <nav className="max-w-7xl mx-auto px-6 pb-6 pt-2 flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.2 }}
                  >
                    {item.href.startsWith('#') ? (
                      <button
                        onClick={() => handleNav(item.href)}
                        className={cn(
                          'w-full text-left px-4 py-3 text-[15px] rounded-lg transition-colors cursor-pointer',
                          isActive(item.href)
                            ? 'text-accent bg-accent/10 font-semibold'
                            : 'text-subtle hover:text-foreground hover:bg-surface-2'
                        )}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-3 text-[15px] rounded-lg text-subtle hover:text-foreground hover:bg-surface-2 transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}

                <div className="pt-4 mt-2 border-t border-line flex justify-center">
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.03, duration: 0.2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleNav('#contacto')}
                    className="btn-shine flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white
                      brand-gradient btn-glow-accent transition-all cursor-pointer"
                  >
                    <CalendarDays className="w-4 h-4" strokeWidth={2} />
                    Agenda una reunión
                  </motion.button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Barra de navegación inferior persistente (móvil) */}
      <nav
        aria-label="Navegación rápida"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        className="fixed left-0 right-0 bottom-0 z-40 lg:hidden bg-surface border-t border-line"
      >
        <div className="relative grid grid-cols-5 h-16">
          {quickNavItems.slice(0, 2).map((item) => (
            <BottomNavItem key={item.label} item={item} active={isActive(item.href)} onNavigate={handleNav} />
          ))}

          {/* Acción central — Agenda una reunión */}
          <div className="relative flex items-center justify-center">
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => handleNav('#contacto')}
              aria-label="Agenda una reunión"
              className="absolute -top-6 w-14 h-14 rounded-full brand-gradient btn-glow-accent
                ring-4 ring-surface flex items-center justify-center text-white cursor-pointer"
            >
              <CalendarDays className="w-[20px] h-[20px]" strokeWidth={2} />
            </motion.button>
            <span className="absolute bottom-1.5 text-[10px] font-semibold text-accent">Agendar</span>
          </div>

          {quickNavItems.slice(2, 4).map((item) => (
            <BottomNavItem key={item.label} item={item} active={isActive(item.href)} onNavigate={handleNav} />
          ))}
        </div>
      </nav>
    </>
  )
}
