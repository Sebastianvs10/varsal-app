'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, TrendingUp, Users, Code2, Award } from 'lucide-react'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const stats = [
  { icon: Code2, value: 80, suffix: '+', label: 'Proyectos entregados' },
  { icon: Users, value: 50, suffix: '+', label: 'Clientes activos' },
  { icon: TrendingUp, value: 98, suffix: '%', label: 'Satisfacción del cliente' },
  { icon: Award, value: 6, suffix: '+', label: 'Años de experiencia' },
]

const techLogos = ['React', 'Next.js', 'Node.js', 'Java', 'AWS', 'Docker', 'Python', 'TypeScript']

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
}

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ paddingTop: '96px', paddingBottom: '48px' }}
    >
      {/* Background */}
      <div className="absolute inset-0 dots-bg opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-transparent to-[#0F172A]" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue-600/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[30%] right-[15%] w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-144px)]">
          {/* Left */}
          <div className="flex flex-col justify-center py-8 lg:py-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex w-fit items-center gap-2 px-4 py-1.5 rounded-full
                bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] font-medium
                uppercase tracking-[0.12em] mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Soluciones Tecnológicas Empresariales
            </motion.div>

            {/* Title */}
            <motion.h1
              custom={0}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-[2.6rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold leading-[1.08] tracking-tight mb-6"
            >
              Transformamos{' '}
              <span className="grad-text">ideas</span>
              {' '}en
              <br className="hidden sm:block" />
              {' '}soluciones{' '}
              <span className="grad-text">digitales</span>
              <br className="hidden sm:block" />
              {' '}escalables.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={1}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-base sm:text-lg text-slate-400 leading-relaxed mb-8 max-w-lg"
            >
              Desarrollamos sistemas web empresariales, software a medida,
              plataformas SaaS y soluciones cloud que impulsan la transformación
              digital de su organización.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={2}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="flex flex-wrap gap-3 mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 32px rgba(37,99,235,0.5)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('#contacto')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm
                  bg-gradient-to-r from-blue-600 to-cyan-500
                  shadow-[0_0_20px_rgba(37,99,235,0.4)]
                  transition-all duration-200 cursor-pointer"
              >
                Solicitar cotización
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('#servicios')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                  text-slate-200 border border-white/10 hover:border-white/25
                  bg-white/5 hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                Ver servicios
              </motion.button>
            </motion.div>

            {/* Trust row */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="flex flex-col gap-3"
            >
              <span className="text-[11px] text-slate-500 uppercase tracking-widest">Stack tecnológico</span>
              <div className="flex flex-wrap gap-2">
                {techLogos.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08]
                      text-xs text-slate-400 hover:text-slate-200 hover:bg-white/[0.09]
                      transition-all duration-150 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="relative hidden lg:flex items-center justify-center py-8"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-500/10 rounded-2xl blur-2xl" />

            {/* Mockup card */}
            <div className="relative w-full glass rounded-2xl p-1 shadow-[0_8px_48px_rgba(0,0,0,0.6)]">
              {/* Titlebar */}
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-xs text-slate-500 font-mono">VARSAL Dashboard — Enterprise v2.5</span>
              </div>

              <div className="p-6">
                {/* Top KPI row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Ingresos', value: '$4.2M', trend: '+18%', color: 'text-emerald-400' },
                    { label: 'Usuarios', value: '12,540', trend: '+9%', color: 'text-blue-400' },
                    { label: 'Uptime', value: '99.9%', trend: 'Estable', color: 'text-cyan-400' },
                  ].map((kpi) => (
                    <div key={kpi.label} className="bg-white/4 rounded-xl p-3 border border-white/5">
                      <p className="text-xs text-slate-500 mb-1">{kpi.label}</p>
                      <p className="text-lg font-bold text-white">{kpi.value}</p>
                      <p className={`text-xs ${kpi.color}`}>{kpi.trend}</p>
                    </div>
                  ))}
                </div>

                {/* Chart mockup */}
                <div className="bg-white/4 rounded-xl p-4 border border-white/5 mb-4">
                  <div className="flex items-end justify-between gap-1 h-20">
                    {[35, 55, 42, 78, 60, 88, 72, 95, 68, 90, 85, 100].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.5, ease: 'easeOut' }}
                        className="flex-1 rounded-t-sm"
                        style={{
                          background: `linear-gradient(to top, #2563EB, #06B6D4)`,
                          opacity: 0.5 + i * 0.04,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Rendimiento mensual 2024</p>
                </div>

                {/* Recent activity */}
                <div className="space-y-2">
                  {[
                    { label: 'API Gateway', status: 'Activo', dot: 'bg-emerald-400' },
                    { label: 'Base de datos', status: 'Sincronizado', dot: 'bg-blue-400' },
                    { label: 'Facturación', status: '243 procesadas', dot: 'bg-cyan-400' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                        <span className="text-xs text-slate-300">{item.label}</span>
                      </div>
                      <span className="text-xs text-slate-500">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 glass rounded-xl px-3 py-2 shadow-lg border border-white/10"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-200 font-medium">Sistema activo 24/7</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2 shadow-lg border border-white/10"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🚀</span>
                <div>
                  <p className="text-xs font-semibold text-white">Deploy exitoso</p>
                  <p className="text-[10px] text-slate-400">hace 2 minutos</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass rounded-xl p-5 text-center border border-white/5 hover:border-blue-500/20 transition-all duration-300 group"
            >
              <stat.icon className="w-5 h-5 text-blue-400 mx-auto mb-3 group-hover:text-cyan-400 transition-colors" />
              <div className="text-3xl font-bold mb-1">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  className="grad-text"
                />
              </div>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500"
      >
        <span className="text-xs tracking-wider uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
      </motion.div>
    </section>
  )
}
