'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'

export default function CTASection() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <SectionWrapper className="relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-[#0F172A] to-cyan-900/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 dots-bg opacity-20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium
            uppercase tracking-widest mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Hablemos de su proyecto
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl lg:text-6xl font-bold leading-tight mb-6"
        >
          Impulse la{' '}
          <span className="grad-text">transformación digital</span>
          <br />
          de su empresa.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto"
        >
          Únase a las empresas líderes que confían en VARSAL Systems para escalar
          con tecnología de clase mundial. Primera consultoría sin costo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 48px rgba(37,99,235,0.6)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('#contacto')}
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base
              bg-gradient-to-r from-blue-600 to-cyan-500
              shadow-[0_0_30px_rgba(37,99,235,0.4)]
              transition-all duration-200 cursor-pointer"
          >
            <Calendar className="w-5 h-5" />
            Agenda una llamada
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('#contacto')}
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base
              text-white border border-white/15 hover:border-white/30
              bg-white/5 hover:bg-white/10
              transition-all duration-200 cursor-pointer"
          >
            Solicitar una demo
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-slate-500"
        >
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> Sin compromiso inicial
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> Respuesta en 24 horas
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> Confidencialidad garantizada
          </span>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
