'use client'

/* Hook reactivo de consentimiento — sincroniza estado, eventos propios y otras pestañas */
/* Autor: Ing. J Sebastian Vargas S */

import { useCallback, useEffect, useState } from 'react'
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_STORAGE_KEY,
  type ConsentCategory,
  getStoredConsent,
  type StoredConsent,
} from './cookie-consent'

export function useCookieConsent() {
  const [consent, setConsent] = useState<StoredConsent | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // Se difiere a un microtask para evitar el warning de renders en cascada
    // por hacer setState de forma síncrona dentro del cuerpo del efecto.
    queueMicrotask(() => {
      setConsent(getStoredConsent())
      setHydrated(true)
    })

    const onChange = (e: Event) => {
      const custom = e as CustomEvent<StoredConsent>
      setConsent(custom.detail ?? getStoredConsent())
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === CONSENT_STORAGE_KEY) setConsent(getStoredConsent())
    }

    window.addEventListener(CONSENT_CHANGE_EVENT, onChange)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, onChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const checkConsent = useCallback(
    (category: ConsentCategory) => consent?.[category] === true,
    [consent]
  )

  return { consent, hydrated, hasConsent: checkConsent }
}
