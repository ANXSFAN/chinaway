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

      {/* Language Switcher */}
      <div className="hidden md:flex gap-1.5">
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

      {/* Mobile menu button */}
      <button
        className="lg:hidden flex flex-col gap-1.5 p-2"
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg lg:hidden p-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-dm text-sm tracking-[.08em] uppercase text-black/70 hover:text-black"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-4 border-t border-gray/20">
            {localeLabels.map(({ code, label }) => (
              <Link
                key={code}
                href={pathname}
                locale={code}
                className={`px-3 py-1 border-[1.5px] rounded-full font-dm text-[11px] font-medium ${
                  locale === code ? 'border-red text-red' : 'border-transparent text-gray'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
