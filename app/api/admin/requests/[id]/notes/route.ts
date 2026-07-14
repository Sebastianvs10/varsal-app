/* Notas internas de seguimiento de una solicitud */
/* Autor: Ing. J Sebastian Vargas S */

import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { addContactNote, listContactNotes } from '@/lib/contact'

export const runtime = 'nodejs'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function GET(
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
    const items = await listContactNotes(id)
    return NextResponse.json({ ok: true, items })
  } catch (err) {
    console.error('[api/admin/requests/:id/notes GET] Error:', (err as Error).message)
    return NextResponse.json({ ok: false, error: 'Error al cargar notas.' }, { status: 500 })
  }
}

export async function POST(
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
    const body = (await req.json().catch(() => ({}))) as { texto?: unknown }
    const texto = typeof body?.texto === 'string' ? body.texto.trim().slice(0, 2000) : ''
    if (texto.length < 2) {
      return NextResponse.json({ ok: false, error: 'La nota no puede estar vacía.' }, { status: 422 })
    }

    const note = await addContactNote(id, texto)
    return NextResponse.json({ ok: true, item: note }, { status: 201 })
  } catch (err) {
    console.error('[api/admin/requests/:id/notes POST] Error:', (err as Error).message)
    return NextResponse.json({ ok: false, error: 'Error al guardar la nota.' }, { status: 500 })
  }
}
