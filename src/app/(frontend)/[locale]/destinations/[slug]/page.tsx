import { useTranslations, useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Link } from '@/i18n/navigation'

const destinationsData: Record<string, {
  photo: string
  name: Record<string, string>
  tag: Record<string, string>
  desc: Record<string, string>
  longDesc: Record<string, string>
  gallery: string[]
  relatedTours: { slug: string; title: Record<string, string>; days: number; price: string; img: string }[]
}> = {
  guilin: {
    photo: 'https://picsum.photos/id/1003/1800/900',
    name: { es: 'Guilin', en: 'Guilin', zh: '桂林' },
    tag: { es: 'Naturaleza', en: 'Nature', zh: '自然' },
    desc: { es: 'Karst eterno y ríos esmeralda', en: 'Eternal karst and emerald rivers', zh: '千古喀斯特与碧玉江河' },
    longDesc: {
      es: 'Guilin es sinónimo de paisajes de ensueño. Sus montañas kársticas, el río Li y los campos de arroz de Longji crean un escenario que parece sacado de una pintura china. Es el destino perfecto para los amantes de la naturaleza y la fotografía.',
      en: 'Guilin is synonymous with dreamlike landscapes. Its karst mountains, the Li River and the Longji rice terraces create a setting that looks like a Chinese painting. It\'s the perfect destination for nature and photography lovers.',
      zh: '桂林山水甲天下。喀斯特山峰、漓江和龙脊梯田构成了如同中国水墨画般的风景。这里是自然爱好者和摄影爱好者的完美目的地。',
    },
    gallery: [
      'https://picsum.photos/id/1003/600/400',
      'https://picsum.photos/id/1036/600/400',
      'https://picsum.photos/id/1055/600/400',
      'https://picsum.photos/id/1047/600/400',
    ],
    relatedTours: [
      { slug: 'natural-china', title: { es: 'China Natural', en: 'Natural China', zh: '自然中国' }, days: 12, price: '2.890', img: 'https://picsum.photos/id/1003/900/600' },
    ],
  },
  shanghai: {
    photo: 'https://picsum.photos/id/1040/1800/900',
    name: { es: 'Shanghái', en: 'Shanghai', zh: '上海' },
    tag: { es: 'Metrópoli', en: 'City', zh: '都市' },
    desc: { es: 'Donde el futuro y el pasado conviven', en: 'Where future meets past', zh: '过去与未来交汇之城' },
    longDesc: {
      es: 'Shanghái es la ciudad más cosmopolita de China. El Bund, Pudong, los jardines Yu y la concesión francesa conviven en una metrópoli que nunca duerme. Gastronomía, arte y compras de nivel mundial.',
      en: 'Shanghai is China\'s most cosmopolitan city. The Bund, Pudong, Yu Garden and the French Concession coexist in a metropolis that never sleeps. World-class dining, art and shopping.',
      zh: '上海是中国最国际化的城市。外滩、浦东、豫园和法租界共存于这座不夜城。世界级的美食、艺术和购物体验。',
    },
    gallery: [
      'https://picsum.photos/id/1040/600/400',
      'https://picsum.photos/id/1059/600/400',
      'https://picsum.photos/id/1038/600/400',
      'https://picsum.photos/id/1047/600/400',
    ],
    relatedTours: [
      { slug: 'classic-china', title: { es: 'China Clásica', en: 'Classic China', zh: '经典中国' }, days: 10, price: '2.290', img: 'https://picsum.photos/id/1040/900/600' },
    ],
  },
}

// Fallback for slugs not in the detailed data
function getDestination(slug: string) {
  return destinationsData[slug] || destinationsData['guilin']
}

export default function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = useTranslations()
  const locale = useLocale() as 'es' | 'en' | 'zh'

  // For static data demo, we use a sync approach
  // In production this would fetch from Payload CMS
  const slug = 'guilin' // placeholder - will be dynamic with CMS
  const dest = getDestination(slug)

  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden flex items-end">
        <img src={dest.photo} alt={dest.name.en} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative w-full max-w-[1200px] mx-auto px-[6%] pb-12">
          <span className="inline-block px-2.5 py-1 bg-red text-white font-dm text-[10px] font-medium tracking-[.12em] uppercase mb-4">
            {dest.tag[locale]}
          </span>
          <h1 className="font-playfair text-[clamp(40px,6vw,72px)] font-bold text-white leading-tight">
            {dest.name[locale]}
          </h1>
          <p className="font-dm text-base text-white/75 mt-3 max-w-[500px]">{dest.desc[locale]}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-[6%]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <SectionLabel>{dest.tag[locale]}</SectionLabel>
            <p className="font-dm text-base text-black/80 leading-relaxed mb-10">
              {dest.longDesc[locale]}
            </p>

            {/* Gallery */}
            <div className="grid grid-cols-2 gap-3">
              {dest.gallery.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-full h-[200px] object-cover rounded-sm"
                />
              ))}
            </div>
          </div>

          {/* Sidebar - Related Tours */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6">
              {locale === 'es' ? 'Viajes disponibles' : locale === 'en' ? 'Available tours' : '可选行程'}
            </h3>
            {dest.relatedTours.map((tour) => (
              <Link
                key={tour.slug}
                href={`/tours/${tour.slug}`}
                className="block mb-4 group"
              >
                <div className="overflow-hidden rounded-sm">
                  <img
                    src={tour.img}
                    alt={tour.title.en}
                    className="w-full h-[160px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3">
                  <div className="font-playfair text-lg font-bold">{tour.title[locale]}</div>
                  <div className="font-dm text-sm text-gray">
                    {tour.days} {t('tours.days')} · {t('tours.from')} {tour.price}€
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
