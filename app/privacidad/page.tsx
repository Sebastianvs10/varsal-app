import { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Política de Privacidad | VARSAL Systems',
  description: 'Cómo recopilamos, usamos y protegemos sus datos personales en VARSAL Systems.',
}

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Política de Privacidad"
      subtitle="Información sobre el tratamiento y protección de sus datos personales conforme a la Ley 1581 de 2012."
      lastUpdated="1 de enero de 2025"
      sections={[
        {
          title: 'Responsable del tratamiento',
          content: 'VARSAL Systems S.A.S., identificada con NIT [en trámite], con domicilio en Bogotá D.C., Colombia, es la responsable del tratamiento de los datos personales recopilados a través de sus plataformas y servicios. Contacto: privacidad@varsalsystems.com.',
        },
        {
          title: 'Datos que recopilamos',
          content: [
            'Datos de identificación: nombre, apellidos, número de identificación.',
            'Datos de contacto: correo electrónico, número de teléfono, dirección.',
            'Datos profesionales: cargo, empresa, sector económico.',
            'Datos de navegación: dirección IP, tipo de navegador, páginas visitadas, tiempo de sesión.',
            'Datos técnicos: logs de acceso, identificadores de dispositivo, cookies.',
            'Datos de proyecto: requerimientos, especificaciones técnicas, información del negocio compartida.',
          ],
        },
        {
          title: 'Finalidades del tratamiento',
          content: [
            'Gestión de la relación contractual y prestación de servicios tecnológicos.',
            'Comunicación comercial y envío de propuestas personalizadas (con consentimiento).',
            'Envío de newsletter y contenido de valor (con consentimiento previo).',
            'Mejora de nuestros productos, servicios y plataformas.',
            'Cumplimiento de obligaciones legales y fiscales aplicables en Colombia.',
            'Análisis estadístico y de comportamiento para optimizar la experiencia de usuario.',
          ],
        },
        {
          title: 'Base legal del tratamiento',
          content: 'El tratamiento de sus datos se fundamenta en: (i) la ejecución del contrato de prestación de servicios; (ii) el consentimiento expreso del titular para comunicaciones comerciales; (iii) el interés legítimo de VARSAL en mejorar sus servicios; y (iv) el cumplimiento de obligaciones legales conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013.',
        },
        {
          title: 'Derechos del titular',
          content: [
            'Conocer, actualizar y rectificar sus datos personales.',
            'Solicitar prueba del consentimiento otorgado.',
            'Ser informado sobre el uso de sus datos.',
            'Revocar el consentimiento y solicitar la supresión de datos (salvo obligaciones legales).',
            'Acceder gratuitamente a sus datos personales una vez al mes.',
            'Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).',
          ],
        },
        {
          title: 'Conservación de datos',
          content: 'Los datos personales se conservarán durante el tiempo necesario para cumplir con las finalidades del tratamiento y las obligaciones legales aplicables. Los datos contractuales se conservarán por un mínimo de 10 años conforme a las disposiciones del Código de Comercio colombiano.',
        },
        {
          title: 'Transferencias internacionales',
          content: 'Algunos de nuestros proveedores de infraestructura (AWS, Google Cloud) pueden procesar datos fuera de Colombia. En todos los casos, garantizamos que dichas transferencias cuentan con las salvaguardas adecuadas y cumplen con la normativa colombiana de protección de datos.',
        },
      ]}
    />
  )
}
