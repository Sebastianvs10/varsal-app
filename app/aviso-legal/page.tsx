import { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Aviso Legal | VARSAL Systems',
}

export default function AvisoLegalPage() {
  return (
    <LegalPage
      title="Aviso Legal"
      subtitle="Información legal sobre VARSAL Systems y las condiciones de uso de este sitio web."
      lastUpdated="1 de enero de 2025"
      sections={[
        {
          title: 'Datos de la empresa',
          content: [
            'Razón social: VARSAL Systems S.A.S.',
            'NIT: En trámite de constitución.',
            'Domicilio: Calle 7 #7-21, Oporapa, Huila, República de Colombia.',
            'Correo electrónico: varsalsystems@gmail.com',
            'Teléfono: +57 318 427 3263',
            'Actividad económica: Desarrollo de software, consultoría tecnológica y servicios de TI.',
          ],
        },
        {
          title: 'Objeto del sitio web',
          content: 'Este sitio web tiene como objetivo presentar los servicios, productos y soluciones tecnológicas ofrecidas por VARSAL Systems S.A.S. La información publicada tiene carácter meramente informativo y no constituye una oferta vinculante, salvo que se indique expresamente lo contrario.',
        },
        {
          title: 'Propiedad intelectual del sitio',
          content: 'Todos los contenidos de este sitio web, incluyendo textos, imágenes, logotipos, diseños, código fuente, arquitectura del sitio y elementos multimedia, son propiedad exclusiva de VARSAL Systems S.A.S. o de terceros que han autorizado su uso. Queda prohibida su reproducción, distribución o modificación sin autorización expresa y escrita de VARSAL Systems.',
        },
        {
          title: 'Exención de responsabilidad',
          content: 'VARSAL Systems no garantiza la disponibilidad ininterrumpida del sitio web y no se responsabiliza por los daños que pudieran derivarse de: interrupciones del servicio, errores u omisiones en los contenidos, enlaces a sitios de terceros, o virus informáticos. El usuario utiliza el sitio bajo su propia responsabilidad.',
        },
        {
          title: 'Modificaciones',
          content: 'VARSAL Systems se reserva el derecho de modificar, en cualquier momento y sin previo aviso, la presentación, configuración, contenidos y servicios del sitio web. El acceso y uso del sitio tras las modificaciones implica la aceptación de las mismas.',
        },
      ]}
    />
  )
}
