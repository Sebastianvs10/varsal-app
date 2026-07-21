import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { themeInitScript } from '@/lib/theme'
import BackToTop from '@/components/ui/BackToTop'
import CookieConsent from '@/components/cookies/CookieConsent'
import {
  organizationJsonLd,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from '@/lib/site'
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

const TITLE = 'VARSAL Systems | Soluciones Tecnológicas Empresariales'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  // Favicon / iconos explícitos para Google Search (mín. 48×48, preferible 512).
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  keywords: [
    'desarrollo de software a medida',
    'software empresarial',
    'aplicaciones web y móviles',
    'infraestructura cloud',
    'DevOps',
    'automatización de procesos',
    'integraciones',
    'consultoría tecnológica',
    'transformación digital',
    'Colombia',
    'Desarrollo web',
    'Desarrollo de software',
    'Desarrollo de aplicaciones',
    'Desarrollo de software empresarial',
    'Desarrollo de software a medida',
    'Desarrollo de software empresarial',
    'VARSAL Systems',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: SITE_URL,
    title: TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    // La imagen se genera dinámicamente vía app/opengraph-image.tsx (1200×630,
    // convención de archivo de Next.js) — no declarar aquí para evitar un
    // og:image duplicado/conflictivo.
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: SITE_DESCRIPTION,
    creator: '@VARSALSystems',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  // Verificación de propiedad para motores de búsqueda adicionales a Google
  // (que ya está verificado vía public/googleddd09d383ab55ebb.html).
  // Bing/Edge y Yandex requieren su propio código: se define en variables de
  // entorno para no hardcodear valores y se omite si no está configurado.
  verification: {
    other: {
      ...(process.env.BING_SITE_VERIFICATION
        ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION }
        : {}),
      ...(process.env.YANDEX_SITE_VERIFICATION
        ? { 'yandex-verification': process.env.YANDEX_SITE_VERIFICATION }
        : {}),
    },
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
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans pb-16 lg:pb-0">
        {children}
        <BackToTop />
        <CookieConsent />
      </body>
    </html>
  )
}
