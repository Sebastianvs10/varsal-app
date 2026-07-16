/* Formulario de acceso al panel /admin */
/* Autor: Ing. J Sebastian Vargas S */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Lock, Loader2, AlertCircle, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LoginForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      className="w-full max-w-[420px]"
    >
      {/* Card */}
      <div className="relative vs-panel-elevated rounded-2xl overflow-hidden">
        <div className="h-[3px] brand-gradient" aria-hidden="true" />

        <div className="px-8 sm:px-10 pt-10 pb-9">
          <div className="flex flex-col items-center text-center mb-8">
            {/* Ícono con halo de acento — clicable, único acceso al sitio público */}
            <Link href="/" className="relative mb-5 group" aria-label="VARSAL Systems — Volver al inicio">
              <div
                className="absolute inset-0 -m-3 rounded-full blur-xl opacity-60"
                style={{ background: 'radial-gradient(circle, var(--vs-accent) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <span className="relative flex w-16 h-16 rounded-2xl bg-surface border border-line items-center justify-center p-3 shadow-(--vs-shadow-md) transition-transform duration-200 group-hover:scale-[1.05]">
                <Image
                  src="/logo-icon.png"
                  alt="VARSAL Systems"
                  width={512}
                  height={512}
                  className="w-full h-full object-contain"
                />
              </span>
            </Link>

            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-accent mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Acceso restringido
            </div>

            <h1 className="text-[28px] leading-tight font-bold text-foreground tracking-tight mb-2">
              Panel de administración
            </h1>
            <p className="text-sm text-subtle leading-relaxed max-w-[280px]">
              Ingrese su contraseña para continuar.
            </p>
          </div>

          <form onSubmit={submit} noValidate>
            <label htmlFor="admin-pass" className="block text-[11px] font-semibold uppercase tracking-wider text-subtle mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-faint pointer-events-none" />
              <input
                id="admin-pass"
                type={showPassword ? 'text' : 'password'}
                autoFocus
                autoComplete="current-password"
                className={cn(
                  'w-full h-12 rounded-lg bg-surface border border-line pl-10 pr-11 text-sm text-foreground',
                  'placeholder:text-faint transition-colors focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15',
                  error && 'border-danger focus:border-danger focus:ring-danger/15'
                )}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={busy}
                aria-invalid={!!error}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-faint hover:text-subtle transition-colors cursor-pointer"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center gap-2 text-xs text-danger"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={busy || !password}
              className={cn(
                'group mt-6 w-full h-12 rounded-lg font-semibold text-white text-sm brand-gradient btn-glow-accent btn-shine',
                'flex items-center justify-center gap-2 transition-all hover:brightness-110',
                'disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer'
              )}
            >
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              {busy ? 'Verificando…' : 'Entrar al panel'}
            </button>
          </form>

          <Link
            href="/"
            className="mt-3 w-full h-11 rounded-lg font-semibold text-accent text-sm border border-accent/30
              flex items-center justify-center gap-2 transition-colors hover:bg-accent/8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Ir a inicio
          </Link>

          {/* Señal de confianza */}
          <div className="flex items-center justify-center gap-1.5 mt-5 text-[11px] text-faint">
            <ShieldCheck className="w-3.5 h-3.5" />
            Conexión segura y cifrada
          </div>
        </div>
      </div>
    </motion.div>
  )
}
