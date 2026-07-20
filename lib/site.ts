/* Configuración central del sitio (SEO, URLs, datos de organización) */
/* Autor: Ing. J Sebastian Vargas S */

/** URL pública canónica. Debe coincidir con la URL final (www) sin redirecciones. */
export const SITE_URL = (
  process.env.APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://www.varsalsystems.com'
).replace(/\/+$/, '')

/** Nombre de marca que Google muestra junto al favicon en resultados. */
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
  const logoUrl = `${SITE_URL}/icon.png`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        legalName: 'VARSAL Systems S.A.S.',
        alternateName: ['VARSAL Systems', 'VARSAL'],
        url: SITE_URL,
        // Logo cuadrado ≥112×112, URL directa (sin redirect www↔apex).
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#logo`,
          url: logoUrl,
          contentUrl: logoUrl,
          width: 512,
          height: 512,
          caption: SITE_NAME,
        },
        image: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo-varsal.png`,
        },
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
        alternateName: ['VARSAL Systems', 'VARSAL'],
        description: SITE_DESCRIPTION,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'es-CO',
      },
    ],
  }
}
