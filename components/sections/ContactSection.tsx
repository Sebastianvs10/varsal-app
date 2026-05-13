'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageCircle, Globe, Code2 } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Badge from '@/components/ui/Badge'

const budgetOptions = ['< $5M COP', '$5M - $20M COP', '$20M - $50M COP', '$50M+ COP', 'Por definir']
const projectTypes = ['Desarrollo a medida', 'ERP / CRM', 'Plataforma SaaS', 'Automatización', 'Consultoría', 'Integración API', 'Otro']

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  projectType: string
  budget: string
  message: string
}

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({
    name: '', company: '', email: '', phone: '',
    projectType: '', budget: '', message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1800))
    setSending(false)
    setSent(true)
  }

  const inputClass = `
    w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
    text-white placeholder-slate-500 text-sm
    focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5
    transition-all duration-200
  `

  return (
    <SectionWrapper id="contacto" glow>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="blue" className="mb-4">Contacto</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5">
            Cuéntenos su{' '}
            <span className="grad-text">proyecto</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Hablemos de cómo podemos ayudarle. Respondemos en menos de 24 horas hábiles.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="font-bold text-lg mb-5">Información de contacto</h3>
              <div className="space-y-4">
                <a
                  href="mailto:contacto@varsalsystems.com"
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/25 transition-colors">
                    <Mail className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Email</p>
                    <span className="text-sm">contacto@varsalsystems.com</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/573001234567"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/25 transition-colors">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">WhatsApp</p>
                    <span className="text-sm">+57 300 123 4567</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-slate-400">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Ubicación</p>
                    <span className="text-sm">Bogotá D.C., Colombia</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Redes */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="font-semibold mb-4 text-sm">Síguenos</h3>
              <div className="flex gap-3">
                {[
                  { icon: Globe, label: 'LinkedIn', color: 'hover:bg-blue-500/20 hover:border-blue-500/30', href: '#' },
                  { icon: Code2, label: 'GitHub', color: 'hover:bg-white/10 hover:border-white/20', href: '#' },
                  { icon: MessageCircle, label: 'Twitter/X', color: 'hover:bg-sky-500/20 hover:border-sky-500/30', href: '#' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className={`w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center ${s.color} transition-all duration-200`}
                  >
                    <s.icon className="w-4 h-4 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* Trust */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <p className="text-[11px] uppercase tracking-widest text-slate-500 font-medium mb-4">
                Garantías
              </p>
              <div className="flex flex-col gap-3">
                {[
                  'Información 100% confidencial',
                  'Respuesta en menos de 24 horas',
                  'Consultoría inicial sin costo',
                  'Propuesta sin compromiso',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-slate-400">
                    <svg className="w-3.5 h-3.5 text-emerald-400/80 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl p-8 border border-white/5">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-14"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                    <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Mensaje enviado correctamente</h3>
                  <p className="text-slate-400 max-w-sm mx-auto">
                    Gracias por contactarnos. Nuestro equipo le responderá en menos de 24 horas hábiles.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-7 px-5 py-2.5 rounded-lg text-sm border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all cursor-pointer"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">
                        Nombre completo *
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Juan García"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">
                        Empresa *
                      </label>
                      <input
                        name="company"
                        type="text"
                        required
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Mi Empresa S.A.S."
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">
                        Email corporativo *
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="juan@empresa.com"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+57 300 000 0000"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">
                        Tipo de proyecto
                      </label>
                      <select
                        name="projectType"
                        value={form.projectType}
                        onChange={handleChange}
                        className={inputClass + ' cursor-pointer'}
                      >
                        <option value="" className="bg-slate-800">Seleccionar...</option>
                        {projectTypes.map((p) => (
                          <option key={p} value={p} className="bg-slate-800">{p}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">
                        Presupuesto estimado
                      </label>
                      <select
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className={inputClass + ' cursor-pointer'}
                      >
                        <option value="" className="bg-slate-800">Seleccionar...</option>
                        {budgetOptions.map((b) => (
                          <option key={b} value={b} className="bg-slate-800">{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">
                      Cuéntenos su proyecto *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe brevemente su idea, problema a resolver o necesidad tecnológica..."
                      className={inputClass + ' resize-none'}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={!sending ? { scale: 1.02 } : {}}
                    whileTap={!sending ? { scale: 0.98 } : {}}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl
                      font-semibold text-white text-sm
                      bg-gradient-to-r from-blue-600 to-cyan-500
                      disabled:opacity-60 disabled:cursor-not-allowed
                      shadow-[0_0_24px_rgba(37,99,235,0.3)]
                      hover:shadow-[0_0_32px_rgba(37,99,235,0.5)]
                      transition-all duration-200 cursor-pointer"
                  >
                    {sending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar mensaje
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-slate-500 text-center">
                    Al enviar este formulario acepta nuestra{' '}
                    <a href="/privacidad" className="text-blue-400 hover:underline">
                      política de privacidad
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
