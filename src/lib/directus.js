import { Children } from "react";

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

/**
 * ดึง page ตาม slug + language
 */
export async function getPageBySlug(slug, lang = 'th') {
  const params = new URLSearchParams()

  /* =========================
   * Page filter
   * ========================= */
  params.append('filter[slug][_eq]', slug)
  params.append('filter[status][_eq]', 'published')

  /* =========================
   * Page fields
   * ========================= */
  params.append('fields[]', 'id')
  params.append('fields[]', 'slug')
  params.append('fields[]', 'menu_order')
  params.append('fields[]', 'show_in_menu')

  /* =========================
   * Page translations
   * ========================= */
  params.append('fields[]', 'page_translations.languages_code')
  params.append('fields[]', 'page_translations.title')
  params.append('fields[]', 'page_translations.body')
  params.append('fields[]', 'page_translations.seo_title')
  params.append('fields[]', 'page_translations.seo_description')

  params.append(
    'deep[page_translations][filter][languages_code][_eq]',
    lang
  )

  /* =========================
   * Page blocks
   * ========================= */
  params.append('fields[]', 'page_blocks.id')
  params.append('fields[]', 'page_blocks.sort')
  params.append('deep[page_blocks][sort]', 'sort')

  /* =========================
   * Block items
   * ========================= */
  // params.append('fields[]', 'page_blocks.block_items.id')
  // params.append('fields[]', 'page_blocks.block_items.type')
  // params.append('fields[]', 'page_blocks.block_items.content')
  // params.append('fields[]', 'page_blocks.block_items.image')
  // params.append('fields[]', 'page_blocks.block_items.option')
  // params.append('fields[]', 'page_blocks.block_items.sort')
  params.append('fields[]', 'page_blocks.block_items.*')

  // 👉 ASC
  params.append(
    'deep[page_blocks][deep][block_items][sort]',
    'sort'
  )

  params.append('fields[]', 'page_blocks.block_items.type.code')
  params.append('fields[]', 'page_blocks.block_items.type.type')

  const url = `${DIRECTUS_URL}/items/pages?${params.toString()}`
  const res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) return null

  const json = await res.json()
  const page = json.data?.[0]
  if (!page) return null

  const translation = page.page_translations?.find(
    t => t.languages_code === lang
  )

  // ✅ FIX: ใช้ page.page_blocks
  const blocks = page.page_blocks || []

  // ✅ safety sort (กัน API พลาด)
  blocks.forEach(block => {
    block.block_items?.sort((a, b) => a.sort - b.sort)
  })

  const results = {
    id: page.id,
    slug: page.slug,
    menu_order: page.menu_order,
    show_in_menu: page.show_in_menu,
    translation: translation || null,
    blocks
  }

  return results
}
/**
 * ดึง page สำหรับ menu / sitemap (ตามภาษา)
 */
export async function getPages(lang = 'th') {
  const params = new URLSearchParams()

  // ===== MAIN FILTER =====
  params.append('filter[status][_eq]', 'published')
  params.append('filter[show_in_menu][_eq]', 'true')
  params.append('filter[parent][_null]', 'true') // เอาเฉพาะ menu หลัก
  // ===== FIELDS =====
  params.append('fields[]', 'id')
  params.append('fields[]', 'slug')
  params.append('fields[]', 'menu_order')
  params.append('fields[]', 'parent')
  params.append('fields[]', 'external_url')
  params.append('fields[]', 'children')
  // children
  params.append('fields[]', 'children.id')
  params.append('fields[]', 'children.slug')
  params.append('fields[]', 'children.menu_order')
  params.append('fields[]', 'children.page_translations.languages_code')
  params.append('fields[]', 'children.page_translations.title')
  // main translations
  params.append('fields[]', 'page_translations.languages_code')
  params.append('fields[]', 'page_translations.title')
  // ===== DEEP FILTER =====
  // filter translation ตาม lang
  params.append( 'deep[page_translations][filter][languages_code][_eq]',lang)
  // filter children
  params.append('deep[children][filter][status][_eq]','published')
  params.append('deep[children][filter][show_in_menu][_eq]','true')
  params.append('deep[children][deep][page_translations][filter][languages_code][_eq]',lang)
  // ===== SORT =====
  params.append('sort', 'menu_order')
  params.append('deep[children][sort]', 'menu_order')

  const res = await fetch(
    `${DIRECTUS_URL}/items/pages?${params.toString()}`,
    { cache: 'no-store' }
  )


  if (!res.ok) {
    throw new Error('Failed to fetch pages')
  }

  const json = await res.json()

  // normalize สำหรับ Navbar
  const results = (json.data || []).map(page => {
    const translation = page.page_translations?.find(
      t => t.languages_code === lang
    )

    const children = (page.children || []).map(child => {
      const childTranslation = child.page_translations?.find(
        t => t.languages_code === lang
      )

      return {
        id: child.id,
        slug: child.slug,
        menu_order: child.menu_order,
        title: childTranslation?.title ?? child.slug,
        external_url: child.external_url || null
      }
    })

    return {
      id: page.id,
      slug: page.slug,
      menu_order: page.menu_order,
      title: translation?.title ?? page.slug,
      external_url: page.external_url || null,
      children
    }
  })

  return results;
}
/**
 * ดึง page ตาม slug + language
 */
async function getNewsParentId(newsid) {
  const params = new URLSearchParams()
  // params.append('filter[slug][_eq]', 'news')
  params.append('filter[newsid][_eq]', newsid)

  const res = await fetch(
    `${DIRECTUS_URL}/items/news?${params.toString()}`,
    { cache: 'no-store' }
  )

  if (!res.ok) return null

  const json = await res.json()

  return json.data?.[0];
}

export async function getNewsDetailBySlug(slug, lang = 'th') {
  const parent = await getNewsParentId(slug)
  const params = new URLSearchParams()

  // 🔥 ลูกของ news เท่านั้น
  params.append('filter[news_id][_eq]', parent?.id)

  const url = `${DIRECTUS_URL}/items/news_detail?${params.toString()}`
  const res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) return null

  const json = await res.json()
  const page = json.data?.[0]
  if (!page) return null


  var results = {
    id: page.id,
    slug: slug,
    content: page.content,
    parent: parent || null
  }

  return results;
}