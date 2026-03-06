import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'

const content = {
  es: {
    title: 'Pago cancelado',
    subtitle: 'El proceso de pago ha sido cancelado. No se ha realizado ningún cargo. Puedes volver a intentarlo cuando quieras.',
    back: 'Volver a viajes',
    contact: 'Contactar con nosotros',
  },
  en: {
    title: 'Payment cancelled',
    subtitle: 'The payment process has been cancelled. No charge was made. You can try again whenever you like.',
    back: 'Back to tours',
    contact: 'Contact us',
  },
  zh: {
    title: '支付已取消',
    subtitle: '支付流程已取消，未产生任何费用。您可以随时重新尝试。',
    back: '返回行程',
    contact: '联系我们',
  },
}

export default function BookingCancelPage() {
  const locale = useLocale() as 'es' | 'en' | 'zh'
  const c = content[locale]

  return (
    <section className="pt-32 pb-20 px-[6%]">
      <div className="max-w-[500px] mx-auto text-center">
        <div className="w-16 h-16 bg-[#fff3f3] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="font-playfair text-[clamp(28px,4vw,42px)] font-bold mb-4">{c.title}</h1>
        <p className="font-dm text-base text-gray leading-relaxed mb-8">{c.subtitle}</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/upcoming"
            className="font-dm text-xs font-medium tracking-[.12em] uppercase px-8 py-3.5 bg-red text-white hover:bg-red-dark transition-colors"
          >
            {c.back}
          </Link>
          <Link
            href="/contact"
            className="font-dm text-xs font-medium tracking-[.1em] uppercase px-6 py-3 border-[1.5px] border-[#ccc] hover:border-black transition-colors"
          >
            {c.contact}
          </Link>
        </div>
      </div>
    </section>
  )
}
