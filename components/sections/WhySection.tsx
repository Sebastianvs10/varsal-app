'use client'

import { motion } from 'framer-motion'
import { Check, Quote } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Badge from '@/components/ui/Badge'

const reasons = [
  'Un solo aliado para desarrollo, cloud y estrategia.',
  'Hablamos claro: le decimos qué conviene y qué no.',
  'Entregas por fases con resultados medibles.',
  'Tecnología moderna y mantenible, sin ataduras.',
]

export default function WhySection() {
  return (
    <SectionWrapper id="nosotros" className="bg-bg-alt">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="accent" className="mb-4">Por qué VARSAL</Badge>
          <h2 className="text-4xl font-bold mb-5 text-foreground leading-[1.15]">
            Un aliado tecnológico, <span className="text-brand">no un proveedor más</span>
          </h2>
          <p className="text-subtle text-lg mb-8 leading-relaxed">
            No vendemos tecnología por vender. Nos sentamos de su lado de la
            mesa para resolver el problema real de su negocio.
          </p>

          <ul className="space-y-4">
            {reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-accent" strokeWidth={3} />
                </span>
                <span className="text-sm text-foreground/90 leading-relaxed">{reason}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative overflow-hidden navy-gradient rounded-lg p-8 lg:p-10 shadow-[var(--vs-shadow-lg)]"
        >
          <div className="absolute inset-0 grid-texture opacity-[0.06]" />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(70% 100% at 100% 0%, color-mix(in oklab, var(--vs-accent) 25%, transparent) 0%, transparent 70%)' }}
          />

          <div className="relative z-10">
            <Quote className="w-9 h-9 text-white/30 mb-5" strokeWidth={1.5} />
            <p className="text-lg lg:text-xl text-white leading-relaxed font-medium mb-6">
              &ldquo;La tecnología no es un fin en sí misma: es una herramienta
              poderosa para transformar realidades y hacer crecer a las
              personas y los negocios.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-white/30" />
              <p className="text-sm text-white/60">Filosofía de VARSAL Systems</p>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
