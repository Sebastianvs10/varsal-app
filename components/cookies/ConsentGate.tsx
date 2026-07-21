'use client'

/* Renderiza contenido (ej. un <Script> de analítica/marketing) solo con consentimiento */
/* Autor: Ing. J Sebastian Vargas S */

import type { ReactNode } from 'react'
import { useCookieConsent } from '@/lib/useCookieConsent'
import type { ConsentCategory } from '@/lib/cookie-consent'

interface ConsentGateProps {
  /** Categoría requerida para mostrar `children` (ej. "analytics", "marketing"). */
  category: ConsentCategory
  children: ReactNode
  /** Contenido alternativo mientras no hay consentimiento (por defecto: nada). */
  fallback?: ReactNode
}

/**
 * Envuelve cualquier herramienta de terceros condicionada a consentimiento
 * explícito del usuario (Google Analytics, Meta Pixel, etc.). Reactivo: si el
 * visitante cambia sus preferencias desde el panel, este componente se
 * actualiza sin recargar la página.
 *
 * Uso futuro (cuando se añada una herramienta real):
 * ```tsx
 * <ConsentGate category="analytics">
 *   <Script src="https://..." strategy="lazyOnload" />
 * </ConsentGate>
 * ```
 * Hoy no hay ninguna herramienta de analítica ni marketing activa en el sitio.
 */
export default function ConsentGate({ category, children, fallback = null }: ConsentGateProps) {
  const { hasConsent, hydrated } = useCookieConsent()
  if (!hydrated || !hasConsent(category)) return <>{fallback}</>
  return <>{children}</>
}
