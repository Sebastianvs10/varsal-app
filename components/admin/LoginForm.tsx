/* Formulario de acceso al panel /admin */
/* Autor: Ing. J Sebastian Vargas S */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Loader2, AlertCircle, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LoginForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    setError('')
    setBusy(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        router.replace('/admin')
        router.refresh()
        return
      }
      setError(data?.error ?? 'No se pudo iniciar sesión.')
    } catch {
      setError('Error de conexión.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center text-center mb-7">
        <span className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center mb-4 btn-glow-accent">
          <ShieldCheck className="w-6 h-6 text-white" />
        </span>
        <h1 className="text-2xl font-bold text-foreground">Panel de administración</h1>
        <p className="text-sm text-subtle mt-1">Acceso restringido — VARSAL Systems</p>
      </div>

      <form onSubmit={submit} className="vs-panel rounded-xl p-6">
        <label htmlFor="admin-pass" className="block text-[11px] font-semibold uppercase tracking-wider text-subtle mb-1.5">
          Contraseña
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-faint" />
          <input
            id="admin-pass"
            type="password"
            autoFocus
            autoComplete="current-password"
            className={cn(
              'w-full h-11 rounded-md bg-surface border border-line pl-9 pr-3.5 text-sm text-foreground',
              'placeholder:text-faint transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25',
              error && 'border-danger'
            )}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={busy}
          />
        </div>

        {error && (
          <div className="mt-3 flex items-center gap-2 text-xs text-danger">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={busy || !password}
          className={cn(
            'mt-5 w-full h-11 rounded-md font-semibold text-white text-sm brand-gradient btn-glow-accent',
            'flex items-center justify-center gap-2 transition-all hover:brightness-110',
            'disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer'
          )}
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
          {busy ? 'Verificando…' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
