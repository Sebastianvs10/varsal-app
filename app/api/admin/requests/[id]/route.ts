/* Endpoint protegido: actualizar estado / eliminar una solicitud */
/* Autor: Ing. J Sebastian Vargas S */

import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import {
  deleteContactRequest,
  ESTADO_VALUES,
  updateContactStatus,
  type Estado,
} from '@/lib/contact'

export const runtime = 'nodejs'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 })
  }

  const { id } = await params
  if (!UUID_RE.test(id)) {
    return NextResponse.json({ ok: false, error: 'Identificador inválido.' }, { status: 400 })
  }

  try {
    const body = (await req.json()) as { estado?: unknown }
    const estado = body?.estado
    if (typeof estado !== 'string' || !ESTADO_VALUES.includes(estado)) {
      return NextResponse.json({ ok: false, error: 'Estado inválido.' }, { status: 422 })
    }

    const updated = await updateContactStatus(id, estado as Estado)
    if (!updated) {
      return NextResponse.json({ ok: false, error: 'No encontrada.' }, { status: 404 })
    }
    return NextResponse.json({ ok: true, item: updated })
  } catch (err) {
    console.error('[api/admin/requests/:id PATCH] Error:', (err as Error).message)
    return NextResponse.json({ ok: false, error: 'Error al actualizar.' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 })
  }

  const { id } = await params
  if (!UUID_RE.test(id)) {
    return NextResponse.json({ ok: false, error: 'Identificador inválido.' }, { status: 400 })
  }

  try {
    const deleted = await deleteContactRequest(id)
    if (!deleted) {
      return NextResponse.json({ ok: false, error: 'No encontrada.' }, { status: 404 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[api/admin/requests/:id DELETE] Error:', (err as Error).message)
    return NextResponse.json({ ok: false, error: 'Error al eliminar.' }, { status: 500 })
  }
}
