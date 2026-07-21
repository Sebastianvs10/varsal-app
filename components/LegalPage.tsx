'use client'

/* Layout compartido para páginas legales — TOC con scroll-spy, resumen ejecutivo,
   callouts, tablas y tarjeta de contacto. */
/* Autor: Ing. J Sebastian Vargas S */

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Check,
  Link2,
  List,
  Mail,
  MapPin,
  Phone,
  ChevronDown,
  Info,
  AlertTriangle,
  Clock,
  Hash,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { cn } from '@/lib/utils'
import { SITE_EMAIL, SITE_PHONE, SITE_PHONE_TEL, SITE_ADDRESS } from '@/lib/site'

export interface LegalTable {
  headers: string[]
  rows: string[][]
}

export interface LegalCallout {
  type: 'info' | 'warning'
  title?: string
  text: string
}

export interface LegalSection {
  /** Ancla de la sección (para TOC y enlaces directos). Si se omite, se genera desde el título. */
  id?: string
  title: string
  content?: string | string[]
  table?: LegalTable
  callout?: LegalCallout
}

function slugify(title: string, index: number): string {
  const base = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return base || `seccion-${index + 1}`
}

interface LegalPageProps {
  badge?: string
  title: string
  subtitle: string
  lastUpdated: string
  /** Puntos clave mostrados como resumen rápido en el hero (2-5 ítems cortos). */
  summary?: string[]
  sections: LegalSection[]
}

function CopyAnchorButton({ id }: { id: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${id}`
      await navigator.clipboard.writeText(url)
      window.history.replaceState(null, '', `#${id}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Silencioso: si el navegador bloquea el portapapeles, no interrumpe el flujo.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="clay-btn-ghost inline-flex items-center justify-center w-7 h-7 text-faint hover:text-accent transition-colors cursor-pointer shrink-0 opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
      aria-label="Copiar enlace a esta sección"
      title="Copiar enlace a esta sección"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Link2 className="w-3.5 h-3.5" />}
    </button>
  )
}

function Callout({ callout }: { callout: LegalCallout }) {
  const isWarning = callout.type === 'warning'
  return (
    <div
      className={cn(
        'mt-4 rounded-lg border-l-[3px] px-4 py-3.5 flex gap-3',
        isWarning
          ? 'border-l-warning bg-warning/8 border border-warning/20'
          : 'border-l-accent bg-accent/6 border border-accent/20'
      )}
    >
      {isWarning ? (
        <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
      ) : (
        <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
      )}
      <div className="min-w-0">
        {callout.title && (
          <p className={cn('text-xs font-semibold uppercase tracking-wider mb-1', isWarning ? 'text-warning' : 'text-accent')}>
            {callout.title}
          </p>
        )}
        <p className="text-sm leading-relaxed text-subtle">{callout.text}</p>
      </div>
    </div>
  )
}

