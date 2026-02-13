'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

const DEFAULT_LOCALE = 'th'

export default function Footer({ settings, lang }) {
  const pathname = usePathname()
  const year = new Date().getFullYear()

  const locale = lang;

  const t = {
    th: {
      rights: 'สงวนลิขสิทธิ์',
    },
    en: {
      rights: 'All rights reserved',
    },
  }

  const socials = [
    {
      name: 'facebook',
      icon: '/img/fb.svg',
      url: settings?.facebook_url,
    },
    {
      name: 'youtube',
      icon: '/img/yt.svg',
      url: settings?.youtube_url,
    },
    {
      name: 'instagram',
      icon: '/img/ig.svg',
      url: settings?.instagram_url,
    },
  ].filter(item => item.url)

  return (
    <footer
      className="text-white shadow-md"
      style={{ backgroundColor: settings?.footer_color }}
    >
      <div className={`${settings?.max_w_footer} flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-4`}>
        {/* Left */}
        <div className="text-sm text-center md:text-left">
          © {year} {settings?.site_name}.
          <span className="ml-1">
            {t[locale]?.rights ?? t.th.rights}
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {socials.map(item => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition"
              aria-label={item.name}
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={22}
                height={22}
              />
            </a>
          ))}
        </div>

      </div>
    </footer>
  )
}
