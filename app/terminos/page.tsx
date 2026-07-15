import { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | VARSAL Systems',
  description:
    'Términos y condiciones que rigen la prestación de servicios de desarrollo de software, cloud y consultoría tecnológica de VARSAL Systems S.A.S., conforme a la legislación colombiana.',
}

export default function TerminosPage() {
  return (
    <LegalPage
      title="Términos y Condiciones"
      subtitle="Condiciones generales que rigen la contratación de servicios de desarrollo de software, infraestructura cloud y consultoría tecnológica de VARSAL Systems S.A.S., bajo la legislación colombiana."
      lastUpdated="15 de julio de 2026"
      summary={[
        'Aplican a toda cotización, propuesta o contrato aceptado con VARSAL Systems.',
        'La propiedad intelectual del software se transfiere al Cliente tras el pago total (Ley 23 de 1982).',
        'Nuestra responsabilidad económica está limitada al valor del contrato afectado.',
        'Controversias: leyes de Colombia, jueces y tribunales de Oporapa, Huila.',
      ]}
      sections={[
        {
          id: 'objeto-aceptacion',
          title: 'Objeto, aceptación y marco normativo',
          content:
            'Estos Términos y Condiciones ("Términos") regulan la relación entre VARSAL Systems S.A.S. ("VARSAL") y toda persona natural o jurídica que contrate sus servicios (el "Cliente"). La aceptación de una propuesta comercial por correo electrónico, firma digital o firma manuscrita tiene plena validez jurídica conforme a la Ley 527 de 1999, que reconoce a los mensajes de datos la misma fuerza probatoria que los documentos escritos. La relación se rige, además, por el Código de Comercio colombiano y, cuando el Cliente sea consumidor final, por la Ley 1480 de 2011.',
        },
        {
          id: 'definiciones',
          title: 'Definiciones',
          content: [
            '"Servicios": desarrollo de software, infraestructura cloud, automatización, integraciones y consultoría tecnológica.',
            '"Entregables": código fuente, documentación, diseños y configuraciones producidos para el Cliente en un proyecto.',
            '"Contrato específico": cotización, propuesta u orden de servicio aceptada por escrito (incluye correo electrónico) que define alcance, plazos y honorarios.',
            '"Herramientas propietarias": metodologías, frameworks y conocimiento técnico de VARSAL, independientes de un proyecto puntual.',
          ],
        },
        {
          id: 'descripcion-servicios',
          title: 'Descripción de los servicios',
          content: [
            'Desarrollo de sistemas web y software empresarial a medida.',
            'Plataformas SaaS y sistemas administrativos (ERP, CRM).',
            'Consultoría tecnológica y auditoría de sistemas.',
            'Automatización de procesos (RPA, workflows) e integraciones vía APIs.',
            'Arquitectura cloud y DevOps (AWS, GCP, Azure).',
            'Diseño UX/UI y soporte bajo SLA cuando se pacte expresamente.',
          ],
          callout: {
            type: 'info',
            title: 'Alcance real del proyecto',
            text: 'El alcance vinculante es el descrito en el Contrato específico de cada proyecto, no esta lista general. Ante cualquier diferencia, prevalece lo pactado por escrito.',
          },
        },
        {
          id: 'contratacion-cambios',
          title: 'Contratación y cambios de alcance',
          content:
            'El proyecto se entiende contratado cuando el Cliente aprueba la propuesta por escrito y, si aplica, paga el anticipo pactado. Toda funcionalidad no incluida en el alcance original se cotiza como "cambio de alcance" y solo se ejecuta previa aprobación escrita del costo y plazo adicional.',
        },
        {
          id: 'obligaciones-cliente',
          title: 'Obligaciones del cliente',
          content: [
            'Suministrar información veraz, completa y actualizada.',
            'Custodiar las credenciales de acceso a los sistemas entregados y reportar de inmediato su uso no autorizado.',
            'Cumplir las normas legales aplicables al uso de los sistemas desarrollados.',
            'Pagar los honorarios en los montos y plazos del Contrato específico.',
            'Aprobar y retroalimentar oportunamente cada fase del desarrollo.',
            'Contar con licencias o derechos suficientes sobre marcas, contenidos y datos que entregue para el proyecto.',
          ],
        },
        {
          id: 'obligaciones-varsal',
          title: 'Obligaciones de VARSAL',
          content: [
            'Prestar los servicios con la diligencia y estándares técnicos propios de la industria del software.',
            'Informar oportunamente avances, riesgos relevantes o desviaciones del cronograma.',
            'Proteger la confidencialidad de la información del Cliente.',
            'Entregar los Entregables conforme al Contrato específico, sujeto a la colaboración oportuna del Cliente.',
            'Corregir sin costo adicional los defectos atribuibles a VARSAL reportados dentro del período de garantía pactado.',
          ],
        },
        {
          id: 'tarifas-pagos',
          title: 'Tarifas, facturación y pago',
          content: [
            'Honorarios en pesos colombianos (COP), salvo pacto expreso en otra moneda, más impuestos aplicables (IVA, retenciones) según la normativa tributaria vigente.',
            'Facturación por hito, fase, mensualidad o anticipo/saldo, según el Contrato específico.',
            'La mora superior a 15 días calendario faculta a VARSAL a suspender el servicio o el acceso a los Entregables hasta regularizar el pago, sin responsabilidad para VARSAL por los perjuicios de dicha suspensión.',
            'Las moras generan intereses hasta el máximo legal permitido.',
          ],
        },
        {
          id: 'plazos-fuerza-mayor',
          title: 'Plazos y fuerza mayor',
          content:
            'Los cronogramas son estimaciones sujetas a la colaboración oportuna del Cliente y no constituyen plazos de cumplimiento estricto salvo pacto expreso en contrario. Ninguna Parte responde por retrasos originados en caso fortuito o fuerza mayor (art. 64 del Código Civil), incluyendo fallas de proveedores de infraestructura, afectaciones masivas de conectividad o actos de autoridad.',
        },
        {
          id: 'propiedad-intelectual',
          title: 'Propiedad intelectual',
          content:
            'Los programas de ordenador están protegidos en Colombia como obra literaria bajo la Ley 23 de 1982 y la Decisión Andina 351 de 1993 (Régimen Común sobre Derecho de Autor), que reconoce al autor los derechos patrimoniales de reproducción, transformación y distribución del software. Una vez cancelado el pago total pactado, el Cliente adquiere los derechos patrimoniales sobre el software desarrollado específicamente para él, en los términos del Contrato específico. VARSAL conserva la titularidad de sus Herramientas propietarias, aun cuando estén incorporadas en los Entregables, y otorga al Cliente licencia de uso sobre ellas en la medida necesaria para operar el sistema entregado.',
        },
        {
          id: 'garantias',
          title: 'Garantías y exclusión de garantías',
          content:
            'VARSAL garantiza que los servicios se prestarán con la habilidad y el cuidado profesional propios de la industria. Salvo pacto expreso en el Contrato específico o en un Acuerdo de Nivel de Servicio (SLA), los servicios se prestan "tal cual", sin garantías implícitas de comerciabilidad o idoneidad para un propósito particular, en la máxima medida permitida por la ley. VARSAL no garantiza ausencia de vulnerabilidades futuras derivadas de cambios del entorno tecnológico, salvo contrato de mantenimiento vigente que cubra dicho soporte.',
        },
        {
          id: 'responsabilidad-indemnizacion',
          title: 'Limitación de responsabilidad e indemnización',
          content:
            'VARSAL no responde por daños indirectos, incidentales o consecuentes (pérdida de datos, de ingresos o de oportunidades), salvo negligencia grave o dolo. Su responsabilidad total frente al Cliente se limita al valor pagado bajo el Contrato específico afectado durante los doce (12) meses anteriores al hecho generador. El Cliente indemnizará a VARSAL frente a reclamaciones de terceros derivadas del uso indebido de los sistemas entregados o de la vulneración de derechos de propiedad intelectual por contenidos que el propio Cliente haya suministrado.',
          callout: {
            type: 'warning',
            title: 'Excepciones a la limitación',
            text: 'Esta limitación no aplica a las obligaciones de confidencialidad, protección de datos personales, ni a daños causados por dolo o negligencia grave, en los términos permitidos por la ley colombiana.',
          },
        },
        {
          id: 'confidencialidad-datos',
          title: 'Confidencialidad y protección de datos',
          content:
            'Ambas Partes mantendrán estricta confidencialidad sobre la información técnica, comercial y estratégica compartida, por un período de tres (3) años tras la terminación del contrato, salvo pacto distinto. Cuando la prestación del servicio implique tratamiento de datos personales por cuenta del Cliente, VARSAL actúa como Encargado del Tratamiento conforme a la Ley 1581 de 2012 y el Decreto 1074 de 2015 (Título 2, Capítulo 25), adoptando medidas de seguridad razonables. El tratamiento de datos de los usuarios del sitio se rige por nuestra Política de Privacidad.',
        },
        {
          id: 'uso-adecuado-seguridad',
          title: 'Uso adecuado y seguridad de la información',
          content:
            'El Cliente se obliga a no realizar, ni permitir a terceros, accesos abusivos, interceptación de datos, daño informático o uso de software malicioso sobre los sistemas entregados o de VARSAL, conductas tipificadas como delitos informáticos por la Ley 1273 de 2009. Cualquier incidente de seguridad detectado deberá reportarse de inmediato a VARSAL para su atención conjunta.',
        },
        {
          id: 'regimen-consumidor',
          title: 'Régimen aplicable según tipo de cliente',
          content:
            'La mayoría de los contratos de VARSAL corresponden a relaciones entre comerciantes (B2B), regidas por el Código de Comercio y la autonomía de la voluntad contractual. Cuando el Cliente sea una persona natural que contrate como destinatario final de los servicios, aplicarán adicionalmente las garantías mínimas irrenunciables del Estatuto del Consumidor (Ley 1480 de 2011), en lo que resulte pertinente a servicios de tecnología.',
        },
        {
          id: 'vigencia-cesion',
          title: 'Vigencia, terminación y cesión',
          content: [
            'Estos Términos rigen desde el primer Contrato específico aceptado y se mantienen vigentes para toda relación comercial futura, salvo modificación expresa.',
            'Cualquier Parte puede terminar un Contrato específico por incumplimiento grave no subsanado dentro de los 15 días calendario siguientes al requerimiento escrito.',
            'En terminación anticipada no imputable a VARSAL, el Cliente pagará los servicios efectivamente prestados hasta la fecha.',
            'Ninguna Parte puede ceder derechos u obligaciones sin consentimiento previo escrito de la otra, salvo cesión a matriz, subsidiaria o sucesora por fusión o reorganización societaria, con notificación oportuna.',
            'Subsisten tras la terminación: confidencialidad, propiedad intelectual, protección de datos y limitación de responsabilidad.',
          ],
        },
        {
          id: 'modificaciones-notificaciones',
          title: 'Modificaciones y notificaciones',
          content:
            'VARSAL podrá actualizar estos Términos para reflejar cambios normativos u operativos, publicando la fecha de última actualización en esta página y notificando al Cliente cuando la modificación afecte sustancialmente un contrato vigente. El uso continuado de los servicios tras la actualización implica su aceptación. Toda notificación entre las Partes se entiende válida al enviarse al correo electrónico o dirección registrados en el Contrato específico o, en su defecto, a los datos de contacto de esta página.',
        },
        {
          id: 'ley-jurisdiccion',
          title: 'Ley aplicable y jurisdicción',
          content:
            'Estos Términos se rigen por las leyes de la República de Colombia. Las Partes se someten a la jurisdicción de los jueces y tribunales de Oporapa, Huila, Colombia, renunciando a cualquier otro fuero, sin perjuicio de las normas de orden público en protección al consumidor cuando corresponda.',
        },
        {
          id: 'disposiciones-generales',
          title: 'Disposiciones generales',
          content: [
            'Acuerdo íntegro: estos Términos y el Contrato específico aplicable constituyen el acuerdo completo entre las Partes y reemplazan entendimientos previos.',
            'Independencia de las cláusulas: la invalidez de una disposición no afecta la validez de las demás.',
            'No renuncia: la falta de ejercicio de un derecho no implica su renuncia.',
            'Relación entre las Partes: VARSAL actúa siempre como contratista independiente, sin que se configure relación laboral, de mandato o de sociedad.',
          ],
        },
        {
          id: 'contacto',
          title: 'Contacto',
          content:
            'Para consultas sobre estos Términos y Condiciones o sobre cualquier Contrato específico vigente, puede comunicarse a través de los canales indicados a continuación.',
        },
      ]}
    />
  )
}
