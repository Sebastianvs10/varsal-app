/* Catálogos y tipos compartidos (cliente + servidor) — sin dependencias de servidor */
/* Autor: Ing. J Sebastian Vargas S */

/** Servicios ofrecidos (coinciden con la sección de servicios del sitio). */
export const SERVICIOS = [
  { value: 'software', label: 'Software y apps a medida' },
  { value: 'cloud', label: 'Cloud e infraestructura / DevOps' },
  { value: 'automatizacion', label: 'Automatización e integraciones' },
  { value: 'consultoria', label: 'Consultoría y transformación digital' },
  { value: 'otro', label: 'Otro / no estoy seguro' },
] as const

export const PRESUPUESTOS = [
  { value: 'lt_5m', label: 'Menos de $5M COP' },
  { value: '5m_20m', label: '$5M – $20M COP' },
  { value: '20m_50m', label: '$20M – $50M COP' },
  { value: 'gt_50m', label: 'Más de $50M COP' },
  { value: 'sin_definir', label: 'Por definir' },
] as const

/** Estados del embudo comercial (workflow del admin). */
export const ESTADOS = [
  { value: 'nuevo', label: 'Nuevo' },
  { value: 'en_proceso', label: 'En proceso' },
  { value: 'contactado', label: 'Contactado' },
  { value: 'ganado', label: 'Ganado' },
  { value: 'descartado', label: 'Descartado' },
] as const

export type Estado = (typeof ESTADOS)[number]['value']

export const ESTADO_VALUES: readonly string[] = ESTADOS.map((e) => e.value)
export const SERVICIO_VALUES: readonly string[] = SERVICIOS.map((s) => s.value)
export const PRESUPUESTO_VALUES: readonly string[] = PRESUPUESTOS.map((p) => p.value)

export interface ContactInput {
  nombre: string
  email: string
  telefono?: string | null
  empresa?: string | null
  servicio?: string | null
  presupuesto?: string | null
  mensaje: string
}

export interface ContactRequest extends ContactInput {
  id: string
  estado: Estado
  ip: string | null
  user_agent: string | null
  created_at: string
  updated_at: string
}

export function labelOf(
  list: ReadonlyArray<{ value: string; label: string }>,
  v?: string | null
): string {
  if (!v) return '—'
  return list.find((x) => x.value === v)?.label ?? v
}
