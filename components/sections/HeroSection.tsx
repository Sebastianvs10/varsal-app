'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, TrendingUp, Users, Code2, ShieldCheck, CheckCircle2 } from 'lucide-react'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const stats = [
  { icon: Code2, value: 80, suffix: '+', label: 'Proyectos entregados' },
  { icon: Users, value: 50, suffix: '+', label: 'Clientes activos' },
  { icon: TrendingUp, value: 98, suffix: '%', label: 'Satisfacción del cliente' },
  { icon: ShieldCheck, value: 99, suffix: '.9%', label: 'Uptime garantizado' },
]

const techLogos = ['React', 'Next.js', 'Node.js', 'Java', 'AWS', 'Docker', 'Python', 'TypeScript']

const trustBullets = [
  'Sin compromiso inicial',
  'Respuesta en 24 horas',
  'Consultoría sin costo',
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: 'easeOut' as const },
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
      style={{ paddingTop: '112px', paddingBottom: '64px' }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 dots-bg opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220] via-[#0B1220]/60 to-[#0B1220]" />
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-blue-600/[0.08] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[35%] right-[10%] w-[400px] h-[400px] bg-cyan-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow mb-7"
            >
              Soluciones tecnológicas empresariales
            </motion.div>

            {/* Title */}
            <motion.h1
              custom={0}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] xl:text-[3.75rem] font-bold leading-[1.05] mb-6 text-slate-50"
            >
              Transformamos{' '}
              <span className="grad-text">ideas</span> en
              <br className="hidden sm:block" />
              <span className="block sm:inline"> soluciones </span>
              <span className="grad-text">digitales</span>
              <br className="hidden sm:block" />
              <span className="block sm:inline"> escalables.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={1}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-base sm:text-[17px] text-slate-400 leading-[1.65] mb-8 max-w-xl"
            >
              Diseñamos y desarrollamos sistemas web empresariales, software a medida,
              plataformas SaaS y arquitecturas cloud que impulsan la transformación
              digital de organizaciones líderes.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={2}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="flex flex-wrap gap-3 mb-8"
            >
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollTo('#contacto')}
                className="group flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white text-sm
                  bg-gradient-to-r from-blue-600 to-blue-500
                  hover:from-blue-500 hover:to-blue-400
                  shadow-[0_8px_24px_-8px_rgba(37,99,235,0.6)]
                  hover:shadow-[0_12px_32px_-8px_rgba(37,99,235,0.8)]
                  transition-all duration-200 cursor-pointer"
              >
                Solicitar cotización
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollTo('#servicios')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm
                  text-slate-200 border border-white/[0.12] hover:border-white/25
                  bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Ver servicios
              </motion.button>
            </motion.div>

            {/* Trust bullets */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {trustBullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-1.5 text-xs text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/80" />
                  {bullet}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-6 relative hidden lg:flex items-center justify-center"
          >
            {/* Glow */}
            <div className="absolute inset-8 bg-gradient-to-br from-blue-600/15 to-cyan-500/8 rounded-3xl blur-3xl pointer-events-none" />

            {/* Mockup card */}
            <div className="relative w-full max-w-xl glass-strong rounded-xl overflow-hidden shadow-[0_24px_64px_-12px_rgba(0,0,0,0.7)]">
              {/* Titlebar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                <span className="ml-3 text-[11px] text-slate-500 font-mono tracking-tight">
                  varsal.systems — Enterprise Dashboard
                </span>
                <span className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-400/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  live
                </span>
              </div>

              <div className="p-5 space-y-4">
                {/* KPI row */}
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { label: 'INGRESOS', value: '$4.28M', trend: '+18.4%', bar: 'bg-emerald-400', text: 'text-emerald-400' },
                    { label: 'USUARIOS', value: '12,540', trend: '+9.2%', bar: 'bg-blue-400', text: 'text-blue-400' },
                    { label: 'UPTIME', value: '99.98%', trend: 'Estable', bar: 'bg-cyan-400', text: 'text-cyan-400' },
                  ].map((kpi) => (
                    <div
                      key={kpi.label}
                      className="relative bg-white/[0.03] rounded-lg p-3 border border-white/[0.06] overflow-hidden"
                    >
                      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${kpi.bar}`} />
                      <p className="text-[9px] text-slate-500 tracking-widest font-medium mb-1">{kpi.label}</p>
                      <p className="text-base font-bold text-white tabular-nums">{kpi.value}</p>
                      <p className={`text-[10px] mt-0.5 ${kpi.text} tabular-nums`}>{kpi.trend}</p>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.06]">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[11px] text-slate-300 font-medium">Rendimiento mensual</p>
                    <p className="text-[10px] text-slate-500">Últimos 12 meses</p>
                  </div>
                  <div className="flex items-end justify-between gap-1 h-16">
                    {[35, 55, 42, 78, 60, 88, 72, 95, 68, 90, 85, 100].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.6 + i * 0.04, duration: 0.5, ease: 'easeOut' }}
                        className="flex-1 rounded-t-[2px]"
                        style={{
                          background: 'linear-gradient(to top, rgba(37,99,235,0.9), rgba(6,182,212,0.6))',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Activity */}
                <div className="space-y-1.5">
                  <p className="text-[10px] text-slate-500 tracking-widest font-medium mb-2">SERVICIOS ACTIVOS</p>
                  {[
                    { label: 'API Gateway', status: 'Operativo', dot: 'bg-emerald-400' },
                    { label: 'Base de datos PostgreSQL', status: 'Sincronizado', dot: 'bg-blue-400' },
                    { label: 'Procesamiento de facturación', status: '243 procesadas', dot: 'bg-cyan-400' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                        <span className="text-[11px] text-slate-300">{item.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
              className="absolute -top-3 -right-3 glass-strong rounded-lg px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <div>
                  <p className="text-[11px] font-semibold text-white leading-tight">SOC 2 Compliant</p>
                  <p className="text-[9px] text-slate-400 leading-tight">Seguridad enterprise</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut', delay: 0.4 }}
              className="absolute -bottom-3 -left-3 glass-strong rounded-lg px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-white leading-tight">+12.4% MoM</p>
                  <p className="text-[9px] text-slate-400 leading-tight">Crecimiento</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Tech logos row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16 lg:mt-20 pt-8 border-t border-white/[0.06]"
        >
          <p className="text-center text-[11px] text-slate-500 tracking-widest uppercase mb-5">
            Construimos con tecnologías de clase mundial
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-70">
            {techLogos.map((tech) => (
              <span
                key={tech}
                className="text-sm font-semibold text-slate-400 hover:text-slate-200 transition-colors cursor-default tracking-tight"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-xl overflow-hidden border border-white/[0.06]"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group bg-[#0B1220] p-6 hover:bg-white/[0.02] transition-colors duration-300"
            >
              <stat.icon className="w-4 h-4 text-blue-400 mb-3 group-hover:text-cyan-400 transition-colors" />
              <div className="text-3xl lg:text-4xl font-bold mb-1 tracking-tight">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  className="grad-text tabular-nums"
                />
              </div>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1.5 text-slate-600"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-slate-600 to-transparent" />
      </motion.div>
    </section>
  )
}
