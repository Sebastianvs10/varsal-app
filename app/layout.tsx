import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VARSAL Systems | Soluciones Tecnológicas Empresariales',
  description:
    'Transformamos ideas en soluciones digitales escalables. Desarrollo de software empresarial, automatización, SaaS, cloud y consultoría tecnológica.',
  keywords: [
    'desarrollo software',
    'sistemas empresariales',
    'automatización',
    'SaaS',
    'cloud',
    'consultoría tecnológica',
    'Colombia',
    'VARSAL Systems',
  ],
  authors: [{ name: 'VARSAL Systems' }],
  creator: 'VARSAL Systems',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://varsalsystems.com',
    title: 'VARSAL Systems | Soluciones Tecnológicas Empresariales',
    description:
      'Transformamos ideas en soluciones digitales escalables. Expertos en desarrollo web, software a medida, automatización y arquitectura cloud.',
    siteName: 'VARSAL Systems',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VARSAL Systems | Soluciones Tecnológicas Empresariales',
    description: 'Transformamos ideas en soluciones digitales escalables.',
    creator: '@VARSALSystems',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-[#0F172A] text-[#F8FAFC]">
        {children}
      </body>
    </html>
  )
}
