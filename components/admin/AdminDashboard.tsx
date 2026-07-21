/* Panel de administración de solicitudes de contacto */
/* Autor: Ing. J Sebastian Vargas S */

'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, RefreshCw, LogOut, Inbox, X, Trash2, Mail, Phone,
  Building2, Calendar, Loader2, Filter, ChevronLeft, ChevronRight, Layers,
  AlertTriangle, Download, Sparkles, Globe, CheckCircle2,
} from 'lucide-react'
import {
  ESTADOS, PRESUPUESTOS, SERVICIOS, SLA_HOURS, labelOf,
  type ContactRequest, type Estado,
} from '@/lib/catalog'
import type { DailyPoint } from '@/lib/contact'
import { estadoStyle } from './estado-style'
import { cn } from '@/lib/utils'
import CopyButton from './CopyButton'
import DateRangeFilter, { type DateRangeValue } from './DateRangeFilter'
import TrendChart from './TrendChart'
import BulkActionBar from './BulkActionBar'
import NotesPanel from './NotesPanel'

interface Stats {
  total: number
  porEstado: Record<string, number>
  ultimos7dias: number
  vencidas: number
  serie30d: DailyPoint[]
}

const PAGE_SIZE = 20
const POLL_INTERVAL_MS = 20000

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('es-CO', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    })
  } catch {
    return iso
  }
}

function isOverdue(item: ContactRequest): boolean {
  if (item.estado !== 'nuevo') return false
  const ageMs = Date.now() - new Date(item.created_at).getTime()
  return ageMs > SLA_HOURS * 3600 * 1000
}

function EstadoPill({ estado }: { estado: string }) {
  const s = estadoStyle(estado)
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border whitespace-nowrap', s.pill)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', s.dot)} />
      {s.label}
    </span>
  )
}

function SlaBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-danger/12 text-danger border border-danger/25 whitespace-nowrap"
      title={`Sin gestionar hace más de ${SLA_HOURS}h`}
    >
      <AlertTriangle className="w-3 h-3" /> Vencida
    </span>
  )
}

