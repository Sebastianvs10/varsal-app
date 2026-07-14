/* Autenticación del panel /admin — sesión firmada (HMAC) en cookie httpOnly */
/* Autor: Ing. J Sebastian Vargas S */

import 'server-only'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'varsal_admin_session'
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 días

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < 16) {
    throw new Error('ADMIN_SESSION_SECRET no configurada o demasiado corta')
  }
  return secret
}

function b64url(input: string): string {
  return Buffer.from(input, 'utf8').toString('base64url')
}

function sign(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('base64url')
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return timingSafeEqual(ab, bb)
}

/** Compara la contraseña recibida con ADMIN_PASSWORD de forma segura. */
export function verifyPassword(password: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected || typeof password !== 'string') return false
  // Igualamos longitudes con hash para evitar fuga de longitud por timing.
  const h1 = createHmac('sha256', 'pw').update(password).digest()
  const h2 = createHmac('sha256', 'pw').update(expected).digest()
  return timingSafeEqual(h1, h2)
}

function createToken(): string {
  const payload = b64url(JSON.stringify({ exp: Date.now() + SESSION_TTL_MS }))
  return `${payload}.${sign(payload)}`
}

function verifyToken(token: string | undefined): boolean {
  if (!token) return false
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false
  if (!safeEqual(signature, sign(payload))) return false
  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    return typeof exp === 'number' && exp > Date.now()
  } catch {
    return false
  }
}

/** Crea la sesión (cookie httpOnly firmada). */
export async function createSession(): Promise<void> {
  const store = await cookies()
  store.set(COOKIE_NAME, createToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  })
}

/** Elimina la sesión. */
export async function destroySession(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

/** Indica si la petición actual tiene una sesión válida. */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies()
  return verifyToken(store.get(COOKIE_NAME)?.value)
}

/** True si el panel admin está correctamente configurado en el entorno. */
export function isAdminConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_PASSWORD &&
      process.env.ADMIN_SESSION_SECRET &&
      process.env.ADMIN_SESSION_SECRET.length >= 16
  )
}
