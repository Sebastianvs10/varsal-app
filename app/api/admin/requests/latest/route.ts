/* Marcador liviano para polling en vivo del panel (nuevas solicitudes) */
/* Autor: Ing. J Sebastian Vargas S */

import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { getLatestMarker } from '@/lib/contact'

export const runtime = 'nodejs'

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 })
  }

  try {
    const marker = await getLatestMarker()
    return NextResponse.json({ ok: true, ...marker })
  } catch (err) {
    console.error('[api/admin/requests/latest] Error:', (err as Error).message)
    return NextResponse.json({ ok: false, error: 'Error al verificar novedades.' }, { status: 500 })
  }
}
