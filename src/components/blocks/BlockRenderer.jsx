import HeaderBlock from './HeaderBlock'
import NewsBlock from './NewsBlock'
import CardBlock from './CardBlock'
import HeroBlock from './HeroBlock'
import ImagesBlock from './ImagesBlock'
import BlankBlock from './BlankBlock'
import TwoBlock from './TwoBlock'

export default function BlockRenderer({ blocks, lang }) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map(block =>
        block.block_items?.map(item => {
          switch (item.type?.code) {
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'p':
            case 'div':
            case 'container':
            case 'a':
              return (
                <HeaderBlock
                  key={`header-${item.id}`}
                  item={item}
                  lang={lang}
                />
              )
            case '2div':
              return (
                <TwoBlock
                  key={`two-${item.id}`}
                  item={item}
                  lang={lang}
                />
              )
            case 'blank':
              return (
                <BlankBlock
                  key={`blank-${item.id}`}
                  item={item}
                />
              )
            case 'hero':
              return (
                <HeroBlock
                  key={`hero-${item.id}`}
                  item={item}
                  lang={lang}
                />
              )

            case 'news':
              return (
                <NewsBlock
                  key={`news-${item.id}`}
                  item={item}
                  lang={lang}
                />
              )

            case 'card':
              return (
                <CardBlock
                  key={`card-${item.id}`}
                  item={item}
                  lang={lang}
                />
              )
            case 'img':
              return (
                <ImagesBlock
                  key={`img-${item.id}`}
                  item={item}
                />
              )
              

            default:
              return null
          }
        })
      )}
    </>
  )
}
