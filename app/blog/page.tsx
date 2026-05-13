import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowRight, Calendar, Clock, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | VARSAL Systems',
  description: 'Artículos sobre desarrollo de software, automatización, cloud, IA y tecnología empresarial.',
}

const categories = ['Todos', 'Desarrollo Web', 'Cloud', 'Automatización', 'IA', 'Ciberseguridad', 'Tecnología Empresarial']

const posts = [
  {
    slug: 'arquitectura-saas-multitenancy',
    title: 'Arquitectura SaaS multi-tenant: guía completa para 2024',
    excerpt: 'Aprende a diseñar una plataforma SaaS escalable con aislamiento de datos, gestión de tenants y optimización de costos en cloud. Cubrimos patrones, tecnologías y casos reales.',
    category: 'Cloud',
    author: 'Equipo VARSAL',
    date: '28 Nov 2024',
    readTime: '8 min',
    gradient: 'from-blue-600/30 to-cyan-600/20',
    featured: true,
  },
  {
    slug: 'automatizacion-procesos-empresariales',
    title: 'RPA e IA: automatización inteligente para empresas colombianas',
    excerpt: 'Descubre cómo las empresas están usando automatización robótica de procesos junto con inteligencia artificial para reducir costos operativos hasta en un 60%.',
    category: 'Automatización',
    author: 'Ing. Sebastián Vargas',
    date: '15 Nov 2024',
    readTime: '6 min',
    gradient: 'from-emerald-600/30 to-teal-600/20',
    featured: false,
  },
  {
    slug: 'nextjs-vs-react-empresa',
    title: 'Next.js vs React SPA: ¿cuál elegir para sistemas empresariales?',
    excerpt: 'Análisis técnico y de negocio para tomar la mejor decisión en tu próximo proyecto de software empresarial. Ventajas, desventajas y casos de uso.',
    category: 'Desarrollo Web',
    author: 'Equipo VARSAL',
    date: '2 Nov 2024',
    readTime: '5 min',
    gradient: 'from-violet-600/30 to-purple-600/20',
    featured: false,
  },
  {
    slug: 'microservicios-monolito-decision',
    title: 'Microservicios vs Monolito: la decisión que define tu proyecto',
    excerpt: 'No existe una respuesta única. Te explicamos cuándo tiene sentido cada arquitectura, qué criterios usar y cómo evitar el error de seguir tendencias sin contexto.',
    category: 'Desarrollo Web',
    author: 'Equipo VARSAL',
    date: '18 Oct 2024',
    readTime: '7 min',
    gradient: 'from-orange-600/30 to-red-600/20',
    featured: false,
  },
  {
    slug: 'seguridad-apis-empresariales',
    title: 'Seguridad en APIs empresariales: guía práctica 2024',
    excerpt: 'OAuth 2.0, JWT, rate limiting, validación de entrada y monitoreo de anomalías. Todo lo que necesita saber para proteger sus APIs de producción.',
    category: 'Ciberseguridad',
    author: 'Ing. Sebastián Vargas',
    date: '5 Oct 2024',
    readTime: '9 min',
    gradient: 'from-red-600/30 to-pink-600/20',
    featured: false,
  },
  {
    slug: 'ia-transformacion-digital-colombia',
    title: 'IA en Colombia: oportunidades reales para empresas en 2024',
    excerpt: 'Más allá del hype, estas son las aplicaciones concretas de IA que están generando ROI real en empresas colombianas de diferentes sectores.',
    category: 'IA',
    author: 'Equipo VARSAL',
    date: '20 Sep 2024',
    readTime: '6 min',
    gradient: 'from-amber-600/30 to-yellow-600/20',
    featured: false,
  },
]

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        {/* Hero */}
        <div className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
          <div className="absolute inset-0 dots-bg opacity-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative max-w-7xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Volver al inicio
            </Link>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs uppercase tracking-widest mb-4">
                Blog
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Conocimiento que <span className="grad-text">genera valor</span>
              </h1>
              <p className="text-slate-400 max-w-xl mx-auto">
                Artículos técnicos y estratégicos sobre desarrollo de software, cloud, automatización y transformación digital.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  cat === 'Todos'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/5 border border-white/8 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured */}
          <div className="mb-8">
            {posts.filter(p => p.featured).map((post) => (
              <div
                key={post.slug}
                className={`rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/20 transition-all duration-300 bg-gradient-to-br ${post.gradient} group`}
              >
                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 border border-blue-500/30 text-blue-300">
                      Destacado
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs bg-white/10 border border-white/10 text-white">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-3 group-hover:text-blue-300 transition-colors max-w-2xl">
                    {post.title}
                  </h2>
                  <p className="text-slate-400 mb-6 max-w-xl leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime} lectura
                      </span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20 transition-all border border-white/10"
                    >
                      Leer artículo <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.filter(p => !p.featured).map((post) => (
              <article
                key={post.slug}
                className="group glass rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-36 bg-gradient-to-br ${post.gradient} relative`}>
                  <div className="absolute inset-0 dots-bg opacity-30" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/10 text-white backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 text-xs text-white/50">
                    {post.readTime} lectura
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-base leading-snug mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors group/link"
                    >
                      Leer más <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
