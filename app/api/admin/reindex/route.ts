/* Endpoint protegido: solicita reindexación manual vía IndexNow (Bing/Yandex) */
/* Autor: Ing. J Sebastian Vargas S */

import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { submitIndexNow } from '@/lib/indexnow'

export const runtime = 'nodejs'

export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 })
  }

  const result = await submitIndexNow()

  if (!result.ok) {
    console.error('[api/admin/reindex] IndexNow falló:', result.error ?? result.status)
    return NextResponse.json(
      { ok: false, error: result.error ?? 'IndexNow rechazó la solicitud.' },
      { status: 502 }
    )
  }

  console.log(`[api/admin/reindex] IndexNow: ${result.submitted} URLs enviadas (status ${result.status}).`)
  return NextResponse.json({ ok: true, submitted: result.submitted })
}
