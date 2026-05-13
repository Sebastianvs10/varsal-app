'use client'

import { motion } from 'framer-motion'
import { Code2, Server, Cloud, Database } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Badge from '@/components/ui/Badge'

type Tech = { name: string; abbr: string; tint: string }

const categories: {
  name: string
  icon: typeof Code2
  accent: string
  iconBg: string
  iconColor: string
  techs: Tech[]
}[] = [
  {
    name: 'Frontend',
    icon: Code2,
    accent: 'border-blue-500/15',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    techs: [
      { name: 'React',      abbr: 'Re', tint: 'from-sky-500/20 to-sky-600/10' },
      { name: 'Next.js',    abbr: 'Nx', tint: 'from-slate-400/20 to-slate-600/10' },
      { name: 'Vue.js',     abbr: 'Vu', tint: 'from-emerald-500/20 to-emerald-600/10' },
      { name: 'Angular',    abbr: 'An', tint: 'from-rose-500/20 to-rose-600/10' },
      { name: 'TypeScript', abbr: 'Ts', tint: 'from-blue-500/20 to-blue-600/10' },
      { name: 'Tailwind',   abbr: 'Tw', tint: 'from-cyan-500/20 to-cyan-600/10' },
    ],
  },
  {
    name: 'Backend',
    icon: Server,
    accent: 'border-emerald-500/15',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    techs: [
      { name: 'Node.js',     abbr: 'Nd', tint: 'from-emerald-500/20 to-emerald-600/10' },
      { name: 'Java',        abbr: 'Jv', tint: 'from-orange-500/20 to-orange-600/10' },
      { name: 'Python',      abbr: 'Py', tint: 'from-amber-500/20 to-amber-600/10' },
      { name: 'Laravel',     abbr: 'Lv', tint: 'from-rose-500/20 to-rose-600/10' },
      { name: 'Spring Boot', abbr: 'Sb', tint: 'from-green-500/20 to-green-600/10' },
      { name: 'FastAPI',     abbr: 'Fa', tint: 'from-teal-500/20 to-teal-600/10' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    icon: Cloud,
    accent: 'border-orange-500/15',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-400',
    techs: [
      { name: 'AWS',         abbr: 'Aw', tint: 'from-orange-500/20 to-orange-600/10' },
      { name: 'Google Cloud',abbr: 'Gc', tint: 'from-blue-500/20 to-blue-600/10' },
      { name: 'Docker',      abbr: 'Dk', tint: 'from-sky-500/20 to-sky-600/10' },
      { name: 'Kubernetes',  abbr: 'K8', tint: 'from-indigo-500/20 to-indigo-600/10' },
      { name: 'Terraform',   abbr: 'Tf', tint: 'from-violet-500/20 to-violet-600/10' },
      { name: 'GitHub CI',   abbr: 'Gh', tint: 'from-slate-400/20 to-slate-600/10' },
    ],
  },
  {
    name: 'Bases de datos',
    icon: Database,
    accent: 'border-violet-500/15',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    techs: [
      { name: 'PostgreSQL',   abbr: 'Pg', tint: 'from-sky-500/20 to-sky-600/10' },
      { name: 'MongoDB',      abbr: 'Mg', tint: 'from-emerald-500/20 to-emerald-600/10' },
      { name: 'MySQL',        abbr: 'My', tint: 'from-blue-500/20 to-blue-600/10' },
      { name: 'Redis',        abbr: 'Rd', tint: 'from-rose-500/20 to-rose-600/10' },
      { name: 'Elasticsearch',abbr: 'Es', tint: 'from-yellow-500/20 to-yellow-600/10' },
      { name: 'Supabase',     abbr: 'Sp', tint: 'from-green-500/20 to-green-600/10' },
    ],
  },
]

export default function TechSection() {
  return (
    <SectionWrapper id="tecnologias" className="bg-[#0B1220]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="cyan" className="mb-4">Stack tecnológico</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
            Tecnologías de{' '}
            <span className="grad-text">clase mundial</span>
          </h2>
          <p className="text-slate-400 text-[17px] max-w-2xl mx-auto leading-relaxed">
            Trabajamos con el ecosistema tecnológico más robusto y moderno del mercado,
            garantizando estabilidad, rendimiento y escalabilidad a largo plazo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.08, duration: 0.5 }}
              className={`glass rounded-2xl p-6 border ${cat.accent} hover:bg-white/[0.02] transition-colors duration-300`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-9 h-9 rounded-lg ${cat.iconBg} border border-white/[0.06] flex items-center justify-center`}>
                  <cat.icon className={`w-4 h-4 ${cat.iconColor}`} />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">
                  {cat.name}
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {cat.techs.map((tech, ti) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.08 + ti * 0.04, duration: 0.3 }}
                    whileHover={{ y: -2 }}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.025]
                      border border-white/[0.05] hover:border-white/[0.12]
                      transition-all duration-200 cursor-default group"
                  >
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${tech.tint} border border-white/[0.08] flex items-center justify-center font-bold text-[11px] tracking-wider text-white group-hover:scale-105 transition-transform`}>
                      {tech.abbr}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium text-center leading-tight group-hover:text-slate-200 transition-colors">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-500 text-sm mt-10"
        >
          Y muchas más tecnologías adaptadas a las necesidades específicas de cada proyecto.
        </motion.p>
      </div>
    </SectionWrapper>
  )
}
