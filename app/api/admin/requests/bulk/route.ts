/* Acciones masivas sobre solicitudes: cambio de estado y eliminación en lote */
/* Autor: Ing. J Sebastian Vargas S */

import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { bulkDeleteContactRequests, bulkUpdateStatus, ESTADO_VALUES, type Estado } from '@/lib/contact'

export const runtime = 'nodejs'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function parseIds(raw: unknown): string[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null
  const ids = raw.filter((v): v is string => typeof v === 'string' && UUID_RE.test(v))
  return ids.length > 0 ? ids : null
}

export async function PATCH(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 })
  }

  try {
    const body = (await req.json().catch(() => ({}))) as { ids?: unknown; estado?: unknown }
    const ids = parseIds(body?.ids)
    const estado = body?.estado

    if (!ids) {
      return NextResponse.json({ ok: false, error: 'Debe indicar al menos un identificador válido.' }, { status: 422 })
    }
    if (typeof estado !== 'string' || !ESTADO_VALUES.includes(estado)) {
      return NextResponse.json({ ok: false, error: 'Estado inválido.' }, { status: 422 })
    }

    const updated = await bulkUpdateStatus(ids, estado as Estado)
    return NextResponse.json({ ok: true, updated })
  } catch (err) {
    console.error('[api/admin/requests/bulk PATCH] Error:', (err as Error).message)
    return NextResponse.json({ ok: false, error: 'Error al actualizar en lote.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 })
  }

  try {
    const body = (await req.json().catch(() => ({}))) as { ids?: unknown }
    const ids = parseIds(body?.ids)

    if (!ids) {
      return NextResponse.json({ ok: false, error: 'Debe indicar al menos un identificador válido.' }, { status: 422 })
    }

    const deleted = await bulkDeleteContactRequests(ids)
    return NextResponse.json({ ok: true, deleted })
  } catch (err) {
    console.error('[api/admin/requests/bulk DELETE] Error:', (err as Error).message)
    return NextResponse.json({ ok: false, error: 'Error al eliminar en lote.' }, { status: 500 })
  }
}
