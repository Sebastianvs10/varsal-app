/* Blog VARSAL — listado editorial + lectura en modal con scroll (sin cambio de URL) */
/* Autor: Ing. J Sebastian Vargas S */

'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  X,
  User,
  CalendarDays,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Tone = 'navy' | 'accent' | 'accent-2'

type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }

interface Post {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  tone: Tone
  featured: boolean
  content: Block[]
}

const categories = [
  'Todos',
  'Desarrollo Web',
  'Cloud',
  'Automatización',
  'IA',
  'Ciberseguridad',
  'Tecnología Empresarial',
]

const toneBar: Record<Tone, string> = {
  navy: 'bg-navy',
  accent: 'bg-accent',
  'accent-2': 'bg-accent-2',
}

const toneGradient: Record<Tone, string> = {
  navy: 'from-navy to-navy-2',
  accent: 'from-accent to-accent-light',
  'accent-2': 'from-accent-2 to-accent',
}

const posts: Post[] = [
  {
    slug: 'arquitectura-saas-multitenant',
    title: 'Arquitectura SaaS multi-tenant: cómo construimos plataformas que escalan',
    excerpt:
      'Así diseñamos software SaaS con aislamiento de datos por cliente, costos controlados en la nube y capacidad de crecer sin reescribir el sistema.',
    category: 'Cloud',
    author: 'Equipo VARSAL',
    date: '10 Jul 2026',
    readTime: '8 min',
    tone: 'navy',
    featured: true,
    content: [
      {
        type: 'p',
        text: 'Cuando construimos una plataforma SaaS, la decisión más importante no es qué framework usar, sino cómo separar los datos de cada cliente. Un buen modelo multi-tenant te permite servir a decenas de empresas desde una sola aplicación, sin que ninguna vea la información de otra y sin duplicar infraestructura.',
      },
      { type: 'h2', text: 'Los tres modelos de aislamiento' },
      {
        type: 'p',
        text: 'No existe una única forma correcta: la elegimos según el nivel de aislamiento, el volumen esperado y el presupuesto de infraestructura.',
      },
      {
        type: 'ul',
        items: [
          'Base de datos por tenant: máximo aislamiento y cumplimiento, mayor costo operativo.',
          'Esquema por tenant: buen equilibrio entre aislamiento y eficiencia, ideal para sectores regulados como salud.',
          'Tabla compartida con discriminador: máxima densidad y menor costo, exige controles estrictos en cada consulta.',
        ],
      },
      {
        type: 'p',
        text: 'En proyectos como plataformas del sector salud trabajamos con esquema por tenant: cada empresa tiene su propio espacio lógico y las migraciones se aplican de forma controlada a todos los esquemas al desplegar.',
      },
      { type: 'h2', text: 'Costos que no se disparan' },
      {
        type: 'p',
        text: 'Escalar no debería significar multiplicar la factura de la nube. Usamos autoescalado por demanda, cachés en las consultas más frecuentes y colas para el trabajo pesado, de modo que pagas por lo que realmente consumes.',
      },
      { type: 'h2', text: 'Qué te llevas' },
      {
        type: 'p',
        text: 'Una plataforma preparada para sumar clientes sin reescribir el núcleo, con seguridad por diseño y trazabilidad de cada operación. Ese es el estándar con el que desarrollamos en VARSAL.',
      },
    ],
  },
  {
    slug: 'automatizacion-rpa-ia',
    title: 'Automatización con RPA e IA: menos trabajo manual, menos errores',
    excerpt:
      'Digitalizar un proceso no es comprar una herramienta: es rediseñar cómo fluye el trabajo. Te contamos cómo lo abordamos.',
    category: 'Automatización',
    author: 'Ing. Sebastián Vargas',
    date: '2 Jul 2026',
    readTime: '6 min',
    tone: 'accent',
    featured: false,
    content: [
      {
        type: 'p',
        text: 'La mayoría de las empresas pierden horas en tareas repetitivas: copiar datos entre sistemas, generar reportes a mano, validar información que ya existe en otro lugar. Automatizar bien esas tareas libera a tu equipo para lo que realmente aporta valor.',
      },
      { type: 'h2', text: 'Primero el proceso, después la tecnología' },
      {
        type: 'p',
        text: 'Antes de escribir una sola línea de código, mapeamos el proceso actual e identificamos dónde están los cuellos de botella y los errores frecuentes. Automatizar un proceso roto solo hace que se rompa más rápido.',
      },
      { type: 'h2', text: 'RPA e IA se complementan' },
      {
        type: 'ul',
        items: [
          'RPA para tareas estructuradas y repetitivas: mover datos, conciliar, generar documentos.',
          'IA para lo que antes requería criterio humano: clasificar textos, extraer datos de facturas, priorizar casos.',
          'Integraciones y APIs para que los sistemas conversen entre sí sin intervención manual.',
        ],
      },
      {
        type: 'p',
        text: 'La combinación correcta reduce tiempos de operación y errores de forma medible, con trazabilidad de cada paso para auditoría.',
      },
      { type: 'h2', text: 'Cómo medimos el resultado' },
      {
        type: 'p',
        text: 'Definimos indicadores antes de empezar: tiempo por operación, tasa de error y retrabajo evitado. Así el impacto de la automatización se ve en números, no en percepciones.',
      },
    ],
  },
  {
    slug: 'nextjs-o-spa',
    title: 'Next.js o SPA: cómo elegimos el stack para tu software',
    excerpt:
      'No hay tecnología ganadora en abstracto. Hay decisiones correctas según tu producto, tu SEO y tu equipo.',
    category: 'Desarrollo Web',
    author: 'Equipo VARSAL',
    date: '24 Jun 2026',
    readTime: '5 min',
    tone: 'accent-2',
    featured: false,
    content: [
      {
        type: 'p',
        text: 'Cuando un cliente nos pregunta si su proyecto debería ser una SPA o usar renderizado en servidor, la respuesta honesta es: depende de qué necesitas lograr. Elegir por moda es la forma más rápida de acumular deuda técnica.',
      },
      { type: 'h2', text: 'Cuándo conviene renderizado en servidor (Next.js)' },
      {
        type: 'ul',
        items: [
          'Necesitas que Google indexe bien tu contenido (sitios públicos, landings, blogs, e-commerce).',
          'La primera carga debe ser rápida incluso en conexiones lentas.',
          'Quieres un solo stack para frontend y APIs, con despliegue sencillo.',
        ],
      },
      { type: 'h2', text: 'Cuándo una SPA es suficiente' },
      {
        type: 'ul',
        items: [
          'Aplicaciones internas detrás de login, donde el SEO no importa.',
          'Interfaces muy interactivas tipo dashboard o panel operativo.',
          'Equipos ya especializados en un framework de cliente.',
        ],
      },
      {
        type: 'p',
        text: 'En VARSAL no partimos del framework, partimos del objetivo de negocio. Primero definimos requisitos de SEO, rendimiento y mantenibilidad; el stack sale de ahí.',
      },
    ],
  },
  {
    slug: 'microservicios-o-monolito',
    title: 'Microservicios o monolito: la decisión que define tu proyecto',
    excerpt:
      'Los microservicios no son un ascenso automático. Te explicamos cuándo suman y cuándo son un problema disfrazado de arquitectura.',
    category: 'Tecnología Empresarial',
    author: 'Equipo VARSAL',
    date: '16 Jun 2026',
    readTime: '7 min',
    tone: 'navy',
    featured: false,
    content: [
      {
        type: 'p',
        text: 'Los microservicios están de moda, y por eso muchos proyectos los adoptan sin necesitarlos. La realidad: un monolito bien estructurado es la mejor decisión para la mayoría de los productos en sus primeras etapas.',
      },
      { type: 'h2', text: 'El monolito modular, casi siempre el punto de partida' },
      {
        type: 'p',
        text: 'Un monolito organizado por módulos claros es más fácil de desarrollar, desplegar y depurar. Te permite avanzar rápido mientras el producto encuentra su forma, sin la complejidad operativa de coordinar muchos servicios.',
      },
      { type: 'h2', text: 'Cuándo tiene sentido separar en servicios' },
      {
        type: 'ul',
        items: [
          'Un módulo necesita escalar de forma muy distinta al resto.',
          'Equipos independientes que despliegan a ritmos diferentes.',
          'Requisitos de disponibilidad o aislamiento que justifican el costo operativo.',
        ],
      },
      {
        type: 'p',
        text: 'Nuestra recomendación práctica: empieza con un monolito modular y extrae servicios solo cuando el dolor sea real y medible, no anticipado. Así evitas complejidad que no aporta.',
      },
    ],
  },
  {
    slug: 'seguridad-apis',
    title: 'Seguridad en APIs: cómo protegemos el software que construimos',
    excerpt:
      'Autenticación, autorización, validación y monitoreo. Los controles que aplicamos por defecto en cada API de producción.',
    category: 'Ciberseguridad',
    author: 'Ing. Sebastián Vargas',
    date: '5 Jun 2026',
    readTime: '9 min',
    tone: 'accent',
    featured: false,
    content: [
      {
        type: 'p',
        text: 'Una API expuesta sin los controles adecuados es una puerta abierta. En VARSAL la seguridad no es una fase final, es una condición de diseño desde la primera línea de código.',
      },
      { type: 'h2', text: 'Autenticación y autorización' },
      {
        type: 'ul',
        items: [
          'Tokens firmados (JWT/OAuth 2.0) con expiración y renovación controladas.',
          'Autorización explícita por rol en cada endpoint: principio de mínimo privilegio.',
          'Nunca confiar en el cliente: cada permiso se valida en el servidor.',
        ],
      },
      { type: 'h2', text: 'Validación de entrada' },
      {
        type: 'p',
        text: 'Todo dato que llega se valida en formato y en reglas de negocio. Esto previene inyecciones, datos corruptos y comportamientos inesperados antes de que lleguen a la base de datos.',
      },
      { type: 'h2', text: 'Monitoreo y trazabilidad' },
      {
        type: 'ul',
        items: [
          'Rate limiting para frenar abuso y ataques de fuerza bruta.',
          'Registro de eventos críticos para auditoría, sin exponer datos sensibles.',
          'Errores sanitizados: mensajes claros para el usuario, detalle técnico solo en logs controlados.',
        ],
      },
      {
        type: 'p',
        text: 'El resultado es software que protege la información de tu empresa y cumple con las exigencias de sectores regulados.',
      },
    ],
  },
  {
    slug: 'ia-aplicada-empresas',
    title: 'IA aplicada: casos con retorno real para tu empresa',
    excerpt:
      'Más allá del ruido, estas son las aplicaciones de IA que sí generan valor operativo y cómo decidimos dónde usarla.',
    category: 'IA',
    author: 'Equipo VARSAL',
    date: '28 May 2026',
    readTime: '6 min',
    tone: 'accent-2',
    featured: false,
    content: [
      {
        type: 'p',
        text: 'La inteligencia artificial genera muchas expectativas y pocas certezas sobre dónde aplicarla. Nuestro criterio es simple: la IA debe resolver un problema concreto y medible, no ser un adorno tecnológico.',
      },
      { type: 'h2', text: 'Dónde vemos retorno real' },
      {
        type: 'ul',
        items: [
          'Extracción de datos de documentos (facturas, formularios) que antes se digitaban a mano.',
          'Clasificación y priorización automática de solicitudes o casos.',
          'Asistentes internos que responden con base en la documentación de tu empresa.',
          'Detección de anomalías en datos operativos y financieros.',
        ],
      },
      { type: 'h2', text: 'Cómo decidimos si vale la pena' },
      {
        type: 'p',
        text: 'Antes de proponer IA, preguntamos: ¿qué proceso mejora, cómo se mide el éxito y qué pasa si el modelo se equivoca? Si no hay respuesta clara a las tres, buscamos una solución más simple.',
      },
      {
        type: 'p',
        text: 'La IA es una herramienta poderosa cuando se aplica con criterio de ingeniería. Ese es el enfoque con el que la integramos en las soluciones que construimos.',
      },
    ],
  },
]

function ArticleModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-60 flex items-end sm:items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-title"
        initial={{ opacity: 0, y: 24, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.99 }}
        transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[88vh] flex flex-col
          bg-surface border border-line rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-(--vs-shadow-lg)"
      >
        {/* Cabecera con acento por tono */}
        <div className={cn('h-1.5 w-full bg-linear-to-r shrink-0', toneGradient[post.tone])} />

        <div className="flex items-start justify-between gap-4 px-6 sm:px-8 pt-6 pb-4 border-b border-line shrink-0">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-accent/10 border border-accent/25 text-accent">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-faint">
                <Clock className="w-3.5 h-3.5" /> {post.readTime} lectura
              </span>
            </div>
            <h2 id="article-title" className="text-xl sm:text-2xl font-bold text-foreground leading-snug">
              {post.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-faint">
              <span className="inline-flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {post.date}
              </span>
            </div>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="shrink-0 w-9 h-9 clay-btn-ghost flex items-center justify-center text-subtle
              hover:text-foreground transition-colors cursor-pointer"
            aria-label="Cerrar artículo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo con scroll */}
        <div className="overflow-y-auto px-6 sm:px-8 py-6 grow">
          <article className="max-w-none">
            {post.content.map((block, i) => {
              if (block.type === 'h2') {
                return (
                  <h3 key={i} className="text-lg font-bold text-foreground mt-7 first:mt-0 mb-2.5">
                    {block.text}
                  </h3>
                )
              }
              if (block.type === 'ul') {
                return (
                  <ul key={i} className="space-y-2 mb-5">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[15px] text-subtle leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )
              }
              return (
                <p key={i} className="text-[15px] text-subtle leading-relaxed mb-4">
                  {block.text}
                </p>
              )
            })}
          </article>
        </div>

        {/* Pie con CTA */}
        <div className="shrink-0 px-6 sm:px-8 py-4 border-t border-line bg-surface-2/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-subtle text-center sm:text-left">
            ¿Tienes un proyecto así en mente?
          </p>
          <Link
            href="/#contacto"
            onClick={onClose}
            className="btn-shine group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold
              clay-btn-primary transition-all duration-150 cursor-pointer"
          >
            <CalendarDays className="w-4 h-4" strokeWidth={2} />
            Agenda una reunión
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function BlogView() {
  const [activeCat, setActiveCat] = useState('Todos')
  const [openPost, setOpenPost] = useState<Post | null>(null)

  const visible = activeCat === 'Todos' ? posts : posts.filter((p) => p.category === activeCat)
  const featured = visible.find((p) => p.featured)
  const rest = visible.filter((p) => p !== featured)

  return (
    <main className="pt-24 min-h-screen bg-background">
      {/* Encabezado */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-line bg-bg-alt overflow-hidden">
        <div className="absolute inset-0 grid-texture opacity-[0.35]" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-faint hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Volver al inicio
          </Link>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-semibold uppercase tracking-widest mb-4">
              Blog
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground text-balance">
              Ingeniería que <span className="text-brand">genera valor</span>
            </h1>
            <p className="text-subtle max-w-2xl mx-auto text-lg leading-relaxed">
              Cómo pensamos, diseñamos y construimos software en VARSAL. Artículos
              prácticos sobre desarrollo, cloud, automatización y decisiones de
              arquitectura para tu empresa.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Filtros de categoría */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const active = cat === activeCat
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={cn(
                  'clay-pill px-4 py-1.5 text-sm font-medium cursor-pointer',
                  active
                    ? 'bg-navy text-white border border-navy'
                    : 'bg-surface border border-line text-subtle hover:text-foreground hover:border-line-strong'
                )}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Destacado */}
        {featured && (
          <button
            onClick={() => setOpenPost(featured)}
            className="group relative w-full text-left rounded-xl overflow-hidden border border-line
              shadow-(--vs-shadow-sm) hover:border-line-strong hover:shadow-(--vs-shadow-md)
              transition-all duration-200 bg-surface mb-8 cursor-pointer"
          >
            <span className={cn('absolute left-0 top-0 bottom-0 w-1', toneBar[featured.tone])} />
            <div className="p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-2/10 border border-accent-2/25 text-accent-2">
                  Destacado
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs bg-surface-2 border border-line text-subtle">
                  {featured.category}
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors max-w-2xl">
                {featured.title}
              </h2>
              <p className="text-subtle mb-6 max-w-xl leading-relaxed">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-faint">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {featured.readTime} lectura
                  </span>
                </div>
                <span className="flex items-center gap-2 px-5 py-2 rounded-md text-sm font-semibold bg-navy text-white group-hover:bg-navy-2 transition-colors">
                  Leer artículo <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </button>
        )}

        {/* Grid */}
        {rest.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post) => (
              <button
                key={post.slug}
                onClick={() => setOpenPost(post)}
                className="group text-left bg-surface rounded-xl overflow-hidden border border-line
                  shadow-(--vs-shadow-sm) hover:border-line-strong hover:shadow-(--vs-shadow-md)
                  transition-all duration-200 cursor-pointer flex flex-col"
              >
                <div className={cn('h-28 relative bg-linear-to-br', toneGradient[post.tone])}>
                  <div className="absolute inset-0 grid-texture opacity-[0.15]" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/15 border border-white/20 text-white backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 text-xs text-white/80">{post.readTime} lectura</div>
                </div>
                <div className="p-5 flex flex-col grow">
                  <h3 className="font-bold text-base leading-snug mb-2 text-foreground group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-subtle mb-4 line-clamp-3 leading-relaxed grow">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="flex items-center gap-1.5 text-xs text-faint">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-accent group-hover:gap-1.5 transition-all">
                      Leer más <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          !featured && (
            <div className="text-center py-16">
              <p className="text-subtle">No hay artículos en esta categoría todavía.</p>
              <button
                onClick={() => setActiveCat('Todos')}
                className="mt-3 text-sm font-semibold text-accent hover:text-accent-light transition-colors cursor-pointer"
              >
                Ver todos los artículos
              </button>
            </div>
          )
        )}
      </div>

      <AnimatePresence>
        {openPost && <ArticleModal post={openPost} onClose={() => setOpenPost(null)} />}
      </AnimatePresence>
    </main>
  )
}