function SectionTable({ table }: { table: LegalTable }) {
  return (
    <div className="mt-4 rounded-lg border border-line overflow-x-auto">
      <table className="w-full text-sm border-collapse min-w-[480px]">
        <thead>
          <tr className="bg-surface-2/70">
            {table.headers.map((h) => (
              <th
                key={h}
                className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-faint whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} className="border-t border-line">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-subtle align-top leading-relaxed">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function LegalPage({
  badge = 'Legal',
  title,
  subtitle,
  lastUpdated,
  summary,
  sections: rawSections,
}: LegalPageProps) {
  const sections = useMemo(
    () => rawSections.map((s, i) => ({ ...s, id: s.id || slugify(s.title, i) })),
    [rawSections]
  )
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '')
  const [tocOpen, setTocOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const toc = useMemo(() => sections.map((s) => ({ id: s.id, title: s.title })), [sections])

  const readingMinutes = useMemo(() => {
    const words = sections.reduce((total, s) => {
      const text = Array.isArray(s.content) ? s.content.join(' ') : s.content ?? ''
      return total + text.split(/\s+/).filter(Boolean).length
    }, 0)
    return Math.max(1, Math.round(words / 200))
  }, [sections])

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)

    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections.length])

  const goTo = (id: string) => {
    setTocOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-background">
        {/* Barra superior — botón volver, ancho completo */}
        <div className="relative bg-surface-2 border-b border-line">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-faint hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Volver al inicio
            </Link>
          </div>
        </div>

        {/* Hero */}
        <div className="relative py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-line bg-bg-alt overflow-hidden">
          <div className="mesh-gradient opacity-40" aria-hidden="true" />
          <div className="relative max-w-5xl mx-auto">
            {/* Contenido centrado en la página */}
            <div className="text-center">
              <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">{title}</h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-semibold uppercase tracking-widest">
                  {badge}
                </span>
              </div>

              <p className="mx-auto mb-4 max-w-2xl text-subtle leading-relaxed">{subtitle}</p>

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-faint">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {readingMinutes} min de lectura
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" />
                  {sections.length} secciones
                </span>
                <span>Última actualización: {lastUpdated}</span>
              </div>

              {summary && summary.length > 0 && (
                <div className="relative mt-8 mx-auto max-w-2xl text-left rounded-xl bg-surface border border-line shadow-(--vs-shadow-sm) pl-5 pr-5 py-5 overflow-hidden">
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent" aria-hidden="true" />
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-accent mb-3.5">
                    <Check className="w-3.5 h-3.5" />
                    En resumen
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    {summary.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-subtle leading-snug">
                        <Check className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contenido: TOC + secciones */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-[240px_1fr] gap-10">
            {/* TOC móvil (acordeón) */}
            <div className="lg:hidden">
              <button
                onClick={() => setTocOpen((v) => !v)}
                className="w-full flex items-center justify-between gap-2 px-4 h-11 clay-btn-ghost text-sm font-medium text-foreground cursor-pointer"
                aria-expanded={tocOpen}
              >
                <span className="flex items-center gap-2">
                  <List className="w-4 h-4 text-accent" />
                  Contenido del documento
                </span>
                <ChevronDown className={cn('w-4 h-4 text-faint transition-transform duration-200', tocOpen && 'rotate-180')} />
              </button>
              {tocOpen && (
                <nav className="mt-2 vs-panel rounded-lg p-2 max-h-72 overflow-y-auto">
                  {toc.map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => goTo(item.id)}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-md text-sm transition-colors cursor-pointer flex items-start gap-2',
                        activeId === item.id
                          ? 'bg-accent/10 text-accent font-medium'
                          : 'text-subtle hover:text-foreground hover:bg-surface-2'
                      )}
                    >
                      <span className="tabular-nums text-xs text-faint shrink-0 mt-0.5">{i + 1}.</span>
                      {item.title}
                    </button>
                  ))}
                </nav>
              )}
            </div>

            {/* TOC desktop (sticky) */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-faint mb-3 px-1">
                  Contenido
                </p>
                <nav className="space-y-0.5 border-l border-line pl-3 max-h-[calc(100vh-9rem)] overflow-y-auto">
                  {toc.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => goTo(item.id)}
                      className={cn(
                        'relative w-full text-left py-1.5 pl-3 -ml-3 text-[13px] leading-snug transition-colors duration-150 cursor-pointer',
                        activeId === item.id ? 'text-accent font-medium' : 'text-faint hover:text-subtle'
                      )}
                    >
                      {activeId === item.id && (
                        <motion.span
                          layoutId="legal-toc-active"
                          className="absolute left-[-13px] top-0 bottom-0 w-[2px] bg-accent rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      {item.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Secciones */}
            <div ref={contentRef} className="vs-panel rounded-xl p-6 sm:p-8 lg:p-11 min-w-0">
              <div className="space-y-11">
                {sections.map((section, i) => (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
                    className="scroll-mt-28"
                  >
                    <h2 className="group text-lg lg:text-xl font-bold mb-3.5 flex items-center gap-3 text-foreground">
                      <span className="shrink-0 w-7 h-7 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center text-xs font-bold text-accent tabular-nums">
                        {i + 1}
                      </span>
                      <span className="flex-1">{section.title}</span>
                      <CopyAnchorButton id={section.id} />
                    </h2>

                    {Array.isArray(section.content) ? (
                      <ul className="space-y-2 ml-1">
                        {section.content.map((item, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-subtle text-sm leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : section.content ? (
                      <p className="text-subtle text-sm leading-relaxed">{section.content}</p>
                    ) : null}

                    {section.table && <SectionTable table={section.table} />}
                    {section.callout && <Callout callout={section.callout} />}
                  </motion.section>
                ))}
              </div>

              {/* Contacto */}
              <div className="mt-14 pt-8 border-t border-line">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-faint mb-4">
                  ¿Preguntas sobre este documento?
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <a
                    href={`mailto:${SITE_EMAIL}`}
                    className="flex items-center gap-2.5 rounded-lg bg-surface-2 border border-line px-4 py-3 text-sm text-subtle hover:text-foreground hover:border-accent/30 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-accent shrink-0" />
                    <span className="truncate">{SITE_EMAIL}</span>
                  </a>
                  <a
                    href={`tel:${SITE_PHONE_TEL}`}
                    className="flex items-center gap-2.5 rounded-lg bg-surface-2 border border-line px-4 py-3 text-sm text-subtle hover:text-foreground hover:border-accent/30 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-accent shrink-0" />
                    {SITE_PHONE}
                  </a>
                  <span className="flex items-center gap-2.5 rounded-lg bg-surface-2 border border-line px-4 py-3 text-sm text-subtle">
                    <MapPin className="w-4 h-4 text-accent shrink-0" />
                    {SITE_ADDRESS.city}, {SITE_ADDRESS.region}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
