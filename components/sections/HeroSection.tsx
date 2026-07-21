/* Hero — fondo editorial full-bleed (equipo real) con velo navy y texto a la izquierda */
/* Autor: Ing. J Sebastian Vargas S */

'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, Cloud, Bot, Compass } from 'lucide-react'

const capabilities = [
  { icon: Code2, label: 'Software a medida' },
  { icon: Cloud, label: 'Cloud & DevOps' },
  { icon: Bot, label: 'Automatización' },
  { icon: Compass, label: 'Consultoría' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.5, ease: 'easeOut' as const },
  }),
}

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="inicio"
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: 'min(86vh, 720px)',
        paddingTop: 'clamp(100px, 12vw, 140px)',
        paddingBottom: 'clamp(44px, 5vw, 72px)',
      }}
    >
      {/* Fondo — foto del equipo. Fallback: navy sólido mientras carga. */}
      <div className="absolute inset-0 bg-navy" aria-hidden="true" />
      <Image
        src="/images/cta.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={80}
        className="object-cover object-center"
      />

      {/* Velo navy — fuerte a la izquierda (legibilidad del texto), abierto a la derecha */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, color-mix(in oklab, var(--vs-navy) 94%, transparent) 0%, color-mix(in oklab, var(--vs-navy) 78%, transparent) 32%, color-mix(in oklab, var(--vs-navy) 30%, transparent) 66%, transparent 100%)',
        }}
        aria-hidden="true"
      />
      {/* Oscurecido inferior + resplandor de marca superior para profundidad */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, transparent 45%, color-mix(in oklab, var(--vs-navy) 65%, transparent) 100%), radial-gradient(70% 60% at 15% 0%, color-mix(in oklab, var(--vs-accent) 22%, transparent) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="max-w-2xl">
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 mb-5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white/80"
          >
            <span className="status-dot" />
            Ingeniería de software · Latinoamérica
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="font-bold leading-[1.08] mb-5 text-white text-balance"
            style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.4rem)' }}
          >
            Desarrollamos software empresarial que impulsa
            el <span className="text-accent-light">crecimiento</span> de tu negocio.
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-white/75 leading-relaxed max-w-xl mb-7"
            style={{ fontSize: 'clamp(1rem, 1.1vw, 1.125rem)' }}
          >
            Impulsamos la transformación digital de empresas mediante
            plataformas seguras, escalables y desarrolladas bajo estándares
            modernos de ingeniería.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollTo('#contacto')}
              className="group btn-shine flex items-center gap-2 px-5 py-3 font-semibold text-sm
                clay-btn-primary cursor-pointer"
            >
              Agenda una reunión
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>

            <button
              onClick={() => scrollTo('#proceso')}
              className="group px-5 py-3 font-semibold text-sm clay-btn-on-dark cursor-pointer"
            >
              Conoce nuestro proceso
              <span className="inline-block ml-1.5 group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          </motion.div>

          {/* Capacidades — chips compactos sobre la foto */}
          <motion.ul
            custom={4}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="flex flex-wrap gap-2.5"
          >
            {capabilities.map((c) => (
              <li
                key={c.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-3 py-1.5"
              >
                <c.icon className="w-3.5 h-3.5 text-accent-light" strokeWidth={1.75} />
                <span className="text-[13px] font-medium text-white/85">{c.label}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
