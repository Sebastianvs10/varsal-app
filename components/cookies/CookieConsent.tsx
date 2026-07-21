'use client'

/* Aviso de cookies (barra inferior) + panel de preferencias por categorías */
/* Autor: Ing. J Sebastian Vargas S */

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, ShieldCheck, ChartColumn, Megaphone, X, Check } from 'lucide-react'
import { useCookieConsent } from '@/lib/useCookieConsent'
import {
  OPEN_PREFERENCES_EVENT,
  saveConsent,
  type ConsentCategory,
  type ConsentPreferences,
} from '@/lib/cookie-consent'

interface CategoryMeta {
  id: 'necessary' | ConsentCategory
  icon: typeof ShieldCheck
  title: string
  description: string
  locked?: boolean
}

const CATEGORIES: CategoryMeta[] = [
  {
    id: 'necessary',
    icon: ShieldCheck,
    title: 'Necesarias',
    description:
      'Indispensables para que el sitio funcione: tu sesión de administración y tu preferencia de tema claro/oscuro. No requieren consentimiento (art. 12, Decreto 1377 de 2013).',
    locked: true,
  },
  {
    id: 'analytics',
    icon: ChartColumn,
    title: 'Analíticas',
    description:
      'Nos ayudarían a entender cómo se usa el sitio (páginas visitadas, tiempo de permanencia) para mejorarlo. Actualmente no utilizamos ninguna herramienta de este tipo.',
  },
  {
    id: 'marketing',
    icon: Megaphone,
    title: 'Marketing',
    description:
      'Se usarían para medir el rendimiento de campañas publicitarias. Actualmente no utilizamos ninguna herramienta de este tipo.',
  },
]

function Switch({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean
  disabled?: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className="relative shrink-0 w-11 h-6.5 rounded-full transition-colors duration-150 cursor-pointer
        disabled:cursor-not-allowed disabled:opacity-70
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      style={{
        background: checked
          ? 'var(--vs-accent)'
          : 'color-mix(in oklab, var(--vs-ink) 22%, transparent)',
      }}
    >
      <motion.span
        initial={false}
        animate={{ x: checked ? 20 : 2 }}
        transition={{ duration: 0.16, ease: [0.2, 0, 0, 1] }}
        className="absolute top-0.5 left-0 w-5.5 h-5.5 rounded-full bg-white shadow-(--vs-shadow-sm) flex items-center justify-center"
      >
        {checked && <Check className="w-3 h-3 text-accent" strokeWidth={3} />}
      </motion.span>
    </button>
  )
}

