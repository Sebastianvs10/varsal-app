/* Endpoint de login del panel /admin */
/* Autor: Ing. J Sebastian Vargas S */

import { NextRequest, NextResponse } from 'next/server'
import { createSession, isAdminConfigured, verifyPassword } from '@/lib/admin-auth'
import { rateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

export async function POST(req: NextRequest) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json(
        { ok: false, error: 'El panel no está configurado en el servidor.' },
        { status: 503 }
      )
    }

    const limit = rateLimit(`login:${clientIp(req)}`, 8, 5 * 60_000)
    if (!limit.allowed) {
      return NextResponse.json(
        { ok: false, error: 'Demasiados intentos. Espere unos minutos.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
      )
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 })
    }

    const password = (body as Record<string, unknown>)?.password
    if (!verifyPassword(password)) {
      return NextResponse.json({ ok: false, error: 'Contraseña incorrecta.' }, { status: 401 })
    }

    await createSession()
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[api/admin/login] Error:', (err as Error).message)
    return NextResponse.json({ ok: false, error: 'Error del servidor.' }, { status: 500 })
  }
}
