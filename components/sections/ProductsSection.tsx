/* Sección "Productos" — SESA como prueba tangible de capacidad de ejecución de VARSAL */
/* Autor: Ing. J Sebastian Vargas S */

'use client'

import type { CSSProperties } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, Building2, FileCheck2, ShieldCheck } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

const modules = [
  'Historia clínica',
  'Facturación electrónica',
  'RIPS',
  'Glosas',
  'Agenda',
  'Farmacia',
  'Reportes',
]

const traits = [
  {
    icon: Building2,
    label: 'SaaS multi-tenant en la nube',
  },
  {
    icon: FileCheck2,
    label: 'RIPS y facturación electrónica',
  },
  {
    icon: ShieldCheck,
    label: 'Accesos por rol y trazabilidad',
  },
]

export default function ProductsSection() {
  return (
    <SectionWrapper id="productos" className="bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 flex flex-col items-center text-center">
          <SectionEyebrow index="02" label="Nuestro producto" />
          <h2 className="w-full text-4xl lg:text-5xl font-bold mb-5 text-foreground text-balance">
            No solo lo decimos: <span className="text-brand">lo construimos</span>.
          </h2>
          <p className="max-w-2xl text-subtle text-lg leading-relaxed">
            SESA es nuestra propia plataforma SaaS para el sector salud. La
            diseñamos, la desarrollamos y la operamos en producción, con el
            mismo estándar de ingeniería que aplicamos en cada proyecto.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden navy-gradient rounded-2xl p-7 lg:p-10 shadow-(--vs-shadow-lg)"
        >
          <div className="absolute inset-0 grid-texture opacity-[0.06]" aria-hidden="true" />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(65% 90% at 0% 0%, color-mix(in oklab, var(--vs-accent) 22%, transparent) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          <Image
            src="/sesa-icon.png"
            alt=""
            width={512}
            height={512}
            aria-hidden="true"
            className="pointer-events-none select-none absolute -right-16 -bottom-20 w-[320px] h-[320px] lg:w-[420px] lg:h-[420px] opacity-[0.10]"
          />

          <div className="relative z-10 grid lg:grid-cols-[0.85fr_1fr] gap-10 lg:gap-12 items-center">
            {/* Columna de marca */}
            <div className="flex flex-col items-start">
              <div className="inline-flex items-center gap-2 mb-6 font-mono text-[11px] uppercase tracking-wider text-white/60">
                <span className="status-dot" />
                Producto propio · En producción
              </div>

              <Image
                src="/logo-sesa.png"
                alt="SESA — Software de gestión clínica y facturación en salud"
                width={512}
                height={171}
                className="h-20 lg:h-24 w-auto mb-5"
              />

              <p className="text-white/70 text-sm leading-relaxed mb-7 max-w-xs">
                Software de gestión clínica y administrativa para IPS,
                clínicas y centros de salud en Colombia.
              </p>

              <a
                href="https://appsesa.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--clay-hue': 'var(--vs-navy-2)' } as CSSProperties}
                className="group inline-flex items-center gap-2 clay-btn text-navy font-semibold text-sm px-5 h-11 transition-all cursor-pointer"
                aria-label="Visitar SESA — abre en una pestaña nueva"
              >
                Visitar SESA
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Columna de detalle */}
            <div>
              <p className="text-white/80 text-sm leading-relaxed mb-5">
                Centraliza la historia clínica electrónica, la facturación y
                el cumplimiento normativo en una sola plataforma en la nube,
                con acceso diferenciado para cada equipo de trabajo.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {modules.map((m) => (
                  <span
                    key={m}
                    className="font-mono text-[11px] uppercase tracking-wide text-white/70 bg-white/8 border border-white/15 rounded-full px-3 py-1"
                  >
                    {m}
                  </span>
                ))}
              </div>

              <div className="space-y-3 pt-5 border-t border-white/10">
                {traits.map((t) => (
                  <div key={t.label} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-white/8 border border-white/15 flex items-center justify-center shrink-0">
                      <t.icon className="w-[15px] h-[15px] text-white" strokeWidth={1.75} />
                    </span>
                    <p className="text-white text-sm font-medium">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
