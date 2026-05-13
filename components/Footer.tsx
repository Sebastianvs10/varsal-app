import Link from 'next/link'
import { Zap, Mail, Phone, Globe, Code2, MessageCircle } from 'lucide-react'

const cols = [
  {
    title: 'Empresa',
    links: [
      { label: 'Quiénes somos', href: '#nosotros' },
      { label: 'Misión y visión', href: '#nosotros' },
      { label: 'Casos de éxito', href: '#casos' },
      { label: 'Testimonios', href: '#testimonios' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Servicios',
    links: [
      { label: 'Desarrollo web', href: '#servicios' },
      { label: 'Software a medida', href: '#servicios' },
      { label: 'Automatización', href: '#servicios' },
      { label: 'Cloud Solutions', href: '#servicios' },
      { label: 'Consultoría', href: '#servicios' },
    ],
  },
  {
    title: 'Productos',
    links: [
      { label: 'VARSAL ERP', href: '#productos' },
      { label: 'VARSAL CRM', href: '#productos' },
      { label: 'SaaS Platform', href: '#productos' },
      { label: 'Dashboard Admin', href: '#productos' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Términos y condiciones', href: '/terminos' },
      { label: 'Política de privacidad', href: '/privacidad' },
      { label: 'Política de cookies', href: '/cookies' },
      { label: 'Tratamiento de datos', href: '/datos' },
      { label: 'Aviso legal', href: '/aviso-legal' },
      { label: 'SLA', href: '/sla' },
      { label: 'Seguridad', href: '/seguridad' },
      { label: 'Compliance', href: '/compliance' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="font-bold text-lg">
                <span className="grad-text">VARSAL</span>
                <span className="text-slate-300"> Systems</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-5 max-w-xs">
              Transformamos ideas en soluciones digitales escalables para empresas
              que quieren crecer con tecnología de clase mundial.
            </p>
            <div className="flex gap-2">
              {[
                { icon: Globe, href: '#', label: 'LinkedIn' },
                { icon: Code2, href: '#', label: 'GitHub' },
                { icon: MessageCircle, href: '#', label: 'Twitter' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center hover:bg-white/10 hover:border-white/15 transition-all"
                >
                  <s.icon className="w-3.5 h-3.5 text-slate-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} VARSAL Systems. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:contacto@varsalsystems.com" className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition-colors">
              <Mail className="w-3 h-3" />
              contacto@varsalsystems.com
            </a>
            <a href="tel:+573001234567" className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition-colors">
              <Phone className="w-3 h-3" />
              +57 300 123 4567
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-600">Todos los sistemas operativos</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
