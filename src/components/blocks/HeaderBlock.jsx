export default function HeaderBlock({ item }) {
  // const item = block.block_items?.[0]
  if (!item) return null

  // console.log('HeaderBlock item:', item)

  const tagClassMap = {
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
    p: 'text-lg',
    div: 'text-base',
  }

  // const option = JSON.parse(item.option || '{}');

  const ALLOWED_TAGS = ['h1', 'h2', 'h3', 'h4', 'p', 'div']
  const Tag = ALLOWED_TAGS.includes(item.type.code) ? item.type.code : 'div'
  const className = tagClassMap[Tag];

  return (
    <section className={`${item.max_w || ''} ${item.bg_color || ''} ${item.text_color || ''} ${item.align || 'text-left'} ${item.padding || ''} ${item.padding_y || ''} ${item.padding_x || ''}`}>
      <Tag
        className={`${item.font_weight || ''} ${className} ${item.underline || ''} ${item.italic || ''} ${item.text_indent || ''}`}
        dangerouslySetInnerHTML={{ __html: item.content }}
      />
    </section>
  )
}