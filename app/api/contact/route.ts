/* Endpoint público: recepción de solicitudes de contacto */
/* Autor: Ing. J Sebastian Vargas S */

import { NextRequest, NextResponse } from 'next/server'
import { createContactRequest } from '@/lib/contact'
import { validateContact } from '@/lib/validation'
import { sendContactNotification, sendCustomerConfirmation } from '@/lib/mailer'
import { rateLimit, sweepRateBuckets } from '@/lib/rate-limit'

export const runtime = 'nodejs'

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

export async function POST(req: NextRequest) {
  try {
    const ip = clientIp(req)
    sweepRateBuckets()
    const limit = rateLimit(`contact:${ip}`, 5, 60_000)
    if (!limit.allowed) {
      return NextResponse.json(
        { ok: false, error: 'Demasiadas solicitudes. Intente de nuevo en un momento.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
      )
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ ok: false, error: 'Solicitud inválida.' }, { status: 400 })
    }

    // Honeypot anti-bot: campo oculto que un humano nunca llena.
    if (body && typeof body === 'object' && 'website' in body) {
      const hp = (body as Record<string, unknown>).website
      if (typeof hp === 'string' && hp.trim() !== '') {
        // Fingimos éxito para no dar pistas al bot.
        return NextResponse.json({ ok: true }, { status: 201 })
      }
    }

    const result = validateContact(body)
    if (!result.ok || !result.data) {
      return NextResponse.json(
        { ok: false, error: 'Revise los campos marcados.', fields: result.errors },
        { status: 422 }
      )
    }

    const created = await createContactRequest(result.data, {
      ip,
      userAgent: req.headers.get('user-agent'),
    })

    // Emails best-effort: no bloquean ni rompen la respuesta al usuario.
    void sendContactNotification(created)
    void sendCustomerConfirmation(created)

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    console.error('[api/contact] Error:', (err as Error).message)
    return NextResponse.json(
      { ok: false, error: 'No pudimos procesar su solicitud. Intente más tarde.' },
      { status: 500 }
    )
  }
}
