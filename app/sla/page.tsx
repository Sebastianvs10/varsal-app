import { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Acuerdo de Nivel de Servicio (SLA) | VARSAL Systems',
}

export default function SlaPage() {
  return (
    <LegalPage
      title="Acuerdo de Nivel de Servicio (SLA)"
      subtitle="Compromisos de disponibilidad, rendimiento y soporte para los sistemas desarrollados por VARSAL Systems."
      lastUpdated="1 de enero de 2025"
      sections={[
        {
          title: 'Disponibilidad garantizada',
          content: [
            'Tier Estándar: 99.5% de disponibilidad mensual (máx. 3.6 horas de downtime/mes).',
            'Tier Business: 99.9% de disponibilidad mensual (máx. 43 minutos de downtime/mes).',
            'Tier Enterprise: 99.95% de disponibilidad mensual (máx. 21 minutos de downtime/mes).',
            'La disponibilidad se mide mediante monitoreo automático 24/7 con alertas en tiempo real.',
            'El downtime programado para mantenimiento se notificará con mínimo 48 horas de anticipación.',
          ],
        },
        {
          title: 'Tiempos de respuesta y resolución',
          content: [
            'Incidente Crítico (P1 - sistema caído): Respuesta en 30 min, resolución en 4 horas.',
            'Incidente Alto (P2 - funcionalidad crítica afectada): Respuesta en 2 horas, resolución en 8 horas.',
            'Incidente Medio (P3 - funcionalidad parcial afectada): Respuesta en 4 horas, resolución en 24 horas.',
            'Incidente Bajo (P4 - consulta o mejora menor): Respuesta en 1 día hábil, resolución en 5 días hábiles.',
            'Los tiempos aplican para horario hábil (lunes a viernes 7am - 7pm COT) en planes Estándar y Business.',
            'Plan Enterprise: soporte 24/7/365 para incidentes P1 y P2.',
          ],
        },
        {
          title: 'Canales de soporte incluidos',
          content: [
            'Sistema de tickets en línea con seguimiento en tiempo real.',
            'Correo electrónico de soporte: soporte@varsalsystems.com',
            'WhatsApp Business para incidentes P1 y P2 (planes Business y Enterprise).',
            'Videoconferencia para resolución de incidentes complejos.',
            'Llamada telefónica directa para Plan Enterprise.',
          ],
        },
        {
          title: 'Compensaciones por incumplimiento',
          content: [
            'Disponibilidad entre 99.0% y 99.5%: crédito del 10% del cargo mensual.',
            'Disponibilidad entre 95.0% y 99.0%: crédito del 25% del cargo mensual.',
            'Disponibilidad por debajo del 95.0%: crédito del 50% del cargo mensual.',
            'Los créditos se aplican automáticamente en la siguiente factura.',
            'No aplican para downtimes causados por: fuerza mayor, ataques DDoS, acciones del cliente, o mantenimiento programado.',
          ],
        },
        {
          title: 'Exclusiones del SLA',
          content: [
            'Interrupciones causadas por el cliente o terceros autorizados por este.',
            'Ataques de denegación de servicio (DDoS) de escala no mitigable.',
            'Fallos en la infraestructura del proveedor cloud fuera del control de VARSAL.',
            'Mantenimientos programados y comunicados con anticipación.',
            'Desastres naturales o eventos de fuerza mayor.',
          ],
        },
        {
          title: 'Métricas y reportes',
          content: 'VARSAL Systems proporciona reportes mensuales de disponibilidad, tiempos de respuesta y resolución a todos los clientes bajo contrato de soporte activo. Los clientes Plan Enterprise reciben dashboards en tiempo real con métricas de rendimiento y disponibilidad de sus sistemas.',
        },
      ]}
    />
  )
}
