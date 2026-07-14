import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { themeInitScript } from '@/lib/theme'
import BackToTop from '@/components/ui/BackToTop'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
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
    <html lang="es" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
        <BackToTop />
      </body>
    </html>
  )
}
