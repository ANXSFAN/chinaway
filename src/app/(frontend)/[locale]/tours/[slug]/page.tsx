import { useTranslations, useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

const toursData: Record<string, {
  title: Record<string, string>
  days: number
  price: string
  cities: Record<string, string>
  badge: Record<string, string>
  img: string
  itinerary: { day: number; title: Record<string, string>; desc: Record<string, string> }[]
  included: Record<string, string[]>
  excluded: Record<string, string[]>
}> = {
  'silk-road': {
    title: { es: 'Ruta de la Seda', en: 'Silk Road', zh: '丝绸之路' },
    days: 15,
    price: '3.490',
    cities: { es: "Xi'an · Dunhuang · Turpán · Kashgar", en: "Xi'an · Dunhuang · Turpan · Kashgar", zh: '西安 · 敦煌 · 吐鲁番 · 喀什' },
    badge: { es: 'Más Vendido', en: 'Best Seller', zh: '最受欢迎' },
    img: 'https://picsum.photos/id/1043/1800/900',
    itinerary: [
      { day: 1, title: { es: 'Llegada a Xi\'an', en: 'Arrival in Xi\'an', zh: '抵达西安' }, desc: { es: 'Recepción en el aeropuerto y traslado al hotel. Paseo libre por el barrio musulmán.', en: 'Airport pickup and hotel transfer. Free walk through the Muslim Quarter.', zh: '机场接机，入住酒店。自由游览回民街。' } },
      { day: 2, title: { es: 'Guerreros de Terracota', en: 'Terracotta Warriors', zh: '兵马俑' }, desc: { es: 'Visita al ejército de terracota, muralla de la ciudad y espectáculo de la dinastía Tang.', en: 'Visit the Terracotta Army, city wall and Tang Dynasty show.', zh: '参观兵马俑博物馆、古城墙，观赏唐代歌舞表演。' } },
      { day: 3, title: { es: 'Hacia Dunhuang', en: 'To Dunhuang', zh: '前往敦煌' }, desc: { es: 'Tren de alta velocidad a Dunhuang. Tarde libre para explorar la ciudad.', en: 'High-speed train to Dunhuang. Free afternoon to explore the town.', zh: '乘高铁前往敦煌，下午自由活动。' } },
      { day: 4, title: { es: 'Grutas de Mogao', en: 'Mogao Caves', zh: '莫高窟' }, desc: { es: 'Visita a las grutas de Mogao, Patrimonio de la Humanidad. Atardecer en las dunas de Mingsha.', en: 'Visit the UNESCO Mogao Caves. Sunset at Mingsha Sand Dunes.', zh: '参观世界文化遗产莫高窟，鸣沙山月牙泉观日落。' } },
      { day: 5, title: { es: 'Desierto de Gobi', en: 'Gobi Desert', zh: '戈壁沙漠' }, desc: { es: 'Excursión al paso de Yumen y paisajes del desierto de Gobi.', en: 'Excursion to Yumen Pass and Gobi Desert landscapes.', zh: '游览玉门关及戈壁沙漠风光。' } },
    ],
    included: {
      es: ['Vuelos internos', 'Hoteles 4-5★', 'Guía en español', 'Desayunos y 8 comidas/cenas', 'Transporte terrestre', 'Entradas a monumentos', 'Asistencia de visado'],
      en: ['Domestic flights', '4-5★ Hotels', 'Spanish-speaking guide', 'Breakfasts + 8 lunches/dinners', 'Ground transportation', 'Monument entrance fees', 'Visa assistance'],
      zh: ['国内机票', '四至五星酒店', '西班牙语导游', '早餐及8次正餐', '地面交通', '景点门票', '签证协助'],
    },
    excluded: {
      es: ['Vuelo internacional', 'Seguro de viaje', 'Propinas', 'Gastos personales'],
      en: ['International flights', 'Travel insurance', 'Tips', 'Personal expenses'],
      zh: ['国际机票', '旅行保险', '小费', '个人消费'],
    },
  },
}

// Fallback tour
const defaultTour = toursData['silk-road']

export default function TourDetailPage() {
  const t = useTranslations()
  const locale = useLocale() as 'es' | 'en' | 'zh'
  // In production, slug comes from params + CMS query
  const tour = defaultTour

  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden flex items-end">
        <img src={tour.img} alt={tour.title.en} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative w-full max-w-[1200px] mx-auto px-[6%] pb-12">
          <span className="inline-block px-2.5 py-1 bg-red text-white font-dm text-[9px] font-medium tracking-[.12em] uppercase mb-4">
            {tour.badge[locale]}
          </span>
          <h1 className="font-playfair text-[clamp(40px,6vw,72px)] font-bold text-white leading-tight">
            {tour.title[locale]}
          </h1>
          <div className="flex gap-6 mt-4">
            <span className="font-dm text-sm text-white/80">{tour.days} {t('tours.days')}</span>
            <span className="font-dm text-sm text-white/80">{tour.cities[locale]}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-[6%]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Itinerary */}
            <SectionLabel>
              {locale === 'es' ? 'ITINERARIO' : locale === 'en' ? 'ITINERARY' : '行程安排'}
            </SectionLabel>
            <h2 className="font-playfair text-3xl font-bold mb-8">
              {locale === 'es' ? 'Día a día' : locale === 'en' ? 'Day by day' : '每日行程'}
            </h2>

            <div className="space-y-6">
              {tour.itinerary.map((item) => (
                <div key={item.day} className="flex gap-5 pb-6 border-b border-[#f0f0f0]">
                  <div className="flex-shrink-0 w-14 h-14 bg-red flex items-center justify-center">
                    <span className="font-playfair text-xl font-bold text-white">{item.day}</span>
                  </div>
                  <div>
                    <h3 className="font-playfair text-lg font-bold mb-2">{item.title[locale]}</h3>
                    <p className="font-dm text-sm text-gray leading-relaxed">{item.desc[locale]}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Included / Excluded */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="font-playfair text-xl font-bold mb-4">
                  {locale === 'es' ? 'Incluido' : locale === 'en' ? 'Included' : '费用包含'}
                </h3>
                <ul className="space-y-2">
                  {tour.included[locale].map((item, i) => (
                    <li key={i} className="font-dm text-sm text-black/80 flex items-start gap-2">
                      <span className="text-red mt-0.5">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold mb-4">
                  {locale === 'es' ? 'No incluido' : locale === 'en' ? 'Not included' : '费用不含'}
                </h3>
                <ul className="space-y-2">
                  {tour.excluded[locale].map((item, i) => (
                    <li key={i} className="font-dm text-sm text-gray flex items-start gap-2">
                      <span className="mt-0.5">✗</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar - Price & Booking */}
          <div>
            <div className="sticky top-28 bg-cream p-8 rounded-sm">
              <div className="font-dm text-[10px] text-gray uppercase tracking-[.08em]">{t('tours.from')}</div>
              <div className="font-playfair text-[42px] font-bold text-red leading-none mb-1">
                {tour.price}€
              </div>
              <div className="font-dm text-sm text-gray mb-6">
                {locale === 'es' ? 'por persona' : locale === 'en' ? 'per person' : '每人'}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-[#ddd]">
                <div className="flex justify-between font-dm text-sm">
                  <span className="text-gray">{locale === 'es' ? 'Duración' : locale === 'en' ? 'Duration' : '天数'}</span>
                  <span className="font-medium">{tour.days} {t('tours.days')}</span>
                </div>
                <div className="flex justify-between font-dm text-sm">
                  <span className="text-gray">{locale === 'es' ? 'Ciudades' : locale === 'en' ? 'Cities' : '城市'}</span>
                  <span className="font-medium">{tour.itinerary.length}+</span>
                </div>
                <div className="flex justify-between font-dm text-sm">
                  <span className="text-gray">{locale === 'es' ? 'Depósito' : locale === 'en' ? 'Deposit' : '定金'}</span>
                  <span className="font-medium">100€</span>
                </div>
              </div>

              <button className="w-full font-dm text-xs font-medium tracking-[.12em] uppercase py-4 bg-red text-white hover:bg-red-dark hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(208,2,27,.3)] transition-all duration-250">
                {locale === 'es' ? 'Reservar ahora' : locale === 'en' ? 'Book now' : '立即预订'}
              </button>
              <button className="w-full mt-3 font-dm text-xs font-medium tracking-[.1em] uppercase py-3 bg-transparent text-black border-[1.5px] border-[#ccc] hover:border-black transition-all duration-250">
                {t('hero.cta2')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
