import { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Política de Seguridad | VARSAL Systems',
}

export default function SeguridadPage() {
  return (
    <LegalPage
      title="Política de Seguridad"
      subtitle="Estándares y controles de seguridad que aplicamos en el desarrollo y operación de sistemas."
      lastUpdated="1 de enero de 2025"
      sections={[
        {
          title: 'Principios de seguridad',
          content: [
            'Security by Design: la seguridad se incorpora desde la fase de diseño, no como complemento.',
            'Mínimo privilegio: cada componente y usuario accede solo a lo estrictamente necesario.',
            'Defensa en profundidad: múltiples capas de seguridad en todos los sistemas.',
            'Zero Trust: verificación continua de identidad y autorización en cada transacción.',
            'Transparencia: comunicación oportuna ante cualquier incidente de seguridad.',
          ],
        },
        {
          title: 'Seguridad en el desarrollo (DevSecOps)',
          content: [
            'Análisis estático de código (SAST) en cada pull request.',
            'Análisis de dependencias y vulnerabilidades conocidas (SCA).',
            'Pruebas de seguridad automatizadas en pipelines CI/CD.',
            'Revisión de código por pares con criterios de seguridad.',
            'Pentesting periódico por equipos internos y terceros especializados.',
            'Gestión segura de secretos mediante vaults (AWS Secrets Manager, HashiCorp Vault).',
          ],
        },
        {
          title: 'Seguridad de la infraestructura',
          content: [
            'Cifrado en tránsito: TLS 1.2+ para todas las comunicaciones.',
            'Cifrado en reposo: AES-256 para datos almacenados.',
            'Firewalls y WAF (Web Application Firewall) en todos los entornos productivos.',
            'Segmentación de red con subredes privadas para bases de datos.',
            'Monitoreo de amenazas 24/7 con SIEM y alertas automáticas.',
            'Gestión de parches: aplicación de actualizaciones de seguridad en máximo 72 horas para críticas.',
          ],
        },
        {
          title: 'Control de acceso y autenticación',
          content: [
            'Autenticación multifactor (MFA) obligatoria para accesos administrativos.',
            'Gestión de identidades con roles y permisos granulares (RBAC).',
            'Rotación periódica de credenciales y llaves de acceso.',
            'Auditoría completa de accesos y operaciones en sistemas críticos.',
            'Single Sign-On (SSO) integrado con proveedores de identidad empresariales.',
          ],
        },
        {
          title: 'Gestión de incidentes de seguridad',
          content: 'En caso de detectar un incidente de seguridad que afecte datos personales o sistemas del cliente, VARSAL Systems notificará al cliente en un plazo máximo de 72 horas desde la detección, con información sobre el alcance, los datos afectados, las medidas de contención adoptadas y el plan de remediación.',
        },
        {
          title: 'Reporte de vulnerabilidades',
          content: 'Si descubre una vulnerabilidad en nuestros sistemas, le agradecemos reportarla de forma responsable a varsalsystems@gmail.com. No llevaremos a cabo acciones legales contra investigadores que actúen de buena fe y sigan un proceso de divulgación responsable. Respondemos a todos los reportes en un plazo máximo de 5 días hábiles.',
        },
      ]}
    />
  )
}
