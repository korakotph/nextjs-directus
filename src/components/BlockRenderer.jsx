import HeroBlock from "./blocks/HeroBlock";
import TextBlock from "./blocks/TextBlock";
import FeaturesBlock from "./blocks/FeaturesBlock";
import LatestNewsBlock from "./blocks/LatestNewsBlock";
import TeamBlock from "./blocks/TeamBlock";

export default function BlockRenderer({ blocks }) {
  if (!blocks) return null;

  return blocks.map(({ blocks_id }, index) => {
    switch (blocks_id.type) {
      case "hero":
        return <HeroBlock key={index} {...blocks_id.data} />;

      case "text":
        return <TextBlock key={index} {...blocks_id.data} />;
    
      case "features":
        return <FeaturesBlock key={index} {...blocks_id.data} />;

      case "latest_news":
        return <LatestNewsBlock key={index} {...blocks_id.data} />;

      case "team":
        return <TeamBlock key={index} {...blocks_id.data} />;

      default:
        return null;
    }
  });
}