import { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | VARSAL Systems',
  description: 'Términos y condiciones de uso de los servicios de VARSAL Systems.',
}

export default function TerminosPage() {
  return (
    <LegalPage
      title="Términos y Condiciones"
      subtitle="Condiciones generales que rigen el uso de nuestros servicios y plataformas."
      lastUpdated="1 de enero de 2025"
      sections={[
        {
          title: 'Aceptación de los términos',
          content: 'Al acceder y utilizar los servicios de VARSAL Systems S.A.S. (en adelante "VARSAL"), usted acepta quedar vinculado por estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder a nuestros servicios. VARSAL se reserva el derecho de modificar estos términos en cualquier momento, notificando a los usuarios mediante los canales establecidos.',
        },
        {
          title: 'Descripción de los servicios',
          content: [
            'Desarrollo de sistemas web y software empresarial a medida.',
            'Implementación de plataformas SaaS y sistemas administrativos (ERP, CRM).',
            'Servicios de consultoría tecnológica y auditoría de sistemas.',
            'Automatización de procesos empresariales (RPA, workflows).',
            'Integraciones de sistemas mediante APIs y middleware.',
            'Arquitectura cloud y DevOps en AWS, GCP y Azure.',
            'Diseño UX/UI y experiencia de usuario.',
            'Soporte técnico y mantenimiento de sistemas bajo SLA.',
          ],
        },
        {
          title: 'Obligaciones del cliente',
          content: [
            'Proporcionar información veraz, completa y actualizada para la prestación de los servicios.',
            'Mantener la confidencialidad de las credenciales de acceso a los sistemas entregados.',
            'Notificar de inmediato cualquier uso no autorizado de sus cuentas o sistemas.',
            'Cumplir con las normas legales aplicables en el uso de los sistemas desarrollados.',
            'Pagar los honorarios acordados en los términos y plazos establecidos en los contratos.',
            'Proporcionar retroalimentación oportuna durante las fases de desarrollo del proyecto.',
          ],
        },
        {
          title: 'Propiedad intelectual',
          content: 'Una vez completado el pago total de un proyecto, el cliente adquiere los derechos de uso del software desarrollado según los términos del contrato específico. VARSAL Systems conserva la propiedad de las metodologías, frameworks propietarios, herramientas internas y conocimiento técnico general utilizado en el desarrollo. El código fuente entregable, documentación técnica y activos de diseño son propiedad del cliente según lo estipulado en cada contrato.',
        },
        {
          title: 'Limitación de responsabilidad',
          content: 'VARSAL Systems no será responsable por daños indirectos, incidentales o consecuentes derivados del uso o imposibilidad de uso de los sistemas desarrollados, incluyendo pérdidas de datos, interrupciones del negocio o pérdidas de beneficios, siempre que dichas situaciones no sean atribuibles a negligencia grave o dolo por parte de VARSAL. La responsabilidad máxima de VARSAL frente al cliente se limitará al valor total del contrato específico afectado.',
        },
        {
          title: 'Confidencialidad',
          content: 'Ambas partes se comprometen a mantener estricta confidencialidad sobre la información técnica, comercial y estratégica compartida durante la relación contractual. Esta obligación de confidencialidad se extiende por un período de 3 años después de la terminación de la relación contractual, salvo acuerdo diferente en el contrato específico.',
        },
        {
          title: 'Ley aplicable y jurisdicción',
          content: 'Estos términos se rigen por las leyes de la República de Colombia. Para la resolución de cualquier controversia, las partes acuerdan someterse a la jurisdicción de los jueces y tribunales de la ciudad de Bogotá D.C., Colombia, renunciando a cualquier otro fuero que pudiera corresponderles.',
        },
      ]}
    />
  )
}