export default function AdminDashboard() {
  const router = useRouter()
  const [items, setItems] = useState<ContactRequest[]>([])
  const [total, setTotal] = useState(0)
  const [stats, setStats] = useState<Stats | null>(null)
  const [page, setPage] = useState(1)
  const [estadoFilter, setEstadoFilter] = useState('')
  const [search, setSearch] = useState('')
  const [debounced, setDebounced] = useState('')
  const [dateRange, setDateRange] = useState<DateRangeValue>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<ContactRequest | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [newAvailable, setNewAvailable] = useState(false)
  const [initialLoadDone, setInitialLoadDone] = useState(false)
  const [reindexing, setReindexing] = useState(false)
  const [reindexToast, setReindexToast] = useState<{ ok: boolean; message: string } | null>(null)
  const latestMarkerRef = useRef<string | null>(null)

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(search)
      setPage(1)
    }, 350)
    return () => clearTimeout(t)
  }, [search])

  const onEstadoFilterChange = (value: string) => {
    setEstadoFilter(value)
    setPage(1)
  }

  const onDateRangeChange = (value: DateRangeValue) => {
    setDateRange(value)
    setPage(1)
  }

  const syncLatestMarker = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/requests/latest', { cache: 'no-store' })
      if (!res.ok) return
      const data = await res.json()
      if (data?.ok) latestMarkerRef.current = data.id
    } catch {
      // silencioso: el polling es best-effort
    }
  }, [])

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: String(PAGE_SIZE) })
      if (estadoFilter) params.set('estado', estadoFilter)
      if (debounced.trim()) params.set('search', debounced.trim())
      if (dateRange.dateFrom) params.set('dateFrom', dateRange.dateFrom)
      if (dateRange.dateTo) params.set('dateTo', dateRange.dateTo)

      const res = await fetch(`/api/admin/requests?${params}`, { cache: 'no-store' })
      if (res.status === 401) {
        router.replace('/admin/login')
        return
      }
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? 'Error al cargar')
      setItems(data.items)
      setTotal(data.total)
      setStats(data.stats)
      setSelectedIds(new Set())
      syncLatestMarker()
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
      setInitialLoadDone(true)
    }
  }, [page, estadoFilter, debounced, dateRange, router, syncLatestMarker])

  useEffect(() => {
    // Se agenda como microtarea (en vez de invocar `load` de forma síncrona)
    // para que las actualizaciones de estado ocurran dentro de un callback,
    // no directamente en el cuerpo del efecto.
    queueMicrotask(() => { load() })
  }, [load])

  // Polling en vivo: verifica cada 20s si llegó una solicitud nueva (sin recargar la lista).
  useEffect(() => {
    const interval = setInterval(async () => {
      if (document.hidden) return
      try {
        const res = await fetch('/api/admin/requests/latest', { cache: 'no-store' })
        if (!res.ok) return
        const data = await res.json()
        if (data?.ok && data.id && latestMarkerRef.current && data.id !== latestMarkerRef.current) {
          setNewAvailable(true)
        }
      } catch {
        // silencioso: el polling es best-effort
      }
    }, POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  const refreshAll = () => {
    setNewAvailable(false)
    load()
  }

  const reindex = async () => {
    setReindexing(true)
    setReindexToast(null)
    try {
      const res = await fetch('/api/admin/reindex', { method: 'POST' })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data?.error ?? 'IndexNow rechazó la solicitud.')
      setReindexToast({ ok: true, message: `${data.submitted} URLs enviadas a Bing/Yandex.` })
    } catch (e) {
      setReindexToast({ ok: false, message: (e as Error).message })
    } finally {
      setReindexing(false)
      setTimeout(() => setReindexToast(null), 6000)
    }
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
    router.refresh()
  }

  const updateEstado = async (id: string, estado: Estado) => {
    const res = await fetch(`/api/admin/requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado }),
    })
    if (res.ok) {
      const { item } = await res.json()
      setItems((prev) => prev.map((r) => (r.id === id ? item : r)))
      setSelected((s) => (s && s.id === id ? item : s))
      load()
    }
  }

  const remove = async (id: string) => {
    const res = await fetch(`/api/admin/requests/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setSelected(null)
      load()
    }
  }

  const bulkEstado = async (estado: Estado) => {
    const ids = Array.from(selectedIds)
    const res = await fetch('/api/admin/requests/bulk', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids, estado }),
    })
    if (res.ok) load()
  }

  const bulkDelete = async () => {
    const ids = Array.from(selectedIds)
    const res = await fetch('/api/admin/requests/bulk', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    })
    if (res.ok) load()
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const allSelected = items.length > 0 && items.every((i) => selectedIds.has(i.id))
  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? new Set() : new Set(items.map((i) => i.id)))
  }

  const exportUrl = useMemo(() => {
    const params = new URLSearchParams()
    if (estadoFilter) params.set('estado', estadoFilter)
    if (debounced.trim()) params.set('search', debounced.trim())
    if (dateRange.dateFrom) params.set('dateFrom', dateRange.dateFrom)
    if (dateRange.dateTo) params.set('dateTo', dateRange.dateTo)
    const qs = params.toString()
    return `/api/admin/requests/export${qs ? `?${qs}` : ''}`
  }, [estadoFilter, debounced, dateRange])

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const kpis = useMemo(() => {
    const pe = stats?.porEstado ?? {}
    return [
      { label: 'Total', value: stats?.total ?? 0, icon: Inbox, tone: 'text-accent bg-accent/12' },
      { label: 'Nuevas', value: pe.nuevo ?? 0, icon: Layers, tone: 'text-accent bg-accent/12' },
      { label: 'En proceso', value: pe.en_proceso ?? 0, icon: RefreshCw, tone: 'text-warning bg-warning/12' },
      { label: 'Últimos 7 días', value: stats?.ultimos7dias ?? 0, icon: Calendar, tone: 'text-success bg-success/12' },
      { label: 'Vencidas (SLA)', value: stats?.vencidas ?? 0, icon: AlertTriangle, tone: 'text-danger bg-danger/12' },
    ]
  }, [stats])

  return (
    <div className="min-h-screen bg-bg-alt">
      {/* Topbar */}
      <header className="sticky top-0 z-30 bg-surface border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[60px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center shrink-0">
              <Inbox className="w-4 h-4 text-white" />
            </span>
            <div className="min-w-0">
              <p className="font-bold text-foreground text-sm leading-tight truncate">Solicitudes de contacto</p>
              <p className="text-[11px] text-faint leading-tight">Panel VARSAL Systems</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={exportUrl}
              className="h-9 px-3 clay-btn-ghost flex items-center gap-2 text-sm font-medium text-subtle transition-colors cursor-pointer"
              title="Exportar CSV con los filtros actuales"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exportar</span>
            </a>
            <button
              onClick={reindex}
              disabled={reindexing}
              className="h-9 px-3 clay-btn-ghost hidden sm:flex items-center gap-2 text-sm font-medium text-subtle transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              title="Solicitar reindexación en Bing/Yandex (IndexNow)"
            >
              <Globe className={cn('w-4 h-4', reindexing && 'animate-spin')} />
              <span className="hidden lg:inline">Reindexar</span>
            </button>
            <button
              onClick={refreshAll}
              className="h-9 w-9 clay-btn-ghost flex items-center justify-center text-subtle transition-colors cursor-pointer"
              aria-label="Actualizar"
              title="Actualizar"
            >
              <RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />
            </button>
            <button
              onClick={logout}
              className="h-9 px-3 clay-btn-ghost flex items-center gap-2 text-sm font-medium text-subtle transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Toast de nuevas solicitudes */}
      <AnimatePresence>
        {newAvailable && (
          <motion.div
            initial={{ opacity: 0, y: -12, x: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="fixed top-[72px] right-4 z-40"
          >
            <button
              onClick={refreshAll}
              className="vs-panel-elevated rounded-xl pl-3 pr-4 py-2.5 flex items-center gap-2.5 shadow-[var(--vs-shadow-lg)] hover:border-accent/40 transition-colors cursor-pointer"
            >
              <span className="w-8 h-8 rounded-lg bg-accent/12 text-accent flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-left">
                <span className="block text-sm font-semibold text-foreground">Nueva solicitud recibida</span>
                <span className="block text-xs text-accent font-medium">Actualizar →</span>
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast de resultado — reindexación IndexNow */}
      <AnimatePresence>
        {reindexToast && (
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24, transition: { duration: 0.12 } }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-6 right-4 sm:right-6 z-50"
          >
            <div
              className={cn(
                'vs-panel-elevated rounded-xl pl-3 pr-4 py-2.5 flex items-center gap-2.5 shadow-(--vs-shadow-lg)',
                reindexToast.ok ? '' : 'border-danger/40'
              )}
            >
              <span
                className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                  reindexToast.ok ? 'bg-success/12 text-success' : 'bg-danger/12 text-danger'
                )}
              >
                {reindexToast.ok ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              </span>
              <span className="text-left">
                <span className="block text-sm font-semibold text-foreground">
                  {reindexToast.ok ? 'Reindexación solicitada' : 'Error al reindexar'}
                </span>
                <span className="block text-xs text-subtle">{reindexToast.message}</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
          {kpis.map((k) => (
            <div key={k.label} className="vs-panel rounded-xl p-4 flex items-center gap-3">
              <span className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0', k.tone)}>
                <k.icon className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-foreground tabular-nums leading-none">{k.value}</p>
                <p className="text-xs text-subtle mt-1 truncate">{k.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tendencia */}
        {stats?.serie30d && stats.serie30d.length > 0 && <TrendChart data={stats.serie30d} />}

        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-faint" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o empresa…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 rounded-md bg-surface border border-line pl-9 pr-3 text-sm text-foreground placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 transition-colors"
            />
          </div>
          <div className="relative sm:w-56">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-faint pointer-events-none" />
            <select
              value={estadoFilter}
              onChange={(e) => onEstadoFilterChange(e.target.value)}
              className="w-full h-10 rounded-md bg-surface border border-line pl-9 pr-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 transition-colors cursor-pointer"
            >
              <option value="">Todos los estados</option>
              {ESTADOS.map((e) => (
                <option key={e.value} value={e.value}>{e.label}</option>
              ))}
            </select>
          </div>
          <DateRangeFilter onChange={onDateRangeChange} />
        </div>

        {/* Contenido */}
        {error ? (
          <div className="vs-panel rounded-xl p-8 text-center">
            <p className="text-danger text-sm mb-3">{error}</p>
            <button onClick={() => load()} className="text-sm font-semibold text-accent cursor-pointer">Reintentar</button>
          </div>
        ) : loading && !initialLoadDone ? (
          <SkeletonList />
        ) : items.length === 0 ? (
          <div className="vs-panel rounded-xl p-12 flex flex-col items-center text-center">
            <span className="w-14 h-14 rounded-full bg-surface-2 flex items-center justify-center mb-4">
              <Inbox className="w-7 h-7 text-faint" />
            </span>
            <h3 className="font-semibold text-foreground mb-1">Sin solicitudes</h3>
            <p className="text-sm text-subtle max-w-xs">
              {debounced || estadoFilter || dateRange.dateFrom
                ? 'No hay resultados con los filtros actuales.'
                : 'Cuando alguien complete el formulario, aparecerá aquí.'}
            </p>
          </div>
        ) : (
          <>
            {/* Tabla desktop */}
            <div className="vs-panel rounded-xl overflow-hidden hidden md:block">
              <div className="grid grid-cols-[20px_1.3fr_0.9fr_195px_175px] gap-4 px-5 py-3 border-b border-line bg-surface-2/50 items-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-line accent-[var(--vs-accent)] cursor-pointer"
                  aria-label="Seleccionar todas"
                />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-subtle">Contacto</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-subtle">Servicio</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-subtle">Estado</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-subtle text-right">Fecha</span>
              </div>
              {items.map((r) => {
                const overdue = isOverdue(r)
                return (
                  <div
                    key={r.id}
                    className={cn(
                      'group w-full grid grid-cols-[20px_1.3fr_0.9fr_195px_175px] gap-4 px-5 py-3.5 border-b border-line last:border-0 items-center transition-colors',
                      overdue ? 'border-l-2 border-l-danger' : '',
                      selectedIds.has(r.id) ? 'bg-accent/6' : 'hover:bg-surface-2/60'
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.has(r.id)}
                      onChange={() => toggleSelect(r.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 rounded border-line accent-[var(--vs-accent)] cursor-pointer"
                      aria-label={`Seleccionar ${r.nombre}`}
                    />
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelected(r)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelected(r)
                        }
                      }}
                      className="min-w-0 text-left cursor-pointer"
                    >
                      <p className="font-semibold text-foreground text-sm truncate">{r.nombre}</p>
                      <span className="flex items-center gap-1 text-xs text-faint truncate">
                        <span className="truncate">{r.email}{r.empresa ? ` · ${r.empresa}` : ''}</span>
                        <CopyButton value={r.email} label="email" className="opacity-0 group-hover:opacity-100" />
                      </span>
                    </div>
                    <button onClick={() => setSelected(r)} className="min-w-0 text-left cursor-pointer">
                      <span className="text-sm text-subtle truncate block">{labelOf(SERVICIOS, r.servicio)}</span>
                    </button>
                    <button onClick={() => setSelected(r)} className="flex flex-wrap items-center gap-1.5 cursor-pointer">
                      <EstadoPill estado={r.estado} />
                      {overdue && <SlaBadge />}
                    </button>
                    <button onClick={() => setSelected(r)} className="w-full text-xs text-faint whitespace-nowrap tabular-nums cursor-pointer text-right">
                      {formatDate(r.created_at)}
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Cards móvil */}
            <div className="grid gap-3 md:hidden">
              {items.map((r) => {
                const overdue = isOverdue(r)
                return (
                  <div
                    key={r.id}
                    className={cn(
                      'vs-panel rounded-xl p-4 transition-colors',
                      overdue && 'border-l-2 border-l-danger',
                      selectedIds.has(r.id) && 'bg-accent/6'
                    )}
                  >
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(r.id)}
                        onChange={() => toggleSelect(r.id)}
                        className="w-4 h-4 mt-1 rounded border-line accent-[var(--vs-accent)] cursor-pointer shrink-0"
                        aria-label={`Seleccionar ${r.nombre}`}
                      />
                      <button onClick={() => setSelected(r)} className="flex-1 min-w-0 text-left cursor-pointer">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground text-sm truncate">{r.nombre}</p>
                            <p className="text-xs text-faint truncate">{r.email}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <EstadoPill estado={r.estado} />
                            {overdue && <SlaBadge />}
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 text-xs text-subtle">
                          <span className="truncate">{labelOf(SERVICIOS, r.servicio)}</span>
                          <span className="text-faint whitespace-nowrap tabular-nums">{formatDate(r.created_at)}</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-5">
                <p className="text-xs text-faint">
                  {total} solicitud{total !== 1 && 'es'} · página {page} de {totalPages}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="h-9 w-9 clay-btn-ghost flex items-center justify-center text-subtle disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="h-9 w-9 clay-btn-ghost flex items-center justify-center text-subtle disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Barra flotante de acciones masivas */}
      <BulkActionBar
        count={selectedIds.size}
        onEstado={bulkEstado}
        onDelete={bulkDelete}
        onClear={() => setSelectedIds(new Set())}
      />

      {/* Slide-over detalle */}
      <DetailSlideOver
        item={selected}
        onClose={() => setSelected(null)}
        onEstado={updateEstado}
        onDelete={remove}
      />
    </div>
  )
}

function SkeletonList() {
  return (
    <div className="vs-panel rounded-xl p-5 space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 rounded bg-surface-2 animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-surface-2 animate-pulse" />
          </div>
          <div className="h-6 w-20 rounded-full bg-surface-2 animate-pulse" />
        </div>
      ))}
    </div>
  )
}

function DetailSlideOver({
  item, onClose, onEstado, onDelete,
}: {
  item: ContactRequest | null
  onClose: () => void
  onEstado: (id: string, estado: Estado) => void
  onDelete: (id: string) => void
}) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [working, setWorking] = useState(false)
  const overdue = item ? isOverdue(item) : false

  // Reinicia la confirmación de borrado cuando cambia la solicitud mostrada.
  // Se ajusta durante el render (patrón recomendado por React para "derivar"
  // estado a partir de un cambio de prop) en vez de un efecto, evitando un
  // ciclo extra de renderizado.
  const [prevItemId, setPrevItemId] = useState<string | null>(null)
  const currentItemId = item?.id ?? null
  if (currentItemId !== prevItemId) {
    setPrevItemId(currentItemId)
    setConfirmDelete(false)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (item) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [item, onClose])

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: [0.2, 0, 0, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[440px] bg-surface border-l border-line shadow-[var(--vs-shadow-lg)] flex flex-col"
          >
            <div className="flex items-center justify-between px-5 h-[60px] border-b border-line shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <h2 className="font-bold text-foreground truncate">{item.nombre}</h2>
                <EstadoPill estado={item.estado} />
                {overdue && <SlaBadge />}
              </div>
              <button onClick={onClose} className="h-8 w-8 clay-btn-ghost flex items-center justify-center text-subtle transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div className="space-y-2.5">
                <DetailRow
                  icon={Mail}
                  label="Email"
                  value={
                    <span className="flex items-center gap-1.5">
                      <a href={`mailto:${item.email}`} className="text-accent hover:underline break-all">{item.email}</a>
                      <CopyButton value={item.email} label="email" />
                    </span>
                  }
                />
                {item.telefono && (
                  <DetailRow
                    icon={Phone}
                    label="Teléfono"
                    value={
                      <span className="flex items-center gap-1.5">
                        <a href={`tel:${item.telefono}`} className="text-accent hover:underline">{item.telefono}</a>
                        <CopyButton value={item.telefono} label="teléfono" />
                      </span>
                    }
                  />
                )}
                {item.empresa && <DetailRow icon={Building2} label="Empresa" value={item.empresa} />}
                <DetailRow icon={Layers} label="Servicio" value={labelOf(SERVICIOS, item.servicio)} />
                <DetailRow icon={Inbox} label="Presupuesto" value={labelOf(PRESUPUESTOS, item.presupuesto)} />
                <DetailRow icon={Calendar} label="Recibido" value={formatDate(item.created_at)} />
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle mb-2">Mensaje</p>
                <div className="rounded-lg bg-surface-2 border border-line p-3.5 text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                  {item.mensaje}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle mb-2">Cambiar estado</p>
                <div className="flex flex-wrap gap-2">
                  {ESTADOS.map((e) => {
                    const active = item.estado === e.value
                    const s = estadoStyle(e.value)
                    return (
                      <button
                        key={e.value}
                        onClick={() => onEstado(item.id, e.value)}
                        className={cn(
                          'clay-pill px-3 py-1.5 text-xs font-semibold border cursor-pointer',
                          active ? s.pill : 'border-line text-subtle hover:bg-surface-2'
                        )}
                      >
                        {e.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <NotesPanel key={item.id} contactId={item.id} />
            </div>

            <div className="border-t border-line p-4 shrink-0 flex items-center gap-3">
              <a
                href={`mailto:${item.email}`}
                className="flex-1 h-11 clay-btn-primary font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Mail className="w-4 h-4" /> Responder
              </a>
              {confirmDelete ? (
                <button
                  onClick={async () => { setWorking(true); await onDelete(item.id) }}
                  disabled={working}
                  className="h-11 px-4 clay-btn-primary clay-btn-danger font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  {working ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  Confirmar
                </button>
              ) : (
                <button
                  onClick={() => setConfirmDelete(true)}
                  style={{ '--clay-hue': 'var(--vs-danger)' } as CSSProperties}
                  className="h-11 w-11 clay-btn-ghost text-danger flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Eliminar solicitud"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function DetailRow({
  icon: Icon, label, value,
}: {
  icon: React.ElementType
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 text-faint mt-0.5 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-faint uppercase tracking-wider">{label}</p>
        <div className="text-sm text-foreground">{value}</div>
      </div>
    </div>
  )
}
