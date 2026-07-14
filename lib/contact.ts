/* Dominio de solicitudes de contacto — catálogos, tipos y persistencia */
/* Autor: Ing. J Sebastian Vargas S */

import { query } from './db'
import {
  ESTADO_VALUES,
  SLA_HOURS,
  type ContactInput,
  type ContactNote,
  type ContactRequest,
  type Estado,
} from './catalog'

export type { ContactInput, ContactRequest, Estado } from './catalog'
export {
  SERVICIOS,
  PRESUPUESTOS,
  ESTADOS,
  ESTADO_VALUES,
  SERVICIO_VALUES,
  PRESUPUESTO_VALUES,
  SLA_HOURS,
  labelOf,
} from './catalog'

export interface ContactMeta {
  ip?: string | null
  userAgent?: string | null
}

export async function createContactRequest(
  input: ContactInput,
  meta: ContactMeta = {}
): Promise<ContactRequest> {
  const { rows } = await query<ContactRequest>(
    `INSERT INTO contact_requests
       (nombre, email, telefono, empresa, servicio, presupuesto, mensaje, ip, user_agent)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      input.nombre,
      input.email,
      input.telefono ?? null,
      input.empresa ?? null,
      input.servicio ?? null,
      input.presupuesto ?? null,
      input.mensaje,
      meta.ip ?? null,
      meta.userAgent ?? null,
    ]
  )
  return rows[0]
}

export interface ListParams {
  page?: number
  pageSize?: number
  estado?: string
  search?: string
  dateFrom?: string
  dateTo?: string
}

export interface ListResult {
  items: ContactRequest[]
  total: number
  page: number
  pageSize: number
}

/** Construye la cláusula WHERE compartida por listado y exportación. */
function buildFilters(params: Pick<ListParams, 'estado' | 'search' | 'dateFrom' | 'dateTo'>) {
  const where: string[] = []
  const values: unknown[] = []

  if (params.estado && ESTADO_VALUES.includes(params.estado)) {
    values.push(params.estado)
    where.push(`estado = $${values.length}`)
  }

  if (params.search && params.search.trim()) {
    values.push(`%${params.search.trim().toLowerCase()}%`)
    const idx = values.length
    where.push(
      `(LOWER(nombre) LIKE $${idx} OR LOWER(email) LIKE $${idx} OR LOWER(COALESCE(empresa,'')) LIKE $${idx})`
    )
  }

  if (params.dateFrom && !Number.isNaN(Date.parse(params.dateFrom))) {
    values.push(params.dateFrom)
    where.push(`created_at >= $${values.length}`)
  }

  if (params.dateTo && !Number.isNaN(Date.parse(params.dateTo))) {
    values.push(params.dateTo)
    where.push(`created_at <= $${values.length}`)
  }

  return { whereSql: where.length ? `WHERE ${where.join(' AND ')}` : '', values }
}

export async function listContactRequests(params: ListParams = {}): Promise<ListResult> {
  const page = Math.max(1, params.page ?? 1)
  const pageSize = Math.min(100, Math.max(1, params.pageSize ?? 20))
  const offset = (page - 1) * pageSize

  const { whereSql, values } = buildFilters(params)

  const totalRes = await query<{ count: string }>(
    `SELECT COUNT(*)::int AS count FROM contact_requests ${whereSql}`,
    values
  )
  const total = Number(totalRes.rows[0]?.count ?? 0)

  const listValues = [...values, pageSize, offset]
  const itemsRes = await query<ContactRequest>(
    `SELECT * FROM contact_requests
       ${whereSql}
       ORDER BY created_at DESC
       LIMIT $${listValues.length - 1} OFFSET $${listValues.length}`,
    listValues
  )

  return { items: itemsRes.rows, total, page, pageSize }
}

/** Máximo de filas exportables en un solo CSV — protege memoria y tiempo de respuesta. */
const EXPORT_LIMIT = 5000

export async function listContactRequestsForExport(
  params: Pick<ListParams, 'estado' | 'search' | 'dateFrom' | 'dateTo'>
): Promise<ContactRequest[]> {
  const { whereSql, values } = buildFilters(params)
  const { rows } = await query<ContactRequest>(
    `SELECT * FROM contact_requests
       ${whereSql}
       ORDER BY created_at DESC
       LIMIT ${EXPORT_LIMIT}`,
    values
  )
  return rows
}

export interface DailyPoint {
  date: string
  count: number
}

export interface StatsResult {
  total: number
  porEstado: Record<string, number>
  ultimos7dias: number
  vencidas: number
  serie30d: DailyPoint[]
}

export async function getStats(): Promise<StatsResult> {
  const totalRes = await query<{ count: string }>(
    `SELECT COUNT(*)::int AS count FROM contact_requests`
  )
  const estadoRes = await query<{ estado: string; count: string }>(
    `SELECT estado, COUNT(*)::int AS count FROM contact_requests GROUP BY estado`
  )
  const semanaRes = await query<{ count: string }>(
    `SELECT COUNT(*)::int AS count FROM contact_requests
       WHERE created_at >= now() - interval '7 days'`
  )
  const vencidasRes = await query<{ count: string }>(
    `SELECT COUNT(*)::int AS count FROM contact_requests
       WHERE estado = 'nuevo' AND created_at < now() - interval '${SLA_HOURS} hours'`
  )
  const serieRes = await query<{ date: string; count: string }>(
    `SELECT to_char(d::date, 'YYYY-MM-DD') AS date,
            COALESCE(COUNT(cr.id), 0)::int AS count
       FROM generate_series(now()::date - interval '29 days', now()::date, interval '1 day') AS d
       LEFT JOIN contact_requests cr ON cr.created_at::date = d::date
       GROUP BY d
       ORDER BY d`
  )

  const porEstado: Record<string, number> = {}
  for (const row of estadoRes.rows) porEstado[row.estado] = Number(row.count)

  return {
    total: Number(totalRes.rows[0]?.count ?? 0),
    porEstado,
    ultimos7dias: Number(semanaRes.rows[0]?.count ?? 0),
    vencidas: Number(vencidasRes.rows[0]?.count ?? 0),
    serie30d: serieRes.rows.map((r) => ({ date: r.date, count: Number(r.count) })),
  }
}

export async function updateContactStatus(
  id: string,
  estado: Estado
): Promise<ContactRequest | null> {
  const { rows } = await query<ContactRequest>(
    `UPDATE contact_requests
       SET estado = $2, updated_at = now()
       WHERE id = $1
       RETURNING *`,
    [id, estado]
  )
  return rows[0] ?? null
}

export async function deleteContactRequest(id: string): Promise<boolean> {
  const { rowCount } = await query(`DELETE FROM contact_requests WHERE id = $1`, [id])
  return (rowCount ?? 0) > 0
}

/** Máximo de ids permitidos en una operación masiva — evita abuso/timeouts. */
const BULK_LIMIT = 200

export async function bulkUpdateStatus(ids: string[], estado: Estado): Promise<number> {
  const safeIds = ids.slice(0, BULK_LIMIT)
  if (safeIds.length === 0) return 0
  const { rowCount } = await query(
    `UPDATE contact_requests SET estado = $1, updated_at = now() WHERE id = ANY($2::uuid[])`,
    [estado, safeIds]
  )
  return rowCount ?? 0
}

export async function bulkDeleteContactRequests(ids: string[]): Promise<number> {
  const safeIds = ids.slice(0, BULK_LIMIT)
  if (safeIds.length === 0) return 0
  const { rowCount } = await query(`DELETE FROM contact_requests WHERE id = ANY($1::uuid[])`, [safeIds])
  return rowCount ?? 0
}

/** Última solicitud registrada — usado para el polling en vivo del panel. */
export async function getLatestMarker(): Promise<{ id: string | null; createdAt: string | null; total: number }> {
  const { rows } = await query<{ id: string | null; created_at: string | null; total: string }>(
    `SELECT
       (SELECT id FROM contact_requests ORDER BY created_at DESC LIMIT 1) AS id,
       (SELECT created_at FROM contact_requests ORDER BY created_at DESC LIMIT 1) AS created_at,
       (SELECT COUNT(*) FROM contact_requests) AS total`
  )
  const row = rows[0]
  return { id: row?.id ?? null, createdAt: row?.created_at ?? null, total: Number(row?.total ?? 0) }
}

// --- Notas internas de seguimiento ---

export async function listContactNotes(contactId: string): Promise<ContactNote[]> {
  const { rows } = await query<ContactNote>(
    `SELECT * FROM contact_notes WHERE contact_id = $1 ORDER BY created_at DESC`,
    [contactId]
  )
  return rows
}

export async function addContactNote(contactId: string, texto: string): Promise<ContactNote> {
  const { rows } = await query<ContactNote>(
    `INSERT INTO contact_notes (contact_id, texto) VALUES ($1, $2) RETURNING *`,
    [contactId, texto]
  )
  return rows[0]
}

export async function deleteContactNote(noteId: string): Promise<boolean> {
  const { rowCount } = await query(`DELETE FROM contact_notes WHERE id = $1`, [noteId])
  return (rowCount ?? 0) > 0
}
