import { TEXT_TO_IMAGE } from "@/constants";

const Featurette = ({title, text, image, order }: { title: string, text: string, image: string, order: string }) => {
  return (
    <div className={`flex ${order === TEXT_TO_IMAGE ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col`}>
      <div className={`lg:w-1/2 w-full ${order === TEXT_TO_IMAGE ? 'lg:text-right' : 'lg:text-left'} text-justify flex flex-col justify-between pb-8 px-8 pt-8`}>
        <div className='lg:text-7xl md:text-6xl text-4xl font-sans lg:pb-0 pb-8' dangerouslySetInnerHTML={{ __html: title }} />
        <div className='md:text-2xl text-xl'>{text}</div>
      </div>
      <div
        className='lg:w-1/2 w-full lg:h-[600px] h-[300px]'
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
    </div>
  )
}

export default Featurette