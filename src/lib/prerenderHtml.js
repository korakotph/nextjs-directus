import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import rehypeAddClasses from 'rehype-add-classes'

export async function prerenderHtml(html = '') {
  if (!html) return ''

  const file = await unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeAddClasses, {
      h1: 'text-4xl font-medium mt-8 mb-4',
      h2: 'text-3xl font-medium mt-6 mb-3',
      h3: 'text-2xl font-base mt-4 mb-2',
      p: 'text-xl leading-relaxed mb-4',
      img: 'rounded-xl my-6 w-full h-auto',
      ul: 'list-disc pl-6 mb-4',
      ol: 'list-decimal pl-6 mb-4',
      li: 'mb-2',
      a: 'text-green-600 underline hover:text-green-800'
    })
    .use(rehypeStringify)
    .process(html)

  return String(file)
}
