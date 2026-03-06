import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/layout/CookieBanner'
import { TravelAgencyJsonLd } from '@/components/seo/JsonLd'
import '../frontend.css'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: {
    default: 'ChinaWay - Viajes a China desde Europa',
    template: '%s | ChinaWay',
  },
  description: 'Itinerarios exclusivos a China con guías en español, asistencia de visado y experiencias únicas. Tu viaje empieza aquí.',
  metadataBase: new URL(baseUrl),
  alternates: {
    languages: {
      es: '/es',
      en: '/en',
      zh: '/zh',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'ChinaWay',
    title: 'ChinaWay - Viajes a China desde Europa',
    description: 'Itinerarios exclusivos a China con guías en español, asistencia de visado y experiencias únicas.',
    locale: 'es_ES',
    alternateLocale: ['en_GB', 'zh_CN'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChinaWay - Viajes a China desde Europa',
    description: 'Itinerarios exclusivos a China con guías en español.',
  },
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'es' | 'en' | 'zh')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <TravelAgencyJsonLd />
      </head>
      <body className="font-dm text-black bg-white overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
