'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Code2, Cloud, Bot, Compass } from 'lucide-react'
import HeroTechBackdrop from '@/components/sections/HeroTechBackdrop'

const floatCards = [
  {
    icon: Code2,
    label: 'Software a medida',
    tag: 'Next.js · React Native',
    accent: 'accent',
    pos: { top: '2%', left: '0%' },
    rotate: -4,
    z: 30,
    duration: 5.4,
    delay: 0,
  },
  {
    icon: Cloud,
    label: 'Cloud & DevOps',
    tag: 'AWS · Docker · K8s',
    accent: 'navy',
    pos: { top: '0%', right: '2%' },
    rotate: 5,
    z: 20,
    duration: 6.2,
    delay: 0.5,
  },
  {
    icon: Bot,
    label: 'Automatización',
    tag: 'Integraciones · RPA',
    accent: 'accent-2',
    pos: { bottom: '10%', left: '14%' },
    rotate: 3,
    z: 25,
    duration: 5.8,
    delay: 1,
  },
  {
    icon: Compass,
    label: 'Consultoría',
    tag: 'Arquitectura · Roadmap',
    accent: 'success',
    pos: { bottom: '2%', right: '8%' },
    rotate: -6,
    z: 15,
    duration: 5,
    delay: 0.3,
  },
] as const

const accentClasses = {
  accent: { bg: 'bg-accent/12', border: 'border-accent/20', icon: 'text-accent' },
  navy: { bg: 'bg-navy/12', border: 'border-navy/20', icon: 'text-navy-2' },
  'accent-2': { bg: 'bg-accent-2/12', border: 'border-accent-2/20', icon: 'text-accent-2' },
  success: { bg: 'bg-success/12', border: 'border-success/20', icon: 'text-success' },
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: 'easeOut' as const },
  }),
}

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-background"
      style={{ paddingTop: 'clamp(120px, 15vw, 168px)', paddingBottom: 'clamp(64px, 7vw, 100px)' }}
    >
      <div className="mesh-gradient" aria-hidden="true" />
      <HeroTechBackdrop />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-10 items-center">
          {/* Columna de texto — izquierda, editorial */}
          <div>
            <motion.h1
              custom={0}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="font-bold leading-[1.08] mb-6 text-foreground text-balance"
              style={{ fontSize: 'clamp(2.5rem, 4.6vw, 3.75rem)' }}
            >
              Desarrollamos software empresarial que impulsa<br />
              el <span className="text-brand">crecimiento</span> de tu negocio.
            </motion.h1>

            <motion.p
              custom={1}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-subtle leading-relaxed max-w-lg mb-9"
              style={{ fontSize: 'clamp(1rem, 1.1vw, 1.125rem)' }}
            >
              Impulsamos la transformación digital de empresas mediante
              plataformas seguras, escalables y desarrolladas bajo estándares
              modernos de ingeniería.
            </motion.p>

            <motion.div
              custom={2}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3"
            >
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollTo('#contacto')}
                className="group flex items-center gap-2 px-5 py-3 rounded-md font-semibold text-white text-sm
                  brand-gradient btn-glow-accent hover:brightness-110
                  transition-all duration-150 cursor-pointer"
              >
                Agenda una reunión
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>

              <button
                onClick={() => scrollTo('#proceso')}
                className="group px-5 py-3 rounded-md font-semibold text-sm
                  text-foreground border border-line hover:border-line-strong
                  bg-surface hover:bg-surface-2 transition-colors duration-150 cursor-pointer"
              >
                Conoce nuestro proceso
                <span className="inline-block ml-1.5 group-hover:translate-x-0.5 transition-transform">→</span>
              </button>
            </motion.div>
          </div>

          {/* Columna visual — tarjetas flotantes de las 4 especialidades, con leve movimiento */}
          <div
            className="relative"
            style={{ minHeight: 'clamp(320px, 30vw, 420px)' }}
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 rounded-full opacity-25"
              style={{
                background: 'radial-gradient(circle, var(--vs-accent) 0%, transparent 70%)',
                filter: 'blur(56px)',
              }}
            />

            {floatCards.map((card, i) => {
              const a = accentClasses[card.accent]
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 24, rotate: card.rotate }}
                  animate={{ opacity: 1, y: 0, rotate: card.rotate }}
                  transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
                  className="absolute w-[150px] sm:w-[180px] lg:w-[190px]"
                  style={{ ...card.pos, zIndex: card.z }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: card.duration,
                      delay: card.delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="vs-panel-elevated rounded-xl px-4 py-3.5"
                  >
                    <span className={`w-8 h-8 rounded-md ${a.bg} border ${a.border} flex items-center justify-center mb-2.5`}>
                      <card.icon className={`w-4 h-4 ${a.icon}`} strokeWidth={1.75} />
                    </span>
                    <p className="text-[13px] font-semibold text-foreground leading-tight mb-0.5">
                      {card.label}
                    </p>
                    <p className="font-mono text-[10px] text-faint leading-snug">{card.tag}</p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
