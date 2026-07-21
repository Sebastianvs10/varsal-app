/* Gestión de consentimiento de cookies — almacenamiento local + eventos globales */
/* Autor: Ing. J Sebastian Vargas S */

/**
 * Categorías gestionadas por el panel de preferencias. "necessary" no se
 * incluye aquí porque nunca requiere consentimiento (cookies/almacenamiento
 * técnico esencial, exento por el Decreto 1377 de 2013 art. 12).
 */
export type ConsentCategory = 'analytics' | 'marketing'

export interface ConsentPreferences {
  necessary: true
  analytics: boolean
  marketing: boolean
}

export interface StoredConsent extends ConsentPreferences {
  version: number
  updatedAt: string
}

export const CONSENT_STORAGE_KEY = 'varsal-cookie-consent'

/**
 * Incrementar SOLO si cambian las categorías gestionadas (ej. se añade una
 * herramienta real de analítica/marketing). Un cambio de versión invalida el
 * consentimiento guardado y vuelve a mostrar el aviso.
 */
export const CONSENT_VERSION = 1

/** Se emite en `window` cada vez que el consentimiento cambia (guardado o revocado). */
export const CONSENT_CHANGE_EVENT = 'varsal:cookie-consent-change'
/** El footer (y cualquier otro punto de la UI) lo dispara para reabrir el panel. */
export const OPEN_PREFERENCES_EVENT = 'varsal:open-cookie-preferences'

export const DEFAULT_PREFERENCES: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
}

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

/** Lee el consentimiento guardado. `null` si no existe o quedó obsoleto (versión distinta). */
export function getStoredConsent(): StoredConsent | null {
  if (!isBrowser()) return null
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredConsent
    if (parsed?.version !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

/** Guarda la elección del usuario y notifica a toda la app (mismo tab + otros tabs vía storage). */
export function saveConsent(prefs: Pick<ConsentPreferences, 'analytics' | 'marketing'>): StoredConsent {
  const consent: StoredConsent = {
    necessary: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  }
  if (isBrowser()) {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent))
    } catch {
      /* almacenamiento no disponible: el consentimiento se mantiene solo en memoria de este render */
    }
    window.dispatchEvent(new CustomEvent<StoredConsent>(CONSENT_CHANGE_EVENT, { detail: consent }))
  }
  return consent
}

/**
 * Consulta imperativa fuera de React — úsala antes de cargar un script de
 * terceros (analítica, píxeles de marketing, etc.) cuando se implemente uno.
 * Hoy no hay ninguna herramienta de este tipo activa en el sitio.
 */
export function hasConsent(category: ConsentCategory): boolean {
  const stored = getStoredConsent()
  return stored ? stored[category] === true : false
}

/** Dispara la apertura del panel de preferencias desde cualquier punto de la UI (ej. footer). */
export function openCookiePreferences(): void {
  if (isBrowser()) window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))
}
