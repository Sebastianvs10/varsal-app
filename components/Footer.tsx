/* Footer corporativo — CTA de cierre, marca + contacto en una franja y barra legal */
/* Autor: Ing. J Sebastian Vargas S */

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react'
import { SITE_EMAIL, SITE_PHONE, SITE_PHONE_TEL, SITE_ADDRESS } from '@/lib/site'

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

      {/* CTA de cierre — compacta */}
      <div className="border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-semibold text-lg text-foreground">¿Listo para construir tu próximo proyecto?</p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6">
          {/* Marca */}
          <div>
            <Link href="/" className="inline-block mb-3" aria-label="VARSAL Systems — Inicio">
              <Image
                src="/logo-varsal.png"
                alt="VARSAL Systems"
                width={977}
                height={354}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-subtle leading-relaxed max-w-sm">
              Software a medida, infraestructura cloud y automatización para
              empresas que quieren crecer con tecnología confiable.
            </p>
          </div>

          {/* Contacto — franja horizontal compacta */}
          <ul className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-6 gap-y-3">
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
                    <a href={item.href} className="flex items-center gap-2 group hover:[&_span:last-child]:text-accent transition-colors duration-150">
                      {content}
                    </a>
                  ) : (
                    <span className="flex items-center gap-2">{content}</span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-faint">
            © {new Date().getFullYear()} VARSAL Systems S.A.S. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-faint hover:text-subtle transition-colors duration-150"
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
