import { getPageBySlug } from "@/lib/directus";
import BlockRenderer from '@/components/blocks/BlockRenderer'

export default async function Page({ params }) {
  const { lang, slug } = await params
  const page = await getPageBySlug(slug, lang)

  if (!page) {
    return <h1>404 Page not found</h1>
  }

  const { translation, blocks } = page

  return (
    <main className="">
      <BlockRenderer blocks={blocks} lang={lang}/>
    </main>
  )
}