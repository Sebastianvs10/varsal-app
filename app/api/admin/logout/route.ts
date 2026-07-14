/* Endpoint de logout del panel /admin */
/* Autor: Ing. J Sebastian Vargas S */

import { NextResponse } from 'next/server'
import { destroySession } from '@/lib/admin-auth'

export const runtime = 'nodejs'

export async function POST() {
  await destroySession()
  return NextResponse.json({ ok: true })
}
