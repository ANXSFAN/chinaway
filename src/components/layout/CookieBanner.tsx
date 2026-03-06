'use client'

import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'

const text = {
  es: {
    message: 'Utilizamos cookies técnicas y analíticas para mejorar tu experiencia. Puedes aceptar todas o solo las necesarias.',
    accept: 'Aceptar todas',
    reject: 'Solo necesarias',
    more: 'Más información',
  },
  en: {
    message: 'We use technical and analytical cookies to improve your experience. You can accept all or only the necessary ones.',
    accept: 'Accept all',
    reject: 'Necessary only',
    more: 'More information',
  },
  zh: {
    message: '我们使用技术性和分析性 Cookie 来改善您的体验。您可以接受全部或仅接受必要的 Cookie。',
    accept: '全部接受',
    reject: '仅必要',
    more: '了解更多',
  },
}

export function CookieBanner() {
  const locale = useLocale() as 'es' | 'en' | 'zh'
  const [visible, setVisible] = useState(false)
  const t = text[locale]

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'all')
    setVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'necessary')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] bg-black/95 backdrop-blur-md text-white p-5 md:p-6">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
        <p className="font-dm text-sm text-white/80 leading-relaxed flex-1">
          {t.message}{' '}
          <Link href="/legal/cookies" className="text-red underline underline-offset-2 hover:text-white transition-colors">
            {t.more}
          </Link>
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handleReject}
            className="font-dm text-[11px] font-medium tracking-[.08em] uppercase px-5 py-2.5 border border-white/30 text-white hover:border-white transition-colors"
          >
            {t.reject}
          </button>
          <button
            onClick={handleAccept}
            className="font-dm text-[11px] font-medium tracking-[.08em] uppercase px-5 py-2.5 bg-red text-white hover:bg-red-dark transition-colors"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
