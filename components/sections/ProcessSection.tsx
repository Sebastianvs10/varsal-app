'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

const steps = [
  {
    number: '01',
    title: 'Descubrimiento',
    desc: 'Analizamos tus procesos, objetivos y desafíos para comprender el contexto del negocio e identificar las oportunidades con mayor impacto.',
  },
  {
    number: '02',
    title: 'Estrategia y Arquitectura',
    desc: 'Diseñamos la solución tecnológica, definimos la arquitectura, el alcance, el cronograma y un plan de trabajo alineado con las prioridades de tu empresa.',
  },
  {
    number: '03',
    title: 'Desarrollo e Implementación',
    desc: 'Construimos la solución mediante entregas iterativas, con comunicación continua, revisiones periódicas y altos estándares de calidad en cada fase.',
  },
  {
    number: '04',
    title: 'Optimización y Evolución',
    desc: 'Después del lanzamiento, monitoreamos el desempeño, brindamos soporte y evolucionamos la plataforma para acompañar el crecimiento de tu negocio.',
  },
]

export default function ProcessSection() {
  return (
    <SectionWrapper id="proceso" className="bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 flex flex-col items-center text-center">
          <SectionEyebrow index="02" label="Cómo trabajamos" />
          <h2 className="w-full text-4xl lg:text-5xl font-bold mb-5 text-foreground text-balance">
            Transformamos <span className="text-brand">ideas</span> en soluciones tecnológicas con un proceso probado.
          </h2>
          <p className="max-w-2xl text-subtle text-lg leading-relaxed">
            En cada etapa conocerás el estado del proyecto, los siguientes pasos
            y los entregables definidos. Trabajamos con una metodología ágil,
            comunicación constante y total transparencia desde el primer día.
          </p>
        </div>

        {/* Desktop: timeline horizontal conectada */}
        <div className="hidden lg:block relative">
          <div className="absolute top-5 left-0 right-0 h-px timeline-line" aria-hidden="true" />
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="relative"
              >
                <div className="relative z-10 w-10 h-10 rounded-full bg-background border-2 border-accent flex items-center justify-center mb-6">
                  <span className="font-mono font-bold text-xs text-accent tabular-nums">{step.number}</span>
                </div>
                <h3 className="font-bold text-base mb-2 text-foreground">{step.title}</h3>
                <p className="text-sm text-subtle leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet: timeline vertical conectada */}
        <div className="lg:hidden relative pl-9">
          <div className="absolute top-2 bottom-2 left-[15px] w-px bg-line-strong" aria-hidden="true" />
          <div className="space-y-9">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="relative"
              >
                <div className="absolute -left-9 top-0 w-8 h-8 rounded-full bg-background border-2 border-accent flex items-center justify-center">
                  <span className="font-mono font-bold text-[11px] text-accent tabular-nums">{step.number}</span>
                </div>
                <h3 className="font-bold text-base mb-1.5 text-foreground">{step.title}</h3>
                <p className="text-sm text-subtle leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
