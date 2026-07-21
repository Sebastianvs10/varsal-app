/* Barra flotante de acciones masivas — aparece al seleccionar filas */
/* Autor: Ing. J Sebastian Vargas S */

'use client'

import { useState, type CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Trash2, X } from 'lucide-react'
import { ESTADOS, type Estado } from '@/lib/catalog'
import { estadoStyle } from './estado-style'
import { cn } from '@/lib/utils'

export default function BulkActionBar({
  count,
  onEstado,
  onDelete,
  onClear,
}: {
  count: number
  onEstado: (estado: Estado) => Promise<void>
  onDelete: () => Promise<void>
  onClear: () => void
}) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [busy, setBusy] = useState<string | null>(null)

  const runEstado = async (estado: Estado) => {
    setBusy(estado)
    try {
      await onEstado(estado)
    } finally {
      setBusy(null)
    }
  }

  const runDelete = async () => {
    setBusy('delete')
    try {
      await onDelete()
    } finally {
      setBusy(null)
      setConfirmDelete(false)
    }
  }

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl"
        >
          <div className="vs-panel-elevated rounded-xl px-4 py-3 flex flex-wrap items-center gap-3 shadow-[var(--vs-shadow-lg)]">
            <div className="flex items-center gap-2 pr-3 border-r border-line">
              <span className="w-7 h-7 rounded-full brand-gradient text-white text-xs font-bold flex items-center justify-center tabular-nums">
                {count}
              </span>
              <span className="text-sm font-medium text-foreground hidden sm:inline">seleccionada{count !== 1 && 's'}</span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap flex-1">
              {ESTADOS.map((e) => {
                const s = estadoStyle(e.value)
                return (
                  <button
                    key={e.value}
                    onClick={() => runEstado(e.value)}
                    disabled={busy !== null}
                    className={cn(
                      'clay-pill px-2.5 py-1.5 text-xs font-semibold border cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5',
                      s.pill
                    )}
                    title={`Marcar como ${e.label}`}
                  >
                    {busy === e.value ? <Loader2 className="w-3 h-3 animate-spin" /> : <span className={cn('w-1.5 h-1.5 rounded-full', s.dot)} />}
                    {e.label}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-1.5">
              {confirmDelete ? (
                <button
                  onClick={runDelete}
                  disabled={busy !== null}
                  className="h-9 px-3 clay-btn-primary clay-btn-danger text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  {busy === 'delete' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  Confirmar
                </button>
              ) : (
                <button
                  onClick={() => setConfirmDelete(true)}
                  disabled={busy !== null}
                  style={{ '--clay-hue': 'var(--vs-danger)' } as CSSProperties}
                  className="h-9 w-9 clay-btn-ghost text-danger flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50"
                  aria-label="Eliminar seleccionadas"
                  title="Eliminar seleccionadas"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClear}
                className="h-9 w-9 clay-btn-ghost flex items-center justify-center text-subtle transition-colors cursor-pointer"
                aria-label="Deseleccionar todo"
                title="Deseleccionar todo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
