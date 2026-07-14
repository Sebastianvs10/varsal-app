import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'

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
  { label: 'Cloud e infraestructura / DevOps', href: '#servicios' },
  { label: 'Automatización e integraciones', href: '#servicios' },
  { label: 'Consultoría y transformación digital', href: '#servicios' },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Image
              src="/logo-varsal.png"
              alt="VARSAL Systems"
              width={977}
              height={354}
              className="h-9 w-auto mb-4"
            />
            <p className="text-sm text-subtle leading-relaxed mb-5 max-w-sm">
              VARSAL Systems diseña software a medida, infraestructura cloud y
              automatización para empresas que quieren crecer con tecnología
              confiable y escalable.
            </p>
            <div className="space-y-2.5">
              <a href="mailto:contacto@varsalsystems.com" className="flex items-center gap-2 text-xs text-faint hover:text-subtle transition-colors">
                <Mail className="w-3.5 h-3.5" />
                contacto@varsalsystems.com
              </a>
              <a href="tel:+573001234567" className="flex items-center gap-2 text-xs text-faint hover:text-subtle transition-colors">
                <Phone className="w-3.5 h-3.5" />
                +57 300 123 4567
              </a>
              <span className="flex items-center gap-2 text-xs text-faint">
                <MapPin className="w-3.5 h-3.5" />
                Bogotá D.C., Colombia
              </span>
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
                    className="text-sm text-subtle hover:text-foreground transition-colors duration-150"
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
                    className="text-sm text-subtle hover:text-foreground transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
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
