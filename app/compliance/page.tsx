import { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Compliance | VARSAL Systems',
}

export default function CompliancePage() {
  return (
    <LegalPage
      title="Cumplimiento y Compliance"
      subtitle="Marco de cumplimiento normativo y estándares internacionales que guían nuestra operación."
      lastUpdated="1 de enero de 2025"
      sections={[
        {
          title: 'Marco normativo colombiano',
          content: [
            'Ley 1581 de 2012: Protección de datos personales y habeas data.',
            'Decreto 1377 de 2013: Reglamentación de la Ley de Protección de Datos.',
            'Ley 1273 de 2009: Delitos informáticos y protección de la información.',
            'Ley 527 de 1999: Comercio electrónico y firmas digitales.',
            'Ley 1978 de 2019: Modernización del sector TIC en Colombia.',
            'Circular SIC 002 de 2015: Guía de implementación del Régimen de Protección de Datos.',
          ],
        },
        {
          title: 'Estándares internacionales de referencia',
          content: [
            'ISO/IEC 27001: Marco de gestión de seguridad de la información (en proceso de certificación).',
            'ISO/IEC 27017: Controles de seguridad para servicios cloud.',
            'SOC 2 Type II: Controles de seguridad, disponibilidad y confidencialidad.',
            'OWASP Top 10: Prevención de vulnerabilidades web más críticas.',
            'NIST Cybersecurity Framework: Gestión del riesgo cibernético.',
            'GDPR: Alineación con estándares europeos de protección de datos para clientes internacionales.',
          ],
        },
        {
          title: 'Programa de compliance interno',
          content: [
            'Política de privacidad y tratamiento de datos actualizada anualmente.',
            'Capacitación periódica del equipo en seguridad y protección de datos.',
            'Evaluaciones de impacto de privacidad (DPIA) para proyectos de alto riesgo.',
            'Registros de actividades de tratamiento de datos (ROPA).',
            'Auditorías internas trimestrales de cumplimiento.',
            'Revisión legal anual de contratos y políticas.',
          ],
        },
        {
          title: 'Gestión de proveedores',
          content: [
            'Evaluación de seguridad y compliance antes de contratar proveedores críticos.',
            'Contratos de tratamiento de datos con todos los encargados del tratamiento.',
            'Revisión periódica de proveedores con acceso a datos sensibles.',
            'Cláusulas contractuales de seguridad y confidencialidad.',
          ],
        },
        {
          title: 'Gestión de riesgos',
          content: 'VARSAL Systems mantiene un registro activo de riesgos tecnológicos, legales y operacionales, actualizado trimestralmente. Para cada riesgo identificado se define un responsable, una estrategia de mitigación y un plan de contingencia. Los riesgos críticos son reportados a la dirección de forma mensual.',
        },
        {
          title: 'Contacto de Compliance',
          content: 'Para consultas relacionadas con nuestro programa de cumplimiento normativo, puede contactar a nuestro equipo legal en: varsalsystems@gmail.com. Respondemos en un plazo máximo de 5 días hábiles.',
        },
      ]}
    />
  )
}
