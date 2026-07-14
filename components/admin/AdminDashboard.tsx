/* Panel de administración de solicitudes de contacto */
/* Autor: Ing. J Sebastian Vargas S */

'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, RefreshCw, LogOut, Inbox, X, Trash2, Mail, Phone,
  Building2, Calendar, Loader2, Filter, ChevronLeft, ChevronRight, Layers,
} from 'lucide-react'
import {
  ESTADOS, PRESUPUESTOS, SERVICIOS, labelOf,
  type ContactRequest, type Estado,
} from '@/lib/catalog'
import { estadoStyle } from './estado-style'
import { cn } from '@/lib/utils'

interface Stats {
  total: number
  porEstado: Record<string, number>
  ultimos7dias: number
}

const PAGE_SIZE = 20

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('es-CO', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    })
  } catch {
    return iso
  }
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

export default function AdminDashboard() {
  const router = useRouter()
  const [items, setItems] = useState<ContactRequest[]>([])
  const [total, setTotal] = useState(0)
  const [stats, setStats] = useState<Stats | null>(null)
  const [page, setPage] = useState(1)
  const [estadoFilter, setEstadoFilter] = useState('')
  const [search, setSearch] = useState('')
  const [debounced, setDebounced] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<ContactRequest | null>(null)
  const firstLoad = useRef(true)

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 350)
    return () => clearTimeout(t)
  }, [search])

  useEffect(() => {
    setPage(1)
  }, [debounced, estadoFilter])

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: String(PAGE_SIZE) })
      if (estadoFilter) params.set('estado', estadoFilter)
      if (debounced.trim()) params.set('search', debounced.trim())

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
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
      firstLoad.current = false
    }
  }, [page, estadoFilter, debounced, router])

  useEffect(() => {
    load()
  }, [load])

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

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const kpis = useMemo(() => {
    const pe = stats?.porEstado ?? {}
    return [
      { label: 'Total', value: stats?.total ?? 0, icon: Inbox, tone: 'text-accent bg-accent/12' },
      { label: 'Nuevas', value: pe.nuevo ?? 0, icon: Layers, tone: 'text-accent bg-accent/12' },
      { label: 'En proceso', value: pe.en_proceso ?? 0, icon: RefreshCw, tone: 'text-warning bg-warning/12' },
      { label: 'Últimos 7 días', value: stats?.ultimos7dias ?? 0, icon: Calendar, tone: 'text-success bg-success/12' },
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
            <button
              onClick={() => load()}
              className="h-9 w-9 rounded-md border border-line bg-surface hover:bg-surface-2 flex items-center justify-center text-subtle transition-colors cursor-pointer"
              aria-label="Actualizar"
              title="Actualizar"
            >
              <RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />
            </button>
            <button
              onClick={logout}
              className="h-9 px-3 rounded-md border border-line bg-surface hover:bg-surface-2 flex items-center gap-2 text-sm font-medium text-subtle transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
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

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
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
              onChange={(e) => setEstadoFilter(e.target.value)}
              className="w-full h-10 rounded-md bg-surface border border-line pl-9 pr-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 transition-colors cursor-pointer"
            >
              <option value="">Todos los estados</option>
              {ESTADOS.map((e) => (
                <option key={e.value} value={e.value}>{e.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Contenido */}
        {error ? (
          <div className="vs-panel rounded-xl p-8 text-center">
            <p className="text-danger text-sm mb-3">{error}</p>
            <button onClick={() => load()} className="text-sm font-semibold text-accent cursor-pointer">Reintentar</button>
          </div>
        ) : loading && firstLoad.current ? (
          <SkeletonList />
        ) : items.length === 0 ? (
          <div className="vs-panel rounded-xl p-12 flex flex-col items-center text-center">
            <span className="w-14 h-14 rounded-full bg-surface-2 flex items-center justify-center mb-4">
              <Inbox className="w-7 h-7 text-faint" />
            </span>
            <h3 className="font-semibold text-foreground mb-1">Sin solicitudes</h3>
            <p className="text-sm text-subtle max-w-xs">
              {debounced || estadoFilter
                ? 'No hay resultados con los filtros actuales.'
                : 'Cuando alguien complete el formulario, aparecerá aquí.'}
            </p>
          </div>
        ) : (
          <>
            {/* Tabla desktop */}
            <div className="vs-panel rounded-xl overflow-hidden hidden md:block">
              <div className="grid grid-cols-[1.6fr_1.4fr_auto_auto] gap-4 px-5 py-3 border-b border-line bg-surface-2/50">
                {['Contacto', 'Servicio', 'Estado', 'Fecha'].map((h) => (
                  <span key={h} className="text-[11px] font-semibold uppercase tracking-wider text-subtle">{h}</span>
                ))}
              </div>
              {items.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className="w-full grid grid-cols-[1.6fr_1.4fr_auto_auto] gap-4 px-5 py-3.5 border-b border-line last:border-0 items-center text-left hover:bg-surface-2/60 transition-colors cursor-pointer"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{r.nombre}</p>
                    <p className="text-xs text-faint truncate">{r.email}{r.empresa ? ` · ${r.empresa}` : ''}</p>
                  </div>
                  <span className="text-sm text-subtle truncate">{labelOf(SERVICIOS, r.servicio)}</span>
                  <EstadoPill estado={r.estado} />
                  <span className="text-xs text-faint whitespace-nowrap tabular-nums">{formatDate(r.created_at)}</span>
                </button>
              ))}
            </div>

            {/* Cards móvil */}
            <div className="grid gap-3 md:hidden">
              {items.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className="vs-panel rounded-xl p-4 text-left hover:border-line-strong transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">{r.nombre}</p>
                      <p className="text-xs text-faint truncate">{r.email}</p>
                    </div>
                    <EstadoPill estado={r.estado} />
                  </div>
                  <div className="flex items-center justify-between gap-2 text-xs text-subtle">
                    <span className="truncate">{labelOf(SERVICIOS, r.servicio)}</span>
                    <span className="text-faint whitespace-nowrap tabular-nums">{formatDate(r.created_at)}</span>
                  </div>
                </button>
              ))}
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
                    className="h-9 w-9 rounded-md border border-line bg-surface flex items-center justify-center text-subtle disabled:opacity-40 hover:bg-surface-2 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="h-9 w-9 rounded-md border border-line bg-surface flex items-center justify-center text-subtle disabled:opacity-40 hover:bg-surface-2 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

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

  useEffect(() => {
    setConfirmDelete(false)
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
              </div>
              <button onClick={onClose} className="h-8 w-8 rounded-md hover:bg-surface-2 flex items-center justify-center text-subtle transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div className="space-y-2.5">
                <DetailRow icon={Mail} label="Email" value={<a href={`mailto:${item.email}`} className="text-accent hover:underline break-all">{item.email}</a>} />
                {item.telefono && <DetailRow icon={Phone} label="Teléfono" value={<a href={`tel:${item.telefono}`} className="text-accent hover:underline">{item.telefono}</a>} />}
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
                          'px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer',
                          active ? s.pill : 'border-line text-subtle hover:bg-surface-2'
                        )}
                      >
                        {e.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="border-t border-line p-4 shrink-0 flex items-center gap-3">
              <a
                href={`mailto:${item.email}`}
                className="flex-1 h-11 rounded-md brand-gradient text-white font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all"
              >
                <Mail className="w-4 h-4" /> Responder
              </a>
              {confirmDelete ? (
                <button
                  onClick={async () => { setWorking(true); await onDelete(item.id) }}
                  disabled={working}
                  className="h-11 px-4 rounded-md bg-danger text-white font-semibold text-sm flex items-center gap-2 hover:brightness-110 transition-all cursor-pointer disabled:opacity-60"
                >
                  {working ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  Confirmar
                </button>
              ) : (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="h-11 w-11 rounded-md border border-line text-danger hover:bg-danger/10 flex items-center justify-center transition-colors cursor-pointer"
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
