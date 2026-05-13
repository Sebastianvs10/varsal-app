'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Badge from '@/components/ui/Badge'

const products = [
  {
    name: 'VARSAL ERP',
    tag: 'Gestión Empresarial',
    desc: 'Sistema ERP multi-módulo diseñado para medianas y grandes empresas. Centraliza operaciones, finanzas, RR.HH. y logística en una sola plataforma.',
    features: ['Contabilidad integrada', 'Gestión de inventarios', 'Nómina y RR.HH.', 'Reportería avanzada', 'Multi-sede y multi-empresa'],
    tech: ['React', 'Java', 'PostgreSQL', 'AWS'],
    accent: 'from-blue-600 to-blue-800',
    badge: 'Más popular',
    screen: {
      title: 'ERP Dashboard',
      metrics: [
        { label: 'Ventas del mes', value: '$128.4M', change: '+12%' },
        { label: 'Órdenes', value: '3,842', change: '+8%' },
        { label: 'Inventario', value: '98.2%', change: 'Stock OK' },
      ]
    }
  },
  {
    name: 'VARSAL CRM',
    tag: 'Gestión de Clientes',
    desc: 'CRM inteligente para gestionar oportunidades, pipeline de ventas, clientes y postventa con automatizaciones incorporadas.',
    features: ['Pipeline visual', 'Automatización de ventas', 'Email marketing integrado', 'Analítica de clientes', 'App móvil'],
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Docker'],
    accent: 'from-violet-600 to-violet-800',
    screen: {
      title: 'CRM Pipeline',
      metrics: [
        { label: 'Oportunidades', value: '247', change: '+15%' },
        { label: 'Tasa cierre', value: '34%', change: '+4%' },
        { label: 'Valor pipeline', value: '$4.2M', change: 'Activo' },
      ]
    }
  },
  {
    name: 'VARSAL SaaS Platform',
    tag: 'Plataforma Multi-Tenant',
    desc: 'Infraestructura SaaS lista para escalar con multi-tenancy, facturación automática, onboarding y panel de administración.',
    features: ['Multi-tenancy nativo', 'Facturación automática', 'Panel de admin', 'API-first', 'Alta disponibilidad'],
    tech: ['Next.js', 'Python', 'PostgreSQL', 'Kubernetes'],
    accent: 'from-cyan-600 to-cyan-800',
    screen: {
      title: 'SaaS Admin',
      metrics: [
        { label: 'Tenants activos', value: '512', change: '+23%' },
        { label: 'MRR', value: '$89K', change: '+18%' },
        { label: 'Uptime', value: '99.98%', change: 'Estable' },
      ]
    }
  },
]

function MockupScreen({ screen }: { screen: typeof products[0]['screen'] }) {
  return (
    <div className="glass rounded-xl overflow-hidden border border-white/5">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-white/3 border-b border-white/5">
        <span className="w-2 h-2 rounded-full bg-red-400/60" />
        <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
        <span className="w-2 h-2 rounded-full bg-emerald-400/60" />
        <span className="ml-2 text-[10px] text-slate-500">{screen.title}</span>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {screen.metrics.map((m) => (
            <div key={m.label} className="bg-white/4 rounded-lg p-2.5 border border-white/5">
              <p className="text-[9px] text-slate-500 mb-0.5">{m.label}</p>
              <p className="text-sm font-bold text-white">{m.value}</p>
              <p className="text-[9px] text-emerald-400">{m.change}</p>
            </div>
          ))}
        </div>
        <div className="bg-white/4 rounded-lg p-3 border border-white/5">
          <div className="flex items-end gap-1 h-12">
            {[40, 65, 48, 80, 55, 90, 72, 88, 60, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-blue-600/60 to-cyan-400/40"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsSection() {
  return (
    <SectionWrapper id="productos" glow>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="blue" className="mb-4">Productos</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5">
            Soluciones listas para{' '}
            <span className="grad-text">implementar</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Productos enterprise desarrollados con las mejores prácticas del
            mercado, listos para escalar con su negocio.
          </p>
        </div>

        <div className="space-y-10">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="glass rounded-2xl border border-white/5 hover:border-white/10 overflow-hidden transition-all duration-300"
            >
              <div className={`grid lg:grid-cols-2 gap-0 ${i % 2 !== 0 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                {/* Info */}
                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${product.accent} bg-opacity-20`}>
                      {product.tag}
                    </span>
                    {product.badge && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20">
                        ⭐ {product.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-3xl font-bold mb-3">{product.name}</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">{product.desc}</p>

                  <ul className="space-y-2 mb-6">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {product.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-md text-xs bg-white/5 border border-white/8 text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                      text-white border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10
                      transition-all duration-200 cursor-pointer"
                  >
                    Ver más detalles <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Mockup */}
                <div className="flex items-center justify-center p-8 bg-white/2 border-t lg:border-t-0 lg:border-l border-white/5">
                  <div className="w-full max-w-sm">
                    <MockupScreen screen={product.screen} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
