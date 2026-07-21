'use client'

/* Enlace del footer para reabrir el panel de preferencias de cookies */
/* Autor: Ing. J Sebastian Vargas S */

import { openCookiePreferences } from '@/lib/cookie-consent'

export default function CookiePreferencesLink() {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className="text-sm text-faint hover:text-subtle transition-colors duration-150 cursor-pointer"
    >
      Preferencias de cookies
    </button>
  )
}
