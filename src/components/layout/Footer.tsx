'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'

const legalLinks = {
  es: [
    { href: '/legal/privacy', label: 'Privacidad' },
    { href: '/legal/cookies', label: 'Cookies' },
    { href: '/legal/terms', label: 'Términos' },
  ],
  en: [
    { href: '/legal/privacy', label: 'Privacy' },
    { href: '/legal/cookies', label: 'Cookies' },
    { href: '/legal/terms', label: 'Terms' },
  ],
  zh: [
    { href: '/legal/privacy', label: '隐私政策' },
    { href: '/legal/cookies', label: 'Cookie' },
    { href: '/legal/terms', label: '服务条款' },
  ],
} as const

export function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale() as 'es' | 'en' | 'zh'

  return (
    <footer className="border-t border-[#e8e8e8]">
      {/* Main footer */}
      <div className="py-7 px-[6%] flex justify-between items-center flex-wrap gap-3.5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-red flex items-center justify-center">
            <span className="text-white font-playfair font-black text-[13px]">中</span>
          </div>
          <span className="font-playfair text-base font-bold">ChinaWay</span>
        </Link>
        <span className="font-dm text-[11px] text-gray">{t('copyright')}</span>
        <div className="flex gap-[22px]">
          <a
            href="https://instagram.com/chinaway"
            target="_blank"
            rel="noopener noreferrer"
            className="font-dm text-[11px] text-gray cursor-pointer tracking-[.08em] uppercase hover:text-black transition-colors"
          >
            Instagram
          </a>
          <span
            className="font-dm text-[11px] text-gray cursor-pointer tracking-[.08em] uppercase hover:text-black transition-colors"
            title="WeChat: ChinaWay"
          >
            WeChat
          </span>
          <a
            href="https://wa.me/34600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="font-dm text-[11px] text-gray cursor-pointer tracking-[.08em] uppercase hover:text-black transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
      {/* Legal links */}
      <div className="border-t border-[#f0f0f0] py-4 px-[6%] flex justify-center gap-6">
        {legalLinks[locale].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-dm text-[10px] text-gray tracking-[.08em] uppercase hover:text-black transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  )
}
