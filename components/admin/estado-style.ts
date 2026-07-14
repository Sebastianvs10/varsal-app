/* Estilos semánticos por estado del embudo de solicitudes */
/* Autor: Ing. J Sebastian Vargas S */

import type { Estado } from '@/lib/catalog'

interface EstadoStyle {
  label: string
  pill: string // clases del badge (bg + texto + borde)
  dot: string // clase de color para el punto
}

export const ESTADO_STYLES: Record<Estado, EstadoStyle> = {
  nuevo: {
    label: 'Nuevo',
    pill: 'bg-accent/12 text-accent border-accent/25',
    dot: 'bg-accent',
  },
  en_proceso: {
    label: 'En proceso',
    pill: 'bg-warning/12 text-warning border-warning/25',
    dot: 'bg-warning',
  },
  contactado: {
    label: 'Contactado',
    pill: 'bg-navy-2/12 text-navy-2 border-navy-2/25',
    dot: 'bg-navy-2',
  },
  ganado: {
    label: 'Ganado',
    pill: 'bg-success/12 text-success border-success/25',
    dot: 'bg-success',
  },
  descartado: {
    label: 'Descartado',
    pill: 'bg-faint/12 text-faint border-line',
    dot: 'bg-faint',
  },
}

export function estadoStyle(estado: string): EstadoStyle {
  return ESTADO_STYLES[estado as Estado] ?? ESTADO_STYLES.nuevo
}
