/* Validación y saneamiento de la solicitud de contacto */
/* Autor: Ing. J Sebastian Vargas S */

import {
  type ContactInput,
  PRESUPUESTO_VALUES,
  SERVICIO_VALUES,
} from './catalog'

export interface ValidationResult {
  ok: boolean
  errors: Record<string, string>
  data?: ContactInput
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(v: unknown, max: number): string {
  if (typeof v !== 'string') return ''
  return v.trim().slice(0, max)
}

/**
 * Valida y normaliza el payload del formulario público.
 * No confía en el cliente: recorta longitudes y valida catálogos.
 */
export function validateContact(body: unknown): ValidationResult {
  const errors: Record<string, string> = {}
  const b = (body ?? {}) as Record<string, unknown>

  const nombre = clean(b.nombre, 120)
  const email = clean(b.email, 160).toLowerCase()
  const telefono = clean(b.telefono, 40)
  const empresa = clean(b.empresa, 120)
  const servicio = clean(b.servicio, 40)
  const presupuesto = clean(b.presupuesto, 40)
  const mensaje = clean(b.mensaje, 4000)

  if (nombre.length < 2) errors.nombre = 'Ingrese su nombre.'
  if (!EMAIL_RE.test(email)) errors.email = 'Ingrese un email válido.'
  if (mensaje.length < 10) errors.mensaje = 'Cuéntenos un poco más (mín. 10 caracteres).'

  if (telefono && !/^[+\d][\d\s()-]{5,}$/.test(telefono)) {
    errors.telefono = 'Teléfono no válido.'
  }
  if (servicio && !SERVICIO_VALUES.includes(servicio)) {
    errors.servicio = 'Servicio no válido.'
  }
  if (presupuesto && !PRESUPUESTO_VALUES.includes(presupuesto)) {
    errors.presupuesto = 'Presupuesto no válido.'
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    errors: {},
    data: {
      nombre,
      email,
      telefono: telefono || null,
      empresa: empresa || null,
      servicio: servicio || null,
      presupuesto: presupuesto || null,
      mensaje,
    },
  }
}
