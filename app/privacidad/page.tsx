import { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Política de Privacidad | VARSAL Systems',
  description:
    'Cómo VARSAL Systems recopila, usa, protege y permite ejercer derechos sobre los datos personales de sus usuarios, conforme a la Ley 1581 de 2012 y el Decreto 1074 de 2015.',
}

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Política de Privacidad"
      subtitle="Cómo recopilamos, usamos y protegemos sus datos personales, conforme a la Ley 1581 de 2012, el Decreto 1074 de 2015 (Título 2, Capítulo 25) y demás normas de Habeas Data en Colombia."
      lastUpdated="15 de julio de 2026"
      summary={[
        'Solo recopilamos los datos que usted nos entrega voluntariamente en el formulario de contacto.',
        'No vendemos ni compartimos sus datos con terceros para fines publicitarios.',
        'Puede conocer, actualizar, rectificar o eliminar sus datos en cualquier momento (art. 8, Ley 1581/2012).',
        'Proveedores certificados (Neon, Vercel, Resend) procesan sus datos como Encargados del Tratamiento.',
      ]}
      sections={[
        {
          id: 'introduccion',
          title: 'Introducción y marco normativo',
          content:
            'Esta Política describe cómo VARSAL Systems S.A.S. ("VARSAL") recopila, usa y protege los datos personales de quienes visitan varsalsystems.com o diligencian nuestro formulario de contacto, en cumplimiento de la Ley 1581 de 2012, su decreto reglamentario compilado en el Decreto Único 1074 de 2015 (Título 2, Capítulo 25) y la Ley 527 de 1999, que reconoce validez jurídica al consentimiento otorgado por medios electrónicos.',
        },
        {
          id: 'responsable',
          title: 'Responsable del tratamiento',
          content:
            'VARSAL Systems S.A.S., domiciliada en Calle 7 #7-21, Oporapa, Huila, Colombia, es la Responsable del Tratamiento de los datos personales recopilados a través de sus plataformas digitales, conforme al artículo 3 literal e) de la Ley 1581 de 2012.',
        },
        {
          id: 'principios',
          title: 'Principios que aplicamos',
          content: [
            'Legalidad (art. 4, lit. a): el tratamiento se sujeta a la Ley 1581 de 2012 y sus decretos reglamentarios.',
            'Finalidad (lit. b): los datos se recopilan para propósitos legítimos e informados en esta política.',
            'Libertad (lit. c): el tratamiento solo se ejerce con consentimiento previo, expreso e informado del titular.',
            'Veracidad y calidad (lit. d): procuramos información veraz, completa, exacta y actualizada.',
            'Transparencia (lit. e): garantizamos al titular el derecho a conocer el tratamiento de sus datos.',
            'Acceso restringido y seguridad (lits. f y g): solo personal autorizado accede a los datos, bajo medidas técnicas razonables.',
            'Confidencialidad (lit. h): quienes intervienen en el tratamiento están obligados a la reserva de la información.',
          ],
        },
        {
          id: 'datos-recopilados',
          title: 'Datos que recopilamos',
          content: [
            'Identificación y contacto: nombre, correo electrónico y teléfono, entregados voluntariamente en el formulario.',
            'Datos de la empresa: razón social y presupuesto estimado, cuando el titular decide compartirlos.',
            'Datos del proyecto: servicio de interés y mensaje enviado.',
            'Datos técnicos mínimos: IP y fecha/hora de envío, únicamente con fines de seguridad y prevención de spam.',
          ],
          callout: {
            type: 'info',
            title: 'Lo que no recopilamos',
            text: 'No usamos cookies de rastreo publicitario ni analítica de terceros. No recopilamos datos sensibles (salud, origen étnico, convicciones políticas o religiosas, biométricos) y el sitio no está dirigido a menores de edad.',
          },
        },
        {
          id: 'recoleccion-finalidades',
          title: 'Cómo y para qué usamos sus datos',
          content:
            'Recopilamos sus datos de forma directa: al diligenciar el formulario de contacto, escribirnos por correo o comunicarse telefónicamente. Los usamos para responder solicitudes de información o cotización, gestionar la relación contractual, enviar comunicaciones sobre su proyecto, prevenir el uso indebido del formulario y cumplir obligaciones legales, contables y fiscales aplicables en Colombia.',
        },
        {
          id: 'base-legal',
          title: 'Base legal y autorización',
          content:
            'El tratamiento se fundamenta en el consentimiento libre, previo, expreso e informado que usted otorga al enviar el formulario (art. 9, Ley 1581 de 2012), consentimiento que, conforme a la Ley 527 de 1999, tiene plena validez por haberse manifestado mediante un mensaje de datos. Cuando exista una relación contractual, el tratamiento también se sustenta en su ejecución y en el cumplimiento de obligaciones legales de VARSAL.',
        },
        {
          id: 'encargados',
          title: 'Encargados del tratamiento y proveedores',
          content:
            'VARSAL utiliza proveedores de infraestructura que actúan como Encargados del Tratamiento bajo sus instrucciones (art. 3, lit. d, Ley 1581 de 2012):',
          table: {
            headers: ['Proveedor', 'Función', 'Datos que procesa'],
            rows: [
              ['Vercel Inc.', 'Alojamiento (hosting) del sitio web', 'Datos técnicos de navegación y solicitudes HTTP'],
              ['Neon (Postgres serverless)', 'Almacenamiento de la base de datos', 'Datos enviados a través del formulario de contacto'],
              ['Resend', 'Envío de correos de notificación y confirmación', 'Nombre y correo electrónico del remitente del formulario'],
            ],
          },
        },
        {
          id: 'transferencias',
          title: 'Transferencia internacional de datos',
          content:
            'Algunos proveedores (Vercel, Neon, Resend) pueden procesar o almacenar datos fuera de Colombia. Verificamos que ofrezcan garantías de seguridad adecuadas, conforme a los criterios de la Superintendencia de Industria y Comercio (SIC) para transferencias internacionales bajo el artículo 26 de la Ley 1581 de 2012.',
        },
        {
          id: 'conservacion-seguridad',
          title: 'Conservación y seguridad de los datos',
          content: [
            'Los datos del formulario se conservan mientras sea necesario para atender la solicitud y un plazo razonable de seguimiento comercial, salvo eliminación anticipada a petición del titular.',
            'Los datos de relaciones contractuales se conservan según los plazos del Código de Comercio y la normativa tributaria.',
            'Aplicamos cifrado en tránsito (HTTPS/TLS), acceso restringido mediante panel administrativo autenticado y límites técnicos contra envíos automatizados.',
          ],
        },
        {
          id: 'derechos-titular',
          title: 'Sus derechos y cómo ejercerlos',
          content: [
            'Conocer, actualizar y rectificar sus datos personales (art. 8, lit. a).',
            'Solicitar prueba de la autorización otorgada (lit. b).',
            'Ser informado sobre el uso dado a sus datos (lit. c).',
            'Revocar la autorización y/o solicitar la supresión de sus datos, cuando no exista deber legal o contractual que lo impida (lit. d).',
            'Acceder gratuitamente a sus datos personales (lit. e).',
            'Presentar quejas ante la Superintendencia de Industria y Comercio (lit. f) por infracciones a la ley de protección de datos.',
          ],
          callout: {
            type: 'info',
            title: 'Procedimiento',
            text: 'Escriba al correo indicado en la sección de contacto especificando su nombre, el derecho a ejercer y su solicitud. Respondemos en los plazos legales del art. 14: 10 días hábiles para consultas y 15 días hábiles para reclamos.',
          },
        },
        {
          id: 'cookies-referencia',
          title: 'Cookies y tecnologías similares',
          content:
            'Usamos almacenamiento local para recordar su preferencia de tema (claro/oscuro) y una cookie técnica exclusivamente al autenticarse en el panel administrativo. El detalle completo está en nuestra Política de Cookies.',
        },
        {
          id: 'cambios-politica',
          title: 'Cambios a esta política',
          content:
            'Esta Política puede actualizarse por cambios normativos o en nuestras prácticas de tratamiento. Publicaremos cualquier cambio en esta página indicando la fecha de última actualización.',
        },
        {
          id: 'contacto',
          title: 'Contacto',
          content:
            'Para ejercer sus derechos o resolver dudas sobre el tratamiento de sus datos personales, puede comunicarse a través de los canales indicados a continuación.',
        },
      ]}
    />
  )
}
