import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'

const content = {
  es: {
    title: '¡Reserva confirmada!',
    subtitle: 'Tu depósito ha sido procesado correctamente. Recibirás un email de confirmación con los detalles de tu reserva y la factura.',
    next: '¿Qué sigue?',
    steps: [
      'Recibirás un email con la confirmación de tu reserva y la factura.',
      'Nuestro equipo se pondrá en contacto contigo en las próximas 24-48 horas para coordinar los detalles del viaje.',
      'Te enviaremos toda la documentación necesaria (itinerario detallado, guía de visado, etc.).',
    ],
    back: 'Volver al inicio',
  },
  en: {
    title: 'Booking confirmed!',
    subtitle: 'Your deposit has been successfully processed. You will receive a confirmation email with your booking details and invoice.',
    next: 'What\'s next?',
    steps: [
      'You will receive an email with your booking confirmation and invoice.',
      'Our team will contact you within 24-48 hours to coordinate trip details.',
      'We will send you all necessary documentation (detailed itinerary, visa guide, etc.).',
    ],
    back: 'Back to home',
  },
  zh: {
    title: '预订成功！',
    subtitle: '您的定金已成功处理。您将收到一封包含预订详情和发票的确认邮件。',
    next: '后续步骤',
    steps: [
      '您将收到包含预订确认和发票的电子邮件。',
      '我们的团队将在24-48小时内与您联系，协调旅行细节。',
      '我们将发送所有必要的文件（详细行程、签证指南等）。',
    ],
    back: '返回首页',
  },
}

export default function BookingSuccessPage() {
  const locale = useLocale() as 'es' | 'en' | 'zh'
  const c = content[locale]

  return (
    <section className="pt-32 pb-20 px-[6%]">
      <div className="max-w-[600px] mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-playfair text-[clamp(32px,4vw,48px)] font-bold mb-4">{c.title}</h1>
        <p className="font-dm text-base text-gray leading-relaxed mb-10">{c.subtitle}</p>

        <div className="text-left bg-cream p-8 rounded-sm mb-8">
          <h2 className="font-playfair text-lg font-bold mb-4">{c.next}</h2>
          <ol className="space-y-3">
            {c.steps.map((step, i) => (
              <li key={i} className="font-dm text-sm text-black/80 leading-relaxed flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-red text-white font-dm text-xs flex items-center justify-center rounded-full">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <Link
          href="/"
          className="inline-block font-dm text-xs font-medium tracking-[.12em] uppercase px-8 py-3.5 bg-red text-white hover:bg-red-dark transition-colors"
        >
          {c.back}
        </Link>
      </div>
    </section>
  )
}
