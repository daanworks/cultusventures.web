import bitcoindollar from "../../../public/bitcoindollar.jpg";
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
      {/*<div className='flex lg:flex-row flex-col-reverse'>*/}
      {/*  <div*/}
      {/*    className='lg:w-1/2 w-full lg:h-[700px] h-[300px]'*/}
      {/*    style={{*/}
      {/*      backgroundImage: `url(${bitcoindollar.src})`,*/}
      {/*      backgroundPosition: 'center',*/}
      {/*      backgroundSize: 'cover',*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <div className='lg:w-1/2 w-full lg:text-left text-justify flex flex-col justify-between pb-8 px-8'>*/}
      {/*    <div className='lg:text-7xl md:text-6xl text-4xl font-sans pt-8 lg:pb-0 pb-8'>Public<br />Portfolio</div>*/}
      {/*    <div className='md:text-2xl text-xl'>Our Public Portfolio is a transparent showcase of diverse investment strategies, designed to help you navigate both traditional and emerging financial landscapes. We blend TradFi (traditional finance) approaches with crypto opportunities, offering an insightful look at how diversified strategies can work together to outpace inflation and grow wealth.*/}

      {/*      By openly sharing our strategies and results, we aim to empower you with the confidence and knowledge needed to make informed investment decisions.</div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  )
}

export default About