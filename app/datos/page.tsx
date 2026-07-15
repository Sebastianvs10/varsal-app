import { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Tratamiento de Datos | VARSAL Systems',
}

export default function DatosPage() {
  return (
    <LegalPage
      title="Política de Tratamiento de Datos Personales"
      subtitle="Conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013 de la República de Colombia."
      lastUpdated="1 de enero de 2025"
      sections={[
        {
          title: 'Marco legal aplicable',
          content: 'Esta política se desarrolla en cumplimiento de la Ley 1581 de 2012 (Protección de Datos Personales), el Decreto 1377 de 2013, y las demás normas que las modifiquen, complementen o sustituyan. VARSAL Systems actúa como Responsable del Tratamiento de los datos personales de sus usuarios, clientes y colaboradores.',
        },
        {
          title: 'Datos de carácter sensible',
          content: 'VARSAL Systems no recopila ni trata datos personales de carácter sensible (datos biométricos, de salud, orientación política, religiosa o sexual) en el desarrollo normal de sus actividades. Si por razones del proyecto se requiriera tratar este tipo de datos, se solicitará consentimiento expreso e informado del titular con las salvaguardas adicionales requeridas por ley.',
        },
        {
          title: 'Medidas de seguridad implementadas',
          content: [
            'Cifrado de datos en tránsito (TLS 1.3) y en reposo (AES-256).',
            'Control de acceso basado en roles (RBAC) con mínimo privilegio.',
            'Auditorías de seguridad periódicas y pruebas de penetración.',
            'Procedimientos de respuesta a incidentes y notificación oportuna.',
            'Segregación de datos entre entornos de desarrollo, pruebas y producción.',
            'Backups cifrados con retención controlada y pruebas de restauración.',
          ],
        },
        {
          title: 'Encargados del tratamiento',
          content: [
            'Amazon Web Services (AWS): infraestructura cloud y almacenamiento.',
            'Google LLC: analítica web (Google Analytics) y productividad.',
            'Stripe Inc.: procesamiento de pagos (cuando aplique).',
            'Todos los encargados cuentan con contratos de tratamiento de datos que garantizan niveles de seguridad equivalentes.',
          ],
        },
        {
          title: 'Procedimiento para ejercer derechos',
          content: 'Para ejercer sus derechos de acceso, rectificación, cancelación u oposición, envíe una solicitud a varsalsystems@gmail.com indicando: (i) nombre completo e identificación, (ii) derecho que desea ejercer, (iii) datos sobre los que solicita el ejercicio, y (iv) documentación de soporte si aplica. Responderemos en un plazo máximo de 10 días hábiles.',
        },
        {
          title: 'Vigencia de la política',
          content: 'Esta política de tratamiento de datos personales rige a partir del 1 de enero de 2025 y permanecerá vigente hasta que sea reemplazada por una versión actualizada. Cualquier cambio sustancial será comunicado a los titulares mediante los canales establecidos con al menos 30 días de anticipación.',
        },
      ]}
    />
  )
}
