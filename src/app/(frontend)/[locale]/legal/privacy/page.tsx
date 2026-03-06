import { useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

const content = {
  es: {
    title: 'Política de Privacidad',
    lastUpdate: 'Última actualización: marzo 2026',
    sections: [
      {
        heading: '1. Responsable del tratamiento',
        body: 'ChinaWay Travel S.L., con domicilio social en Madrid, España, y CIF B-12345678 (en adelante, "ChinaWay"), es el responsable del tratamiento de los datos personales recogidos a través de este sitio web.',
      },
      {
        heading: '2. Datos que recopilamos',
        body: 'Recopilamos los datos personales que nos proporcionas voluntariamente a través de nuestros formularios de contacto, reserva y solicitud de viaje personalizado: nombre completo, dirección de correo electrónico, número de teléfono, preferencias de viaje y cualquier otra información que decidas compartir.',
      },
      {
        heading: '3. Finalidad del tratamiento',
        body: 'Utilizamos tus datos personales para: gestionar tus consultas y solicitudes de viaje; procesar reservas y pagos de depósitos; enviarte información sobre el viaje contratado; mejorar nuestros servicios y experiencia web; cumplir con obligaciones legales y fiscales.',
      },
      {
        heading: '4. Base legal',
        body: 'El tratamiento de tus datos se basa en: tu consentimiento expreso al enviar un formulario; la ejecución de un contrato (reserva de viaje); el cumplimiento de obligaciones legales (facturación); nuestro interés legítimo en mejorar nuestros servicios.',
      },
      {
        heading: '5. Destinatarios de los datos',
        body: 'Tus datos podrán ser comunicados a: proveedores de servicios turísticos en China (hoteles, guías, transporte) necesarios para la prestación del servicio; Stripe, Inc. para el procesamiento de pagos; autoridades fiscales y administrativas cuando sea legalmente requerido. No vendemos ni cedemos tus datos a terceros con fines comerciales.',
      },
      {
        heading: '6. Transferencias internacionales',
        body: 'Para la prestación de nuestros servicios, tus datos podrán ser transferidos a proveedores situados en China. Estas transferencias se realizan con las garantías adecuadas conforme al RGPD.',
      },
      {
        heading: '7. Plazo de conservación',
        body: 'Conservamos tus datos durante el tiempo necesario para cumplir con las finalidades descritas y, posteriormente, durante los plazos legalmente establecidos (mínimo 5 años para datos fiscales).',
      },
      {
        heading: '8. Tus derechos',
        body: 'Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de datos enviando un email a privacy@chinaway.es. Responderemos en un plazo máximo de 30 días.',
      },
      {
        heading: '9. Cookies',
        body: 'Utilizamos cookies técnicas y analíticas. Para más información, consulta nuestra Política de Cookies.',
      },
      {
        heading: '10. Contacto',
        body: 'Para cualquier cuestión relacionada con la protección de datos, puedes contactarnos en: privacy@chinaway.es',
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    lastUpdate: 'Last updated: March 2026',
    sections: [
      {
        heading: '1. Data Controller',
        body: 'ChinaWay Travel S.L., registered in Madrid, Spain, with CIF B-12345678 ("ChinaWay"), is the data controller responsible for the personal data collected through this website.',
      },
      {
        heading: '2. Data We Collect',
        body: 'We collect personal data that you voluntarily provide through our contact, booking and custom travel request forms: full name, email address, phone number, travel preferences and any other information you choose to share.',
      },
      {
        heading: '3. Purpose of Processing',
        body: 'We use your personal data to: manage your inquiries and travel requests; process bookings and deposit payments; send you information about your booked trip; improve our services and web experience; comply with legal and tax obligations.',
      },
      {
        heading: '4. Legal Basis',
        body: 'The processing of your data is based on: your explicit consent when submitting a form; execution of a contract (travel booking); compliance with legal obligations (invoicing); our legitimate interest in improving our services.',
      },
      {
        heading: '5. Data Recipients',
        body: 'Your data may be shared with: tourism service providers in China (hotels, guides, transport) necessary for service delivery; Stripe, Inc. for payment processing; tax and administrative authorities when legally required. We do not sell or share your data with third parties for commercial purposes.',
      },
      {
        heading: '6. International Transfers',
        body: 'To provide our services, your data may be transferred to providers located in China. These transfers are carried out with appropriate safeguards in accordance with the GDPR.',
      },
      {
        heading: '7. Data Retention',
        body: 'We retain your data for as long as necessary to fulfil the described purposes and, subsequently, for the legally established periods (minimum 5 years for tax data).',
      },
      {
        heading: '8. Your Rights',
        body: 'You can exercise your rights of access, rectification, erasure, objection, restriction of processing and data portability by sending an email to privacy@chinaway.es. We will respond within 30 days.',
      },
      {
        heading: '9. Cookies',
        body: 'We use technical and analytical cookies. For more information, please see our Cookie Policy.',
      },
      {
        heading: '10. Contact',
        body: 'For any questions related to data protection, you can contact us at: privacy@chinaway.es',
      },
    ],
  },
  zh: {
    title: '隐私政策',
    lastUpdate: '最后更新：2026年3月',
    sections: [
      {
        heading: '1. 数据控制者',
        body: 'ChinaWay Travel S.L.，注册地西班牙马德里，税号 CIF B-12345678（以下简称"ChinaWay"），是通过本网站收集个人数据的数据控制者。',
      },
      {
        heading: '2. 我们收集的数据',
        body: '我们收集您通过联系表单、预订表单和定制旅行表单自愿提供的个人数据：姓名、电子邮箱、电话号码、旅行偏好及您选择分享的其他信息。',
      },
      {
        heading: '3. 数据处理目的',
        body: '我们使用您的个人数据用于：处理您的咨询和旅行请求；处理预订和定金支付；向您发送预订行程相关信息；改善我们的服务和网站体验；遵守法律和税务义务。',
      },
      {
        heading: '4. 法律依据',
        body: '数据处理的法律依据包括：您提交表单时的明确同意；合同执行（旅行预订）；遵守法律义务（开具发票）；我们改善服务的合法利益。',
      },
      {
        heading: '5. 数据接收方',
        body: '您的数据可能与以下方共享：中国旅游服务提供商（酒店、导游、交通），这是服务交付所必需的；Stripe, Inc. 用于支付处理；法律要求时的税务和行政机关。我们不会出于商业目的向第三方出售或共享您的数据。',
      },
      {
        heading: '6. 国际数据传输',
        body: '为提供我们的服务，您的数据可能会被传输给位于中国的服务提供商。这些传输按照 GDPR 的要求采取了适当的保障措施。',
      },
      {
        heading: '7. 数据保留期限',
        body: '我们将在实现上述目的所需的时间内保留您的数据，之后按照法定期限保留（税务数据至少5年）。',
      },
      {
        heading: '8. 您的权利',
        body: '您可以通过发送邮件至 privacy@chinaway.es 行使您的访问、更正、删除、反对、限制处理和数据可携带权。我们将在30天内回复。',
      },
      {
        heading: '9. Cookie',
        body: '我们使用技术性和分析性 Cookie。详情请参阅我们的 Cookie 政策。',
      },
      {
        heading: '10. 联系方式',
        body: '如有任何与数据保护相关的问题，请联系：privacy@chinaway.es',
      },
    ],
  },
}

export default function PrivacyPage() {
  const locale = useLocale() as 'es' | 'en' | 'zh'
  const c = content[locale]

  return (
    <>
      <section className="pt-32 pb-12 px-[6%] bg-cream">
        <div className="max-w-[800px] mx-auto">
          <SectionLabel>{locale === 'es' ? 'LEGAL' : locale === 'en' ? 'LEGAL' : '法律'}</SectionLabel>
          <h1 className="font-playfair text-[clamp(32px,4vw,52px)] font-bold">{c.title}</h1>
          <p className="font-dm text-sm text-gray mt-3">{c.lastUpdate}</p>
        </div>
      </section>
      <section className="py-16 px-[6%]">
        <div className="max-w-[800px] mx-auto space-y-8">
          {c.sections.map((s, i) => (
            <div key={i}>
              <h2 className="font-playfair text-xl font-bold mb-3">{s.heading}</h2>
              <p className="font-dm text-sm text-black/80 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
