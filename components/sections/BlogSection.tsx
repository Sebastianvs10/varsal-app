'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar, User, Tag } from 'lucide-react'
import Link from 'next/link'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Badge from '@/components/ui/Badge'

const posts = [
  {
    slug: 'arquitectura-saas-multitenancy',
    title: 'Arquitectura SaaS multi-tenant: guía completa para 2024',
    excerpt: 'Aprende a diseñar una plataforma SaaS escalable con aislamiento de datos, gestión de tenants y optimización de costos en cloud.',
    category: 'Cloud',
    author: 'Equipo VARSAL',
    date: '28 Nov 2024',
    readTime: '8 min',
    gradient: 'from-blue-500/20 to-cyan-500/10',
    tag: 'Más leído',
  },
  {
    slug: 'automatizacion-procesos-empresariales',
    title: 'RPA e IA: automatización inteligente para empresas colombianas',
    excerpt: 'Descubre cómo las empresas están usando automatización robótica de procesos junto con inteligencia artificial para reducir costos operativos.',
    category: 'Automatización',
    author: 'Ing. Sebastián Vargas',
    date: '15 Nov 2024',
    readTime: '6 min',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    tag: null,
  },
  {
    slug: 'nextjs-vs-react-empresa',
    title: 'Next.js vs React SPA: ¿cuál elegir para sistemas empresariales?',
    excerpt: 'Análisis técnico y de negocio para tomar la mejor decisión en tu próximo proyecto de software empresarial.',
    category: 'Desarrollo Web',
    author: 'Equipo VARSAL',
    date: '2 Nov 2024',
    readTime: '5 min',
    gradient: 'from-violet-500/20 to-purple-500/10',
    tag: null,
  },
]

export default function BlogSection() {
  return (
    <SectionWrapper id="blog" glow>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 mb-12">
          <div>
            <Badge variant="blue" className="mb-4">Blog</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Conocimiento que{' '}
              <span className="grad-text">genera valor</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
          >
            Ver todos los artículos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group glass rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/20 transition-all duration-300"
            >
              {/* Image placeholder with gradient */}
              <div className={`h-40 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 dots-bg opacity-30" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/10 text-white backdrop-blur-sm">
                    {post.category}
                  </span>
                  {post.tag && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/20 border border-amber-500/30 text-amber-300">
                      {post.tag}
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 text-xs text-white/50">{post.readTime} lectura</div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-base leading-snug mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors group/link"
                  >
                    Leer más
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
