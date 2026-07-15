/* Formulario de contacto público — estados loading/success/error + validación */
/* Autor: Ing. J Sebastian Vargas S */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { PRESUPUESTOS, SERVICIOS } from '@/lib/catalog'
import { cn } from '@/lib/utils'

type FieldErrors = Record<string, string>

const initialForm = {
  nombre: '',
  email: '',
  telefono: '',
  empresa: '',
  servicio: '',
  presupuesto: '',
  mensaje: '',
  website: '', // honeypot
}

const inputBase =
  'w-full h-11 rounded-md bg-surface border border-line px-3.5 text-sm text-foreground ' +
  'placeholder:text-faint transition-colors duration-150 ' +
  'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 ' +
  'disabled:opacity-60'

const labelBase =
  'block text-[11px] font-semibold uppercase tracking-wider text-subtle mb-1.5'

export default function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState('')

  const update = (key: keyof typeof initialForm, value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: '' }))
  }

  const validateClient = (): FieldErrors => {
    const e: FieldErrors = {}
    if (form.nombre.trim().length < 2) e.nombre = 'Ingresa tu nombre.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Email no válido.'
    if (form.mensaje.trim().length < 10) e.mensaje = 'Cuéntanos un poco más.'
    return e
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    setServerError('')

    const clientErrors = validateClient()
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors)
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok) {
        setStatus('success')
        setForm(initialForm)
        return
      }

      if (data?.fields) setErrors(data.fields as FieldErrors)
      setServerError(data?.error ?? 'No pudimos enviar tu solicitud.')
      setStatus('error')
    } catch {
      setServerError('Error de conexión. Revise su red e intente de nuevo.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        className="vs-panel rounded-xl p-8 text-center flex flex-col items-center"
      >
        <span className="w-14 h-14 rounded-full bg-success/12 border border-success/25 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-7 h-7 text-success" strokeWidth={2} />
        </span>
        <h3 className="text-xl font-bold text-foreground mb-2">¡Solicitud enviada!</h3>
        <p className="text-subtle text-sm max-w-xs mb-6 leading-relaxed">
          Gracias por escribirnos. Te contactamos muy pronto.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-sm font-semibold text-accent hover:text-accent-light transition-colors cursor-pointer"
        >
          Enviar otra solicitud
        </button>
      </motion.div>
    )
  }

  const busy = status === 'submitting'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="vs-panel rounded-xl p-6 sm:p-7 text-left"
    >
      {/* Honeypot: oculto para humanos, señuelo para bots */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label>
          No llenar
          <input
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => update('website', e.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-nombre" className={labelBase}>
            Nombre <span className="text-danger">*</span>
          </label>
          <input
            id="cf-nombre"
            type="text"
            autoComplete="name"
            className={cn(inputBase, errors.nombre && 'border-danger focus:border-danger focus:ring-danger/25')}
            value={form.nombre}
            onChange={(e) => update('nombre', e.target.value)}
            disabled={busy}
            aria-invalid={!!errors.nombre}
          />
          {errors.nombre && <p className="mt-1 text-xs text-danger">{errors.nombre}</p>}
        </div>

        <div>
          <label htmlFor="cf-email" className={labelBase}>
            Email <span className="text-danger">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            className={cn(inputBase, errors.email && 'border-danger focus:border-danger focus:ring-danger/25')}
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            disabled={busy}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="mt-1 text-xs text-danger">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="cf-telefono" className={labelBase}>Teléfono</label>
          <input
            id="cf-telefono"
            type="tel"
            autoComplete="tel"
            className={cn(inputBase, errors.telefono && 'border-danger')}
            value={form.telefono}
            onChange={(e) => update('telefono', e.target.value)}
            disabled={busy}
          />
          {errors.telefono && <p className="mt-1 text-xs text-danger">{errors.telefono}</p>}
        </div>

        <div>
          <label htmlFor="cf-empresa" className={labelBase}>Empresa</label>
          <input
            id="cf-empresa"
            type="text"
            autoComplete="organization"
            className={inputBase}
            value={form.empresa}
            onChange={(e) => update('empresa', e.target.value)}
            disabled={busy}
          />
        </div>

        <div>
          <label htmlFor="cf-servicio" className={labelBase}>Servicio de interés</label>
          <select
            id="cf-servicio"
            className={cn(inputBase, 'pr-8 cursor-pointer', !form.servicio && 'text-faint')}
            value={form.servicio}
            onChange={(e) => update('servicio', e.target.value)}
            disabled={busy}
          >
            <option value="">Seleccione…</option>
            {SERVICIOS.map((s) => (
              <option key={s.value} value={s.value} className="text-foreground">
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cf-presupuesto" className={labelBase}>Presupuesto estimado</label>
          <select
            id="cf-presupuesto"
            className={cn(inputBase, 'pr-8 cursor-pointer', !form.presupuesto && 'text-faint')}
            value={form.presupuesto}
            onChange={(e) => update('presupuesto', e.target.value)}
            disabled={busy}
          >
            <option value="">Seleccione…</option>
            {PRESUPUESTOS.map((p) => (
              <option key={p.value} value={p.value} className="text-foreground">
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="cf-mensaje" className={labelBase}>
          ¿En qué podemos ayudarte? <span className="text-danger">*</span>
        </label>
        <textarea
          id="cf-mensaje"
          rows={4}
          className={cn(
            'w-full rounded-md bg-surface border border-line px-3.5 py-2.5 text-sm text-foreground',
            'placeholder:text-faint transition-colors duration-150 resize-y',
            'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-60',
            errors.mensaje && 'border-danger focus:border-danger focus:ring-danger/25'
          )}
          placeholder="Cuéntanos brevemente tu proyecto, reto u objetivo…"
          value={form.mensaje}
          onChange={(e) => update('mensaje', e.target.value)}
          disabled={busy}
          aria-invalid={!!errors.mensaje}
        />
        {errors.mensaje && <p className="mt-1 text-xs text-danger">{errors.mensaje}</p>}
      </div>

      <AnimatePresence>
        {status === 'error' && serverError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 flex items-start gap-2 rounded-md bg-danger/10 border border-danger/25 px-3.5 py-2.5"
          >
            <AlertCircle className="w-4 h-4 text-danger mt-0.5 shrink-0" />
            <p className="text-xs text-danger">{serverError}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={busy}
        className={cn(
          'group mt-5 w-full h-12 rounded-md font-semibold text-white text-sm',
          'brand-gradient btn-glow-accent flex items-center justify-center gap-2',
          'transition-all duration-150 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer'
        )}
      >
        {busy ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Enviando…
          </>
        ) : (
          <>
            <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            Enviar solicitud
          </>
        )}
      </button>

      <p className="mt-3 text-center text-[11px] text-faint">
        Tus datos se tratan de forma confidencial. Solo los usamos para contactarte.
      </p>
    </form>
  )
}
