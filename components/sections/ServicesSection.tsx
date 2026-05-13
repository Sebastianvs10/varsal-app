'use client'

import { motion } from 'framer-motion'
import {
  Globe, Cpu, Settings, Plug, Cloud, Palette, BarChart3,
  Headphones, Database, ArrowRight
} from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Badge from '@/components/ui/Badge'

const services = [
  {
    icon: Globe,
    title: 'Desarrollo Web Empresarial',
    desc: 'Aplicaciones web robustas, escalables y de alto rendimiento diseñadas para operación crítica.',
    benefits: ['SPAs y PWAs', 'Arquitectura modular', 'Performance optimizado'],
    color: 'from-blue-500/20 to-blue-600/5',
    iconColor: 'text-blue-400',
    borderHover: 'hover:border-blue-500/30',
  },
  {
    icon: Cpu,
    title: 'Software a Medida',
    desc: 'Sistemas desarrollados 100% a la medida de sus procesos de negocio y requerimientos específicos.',
    benefits: ['Análisis de requerimientos', 'Metodología ágil', 'Documentación técnica'],
    color: 'from-violet-500/20 to-violet-600/5',
    iconColor: 'text-violet-400',
    borderHover: 'hover:border-violet-500/30',
  },
  {
    icon: Settings,
    title: 'Automatización de Procesos',
    desc: 'Eliminamos tareas manuales repetitivas con flujos automatizados inteligentes y RPA.',
    benefits: ['RPA y workflows', 'Reducción de errores', 'Ahorro de tiempo'],
    color: 'from-emerald-500/20 to-emerald-600/5',
    iconColor: 'text-emerald-400',
    borderHover: 'hover:border-emerald-500/30',
  },
  {
    icon: Plug,
    title: 'Integraciones API',
    desc: 'Conectamos sus sistemas existentes con plataformas externas mediante APIs robustas y seguras.',
    benefits: ['REST & GraphQL', 'Webhooks', 'Middleware empresarial'],
    color: 'from-orange-500/20 to-orange-600/5',
    iconColor: 'text-orange-400',
    borderHover: 'hover:border-orange-500/30',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    desc: 'Arquitecturas cloud-native en AWS, GCP o Azure con alta disponibilidad y escalabilidad automática.',
    benefits: ['Infraestructura como código', 'Auto-scaling', 'Disaster recovery'],
    color: 'from-cyan-500/20 to-cyan-600/5',
    iconColor: 'text-cyan-400',
    borderHover: 'hover:border-cyan-500/30',
  },
  {
    icon: Palette,
    title: 'Diseño UX/UI',
    desc: 'Interfaces que combinan estética premium con usabilidad operativa de clase mundial.',
    benefits: ['Design system', 'Prototipado', 'Testing de usuario'],
    color: 'from-pink-500/20 to-pink-600/5',
    iconColor: 'text-pink-400',
    borderHover: 'hover:border-pink-500/30',
  },
  {
    icon: BarChart3,
    title: 'Consultoría Tecnológica',
    desc: 'Asesoramos en arquitectura, stack tecnológico y hoja de ruta digital con criterio experto.',
    benefits: ['Assessment técnico', 'Roadmap digital', 'Auditoría de sistemas'],
    color: 'from-amber-500/20 to-amber-600/5',
    iconColor: 'text-amber-400',
    borderHover: 'hover:border-amber-500/30',
  },
  {
    icon: Database,
    title: 'Sistemas Administrativos',
    desc: 'ERPs, CRMs y plataformas de gestión adaptadas a la realidad de su empresa.',
    benefits: ['Multi-módulo', 'Reportería avanzada', 'Multi-sede'],
    color: 'from-indigo-500/20 to-indigo-600/5',
    iconColor: 'text-indigo-400',
    borderHover: 'hover:border-indigo-500/30',
  },
  {
    icon: Headphones,
    title: 'Soporte y Mantenimiento',
    desc: 'SLA garantizado, monitoreo proactivo y soporte técnico especializado 24/5.',
    benefits: ['SLA 99.9%', 'Monitoreo 24/7', 'Actualizaciones continuas'],
    color: 'from-teal-500/20 to-teal-600/5',
    iconColor: 'text-teal-400',
    borderHover: 'hover:border-teal-500/30',
  },
]

export default function ServicesSection() {
  return (
    <SectionWrapper id="servicios" className="bg-[#0F172A]/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="cyan" className="mb-4">Nuestros servicios</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5">
            Todo lo que necesita para{' '}
            <span className="grad-text">crecer digitalmente</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ofrecemos un portafolio completo de servicios tecnológicos para acompañar
            cada etapa de la transformación digital de su empresa.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className={`group relative glass rounded-2xl p-6 border border-white/5 ${svc.borderHover} transition-all duration-300 cursor-pointer overflow-hidden`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${svc.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />

              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svc.icon className={`w-5 h-5 ${svc.iconColor}`} />
                </div>

                <h3 className="font-bold text-lg mb-2">{svc.title}</h3>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">{svc.desc}</p>

                <ul className="space-y-1.5 mb-5">
                  {svc.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-1 text-xs font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Solicitar servicio <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
