import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations } from 'next-intl/server'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Link } from '@/i18n/navigation'

export const revalidate = 3600

export default async function DestinationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const payload = await getPayload({ config })
  const t = await getTranslations({ locale, namespace: 'destinations' })

  const { docs: destinations } = await payload.find({
    collection: 'destinations',
    where: { status: { equals: 'published' } },
    locale: locale as 'es' | 'en' | 'zh',
    limit: 100,
  })

  return (
    <>
      {/* Hero banner */}
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden flex items-end">
        <Image
          src="https://picsum.photos/id/1018/1800/900"
          alt="China destinations"
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
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-[6%]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destinations.map((d: any) => {
            const imgSrc = d.coverImage?.url || d.imageUrl || '/placeholder.jpg'
            const themeLabel = d.theme ? d.theme.charAt(0).toUpperCase() + d.theme.slice(1) : ''
            return (
              <Link
                key={d.id}
                href={`/destinations/${d.slug}`}
                className="cursor-pointer overflow-hidden relative rounded-sm group h-[280px] block"
              >
                <Image
                  src={imgSrc}
                  alt={d.name || ''}
                  fill
                  className="object-cover transition-transform duration-600 ease-out group-hover:scale-[1.07]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10 transition-opacity duration-300 group-hover:opacity-90" />
                <span className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-red text-white font-dm text-[10px] font-medium tracking-[.12em] uppercase z-[2]">
                  {themeLabel}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-[2]">
                  <div className="font-playfair text-2xl font-bold mb-1">{d.name}</div>
                  <div className="font-dm text-xs opacity-70">{d.shortDescription}</div>
                </div>
              </Link>
            )
          })}
        </div>
        {destinations.length === 0 && (
          <p className="text-center font-dm text-gray py-12">
            {locale === 'es' ? 'No hay destinos disponibles por el momento.' : locale === 'en' ? 'No destinations available at the moment.' : '暂无可用目的地。'}
          </p>
        )}
      </section>
    </>
  )
}
