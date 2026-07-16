'use client'

import { motion } from 'framer-motion'
import { Code2, Cloud, Bot, Compass, ArrowRight } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

const services = [
  {
    icon: Code2,
    number: '01',
    category: 'Desarrollo de Software',
    title: 'Software Empresarial',
    desc: 'Aplicaciones web y móviles desarrolladas a la medida de tu operación.',
    tagsLabel: 'Tecnologías',
    tags: ['React', 'Next.js', '.NET', 'Java'],
    accent: 'accent',
    featured: true,
  },
  {
    icon: Cloud,
    number: '02',
    category: 'Cloud',
    title: 'Cloud & DevOps',
    desc: 'Infraestructura escalable, despliegues automatizados y alta disponibilidad.',
    tagsLabel: 'Tecnologías',
    tags: ['AWS', 'Docker', 'Kubernetes'],
    accent: 'navy',
    featured: false,
  },
  {
    icon: Bot,
    number: '03',
    category: 'Automatización',
    title: 'Automatización Inteligente',
    desc: 'Digitalizamos procesos para reducir tiempos, costos y errores operativos.',
    tagsLabel: 'Tecnologías',
    tags: ['Integraciones', 'APIs', 'RPA'],
    accent: 'accent-2',
    featured: false,
  },
  {
    icon: Compass,
    number: '04',
    category: 'Consultoría',
    title: 'Arquitectura Tecnológica',
    desc: 'Definimos la estrategia tecnológica para construir soluciones sostenibles y escalables.',
    tagsLabel: 'Servicios',
    tags: ['Arquitectura', 'Roadmap', 'Auditoría'],
    accent: 'success',
    featured: true,
  },
] as const

const accentClasses = {
  accent: { cssVar: '--vs-accent', bar: 'bg-accent', bg: 'bg-accent/12', border: 'border-accent/20', icon: 'text-accent', link: 'text-accent hover:text-accent-light' },
  navy: { cssVar: '--vs-navy-2', bar: 'bg-navy-2', bg: 'bg-navy/12', border: 'border-navy/20', icon: 'text-navy-2', link: 'text-navy hover:text-navy-2' },
  'accent-2': { cssVar: '--vs-accent-2', bar: 'bg-accent-2', bg: 'bg-accent-2/12', border: 'border-accent-2/20', icon: 'text-accent-2', link: 'text-accent-2 hover:brightness-110' },
  success: { cssVar: '--vs-success', bar: 'bg-success', bg: 'bg-success/12', border: 'border-success/20', icon: 'text-success', link: 'text-success hover:brightness-110' },
}

export default function ServicesSection() {
  return (
    <SectionWrapper id="servicios" className="bg-bg-alt">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <SectionEyebrow index="01" label="Qué hacemos" />
            <h2 className="w-full text-4xl lg:text-5xl font-bold mb-5 text-foreground text-balance">
              Tecnología estratégica para construir, escalar y optimizar{' '}
              <span className="text-brand">tu empresa</span>.
            </h2>
            <p className="max-w-2xl text-subtle text-lg leading-relaxed">
              Reunimos desarrollo de software, arquitectura cloud, automatización
              y consultoría tecnológica en un solo equipo de ingeniería.
            </p>
          </div>

          {/* Foto editorial del equipo. Fallback: degradado navy. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="photo-frame photo-duotone rounded-2xl border border-line shadow-(--vs-shadow-lg) aspect-4/3"
            aria-hidden="true"
          >
            <div
              className="photo-media"
              style={{ backgroundImage: "url('/images/servicios.png')" }}
            />
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                className={`group relative bg-surface rounded-xl p-7 border border-line shadow-[var(--vs-shadow-sm)] hover:border-line-strong hover:shadow-[var(--vs-shadow-md)] transition-all duration-200 overflow-hidden ${
                  svc.featured ? 'lg:col-span-2' : ''
                }`}
              >
                <span
                  className={`absolute top-0 left-0 h-[3px] w-full ${a.bar} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out`}
                />

                <div className="flex items-start justify-between mb-5">
                  <span
                    className={`relative w-12 h-12 rounded-2xl border ${a.border} flex items-center justify-center shadow-[var(--vs-shadow-sm)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-[1.04]`}
                    style={{
                      background: `linear-gradient(155deg, color-mix(in oklab, var(${a.cssVar}) 20%, var(--vs-surface)) 0%, color-mix(in oklab, var(${a.cssVar}) 6%, var(--vs-surface)) 100%)`,
                    }}
                  >
                    <span
                      className="pointer-events-none absolute inset-0 rounded-2xl"
                      style={{
                        boxShadow: `inset 0 1px 0 color-mix(in oklab, var(${a.cssVar}) 30%, transparent)`,
                      }}
                    />
                    <svc.icon className={`w-[21px] h-[21px] ${a.icon} relative z-10`} strokeWidth={1.6} />
                  </span>
                  <span className="index-number text-3xl leading-none select-none">{svc.number}</span>
                </div>

                <p className={`font-mono text-[11px] uppercase tracking-wide mb-1.5 ${a.icon}`}>{svc.category}</p>
                <h3 className="font-bold text-lg mb-2 text-foreground">{svc.title}</h3>
                <p className="text-sm text-subtle mb-5 leading-relaxed max-w-md">{svc.desc}</p>

                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-faint mb-1.5">{svc.tagsLabel}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {svc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] uppercase tracking-wide text-faint bg-surface-2 border border-line rounded-full px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`flex items-center gap-1 text-xs font-semibold transition-colors cursor-pointer shrink-0 ${a.link}`}
                    aria-label={`Consultar sobre ${svc.title}`}
                  >
                    Consultar
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
