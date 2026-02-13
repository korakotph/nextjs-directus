'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import '@/styles/navbar.scss'
import MenuItem from './MenuItem'
import MobileMenuItem from './MobileMenuItem'

const DEFAULT_LOCALE = 'th'

export default function NavbarClient({ settings, menu, languages, lang }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // ตัวอย่าง: /th/news/abc
  const segments = pathname.split('/').filter(Boolean)
  const slug = segments[1] ?? 'home'

  const locale = lang;

  const isActive = (itemSlug) => {
    return slug === itemSlug || (slug === 'home' && itemSlug === 'home')
  }

  const buildUrl = (targetLocale, targetSlug = 'home') =>
    targetSlug === 'home'
      ? `/${targetLocale}`
      : `/${targetLocale}/${targetSlug}`

  const getTitleByLang = (item) =>
    item.translations?.find(t => t.languages_code === locale)?.title
      ?? item.title


  return (
    <nav className="sticky top-0 z-[100] shadow-md" style={{ backgroundColor: settings?.header_color}}>
      <div className={`px-6 h-20 flex justify-between items-center ${settings?.max_w_nav}`}>
        {/* LOGO */}
        <Link href={buildUrl(locale)}>
          <img
            src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${settings.logo}`}
            alt={settings.site_name}
            className="h-10"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-2">
          {menu.map(item => (
            <MenuItem
              key={item.id}
              item={item}
              locale={locale}
              buildUrl={buildUrl}
              isActive={isActive}
              getTitleByLang={getTitleByLang}
              settings={settings}
            />
          ))}
        </div>

        {/* Desktop Language */}
        {languages.length > 1 && (
          <div className="hidden md:flex items-center">
            {languages.map(lang => (
              <Link
                key={lang.code}
                href={buildUrl(lang.code, slug)}
                className={`px-3 border-l-2 border-white/50 first:border-l-0 transition ${
                  locale === lang.code
                    ? 'text-white font-semibold'
                    : 'text-white hover:opacity-80'
                }`}
              >
                {lang.code.toUpperCase()}
              </Link>
            ))}
          </div>
        )}

        {/* Mobile Toggle */}
        <button 
          className="menu-btn md:hidden flex flex-col justify-center items-center w-8 h-8 mr-0"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-white mb-1 transition-all duration-300 "></span>
          <span className="block w-6 h-0.5 bg-white mb-1 transition-all duration-300 "></span>
          <span className="block w-6 h-0.5 bg-white transition-all duration-300 "></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-700 border-t border-white/10 px-6 py-4 space-y-4">

          {/* Menu */}
          <div className="flex flex-col gap-3">
            {menu.map(item => (
              <MobileMenuItem
                key={item.id}
                item={item}
                locale={locale}
                buildUrl={buildUrl}
                isActive={isActive}
                getTitleByLang={getTitleByLang}
                settings={settings}
              />
            ))}
          </div>

          {/* Language */}
          {languages.length > 1 && (
            <div className="flex gap-4 pt-4 border-t border-white/10">
              {languages.map(lang => (
                <Link
                  key={lang.code}
                  href={buildUrl(lang.code, slug)}
                  onClick={() => setMenuOpen(false)}
                  className={`${
                    locale === lang.code
                      ? 'text-white font-semibold'
                      : 'text-white hover:opacity-80 transition'
                  }`}
                >
                  {lang.code.toUpperCase()}
                </Link>
              ))}
            </div>
          )}

        </div>
      )}
    </nav>
  )
}
