import { useTranslations, useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Link } from '@/i18n/navigation'

const tours = [
  { slug: 'silk-road', title: { es: 'Ruta de la Seda', en: 'Silk Road', zh: '丝绸之路' }, days: 15, price: '3.490', cities: { es: "Xi'an · Dunhuang · Turpán · Kashgar", en: "Xi'an · Dunhuang · Turpan · Kashgar", zh: '西安 · 敦煌 · 吐鲁番 · 喀什' }, badge: { es: 'Más Vendido', en: 'Best Seller', zh: '最受欢迎' }, img: 'https://picsum.photos/id/1043/900/600' },
  { slug: 'classic-china', title: { es: 'China Clásica', en: 'Classic China', zh: '经典中国' }, days: 10, price: '2.290', cities: { es: "Pekín · Xi'an · Shanghái", en: "Beijing · Xi'an · Shanghai", zh: '北京 · 西安 · 上海' }, badge: { es: 'Para Principiantes', en: 'First Trip', zh: '首次旅华' }, img: 'https://picsum.photos/id/1040/900/600' },
  { slug: 'natural-china', title: { es: 'China Natural', en: 'Natural China', zh: '自然中国' }, days: 12, price: '2.890', cities: { es: 'Guilin · Zhangjiajie · Yunnan', en: 'Guilin · Zhangjiajie · Yunnan', zh: '桂林 · 张家界 · 云南' }, badge: { es: 'Naturaleza', en: 'Nature', zh: '自然之旅' }, img: 'https://picsum.photos/id/1003/900/600' },
  { slug: 'yunnan-explorer', title: { es: 'Yunnan Explorador', en: 'Yunnan Explorer', zh: '云南探秘' }, days: 8, price: '1.990', cities: { es: 'Kunming · Dali · Lijiang · Shangri-La', en: 'Kunming · Dali · Lijiang · Shangri-La', zh: '昆明 · 大理 · 丽江 · 香格里拉' }, badge: { es: 'Cultura', en: 'Culture', zh: '文化之旅' }, img: 'https://picsum.photos/id/1080/900/600' },
  { slug: 'tibet-sacred', title: { es: 'Tíbet Sagrado', en: 'Sacred Tibet', zh: '神圣西藏' }, days: 10, price: '3.190', cities: { es: 'Lhasa · Shigatse · Everest Base Camp', en: 'Lhasa · Shigatse · Everest Base Camp', zh: '拉萨 · 日喀则 · 珠峰大本营' }, badge: { es: 'Espiritual', en: 'Spiritual', zh: '心灵之旅' }, img: 'https://picsum.photos/id/1018/900/600' },
  { slug: 'beijing-shanghai', title: { es: 'Pekín & Shanghái', en: 'Beijing & Shanghai', zh: '京沪双城' }, days: 6, price: '1.490', cities: { es: 'Pekín · Shanghái', en: 'Beijing · Shanghai', zh: '北京 · 上海' }, badge: { es: 'Express', en: 'Express', zh: '快捷游' }, img: 'https://picsum.photos/id/1059/900/600' },
]

export default function ToursPage() {
  const t = useTranslations('tours')
  const locale = useLocale() as 'es' | 'en' | 'zh'

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden flex items-end">
        <img
          src="https://picsum.photos/id/1043/1800/900"
          alt="Tours"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative w-full max-w-[1200px] mx-auto px-[6%] pb-12">
          <SectionLabel>{t('label')}</SectionLabel>
          <h1 className="font-playfair text-[clamp(36px,5vw,64px)] font-bold text-white leading-tight">
            {t('title')}
          </h1>
          <p className="font-dm text-base text-white/70 mt-3 max-w-[480px]">{t('subtitle')}</p>
        </div>
      </section>

      {/* Tour cards */}
      <section className="py-16 px-[6%]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tours.map((tour) => (
            <Link
              key={tour.slug}
              href={`/tours/${tour.slug}`}
              className="cursor-pointer overflow-hidden rounded-sm bg-white border border-[#eee] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,.15)] group block"
            >
              <div className="relative overflow-hidden">
                <img
                  src={tour.img}
                  alt={tour.title.en}
                  className="w-full h-[220px] object-cover block transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" style={{ backgroundSize: '100% 60%', backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat' }} />
                <div className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-red text-white font-dm text-[9px] font-medium tracking-[.12em] uppercase">
                  {tour.badge[locale]}
                </div>
                <div className="absolute bottom-3.5 left-3.5">
                  <div className="font-playfair text-[22px] font-bold text-white">{tour.title[locale]}</div>
                </div>
              </div>
              <div className="p-5">
                <div className="font-dm text-xs text-gray mb-4">{tour.cities[locale]}</div>
                <div className="flex justify-between items-end pt-4 border-t border-[#f0f0f0]">
                  <div>
                    <div className="font-dm text-[10px] text-gray uppercase tracking-[.08em]">{t('from')}</div>
                    <div className="font-playfair text-[26px] font-bold text-red leading-none">{tour.price}€</div>
                    <div className="font-dm text-[11px] text-gray">{tour.days} {t('days')}</div>
                  </div>
                  <span className="font-dm text-xs font-medium text-red tracking-[.08em] uppercase">
                    {t('viewItinerary')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
