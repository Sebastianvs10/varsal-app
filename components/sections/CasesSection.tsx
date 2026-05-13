'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Clock, Zap, DollarSign } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Badge from '@/components/ui/Badge'

const cases = [
  {
    company: 'Clínica MedSalud',
    industry: 'Salud',
    logo: '🏥',
    challenge: 'Procesos manuales de facturación que tardaban 3 días y generaban errores constantes.',
    solution: 'Sistema de facturación electrónica automatizado integrado con el SGSS y las EPS.',
    results: [
      { icon: Clock, metric: '94%', label: 'Reducción en tiempo de facturación' },
      { icon: DollarSign, metric: '$180M', label: 'Glosas recuperadas' },
      { icon: TrendingUp, metric: '3x', label: 'Más facturas procesadas por día' },
    ],
    tech: ['Java', 'React', 'PostgreSQL', 'AWS'],
    accent: 'border-blue-500/30',
  },
  {
    company: 'LogiTrans S.A.',
    industry: 'Logística',
    logo: '🚛',
    challenge: 'Falta de trazabilidad en entregas y comunicación ineficiente entre bodegas.',
    solution: 'Plataforma de gestión logística en tiempo real con app móvil para conductores.',
    results: [
      { icon: TrendingUp, metric: '40%', label: 'Mejora en tiempo de entrega' },
      { icon: Zap, metric: '100%', label: 'Visibilidad de flota en tiempo real' },
      { icon: DollarSign, metric: '25%', label: 'Reducción de costos operativos' },
    ],
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Docker'],
    accent: 'border-emerald-500/30',
  },
  {
    company: 'FinCorp Group',
    industry: 'Finanzas',
    logo: '🏦',
    challenge: 'Procesos de conciliación bancaria manuales con alto riesgo de error y fraude.',
    solution: 'Sistema de conciliación automatizada con alertas inteligentes y dashboard ejecutivo.',
    results: [
      { icon: DollarSign, metric: '$2.4B', label: 'Transacciones conciliadas/mes' },
      { icon: Zap, metric: '99.9%', label: 'Precisión en conciliaciones' },
      { icon: Clock, metric: '70%', label: 'Reducción de tiempo operativo' },
    ],
    tech: ['Python', 'React', 'PostgreSQL', 'AWS'],
    accent: 'border-violet-500/30',
  },
]

export default function CasesSection() {
  return (
    <SectionWrapper id="casos" glow>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="blue" className="mb-4">Casos de éxito</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5">
            Resultados que hablan{' '}
            <span className="grad-text">por sí solos</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Empresas líderes confían en VARSAL Systems para resolver sus desafíos
            tecnológicos más críticos.
          </p>
        </div>

        <div className="space-y-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.company}
              initial={{ opacity: 0, x: i % 2 === 0 ? -32 : 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`glass rounded-2xl border ${c.accent} p-6 lg:p-8 hover:bg-white/3 transition-all duration-300`}
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left */}
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{c.logo}</span>
                    <div>
                      <h3 className="font-bold text-lg">{c.company}</h3>
                      <span className="text-xs text-slate-500">{c.industry}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1.5">Desafío</p>
                    <p className="text-sm text-slate-400">{c.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1.5">Solución</p>
                    <p className="text-sm text-slate-400">{c.solution}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {c.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 text-xs bg-white/5 border border-white/8 rounded text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right — Results */}
                <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
                  {c.results.map((r) => (
                    <div
                      key={r.label}
                      className="text-center p-5 bg-white/4 rounded-xl border border-white/5"
                    >
                      <r.icon className="w-5 h-5 text-blue-400 mx-auto mb-3" />
                      <div className="text-3xl font-bold grad-text mb-1">{r.metric}</div>
                      <p className="text-xs text-slate-400 leading-tight">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
