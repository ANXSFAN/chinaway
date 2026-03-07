'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'

const localeLabels = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中文' },
] as const

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [menuOpen])

  const navItems = [
    { label: t('home'), href: '/' },
    { label: t('destinations'), href: '/destinations' },
    { label: t('tours'), href: '/tours' },
    { label: t('upcoming'), href: '/upcoming' },
    { label: t('customize'), href: '/custom' },
    { label: t('blog'), href: '/blog' },
    { label: t('info'), href: '/info' },
    { label: t('about'), href: '/about' },
    { label: t('contact'), href: '/contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-350 ${
        scrolled
          ? 'py-3.5 px-6 md:px-12 bg-white/97 backdrop-blur-md shadow-[0_1px_0_#e8e8e8]'
          : 'py-5 px-6 md:px-12 bg-transparent'
      }`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-[34px] h-[34px] bg-red flex items-center justify-center flex-shrink-0">
          <span className="text-white font-playfair font-black text-base">中</span>
        </div>
        <div>
          <div
            className={`font-playfair text-[17px] font-bold leading-tight transition-colors duration-350 ${
              scrolled ? 'text-black' : 'text-white'
            }`}
          >
            ChinaWay
          </div>
          <div
            className={`font-dm text-[9px] tracking-[.2em] uppercase mt-px transition-colors duration-350 ${
              scrolled ? 'text-gray' : 'text-white/55'
            }`}
          >
            {t('tagline')}
          </div>
        </div>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex gap-5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`font-dm text-xs tracking-[.1em] uppercase transition-opacity duration-200 hover:opacity-100 ${
              scrolled ? 'text-black opacity-55' : 'text-white opacity-75'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Desktop Language Switcher */}
      <div className="hidden lg:flex gap-1.5">
        {localeLabels.map(({ code, label }) => (
          <Link
            key={code}
            href={pathname}
            locale={code}
            className={`px-3 py-1 border-[1.5px] rounded-full font-dm text-[11px] font-medium tracking-[.05em] transition-all duration-200 ${
              scrolled
                ? locale === code
                  ? 'border-red text-red bg-red/5'
                  : 'border-transparent text-gray hover:text-black hover:border-gray/30'
                : locale === code
                  ? 'border-white text-white'
                  : 'border-transparent text-white/65 hover:text-white hover:border-white/30'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Mobile: Language switcher + hamburger */}
      <div className="lg:hidden flex items-center gap-2">
        <div className="flex gap-1">
          {localeLabels.map(({ code, label }) => (
            <Link
              key={code}
              href={pathname}
              locale={code}
              className={`px-2 py-0.5 rounded-full font-dm text-[10px] font-medium tracking-[.04em] transition-all duration-200 ${
                scrolled
                  ? locale === code
                    ? 'text-red bg-red/8'
                    : 'text-gray/60'
                  : locale === code
                    ? 'text-white bg-white/15'
                    : 'text-white/50'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
        <button
          className="flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-5 h-[1.5px] transition-colors ${scrolled ? 'bg-black' : 'bg-white'}`}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu — right-aligned panel */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex touch-none"
          onTouchMove={(e) => e.preventDefault()}
        >
          {/* Left blank area — tap or swipe to close */}
          <div
            className="flex-shrink-0 w-[30%]"
            onClick={() => setMenuOpen(false)}
            onTouchStart={() => setMenuOpen(false)}
          />
          {/* Right panel */}
          <div className="flex-1 bg-white/30 backdrop-blur-xl flex flex-col justify-center items-center relative overflow-hidden -mt-20">
            {/* Close button */}
            <button
              className="absolute top-5 right-6 p-2"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <nav className="flex flex-col items-center w-full px-8">
              {navItems.map((item, i) => (
                <div key={item.href} className="w-full flex flex-col items-center">
                  {i > 0 && <div className="w-12 h-px bg-black/10" />}
                  <Link
                    href={item.href}
                    className="font-playfair text-[28px] font-bold tracking-[.02em] text-black/80 hover:text-black transition-colors py-3"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
