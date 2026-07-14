'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import Badge from '@/components/ui/Badge'

const stats = [
  { value: 4, suffix: '', label: 'Áreas de especialidad', isNumber: true },
  { value: 100, suffix: '%', label: 'Soluciones a la medida', isNumber: true },
  { value: 0, suffix: '', label: '24/7 monitoreo y soporte', isNumber: false, display: '24/7' },
  { value: 0, suffix: '', label: 'Humo. Solo resultados', isNumber: false, display: '0' },
]

const techLogos = ['React', 'Next.js', 'Node.js', 'Java', 'AWS', 'Docker', 'Python', 'TypeScript']
const techLogosLoop = [...techLogos, ...techLogos]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
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
      style={{ paddingTop: 'clamp(112px, 14vw, 160px)', paddingBottom: 'clamp(56px, 7vw, 96px)' }}
    >
      <div className="mesh-gradient" aria-hidden="true" />
      <div
        className="absolute inset-0 grid-texture opacity-60"
        style={{ maskImage: 'linear-gradient(to bottom, black, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="accent" className="mb-6">Empresa de tecnología</Badge>
        </motion.div>

        <motion.h1
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="font-bold leading-[1.1] mb-6 text-foreground text-center text-balance"
          style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
        >
          Más que tecnología, soluciones que impulsan su{' '}
          <span className="text-brand">crecimiento</span>.
        </motion.h1>

        <motion.div
          custom={1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="flex justify-center mb-9"
        >
          <p
            className="text-subtle leading-relaxed max-w-xl text-center"
            style={{ fontSize: 'clamp(1rem, 1.15vw, 1.125rem)' }}
          >
            Software a medida, infraestructura cloud y automatización para
            impulsar el crecimiento de su empresa.
          </p>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollTo('#contacto')}
            className="group flex items-center gap-2 px-5 py-3 rounded-md font-semibold text-white text-sm
              brand-gradient btn-glow-accent hover:brightness-110
              transition-all duration-150 cursor-pointer"
          >
            Agenda una llamada
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>

          <button
            onClick={() => scrollTo('#servicios')}
            className="px-5 py-3 rounded-md font-semibold text-sm
              text-foreground border border-line hover:border-line-strong
              bg-surface hover:bg-surface-2 transition-colors duration-150 cursor-pointer"
          >
            Explora los servicios
          </button>
        </motion.div>

        {/* Stats — panel agrupado con divisores, no números sueltos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="vs-panel rounded-xl mb-16 grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-line overflow-hidden"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="px-4 py-6 text-center">
              <div className="font-bold text-brand tracking-tight tabular-nums" style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)' }}>
                {stat.isNumber ? (
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                ) : (
                  stat.display
                )}
              </div>
              <p className="text-xs text-faint mt-1.5 leading-snug">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Tech logos — cinta con scroll infinito */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pt-10 border-t border-line"
        >
          <p className="text-center text-[11px] text-faint tracking-[0.2em] uppercase mb-6">
            Construimos con lo mejor del ecosistema tecnológico
          </p>
          <div
            className="marquee-viewport relative overflow-hidden"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}
          >
            <div className="marquee-track gap-12 pr-12">
              {techLogosLoop.map((tech, i) => (
                <span
                  key={`${tech}-${i}`}
                  className="flex items-center gap-2 text-[15px] font-semibold text-faint hover:text-foreground transition-colors cursor-default tracking-tight whitespace-nowrap"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
