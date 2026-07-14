/* Rate limiting en memoria (ventana fija) — anti-spam básico para el form */
/* Autor: Ing. J Sebastian Vargas S */

interface Bucket {
  count: number
  resetAt: number
}

declare global {
  // eslint-disable-next-line no-var
  var __varsalRateBuckets: Map<string, Bucket> | undefined
}

const buckets: Map<string, Bucket> =
  global.__varsalRateBuckets ?? (global.__varsalRateBuckets = new Map())

export interface RateResult {
  allowed: boolean
  retryAfter: number // segundos
}

/**
 * Permite `limit` solicitudes por `windowMs` para una `key` (p.ej. IP).
 * Suficiente para un sitio de marketing; en alto volumen usar Redis.
 */
export function rateLimit(key: string, limit = 5, windowMs = 60_000): RateResult {
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, retryAfter: 0 }
  }

  if (bucket.count >= limit) {
    return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) }
  }

  bucket.count += 1
  return { allowed: true, retryAfter: 0 }
}

/** Limpieza oportunista de buckets vencidos para no crecer sin límite. */
export function sweepRateBuckets(): void {
  const now = Date.now()
  for (const [k, v] of buckets) {
    if (v.resetAt <= now) buckets.delete(k)
  }
}
