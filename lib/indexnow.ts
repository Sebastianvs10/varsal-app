/* IndexNow — notifica a Bing/Yandex/Seznam de cambios para indexación rápida */
/* Autor: Ing. J Sebastian Vargas S */

import { PUBLIC_ROUTES, SITE_URL } from './site'

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

export interface IndexNowResult {
  ok: boolean
  status?: number
  submitted?: number
  error?: string
}

/**
 * Envía las rutas públicas del sitio a IndexNow (Bing, Yandex, Seznam...) para
 * acelerar el rastreo/indexación. Requiere INDEXNOW_KEY y el archivo de
 * verificación public/{key}.txt con el mismo valor (ver README de la variable
 * en .env.example). Si no está configurada, no falla: solo informa el motivo.
 */
export async function submitIndexNow(
  routes: readonly string[] = PUBLIC_ROUTES
): Promise<IndexNowResult> {
  const key = process.env.INDEXNOW_KEY
  if (!key) {
    return { ok: false, error: 'INDEXNOW_KEY no configurada.' }
  }

  let host: string
  try {
    host = new URL(SITE_URL).host
  } catch {
    return { ok: false, error: 'SITE_URL inválida.' }
  }

  const urlList = routes.map((route) => `${SITE_URL}${route === '/' ? '' : route}`)

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key,
        keyLocation: `${SITE_URL}/${key}.txt`,
        urlList,
      }),
    })
    // IndexNow responde 200/202 en éxito; 4xx si la clave o el host no coinciden.
    return { ok: res.ok, status: res.status, submitted: urlList.length }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Error de red desconocido.' }
  }
}
