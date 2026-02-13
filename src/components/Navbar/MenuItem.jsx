'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

export default function MenuItem({ item, locale, buildUrl, isActive, getTitleByLang, settings }) {

    const hasChildren = item.children?.length > 0
  const [open, setOpen] = useState(false)

  const isExternal = item.external_url?.startsWith('http')
  
  if (!hasChildren) {
    if (isExternal) {
        return (
        <a
            href={item.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-2 py-2 text-white font-light hover:underline underline-offset-6"
        >
            {getTitleByLang(item)}
        </a>
        )
    }

    return (
        <Link
        href={buildUrl(locale, item.slug)}
        className={`block px-2 py-2 text-white hover:underline underline-offset-6 ${
            isActive(item.slug) ? 'font-medium' : 'font-light'
        }`}
        >
        {getTitleByLang(item)}
        </Link>
    )
    }

  return (
    <div className="relative group">
        
        {/* Parent Link */}
        <Link
            href={buildUrl(locale, item.slug)}
            className="px-4 py-2 text-white hover:opacity-80 flex items-center gap-1 hover:underline underline-offset-6"
        >
            {getTitleByLang(item)}
            <FontAwesomeIcon icon={faAngleDown} className="w-3 h-3" />
        </Link>

        {/* Dropdown */}
        <div
        style={{ backgroundColor: settings?.header_color }}
        className="absolute left-0 top-full text-white shadow-lg px-2 py-2
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible
                    transition-all duration-200 w-full"
        >
        {item.children.map(child => (
            <MenuItem
            key={child.id}
            item={child}
            locale={locale}
            buildUrl={buildUrl}
            isActive={isActive}
            getTitleByLang={getTitleByLang}
            settings={settings}
            />
        ))}
        </div>
    </div>
    )
}