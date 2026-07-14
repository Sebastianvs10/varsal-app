'use client'

import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Badge from '@/components/ui/Badge'

const steps = [
  {
    number: '01',
    title: 'Diagnóstico',
    desc: 'Escuchamos su negocio y detectamos qué le frena y qué genera más valor. Sin costo y sin compromiso.',
  },
  {
    number: '02',
    title: 'Estrategia',
    desc: 'Armamos una hoja de ruta priorizada por impacto y esfuerzo, con alcance, tiempos y presupuesto claros.',
  },
  {
    number: '03',
    title: 'Construcción',
    desc: 'Ejecutamos por fases y entregamos valor en semanas, no en años, con comunicación constante.',
  },
  {
    number: '04',
    title: 'Evolución',
    desc: 'Medimos resultados, damos soporte y hacemos crecer la solución con usted. No entregamos y desaparecemos.',
  },
]

export default function ProcessSection() {
  return (
    <SectionWrapper id="proceso" className="bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="accent" className="mb-4">Cómo trabajamos</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5 text-foreground text-balance">
            Un proceso claro, de la idea al <span className="text-brand">resultado</span>
          </h2>
          <div className="flex justify-center">
            <p className="text-subtle text-lg max-w-xl text-center leading-relaxed">
              Un proceso simple y transparente: sabe en todo momento en qué fase
              está y qué sigue.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="relative bg-surface rounded-lg border border-line shadow-[var(--vs-shadow-sm)] p-7"
            >
              {i < steps.length - 1 && (
                <span className="hidden lg:flex absolute top-9 -right-[22px] z-10 w-6 h-6 rounded-full bg-background border border-line items-center justify-center">
                  <ChevronRight className="w-3.5 h-3.5 text-faint" />
                </span>
              )}

              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/15 border border-accent/25 text-accent font-bold text-sm tabular-nums mb-4">
                {step.number}
              </span>
              <h3 className="font-bold text-base mb-2 text-foreground">{step.title}</h3>
              <p className="text-sm text-subtle leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
