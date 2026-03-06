import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations } from 'next-intl/server'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

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
  const imgSrc = tour.coverImage?.url || tour.imageUrl || ''
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

  const imgSrc = tour.coverImage?.url || tour.imageUrl || '/placeholder.jpg'
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
            <div>
              <div className="sticky top-28 bg-cream p-8 rounded-sm">
                <div className="font-dm text-[10px] text-gray uppercase tracking-[.08em]">{t('tours.from')}</div>
                <div className="font-playfair text-[42px] font-bold text-red leading-none mb-1">
                  {priceDisplay}€
                </div>
                <div className="font-dm text-sm text-gray mb-6">
                  {locale === 'es' ? 'por persona' : locale === 'en' ? 'per person' : '每人'}
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-[#ddd]">
                  <div className="flex justify-between font-dm text-sm">
                    <span className="text-gray">{locale === 'es' ? 'Duración' : locale === 'en' ? 'Duration' : '天数'}</span>
                    <span className="font-medium">{tour.days} {t('tours.days')}</span>
                  </div>
                  {tour.cities && (
                    <div className="flex justify-between font-dm text-sm">
                      <span className="text-gray">{locale === 'es' ? 'Ruta' : locale === 'en' ? 'Route' : '路线'}</span>
                      <span className="font-medium text-right max-w-[160px]">{tour.cities}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-dm text-sm">
                    <span className="text-gray">{t('tourDetail.deposit')}</span>
                    <span className="font-medium">{depositAmount}€</span>
                  </div>
                </div>

                {/* Departures */}
                {tour.departures && tour.departures.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-dm text-xs font-medium text-gray uppercase tracking-[.08em] mb-3">
                      {t('tourDetail.departures')}
                    </h4>
                    <div className="space-y-2">
                      {tour.departures.map((dep: any) => {
                        const spotsLeft = (dep.spotsTotal || 0) - (dep.spotsBooked || 0)
                        const dateDisplay = new Date(dep.date).toLocaleDateString(
                          locale === 'zh' ? 'zh-CN' : locale === 'en' ? 'en-GB' : 'es-ES',
                          { day: 'numeric', month: 'short', year: 'numeric' }
                        )
                        return (
                          <div key={dep.id || dep.date} className="flex justify-between font-dm text-sm">
                            <span>{dateDisplay}</span>
                            <span className={spotsLeft <= 5 ? 'text-red font-medium' : 'text-gray'}>
                              {spotsLeft} {locale === 'es' ? 'plazas' : locale === 'en' ? 'spots' : '余位'}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                <button className="w-full font-dm text-xs font-medium tracking-[.12em] uppercase py-4 bg-red text-white hover:bg-red-dark hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(208,2,27,.3)] transition-all duration-250">
                  {t('tourDetail.bookNow')}
                </button>
                <button className="w-full mt-3 font-dm text-xs font-medium tracking-[.1em] uppercase py-3 bg-transparent text-black border-[1.5px] border-[#ccc] hover:border-black transition-all duration-250">
                  {t('hero.cta2')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
