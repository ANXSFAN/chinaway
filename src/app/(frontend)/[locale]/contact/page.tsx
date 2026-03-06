import { useTranslations, useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

export default function ContactPage() {
  const t = useTranslations('contact')
  const locale = useLocale() as 'es' | 'en' | 'zh'

  const pageTitle = { es: 'Contacto', en: 'Contact', zh: '联系我们' }
  const pageSubtitle = {
    es: 'Estamos aquí para ayudarte a planificar tu viaje perfecto a China.',
    en: 'We\'re here to help you plan your perfect China trip.',
    zh: '我们随时为您的完美中国之旅提供帮助。',
  }
  const infoTitle = { es: 'Información de contacto', en: 'Contact information', zh: '联系方式' }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden flex items-end">
        <img
          src="https://picsum.photos/id/1038/1800/900"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative w-full max-w-[1200px] mx-auto px-[6%] pb-12">
          <SectionLabel>{t('label')}</SectionLabel>
          <h1 className="font-playfair text-[clamp(36px,5vw,64px)] font-bold text-white leading-tight">
            {pageTitle[locale]}
          </h1>
          <p className="font-dm text-base text-white/70 mt-3">{pageSubtitle[locale]}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-[6%]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <div>
            <h2 className="font-playfair text-2xl font-bold mb-6">{infoTitle[locale]}</h2>
            <div className="space-y-6">
              {[
                {
                  icon: 'W',
                  label: 'WhatsApp',
                  value: '+34 600 000 000',
                  desc: { es: 'Respuesta en < 24h', en: 'Response within 24h', zh: '24小时内回复' },
                },
                {
                  icon: '微',
                  label: 'WeChat',
                  value: 'ChinaWayTravel',
                  desc: { es: 'Escanea el QR o busca nuestro ID', en: 'Scan QR or search our ID', zh: '扫码或搜索ID' },
                },
                {
                  icon: '@',
                  label: 'Email',
                  value: 'info@chinaway.es',
                  desc: { es: 'Para consultas detalladas', en: 'For detailed inquiries', zh: '详细咨询请发邮件' },
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-playfair text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-dm text-xs text-gray uppercase tracking-[.08em]">{item.label}</div>
                    <div className="font-dm text-base font-medium mt-0.5">{item.value}</div>
                    <div className="font-dm text-sm text-gray mt-0.5">{item.desc[locale]}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-cream rounded-sm">
              <div className="font-playfair text-lg font-bold mb-2">ChinaWay Travel S.L.</div>
              <div className="font-dm text-sm text-gray leading-relaxed">
                Madrid, España<br />
                CIF: B-12345678
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="font-playfair text-2xl font-bold mb-6">{t('title')}</h2>
            <p className="font-dm text-sm text-gray leading-relaxed mb-8">{t('subtitle')}</p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder={t('name')}
                className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors"
              />
              <input
                type="email"
                placeholder={t('email')}
                className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors"
              />
              <select
                defaultValue=""
                className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors"
              >
                <option value="" disabled>{t('destination')}</option>
                {['Guilin', 'Shanghai', 'Tibet', 'Yunnan', "Xi'an", 'Beijing', 'Zhangjiajie'].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <textarea
                rows={5}
                placeholder={locale === 'es' ? 'Tu mensaje...' : locale === 'en' ? 'Your message...' : '您的留言...'}
                className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors resize-none"
              />
              <div className="flex items-start gap-2">
                <input type="checkbox" id="privacy" className="mt-1" />
                <label htmlFor="privacy" className="font-dm text-xs text-gray leading-relaxed">
                  {locale === 'es'
                    ? 'Acepto la política de privacidad y el tratamiento de mis datos personales.'
                    : locale === 'en'
                      ? 'I accept the privacy policy and the processing of my personal data.'
                      : '我接受隐私政策和个人数据处理条款。'}
                </label>
              </div>
              <button className="w-full font-dm text-xs font-medium tracking-[.12em] uppercase py-4 bg-red text-white hover:bg-red-dark hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(208,2,27,.3)] transition-all duration-250">
                {t('send')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
