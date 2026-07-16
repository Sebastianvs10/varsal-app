'use client'

import { motion } from 'framer-motion'
import { Handshake, Target, Rocket, Lock } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

const reasons = [
  {
    icon: Handshake,
    title: 'Un solo equipo, un solo compromiso',
    desc: 'Desarrollo, cloud, automatización e IA bajo un mismo equipo de ingeniería.',
  },
  {
    icon: Target,
    title: 'Recomendaciones basadas en tus objetivos',
    desc: 'Te proponemos lo que realmente conviene a tu negocio, aunque implique hacer menos.',
  },
  {
    icon: Rocket,
    title: 'Entregas continuas y visibilidad total',
    desc: 'Avances medibles por fases, con comunicación y transparencia constantes.',
  },
  {
    icon: Lock,
    title: 'Tecnología preparada para el futuro',
    desc: 'Software escalable, seguro y mantenible para que tu empresa evolucione sin depender de nosotros.',
  },
]

const commitments = [
  { label: 'Primera respuesta', value: 'Menos de 24 horas' },
  { label: 'Entregas iterativas', value: 'Cada 2 a 3 semanas' },
  { label: 'Propiedad intelectual', value: '100% del código es tuyo' },
  { label: 'Comunicación', value: 'Contacto directo con el equipo de ingeniería' },
]

export default function WhySection() {
  return (
    <SectionWrapper id="nosotros" className="bg-bg-alt">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 flex flex-col items-center text-center">
          <SectionEyebrow index="04" label="¿Por qué VARSAL Systems?" />
          <h2 className="w-full text-4xl lg:text-5xl font-bold mb-4 text-foreground text-balance">
            Más que un proveedor, somos tu <span className="text-brand">aliado tecnológico</span>.
          </h2>
          <p className="max-w-2xl text-subtle text-lg leading-relaxed">
            No solo desarrollamos software: entendemos tu negocio, identificamos
            oportunidades y construimos soluciones que generan resultados
            sostenibles.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ul className="space-y-4">
              {reasons.map((reason) => (
                <li key={reason.title} className="flex items-start gap-3">
                  <span className="mt-0.5 w-8 h-8 rounded-lg bg-accent/12 border border-accent/20 flex items-center justify-center shrink-0">
                    <reason.icon className="w-[15px] h-[15px] text-accent" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-0.5">{reason.title}</p>
                    <p className="text-sm text-subtle leading-relaxed">{reason.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden navy-gradient rounded-xl p-6 lg:p-7 shadow-(--vs-shadow-lg)"
          >
            {/* Foto del equipo de fondo. Fallback: degradado navy. */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/nosotros.png')" }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(160deg, color-mix(in oklab, var(--vs-navy) 82%, transparent) 0%, color-mix(in oklab, var(--vs-navy-2) 88%, transparent) 100%)' }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 grid-texture opacity-[0.06]" />
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(70% 100% at 100% 0%, color-mix(in oklab, var(--vs-accent) 25%, transparent) 0%, transparent 70%)' }}
            />

            <div className="relative z-10">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/50 mb-1">
                Compromiso operativo
              </p>
              <h3 className="text-white text-lg font-bold mb-4">Nuestros compromisos</h3>

              <div className="space-y-0">
                {commitments.map((c, i) => (
                  <div
                    key={c.label}
                    className={`py-3 ${i < commitments.length - 1 ? 'border-b border-white/10' : ''}`}
                  >
                    <p className="text-white/55 text-[11px] uppercase tracking-wide mb-0.5">{c.label}</p>
                    <p className="text-white font-semibold text-sm leading-snug">{c.value}</p>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs text-white/45 leading-relaxed">
                Estos compromisos forman parte de nuestra forma de trabajar y
                quedan definidos desde el inicio de cada proyecto.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
