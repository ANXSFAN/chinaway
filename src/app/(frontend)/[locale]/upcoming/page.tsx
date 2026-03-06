import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations } from 'next-intl/server'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Link } from '@/i18n/navigation'

function formatDate(dateStr: string, locale: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'en' ? 'en-GB' : 'es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function UpcomingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const payload = await getPayload({ config })
  const t = await getTranslations({ locale, namespace: 'upcoming' })
  const tTours = await getTranslations({ locale, namespace: 'tours' })

  const { docs: allTours } = await payload.find({
    collection: 'tours',
    where: {
      status: { equals: 'published' },
      isUpcoming: { equals: true },
    },
    locale: locale as 'es' | 'en' | 'zh',
    limit: 20,
  })

  // Filter out tours with no departures
  const upcomingTours = allTours.filter(
    (tour: any) => tour.departures && tour.departures.length > 0
  )

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden flex items-end">
        <Image
          src="https://picsum.photos/id/1055/1800/900"
          alt="Upcoming departures"
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
          <p className="font-dm text-base text-white/70 mt-3 max-w-[520px]">{t('subtitle')}</p>
        </div>
      </section>

      {/* Tours with departure dates */}
      <section className="py-16 px-[6%]">
        <div className="max-w-[1200px] mx-auto space-y-8">
          {upcomingTours.map((tour: any) => {
            const imgSrc = tour.coverImage?.url || tour.imageUrl || '/placeholder.jpg'
            const priceDisplay = tour.price ? tour.price.toLocaleString('de-DE') : '0'
            const depositAmount = tour.depositAmount || 100

            return (
              <div key={tour.id} className="bg-white border border-[#eee] rounded-sm overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-0">
                  {/* Image */}
                  <Link href={`/tours/${tour.slug}`} className="block">
                    <Image
                      src={imgSrc}
                      alt={tour.title || ''}
                      width={320}
                      height={220}
                      className="w-full h-[220px] lg:h-full object-cover"
                      sizes="(max-width: 1024px) 100vw, 320px"
                    />
                  </Link>

                  {/* Info */}
                  <div className="p-6 lg:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                      <div>
                        <Link href={`/tours/${tour.slug}`}>
                          <h2 className="font-playfair text-2xl font-bold hover:text-red transition-colors">
                            {tour.title}
                          </h2>
                        </Link>
                        <div className="font-dm text-sm text-gray mt-1">{tour.cities}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-dm text-[10px] text-gray uppercase tracking-[.08em]">{tTours('from')}</div>
                        <div className="font-playfair text-3xl font-bold text-red leading-none">{priceDisplay}€</div>
                        <div className="font-dm text-[11px] text-gray">{tour.days} {tTours('days')}</div>
                      </div>
                    </div>

                    {/* Departure dates */}
                    <div className="space-y-3">
                      {(tour.departures || []).map((dep: any) => {
                        const spotsLeft = (dep.spotsTotal || 0) - (dep.spotsBooked || 0)
                        const urgency = spotsLeft <= 5

                        return (
                          <div
                            key={dep.id || dep.date}
                            className="flex flex-wrap items-center justify-between gap-3 py-3 px-4 border border-[#f0f0f0] rounded-sm"
                          >
                            <div>
                              <div className="font-dm text-[10px] text-gray uppercase tracking-[.08em]">
                                {t('departure')}
                              </div>
                              <div className="font-dm text-sm font-medium">{formatDate(dep.date, locale)}</div>
                            </div>
                            <div className={`font-dm text-sm ${urgency ? 'text-red font-medium' : 'text-gray'}`}>
                              {spotsLeft} {t('spotsLeft')}
                            </div>
                            <button className="font-dm text-[11px] font-medium tracking-[.08em] uppercase px-5 py-2.5 bg-red text-white hover:bg-red-dark transition-colors duration-200">
                              {t('book')} · {depositAmount}€ {t('deposit')}
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          {upcomingTours.length === 0 && (
            <p className="text-center font-dm text-gray py-12">{t('noTours')}</p>
          )}
        </div>
      </section>
    </>
  )
}
