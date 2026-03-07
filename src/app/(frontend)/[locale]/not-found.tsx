import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function NotFound() {
  const t = await getTranslations('notFound')

  return (
    <section className="min-h-[60vh] flex items-center justify-center px-[6%]">
      <div className="text-center">
        <h1 className="font-playfair text-[clamp(64px,10vw,120px)] font-bold text-red leading-none">404</h1>
        <p className="font-dm text-lg text-gray mt-4 mb-8">{t('message')}</p>
        <Link href="/" className="font-dm text-xs font-medium tracking-[.12em] uppercase px-8 py-3.5 bg-red text-white hover:bg-red-dark transition-colors">
          {t('back')}
        </Link>
      </div>
    </section>
  )
}
