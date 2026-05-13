import { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Política de Cookies | VARSAL Systems',
}

export default function CookiesPage() {
  return (
    <LegalPage
      title="Política de Cookies"
      subtitle="Información sobre el uso de cookies y tecnologías similares en nuestras plataformas."
      lastUpdated="1 de enero de 2025"
      sections={[
        {
          title: '¿Qué son las cookies?',
          content: 'Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Nos permiten recordar sus preferencias, analizar el uso del sitio y mejorar su experiencia de navegación. Usted puede controlar el uso de cookies a través de la configuración de su navegador.',
        },
        {
          title: 'Tipos de cookies que utilizamos',
          content: [
            'Cookies estrictamente necesarias: esenciales para el funcionamiento del sitio. No pueden desactivarse.',
            'Cookies de rendimiento: recopilan información anónima sobre cómo los usuarios interactúan con el sitio (Google Analytics).',
            'Cookies de funcionalidad: recuerdan sus preferencias de idioma, tema y configuración.',
            'Cookies de marketing: se usan para mostrar anuncios relevantes (solo con su consentimiento).',
            'Cookies de sesión: se eliminan al cerrar el navegador y gestionan el estado de la sesión.',
            'Cookies persistentes: permanecen en su dispositivo durante el período indicado en cada cookie.',
          ],
        },
        {
          title: 'Cookies de terceros',
          content: [
            'Google Analytics: análisis de tráfico y comportamiento de usuario (ga.js, _ga, _gid).',
            'Google Tag Manager: gestión de etiquetas de marketing y analítica.',
            'LinkedIn Insight Tag: análisis de campañas publicitarias en LinkedIn.',
            'Hotjar: mapas de calor y grabaciones de sesión para mejorar UX.',
          ],
        },
        {
          title: 'Cómo gestionar las cookies',
          content: [
            'Chrome: Configuración > Privacidad y seguridad > Cookies y otros datos de sitios.',
            'Firefox: Opciones > Privacidad y seguridad > Cookies y datos del sitio.',
            'Safari: Preferencias > Privacidad > Gestionar datos del sitio web.',
            'Edge: Configuración > Privacidad, búsqueda y servicios > Cookies.',
            'También puede usar nuestra herramienta de gestión de consentimiento en el banner de cookies.',
          ],
        },
        {
          title: 'Consecuencias de deshabilitar cookies',
          content: 'Algunas funcionalidades del sitio pueden no estar disponibles si deshabilita ciertas cookies. Las cookies estrictamente necesarias no pueden desactivarse sin afectar el funcionamiento básico del sitio. Las cookies de preferencias son opcionales y su desactivación puede afectar la personalización de la experiencia.',
        },
      ]}
    />
  )
}
