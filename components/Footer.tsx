/* Footer corporativo — CTA de cierre, navegación organizada en columnas y barra legal */
/* Autor: Ing. J Sebastian Vargas S */

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react'
import { SITE_EMAIL, SITE_PHONE, SITE_PHONE_TEL, SITE_ADDRESS } from '@/lib/site'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '#contacto' },
]

const serviceLinks = [
  { label: 'Software y apps a medida', href: '#servicios' },
  { label: 'Cloud e infraestructura', href: '#servicios' },
  { label: 'Automatización e integraciones', href: '#servicios' },
  { label: 'Consultoría tecnológica', href: '#servicios' },
]

const contactItems = [
  { icon: Mail, value: SITE_EMAIL, href: `mailto:${SITE_EMAIL}` },
  { icon: Phone, value: SITE_PHONE, href: `tel:${SITE_PHONE_TEL}` },
  { icon: MapPin, value: `${SITE_ADDRESS.street}, ${SITE_ADDRESS.city}, ${SITE_ADDRESS.region}`, href: undefined },
]

const legalLinks = [
  { label: 'Política de privacidad', href: '/privacidad' },
  { label: 'Términos y condiciones', href: '/terminos' },
  { label: 'Política de cookies', href: '/cookies' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg-alt">
      <div className="h-[2px] brand-gradient" aria-hidden="true" />

      {/* CTA de cierre */}
      <div className="border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div>
            <p className="font-bold text-lg text-foreground mb-0.5">¿Listo para construir tu próximo proyecto?</p>
            <p className="text-sm text-subtle">Cuéntanos tu reto y te respondemos en menos de 24 horas.</p>
          </div>
          <a
            href="#contacto"
            className="group shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white text-sm
              brand-gradient btn-glow-accent hover:brightness-110
              transition-all duration-150 cursor-pointer whitespace-nowrap"
          >
            Agenda una reunión
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-[1.3fr_0.85fr_1fr_1.1fr] gap-10 mb-12">
          {/* Marca */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4" aria-label="VARSAL Systems — Inicio">
              <Image
                src="/logo-varsal.png"
                alt="VARSAL Systems"
                width={977}
                height={354}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-sm text-subtle leading-relaxed mb-5 max-w-sm">
              Diseñamos software a medida, infraestructura cloud y
              automatización para empresas que quieren crecer con tecnología
              confiable y escalable.
            </p>
            <div className="inline-flex items-center gap-2.5 font-mono text-xs text-subtle">
              <span className="status-dot" />
              Disponibles para nuevos proyectos
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-faint mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-subtle hover:text-accent transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-faint mb-4">
              Servicios
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-subtle hover:text-accent transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-faint mb-4">
              Contacto
            </h4>
            <ul className="space-y-3">
              {contactItems.map((item) => {
                const content = (
                  <>
                    <span className="w-7 h-7 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-accent" strokeWidth={1.75} />
                    </span>
                    <span className="text-sm text-subtle leading-snug">{item.value}</span>
                  </>
                )
                return (
                  <li key={item.value}>
                    {item.href ? (
                      <a href={item.href} className="flex items-start gap-2.5 group hover:[&_span:last-child]:text-accent transition-colors duration-150">
                        {content}
                      </a>
                    ) : (
                      <span className="flex items-start gap-2.5">{content}</span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} VARSAL Systems S.A.S. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-faint hover:text-subtle transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
