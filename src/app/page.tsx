"use client"

import Image from "next/image";
import Link from "next/link";
import { ArcElement, Tooltip, Legend, Title, Chart as ChartJS } from 'chart.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function Home() {

  return (
    <div className="px-6 sm:px-0 w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto flex flex-col min-h-screen justify-between">
      <div>
        <div className='flex gap-3 items-center pt-12 pb-24'>
          <div className='lg:w-[68px] lg:h-[68px] md:w-[58px] md:h-[58px] w-[50px] h-[50px] relative'>
            <Image src='/logo.png' alt='logo' fill />
          </div>
        </div>
        <div className='text-3xl pb-12'>
          Empowering smarter financial decisions for a more secure future
        </div>
        <div className='flex flex-col sm:flex-row gap-2'>
          <div className='font-sans text-sm py-3 px-6 border max-w-max bg-blue text-white rounded-full cursor-pointer'>Browse Publications</div>
          <div className='py-3 px-6 border max-w-max rounded-full cursor-pointer flex items-center'>
            <div className='font-sans text-sm mr-1'>Follow Us on</div>
            <div className='w-[16px] h-[16px]'>
              <FontAwesomeIcon icon={faXTwitter} size='xs' />
            </div>
          </div>
        </div>
        <div className='font-sans text-xl underline pb-2 pt-24'>What We Do</div>
        <div>We create engaging articles to educate and inspire our readers. <Link href='https://medium.com/' rel="noopener noreferrer" target="_blank">Our publications</Link> focus on money psychology, helping people gain deeper self-awareness and take control of their financial decisions.</div>
        <div className='font-sans text-xl underline pb-2 pt-12'>Public Portfolio</div>
        <div className='pb-12'>Our portfolio is exclusively focused on Bitcoin, reflecting our belief in its long-term potential and its role in achieving financial freedom. By sharing this, we aim to provide insights into our investment philosophy.</div>
      </div>
      <div className='font-sans text-xs pb-6'>
        <div className='pb-2'>All information is shared for educational purposes only and does not constitute financial advice.</div>
        <div>© 2024, Cultus Ventures</div>
      </div>
    </div>
  );
}
