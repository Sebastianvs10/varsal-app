/* Capa de acceso a PostgreSQL — pool singleton + esquema idempotente */
/* Autor: Ing. J Sebastian Vargas S */

import { Pool, type QueryResult, type QueryResultRow } from 'pg'

declare global {
  // eslint-disable-next-line no-var
  var __varsalPgPool: Pool | undefined
  // eslint-disable-next-line no-var
  var __varsalSchemaReady: Promise<void> | undefined
}

function getPool(): Pool {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL no está configurada')
  }

  if (!global.__varsalPgPool) {
    const disableSsl = /sslmode=disable/.test(url)
    global.__varsalPgPool = new Pool({
      connectionString: url,
      // Neon y la mayoría de proveedores gestionados requieren SSL.
      ssl: disableSsl ? false : { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    })
  }

  return global.__varsalPgPool
}

/**
 * Crea la tabla y los índices si no existen. Memoizado para ejecutarse
 * una sola vez por proceso. Idempotente y seguro ante reinicios.
 */
export function ensureSchema(): Promise<void> {
  if (!global.__varsalSchemaReady) {
    global.__varsalSchemaReady = (async () => {
      const pool = getPool()
      await pool.query(`
        CREATE TABLE IF NOT EXISTS contact_requests (
          id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          nombre       TEXT        NOT NULL,
          email        TEXT        NOT NULL,
          telefono     TEXT,
          empresa      TEXT,
          servicio     TEXT,
          presupuesto  TEXT,
          mensaje      TEXT        NOT NULL,
          estado       TEXT        NOT NULL DEFAULT 'nuevo',
          ip           TEXT,
          user_agent   TEXT,
          created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `)
      await pool.query(
        `CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at
           ON contact_requests (created_at DESC)`
      )
      await pool.query(
        `CREATE INDEX IF NOT EXISTS idx_contact_requests_estado
           ON contact_requests (estado)`
      )
    })().catch((err) => {
      // Si falla, permite reintentar en la próxima llamada.
      global.__varsalSchemaReady = undefined
      throw err
    })
  }
  return global.__varsalSchemaReady
}

/** Ejecuta una query parametrizada asegurando primero el esquema. */
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: ReadonlyArray<unknown> = []
): Promise<QueryResult<T>> {
  await ensureSchema()
  return getPool().query<T>(text, params as unknown[])
}

/** Indica si la base de datos está configurada (para health checks/UI). */
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL)
}
