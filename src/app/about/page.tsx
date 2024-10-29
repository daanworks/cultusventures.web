import Featurette from "@/components/Featurette";
import content from "@/content";
import { IMAGE_TO_TEXT, TEXT_TO_IMAGE } from "@/constants";

const About = () => {
  return (
    <div className='w-full'>
      <Featurette
        title={content.about.publicPortfolio.title}
        text={content.about.publicPortfolio.text}
        image={content.about.publicPortfolio.image}
        order={TEXT_TO_IMAGE}
      />
      <Featurette
        title={content.about.marketReports.title}
        text={content.about.marketReports.text}
        image={content.about.marketReports.image}
        order={IMAGE_TO_TEXT}
      />
    </div>
  )
}

export default About