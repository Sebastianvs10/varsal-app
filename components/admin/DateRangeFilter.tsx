/* Filtro de rango de fechas — presets + personalizado */
/* Autor: Ing. J Sebastian Vargas S */

'use client'

import { useState } from 'react'
import { CalendarRange } from 'lucide-react'

export interface DateRangeValue {
  dateFrom?: string
  dateTo?: string
}

const PRESETS = [
  { id: 'all', label: 'Todo' },
  { id: 'today', label: 'Hoy' },
  { id: '7d', label: 'Últimos 7 días' },
  { id: '30d', label: 'Últimos 30 días' },
  { id: 'month', label: 'Este mes' },
  { id: 'custom', label: 'Personalizado…' },
] as const

function startOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}
function endOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(23, 59, 59, 999)
  return x
}

export default function DateRangeFilter({
  onChange,
}: {
  onChange: (value: DateRangeValue) => void
}) {
  const [preset, setPreset] = useState<string>('all')
  const [customFrom, setCustomFrom] = useState('')
  const [customTo, setCustomTo] = useState('')

  const applyPreset = (id: string) => {
    setPreset(id)
    const now = new Date()
    if (id === 'all') {
      onChange({})
    } else if (id === 'today') {
      onChange({ dateFrom: startOfDay(now).toISOString(), dateTo: endOfDay(now).toISOString() })
    } else if (id === '7d') {
      onChange({
        dateFrom: startOfDay(new Date(now.getTime() - 6 * 86400000)).toISOString(),
        dateTo: endOfDay(now).toISOString(),
      })
    } else if (id === '30d') {
      onChange({
        dateFrom: startOfDay(new Date(now.getTime() - 29 * 86400000)).toISOString(),
        dateTo: endOfDay(now).toISOString(),
      })
    } else if (id === 'month') {
      const first = new Date(now.getFullYear(), now.getMonth(), 1)
      onChange({ dateFrom: startOfDay(first).toISOString(), dateTo: endOfDay(now).toISOString() })
    } else if (id === 'custom' && customFrom && customTo) {
      onChange({
        dateFrom: startOfDay(new Date(customFrom)).toISOString(),
        dateTo: endOfDay(new Date(customTo)).toISOString(),
      })
    }
  }

  const applyCustom = (from: string, to: string) => {
    setCustomFrom(from)
    setCustomTo(to)
    if (from && to) {
      onChange({ dateFrom: startOfDay(new Date(from)).toISOString(), dateTo: endOfDay(new Date(to)).toISOString() })
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
      <div className="relative sm:w-48">
        <CalendarRange className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-faint pointer-events-none" />
        <select
          value={preset}
          onChange={(e) => applyPreset(e.target.value)}
          className="w-full h-10 rounded-md bg-surface border border-line pl-9 pr-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 transition-colors cursor-pointer"
        >
          {PRESETS.map((p) => (
            <option key={p.id} value={p.id}>{p.label}</option>
          ))}
        </select>
      </div>

      {preset === 'custom' && (
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={customFrom}
            onChange={(e) => applyCustom(e.target.value, customTo)}
            className="h-10 rounded-md bg-surface border border-line px-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 transition-colors"
            aria-label="Fecha inicial"
          />
          <span className="text-faint text-sm">–</span>
          <input
            type="date"
            value={customTo}
            onChange={(e) => applyCustom(customFrom, e.target.value)}
            className="h-10 rounded-md bg-surface border border-line px-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 transition-colors"
            aria-label="Fecha final"
          />
        </div>
      )}
    </div>
  )
}
