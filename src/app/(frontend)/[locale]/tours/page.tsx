import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations } from 'next-intl/server'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Link } from '@/i18n/navigation'

export const revalidate = 3600

export default async function ToursPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const payload = await getPayload({ config })
  const t = await getTranslations({ locale, namespace: 'tours' })

  const { docs: tours } = await payload.find({
    collection: 'tours',
    where: { status: { equals: 'published' } },
    locale: locale as 'es' | 'en' | 'zh',
    limit: 100,
    sort: '-createdAt',
  })

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden flex items-end">
        <Image
          src="https://picsum.photos/id/1043/1800/900"
          alt="Tours"
          fill
          priority
          className="object-cover"
          sizes="100vw"
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
          {tours.map((tour: any) => {
            const imgSrc = tour.coverImage?.url || tour.imageUrl || '/placeholder.jpg'
            const priceDisplay = tour.price ? tour.price.toLocaleString('de-DE') : '0'
            return (
              <Link
                key={tour.id}
                href={`/tours/${tour.slug}`}
                className="cursor-pointer overflow-hidden rounded-sm bg-white border border-[#eee] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,.15)] group block"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={tour.title || ''}
                    width={400}
                    height={220}
                    className="w-full h-[220px] object-cover block transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                    style={{ backgroundSize: '100% 60%', backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat' }}
                  />
                  {tour.badge && (
                    <div className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-red text-white font-dm text-[9px] font-medium tracking-[.12em] uppercase">
                      {tour.badge}
                    </div>
                  )}
                  <div className="absolute bottom-3.5 left-3.5">
                    <div className="font-playfair text-[22px] font-bold text-white">{tour.title}</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="font-dm text-xs text-gray mb-4">{tour.cities}</div>
                  <div className="flex justify-between items-end pt-4 border-t border-[#f0f0f0]">
                    <div>
                      <div className="font-dm text-[10px] text-gray uppercase tracking-[.08em]">{t('from')}</div>
                      <div className="font-playfair text-[26px] font-bold text-red leading-none">{priceDisplay}€</div>
                      <div className="font-dm text-[11px] text-gray">{tour.days} {t('days')}</div>
                    </div>
                    <span className="font-dm text-xs font-medium text-red tracking-[.08em] uppercase">
                      {t('viewItinerary')}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        {tours.length === 0 && (
          <p className="text-center font-dm text-gray py-12">
            {locale === 'es' ? 'No hay viajes disponibles por el momento.' : locale === 'en' ? 'No tours available at the moment.' : '暂无可用行程。'}
          </p>
        )}
      </section>
    </>
  )
}
