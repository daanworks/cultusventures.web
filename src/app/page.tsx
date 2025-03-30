"use client"

import Image from "next/image";
import Link from "next/link";
import { ArcElement, Tooltip, Legend, Title, Chart as ChartJS } from 'chart.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from '@fortawesome/fontawesome-svg-core'
import { faCode } from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function Home() {

  return (
    <div className="px-6 sm:px-0 w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto flex flex-col min-h-screen justify-between">
      <div>
        <div className='flex gap-3 items-center pt-8 pb-16'>
          <div className='lg:w-[68px] lg:h-[68px] md:w-[58px] md:h-[58px] w-[50px] h-[50px] relative'>
            <Image src='/logo.png' alt='logo' fill />
          </div>
        </div>
        <div className='text-3xl pb-12'>
          Providing a data-driven API on Bitcoin market trends for individuals and businesses
        </div>
        <div className='flex flex-col sm:flex-row gap-2'>
          <Link href='https://x.com/cultusventures' target="_blank" rel="noopener noreferrer">
            <div className='py-3 px-6 border max-w-max rounded-full cursor-pointer flex items-center bg-blue text-white'>
              <div className='font-sans text-sm mr-1'>Get Access</div>
              <div className='w-[16px] h-[12px]'>
                <FontAwesomeIcon icon={faCode} size='xs' />
              </div>
            </div>
          </Link>
          <Link href='mailto:cultusventures@gmail.com' className='no-underline' target="_blank" rel="noopener noreferrer">
            <div className='font-sans text-black text-sm py-3 px-6 border max-w-max rounded-full cursor-pointer'>
              Contact us
            </div>
          </Link>
        </div>
        <div className='font-sans text-xl underline pb-2 pt-16'>What We Do</div>
        <div>
          Our mission is to educate and empower people to navigate the Bitcoin ecosystem with confidence. We keep it simple — clear, practical knowledge on the world’s hardest money.
        </div>
        <div className='font-sans text-xl underline pb-2 pt-12'>Public Portfolio</div>
        <div className='pb-12'>Our portfolio is exclusively focused on Bitcoin, reflecting our belief in its long-term potential and its role in achieving financial freedom. By sharing this, we aim to provide insights into our investment philosophy.</div>
        <div className='pb-12 gap-2 flex items-center font-sans'>
          <div className='max-w-max'>
            <div className='relative'>
              <div className='absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] text-green'>•</div>
              <div className='animate-pulse text-green'>•</div>
            </div>
          </div>
          <div>Since our last buy, our portfolio is up by 309%</div>
        </div>
      </div>
      <div className='font-sans text-xs pb-6'>
        <div className='pb-2'>All information is shared for educational purposes only and does not constitute financial advice.</div>
        <div>© {new Date().getFullYear()}, Cultus Ventures</div>
      </div>
    </div>
  );
}
