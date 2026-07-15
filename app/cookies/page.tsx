import { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Política de Cookies | VARSAL Systems',
  description:
    'Detalle honesto de las cookies y tecnologías de almacenamiento local que utiliza el sitio web de VARSAL Systems, conforme al Decreto 1074 de 2015 y la Ley 1581 de 2012.',
}

export default function CookiesPage() {
  return (
    <LegalPage
      title="Política de Cookies"
      subtitle="Qué cookies y tecnologías de almacenamiento local utiliza realmente este sitio, para qué sirven y cómo controlarlas, conforme a la Ley 1581 de 2012."
      lastUpdated="15 de julio de 2026"
      summary={[
        'Este sitio no utiliza cookies de analítica ni de publicidad de terceros.',
        'Solo usamos almacenamiento técnico esencial: preferencia de tema y sesión de administración.',
        'Ninguna cookie de este sitio identifica ni rastrea a los visitantes públicos.',
        'Si en el futuro se añaden herramientas de analítica, solicitaremos su consentimiento previo.',
      ]}
      sections={[
        {
          id: 'que-son',
          title: '¿Qué son las cookies y el almacenamiento local?',
          content:
            'Las cookies son pequeños archivos de texto que un sitio almacena en su navegador. El almacenamiento local (localStorage) es una tecnología similar para guardar información en el navegador sin enviarla automáticamente al servidor. Ambas permiten recordar preferencias o mantener sesiones activas.',
        },
        {
          id: 'transparencia',
          title: 'Transparencia sobre lo que realmente usamos',
          content:
            'A diferencia de políticas genéricas que enumeran cookies de analítica o marketing que en la práctica no se usan, aquí encontrará únicamente las tecnologías activas en varsalsystems.com, verificadas directamente en nuestro código fuente. Actualmente el sitio no integra Google Analytics, Google Tag Manager, píxeles publicitarios ni herramientas de grabación de sesión de ningún proveedor.',
        },
        {
          id: 'inventario',
          title: 'Cookies y almacenamiento que utilizamos',
          content: 'Detalle completo de las tecnologías activas en este sitio:',
          table: {
            headers: ['Nombre', 'Tipo', 'Finalidad', 'Duración', 'Consentimiento'],
            rows: [
              [
                'varsal-theme',
                'Almacenamiento local (no es cookie)',
                'Recordar su preferencia de tema visual claro/oscuro.',
                'Persistente, hasta borrar datos del navegador.',
                'No requerido — no identifica al usuario.',
              ],
              [
                'varsal_admin_session',
                'Cookie propia, técnica y esencial',
                'Mantener la sesión iniciada en el panel administrativo (/admin) de forma segura.',
                '7 días, o hasta cerrar sesión.',
                'Exenta por ser estrictamente necesaria (art. 12, Decreto 1377 de 2013).',
              ],
            ],
          },
        },
        {
          id: 'terceros',
          title: 'Cookies de terceros',
          content:
            'Este sitio no incorpora scripts de analítica, marketing o publicidad de terceros. Por lo tanto, no se instalan cookies de terceros en su navegador al visitar varsalsystems.com.',
          callout: {
            type: 'warning',
            title: 'Si esto cambia',
            text: 'Si en el futuro incorporamos herramientas de analítica o marketing, actualizaremos esta política con el detalle de cada cookie (proveedor, finalidad y duración) y solicitaremos su consentimiento previo mediante un aviso visible en el sitio, antes de activarlas.',
          },
        },
        {
          id: 'base-legal-cookies',
          title: 'Base legal',
          content:
            'La cookie de sesión del panel administrativo es una cookie técnica exenta del deber de consentimiento previo, conforme al artículo 12 del Decreto 1377 de 2013, por ser estrictamente necesaria para prestar el servicio solicitado por el usuario autorizado. El almacenamiento de su preferencia de tema no involucra datos personales identificables y se gestiona enteramente en su navegador, conforme al principio de libertad del artículo 4 de la Ley 1581 de 2012.',
        },
        {
          id: 'gestionar-cookies',
          title: 'Cómo gestionar o eliminar cookies',
          content: [
            'Chrome: Configuración > Privacidad y seguridad > Cookies y otros datos de sitios.',
            'Firefox: Opciones > Privacidad y seguridad > Cookies y datos del sitio.',
            'Safari: Preferencias > Privacidad > Gestionar datos del sitio web.',
            'Edge: Configuración > Privacidad, búsqueda y servicios > Cookies.',
          ],
        },
        {
          id: 'cambios-cookies',
          title: 'Cambios a esta política',
          content:
            'Esta Política se actualizará cada vez que cambien las tecnologías utilizadas en el sitio, indicando la fecha de última actualización.',
        },
        {
          id: 'contacto',
          title: 'Contacto',
          content: 'Si tiene dudas sobre esta Política de Cookies, escríbanos a través de los canales indicados a continuación.',
        },
      ]}
    />
  )
}
