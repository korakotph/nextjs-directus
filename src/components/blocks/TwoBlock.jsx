import { prerenderHtml } from '@/lib/prerenderHtml'

export default async function TwoBlock({ item }) {
  // const item = block.block_items?.[0]
  if (!item) return null

  const leftContentHtml = await prerenderHtml(item.left_box);
  const rightContentHtml = await prerenderHtml(item.right_box);

  return (
    <section  style={item?.background_color ? { backgroundColor: item.background_color } : {}}>
      <div className={`${item?.padding || ''} ${item?.align || ''} ${item?.max_w || ''} ${item?.gap || ''} 
            grid grid-cols-1 md:grid-cols-2`}>
        <div dangerouslySetInnerHTML={{ __html: leftContentHtml }} />
        <div dangerouslySetInnerHTML={{ __html: rightContentHtml }} />
      </div>
    </section>
  )
}