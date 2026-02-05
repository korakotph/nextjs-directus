'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getLocale } from '@/utils/getLocale';

const SOCIAL_ICONS = {
  facebook: '/img/fb.svg',
  instagram: '/img/ig.svg',
  x: '/img/x.svg',
  youtube: '/img/yt.svg',
  tiktok: '/img/tt.svg'
}

export default function Footer() {
  const pathname = usePathname();
  const locale = getLocale(pathname)

  const [socials, setSocials] = useState([])
  const [privacyTerms, setPrivacyTerms] = useState([])

  useEffect(() => {
    // Fetch socials
    fetch('https://dev-app-bdt.su.ac.th/suadmin/items/social')
      .then(res => res.json())
      .then(data => setSocials(data?.data ?? []))
      .catch(err => console.error('Social API error:', err))

    // Fetch privacy/terms
    fetch('https://dev-app-bdt.su.ac.th/suadmin/items/Privacy_Terms')
      .then(res => res.json())
      .then(data => setPrivacyTerms(data?.data ?? []))
      .catch(err => console.error('Privacy_Terms API error:', err))
  }, [])

  return (
    <footer id="footer" className="footer bg-brand-500 text-white py-12 px-8">
      <div className="max-w-7xl mx-auto justify-between md:flex">
        <div className="basic md:flex">
          <div className="md:flex mb-8 md:mb-0">
            <img src="/img/logo-footer.webp" className="md:mr-4 mx-auto" alt="Silpakorn Logo" width={361} height={80}/>
          </div>
          <div className="flex mb-4 md:mb-0 items-end gap-3 pb-2 justify-center">
            {socials.map(item => {
              const icon = SOCIAL_ICONS[String(item.name).toLowerCase()]
              if (!icon || !item.url) return null;
              return (
                <a
                  key={item.id || item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={item.url}
                >
                  <img src={icon} alt={item.name} width={25} height={24} />
                </a>
              )
            })}
          </div>
        </div>
        <div className="text-sm text-right flex items-center lg:items-end pb-2 justify-center flex-col lg:flex-row">
          {privacyTerms.map(item => (
            <a
              key={item.id}
              href={item.url || '#'}
              className="mr-0 mb-2 lg:mb-0 lg:mr-3 last:mr-0 underline underline-offset-2 hover:text-brand-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              {locale === 'en' ? item.name_en : item.name_th}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}