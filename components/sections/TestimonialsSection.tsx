'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Badge from '@/components/ui/Badge'

const testimonials = [
  {
    quote: 'VARSAL Systems transformó por completo nuestra operación. Pasamos de procesos manuales caóticos a un sistema automatizado que nos ahorra más de 40 horas semanales. El equipo fue excepcional en todo momento.',
    name: 'Carlos Mendoza',
    role: 'Director de Operaciones',
    company: 'LogiTrans S.A.',
    avatar: 'CM',
    stars: 5,
  },
  {
    quote: 'El ERP que desarrollaron para nuestra clínica superó todas nuestras expectativas. La integración con las EPS funcionó de manera impecable y el soporte post-implementación ha sido de primer nivel.',
    name: 'Dra. Sandra Ríos',
    role: 'Gerente General',
    company: 'Clínica MedSalud',
    avatar: 'SR',
    stars: 5,
  },
  {
    quote: 'Contratamos a VARSAL para desarrollar nuestra plataforma SaaS y el resultado fue increíble. Escalamos de 0 a 500 clientes en 6 meses sin ningún problema técnico. Muy profesionales.',
    name: 'Andrés Jiménez',
    role: 'CEO & Founder',
    company: 'FlexPay Technologies',
    avatar: 'AJ',
    stars: 5,
  },
  {
    quote: 'La consultoría tecnológica que nos brindaron nos ayudó a evitar errores costosos en nuestra migración a la nube. Su conocimiento técnico y visión de negocio es realmente diferencial.',
    name: 'María Fernanda López',
    role: 'CTO',
    company: 'FinCorp Group',
    avatar: 'ML',
    stars: 5,
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  const t = testimonials[current]

  return (
    <SectionWrapper id="testimonios" className="bg-[#0F172A]/80">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="cyan" className="mb-4">Testimonios</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5">
            Lo que dicen nuestros{' '}
            <span className="grad-text">clientes</span>
          </h2>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
              className="glass rounded-2xl p-8 lg:p-12 border border-white/5 text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote className="w-8 h-8 text-blue-500/30 mx-auto mb-4" />

              {/* Text */}
              <blockquote className="text-lg lg:text-xl text-slate-300 leading-relaxed mb-8 italic">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-slate-400">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center
                hover:border-blue-500/30 hover:bg-blue-500/10 transition-all duration-200 cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === current ? 'w-8 bg-blue-400' : 'w-1.5 bg-white/20'
                  }`}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center
                hover:border-blue-500/30 hover:bg-blue-500/10 transition-all duration-200 cursor-pointer"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
