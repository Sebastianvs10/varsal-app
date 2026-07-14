/* Endpoint protegido: listado + estadísticas de solicitudes */
/* Autor: Ing. J Sebastian Vargas S */

import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { getStats, listContactRequests } from '@/lib/contact'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 })
  }

  try {
    const sp = req.nextUrl.searchParams
    const page = Number(sp.get('page') ?? '1')
    const pageSize = Number(sp.get('pageSize') ?? '20')
    const estado = sp.get('estado') ?? undefined
    const search = sp.get('search') ?? undefined
    const dateFrom = sp.get('dateFrom') ?? undefined
    const dateTo = sp.get('dateTo') ?? undefined

    const [data, stats] = await Promise.all([
      listContactRequests({ page, pageSize, estado, search, dateFrom, dateTo }),
      getStats(),
    ])

    return NextResponse.json({ ok: true, ...data, stats })
  } catch (err) {
    console.error('[api/admin/requests] Error:', (err as Error).message)
    return NextResponse.json({ ok: false, error: 'Error al cargar solicitudes.' }, { status: 500 })
  }
}
