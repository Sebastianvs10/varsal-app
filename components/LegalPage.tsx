import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowLeft } from 'lucide-react'

interface LegalSection {
  title: string
  content: string | string[]
}

interface LegalPageProps {
  title: string
  subtitle: string
  lastUpdated: string
  sections: LegalSection[]
}

export default function LegalPage({ title, subtitle, lastUpdated, sections }: LegalPageProps) {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-background">
        {/* Hero */}
        <div className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-line bg-bg-alt">
          <div className="relative max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-faint hover:text-foreground transition-colors mb-6 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Volver al inicio
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-semibold uppercase tracking-widest mb-4">
              Legal
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-foreground">{title}</h1>
            <p className="text-subtle mb-2">{subtitle}</p>
            <p className="text-xs text-faint">Última actualización: {lastUpdated}</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="vs-panel rounded-lg p-8 lg:p-12">
            <div className="space-y-10">
              {sections.map((section, i) => (
                <section key={i}>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-foreground">
                    <span className="flex-shrink-0 w-7 h-7 rounded-md bg-navy/10 border border-navy/20 flex items-center justify-center text-xs font-bold text-navy">
                      {i + 1}
                    </span>
                    {section.title}
                  </h2>
                  {Array.isArray(section.content) ? (
                    <ul className="space-y-2 ml-4">
                      {section.content.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-subtle text-sm leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-subtle text-sm leading-relaxed">{section.content}</p>
                  )}
                </section>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-12 pt-8 border-t border-line">
              <p className="text-sm text-faint">
                Para consultas sobre esta política, contáctenos en{' '}
                <a href="mailto:legal@varsalsystems.com" className="text-navy hover:underline">
                  legal@varsalsystems.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
