import { getPayload } from 'payload'
import config from '@payload-config'

import { Hero } from '@/components/home/Hero'
import { Marquee } from '@/components/home/Marquee'
import { MapSection } from '@/components/home/MapSection'
import { DestinationsSection } from '@/components/home/DestinationsSection'
import { PhotoStrip } from '@/components/home/PhotoStrip'
import { ExpressSection } from '@/components/home/ExpressSection'
import { ToursSection } from '@/components/home/ToursSection'
import { WhyUsSection } from '@/components/home/WhyUsSection'
import { BannerSection } from '@/components/home/BannerSection'
import { ReviewsSection } from '@/components/home/ReviewsSection'
import { ContactSection } from '@/components/home/ContactSection'

export const revalidate = 3600

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const payload = await getPayload({ config })

  // Fetch all data in parallel
  const [
    destinationsResult,
    toursResult,
    expressResult,
    reviewsResult,
    homePage,
    siteSettings,
  ] = await Promise.all([
    payload.find({
      collection: 'destinations',
      where: { status: { equals: 'published' }, featured: { equals: true } },
      locale: locale as 'es' | 'en' | 'zh',
      limit: 6,
    }),
    payload.find({
      collection: 'tours',
      where: { status: { equals: 'published' }, isExpress: { not_equals: true } },
      locale: locale as 'es' | 'en' | 'zh',
      limit: 3,
      sort: '-createdAt',
    }),
    payload.find({
      collection: 'tours',
      where: { status: { equals: 'published' }, isExpress: { equals: true } },
      locale: locale as 'es' | 'en' | 'zh',
      limit: 10,
    }),
    payload.find({
      collection: 'reviews',
      where: { status: { equals: 'published' } },
      locale: locale as 'es' | 'en' | 'zh',
      limit: 10,
    }),
    payload.findGlobal({ slug: 'home-page', locale: locale as 'es' | 'en' | 'zh' }),
    payload.findGlobal({ slug: 'site-settings' }),
  ])

  // Extract stats from site settings
  const stats = {
    travelers: siteSettings.stats?.travelers || '500+',
    destinations: siteSettings.stats?.destinations || '20+',
    years: siteSettings.stats?.years || '8',
  }

  // Hero image: prefer external URL, fall back to upload
  const heroImageUrl =
    homePage.hero?.imageUrl ||
    (homePage.hero?.image as { url?: string } | null)?.url ||
    'https://picsum.photos/id/1015/1800/900'

  // Marquee cities
  const marqueeCities = (homePage.marqueeCities || []).map(
    (c: { city: string }) => c.city,
  )

  // Photo strip
  const photoStrip = (homePage.photoStrip || []).map((p: any) => ({
    imageUrl: p.imageUrl,
    image: p.image,
  }))

  // Banner
  const banner = {
    imageUrl:
      homePage.banner?.imageUrl ||
      (homePage.banner?.image as { url?: string } | null)?.url ||
      'https://picsum.photos/id/1022/1800/900',
    location: homePage.banner?.location || 'Zhangjiajie · 张家界',
    quote: homePage.banner?.quote || (locale === 'zh' ? '启发了《阿凡达》的群山' : locale === 'en' ? 'The mountains that inspired Avatar' : 'Las montañas que inspiraron Avatar'),
  }

  // Why us cards
  const whyUsCards = (homePage.whyUsCards || []).map((c: any) => ({
    iconType: c.iconType || '',
    title: c.title || '',
    description: c.description || '',
  }))

  const mapIntro = homePage.mapSection?.intro || ''
  const mapTagline = homePage.mapSection?.tagline || ''

  // Build map data dynamically from Destinations + Tours
  const [allDestinations, allTours] = await Promise.all([
    payload.find({
      collection: 'destinations',
      where: { status: { equals: 'published' } },
      locale: locale as 'es' | 'en' | 'zh',
      limit: 100,
    }),
    payload.find({
      collection: 'tours',
      where: { status: { equals: 'published' } },
      locale: locale as 'es' | 'en' | 'zh',
      limit: 0,
    }),
  ])

  // Count tours per destination ID
  const tourCountByDestId: Record<string, number> = {}
  for (const tour of allTours.docs as any[]) {
    const dests = tour.destinations || []
    for (const d of dests) {
      const destId = typeof d === 'object' ? d.id : d
      if (destId) {
        tourCountByDestId[destId] = (tourCountByDestId[destId] || 0) + 1
      }
    }
  }

  // Aggregate by province
  const provinceSlugMap: Record<string, string> = {}
  const provinceDataMap: Record<string, { description: string; tours: number; highlights: string }> = {}
  for (const d of allDestinations.docs as any[]) {
    if (!d.province || !d.slug) continue
    provinceSlugMap[d.province] = d.slug
    const existing = provinceDataMap[d.province]
    const destTours = tourCountByDestId[d.id] || 0
    if (!existing) {
      provinceDataMap[d.province] = {
        description: d.shortDescription || '',
        tours: destTours,
        highlights: d.highlights || '',
      }
    } else {
      existing.tours += destTours
      // Merge highlights from multiple destinations in same province
      if (d.highlights) {
        existing.highlights = existing.highlights
          ? `${existing.highlights} · ${d.highlights}`
          : d.highlights
      }
    }
  }

  const mapProvinces = Object.entries(provinceDataMap).map(([provinceId, data]) => ({
    provinceId,
    description: data.description,
    tours: data.tours,
    highlights: data.highlights,
  }))

  // Destinations for contact section dropdown
  const contactDestinations = destinationsResult.docs.map((d: any) => ({
    slug: d.slug,
    name: d.name,
  }))

  return (
    <>
      <Hero imageUrl={heroImageUrl} stats={stats} />
      <Marquee cities={marqueeCities} />
      <MapSection provinces={mapProvinces} provinceSlugMap={provinceSlugMap} intro={mapIntro} tagline={mapTagline} />
      <DestinationsSection destinations={destinationsResult.docs as any[]} />
      <PhotoStrip photos={photoStrip} />
      <ExpressSection deals={expressResult.docs as any[]} />
      <ToursSection tours={toursResult.docs as any[]} />
      <WhyUsSection cards={whyUsCards} stats={stats} />
      <BannerSection imageUrl={banner.imageUrl} location={banner.location} quote={banner.quote} />
      <ReviewsSection reviews={reviewsResult.docs as any[]} />
      <ContactSection destinations={contactDestinations} />
    </>
  )
}
