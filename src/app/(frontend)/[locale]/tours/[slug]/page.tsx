import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations } from 'next-intl/server'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { TourSidebar } from '@/components/booking/TourSidebar'

/** Extract plain text from Lexical richText JSON */
function extractText(richText: any): string {
  if (!richText?.root?.children) return ''
  return richText.root.children
    .map((node: any) => {
      if (node.children) return node.children.map((c: any) => c.text || '').join('')
      return ''
    })
    .filter(Boolean)
    .join('\n')
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'tours',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    locale: locale as 'es' | 'en' | 'zh',
    limit: 1,
  })
  const tour = docs[0] as any
  if (!tour) return {}
  const imgSrc = tour.imageUrl || tour.coverImage?.url || ''
  return {
    title: tour.title,
    description: `${tour.days} ${locale === 'zh' ? '天' : locale === 'en' ? 'days' : 'días'} · ${tour.cities || ''}`,
    openGraph: { images: imgSrc ? [imgSrc] : [] },
  }
}

export default async function TourDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const payload = await getPayload({ config })
  const t = await getTranslations({ locale })

  const { docs } = await payload.find({
    collection: 'tours',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    locale: locale as 'es' | 'en' | 'zh',
    limit: 1,
  })

  const tour = docs[0] as any
  if (!tour) notFound()

  const imgSrc = tour.imageUrl || tour.coverImage?.url || '/placeholder.jpg'
  const priceDisplay = tour.price ? tour.price.toLocaleString('de-DE') : '0'
  const depositAmount = tour.depositAmount || 100
  const itinerary = (tour.itinerary || []) as any[]

  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden flex items-end">
        <img src={imgSrc} alt={tour.title || ''} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative w-full max-w-[1200px] mx-auto px-[6%] pb-12">
          {tour.badge && (
            <span className="inline-block px-2.5 py-1 bg-red text-white font-dm text-[9px] font-medium tracking-[.12em] uppercase mb-4">
              {tour.badge}
            </span>
          )}
          <h1 className="font-playfair text-[clamp(40px,6vw,72px)] font-bold text-white leading-tight">
            {tour.title}
          </h1>
          <div className="flex gap-6 mt-4">
            <span className="font-dm text-sm text-white/80">{tour.days} {t('tours.days')}</span>
            {tour.cities && <span className="font-dm text-sm text-white/80">{tour.cities}</span>}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-[6%]">
        <div className="max-w-[1200px] mx-auto">
          <Link
            href="/tours"
            className="inline-flex items-center font-dm text-sm text-gray hover:text-red transition-colors mb-10"
          >
            &larr;&nbsp;&nbsp;{t('tourDetail.backToTours')}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Itinerary */}
              <SectionLabel>{t('tourDetail.itinerary').toUpperCase()}</SectionLabel>
              <h2 className="font-playfair text-3xl font-bold mb-8">
                {t('tourDetail.itinerary')}
              </h2>

              {itinerary.length > 0 ? (
                <div className="space-y-6">
                  {itinerary.map((item: any) => {
                    const descText = extractText(item.description)
                    return (
                      <div key={item.id || item.day} className="flex gap-5 pb-6 border-b border-[#f0f0f0]">
                        <div className="flex-shrink-0 w-14 h-14 bg-red flex items-center justify-center">
                          <span className="font-playfair text-xl font-bold text-white">{item.day}</span>
                        </div>
                        <div>
                          <h3 className="font-playfair text-lg font-bold mb-2">{item.title}</h3>
                          {descText && (
                            <p className="font-dm text-sm text-gray leading-relaxed">{descText}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="font-dm text-sm text-gray">{t('tourDetail.noItinerary')}</p>
              )}

              {/* Included / Excluded - richText fields, show if content exists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div>
                  <h3 className="font-playfair text-xl font-bold mb-4">{t('tourDetail.included')}</h3>
                  {tour.included ? (
                    <p className="font-dm text-sm text-black/80 leading-relaxed whitespace-pre-line">
                      {extractText(tour.included) || '—'}
                    </p>
                  ) : (
                    <p className="font-dm text-sm text-gray">—</p>
                  )}
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold mb-4">{t('tourDetail.excluded')}</h3>
                  {tour.excluded ? (
                    <p className="font-dm text-sm text-gray leading-relaxed whitespace-pre-line">
                      {extractText(tour.excluded) || '—'}
                    </p>
                  ) : (
                    <p className="font-dm text-sm text-gray">—</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - Price & Booking */}
            <TourSidebar
              tourId={tour.id}
              tourTitle={tour.title || ''}
              price={priceDisplay}
              days={tour.days}
              cities={tour.cities || ''}
              depositAmount={depositAmount}
              departures={(tour.departures || []).map((dep: any) => ({
                date: dep.date,
                spotsTotal: dep.spotsTotal || 0,
                spotsBooked: dep.spotsBooked || 0,
              }))}
              locale={locale}
            />
          </div>
        </div>
      </section>
    </>
  )
}
