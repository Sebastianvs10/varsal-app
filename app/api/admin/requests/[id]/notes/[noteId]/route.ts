/* Eliminar una nota interna de seguimiento */
/* Autor: Ing. J Sebastian Vargas S */

import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { deleteContactNote } from '@/lib/contact'

export const runtime = 'nodejs'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; noteId: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 })
  }

  const { noteId } = await params
  if (!UUID_RE.test(noteId)) {
    return NextResponse.json({ ok: false, error: 'Identificador inválido.' }, { status: 400 })
  }

  try {
    const deleted = await deleteContactNote(noteId)
    if (!deleted) {
      return NextResponse.json({ ok: false, error: 'No encontrada.' }, { status: 404 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[api/admin/requests/:id/notes/:noteId DELETE] Error:', (err as Error).message)
    return NextResponse.json({ ok: false, error: 'Error al eliminar la nota.' }, { status: 500 })
  }
}
