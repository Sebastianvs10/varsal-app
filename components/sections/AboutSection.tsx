'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Heart, Rocket, Shield, Users } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Badge from '@/components/ui/Badge'

const values = [
  { icon: Shield, title: 'Seguridad', desc: 'Protegemos sus datos con estándares de clase mundial y arquitecturas seguras.' },
  { icon: Rocket, title: 'Innovación', desc: 'Adoptamos las últimas tecnologías para mantener su empresa a la vanguardia.' },
  { icon: Heart, title: 'Compromiso', desc: 'Cada proyecto es tratado como si fuera nuestro propio negocio.' },
  { icon: Users, title: 'Colaboración', desc: 'Trabajamos como una extensión de su equipo, no como un proveedor externo.' },
]

const timeline = [
  { year: '2018', title: 'Fundación', desc: 'VARSAL Systems nace con la misión de democratizar la tecnología empresarial en Colombia.' },
  { year: '2019', title: 'Primeros ERP', desc: 'Entregamos los primeros sistemas de gestión empresarial a clientes del sector salud.' },
  { year: '2021', title: 'Expansión SaaS', desc: 'Lanzamos nuestra primera plataforma SaaS multi-tenant con más de 5.000 usuarios.' },
  { year: '2023', title: 'Cloud Native', desc: 'Migramos toda nuestra infraestructura a arquitecturas cloud-native en AWS.' },
  { year: '2024', title: 'Crecimiento', desc: '+80 proyectos entregados, 50+ clientes activos y presencia en 3 países.' },
]

export default function AboutSection() {
  return (
    <SectionWrapper id="nosotros" glow>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="blue" className="mb-4">Quiénes somos</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5">
            Una empresa construida para{' '}
            <span className="grad-text">el futuro</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Somos un equipo de ingenieros, diseñadores y estrategas digitales
            apasionados por resolver problemas complejos con tecnología de alto nivel.
          </p>
        </div>

        {/* Mission / Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <motion.div
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-8 border border-white/5 hover:border-blue-500/20 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center mb-4">
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Misión</h3>
            <p className="text-slate-400 leading-relaxed">
              Transformar la operación de las empresas mediante soluciones tecnológicas
              escalables, seguras y de alto impacto, que reduzcan costos, aumenten la
              eficiencia y abran nuevos canales de crecimiento.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-8 border border-white/5 hover:border-cyan-500/20 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center mb-4">
              <Eye className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Visión</h3>
            <p className="text-slate-400 leading-relaxed">
              Ser reconocidos como el socio tecnológico de referencia en América Latina
              para empresas que buscan escalar con confianza, automatizar con inteligencia
              y crecer con sistemas que realmente funcionan.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-8">Nuestros valores</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="glass rounded-xl p-6 border border-white/5 hover:border-blue-500/15 transition-all duration-300 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                  <val.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h4 className="font-semibold mb-2">{val.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-12">Nuestra historia</h3>
          <div className="relative">
            {/* Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/50 via-cyan-500/30 to-transparent hidden md:block" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -32 : 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`flex items-center gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`md:w-5/12 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className="glass rounded-xl p-5 border border-white/5 hover:border-blue-500/20 transition-all duration-300">
                      <span className="grad-text text-2xl font-bold">{item.year}</span>
                      <h4 className="font-semibold mt-1 mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_0_12px_rgba(37,99,235,0.5)]" />
                  </div>

                  <div className="md:w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
