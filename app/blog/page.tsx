import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BlogView from '@/components/blog/BlogView'

export const metadata: Metadata = {
  title: 'Blog | VARSAL Systems',
  description:
    'Cómo pensamos, diseñamos y construimos software en VARSAL. Artículos prácticos sobre desarrollo, cloud, automatización, IA y arquitectura para empresas.',
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <BlogView />
      <Footer />
    </>
  )
}
