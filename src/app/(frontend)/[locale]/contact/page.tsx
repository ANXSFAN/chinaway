import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations } from 'next-intl/server'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ContactForm } from '@/components/contact/ContactForm'

type Locale = 'es' | 'en' | 'zh'

const pageTitle = { es: 'Contacto', en: 'Contact', zh: '联系我们' }
const pageSubtitle = {
  es: 'Estamos aquí para ayudarte a planificar tu viaje perfecto a China.',
  en: 'We\'re here to help you plan your perfect China trip.',
  zh: '我们随时为您的完美中国之旅提供帮助。',
}
const infoTitle = { es: 'Información de contacto', en: 'Contact information', zh: '联系方式' }

const contactDescriptions = {
  whatsapp: { es: 'Respuesta en < 24h', en: 'Response within 24h', zh: '24小时内回复' },
  wechat: { es: 'Escanea el QR o busca nuestro ID', en: 'Scan QR or search our ID', zh: '扫码或搜索ID' },
  email: { es: 'Para consultas detalladas', en: 'For detailed inquiries', zh: '详细咨询请发邮件' },
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = locale as Locale
  const payload = await getPayload({ config })
  const t = await getTranslations({ locale, namespace: 'contact' })

  const [siteSettings, destinationsResult] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({
      collection: 'destinations',
      where: { status: { equals: 'published' } },
      locale: loc,
      limit: 100,
    }),
  ])

  const whatsapp = siteSettings.contact?.whatsapp || '+34 600 000 000'
  const wechat = siteSettings.contact?.wechat || 'ChinaWayTravel'
  const email = siteSettings.contact?.email || 'info@chinaway.es'
  const companyName = siteSettings.company?.name || 'ChinaWay Travel S.L.'
  const companyAddress = siteSettings.company?.address || 'Madrid, España'
  const companyCif = siteSettings.company?.cif || 'B-12345678'

  const destinations = destinationsResult.docs.map((d: any) => ({
    id: d.id,
    name: d.name as string,
  }))

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden flex items-end">
        <Image
          src="https://picsum.photos/id/1038/1800/900"
          alt="Contact"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative w-full max-w-[1200px] mx-auto px-[6%] pb-12">
          <SectionLabel>{t('label')}</SectionLabel>
          <h1 className="font-playfair text-[clamp(36px,5vw,64px)] font-bold text-white leading-tight">
            {pageTitle[loc]}
          </h1>
          <p className="font-dm text-base text-white/70 mt-3">{pageSubtitle[loc]}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-[6%]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <div>
            <h2 className="font-playfair text-2xl font-bold mb-6">{infoTitle[loc]}</h2>
            <div className="space-y-6">
              {[
                {
                  icon: 'W',
                  label: 'WhatsApp',
                  value: whatsapp,
                  desc: contactDescriptions.whatsapp[loc],
                },
                {
                  icon: '微',
                  label: 'WeChat',
                  value: wechat,
                  desc: contactDescriptions.wechat[loc],
                },
                {
                  icon: '@',
                  label: 'Email',
                  value: email,
                  desc: contactDescriptions.email[loc],
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-playfair text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-dm text-xs text-gray uppercase tracking-[.08em]">{item.label}</div>
                    <div className="font-dm text-base font-medium mt-0.5">{item.value}</div>
                    <div className="font-dm text-sm text-gray mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-cream rounded-sm">
              <div className="font-playfair text-lg font-bold mb-2">{companyName}</div>
              <div className="font-dm text-sm text-gray leading-relaxed">
                {companyAddress}<br />
                CIF: {companyCif}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <ContactForm
            destinations={destinations}
            labels={{
              title: t('title'),
              subtitle: t('subtitle'),
              name: t('name'),
              email: t('email'),
              destination: t('destination'),
              send: t('send'),
            }}
          />
        </div>
      </section>
    </>
  )
}
