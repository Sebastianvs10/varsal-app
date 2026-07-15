/* Configuración central del sitio (SEO, URLs, datos de organización) */
/* Autor: Ing. J Sebastian Vargas S */

/** URL pública canónica. Se puede sobreescribir con APP_URL en el entorno. */
export const SITE_URL = (
  process.env.APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://varsalsystems.com'
).replace(/\/+$/, '')

export const SITE_NAME = 'VARSAL Systems'

export const SITE_DESCRIPTION =
  'Software a medida, infraestructura cloud, automatización y consultoría tecnológica. ' +
  'Construimos el software que tu empresa necesita para operar sin fricción.'

export const SITE_EMAIL = 'varsalsystems@gmail.com'

/** Teléfono de contacto — formato de despliegue y formato E.164 para enlaces `tel:`. */
export const SITE_PHONE = '+57 318 427 3263'
export const SITE_PHONE_TEL = '+573184273263'

/** Domicilio de la empresa. */
export const SITE_ADDRESS = {
  street: 'Calle 7 #7-21',
  city: 'Oporapa',
  region: 'Huila',
  country: 'Colombia',
} as const

/** Rutas públicas indexables para el sitemap (sin /admin ni /api). */
export const PUBLIC_ROUTES = [
  '/',
  '/blog',
  '/seguridad',
  '/compliance',
  '/sla',
  '/privacidad',
  '/terminos',
  '/cookies',
  '/datos',
  '/aviso-legal',
] as const

/** Datos estructurados JSON-LD (Organization + WebSite) para buscadores. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        legalName: 'VARSAL Systems S.A.S.',
        alternateName: 'VARSAL',
        url: SITE_URL,
        // Logo cuadrado (mín. 112x112 recomendado por Google) — el wordmark
        // rectangular se expone aparte en `image` para no distorsionar el
        // ícono de marca en el panel de resultados de búsqueda.
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/icon.png`,
          width: 512,
          height: 512,
        },
        image: `${SITE_URL}/logo-varsal.png`,
        description: SITE_DESCRIPTION,
        email: SITE_EMAIL,
        telephone: SITE_PHONE_TEL,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE_ADDRESS.street,
          addressLocality: SITE_ADDRESS.city,
          addressRegion: SITE_ADDRESS.region,
          addressCountry: 'CO',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: SITE_EMAIL,
          telephone: SITE_PHONE_TEL,
          contactType: 'customer support',
          areaServed: 'CO',
          availableLanguage: ['es'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'es-CO',
      },
    ],
  }
}
