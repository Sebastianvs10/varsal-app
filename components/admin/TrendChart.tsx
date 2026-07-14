/* Gráfico de tendencia de solicitudes (últimos 30 días) — SVG propio, sin dependencias */
/* Autor: Ing. J Sebastian Vargas S */

'use client'

import type { DailyPoint } from '@/lib/contact'

function formatShort(iso: string): string {
  try {
    return new Date(`${iso}T00:00:00`).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })
  } catch {
    return iso
  }
}

export default function TrendChart({ data }: { data: DailyPoint[] }) {
  if (!data.length) return null

  const max = Math.max(1, ...data.map((d) => d.count))
  const total = data.reduce((s, d) => s + d.count, 0)
  const barW = 100 / data.length

  return (
    <div className="vs-panel rounded-xl p-4 sm:p-5 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-foreground">Tendencia</p>
          <p className="text-xs text-faint">Solicitudes por día · últimos 30 días</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-2xl font-bold text-foreground tabular-nums leading-none">{total}</p>
          <p className="text-[11px] text-faint mt-1">en el periodo</p>
        </div>
      </div>

      <svg
        viewBox="0 0 100 36"
        preserveAspectRatio="none"
        className="w-full h-20 sm:h-24"
        role="img"
        aria-label={`Gráfico de solicitudes por día, total ${total} en 30 días`}
      >
        {data.map((d, i) => {
          const h = d.count > 0 ? Math.max((d.count / max) * 32, 1.5) : 0.6
          return (
            <rect
              key={d.date}
              x={i * barW + barW * 0.18}
              y={36 - h}
              width={barW * 0.64}
              height={h}
              rx={0.5}
              style={{ fill: d.count > 0 ? 'var(--vs-accent)' : 'var(--vs-line)' }}
              opacity={d.count > 0 ? 0.92 : 1}
            >
              <title>{`${formatShort(d.date)}: ${d.count} solicitud${d.count === 1 ? '' : 'es'}`}</title>
            </rect>
          )
        })}
      </svg>

      <div className="flex justify-between mt-2 text-[10px] text-faint tabular-nums">
        <span>{formatShort(data[0].date)}</span>
        <span>{formatShort(data[data.length - 1].date)}</span>
      </div>
    </div>
  )
}