export default function CookieConsent() {
  const { consent, hydrated } = useCookieConsent()
  const [modalOpen, setModalOpen] = useState(false)
  const [draft, setDraft] = useState<Pick<ConsentPreferences, 'analytics' | 'marketing'>>({
    analytics: false,
    marketing: false,
  })
  const closeRef = useRef<HTMLButtonElement>(null)

  const showBanner = hydrated && !consent && !modalOpen

  useEffect(() => {
    const onOpen = () => {
      setDraft({
        analytics: consent?.analytics ?? false,
        marketing: consent?.marketing ?? false,
      })
      setModalOpen(true)
    }
    window.addEventListener(OPEN_PREFERENCES_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, onOpen)
  }, [consent])

  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [modalOpen])

  const acceptAll = () => {
    saveConsent({ analytics: true, marketing: true })
    setModalOpen(false)
  }
  const rejectNonEssential = () => {
    saveConsent({ analytics: false, marketing: false })
    setModalOpen(false)
  }
  const openCustomize = () => {
    setDraft({ analytics: consent?.analytics ?? false, marketing: consent?.marketing ?? false })
    setModalOpen(true)
  }
  const savePreferences = () => {
    saveConsent(draft)
    setModalOpen(false)
  }

  return (
    <>
      {/* Barra de aviso — inferior, ancho completo */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            role="region"
            aria-label="Aviso de cookies"
            className="fixed inset-x-0 bottom-16 lg:bottom-0 z-50
              bg-surface border-t border-line shadow-(--vs-shadow-lg)"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <span className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <Cookie className="w-4.5 h-4.5 text-accent" strokeWidth={1.75} />
                </span>
                <p className="text-sm text-subtle leading-relaxed">
                  Usamos almacenamiento técnico esencial para que el sitio funcione. Con tu
                  permiso, también podríamos usar cookies analíticas y de marketing.{' '}
                  <Link href="/cookies" className="text-accent font-medium hover:underline underline-offset-2">
                    Política de cookies
                  </Link>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0 sm:ml-auto">
                <button
                  type="button"
                  onClick={openCustomize}
                  className="px-4 h-10 clay-btn-ghost text-sm font-semibold text-subtle hover:text-foreground cursor-pointer whitespace-nowrap"
                >
                  Personalizar
                </button>
                <button
                  type="button"
                  onClick={rejectNonEssential}
                  className="px-4 h-10 clay-btn-ghost text-sm font-semibold text-subtle hover:text-foreground cursor-pointer whitespace-nowrap"
                >
                  Rechazar
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="btn-shine px-4 h-10 clay-btn-primary text-sm font-semibold cursor-pointer whitespace-nowrap"
                >
                  Aceptar todo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel de preferencias — categorías con toggles */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-60 flex items-end sm:items-center justify-center p-0 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div
              className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-prefs-title"
              initial={{ opacity: 0, y: 24, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.99 }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative w-full sm:max-w-lg max-h-[90vh] sm:max-h-[85vh] flex flex-col
                bg-surface border border-line rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-(--vs-shadow-lg)"
            >
              <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-line shrink-0">
                <div className="min-w-0">
                  <h2 id="cookie-prefs-title" className="text-lg font-bold text-foreground tracking-tight">
                    Preferencias de privacidad
                  </h2>
                  <p className="text-sm text-subtle mt-1 leading-relaxed">
                    Elige qué tipo de almacenamiento nos autorizas a usar. Puedes cambiarlo cuando quieras.
                  </p>
                </div>
                <button
                  ref={closeRef}
                  onClick={() => setModalOpen(false)}
                  className="shrink-0 w-9 h-9 clay-btn-ghost flex items-center justify-center text-subtle
                    hover:text-foreground transition-colors cursor-pointer"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto px-6 py-5 grow space-y-4">
                {CATEGORIES.map((cat) => {
                  const checked = cat.id === 'necessary' ? true : draft[cat.id]
                  return (
                    <div key={cat.id} className="vs-panel rounded-xl p-4 flex items-start gap-3.5">
                      <span className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <cat.icon className="w-4 h-4 text-accent" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0 grow">
                        <div className="flex items-center justify-between gap-3 mb-1">
                          <p className="font-semibold text-sm text-foreground">
                            {cat.title}
                            {cat.locked && (
                              <span className="ml-2 text-[10px] font-semibold uppercase tracking-wide text-accent">
                                Siempre activas
                              </span>
                            )}
                          </p>
                          <Switch
                            checked={checked}
                            disabled={cat.locked}
                            onChange={(v) =>
                              !cat.locked &&
                              setDraft((d) => ({ ...d, [cat.id]: v } as typeof d))
                            }
                            label={`Cookies de ${cat.title.toLowerCase()}`}
                          />
                        </div>
                        <p className="text-xs text-subtle leading-relaxed">{cat.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="px-6 py-4 border-t border-line shrink-0 flex flex-col sm:flex-row-reverse gap-2.5">
                <button
                  type="button"
                  onClick={savePreferences}
                  className="btn-shine flex-1 sm:flex-none px-5 h-11 clay-btn-primary text-sm font-semibold cursor-pointer"
                >
                  Guardar preferencias
                </button>
                <button
                  type="button"
                  onClick={rejectNonEssential}
                  className="flex-1 sm:flex-none px-5 h-11 clay-btn-ghost text-sm font-semibold text-subtle hover:text-foreground cursor-pointer"
                >
                  Rechazar no esenciales
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
