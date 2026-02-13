import { NextResponse } from 'next/server'

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL

export async function GET(req, ctx) {
  const { slug } = ctx.params
  const { searchParams } = new URL(req.url)
  const lang = searchParams.get('lang') || 'th'

  const qs = new URLSearchParams()

  qs.append('filter[slug][_eq]', slug)
  qs.append('filter[status][_eq]', 'published')

  qs.append('fields[]', 'id')
  qs.append('fields[]', 'slug')
  qs.append('fields[]', 'menu_order')
  qs.append('fields[]', 'show_in_menu')

  // page_translations
  qs.append('fields[]', 'page_translations.languages_code')
  qs.append('fields[]', 'page_translations.title')
  qs.append('fields[]', 'page_translations.body')
  qs.append('fields[]', 'page_translations.seo_title')
  qs.append('fields[]', 'page_translations.seo_description')
  qs.append(
    'deep[page_translations][filter][languages_code][_eq]',
    lang
  )

  // page_blocks
  qs.append('fields[]', 'page_blocks.id')
  qs.append('fields[]', 'page_blocks.sort')
  qs.append('fields[]', 'page_blocks.block_type')
  qs.append('deep[page_blocks][sort]', 'sort')

  // block_items
  qs.append('fields[]', 'page_blocks.block_items.id')
  qs.append('fields[]', 'page_blocks.block_items.code')
  qs.append('fields[]', 'page_blocks.block_items.content')

  const res = await fetch(
    `${DIRECTUS_URL}/items/pages?${qs.toString()}`,
    { cache: 'no-store' }
  )

  const page = (await res.json()).data?.[0]

  if (!page) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 })
  }

  return NextResponse.json({
    id: page.id,
    slug: page.slug,
    menu_order: page.menu_order,
    show_in_menu: page.show_in_menu,
    translation: page.page_translations?.[0] || null,
    blocks: page.page_blocks || []
  })
}
