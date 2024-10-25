import arrow from '../../public/arrow.svg'
import mountain from '../../public/mountain.jpg'
import Image from "next/image";
import Link from "next/link";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export default function Home() {
  return (
    <div className='flex flex-col items-center pt-8 w-full'>
      <div className='lg:leading-normal md:leading-relaxed leading-snug text-center lg:text-5xl md:text-4xl text-3xl pb-8 text-balance px-16 w-full'>
        Empowering people to invest seamlessly, build wealth, and confidently beat inflation for a more secure future
      </div>
      <Link
        href='/about'
        className='flex items-center gap-2 hover:!no-underline'
      >
        <div>about</div>
        <Image src={arrow} alt='arrow' />
      </Link>
      <div className='flex flex-1 w-full p-8'>
        <div
          className='flex-1 w-full'
          style={{
            backgroundImage: `url(${mountain.src})`,
            backgroundPosition: 'top',
            backgroundSize: 'cover',
          }}
        />
      </div>
    </div>
  );
}
