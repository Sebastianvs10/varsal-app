'use client'

import { motion } from 'framer-motion'
import { Mail, Clock, ShieldCheck } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

const perks = [
  {
    icon: Clock,
    category: 'Respuesta rápida',
    title: 'Respuesta en menos de 24 horas',
    desc: 'Un especialista revisará tu solicitud y se pondrá en contacto contigo para programar una reunión.',
  },
  {
    icon: ShieldCheck,
    category: 'Diagnóstico',
    title: 'Diagnóstico inicial sin costo',
    desc: 'Analizamos tu necesidad y te orientamos sobre la mejor alternativa tecnológica para tu empresa.',
  },
  {
    icon: Mail,
    category: 'Atención personalizada',
    title: 'Hablarás directamente con ingenieros',
    desc: 'Sin intermediarios comerciales. Comunicación directa con el equipo que diseñará y desarrollará la solución.',
  },
]

export default function CTASection() {
  return (
    <section id="contacto" className="relative overflow-hidden navy-gradient py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      {/* Foto de fondo. Fallback: degradado navy. */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cta.png')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, color-mix(in oklab, var(--vs-navy) 85%, transparent) 0%, color-mix(in oklab, var(--vs-navy-2) 92%, transparent) 100%)' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grid-texture opacity-[0.08]" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(60% 90% at 50% 0%, color-mix(in oklab, var(--vs-accent) 22%, transparent) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-12 flex flex-col items-center text-center">
          <SectionEyebrow index="05" label="Empecemos" tone="inverted" />

          <h2 className="w-full text-3xl lg:text-4xl font-bold leading-tight mb-4 text-white text-balance">
            Convirtamos tu idea en una solución tecnológica.
          </h2>

          <p className="max-w-xl text-base text-white/75 leading-relaxed">
            Cuéntanos tu reto y uno de nuestros ingenieros te contactará para
            resolver tus dudas y definir los próximos pasos. Sin compromiso.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.5fr_1fr] gap-6 lg:gap-8 items-stretch">
          {/* Columna de beneficios — claymorphism sobre fondo navy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -3 }}
            className="clay-card-on-dark p-6 lg:p-7 flex items-center"
          >
            <ul className="space-y-6 w-full">
              {perks.map((p) => (
                <li key={p.title} className="flex items-start gap-3.5">
                  <span className="clay-tile-on-dark mt-0.5 w-11 h-11 flex items-center justify-center shrink-0">
                    <p.icon className="w-[19px] h-[19px] text-white" strokeWidth={1.9} />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-white/50 mb-0.5">
                      {p.category}
                    </p>
                    <p className="text-white font-bold text-[15px] mb-1 tracking-tight">{p.title}</p>
                    <p className="text-white/65 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Columna formulario */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
