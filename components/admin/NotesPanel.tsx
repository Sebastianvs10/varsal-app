/* Notas internas de seguimiento — dentro del slide-over de detalle */
/* Autor: Ing. J Sebastian Vargas S */

'use client'

import { useEffect, useState } from 'react'
import { Loader2, Send, StickyNote, Trash2 } from 'lucide-react'
import type { ContactNote } from '@/lib/catalog'

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('es-CO', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
    })
  } catch {
    return iso
  }
}

export default function NotesPanel({ contactId }: { contactId: string }) {
  const [notes, setNotes] = useState<ContactNote[]>([])
  const [loading, setLoading] = useState(true)
  const [texto, setTexto] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // NotesPanel se monta con `key={contactId}` desde el padre, así que cada
    // solicitud nueva ya arranca con el estado inicial (loading=true, notes=[]).
    let cancelled = false
    fetch(`/api/admin/requests/${contactId}/notes`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data?.ok) setNotes(data.items)
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [contactId])

  const addNote = async (e: React.FormEvent) => {
    e.preventDefault()
    const value = texto.trim()
    if (value.length < 2 || saving) return
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/requests/${contactId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: value }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? 'No se pudo guardar la nota.')
      setNotes((prev) => [data.item, ...prev])
      setTexto('')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSaving(false)
    }
  }

  const removeNote = async (id: string) => {
    const prev = notes
    setNotes((n) => n.filter((x) => x.id !== id))
    const res = await fetch(`/api/admin/requests/${contactId}/notes/${id}`, { method: 'DELETE' })
    if (!res.ok) setNotes(prev)
  }

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle mb-2 flex items-center gap-1.5">
        <StickyNote className="w-3.5 h-3.5" /> Notas internas
      </p>

      <form onSubmit={addNote} className="flex items-start gap-2 mb-3">
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Ej: Llamé, no contestó. Reintentar mañana."
          rows={2}
          maxLength={2000}
          className="flex-1 resize-none rounded-lg bg-surface-2 border border-line px-3 py-2 text-sm text-foreground placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 transition-colors"
        />
        <button
          type="submit"
          disabled={saving || texto.trim().length < 2}
          className="h-9 w-9 shrink-0 rounded-lg brand-gradient text-white flex items-center justify-center hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Agregar nota"
          title="Agregar nota"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>

      {error && <p className="text-xs text-danger mb-3">{error}</p>}

      {loading ? (
        <div className="space-y-2">
          {[0, 1].map((i) => (
            <div key={i} className="h-12 rounded-lg bg-surface-2 animate-pulse" />
          ))}
        </div>
      ) : notes.length === 0 ? (
        <p className="text-xs text-faint">Sin notas todavía. Registre aquí el seguimiento.</p>
      ) : (
        <ul className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {notes.map((n) => (
            <li key={n.id} className="group rounded-lg bg-surface-2 border border-line p-2.5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-foreground whitespace-pre-wrap leading-snug">{n.texto}</p>
                <button
                  onClick={() => removeNote(n.id)}
                  className="opacity-0 group-hover:opacity-100 shrink-0 text-faint hover:text-danger transition-all cursor-pointer"
                  aria-label="Eliminar nota"
                  title="Eliminar nota"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-faint mt-1 tabular-nums">{formatDate(n.created_at)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
