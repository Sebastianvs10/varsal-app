'use client'

import { motion } from 'framer-motion'
import { Code2, Cloud, Bot, Compass, ArrowRight } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Badge from '@/components/ui/Badge'

const services = [
  {
    icon: Code2,
    title: 'Software y apps a medida',
    desc: 'Aplicaciones web y móviles diseñadas para su operación real, no para una plantilla genérica.',
    accent: 'accent',
  },
  {
    icon: Cloud,
    title: 'Cloud e infraestructura / DevOps',
    desc: 'Infraestructura que escala sola y no se cae en el peor momento: AWS, GCP, Docker y Kubernetes.',
    accent: 'navy',
  },
  {
    icon: Bot,
    title: 'Automatización e integraciones',
    desc: 'Flujos y procesos automáticos que eliminan tareas manuales y le devuelven horas de operación.',
    accent: 'accent-2',
  },
  {
    icon: Compass,
    title: 'Consultoría y transformación digital',
    desc: 'Estrategia, arquitectura y hoja de ruta tecnológica con criterio experto, sin humo.',
    accent: 'success',
  },
] as const

const accentClasses = {
  accent: { bar: 'bg-accent', bg: 'bg-accent/15', border: 'border-accent/25', icon: 'text-accent', link: 'text-accent hover:text-accent-light' },
  navy: { bar: 'bg-navy-2', bg: 'bg-navy/15', border: 'border-navy/25', icon: 'text-navy-2', link: 'text-navy hover:text-navy-2' },
  'accent-2': { bar: 'bg-accent-2', bg: 'bg-accent-2/15', border: 'border-accent-2/25', icon: 'text-accent-2', link: 'text-accent-2 hover:brightness-110' },
  success: { bar: 'bg-success', bg: 'bg-success/15', border: 'border-success/25', icon: 'text-success', link: 'text-success hover:brightness-110' },
}

export default function ServicesSection() {
  return (
    <SectionWrapper id="servicios" className="bg-bg-alt">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="accent" className="mb-4">Qué hacemos</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5 text-foreground text-balance">
            Cuatro formas de impulsar su <span className="text-brand">negocio</span>
          </h2>
          <div className="flex justify-center">
            <p className="text-subtle text-lg max-w-xl text-center leading-relaxed">
              Desarrollo, infraestructura y estrategia: un servicio o todo el
              conjunto, con un solo aliado.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {services.map((svc, i) => {
            const a = accentClasses[svc.accent]
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: -3 }}
                className="group relative bg-surface rounded-lg p-7 border border-line shadow-[var(--vs-shadow-sm)] hover:border-line-strong hover:shadow-[var(--vs-shadow-md)] transition-all duration-200 overflow-hidden"
              >
                <span
                  className={`absolute top-0 left-0 h-[3px] w-full ${a.bar} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out`}
                />

                <div className={`w-11 h-11 rounded-md ${a.bg} border ${a.border} flex items-center justify-center mb-5`}>
                  <svc.icon className={`w-5 h-5 ${a.icon}`} />
                </div>

                <h3 className="font-bold text-lg mb-2 text-foreground">{svc.title}</h3>
                <p className="text-sm text-subtle mb-5 leading-relaxed">{svc.desc}</p>

                <button
                  onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`flex items-center gap-1 text-xs font-semibold transition-colors cursor-pointer ${a.link}`}
                >
                  Ver servicio <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
