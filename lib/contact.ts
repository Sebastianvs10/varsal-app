/* Dominio de solicitudes de contacto — catálogos, tipos y persistencia */
/* Autor: Ing. J Sebastian Vargas S */

import { query } from './db'
import {
  ESTADO_VALUES,
  type ContactInput,
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
}

export interface ListResult {
  items: ContactRequest[]
  total: number
  page: number
  pageSize: number
}

export async function listContactRequests(params: ListParams = {}): Promise<ListResult> {
  const page = Math.max(1, params.page ?? 1)
  const pageSize = Math.min(100, Math.max(1, params.pageSize ?? 20))
  const offset = (page - 1) * pageSize

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

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : ''

  const totalRes = await query<{ count: string }>(
    `SELECT COUNT(*)::int AS count FROM contact_requests ${whereSql}`,
    values
  )
  const total = Number(totalRes.rows[0]?.count ?? 0)

  values.push(pageSize, offset)
  const itemsRes = await query<ContactRequest>(
    `SELECT * FROM contact_requests
       ${whereSql}
       ORDER BY created_at DESC
       LIMIT $${values.length - 1} OFFSET $${values.length}`,
    values
  )

  return { items: itemsRes.rows, total, page, pageSize }
}

export interface StatsResult {
  total: number
  porEstado: Record<string, number>
  ultimos7dias: number
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

  const porEstado: Record<string, number> = {}
  for (const row of estadoRes.rows) porEstado[row.estado] = Number(row.count)

  return {
    total: Number(totalRes.rows[0]?.count ?? 0),
    porEstado,
    ultimos7dias: Number(semanaRes.rows[0]?.count ?? 0),
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
