import { useTranslations, useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Link } from '@/i18n/navigation'

const upcomingTours = [
  {
    slug: 'silk-road',
    title: { es: 'Ruta de la Seda', en: 'Silk Road', zh: '丝绸之路' },
    days: 15,
    cities: { es: "Xi'an · Dunhuang · Turpán · Kashgar", en: "Xi'an · Dunhuang · Turpan · Kashgar", zh: '西安 · 敦煌 · 吐鲁番 · 喀什' },
    price: '3.490',
    deposit: 100,
    img: 'https://picsum.photos/id/1043/900/600',
    departures: [
      { date: '2026-04-15', spotsTotal: 16, spotsBooked: 11 },
      { date: '2026-05-20', spotsTotal: 16, spotsBooked: 5 },
      { date: '2026-09-10', spotsTotal: 20, spotsBooked: 3 },
    ],
  },
  {
    slug: 'classic-china',
    title: { es: 'China Clásica', en: 'Classic China', zh: '经典中国' },
    days: 10,
    cities: { es: "Pekín · Xi'an · Shanghái", en: "Beijing · Xi'an · Shanghai", zh: '北京 · 西安 · 上海' },
    price: '2.290',
    deposit: 100,
    img: 'https://picsum.photos/id/1040/900/600',
    departures: [
      { date: '2026-04-05', spotsTotal: 20, spotsBooked: 14 },
      { date: '2026-06-01', spotsTotal: 20, spotsBooked: 7 },
    ],
  },
  {
    slug: 'natural-china',
    title: { es: 'China Natural', en: 'Natural China', zh: '自然中国' },
    days: 12,
    cities: { es: 'Guilin · Zhangjiajie · Yunnan', en: 'Guilin · Zhangjiajie · Yunnan', zh: '桂林 · 张家界 · 云南' },
    price: '2.890',
    deposit: 100,
    img: 'https://picsum.photos/id/1003/900/600',
    departures: [
      { date: '2026-05-10', spotsTotal: 16, spotsBooked: 9 },
      { date: '2026-10-01', spotsTotal: 20, spotsBooked: 2 },
    ],
  },
]

function formatDate(dateStr: string, locale: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'en' ? 'en-GB' : 'es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function UpcomingPage() {
  const t = useTranslations()
  const locale = useLocale() as 'es' | 'en' | 'zh'

  const pageTitle = {
    es: 'Salidas Próximas',
    en: 'Upcoming Departures',
    zh: '即将出发',
  }
  const pageSubtitle = {
    es: 'Fechas confirmadas con plazas limitadas. Reserva tu plaza con un depósito de 100€.',
    en: 'Confirmed dates with limited spots. Reserve your place with a €100 deposit.',
    zh: '已确认出发日期，名额有限。支付100€定金即可预订。',
  }
  const spotsLabel = { es: 'plazas libres', en: 'spots left', zh: '剩余名额' }
  const departureLabel = { es: 'Salida', en: 'Departure', zh: '出发日期' }
  const bookLabel = { es: 'Reservar · 100€ depósito', en: 'Book · €100 deposit', zh: '预订 · 100€ 定金' }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden flex items-end">
        <img
          src="https://picsum.photos/id/1055/1800/900"
          alt="Upcoming departures"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative w-full max-w-[1200px] mx-auto px-[6%] pb-12">
          <SectionLabel>{t('tours.label')}</SectionLabel>
          <h1 className="font-playfair text-[clamp(36px,5vw,64px)] font-bold text-white leading-tight">
            {pageTitle[locale]}
          </h1>
          <p className="font-dm text-base text-white/70 mt-3 max-w-[520px]">{pageSubtitle[locale]}</p>
        </div>
      </section>

      {/* Tours with departure dates */}
      <section className="py-16 px-[6%]">
        <div className="max-w-[1200px] mx-auto space-y-8">
          {upcomingTours.map((tour) => (
            <div key={tour.slug} className="bg-white border border-[#eee] rounded-sm overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-0">
                {/* Image */}
                <Link href={`/tours/${tour.slug}`} className="block">
                  <img
                    src={tour.img}
                    alt={tour.title.en}
                    className="w-full h-[220px] lg:h-full object-cover"
                  />
                </Link>

                {/* Info */}
                <div className="p-6 lg:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                      <Link href={`/tours/${tour.slug}`}>
                        <h2 className="font-playfair text-2xl font-bold hover:text-red transition-colors">
                          {tour.title[locale]}
                        </h2>
                      </Link>
                      <div className="font-dm text-sm text-gray mt-1">{tour.cities[locale]}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-dm text-[10px] text-gray uppercase tracking-[.08em]">{t('tours.from')}</div>
                      <div className="font-playfair text-3xl font-bold text-red leading-none">{tour.price}€</div>
                      <div className="font-dm text-[11px] text-gray">{tour.days} {t('tours.days')}</div>
                    </div>
                  </div>

                  {/* Departure dates */}
                  <div className="space-y-3">
                    {tour.departures.map((dep) => {
                      const spotsLeft = dep.spotsTotal - dep.spotsBooked
                      const urgency = spotsLeft <= 5

                      return (
                        <div
                          key={dep.date}
                          className="flex flex-wrap items-center justify-between gap-3 py-3 px-4 border border-[#f0f0f0] rounded-sm"
                        >
                          <div>
                            <div className="font-dm text-[10px] text-gray uppercase tracking-[.08em]">
                              {departureLabel[locale]}
                            </div>
                            <div className="font-dm text-sm font-medium">{formatDate(dep.date, locale)}</div>
                          </div>
                          <div className={`font-dm text-sm ${urgency ? 'text-red font-medium' : 'text-gray'}`}>
                            {spotsLeft} {spotsLabel[locale]}
                          </div>
                          <button className="font-dm text-[11px] font-medium tracking-[.08em] uppercase px-5 py-2.5 bg-red text-white hover:bg-red-dark transition-colors duration-200">
                            {bookLabel[locale]}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
