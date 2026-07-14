'use client'

import { motion } from 'framer-motion'
import { Mail, Clock, ShieldCheck } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

const perks = [
  { icon: Clock, title: 'Respuesta en 24h', desc: 'Le contactamos al siguiente día hábil.' },
  { icon: ShieldCheck, title: 'Sin compromiso', desc: 'Diagnóstico inicial gratuito y honesto.' },
  { icon: Mail, title: 'Trato directo', desc: 'Habla con ingenieros, no con un bot.' },
]

export default function CTASection() {
  return (
    <section id="contacto" className="relative overflow-hidden navy-gradient py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 grid-texture opacity-[0.08]" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(60% 90% at 50% 0%, color-mix(in oklab, var(--vs-accent) 22%, transparent) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Columna texto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-semibold uppercase tracking-widest mb-6">
            Da el siguiente paso
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white text-balance">
            Hablemos de lo que quiere construir.
          </h2>

          <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-md">
            Cuéntenos su reto y le respondemos con un diagnóstico claro y los
            próximos pasos. Sin costo ni compromiso.
          </p>

          <ul className="space-y-4">
            {perks.map((p) => (
              <li key={p.title} className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                  <p.icon className="w-[18px] h-[18px] text-white" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-white font-semibold text-sm">{p.title}</p>
                  <p className="text-white/60 text-sm">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Columna formulario */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  )
}
