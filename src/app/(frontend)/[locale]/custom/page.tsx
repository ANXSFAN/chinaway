import { getPayload } from 'payload'
import config from '@payload-config'
import { CustomTravelClient } from './CustomTravelClient'

export default async function CustomTravelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const payload = await getPayload({ config })

  const { docs: destinations } = await payload.find({
    collection: 'destinations',
    where: { status: { equals: 'published' } },
    locale: locale as 'es' | 'en' | 'zh',
    limit: 100,
  })

  const provinces = destinations.map((d: any) => ({
    id: d.province,
    name: d.name as string,
  }))

  // Deduplicate by province id (multiple destinations may share a province)
  const uniqueProvinces = Array.from(
    new Map(provinces.map((p: { id: string; name: string }) => [p.id, p])).values()
  )

  return <CustomTravelClient provinces={uniqueProvinces} />
}
