/* Cron job (Vercel) — reenvía las URLs públicas a IndexNow periódicamente */
/* Autor: Ing. J Sebastian Vargas S */

import { NextRequest, NextResponse } from 'next/server'
import { submitIndexNow } from '@/lib/indexnow'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  const auth = req.headers.get('authorization')
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 })
  }

  const result = await submitIndexNow()

  if (!result.ok) {
    console.error('[cron/indexnow] IndexNow falló:', result.error ?? result.status)
    return NextResponse.json(
      { ok: false, error: result.error ?? 'IndexNow rechazó la solicitud.' },
      { status: 502 }
    )
  }

  console.log(`[cron/indexnow] IndexNow: ${result.submitted} URLs reenviadas (status ${result.status}).`)
  return NextResponse.json({ ok: true, submitted: result.submitted })
}
