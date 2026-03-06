import { useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

const content = {
  es: {
    title: 'Términos y Condiciones',
    lastUpdate: 'Última actualización: marzo 2026',
    sections: [
      { heading: '1. Identificación', body: 'Este sitio web es propiedad de ChinaWay Travel S.L., con CIF B-12345678, domicilio social en Madrid, España. Email: info@chinaway.es.' },
      { heading: '2. Objeto', body: 'Estos términos regulan el uso del sitio web chinaway.es y la contratación de servicios de viaje ofrecidos por ChinaWay. Al utilizar este sitio web, aceptas estos términos en su totalidad.' },
      { heading: '3. Servicios', body: 'ChinaWay ofrece servicios de organización de viajes a China, incluyendo itinerarios fijos y viajes a medida. Los servicios incluyen, según el viaje contratado: alojamiento, transporte interno, guía turístico, entradas a monumentos y asistencia de visado.' },
      { heading: '4. Reservas y pagos', body: 'La reserva se formaliza mediante el pago de un depósito de 100€ a través de Stripe. El pago restante se acuerda directamente con ChinaWay según las condiciones de cada viaje. Los precios mostrados en la web son orientativos y pueden estar sujetos a variaciones.' },
      { heading: '5. Cancelaciones', body: 'Las cancelaciones deben comunicarse por escrito a info@chinaway.es. Política de reembolso del depósito: más de 60 días antes de la salida: reembolso completo; entre 30-60 días: 50% del depósito; menos de 30 días: sin reembolso del depósito.' },
      { heading: '6. Responsabilidad', body: 'ChinaWay actúa como organizador de viajes combinados conforme a la Directiva (UE) 2015/2302. Contamos con seguro de responsabilidad civil y garantía de insolvencia según la legislación vigente.' },
      { heading: '7. Documentación de viaje', body: 'Es responsabilidad del viajero disponer de pasaporte válido (mínimo 6 meses de vigencia) y visado para China. ChinaWay ofrece asistencia en el proceso de visado pero no garantiza su aprobación.' },
      { heading: '8. Propiedad intelectual', body: 'Todos los contenidos de este sitio web (textos, imágenes, logotipos, diseño) son propiedad de ChinaWay o sus licenciantes y están protegidos por las leyes de propiedad intelectual.' },
      { heading: '9. Ley aplicable', body: 'Estos términos se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de Madrid, sin perjuicio del derecho del consumidor a acudir a los tribunales de su domicilio.' },
    ],
  },
  en: {
    title: 'Terms and Conditions',
    lastUpdate: 'Last updated: March 2026',
    sections: [
      { heading: '1. Identification', body: 'This website is owned by ChinaWay Travel S.L., with CIF B-12345678, registered in Madrid, Spain. Email: info@chinaway.es.' },
      { heading: '2. Purpose', body: 'These terms govern the use of the chinaway.es website and the booking of travel services offered by ChinaWay. By using this website, you accept these terms in full.' },
      { heading: '3. Services', body: 'ChinaWay offers China travel organisation services, including fixed itineraries and tailor-made trips. Services include, depending on the trip: accommodation, domestic transport, tour guide, monument entrance fees and visa assistance.' },
      { heading: '4. Bookings and payments', body: 'Bookings are confirmed by paying a €100 deposit via Stripe. The remaining balance is agreed directly with ChinaWay according to each trip\'s conditions. Prices shown on the website are indicative and may be subject to changes.' },
      { heading: '5. Cancellations', body: 'Cancellations must be communicated in writing to info@chinaway.es. Deposit refund policy: more than 60 days before departure: full refund; 30-60 days: 50% of deposit; less than 30 days: no deposit refund.' },
      { heading: '6. Liability', body: 'ChinaWay acts as a package travel organiser in accordance with Directive (EU) 2015/2302. We have civil liability insurance and insolvency protection as required by applicable law.' },
      { heading: '7. Travel documentation', body: 'It is the traveller\'s responsibility to hold a valid passport (minimum 6 months validity) and a visa for China. ChinaWay provides visa assistance but does not guarantee approval.' },
      { heading: '8. Intellectual property', body: 'All content on this website (texts, images, logos, design) is owned by ChinaWay or its licensors and is protected by intellectual property laws.' },
      { heading: '9. Applicable law', body: 'These terms are governed by Spanish law. For any disputes, the parties submit to the courts of Madrid, without prejudice to the consumer\'s right to go to their local courts.' },
    ],
  },
  zh: {
    title: '服务条款',
    lastUpdate: '最后更新：2026年3月',
    sections: [
      { heading: '1. 公司信息', body: '本网站由 ChinaWay Travel S.L. 拥有，税号 CIF B-12345678，注册地西班牙马德里。邮箱：info@chinaway.es。' },
      { heading: '2. 适用范围', body: '本条款规范 chinaway.es 网站的使用以及 ChinaWay 旅行服务的预订。使用本网站即表示您完全接受本条款。' },
      { heading: '3. 服务内容', body: 'ChinaWay 提供中国旅行组织服务，包括固定行程和定制旅行。根据具体行程，服务可能包括：住宿、国内交通、导游、景点门票和签证协助。' },
      { heading: '4. 预订和付款', body: '通过 Stripe 支付100€定金即确认预订。余款根据每次旅行的具体条件直接与 ChinaWay 协商。网站显示的价格为参考价格，可能会有所变动。' },
      { heading: '5. 取消政策', body: '取消须以书面形式发送至 info@chinaway.es。定金退款政策：出发前60天以上：全额退还；30-60天：退还50%；少于30天：不退还定金。' },
      { heading: '6. 责任', body: 'ChinaWay 作为旅行套餐组织者，遵守欧盟指令 (EU) 2015/2302 的规定。我们按照现行法律要求购买了民事责任保险和破产保护。' },
      { heading: '7. 旅行证件', body: '旅客有责任持有有效护照（至少6个月有效期）和中国签证。ChinaWay 提供签证协助但不保证签证获批。' },
      { heading: '8. 知识产权', body: '本网站所有内容（文字、图片、标志、设计）均归 ChinaWay 或其许可方所有，受知识产权法保护。' },
      { heading: '9. 适用法律', body: '本条款受西班牙法律管辖。如有争议，双方提交至马德里法院管辖，但不影响消费者前往其所在地法院的权利。' },
    ],
  },
}

export default function TermsPage() {
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
