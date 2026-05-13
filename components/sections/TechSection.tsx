'use client'

import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Badge from '@/components/ui/Badge'

const categories = [
  {
    name: 'Frontend',
    color: 'text-blue-400',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/5',
    techs: [
      { name: 'React', logo: '⚛️' },
      { name: 'Next.js', logo: '▲' },
      { name: 'Vue.js', logo: '💚' },
      { name: 'Angular', logo: '🔴' },
      { name: 'TypeScript', logo: '🔷' },
      { name: 'Tailwind', logo: '🌊' },
    ],
  },
  {
    name: 'Backend',
    color: 'text-emerald-400',
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/5',
    techs: [
      { name: 'Node.js', logo: '🟢' },
      { name: 'Java', logo: '☕' },
      { name: 'Python', logo: '🐍' },
      { name: 'Laravel', logo: '🔴' },
      { name: 'Spring Boot', logo: '🍃' },
      { name: 'FastAPI', logo: '⚡' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    color: 'text-orange-400',
    border: 'border-orange-500/20',
    bg: 'bg-orange-500/5',
    techs: [
      { name: 'AWS', logo: '☁️' },
      { name: 'GCP', logo: '🌐' },
      { name: 'Docker', logo: '🐳' },
      { name: 'Kubernetes', logo: '⚙️' },
      { name: 'Terraform', logo: '🏗️' },
      { name: 'GitHub CI', logo: '🔄' },
    ],
  },
  {
    name: 'Bases de datos',
    color: 'text-violet-400',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
    techs: [
      { name: 'PostgreSQL', logo: '🐘' },
      { name: 'MongoDB', logo: '🍃' },
      { name: 'MySQL', logo: '🐬' },
      { name: 'Redis', logo: '⚡' },
      { name: 'Elasticsearch', logo: '🔍' },
      { name: 'Supabase', logo: '⚡' },
    ],
  },
]

export default function TechSection() {
  return (
    <SectionWrapper id="tecnologias" className="bg-[#0F172A]/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="cyan" className="mb-4">Stack tecnológico</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5">
            Tecnologías de{' '}
            <span className="grad-text">clase mundial</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Trabajamos con el ecosistema tecnológico más robusto y moderno del mercado,
            garantizando estabilidad, rendimiento y escalabilidad a largo plazo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1, duration: 0.5 }}
              className={`glass rounded-2xl p-6 border ${cat.border} ${cat.bg}`}
            >
              <h3 className={`text-sm font-semibold uppercase tracking-widest ${cat.color} mb-5`}>
                {cat.name}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {cat.techs.map((tech, ti) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.1 + ti * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/4
                      border border-white/5 hover:border-white/15 transition-all duration-200 cursor-default"
                  >
                    <span className="text-2xl">{tech.logo}</span>
                    <span className="text-xs text-slate-300 font-medium text-center">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
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
