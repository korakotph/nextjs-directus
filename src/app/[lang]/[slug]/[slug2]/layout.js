// app/[lang]/[slug]/[slug2]/layout.jsx
import { use } from 'react'

export default function SubLayout({ children, params }) {
  const { lang, slug, slug2 } = use(params)

  return (
    <div data-lang={lang}>
      {children}
    </div>
  )
}
