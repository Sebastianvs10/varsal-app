/* Notificaciones por email vía Resend — plantillas con logo y degradación elegante */
/* Autor: Ing. J Sebastian Vargas S */

import { Resend } from 'resend'
import { labelOf, PRESUPUESTOS, SERVICIOS, type ContactRequest } from './catalog'

let cached: Resend | null | undefined

function getResend(): Resend | null {
  if (cached !== undefined) return cached
  const key = process.env.RESEND_API_KEY
  cached = key ? new Resend(key) : null
  return cached
}

export function isMailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.MAIL_FROM)
}

/** URL pública del sitio (para recursos como el logo en los correos). */
function appUrl(): string {
  const url = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://varsalsystems.com'
  return url.replace(/\/+$/, '')
}

function notifyRecipients(): string[] {
  const raw = process.env.CONTACT_NOTIFY_TO || process.env.MAIL_FROM || ''
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Envoltorio común de email (compatible con clientes de correo):
 * barra de acento + logo sobre fondo blanco + contenido + pie.
 */
function emailLayout(opts: { preview: string; heading: string; intro?: string; bodyHtml: string }): string {
  const logo = `${appUrl()}/logo-varsal.png`
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light only" />
</head>
<body style="margin:0;padding:0;background:#ECEEF5;">
  <span style="display:none;opacity:0;color:transparent;height:0;width:0;overflow:hidden">${escapeHtml(opts.preview)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ECEEF5;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border-radius:14px;overflow:hidden;box-shadow:0 8px 28px rgba(11,17,32,.10);">
          <tr><td style="height:4px;background:linear-gradient(90deg,#2563EB,#4F46E5,#7C3AED);"></td></tr>
          <tr>
            <td align="center" style="padding:28px 32px 8px;">
              <img src="${logo}" alt="VARSAL Systems" height="38" style="height:38px;width:auto;display:block;border:0;" />
            </td>
          </tr>
          <tr>
            <td style="padding:12px 32px 4px;">
              <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:20px;line-height:1.3;color:#0B1120;">${escapeHtml(opts.heading)}</h1>
              ${opts.intro ? `<p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#454F63;">${opts.intro}</p>` : ''}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 8px;">
              ${opts.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px;">
              <div style="border-top:1px solid #E5E7EB;padding-top:16px;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#9AA3B2;">
                  VARSAL Systems — Software, cloud y automatización.<br/>
                  <a href="${appUrl()}" style="color:#2563EB;text-decoration:none;">varsalsystems.com</a>
                </p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function fieldsTable(rows: Array<[string, string]>): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;border-collapse:collapse;">
    ${rows
      .map(
        ([k, v]) => `<tr>
          <td style="padding:7px 0;color:#6A7488;width:130px;vertical-align:top;">${escapeHtml(k)}</td>
          <td style="padding:7px 0;color:#0B1120;font-weight:600;vertical-align:top;">${escapeHtml(v)}</td>
        </tr>`
      )
      .join('')}
  </table>`
}

/**
 * Notificación interna: nueva solicitud recibida. Nunca lanza.
 */
export async function sendContactNotification(req: ContactRequest): Promise<boolean> {
  const resend = getResend()
  const from = process.env.MAIL_FROM
  const to = notifyRecipients()
  if (!resend || !from || to.length === 0) return false

  const rows: Array<[string, string]> = [
    ['Nombre', req.nombre],
    ['Email', req.email],
    ['Teléfono', req.telefono ?? '—'],
    ['Empresa', req.empresa ?? '—'],
    ['Servicio', labelOf(SERVICIOS, req.servicio)],
    ['Presupuesto', labelOf(PRESUPUESTOS, req.presupuesto)],
    ['Recibido', new Date(req.created_at).toLocaleString('es-CO')],
  ]

  const body = `
    ${fieldsTable(rows)}
    <div style="margin-top:16px;padding:14px 16px;background:#F2F4F9;border:1px solid #E5E7EB;border-radius:10px;">
      <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6A7488;text-transform:uppercase;letter-spacing:.06em;">Mensaje</p>
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.55;color:#0B1120;white-space:pre-wrap;">${escapeHtml(req.mensaje)}</p>
    </div>
    <div style="margin-top:18px;">
      <a href="mailto:${escapeHtml(req.email)}" style="display:inline-block;background:linear-gradient(135deg,#2563EB,#4F46E5);color:#fff;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;text-decoration:none;padding:11px 20px;border-radius:8px;">Responder a ${escapeHtml(req.nombre)}</a>
    </div>`

  const text = [
    'Nueva solicitud de contacto — VARSAL Systems',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    `Mensaje:\n${req.mensaje}`,
  ].join('\n')

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: req.email,
      subject: `Nueva solicitud: ${req.nombre}${req.empresa ? ` — ${req.empresa}` : ''}`,
      text,
      html: emailLayout({
        preview: `${req.nombre} envió una solicitud de contacto`,
        heading: 'Nueva solicitud de contacto',
        intro: 'Un visitante completó el formulario del sitio.',
        bodyHtml: body,
      }),
    })
    return true
  } catch (err) {
    console.warn('[mailer] Notificación interna falló:', (err as Error).message)
    return false
  }
}

/**
 * Confirmación (auto-respuesta) al cliente que envió el formulario. Nunca lanza.
 */
export async function sendCustomerConfirmation(req: ContactRequest): Promise<boolean> {
  const resend = getResend()
  const from = process.env.MAIL_FROM
  if (!resend || !from) return false

  const rows: Array<[string, string]> = [
    ['Servicio', labelOf(SERVICIOS, req.servicio)],
    ['Presupuesto', labelOf(PRESUPUESTOS, req.presupuesto)],
  ]

  const body = `
    <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#454F63;">
      Hemos recibido su solicitud y nuestro equipo la revisará en breve.
      Le responderemos <strong>en un plazo de 24 horas hábiles</strong>.
    </p>
    <div style="padding:14px 16px;background:#F2F4F9;border:1px solid #E5E7EB;border-radius:10px;">
      <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6A7488;text-transform:uppercase;letter-spacing:.06em;">Resumen</p>
      ${fieldsTable(rows)}
      <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.55;color:#0B1120;white-space:pre-wrap;">${escapeHtml(req.mensaje)}</p>
    </div>
    <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#454F63;">
      Si necesita agregar algo, simplemente responda a este correo.
    </p>`

  const text = [
    `Hola ${req.nombre},`,
    '',
    'Hemos recibido su solicitud y le responderemos en un plazo de 24 horas hábiles.',
    '',
    `Servicio: ${labelOf(SERVICIOS, req.servicio)}`,
    `Mensaje: ${req.mensaje}`,
    '',
    'VARSAL Systems',
  ].join('\n')

  try {
    await resend.emails.send({
      from,
      to: req.email,
      replyTo: notifyRecipients()[0] ?? from,
      subject: 'Recibimos su solicitud — VARSAL Systems',
      text,
      html: emailLayout({
        preview: 'Gracias por contactar a VARSAL Systems. Le responderemos pronto.',
        heading: `Gracias, ${escapeHtml(req.nombre.split(' ')[0])} 👋`,
        intro: 'Su mensaje llegó correctamente.',
        bodyHtml: body,
      }),
    })
    return true
  } catch (err) {
    console.warn('[mailer] Confirmación al cliente falló:', (err as Error).message)
    return false
  }
}
