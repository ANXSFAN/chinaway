import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations } from 'next-intl/server'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'destinations',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    locale: locale as 'es' | 'en' | 'zh',
    limit: 1,
  })
  const dest = docs[0] as any
  if (!dest) return {}
  const imgSrc = dest.coverImage?.url || dest.imageUrl || ''
  return {
    title: dest.name,
    description: dest.shortDescription || '',
    openGraph: { images: imgSrc ? [imgSrc] : [] },
  }
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const payload = await getPayload({ config })
  const t = await getTranslations({ locale })

  const { docs } = await payload.find({
    collection: 'destinations',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    locale: locale as 'es' | 'en' | 'zh',
    limit: 1,
  })

  const dest = docs[0] as any
  if (!dest) notFound()

  // Find tours related to this destination
  const { docs: relatedTours } = await payload.find({
    collection: 'tours',
    where: {
      status: { equals: 'published' },
      destinations: { contains: dest.id },
    },
    locale: locale as 'es' | 'en' | 'zh',
    limit: 5,
  })

  const imgSrc = dest.coverImage?.url || dest.imageUrl || '/placeholder.jpg'
  const themeLabel = dest.theme ? String(dest.theme).charAt(0).toUpperCase() + String(dest.theme).slice(1) : ''
  const gallery = (dest.gallery || []) as any[]

  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden flex items-end">
        <img src={imgSrc} alt={String(dest.name || '')} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative w-full max-w-[1200px] mx-auto px-[6%] pb-12">
          <span className="inline-block px-2.5 py-1 bg-red text-white font-dm text-[10px] font-medium tracking-[.12em] uppercase mb-4">
            {themeLabel}
          </span>
          <h1 className="font-playfair text-[clamp(40px,6vw,72px)] font-bold text-white leading-tight">
            {dest.name}
          </h1>
          {dest.shortDescription && (
            <p className="font-dm text-base text-white/75 mt-3 max-w-[500px]">{dest.shortDescription}</p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-[6%]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Link
              href="/destinations"
              className="inline-flex items-center font-dm text-sm text-gray hover:text-red transition-colors mb-10"
            >
              &larr;&nbsp;&nbsp;{t('destinationDetail.backToDestinations')}
            </Link>

            <SectionLabel>{themeLabel}</SectionLabel>
            {dest.longDescription && (
              <p className="font-dm text-base text-black/80 leading-relaxed mb-10">{dest.longDescription}</p>
            )}

            {/* Gallery */}
            {gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {gallery.map((item: any, i: number) => {
                  const galImgSrc = item.image?.url || ''
                  return galImgSrc ? (
                    <img key={i} src={galImgSrc} alt="" className="w-full h-[200px] object-cover rounded-sm" />
                  ) : null
                })}
              </div>
            )}
          </div>

          {/* Sidebar - Related Tours */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-6">
              {t('destinationDetail.availableTours')}
            </h3>
            {relatedTours.length === 0 && (
              <p className="font-dm text-sm text-gray">{t('destinationDetail.comingSoon')}</p>
            )}
            {relatedTours.map((tour: any) => {
              const tourImg = tour.coverImage?.url || tour.imageUrl || '/placeholder.jpg'
              const priceDisplay = tour.price ? tour.price.toLocaleString('de-DE') : '0'
              return (
                <Link key={tour.id} href={`/tours/${tour.slug}`} className="block mb-4 group">
                  <div className="overflow-hidden rounded-sm">
                    <img
                      src={tourImg}
                      alt={tour.title || ''}
                      className="w-full h-[160px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3">
                    <div className="font-playfair text-lg font-bold">{tour.title}</div>
                    <div className="font-dm text-sm text-gray">
                      {tour.days} {t('tours.days')} · {t('tours.from')} {priceDisplay}€
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
