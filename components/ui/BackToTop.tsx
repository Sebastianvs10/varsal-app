'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useCookieConsent } from '@/lib/useCookieConsent'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const { consent, hydrated } = useCookieConsent()
  // Mientras el aviso de cookies está esperando respuesta, este botón se
  // oculta para no chocar visualmente con la barra inferior.
  const cookieBarShowing = hydrated && !consent

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && !cookieBarShowing && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.18 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Volver arriba"
          title="Volver arriba"
          className="fixed right-4 sm:right-6 z-40 w-11 h-11 clay-btn-ghost clay-btn-circle
            flex items-center justify-center text-subtle
            bottom-[calc(4.5rem+env(safe-area-inset-bottom))] lg:bottom-6
            hover:text-accent transition-colors duration-150 cursor-pointer"
        >
          <ArrowUp className="w-[18px] h-[18px]" strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
