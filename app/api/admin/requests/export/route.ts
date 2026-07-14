/* Exportación CSV de solicitudes (respeta filtros activos) */
/* Autor: Ing. J Sebastian Vargas S */

import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { labelOf, listContactRequestsForExport, PRESUPUESTOS, SERVICIOS } from '@/lib/contact'

export const runtime = 'nodejs'

const HEADERS = [
  'Fecha', 'Nombre', 'Email', 'Teléfono', 'Empresa',
  'Servicio', 'Presupuesto', 'Estado', 'Mensaje',
]

function csvEscape(value: string): string {
  const needsQuotes = /[",\n;]/.test(value)
  const escaped = value.replace(/"/g, '""')
  return needsQuotes ? `"${escaped}"` : escaped
}

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 })
  }

  try {
    const sp = req.nextUrl.searchParams
    const estado = sp.get('estado') ?? undefined
    const search = sp.get('search') ?? undefined
    const dateFrom = sp.get('dateFrom') ?? undefined
    const dateTo = sp.get('dateTo') ?? undefined

    const rows = await listContactRequestsForExport({ estado, search, dateFrom, dateTo })

    const lines = [
      HEADERS.join(','),
      ...rows.map((r) =>
        [
          new Date(r.created_at).toLocaleString('es-CO'),
          r.nombre,
          r.email,
          r.telefono ?? '',
          r.empresa ?? '',
          labelOf(SERVICIOS, r.servicio),
          labelOf(PRESUPUESTOS, r.presupuesto),
          r.estado,
          r.mensaje.replace(/\r?\n/g, ' '),
        ]
          .map((v) => csvEscape(String(v)))
          .join(',')
      ),
    ]

    // BOM UTF-8 para que Excel reconozca acentos correctamente.
    const csv = '\uFEFF' + lines.join('\r\n')
    const filename = `varsal-solicitudes-${new Date().toISOString().slice(0, 10)}.csv`

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('[api/admin/requests/export] Error:', (err as Error).message)
    return NextResponse.json({ ok: false, error: 'Error al generar el export.' }, { status: 500 })
  }
}
